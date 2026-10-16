import type { Metadata } from 'next';
import { FrenchContactHost } from '../../../components/FrenchContactHost';
import { homegroundInternalRouteBootstrap } from '../../../lib/homegroundRouteSession';
import '../../globals.css';
export const metadata: Metadata = { metadataBase: new URL('https://homegroundchina.com/'), applicationName: 'Homeground China', referrer: 'origin', openGraph: {siteName:'Homeground China'} };
export default function FrenchLayout({children}: {children:React.ReactNode}) {
  return <html lang="fr" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:homegroundInternalRouteBootstrap}} /></head><body>{children}<FrenchContactHost/></body></html>;
}
