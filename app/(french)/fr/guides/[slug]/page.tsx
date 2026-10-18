import { notFound } from "next/navigation";
import { ReservationGuideEditionPage } from "../../../../../components/ReservationGuideEditionPage";
import { reservationGuideEditionSlugs, isReservationGuideEditionSlug } from "../../../../../lib/reservationGuideEditionPaths";
import { reservationGuideEditionMetadata } from "../../../../../lib/reservationGuideEditions";
export const dynamic="force-static";
export const dynamicParams=false;
export function generateStaticParams(){return reservationGuideEditionSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {const {slug}=await params;if(!isReservationGuideEditionSlug(slug))notFound();return reservationGuideEditionMetadata("fr",slug);}
export default async function GuideRoute({params}:{params:Promise<{slug:string}>}) {const {slug}=await params;if(!isReservationGuideEditionSlug(slug))notFound();return <ReservationGuideEditionPage language="fr" slug={slug}/>;}
