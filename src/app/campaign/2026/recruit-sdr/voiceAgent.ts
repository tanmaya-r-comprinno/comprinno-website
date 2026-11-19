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
