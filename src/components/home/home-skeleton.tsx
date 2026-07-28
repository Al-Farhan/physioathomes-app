import Skeleton from "@/src/components/skeleton/skeleton";
import React from "react";
import { View } from "react-native";

/** First-load placeholder mirroring the final layout — no spinners. */
export function HomeSkeleton() {
  return (
    <View className="gap-section px-screen pt-2">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="gap-2">
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="box" className="h-6 w-32" />
        </View>
        <View className="flex-row items-center gap-3">
          <Skeleton variant="circle" className="h-9 w-9" />
          <Skeleton variant="circle" className="h-9 w-9" />
        </View>
      </View>

      {/* Next session card */}
      <View className="gap-4 rounded-card border border-line p-5">
        <View className="flex-row justify-between">
          <Skeleton variant="box" className="h-8 w-44" />
          <Skeleton variant="box" className="h-7 w-24 rounded-pill" />
        </View>
        <View className="flex-row items-center gap-3">
          <Skeleton variant="circle" className="h-10 w-10" />
          <View className="gap-2">
            <Skeleton variant="text" className="w-36" />
            <Skeleton variant="text" className="w-24" />
          </View>
        </View>
        <View className="flex-row gap-3">
          <Skeleton variant="box" className="h-12 flex-1 rounded-btn" />
          <Skeleton variant="box" className="h-12 flex-1 rounded-btn" />
        </View>
      </View>

      {/* Recovery progress */}
      <View className="gap-3">
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="box" className="h-28 w-full rounded-card" />
      </View>

      {/* Quick actions */}
      <View className="flex-row gap-3">
        <Skeleton variant="box" className="h-20 flex-1 rounded-card" />
        <Skeleton variant="box" className="h-20 flex-1 rounded-card" />
        <Skeleton variant="box" className="h-20 flex-1 rounded-card" />
        <Skeleton variant="box" className="h-20 flex-1 rounded-card" />
      </View>

      {/* Today's exercises */}
      <View className="gap-3">
        <Skeleton variant="text" className="w-36" />
        <Skeleton variant="box" className="h-40 w-full rounded-card" />
      </View>
    </View>
  );
}
