"use client";

import { useEffect } from "react";
import "./LoginNotification.css";

export default function LoginSuccessToast({
  open,
  onClose,
  title = "Menyiapkan dashboard",
  duration = 2000,
}) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="login-toast-overlay">
      <div className="login-toast">
        <div className="toast-loader">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="toast-dot" />
          ))}
        </div>

        <div className="toast-content">
          <span className="toast-title">{title}</span>
          <span className="toast-subtitle">Menyinkronkan data…</span>
        </div>
      </div>
    </div>
  );
}
