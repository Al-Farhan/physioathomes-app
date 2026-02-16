import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import UserActivityListItem from "../components/ui/profile/user-activity-list-item";

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
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg">Activity</Text>

      <FlatList
        data={ACTIVITY}
        renderItem={({ item }) => <UserActivityListItem item={item} />}
      />
    </View>
  );
};

export default UserActivity;

const styles = StyleSheet.create({});
