import type { Metadata } from "next";
import { Checklist, CtaBand, PageHero, Section, SectionHead, StackCards } from "@/components/ui";
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
        eyebrow="Partnerships / AWS"
        title="AWS Premier Tier Services Partner"
        desc="Joined the AWS Partner Network in 2017. Today: Premier Tier, AWS MSP, Level 1 MSSP, eight AWS Competencies and 19 Service Validations."
      />
      <Section>
        <AwsCredentials />
        <div className="mt-10">
          <p className="mb-3 label">Also certified</p>
          <Checklist items={credentials.filter((c) => !c.startsWith("AWS"))} />
        </div>
      </Section>
      <Section tone="surface">
        <SectionHead eyebrow="Ecosystem" title="Partners beyond AWS" />
        <StackCards>
          {partnerPages.filter((p) => p.slug !== "aws").map((p) => (
            <Link key={p.slug} href={p.href} className="card block">
              <IconTile name={p.icon} />
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </Link>
          ))}
        </StackCards>
      </Section>
      <CtaBand />
    </>
  );
}
