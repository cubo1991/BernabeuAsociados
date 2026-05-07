"use client";
import { useState, useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import Notification from "@/app/components/Notification";

export default function EmpresasPage() {
    const [empresas, setEmpresas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const filteredEmpresas = useMemo(() => {
        if (!searchTerm.trim()) return empresas;
        
        const term = searchTerm.toLowerCase();
        return empresas.filter(empresa =>
            empresa.companyName?.toLowerCase().includes(term) ||
            empresa.ownerName?.toLowerCase().includes(term) ||
            empresa.description?.toLowerCase().includes(term) ||
            empresa.phone?.includes(term)
        );
    }, [empresas, searchTerm]);

    const fetchEmpresas = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "empresas"));
            const empresasData = querySnapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                .sort((a, b) => a.companyName?.localeCompare(b.companyName));
            
            setEmpresas(empresasData);
            setHasLoaded(true);
            
            if (empresasData.length === 0) {
                setNotification({
                    message: "No hay empresas cargadas",
                    type: "info",
                });
            } else {
                setNotification({
                    message: `Se cargaron ${empresasData.length} empresas`,
                    type: "success",
                });
            }
        } catch (error) {
            setNotification({
                message: "Error al obtener empresas: " + error.message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Empresas</h1>
                <p className="text-gray-600 text-sm">
                    {hasLoaded && empresas.length > 0 
                        ? `${empresas.length} empresa${empresas.length !== 1 ? 's' : ''} disponible${empresas.length !== 1 ? 's' : ''}`
                        : "Carga las empresas para verlas aquí"
                    }
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Buscar por nombre, dueño, descripción o teléfono..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={!hasLoaded || loading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100"
                />
                <button
                    onClick={fetchEmpresas}
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-colors whitespace-nowrap ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Cargando...
                        </span>
                    ) : (
                        "Actualizar"
                    )}
                </button>
            </div>

            {hasLoaded && filteredEmpresas.length === 0 && searchTerm && (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-2">No se encontraron empresas con esos criterios</p>
                    <button
                        onClick={() => setSearchTerm("")}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        Limpiar búsqueda
                    </button>
                </div>
            )}

            {hasLoaded && empresas.length === 0 && !searchTerm && (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">No hay empresas cargadas</p>
                    <button
                        onClick={fetchEmpresas}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                    >
                        Cargar empresas
                    </button>
                </div>
            )}

            {filteredEmpresas.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmpresas.map((empresa) => (
                        <div
                            key={empresa.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Logo */}
                            <div className="h-40 bg-linear-to-br from-blue-50 to-gray-100 flex items-center justify-center overflow-hidden">
                                {empresa.logoUrl ? (
                                    <img
                                        src={empresa.logoUrl}
                                        alt={empresa.companyName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-gray-400 text-center">
                                        <div className="text-4xl mb-2">🏢</div>
                                        <p className="text-xs">Sin logo</p>
                                    </div>
                                )}
                            </div>

                            {/* Contenido */}
                            <div className="p-4 space-y-3">
                                {/* Nombre */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                                        {empresa.companyName}
                                    </h2>
                                    <p className="text-sm text-gray-500 truncate">
                                        Por: {empresa.ownerName}
                                    </p>
                                </div>

                                {/* Descripción */}
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {empresa.description || "Sin descripción"}
                                </p>

                                {/* Beneficio */}
                                {empresa.benefit && (
                                    <div className="bg-blue-50 border border-blue-200 p-2 rounded text-sm">
                                        <span className="font-medium text-blue-700">
                                            {empresa.benefitType}: {empresa.benefit}
                                        </span>
                                    </div>
                                )}

                                {/* Contacto */}
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="inline-block w-4 h-4">
                                        {empresa.contactType === "Instagram" && "📱"}
                                        {empresa.contactType === "Sitio Web" && "🌐"}
                                        {empresa.contactType === "WhatsApp" && "💬"}
                                        {empresa.contactType === "Email" && "✉️"}
                                    </span>
                                    <a
                                        href={empresa.contactLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 truncate hover:underline"
                                    >
                                        {empresa.contactType || "Contacto"}
                                    </a>
                                </div>

                                {/* Teléfono */}
                                {empresa.phone && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span>📞</span>
                                        <a
                                            href={`tel:${empresa.phone}`}
                                            className="text-blue-600 hover:text-blue-700 hover:underline"
                                        >
                                            {empresa.phone}
                                        </a>
                                    </div>
                                )}

                                {/* Dirección */}
                                {empresa.address && (
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <span>📍</span>
                                        <span className="wrap-break-word">{empresa.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
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
