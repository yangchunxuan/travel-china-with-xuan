import { SpanishHomePage, spanishHomeTitle, spanishHomeDescription } from '../../../components/SpanishCorePages';
import { buildSpanishMetadata } from '../../../lib/spanishSite';
export const metadata=buildSpanishMetadata(spanishHomeTitle,spanishHomeDescription,'/es/',{en:'/', 'zh-Hans':'/zh/',ko:'/ko/',ja:'/ja/',es:'/es/',fr:'/fr/',de:'/de/','x-default':'/'});
export default function Page() { return <SpanishHomePage/>; }
