'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Instagram, Globe, MapPin } from 'lucide-react';

export default function CompanyCard({ companyName, logoUrl, phone, contactLink, description, contactType, address }) {
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
      className={`relative bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-all duration-700 ease-out transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }  md:aspect-auto`}
    >

      {/* Logo */}
      <div className="logo-container w-full h-32 md:w-50 md:h-50 mb-3 relative flex-shrink-0">
        <Image
          src={logoUrl}
          alt={`Logo de ${companyName}`}
          fill
          className="object-contain rounded-lg logo-hover border-2"
        />
      </div>

      {/* Info */}
      <div className="flex-grow flex flex-col justify-center overflow-hidden">
        <h2 className="text-xl font-bold text-black line-clamp-2">
          {companyName}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex flex-col items-center gap-1 mt-2 text-sm">
          {phone && (
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hola! Vengo desde la Comunidad de B&A, me gustaría estar en contacto con ustedes.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-600 hover:underline"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          )}

          {contactLink && (contactType === 'Instagram' || contactType === 'Sitio Web') && (
            <a
              href={contactLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-indigo-600 hover:underline"
            >
              {contactType === 'Instagram' ? <Instagram className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              {contactType}
            </a>
          )}

          {address && (
            <span className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" /> {address}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
