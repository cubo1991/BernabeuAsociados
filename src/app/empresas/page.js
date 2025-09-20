'use client';
import { useEffect, useState } from "react";
import { getEmpresasSafe } from "../../services/Empresas/EmpresasService";
import CompanyCard from "../components/CompanyCard";






export default function EmpresasPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getEmpresasSafe(setCompanies);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Empresas del Club BA</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <CompanyCard key={index} {...company} />
        ))}
      </div>
    </main>
  );
}
