"use client";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export default function EmpresasPage() {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEmpresas = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "empresas"));
            const empresasData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEmpresas(empresasData);
            console.log(empresasData);
        } catch (error) {
            alert("Error al obtener empresas: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Empresas</h1>

            <button
                onClick={fetchEmpresas}
                disabled={loading}
                className={`mb-8 px-6 py-2 rounded-md text-white font-medium transition-colors ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {loading ? "Cargando..." : "Traer empresas"}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {empresas.map((empresa) => (
                    <div
                        key={empresa.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                            {empresa.companyName}
                        </h2>
                        {/* Puedes agregar más campos aquí si lo necesitás */}
                        {/* <p className="text-sm text-gray-500">{empresa.cuit}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
}
