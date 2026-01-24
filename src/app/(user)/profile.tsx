import Button from "@/src/components/ui/Button";
import HorizontalLine from "@/src/components/ui/HorizontalLine";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { session, profile, loading } = useAuth();

  console.log("Profile:", JSON.stringify(profile, null, 2));
  console.log("Session:", JSON.stringify(session?.user, null, 2));

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Link href={"/(auth)/sign-in"} asChild>
          <Button text="Log in or sign up" />
        </Link>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 gap-y-2">
      <View className="flex-1 w-full max-w-[26rem] rounded-lg shadow-black bg-white">
        <View className="px-2">
          <Text className="text-2xl font-bold py-4">Profile</Text>
        </View>
        <HorizontalLine />
        <View className="px-2 py-4">
          <Text className="text-gray-600 text-lg">Name</Text>
          <Text className="font-semibold text-xl">Farhan Shaikh</Text>
        </View>
        <HorizontalLine />
        <View className="px-2 py-4">
          <Text className="text-gray-600 text-lg">Email</Text>
          <Text className="font-semibold text-xl">shaikhfarhan@gmail.com</Text>
        </View>
        <HorizontalLine />
        <View className="px-2 py-4">
          <Text className="text-gray-600 text-lg">Phone</Text>
          <Text className="font-semibold text-xl">+919702055729</Text>
        </View>
        <HorizontalLine />
        <View className="px-2 py-4">
          <Text className="text-gray-600 text-lg">Address</Text>
          <Text className="font-semibold text-xl">
            J 1031, Akshar Business Park, Sector 25, Near APMC Market, Vashi,
            400703
          </Text>
        </View>
        <HorizontalLine />
      </View>
      <Button
        type="outline"
        text="Sign out"
        onPress={() => supabase.auth.signOut()}
      />
    </SafeAreaView>
  );
};

export default Profile;
