import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import AuthProvider from "../providers/AuthProvider";
import { LocationProvider } from "../providers/LocationProvider";
import { colors } from "../theme/tokens";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Keep the splash visible until fonts resolve; on failure render anyway
  // with the system font rather than blocking the app.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <AuthProvider>
          <LocationProvider autoFetch={true}>
            <Stack
              screenOptions={{
                headerShadowVisible: false,
                headerTintColor: colors.primary[600],
                headerStyle: { backgroundColor: colors.surface.DEFAULT },
                headerTitleStyle: {
                  fontFamily: "Inter_600SemiBold",
                  color: colors.ink.DEFAULT,
                },
              }}
            >
              <Stack.Screen
                name="(user)"
                options={{
                  title: "Home",
                  headerShown: false,
                }}
              />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="user-profile"
                options={{
                  title: "Profile",
                  headerBackTitle: "Account",
                }}
              />
              <Stack.Screen
                name="user-payments"
                options={{
                  title: "Payments",
                  headerBackTitle: "Account",
                }}
              />
              <Stack.Screen
                name="user-activity"
                options={{
                  title: "My Activity",
                  headerBackTitle: "Account",
                }}
              />
              <Stack.Screen
                name="help"
                options={{
                  title: "Help & Support",
                  headerBackTitle: "Account",
                }}
              />
              <Stack.Screen
                name="notifications"
                options={{
                  title: "Notifications",
                  headerBackTitle: "Home",
                }}
              />
              <Stack.Screen
                name="exercises"
                options={{
                  title: "My Exercises",
                  headerBackTitle: "Home",
                }}
              />
              <Stack.Screen
                name="care-plan"
                options={{
                  title: "Care Plan",
                  headerBackTitle: "Home",
                }}
              />
              <Stack.Screen
                name="track-session"
                options={{
                  title: "Track Session",
                  headerBackTitle: "Home",
                }}
              />
              <Stack.Screen
                name="reschedule"
                options={{
                  title: "Reschedule Session",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="(modals)/service-details"
                options={{
                  presentation: "modal",
                  headerShown: false,
                }}
              />
            </Stack>
            <StatusBar style="dark" />
          </LocationProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
