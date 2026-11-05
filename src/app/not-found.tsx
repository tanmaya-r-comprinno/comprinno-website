import { Button, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This agent couldn't find that page." desc="It may have moved while we were redesigning the site.">
      <Button href="/">Back to home</Button>
    </PageHero>
  );
}
