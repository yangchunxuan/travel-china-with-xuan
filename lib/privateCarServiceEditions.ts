import { japanesePrivateCarServiceCopy } from './japanesePrivateCarServiceCopy.ts';
import { editionReplyPromise } from './editionReplyPromise.ts';
import { arabicPrivateCarServiceCopy } from './arabicPrivateCarServiceCopy.ts';
import { germanPrivateCarServiceCopy } from './germanPrivateCarServiceCopy.ts';
import type { PrivateCarServiceCopy } from './privateCarServicesI18n';
import type { ServiceEditionLocale } from './serviceEdition';

const copies: Record<ServiceEditionLocale, PrivateCarServiceCopy> = {
  ja: japanesePrivateCarServiceCopy,
  ar: arabicPrivateCarServiceCopy,
  de: germanPrivateCarServiceCopy,
  fr: {
    metadata: { title: 'Voiture avec chauffeur en Chine : transferts et devis sur mesure', description: 'Transfert aéroport ou gare, visites ou trajet entre villes en Chine : Homeground vérifie votre itinéraire et précise le service dans un devis écrit.' },
    name: 'Voiture privée avec chauffeur en Chine',
    h1: 'Une voiture avec chauffeur pour le trajet que vous avez en tête.',
    eyebrow: 'Transport privé · Chine',
    lede: 'Un accueil à l’aéroport, une voiture pour vos visites ou un trajet entre deux villes ? Dites-nous où vous souhaitez aller, à quelle date et avec combien de voyageurs. Nous vérifions le parcours et préparons un devis adapté à votre voyage.',
    home: 'Accueil', services: 'Tous les services', breadcrumb: 'Fil d’Ariane', ask: 'Demander un devis de transport',
    facts: ['Un transfert ou une partie de votre voyage', 'Un devis selon votre itinéraire', 'Les prestations précisées par écrit avant paiement'],
    kindsTitle: 'Quel trajet souhaitez-vous organiser ?',
    kindsBody: 'Choisissez la partie pour laquelle vous avez besoin d’aide. Les dates, les lieux de prise en charge, le nombre de passagers et les bagages déterminent l’organisation.',
    kinds: {
      transfer: { title: 'Transfert aéroport ou gare', body: 'Demandez un transfert à votre arrivée ou à votre départ. Indiquez l’aéroport ou la gare, les références du vol ou du train, ainsi que l’autre point du trajet.' },
      sightseeing: { title: 'Voiture privée pour les visites', body: 'Conservez votre hôtel et demandez une voiture avec chauffeur pour les lieux que vous souhaitez visiter. Précisez le parcours, le lieu de prise en charge et les horaires souhaités.' },
      intercity: { title: 'Transport entre deux villes', body: 'Indiquez les villes, les étapes et les horaires envisagés. Nous vérifions la faisabilité du parcours et les temps de trajet avant d’établir un devis. La demande ne confirme pas la disponibilité du transport.' },
    },
    quoteTitle: 'Précisons le trajet avant d’en fixer le prix.',
    quoteBody: 'Le transport est chiffré selon votre itinéraire. Vous pouvez nous confier une seule étape et conserver le reste du voyage tel que vous l’avez déjà organisé.',
    written: ['Les dates, le parcours, les lieux de prise en charge et les horaires', 'Les passagers, les bagages et le véhicule envisagé', 'Le prestataire responsable, les services prévus et ce qui est compris', 'Le prix total, les modalités de paiement et les conditions applicables'],
    quoteNote: 'Ces points sont confirmés par écrit avant tout paiement. La demande ouvre la discussion ; elle ne confirme pas une réservation.',
    relatedTitle: 'Besoin d’autre chose que du transport ?',
    guideTitle: 'Ajouter un guide séparément',
    guideBody: 'La prestation de voiture avec chauffeur ne comprend pas de guide. L’accompagnement anglophone se demande et se chiffre séparément. Un guide francophone fait également l’objet d’un devis distinct, selon les disponibilités ; le tarif d’un guide anglophone ne s’y applique pas.',
    guideLink: 'Guides privés anglophones',
    fullTripTitle: 'Préparer l’ensemble du voyage',
    fullTripBody: 'Si vous souhaitez aussi de l’aide pour les hôtels, les guides et plusieurs étapes à coordonner, découvrez notre service de préparation du voyage et d’accompagnement sur place.',
    fullTripLink: 'Préparation du voyage et accompagnement sur place',
    companyLink: 'Entreprise et licence d’agence de voyages', termsLink: 'Conditions de service',
    faqTitle: 'Avant de nous contacter.',
    faq: [
      { question: 'Puis-je réserver une voiture avec chauffeur à Pékin sans guide ?', answer: "Oui. La voiture avec chauffeur se réserve seule ; aucun guide ne vous accompagne sauf si vous le demandez. Le chauffeur vous conduit selon votre programme entre l'hôtel et les lieux prévus, comme la Grande Muraille ou la Cité interdite. Si vous souhaitez un guide pour une ou plusieurs journées, nous l'ajoutons sur devis séparé. Envoyez vos dates, vos étapes et le nombre de voyageurs pour recevoir un devis écrit." },
      { question: 'Puis-je demander uniquement un transfert aéroport ou gare ?', answer: 'Oui. Vous pouvez demander seulement le transport dont vous avez besoin et conserver vos hôtels et vos autres réservations. Indiquez les deux extrémités du trajet, la date et les références de votre vol ou de votre train.' },
      { question: 'Existe-t-il un tarif fixe à la journée ?', answer: 'Le devis est préparé selon votre itinéraire. Nous devons vérifier les dates, le parcours, les horaires, le nombre de passagers et les bagages. Avant paiement, le devis écrit confirme les prestations et le prix total.' },
      { question: 'Puis-je demander un trajet entre plusieurs villes ?', answer: 'Oui. Indiquez les villes, les arrêts éventuels et les horaires souhaités. Nous vérifions la faisabilité du parcours avant de chiffrer la prestation. Une demande ne confirme pas les disponibilités et ne réserve pas de véhicule.' },
      { question: 'Le chauffeur assure-t-il aussi les visites guidées en anglais ?', answer: 'Le service de guide est chiffré séparément de la voiture avec chauffeur. Précisez si vous avez besoin d’un guide ou d’une langue de communication particulière, pour que les arrangements soient confirmés avant la réservation. Un guide francophone est proposé sur devis distinct, selon les disponibilités, et non au tarif publié pour un guide anglophone.' },
      { question: 'Comment le véhicule est-il choisi ?', answer: 'Indiquez le nombre de voyageurs et décrivez vos bagages. Nous vérifions le véhicule adapté au trajet et confirmons l’organisation proposée dans le devis écrit.' },
      { question: 'Ouvrir le message WhatsApp ou l’e-mail réserve-t-il la voiture ?', answer: 'Non. Ces champs préparent un message que vous envoyez vous-même dans WhatsApp ou votre messagerie. Préparer ou ouvrir ce brouillon n’envoie pas de demande à ce site et ne confirme pas de réservation.' },
    ],
    enquiry: {
      title: 'Parlez-nous du trajet.', body: `Indiquez les informations essentielles ci-dessous, puis ouvrez votre message dans WhatsApp ou votre messagerie. Nous pourrons préciser ensemble les détails encore ouverts. ${editionReplyPromise.fr}`,
      requiredNotice: 'Le type de transport, la ou les villes, le nombre de voyageurs et une date sont obligatoires. Vous pouvez choisir « Je n’ai pas encore choisi de date ». Les autres champs sont facultatifs.',
      optional: 'Facultatif', kind: 'Transport souhaité', chooseKind: 'Choisir un service', cities: 'Ville ou villes', citiesPlaceholder: 'Par exemple : Pékin, Shanghai',
      date: 'Date de début du service', undecided: 'Je n’ai pas encore choisi de date', travellers: 'Nombre de voyageurs', luggage: 'Bagages', luggagePlaceholder: 'Par exemple : 2 valises et 2 petits sacs',
      pickup: 'Lieu de prise en charge', pickupPlaceholder: 'Nom ou adresse de l’aéroport, de la gare ou de l’hôtel', pickupTime: 'Heure de prise en charge ou références du vol / train', timePlaceholder: 'Par exemple : arrivée du vol à 15 h 30',
      route: 'Parcours et arrêts', routePlaceholder: 'Destination finale et arrêts souhaités en chemin', note: 'Autres besoins', notePlaceholder: 'Par exemple : un guide, une langue de communication ou d’autres contraintes horaires',
      whatsapp: 'Préparer un message WhatsApp', email: 'Préparer un e-mail', privacy: 'Confidentialité',
      draftNote: 'Rien n’est envoyé tant que vous ne l’envoyez pas dans WhatsApp ou votre messagerie. Ce formulaire prépare seulement un brouillon : il n’enregistre pas de demande et ne confirme pas de réservation.',
      message: {
        opening: 'Bonjour Homeground, je souhaite un devis pour une voiture privée avec chauffeur.', subject: 'Demande de voiture privée avec chauffeur', kind: 'Transport souhaité', cities: 'Ville ou villes', date: 'Date de début du service', travellers: 'Voyageurs', luggage: 'Bagages', pickup: 'Lieu de prise en charge', pickupTime: 'Heure / références du vol ou du train', route: 'Parcours et arrêts', note: 'Autres besoins', none: 'À confirmer', datesOpen: 'Date non définie',
        confirmation: 'Merci de vérifier la faisabilité du parcours et de confirmer par écrit, avant paiement, le prestataire responsable, le véhicule prévu, les services, les prestations comprises, le prix total et les conditions. Le service de guide est distinct du transport. Si je demande un guide francophone, merci d’établir un devis séparé selon les disponibilités ; les tarifs anglophones ne s’appliquent pas à ce service.', separator: ' : ',
      },
    },
  },
  es: {
    metadata: { title: 'Coche con chofer en China: traslados y conductor privado en cualquier ciudad', description: 'Coche privado con conductor en cualquier ciudad de China continental: traslados al aeropuerto o la estación, días de visitas y trayectos entre ciudades. Conductores propios; respondemos en menos de 12 horas.' },
    name: 'Coche privado con conductor en China',
    h1: 'Un coche con conductor para la ruta que tienes en mente.',
    eyebrow: 'Transporte privado · China',
    lede: '¿Necesitas una recogida en el aeropuerto, un coche para las visitas o un trayecto entre ciudades? Dinos adónde quieres ir, cuándo y cuántas personas viajan. Revisamos la ruta y preparamos un presupuesto para tu viaje.',
    home: 'Inicio', services: 'Todos los servicios', breadcrumb: 'Ruta de navegación', ask: 'Consultar por el transporte',
    facts: ['Cualquier ciudad de China continental, sin Hong Kong ni Macao', 'Conductores propios, no subcontratados', 'Ruta, vehículo y precio por escrito antes del pago'],
    kindsTitle: '¿Qué trayecto necesitas?', kindsBody: 'Elige la parte para la que quieres ayuda. Las fechas, los puntos de recogida, el número de personas y el equipaje determinan la organización.',
    kinds: {
      transfer: { title: 'Traslado al aeropuerto o la estación', body: 'Consulta por un traslado de llegada o salida. Indica el aeropuerto o la estación, los datos del vuelo o tren y el otro extremo del trayecto.' },
      sightseeing: { title: 'Coche privado para las visitas', body: 'Mantén el hotel que ya tienes y consulta por un coche con conductor para visitar los lugares que elijas. Indica la ruta, el punto de recogida y los horarios que necesitas.' },
      intercity: { title: 'Transporte entre ciudades', body: 'Cuéntanos qué ciudades y paradas tienes en mente y a qué horas te gustaría viajar. Revisamos la viabilidad de la ruta y los tiempos de traslado antes de presupuestar. La consulta no confirma que el trayecto esté disponible.' },
    },
    quoteTitle: 'Primero concretamos el trayecto; después, el precio.',
    quoteBody: 'El transporte se presupuesta según tu itinerario. Puedes pedir ayuda para un solo tramo y mantener el resto del viaje tal como ya lo has organizado.',
    written: ['Fechas, ruta, puntos de recogida y horarios', 'Pasajeros, equipaje y vehículo propuesto', 'Quién presta el servicio, qué se ofrece y qué está incluido', 'Precio total, forma de pago y condiciones aplicables'],
    quoteNote: 'Estos detalles se confirman por escrito antes de pagar. La consulta es el punto de partida de la conversación, no una reserva confirmada.',
    relatedTitle: '¿Necesitas algo más que transporte?',
    guideTitle: 'Añade un guía por separado',
    guideBody: 'El servicio de coche con conductor no incluye guía. Si quieres guía, se presupuesta por separado: de habla inglesa, o de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.',
    guideLink: 'Guías privados de habla inglesa',
    fullTripTitle: 'Ayuda para todo el viaje', fullTripBody: 'Si necesitas hoteles, guías y coordinar varias partes del recorrido, empieza por nuestro servicio de planificación del viaje y apoyo en destino.', fullTripLink: 'Planificación del viaje y apoyo en destino',
    companyLink: 'Empresa y licencia de agencia de viajes', termsLink: 'Condiciones de servicio',
    faqTitle: 'Antes de consultar.',
    faq: [
      { question: '¿Puedo reservar en Pekín un coche privado con conductor sin guía?', answer: 'Sí. El coche con conductor se reserva por separado y no lleva guía salvo que lo pidas. El conductor te lleva según tu plan entre el hotel y los lugares que quieras visitar, como la Gran Muralla o la Ciudad Prohibida. Si quieres guía para uno o varios días, lo añadimos con presupuesto aparte. Indica fechas, paradas y número de viajeros para recibir un presupuesto por escrito.' },
      { question: '¿En qué ciudades hay coche con conductor?', answer: 'En cualquier ciudad de China continental; no en Hong Kong ni en Macao. Los conductores son nuestros, no subcontratados. Indica la ciudad o las ciudades al pedir presupuesto.' },
      { question: '¿Puedo pedir solo un traslado al aeropuerto o la estación?', answer: 'Sí. Puedes consultar únicamente por el transporte que necesitas y mantener tus hoteles y el resto de tus planes. Indica ambos extremos del trayecto, la fecha y los datos del vuelo o tren.' },
      { question: '¿Hay un precio fijo por día?', answer: 'El presupuesto de transporte se prepara según tu itinerario. Hay que revisar las fechas, la ruta, los horarios, el número de pasajeros y el equipaje. El presupuesto escrito confirma los servicios y el precio total antes del pago.' },
      { question: '¿Puedo consultar por un trayecto entre ciudades?', answer: 'Sí. Indica las ciudades, las posibles paradas y los horarios que prefieres. Revisamos la viabilidad de la ruta antes de presupuestar. La consulta no confirma la disponibilidad ni reserva un vehículo.' },
      { question: '¿El conductor también hace de guía en inglés?', answer: 'El servicio de guía se presupuesta aparte del coche con conductor. Indica si necesitas guía de habla inglesa o de habla hispana; el de habla hispana lo hay en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.' },
      { question: '¿Cómo se elige el vehículo?', answer: 'Dinos cuántas personas viajan y describe el equipaje. Comprobamos el vehículo adecuado para el trayecto y confirmamos la propuesta en el presupuesto escrito.' },
      { question: '¿Abrir el mensaje de WhatsApp o el correo reserva el coche?', answer: 'No. Estos campos preparan un mensaje que tú envías desde WhatsApp o tu correo. Preparar o abrir el borrador no envía una consulta a este sitio web ni confirma una reserva.' },
    ],
    enquiry: {
      title: 'Cuéntanos qué trayecto necesitas.', body: `Añade los datos básicos y abre tu mensaje en WhatsApp o en tu correo. Podemos concretar después los detalles que todavía no tengas decididos. ${editionReplyPromise.es}`,
      requiredNotice: 'El tipo de transporte, la ciudad o ciudades, el número de viajeros y la fecha son obligatorios. Puedes elegir «Todavía no tengo fecha». Los demás campos son opcionales.',
      optional: 'Opcional', kind: 'Transporte que necesitas', chooseKind: 'Elige un servicio', cities: 'Ciudad o ciudades', citiesPlaceholder: 'Por ejemplo: Pekín, Shanghái',
      date: 'Fecha de inicio del servicio', undecided: 'Todavía no tengo fecha', travellers: 'Número de viajeros', luggage: 'Equipaje', luggagePlaceholder: 'Por ejemplo: 2 maletas y 2 bolsas pequeñas',
      pickup: 'Punto de recogida', pickupPlaceholder: 'Nombre o dirección del aeropuerto, estación u hotel', pickupTime: 'Hora de recogida o datos del vuelo / tren', timePlaceholder: 'Por ejemplo: el vuelo llega a las 15:30',
      route: 'Ruta y paradas', routePlaceholder: 'Dónde quieres terminar y las paradas que te gustaría hacer', note: 'Otras necesidades', notePlaceholder: 'Por ejemplo: un guía, idioma de comunicación u otros horarios',
      whatsapp: 'Preparar mensaje de WhatsApp', email: 'Preparar un correo', privacy: 'Privacidad',
      draftNote: 'No se envía nada hasta que lo envíes desde WhatsApp o tu correo. Este formulario solo prepara un borrador: no guarda una consulta ni confirma una reserva.',
      message: {
        opening: 'Hola Homeground, me gustaría pedir presupuesto para un coche privado con conductor.', subject: 'Consulta de coche privado con conductor', kind: 'Transporte que necesito', cities: 'Ciudad o ciudades', date: 'Fecha de inicio del servicio', travellers: 'Viajeros', luggage: 'Equipaje', pickup: 'Punto de recogida', pickupTime: 'Hora / datos del vuelo o tren', route: 'Ruta y paradas', note: 'Otras necesidades', none: 'Por confirmar', datesOpen: 'Todavía sin fecha',
        confirmation: 'Me gustaría confirmar por escrito, antes del pago, la viabilidad de la ruta, quién presta el servicio, el vehículo propuesto, los servicios incluidos, el precio total y las condiciones. El guía se contrata aparte del transporte.', separator: ': ',
      },
    },
  },
};

export function getPrivateCarServiceEditionCopy(language: ServiceEditionLocale): PrivateCarServiceCopy {
  return copies[language];
}
