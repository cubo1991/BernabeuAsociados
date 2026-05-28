"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import UploadToCloudinary from "@/app/components/UploadToCloudinary";
import Notification from "@/app/components/Notification";

const EMPTY_FORM = {
  companyName: "", ownerName: "", phone: "", logoUrl: "",
  contactLink: "", contactType: "", benefitType: "",
  benefit: "", description: "", fullDescription: "", address: "",
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

export default function ModificarEmpresaPage() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmpresas = async () => {
      setLoadingEmpresas(true);
      try {
        const snapshot = await getDocs(collection(db, "empresas"));
        setEmpresas(snapshot.docs.map((d) => ({ firestoreId: d.id, ...d.data() })));
      } catch {
        setNotification({ message: "Error al cargar las empresas.", type: "error" });
      } finally {
        setLoadingEmpresas(false);
      }
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
      setErrors({});
      setNotification({ message: "", type: "" });
    }
  }, [selectedId, empresas]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.companyName.trim()) newErrors.companyName = "El nombre es obligatorio";
    if (!form.ownerName.trim()) newErrors.ownerName = "El dueño es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (url) =>
    setForm((prev) => ({ ...prev, logoUrl: url }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return;
    if (!validateForm()) {
      setNotification({ message: "Completá los campos obligatorios.", type: "error" });
      return;
    }
    setSubmitting(true);
    try {
      await updateDoc(doc(db, "empresas", selectedId), { ...form, updatedAt: new Date().toISOString() });
      setNotification({ message: "Empresa modificada correctamente.", type: "success" });
    } catch {
      setNotification({ message: "Ocurrió un error al guardar los cambios.", type: "error" });
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
          disabled={loadingEmpresas}
          className="input"
        >
          <option value="">{loadingEmpresas ? "Cargando..." : "Seleccionar..."}</option>
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
              <Field label="Nombre de la empresa" required>
                <input name="companyName" value={form.companyName} onChange={handleChange} className={`input ${errors.companyName ? "border-red-400" : ""}`} />
                {errors.companyName && <p className="text-xs text-red-500 mt-0.5">{errors.companyName}</p>}
              </Field>
              <Field label="Nombre del dueño" required>
                <input name="ownerName" value={form.ownerName} onChange={handleChange} className={`input ${errors.ownerName ? "border-red-400" : ""}`} />
                {errors.ownerName && <p className="text-xs text-red-500 mt-0.5">{errors.ownerName}</p>}
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
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
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
                  <option value="Descuento">Descuento</option>
                  <option value="Promoción">Promoción</option>
                  <option value="Beneficio">Beneficio</option>
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
                <input name="description" value={form.description} onChange={handleChange} className="input" maxLength={100} />
                <p className="text-xs text-gray-400 text-right">{form.description.length}/100</p>
              </Field>
              <Field label="Descripción completa">
                <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} className="input h-28 resize-none" maxLength={500} />
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
            {submitting ? "Guardando..." : "Guardar cambios"}
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
