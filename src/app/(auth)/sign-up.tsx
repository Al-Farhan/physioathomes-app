import Button from "@/src/components/ui/Button";
import { supabase } from "@/src/lib/supabase";
import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

const SignUpScreen = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          phone,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
      return;
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center bg-white p-6">
      <Text>Full Name*</Text>
      <TextInput
        className="border p-2 rounded-md mt-2 mb-4"
        placeholderTextColor={"gray"}
        placeholder="John Doe"
        value={fullName}
        onChangeText={setFullName}
      />
      <Text>Phone*</Text>
      <TextInput
        className="border p-2 rounded-md mt-2 mb-4"
        placeholderTextColor={"gray"}
        placeholder="+91 1234566789"
        value={phone}
        onChangeText={setPhone}
      />
      <Text>Email*</Text>
      <TextInput
        className="border p-2 rounded-md mt-2 mb-4"
        placeholderTextColor={"gray"}
        placeholder="john@gmail.com"
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password*</Text>
      <TextInput
        className="border p-2 rounded-md mt-2 mb-4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View className="flex items-center">
        <Button
          className=""
          text={loading ? "Signing up" : "Sign up"}
          onPress={signUpWithEmail}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
