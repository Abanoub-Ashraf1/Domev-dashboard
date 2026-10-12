import { Link } from "react-router-dom";
import { ChevronRight, Images } from "lucide-react";
import { formatDate } from "../../utils/format";

export default function VerificationTable({ requests }) {
  return (
    <div className="table-wrap">
      <table className="station-table">
        <thead>
          <tr>
            <th scope="col">Charger</th>
            <th scope="col">Submitted by</th>
            <th scope="col">Submitted</th>
            <th scope="col">Photos</th>
            <th scope="col"><span className="visually-hidden">Open</span></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td data-label="Charger">
                <Link to={`/validations/${request.id}`} className="station-table__name">
                  {request.charger.name}
                </Link>
                <span className="station-table__meta">
                  {[request.charger.externalId, request.charger.address].filter(Boolean).join(" · ") || "No address"}
                </span>
              </td>
              <td data-label="Submitted by">{request.submittedBy?.name || request.submittedBy?.email || "Unknown"}</td>
              <td data-label="Submitted">{formatDate(request.submittedAt)}</td>
              <td data-label="Photos">
                <span className="photo-count"><Images size={15} aria-hidden="true" /> {request.images.length}</span>
              </td>
              <td className="station-table__action">
                <Link to={`/validations/${request.id}`} className="icon-link" aria-label={`Review ${request.charger.name}`}>
                  <ChevronRight size={20} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
