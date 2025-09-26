"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import UploadToCloudinary from "@/app/components/UploadToCloudinary";

export default function AgregarEmpresa() {
  const [form, setForm] = useState({
    companyName: "",
    ownerName: "",
    phone: "",
    logoUrl: "",
    contactLink: "",
    benefitType: "",
    description: "",
    benefit: "",
    fullDescription: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleImageUpload = (url) => {
    setForm((prev) => ({ ...prev, logoUrl: url }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      await addDoc(collection(db, "empresas"), form);
      setMensaje("✅ Empresa agregada correctamente.");
      setForm({
        companyName: "",
        ownerName: "",
        phone: "",
        logoUrl: "",
        contactLink: "",
        benefitType: "",
        description: "",
        benefit: "",
        fullDescription: "",
      });
    } catch {
      setMensaje("❌ Error al agregar la empresa.");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agregar Empresa</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-md"
      >
        <input
          name="companyName"
          placeholder="Nombre de la empresa"
          value={form.companyName}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="ownerName"
          placeholder="Nombre del dueño"
          value={form.ownerName}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="contactLink"
          placeholder="Link de contacto"
          value={form.contactLink}
          onChange={handleChange}
          required
          className="input"
        />
        <select
          name="benefitType"
          value={form.benefitType}
          onChange={handleChange}
          required
          className="input bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar tipo de beneficio</option>
          <option value="Texto">Texto</option>
          <option value="Descuento">Descuento</option>
        </select>
        <input
          name="description"
          placeholder="Descripción corta"
          value={form.description}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="benefit"
          placeholder="Beneficio"
          value={form.benefit}
          onChange={handleChange}
          required
          className="input"
        />
        <textarea
          name="fullDescription"
          placeholder="Descripción completa"
          value={form.fullDescription}
          onChange={handleChange}
          required
          className="input col-span-1 md:col-span-2 h-32 resize-none"
        />

        {/* Subida de imagen */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <UploadToCloudinary onUpload={handleImageUpload} />
          {form.logoUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Logo cargado:</p>
              <img
                src={form.logoUrl}
                alt="Logo preview"
                className="w-32 h-32 object-cover rounded-md shadow"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Agregar
        </button>
      </form>

      {mensaje && (
        <p className="mt-6 text-center text-sm font-medium text-green-600">
          {mensaje}
        </p>
      )}
    </div>
  );
}
