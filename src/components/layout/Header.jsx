import { LogOut, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { initials } from "../../utils/format";

function titleFor(pathname) {
  if (pathname === "/") return "Overview";
  if (pathname === "/validations") return "Validation requests";
  if (pathname.startsWith("/validations/")) return "Review request";
  if (pathname === "/chargers") return "Chargers";
  return "DOMEv admin";
}

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const displayName = user?.fullName || user?.email || "Admin";

  return (
    <header className="header">
      <button type="button" className="header__menu" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </button>
      <h1 className="header__title">{titleFor(pathname)}</h1>

      <div className="header__user">
        <span className="avatar" aria-hidden="true">{initials(displayName) || "A"}</span>
        <span className="header__user-name">{displayName}</span>
        <button type="button" className="header__logout" onClick={logout} aria-label="Sign out" title="Sign out">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
