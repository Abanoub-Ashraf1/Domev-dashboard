import { chargerService } from "./chargerService";
import { verificationService } from "./verificationService";

export const dashboardService = {
  async getOverview() {
    const [pending, chargers] = await Promise.all([verificationService.getPending(), chargerService.getAll()]);
    const verified = chargers.filter((c) => c.isVerified).length;
    return {
      pendingCount: pending.length,
      recentPending: pending.slice(0, 5),
      chargers: { total: chargers.length, verified, notVerified: chargers.length - verified },
    };
  },
};
