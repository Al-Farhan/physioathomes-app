import { colors } from "@/src/theme/tokens";
import type { ExerciseItem } from "@/src/types/home";
import { Check } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SectionTitle } from "./section-title";

interface TodaysExercisesProps {
  /** Show at most 2–3 here; the full list lives behind "View all". */
  exercises: ExerciseItem[];
  onToggleDone: (id: string, done: boolean) => void;
  onViewAll: () => void;
}

export function TodaysExercises({
  exercises,
  onToggleDone,
  onViewAll,
}: TodaysExercisesProps) {
  if (exercises.length === 0) return null;

  return (
    <View>
      <SectionTitle
        title="Today’s exercises"
        action={
          <Pressable
            onPress={onViewAll}
            accessibilityRole="button"
            accessibilityLabel="View all exercises"
            hitSlop={12}
          >
            <Text className="text-label font-medium text-primary-700">
              View all
            </Text>
          </Pressable>
        }
      />

      <View className="rounded-card border border-line bg-surface">
        {exercises.slice(0, 3).map((exercise, index) => (
          <Pressable
            key={exercise.id}
            onPress={() => onToggleDone(exercise.id, !exercise.done)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: exercise.done }}
            accessibilityLabel={`${exercise.name}, ${exercise.detail}, ${exercise.durationMinutes} minutes`}
            className={`min-h-12 flex-row items-center gap-3 px-4 py-3 active:bg-surface-alt ${
              index > 0 ? "border-t border-line" : ""
            }`}
          >
            <View
              className={`h-6 w-6 items-center justify-center rounded-pill border ${
                exercise.done
                  ? "border-success bg-success"
                  : "border-line bg-surface"
              }`}
            >
              {exercise.done && (
                <Check
                  size={14}
                  color={colors.surface.DEFAULT}
                  strokeWidth={2.5}
                />
              )}
            </View>
            <View className="flex-1">
              <Text
                className={`text-body ${
                  exercise.done
                    ? "text-ink-secondary line-through"
                    : "text-ink"
                }`}
              >
                {exercise.name}
              </Text>
              <Text className="text-caption text-ink-secondary">
                {exercise.detail} · {exercise.durationMinutes} min
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
