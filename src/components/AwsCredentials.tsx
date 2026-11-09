import { Icon } from "./Icon";
import { SectionHead, Stat } from "./ui";
import { awsCertifications, awsCompetencies, awsHeadline, awsPrograms, awsValidations } from "@/content/aws";

/** AWS credentials, shown as data: headline numbers, competency badges, a validation cloud. */
export default function AwsCredentials({ compact = false }: { compact?: boolean }) {
  // Home page: just the four headline numbers. Full detail lives on /partnerships/aws.
  if (compact) {
    return (
      <div>
        <SectionHead eyebrow="AWS credentials" title="Validated by AWS, not just partnered" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {awsHeadline.slice(0, 4).map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </div>
    );
  }
  return (
    <div>
      <SectionHead
        eyebrow="AWS credentials"
        title={<><strong>Validated by AWS</strong>, not just partnered.</>}
        desc="Every tier, competency and validation is independently reviewed by AWS."
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {awsHeadline.map((s) => <Stat key={s.label} {...s} />)}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* 8 competencies as badges */}
        <div>
          <p className="label">8 AWS competencies</p>
          <ul className="mt-3 grid grid-cols-2 gap-3">
            {awsCompetencies.map((c) => (
              <li key={c.name} className="card !p-3 flex items-center gap-3">
                <span className="icon-tile !h-10 !w-10 shrink-0"><Icon name={c.icon} className="h-5 w-5" /></span>
                <span className="text-sm font-medium leading-snug text-ink">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 19 service validations as a chip cloud */}
        <div>
          <p className="label">19 AWS service validations</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {awsValidations.map((v) => (
              <li key={v} className="aws-chip inline-flex items-center gap-1.5 rounded-sm border border-line bg-bg px-2.5 py-1.5 text-xs text-ink-2">
                <Icon name="check" className="h-3.5 w-3.5 text-ok" />
                {v}
              </li>
            ))}
          </ul>

          {!compact && (
            <>
              <p className="mt-8 label">Programs</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {awsPrograms.map((p) => <li key={p} className="tag">{p}</li>)}
              </ul>
              <p className="mt-8 label">Team certifications include</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {awsCertifications.map((p) => <li key={p} className="tag">{p}</li>)}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
