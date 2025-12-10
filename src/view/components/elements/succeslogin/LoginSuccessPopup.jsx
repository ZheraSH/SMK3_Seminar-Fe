// LoginSuccessPopup.jsx
"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import "./LoginNotification.css";

export default function LoginSuccessPopup({ open, onClose, title = "Login Berhasil", subtitle = "Selamat datang kembali!" }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (open) {
      const arr = Array.from({ length: 20 }).map(() => ({
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        delay: Math.random() * 2 + "s",
        scale: Math.random() * 0.8 + 0.3,
        color: ["#22d3ee", "#a855f7", "#ec4899"][Math.floor(Math.random() * 3)],
        animation: Math.random() > 0.5 ? "float-up 4s linear infinite" : "fall 4s linear infinite"
      }));
      setParticles(arr);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="login-notification-overlay">
      <div className="login-notification-backdrop" onClick={onClose} />

      <div className="login-notification-container">
        <div className="login-notification-success">
          <div className="success-glow" />

          <div className="success-card">
            <div className="success-gradient-bg" />

            <div className="success-particles">
              {particles.map((p, i) => (
                <span
                  key={i}
                  className="success-particle"
                  style={{
                    top: p.top,
                    left: p.left,
                    backgroundColor: p.color,
                    transform: `scale(${p.scale})`,
                    animation: p.animation,
                    animationDelay: p.delay
                  }}
                />
              ))}
            </div>

            <div className="success-icon-wrapper">
              <div className="success-icon-glow" />
              <CheckCircle2 className="success-icon" />
            </div>

            <div className="success-content">
              <h1 className="success-title">{title}</h1>
              <p className="success-subtitle">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
