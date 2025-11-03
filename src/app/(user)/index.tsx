import ServiceListItem from "@/src/components/ServiceListItem";
import Button from "@/src/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const services = [
  "Neurological Rehab",
  "Post-Surgery Recovery",
  "Pediatric Care",
  "Orthopedic Physiotherapy",
  "Sports Injury Treatment",
  "Gynecological Care",
];

const features: Array<{
  icon: IconName;
  title: string;
  description: string;
}> = [
  {
    icon: "person-outline",
    title: "Expert Therapists",
    description:
      "We match you with a physiotherapist whose expertise best suits your specific condition.",
  },
  {
    icon: "home-outline",
    title: "Care Where You Need It Most",
    description:
      "We provide treatment in the comfort of your own environment, ensuring healing when travel isn't possible.",
  },
  {
    icon: "shield-outline",
    title: "Tailored Recovery Plans",
    description:
      "Every session is carefully designed to match your medical requirements and recovery goals.",
  },
  {
    icon: "people-outline",
    title: "Addressing the Root Cause",
    description:
      "We focus on long-term healing by treating the underlying issue, not just easing the discomfort.",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Hero Section */}
        <View className="flex w-full bg-white px-4">
          {/* Search */}
          <View className="w-full py-2 mb-4">
            <View className="bg-white shadow-md rounded-md">
              <View className="relative">
                <Ionicons
                  name="search"
                  size={18}
                  color={"gray"}
                  style={{ position: "absolute", left: 12, top: 13, zIndex: 1 }}
                />
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={"gray"}
                  className="rounded-md p-2 py-4 pl-10"
                />
              </View>
            </View>
          </View>

          {/* Hero content */}
          <FlatList
            data={services}
            renderItem={({ item }) => {
              return <ServiceListItem item={item} />;
            }}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 10, paddingVertical: 10 }} // Style between rows
            columnWrapperStyle={{ gap: 10 }}
          />
        </View>

        {/* Home body */}
        <View className="px-4 mt-4 w-full">
          {/* Why choose us */}
          <View className="">
            {features.map((item, index) => (
              <View
                key={index}
                className="bg-white p-2 py-4 mt-2 rounded-md flex-1 items-center"
              >
                <Ionicons name={item.icon} size={30} />
                <Text className="text-center text-lg font-medium">
                  {item.title}
                </Text>
                <Text className="text-center px-4 text-gray-700">
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom floating Button */}
      <View className="absolute bottom-2 w-full items-center">
        <Button
          text="Book now"
          onPress={() => console.info("Book now button pressed")}
        />
      </View>
    </SafeAreaView>
  );
}
