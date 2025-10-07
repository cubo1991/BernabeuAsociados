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
   <nav className="navbar bg-gray-900 text-white px-6 py-4 shadow-md">
  <div className="max-w-7xl mx-auto flex justify-between items-center gap-8">
    
    {/* Izquierda: Logo */}
    <div className="flex items-center gap-4">
      <Link href="/" className="text-xl font-bold text-white hover:text-indigo-400">
        <img src="/logo.png" alt="Logo" width={70} height={70} />
      </Link>

      {/* Centro: Nombre y subtítulo */}
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-2xl font-bold [color:var(--font-color)] leading-tight">
          Bernabeu & Asociados
        </h2>
        <p className="text-sm [color:var(--font-color)] mt-1">
          Consultora Empresarial
        </p>
      </div>
    </div>

    {/* Derecha: Botón y navegación */}
    <div className="flex items-center gap-6">
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

      <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
          <li><Link href="/" className="hover:text-indigo-400">Inicio</Link></li>
          <li><Link href="/nosotros" className="hover:text-indigo-400">Nosotros</Link></li>
          <li><Link href="/contacto" className="hover:text-indigo-400">Contacto</Link></li>

          {loading ? (
            <li>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Cargando sesión...</span>
              </div>
            </li>
          ) : user ? (
            <>
              {user.role === "admin" && (
                <li><Link href="/dashboard" className="hover:text-indigo-400">Dashboard</Link></li>
              )}
              <li>
                <button onClick={handleLogout} className="hover:text-red-400 text-left">
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login" className="hover:text-indigo-400">Ingresar</Link></li>
          )}
        </ul>
      </div>
    </div>
  </div>
</nav>

  );
}
