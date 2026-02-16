import React from "react";
import { FlatList, Text, View } from "react-native";
import TransactionsListItem from "../components/ui/profile/transactions-list-item";

const TRANSACTIONS = [
  {
    id: 1,
    amount: 100,
    mode: "Online",
    date: "2021-01-01",
    time: "10:00 AM",
    type: "Payment",
    status: "Pending",
    description: "Payment for the month of January",
    category: "Orthopedic Rehabilitation",
  },
  {
    id: 2,
    amount: 200,
    mode: "In-Person",
    date: "2021-01-02",
    time: "11:00 AM",
    type: "Payment",
    status: "Paid",
    description: "Payment for the month of February",
    category: "Orthopedic Rehabilitation",
  },
];

const UserPayments = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg">Transactions</Text>

      <FlatList
        data={TRANSACTIONS}
        renderItem={({ item }) => <TransactionsListItem item={item} />}
      />
    </View>
  );
};

export default UserPayments;
