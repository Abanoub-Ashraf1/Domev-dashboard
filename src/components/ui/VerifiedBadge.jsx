import { BadgeCheck, CircleDashed } from "lucide-react";

export default function VerifiedBadge({ verified }) {
  return verified ? (
    <span className="status-badge status-badge--accepted">
      <BadgeCheck size={15} aria-hidden="true" /> Verified
    </span>
  ) : (
    <span className="status-badge status-badge--neutral">
      <CircleDashed size={15} aria-hidden="true" /> Not verified
    </span>
  );
}
