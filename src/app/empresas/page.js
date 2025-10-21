'use client';

import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import { getEmpresas } from "@/services/Empresas/EmpresasService";


/**
 * Componente de página "Empresas" que muestra una lista de compañías en una cuadrícula.
 *
 * - Gestiona el estado local `companies` (Array<Object>) mediante `useState`.
 * - Al montarse, ejecuta una llamada asíncrona a `getEmpresas()` dentro de `useEffect`
 *   para obtener los datos y actualizar el estado (se ejecuta una sola vez).
 * - Renderiza un contenedor principal con un título y una rejilla responsive; cada
 *   elemento del array se mapea a `CompanyCard` pasando las propiedades de la compañía
 *   y usando `company.id` como `key`.
 *
 * Dependencias esperadas:
 * - `getEmpresas(): Promise<Array<Company>>` — función asíncrona que devuelve la lista.
 * - `CompanyCard` — componente que acepta las propiedades de cada compañía.
 *
 * Forma mínima esperada de cada objeto Company:
 * {
 *   id: string | number,
 *   // ...otros campos que utilice CompanyCard (nombre, descripción, logo, etc.)
 * }
 *
 * Retorna:
 * JSX.Element — markup de la página con la lista de compañías renderizada.
 *
 * Notas y sugerencias:
 * - Actualmente no hay manejo de errores ni estado de carga; es recomendable añadir
 *   indicadores de carga y gestión de errores para mejorar la experiencia de usuario.
 * - Si la fuente de datos puede actualizarse, considerar añadir lógica de revalidación
 *   o actualización periódica.
 */
export default function EmpresasPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getEmpresas();
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  return (
    <main className="p-6">
      <h1 className="h1Oscuro text-l font-bold mb-4">Comunidad B&A: la comunidad de empresarios mendocinos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </main>
  );
}
