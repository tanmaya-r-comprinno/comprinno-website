import type { Metadata } from "next";
import { Suspense } from "react";
import { getJobs } from "@/lib/keka";
import JobsBoard from "./JobsBoard";
import { Button, Container, CtaBand, Eyebrow, Section, SectionHead } from "@/components/ui";
import { IconTile, type IconName } from "@/components/Icon";
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

// Life at Comprinno photos (public/careers). Greyscale, full colour on hover.
// Mosaic on 4 columns: big = 2x2, wide = 2x1, tall = 1x2. Order fills the grid with no gaps.
const BIG = "col-span-2 row-span-2";
const WIDE = "col-span-2";
const TALL = "row-span-2";
const photos: { src: string; alt: string; cls?: string; pos?: string }[] = [
  { src: "/careers/life-festive-day.webp", alt: "The team dressed up for a festive day at the office", cls: BIG },
  { src: "/careers/life-cricket-team.webp", alt: "Team cricket match at an indoor ground", cls: TALL },
  { src: "/careers/life-knowledge-session.webp", alt: "An engineer walking the team through a security report" },
  { src: "/careers/life-movie-outing.webp", alt: "Team movie outing" },
  { src: "/careers/life-drum-circle.webp", alt: "Drum circle team activity", cls: TALL },
  { src: "/careers/life-team-selfie.webp", alt: "Big team selfie in the office", cls: WIDE, pos: "object-[50%_40%]" },
  { src: "/careers/life-welcome-cake.webp", alt: "Cutting a welcome-aboard cake for new joiners", cls: TALL },
  { src: "/careers/life-team-huddle.webp", alt: "A team working together on laptops" },
  { src: "/careers/life-leadership-talk.webp", alt: "Leadership talking with the team" },
  { src: "/careers/life-town-hall.webp", alt: "Team town hall on the office floor", cls: WIDE, pos: "object-[50%_55%]" },
  { src: "/careers/life-office-floor.webp", alt: "Our office floor under the green ceiling" },
  { src: "/careers/life-cafeteria-meetup.webp", alt: "Team catch-up in the cafeteria" },
];

async function OpenRoles() {
  const jobs = await getJobs();
  return <JobsBoard jobs={jobs} mail={site.emails.careers} />;
}

export default function CareersPage() {
  return (
    <div className="brand">
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
        <Suspense fallback={<div className="h-64 animate-pulse border border-line bg-bg" />}>
          <OpenRoles />
        </Suspense>
      </Section>

      {/* LIFE */}
      <Section>
        <SectionHead eyebrow="Life at Comprinno" title={<>More than code. <strong>More than cloud.</strong></>} desc="Team days, offsites and the everyday moments in between." />
        <div className="grid auto-rows-[9rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[11rem] lg:auto-rows-[13rem] lg:grid-cols-4">
          {photos.map((p) => (
            <figure key={p.src} className={`group relative overflow-hidden border border-line bg-surface ${p.cls ?? ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover ${p.pos ?? ""} grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none`} />
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
    </div>
  );
}
