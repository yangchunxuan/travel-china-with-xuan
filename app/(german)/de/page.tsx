import { GermanHomePage, germanHomeTitle, germanHomeDescription } from '../../../components/GermanCorePages';
import { buildGermanMetadata } from '../../../lib/germanSite';
export const metadata=buildGermanMetadata(germanHomeTitle,germanHomeDescription,'/de/',{en:'/', 'zh-Hans':'/zh/',ko:'/ko/',ja:'/ja/',es:'/es/',fr:'/fr/',de:'/de/',ar:'/ar/','x-default':'/'});
export default function Page() { return <GermanHomePage/>; }
