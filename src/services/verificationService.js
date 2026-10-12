import { STATUS } from "../config/constants";
import { endpoints } from "../config/endpoints";
import { callEndpoint } from "./apiClient";
import { mapList, mapStatus, mapVerification } from "./mappers";


export const verificationService = {
  async getPending() {
    const raw = await callEndpoint(endpoints.pendingVerifications);
    return mapList(raw, mapVerification);
  },

  async getPendingById(id) {
    const found = (await this.getPending()).find((item) => item.id === String(id));
    if (!found) {
      const error = new Error("This request isn't pending anymore. It may have been reviewed already.");
      error.status = 404;
      throw error;
    }
    return found;
  },

  async approve(id) {
    const raw = await callEndpoint(endpoints.approveVerification, { id });
    const updated = mapVerification(raw ?? {});
    return {
      status: mapStatus(raw?.status, STATUS.ACCEPTED),
      reviewedAt: updated.reviewedAt ?? new Date().toISOString(),
      adminNotes: "",
    };
  },

  async reject(id, adminNotes) {
    const body = adminNotes ? { adminNotes } : {};
    const raw = await callEndpoint(endpoints.rejectVerification, { id, body });
    const updated = mapVerification(raw ?? {});
    return {
      status: mapStatus(raw?.status, STATUS.REJECTED),
      reviewedAt: updated.reviewedAt ?? new Date().toISOString(),
      adminNotes: raw?.adminNotes ?? adminNotes ?? "",
    };
  },
};
