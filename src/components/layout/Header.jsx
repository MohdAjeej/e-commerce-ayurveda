import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X, ShoppingBag, LogIn } from "lucide-react";
import { NAV_LINKS } from "../../data/navLinks";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import AccountMenu from "./AccountMenu";
import "./Header.css";

const SPY_IDS = ["wellness", "ayurveda"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [bump, setBump] = useState(false);
  const location = useLocation();
  const cart = useCart();
  const { isAuthenticated, loading } = useAuth();
  const prevQty = useRef(cart.totalQuantity);

  useEffect(() => {
    if (cart.totalQuantity !== prevQty.current) {
      setBump(true);
      prevQty.current = cart.totalQuantity;
      const timer = setTimeout(() => setBump(false), 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [cart.totalQuantity]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveHash("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    const targets = SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (href) => {
    if (href.startsWith("/#")) {
      return location.pathname === "/" && activeHash === href.slice(1);
    }
    if (href === "/") {
      return location.pathname === "/" && !activeHash;
    }
    return location.pathname === href;
  };

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" onClick={() => setMenuOpen(false)}>
          <span className="site-header__mark">
            <Leaf size={20} strokeWidth={1.5} />
          </span>
          <span className="site-header__wordmark">
            <strong>OJAS</strong>
            <small>Himalayan Herbs</small>
          </span>
        </Link>

        <nav className={`site-header__nav ${menuOpen ? "is-open" : ""}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={isActive(link.href) ? "is-active" : ""}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="site-header__auth">
            {!loading && (isAuthenticated ? (
              <AccountMenu onNavigate={() => setMenuOpen(false)} />
            ) : (
              <Link to="/login" className="btn site-header__login" onClick={() => setMenuOpen(false)}>
                <LogIn size={16} strokeWidth={2} />
                Login
              </Link>
            ))}
          </div>
        </nav>

        <div className="site-header__actions">
          <button type="button" className="site-header__cart" aria-label="Open cart" onClick={cart.openDrawer}>
            <ShoppingBag size={22} strokeWidth={1.75} />
            {cart.totalQuantity > 0 && (
              <span className={`site-header__cart-badge ${bump ? "is-bumping" : ""}`}>{cart.totalQuantity}</span>
            )}
          </button>

          <button
            className="site-header__toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
