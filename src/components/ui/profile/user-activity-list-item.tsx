import React from "react";
import { Text, View } from "react-native";

type UserActivityListItemProps = {
  item: {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
  };
};

const UserActivityListItem = ({ item }: UserActivityListItemProps) => {
  return (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View>
        <Text className="text-base font-semibold">{item.title}</Text>
        <Text className="text-gray-500 text-sm">{item.description}</Text>
      </View>
      <View>
        <Text className="text-gray-500 text-sm">{item.date}</Text>
        <Text className="text-gray-500 text-sm">{item.time}</Text>
      </View>
    </View>
  );
};

export default UserActivityListItem;
