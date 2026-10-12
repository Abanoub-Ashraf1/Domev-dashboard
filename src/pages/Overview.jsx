import { Link } from "react-router-dom";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import StatsStrip from "../components/overview/StatsStrip";
import PendingQueue from "../components/overview/PendingQueue";
import { useDashboardStats } from "../hooks/useDashboardStats";

export default function Overview() {
  const { data, loading, error, reload } = useDashboardStats();

  if (loading && !data) return <LoadingState label="Loading summary…" />;
  if (error && !data) return <ErrorState error={error} onRetry={reload} />;

  const { pendingCount, recentPending, chargers } = data;

  return (
    <div className="page">
      <div className="page__intro">
        <h2 className="page__heading">
          {pendingCount > 0
            ? `${pendingCount} ${pendingCount === 1 ? "request is" : "requests are"} waiting for review`
            : "No requests are waiting for review"}
        </h2>
        {pendingCount > 0 && <Link to="/validations" className="btn btn--primary">Review requests</Link>}
      </div>

      <StatsStrip pendingCount={pendingCount} chargers={chargers} />
      <PendingQueue requests={recentPending} />
    </div>
  );
}
