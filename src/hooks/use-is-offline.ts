import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

/**
 * True when the device has no usable connection. `isInternetReachable` is
 * null while NetInfo is still probing — treat that as online to avoid
 * flashing the offline banner on startup.
 */
export function useIsOffline(): boolean {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      setIsOffline(
        state.isConnected === false || state.isInternetReachable === false,
      );
    });
  }, []);

  return isOffline;
}
