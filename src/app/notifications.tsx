import Skeleton from "@/src/components/skeleton/skeleton";
import { SectionError } from "@/src/components/home/section-error";
import { timeAgo } from "@/src/lib/format";
import {
  fetchNotifications,
  markNotificationRead,
} from "@/src/lib/mock/home";
import { colors } from "@/src/theme/tokens";
import type { NotificationItem, SectionState } from "@/src/types/home";
import { BellOff } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function NotificationsScreen() {
  const [state, setState] = useState<SectionState<NotificationItem[]>>({
    status: "loading",
  });

  const load = useCallback(async () => {
    setState((prev) => ({ status: "loading", data: prev.data }));
    try {
      const data = await fetchNotifications();
      setState({ status: "success", data });
    } catch {
      setState((prev) => ({ status: "error", data: prev.data }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handlePress = (notification: NotificationItem) => {
    if (notification.read) return;
    setState((prev) =>
      prev.data === undefined
        ? prev
        : {
            ...prev,
            data: prev.data.map((n) =>
              n.id === notification.id ? { ...n, read: true } : n,
            ),
          },
    );
    markNotificationRead(notification.id).catch(() => {});
  };

  if (state.data === undefined) {
    return (
      <View className="flex-1 gap-3 bg-surface p-screen">
        {state.status === "error" ? (
          <SectionError
            message="Couldn’t load notifications."
            onRetry={load}
          />
        ) : (
          [0, 1, 2, 3].map((i) => (
            <Skeleton key={i} variant="box" className="h-20 w-full rounded-card" />
          ))
        )}
      </View>
    );
  }

  if (state.data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-surface p-screen">
        <BellOff size={28} color={colors.ink.tertiary} strokeWidth={1.5} />
        <Text className="font-sans text-body text-ink-secondary">
          You’re all caught up.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <View className="rounded-card border border-line bg-surface">
        {state.data.map((notification, index) => (
          <Pressable
            key={notification.id}
            onPress={() => handlePress(notification)}
            accessibilityRole="button"
            accessibilityLabel={`${notification.read ? "" : "Unread. "}${notification.title}. ${notification.body}`}
            className={`min-h-12 flex-row gap-3 px-4 py-3.5 active:bg-surface-alt ${
              index > 0 ? "border-t border-line" : ""
            }`}
          >
            <View
              className={`mt-2 h-2 w-2 rounded-pill ${
                notification.read ? "bg-transparent" : "bg-primary-600"
              }`}
            />
            <View className="flex-1">
              <View className="flex-row items-start justify-between gap-2">
                <Text
                  className={`flex-1 text-body text-ink ${
                    notification.read ? "font-sans" : "font-sans-medium"
                  }`}
                >
                  {notification.title}
                </Text>
                <Text className="font-sans text-caption text-ink-secondary">
                  {timeAgo(notification.createdAt)}
                </Text>
              </View>
              <Text
                className="mt-0.5 font-sans text-caption text-ink-secondary"
                numberOfLines={2}
              >
                {notification.body}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
