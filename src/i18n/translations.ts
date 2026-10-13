export type Language = 'es' | 'en';

export const translations = {
  es: {
    // Navbar
    navReports: 'Reportes de Mascotas',
    navMap: 'Mapa Interactivo',
    navHowItWorks: 'Cómo Funciona',
    navResources: 'Consejos de Recuperación',
    navFaq: 'Preguntas Frecuentes',
    navReportButton: '+ Reportar Mascota',
    navCloudSettings: 'Almacenamiento y Nube',
    tagline: 'Perdidos · Encontrados · Reunidos',

    // Hero
    heroLabel: 'Recuperación Comunitaria · Santa Cruz de la Sierra',
    heroTitle: 'Ayuda a que las mascotas perdidas vuelvan a casa en Santa Cruz.',
    heroSubtitle:
      'Cada minuto cuenta cuando una mascota se extravía. Revisa reportes activos, comparte avistamientos en tus anillos vecinales, genera afiches de emergencia o reporta una mascota ahora mismo.',
    heroReportCta: 'Reportar una Mascota Ahora',
    heroExploreCta: 'Explorar Reportes Activos',
    kpiMissing: 'Actualmente Perdidos',
    kpiFound: 'Encontrados en Cuidado',
    kpiReunited: 'Mascotas Reunidas',
    kpiAreas: 'Barrios de Santa Cruz',

    // Feed / Filter Bar
    feedLabel: 'Comunidad en Tiempo Real',
    feedTitle: 'Reportes Recientes de Mascotas',
    feedSubtitle:
      'Explora mascotas perdidas, encontradas y reunidas en Santa Cruz de la Sierra. Haz clic en cualquier tarjeta para contactar al reportante o imprimir un afiche vecinal.',
    cloudSynced: 'Sincronizado con Firestore',
    localStorageActive: 'Almacenamiento Local Activo',
    searchPlaceholder: 'Buscar por nombre, raza, color, calle o característica...',
    tabAll: 'Todos los Reportes',
    tabLost: 'Perdidos',
    tabFound: 'Encontrados',
    tabReunited: 'Reunidos',
    filterPetType: 'Tipo:',
    allPets: 'Todos los animales',
    dogs: 'Perros',
    cats: 'Gatos',
    other: 'Otros',
    filterNeighborhood: 'Barrio / Zona:',
    allNeighborhoods: 'Todas las Zonas de Santa Cruz',
    reportsFoundSingular: 'reporte encontrado',
    reportsFoundPlural: 'reportes encontrados',
    resetFilters: 'Restablecer filtros',
    loadingReports: 'Cargando reportes de mascotas en Santa Cruz...',
    noReportsTitle: 'No se encontraron reportes coincidentes',
    noReportsSubtitle: 'Intenta ajustar tus términos de búsqueda o filtros de barrio.',
    clearFilters: 'Limpiar todos los filtros',
    loadMore: 'Cargar Más Reportes',

    // Pet Card
    badgeLost: 'Mascota Perdida',
    badgeFound: 'Mascota Encontrada',
    badgeReunited: 'Reunido con su Familia',
    timeJustNow: 'Recién publicado',
    timeHoursAgo: 'hace {n} horas',
    time1HourAgo: 'hace 1 hora',
    time1DayAgo: 'hace 1 día',
    timeDaysAgo: 'hace {n} días',
    detailsButton: 'Ver Detalles',
    callButton: 'Llamar',
    whatsappButton: 'WhatsApp',
    printPosterButton: 'Imprimir Afiche',
    markReunitedTooltip: 'Marcar como Reunido / Seguro',

    // Pet Detail Modal
    characteristicsTitle: 'Color y Características Físicas',
    markingsTitle: 'Señas Particulares y Notas',
    instructionsTitle: 'Instrucciones Especiales',
    contactPersonTitle: 'Contacto del Reporte',
    callNow: 'Llamar a',
    generateFlyerButton: 'Generar Afiche Imprimible',
    markAsReunitedButton: '¡Marcar como Reunido!',
    closeModal: 'Cerrar',

    // Printable Flyer
    flyerLostHeader: '¡SE BUSCA MASCOTA!',
    flyerFoundHeader: '¡MASCOTA ENCONTRADA!',
    flyerLostSubtitle: 'POR FAVOR AYÚDANOS A ENCONTRARLO',
    flyerFoundSubtitle: 'BUSCAMOS A SU FAMILIA',
    flyerZone: 'Lugar / Zona:',
    flyerDate: 'Fecha:',
    flyerMarkings: 'Rasgos y señas particulares:',
    flyerContactBox: 'Si lo has visto o tienes alguna información, comunícate con:',
    flyerTearOffInstruction: '✂ Tiras recortables para postes, tiendas y vitrinas comunitarias ✂',
    flyerFooter: 'Publicado en Santa Cruz Pet Watch · Plataforma Comunitaria',
    printButton: 'Imprimir Afiche',
    printTitle: 'Afiche de Emergencia Imprimible (Optimizado para papel carta)',

    // Map Section
    mapLabel: 'Avistamientos por Barrios',
    mapTitle: 'Mapa de Mascotas de Santa Cruz de la Sierra',
    mapSubtitle:
      'Ubica mascotas reportadas en los anillos concéntricos (1er al 4to Anillo) y radiales. Haz clic en cualquier marcador para ver detalles instantáneos.',
    mapLegend: 'Leyenda del Mapa:',
    mapGridNote: 'Cuadrícula concéntrica de anillos de Santa Cruz de la Sierra',
    viewDetails: 'Ver Detalles',

    // Report Form
    formLabel: 'Envía un Reporte a la Comunidad',
    formTitle: 'Reportar Mascota Perdida o Encontrada',
    formSubtitle:
      'Ingresa la mayor cantidad de detalles visuales y de ubicación para que los vecinos reconozcan a la mascota de inmediato.',
    formStep1: '1. Tipo de Reporte *',
    formLostPet: '🚨 Mascota Perdida (Lost)',
    formFoundPet: '🐾 Mascota Encontrada (Found)',
    formStep2: '2. Descripción de la Mascota',
    formPetName: 'Nombre de la Mascota',
    formPetNamePlaceholderLost: 'ej. Toby, Mía, Firulais',
    formPetNamePlaceholderFound: 'Sin Nombre / Desconocido',
    formSpecies: 'Especie / Animal *',
    formBreed: 'Raza o Cruce',
    formBreedPlaceholder: 'ej. Golden Retriever, Mestizo, Siamés',
    formColor: 'Color y Patrón de Pelaje *',
    formColorPlaceholder: 'ej. Dorado claro con pecho blanco, Atigrado',
    formDistinctiveFeatures: 'Señas Particulares y Rasgos Únicos *',
    formDistinctivePlaceholder:
      'Menciona collares, placas, cicatrices, orejas cortadas, comportamiento (tímido, amigable), o corte reciente...',
    formReward: 'Recompensa ofrecida (Opcional)',
    formRewardPlaceholder: 'ej. Recompensa 500 Bs / Gratificación',
    formStep3: '3. Ubicación en Santa Cruz y Fecha',
    formNeighborhood: 'Barrio / Zona de Santa Cruz *',
    formDate: 'Fecha en que se vio / encontró *',
    formLocation: 'Referencia / Calles o Intersección *',
    formLocationPlaceholder:
      'ej. Calle 8 y Av. San Martín, cerca de la farmacia (no publicar número exacto de casa)',
    formLocationTip:
      'Consejo de seguridad: Evita publicar el número exacto de tu casa; indicar la esquina o barrio es más seguro.',
    formStep4: '4. Fotografía de la Mascota *',
    formUploadFromDevice: 'Subir desde Dispositivo o Cámara',
    formAutoCompressed: 'Auto-comprimida para carga rápida',
    formOptimizingPhoto: 'Optimizando fotografía...',
    formSampleTestPhoto: 'O selecciona una foto de prueba:',
    formDogSample: 'Foto Perro',
    formCatSample: 'Foto Gato',
    formNoPhotoSelected: 'No se ha seleccionado ninguna foto aún',
    formStep5: '5. Información de Contacto',
    formYourName: 'Tu Nombre Completo *',
    formPhone: 'Número de Teléfono *',
    formWhatsapp: 'Número de WhatsApp (con código de país)',
    formWhatsappPlaceholder: 'ej. 59176012345',
    formMeetingNotes: 'Instrucciones para Contacto Seguro',
    formMeetingNotesPlaceholder: 'ej. Escribir por WhatsApp a cualquier hora',
    formConsent:
      'Confirmo que la información proporcionada es verídica y acepto ser contactado por miembros de la comunidad con respecto a este reporte.',
    formCancel: 'Cancelar',
    formSubmitting: 'Enviando Reporte...',
    formSubmitButton: 'Publicar Reporte de Mascota',
    formSuccessCloud:
      '¡Tu reporte fue publicado exitosamente en la nube comunitaria! Gracias por ayudar.',
    formSuccessLocal:
      '¡Tu reporte fue guardado y ya es visible en el feed comunitario!',
    formErrorConsent: 'Por favor confirma la casilla de consentimiento de datos.',
    formErrorPhoto: 'Por favor sube o selecciona una foto clara de la mascota.',

    // How It Works
    howItWorksLabel: 'Proceso Sencillo',
    howItWorksTitle: 'Cómo Funciona Santa Cruz Pet Watch',
    howItWorksSubtitle:
      'Diseñado para actuar con rapidez y solidaridad vecinal cuando cada hora es crucial.',
    step1Tag: 'Paso 1',
    step1Title: 'Publica o Explora Reportes',
    step1Desc:
      'Sube una fotografía nítida, detalla señas particulares y selecciona tu zona de Santa Cruz. Sin registros complicados.',
    step2Tag: 'Paso 2',
    step2Title: 'Ubica y Difunde el Aviso',
    step2Desc:
      'Los avistamientos se reflejan en el mapa interactivo de anillos. Genera afiches listos para imprimir o comparte en WhatsApp.',
    step3Tag: 'Paso 3',
    step3Title: 'Reencuentro Seguro',
    step3Desc:
      'Comunícate directamente con el dueño o rescatista con 1 clic a WhatsApp. ¡Marca la mascota como Reunida para celebrar!',

    // Resources
    resourcesLabel: 'Consejos de Recuperación',
    resourcesTitle: 'Qué hacer cuando se pierde una mascota.',
    resourcesSubtitle: 'Mantener la calma, organizarse y actuar rápido marca toda la diferencia.',
    tip1Num: '01',
    tip1Title: 'Busca cerca primero',
    tip1Desc:
      'Revisa tu casa, cuadra, plazas cercanas, rutas habituales de paseo y rincones sombreados donde la mascota pueda refugiarse del calor cruceño.',
    tip2Num: '02',
    tip2Title: 'Comparte una foto clara',
    tip2Desc:
      'Utiliza fotos recientes que muestren manchas únicas, collares, colores y rasgos faciales para que los vecinos la reconozcan al instante.',
    tip3Num: '03',
    tip3Title: 'Avisa a tu comunidad',
    tip3Desc:
      'Informa a vecinos de confianza, veterinarias de tu anillo y grupos de WhatsApp vecinales para multiplicar los ojos atentos.',

    // Banner
    bannerLabel: 'Es Trabajo de Todos · Santa Cruz de la Sierra',
    bannerTitle: 'Una sola persona puede marcar la diferencia.',
    bannerText:
      'Si ves a una mascota desorientada en tu barrio o sobre las avenidas radiales, no pases de largo. Revisa los reportes activos, comparte la foto con tus vecinos y ayuda a que vuelva con su familia.',
    bannerCta: 'Explorar Reportes Activos',

    // FAQ
    faqLabel: 'Preguntas Frecuentes',
    faqTitle: 'Información Útil.',
    faqSubtitle: 'Respuestas a dudas comunes sobre cómo reportar, seguridad y rescate comunitario.',
    faqItems: [
      {
        question: '¿Qué información debo incluir en un reporte?',
        answer:
          'Incluye una foto reciente y clara con buena luz, especie, color, señas particulares (orejas recortadas, collares, manchas, cicatrices), barrio o anillo exacto de Santa Cruz, fecha en que se vio y tu número de WhatsApp para contacto inmediato.'
      },
      {
        question: '¿Qué debo hacer si encuentro una mascota perdida en Santa Cruz?',
        answer:
          'Resguárdala en un lugar seguro, con sombra y agua fresca. Revisa los reportes de mascotas perdidas en este sitio. Si no está reportada, publica un reporte de "Mascota Encontrada" y comparte el enlace en grupos de WhatsApp o redes vecinales.'
      },
      {
        question: '¿Debo publicar el número exacto de mi casa o dirección?',
        answer:
          'No. Por tu seguridad y privacidad, evita colocar el número exacto de tu vivienda. Indicar el barrio (ej. Equipetrol, Urbaró, Villa 1° de Mayo) y una esquina o referencia conocida es la mejor práctica.'
      },
      {
        question: '¿Cómo puedo ayudar si no he perdido ni encontrado una mascota?',
        answer:
          'Puedes colaborar enormemente compartiendo reportes en redes sociales y grupos de WhatsApp, imprimiendo afiches para negocios de tu barrio o revisando avistamientos de tu zona para estar alerta por si reconoces a un animal extraviado en tu calle.'
      },
      {
        question: '¿Cómo funciona el almacenamiento de reportes en GitHub Pages?',
        answer:
          'Los reportes se sincronizan en tiempo real con Firebase Firestore en la nube y se respaldan de forma segura en el almacenamiento de tu navegador. Además, puedes exportar la base de datos completa en formato JSON en cualquier momento.'
      }
    ],

    // Footer
    footerMission:
      'Un espacio comunitario dedicado a reconectar a las mascotas perdidas y encontradas en Santa Cruz de la Sierra con sus familias.',
    footerExplore: 'Explorar',
    footerResources: 'Recursos',
    footerCity: 'Santa Cruz',
    footerCityName: 'Santa Cruz de la Sierra, Bolivia',
    footerCommunity: 'Plataforma Comunitaria Solidaria',
    footerForPets: 'Por las mascotas y sus familias',
    footerCopyright: '© 2026 Santa Cruz Pet Watch. Creado con cariño para la comunidad de mascotas.',
    footerCloudSetup: 'Configuración de Cloudinary y Nube',
    footerReportPet: 'Reportar Mascota'
  },

  en: {
    // Navbar
    navReports: 'Pet Reports',
    navMap: 'Interactive Map',
    navHowItWorks: 'How It Works',
    navResources: 'Recovery Tips',
    navFaq: 'FAQ',
    navReportButton: '+ Report a Pet',
    navCloudSettings: 'Cloud & Storage',
    tagline: 'Lost · Found · Reunited',

    // Hero
    heroLabel: 'Community Pet Recovery · Santa Cruz de la Sierra',
    heroTitle: 'Help bring lost pets home in Santa Cruz.',
    heroSubtitle:
      'Every minute matters when a pet goes missing. Browse active reports, share sightings with your neighborhood rings, generate emergency posters, or report a pet right now.',
    heroReportCta: 'Report a Pet Now',
    heroExploreCta: 'Explore Active Reports',
    kpiMissing: 'Currently Missing',
    kpiFound: 'Found & In Care',
    kpiReunited: 'Pets Reunited',
    kpiAreas: 'Santa Cruz Neighborhoods',

    // Feed / Filter Bar
    feedLabel: 'Active Community Feed',
    feedTitle: 'Recent Pet Reports',
    feedSubtitle:
      'Browse missing, found, and reunited pets in Santa Cruz de la Sierra. Click any card to connect with the reporter or print a neighborhood poster.',
    cloudSynced: 'Cloud Firestore Synced',
    localStorageActive: 'Local Browser Storage Active',
    searchPlaceholder: 'Search by name, breed, color, street, or feature...',
    tabAll: 'All Reports',
    tabLost: 'Lost',
    tabFound: 'Found',
    tabReunited: 'Reunited',
    filterPetType: 'Type:',
    allPets: 'All Pets',
    dogs: 'Dogs',
    cats: 'Cats',
    other: 'Other',
    filterNeighborhood: 'Neighborhood:',
    allNeighborhoods: 'All Santa Cruz Areas',
    reportsFoundSingular: 'report found',
    reportsFoundPlural: 'reports found',
    resetFilters: 'Reset filters',
    loadingReports: 'Loading Santa Cruz pet reports...',
    noReportsTitle: 'No matching reports found',
    noReportsSubtitle: 'Try adjusting your search terms or neighborhood filters to see more lost and found pets.',
    clearFilters: 'Clear all filters',
    loadMore: 'Load More Pet Reports',

    // Pet Card
    badgeLost: 'Lost Pet',
    badgeFound: 'Found Pet',
    badgeReunited: 'Reunited & Safe',
    timeJustNow: 'Just now',
    timeHoursAgo: '{n} hours ago',
    time1HourAgo: '1 hour ago',
    time1DayAgo: '1 day ago',
    timeDaysAgo: '{n} days ago',
    detailsButton: 'Details',
    callButton: 'Call',
    whatsappButton: 'WhatsApp',
    printPosterButton: 'Print Flyer',
    markReunitedTooltip: 'Mark as Reunited / Safe',

    // Pet Detail Modal
    characteristicsTitle: 'Color & Physical Characteristics',
    markingsTitle: 'Distinctive Markings & Notes',
    instructionsTitle: 'Special Instructions',
    contactPersonTitle: 'Report Contact Person',
    callNow: 'Call',
    generateFlyerButton: 'Generate Printable Flyer',
    markAsReunitedButton: 'Mark as Reunited!',
    closeModal: 'Close',

    // Printable Flyer
    flyerLostHeader: 'LOST PET ALERT!',
    flyerFoundHeader: 'FOUND PET ALERT!',
    flyerLostSubtitle: 'PLEASE HELP US FIND OUR PET',
    flyerFoundSubtitle: 'LOOKING FOR OWNER',
    flyerZone: 'Area / Location:',
    flyerDate: 'Date:',
    flyerMarkings: 'Distinctive Features:',
    flyerContactBox: 'If you have seen this pet or have information, please contact:',
    flyerTearOffInstruction: '✂ Perforated tear-off contact slips for posts, shops and noticeboards ✂',
    flyerFooter: 'Published on Santa Cruz Pet Watch · Community Recovery Platform',
    printButton: 'Print Flyer',
    printTitle: 'Printable Emergency Flyer (Optimized for standard letter paper)',

    // Map Section
    mapLabel: 'Spatial Neighborhood Sightings',
    mapTitle: 'Santa Cruz de la Sierra Pet Map',
    mapSubtitle:
      'Locate reported pets across the concentric ring avenues (1st to 4th Ring) and radial avenues. Click any pin for instant details.',
    mapLegend: 'Map Legend:',
    mapGridNote: 'Concentric Anillo grid of Santa Cruz de la Sierra',
    viewDetails: 'View Details',

    // Report Form
    formLabel: 'Submit a Community Report',
    formTitle: 'Report a Lost or Found Pet',
    formSubtitle:
      'Provide as many visual and neighborhood details as possible to help the community recognize and recover the animal quickly.',
    formStep1: '1. Report Type *',
    formLostPet: '🚨 Lost Pet (Perdido)',
    formFoundPet: '🐾 Found Pet (Encontrado)',
    formStep2: '2. Pet Description',
    formPetName: "Pet's Name",
    formPetNamePlaceholderLost: 'e.g. Toby, Mía',
    formPetNamePlaceholderFound: 'Unknown / No Name',
    formSpecies: 'Species / Animal *',
    formBreed: 'Breed or Mixed Type',
    formBreedPlaceholder: 'e.g. Golden Retriever, Mixed, Siamese',
    formColor: 'Color & Coat Pattern *',
    formColorPlaceholder: 'e.g. Light golden with white chest, Tabby',
    formDistinctiveFeatures: 'Distinctive Markings & Identifying Details *',
    formDistinctivePlaceholder:
      'Mention collars, tags, scars, clipped ears, behavior (shy, friendly), microchip, or recent haircut...',
    formReward: 'Reward (Optional)',
    formRewardPlaceholder: 'e.g. Reward 500 Bs',
    formStep3: '3. Santa Cruz Location & Date',
    formNeighborhood: 'Neighborhood / Zone *',
    formDate: 'Date Last Seen / Found *',
    formLocation: 'Specific Landmark / Cross Streets *',
    formLocationPlaceholder:
      'e.g. Calle 8 & Av. San Martín, near pharmacy (do not publish exact house number)',
    formLocationTip:
      'Safety tip: Avoid publishing your private home address number; neighborhood or intersection is recommended.',
    formStep4: '4. Pet Photograph *',
    formUploadFromDevice: 'Upload from Device or Camera',
    formAutoCompressed: 'Auto-compressed for fast loading',
    formOptimizingPhoto: 'Optimizing photo...',
    formSampleTestPhoto: 'Or select sample test photo:',
    formDogSample: 'Dog Sample',
    formCatSample: 'Cat Sample',
    formNoPhotoSelected: 'No photo selected yet',
    formStep5: '5. Contact Information',
    formYourName: 'Your Full Name *',
    formPhone: 'Phone Number *',
    formWhatsapp: 'WhatsApp Number (with country code)',
    formWhatsappPlaceholder: 'e.g. 59176012345',
    formMeetingNotes: 'Meeting / Safety Instructions',
    formMeetingNotesPlaceholder: 'e.g. Message via WhatsApp anytime',
    formConsent:
      'I confirm that the information provided is accurate and I agree to be contacted by community members regarding this pet report.',
    formCancel: 'Cancel',
    formSubmitting: 'Submitting Report...',
    formSubmitButton: 'Submit Pet Report',
    formSuccessCloud:
      'Your pet report was published directly to the community cloud! Thank you for helping.',
    formSuccessLocal:
      'Your pet report was saved safely in browser storage and is now visible in the feed!',
    formErrorConsent: 'Please confirm the accuracy consent checkbox.',
    formErrorPhoto: 'Please upload or choose a clear photo of the pet.',

    // How It Works
    howItWorksLabel: 'Simple Process',
    howItWorksTitle: 'How Santa Cruz Pet Watch Works',
    howItWorksSubtitle:
      'Designed for speed and neighborhood solidarity when every hour counts.',
    step1Tag: 'Step 1',
    step1Title: 'Submit or Browse Reports',
    step1Desc:
      'Upload a clear photo, specify unique markings, and select your Santa Cruz neighborhood ring. Zero login barriers.',
    step2Tag: 'Step 2',
    step2Title: 'Locate & Spread the Word',
    step2Desc:
      'Sightings appear on our interactive Santa Cruz map. Generate printable emergency posters or share directly on WhatsApp.',
    step3Tag: 'Step 3',
    step3Title: 'Reunite with Care',
    step3Desc:
      'Connect directly with the finder or owner with 1-click WhatsApp messaging. Mark the pet as Reunited to celebrate!',

    // Resources
    resourcesLabel: 'Pet Recovery Tips',
    resourcesTitle: 'What to do when a pet goes missing.',
    resourcesSubtitle: 'Staying organized, remaining calm, and acting quickly makes all the difference.',
    tip1Num: '01',
    tip1Title: 'Search nearby first',
    tip1Desc:
      'Check your home, street, nearby parks, familiar walking routes, and places where your pet may hide or seek shade in Santa Cruz.',
    tip2Num: '02',
    tip2Title: 'Share a clear photo',
    tip2Desc:
      'Use recent photographs that show unique markings, collars, colors, and facial features so neighbors can spot your pet immediately.',
    tip3Num: '03',
    tip3Title: 'Tell your community',
    tip3Desc:
      'Ask trusted neighbors, local veterinary clinics, and neighborhood WhatsApp groups across your ring avenue to watch and share.',

    // Banner
    bannerLabel: 'It Takes a Community · Santa Cruz de la Sierra',
    bannerTitle: 'One person can make the difference.',
    bannerText:
      'If you see a pet wandering alone in your neighborhood or ring avenue, don’t scroll past. Check active reports, share the picture with your neighbors, and help someone get their best friend home.',
    bannerCta: 'Explore Active Reports',

    // FAQ
    faqLabel: 'Frequently Asked Questions',
    faqTitle: 'Good to know.',
    faqSubtitle: 'Answers to common questions about reporting, safety, and community pet recovery.',
    faqItems: [
      {
        question: 'What information should I include in a report?',
        answer:
          'Include a recent, clear photo in good daylight, pet type, color, distinctive markings (ear notches, collars, scars), exact neighborhood or ring avenue, date last seen, and your WhatsApp number so neighbors can reach out instantly.'
      },
      {
        question: 'What should I do if I find a lost pet in Santa Cruz?',
        answer:
          'Keep the pet in a secure, shaded area with water. Check active lost pet reports on this site. If not found, submit a "Found Pet" report and share the link in local neighborhood WhatsApp or Facebook groups.'
      },
      {
        question: 'Should I share my exact home address number?',
        answer:
          'No. For your safety and privacy, avoid posting your exact house or apartment number. Listing your neighborhood (e.g. Equipetrol, Urbaró, Villa 1° de Mayo) and a general intersection or landmark is ideal.'
      },
      {
        question: 'How can I help if I haven’t lost or found a pet?',
        answer:
          'You can help immensely by sharing reports on social networks, printing flyers for community bulletin boards, or browsing sightings in your neighborhood so you can recognize a pet if you see one on your street.'
      },
      {
        question: 'How does report storage work on GitHub Pages?',
        answer:
          'Reports are synchronized with Firebase Firestore cloud storage and backed up securely in your browser storage. You can also export the full community database to JSON at any time.'
      }
    ],

    // Footer
    footerMission:
      'A community space dedicated to helping lost and found pets in Santa Cruz de la Sierra reconnect with their families.',
    footerExplore: 'Explore',
    footerResources: 'Resources',
    footerCity: 'Santa Cruz',
    footerCityName: 'Santa Cruz de la Sierra, Bolivia',
    footerCommunity: 'Community Powered Platform',
    footerForPets: 'For pets & their families',
    footerCopyright: '© 2026 Santa Cruz Pet Watch. Made with care for the local pet community.',
    footerCloudSetup: 'Cloudinary & Storage Setup',
    footerReportPet: 'Report a Pet'
  }
};

