import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const services = [
  "Neurological Rehab",
  "Post-Surgery Recovery",
  "Pediatric Care",
  "Orthopedic Physiotherapy",
  "Sports Injury Treatment",
  "Gynecological Care",
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center">
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
                style={{ position: "absolute", left: 12, top: 10, zIndex: 1 }}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor={"gray"}
                className="rounded-md p-2 py-3 pl-10"
              />
            </View>
          </View>
        </View>

        {/* Hero content */}
        <FlatList
          data={services}
          renderItem={({ item }) => {
            return (
              <View className="bg-gray-100 rounded-md flex-1 justify-between items-center px-2 py-4">
                <Image
                  source={require("@/assets/images/services/back-pain.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text className="text-gray-900 text-center">{item}</Text>
              </View>
            );
          }}
          numColumns={2}
          contentContainerStyle={{ gap: 10, paddingVertical: 10 }} // Style between rows
          columnWrapperStyle={{ gap: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}
