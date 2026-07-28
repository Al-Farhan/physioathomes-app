import Skeleton from "@/src/components/skeleton/skeleton";
import { Avatar } from "@/src/components/home/avatar";
import { SectionError } from "@/src/components/home/section-error";
import { formatSessionTime } from "@/src/lib/format";
import { fetchTracking } from "@/src/lib/mock/home";
import { colors } from "@/src/theme/tokens";
import type { SectionState, SessionStatus, TrackingInfo } from "@/src/types/home";
import { CalendarX2, Check, MapPin, Phone } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

const STEPS: { key: string; label: string; reached: SessionStatus[] }[] = [
  {
    key: "confirmed",
    label: "Booking confirmed",
    reached: ["confirmed", "on_the_way"],
  },
  {
    key: "on_the_way",
    label: "Therapist on the way",
    reached: ["on_the_way"],
  },
  { key: "arrived", label: "Session begins", reached: [] },
];

export default function TrackSessionScreen() {
  const [state, setState] = useState<SectionState<TrackingInfo>>({
    status: "loading",
  });

  const load = useCallback(async () => {
    setState((prev) => ({ status: "loading", data: prev.data }));
    try {
      const data = await fetchTracking();
      setState({ status: "success", data });
    } catch {
      setState((prev) => ({ status: "error", data: prev.data }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (state.data === undefined) {
    return (
      <View className="flex-1 gap-3 bg-surface p-screen">
        {state.status === "error" ? (
          <SectionError message="Couldn’t load session status." onRetry={load} />
        ) : (
          <>
            <Skeleton variant="box" className="h-24 w-full rounded-card" />
            <Skeleton variant="box" className="h-48 w-full rounded-card" />
          </>
        )}
      </View>
    );
  }

  const { session, etaMinutes } = state.data;

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-surface p-screen">
        <CalendarX2 size={28} color={colors.ink.tertiary} strokeWidth={1.5} />
        <Text className="font-sans text-body text-ink-secondary">
          No active session to track.
        </Text>
      </View>
    );
  }

  const activeIndex = session.status === "on_the_way" ? 1 : 0;

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text className="text-title font-sans-semibold text-ink">
        {formatSessionTime(session.startsAt)}
      </Text>
      <View className="mt-1 flex-row items-center gap-2">
        <MapPin size={14} color={colors.ink.tertiary} strokeWidth={1.75} />
        <Text
          className="flex-1 font-sans text-caption text-ink-secondary"
          numberOfLines={1}
        >
          {session.address}
        </Text>
      </View>

      {etaMinutes !== null && (
        <View className="mt-5 rounded-card bg-primary-50 p-5">
          <Text className="text-label font-sans-medium text-primary-700">
            Arriving in about {etaMinutes} minutes
          </Text>
        </View>
      )}

      {/* Status timeline */}
      <View className="mt-5 rounded-card border border-line bg-surface p-5">
        {STEPS.map((step, index) => {
          const done = index < activeIndex;
          const current = index === activeIndex;
          return (
            <View key={step.key} className="flex-row gap-3">
              <View className="items-center">
                {done ? (
                  <View className="h-6 w-6 items-center justify-center rounded-pill bg-success">
                    <Check
                      size={14}
                      color={colors.surface.DEFAULT}
                      strokeWidth={2.5}
                    />
                  </View>
                ) : current ? (
                  <View className="h-6 w-6 items-center justify-center rounded-pill border-2 border-primary-600">
                    <View className="h-2 w-2 rounded-pill bg-primary-600" />
                  </View>
                ) : (
                  <View className="h-6 w-6 rounded-pill border border-line" />
                )}
                {index < STEPS.length - 1 && (
                  <View className="w-px flex-1 bg-line" />
                )}
              </View>
              <Text
                className={`pb-6 text-body ${
                  current
                    ? "font-sans-medium text-ink"
                    : done
                      ? "font-sans text-ink-secondary"
                      : "font-sans text-ink-tertiary"
                }`}
              >
                {step.label}
              </Text>
            </View>
          );
        })}
        <Text className="font-sans text-caption text-ink-secondary">
          {session.status === "on_the_way"
            ? "We’ll let you know when your therapist arrives."
            : "We’ll notify you when your therapist starts the journey."}
        </Text>
      </View>

      {/* Therapist */}
      <View className="mt-5 flex-row items-center gap-3 rounded-card border border-line bg-surface p-5">
        <Avatar
          name={session.therapist.name}
          photoUrl={session.therapist.photoUrl}
          size={44}
        />
        <View className="flex-1">
          <Text className="text-body font-sans-medium text-ink">
            {session.therapist.name}
          </Text>
          <Text className="font-sans text-caption text-ink-secondary">
            {session.therapist.credentials}
          </Text>
        </View>
        <Pressable
          onPress={() => Linking.openURL(`tel:${session.therapist.phone}`)}
          accessibilityRole="button"
          accessibilityLabel={`Call ${session.therapist.name}`}
          className="h-12 w-12 items-center justify-center rounded-btn bg-primary-600 active:bg-primary-700"
        >
          <Phone size={18} color={colors.surface.DEFAULT} strokeWidth={1.75} />
        </Pressable>
      </View>
    </ScrollView>
  );
}
