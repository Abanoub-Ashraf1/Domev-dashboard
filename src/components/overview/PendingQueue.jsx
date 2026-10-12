import { Link } from "react-router-dom";
import { formatRelative } from "../../utils/format";

export default function PendingQueue({ requests }) {
  return (
    <section className="panel" aria-labelledby="queue-title">
      <div className="panel__head">
        <h2 id="queue-title" className="panel__title">Waiting for review</h2>
        <Link to="/validations">See all requests</Link>
      </div>
      {requests.length === 0 ? (
        <p className="muted">All caught up. New submissions will appear here.</p>
      ) : (
        <ul className="activity">
          {requests.map((request) => (
            <li key={request.id}>
              <Link to={`/validations/${request.id}`} className="activity__item">
                <div>
                  <p className="activity__name">{request.charger.name}</p>
                  <p className="muted">
                    Submitted {formatRelative(request.submittedAt)}
                    {request.submittedBy?.name && ` by ${request.submittedBy.name}`}
                  </p>
                </div>
                <span className="muted">{request.images.length} photos</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
