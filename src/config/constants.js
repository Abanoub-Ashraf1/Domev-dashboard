export const STATUS = Object.freeze({
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
});

export const STATUS_LABELS = Object.freeze({
  [STATUS.PENDING]: "Pending",
  [STATUS.ACCEPTED]: "Verified",
  [STATUS.REJECTED]: "Rejected",
});

export const CHARGER_FILTERS = [
  { value: "ALL", label: "All" },
  { value: "VERIFIED", label: "Verified" },
  { value: "UNVERIFIED", label: "Not verified" },
];

export const REJECTION_REASON_REQUIRED = false;
