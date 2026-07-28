import TransactionsListItem from "@/src/components/ui/profile/transactions-list-item";
import React from "react";
import { FlatList, Text, View } from "react-native";

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
    <View className="flex-1 bg-surface">
      <FlatList
        data={TRANSACTIONS}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        ListHeaderComponent={
          <Text
            className="mb-3 text-label font-sans-medium text-ink-secondary"
            accessibilityRole="header"
          >
            Transactions
          </Text>
        }
        renderItem={({ item, index }) => (
          <View
            className={`border-x border-line bg-surface ${
              index === 0 ? "rounded-t-card border-t" : ""
            } ${
              index === TRANSACTIONS.length - 1
                ? "rounded-b-card border-b"
                : ""
            }`}
          >
            <TransactionsListItem item={item} divider={index > 0} />
          </View>
        )}
        ListEmptyComponent={
          <Text className="font-sans text-body text-ink-secondary">
            No transactions yet.
          </Text>
        }
      />
    </View>
  );
};

export default UserPayments;
