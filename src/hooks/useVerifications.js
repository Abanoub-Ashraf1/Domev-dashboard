import { useMemo, useState } from "react";
import { verificationService } from "../services/verificationService";
import { useAsync } from "./useAsync";

export function useVerifications() {
  const [search, setSearch] = useState("");
  const { data, loading, error, reload } = useAsync(() => verificationService.getPending(), []);

  const requests = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = data ?? [];
    if (!term) return list;
    return list.filter(
      (r) =>
        r.charger.name.toLowerCase().includes(term) ||
        r.charger.externalId.toLowerCase().includes(term) ||
        r.id.toLowerCase().includes(term) ||
        (r.submittedBy?.name ?? "").toLowerCase().includes(term) ||
        (r.submittedBy?.email ?? "").toLowerCase().includes(term),
    );
  }, [data, search]);

  return { requests, total: data?.length ?? 0, loading, error, reload, search, setSearch };
}
