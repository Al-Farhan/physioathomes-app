import { colors } from "@/src/theme/tokens";
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
  divider?: boolean;
};

// Status color carries state via the dot; the label stays readable (AA).
const StatusBadge = ({ status }: { status: string }) => {
  const dotColor = status === "Paid" ? colors.success : colors.warning;
  return (
    <View className="flex-row items-center gap-1.5 self-end rounded-pill border border-line px-2.5 py-1">
      <View
        className="h-2 w-2 rounded-pill"
        style={{ backgroundColor: dotColor }}
      />
      <Text className="text-caption font-sans-medium text-ink-secondary">
        {status}
      </Text>
    </View>
  );
};

const TransactionsListItem = ({
  item,
  divider = false,
}: TransactionsListItemProps) => {
  return (
    <View
      className={`flex-row items-start justify-between gap-3 px-4 py-3.5 ${
        divider ? "border-t border-line" : ""
      }`}
      accessibilityLabel={`${item.category}, ${item.amount} rupees, ${item.status}, ${item.date} at ${item.time}`}
    >
      <View className="flex-1">
        <Text className="text-body font-sans-medium text-ink">
          {item.category}
        </Text>
        <Text className="mt-0.5 font-sans text-caption text-ink-secondary">
          {item.description}
        </Text>
        <Text className="mt-1 font-sans text-caption text-ink-secondary">
          {item.date} at {item.time} · #{item.id}
        </Text>
      </View>
      <View className="items-end gap-1.5">
        <Text className="text-body font-sans-semibold text-ink">
          ₹{item.amount}
        </Text>
        <StatusBadge status={item.status} />
        <Text className="font-sans text-caption text-ink-secondary">
          {item.mode}
        </Text>
      </View>
    </View>
  );
};

export default TransactionsListItem;
