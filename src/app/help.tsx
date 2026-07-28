import { colors } from "@/src/theme/tokens";
import { ChevronRight, Mail, Phone } from "lucide-react-native";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

const CARE_TEAM_PHONE = "+919800000000";
const CARE_TEAM_EMAIL = "care@physioathomes.com";

type HelpRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  divider?: boolean;
};

const HelpRow = ({ icon, title, subtitle, onPress, divider }: HelpRowProps) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={`${title}. ${subtitle}`}
    className={`min-h-12 flex-row items-center gap-3 px-4 py-3.5 active:bg-surface-alt ${
      divider ? "border-t border-line" : ""
    }`}
  >
    <View className="h-10 w-10 items-center justify-center rounded-pill bg-primary-50">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-body font-sans-medium text-ink">{title}</Text>
      <Text className="font-sans text-caption text-ink-secondary">
        {subtitle}
      </Text>
    </View>
    <ChevronRight size={18} color={colors.ink.tertiary} strokeWidth={1.75} />
  </Pressable>
);

const Help = () => {
  return (
    <View className="flex-1 bg-surface p-screen">
      <Text className="font-sans text-body text-ink-secondary">
        Questions about a session, payment, or your care plan? Our care team is
        here to help.
      </Text>

      <View className="mt-5 rounded-card border border-line bg-surface">
        <HelpRow
          icon={
            <Phone size={18} color={colors.primary[600]} strokeWidth={1.75} />
          }
          title="Call the care team"
          subtitle="Fastest for anything urgent"
          onPress={() => Linking.openURL(`tel:${CARE_TEAM_PHONE}`)}
        />
        <HelpRow
          icon={
            <Mail size={18} color={colors.primary[600]} strokeWidth={1.75} />
          }
          title="Email us"
          subtitle={CARE_TEAM_EMAIL}
          onPress={() => Linking.openURL(`mailto:${CARE_TEAM_EMAIL}`)}
          divider
        />
      </View>

      <Text className="mt-4 font-sans text-caption text-ink-secondary">
        Available 8 AM – 8 PM, every day.
      </Text>
    </View>
  );
};

export default Help;
