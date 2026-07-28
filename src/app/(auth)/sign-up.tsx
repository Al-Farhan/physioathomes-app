import Button from "@/src/components/ui/Button";
import { supabase } from "@/src/lib/supabase";
import { colors } from "@/src/theme/tokens";
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

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "words";
  autoComplete?: React.ComponentProps<typeof TextInput>["autoComplete"];
  textContentType?: React.ComponentProps<typeof TextInput>["textContentType"];
};

const Field = ({ id, label, ...inputProps }: FieldProps) => (
  <View>
    <Text
      nativeID={id}
      className="mb-2 text-label font-sans-medium text-ink"
    >
      {label}
    </Text>
    <TextInput
      accessibilityLabelledBy={id}
      className="min-h-12 rounded-btn border border-line bg-surface px-4 font-sans text-body text-ink focus:border-primary-600"
      placeholderTextColor={colors.ink.tertiary}
      {...inputProps}
    />
  </View>
);

const SignUpScreen = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    try {
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
          Create your account
        </Text>
        <Text className="mt-1 font-sans text-body text-ink-secondary">
          Book home physiotherapy and follow your recovery in one place.
        </Text>

        <View className="mt-7 gap-5">
          <Field
            id="full-name"
            label="Full name *"
            placeholder="Full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
          />
          <Field
            id="phone"
            label="Phone *"
            placeholder="+91 12345 66789"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
          />
          <Field
            id="email"
            label="Email *"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
          />
          <Field
            id="password"
            label="Password *"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
          />
        </View>

        <Button
          className="mt-7"
          text={loading ? "Signing up…" : "Sign up"}
          disabled={loading}
          onPress={signUpWithEmail}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
