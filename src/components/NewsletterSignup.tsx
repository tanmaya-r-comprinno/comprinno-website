import Link from "next/link";
import { newsletterSignupUrl } from "@/lib/newsletter";

export default function NewsletterSignup({ footer = false }: { footer?: boolean }) {
  const signupUrl = newsletterSignupUrl();
  if (!signupUrl) {
    return (
      <div className="mt-4">
        <p className={`text-sm ${footer ? "text-white/70" : "text-muted"}`}>Newsletter signup is temporarily unavailable.</p>
        <Link href="/resources/blog" className={`mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 ${footer ? "text-white" : "text-ink"}`}>
          Read the latest insights →
        </Link>
      </div>
    );
  }
  return (
    <a href={signupUrl} target="_blank" rel="noopener noreferrer" className={footer
      ? "mt-4 inline-flex min-h-12 items-center bg-[#ffbb00] px-4 text-sm font-semibold text-[#0a134b] transition-colors hover:bg-[#ffcd3a]"
      : "btn btn-primary mt-4 min-h-12"}>
      Subscribe to CloudScape ↗
    </a>
  );
}
