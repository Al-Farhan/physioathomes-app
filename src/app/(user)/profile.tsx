import Button from "@/src/components/ui/Button";
import HorizontalLine from "@/src/components/ui/HorizontalLine";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Href, Link } from "expo-router";
import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  LucideIcon,
  SquareChartGantt,
  User,
} from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuItemProps = {
  href: Href;
  icon: LucideIcon;
  label: string;
};

const MenuItem = ({ href, icon: Icon, label }: MenuItemProps) => (
  <Link href={href} asChild>
    <Pressable className="px-2 py-4 flex-row items-center justify-between">
      <View className="flex-row items-center gap-x-2">
        <Icon size={20} color="gray" />
        <Text className="text-gray-600 text-lg">{label}</Text>
      </View>
      <ChevronRight size={20} color="gray" />
    </Pressable>
  </Link>
);

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
    <SafeAreaView className="flex-1 items-center justify-center gap-y-2 bg-white">
      <View className="flex-1 w-full max-w-[26rem] rounded-lg shadow-black bg-white">
        <View className="px-2">
          <Text className="text-2xl font-bold py-4">Account</Text>
        </View>
        <HorizontalLine />
        <MenuItem href="/user-profile" icon={User} label="Profile" />
        <HorizontalLine />
        <MenuItem href="/user-payments" icon={CreditCard} label="Payments" />
        <HorizontalLine />
        <MenuItem href="/user-activity" icon={SquareChartGantt} label="My Activity" />
        <HorizontalLine />
        <MenuItem href="/help" icon={HelpCircle} label="Help & Support" />
        <HorizontalLine />
        <View className="px-2 py-4 ">
          <Pressable
            className="border border-gray-400 px-2 py-3 items-center"
            onPress={() => supabase.auth.signOut()}
          >
            <Text className="text-red-500">Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
