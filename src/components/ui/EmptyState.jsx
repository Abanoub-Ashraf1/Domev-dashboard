import { Inbox } from "lucide-react";

export default function EmptyState({ title, message, action }) {
  return (
    <div className="state">
      <Inbox size={32} aria-hidden="true" className="state__icon" />
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}
