import { colors } from "@/src/theme/tokens";
import type { Therapist } from "@/src/types/home";
import { MessageCircle, Phone, Star } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Avatar } from "./avatar";
import { SectionTitle } from "./section-title";

interface TherapistCardProps {
  therapist: Therapist;
  onMessage: () => void;
  onCall: () => void;
}

/** Continuity of care: the patient's assigned physiotherapist. */
export function TherapistCard({
  therapist,
  onMessage,
  onCall,
}: TherapistCardProps) {
  return (
    <View>
      <SectionTitle title="Your physiotherapist" />
      <View className="rounded-card border border-line bg-surface p-5">
        <View className="flex-row items-center gap-4">
          <Avatar name={therapist.name} photoUrl={therapist.photoUrl} size={56} />
          <View className="flex-1">
            <Text className="text-body font-sans-semibold text-ink">
              {therapist.name}
            </Text>
            <Text className="font-sans text-caption text-ink-secondary">
              {therapist.credentials} · {therapist.specialization}
            </Text>
            <View className="mt-1 flex-row items-center gap-1">
              <Star size={14} color={colors.warning} strokeWidth={1.75} />
              <Text className="text-caption font-sans-medium text-ink-secondary">
                {therapist.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row gap-3">
          <Pressable
            onPress={onMessage}
            accessibilityRole="button"
            accessibilityLabel={`Message ${therapist.name}`}
            className="min-h-12 flex-1 flex-row items-center justify-center gap-2 rounded-btn border border-line bg-surface active:bg-surface-alt"
          >
            <MessageCircle
              size={18}
              color={colors.ink.DEFAULT}
              strokeWidth={1.75}
            />
            <Text className="text-body font-sans-medium text-ink">Message</Text>
          </Pressable>
          <Pressable
            onPress={onCall}
            accessibilityRole="button"
            accessibilityLabel={`Call ${therapist.name}`}
            className="min-h-12 flex-1 flex-row items-center justify-center gap-2 rounded-btn border border-line bg-surface active:bg-surface-alt"
          >
            <Phone size={18} color={colors.ink.DEFAULT} strokeWidth={1.75} />
            <Text className="text-body font-sans-medium text-ink">Call</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
