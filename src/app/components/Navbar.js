"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.removeItem("user");
      router.push("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      alert("❌ No se pudo cerrar sesión");
    }
  };

  return (
    <nav className="navbar bg-gray-900 text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER (siempre horizontal) --- */}
        <div className="flex justify-between items-center">
          
          {/* Logo + Títulos */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src="/logo.png" alt="Logo" width={70} height={70} />
            </Link>

            <div className="flex flex-col">
              <h2 className="text-2xl font-bold [color:var(--font-color)] leading-tight">
                Bernabeu & Asociados
              </h2>
              <p className="text-sm [color:var(--font-color)] mt-1">
                Consultora Empresarial
              </p>
            </div>
          </div>

          {/* Botón hamburguesa (solo mobile) */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* NAV DESKTOP */}
          <ul className="hidden md:flex gap-6">
            <li><Link href="/" className="hover:text-(--font-color)">Inicio</Link></li>
            <li><Link href="/nosotros" className="hover:text-(--font-color)">Nosotros</Link></li>
            <li><Link href="/empresas" className="hover:text-(--font-color)">Empresas</Link></li>
            <li><Link href="/contacto" className="hover:text-(--font-color)">Contacto</Link></li>
            
            {loading ? (
              <li className="text-gray-400">Cargando...</li>
            ) : user ? (
              <>
                {user.role === "admin" && (
                  <li><Link href="/dashboard" className="hover:text-(--font-color)">Dashboard</Link></li>
                )}
                <li>
                  <button onClick={handleLogout} className="hover:text-red-400">
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li><Link href="/login" className="hover:text-(--font-color)">Ingresar</Link></li>
            )}
          </ul>
        </div>

        {/* --- MENU MOBILE DESPLEGABLE --- */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-gray-800 p-4 rounded-lg animate-fade-down">
            <ul className="flex flex-col gap-4">
              <li><Link href="/" className="hover:text-(--font-color)">Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-(--font-color)">Nosotros</Link></li>
              <li><Link href="/empresas" className="hover:text-(--font-color)">Empresas</Link></li>
              <li><Link href="/contacto" className="hover:text-(--font-color)">Contacto</Link></li>

              {loading ? (
                <li className="text-gray-400">Cargando...</li>
              ) : user ? (
                <>
                  {user.role === "admin" && (
                    <li><Link href="/dashboard" className="hover:text-(--font-color)">Dashboard</Link></li>
                  )}
                  <li>
                    <button onClick={handleLogout} className="hover:text-red-400">
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <li><Link href="/login" className="hover:text-(--font-color)">Ingresar</Link></li>
              )}
            </ul>
          </div>
        )}

      </div>
    </nav>
  );
}
