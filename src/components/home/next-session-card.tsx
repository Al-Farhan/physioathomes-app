import { formatSessionTime } from "@/src/lib/format";
import { colors } from "@/src/theme/tokens";
import type { SessionStatus, UpcomingSession } from "@/src/types/home";
import { CalendarPlus, MapPin, Navigation, Phone } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "./avatar";

interface NextSessionCardProps {
  session: UpcomingSession | null;
  onCallTherapist: () => void;
  onTrack: () => void;
  onReschedule: () => void;
  onBook: () => void;
}

const STATUS_META: Record<SessionStatus, { label: string; dotColor: string }> =
  {
    confirmed: { label: "Confirmed", dotColor: colors.success },
    on_the_way: { label: "Therapist on the way", dotColor: colors.primary[600] },
    awaiting_confirmation: {
      label: "Awaiting confirmation",
      dotColor: colors.warning,
    },
  };

/** The hero card — the only elevated surface on the screen. */
export function NextSessionCard({
  session,
  onCallTherapist,
  onTrack,
  onReschedule,
  onBook,
}: NextSessionCardProps) {
  if (!session) {
    return (
      <View
        className="rounded-card border border-line bg-surface p-5"
        style={styles.elevation}
      >
        <Text className="text-title font-sans-semibold text-ink">
          No upcoming session
        </Text>
        <Text className="mt-1 font-sans text-body text-ink-secondary">
          Book a visit and a physiotherapist will come to you.
        </Text>
        <Pressable
          onPress={onBook}
          accessibilityRole="button"
          accessibilityLabel="Book a session"
          className="mt-5 min-h-12 flex-row items-center justify-center gap-2 rounded-btn bg-primary-600 px-5 active:bg-primary-700"
        >
          <CalendarPlus size={18} color={colors.surface.DEFAULT} strokeWidth={1.75} />
          <Text className="text-body font-sans-semibold text-surface">
            Book a session
          </Text>
        </Pressable>
      </View>
    );
  }

  const status = STATUS_META[session.status];
  const isOnTheWay = session.status === "on_the_way";

  return (
    <View
      className="rounded-card border border-line bg-surface p-5"
      style={styles.elevation}
      accessibilityLabel={`Next session ${formatSessionTime(session.startsAt)}, ${status.label}`}
    >
      {/* Date/time anchor + status pill */}
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-sans text-caption text-ink-secondary">
            Next session
          </Text>
          <Text className="mt-0.5 text-display font-sans-semibold text-ink">
            {formatSessionTime(session.startsAt)}
          </Text>
        </View>
        <View className="mt-1 flex-row items-center gap-1.5 rounded-pill border border-line px-3 py-1.5">
          <View
            className="h-2 w-2 rounded-pill"
            style={{ backgroundColor: status.dotColor }}
          />
          <Text className="text-caption font-sans-medium text-ink-secondary">
            {status.label}
          </Text>
        </View>
      </View>

      {/* Therapist + session count */}
      <View className="mt-4 flex-row items-center gap-3">
        <Avatar
          name={session.therapist.name}
          photoUrl={session.therapist.photoUrl}
          size={40}
        />
        <View className="flex-1">
          <Text className="text-body font-sans-medium text-ink">
            {session.therapist.name}
          </Text>
          <Text className="font-sans text-caption text-ink-secondary">
            Session {session.sessionNumber} of {session.totalSessions}
          </Text>
        </View>
      </View>

      {/* Address */}
      <View className="mt-3 flex-row items-center gap-2">
        <MapPin size={16} color={colors.ink.tertiary} strokeWidth={1.75} />
        <Text
          className="flex-1 font-sans text-caption text-ink-secondary"
          numberOfLines={1}
        >
          {session.address}
        </Text>
      </View>

      {/* Actions */}
      <View className="mt-5 flex-row gap-3">
        <Pressable
          onPress={isOnTheWay ? onTrack : onCallTherapist}
          accessibilityRole="button"
          accessibilityLabel={
            isOnTheWay ? "Track therapist" : "Call therapist"
          }
          className="min-h-12 flex-1 flex-row items-center justify-center gap-2 rounded-btn bg-primary-600 active:bg-primary-700"
        >
          {isOnTheWay ? (
            <Navigation
              size={18}
              color={colors.surface.DEFAULT}
              strokeWidth={1.75}
            />
          ) : (
            <Phone size={18} color={colors.surface.DEFAULT} strokeWidth={1.75} />
          )}
          <Text className="text-body font-sans-semibold text-surface">
            {isOnTheWay ? "Track" : "Call therapist"}
          </Text>
        </Pressable>
        <Pressable
          onPress={onReschedule}
          accessibilityRole="button"
          accessibilityLabel="Reschedule session"
          className="min-h-12 flex-1 items-center justify-center rounded-btn border border-line bg-surface active:bg-surface-alt"
        >
          <Text className="text-body font-sans-medium text-ink">Reschedule</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Subtle elevation is reserved for this card alone; NativeWind's shadow
// utilities don't give fine-grained RN shadow control, so it lives here.
const styles = StyleSheet.create({
  elevation: {
    shadowColor: colors.ink.DEFAULT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
});
