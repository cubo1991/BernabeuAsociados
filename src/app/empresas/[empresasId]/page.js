"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export default function Page({ params }) {
  const [empresa, setEmpresa] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const docRef = doc(db, "empresas", params.empresasId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEmpresa({ id: docSnap.id, ...docSnap.data() });
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error al obtener la empresa:", error);
        setNotFound(true);
      }
    };

    fetchEmpresa();
  }, [params.empresasId]);

  if (notFound) {
    return (
      <div className="p-10 text-center text-red-600">
        Empresa no encontrada.
      </div>
    );
  }

  if (!empresa) {
    return (
      <div className="p-10 text-center text-gray-500">
        Cargando empresa...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <div className="flex items-center gap-4">
            <img
              src={empresa.logoUrl}
              alt={`Logo de ${empresa.companyName}`}
              className="w-20 h-20 object-cover rounded-full border border-gray-200"
            />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {empresa.companyName}
              </h3>
              <p className="text-sm text-gray-500">
                Fundado por {empresa.ownerName}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-700 text-lg">{empresa.fullDescription}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-600">Beneficio</h4>
                <p className="text-gray-800 font-semibold">{empresa.benefit}</p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-600">Contacto</h4>
                <p className="text-gray-800">{empresa.phone}</p>

                {empresa.contactType === "Sitio Web" && (
                  <a
                    href={empresa.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Ir al sitio
                  </a>
                )}

                {empresa.contactType === "Instagram" && (
                  <a
                    href={empresa.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Instagram
                  </a>
                )}

                {empresa.address && (
                  <p className="text-sm text-gray-500 mt-2">
                    {empresa.address}
                  </p>
                )}
              </div>
            </div>

            {empresa.address && (
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-600 mb-2">Ubicación</h4>
                <iframe
                  title="Mapa de ubicación"
                  width="100%"
                  height="300"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg border"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    empresa.address
                  )}&output=embed`}
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
