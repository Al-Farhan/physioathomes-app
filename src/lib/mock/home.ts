import type {
  CarePlan,
  ExerciseItem,
  HomeUser,
  NotificationItem,
  RecoveryProgress,
  RescheduleDay,
  Therapist,
  TrackingInfo,
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

const allExercises: ExerciseItem[] = [
  ...exercises,
  {
    id: "e4",
    name: "Quad sets",
    detail: "3 sets × 10 reps",
    durationMinutes: 6,
    done: false,
  },
  {
    id: "e5",
    name: "Standing calf raises",
    detail: "2 sets × 12 reps",
    durationMinutes: 5,
    done: false,
  },
  {
    id: "e6",
    name: "Supported mini squats",
    detail: "2 sets × 8 reps",
    durationMinutes: 7,
    done: false,
  },
];

export function fetchAllExercises(): Promise<ExerciseItem[]> {
  return simulate(MOCK_CONFIG.scenario === "firstTime" ? [] : allExercises);
}

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Session confirmed",
    body: "Dr. Meera Kulkarni confirmed your session today. She'll arrive at your home address.",
    createdAt: minutesAgo(35),
    read: false,
  },
  {
    id: "n2",
    title: "New exercises prescribed",
    body: "Three exercises were added to your plan after your last session.",
    createdAt: minutesAgo(60 * 5),
    read: false,
  },
  {
    id: "n3",
    title: "Payment received",
    body: "We received your payment for Session 3. The receipt is in Reports.",
    createdAt: minutesAgo(60 * 26),
    read: true,
  },
  {
    id: "n4",
    title: "Milestone reached",
    body: "You completed \"Stand unsupported for 5 minutes\". Keep it up.",
    createdAt: minutesAgo(60 * 24 * 3),
    read: true,
  },
];

export function fetchNotifications(): Promise<NotificationItem[]> {
  return simulate(MOCK_CONFIG.scenario === "firstTime" ? [] : notifications);
}

export function markNotificationRead(_id: string): Promise<void> {
  return simulate(undefined);
}

const carePlan: CarePlan = {
  conditionName: "Knee replacement recovery",
  startedOn: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  sessionsCompleted: recovery.sessionsCompleted,
  sessionsPlanned: recovery.sessionsPlanned,
  therapistNote:
    "Swelling has reduced well. We'll focus on quad strength and gait over the next two weeks — keep icing after your home exercises.",
  milestones: [
    {
      id: "m1",
      title: "Bend knee to 90°",
      detail: "Reached in session 2",
      status: "done",
    },
    {
      id: "m2",
      title: "Stand unsupported for 5 minutes",
      detail: "Reached in session 3",
      status: "done",
    },
    {
      id: "m3",
      title: "Walk 10 minutes unaided",
      detail: "Current focus",
      status: "current",
    },
    {
      id: "m4",
      title: "Climb one flight of stairs",
      status: "upcoming",
    },
    {
      id: "m5",
      title: "Return to daily routine",
      status: "upcoming",
    },
  ],
};

export function fetchCarePlan(): Promise<CarePlan | null> {
  return simulate(MOCK_CONFIG.scenario === "firstTime" ? null : carePlan);
}

export function fetchTracking(): Promise<TrackingInfo> {
  if (MOCK_CONFIG.scenario === "firstTime") {
    return simulate({ session: null, etaMinutes: null });
  }
  return simulate({
    session: nextSession,
    etaMinutes: nextSession.status === "on_the_way" ? 18 : null,
  });
}

export function fetchRescheduleDays(): Promise<RescheduleDay[]> {
  const days: RescheduleDay[] = [];
  const hours = [9, 11, 13, 15, 17, 18];
  for (let d = 1; d <= 5; d++) {
    const date = new Date();
    date.setDate(date.getDate() + d);
    date.setHours(0, 0, 0, 0);
    days.push({
      date: date.toISOString(),
      slots: hours.map((hour, i) => {
        const startsAt = new Date(date);
        startsAt.setHours(hour, hour === 18 ? 30 : 0);
        return {
          id: `d${d}-s${i}`,
          startsAt: startsAt.toISOString(),
          // deterministic spread of unavailable slots
          available: (d + i) % 3 !== 0,
        };
      }),
    });
  }
  return simulate(days);
}

export function requestReschedule(_slotId: string): Promise<void> {
  return simulate(undefined);
}
