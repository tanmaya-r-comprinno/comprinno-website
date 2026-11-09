import type { Metadata } from "next";
import { Br, Checklist, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import AwsCredentials from "@/components/AwsCredentials";
import { IconTile } from "@/components/Icon";
import Link from "next/link";
import { credentials } from "@/content/company";
import { partnerPages } from "@/content/products";

export const metadata: Metadata = {
  title: "AWS Premier Tier Partner",
  description: "Comprinno is an AWS Premier Tier Services Partner and MSP with eight AWS Competencies.",
  alternates: { canonical: "/partnerships/aws" },
};

export default function AwsPage() {
  return (
    <>
      <PageHero
        eyebrow="AWS Premier Tier Partner"
        title="AWS Premier Tier Services Partner"
        desc="In the AWS Partner Network since 2017. Today: Premier Tier, AWS MSP, Level 1 MSSP, eight AWS Competencies and 19 Service Validations."
      />
      <Section>
        <AwsCredentials />
      </Section>
      <Section>
        <SectionHead
          eyebrow="Also certified"
          title={<>Audited <strong>beyond AWS</strong>.</>}
          desc="Independent certifications that cover how we run security and operations."
        />
        <div className="mx-auto max-w-3xl">
          <Checklist items={credentials.filter((c) => !c.startsWith("AWS"))} />
        </div>
      </Section>
      <Section tone="surface">
        <SectionHead
          eyebrow="Ecosystem"
          title={<>Partners <strong>beyond AWS</strong>.</>}
          desc="The AI and data partners we build with alongside AWS."
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-3">
          {partnerPages.filter((p) => p.slug !== "aws").map((p) => (
            <Link key={p.slug} href={p.href} className="card block">
              <IconTile name={p.icon} />
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand title={<>Put an <strong>AWS Premier Tier</strong><Br /> partner to work.</>} desc="Talk to certified AWS experts about your next project." />
    </>
  );
}
