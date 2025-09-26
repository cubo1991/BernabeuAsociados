"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutClientWrapper({ children }) {
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timeout = setTimeout(() => setTransitioning(false), 500); // un poco más de suavidad
    return () => clearTimeout(timeout);
  }, [pathname]);

  return transitioning ? (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 via-white to-gray-200 animate-fade-in">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg" />
        <p className="text-gray-700 text-lg font-medium tracking-wide animate-pulse">
          Cargando vista...
        </p>
      </div>
    </div>
  ) : (
    children
  );
}
