import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkLocationPermission,
  getCurrentLocationWithAddress,
  requestLocationPermission,
} from "../lib/services/location-service";
import type {
  LocationData,
  LocationState,
  LocationStatus,
} from "../types/location";

interface LocationContextType extends LocationState {
  refreshLocation: () => Promise<void>;
  clearLocation: () => void;
  setLocationData: (data: LocationData) => void;
}

interface LocationProviderProps {
  children: React.ReactNode;
  autoFetch?: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export function LocationProvider({
  children,
  autoFetch = true,
}: LocationProviderProps) {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [data, setData] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    try {
      setError(null);

      // Step 1: Check/Request permission
      setStatus("requesting_permission");
      let hasPermission = await checkLocationPermission();

      if (!hasPermission) {
        hasPermission = await requestLocationPermission();
      }

      if (!hasPermission) {
        setStatus("permission_denied");
        setError("Location permission is required");
        return;
      }

      //   Step 2: Get coordinates
      setStatus("fetching_location");

      // Step 3: Get address (status updates internally)
      setStatus("fetching_address");
      const locationData = await getCurrentLocationWithAddress();

      // Success!
      setData(locationData);
      setStatus("success");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get location";
      setError(errorMessage);
      setStatus("error");
      console.error("Location fetch error:", errorMessage);
    }
  }, []);

  const refreshLocation = useCallback(async () => {
    await fetchLocation();
  }, [fetchLocation]);

  const clearLocation = useCallback(() => {
    setData(null);
    setStatus("idle");
    setError(null);
  }, []);

  //   Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchLocation();
    }
  }, [autoFetch, fetchLocation]);

  return (
    <LocationContext.Provider
      value={{
        status,
        data,
        error,
        refreshLocation,
        clearLocation,
        setLocationData: setData,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
}
