"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";

export default function EliminarEmpresaPage() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const snapshot = await getDocs(collection(db, "empresas"));
      setEmpresas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchEmpresas();
  }, []);

  const empresa = empresas.find((e) => e.id === selectedId);

  const handleSeleccion = (e) => {
    setSelectedId(e.target.value);
    setConfirming(false);
    setMensaje(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "empresas", selectedId));
      setEmpresas((prev) => prev.filter((e) => e.id !== selectedId));
      setSelectedId("");
      setConfirming(false);
      setMensaje({ type: "success", text: "Empresa eliminada correctamente." });
    } catch {
      setMensaje({ type: "error", text: "Ocurrió un error al eliminar la empresa." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Eliminar Empresa</h1>

      {mensaje && (
        <div className={`mb-6 p-4 rounded-lg text-sm font-medium border max-w-md ${
          mensaje.type === "success"
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
        }`}>
          {mensaje.text}
        </div>
      )}

      <div className="mb-6 max-w-sm">
        <label className="text-xs font-medium text-gray-600 block mb-1">Seleccioná una empresa</label>
        <select
          value={selectedId}
          onChange={handleSeleccion}
          className="input"
        >
          <option value="">Seleccionar...</option>
          {empresas.map((e) => (
            <option key={e.id} value={e.id}>{e.companyName}</option>
          ))}
        </select>
      </div>

      {empresa && !confirming && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            {empresa.logoUrl ? (
              <img src={empresa.logoUrl} alt={empresa.companyName} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">
                {empresa.companyName?.[0] ?? "?"}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">{empresa.companyName}</p>
              {empresa.ownerName && <p className="text-sm text-gray-500">{empresa.ownerName}</p>}
            </div>
          </div>
          <button
            onClick={() => setConfirming(true)}
            className="w-full py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Eliminar empresa
          </button>
        </div>
      )}

      {empresa && confirming && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-start gap-3 mb-4">
            <div className="shrink-0 w-9 h-9 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-red-800 text-sm">¿Confirmás la eliminación?</p>
              <p className="text-sm text-red-700 mt-1">
                Vas a eliminar <span className="font-semibold">{empresa.companyName}</span>. Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-60"
            >
              {loading ? "Eliminando..." : "Sí, eliminar"}
            </button>
            <button
              onClick={() => setConfirming(false)}
              disabled={loading}
              className="flex-1 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
