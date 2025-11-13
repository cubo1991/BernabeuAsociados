"use client";
import pedroFoto from '../../../public/pedro.jpg';
import goyoFoto from '../../../public/goyo.jpg';
import davidFoto from '../../../public/david.jpg';
import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <main className="nosotrosOscuro p-10 bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Sobre Nosotros</h1>

      <div className="space-y-6 max-w-3xl mx-auto text-lg leading-relaxed">
  <p>
    Somos un equipo de jóvenes profesionales con una mirada fresca y actual sobre los desafíos que enfrentan las pymes y las empresas familiares.
  </p>
  <p>
    Nuestro propósito es claro: ayudarte a ordenar y fortalecer la administración, las finanzas y la contabilidad de tu negocio, para que puedas tomar decisiones inteligentes, con mayor claridad y tranquilidad.
  </p>
  <p>
    Sabemos lo que significa estar al frente de una empresa y entendemos que, muchas veces, el día a día no deja espacio para poner en orden lo importante.
  </p>
  <p>
    Por eso estamos acá: para acompañarte con herramientas prácticas, compromiso real y una visión estratégica pensada para crecer juntos.
  </p>
</div>


      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestro Equipo</h2>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
  {[
    {
      name: "Pedro J. Bernabeu",
      role: "Director",
      image: pedroFoto,
    },
    {
      name: "Gregorio Lazarte",
      role: "Soporte Administrativo",
      image: goyoFoto,
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
    {
      name: "David Lopez",
      role: "Desarrollador Web",
      image: davidFoto,
    }
  ].map(({ name, role, image }, index, arr) => {
    const isLast = index === arr.length - 1;
    const isOdd = arr.length % 2 !== 0;

    return (
      <div
        key={name}
        className={`flex flex-col items-center text-center 
          ${isLast && isOdd ? "md:col-span-2 md:justify-self-center" : ""}`}
      >
        <Image
          src={image}
          alt={name + ", " + role}
          width={160}
          height={160}
          className="w-40 h-40 rounded-full object-cover mb-4 shadow-md"
        />
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    );
  })}
</div>

      </div>
    </main>
  );
}
