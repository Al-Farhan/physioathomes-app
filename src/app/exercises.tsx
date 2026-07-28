import Skeleton from "@/src/components/skeleton/skeleton";
import { ExerciseRow } from "@/src/components/home/exercise-row";
import { SectionError } from "@/src/components/home/section-error";
import { fetchAllExercises, setExerciseDone } from "@/src/lib/mock/home";
import { colors } from "@/src/theme/tokens";
import type { ExerciseItem, SectionState } from "@/src/types/home";
import { ClipboardList } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function ExercisesScreen() {
  const [state, setState] = useState<SectionState<ExerciseItem[]>>({
    status: "loading",
  });

  const load = useCallback(async () => {
    setState((prev) => ({ status: "loading", data: prev.data }));
    try {
      const data = await fetchAllExercises();
      setState({ status: "success", data });
    } catch {
      setState((prev) => ({ status: "error", data: prev.data }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggle = (id: string, done: boolean) => {
    setState((prev) =>
      prev.data === undefined
        ? prev
        : {
            ...prev,
            data: prev.data.map((e) => (e.id === id ? { ...e, done } : e)),
          },
    );
    setExerciseDone(id, done).catch(() => {
      setState((prev) =>
        prev.data === undefined
          ? prev
          : {
              ...prev,
              data: prev.data.map((e) =>
                e.id === id ? { ...e, done: !done } : e,
              ),
            },
      );
    });
  };

  if (state.data === undefined) {
    return (
      <View className="flex-1 gap-3 bg-surface p-screen">
        {state.status === "error" ? (
          <SectionError message="Couldn’t load your exercises." onRetry={load} />
        ) : (
          [0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="box" className="h-16 w-full rounded-card" />
          ))
        )}
      </View>
    );
  }

  if (state.data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-surface p-screen">
        <ClipboardList size={28} color={colors.ink.tertiary} strokeWidth={1.5} />
        <Text className="font-sans text-body text-ink-secondary">
          No exercises prescribed yet.
        </Text>
        <Text className="text-center font-sans text-caption text-ink-secondary">
          Your physiotherapist will add exercises after your first session.
        </Text>
      </View>
    );
  }

  const doneCount = state.data.filter((e) => e.done).length;
  const totalMinutes = state.data.reduce((sum, e) => sum + e.durationMinutes, 0);

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text className="font-sans text-body text-ink-secondary">
        {doneCount} of {state.data.length} done today · about {totalMinutes} min
        in total
      </Text>

      <View className="mt-4 rounded-card border border-line bg-surface">
        {state.data.map((exercise, index) => (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            onToggleDone={handleToggle}
            divider={index > 0}
          />
        ))}
      </View>

      <Text className="mt-4 font-sans text-caption text-ink-secondary">
        Stop any exercise that causes sharp pain and mention it to your
        physiotherapist.
      </Text>
    </ScrollView>
  );
}
