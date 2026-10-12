import { dashboardService } from "../services/dashboardService";
import { useAsync } from "./useAsync";

export function useDashboardStats() {
  return useAsync(() => dashboardService.getOverview(), []);
}
