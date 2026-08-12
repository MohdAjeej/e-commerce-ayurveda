import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ChevronDown, Package, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import useClickOutside from "../../hooks/useClickOutside";
import "./AccountMenu.css";

export default function AccountMenu({ onNavigate }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useClickOutside(ref, () => setOpen(false), open);

  const handleLogout = async () => {
    setOpen(false);
    onNavigate?.();
    await logout();
    navigate("/");
  };

  const firstName = user?.name ? user.name.split(" ")[0] : user?.email?.split("@")[0];

  return (
    <div className="account-menu" ref={ref}>
      <button type="button" className="account-menu__trigger" onClick={() => setOpen((v) => !v)}>
        <span className="account-menu__avatar">
          <User size={16} />
        </span>
        <span className="account-menu__greeting">Hi, {firstName}</span>
        <ChevronDown size={14} className={`account-menu__chevron ${open ? "is-open" : ""}`} />
      </button>

      {open && (
        <div className="account-menu__dropdown">
          <Link
            to="/account"
            className="account-menu__item"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            <User size={15} /> Account
          </Link>
          <Link
            to="/orders"
            className="account-menu__item"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            <Package size={15} /> Orders
          </Link>
          <button type="button" className="account-menu__item account-menu__item--danger" onClick={handleLogout}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
