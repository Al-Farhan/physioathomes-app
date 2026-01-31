import { LOTTIE } from "@/src/assets/lottie";
import ServiceListItem from "@/src/components/services/ServiceListItem";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const servicesData = [
  {
    id: "neuro",
    title: "Neurological Rehab",
    subtitle: "Stroke, Parkinson’s, balance training",
    lottie: LOTTIE.cylinder,
    gradient: ["#1D2671", "#C33764"],
    tags: ["Balance", "Gait", "Strength"],
  },
  {
    id: "ortho",
    title: "Orthopedic Physiotherapy",
    subtitle: "Back pain, knee pain, posture correction",
    lottie: LOTTIE.cylinder,
    gradient: ["#0F2027", "#2C5364"],
    tags: ["Knee", "Back", "Shoulder"],
  },
  {
    id: "sports",
    title: "Sports Injury Treatment",
    subtitle: "Injury recovery & performance mobility",
    lottie: LOTTIE.cylinder,
    gradient: ["#134E5E", "#71B280"],
    tags: ["Mobility", "Recovery", "Performance"],
  },
  {
    id: "pediatric",
    title: "Pediatric Care",
    subtitle: "Development, growth, and behavior",
    lottie: LOTTIE.cylinder,
    gradient: ["#F7971E", "#FFD200"],
    tags: ["Development", "Growth", "Behavior"],
  },
  {
    id: "post-surgery",
    title: "Post-Surgery Recovery",
    subtitle: "Recovery from surgery, joint replacement, and more",
    lottie: LOTTIE.cylinder,
    gradient: ["#141E30", "#243B55"],
    tags: ["Recovery", "Surgery", "Joint Replacement"],
  },
  {
    id: "gynecological",
    title: "Gynecological Care",
    subtitle: "Menstrual health, pelvic floor, and pregnancy",
    lottie: LOTTIE.cylinder,
    gradient: ["#8E2DE2", "#E94057"],
    tags: ["Menstrual", "Pelvic Floor", "Pregnancy"],
  },
];

const Services = () => {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    const next = new Set<string>();
    viewableItems.forEach((v: any) => next.add(v.item.id));
    setActiveIds(next);
  }).current;

  return (
    <SafeAreaView className="bg-white" edges={["top"]}>
      <View>
        <FlatList
          data={servicesData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          renderItem={({ item }) => {
            return (
              <ServiceListItem
                title={item.title}
                subtitle={item.subtitle}
                tags={item.tags}
                gradient={item.gradient}
                lottie={item.lottie}
                isActive={activeIds.has(item.id)}
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
    </SafeAreaView>
  );
};

export default Services;
