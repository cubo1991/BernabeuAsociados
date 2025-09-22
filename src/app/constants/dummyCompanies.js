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
      "description": "Soluciones tecnológicas para empresas modernas.",
      "fullDescription": "En NovaTech Solutions, ofrecemos servicios de consultoría tecnológica personalizados para ayudar a las empresas a optimizar sus procesos y adoptar las últimas innovaciones tecnológicas. Nuestro equipo de expertos trabaja estrechamente con cada cliente para entender sus necesidades específicas y desarrollar soluciones a medida que impulsen su crecimiento y eficiencia."
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
      "description": "Alimentos orgánicos y saludables para tu día a día.",
      "fullDescription": "EcoVida Market es tu tienda de confianza para productos orgánicos y saludables. Nos dedicamos a ofrecer una amplia variedad de alimentos frescos, libres de pesticidas y cultivados de manera sostenible. Nuestro compromiso es promover un estilo de vida saludable y consciente, brindando a nuestros clientes productos de alta calidad que benefician tanto a su bienestar como al medio ambiente."
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
      "description": "Diseño visual creativo para marcas con impacto.",
      "fullDescription": "En PixelForge Studio, nos especializamos en diseño gráfico y branding para empresas que buscan destacar en el mercado. Nuestro equipo de diseñadores creativos trabaja con pasión para transformar ideas en imágenes impactantes que capturan la esencia de cada marca. Ofrecemos una gama completa de servicios, desde el diseño de logotipos hasta la creación de materiales promocionales, asegurando que cada proyecto refleje la identidad única de nuestros clientes."
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
      "description": "Asesoría jurídica clara y confiable.",
      "fullDescription": "Andes Legal es un despacho de abogados comprometido con brindar asesoría jurídica clara y confiable a individuos y empresas. Nuestro equipo de profesionales legales cuenta con amplia experiencia en diversas áreas del derecho, incluyendo derecho corporativo, civil y laboral. Nos esforzamos por ofrecer soluciones prácticas y efectivas que protejan los intereses de nuestros clientes, siempre con un enfoque ético y transparente."
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
      "description": "Desarrollo web funcional con identidad local.",
      "fullDescription": "Mate & Código es una empresa de desarrollo web que combina funcionalidad y diseño con una identidad local única. Nos especializamos en crear sitios web personalizados que reflejan la cultura y el espíritu de Mendoza, integrando elementos visuales y funcionales que resuenan con la comunidad local. Nuestro equipo de desarrolladores y diseñadores trabaja en estrecha colaboración con cada cliente para asegurar que cada proyecto no solo cumpla con sus objetivos comerciales, sino que también celebre la riqueza cultural de nuestra región."
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
      "description": "Diseño arquitectónico adaptado a tu estilo.",
      "fullDescription": "Boreal Arquitectura es un estudio de diseño arquitectónico que se dedica a crear espacios únicos y funcionales adaptados al estilo de vida de cada cliente. Nuestro enfoque se centra en la innovación, la sostenibilidad y la integración armoniosa con el entorno. Desde viviendas residenciales hasta proyectos comerciales, trabajamos en estrecha colaboración con nuestros clientes para transformar sus ideas en realidad, asegurando que cada diseño refleje su visión y necesidades específicas."
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
      "description": "Experiencias turísticas auténticas en Mendoza.",
      "fullDescription": "Ruta Verde Turismo es una agencia de viajes especializada en ofrecer experiencias turísticas auténticas y sostenibles en Mendoza. Nos enfocamos en conectar a los viajeros con la cultura local, la naturaleza y las tradiciones de la región a través de excursiones personalizadas y actividades al aire libre. Nuestro compromiso con el turismo responsable nos impulsa a trabajar con comunidades locales y promover prácticas que respeten el medio ambiente y beneficien a las economías locales."
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
      "description": "Café artesanal y sabores del sur mendocino.",
      "fullDescription": "Café del Sur es un lugar donde la tradición cafetera se encuentra con la innovación. Ofrecemos una experiencia única que resalta los sabores del sur mendocino, utilizando granos de café de alta calidad y métodos de preparación artesanales. Nuestro ambiente acogedor y nuestro compromiso con la comunidad local hacen de cada visita una experiencia memorable."
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
      "description": "Marketing digital para negocios que quieren crecer.",
      "fullDescription": "Tierra Digital es una agencia de marketing digital dedicada a ayudar a los negocios a crecer y alcanzar sus objetivos en el entorno digital. Ofrecemos una amplia gama de servicios, incluyendo gestión de redes sociales, campañas de publicidad en línea, optimización para motores de búsqueda (SEO) y creación de contenido. Nuestro enfoque estratégico y personalizado nos permite diseñar soluciones efectivas que impulsan la visibilidad y el éxito de nuestros clientes en el competitivo mundo digital."
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
      "description": "Textiles únicos para vestir tu hogar con estilo.",
      "fullDescription": "Luna Textil es una tienda especializada en textiles únicos y de alta calidad para el hogar. Nos dedicamos a ofrecer una variedad de productos que combinan diseño, confort y funcionalidad, desde ropa de cama hasta cortinas y cojines. Nuestro compromiso es brindar a nuestros clientes piezas que no solo embellecen sus espacios, sino que también reflejan su estilo personal y aportan calidez y carácter a sus hogares."
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
      "description": "Energía solar accesible para hogares sustentables.",
      "fullDescription": "Solaris Energía es una empresa dedicada a proporcionar soluciones de energía solar accesibles y eficientes para hogares y negocios. Nos especializamos en la instalación de paneles solares y sistemas de energía renovable que ayudan a reducir la huella de carbono y disminuir los costos energéticos. Nuestro equipo de expertos trabaja con cada cliente para diseñar e implementar sistemas personalizados que maximicen el aprovechamiento de la energía solar, promoviendo un futuro más sustentable."
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
      "description": "Productos naturales para una vida consciente.",
      "fullDescription": "Alma Verde es una tienda en línea que ofrece una selección cuidadosamente curada de productos naturales y ecológicos para quienes buscan llevar una vida más consciente y saludable. Desde cosméticos orgánicos hasta productos de cuidado personal y del hogar, cada artículo en nuestra tienda ha sido elegido por su calidad, sostenibilidad y respeto por el medio ambiente. En Alma Verde, creemos en el poder de la naturaleza para mejorar nuestro bienestar y el del planeta."
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
      "description": "Creatividad visual para emprendedores con visión.",
      "fullDescription": "Montaña Creativa es un estudio de diseño gráfico y branding que se especializa en ayudar a emprendedores y pequeñas empresas a construir una identidad visual sólida y memorable. Nuestro equipo de diseñadores apasionados trabaja en estrecha colaboración con cada cliente para entender su visión y traducirla en elementos visuales que capturen la esencia de su marca. Desde el diseño de logotipos hasta la creación de materiales promocionales, ofrecemos soluciones creativas que impulsan el reconocimiento y el éxito de nuestros clientes en el mercado."

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
      "description": "Conectamos negocios con oportunidades reales.",
      "fullDescription": "BIA Consultora es una firma especializada en conectar negocios con oportunidades reales de crecimiento y colaboración. A través de nuestra red exclusiva de empresas y profesionales, facilitamos alianzas estratégicas, acceso a mercados y recursos que impulsan el desarrollo empresarial. Nuestro enfoque personalizado y nuestra comprensión profunda del entorno empresarial nos permiten ofrecer soluciones efectivas que ayudan a nuestros clientes a alcanzar sus objetivos y maximizar su potencial."
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
      "description": "Software empresarial para gestión eficiente.",
      "fullDescription": "Andina Software es una empresa dedicada al desarrollo de soluciones de software empresarial diseñadas para mejorar la eficiencia y productividad de las organizaciones. Ofrecemos una gama de productos que incluyen sistemas de gestión empresarial (ERP), software de recursos humanos y herramientas de análisis de datos. Nuestro equipo de desarrolladores trabaja en estrecha colaboración con cada cliente para crear soluciones personalizadas que se adapten a sus necesidades específicas, ayudándoles a optimizar sus operaciones y alcanzar sus objetivos comerciales."
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
      "description": "Editorial para autores con voz propia.",
      "fullDescription": "Cumbre Editorial es una editorial independiente que se dedica a publicar obras de autores con voces únicas y perspectivas frescas. Nos especializamos en una variedad de géneros, incluyendo ficción, no ficción, poesía y literatura infantil, brindando a los escritores emergentes y establecidos una plataforma para compartir sus historias con el mundo. Nuestro compromiso con la calidad literaria y la diversidad nos impulsa a apoyar a nuestros autores en cada etapa del proceso de publicación, desde la edición hasta la distribución." 
    }
  ]
};

export default companies;
