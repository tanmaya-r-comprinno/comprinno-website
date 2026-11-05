import Link from "next/link";
import { Icon, IconTile, IsoStack, type IconName } from "./Icon";

/** Large art panel: isometric slabs with the offering's icon floating above them. */
export function OfferingArt({ icon }: { icon: IconName }) {
  return (
    <div className="bg-grid relative flex aspect-[4/3] w-full items-end justify-center overflow-hidden rounded-md border border-line bg-surface" aria-hidden="true">
      <IsoStack className="w-[78%] max-w-sm translate-y-6" />
      <span className="iso-float absolute left-1/2 top-[14%] -ml-12 inline-flex h-24 w-24 items-center justify-center rounded-md border border-line-strong bg-bg text-ink-2 shadow-sm">
        <Icon name={icon} className="h-12 w-12" />
      </span>
    </div>
  );
}

/** Big stacking card for a service offering: text left, art right. */
export default function OfferingCard({
  icon,
  title,
  desc,
  cta,
}: {
  icon: IconName;
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <div className="card grid items-center gap-8 !p-6 sm:!p-8 md:min-h-[440px] md:grid-cols-[1fr_1.1fr]">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3">
          <IconTile name={icon} />
        </div>
        <h3 className="mt-6 text-2xl font-semibold leading-tight sm:text-3xl">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{desc}</p>
        <Link href="/contact" className="mt-6 inline-block text-sm font-medium text-ink md:mt-auto md:pt-6">
          {cta} <span className="go">→</span>
        </Link>
      </div>
      <OfferingArt icon={icon} />
    </div>
  );
}
