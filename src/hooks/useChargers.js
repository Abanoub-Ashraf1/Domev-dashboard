import { useMemo, useState } from "react";
import { chargerService } from "../services/chargerService";
import { useAsync } from "./useAsync";

export const PAGE_SIZE = 25;

export function useChargers() {
  const [filter, setFilter] = useState("ALL"); // ALL | VERIFIED | UNVERIFIED
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const { data, loading, error, reload } = useAsync(() => chargerService.getAll(), []);

  const all = data ?? [];
  const counts = useMemo(() => {
    const verified = all.filter((c) => c.isVerified).length;
    return { ALL: all.length, VERIFIED: verified, UNVERIFIED: all.length - verified };
  }, [all]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return all.filter((c) => {
      if (filter === "VERIFIED" && !c.isVerified) return false;
      if (filter === "UNVERIFIED" && c.isVerified) return false;
      if (!term) return true;
      return [c.name, c.address, c.operator, c.externalId].some((v) => v.toLowerCase().includes(term));
    });
  }, [all, filter, search]);

  return {
    chargers: filtered.slice(0, visible),
    matchCount: filtered.length,
    hasMore: filtered.length > visible,
    showMore: () => setVisible((n) => n + PAGE_SIZE),
    counts,
    filter,
    setFilter: (value) => {
      setFilter(value);
      setVisible(PAGE_SIZE);
    },
    search,
    setSearch: (value) => {
      setSearch(value);
      setVisible(PAGE_SIZE);
    },
    hasFilters: filter !== "ALL" || Boolean(search.trim()),
    clearFilters: () => {
      setFilter("ALL");
      setSearch("");
      setVisible(PAGE_SIZE);
    },
    loading,
    error,
    reload,
  };
}
