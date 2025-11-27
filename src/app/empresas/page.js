'use client';

import { useEffect, useRef, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import { getEmpresas } from "@/services/Empresas/EmpresasService";

const REVALIDATE_INTERVAL = 60_000;

export default function EmpresasPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      fetchCompanies();
    }, REVALIDATE_INTERVAL);

    return () => {
      mountedRef.current = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="px-4 pt-2 pb-2">
      {/* Header: título */}
      <div className="flex items-center gap-3 flex-wrap">
   
   
      </div>

      <div className="h-auto md:h-6 truncate animate-fade-slide-up">
        {loading && <p className="text-sm"></p>}
        {error && <p className="text-red-600 text-sm">Error al cargar empresas.</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </main> 
  );
}
