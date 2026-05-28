"use client";

import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "empresas"));
        setEmpresas(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (err) {
        setError("No se pudieron cargar las empresas. Intentá de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Empresas</h1>
          {!loading && !error && (
            <p className="text-sm text-gray-500 mt-0.5">
              {empresas.length} empresa{empresas.length !== 1 ? "s" : ""} registrada{empresas.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : empresas.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <p className="text-sm">No hay empresas registradas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {empresas.map((empresa) => (
            <div
              key={empresa.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                {empresa.logoUrl ? (
                  <img
                    src={empresa.logoUrl}
                    alt={empresa.companyName}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-100 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-gray-400 text-lg font-bold">
                      {empresa.companyName?.[0] ?? "?"}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="font-semibold text-gray-900 text-sm truncate">
                    {empresa.companyName}
                  </h2>
                  {empresa.ownerName && (
                    <p className="text-xs text-gray-500 truncate">{empresa.ownerName}</p>
                  )}
                </div>
              </div>

              {empresa.benefit && (
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-2">
                  <span className="font-medium" style={{ color: "var(--font-color)" }}>Beneficio: </span>
                  {empresa.benefit}
                </p>
              )}

              {empresa.phone && (
                <p className="text-xs text-gray-400">{empresa.phone}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
