"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";

export default function EliminarEmpresaPage() {
    const [empresas, setEmpresas] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmpresas = async () => {
            const snapshot = await getDocs(collection(db, "empresas"));
            setEmpresas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchEmpresas();
    }, []);

    const handleDelete = async () => {
        const confirm = window.confirm("¿Estás seguro de que querés eliminar esta empresa?");
        if (!confirm) return;

        setLoading(true);
        try {
            await deleteDoc(doc(db, "empresas", selectedId));
            setEmpresas(empresas.filter(e => e.id !== selectedId));
            setSelectedId("");
            alert("✅ Empresa eliminada correctamente");
        } catch (err) {
            alert("❌ Error al eliminar la empresa");
        }
        setLoading(false);
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Eliminar Empresa</h2>

            <select
                value={selectedId}
                onChange={e => setSelectedId(e.target.value)}
                className="mb-8 w-full max-w-md border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                <option value="">Selecciona una empresa</option>
                {empresas.map(e => (
                    <option key={e.id} value={e.id}>{e.companyName}</option>
                ))}
            </select>

            {selectedId && (
                <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">
                    <p className="text-gray-700 mb-4">
                        Vas a eliminar <span className="font-semibold text-red-600">{empresas.find(e => e.id === selectedId)?.companyName}</span>.
                        Esta acción no se puede deshacer.
                    </p>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        {loading ? "Eliminando..." : "Eliminar Empresa"}
                    </button>
                </div>
            )}
        </div>
    );
}
