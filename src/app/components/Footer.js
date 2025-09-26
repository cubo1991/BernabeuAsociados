// src/app/components/Footer.js
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Sitio desarrollado por <span className="text-white font-semibold">David López</span>
        </p>
    
<Link
  href="/login"
  className="text-indigo-400 hover:text-indigo-300 text-sm underline underline-offset-2"
>
  Login
</Link>
      </div>
    </footer>
  );
}
