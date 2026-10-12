
export const endpoints = {
  login: { method: "POST", path: "/auth/login" },
  profile: { method: "GET", path: "/auth/profile" },

  pendingVerifications: { method: "GET", path: "/verifications/pending" },
  approveVerification: { method: "PATCH", path: (id) => `/verifications/${id}/approve` },
  rejectVerification: { method: "PATCH", path: (id) => `/verifications/${id}/reject` },
  chargers: { method: "GET", path: "/chargers" },
};
