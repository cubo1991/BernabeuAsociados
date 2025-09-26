"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";

export default function ModificarEmpresaPage() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    ownerName: "",
    phone: "",
    logoUrl: "",
    contactLink: "",
    benefitType: "",
    benefit: "",
    description: "",
    fullDescription: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const snapshot = await getDocs(collection(db, "empresas"));
      setEmpresas(
        snapshot.docs.map(docSnap => ({
          firestoreId: docSnap.id, // ID real del documento
          ...docSnap.data()
        }))
      );
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
          benefitType: empresa.benefitType || "",
          benefit: empresa.benefit || "",
          description: empresa.description || "",
          fullDescription: empresa.fullDescription || ""
        });
      }
    }
  }, [selectedId, empresas]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "empresas", selectedId), form);
      alert("✅ Empresa modificada correctamente");
    } catch (err) {
      alert("❌ Error al modificar la empresa");
    }
    setLoading(false);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Modificar Empresa</h2>

      <select
        value={selectedId}
        onChange={e => setSelectedId(e.target.value)}
        className="mb-8 w-full max-w-md border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecciona una empresa</option>
        {empresas.map(e => (
          <option key={e.firestoreId} value={e.firestoreId}>
            {e.companyName}
          </option>
        ))}
      </select>

      {selectedId && (
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
            name="logoUrl"
            placeholder="Logo URL"
            value={form.logoUrl}
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
            <option value="">Tipo de beneficio</option>
            <option value="Texto">Texto</option>
            <option value="Descuento">Descuento</option>
          </select>
          <input
            name="benefit"
            placeholder="Beneficio"
            value={form.benefit}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="description"
            placeholder="Descripción corta"
            value={form.description}
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
          <button
            type="submit"
            disabled={loading}
            className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            {loading ? "Guardando..." : "Modificar"}
          </button>
        </form>
      )}
    </div>
  );
}
