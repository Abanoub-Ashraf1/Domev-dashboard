import { Search, X } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder = "Search", label }) {
  return (
    <div className="search-input">
      <Search size={18} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label || placeholder}
      />
      {value && (
        <button type="button" className="search-input__clear" onClick={() => onChange("")} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
