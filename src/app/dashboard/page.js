"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const acciones = [
  {
    label: "Listar Empresas",
    desc: "Ver todas las empresas de la comunidad",
    href: "/dashboard/empresas",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Agregar Empresa",
    desc: "Registrar una nueva empresa en el sistema",
    href: "/dashboard/empresas/agregar",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    label: "Modificar Empresa",
    desc: "Editar los datos de una empresa existente",
    href: "/dashboard/empresas/modificar",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    label: "Eliminar Empresa",
    desc: "Dar de baja una empresa del sistema",
    href: "/dashboard/empresas/eliminar",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido{user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}
        </h1>
        <p className="text-gray-500 mt-1">
          Desde acá podés gestionar las empresas de la comunidad B&A.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {acciones.map(({ label, desc, href, icon }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-lg border border-gray-200 p-5 flex gap-4 items-start shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div
              className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(178,147,91,0.1)", color: "var(--font-color)" }}
            >
              {icon}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-[--font-color] transition-colors">
                {label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
