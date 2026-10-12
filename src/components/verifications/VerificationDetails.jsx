import { Cable, Hash, MapPin, User, Zap } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import VerifiedBadge from "../ui/VerifiedBadge";
import { STATUS } from "../../config/constants";
import { formatDateTime } from "../../utils/format";

export default function VerificationDetails({ request }) {
  const { charger, submittedBy } = request;
  const mapsUrl = charger.location ? `https://www.google.com/maps?q=${charger.location.lat},${charger.location.lng}` : null;
  const power = [charger.power != null ? `${charger.power} kW` : "", charger.powerType].filter(Boolean).join(" · ");

  return (
    <section className="panel" aria-labelledby="details-title">
      <div className="details__head">
        <div>
          <h2 id="details-title" className="details__name">{charger.name}</h2>
          <p className="muted">{charger.operator || "Operator not provided"}</p>
        </div>
        <div className="details__badges">
          <StatusBadge status={request.status} />
          <VerifiedBadge verified={charger.isVerified} />
        </div>
      </div>

      <dl className="facts">
        <div className="facts__row">
          <dt><MapPin size={16} aria-hidden="true" /> Address</dt>
          <dd>
            {charger.address || "Not provided"}
            {mapsUrl && (<>{" "}<a href={mapsUrl} target="_blank" rel="noreferrer">View on map</a></>)}
          </dd>
        </div>
        <div className="facts__row">
          <dt><Hash size={16} aria-hidden="true" /> External ID</dt>
          <dd>{charger.externalId || "Not provided"}</dd>
        </div>
        <div className="facts__row">
          <dt><Zap size={16} aria-hidden="true" /> Power</dt>
          <dd>{power || "Not provided"}</dd>
        </div>
        <div className="facts__row">
          <dt><Cable size={16} aria-hidden="true" /> Location type</dt>
          <dd>{charger.locationType ? charger.locationType.replace(/_/g, " ").toLowerCase() : "Not provided"}</dd>
        </div>
        <div className="facts__row">
          <dt><User size={16} aria-hidden="true" /> Submitted by</dt>
          <dd>
            {submittedBy?.name || "Unknown"}
            {submittedBy?.email && <span className="muted"> · {submittedBy.email}</span>}
            {submittedBy?.phone && <span className="muted"> · {submittedBy.phone}</span>}
            <span className="muted"> · {formatDateTime(request.submittedAt)}</span>
          </dd>
        </div>
      </dl>

      <h3 className="subheading">Connectors</h3>
      {charger.connectors.length === 0 ? (
        <p className="muted">No connector information provided.</p>
      ) : (
        <div className="table-wrap table-wrap--plain">
          <table className="connector-table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Max power</th>
              </tr>
            </thead>
            <tbody>
              {charger.connectors.map((connector, index) => (
                <tr key={`${connector.type}-${index}`}>
                  <td>{connector.type}</td>
                  <td>{connector.powerKw != null ? `${connector.powerKw} kW` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {request.status === STATUS.REJECTED && (
        <div className="note note--error">
          <strong>Rejection notes</strong>
          <p>{request.adminNotes || "No notes were added."}</p>
        </div>
      )}
      {request.status !== STATUS.PENDING && request.reviewedAt && (
        <p className="muted details__reviewed">Reviewed {formatDateTime(request.reviewedAt)}</p>
      )}
    </section>
  );
}
