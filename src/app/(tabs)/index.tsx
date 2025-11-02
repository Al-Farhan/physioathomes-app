import { ExternalLink } from "@/src/components/external-link";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Hello Physio</Text>
      <ExternalLink href={"https://google.com"} className="text-red-500">
        External Link
      </ExternalLink>
    </View>
  );
}
