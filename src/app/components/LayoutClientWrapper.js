"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutClientWrapper({ children }) {
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timeout = setTimeout(() => setTransitioning(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return transitioning ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 animate-fade-in z-50">
      <div className="flex flex-col items-center space-y-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-20 h-20 grayscale opacity-0 animate-[reveal_1s_ease-in-out_forwards]"
        />
        <p className="text-gray-700 text-lg font-medium tracking-wide animate-pulse">
          Cargando beneficios
        </p>
      </div>

      <style jsx global>{`
        @keyframes reveal {
          0% {
            opacity: 0;
            filter: grayscale(100%);
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            filter: grayscale(0%);
            transform: scale(1);
          }
        }
          
      `}</style>
    </div>
  ) : (
    children
  );
}
