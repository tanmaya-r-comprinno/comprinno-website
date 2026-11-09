import Image from "next/image";
import clientLogos from "@/content/clientLogos.json";
import { Container } from "./ui";

/** "Trusted by" strip: client logos scrolling in a loop. Heights are pre-balanced per logo. */
export default function LogoMarquee() {
  return (
    <section className="border-b border-line py-8">
      <Container>
        <p className="text-center font-mono text-xs text-muted">Trusted by 750+ high-growth and enterprise brands</p>
      </Container>
      <div className="marquee mt-5">
        <ul className="marquee-track logo-track">
          {[...clientLogos, ...clientLogos].map((c, i) => {
            // heights are pre-balanced per logo (aspect ratio + ink density) so they read equally
            const h = Math.round(c.height * 1.0); // 25% smaller than before (was ×1.35)
            return (
              <li key={`${c.slug}-${i}`} aria-hidden={i >= clientLogos.length} className="logo-item">
                <Image src={`/clients/${c.slug}.png`} alt={i >= clientLogos.length ? "" : c.name} width={Math.round((h * c.w) / c.h)} height={h} loading="lazy" style={{ height: h, width: "auto" }} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
