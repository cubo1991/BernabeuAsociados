'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function CompanyCard({ companyName, ownerName, logoUrl, benefit }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-md border p-4 flex flex-col items-center text-center transition-all duration-700 ease-out transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="w-20 h-20 mb-3 relative">
        <Image
          src={logoUrl}
          alt={`Logo de ${companyName}`}
          fill
          className="object-contain rounded-full"
        />
      </div>
      <h2 className="text-lg font-semibold">{companyName}</h2>
      <p className="text-sm text-gray-600">Dueño: {ownerName}</p>
      <p className="mt-2 text-sm text-indigo-600 font-medium">{benefit}</p>
    </div>
  );
}
