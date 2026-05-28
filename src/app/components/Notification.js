"use client";
import { useState, useEffect } from "react";

export default function Notification({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!isVisible || !message) return null;

  const bgColor = {
    success: "bg-green-100 border-green-300",
    error: "bg-red-100 border-red-300",
    warning: "bg-yellow-100 border-yellow-300",
    info: "bg-blue-100 border-blue-300",
  }[type];

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
    info: "text-blue-800",
  }[type];

  const icon = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  }[type];

  return (
    <div className={`fixed top-4 right-4 max-w-md ${bgColor} ${textColor} px-4 py-3 rounded-lg border shadow-lg animate-in fade-in slide-in-from-right-2 duration-300 z-50 flex items-center gap-3`}>
      <span className="text-lg">{icon}</span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-auto text-lg leading-none opacity-70 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}
