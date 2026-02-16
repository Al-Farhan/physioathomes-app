import React from "react";
import { Text, View } from "react-native";

type TransactionsListItemProps = {
  item: {
    id: number;
    amount: number;
    mode: string;
    date: string;
    time: string;
    type: string;
    status: string;
    description: string;
    category: string;
  };
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <View
      className={`px-2 py-1 rounded-md text-white ${status === "Paid" ? "bg-green-500" : "bg-yellow-500 "}`}
    >
      <Text className="text-white text-xs">{status}</Text>
    </View>
  );
};

const TransactionsListItem = ({ item }: TransactionsListItemProps) => {
  return (
    <View className="flex-row items-start justify-between py-4 border-b border-gray-200">
      <View className="">
        <Text>
          ID: #<Text className="font-semibold">{item.id}</Text>
        </Text>
        <Text>{item.category}</Text>
        <Text className="text-gray-500 text-sm">{item.description}</Text>
        <View>
          <Text className="text-gray-500 text-sm">
            {item.date} at {item.time}
          </Text>
        </View>
      </View>
      <View className="gap-y-2">
        <Text className="font-semibold">₹{item.amount}</Text>
        <StatusBadge status={item.status} />
        <Text className="text-gray-500 text-xs">Mode: {item.mode}</Text>
      </View>
    </View>
  );
};

export default TransactionsListItem;
