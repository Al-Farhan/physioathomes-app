import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

type ServiceListItemProp = {
  item: string;
};

const ServiceListItem = ({ item }: ServiceListItemProp) => {
  return (
    <Link href="/(user)/explore" asChild>
      <Pressable className="bg-gray-100 rounded-md flex-1 justify-between items-center px-2 py-4">
        <Image
          source={require("@/assets/images/services/back-pain.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text className="text-gray-900 text-center">{item}</Text>
      </Pressable>
    </Link>
  );
};

export default ServiceListItem;
