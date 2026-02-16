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

const UserProfile = () => {
  const [gender, setGender] = useState<string>("");
  const [showGenderPicker, setShowGenderPicker] = useState<boolean>(false);

  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      <ScrollView
        className="p-4 bg-white"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Profile Picture */}
        <View className="items-center justify-center">
          <CircleUserRound size={100} color="gray" strokeWidth={1} />
          <Text className="text-gray-500 text-sm">ADD PICTURE</Text>
        </View>

        {/* User details */}
        <View className="mt-12 gap-y-6">
          {/* Full Name */}
          <View>
            <Text nativeID="full-name" className="text-gray-500 text-sm">
              Full Name *
            </Text>
            <TextInput
              accessibilityLabelledBy={"full-name"}
              className="border-b py-1 text-lg border-gray-300 focus:border-black"
            />
          </View>
          {/* Phone Number */}
          <View>
            <Text nativeID="phone-number" className="text-gray-500 text-sm">
              Phone Number *
            </Text>
            <TextInput
              accessibilityLabelledBy={"phone-number"}
              className="border-b py-1 text-lg border-gray-300 focus:border-black"
            />
          </View>
          {/* Email */}
          <View>
            <Text nativeID="email" className="text-gray-500 text-sm">
              Email *
            </Text>
            <TextInput
              accessibilityLabelledBy={"email"}
              className="border-b py-1 text-lg border-gray-300 focus:border-black"
            />
          </View>
          {/* Gender picker start */}
          <View>
            <Text nativeID="gender" className="text-gray-500 text-sm">
              Gender
            </Text>
            <Pressable
              onPress={() => setShowGenderPicker(true)}
              className="border-b py-1 border-gray-300 flex-row items-center justify-between"
            >
              <Text
                className={`${gender ? "text-black text-lg" : "text-gray-400 text-sm"}`}
              >
                {gender || "Select Gender"}
              </Text>
              <ChevronDown size={20} color="gray" />
            </Pressable>

            <Modal
              visible={showGenderPicker}
              transparent
              animationType="fade"
              onRequestClose={() => setShowGenderPicker(false)}
            >
              <Pressable
                className="flex-1 bg-black/50 justify-end"
                onPress={() => setShowGenderPicker(false)}
              >
                <View className="bg-white rounded-t-2xl">
                  <View className="p-4 border-b border-gray-200">
                    <Text className="text-lg font-semibold text-center">
                      Select Gender
                    </Text>
                  </View>
                  {GENDER_OPTIONS.map((option) => (
                    <Pressable
                      key={option}
                      onPress={() => {
                        setGender(option);
                        setShowGenderPicker(false);
                      }}
                      className={`p-4 border-b border-gray-100 ${
                        gender === option ? "bg-gray-100" : ""
                      }`}
                    >
                      <Text
                        className={`text-lg text-center ${
                          gender === option ? "font-semibold" : ""
                        }`}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                  <Pressable
                    onPress={() => setShowGenderPicker(false)}
                    className="p-4 mb-4"
                  >
                    <Text className="text-lg text-center text-gray-500">
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            </Modal>
          </View>
          {/* Gender picker end */}

          {/* Address line 1 */}
          <View>
            <Text nativeID="address-line-1" className="text-gray-500 text-sm">
              Address Line 1 *
            </Text>
            <TextInput
              accessibilityLabelledBy={"address-line-1"}
              className="border-b py-1 text-lg border-gray-300 focus:border-black placeholder:text-gray-400"
              placeholder="Building Name, Room No., Street Name, etc."
            />
          </View>
          {/* Address line 2 */}
          <View>
            <Text nativeID="address-line-2" className="text-gray-500 text-sm">
              Address Line 2
            </Text>
            <TextInput
              accessibilityLabelledBy={"address-line-2"}
              className="border-b py-1 text-lg border-gray-300 focus:border-black"
            />
          </View>
          {/* City */}
          <View>
            <Text nativeID="city" className="text-gray-500 text-sm">
              City *
            </Text>
            <TextInput
              accessibilityLabelledBy={"city"}
              className="border-b py-1 text-lg border-gray-300 focus:border-black"
            />
          </View>
          {/* State */}
          <View>
            <Text nativeID="state" className="text-gray-500 text-sm">
              State *
            </Text>
            <TextInput
              accessibilityLabelledBy={"state"}
              className="border-b py-1 text-lg border-gray-300 focus:border-black"
            />
          </View>
          {/* Pin Code */}
          <View>
            <Text nativeID="pin-code" className="text-gray-500 text-sm">
              Pin Code *
            </Text>
            <TextInput
              accessibilityLabelledBy={"pin-code"}
              className="border-b py-1 text-lg border-gray-300 focus:border-black"
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer Save Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <Pressable className="bg-black p-4 rounded-lg items-center">
          <Text className="text-white font-semibold text-lg">Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
