"use client";

import { useState, useEffect } from "react";

export default function UploadToCloudinary({ onUpload, currentUrl }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [localPreview, setLocalPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setLocalPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setLocalPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const previewUrl = localPreview || currentUrl;

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Seleccioná una imagen antes de subir.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "empresa_upload");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dpe80oekd/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.secure_url) throw new Error("Respuesta inválida del servidor.");
      onUpload(data.secure_url);
      setFile(null);
    } catch {
      setError("No se pudo subir la imagen. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Vista previa"
            className="w-20 h-20 rounded-lg object-cover border border-gray-200 shrink-0"
          />
        )}
        <div className="flex-1 space-y-2">
          <label className="block">
            <span className="sr-only">Seleccionar imagen</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input block w-full text-sm text-gray-500"
            />
          </label>

          {file && (
            <button
              type="button"
              onClick={handleUpload}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium text-white transition-opacity disabled:opacity-60"
              style={{ background: "var(--font-color)" }}
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Subiendo...
                </>
              ) : (
                "Subir imagen"
              )}
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
