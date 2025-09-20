'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white hover:text-indigo-400">
          MiApp
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Enlaces */}
        <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
            <li>
              <Link href="/" className="hover:text-indigo-400">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-400">
                Acerca
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-400">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
