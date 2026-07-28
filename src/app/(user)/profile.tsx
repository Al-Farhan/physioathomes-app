import { Avatar } from "@/src/components/home/avatar";
import Skeleton from "@/src/components/skeleton/skeleton";
import Button from "@/src/components/ui/Button";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { colors } from "@/src/theme/tokens";
import { Href, Link } from "expo-router";
import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  LucideIcon,
  SquareChartGantt,
  User,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuItemProps = {
  href: Href;
  icon: LucideIcon;
  label: string;
  divider?: boolean;
};

const MenuItem = ({ href, icon: Icon, label, divider = false }: MenuItemProps) => (
  <Link href={href} asChild>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`min-h-12 flex-row items-center justify-between px-4 py-3.5 active:bg-surface-alt ${
        divider ? "border-t border-line" : ""
      }`}
    >
      <View className="flex-row items-center gap-3">
        <Icon size={20} color={colors.ink.secondary} strokeWidth={1.75} />
        <Text className="font-sans text-body text-ink">{label}</Text>
      </View>
      <ChevronRight size={18} color={colors.ink.tertiary} strokeWidth={1.75} />
    </Pressable>
  </Link>
);

const Profile = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
        <View className="gap-6 p-screen">
          <View className="flex-row items-center gap-4">
            <Skeleton variant="circle" className="h-14 w-14" />
            <View className="gap-2">
              <Skeleton variant="box" className="h-6 w-40" />
              <Skeleton variant="text" className="w-52" />
            </View>
          </View>
          <Skeleton variant="box" className="h-56 w-full rounded-card" />
          <Skeleton variant="box" className="h-12 w-full rounded-card" />
        </View>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface p-screen">
        <Text className="text-title font-sans-semibold text-ink">
          Your account
        </Text>
        <Text className="mt-1 text-center font-sans text-body text-ink-secondary">
          Sign in to see your sessions, care plan, and payments.
        </Text>
        <Link href={"/(auth)/sign-in"} asChild>
          <Button text="Log in or sign up" className="mt-6 self-stretch" />
        </Link>
      </SafeAreaView>
    );
  }

  const fullName: string = session.user?.user_metadata?.fullName ?? "Patient";
  const email = session.user?.email;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="gap-6 p-screen">
        {/* Account header */}
        <View className="flex-row items-center gap-4">
          <Avatar name={fullName} photoUrl={null} size={56} />
          <View className="flex-1">
            <Text className="text-title font-sans-semibold text-ink">
              {fullName}
            </Text>
            {email && (
              <Text
                className="font-sans text-caption text-ink-secondary"
                numberOfLines={1}
              >
                {email}
              </Text>
            )}
          </View>
        </View>

        {/* Menu */}
        <View className="rounded-card border border-line bg-surface">
          <MenuItem href="/user-profile" icon={User} label="Profile" />
          <MenuItem
            href="/user-payments"
            icon={CreditCard}
            label="Payments"
            divider
          />
          <MenuItem
            href="/user-activity"
            icon={SquareChartGantt}
            label="My Activity"
            divider
          />
          <MenuItem href="/help" icon={HelpCircle} label="Help & Support" divider />
        </View>

        {/* Sign out */}
        <View className="rounded-card border border-line bg-surface">
          <Pressable
            onPress={() => supabase.auth.signOut()}
            accessibilityRole="button"
            accessibilityLabel="Sign out"
            className="min-h-12 flex-row items-center gap-3 px-4 py-3.5 active:bg-surface-alt"
          >
            <LogOut size={20} color={colors.danger} strokeWidth={1.75} />
            <Text className="text-body font-sans-medium text-danger">
              Sign out
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
