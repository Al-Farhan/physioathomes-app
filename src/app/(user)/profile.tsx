import Button from "@/src/components/ui/Button";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { session } = useAuth();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      {!session && (
        <Link href={"/(auth)/sign-in"} asChild>
          <Button text="Log in or sign up" />
        </Link>
      )}

      {session && (
        <Button
          type="outline"
          text="Sign out"
          onPress={() => supabase.auth.signOut()}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
