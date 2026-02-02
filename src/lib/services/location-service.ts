import {
  AddressComponents,
  Coordinates,
  LocationData,
} from "@/src/types/location";
import * as Location from "expo-location";

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

/**
 * Request location permissions from the user
 */

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

/**
 * Check if location permissions is already granted
 */

export async function checkLocationPermission(): Promise<boolean> {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === "granted";
}

/**
 * Get current device coordinates with high accuracy
 */

export async function getCurrentCoordinates(): Promise<Coordinates> {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

/**
 * Get a quick location first, then refine with high accuracy
 * This provides faster initial response
 */

export async function getCoordinatesWithFallback(): Promise<Coordinates> {
  try {
    // Try to get last known location first (instant)
    const lastKnown = await Location.getLastKnownPositionAsync();

    if (lastKnown) {
      // Return last known immediately, but also fetch accurate one
      const quickCoords = {
        latitude: lastKnown.coords.latitude,
        longitude: lastKnown.coords.longitude,
      };

      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      if (lastKnown.timestamp > fiveMinutesAgo) {
        return quickCoords;
      }
    }

    // Get fresh location with high accuracy
    return await getCurrentCoordinates();
  } catch (error) {
    // Fallback to balanced accuracy if high accuracy fails
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }
}

/**
 * Parse Google Geocoding API response into clean address components
 */
function parseGoogleGeocodingResult(results: any[]): AddressComponents {
  const primary = results[0];
  const components = primary.address_components || [];

  const getComponent = (types: string[]): string => {
    const component = components.find((c: any) =>
      types.some((type) => c.types.includes(type)),
    );
    return component?.short_name || "";
  };

  const getShortComponent = (types: string[]): string => {
    const component = components.find((c: any) =>
      types.some((type) => c.types.includes(type)),
    );
    return component?.short_name || "";
  };

  // Find the best display name
  const placeName = results
    .find(
      (r) =>
        r.types.includes("premise") ||
        r.types.includes("establishment") ||
        r.types.includes("point_of_interest"),
    )
    ?.formatted_address?.split(",")[0];

  const area = getComponent([
    "sublocality_level_1",
    "sublocality",
    "neighborhood",
  ]);
  const city = getComponent(["locality", "administrative_area_level_2"]);
  const street = getComponent(["route"]);

  return {
    placeId: primary.place_id,
    formattedAddress: primary.formatted_address,
    primaryText: placeName || area || street || city,
    secondaryText: [area, city].filter(Boolean).join(", "),
    buildingName: getComponent(["premise", "establishment"]),
    flatNumber: getComponent(["subpremise"]),
    streetNumber: getComponent(["street_number"]),
    street,
    area,
    landmark: getComponent(["point_of_interest", "establishment"]),
    city,
    state: getComponent(["administrative_area_level_1"]),
    stateCode: getShortComponent(["administrative_area_level_1"]),
    country: getComponent(["country"]),
    countryCode: getShortComponent(["country"]),
    postalCode: getComponent(["postal_code"]),
  };
}

/**
 * Reverse geocode coordinates to get address using Google API
 */

export async function getAddressFromCoordinates(
  latitude: number,
  longitude: number,
): Promise<AddressComponents> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
  );

  const data = await response.json();

  if (data.status !== "OK" || !data.results?.length) {
    throw new Error(data.error_message || "Unable to fetch address");
  }

  return parseGoogleGeocodingResult(data.results);
}

/**
 * Fallback: Use Expo's built-in geocoding (less accurate but no API key needed)
 */
export async function getAddressFromCoordinatesFallback(
  latitude: number,
  longitude: number,
): Promise<AddressComponents> {
  const [result] = await Location.reverseGeocodeAsync({ latitude, longitude });

  if (!result) {
    throw new Error("Unable to fetch address");
  }

  const area = result.district || result.subregion || "";
  const city = result.city || "";

  return {
    placeId: "",
    formattedAddress: [result.name, result.street, area, city, result.region]
      .filter(Boolean)
      .join(", "),
    primaryText: result.name || area || result.street || "",
    secondaryText: [area, city].filter(Boolean).join(", "),
    buildingName: result.name || "",
    flatNumber: "",
    streetNumber: result.streetNumber || "",
    street: result.street || "",
    area,
    landmark: "",
    city,
    state: result.region || "",
    stateCode: result.region || "",
    country: result.country || "",
    countryCode: result.isoCountryCode || "",
    postalCode: result.postalCode || "",
  };
}

/**
 * Main function: Get current location with address details
 * Tries Google API first, falls back to Expo's geocoding
 */

export async function getCurrentLocationWithAddress(): Promise<LocationData> {
  const coords = await getCoordinatesWithFallback();

  let address: AddressComponents;

  try {
    // Try Google API first for better accuracy
    address = await getAddressFromCoordinates(
      coords.latitude,
      coords.longitude,
    );
  } catch (error) {
    console.warn("Google geocoding failed, using fallback:", error);
    // Fallback to Expo's geocoding
    address = await getAddressFromCoordinatesFallback(
      coords.latitude,
      coords.longitude,
    );
  }
  return {
    coords,
    address,
    timestamp: Date.now(),
  };
}
