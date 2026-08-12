import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageIntro from "../components/common/PageIntro";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { isValidMobile } from "../utils/validators";
import "./Account.css";

export default function Account() {
  const { user, completeProfile, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [mobileError, setMobileError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (mobile && !isValidMobile(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");
    setSaving(true);
    try {
      await completeProfile(fullName.trim(), mobile.trim());
      toast.success("Profile updated");
    } catch {
      toast.error("Couldn't save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <PageIntro eyebrow="Account" title="Your Account" text="Manage your profile details." />
      <section className="account-page">
        <div className="container account-page__inner">
          <form className="account-form" onSubmit={handleSave} noValidate>
            <div className="account-form__field">
              <label>Email</label>
              <input value={user?.email || ""} disabled />
            </div>

            <div className="account-form__field">
              <label>Full Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name" />
            </div>

            <div className="account-form__field">
              <label>Mobile Number</label>
              <input
                value={mobile}
                inputMode="numeric"
                onChange={(e) => {
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                  if (mobileError) setMobileError("");
                }}
                placeholder="Enter mobile number"
                className={mobileError ? "has-error" : ""}
              />
              {mobileError && <span className="account-form__error">{mobileError}</span>}
            </div>

            <button type="submit" className="btn" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>

          <button type="button" className="btn btn-outline account-page__logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </>
  );
}
