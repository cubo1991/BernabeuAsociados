'use client';
import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import companies from "../constants/dummyCompanies";

export default function EmpresasPage() {
  const [mockCompanies, setCompanies] = useState([]);

  useEffect(() => {
    setCompanies(companies.empresas);

  }, []);


  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Empresas del Club B&A</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockCompanies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </main>
  );
}
