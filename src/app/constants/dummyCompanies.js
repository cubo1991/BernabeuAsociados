const companies = {
  "empresas": [
    {
      "id": 1,
      "companyName": "NovaTech Solutions",
      "ownerName": "Lucía Fernández",
      "logoUrl": "https://placehold.co/100x100.jpg?text=NovaTech",
      "benefit": "10% en consultoría tecnológica",
      "phone": "+54 9 261 123-4567",
      "contactLink": "https://novatech-solutions.com",
      "benefitType": "Descuento",
      "description": "Soluciones tecnológicas para empresas modernas."
    },
    {
      "id": 2,
      "companyName": "EcoVida Market",
      "ownerName": "Martín Ríos",
      "logoUrl": "https://placehold.co/100x100.jpg?text=EcoVida",
      "benefit": "15% en productos orgánicos",
      "phone": "+54 9 261 234-5678",
      "contactLink": "https://instagram.com/ecovidamarket",
      "benefitType": "Descuento",
      "description": "Alimentos orgánicos y saludables para tu día a día."
    },
    {
      "id": 3,
      "companyName": "PixelForge Studio",
      "ownerName": "Sofía Herrera",
      "logoUrl": "https://placehold.co/100x100.jpg?text=PixelForge",
      "benefit": "Diseño gráfico sin costo en tu primer pedido",
      "phone": "+54 9 261 345-6789",
      "contactLink": "https://pixelforge.studio",
      "benefitType": "Texto",
      "description": "Diseño visual creativo para marcas con impacto."
    },
    {
      "id": 4,
      "companyName": "Andes Legal",
      "ownerName": "Julián Torres",
      "logoUrl": "https://placehold.co/100x100.jpg?text=AndesLegal",
      "benefit": "Primera consulta legal gratuita",
      "phone": "+54 9 261 456-7890",
      "contactLink": "https://wa.me/5492614567890",
      "benefitType": "Texto",
      "description": "Asesoría jurídica clara y confiable."
    },
    {
      "id": 5,
      "companyName": "Mate & Código",
      "ownerName": "David López Mate",
      "logoUrl": "https://placehold.co/100x100.jpg?text=MateCodigo",
      "benefit": "10% en desarrollo web",
      "phone": "+54 9 261 567-8901",
      "contactLink": "https://mateycodigo.dev",
      "benefitType": "Descuento",
      "description": "Desarrollo web funcional con identidad local."
    },
    {
      "id": 6,
      "companyName": "Boreal Arquitectura",
      "ownerName": "Carla Méndez",
      "logoUrl": "https://placehold.co/100x100.jpg?text=Boreal",
      "benefit": "5% en planos personalizados",
      "phone": "+54 9 261 678-9012",
      "contactLink": "https://borealarq.com",
      "benefitType": "Descuento",
      "description": "Diseño arquitectónico adaptado a tu estilo."
    },
    {
      "id": 7,
      "companyName": "Ruta Verde Turismo",
      "ownerName": "Federico Gómez",
      "logoUrl": "https://placehold.co/100x100.jpg?text=RutaVerde",
      "benefit": "Descuento en excursiones locales",
      "phone": "+54 9 261 789-0123",
      "contactLink": "https://rutaverde.tur.ar",
      "benefitType": "Texto",
      "description": "Experiencias turísticas auténticas en Mendoza."
    },
    {
      "id": 8,
      "companyName": "Café del Sur",
      "ownerName": "Valentina Ruiz",
      "logoUrl": "https://placehold.co/100x100.jpg?text=CafeSur",
      "benefit": "2x1 en cafés los viernes",
      "phone": "+54 9 261 890-1234",
      "contactLink": "https://cafedelsur.com.ar",
      "benefitType": "Texto",
      "description": "Café artesanal y sabores del sur mendocino."
    },
    {
      "id": 9,
      "companyName": "Tierra Digital",
      "ownerName": "Ignacio Paredes",
      "logoUrl": "https://placehold.co/100x100.jpg?text=TierraDigital",
      "benefit": "15% en servicios de marketing",
      "phone": "+54 9 261 901-2345",
      "contactLink": "https://tierradigital.agency",
      "benefitType": "Descuento",
      "description": "Marketing digital para negocios que quieren crecer."
    },
    {
      "id": 10,
      "companyName": "Luna Textil",
      "ownerName": "María Belén Castro",
      "logoUrl": "https://placehold.co/100x100.jpg?text=LunaTextil",
      "benefit": "Envío gratis en compras mayores a $10.000",
      "phone": "+54 9 261 012-3456",
      "contactLink": "https://lunatextil.com",
      "benefitType": "Texto",
      "description": "Textiles únicos para vestir tu hogar con estilo."
    },
    {
      "id": 11,
      "companyName": "Solaris Energía",
      "ownerName": "Tomás Aguirre",
      "logoUrl": "https://placehold.co/100x100.jpg?text=Solaris",
      "benefit": "10% en paneles solares",
      "phone": "+54 9 261 123-4568",
      "contactLink": "https://solarisenergia.com",
      "benefitType": "Descuento",
      "description": "Energía solar accesible para hogares sustentables."
    },
    {
      "id": 12,
      "companyName": "Alma Verde",
      "ownerName": "Camila Navarro",
      "logoUrl": "https://placehold.co/100x100.jpg?text=AlmaVerde",
      "benefit": "Regalo sorpresa en tu primera compra",
      "phone": "+54 9 261 234-5679",
      "contactLink": "https://almaverde.store",
      "benefitType": "Texto",
      "description": "Productos naturales para una vida consciente."
    },
    {
      "id": 13,
      "companyName": "Montaña Creativa",
      "ownerName": "Diego Salinas",
      "logoUrl": "https://placehold.co/100x100.jpg?text=Montana",
      "benefit": "Diseño de logo gratis para nuevos socios",
      "phone": "+54 9 261 345-6780",
      "contactLink": "https://montanacreativa.com",
      "benefitType": "Texto",
      "description": "Creatividad visual para emprendedores con visión."
    },
    {
      "id": 14,
      "companyName": "BIA Consultora",
      "ownerName": "Juan Bernabéu",
      "logoUrl": "https://placehold.co/100x100.jpg?text=BIA",
      "benefit": "Acceso exclusivo a la red de empresas",
      "phone": "+54 9 261 456-7891",
      "contactLink": "https://clubbia.com",
      "benefitType": "Texto",
      "description": "Conectamos negocios con oportunidades reales."
    },
    {
      "id": 15,
      "companyName": "Andina Software",
      "ownerName": "Laura Peña",
      "logoUrl": "https://placehold.co/100x100.jpg?text=Andina",
      "benefit": "15% en licencias anuales",
      "phone": "+54 9 261 567-8902",
      "contactLink": "https://andinasoftware.com",
      "benefitType": "Descuento",
      "description": "Software empresarial para gestión eficiente."
    },
    {
      "id": 16,
      "companyName": "Cumbre Editorial",
      "ownerName": "Esteban Molina",
      "logoUrl": "https://placehold.co/100x100.jpg?text=Cumbre",
      "benefit": "Descuento en publicaciones independientes",
      "phone": "+54 9 261 678-9013",
      "contactLink": "https://cumbreeditorial.com",
      "benefitType": "Texto",
      "description": "Editorial para autores con voz propia."
    }
  ]
};

export default companies;
