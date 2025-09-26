"use client";

export default function ContactoPage() {
  return (
    <main className="p-10 bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Contacto</h1>

      <div className="max-w-2xl mx-auto text-lg space-y-6">
        <p>
          ¿Tenés preguntas, ideas o querés trabajar con nosotros? Estamos siempre disponibles para escucharte. Podés escribirnos o enviarnos un mensaje directo por WhatsApp.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">📧 Correo electrónico</h2>
            <p className="text-gray-600">
              <a href="mailto:contacto@bernabeuasociados.com" className="text-blue-600 hover:underline">
                contacto@bernabeuasociados.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">📱 WhatsApp</h2>
            <p className="text-gray-600">
              <a
                href="https://wa.me/5492611234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                +54 9 261 123-4567
              </a>
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm text-center pt-6">
          Respondemos de lunes a viernes, de 9:00 a 18:00 hs (ART).
        </p>
      </div>
    </main>
  );
}
