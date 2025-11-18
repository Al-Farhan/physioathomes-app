import Button from "@/src/components/ui/Button";
import { supabase } from "@/src/lib/supabase";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center bg-white p-6">
      <Stack.Screen options={{ title: "Sign in" }} />
      <Text>Email</Text>
      <TextInput
        className="border p-2 rounded-md mt-2 mb-4"
        placeholder="john@gmail.com"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        className="border p-2 rounded-md mt-2 mb-4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View className="flex items-center">
        <Button
          className=""
          text={loading ? "Signing in" : "Sign in"}
          onPress={signInWithEmail}
        />

        <Link href={"/(auth)/sign-up"} className="text-blue-500 underline">
          <Text>Create an account</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignInScreen;
