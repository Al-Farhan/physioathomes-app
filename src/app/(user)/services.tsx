import ServiceListItem from "@/src/components/services/ServiceListItem";
import { LocationHeader } from "@/src/components/ui/location/location-header";
import { LocationPickerModal } from "@/src/components/ui/location/location-picker-modal";
import { useLocation } from "@/src/providers/LocationProvider";
import { LocationData } from "@/src/types/location";
import { router } from "expo-router";
import {
  Baby,
  Bone,
  Brain,
  Dumbbell,
  Flower2,
  HeartPulse,
  LucideIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const servicesData: {
  id: string;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  tags: string[];
}[] = [
  {
    id: "neuro",
    title: "Neurological Rehab",
    subtitle: "Stroke, Parkinson’s, balance training",
    Icon: Brain,
    tags: ["Balance", "Gait", "Strength"],
  },
  {
    id: "ortho",
    title: "Orthopedic Physiotherapy",
    subtitle: "Back pain, knee pain, posture correction",
    Icon: Bone,
    tags: ["Knee", "Back", "Shoulder"],
  },
  {
    id: "sports",
    title: "Sports Injury Treatment",
    subtitle: "Injury recovery & performance mobility",
    Icon: Dumbbell,
    tags: ["Mobility", "Recovery", "Performance"],
  },
  {
    id: "pediatric",
    title: "Pediatric Care",
    subtitle: "Development, growth, and behavior",
    Icon: Baby,
    tags: ["Development", "Growth", "Behavior"],
  },
  {
    id: "post-surgery",
    title: "Post-Surgery Recovery",
    subtitle: "Recovery from surgery, joint replacement, and more",
    Icon: HeartPulse,
    tags: ["Recovery", "Surgery", "Joint Replacement"],
  },
  {
    id: "gynecological",
    title: "Gynecological Care",
    subtitle: "Menstrual health, pelvic floor, and pregnancy",
    Icon: Flower2,
    tags: ["Menstrual", "Pelvic Floor", "Pregnancy"],
  },
];

const Services = () => {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const { setLocationData } = useLocation();

  const handleLocationSelect = (location: LocationData) => {
    setLocationData(location);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="flex-1">
        <FlatList
          data={servicesData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="mb-4">
              <Text
                className="text-title font-sans-semibold text-ink"
                accessibilityRole="header"
              >
                Services
              </Text>
              <Text className="mt-1 font-sans text-caption text-ink-secondary">
                Every session happens at your home.
              </Text>
              {/* Service area — visits happen at the patient's address */}
              <View className="mt-4 rounded-card border border-line bg-surface">
                <LocationHeader onPress={() => setShowLocationPicker(true)} />
              </View>
            </View>
          }
          renderItem={({ item }) => {
            return (
              <ServiceListItem
                title={item.title}
                subtitle={item.subtitle}
                tags={item.tags}
                Icon={item.Icon}
                onPress={() =>
                  router.push({
                    pathname: "/(modals)/service-details",
                    params: { id: item.id },
                  })
                }
              />
            );
          }}
          contentContainerStyle={{
            gap: 12,
            paddingVertical: 16,
            paddingHorizontal: 20,
          }}
        />
      </View>
      <LocationPickerModal
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onSelectLocation={handleLocationSelect}
      />
    </SafeAreaView>
  );
};

export default Services;
