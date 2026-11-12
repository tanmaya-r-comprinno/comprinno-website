/**
 * AWS Partner, Premier Tier Services badge drawn as vector (crisp at any size).
 * Layout follows the official badge: white plaque with cut corners and an AWS
 * orange border, the AWS logo, "PARTNER" and the tier name.
 */
import { AWS_SMILE, AWS_TEXT } from "./NewsBanner";

export default function AwsPremierBadge({ className = "" }: { className?: string }) {
  // plaque: square with the top-right and bottom-left corners cut
  const shape = "M8 8 H148 L192 52 V192 H52 L8 148 Z";
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="AWS Partner, Premier Tier Services">
      <path d={shape} fill="#ffffff" stroke="#ff9900" strokeWidth="5" strokeLinejoin="miter" />
      <g transform="translate(36 34) scale(2.6)">
        <path d={AWS_TEXT} fill="#232f3e" />
        <path d={AWS_SMILE} fill="#ff9900" />
      </g>
      <text x="164" y="120" textAnchor="end" fontFamily="'Amazon Ember', Inter, Arial, sans-serif" fontSize="23" fontWeight="700" letterSpacing="2.4" fill="#232f3e">PARTNER</text>
      <text x="164" y="140" textAnchor="end" fontFamily="'Amazon Ember', Inter, Arial, sans-serif" fontSize="12.5" fontWeight="500" fill="#232f3e">Premier Tier</text>
      <text x="164" y="155" textAnchor="end" fontFamily="'Amazon Ember', Inter, Arial, sans-serif" fontSize="12.5" fontWeight="500" fill="#232f3e">Services</text>
    </svg>
  );
}
