"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
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
    <>
    
    <div className="flex min-h-screen font-sans bg-gray-100 text-gray-800">
      <aside className="w-64 bg-gray-800 text-white p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2">Empresas</h2>
        <nav>
          <ul className="space-y-4">
            {[
              { label: "Listar Empresas", href: "/dashboard/empresas" },
              { label: "Agregar Empresa", href: "/dashboard/empresas/agregar" },
              { label: "Modificar Empresa", href: "/dashboard/empresas/modificar" },
              { label: "Eliminar Empresa", href: "/dashboard/empresas/eliminar" },
            ].map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto bg-gray-50">{children}</main>
    </div>
    </>
  );
}
