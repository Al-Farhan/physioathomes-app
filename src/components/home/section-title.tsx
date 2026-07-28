import React from "react";
import { Text, View } from "react-native";

interface SectionTitleProps {
  title: string;
  /** Optional trailing action, e.g. a "View all" link. */
  action?: React.ReactNode;
}

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text
        className="text-label font-sans-medium text-ink-secondary"
        accessibilityRole="header"
      >
        {title}
      </Text>
      {action}
    </View>
  );
}
