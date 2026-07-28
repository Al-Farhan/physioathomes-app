import Skeleton from "@/src/components/skeleton/skeleton";
import { HelpStrip } from "@/src/components/home/help-strip";
import { HomeHeader } from "@/src/components/home/home-header";
import { HomeSkeleton } from "@/src/components/home/home-skeleton";
import { NextSessionCard } from "@/src/components/home/next-session-card";
import { OfflineBanner } from "@/src/components/home/offline-banner";
import { QuickActions, QuickActionKey } from "@/src/components/home/quick-actions";
import { RecoveryProgressCard } from "@/src/components/home/recovery-progress-card";
import { SectionError } from "@/src/components/home/section-error";
import { TherapistCard } from "@/src/components/home/therapist-card";
import { TodaysExercises } from "@/src/components/home/todays-exercises";
import { useHomeData } from "@/src/hooks/use-home-data";
import { greetingForHour } from "@/src/lib/format";
import { setExerciseDone } from "@/src/lib/mock/home";
import { useAuth } from "@/src/providers/AuthProvider";
import { colors } from "@/src/theme/tokens";
import type { SectionState } from "@/src/types/home";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Linking, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Home. Composes presentational sections only — all data flows in from
 * useHomeData (mock-backed, swappable) and the auth session.
 */
export default function HomeScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const home = useHomeData();

  const sessionFirstName: string | undefined =
    session?.user?.user_metadata?.fullName?.split(" ")[0];
  const firstName = sessionFirstName ?? home.user.data?.firstName ?? "there";
  const greeting = greetingForHour(new Date().getHours());

  const handleQuickAction = useCallback(
    (key: QuickActionKey) => {
      switch (key) {
        case "book":
          router.push("/(user)/services");
          break;
        case "exercises":
          // TODO: exercises screen not built yet
          break;
        case "reports":
          router.push("/user-activity");
          break;
        case "support":
          router.push("/help");
          break;
      }
    },
    [router],
  );

  const handleToggleExercise = useCallback(
    (id: string, done: boolean) => {
      home.setExercises((prev) =>
        prev.map((e) => (e.id === id ? { ...e, done } : e)),
      );
      setExerciseDone(id, done).catch(() => {
        home.setExercises((prev) =>
          prev.map((e) => (e.id === id ? { ...e, done: !done } : e)),
        );
      });
    },
    [home],
  );

  if (home.initialLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
        <HomeSkeleton />
      </SafeAreaView>
    );
  }

  const noUpcomingSession =
    home.nextSession.status === "success" && home.nextSession.data === null;

  const nextSessionSection = renderSection(home.nextSession, {
    skeletonHeight: "h-56",
    errorMessage: "Couldn’t load your next session.",
    onRetry: home.retryNextSession,
    render: (nextSession) => (
      <NextSessionCard
        session={nextSession}
        onCallTherapist={() => {
          if (nextSession)
            Linking.openURL(`tel:${nextSession.therapist.phone}`);
        }}
        onTrack={() => {
          // TODO: live tracking screen not built yet
        }}
        onReschedule={() => {
          // TODO: reschedule flow not built yet
        }}
        onBook={() => router.push("/(user)/services")}
      />
    ),
  });

  const recoverySection = renderSection(home.recovery, {
    skeletonHeight: "h-32",
    errorMessage: "Couldn’t load your recovery progress.",
    onRetry: home.retryRecovery,
    render: (recovery) =>
      recovery && (
        <RecoveryProgressCard
          recovery={recovery}
          onPress={() => {
            // TODO: care plan screen not built yet
          }}
        />
      ),
  });

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      {home.isOffline && <OfflineBanner />}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={home.refreshing}
            onRefresh={home.refresh}
            tintColor={colors.primary[600]}
          />
        }
      >
        <View className="gap-section px-screen pb-2 pt-2">
          <HomeHeader
            greeting={greeting}
            firstName={firstName}
            avatarUrl={home.user.data?.avatarUrl ?? null}
            hasUnreadNotifications={(home.user.data?.unreadNotifications ?? 0) > 0}
            onPressNotifications={() => {
              // TODO: notifications screen not built yet
            }}
            onPressProfile={() => router.push("/(user)/profile")}
          />

          {/* Hero: next session, or the booking prompt when there's none.
              With no upcoming session, booking is already promoted above
              progress by keeping this section first. */}
          {nextSessionSection}

          {!noUpcomingSession && recoverySection}

          <QuickActions onPressAction={handleQuickAction} />

          {noUpcomingSession && recoverySection}

          {renderSection(home.exercises, {
            skeletonHeight: "h-40",
            errorMessage: "Couldn’t load today’s exercises.",
            onRetry: home.retryExercises,
            render: (exercises) => (
              <TodaysExercises
                exercises={exercises}
                onToggleDone={handleToggleExercise}
                onViewAll={() => {
                  // TODO: exercises screen not built yet
                }}
              />
            ),
          })}

          {renderSection(home.therapist, {
            skeletonHeight: "h-40",
            errorMessage: "Couldn’t load your physiotherapist.",
            onRetry: home.retryTherapist,
            render: (therapist) =>
              therapist && (
                <TherapistCard
                  therapist={therapist}
                  onMessage={() => Linking.openURL(`sms:${therapist.phone}`)}
                  onCall={() => Linking.openURL(`tel:${therapist.phone}`)}
                />
              ),
          })}

          <HelpStrip onPress={() => router.push("/help")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Shared per-section state handling: stale data keeps rendering during
 * reloads; a section-local skeleton covers retries; errors stay inline.
 */
function renderSection<T>(
  state: SectionState<T>,
  options: {
    skeletonHeight: string;
    errorMessage: string;
    onRetry: () => void;
    render: (data: T) => React.ReactNode;
  },
): React.ReactNode {
  if (state.data !== undefined) return options.render(state.data);
  if (state.status === "error")
    return (
      <SectionError message={options.errorMessage} onRetry={options.onRetry} />
    );
  return (
    <Skeleton
      variant="box"
      className={`w-full rounded-card ${options.skeletonHeight}`}
    />
  );
}
