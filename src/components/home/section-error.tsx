import { colors } from "@/src/theme/tokens";
import { CircleAlert } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface SectionErrorProps {
  message: string;
  onRetry: () => void;
}

/** Inline, per-section failure state — never a full-screen error. */
export function SectionError({ message, onRetry }: SectionErrorProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-card border border-line bg-surface px-4 py-3">
      <CircleAlert size={20} color={colors.danger} strokeWidth={1.75} />
      <Text className="flex-1 font-sans text-label text-ink-secondary">
        {message}
      </Text>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel={`Retry: ${message}`}
        hitSlop={12}
        className="min-h-12 justify-center px-2"
      >
        <Text className="text-label font-sans-medium text-primary-700">Retry</Text>
      </Pressable>
    </View>
  );
}
