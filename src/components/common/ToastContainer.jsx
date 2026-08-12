import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import "./ToastContainer.css";

const ICONS = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function ToastContainer() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || Info;
        return (
          <div key={toast.id} className={`toast toast--${toast.type}`}>
            <Icon size={18} strokeWidth={2} className="toast__icon" />
            <span className="toast__message">{toast.message}</span>
            <button type="button" className="toast__close" aria-label="Dismiss" onClick={() => dismiss(toast.id)}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
