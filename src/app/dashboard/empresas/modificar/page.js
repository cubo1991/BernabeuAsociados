"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import UploadToCloudinary from "@/app/components/UploadToCloudinary";

const EMPTY_FORM = {
  companyName: "", ownerName: "", phone: "", logoUrl: "",
  contactLink: "", contactType: "", benefitType: "",
  benefit: "", description: "", fullDescription: "", address: "",
};

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );
}

export default function ModificarEmpresaPage() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const snapshot = await getDocs(collection(db, "empresas"));
      setEmpresas(snapshot.docs.map((d) => ({ firestoreId: d.id, ...d.data() })));
    };
    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const empresa = empresas.find((e) => e.firestoreId === selectedId);
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
      setMensaje(null);
    }
  }, [selectedId, empresas]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageUpload = (url) =>
    setForm((prev) => ({ ...prev, logoUrl: url }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return;
    setSubmitting(true);
    setMensaje(null);
    try {
      await updateDoc(doc(db, "empresas", selectedId), form);
      setMensaje({ type: "success", text: "Empresa modificada correctamente." });
    } catch {
      setMensaje({ type: "error", text: "Ocurrió un error al guardar los cambios." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Modificar Empresa</h1>

      <div className="mb-6 max-w-sm">
        <label className="text-xs font-medium text-gray-600 block mb-1">Seleccioná una empresa</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="input"
        >
          <option value="">Seleccionar...</option>
          {empresas.map((e) => (
            <option key={e.firestoreId} value={e.firestoreId}>
              {e.companyName || "Sin nombre"}
            </option>
          ))}
        </select>
      </div>

      {selectedId && (
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
              <Field label="Nombre de la empresa">
                <input name="companyName" value={form.companyName} onChange={handleChange} className="input" />
              </Field>
              <Field label="Nombre del dueño">
                <input name="ownerName" value={form.ownerName} onChange={handleChange} className="input" />
              </Field>
              <Field label="Teléfono">
                <input name="phone" value={form.phone} onChange={handleChange} className="input" />
              </Field>
              <Field label="Domicilio">
                <input name="address" value={form.address} onChange={handleChange} className="input" />
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
                <input name="contactLink" value={form.contactLink} onChange={handleChange} className="input" />
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
                <input name="benefit" value={form.benefit} onChange={handleChange} className="input" />
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
                <input name="description" value={form.description} onChange={handleChange} className="input" />
              </Field>
              <Field label="Descripción completa">
                <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} className="input h-28 resize-none" />
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
            {submitting ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      )}
    </div>
  );
}
