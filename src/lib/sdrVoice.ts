export interface CallSession {
  callId: string;
  /** LiveKit server address and a join token for this one call (safe to send to the browser). */
  url: string;
  token: string;
  maxDurationSecs: number;
}

export interface CriterionScore {
  criterion: string;
  score: number;
  notes: string;
}

export interface CoachingMoment {
  /** The candidate"s own words, or "" if it never happened. */
  quote: string;
  good: boolean;
  comment: string;
}

export interface Coaching {
  questionsAsked: number;
  /** Which brief facts (1-based) the candidate used, out of briefTotal. */
  briefUsed: number[];
  briefTotal: number;
  moments: { opening: CoachingMoment; objection: CoachingMoment; ask: CoachingMoment };
  tryNext: { skill: string; line: string };
}

export type Verdict = "no_call" | "keep_practising" | "one_fix_away" | "ready";

export interface CallResult {
  callId: string;
  agentId: string;
  /** in_progress until the call ends; analysing until it is scored (about a minute). */
  status: "in_progress" | "analysing" | "completed";
  durationSec?: number;
  agentReplies?: number;
  callerTurns?: number;
  /** Share of the words spoken by the candidate, 0 to 1. */
  callerTalkShare?: number;
  summary?: string;
  goalAchieved?: boolean;
  overallScore?: number;
  /** The five criterion scores added up, out of maxScore (25). */
  totalScore?: number;
  maxScore?: number;
  verdict?: Verdict;
  scorecard?: CriterionScore[];
  coaching?: Coaching;
}

export type BuyerId = "ananya" | "rohan" | "meera" | "vikram" | "karan";

export type Buyer = {
  id: BuyerId;
  name: string;
  role: string;
  initials: string;
  co: string;
  seg: string;
  mood: string;
  found: string[];
  goal: string;
  watch: string;
};

export type Turn = { who: "buyer" | "you"; text: string };
export type BrowserCallSession = CallSession & { reportToken: string };

export const CALLS_PATH = "/api/voice/calls";
export const CALL_LIMIT_SECONDS = 5 * 60;

export const mmss = (seconds: number) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};
