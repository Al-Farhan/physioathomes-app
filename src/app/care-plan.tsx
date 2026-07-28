import Skeleton from "@/src/components/skeleton/skeleton";
import { SectionError } from "@/src/components/home/section-error";
import { formatDate } from "@/src/lib/format";
import { fetchCarePlan } from "@/src/lib/mock/home";
import { colors } from "@/src/theme/tokens";
import type { CarePlan, Milestone, SectionState } from "@/src/types/home";
import { Check, ClipboardList } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

function MilestoneIcon({ status }: { status: Milestone["status"] }) {
  if (status === "done") {
    return (
      <View className="h-6 w-6 items-center justify-center rounded-pill bg-success">
        <Check size={14} color={colors.surface.DEFAULT} strokeWidth={2.5} />
      </View>
    );
  }
  if (status === "current") {
    return (
      <View className="h-6 w-6 items-center justify-center rounded-pill border-2 border-primary-600">
        <View className="h-2 w-2 rounded-pill bg-primary-600" />
      </View>
    );
  }
  return <View className="h-6 w-6 rounded-pill border border-line" />;
}

export default function CarePlanScreen() {
  const [state, setState] = useState<SectionState<CarePlan | null>>({
    status: "loading",
  });

  const load = useCallback(async () => {
    setState((prev) => ({ status: "loading", data: prev.data }));
    try {
      const data = await fetchCarePlan();
      setState({ status: "success", data });
    } catch {
      setState((prev) => ({ status: "error", data: prev.data }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (state.data === undefined) {
    return (
      <View className="flex-1 gap-3 bg-surface p-screen">
        {state.status === "error" ? (
          <SectionError message="Couldn’t load your care plan." onRetry={load} />
        ) : (
          <>
            <Skeleton variant="box" className="h-24 w-full rounded-card" />
            <Skeleton variant="box" className="h-28 w-full rounded-card" />
            <Skeleton variant="box" className="h-64 w-full rounded-card" />
          </>
        )}
      </View>
    );
  }

  const plan = state.data;
  if (plan === null) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-surface p-screen">
        <ClipboardList size={28} color={colors.ink.tertiary} strokeWidth={1.5} />
        <Text className="font-sans text-body text-ink-secondary">
          No care plan yet.
        </Text>
        <Text className="text-center font-sans text-caption text-ink-secondary">
          Your physiotherapist will create one after your first assessment.
        </Text>
      </View>
    );
  }

  const percent =
    plan.sessionsPlanned > 0
      ? Math.min(
          100,
          Math.round((plan.sessionsCompleted / plan.sessionsPlanned) * 100),
        )
      : 0;

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text className="text-title font-sans-semibold text-ink">
        {plan.conditionName}
      </Text>
      <Text className="mt-1 font-sans text-caption text-ink-secondary">
        Plan started {formatDate(plan.startedOn)}
      </Text>

      {/* Progress */}
      <View className="mt-5 rounded-card border border-line bg-surface p-5">
        <View className="h-1.5 overflow-hidden rounded-pill bg-line">
          <View
            className="h-full rounded-pill bg-primary-600"
            style={{ width: `${percent}%` }}
          />
        </View>
        <Text className="mt-3 font-sans text-caption text-ink-secondary">
          {plan.sessionsCompleted} of {plan.sessionsPlanned} sessions completed
        </Text>
      </View>

      {/* Therapist note */}
      <View className="mt-4 rounded-card bg-surface-alt p-5">
        <Text className="text-label font-sans-medium text-ink-secondary">
          Note from your physiotherapist
        </Text>
        <Text className="mt-2 font-sans text-body text-ink">
          {plan.therapistNote}
        </Text>
      </View>

      {/* Milestones */}
      <Text className="mb-3 mt-7 text-label font-sans-medium text-ink-secondary">
        Milestones
      </Text>
      <View className="rounded-card border border-line bg-surface">
        {plan.milestones.map((milestone, index) => (
          <View
            key={milestone.id}
            className={`min-h-12 flex-row items-center gap-3 px-4 py-3.5 ${
              index > 0 ? "border-t border-line" : ""
            }`}
            accessibilityLabel={`${milestone.title}, ${milestone.status === "done" ? "completed" : milestone.status === "current" ? "current focus" : "upcoming"}`}
          >
            <MilestoneIcon status={milestone.status} />
            <View className="flex-1">
              <Text
                className={`font-sans text-body ${
                  milestone.status === "done"
                    ? "text-ink-secondary"
                    : "text-ink"
                }`}
              >
                {milestone.title}
              </Text>
              {milestone.detail && (
                <Text className="font-sans text-caption text-ink-secondary">
                  {milestone.detail}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
