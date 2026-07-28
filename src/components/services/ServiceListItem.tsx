import { colors } from "@/src/theme/tokens";
import { ChevronRight, LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type ServiceListItemProps = {
  title: string;
  subtitle: string;
  tags: string[];
  Icon: LucideIcon;
  onPress?: () => void;
};

const ServiceListItem = ({
  title,
  subtitle,
  tags,
  Icon,
  onPress,
}: ServiceListItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${subtitle}`}
      className="flex-row items-center gap-4 rounded-card border border-line bg-surface p-4 active:bg-surface-alt"
    >
      <View className="h-11 w-11 items-center justify-center rounded-btn bg-primary-50">
        <Icon size={22} color={colors.primary[700]} strokeWidth={1.75} />
      </View>

      <View className="flex-1">
        <Text className="text-body font-sans-semibold text-ink">{title}</Text>
        <Text
          className="mt-0.5 font-sans text-caption text-ink-secondary"
          numberOfLines={2}
        >
          {subtitle}
        </Text>
        {tags.length > 0 && (
          <View className="mt-2 flex-row flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <View
                key={tag}
                className="rounded-pill border border-line px-2.5 py-1"
              >
                <Text className="font-sans text-caption text-ink-secondary">
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <ChevronRight size={18} color={colors.ink.tertiary} strokeWidth={1.75} />
    </Pressable>
  );
};

export default ServiceListItem;
