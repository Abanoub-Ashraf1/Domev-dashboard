import SearchInput from "../components/ui/SearchInput";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import ChargerTable from "../components/chargers/ChargerTable";
import { CHARGER_FILTERS } from "../config/constants";
import { useChargers } from "../hooks/useChargers";

export default function Chargers() {
  const {
    chargers, matchCount, hasMore, showMore, counts, filter, setFilter,
    search, setSearch, hasFilters, clearFilters, loading, error, reload,
  } = useChargers();

  return (
    <div className="page">
      <div className="toolbar">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, address, operator or ID" />
        <div className="segmented" role="group" aria-label="Filter by verification">
          {CHARGER_FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`segmented__option ${filter === option.value ? "is-active" : ""}`}
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
              {!loading && !error && <span className="segmented__count">{counts[option.value]}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="panel panel--flush" aria-busy={loading}>
        {loading && !error && chargers.length === 0 && counts.ALL === 0 && <LoadingState label="Loading chargers…" />}
        {error && <ErrorState error={error} onRetry={reload} title="Couldn't load chargers" />}
        {!error && !loading && matchCount === 0 &&
          (hasFilters ? (
            <EmptyState
              title="No chargers match your filters"
              message="Try a different search or filter."
              action={<button type="button" className="btn btn--secondary" onClick={clearFilters}>Clear filters</button>}
            />
          ) : (
            <EmptyState title="No chargers yet" message="Chargers will appear here once they are added." />
          ))}
        {!error && chargers.length > 0 && <ChargerTable chargers={chargers} />}
      </div>

      {!error && chargers.length > 0 && (
        <div className="list-footer">
          <p className="muted result-count">Showing {chargers.length} of {matchCount}</p>
          {hasMore && <button type="button" className="btn btn--secondary" onClick={showMore}>Show more</button>}
        </div>
      )}
    </div>
  );
}
