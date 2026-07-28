import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type ServiceListItemProps = {
  title: string;
  subtitle: string;
  tags: string[];
  gradient: [string, string] | string[];
  onPress?: () => void;
};

const ServiceListItem = ({
  title,
  subtitle,
  tags,
  gradient,
  onPress,
}: ServiceListItemProps) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.wrap, animatedStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withSpring(0.985, { damping: 14 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 14 }))}
        style={({ pressed }) => [
          styles.pressable,
          pressed && { opacity: 0.98 },
        ]}
      >
        <LinearGradient
          colors={gradient as [string, string]}
          style={styles.card}
        >
          <View style={styles.topRow}>
            <View style={styles.textCol}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle} numberOfLines={2}>
                {subtitle}
              </Text>

              <View style={styles.tagsRow}>
                {tags.slice(0, 3).map((t) => (
                  <View key={t} style={styles.tag}>
                    <Text style={styles.tagText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.cta}>View details</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

export default ServiceListItem;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  pressable: {
    borderRadius: 18,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    overflow: "hidden",
    // soft shadow
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textCol: { flex: 1 },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 6,
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    lineHeight: 18,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  tagText: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
    fontWeight: "600",
  },
  bottomRow: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.14)",
  },
  cta: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 13,
    fontWeight: "700",
  },
});
