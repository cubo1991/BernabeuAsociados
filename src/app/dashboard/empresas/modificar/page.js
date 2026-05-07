"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import UploadToCloudinary from "@/app/components/UploadToCloudinary";
import Notification from "@/app/components/Notification";

export default function ModificarEmpresaPage() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    ownerName: "",
    phone: "",
    logoUrl: "",
    contactLink: "",
    contactType: "",
    benefitType: "",
    benefit: "",
    description: "",
    fullDescription: "",
    address: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmpresas = async () => {
      setLoadingEmpresas(true);
      try {
        const snapshot = await getDocs(collection(db, "empresas"));
        setEmpresas(
          snapshot.docs.map(docSnap => ({
            firestoreId: docSnap.id,
            ...docSnap.data()
          }))
        );
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

  useEffect(() => {
    if (selectedId) {
      const empresa = empresas.find(e => e.firestoreId === selectedId);
      if (empresa) {
        setForm({
          companyName: empresa.companyName || "",
          ownerName: empresa.ownerName || "",
          phone: empresa.phone || "",
          logoUrl: empresa.logoUrl || "",
          contactLink: empresa.contactLink || "",
          contactType: empresa.contactType || "",
          benefitType: empresa.benefitType || "",
          benefit: empresa.benefit || "",
          description: empresa.description || "",
          fullDescription: empresa.fullDescription || "",
          address: empresa.address || "",
        });
        setErrors({});
      }
    }
  }, [selectedId, empresas]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.companyName.trim()) newErrors.companyName = "El nombre es obligatorio";
    if (!form.ownerName.trim()) newErrors.ownerName = "El dueño es obligatorio";
    if (!form.phone.trim()) newErrors.phone = "El teléfono es obligatorio";
    if (form.phone && !/^[\d\s+\-()]+$/.test(form.phone)) newErrors.phone = "Teléfono inválido";
    if (!form.contactLink.trim()) newErrors.contactLink = "El link es obligatorio";
    if (!form.contactType) newErrors.contactType = "Selecciona tipo de contacto";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageUpload = (url) => {
    setForm(prev => ({ ...prev, logoUrl: url }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) {
      setNotification({
        message: "Por favor completa todos los campos obligatorios",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, "empresas", selectedId), {
        ...form,
        updatedAt: new Date().toISOString(),
      });
      setNotification({
        message: "Empresa modificada correctamente",
        type: "success",
      });
    } catch (err) {
      setNotification({
        message: err.message || "Error al modificar la empresa",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Modificar Empresa</h2>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona una empresa
        </label>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          disabled={loadingEmpresas}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100"
        >
          <option value="">
            {loadingEmpresas ? "Cargando..." : "Selecciona una opción"}
          </option>
          {empresas.map(e => (
            <option key={e.firestoreId} value={e.firestoreId}>
              {e.companyName || "Sin nombre"}
            </option>
          ))}
        </select>
      </div>

      {selectedId && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la empresa *
            </label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.companyName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs">{errors.companyName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del dueño *
            </label>
            <input
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.ownerName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.ownerName && (
              <p className="text-red-500 text-xs">{errors.ownerName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Teléfono *
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Link de contacto *
            </label>
            <input
              name="contactLink"
              value={form.contactLink}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.contactLink ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.contactLink && (
              <p className="text-red-500 text-xs">{errors.contactLink}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de contacto *
            </label>
            <select
              name="contactType"
              value={form.contactType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.contactType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecciona una opción</option>
              <option value="Instagram">Instagram</option>
              <option value="Sitio Web">Sitio Web</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </select>
            {errors.contactType && (
              <p className="text-red-500 text-xs">{errors.contactType}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de beneficio
            </label>
            <select
              name="benefitType"
              value={form.benefitType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Selecciona una opción</option>
              <option value="Descuento">Descuento</option>
              <option value="Promoción">Promoción</option>
              <option value="Beneficio">Beneficio</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Beneficio
            </label>
            <input
              name="benefit"
              value={form.benefit}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Descripción corta
            </label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={100}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <p className="text-xs text-gray-500">
              {form.description.length}/100
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Descripción completa
            </label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleChange}
              maxLength={500}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24 resize-none"
            />
            <p className="text-xs text-gray-500">
              {form.fullDescription.length}/500
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Logo de la empresa
            </label>
            <UploadToCloudinary onUpload={handleImageUpload} />
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 flex items-center justify-center min-h-40">
              {form.logoUrl ? (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    ✓ Logo actual:
                  </p>
                  <img
                    src={form.logoUrl}
                    alt="Logo preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-md mx-auto"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-sm">Sin logo cargado</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </form>
      )}

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </div>
  );
}
