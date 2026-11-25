import Image from "next/image";

type Host = { n: string; r: string };

// soft pastels, one per pill (reference: tall pills, greyscale cut-outs, name on top)
const TINTS = ["#f4c3d3", "#d3dde2", "#e9e3da", "#f5cf5a", "#cfe6d8", "#ddd6f3", "#f6d6bd"];

// staggered columns: which hosts go in each column, and how far each column drops
const COLUMNS: { ids: number[]; drop: string }[] = [
  { ids: [0, 4], drop: "mt-0" },
  { ids: [1, 5], drop: "mt-10 sm:mt-16" },
  { ids: [2, 6], drop: "mt-4 sm:mt-6" },
  { ids: [3], drop: "self-center" }, // single pill: centred against the two-pill columns
];

const photo = (name: string) => `/campaign/reinvent/hosts/${name.toLowerCase().replace(/\s+/g, "-")}.webp`;
// the site forces square corners on every element, so the pill shape comes from clip-path, which that rule can't touch
const PILL = { clipPath: "inset(0 round 999px)" };

/** Hero collage of the hosts: pastel pills, greyscale photos (colour on hover), name and role on top. */
export default function HostCollage({ hosts }: { hosts: Host[] }) {
  return (
    <div className="relative mx-auto grid w-full max-w-xl grid-cols-4 gap-2.5 sm:gap-3.5" aria-label="Your hosts at re:Invent 2026">

      {COLUMNS.map((col, c) => (
        <div key={c} className={`flex flex-col gap-2.5 sm:gap-3.5 ${col.drop}`}>
          {col.ids.map((i) => {
            const h = hosts[i];
            if (!h) return null;
            return (
              <figure key={h.n} className="group relative aspect-[5/9] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] will-change-transform hover:z-10 hover:scale-[1.06] sm:aspect-[5/10.5] motion-reduce:transition-none" style={{ ...PILL, background: TINTS[i % TINTS.length] }}>
                <figcaption className="absolute inset-x-0 top-[14%] z-10 px-[13%] text-center">
                  <span className="block text-[.48rem] font-bold uppercase leading-tight tracking-wide text-neutral-900 [text-wrap:balance] min-[420px]:text-[.55rem] sm:text-[.62rem]">{h.n}</span>
                  <span className="mt-0.5 hidden text-[.56rem] leading-tight text-neutral-700 [text-wrap:balance] sm:block">{h.r}</span>
                </figcaption>
                <Image
                  src={photo(h.n)}
                  alt=""
                  width={640}
                  height={640}
                  sizes="(min-width: 1024px) 180px, 32vw"
                  className="absolute bottom-0 left-1/2 w-[128%] max-w-none sm:w-[120%] -translate-x-1/2 grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                />
              </figure>
            );
          })}
        </div>
      ))}
    </div>
  );
}
