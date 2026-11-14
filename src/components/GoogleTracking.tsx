import Script from "next/script";
import { isProduction } from "@/lib/site";

/** GTM owns GA4 when both are configured, avoiding a second Analytics install. */
export default function GoogleTracking() {
  if (process.env.NODE_ENV !== "production" || !isProduction) return null;

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const tagId = gtmId && /^GTM-[A-Z0-9]+$/.test(gtmId)
    ? gtmId
    : gaId && /^G-[A-Z0-9]+$/.test(gaId) ? gaId : null;
  if (!tagId) return null;

  // Google's unified loader supports GTM containers and Google tag IDs.
  // Route page-view measurement belongs to the tag's published configuration.
  return (
    <>
      <Script id="google-tag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
        window.gtag('js', new Date());
      `}</Script>
      <Script id="google-tag" src={`https://www.googletagmanager.com/gtm.js?id=${tagId}`} strategy="afterInteractive" />
    </>
  );
}
