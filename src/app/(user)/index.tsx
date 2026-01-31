import ServiceListItem from "@/src/components/ServiceListItemHome";
import Button from "@/src/components/ui/Button";
import { useAuth } from "@/src/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
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
  const [user, setUser] = useState<any>(null);
  const [userIcon, setUserIcon] = useState("G");
  const { loading, session } = useAuth();

  useEffect(() => {
    if (session) {
      setUser(session?.user?.user_metadata);

      const userName = session?.user?.user_metadata?.fullName;
      if (userName) {
        const [firstLetter, lastLetter] = userName.split(" ");
        setUserIcon(`${firstLetter[0]}${lastLetter[0]}`);
      }
    }
  }, [session]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* User Icon and Name */}
        {session ? (
          <Link href="/(user)/profile" asChild>
            <Pressable className="px-4" android_ripple={{ color: "gray" }}>
              <View className="flex-row items-center gap-2">
                <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center">
                  <Text className="text-xl text-center">{userIcon}</Text>
                </View>
                <Text className="text-lg font-medium text-gray-700">
                  {user?.fullName}
                </Text>
              </View>
            </Pressable>
          </Link>
        ) : (
          <View className="px-4">
            <View className="flex-row items-center gap-2">
              <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center">
                <Text className="text-xl text-center">G</Text>
              </View>
              <Text className="text-lg font-medium text-gray-700">Guest</Text>
            </View>
          </View>
        )}

        {/* Hero Section */}
        <View className="flex w-full px-4">
          {/* Search */}
          <View className="w-full py-2 mb-4">
            <View className="rounded-md">
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
                  className="border rounded-md p-2 py-4 pl-10"
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
                className="bg-gray-100 p-2 py-4 mt-2 rounded-md flex-1 items-center"
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

        {/* Small videos auto play */}
        <View className="px-4 mt-4 w-full">
          <Text className="text-md mb-2 text-gray-700">
            Real lives, real impact
          </Text>
          <FlatList
            data={[1, 2, 3, 4]}
            horizontal
            contentContainerStyle={{ gap: 10 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View className="bg-black rounded-md w-48 h-72">
                  <Text>{item}</Text>
                </View>
              );
            }}
          />
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
