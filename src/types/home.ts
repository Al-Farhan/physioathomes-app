export type SessionStatus =
  | "confirmed"
  | "on_the_way"
  | "awaiting_confirmation";

export interface Therapist {
  id: string;
  name: string;
  /** null → render initials avatar */
  photoUrl: string | null;
  /** e.g. "MPT (Ortho)" */
  credentials: string;
  specialization: string;
  rating: number;
  phone: string;
}

export interface UpcomingSession {
  id: string;
  /** ISO datetime */
  startsAt: string;
  status: SessionStatus;
  sessionNumber: number;
  totalSessions: number;
  address: string;
  therapist: Therapist;
}

export interface RecoveryProgress {
  conditionName: string;
  sessionsCompleted: number;
  sessionsPlanned: number;
  nextMilestone: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  /** e.g. "2 sets × 10 reps" */
  detail: string;
  durationMinutes: number;
  done: boolean;
}

export interface HomeUser {
  firstName: string;
  avatarUrl: string | null;
  unreadNotifications: number;
}

/**
 * Per-section async state. `data` is kept through reloads so pull-to-refresh
 * and inline retries never blank out content the user is already reading.
 */
export type SectionState<T> =
  | { status: "loading"; data?: T }
  | { status: "error"; data?: T }
  | { status: "success"; data: T };
