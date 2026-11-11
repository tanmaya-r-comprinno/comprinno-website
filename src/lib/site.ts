export const site = {
  name: "Comprinno",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://comprinno.net",
  tagline: "Agentic AI first. Built for the cloud.",
  description:
    "Comprinno is an agentic-AI-first Premier Tier cloud partner. We migrate, modernize and run your cloud, then build, govern and scale AI agents on it.",
  phone: "+91 8149952129",
  emails: {
    general: "info@comprinno.net",
    sales: "sales@comprinno.net",
    support: "support@comprinno.net",
    careers: "career@comprinno.net",
  },
  social: {
    x: "https://x.com/comprinnotech",
    linkedin: "https://www.linkedin.com/company/comprinnotech/",
    instagram: "https://www.instagram.com/comprinnotech/",
  },
  offices: [
    {
      city: "Bengaluru",
      label: "Headquarters",
      address:
        "#77, 4th Cross, Reliable Tranquil Layout, Harlur Road, Bengaluru, Karnataka 560102",
    },
    {
      city: "Bengaluru",
      label: "Canvas Workspace, HSR Layout",
      address:
        "1331 Canvas Workspace, 2nd Floor, 24th Main Road, 2nd Sector, HSR Layout, Bengaluru, Karnataka 560102",
    },
    {
      city: "Pune",
      label: "Teerth Techno Space",
      address:
        "Office A 1101, VeerBhadra Nagar Road, Mahalunge, Pune, Maharashtra 411045",
    },
    {
      city: "Pune",
      label: "Sadanand Business Center",
      address: "Pashan Highway Side Road, Mahalunge, Pune, Maharashtra 411045",
    },
  ],
};

export type NavGroup = {
  label: string;
  href?: string;
  items?: { label: string; href: string; hint?: string; badge?: string; hidden?: boolean }[];
};

export const nav: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "Migrate", href: "/services/migrate", hint: "Migration factory" },
      { label: "Modernize", href: "/services/modernize", hint: "DevOps & app modernization" },
      { label: "Manage", href: "/services/manage", hint: "Managed cloud & security" },
      { label: "Maximize", href: "/services/maximize", hint: "Agentic & applied AI" },
    ],
  },
  { label: "Industries", href: "/industries" },
  {
    label: "Products",
    items: [
      { label: "Tevico", href: "/products/tevico", hint: "Cloud operations autopilot" },
      { label: "VeriQ", href: "/products/veriq", hint: "Due-diligence questionnaires" },
      { label: "VoxSphere", href: "/products/voxsphere", hint: "Voice AI" },
      { label: "Decivo", href: "/products/decivo", hint: "Multi-agent orchestration", badge: "Beta" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Case studies", href: "/resources/case-studies" },
      { label: "Blog", href: "/resources/blog" },
      { label: "Newsroom", href: "/resources/newsroom" },
    ],
  },
  {
    label: "Partnerships",
    items: [
      { label: "AWS", href: "/partnerships/aws", hint: "Premier Tier Partner" },
      { label: "OpenAI", href: "/partnerships/openai", hint: "Select Partner" },
      { label: "Anthropic", href: "/partnerships/anthropic", hint: "Claude models" },
      { label: "ElevenLabs", href: "/partnerships/elevenlabs", hint: "Voice AI", hidden: true },
      { label: "MongoDB", href: "/partnerships/mongodb", hint: "Atlas & migrations", hidden: true },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About us", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
];
