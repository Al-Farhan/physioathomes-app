import Skeleton from "@/src/components/skeleton/skeleton";
import { SectionError } from "@/src/components/home/section-error";
import { formatClockTime } from "@/src/lib/format";
import { fetchRescheduleDays, requestReschedule } from "@/src/lib/mock/home";
import type { RescheduleDay, SectionState } from "@/src/types/home";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

export default function RescheduleScreen() {
  const router = useRouter();
  const [state, setState] = useState<SectionState<RescheduleDay[]>>({
    status: "loading",
  });
  const [dayIndex, setDayIndex] = useState(0);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setState((prev) => ({ status: "loading", data: prev.data }));
    try {
      const data = await fetchRescheduleDays();
      setState({ status: "success", data });
    } catch {
      setState((prev) => ({ status: "error", data: prev.data }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleConfirm = async () => {
    if (!selectedSlotId || submitting) return;
    setSubmitting(true);
    try {
      await requestReschedule(selectedSlotId);
      Alert.alert(
        "Request sent",
        "Your physiotherapist will confirm the new time shortly.",
        [{ text: "OK", onPress: () => router.back() }],
      );
    } catch {
      Alert.alert("Something went wrong", "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (state.data === undefined) {
    return (
      <View className="flex-1 gap-3 bg-surface p-screen">
        {state.status === "error" ? (
          <SectionError
            message="Couldn’t load available times."
            onRetry={load}
          />
        ) : (
          <>
            <Skeleton variant="box" className="h-16 w-full rounded-card" />
            <Skeleton variant="box" className="h-48 w-full rounded-card" />
          </>
        )}
      </View>
    );
  }

  const days = state.data;
  const day = days[dayIndex];

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 24 }}
      >
        <Text className="font-sans text-body text-ink-secondary">
          Pick a new time. Your current session stays booked until the new one
          is confirmed.
        </Text>

        {/* Day picker */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{ gap: 8 }}
        >
          {days.map((d, index) => {
            const date = new Date(d.date);
            const selected = index === dayIndex;
            return (
              <Pressable
                key={d.date}
                onPress={() => {
                  setDayIndex(index);
                  setSelectedSlotId(null);
                }}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={date.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
                className={`min-h-12 min-w-16 items-center justify-center rounded-btn border px-4 py-2 ${
                  selected
                    ? "border-primary-600 bg-primary-50"
                    : "border-line bg-surface"
                }`}
              >
                <Text
                  className={`text-caption ${
                    selected
                      ? "font-sans-medium text-primary-700"
                      : "font-sans text-ink-secondary"
                  }`}
                >
                  {date.toLocaleDateString("en-IN", { weekday: "short" })}
                </Text>
                <Text
                  className={`text-body ${
                    selected
                      ? "font-sans-semibold text-primary-700"
                      : "font-sans-medium text-ink"
                  }`}
                >
                  {date.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Slots */}
        <View className="mt-5 flex-row flex-wrap gap-2">
          {day.slots.map((slot) => {
            const selected = slot.id === selectedSlotId;
            return (
              <Pressable
                key={slot.id}
                disabled={!slot.available}
                onPress={() => setSelectedSlotId(slot.id)}
                accessibilityRole="button"
                accessibilityState={{
                  selected,
                  disabled: !slot.available,
                }}
                accessibilityLabel={`${formatClockTime(slot.startsAt)}${slot.available ? "" : ", unavailable"}`}
                className={`min-h-12 items-center justify-center rounded-btn border px-4 ${
                  selected
                    ? "border-primary-600 bg-primary-600"
                    : slot.available
                      ? "border-line bg-surface active:bg-surface-alt"
                      : "border-line bg-surface-alt"
                }`}
              >
                <Text
                  className={`text-label ${
                    selected
                      ? "font-sans-medium text-surface"
                      : slot.available
                        ? "font-sans text-ink"
                        : "font-sans text-ink-tertiary line-through"
                  }`}
                >
                  {formatClockTime(slot.startsAt)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Confirm */}
      <View className="border-t border-line p-screen pb-8">
        <Pressable
          onPress={handleConfirm}
          disabled={!selectedSlotId || submitting}
          accessibilityRole="button"
          accessibilityState={{ disabled: !selectedSlotId || submitting }}
          accessibilityLabel="Request new time"
          className={`min-h-12 items-center justify-center rounded-btn ${
            selectedSlotId && !submitting ? "bg-primary-600" : "bg-line"
          }`}
        >
          <Text
            className={`text-body font-sans-semibold ${
              selectedSlotId && !submitting ? "text-surface" : "text-ink-secondary"
            }`}
          >
            {submitting ? "Sending…" : "Request new time"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
