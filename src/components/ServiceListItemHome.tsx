import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type ServiceListItemProp = {
  item: string;
};

const ServiceListItemHome = ({ item }: ServiceListItemProp) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={[animatedStyle]} className="flex-1">
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.985, { damping: 14 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 14 }))}
        style={({ pressed }) => [pressed && { opacity: 0.98 }]}
        onPress={() => router.push("/(user)/services")}
        className="bg-gray-100 rounded-md flex-1 justify-between items-center px-2 py-4"
      >
        <Image
          source={require("@/assets/images/services/back-pain.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text className="text-gray-900 text-center">{item}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default ServiceListItemHome;
