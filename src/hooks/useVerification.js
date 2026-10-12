import { useCallback, useState } from "react";
import { verificationService } from "../services/verificationService";
import { useAsync } from "./useAsync";

export function useVerification(id) {
  const { data: request, loading, error, reload, setData } = useAsync(
    () => verificationService.getPendingById(id),
    [id],
  );
  const [processing, setProcessing] = useState(null); // "accept" | "reject" | null

  const decide = useCallback(
    async (kind, action) => {
      setProcessing(kind);
      try {
        const result = await action(); // { status, reviewedAt, adminNotes }
        setData((current) => ({
          ...current,
          ...result,
          charger: { ...current.charger, isVerified: result.status === "ACCEPTED" || current.charger.isVerified },
        }));
        return result;
      } finally {
        setProcessing(null);
      }
    },
    [setData],
  );

  const accept = useCallback(() => decide("accept", () => verificationService.approve(id)), [decide, id]);
  const reject = useCallback(
    (notes) => decide("reject", () => verificationService.reject(id, notes)),
    [decide, id],
  );

  return { request, loading, error, reload, processing, accept, reject };
}
