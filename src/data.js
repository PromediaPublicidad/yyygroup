// src/data.js
// Rutas de logos (ajusta si cambian tus archivos)
export const LOGOS = {
  regenerationclinicpanama: "/logos/healthcare/regeneration-clinic-panama.png",
  drsalud: "/logos/healthcare/dr-salud.png",
  iseeoptics: "/logos/healthcare/i-see-optics.png",
  medifercorp: "/logos/healthcare/medifercorp.svg",

  aleph: "/logos/distribution/aleph.png",
  velox: "/logos/distribution/velox.png",
  dyoni: "/logos/distribution/dyoni.png",
  montevito: "/logos/distribution/montevito.png",

  mcdonalds: "/logos/retail/mcdonalds.png",
  roadster: "/logos/retail/roadster.png",
  shams: "/logos/retail/shams.png",
  rosaclara: "/logos/retail/rosa-clara.png",

  promedia: "/logos/services/promedia.png",
  paguelofacil: "/logos/services/paguelofacil.png",
};

// Texto breve por empresa (ES/EN). Ajusta lo que necesites.
export const COMPANIES = {
  regenerationclinicpanama: {
    name: { es: "Regeneration Clinic Panamá", en: "Regeneration Clinic Panama" },
    story: {
      es: [
        "Nos dedicamos a redefinir el envejecimiento con un enfoque basado en evidencia.",
        "Bienestar a largo plazo con cuidado integral, diagnóstico temprano y terapias regenerativas.",
      ],
      en: [
        "Redefining aging with a science-based approach.",
        "Long-term wellbeing through comprehensive care and regenerative therapies.",
      ],
    },
    contacts: { web: "https://antiagingpanama.com/" },
  },
  drsalud: {
    name: { es: "Dr. Salud", en: "Dr. Salud" },
    story: {
      es: [
        "Centro médico general para necesidades cotidianas con rapidez y cercanía.",
        "Rutas de atención claras, esperas reducidas y comunicación directa.",
      ],
      en: [
        "General medical center for everyday needs with speed and proximity.",
        "Clear care paths, reduced wait times, and direct communication.",
      ],
    },
    contacts: { instagram: "https://www.instagram.com/doctorsalud.pa/" },
  },
  iseeoptics: {
    name: { es: "I See Optics", en: "I See Optics" },
    story: {
      es: [
        "Óptica clínica con laboratorio propio para precisión y velocidad.",
        "Asesoría experta, diagnóstico visual y catálogo amplio.",
      ],
      en: [
        "Clinical optics with an in-house lab for precision and speed.",
        "Expert advice, visual diagnostics and a broad catalog.",
      ],
    },
    contacts: { instagram: "https://www.instagram.com/i.seeoptics/?hl=es" },
  },
  medifercorp: {
    name: { es: "MediferCorp", en: "MediferCorp" },
    story: {
      es: [
        "Comercialización de productos médicos con foco en disponibilidad y cumplimiento.",
        "Trazabilidad y almacenamiento seguro no negociables.",
      ],
      en: [
        "Medical products distribution focused on availability and compliance.",
        "Traceability and safe storage are non-negotiable.",
      ],
    },
    contacts: {},
  },

  aleph: {
    name: { es: "Aleph Group", en: "Aleph Group" },
    story: {
      es: [
        "Actor clave en la industria de llantas con expansión regional.",
        "Portafolio competitivo, cobertura logística y relaciones B2B de largo plazo.",
      ],
      en: [
        "Key player in the tire industry with regional expansion.",
        "Competitive portfolio, logistics coverage and long-term B2B relationships.",
      ],
    },
    contacts: { web: "https://alephgroupcorp.com/" },
  },
  velox: {
    name: { es: "Velox", en: "Velox" },
    story: {
      es: [
        "Servicios para consultar información pública de empresas en Panamá.",
        "Facilita verificación y transparencia para decisiones informadas.",
      ],
      en: [
        "Services to query public corporate information in Panama.",
        "Enables verification and transparency for informed decisions.",
      ],
    },
    contacts: {},
  },
  dyoni: {
    name: { es: "Dyoni", en: "Dyoni" },
    story: {
      es: [
        "Suministros premium para arguiles: tabacos, carbones de coco y accesorios.",
        "Curaduría enfocada en calidad y disponibilidad real en tienda.",
      ],
      en: [
        "Premium hookah supplies: tobaccos, coconut charcoals and accessories.",
        "Curation focused on quality and real in-store availability.",
      ],
    },
    contacts: {},
  },
  montevito: {
    name: { es: "Montevito", en: "Montevito" },
    story: {
      es: ["Vitrina de alimentos y bebidas con curaduría.", "Selección cuidada y disponibilidad confiable."],
      en: ["Curated food & beverage store.", "Careful selection with dependable availability."],
    },
    contacts: {},
  },

  mcdonalds: {
    name: { es: "McDonald's", en: "McDonald's" },
    story: {
      es: [
        "Franquicia global de comida rápida con operación local robusta.",
        "Productos icónicos: hamburguesas, papas, desayunos y bebidas.",
      ],
      en: [
        "Global QSR franchise with robust local operations.",
        "Iconic products: burgers, fries, breakfast and beverages.",
      ],
    },
    contacts: { web: "https://www.mcdonalds.com.pa/" },
  },
  roadster: {
    name: { es: "Roadster Diner", en: "Roadster Diner" },
    story: {
      es: [
        "Restaurante estilo diner con ambiente que invita a quedarse.",
        "Clásicos reconfortantes con ejecución consistente.",
      ],
      en: ["Diner-style restaurant with a stay-long vibe.", "Comfort classics with consistent execution."],
    },
    contacts: { instagram: "https://www.instagram.com/roadstersdinerpty/?hl=es" },
  },
  shams: {
    name: { es: "Shams Market", en: "Shams Market" },
    story: {
      es: [
        "Retail orientado al cuidado personal y la belleza cotidiana.",
        "Marcas confiables y experiencia para descubrir sin prisa.",
      ],
      en: ["Retail concept for everyday self-care and beauty.", "Trusted brands and unhurried discovery."],
    },
    contacts: {},
  },
  rosaclara: {
    name: { es: "Rosa Clara", en: "Rosa Clará" },
    story: {
      es: [
        "Experiencias nupciales y de fiesta con atención al detalle.",
        "Pruebas y ajustes personalizados sin sobresaltos.",
      ],
      en: ["Bridal and evening experiences where detail matters.", "Personalized fittings and alterations."],
    },
    contacts: { web: "https://www.rosaclara.es/es" },
  },

  promedia: {
    name: { es: "Promedia", en: "Promedia" },
    story: {
      es: [
        "Agencia 360° que empuja ideas hasta convertirlas en resultados.",
        "Estrategia, creatividad, producción y performance en un flujo.",
      ],
      en: [
        "360° marketing agency that pushes ideas into results.",
        "Strategy, creativity, production and performance in one flow.",
      ],
    },
    contacts: { web: "https://www.promediapublicidad.com/" },
  },
  paguelofacil: {
    name: { es: "PagueloFacil", en: "PagueloFacil" },
    story: {
      es: [
        "Plataforma de pagos usada en Panamá con múltiples bancos y canales.",
        "Integración simple, seguridad y soporte cercano.",
      ],
      en: ["Payment platform widely used in Panama.", "Simple integration, security and close support."],
    },
    contacts: { web: "https://www.paguelofacil.com/" },
  },
};