"use client";

import { useState } from "react";

export default function UploadToCloudinary({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Seleccioná una imagen");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "empresa_upload"); // 👈 tu preset

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dpe80oekd/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      onUpload(data.secure_url); // 🔥 pasa la URL al padre
      setPreview(data.secure_url);
    } catch (err) {
      console.error("Error al subir:", err);
      alert("❌ Falló la subida");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
        className="input"
      />
      <button
        type="button"
        onClick={handleUpload}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Subiendo..." : "Subir Logo"}
      </button>

      {preview && (
        <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md shadow" />
      )}
    </div>
  );
}
