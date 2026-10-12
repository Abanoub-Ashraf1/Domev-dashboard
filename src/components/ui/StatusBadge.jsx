import { STATUS_LABELS } from "../../config/constants";

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge--${status.toLowerCase()}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
