"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import Notification from "@/app/components/Notification";

export default function EliminarEmpresaPage() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);

  useEffect(() => {
    const fetchEmpresas = async () => {
      setLoadingEmpresas(true);
      try {
        const snapshot = await getDocs(collection(db, "empresas"));
        setEmpresas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        setNotification({
          message: "Error al cargar las empresas",
          type: "error",
        });
      } finally {
        setLoadingEmpresas(false);
      }
    };
    fetchEmpresas();
  }, []);

  const selectedEmpresa = empresas.find(e => e.id === selectedId);

  const handleDelete = async () => {
    if (window.confirm("⚠️ ¿Estás seguro de que querés eliminar esta empresa? Esta acción no se puede deshacer.")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "empresas", selectedId));
        setEmpresas(empresas.filter(e => e.id !== selectedId));
        setSelectedId("");
        setNotification({
          message: "Empresa eliminada correctamente",
          type: "success",
        });
      } catch (err) {
        setNotification({
          message: "Error al eliminar la empresa",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Eliminar Empresa</h2>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona una empresa para eliminar
        </label>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          disabled={loadingEmpresas}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition disabled:bg-gray-100"
        >
          <option value="">
            {loadingEmpresas ? "Cargando..." : "Selecciona una opción"}
          </option>
          {empresas.map(e => (
            <option key={e.id} value={e.id}>
              {e.companyName || "Sin nombre"}
            </option>
          ))}
        </select>
      </div>

      {selectedId && selectedEmpresa && (
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500 max-w-xl">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Datos de la empresa a eliminar:
            </h3>
            <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p>
                <span className="font-medium text-gray-700">Nombre:</span> {selectedEmpresa.companyName}
              </p>
              <p>
                <span className="font-medium text-gray-700">Dueño:</span> {selectedEmpresa.ownerName}
              </p>
              <p>
                <span className="font-medium text-gray-700">Teléfono:</span> {selectedEmpresa.phone}
              </p>
              <p>
                <span className="font-medium text-gray-700">Descripción:</span> {selectedEmpresa.description}
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
            <p className="text-red-800 text-sm font-medium">
              ⚠️ Advertencia: Esta acción no se puede deshacer. Eliminar esta empresa borrará permanentemente todos sus datos.
            </p>
          </div>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Eliminando...
              </>
            ) : (
              "Eliminar Empresa Permanentemente"
            )}
          </button>
        </div>
      )}

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </div>
  );
}
