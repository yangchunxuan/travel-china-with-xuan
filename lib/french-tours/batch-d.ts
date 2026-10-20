import type { FrenchTourCopy } from "../frenchTourCopyTypes";
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { frenchTourCopyB } from "./batch-b.ts";

const day = (title: string, description: string) => ({ title, description });
const qa = (question: string, answer: string) => ({ question, answer });
const image = (label: string, alt = label, caption = label) => ({ label, alt, caption });
const scene = (day: number, ...variants: ReturnType<typeof image>[]) => ({ day, variants });

/** The 15-day classic repeats the first twelve days of the 14-day private classic. */
const classic14 = frenchTourCopyB["beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"];

export const frenchTourCopyD: Readonly<Record<string, FrenchTourCopy>> = {
  "beijing-xian-chengdu-guilin-shanghai-15-day-private-tour": {
    title: "Pékin, Xi’an, Chengdu, Guilin, Shanghai et Suzhou : circuit privé de 15 jours",
    metadataTitle: "Chine en 15 jours : circuit privé de Pékin à Shanghai et Suzhou",
    metadataDescription: "15 jours en privé : Grande Muraille, armée de terre cuite, pandas, rivière Li, Shanghai et une journée à Suzhou. Quatorze nuits, deux trains, deux vols intérieurs et le train pour Suzhou inclus.",
    eyebrow: "De Pékin à Shanghai en 15 jours, avec une journée pour les jardins de Suzhou",
    lede: "C’est le circuit privé classique de 14 jours avec une journée de plus : une journée complète à Shanghai, puis une excursion vers les jardins de Suzhou avant le vol retour. Deux trains et deux vols intérieurs relient Pékin, Xi’an, Chengdu, Guilin et Shanghai. Le tarif est indiqué par personne, sur la base de deux personnes par chambre ; les vols internationaux sont à prévoir séparément.",
    summary: "Quatorze nuits avec petit-déjeuner. Dans chaque ville, guide local et véhicule sont réservés à votre groupe les jours de visite. Billets d’entrée prévus au programme, transferts, deux trains en seconde classe, deux vols en classe économique et le train aller-retour pour Suzhou du jour 14 sont inclus. Les jours de trajet, un chauffeur vous accompagne au départ et un autre vous accueille.",
    highlights: [
      "Quatre nuits à Pékin et la Grande Muraille à Mutianyu",
      "L’armée de terre cuite à Xi’an et les pandas de Chengdu tôt le matin, quand ils sont le plus actifs",
      "Croisière sur la Li jusqu’à Yangshuo et deux nuits à Yangshuo, entre les pics karstiques",
      "Trois nuits à Shanghai, une journée guidée en ville et une excursion en train vers les jardins de Suzhou",
    ],
    itinerary: [
      ...classic14.itinerary.slice(0, 12),
      day("Le Bund, le jardin Yu et l’ancienne concession française", "Une journée complète à Shanghai avec votre guide : le jardin Yu et la vieille ville le matin, puis le Bund face aux tours de Pudong, et l’après-midi les rues bordées de platanes d’un quartier de l’ancienne concession française."),
      day("Excursion dans les jardins de Suzhou", "Le train à grande vitesse met Suzhou à environ 30 minutes de Shanghai. À Suzhou, votre guide et votre véhicule privé vous accompagnent toute la journée : visitez un jardin confirmé pour la journée, flânez le long des canaux de Pingjiang Road, puis rentrez à Shanghai en train."),
      day("Départ de Shanghai", "Votre chauffeur vous conduit à l’aéroport ou à la gare de Shanghai confirmés. Aucune visite n’est prévue le jour du départ."),
    ],
    hotelNote: "Quatorze nuits avec petit-déjeuner en chambres pour deux personnes, dans des hôtels de standing quatre étoiles (4 diamants sur Trip.com, également appelé Ctrip) : Pékin 4, Xi’an 2, Chengdu 2, Guilin 1, Yangshuo 2 et Shanghai 3. Les noms des hôtels et les chambres sont confirmés avant paiement.",
    serviceNote: "Les jours de visite, le guide local anglophone et le véhicule sont réservés à votre groupe. Tous les transferts aéroport et gare, les billets d’entrée des principaux sites prévus au programme, la croisière sur la Li avec transfert séparé des bagages, une descente en radeau de bambou sur la Yulong et, le jour 14, le train aller-retour en seconde classe pour Suzhou, un guide et un véhicule privé sur place et l’entrée d’un jardin sont inclus. Les grandes liaisons sont les trains en seconde classe Pékin–Xi’an–Chengdu et les vols en classe économique Chengdu–Guilin et Guilin–Shanghai. Les guides changent selon les villes ; les chauffeurs assurent les transferts des jours de trajet. Les guides coréanophones sont au même tarif lorsqu’ils sont disponibles, ville par ville.",
    bookingNote: classic14.bookingNote,
    exclusions: [
      "Vols internationaux à destination et au départ de la Chine",
      "Déjeuners, dîners et boissons ; le petit-déjeuner est inclus dans chaque hôtel",
      "Assurance voyage, visas, pourboires et dépenses personnelles",
      "Surclassements et suppléments de jours fériés",
      "Supplément chambre individuelle",
      "Bagages enregistrés dépassant la franchise de la compagnie aérienne",
    ],
    faq: [
      qa("Que comprend le prix de ce circuit privé de 15 jours ?", "Le tarif par personne dépend du nombre de voyageurs, sur la base de deux personnes par chambre. Il comprend 14 nuits avec petit-déjeuner, guides et véhicules privés les jours de visite, billets d’entrée prévus au programme, deux trains à grande vitesse, deux vols intérieurs et le train pour Suzhou. Vols internationaux, déjeuners et dîners restent séparés. Pour un autre nombre de voyageurs, nous établissons un devis écrit."),
      qa("Quelle différence avec le circuit privé classique de 14 jours ?", "Les douze premiers jours sont identiques. Dans le circuit privé de 14 jours, le jour 13 se passe à Shanghai ou à Suzhou, au choix, et le jour 14 est celui du départ. Ce circuit de 15 jours consacre le jour 13 à une journée guidée complète à Shanghai, le jour 14 à Suzhou et le jour 15 au départ, avec une troisième nuit d’hôtel à Shanghai."),
      qa("Quelle période privilégier ?", "Avril–mai et septembre–octobre offrent généralement les conditions météo les plus agréables sur cet itinéraire. Juillet–août est chaud et humide à Xi’an et Guilin ; les pandas sont moins actifs. En hiver, les basses eaux peuvent raccourcir la croisière. Trains et sites sont très fréquentés pendant les premières semaines de mai et d’octobre."),
      qa("Peut-on modifier l’itinéraire ?", "Oui : une version avec Zhangjiajie au lieu de Chengdu, Hangzhou au lieu de Suzhou ou des nuits supplémentaires peut faire l’objet d’un devis. Le parcours et le prix modifiés sont confirmés par écrit avant paiement."),
      qa("Y a-t-il des arrêts commerciaux ?", "Non. Ce circuit privé de 15 jours ne comporte aucun arrêt commercial. Une visite ou une prestation ne s’ajoute qu’après votre accord."),
    ],
    heroImage: { alt: "La ligne d’horizon de Shanghai au bord du fleuve, dans la lumière du soir", caption: "Shanghai termine l’itinéraire : trois nuits, avec une journée guidée en ville et une journée à Suzhou." },
    gallery: [{ alt: "La proue d’un radeau de bambou sur une rivière verte et calme à Yangshuo, avec des bambous sur les rives et des pics karstiques au loin", caption: "Une descente en radeau de bambou sur la Yulong est incluse pendant les deux nuits à Yangshuo." }],
    routeMedia: [
      ...classic14.routeMedia.slice(0, 12),
      scene(13,
        image("Le Bund", "Le Bund à Shanghai", "Le Bund à Shanghai"),
        image("Jardin Yu", "Bâtiments traditionnels et bassin du jardin Yu", "Le jardin Yu et la vieille ville se visitent pendant la journée guidée à Shanghai."),
      ),
      scene(14,
        image("Jardin de l’Humble Administrateur", "Pavillon, bassin et paysage végétal du jardin de l’Humble Administrateur à Suzhou", "Jardin de l’Humble Administrateur, à Suzhou. Le jardin visité ce jour-là est confirmé par écrit."),
        image("Pingjiang Road", "Pont de pierre et maisons au bord du canal, sur Pingjiang Road", "Pingjiang Road, à Suzhou"),
      ),
      scene(15, image("Shanghai", "Esplanade calme au bord du fleuve, face aux tours de Shanghai", "Shanghai · Aperçu de la destination")),
    ],
    packages: [{ id: "standard-guided", label: "Circuit privé", summary: "Les jours de visite, le guide et le véhicule sont réservés à votre groupe. Les hôtels, transports, billets d’entrée et services de guide sont détaillés dans la confirmation écrite avant paiement. Aucun arrêt commercial." }],
  },
};
