'use client';

import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import { getEmpresas } from "@/services/Empresas/EmpresasService";


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
      <h1 className="text-2xl font-bold mb-4">Empresas del Club B&A</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </main>
  );
}
