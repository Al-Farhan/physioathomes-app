import { colors } from "@/src/theme/tokens";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Pressable, Text } from "react-native";

interface HelpStripProps {
  onPress: () => void;
}

/** Quiet, low-contrast help entry point at the bottom of the screen. */
export function HelpStrip({ onPress }: HelpStripProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Need help? Talk to our care team"
      className="min-h-12 flex-row items-center justify-between rounded-card bg-surface-alt px-4 py-3.5 active:bg-line"
    >
      <Text className="text-label text-ink-secondary">
        Need help? Talk to our care team.
      </Text>
      <ChevronRight size={16} color={colors.ink.tertiary} strokeWidth={1.75} />
    </Pressable>
  );
}
