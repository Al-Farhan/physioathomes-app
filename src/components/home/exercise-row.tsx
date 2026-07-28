import { colors } from "@/src/theme/tokens";
import type { ExerciseItem } from "@/src/types/home";
import { Check } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface ExerciseRowProps {
  exercise: ExerciseItem;
  onToggleDone: (id: string, done: boolean) => void;
  /** Draw a hairline divider above the row. */
  divider?: boolean;
}

export function ExerciseRow({
  exercise,
  onToggleDone,
  divider = false,
}: ExerciseRowProps) {
  return (
    <Pressable
      onPress={() => onToggleDone(exercise.id, !exercise.done)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: exercise.done }}
      accessibilityLabel={`${exercise.name}, ${exercise.detail}, ${exercise.durationMinutes} minutes`}
      className={`min-h-12 flex-row items-center gap-3 px-4 py-3 active:bg-surface-alt ${
        divider ? "border-t border-line" : ""
      }`}
    >
      <View
        className={`h-6 w-6 items-center justify-center rounded-pill border ${
          exercise.done ? "border-success bg-success" : "border-line bg-surface"
        }`}
      >
        {exercise.done && (
          <Check size={14} color={colors.surface.DEFAULT} strokeWidth={2.5} />
        )}
      </View>
      <View className="flex-1">
        <Text
          className={`font-sans text-body ${
            exercise.done ? "text-ink-secondary line-through" : "text-ink"
          }`}
        >
          {exercise.name}
        </Text>
        <Text className="font-sans text-caption text-ink-secondary">
          {exercise.detail} · {exercise.durationMinutes} min
        </Text>
      </View>
    </Pressable>
  );
}
