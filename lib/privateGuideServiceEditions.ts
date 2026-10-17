import { arabicPrivateGuideServiceCopy, arabicPrivateGuideLanguageCopy } from './arabicPrivateGuideServiceCopy.ts';
import { germanPrivateGuideServiceCopy, germanPrivateGuideLanguageCopy } from './germanPrivateGuideServiceCopy.ts';
import type { PrivateGuideServiceCopy } from './privateGuideServicesI18n';
import type { ServiceEditionLocale } from './serviceEdition';

const copies: Record<ServiceEditionLocale, PrivateGuideServiceCopy> = {
  ar: arabicPrivateGuideServiceCopy,
  de: germanPrivateGuideServiceCopy,
  fr: {
    metadata: {
      title: 'Guide privé anglophone en Chine : tarifs pour une journée de 8 h',
      description: 'Guide privé anglophone à Shanghai ou Pékin dès 1 200 CNY, à Xi’an ou Zhangjiajie dès 900 CNY pour 8 h maximum. Guide francophone sur devis séparé.',
    },
    h1: 'Une journée à votre rythme, avec un guide local anglophone.',
    eyebrow: 'Guide privé anglophone · Shanghai, Pékin, Xi’an et Zhangjiajie',
    lede: 'Vous avez déjà réservé vos hôtels et vos transports ? Faites appel à un guide anglophone pour les journées où vous souhaitez un accompagnement local. Dites-nous ce que vous aimeriez découvrir et le rythme qui vous convient. Si vous préférez un guide francophone, nous établirons un devis séparé, selon les disponibilités.',
    services: 'Tous les services', breadcrumb: 'Fil d’Ariane', ask: 'Demander un guide',
    facts: ['Un guide réservé à votre groupe', 'Jusqu’à 8 heures par jour', 'Nombre de participants confirmé dans le devis'],
    citiesTitle: 'Choisissez votre ville.',
    citiesBody: 'Ces tarifs indicatifs concernent uniquement un guide anglophone, par guide et par jour. Le tarif applicable, le nombre de participants et le parcours sont confirmés avant la réservation. Un guide francophone fait l’objet d’un devis distinct.',
    standard: 'Tarif habituel', peak: 'Tarif de haute saison', unit: 'par guide / jusqu’à 8 heures',
    priceNote: 'Les prix sont indiqués en yuans chinois (CNY), pour un guide anglophone. Communiquez-nous votre date pour connaître le tarif applicable. Le tarif d’un guide francophone est établi séparément.',
    cities: {
      shanghai: { name: 'Shanghai', description: 'Découvrez le Bund, le jardin Yu ou les quartiers qui vous attirent. Indiquez vos étapes préférées pour construire une journée à votre rythme.' },
      beijing: { name: 'Pékin', description: 'Prévoyez une journée dans le centre de Pékin ou une visite de la Grande Muraille. Votre lieu de départ et les sites choisis nous permettent de vérifier les horaires et les transports nécessaires.' },
      xian: { name: 'Xi’an', description: 'Visitez l’armée de terre cuite ou les sites historiques de la ville. Dites-nous ce que vous aimeriez voir pour que nous puissions vérifier le parcours et les temps de trajet.' },
      zhangjiajie: { name: 'Zhangjiajie', description: 'Faites-vous accompagner dans le parc forestier national de Zhangjiajie ou préparez une journée à la montagne Tianmen. Précisez votre point de départ et le rythme de marche qui vous convient.' },
    },
    zhangjiajieRoutes: { note: 'Vous avez aussi besoin d’un hôtel et d’un véhicule privé ? Les journées avec guide seul et les circuits complets font l’objet de devis distincts.', action: 'Comparer les circuits privés à Zhangjiajie' },
    scopeTitle: 'Un guide pour la journée que vous imaginez.',
    includedTitle: 'Le service de guide',
    included: ['Un guide privé anglophone titulaire d’une licence chinoise, pour 8 heures maximum', 'Un parcours de visite discuté selon vos intérêts et votre rythme', 'Des explications sur les lieux visités et une aide pour vous repérer au fil du parcours'],
    separateTitle: 'À confirmer séparément',
    separate: ['Vos transports, y compris une voiture avec chauffeur si nécessaire', 'Vos billets d’entrée et vos repas', 'Les journées plus longues, les parcours particuliers et l’organisation selon la taille du groupe'],
    scopeNote: 'Avant la réservation, votre devis écrit précise les prestations comprises et les frais supplémentaires éventuels, y compris ceux liés au guide. Une demande de guide ne réserve pas l’entrée aux sites. L’accompagnement en français est chiffré séparément.',
    faqTitle: 'Avant de nous contacter.',
    faq: [
      { question: 'Ces prix sont-ils indiqués par personne ?', answer: 'Non. Ils s’appliquent par guide et par journée de 8 heures maximum. Indiquez le nombre de participants afin que nous puissions confirmer l’organisation adaptée à votre groupe et le montant total du devis.' },
      { question: 'Vos guides sont-ils titulaires d’une licence ?', answer: 'Oui. Les guides de Homeground possèdent une licence chinoise de guide touristique (导游证).' },
      { question: 'Puis-je réserver uniquement un guide ?', answer: 'Oui. Ce service permet de réserver un guide anglophone indépendamment du reste du voyage. Vous pouvez conserver les hôtels et les transports que vous avez déjà organisés, ou nous demander un devis séparé pour le transport.' },
      { question: 'Que comprend le tarif indiqué ?', answer: 'Le tarif publié couvre le service d’un guide anglophone. Les transports, vos entrées et vos repas sont à confirmer séparément. Avant la réservation, le devis écrit détaille toutes les prestations comprises et les éventuels frais liés au guide. Si vous souhaitez un guide francophone, son tarif sera établi séparément, selon les disponibilités ; les prix affichés ne correspondent pas à ce service.' },
      { question: 'Comment se répartissent les huit heures ?', answer: 'Avant la réservation, nous convenons avec vous du lieu de rendez-vous, des heures de début et de fin ainsi que des pauses, en fonction de votre programme.' },
      { question: 'Quand le tarif de haute saison s’applique-t-il ?', answer: 'Indiquez-nous votre date de visite. Nous confirmerons le tarif applicable et la disponibilité du guide pour cette date avant la réservation.' },
      { question: 'Puis-je demander une journée plus longue ou venir avec un groupe plus nombreux ?', answer: 'Oui. Précisez les horaires, le nombre de participants et le parcours souhaités. Nous vérifierons les disponibilités et chiffrerons les arrangements supplémentaires avant la réservation.' },
      { question: 'Quelles informations envoyer pour obtenir un devis ?', answer: 'Indiquez la ville, la date, le nombre de voyageurs et les sites que vous souhaitez visiter. Le lieu de rendez-vous et l’heure de départ souhaitée nous aident aussi à préparer cette journée.' },
    ],
    enquiry: {
      title: 'Racontez-nous votre journée idéale.', body: 'Choisissez une ville, indiquez la date et le nombre de participants, puis les lieux que vous aimeriez découvrir. Nous vérifierons les possibilités avant de vous envoyer un devis. Précisez si vous souhaitez un guide francophone, dont le tarif sera établi séparément.',
      city: 'Ville', chooseCity: 'Choisir une ville', date: 'Date de la visite', undecided: 'Je n’ai pas encore choisi de date', travellers: 'Nombre de voyageurs', route: 'Sites souhaités et lieu de rendez-vous', placeholder: 'Par exemple : le Bund et le jardin Yu, au départ de notre hôtel dans le centre de Shanghai…', optional: 'Facultatif', whatsapp: 'Demander sur WhatsApp', email: 'Préparer un e-mail', privacy: 'Confidentialité',
      draftNote: 'Ces informations servent à préparer votre message. Rien n’est envoyé tant que vous ne l’envoyez pas dans WhatsApp ou votre messagerie. Il ne s’agit pas d’une réservation confirmée.',
      message: { opening: 'Bonjour Homeground, je souhaite un devis pour un guide privé anglophone.', service: 'Service', serviceValue: 'Un guide anglophone, jusqu’à 8 heures', city: 'Ville', date: 'Date de la visite', travellers: 'Voyageurs', route: 'Sites / lieu de rendez-vous / précisions', rate: 'Tarif habituel indicatif publié pour un guide anglophone', rateNote: 'Merci de confirmer le tarif applicable, l’organisation du groupe et toutes les prestations comprises pour ma date. Si je demande un guide francophone, merci d’établir un devis séparé selon les disponibilités ; le tarif anglophone ci-dessus ne s’applique pas à ce service.', none: 'À confirmer', subject: 'Demande de guide privé anglophone' },
    },
  },
  es: {
    metadata: {
      title: 'Guía privado en inglés en China: precios por jornada de 8 h',
      description: 'Guía privado en inglés desde 1.200 CNY en Shanghái o Pekín y 900 CNY en Xi’an o Zhangjiajie, hasta 8 h. El guía en español se presupuesta aparte.',
    },
    h1: 'Un día a tu ritmo, con un guía local de habla inglesa.',
    eyebrow: 'Guía privado en inglés · Shanghái, Pekín, Xi’an y Zhangjiajie',
    lede: '¿Ya tienes los hoteles y el transporte organizados? Añade un guía de habla inglesa para los días en los que quieras ayuda local durante las visitas. Cuéntanos qué te apetece conocer y a qué ritmo prefieres viajar. Si necesitas un guía de habla española, prepararemos un presupuesto aparte, según disponibilidad.',
    services: 'Todos los servicios', breadcrumb: 'Ruta de navegación', ask: 'Consultar por un guía',
    facts: ['Un guía solo para tu grupo', 'Hasta 8 horas al día', 'Número de viajeros confirmado en el presupuesto'],
    citiesTitle: 'Elige tu ciudad.',
    citiesBody: 'Estos precios orientativos corresponden solo al guía de habla inglesa y se cobran por guía y día. Antes de reservar confirmamos la tarifa aplicable, el número de viajeros y el recorrido. El guía de habla española se presupuesta por separado.',
    standard: 'Tarifa habitual', peak: 'Tarifa de temporada alta', unit: 'por guía / hasta 8 horas',
    priceNote: 'Los precios están en yuanes chinos (CNY) y corresponden a un guía de habla inglesa. Indícanos la fecha para confirmar qué tarifa se aplica. El precio de un guía de habla española se calcula aparte.',
    cities: {
      shanghai: { name: 'Shanghái', description: 'Descubre el Bund, el Jardín Yu o los barrios que más te interesen. Dinos qué lugares te apetecen para organizar un día a tu ritmo.' },
      beijing: { name: 'Pekín', description: 'Planea un día por el centro de Pekín o una visita a la Gran Muralla. El punto de salida y los lugares elegidos nos ayudan a comprobar los horarios y el transporte que necesitarás.' },
      xian: { name: 'Xi’an', description: 'Visita los Guerreros de Terracota o recorre la ciudad histórica. Cuéntanos qué quieres conocer para revisar el itinerario y los tiempos de traslado.' },
      zhangjiajie: { name: 'Zhangjiajie', description: 'Cuenta con ayuda para recorrer el Parque Forestal Nacional de Zhangjiajie o preparar un día en la montaña Tianmen. Indica desde dónde sales y qué ritmo de caminata te resulta cómodo.' },
    },
    zhangjiajieRoutes: { note: '¿También necesitas hotel y vehículo privado? Los días con guía por separado y los viajes completos tienen presupuestos distintos.', action: 'Comparar viajes privados a Zhangjiajie' },
    scopeTitle: 'Un guía para el día que tienes en mente.',
    includedTitle: 'Servicio de guía',
    included: ['Un guía privado de habla inglesa con licencia china, durante un máximo de 8 horas', 'Un recorrido acordado según tus intereses y tu ritmo', 'Explicaciones sobre los lugares que visitas y ayuda para orientarte durante el recorrido'],
    separateTitle: 'Se confirma por separado',
    separate: ['Tu transporte, incluido coche con conductor si lo necesitas', 'Tus entradas a los lugares de visita y tus comidas', 'Las jornadas más largas, los recorridos especiales y la organización según el tamaño del grupo'],
    scopeNote: 'Antes de reservar, el presupuesto escrito detalla todos los servicios incluidos y los posibles gastos adicionales, incluidos los relacionados con el guía. Consultar por un guía no reserva la entrada a los lugares de visita. El acompañamiento en español se presupuesta aparte.',
    faqTitle: 'Antes de consultar.',
    faq: [
      { question: '¿Estos precios son por persona?', answer: 'No. Son por guía y por jornada de hasta 8 horas. Dinos cuántas personas viajan para confirmar la organización adecuada para tu grupo y el presupuesto total.' },
      { question: '¿Los guías tienen licencia?', answer: 'Sí. Los guías de Homeground cuentan con una licencia china de guía turístico (导游证).' },
      { question: '¿Puedo reservar solo un guía?', answer: 'Sí. Este servicio permite contratar un guía de habla inglesa de forma independiente. Puedes mantener los hoteles y el transporte que ya tienes organizados o pedirnos un presupuesto aparte para los traslados.' },
      { question: '¿Qué incluye el precio publicado?', answer: 'La tarifa publicada cubre el servicio de un guía de habla inglesa. El transporte, tus entradas y tus comidas se confirman por separado. Antes de reservar, el presupuesto escrito detalla todo lo incluido y los posibles gastos relacionados con el guía. Si quieres un guía de habla española, su precio se calculará aparte, según disponibilidad; las tarifas que ves aquí no corresponden a ese servicio.' },
      { question: '¿Cómo se organizan las ocho horas?', answer: 'Antes de reservar acordamos el punto de encuentro, las horas de inicio y finalización y las pausas, según el recorrido previsto.' },
      { question: '¿Cuándo se aplica la tarifa de temporada alta?', answer: 'Indícanos la fecha de la visita. Antes de reservar confirmaremos la tarifa aplicable y la disponibilidad del guía para ese día.' },
      { question: '¿Puedo pedir una jornada más larga o viajar con un grupo más grande?', answer: 'Sí. Cuéntanos los horarios, el número de viajeros y el recorrido que necesitas. Comprobaremos la disponibilidad y presupuestaremos los servicios adicionales antes de reservar.' },
      { question: '¿Qué datos hacen falta para pedir presupuesto?', answer: 'La ciudad, la fecha, el número de viajeros y los lugares que quieres visitar. El punto de encuentro y la hora a la que prefieres empezar también nos ayudan a organizar el día.' },
    ],
    enquiry: {
      title: 'Cuéntanos cómo te gustaría pasar el día.', body: 'Elige la ciudad, indica la fecha y cuántas personas viajan, y dinos qué te gustaría visitar. Revisaremos las opciones y te responderemos con un presupuesto. Si necesitas un guía de habla española, indícalo para que podamos presupuestarlo aparte.',
      city: 'Ciudad', chooseCity: 'Elige una ciudad', date: 'Fecha de la visita', undecided: 'Todavía no tengo fecha', travellers: 'Número de viajeros', route: 'Lugares que quieres visitar y punto de encuentro', placeholder: 'Por ejemplo: el Bund y el Jardín Yu, saliendo de nuestro hotel en el centro de Shanghái…', optional: 'Opcional', whatsapp: 'Consultar por WhatsApp', email: 'Preparar un correo', privacy: 'Privacidad',
      draftNote: 'Estos datos preparan tu mensaje. No se envía nada hasta que lo envíes desde WhatsApp o tu correo; no es una reserva confirmada.',
      message: { opening: 'Hola Homeground, me gustaría pedir presupuesto para un guía privado de habla inglesa.', service: 'Servicio', serviceValue: 'Un guía de habla inglesa, hasta 8 horas', city: 'Ciudad', date: 'Fecha de la visita', travellers: 'Viajeros', route: 'Visitas / punto de encuentro / notas', rate: 'Tarifa habitual orientativa publicada para un guía de habla inglesa', rateNote: 'Me gustaría confirmar la tarifa aplicable, la organización del grupo y todos los servicios incluidos para mi fecha. Si solicito un guía de habla española, necesitaré un presupuesto aparte según disponibilidad; la tarifa del guía en inglés indicada arriba no se aplica a ese servicio.', none: 'Por confirmar', subject: 'Consulta de guía privado de habla inglesa' },
    },
  },
};

export function getPrivateGuideServiceEditionCopy(language: ServiceEditionLocale): PrivateGuideServiceCopy {
  return copies[language];
}

const languageCopy = {
  ar: arabicPrivateGuideLanguageCopy,
  de: germanPrivateGuideLanguageCopy,
  fr: {
    label: 'Langue souhaitée pour le guide',
    english: 'Anglais · tarifs indicatifs publiés',
    local: 'Français · devis séparé, selon les disponibilités',
    opening: 'Bonjour Homeground, je souhaite un devis pour un guide privé francophone.',
    serviceValue: 'Guide francophone demandé pour une journée de 8 heures maximum ; durée et tarif à confirmer',
    subject: 'Demande de guide privé francophone',
    rateNote: 'Merci de vérifier la disponibilité d’un guide francophone et de confirmer son tarif, la durée, l’organisation du groupe et toutes les prestations comprises avant la réservation. Les tarifs anglophones publiés ne s’appliquent pas à cette demande.',
  },
  es: {
    label: 'Idioma que prefieres para el guía',
    english: 'Inglés · tarifas orientativas publicadas',
    local: 'Español · presupuesto aparte, según disponibilidad',
    opening: 'Hola Homeground, me gustaría pedir presupuesto para un guía privado de habla española.',
    serviceValue: 'Guía de habla española para una jornada de hasta 8 horas, a confirmar y presupuestar aparte',
    subject: 'Consulta de guía privado de habla española',
    rateNote: 'Me gustaría comprobar la disponibilidad de un guía de habla española y confirmar su precio, la duración, la organización del grupo y todos los servicios incluidos antes de reservar. Las tarifas publicadas para guías de habla inglesa no se aplican a esta solicitud.',
  },
} as const;

export function getPrivateGuideServiceEditionLanguageCopy(language: ServiceEditionLocale) {
  return languageCopy[language];
}

export function formatPrivateGuideEditionPrice(amount: number, language: ServiceEditionLocale): string {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'es-ES', { style: 'currency', currency: 'CNY', currencyDisplay: 'code', maximumFractionDigits: 0 }).format(amount);
}
