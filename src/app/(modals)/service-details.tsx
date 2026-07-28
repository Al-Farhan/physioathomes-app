import { colors } from "@/src/theme/tokens";
import { router, useLocalSearchParams } from "expo-router";
import {
  Baby,
  Bone,
  Brain,
  Check,
  Dumbbell,
  Flower2,
  HeartPulse,
  LucideIcon,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Ids match the services list in app/(user)/services.tsx.
type ServiceId =
  | "neuro"
  | "ortho"
  | "sports"
  | "pediatric"
  | "post-surgery"
  | "gynecological";

type ServiceDetails = {
  id: ServiceId;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  tags: string[];
  helpsWith: string[];
  goodFor: string[];
  session: { duration: string; frequency: string; mode: string };
  includes: string[];
};

const SERVICES: Record<ServiceId, ServiceDetails> = {
  neuro: {
    id: "neuro",
    title: "Neurological Rehab",
    subtitle: "Regain movement and confidence after neurological events",
    Icon: Brain,
    tags: ["Balance", "Gait", "Strength"],
    helpsWith: [
      "Balance & coordination",
      "Gait training",
      "Strength & endurance",
      "Daily-activity retraining",
    ],
    goodFor: [
      "Stroke recovery",
      "Parkinson’s disease",
      "Multiple sclerosis",
      "Balance disorders",
    ],
    session: {
      duration: "45 mins",
      frequency: "3–5 sessions/week",
      mode: "Home visit",
    },
    includes: [
      "Neurological assessment",
      "Personalized rehab plan",
      "Caregiver guidance",
      "Progress tracking",
    ],
  },
  "post-surgery": {
    id: "post-surgery",
    title: "Post-Surgery Recovery",
    subtitle: "Regain mobility and strength safely at home",
    Icon: HeartPulse,
    tags: ["Mobility", "Pain Relief", "Strength"],
    helpsWith: [
      "Stiffness reduction",
      "Range of motion",
      "Pain management",
      "Safe strengthening",
    ],
    goodFor: [
      "Knee replacement",
      "Hip replacement",
      "ACL surgery",
      "Spine procedures",
    ],
    session: {
      duration: "45 mins",
      frequency: "3–5 sessions/week",
      mode: "Home visit",
    },
    includes: [
      "Assessment",
      "Personalized exercise plan",
      "Progress tracking",
      "Home-care guidance",
    ],
  },
  pediatric: {
    id: "pediatric",
    title: "Pediatric Care",
    subtitle: "Therapy for motor milestones and confidence",
    Icon: Baby,
    tags: ["Motor Skills", "Balance", "Growth"],
    helpsWith: [
      "Balance & coordination",
      "Strength building",
      "Posture support",
      "Functional play therapy",
    ],
    goodFor: [
      "Delayed milestones",
      "Toe walking",
      "Low muscle tone",
      "Coordination issues",
    ],
    session: {
      duration: "45 mins",
      frequency: "2–4 sessions/week",
      mode: "Home visit",
    },
    includes: [
      "Child-friendly assessment",
      "Play-based therapy",
      "Parent guidance",
      "Home activity plan",
    ],
  },
  ortho: {
    id: "ortho",
    title: "Orthopedic Physiotherapy",
    subtitle: "Back, knee, shoulder pain & posture correction",
    Icon: Bone,
    tags: ["Back Pain", "Knee Pain", "Posture"],
    helpsWith: [
      "Pain relief",
      "Mobility improvement",
      "Strengthening",
      "Posture correction",
    ],
    goodFor: [
      "Back/neck pain",
      "Knee pain",
      "Frozen shoulder",
      "Posture issues",
    ],
    session: {
      duration: "45 mins",
      frequency: "2–5 sessions/week",
      mode: "Home visit",
    },
    includes: [
      "Assessment",
      "Manual therapy (as needed)",
      "Exercises",
      "Ergonomic guidance",
    ],
  },
  sports: {
    id: "sports",
    title: "Sports Injury Treatment",
    subtitle: "Recover faster and return stronger",
    Icon: Dumbbell,
    tags: ["Recovery", "Performance", "Flexibility"],
    helpsWith: [
      "Injury rehab",
      "Mobility & stability",
      "Strength & conditioning",
      "Return-to-sport training",
    ],
    goodFor: [
      "Sprains/strains",
      "Runner’s knee",
      "Tennis elbow",
      "Post-injury conditioning",
    ],
    session: {
      duration: "45 mins",
      frequency: "2–4 sessions/week",
      mode: "Home visit",
    },
    includes: [
      "Assessment",
      "Rehab plan",
      "Strength & mobility drills",
      "Progress metrics",
    ],
  },
  gynecological: {
    id: "gynecological",
    title: "Gynecological Care",
    subtitle: "Women’s health, pelvic floor & postnatal support",
    Icon: Flower2,
    tags: ["Pelvic Floor", "Postnatal", "Wellness"],
    helpsWith: [
      "Pelvic floor strengthening",
      "Core rehab",
      "Pain management",
      "Breathing & posture",
    ],
    goodFor: [
      "Postnatal recovery",
      "Pelvic pain",
      "Diastasis recti",
      "Incontinence support",
    ],
    session: {
      duration: "45 mins",
      frequency: "2–3 sessions/week",
      mode: "Home visit",
    },
    includes: [
      "Assessment",
      "Pelvic floor plan",
      "Breathing/core drills",
      "Lifestyle guidance",
    ],
  },
};

function Bullet({ text, checked = false }: { text: string; checked?: boolean }) {
  return (
    <View className="flex-row items-start gap-3 py-1.5">
      {checked ? (
        <View className="mt-1">
          <Check size={16} color={colors.primary[600]} strokeWidth={2} />
        </View>
      ) : (
        <View className="mt-2.5 h-1.5 w-1.5 rounded-pill bg-ink-tertiary" />
      )}
      <Text className="flex-1 font-sans text-body text-ink">{text}</Text>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-7">
      <Text
        className="mb-3 text-label font-sans-medium text-ink-secondary"
        accessibilityRole="header"
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

export default function ServiceDetailsModal() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = (params.id ?? "ortho") as ServiceId;
  const service = SERVICES[id] ?? SERVICES.ortho;
  const { Icon } = service;

  const [ctaState, setCtaState] = useState<"idle" | "loading" | "success">(
    "idle",
  );

  const onBook = () => {
    if (ctaState !== "idle") return;
    setCtaState("loading");
    // Simulate async booking flow (replace with your API call)
    setTimeout(() => {
      setCtaState("success");
      setTimeout(() => router.back(), 650);
    }, 500);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-start justify-between">
          <View className="h-12 w-12 items-center justify-center rounded-btn bg-primary-50">
            <Icon size={24} color={colors.primary[700]} strokeWidth={1.75} />
          </View>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Close"
            className="h-12 w-12 items-center justify-center"
          >
            <X size={22} color={colors.ink.secondary} strokeWidth={1.75} />
          </Pressable>
        </View>

        <Text className="mt-4 text-title font-sans-semibold text-ink">
          {service.title}
        </Text>
        <Text className="mt-1 font-sans text-body text-ink-secondary">
          {service.subtitle}
        </Text>

        <View className="mt-3 flex-row flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <View
              key={tag}
              className="rounded-pill border border-line px-2.5 py-1"
            >
              <Text className="font-sans text-caption text-ink-secondary">
                {tag}
              </Text>
            </View>
          ))}
        </View>

        <Section title="Helps with">
          <View className="rounded-card border border-line bg-surface px-4 py-2.5">
            {service.helpsWith.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </View>
        </Section>

        <Section title="Good for">
          <View className="rounded-card border border-line bg-surface px-4 py-2.5">
            {service.goodFor.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </View>
        </Section>

        <Section title="Session details">
          <View className="flex-row gap-3">
            {[
              { label: "Duration", value: service.session.duration },
              { label: "Frequency", value: service.session.frequency },
              { label: "Mode", value: service.session.mode },
            ].map(({ label, value }) => (
              <View
                key={label}
                className="flex-1 rounded-btn bg-surface-alt p-3"
              >
                <Text className="font-sans text-caption text-ink-secondary">
                  {label}
                </Text>
                <Text className="mt-1 text-label font-sans-medium text-ink">
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="What’s included">
          <View className="rounded-card border border-line bg-surface px-4 py-2.5">
            {service.includes.map((item) => (
              <Bullet key={item} text={item} checked />
            ))}
          </View>
        </Section>
      </ScrollView>

      {/* Sticky CTA */}
      <View className="border-t border-line p-screen">
        <Pressable
          onPress={onBook}
          disabled={ctaState !== "idle"}
          accessibilityRole="button"
          accessibilityState={{ disabled: ctaState !== "idle" }}
          accessibilityLabel={`Book a home session for ${service.title}`}
          className={`min-h-12 flex-row items-center justify-center gap-2 rounded-btn ${
            ctaState === "success" ? "bg-primary-700" : "bg-primary-600"
          } active:bg-primary-700`}
        >
          {ctaState === "success" && (
            <Check size={18} color={colors.surface.DEFAULT} strokeWidth={2} />
          )}
          <Text className="text-body font-sans-semibold text-surface">
            {ctaState === "idle"
              ? "Book home session"
              : ctaState === "loading"
                ? "Booking…"
                : "Booked"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
