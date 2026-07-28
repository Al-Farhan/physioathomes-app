import ServiceListItem from "@/src/components/services/ServiceListItem";
import { LocationHeader } from "@/src/components/ui/location/location-header";
import { LocationPickerModal } from "@/src/components/ui/location/location-picker-modal";
import { useLocation } from "@/src/providers/LocationProvider";
import { LocationData } from "@/src/types/location";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const servicesData = [
  {
    id: "neuro",
    title: "Neurological Rehab",
    subtitle: "Stroke, Parkinson’s, balance training",
    gradient: ["#1D2671", "#C33764"],
    tags: ["Balance", "Gait", "Strength"],
  },
  {
    id: "ortho",
    title: "Orthopedic Physiotherapy",
    subtitle: "Back pain, knee pain, posture correction",
    gradient: ["#0F2027", "#2C5364"],
    tags: ["Knee", "Back", "Shoulder"],
  },
  {
    id: "sports",
    title: "Sports Injury Treatment",
    subtitle: "Injury recovery & performance mobility",
    gradient: ["#134E5E", "#71B280"],
    tags: ["Mobility", "Recovery", "Performance"],
  },
  {
    id: "pediatric",
    title: "Pediatric Care",
    subtitle: "Development, growth, and behavior",
    gradient: ["#F7971E", "#FFD200"],
    tags: ["Development", "Growth", "Behavior"],
  },
  {
    id: "post-surgery",
    title: "Post-Surgery Recovery",
    subtitle: "Recovery from surgery, joint replacement, and more",
    gradient: ["#141E30", "#243B55"],
    tags: ["Recovery", "Surgery", "Joint Replacement"],
  },
  {
    id: "gynecological",
    title: "Gynecological Care",
    subtitle: "Menstrual health, pelvic floor, and pregnancy",
    gradient: ["#8E2DE2", "#E94057"],
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
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-1">
        {/* Service area — visits happen at the patient's address */}
        <LocationHeader onPress={() => setShowLocationPicker(true)} />
        <FlatList
          data={servicesData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ServiceListItem
                title={item.title}
                subtitle={item.subtitle}
                tags={item.tags}
                gradient={item.gradient}
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
            gap: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
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
