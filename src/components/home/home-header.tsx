import { colors } from "@/src/theme/tokens";
import { Bell } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Avatar } from "./avatar";

interface HomeHeaderProps {
  greeting: string;
  firstName: string;
  avatarUrl: string | null;
  hasUnreadNotifications: boolean;
  onPressNotifications: () => void;
  onPressProfile: () => void;
}

export function HomeHeader({
  greeting,
  firstName,
  avatarUrl,
  hasUnreadNotifications,
  onPressNotifications,
  onPressProfile,
}: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="text-caption text-ink-secondary">{greeting},</Text>
        <Text className="text-title font-semibold text-ink">{firstName}</Text>
      </View>

      <View className="flex-row items-center gap-1">
        <Pressable
          onPress={onPressNotifications}
          accessibilityRole="button"
          accessibilityLabel={
            hasUnreadNotifications
              ? "Notifications, unread notifications available"
              : "Notifications"
          }
          className="h-12 w-12 items-center justify-center"
        >
          <View>
            <Bell size={22} color={colors.ink.DEFAULT} strokeWidth={1.75} />
            {hasUnreadNotifications && (
              <View className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-pill bg-primary-600" />
            )}
          </View>
        </Pressable>

        <Pressable
          onPress={onPressProfile}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
          className="h-12 w-12 items-center justify-center"
        >
          <Avatar name={firstName} photoUrl={avatarUrl} size={36} />
        </Pressable>
      </View>
    </View>
  );
}
