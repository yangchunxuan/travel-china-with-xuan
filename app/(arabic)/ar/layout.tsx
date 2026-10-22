import type { Metadata } from 'next';
import { ArabicContactHost } from '../../../components/ArabicContactHost';
import { homegroundHeadScript } from '../../../lib/homegroundAssetRecovery';
import '../../globals.css';
import './arabic.css';
export const metadata: Metadata = { metadataBase: new URL('https://homegroundchina.com/'), applicationName: 'Homeground China', referrer: 'origin', openGraph: {siteName:'Homeground China'} };
export default function ArabicLayout({children}: {children:React.ReactNode}) {
  return <html lang="ar" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning><head><script data-homeground-asset-recovery="" dangerouslySetInnerHTML={{__html:homegroundHeadScript}} /></head><body>{children}<ArabicContactHost/></body></html>;
}
