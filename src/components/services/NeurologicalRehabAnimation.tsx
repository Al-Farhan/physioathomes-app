import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Ellipse, G, Line, Path } from "react-native-svg";

export function NeurologicalRehabAnimation() {
  const [key, setKey] = useState(0);

  // Animation values
  const fadeIn = useSharedValue(0);
  const therapistArm = useSharedValue(0);
  const patientLeg = useSharedValue(0);
  const therapistLean = useSharedValue(0);
  const neuralPulse1 = useSharedValue(0);
  const neuralPulse2 = useSharedValue(0);
  const neuralPulse3 = useSharedValue(0);
  const progress = useSharedValue(0);
  const breathe = useSharedValue(0);
  const supportHand = useSharedValue(0);

  const startAnimations = () => {
    // Fade in
    fadeIn.value = withDelay(100, withTiming(1, { duration: 500 }));

    // Therapist arm guiding patient's leg - main rehab movement
    therapistArm.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
      ),
    );

    // Patient leg follows therapist's guidance
    patientLeg.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
      ),
    );

    // Therapist subtle lean during treatment
    therapistLean.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
      ),
    );

    // Support hand movement
    supportHand.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
      ),
    );

    // Patient breathing
    breathe.value = withDelay(
      200,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
      ),
    );

    // Neural signals - staggered pulses traveling through pathway
    neuralPulse1.value = withDelay(
      600,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 0 }),
        ),
        -1,
      ),
    );

    neuralPulse2.value = withDelay(
      1000,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 0 }),
        ),
        -1,
      ),
    );

    neuralPulse3.value = withDelay(
      1400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 0 }),
        ),
        -1,
      ),
    );

    // Progress bar
    progress.value = withDelay(
      800,
      withTiming(1, { duration: 1600, easing: Easing.out(Easing.cubic) }),
    );
  };

  useEffect(() => {
    startAnimations();
  }, [key]);

  const handlePress = () => {
    fadeIn.value = 0;
    progress.value = 0;
    setKey((k) => k + 1);
  };

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ scale: 0.95 + fadeIn.value * 0.05 }],
  }));

  // Therapist leaning forward while treating
  const therapistBodyStyle = useAnimatedStyle(() => {
    const lean = interpolate(therapistLean.value, [0, 1], [0, 4]);
    return {
      transform: [{ rotate: `${lean}deg` }],
    };
  });

  // Therapist's treating arm (lifting patient's leg)
  const therapistArmStyle = useAnimatedStyle(() => {
    const rotation = interpolate(therapistArm.value, [0, 1], [15, -20]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  // Therapist's support hand
  const supportHandStyle = useAnimatedStyle(() => {
    const y = interpolate(supportHand.value, [0, 1], [0, -6]);
    return {
      transform: [{ translateY: y }],
    };
  });

  // Patient leg being lifted passively
  const patientLegStyle = useAnimatedStyle(() => {
    const rotation = interpolate(patientLeg.value, [0, 1], [5, -30]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  // Patient breathing (subtle chest rise)
  const breatheStyle = useAnimatedStyle(() => {
    const scale = interpolate(breathe.value, [0, 1], [1, 1.015]);
    const y = interpolate(breathe.value, [0, 1], [0, -0.5]);
    return {
      transform: [{ scaleY: scale }, { translateY: y }],
    };
  });

  // Neural pulses traveling from brain to leg
  const pulse1Style = useAnimatedStyle(() => ({
    opacity: interpolate(
      neuralPulse1.value,
      [0, 0.2, 0.8, 1],
      [0, 0.6, 0.3, 0],
    ),
    transform: [
      { translateX: interpolate(neuralPulse1.value, [0, 1], [0, 55]) },
      { translateY: interpolate(neuralPulse1.value, [0, 1], [0, 28]) },
    ],
  }));

  const pulse2Style = useAnimatedStyle(() => ({
    opacity: interpolate(
      neuralPulse2.value,
      [0, 0.2, 0.8, 1],
      [0, 0.6, 0.3, 0],
    ),
    transform: [
      { translateX: interpolate(neuralPulse2.value, [0, 1], [0, 55]) },
      { translateY: interpolate(neuralPulse2.value, [0, 1], [0, 28]) },
    ],
  }));

  const pulse3Style = useAnimatedStyle(() => ({
    opacity: interpolate(
      neuralPulse3.value,
      [0, 0.2, 0.8, 1],
      [0, 0.6, 0.3, 0],
    ),
    transform: [
      { translateX: interpolate(neuralPulse3.value, [0, 1], [0, 55]) },
      { translateY: interpolate(neuralPulse3.value, [0, 1], [0, 28]) },
    ],
  }));

  const progressBarStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [0, 110]),
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: interpolate(fadeIn.value, [0, 1], [10, 0]) }],
  }));

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Animated.View style={[styles.content, containerStyle]} key={key}>
        <View style={styles.sceneContainer}>
          {/* Static SVG Scene */}
          <Svg width={200} height={130} viewBox="0 0 200 130">
            {/* Treatment table */}
            <G>
              {/* Table top */}
              <Line
                x1="10"
                y1="88"
                x2="140"
                y2="88"
                stroke="#000"
                strokeWidth={2.5}
                strokeLinecap="round"
                opacity={0.2}
              />
              {/* Table legs */}
              <Line
                x1="20"
                y1="88"
                x2="20"
                y2="105"
                stroke="#000"
                strokeWidth={2}
                opacity={0.12}
                strokeLinecap="round"
              />
              <Line
                x1="130"
                y1="88"
                x2="130"
                y2="105"
                stroke="#000"
                strokeWidth={2}
                opacity={0.12}
                strokeLinecap="round"
              />
              {/* Pillow */}
              <Ellipse
                cx="28"
                cy="82"
                rx="14"
                ry="5"
                fill="none"
                stroke="#000"
                strokeWidth={1}
                opacity={0.15}
              />
            </G>

            {/* Patient lying down (static parts) */}
            <G>
              {/* Head */}
              <Circle
                cx="28"
                cy="75"
                r="9"
                fill="none"
                stroke="#000"
                strokeWidth={1.8}
              />
              {/* Eye closed (relaxed) */}
              <Line
                x1="25"
                y1="74"
                x2="28"
                y2="74"
                stroke="#000"
                strokeWidth={1}
                opacity={0.4}
                strokeLinecap="round"
              />

              {/* Torso - horizontal */}
              <Line
                x1="37"
                y1="78"
                x2="85"
                y2="78"
                stroke="#000"
                strokeWidth={2.8}
                strokeLinecap="round"
              />

              {/* Left arm (resting on body) */}
              <Line
                x1="55"
                y1="78"
                x2="50"
                y2="85"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                opacity={0.8}
              />
              <Line
                x1="50"
                y1="85"
                x2="55"
                y2="88"
                stroke="#000"
                strokeWidth={1.8}
                strokeLinecap="round"
                opacity={0.8}
              />

              {/* Left leg (resting flat) */}
              <Line
                x1="85"
                y1="80"
                x2="115"
                y2="82"
                stroke="#000"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
              <Line
                x1="115"
                y1="82"
                x2="135"
                y2="84"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <Line
                x1="135"
                y1="84"
                x2="140"
                y2="82"
                stroke="#000"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </G>

            {/* Therapist (static body parts) */}
            <G transform="translate(145, 20)">
              {/* Head */}
              <Circle
                cx="20"
                cy="12"
                r="10"
                fill="none"
                stroke="#000"
                strokeWidth={1.8}
              />

              {/* Body leaning forward */}
              <Line
                x1="20"
                y1="22"
                x2="15"
                y2="55"
                stroke="#000"
                strokeWidth={2.5}
                strokeLinecap="round"
              />

              {/* Left arm (supporting patient's knee area) - will be animated separately */}

              {/* Legs */}
              <Line
                x1="15"
                y1="55"
                x2="25"
                y2="85"
                stroke="#000"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
              <Line
                x1="15"
                y1="55"
                x2="5"
                y2="85"
                stroke="#000"
                strokeWidth={2.2}
                strokeLinecap="round"
              />

              {/* Feet */}
              <Line
                x1="25"
                y1="85"
                x2="32"
                y2="86"
                stroke="#000"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              <Line
                x1="5"
                y1="85"
                x2="-2"
                y2="86"
                stroke="#000"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </G>

            {/* Neural pathway visualization */}
            <G>
              {/* Brain icon near patient's head */}
              <G transform="translate(15, 58)">
                <Path
                  d="M8 0C4 0 1 3 1 6.5c0 2 1 4 2.5 5v1.5h9V11.5c1.5-1 2.5-3 2.5-5C15 3 12 0 8 0z"
                  fill="none"
                  stroke="#000"
                  strokeWidth={1}
                  opacity={0.35}
                />
                <Path
                  d="M5 5.5c0-1 1.5-2 3-2s3 1 3 2"
                  fill="none"
                  stroke="#000"
                  strokeWidth={0.7}
                  opacity={0.25}
                />
              </G>

              {/* Neural pathway curve from brain to leg */}
              <Path
                d="M30 72 Q50 72 70 78 Q90 84 105 75"
                stroke="#000"
                strokeWidth={1}
                strokeDasharray="3 6"
                fill="none"
                opacity={0.15}
              />
            </G>

            {/* Floor line */}
            <Line
              x1="0"
              y1="108"
              x2="200"
              y2="108"
              stroke="#000"
              strokeWidth={1}
              opacity={0.08}
            />
          </Svg>

          {/* Animated patient's right leg */}
          <Animated.View style={[styles.patientLeg, patientLegStyle]}>
            <Svg width={60} height={30} viewBox="0 0 60 30">
              {/* Thigh */}
              <Line
                x1="0"
                y1="15"
                x2="28"
                y2="10"
                stroke="#000"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
              {/* Lower leg */}
              <Line
                x1="28"
                y1="10"
                x2="50"
                y2="5"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
              />
              {/* Foot */}
              <Line
                x1="50"
                y1="5"
                x2="56"
                y2="3"
                stroke="#000"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>

          {/* Patient breathing indicator (chest) */}
          <Animated.View style={[styles.chestBreathing, breatheStyle]}>
            <View style={styles.chestIndicator} />
          </Animated.View>

          {/* Therapist animated body (lean) */}
          <Animated.View style={[styles.therapistBody, therapistBodyStyle]}>
            <View style={styles.therapistPlaceholder} />
          </Animated.View>

          {/* Therapist's treating arm */}
          <Animated.View style={[styles.therapistArm, therapistArmStyle]}>
            <Svg width={45} height={35} viewBox="0 0 45 35">
              {/* Upper arm */}
              <Line
                x1="0"
                y1="0"
                x2="20"
                y2="15"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
              />
              {/* Forearm */}
              <Line
                x1="20"
                y1="15"
                x2="38"
                y2="25"
                stroke="#000"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              {/* Hand holding ankle */}
              <Circle
                cx="38"
                cy="25"
                r="4"
                fill="none"
                stroke="#000"
                strokeWidth={1.2}
                opacity={0.5}
              />
              <Circle cx="38" cy="25" r="2" fill="#000" opacity={0.1} />
            </Svg>
          </Animated.View>

          {/* Therapist's support hand (on knee) */}
          <Animated.View style={[styles.supportHand, supportHandStyle]}>
            <Svg width={30} height={25} viewBox="0 0 30 25">
              <Line
                x1="0"
                y1="0"
                x2="12"
                y2="10"
                stroke="#000"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              <Line
                x1="12"
                y1="10"
                x2="22"
                y2="18"
                stroke="#000"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
              <Circle
                cx="22"
                cy="18"
                r="3"
                fill="none"
                stroke="#000"
                strokeWidth={1}
                opacity={0.4}
              />
            </Svg>
          </Animated.View>

          {/* Neural signal pulses */}
          <Animated.View style={[styles.neuralPulse, pulse1Style]}>
            <View style={styles.pulseDot} />
          </Animated.View>
          <Animated.View style={[styles.neuralPulse, pulse2Style]}>
            <View style={styles.pulseDot} />
          </Animated.View>
          <Animated.View style={[styles.neuralPulse, pulse3Style]}>
            <View style={styles.pulseDot} />
          </Animated.View>
        </View>

        {/* Session info card */}
        <Animated.View style={[styles.infoCard, badgeStyle]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <Svg width={16} height={16} viewBox="0 0 24 24">
                <Circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  stroke="#000"
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <Path
                  d="M12 7v5l3 2"
                  stroke="#000"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.7}
                />
              </Svg>
            </View>
            <View>
              <Text style={styles.cardTitle}>Passive ROM Exercise</Text>
              <Text style={styles.cardSubtitle}>Session 4 of 12</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, progressBarStyle]} />
            </View>
            <Text style={styles.progressPercent}>33%</Text>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>+18°</Text>
              <Text style={styles.statLabel}>ROM gain</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>reps</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2:30</Text>
              <Text style={styles.statLabel}>duration</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  sceneContainer: {
    position: "relative",
    width: 200,
    height: 130,
  },
  patientLeg: {
    position: "absolute",
    left: 83,
    top: 71,
    transformOrigin: "left center",
  },
  chestBreathing: {
    position: "absolute",
    left: 50,
    top: 73,
  },
  chestIndicator: {
    width: 30,
    height: 8,
  },
  therapistBody: {
    position: "absolute",
    right: 10,
    top: 20,
    transformOrigin: "center bottom",
  },
  therapistPlaceholder: {
    width: 50,
    height: 90,
  },
  therapistArm: {
    position: "absolute",
    right: 38,
    top: 50,
    transformOrigin: "left top",
  },
  supportHand: {
    position: "absolute",
    right: 55,
    top: 42,
    transformOrigin: "left top",
  },
  neuralPulse: {
    position: "absolute",
    left: 30,
    top: 70,
  },
  pulseDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#000",
  },
  infoCard: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    backgroundColor: "rgba(0,0,0,0.015)",
    width: "100%",
    maxWidth: 240,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
    opacity: 0.8,
  },
  cardSubtitle: {
    fontSize: 10,
    color: "#000",
    opacity: 0.4,
    marginTop: 1,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 1.5,
    overflow: "hidden",
  },
  progressFill: {
    height: 3,
    backgroundColor: "#000",
    borderRadius: 1.5,
  },
  progressPercent: {
    fontSize: 10,
    fontFamily: "monospace",
    color: "#000",
    opacity: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "monospace",
    color: "#000",
    opacity: 0.75,
  },
  statLabel: {
    fontSize: 9,
    color: "#000",
    opacity: 0.35,
    marginTop: 2,
  },
});

export default NeurologicalRehabAnimation;
