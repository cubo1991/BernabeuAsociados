"use client";

export default function ContactoPage() {
  return (
    <main className="contactoOscuro p-10 bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Contacto</h1>

      <div className="max-w-2xl mx-auto text-lg space-y-6">
        <p>
          ¿Tenés preguntas, ideas o querés trabajar con nosotros? Estamos siempre disponibles para escucharte. Podés escribirnos o enviarnos un mensaje directo por WhatsApp.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">📧 Correo electrónico</h2>
            <p className="text-gray-600">
              <a href="mailto:bernabeuasociados@gmail.com" className="text-blue-600 hover:underline">
                bernabeuasociados@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">📱 WhatsApp</h2>
            <p className="text-gray-600">
              <a
                href={`https://wa.me/5491153243493?text=${encodeURIComponent('¡Hola! Vengo desde la Comunidad de B&A, me gustaría estar en contacto con ustedes.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
             
              >
                +54 9 11 5324-3493
              </a>
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm text-center pt-6">
          Podés escribirnos los 365 días del año, las 24 horas.
        </p>
      </div>
    </main>
  );
}
