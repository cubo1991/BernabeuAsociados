"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "admin") {
    return (
      <div className="p-10 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-4">Acceso denegado</h1>
        <p>No tenés permisos para ver esta sección.</p>
      </div>
    );
  }

  return (
    <main className="p-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-lg text-gray-600">
        Bienvenido al panel de control de{" "}
        <span className="font-semibold text-gray-700">Bernabeu Asociados</span>.
      </p>
    </main>
  );
}
