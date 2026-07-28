import type { ExerciseItem } from "@/src/types/home";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { ExerciseRow } from "./exercise-row";
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
            <Text className="text-label font-sans-medium text-primary-700">
              View all
            </Text>
          </Pressable>
        }
      />

      <View className="rounded-card border border-line bg-surface">
        {exercises.slice(0, 3).map((exercise, index) => (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            onToggleDone={onToggleDone}
            divider={index > 0}
          />
        ))}
      </View>
    </View>
  );
}
