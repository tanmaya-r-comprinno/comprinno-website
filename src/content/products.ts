import type { IconName } from "@/components/Icon";

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  desc: string;
  icon: IconName;
  href: string;
  features: { title: string; desc: string; icon: IconName }[];
  status?: "placeholder";
};

// Tevico, VeriQ and VoxSphere are named on comprinno.net.
export const products: Product[] = [
  {
    slug: "tevico",
    name: "Tevico",
    category: "Cloud operations",
    tagline: "Autopilot for cloud operations",
    desc: "An AI-native managed cloud service run by SRE agents. Routine work runs itself, and high-impact actions wait for human sign-off.",
    icon: "cloud",
    href: "/products/tevico",
    features: [
      { title: "SRE agents", desc: "Investigate alerts and attach evidence.", icon: "agent" },
      { title: "Human sign-off", desc: "Approve high-impact actions.", icon: "check" },
      { title: "Command Center", desc: "Role-based views for every team.", icon: "eye" },
    ],
  },
  {
    slug: "veriq",
    name: "VeriQ",
    category: "Due diligence",
    tagline: "Due-diligence questionnaires, answered",
    desc: "Completes security and due-diligence questionnaires. TBD: full product description.",
    icon: "shield",
    href: "/products/veriq",
    features: [
      { title: "Questionnaire intake", desc: "TBD", icon: "database" },
      { title: "Evidence-backed answers", desc: "TBD", icon: "check" },
      { title: "Review & export", desc: "TBD", icon: "eye" },
    ],
  },
  {
    slug: "voxsphere",
    name: "VoxSphere",
    category: "Voice AI",
    tagline: "Voice agents for support and outbound calls",
    desc: "Voice AI for support and outbound calls. TBD: full product description.",
    icon: "phone",
    href: "/products/voxsphere",
    features: [
      { title: "Inbound support", desc: "TBD", icon: "phone" },
      { title: "Outbound calls", desc: "TBD", icon: "rocket" },
      { title: "Call insights", desc: "TBD", icon: "chart" },
    ],
  },
  {
    slug: "decivo",
    name: "Decivo",
    category: "Agentic process transformation",
    tagline: "Turn business processes into AI-powered operations",
    desc: "A multi-agent orchestration platform that turns business processes into production AI workflows, supervised by your people and deployed in your own cloud.",
    icon: "layers",
    href: "/products/decivo",
    features: [
      { title: "Agents that work as a team", desc: "Specialized agents coordinate through one workflow.", icon: "agent" },
      { title: "Runs in your cloud", desc: "Your data, infrastructure and policies stay yours.", icon: "cloud" },
      { title: "People stay in charge", desc: "Humans supervise approvals and exceptions.", icon: "users" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const partnerPages: { slug: string; name: string; badge: string; desc: string; icon: IconName; href: string; hidden?: boolean }[] = [
  {
    slug: "aws",
    name: "AWS",
    badge: "Premier Tier Services Partner",
    desc: "Premier Tier Services Partner and MSP.",
    icon: "cloud" as IconName,
    href: "/partnerships/aws",
  },
  {
    slug: "openai",
    name: "OpenAI",
    badge: "Select Partner",
    desc: "OpenAI Select Partner for enterprise applications.",
    icon: "spark" as IconName,
    href: "/partnerships/openai",
  },
  {
    slug: "anthropic",
    name: "Anthropic",
    badge: "Partner",
    desc: "Claude models for enterprise agents and applications.",
    icon: "spark" as IconName,
    href: "/partnerships/anthropic",
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    badge: "Partner",
    desc: "Voice AI technology for agents that speak.",
    icon: "phone" as IconName,
    href: "/partnerships/elevenlabs",
    hidden: true, // hidden for now: kept in code, not listed or routed
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    badge: "Partner",
    desc: "MongoDB Atlas deployments and migrations, including near real-time sync during cloud moves.",
    icon: "database" as IconName,
    href: "/partnerships/mongodb",
    hidden: true, // hidden for now: kept in code, not listed or routed
  },
];

/** Partners shown on the site. Set `hidden: true` above to take one offline without deleting it. */
export const visiblePartners = partnerPages.filter((p) => !p.hidden);
