import { initialsOf } from "@/src/lib/format";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

interface AvatarProps {
  name: string;
  photoUrl: string | null;
  /** diameter in dp */
  size?: number;
}

/** Circular photo, or calm initials on primary-50 when no photo exists. */
export function Avatar({ name, photoUrl, size = 40 }: AvatarProps) {
  const style = { width: size, height: size, borderRadius: size / 2 };

  if (photoUrl) {
    return (
      <Image
        source={{ uri: photoUrl }}
        style={style}
        accessibilityIgnoresInvertColors
      />
    );
  }

  return (
    <View className="items-center justify-center bg-primary-50" style={style}>
      <Text
        className="font-semibold text-primary-700"
        style={{ fontSize: size * 0.35 }}
      >
        {initialsOf(name)}
      </Text>
    </View>
  );
}
