import { FrenchHomePage, frenchHomeTitle, frenchHomeDescription } from '../../../components/FrenchCorePages';
import { buildFrenchMetadata } from '../../../lib/frenchSite';
export const metadata=buildFrenchMetadata(frenchHomeTitle,frenchHomeDescription,'/fr/',{en:'/', 'zh-Hans':'/zh/',ko:'/ko/',ja:'/ja/',es:'/es/',fr:'/fr/',de:'/de/', ar: '/ar/','x-default':'/'});
export default function Page() { return <FrenchHomePage/>; }
