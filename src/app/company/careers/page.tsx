import type { Metadata } from "next";
import { Button, Container, CtaBand, Eyebrow, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import RainField from "@/components/RainField";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Do real cloud and AI work at Comprinno. Work on cloud, security and AI projects for fast-growing companies and enterprises, with the support to keep learning.",
  alternates: { canonical: "/company/careers" },
};

const mail = `mailto:${site.emails.careers}`;

// Hidden for now: the source page marks these "Pending approval". Confirm before showing.
const SHOW_NUMBERS = false as boolean;
const numbers = [
  { value: "750+", label: "Clients" },
  { value: "1,000+", label: "Projects delivered" },
  { value: "100+", label: "Certifications" },
  { value: "3", label: "Offices in Bengaluru and Pune" },
];

const reasons: { title: string; desc: string; icon: IconName }[] = [
  { title: "Competitive compensation", desc: "Pay that reflects your skills and the impact you make.", icon: "coin" },
  { title: "Real cloud and AI work", desc: "Build for fintech, healthcare and SaaS customers on production cloud and AI projects.", icon: "cloud" },
  { title: "Growth mindset", desc: "Experiment, earn certifications and follow a clear career path. Progress over perfection.", icon: "chart" },
  { title: "Collaborative culture", desc: "A supportive team with startup agility and enterprise impact, where every contribution is visible.", icon: "users" },
  { title: "Rewards and recognition", desc: "We celebrate wins, big and small.", icon: "spark" },
  { title: "Flexibility that works", desc: "Flexible timing, built on trust.", icon: "clock" },
];

const departments = ["Engineering", "Data and AI", "Presales", "Sales", "Operations"];

// TODO: add real photos (set src, e.g. "/careers/team-1.jpg"). Shown greyscale, full colour on hover.
const photos: { src?: string; alt: string; cls?: string }[] = [
  { alt: "Candid photo 1", cls: "lg:row-span-2" },
  { alt: "Candid photo 2" },
  { alt: "Candid photo 3" },
  { alt: "Candid photo 4" },
  { alt: "Candid photo 5" },
  { alt: "Candid photo 6", cls: "lg:col-span-2" },
  { alt: "Candid photo 7" },
  { alt: "Candid photo 8" },
  { alt: "Candid photo 9" },
  { alt: "Candid photo 10" },
];

export default function CareersPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>Careers at Comprinno</Eyebrow>
            <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
              Do real cloud and AI work. <strong className="sweep">Keep learning</strong> <strong>while you do it.</strong>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Cloud, security and AI projects for fast-growing companies and enterprises, with the support to keep learning.
            </p>
            <div className="mt-8">
              <Button href="#roles">See open roles →</Button>
            </div>
          </div>
        </Container>
      </section>

      {SHOW_NUMBERS && (
        <Section>
          <dl className="stats bg-bg">
            {numbers.map((st) => (
              <div key={st.label} className="stat">
                <dt className="stat-label">{st.label}</dt>
                <dd className="stat-num">{st.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* WHY */}
      <Section>
        <SectionHead eyebrow="Why Comprinno" title={<>Why engineers <strong>join Comprinno.</strong></>} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="card">
              <IconTile name={r.icon} />
              <h3 className="mt-4 font-semibold text-ink">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OPEN ROLES */}
      <Section tone="surface" id="roles" background={<RainField />}>
        <SectionHead eyebrow="Open roles" title={<>Explore opportunities <strong>at Comprinno.</strong></>} desc="Find a role across engineering, data and AI, presales, sales and operations." />
        {/* TODO: connect the Keka job feed here. Until then this shows an empty state. */}
        <div className="border border-line bg-bg">
          <div className="grid gap-3 border-b border-line p-4 sm:grid-cols-[1fr_auto]">
            <label className="flex items-center gap-2 border border-line px-3 py-2 text-sm text-muted">
              <Icon name="search" className="h-4 w-4 shrink-0" />
              <input type="search" placeholder="Search roles" disabled className="w-full bg-transparent outline-none placeholder:text-muted" />
            </label>
            <ul className="flex flex-wrap gap-2">
              {departments.map((d) => <li key={d} className="tag">{d}</li>)}
            </ul>
          </div>
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <IconTile name="users" />
            <h3 className="mt-4 text-lg font-semibold text-ink">Roles are being updated.</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Our openings will be listed here soon. In the meantime, send your resume to{" "}
              <a href={mail} className="font-medium text-ink underline underline-offset-2">{site.emails.careers}</a> and tell us what you&apos;d like to work on.
            </p>
          </div>
        </div>
      </Section>

      {/* LIFE */}
      <Section>
        <SectionHead eyebrow="Life at Comprinno" title={<>More than code. <strong>More than cloud.</strong></>} desc="Team days, offsites and the everyday moments in between." />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {photos.map((p) => (
            <figure key={p.alt} className={`group relative min-h-44 overflow-hidden border border-line bg-surface ${p.cls ?? ""}`}>
              {p.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.src} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none" />
              ) : (
                <div className="bg-grid absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-200 to-violet-200 grayscale transition duration-500 group-hover:grayscale-0 motion-reduce:transition-none">
                  <span className="border border-line-strong bg-bg px-3 py-1.5 font-mono text-[0.7rem] text-muted">{p.alt}</span>
                </div>
              )}
            </figure>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Join us"
        title={<>Don&apos;t see your role? <strong>Talk to us anyway.</strong></>}
        desc={`Send your resume to ${site.emails.careers} and tell us what you'd like to work on.`}
        steps={[]}
        label="Send your resume"
        href={mail}
      />
    </>
  );
}
