import { colors } from "@/src/theme/tokens";
import {
  Activity,
  CalendarPlus,
  FileText,
  Headphones,
  LucideIcon,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

export type QuickActionKey = "book" | "exercises" | "reports" | "support";

interface QuickActionsProps {
  onPressAction: (key: QuickActionKey) => void;
}

const ACTIONS: { key: QuickActionKey; label: string; Icon: LucideIcon }[] = [
  { key: "book", label: "Book Session", Icon: CalendarPlus },
  { key: "exercises", label: "My Exercises", Icon: Activity },
  { key: "reports", label: "Reports", Icon: FileText },
  { key: "support", label: "Support", Icon: Headphones },
];

export function QuickActions({ onPressAction }: QuickActionsProps) {
  return (
    <View className="flex-row gap-3">
      {ACTIONS.map(({ key, label, Icon }) => (
        <Pressable
          key={key}
          onPress={() => onPressAction(key)}
          accessibilityRole="button"
          accessibilityLabel={label}
          className="min-h-12 flex-1 items-center justify-center gap-1.5 rounded-card border border-line bg-surface py-3.5 active:bg-surface-alt"
        >
          <Icon size={22} color={colors.primary[700]} strokeWidth={1.75} />
          <Text
            className="text-center text-caption font-medium text-ink"
            numberOfLines={2}
          >
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
