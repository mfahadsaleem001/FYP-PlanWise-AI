
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

import "./ToastProvider.css";

const ToastContext = createContext(null);

const toastConfig = {
  success: {
    title: "Success",
    icon: CheckCircle2,
  },
  error: {
    title: "Something went wrong",
    icon: AlertCircle,
  },
  warning: {
    title: "Warning",
    icon: AlertTriangle,
  },
  info: {
    title: "Information",
    icon: Info,
  },
};

function ToastItem({ toast, onDismiss }) {
  const { title, icon: Icon } =
    toastConfig[toast.type] || toastConfig.info;

  useEffect(() => {
    if (toast.duration <= 0) return undefined;

    const timer = window.setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => window.clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={`global-toast global-toast--${toast.type}`}
      role={toast.type === "error" ? "alert" : "status"}
      aria-live={toast.type === "error" ? "assertive" : "polite"}
    >
      <div className="global-toast__icon">
        <Icon size={21} strokeWidth={2} />
      </div>

      <div className="global-toast__content">
        <strong className="global-toast__title">{title}</strong>
        <p className="global-toast__message">{toast.message}</p>
      </div>

      <button
        type="button"
        className="global-toast__close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider."
    );
  }

  return context;
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const showToast = useCallback(
    (message, type = "success", duration = 4500) => {
      if (!message) return;

      const safeType = Object.hasOwn(toastConfig, type)
        ? type
        : "info";

      const id = ++nextId.current;

      setToasts((current) => [
        ...current,
        {
          id,
          message: String(message),
          type: safeType,
          duration,
        },
      ]);
    },
    []
  );

  const dismissToast = useCallback((id) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider
      value={{ showToast, dismissToast }}
    >
      {children}

      <div className="global-toast-container">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={dismissToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
