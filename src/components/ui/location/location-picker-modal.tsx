import { useLocation } from "@/src/providers/LocationProvider";
import type { LocationData, PlacePrediction } from "@/src/types/location";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation?: (location: LocationData) => void;
}

export function LocationPickerModal({
  visible,
  onClose,
  onSelectLocation,
}: LocationPickerModalProps) {
  const { data: currentLocation, refreshLocation } = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const debounceRef = useRef<number | null>(null);

  //   Search for places using Google Places Autocomplete
  const searchPlaces = useCallback(
    async (query: string) => {
      if (query.length < 2) {
        setPredictions([]);
        return;
      }

      setIsSearching(true);

      try {
        // Add location bias if we have current location
        const locationBias = currentLocation?.coords
          ? `&location=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&radius=50000`
          : "";

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}${locationBias}&components=country:in`,
        );

        const data = await response.json();

        if (data.status === "OK") {
          setPredictions(data.predictions);
        } else {
          setPredictions([]);
        }
      } catch (error) {
        console.error("Place search error:", error);
        setPredictions([]);
      } finally {
        setIsSearching(false);
      }
    },
    [currentLocation?.coords],
  );

  //   Handle search input with debouncing
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlaces(text);
    }, 300);
  };

  //   Get place details and select location
  const handleSelectPrediction = async (prediction: PlacePrediction) => {
    Keyboard.dismiss();
    setIsSelecting(true);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=formatted_address,geometry,address_components,name&key=${GOOGLE_MAPS_API_KEY}`,
      );

      const data = await response.json();

      if (data.status === "OK") {
        const result = data.result;

        const locationData: LocationData = {
          coords: {
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
          },
          address: {
            placeId: prediction.place_id,
            formattedAddress: result.formatted_address,
            primaryText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text,
            buildingName: result.name || "",
            flatNumber: "",
            streetNumber: "",
            street: "",
            area:
              prediction.structured_formatting.secondary_text.split(",")[0] ||
              "",
            landmark: "",
            city: "",
            state: "",
            stateCode: "",
            country: "",
            countryCode: "",
            postalCode: "",
          },
          timestamp: Date.now(),
        };

        onSelectLocation?.(locationData);
        handleClose();
      }
    } catch (error) {
      console.error("Place details error:", error);
    } finally {
      setIsSelecting(false);
    }
  };

  //   Use current GPS location
  const handleUseCurrentLocation = async () => {
    Keyboard.dismiss();
    await refreshLocation();
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setPredictions([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-gray-100 pt-12">
          <TouchableOpacity onPress={handleClose} className="p-2 -ml-2">
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="flex-1 text-lg font-semibold text-gray-900 text-center">
            Select Location
          </Text>
          <View className="w-10" />
        </View>

        {/* Search Input */}
        <View className="px-4 py-3">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-900"
              placeholder="Search for area, street name..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={handleSearchChange}
              autoFocus
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery("");
                  setPredictions([]);
                }}
              >
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Current Location Option */}
        <TouchableOpacity
          onPress={handleUseCurrentLocation}
          className="flex-row items-center p-4 border-b border-gray-100"
        >
          <View className="w-12 h-12 rounded-full bg-emerald-50 items-center justify-center">
            <Ionicons name="locate" size={22} color="#10b981" />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-base font-medium text-emerald-600">
              Use current location
            </Text>
            <Text className="text-sm text-gray-500 mt-0.5">Using GPS</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
        </TouchableOpacity>

        {/* Divider */}
        {predictions.length > 0 && (
          <View className="px-4 py-2 bg-gray-50">
            <Text className="text-xs font-medium text-gray-500 uppercase">
              Search Results
            </Text>
          </View>
        )}

        {/* Loading indicator */}
        {isSearching && (
          <View className="py-4 items-center">
            <ActivityIndicator size="small" color="#10b981" />
          </View>
        )}

        {/* Selection loading overlay */}
        {isSelecting && (
          <View className="absolute inset-0 bg-white/80 items-center justify-center z-10">
            <ActivityIndicator size="large" color="#10b981" />
            <Text className="mt-3 text-gray-600">
              Getting location details...
            </Text>
          </View>
        )}

        {/* Predictions List */}
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectPrediction(item)}
              className="flex-row items-center p-4 border-b border-gray-50"
            >
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <Ionicons name="location-outline" size={18} color="#6b7280" />
              </View>
              <View className="flex-1 ml-3">
                <Text
                  className="text-base font-medium text-gray-900"
                  numberOfLines={1}
                >
                  {item.structured_formatting.main_text}
                </Text>
                <Text
                  className="text-sm text-gray-500 mt-0.5"
                  numberOfLines={1}
                >
                  {item.structured_formatting.secondary_text}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            searchQuery.length >= 2 && !isSearching ? (
              <View className="py-8 items-center">
                <Ionicons name="search-outline" size={40} color="#d1d5db" />
                <Text className="mt-3 text-gray-500">No results found</Text>
              </View>
            ) : null
          }
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}
