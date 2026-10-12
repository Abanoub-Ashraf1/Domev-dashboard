import SearchInput from "../components/ui/SearchInput";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import VerificationTable from "../components/verifications/VerificationTable";
import { useVerifications } from "../hooks/useVerifications";

export default function ValidationRequests() {
  const { requests, total, loading, error, reload, search, setSearch } = useVerifications();

  return (
    <div className="page">
      <div className="toolbar">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by charger, ID or submitter" />
        <p className="muted">Requests waiting for review</p>
      </div>

      <div className="panel panel--flush" aria-busy={loading}>
        {loading && total === 0 && !error && <LoadingState label="Loading requests…" />}
        {error && <ErrorState error={error} onRetry={reload} title="Couldn't load requests" />}
        {!error && !loading && total === 0 && (
          <EmptyState title="No pending requests" message="New charger verification requests will appear here." />
        )}
        {!error && !loading && total > 0 && requests.length === 0 && (
          <EmptyState
            title="No requests match your search"
            message="Try a different charger name, ID or submitter."
            action={<button type="button" className="btn btn--secondary" onClick={() => setSearch("")}>Clear search</button>}
          />
        )}
        {!error && requests.length > 0 && <VerificationTable requests={requests} />}
      </div>

      {!error && requests.length > 0 && (
        <p className="muted result-count">{requests.length} of {total} {total === 1 ? "request" : "requests"}</p>
      )}
    </div>
  );
}
