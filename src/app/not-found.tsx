import type { Metadata } from "next";
import Link from "next/link";
import GridGlow from "@/components/GridGlow";
import { Button, Container, Eyebrow } from "@/components/ui";
import { IconTile, type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// where most visitors were probably heading
const shortcuts: { icon: IconName; t: string; d: string; href: string }[] = [
  { icon: "layers", t: "Services", d: "Migrate, modernize, manage and maximize with AI.", href: "/#services" },
  { icon: "chart", t: "Case studies", d: "Production results across cloud and AI.", href: "/resources/case-studies" },
  { icon: "cloud", t: "Platform", d: "Tevico, the autopilot for cloud operations.", href: "/platform" },
  { icon: "agent", t: "Accelerators", d: "VeriQ, VoxSphere and Weave.", href: "/products/veriq" },
  { icon: "mail", t: "Contact", d: "Talk to a cloud or AI specialist.", href: "/contact" },
];

/** 404: home-page hero (grid with glowing corners, yellow sweep, blue gradient) + shortcut cards */
export default function NotFound() {
  return (
    <div className="brand">
      <section className="hero-block relative isolate overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-16 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>Error 404 · Page not found</Eyebrow>
            <h1 className="mt-6 font-normal leading-none">
              <strong className="block text-[clamp(6rem,20vw,11rem)] font-bold tracking-tight">404</strong>
            </h1>
            <p className="mt-4 text-[clamp(1.4rem,3vw,2rem)] font-normal leading-snug text-ink">
              This page has <strong className="sweep font-semibold">moved or no longer exists</strong>.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              The link may be from our old website, or it may have a typo. Everything you need is still here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/">Back to home <span className="go">→</span></Button>
              <Button href="/contact" variant="ghost">Talk to an expert</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-14 sm:py-16">
        <Container>
          <p className="text-center font-mono text-xs uppercase tracking-[.14em] text-muted">Or jump straight to</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {shortcuts.map((s) => (
              <li key={s.t}>
                <Link href={s.href} className="card group flex h-full flex-col">
                  <IconTile name={s.icon} />
                  <h2 className="mt-4 flex items-center text-lg font-semibold text-ink">{s.t}<span className="go ml-auto text-muted">→</span></h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
