"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import equipo from '@/data/equipo';
import { getEmpresas } from '@/services/Empresas/EmpresasService';

const servicios = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 0-14.14 0M4.93 19.07a10 10 0 0 0 14.14 0M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
    titulo: "Tecnología y Datos",
    descripcion:
      "De nada sirve analizar datos malos. Primero ordenamos cómo se captura la información: más rápido, menos errores, menos fricción y con una estructura clara. Después la convertimos en accionables concretos.",
    tags: ["Optimización de procesos", "Captura de datos", "Automatizaciones e IA aplicada"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 12c0-3 3-6 9-6s9 3 9 6M3 12c0 3 3 6 9 6s9-3 9-6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    titulo: "Asesoramiento Estratégico",
    descripcion:
      "Estamos a tu lado cuando tenés que decidir algo importante. Te damos nuestra opinión, basada en datos y en nuestra experiencia, sin sesgos, velando siempre por el negocio y no por la respuesta que querés escuchar.",
    tags: ["Decisiones basadas en datos", "Análisis de escenarios", "Planeamiento estratégico", "Acompañamiento continuo"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="12" width="4" height="9" />
        <rect x="10" y="7" width="4" height="14" />
        <rect x="17" y="3" width="4" height="18" />
      </svg>
    ),
    titulo: "Diagnóstico Financiero",
    descripcion:
      "Conocer tus números reales es el punto de partida. Te ayudamos a entender dónde está el dinero, dónde se pierde y cuánto necesitás vender para que el negocio sea sano.",
    tags: ["Estructura de costos", "Rentabilidad", "Punto de equilibrio", "Márgenes por producto"],
  },
];

const pasos = [
  {
    n: "1",
    titulo: "Problema concreto, diagnóstico real",
    desc: "Identificamos qué está pasando y empezamos a medirlo con datos propios del negocio, no con supuestos.",
  },
  {
    n: "2",
    titulo: "Claridad y pasos accionables",
    desc: "Transformamos los números en información que se entiende y que sirve para tomar decisiones concretas.",
  },
  {
    n: "3",
    titulo: "Acompañamiento que crece con el negocio",
    desc: "La confianza se construye cuando ves que la toma de decisiones mejora. Nos convertimos en parte del equipo.",
  },
];

const diferenciales = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <line x1="19" y1="11" x2="19" y2="17" />
        <line x1="22" y1="14" x2="16" y2="14" />
      </svg>
    ),
    titulo: "Mirada externa, compromiso interno",
    desc: "Vemos lo que vos no ves porque estás adentro del negocio. Pero nos involucramos como si fuera nuestro.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    titulo: "Recomendaciones que se pueden ejecutar",
    desc: "Cada análisis termina en pasos claros y priorizados, identificando riesgos y oportunidades.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    titulo: "Confidencialidad y confianza real",
    desc: "Los empresarios nos comparten sus números reales porque saben que estamos de su lado. Sin conflicto de interés.",
  },
];

const TARGET_AREA = 96 * 96;

function LogoItem({ companyName, logoUrl }) {
  const [size, setSize] = useState({ width: 96, height: 96 });

  return (
    <div
      style={{ position: 'relative', width: size.width, height: size.height }}
      className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
    >
      <Image
        src={logoUrl}
        alt={`Logo de ${companyName}`}
        fill
        className="object-contain"
        onLoad={(e) => {
          const { naturalWidth, naturalHeight } = e.target;
          const ratio = naturalWidth / naturalHeight;
          const h = Math.round(Math.sqrt(TARGET_AREA / ratio));
          const w = Math.round(Math.sqrt(TARGET_AREA * ratio));
          setSize({ width: Math.min(w, 220), height: Math.max(h, 40) });
        }}
      />
    </div>
  );
}

export default function HomePage() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    getEmpresas().then(setEmpresas).catch(() => {});
  }, []);

  return (
    <main className="text-gray-800">

      {/* HERO */}
      <section className="bg-gray-900 text-white py-20 px-10 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--font-color)" }}>
          Qué hacemos
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
          Lo concreto primero.{" "}
          <span className="italic font-normal" style={{ color: "var(--font-color)" }}>
            Lo estratégico, después.
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Comenzamos con una necesidad puntual: costos, rentabilidad, punto de equilibrio.
          Nos convertimos en el equipo que te acompaña en cada decisión que importa.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/5491153243493?text=%C2%A1Hola!%20Vengo%20desde%20la%20web%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20soluciones."
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--font-color)" }}
          >
            Hablemos
          </a>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="bg-white py-16 overflow-hidden">
        <style>{`
          @keyframes marquee-team {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-team {
            animation: marquee-team 28s linear infinite;
          }
          .marquee-team:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="text-center mb-12 px-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--font-color)" }}>
            Nuestro equipo
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Las personas detrás del trabajo</h2>
        </div>

        <div
          className="relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="marquee-team flex gap-12 w-max">
            {[...equipo, ...equipo].map(({ name, role, image }, i) => (
              <div key={`${name}-${i}`} className="flex flex-col items-center text-center shrink-0 w-36">
                <Image
                  src={image}
                  alt={`${name.trim()}, ${role}`}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
                />
                <h3 className="text-sm font-semibold text-gray-900 leading-snug">{name.trim()}</h3>
                <p className="text-xs text-gray-500 mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NARRATIVE */}
      <section className="bg-white py-16 px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--font-color)" }}>
              Cómo empezamos
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-snug">
              Llegamos para dar respuesta a una inquietud. Nos quedamos por la confianza.
            </h2>
            <div className="space-y-3 text-base leading-relaxed text-gray-600">
              <p>Los empresarios suelen compartirnos inquietudes concretas:</p>
              <p className="italic text-gray-800">"No sé si me conviene tomar esta decisión"</p>
              <p className="italic text-gray-800">"Vendo y cobro. Sin embargo, a fin de mes no tengo dinero."</p>
              <p className="italic text-gray-800">"Quiero expandirme y no sé si es el momento."</p>
              <p>Ahí entramos nosotros.</p>
              <p>
                Cuando las respuestas llegan con claridad, respaldadas por datos y sin rodeos, la relación cambia.
                Dejamos de ser un servicio y pasamos a ser el equipo que acompaña cada decisión importante.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {pasos.map(({ n, titulo, desc }) => (
              <div key={n} className="flex gap-4 items-start">
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                  style={{ background: "var(--font-color)" }}
                >
                  {n}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{titulo}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50 py-16 px-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--font-color)" }}>
            Nuestros servicios
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Tres ejes de trabajo, una sola dirección</h2>
          <p className="text-gray-600 leading-relaxed">
            Desde el diagnóstico financiero hasta la toma de decisiones estratégica: siempre con datos, siempre
            velando por tu negocio.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicios.map(({ icon, titulo, descripcion, tags }) => (
            <div
              key={titulo}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(178,147,91,0.12)", color: "var(--font-color)" }}
              >
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{titulo}</h3>
              <p className="text-sm text-gray-600 leading-relaxed grow">{descripcion}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUÉ NOS ELIGEN */}
      <section className="bg-gray-900 text-white py-16 px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--font-color)" }}>
              Por qué nos eligen
            </p>
            <h2 className="text-3xl font-bold text-white mb-5 leading-snug">
              <span className="italic font-normal" style={{ color: "var(--font-color)" }}>
                Velamos por tu negocio
              </span>
              , no por tu aprobación
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              No te decimos lo que querés escuchar. Somos los que te dicen lo que necesitás saber — con los datos que
              lo respaldan y con el compromiso de estar presentes cuando tomes la decisión.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                <p className="font-bold text-lg mb-1" style={{ color: "var(--font-color)" }}>
                  Datos y experiencia
                </p>
                <p className="text-sm text-gray-500">como base de cada recomendación</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                <p className="font-bold text-lg mb-1" style={{ color: "var(--font-color)" }}>
                  Pymes
                </p>
                <p className="text-sm text-gray-500">Nuestro foco y nuestro lenguaje</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {diferenciales.map(({ icon, titulo, desc }) => (
              <div
                key={titulo}
                className="bg-gray-800 rounded-lg p-5 flex gap-4 items-start border border-gray-700 transition-colors duration-200 hover:bg-gray-700"
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(178,147,91,0.15)", color: "var(--font-color)" }}
                >
                  {icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{titulo}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFÍAN EN NOSOTROS */}
      {empresas.length > 0 && (
        <section className="bg-gray-50 py-16 px-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--font-color)" }}>
                Clientes
              </p>
              <h2 className="text-3xl font-bold text-gray-900">Confían en nosotros</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-10 items-center">
              {empresas.map(({ id, companyName, logoUrl }) => (
                <LogoItem key={id} companyName={companyName} logoUrl={logoUrl} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white py-16 px-10 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--font-color)" }}>
            Siguiente paso
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Conversamos?</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            100% gratuito, sin formularios ni compromisos. Contanos sobre tu negocio, tus inquietudes y vemos cómo
            podemos ayudarte.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/5491153243493?text=%C2%A1Hola!%20Vengo%20desde%20la%20web%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20sus%20soluciones."
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "var(--font-color)" }}
            >
              Escribinos por WhatsApp
            </a>
            <a
              href="mailto:bernabeuasociados@gmail.com"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-gray-600 border border-gray-300 transition-all hover:border-gray-500 hover:text-gray-800"
            >
              Enviar un mail
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
