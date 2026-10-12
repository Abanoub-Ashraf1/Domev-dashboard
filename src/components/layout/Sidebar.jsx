import { NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardCheck, BatteryCharging, X } from "lucide-react";
import BrandLogo from "../ui/BrandLogo";

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/validations", label: "Validation requests", icon: ClipboardCheck },
  { to: "/chargers", label: "Chargers", icon: BatteryCharging },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "is-visible" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Main navigation">
        <div className="sidebar__brand">
          <BrandLogo />
          <button type="button" className="sidebar__close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `sidebar__link ${isActive ? "is-active" : ""}`}
            >
              <Icon size={19} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
