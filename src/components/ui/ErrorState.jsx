import { TriangleAlert } from "lucide-react";

export default function ErrorState({ error, onRetry, title = "Couldn't load this data" }) {
  return (
    <div className="state state--error" role="alert">
      <TriangleAlert size={32} aria-hidden="true" className="state__icon" />
      <h3>{title}</h3>
      <p>{error?.message || "Something went wrong. Try again."}</p>
      {onRetry && (
        <button type="button" className="btn btn--secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
