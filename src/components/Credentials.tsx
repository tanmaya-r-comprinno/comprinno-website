/**
 * Credentials grid: centred cards with the official badge where we have one
 * (public/badges), the OpenAI logo, or a brand icon tile for the rest.
 * Same design as the home page Credentials section.
 */
import { IconTile, type IconName } from "@/components/Icon";
import { partnerLogo } from "@/content/partnerLogos";

type Badge = { src: string; alt: string; w: number; h: number };
const B: Record<string, Badge> = {
  premier: { src: "/badges/aws-premier-tier-color.webp", alt: "AWS Partner, Premier Tier Services badge", w: 120, h: 120 },
  msp: { src: "/badges/aws-msp.webp", alt: "AWS Partner, Managed Service Provider badge", w: 294, h: 294 },
  mssp: { src: "/badges/aws-l1-mssp.webp", alt: "AWS Partner, L1 MSSP Services Competency badge", w: 292, h: 294 },
  iso: { src: "/badges/iso-27001.webp", alt: "ISO 27001 Information Security Management certified", w: 299, h: 250 },
  soc: { src: "/badges/soc-2.webp", alt: "AICPA SOC 2", w: 307, h: 250 },
};

function lookup(label: string): { badges: Badge[]; openai?: boolean; icon: IconName } {
  const l = label.toLowerCase();
  const badges: Badge[] = [];
  if (l.includes("premier")) badges.push(B.premier);
  if (/\bmsp\b|managed service provider/.test(l) && !/^aws level 1 mssp/.test(l)) badges.push(B.msp);
  if (l.includes("mssp")) badges.push(B.mssp);
  if (l.includes("iso 27001")) badges.push(B.iso);
  if (l.includes("soc 2")) badges.push(B.soc);
  const icon: IconName =
    l.includes("migration") ? "migrate" : l.includes("dms") || l.includes("data") ? "database" : l.includes("security") ? "shield" :
    l.includes("resilience") ? "loop" : l.includes("devops") ? "code" : l.includes("generative") || l.includes("collaboration") ? "agent" :
    l.includes("ai") ? "spark" : "check";
  return { badges, openai: l.includes("openai"), icon };
}

export default function Credentials({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((label) => {
        const { badges, openai, icon } = lookup(label);
        return (
          <li key={label} className="card flex flex-col items-center gap-4 text-center text-sm font-semibold text-ink sm:text-base">
            <span className="flex h-20 shrink-0 items-center gap-2">
              {badges.length ? (
                badges.map((b) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={b.src} src={b.src} alt={b.alt} width={b.w} height={b.h} loading="lazy" className="h-full w-auto" />
                ))
              ) : openai ? (
                <span className="flex items-center gap-2 text-ink">
                  <svg viewBox="0 0 24 24" role="img" aria-label="OpenAI" className="h-11 w-11"><path d={partnerLogo.openai.d} fill="currentColor" /></svg>
                  <span className="text-xl font-semibold tracking-tight">OpenAI</span>
                </span>
              ) : (
                <IconTile name={icon} className="cred-tile" />
              )}
            </span>
            {label}
          </li>
        );
      })}
    </ul>
  );
}
