import { useAuth } from "@/src/providers/AuthProvider";
import { colors } from "@/src/theme/tokens";
import { Redirect, router, Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable } from "react-native";

// The auth group is a nested stack, so its first screen has no back button of
// its own — this pops the root stack back to the tabs instead.
const BackToAppButton = () => (
  <Pressable
    onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
    accessibilityRole="button"
    accessibilityLabel="Go back"
    hitSlop={12}
    className="min-h-12 min-w-12 items-center justify-center"
  >
    <ChevronLeft size={26} color={colors.primary[600]} strokeWidth={2} />
  </Pressable>
);

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
      <Stack.Screen
        name="sign-in"
        options={{ title: "Sign in", headerLeft: () => <BackToAppButton /> }}
      />
      <Stack.Screen name="sign-up" options={{ title: "Sign up" }} />
    </Stack>
  );
}
