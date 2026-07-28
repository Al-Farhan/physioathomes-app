import UserActivityListItem from "@/src/components/ui/profile/user-activity-list-item";
import React from "react";
import { FlatList, Text, View } from "react-native";

const ACTIVITY = [
  {
    id: 1,
    title: "Appointment",
    description: "Appointment with Dr. John Doe",
    date: "2021-01-01",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Booking",
    description: "Booking for the session of February",
    date: "2021-01-02",
    time: "11:00 AM",
  },
];

const UserActivity = () => {
  return (
    <View className="flex-1 bg-surface">
      <FlatList
        data={ACTIVITY}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        ListHeaderComponent={
          <Text
            className="mb-3 text-label font-sans-medium text-ink-secondary"
            accessibilityRole="header"
          >
            Recent activity
          </Text>
        }
        renderItem={({ item, index }) => (
          <View
            className={`border-x border-line bg-surface ${
              index === 0 ? "rounded-t-card border-t" : ""
            } ${
              index === ACTIVITY.length - 1 ? "rounded-b-card border-b" : ""
            }`}
          >
            <UserActivityListItem item={item} divider={index > 0} />
          </View>
        )}
        ListEmptyComponent={
          <Text className="font-sans text-body text-ink-secondary">
            No activity yet.
          </Text>
        }
      />
    </View>
  );
};

export default UserActivity;
