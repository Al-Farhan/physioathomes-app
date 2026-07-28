import Button from "@/src/components/ui/Button";
import { supabase } from "@/src/lib/supabase";
import { colors } from "@/src/theme/tokens";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-title font-sans-semibold text-ink">
          Welcome back
        </Text>
        <Text className="mt-1 font-sans text-body text-ink-secondary">
          Sign in to manage your sessions and care plan.
        </Text>

        <View className="mt-7 gap-5">
          <View>
            <Text
              nativeID="email"
              className="mb-2 text-label font-sans-medium text-ink"
            >
              Email
            </Text>
            <TextInput
              accessibilityLabelledBy="email"
              className="min-h-12 rounded-btn border border-line bg-surface px-4 font-sans text-body text-ink focus:border-primary-600"
              placeholder="you@example.com"
              placeholderTextColor={colors.ink.tertiary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
          </View>

          <View>
            <Text
              nativeID="password"
              className="mb-2 text-label font-sans-medium text-ink"
            >
              Password
            </Text>
            <TextInput
              accessibilityLabelledBy="password"
              className="min-h-12 rounded-btn border border-line bg-surface px-4 font-sans text-body text-ink focus:border-primary-600"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
            />
          </View>
        </View>

        <Button
          className="mt-7"
          text={loading ? "Signing in…" : "Sign in"}
          disabled={loading}
          onPress={signInWithEmail}
        />

        <Link
          href={"/(auth)/sign-up"}
          asChild
        >
          <Text
            accessibilityRole="link"
            className="mt-5 py-3 text-center text-label font-sans-medium text-primary-700"
          >
            New here? Create an account
          </Text>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
