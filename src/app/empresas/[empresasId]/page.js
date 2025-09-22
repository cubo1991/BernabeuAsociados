import companies from "../../constants/dummyCompanies";

export default function EmpresasLayout({params, children }) {
const { empresas } = companies;
const empresa = empresas.find((emp) => emp.id === parseInt(params.empresasId));


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

      </div>
    </div>
  );
}
