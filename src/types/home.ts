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

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  /** ISO datetime */
  createdAt: string;
  read: boolean;
}

export type MilestoneStatus = "done" | "current" | "upcoming";

export interface Milestone {
  id: string;
  title: string;
  detail?: string;
  status: MilestoneStatus;
}

export interface CarePlan {
  conditionName: string;
  /** ISO date */
  startedOn: string;
  sessionsCompleted: number;
  sessionsPlanned: number;
  therapistNote: string;
  milestones: Milestone[];
}

export interface RescheduleSlot {
  id: string;
  /** ISO datetime */
  startsAt: string;
  available: boolean;
}

export interface RescheduleDay {
  /** ISO date (start of day) */
  date: string;
  slots: RescheduleSlot[];
}

export interface TrackingInfo {
  session: UpcomingSession | null;
  /** minutes until arrival; null unless the therapist is on the way */
  etaMinutes: number | null;
}

/**
 * Per-section async state. `data` is kept through reloads so pull-to-refresh
 * and inline retries never blank out content the user is already reading.
 */
export type SectionState<T> =
  | { status: "loading"; data?: T }
  | { status: "error"; data?: T }
  | { status: "success"; data: T };
