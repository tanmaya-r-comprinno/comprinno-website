import Link from "next/link";
import { serviceSeo, type ServiceSlug } from "@/lib/seo";

export default function RelatedService({ slug }: { slug: ServiceSlug | null }) {
  if (!slug) return null;
  return (
    <div className="mt-6 border border-line bg-surface p-4">
      <p className="text-sm text-muted">Explore the related service</p>
      <Link href={`/services/${slug}`} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-ink underline underline-offset-4">
        {serviceSeo[slug].title} →
      </Link>
    </div>
  );
}
