"use client";

export default function NosotrosPage() {
  return (
    <main className="p-10 bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Sobre Nosotros</h1>

      <div className="space-y-6 max-w-3xl mx-auto text-lg leading-relaxed">
        <p>
          En Bernabeu & Asociados, creemos que la innovación nace del compromiso con las personas. Desde nuestros inicios, nos propusimos transformar la manera en que las empresas se conectan con sus clientes.
        </p>
        <p>
          Nuestra historia comenzó en Mendoza, con un pequeño equipo apasionado por la tecnología y el diseño. Hoy, somos una firma reconocida por su enfoque humano y estratégico.
        </p>
        <p>
          Nos especializamos en soluciones digitales que combinan funcionalidad, estética y escalabilidad. Cada proyecto es una oportunidad para construir algo que perdure.
        </p>
        <p>
          Valoramos la transparencia, la colaboración y el aprendizaje continuo. Nuestro equipo trabaja codo a codo con cada cliente, entendiendo sus desafíos y celebrando sus logros.
        </p>
        <p>
          Más allá de los resultados, nos importa el impacto. Queremos que nuestras soluciones generen valor real, tanto para las empresas como para las comunidades que las rodean.
        </p>
        <p>
          Si estás buscando un socio estratégico que combine visión, técnica y compromiso, estás en el lugar correcto. Bienvenido a Bernabeu Asociados.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {[
            {
              name: "Lucía Fernández",
              role: "Directora de Estrategia",
              image: "https://placehold.co/300x300?text=Lucía",
            },
            {
              name: "Martín López",
              role: "Líder de Desarrollo",
              image: "https://placehold.co/300x300?text=Martín",
            },
            {
              name: "Sofía Ramírez",
              role: "Diseñadora UX/UI",
              image: "https://placehold.co/300x300?text=Sofía",
            },
            {
              name: "Julián Torres",
              role: "Especialista en Marketing",
              image: "https://placehold.co/300x300?text=Julián",
            },
          ].map(({ name, role, image }) => (
            <div key={name} className="flex flex-col items-center text-center">
              <img
                src={image}
                alt={name}
                className="w-40 h-40 rounded-full object-cover mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-600">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
