import { ExternalLink } from "lucide-react";
import VerifiedBadge from "../ui/VerifiedBadge";

export default function ChargerTable({ chargers }) {
  return (
    <div className="table-wrap">
      <table className="station-table">
        <thead>
          <tr>
            <th scope="col">Charger</th>
            <th scope="col">Operator</th>
            <th scope="col">Power</th>
            <th scope="col">Connectors</th>
            <th scope="col">Verification</th>
          </tr>
        </thead>
        <tbody>
          {chargers.map((charger) => {
            const mapsUrl = charger.location
              ? `https://www.google.com/maps?q=${charger.location.lat},${charger.location.lng}`
              : null;
            return (
              <tr key={charger.id}>
                <td data-label="Charger">
                  <span className="station-table__name station-table__name--plain">{charger.name}</span>
                  <span className="station-table__meta">
                    {[charger.externalId, charger.address].filter(Boolean).join(" · ") || "No address"}
                    {mapsUrl && (
                      <>
                        {" "}
                        <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-link">
                          Map <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      </>
                    )}
                  </span>
                </td>
                <td data-label="Operator">{charger.operator || "—"}</td>
                <td data-label="Power">
                  {charger.power != null ? `${charger.power} kW` : "—"}
                  {charger.powerType && <span className="muted"> · {charger.powerType}</span>}
                </td>
                <td data-label="Connectors">
                  {charger.connectors.length ? [...new Set(charger.connectors.map((c) => c.type))].join(", ") : "—"}
                </td>
                <td data-label="Verification"><VerifiedBadge verified={charger.isVerified} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
