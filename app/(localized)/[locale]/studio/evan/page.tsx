import type { Metadata } from "next";
import { EditorialAuthorPage } from "../../../../../components/EditorialAuthorPage";
import { getEditorialAuthor, getEditorialAuthorLanguagePaths } from "../../../../../lib/editorialIdentity";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";

export function generateStaticParams() { return [{ locale: "zh" }, { locale: "ko" }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: routeLocale } = await params; const locale = localizedRouteLocale(routeLocale); const author = getEditorialAuthor(locale);
  return { title: author.copy.title, description: author.copy.introduction, alternates: { canonical: author.path, languages: { ...getEditorialAuthorLanguagePaths(), "x-default": "/studio/evan/" } }, openGraph: { type: "profile", title: author.copy.title, description: author.copy.introduction, url: author.path, images: [author.image.src] } };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale: routeLocale } = await params; return <EditorialAuthorPage locale={localizedRouteLocale(routeLocale)} />; }
