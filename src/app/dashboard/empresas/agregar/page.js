"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import UploadToCloudinary from "@/app/components/UploadToCloudinary";
import Notification from "@/app/components/Notification";

const INITIAL_FORM = {
  companyName: "",
  ownerName: "",
  phone: "",
  logoUrl: "",
  contactLink: "",
  contactType: "",
  benefitType: "",
  description: "",
  benefit: "",
  fullDescription: "",
  address: "",
};

export default function AgregarEmpresa() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.companyName.trim()) newErrors.companyName = "El nombre de la empresa es obligatorio";
    if (!form.ownerName.trim()) newErrors.ownerName = "El nombre del dueño es obligatorio";
    if (!form.phone.trim()) newErrors.phone = "El teléfono es obligatorio";
    if (form.phone && !/^[\d\s+\-()]+$/.test(form.phone)) newErrors.phone = "Teléfono inválido";
    if (!form.contactLink.trim()) newErrors.contactLink = "El link de contacto es obligatorio";
    if (!form.contactType) newErrors.contactType = "Selecciona un tipo de contacto";
    // if (!form.benefitType) newErrors.benefitType = "Selecciona un tipo de beneficio"; // Ahora opcional
    if (!form.description.trim()) newErrors.description = "La descripción corta es obligatoria";
    // if (!form.benefit.trim()) newErrors.benefit = "El beneficio es obligatorio"; // Ahora opcional

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (url) => {
    setForm((prev) => ({ ...prev, logoUrl: url }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
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
      await addDoc(collection(db, "empresas"), {
        ...form,
        createdAt: new Date().toISOString(),
      });
      setNotification({
        message: "Empresa agregada correctamente",
        type: "success",
      });
      setForm(INITIAL_FORM);
    } catch (error) {
      setNotification({
        message: error.message || "Error al agregar la empresa",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Agregar Nueva Empresa</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Campos del formulario */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre de la empresa *
          </label>
          <input
            name="companyName"
            placeholder="Ej: Mi Empresa"
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
            placeholder="Ej: Juan Pérez"
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
            placeholder="Ej: +54 11 1234-5678"
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
            placeholder="Ej: https://instagram.com/empresa"
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
            Tipo de beneficio (opcional)
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
            Descripción corta *
          </label>
          <input
            name="description"
            placeholder="Breve descripción de la empresa"
            value={form.description}
            onChange={handleChange}
            maxLength={100}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Beneficio (opcional)
          </label>
          <input
            name="benefit"
            placeholder="Ej: 10% de descuento"
            value={form.benefit}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Domicilio (opcional)
          </label>
          <input
            name="address"
            placeholder="Dirección completa"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Descripción completa (opcional)
          </label>
          <textarea
            name="fullDescription"
            placeholder="Descripción detallada de la empresa y sus beneficios"
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
          {form.logoUrl && (
            <div className="mt-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-3 font-medium">
                ✓ Logo cargado correctamente:
              </p>
              <img
                src={form.logoUrl}
                alt="Logo preview"
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Agregando...
            </>
          ) : (
            "Agregar Empresa"
          )}
        </button>
      </form>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </div>
  );
}
