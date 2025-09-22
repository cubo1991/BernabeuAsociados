'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BenefitBadge from './BenefitBadtge';
import BenefitRibbon from './BenefitRibbon';
import Link from 'next/link';





export default function CompanyCard({ companyName, id, logoUrl, benefit, benefitType, phone, contactLink, description }) {
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
      className={`relative bg-white rounded-lg shadow-md border p-4 flex flex-col items-center text-center transition-all duration-700 ease-out transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
        {benefitType === 'Descuento' ? (
      <BenefitBadge text={benefit} />
    ) : (
      <BenefitRibbon text={benefit} />
    )}

      {/* Logo */}
      <div className="w-20 h-20 mb-3 relative">
        <Image
          src={logoUrl}
          alt={`Logo de ${companyName}`}
          fill
          className="object-contain rounded-full"
        />
      </div>

      {/* Info */}
      <Link href={`/empresas/${id}`}>
  <h2 className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 underline-offset-2 hover:underline">
    {companyName}
  </h2>
</Link>

      <p className="text-sm text-gray-600">{description}</p>
      <a href={contactLink} className="text-indigo-600 mt-2 hover:underline">
        Sitio Web / Instagram
      </a>
      <a  href={`https://wa.me/${phone}`} className="text-sm text-gray-600 mt-2">Whatsapp</a>
    </div>
  );
}
