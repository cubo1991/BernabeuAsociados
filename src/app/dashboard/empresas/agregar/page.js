"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import UploadToCloudinary from "@/app/components/UploadToCloudinary";

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
  const [mensaje, setMensaje] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = (url) => setForm((prev) => ({ ...prev, logoUrl: url }));

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.ownerName.trim()) {
      setMensaje({ type: "error", text: "El nombre de la empresa y del dueño son obligatorios." });
      return;
    }
    setSubmitting(true);
    setMensaje(null);
    try {
      await addDoc(collection(db, "empresas"), form);
      setMensaje({ type: "success", text: "Empresa agregada correctamente." });
      setForm(INITIAL_FORM);
    } catch {
      setMensaje({ type: "error", text: "Ocurrió un error al agregar la empresa. Intentá de nuevo." });
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
              <input name="companyName" value={form.companyName} onChange={handleChange} className="input" placeholder="Ej: Panadería San Martín" />
            </Field>
            <Field label="Nombre del dueño" required>
              <input name="ownerName" value={form.ownerName} onChange={handleChange} className="input" placeholder="Ej: Juan Pérez" />
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
                <option value="Texto">Texto</option>
                <option value="Descuento">Descuento</option>
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
            <Field label="Descripción corta">
              <input name="description" value={form.description} onChange={handleChange} className="input" placeholder="Resumen breve visible en la tarjeta" />
            </Field>
            <Field label="Descripción completa">
              <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} className="input h-28 resize-none" placeholder="Descripción detallada de la empresa..." />
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

        {mensaje && (
          <div className={`p-4 rounded-lg text-sm font-medium border ${
            mensaje.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {mensaje.text}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-opacity disabled:opacity-60"
          style={{ background: "var(--font-color)" }}
        >
          {submitting ? "Guardando..." : "Agregar empresa"}
        </button>
      </form>
    </div>
  );
}
