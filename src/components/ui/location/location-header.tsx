import { useLocation } from "@/src/providers/LocationProvider";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface LocationHeaderProps {
  onPress?: () => void;
  onLocationChange?: () => void;
}

export function LocationHeader({
  onPress,
  onLocationChange,
}: LocationHeaderProps) {
  const { status, data, error, refreshLocation } = useLocation();

  const isLoading = [
    "requesting_permission",
    "fetching_location",
    "fetching_address",
  ].includes(status);
  const isError = status === "error" || status === "permission_denied";

  const handlePress = async () => {
    if (onPress) {
      onPress();
    } else if (onLocationChange) {
      onLocationChange();
    }
  };

  const getStatusText = (): string => {
    switch (status) {
      case "requesting_permission":
        return "Requesting permission...";
      case "fetching_location":
        return "Getting your location...";
      case "fetching_address":
        return "Fetching address...";
      default:
        return "";
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3 bg-white"
    >
      {/* Location Icon */}
      <View className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center mr-3">
        {isLoading ? (
          <ActivityIndicator size="small" color="#10b981" />
        ) : (
          <Ionicons
            name={isError ? "locate-outline" : "location"}
            size={20}
            color={isError ? "#ef4444" : "#10b981"}
          />
        )}
      </View>

      {/* Location Text */}
      <View>
        {isLoading ? (
          <>
            <Text className="text-sm text-gray-500">Detecting location</Text>
            <Text className="text-xs text-gray-400 mt-0.5">
              {getStatusText()}
            </Text>
          </>
        ) : isError ? (
          <>
            <Text className="text-sm font-medium text-red-500">
              Location unavailable
            </Text>
            <Text className="text-xs text-gray-500 mt-0.5">
              {error || "Tap to enable location"}
            </Text>
          </>
        ) : data ? (
          <>
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500">Your location</Text>
              <Ionicons
                name="chevron-down"
                size={14}
                color="#6b7280"
                className="ml-1"
              />
            </View>
            <Text
              className="text-base font-semibold text-gray-900 mt-0.5"
              numberOfLines={1}
            >
              {data.address.primaryText || "Current Location"}
            </Text>
            <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>
              {data.address.secondaryText || data.address.formattedAddress}
            </Text>
          </>
        ) : (
          <>
            <Text className="text-sm text-gray-500">Set your location</Text>
            <Text className="text-xs text-gray-400 mt-0.5">Tap to select</Text>
          </>
        )}
      </View>

      {/* Retry Button for Errors */}
      {isError && (
        <Pressable
          onPress={refreshLocation}
          className="px-3 py-2 bg-emerald-500 rounded-lg"
        >
          <Text className="text-white text-sm font-medium">Retry</Text>
        </Pressable>
      )}

      {/* Change arrow for success */}
      {!isLoading && !isError && data && (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );
}
