import { colors } from "@/src/theme/tokens";
import type { RecoveryProgress } from "@/src/types/home";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SectionTitle } from "./section-title";

interface RecoveryProgressCardProps {
  recovery: RecoveryProgress;
  onPress: () => void;
}

/** Slim linear progress toward the care plan — tap opens the plan. */
export function RecoveryProgressCard({
  recovery,
  onPress,
}: RecoveryProgressCardProps) {
  const { conditionName, sessionsCompleted, sessionsPlanned, nextMilestone } =
    recovery;
  const percent =
    sessionsPlanned > 0
      ? Math.min(100, Math.round((sessionsCompleted / sessionsPlanned) * 100))
      : 0;

  return (
    <View>
      <SectionTitle title="Recovery" />
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${conditionName}: ${sessionsCompleted} of ${sessionsPlanned} sessions completed. Next milestone: ${nextMilestone}. Opens care plan.`}
        className="rounded-card border border-line bg-surface p-5 active:bg-surface-alt"
      >
        <View className="flex-row items-center justify-between gap-3">
          <Text className="flex-1 text-body font-sans-medium text-ink">
            {conditionName}
          </Text>
          <ChevronRight
            size={18}
            color={colors.ink.tertiary}
            strokeWidth={1.75}
          />
        </View>

        <View className="mt-3 h-1.5 overflow-hidden rounded-pill bg-line">
          <View
            className="h-full rounded-pill bg-primary-600"
            style={{ width: `${percent}%` }}
          />
        </View>

        <View className="mt-3 flex-row items-center justify-between gap-3">
          <Text className="font-sans text-caption text-ink-secondary">
            {sessionsCompleted} of {sessionsPlanned} sessions completed
          </Text>
          <Text
            className="font-sans text-caption text-ink-secondary"
            numberOfLines={1}
          >
            Next: {nextMilestone}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
