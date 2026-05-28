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

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function AgregarEmpresa() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.companyName.trim()) newErrors.companyName = "El nombre de la empresa es obligatorio";
    if (!form.ownerName.trim()) newErrors.ownerName = "El nombre del dueño es obligatorio";
    if (!form.description.trim()) newErrors.description = "La descripción corta es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (url) => setForm((prev) => ({ ...prev, logoUrl: url }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setNotification({ message: "Completá los campos obligatorios.", type: "error" });
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, "empresas"), { ...form, createdAt: new Date().toISOString() });
      setNotification({ message: "Empresa agregada correctamente.", type: "success" });
      setForm(INITIAL_FORM);
      setErrors({});
    } catch {
      setNotification({ message: "Ocurrió un error al agregar la empresa. Intentá de nuevo.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Agregar Empresa</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-3xl space-y-8"
      >
        {/* Datos generales */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--font-color)" }}>
            Datos generales
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Nombre de la empresa" required>
              <input name="companyName" value={form.companyName} onChange={handleChange} className={`input ${errors.companyName ? "border-red-400" : ""}`} placeholder="Ej: Panadería San Martín" />
              {errors.companyName && <p className="text-xs text-red-500 mt-0.5">{errors.companyName}</p>}
            </Field>
            <Field label="Nombre del dueño" required>
              <input name="ownerName" value={form.ownerName} onChange={handleChange} className={`input ${errors.ownerName ? "border-red-400" : ""}`} placeholder="Ej: Juan Pérez" />
              {errors.ownerName && <p className="text-xs text-red-500 mt-0.5">{errors.ownerName}</p>}
            </Field>
            <Field label="Teléfono">
              <input name="phone" value={form.phone} onChange={handleChange} className="input" placeholder="Ej: +54 9 261 000-0000" />
            </Field>
            <Field label="Domicilio">
              <input name="address" value={form.address} onChange={handleChange} className="input" placeholder="Ej: Av. San Martín 1234, Mendoza" />
            </Field>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--font-color)" }}>
            Contacto
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Tipo de contacto">
              <select name="contactType" value={form.contactType} onChange={handleChange} className="input">
                <option value="">Seleccionar...</option>
                <option value="Instagram">Instagram</option>
                <option value="Sitio Web">Sitio Web</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
              </select>
            </Field>
            <Field label="Link de contacto">
              <input name="contactLink" value={form.contactLink} onChange={handleChange} className="input" placeholder="https://..." />
            </Field>
          </div>
        </div>

        {/* Beneficio */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--font-color)" }}>
            Beneficio
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Tipo de beneficio">
              <select name="benefitType" value={form.benefitType} onChange={handleChange} className="input">
                <option value="">Seleccionar...</option>
                <option value="Descuento">Descuento</option>
                <option value="Promoción">Promoción</option>
                <option value="Beneficio">Beneficio</option>
              </select>
            </Field>
            <Field label="Descripción del beneficio">
              <input name="benefit" value={form.benefit} onChange={handleChange} className="input" placeholder="Ej: 15% de descuento en todos los productos" />
            </Field>
          </div>
        </div>

        {/* Descripciones */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--font-color)" }}>
            Descripciones
          </p>
          <div className="space-y-5">
            <Field label="Descripción corta" required>
              <input name="description" value={form.description} onChange={handleChange} className={`input ${errors.description ? "border-red-400" : ""}`} placeholder="Resumen breve visible en la tarjeta" maxLength={100} />
              <div className="flex justify-between items-center mt-0.5">
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                <p className="text-xs text-gray-400 ml-auto">{form.description.length}/100</p>
              </div>
            </Field>
            <Field label="Descripción completa">
              <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} className="input h-28 resize-none" placeholder="Descripción detallada de la empresa..." maxLength={500} />
              <p className="text-xs text-gray-400 text-right">{form.fullDescription.length}/500</p>
            </Field>
          </div>
        </div>

        {/* Logo */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--font-color)" }}>
            Logo
          </p>
          <UploadToCloudinary onUpload={handleImageUpload} currentUrl={form.logoUrl} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-opacity disabled:opacity-60"
          style={{ background: "var(--font-color)" }}
        >
          {submitting ? "Guardando..." : "Agregar empresa"}
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
