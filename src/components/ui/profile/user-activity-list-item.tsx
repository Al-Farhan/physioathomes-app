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
  divider?: boolean;
};

const UserActivityListItem = ({
  item,
  divider = false,
}: UserActivityListItemProps) => {
  return (
    <View
      className={`flex-row items-center justify-between gap-3 px-4 py-3.5 ${
        divider ? "border-t border-line" : ""
      }`}
      accessibilityLabel={`${item.title}: ${item.description}, ${item.date} at ${item.time}`}
    >
      <View className="flex-1">
        <Text className="text-body font-sans-medium text-ink">
          {item.title}
        </Text>
        <Text className="mt-0.5 font-sans text-caption text-ink-secondary">
          {item.description}
        </Text>
      </View>
      <View className="items-end">
        <Text className="font-sans text-caption text-ink-secondary">
          {item.date}
        </Text>
        <Text className="font-sans text-caption text-ink-secondary">
          {item.time}
        </Text>
      </View>
    </View>
  );
};

export default UserActivityListItem;
