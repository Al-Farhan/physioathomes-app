import { useLocation } from "@/src/providers/LocationProvider";
import { colors } from "@/src/theme/tokens";
import { ChevronRight, LocateFixed, MapPin } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

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

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (onLocationChange) {
      onLocationChange();
    }
  };

  const getStatusText = (): string => {
    switch (status) {
      case "requesting_permission":
        return "Requesting permission…";
      case "fetching_location":
        return "Getting your location…";
      case "fetching_address":
        return "Fetching address…";
      default:
        return "";
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={
        data
          ? `Service area: ${data.address.primaryText || "current location"}. Change location`
          : "Set your location"
      }
      className="min-h-12 flex-row items-center gap-3 rounded-card p-4 active:bg-surface-alt"
    >
      <View className="h-10 w-10 items-center justify-center rounded-pill bg-primary-50">
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primary[600]} />
        ) : isError ? (
          <LocateFixed size={18} color={colors.danger} strokeWidth={1.75} />
        ) : (
          <MapPin size={18} color={colors.primary[600]} strokeWidth={1.75} />
        )}
      </View>

      <View className="flex-1">
        {isLoading ? (
          <>
            <Text className="font-sans text-caption text-ink-secondary">
              Detecting location
            </Text>
            <Text className="mt-0.5 font-sans text-caption text-ink-secondary">
              {getStatusText()}
            </Text>
          </>
        ) : isError ? (
          <>
            <Text className="text-label font-sans-medium text-ink">
              Location unavailable
            </Text>
            <Text
              className="mt-0.5 font-sans text-caption text-ink-secondary"
              numberOfLines={1}
            >
              {error || "Tap to enable location"}
            </Text>
          </>
        ) : data ? (
          <>
            <Text className="font-sans text-caption text-ink-secondary">
              Service area
            </Text>
            <Text
              className="mt-0.5 text-body font-sans-medium text-ink"
              numberOfLines={1}
            >
              {data.address.primaryText || "Current Location"}
            </Text>
            <Text
              className="font-sans text-caption text-ink-secondary"
              numberOfLines={1}
            >
              {data.address.secondaryText || data.address.formattedAddress}
            </Text>
          </>
        ) : (
          <>
            <Text className="text-label font-sans-medium text-ink">
              Set your location
            </Text>
            <Text className="mt-0.5 font-sans text-caption text-ink-secondary">
              Tap to select
            </Text>
          </>
        )}
      </View>

      {isError ? (
        <Pressable
          onPress={refreshLocation}
          accessibilityRole="button"
          accessibilityLabel="Retry detecting location"
          hitSlop={12}
          className="min-h-12 justify-center px-2"
        >
          <Text className="text-label font-sans-medium text-primary-700">
            Retry
          </Text>
        </Pressable>
      ) : (
        !isLoading && (
          <ChevronRight
            size={18}
            color={colors.ink.tertiary}
            strokeWidth={1.75}
          />
        )
      )}
    </Pressable>
  );
}
