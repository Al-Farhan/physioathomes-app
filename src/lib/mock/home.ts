import type {
  ExerciseItem,
  HomeUser,
  RecoveryProgress,
  Therapist,
  UpcomingSession,
} from "@/src/types/home";

/**
 * Mock data layer for the Home screen. `useHomeData` consumes these fetchers;
 * swap their bodies for real API calls without touching the screen or the
 * presentational components.
 */

export type HomeScenario = "default" | "firstTime";

export const MOCK_CONFIG = {
  /** "firstTime" → no bookings, no plan: exercises the empty states. */
  scenario: "default" as HomeScenario,
  latencyMs: 700,
  /** 0..1 — raise (e.g. 0.5) to exercise inline section errors. */
  failRate: 0,
  /** true → Home shows the offline banner over cached data. */
  offline: false,
};

const therapist: Therapist = {
  id: "t1",
  name: "Dr. Meera Kulkarni",
  photoUrl: null,
  credentials: "MPT (Ortho)",
  specialization: "Orthopedic & post-surgical rehab",
  rating: 4.9,
  phone: "+919812345678",
};

function inHours(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

const nextSession: UpcomingSession = {
  id: "s4",
  startsAt: inHours(4),
  status: "confirmed",
  sessionNumber: 4,
  totalSessions: 12,
  address: "Home · 12B Palm Residency, Baner, Pune",
  therapist,
};

const recovery: RecoveryProgress = {
  conditionName: "Knee replacement recovery",
  sessionsCompleted: 3,
  sessionsPlanned: 12,
  nextMilestone: "Walk 10 minutes unaided",
};

const exercises: ExerciseItem[] = [
  {
    id: "e1",
    name: "Ankle pumps",
    detail: "3 sets × 15 reps",
    durationMinutes: 5,
    done: true,
  },
  {
    id: "e2",
    name: "Seated knee extension",
    detail: "2 sets × 10 reps",
    durationMinutes: 8,
    done: false,
  },
  {
    id: "e3",
    name: "Heel slides",
    detail: "2 sets × 12 reps",
    durationMinutes: 6,
    done: false,
  },
];

const user: HomeUser = {
  firstName: "Rohan",
  avatarUrl: null,
  unreadNotifications: 2,
};

function simulate<T>(value: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < MOCK_CONFIG.failRate) {
        reject(new Error("Network request failed"));
      } else {
        resolve(value);
      }
    }, MOCK_CONFIG.latencyMs);
  });
}

export function fetchHomeUser(): Promise<HomeUser> {
  return simulate(user);
}

export function fetchNextSession(): Promise<UpcomingSession | null> {
  return simulate(MOCK_CONFIG.scenario === "firstTime" ? null : nextSession);
}

export function fetchRecoveryProgress(): Promise<RecoveryProgress | null> {
  return simulate(MOCK_CONFIG.scenario === "firstTime" ? null : recovery);
}

export function fetchTodaysExercises(): Promise<ExerciseItem[]> {
  return simulate(MOCK_CONFIG.scenario === "firstTime" ? [] : exercises);
}

export function fetchAssignedTherapist(): Promise<Therapist | null> {
  return simulate(MOCK_CONFIG.scenario === "firstTime" ? null : therapist);
}

export function setExerciseDone(_id: string, _done: boolean): Promise<void> {
  return simulate(undefined);
}
