/**
 * Voice agent for the mock sales call.
 *
 * The call screen only talks to this interface, so the real agent can replace the scripted
 * one without touching the UI: implement `createAgent` with the same events (say what the
 * buyer said, report a booked meeting, hang up) and the screen keeps working.
 *
 * TODO(voice): swap `createScriptedAgent` for the live voice agent connection.
 */
export type Buyer = {
  id: string; name: string; role: string; initials: string; co: string;
  seg: string; mood: string; found: string[]; goal: string; watch: string;
};

export type AgentEvents = {
  /** the buyer says something (shown in the transcript and spoken aloud) */
  onSay: (text: string) => void;
  /** the rep got the meeting */
  onBooked: () => void;
  /** the buyer ends the call, after their last line has been said */
  onHangup: () => void;
};

export type AgentSession = {
  /** buyer picks up and opens the call */
  start: () => void;
  /** a finished line from the rep */
  send: (text: string) => void;
  end: () => void;
};

type Script = {
  opener: string;
  /** first push-back, whatever the rep opens with */
  objection: string;
  /** words that show the rep did the research, and how the buyer warms up */
  hooks: { match: RegExp; reply: string }[];
  /** keeps the call going when nothing in the line lands */
  nudges: string[];
  booked: string;
  /** buyer runs out of time without a meeting */
  close: string;
};

const SCRIPTS: Record<string, Script> = {
  ananya: {
    opener: "Hi, this is Ananya. I've got about five minutes before my next meeting. What's this about?",
    objection: "Honestly, we already have a cloud partner. Why would I take another call?",
    hooks: [
      { match: /hir|engineer|platform team|headcount/i, reply: "You saw the hiring, then. Yes, we're stretched. Four roles open and the roadmap isn't waiting." },
      { match: /ledger|on-?prem|legacy|migrat|data ?cent/i, reply: "The ledger is the sore point. It's the one thing nobody wants to touch, and it's still on-premise." },
      { match: /audit|regulat|complian|rbi|pci|soc/i, reply: "The audit is in six months. If you can help us get ready for that, I'm listening." },
    ],
    nudges: [
      "Okay, but what would you actually do differently from our current partner?",
      "I hear that pitch a lot. Give me something specific to us.",
      "Fine. What would the first two weeks look like?",
    ],
    booked: "Alright, thirty minutes. Send me an invite for that slot and include the audit angle. I have to jump now.",
    close: "I really have to go. Send me an email and I'll look at it when I can.",
  },
  rohan: {
    opener: "Rohan here. I don't usually take these calls, so you've got a minute. Go.",
    objection: "We have a strong engineering team. We can do this ourselves.",
    hooks: [
      { match: /bill|cost|spend|60|sixty|finops|saving/i, reply: "The bill is a fair point. It grew far faster than our revenue last year, and nobody owns it." },
      { match: /\bai\b|assistant|genai|llm|bedrock|model/i, reply: "The AI assistant is on the roadmap, yes. We haven't decided how to build it safely." },
      { match: /devops|left|attrition|team|bandwidth|hire/i, reply: "Losing two senior DevOps people hurt. The team is firefighting more than building." },
    ],
    nudges: [
      "Every vendor says that. Why would my team trust an outside firm with this?",
      "What's in it for us that we can't get from AWS docs and a long weekend?",
      "Be specific. What would you look at first?",
    ],
    booked: "Okay, a cost and architecture review I can justify. Thirty minutes, and bring numbers. Send the invite.",
    close: "I'm not convinced yet. Email me a one-pager and we'll see.",
  },
  meera: {
    opener: "Hello, Meera speaking. I don't think we've met. How can I help?",
    objection: "I should say upfront: patient data can't leave our systems. That usually ends these conversations.",
    hooks: [
      { match: /centre|center|expan|40|forty|grow|scale/i, reply: "The expansion is exciting, but forty new centres means a lot more data, and our reporting won't keep up." },
      { match: /report|manual|hand|weekly|spreadsheet|excel|dashboard/i, reply: "You're right, our reports are still compiled by hand every week. It's painful." },
      { match: /genai|\bai\b|summar|llm|bedrock|in-?region|india region|stays|residen/i, reply: "If it can run inside our own environment, that changes things. Summaries are what we've been exploring." },
    ],
    nudges: [
      "That's interesting. How have you handled data that can't leave the building before?",
      "Who else in healthcare have you done this for?",
      "What would a first step look like for us?",
    ],
    booked: "That sounds useful. Let's do a thirty-minute discovery call. Please send an invite and I'll bring our data lead.",
    close: "Thanks for calling. Send me some material on how you handle patient data and I'll share it with the team.",
  },
};

/** asking for the meeting: a time, a slot, a calendar invite */
const ASK = /\b(30|thirty|minutes?|call|meeting|calendar|invite|book|slot|time|tomorrow|next week|monday|tuesday|wednesday|thursday|friday)\b/i;
const MAX_TURNS = 7;

function createScriptedAgent(buyer: Buyer, ev: AgentEvents): AgentSession {
  const s = SCRIPTS[buyer.id];
  let turn = 0, warmth = 0, nudge = 0, done = false;
  const used = new Set<number>();
  const timers: number[] = [];
  // a short pause before each reply, like someone thinking
  const say = (text: string, then?: () => void) => {
    // `then` runs first so a hang-up is known before the line is spoken, and lands after it
    timers.push(window.setTimeout(() => { if (!done || then) { then?.(); ev.onSay(text); } }, 700 + Math.random() * 600));
  };

  return {
    start: () => say(s.opener),
    send(text) {
      if (done || !text.trim()) return;
      turn++;
      if (turn === 1) return say(s.objection);
      const hook = s.hooks.findIndex((h, i) => !used.has(i) && h.match.test(text));
      if (hook >= 0) { used.add(hook); warmth++; return say(s.hooks[hook].reply); }
      // the meeting lands once the rep has shown they know the account (at least one hook)
      if (ASK.test(text) && warmth > 0) { done = true; return say(s.booked, () => { ev.onBooked(); ev.onHangup(); }); }
      if (turn >= MAX_TURNS) { done = true; return say(s.close, ev.onHangup); }
      say(ASK.test(text) ? "Before I give you time, tell me why this matters for us specifically." : s.nudges[nudge++ % s.nudges.length]);
    },
    end() { done = true; timers.forEach(clearTimeout); },
  };
}

export const createAgent = createScriptedAgent;

/* ---------------- Call review ----------------
 * Scores the real transcript on five sales basics, from what the rep actually said.
 * Rule-based for now; the live agent can return its own scores in the same shape later.
 */
export type Turn = { who: "buyer" | "you"; text: string };
export type Score = { label: string; score: number; tip: string };
export type Moment = { label: string; quote: string; good: boolean; comment: string };
export type Review = {
  scores: Score[]; total: number; note: string;
  verdict: string;
  /** share of words spoken by you (0 to 1); good discovery calls sit around 40 to 50% */
  talk: number; questions: number; facts: number;
  moments: Moment[];
  /** a better line to try next time, aimed at the weakest skill */
  tryNext: { skill: string; line: string };
};

const QUESTION = /\?|^\s*(what|how|why|when|who|which|where|could|can you|do you|does|are you|is it|is that|would|have you|tell me)\b/i;
const clamp = (n: number) => Math.max(1, Math.min(5, n));

export function reviewCall(buyer: Buyer, lines: Turn[], booked: boolean): Review {
  const s = SCRIPTS[buyer.id];
  const you = lines.filter((l) => l.who === "you").map((l) => l.text);
  const first = you[0] ?? "";
  const asked = you.filter((t) => QUESTION.test(t)).length;

  // 1. opening: greeting, who you are, permission, a reason for calling
  const opening = !first ? 1 : clamp(1
    + +/\b(hi|hello|hey|good (morning|afternoon|evening))\b/i.test(first)
    + +/\b(i'?m|i am|my name|this is|calling from|comprinno)\b/i.test(first)
    + +/(good time|a minute|quick|bad time|is now|seconds|briefly|caught you)/i.test(first)
    + +/(because|reason|noticed|saw|reaching out|calling about)/i.test(you.slice(0, 2).join(" ")));

  // 2. discovery: how many questions you asked
  const discovery = clamp(1 + asked);

  // 3. objection: your reply right after the push-back
  const objIdx = lines.findIndex((l) => l.who === "buyer" && l.text === s.objection);
  const reply = objIdx >= 0 ? lines.slice(objIdx + 1).find((l) => l.who === "you")?.text : undefined;
  const objection = !reply ? 1 : clamp(2
    + +/(understand|fair|makes sense|totally|appreciate|good to hear|great that|got it|i hear you|that's right)/i.test(reply)
    + +QUESTION.test(reply)
    - +/(but we|we are better|we're better|cheaper|the best|unlike them|no one else)/i.test(reply)
    + +(reply.split(" ").length >= 6));

  // 4. value in their words: how much of the research you brought up
  const hits = s.hooks.filter((h) => you.some((t) => h.match.test(t))).length;
  const value = [1, 3, 4, 5][hits];

  // 5. next step: did you ask for the meeting, and get it
  const nextStep = booked ? 5 : you.some((t) => ASK.test(t)) ? 3 : 1;

  const name = buyer.name.split(" ")[0];
  const scores: Score[] = [
    { label: "Opening and permission", score: opening, tip: "Open with who you are, why you're calling, and ask if now is a good time." },
    { label: "Discovery questions", score: discovery, tip: "Ask more before you pitch: what's changing, what's hard, what happens if nothing changes." },
    { label: "Handling the objection", score: objection, tip: `When ${name} pushed back, acknowledge it and ask why before you answer.` },
    { label: "Value in their words", score: value, tip: "Use the brief: name the specific things the AI found about their company." },
    { label: "Clear next step", score: nextStep, tip: "Ask for a specific 30-minute slot. A clear ask gets a clear answer." },
  ];
  const total = scores.reduce((a, b) => a + b.score, 0);
  const weakest = [...scores].sort((a, b) => a.score - b.score)[0];

  let note: string;
  if (you.length === 0) note = "The call ended before you said anything. Start again and open with who you are and why you're calling.";
  else {
    const strong = scores.filter((x) => x.score >= 4).map((x) => x.label.toLowerCase());
    note = (strong.length ? `Strong ${strong.slice(0, 2).join(" and ")}. ` : "A start. ")
      + (booked ? "You booked the meeting. " : "")
      + (weakest.score < 4 ? weakest.tip : "A well-run call. Try a tougher buyer next.");
  }

  const words = (arr: string[]) => arr.join(" ").split(/\s+/).filter(Boolean).length;
  const youW = words(you), buyerW = words(lines.filter((l) => l.who === "buyer").map((l) => l.text));
  const ask = [...you].reverse().find((t) => ASK.test(t));
  const cut = (t?: string) => (!t ? "" : t.length > 110 ? t.slice(0, 107).trimEnd() + "…" : t);

  const moments: Moment[] = [
    { label: "Your opening", quote: cut(first), good: opening >= 4,
      comment: !first ? "You didn't open." : opening >= 4 ? "Clear, polite, with a reason to listen." : "Missing a part: who you are, why you're calling, or asking for time." },
    { label: `${name}'s push-back`, quote: cut(reply), good: objection >= 4,
      comment: !reply ? "The call ended before you answered it." : objection >= 4 ? "You heard it out before answering." : "You answered it. Acknowledge it and ask why first." },
    { label: "The ask", quote: cut(ask), good: booked,
      comment: booked ? "Specific ask, meeting booked." : ask ? `${name} wasn't ready: show you know the account first.` : "You never asked for the meeting." },
  ];

  const co = buyer.co.split(" · ")[0];
  const goal = buyer.goal.replace(/^Book an? /i, "");
  const LINES: Record<string, string> = {
    "Opening and permission": `Hi ${name}, this is [your name] from Comprinno. I'll keep it short: I'm calling about something I noticed at ${co}. Is now a bad time?`,
    "Discovery questions": `Before I tell you anything about us: I read "${buyer.found[1]}". How is the team handling that today?`,
    "Handling the objection": `That's fair, I hear "${buyer.watch.replace(/\.$/, "")}" a lot. What would have to be true for a second opinion to be worth 30 minutes?`,
    "Value in their words": `I noticed "${buyer.found[0]}" and "${buyer.found[2]}". Teams in that spot usually feel it first in delivery speed. Is that true for you?`,
    "Clear next step": `Would Thursday at 11 work for a ${goal}? I'll send the invite with a short agenda.`,
  };
  const pick = weakest.score >= 4 ? "Clear next step" : weakest.label;

  return {
    scores, total, note,
    verdict: you.length === 0 ? "No call yet" : total >= 21 ? "Ready for the floor" : total >= 15 ? "Close. One fix away" : "Keep practising",
    talk: youW + buyerW ? youW / (youW + buyerW) : 0,
    questions: asked, facts: hits,
    moments,
    tryNext: { skill: pick, line: LINES[pick] },
  };
}
