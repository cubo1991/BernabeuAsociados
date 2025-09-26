"use client";

import { useEffect, useState } from "react";
import EmpresasPage from "./empresas/page";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("🔍 Usuario en Home:", parsed);
      setUser(parsed);
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      {user?.role === "admin" && (
        <p className="text-sm text-indigo-600 font-medium">
          Bienvenido <span className="font-semibold">{user.displayName || user.email}</span>, sos administrador
        </p>
      )}

      <EmpresasPage />
    </div>
  );
}
