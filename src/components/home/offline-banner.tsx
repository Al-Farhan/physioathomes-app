import { colors } from "@/src/theme/tokens";
import { WifiOff } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

/** Quiet connectivity notice; cached content stays visible below it. */
export function OfflineBanner() {
  return (
    <View
      className="flex-row items-center gap-2 border-b border-line bg-surface-alt px-screen py-2"
      accessibilityRole="alert"
    >
      <WifiOff size={16} color={colors.ink.secondary} strokeWidth={1.75} />
      <Text className="text-caption text-ink-secondary">
        You’re offline — showing saved information.
      </Text>
    </View>
  );
}
