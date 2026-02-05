import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import AuthProvider from "../providers/AuthProvider";
import { LocationProvider } from "../providers/LocationProvider";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <AuthProvider>
          <LocationProvider autoFetch={true}>
            <Stack>
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
