import {
  fetchAssignedTherapist,
  fetchHomeUser,
  fetchNextSession,
  fetchRecoveryProgress,
  fetchTodaysExercises,
} from "@/src/lib/mock/home";
import type {
  ExerciseItem,
  HomeUser,
  RecoveryProgress,
  SectionState,
  Therapist,
  UpcomingSession,
} from "@/src/types/home";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIsOffline } from "./use-is-offline";

/**
 * Loads each Home section independently so one failing request degrades to an
 * inline retry in that section instead of a full-screen error. Previous data
 * is kept during reloads (no content flash on pull-to-refresh).
 */
function useSection<T>(
  fetcher: () => Promise<T>,
): [
  SectionState<T>,
  () => Promise<void>,
  Dispatch<SetStateAction<SectionState<T>>>,
] {
  const [state, setState] = useState<SectionState<T>>({ status: "loading" });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setState((prev) => ({ status: "loading", data: prev.data }));
    try {
      const data = await fetcher();
      if (mounted.current) setState({ status: "success", data });
    } catch {
      if (mounted.current)
        setState((prev) => ({ status: "error", data: prev.data }));
    }
  }, [fetcher]);

  useEffect(() => {
    load();
  }, [load]);

  return [state, load, setState];
}

export interface HomeData {
  user: SectionState<HomeUser>;
  nextSession: SectionState<UpcomingSession | null>;
  recovery: SectionState<RecoveryProgress | null>;
  exercises: SectionState<ExerciseItem[]>;
  therapist: SectionState<Therapist | null>;
  /** true only on first load, before anything has arrived — show skeleton. */
  initialLoading: boolean;
  isOffline: boolean;
  refreshing: boolean;
  refresh: () => Promise<void>;
  retryNextSession: () => Promise<void>;
  retryRecovery: () => Promise<void>;
  retryExercises: () => Promise<void>;
  retryTherapist: () => Promise<void>;
  /** Optimistic local update for exercise done-toggles. */
  setExercises: (update: (prev: ExerciseItem[]) => ExerciseItem[]) => void;
}

export function useHomeData(): HomeData {
  const [user] = useSection(fetchHomeUser);
  const [nextSession, retryNextSession] = useSection(fetchNextSession);
  const [recovery, retryRecovery] = useSection(fetchRecoveryProgress);
  const [exercises, retryExercises, setExercisesState] = useSection(
    fetchTodaysExercises,
  );
  const [therapist, retryTherapist] = useSection(fetchAssignedTherapist);
  const [refreshing, setRefreshing] = useState(false);
  const isOffline = useIsOffline();

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      retryNextSession(),
      retryRecovery(),
      retryExercises(),
      retryTherapist(),
    ]);
    setRefreshing(false);
  }, [retryNextSession, retryRecovery, retryExercises, retryTherapist]);

  const sections = [user, nextSession, recovery, exercises, therapist];
  const initialLoading = sections.every(
    (s) => s.status === "loading" && s.data === undefined,
  );

  const setExercises = useCallback(
    (update: (prev: ExerciseItem[]) => ExerciseItem[]) => {
      setExercisesState((prev) =>
        prev.data === undefined ? prev : { ...prev, data: update(prev.data) },
      );
    },
    [setExercisesState],
  );

  return {
    user,
    nextSession,
    recovery,
    exercises,
    therapist,
    initialLoading,
    isOffline,
    refreshing,
    refresh,
    retryNextSession,
    retryRecovery,
    retryExercises,
    retryTherapist,
    setExercises,
  };
}
