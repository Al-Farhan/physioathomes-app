import { useAuth } from "@/src/providers/AuthProvider";
import { colors } from "@/src/theme/tokens";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }
  return (
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
      <Stack.Screen name="sign-in" options={{ title: "Sign in" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign up" }} />
    </Stack>
  );
}
