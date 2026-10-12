import { STATUS } from "../config/constants";


const STATUS_MAP = {
  PENDING: STATUS.PENDING,
  APPROVED: STATUS.ACCEPTED,
  REJECTED: STATUS.REJECTED,
};

export function mapStatus(value, fallback = STATUS.PENDING) {
  return STATUS_MAP[String(value ?? "").toUpperCase()] || fallback;
}

function mapConnectors(list) {
  return (Array.isArray(list) ? list : []).map((c) => ({
    type: c?.type ?? "Unknown",
    powerKw: c?.maxPowerKw ?? null,
  }));
}


export function mapCharger(raw = {}) {
  return {
    id: String(raw.id ?? ""),
    name: raw.name ?? "Unnamed charger",
    address: raw.address ?? "",
    location: raw.lat != null && raw.long != null ? { lat: raw.lat, lng: raw.long } : null,
    operator: raw.cpoName ?? "",
    externalId: raw.externalId ?? "",
    power: raw.power ?? null,
    powerType: raw.powerType ?? "",
    availability: raw.status ?? "",
    locationType: raw.locationType ?? "",
    isPrivate: Boolean(raw.isPrivate),
    isVerified: Boolean(raw.isVerified),
    connectors: mapConnectors(raw.connectors),
    createdAt: raw.createdAt ?? null,
  };
}

export function mapVerification(raw = {}) {
  const status = mapStatus(raw.status);
  return {
    id: String(raw.id ?? ""),
    chargerId: String(raw.chargerId ?? raw.charger?.id ?? ""),
    status,
    submittedAt: raw.createdAt ?? null,
    reviewedAt: status === STATUS.PENDING ? null : raw.updatedAt ?? null,
    adminNotes: raw.adminNotes ?? "",
    submittedBy: raw.user
      ? { name: raw.user.fullName ?? "", email: raw.user.email ?? "", phone: raw.user.phone ?? "" }
      : null,
    images: (Array.isArray(raw.imageUrls) ? raw.imageUrls : [])
      .filter(Boolean)
      .map((url, index) => ({ id: `image-${index}`, url })),
    charger: mapCharger(raw.charger),
  };
}

export const mapList = (raw, mapItem) => (Array.isArray(raw) ? raw.map(mapItem) : []);
