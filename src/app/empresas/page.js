'use client';

import { useEffect, useRef, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import EmpresaSearchBar from "../components/EmpresaSearchBar";
import { getEmpresas } from "@/services/Empresas/EmpresasService";

const REVALIDATE_INTERVAL = 60_000;

export default function EmpresasPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searching, setSearching] = useState(false);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmpresas();
        if (mountedRef.current) setCompanies(data);
      } catch (err) {
        if (mountedRef.current) setError(err);
        console.error("Error fetching empresas:", err);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };

    fetchCompanies();

    const intervalId = setInterval(() => {
      if (!searching) fetchCompanies();
    }, REVALIDATE_INTERVAL);

    return () => {
      mountedRef.current = false;
      clearInterval(intervalId);
    };
  }, [searching]);

  return (
    <main className="px-4 pt-2 pb-2">
      {/* Header: título a la izquierda, searchbar a la derecha */}
      <div className="flex items-center justify-between gap-3 flex-nowrap">
        <h1 className="h1Oscuro text-sm md:text-lg font-bold m-0 min-h-[36px] max-w-[60%] truncate animate-fade-slide-up">
          Comunidad B&A: la comunidad de empresarios mendocinos
        </h1>

        <div className="w-40 sm:w-2/3 md:w-1/2 lg:w-1/3 self-center">
          <EmpresaSearchBar
            onResults={setCompanies}
            onLoading={setLoading}
            onError={setError}
            onSearching={setSearching}
          />
        </div>
      </div>

      <div className="h-6">
        {loading && <p className="text-sm">{searching ? 'Buscando empresa...' : 'Cargando empresas...'}</p>}
        {error && <p className="text-red-600 text-sm">Error al cargar empresas.</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </main>
  );
}
