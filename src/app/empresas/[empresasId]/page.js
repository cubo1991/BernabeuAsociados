import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";


/**
 * Layout de página para una empresa que obtiene datos desde Firestore y renderiza la UI correspondiente.
 *
 * Esta función es asíncrona porque consulta un documento en Cloud Firestore usando el id pasado
 * en params.empresasId. Si el documento no existe, renderiza un mensaje indicando que la empresa no fue encontrada.
 *
 * @async
 * @function EmpresasLayout
 * @param {Object} props - Props entrantes del layout.
 * @param {Object} props.params - Parámetros de ruta provistos por Next.js.
 * @param {string} props.params.empresasId - ID del documento de la empresa en la colección "empresas".
 * @param {import('react').ReactNode} props.children - Contenido hijo que se renderiza dentro del layout.
 * @returns {Promise<import('react').ReactElement>} Elemento React que contiene la UI del layout de la empresa.
 *
 * @remarks
 * - Se espera que el documento de Firestore contenga las siguientes propiedades (al menos):
 *   - logoUrl: string
 *   - companyName: string
 *   - ownerName: string
 *   - fullDescription: string
 *   - benefit: string
 *   - benefitType: string
 *   - phone: string
 *   - contactLink: string (URL)
 * - Maneja explícitamente el caso en que el documento no existe mostrando un mensaje de error en la UI.
 * - Se asume que en el ámbito están disponibles las utilidades de Firestore (por ejemplo `db`, `doc`, `getDoc`).
 *
 * @throws {Error} Si la consulta a Firestore falla, la excepción subyacente se propagará (no se captura aquí).
 */
export default async function EmpresasLayout({ params, children }) {
  const docRef = doc(db, "empresas", params.empresasId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="p-10 text-center text-red-600">
        Empresa no encontrada.
      </div>
    );
  }

  const empresa = { id: docSnap.id, ...docSnap.data() };

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
              <h3 className="text-2xl font-semibold text-gray-800">{empresa.companyName}</h3>
              <p className="text-sm text-gray-500">Fundado por {empresa.ownerName}</p>
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
                <span className="text-xs text-gray-500">{empresa.benefitType}</span>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-600">Contacto</h4>
                <p className="text-gray-800">{empresa.phone}</p>
                <a
                  href={empresa.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Ir al sitio
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
