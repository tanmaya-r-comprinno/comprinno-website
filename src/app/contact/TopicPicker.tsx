"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * "What can we help with?" radios. A link such as /contact?topic=Managed%20services&from=/services/manage
 * preselects the topic and records the originating page in a hidden "source" field.
 */
function Picker({ topics, label, topic, from }: { topics: string[]; label: string; topic?: string | null; from?: string | null }) {
  return (
    <fieldset>
      <legend className={label}>What can we help with?</legend>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {topics.map((t, i) => (
          <label key={t} className="cursor-pointer">
            <input type="radio" name="topic" value={t} required={i === 0} defaultChecked={t === topic} className="peer sr-only" />
            <span className="block border border-line-strong bg-bg px-2.5 py-1.5 text-xs text-ink transition hover:border-[#006bc9] hover:text-[#006bc9] peer-checked:border-[#006bc9] peer-checked:bg-[#006bc9] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent">{t}</span>
          </label>
        ))}
      </div>
      {from && <input type="hidden" name="source" value={from.slice(0, 200)} />}
    </fieldset>
  );
}

function FromUrl(props: { topics: string[]; label: string }) {
  const sp = useSearchParams();
  return <Picker {...props} topic={sp.get("topic")} from={sp.get("from")} />;
}

export default function TopicPicker(props: { topics: string[]; label: string }) {
  return (
    <Suspense fallback={<Picker {...props} />}>
      <FromUrl {...props} />
    </Suspense>
  );
}
