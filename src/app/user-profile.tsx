import Button from "@/src/components/ui/Button";
import { colors } from "@/src/theme/tokens";
import { ChevronDown, CircleUserRound } from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GENDER_OPTIONS = ["Male", "Female", "Others"] as const;

type FieldProps = {
  id: string;
  label: string;
  placeholder?: string;
};

const Field = ({ id, label, placeholder }: FieldProps) => (
  <View>
    <Text nativeID={id} className="mb-2 text-label font-sans-medium text-ink">
      {label}
    </Text>
    <TextInput
      accessibilityLabelledBy={id}
      className="min-h-12 rounded-btn border border-line bg-surface px-4 font-sans text-body text-ink focus:border-primary-600"
      placeholder={placeholder}
      placeholderTextColor={colors.ink.tertiary}
    />
  </View>
);

const UserProfile = () => {
  const [gender, setGender] = useState<string>("");
  const [showGenderPicker, setShowGenderPicker] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Picture */}
        <View className="items-center justify-center">
          <CircleUserRound
            size={96}
            color={colors.ink.tertiary}
            strokeWidth={1}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add profile picture"
            hitSlop={8}
            className="min-h-12 justify-center px-4"
          >
            <Text className="text-label font-sans-medium text-primary-700">
              Add photo
            </Text>
          </Pressable>
        </View>

        {/* User details */}
        <View className="mt-6 gap-5">
          <Field id="full-name" label="Full name *" />
          <Field id="phone-number" label="Phone number *" />
          <Field id="email" label="Email *" />

          {/* Gender picker */}
          <View>
            <Text
              nativeID="gender"
              className="mb-2 text-label font-sans-medium text-ink"
            >
              Gender
            </Text>
            <Pressable
              onPress={() => setShowGenderPicker(true)}
              accessibilityRole="button"
              accessibilityLabel={
                gender ? `Gender: ${gender}. Change` : "Select gender"
              }
              className="min-h-12 flex-row items-center justify-between rounded-btn border border-line bg-surface px-4 active:bg-surface-alt"
            >
              <Text
                className={`font-sans text-body ${
                  gender ? "text-ink" : "text-ink-tertiary"
                }`}
              >
                {gender || "Select gender"}
              </Text>
              <ChevronDown
                size={18}
                color={colors.ink.secondary}
                strokeWidth={1.75}
              />
            </Pressable>

            <Modal
              visible={showGenderPicker}
              transparent
              animationType="fade"
              onRequestClose={() => setShowGenderPicker(false)}
            >
              <Pressable
                className="flex-1 justify-end bg-ink/40"
                onPress={() => setShowGenderPicker(false)}
              >
                <View className="rounded-t-card bg-surface pb-6">
                  <View className="border-b border-line p-4">
                    <Text className="text-center text-body font-sans-semibold text-ink">
                      Select gender
                    </Text>
                  </View>
                  {GENDER_OPTIONS.map((option) => (
                    <Pressable
                      key={option}
                      onPress={() => {
                        setGender(option);
                        setShowGenderPicker(false);
                      }}
                      accessibilityRole="button"
                      accessibilityState={{ selected: gender === option }}
                      accessibilityLabel={option}
                      className={`min-h-12 justify-center border-b border-line px-4 ${
                        gender === option ? "bg-primary-50" : ""
                      }`}
                    >
                      <Text
                        className={`text-center text-body ${
                          gender === option
                            ? "font-sans-medium text-primary-700"
                            : "font-sans text-ink"
                        }`}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                  <Pressable
                    onPress={() => setShowGenderPicker(false)}
                    accessibilityRole="button"
                    accessibilityLabel="Cancel"
                    className="min-h-12 justify-center px-4"
                  >
                    <Text className="text-center text-body font-sans text-ink-secondary">
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            </Modal>
          </View>

          <Field
            id="address-line-1"
            label="Address line 1 *"
            placeholder="Building name, room no., street name"
          />
          <Field id="address-line-2" label="Address line 2" />
          <Field id="city" label="City *" />
          <Field id="state" label="State *" />
          <Field id="pin-code" label="Pin code *" />
        </View>
      </ScrollView>

      {/* Sticky footer save button */}
      <View className="border-t border-line bg-surface p-screen">
        <Button text="Save" accessibilityLabel="Save profile" />
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
