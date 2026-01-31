import { LOTTIE } from "@/src/assets/lottie";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const LOTTIES = {
  "post-surgery": LOTTIE.cylinder,
  pediatric: LOTTIE.cylinder,
  orthopedic: LOTTIE.cylinder,
  "sports-injury": LOTTIE.cylinder,
  gynecological: LOTTIE.cylinder,

  // CTA animation
  ctaSuccess: LOTTIE.cylinder,
};

type ServiceId =
  | "post-surgery"
  | "pediatric"
  | "orthopedic"
  | "sports-injury"
  | "gynecological";

type ServiceDetails = {
  id: ServiceId;
  title: string;
  subtitle: string;
  gradient: [string, string];
  tags: string[];
  helpsWith: string[];
  goodFor: string[];
  session: { duration: string; frequency: string; mode: string };
  includes: string[];
};

const SERVICES: Record<ServiceId, ServiceDetails> = {
  "post-surgery": {
    id: "post-surgery",
    title: "Post-Surgery Recovery",
    subtitle: "Regain mobility and strength safely at home",
    gradient: ["#141E30", "#243B55"],
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
    gradient: ["#F7971E", "#FFD200"],
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
  orthopedic: {
    id: "orthopedic",
    title: "Orthopedic Physiotherapy",
    subtitle: "Back, knee, shoulder pain & posture correction",
    gradient: ["#0F2027", "#2C5364"],
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
  "sports-injury": {
    id: "sports-injury",
    title: "Sports Injury Treatment",
    subtitle: "Recover faster and return stronger",
    gradient: ["#134E5E", "#71B280"],
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
    gradient: ["#8E2DE2", "#E94057"],
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

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.dot} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{text}</Text>
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
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={{ marginTop: 10 }}>{children}</View>
    </View>
  );
}

export default function ServiceDetailsModal() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = (params.id ?? "orthopedic") as ServiceId;

  const service = useMemo(() => SERVICES[id] ?? SERVICES.orthopedic, [id]);

  const heroRef = useRef<LottieView>(null);
  const ctaRef = useRef<LottieView>(null);

  const [ctaState, setCtaState] = useState<"idle" | "loading" | "success">(
    "idle",
  );

  // Press micro-interaction
  const scale = useSharedValue(1);
  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onBook = async () => {
    if (ctaState !== "idle") return;

    setCtaState("loading");
    // Optional: play a short success animation right away
    ctaRef.current?.reset();
    ctaRef.current?.play();

    // Simulate async booking flow (replace with your API call)
    setTimeout(() => {
      setCtaState("success");
      // Close modal after success (or route to confirmation screen)
      setTimeout(() => router.back(), 650);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Body */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient colors={service.gradient} style={styles.hero}>
          <View style={styles.heroTopRow}>
            <Pressable onPress={() => router.back()} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <LottieView
            ref={heroRef}
            source={LOTTIES[service.id]}
            autoPlay
            loop
            style={styles.heroLottie}
          />

          <Text style={styles.heroTitle}>{service.title}</Text>
          <Text style={styles.heroSubtitle}>{service.subtitle}</Text>

          <View style={styles.chipsRow}>
            {service.tags.map((t) => (
              <Chip key={t} text={t} />
            ))}
          </View>
        </LinearGradient>
        <Section title="Helps With">
          {service.helpsWith.map((x) => (
            <Bullet key={x} text={x} />
          ))}
        </Section>

        <Section title="Good For">
          {service.goodFor.map((x) => (
            <Bullet key={x} text={x} />
          ))}
        </Section>

        <Section title="Session Details">
          <View style={styles.sessionGrid}>
            <View style={styles.sessionItem}>
              <Text style={styles.sessionLabel}>Duration</Text>
              <Text style={styles.sessionValue}>
                {service.session.duration}
              </Text>
            </View>
            <View style={styles.sessionItem}>
              <Text style={styles.sessionLabel}>Frequency</Text>
              <Text style={styles.sessionValue}>
                {service.session.frequency}
              </Text>
            </View>
            <View style={styles.sessionItem}>
              <Text style={styles.sessionLabel}>Mode</Text>
              <Text style={styles.sessionValue}>{service.session.mode}</Text>
            </View>
          </View>
        </Section>

        <Section title="What’s Included">
          {service.includes.map((x) => (
            <Bullet key={x} text={x} />
          ))}
        </Section>
      </ScrollView>

      {/* Sticky CTA */}
      <View className="absolute bottom-12 w-full items-center">
        <Pressable style={styles.chip}>
          <Text style={styles.chipText}>Book Home Session</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0B0F14" },

  hero: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginBottom: 16,
    // borderBottomLeftRadius: 22,
    // borderBottomRightRadius: 22,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: { color: "white", fontSize: 16, fontWeight: "800" },

  heroLottie: { width: 170, height: 170, alignSelf: "center" },
  heroTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 4,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.88)",
    textAlign: "center",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },

  chipsRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  chipText: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
    fontWeight: "700",
  },

  body: { flex: 1, paddingHorizontal: 16, paddingTop: 14 },

  section: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: { color: "white", fontSize: 14, fontWeight: "900" },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    color: "rgba(255,255,255,0.86)",
    fontSize: 13,
    lineHeight: 18,
  },

  sessionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  sessionItem: {
    flexGrow: 1,
    flexBasis: "48%",
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  sessionLabel: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 12,
    fontWeight: "700",
  },
  sessionValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 6,
  },

  sticky: {
    position: "absolute",
    left: 16,
    right: 0,
    bottom: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: "rgba(11,15,20,0.92)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  ctaWrap: { borderRadius: 18 },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 18,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  ctaTitle: { color: "white", fontSize: 15, fontWeight: "900" },
  ctaSub: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "700",
  },
  ctaAnimBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
});
