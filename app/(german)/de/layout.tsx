import type { Metadata } from 'next';
import { GermanContactHost } from '../../../components/GermanContactHost';
import { homegroundHeadScript } from '../../../lib/homegroundAssetRecovery';
import '../../globals.css';
import './german.css';
export const metadata: Metadata = { metadataBase: new URL('https://homegroundchina.com/'), applicationName: 'Homeground China', referrer: 'origin', openGraph: {siteName:'Homeground China'} };
export default function GermanLayout({children}: {children:React.ReactNode}) {
  return <html lang="de" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning><head><script data-homeground-asset-recovery="" dangerouslySetInnerHTML={{__html:homegroundHeadScript}} /></head><body>{children}<GermanContactHost/></body></html>;
}
