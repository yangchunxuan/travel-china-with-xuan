import { ArabicHomePage, arabicHomeTitle, arabicHomeDescription } from '../../../components/ArabicCorePages';
import { buildArabicMetadata } from '../../../lib/arabicSite';
export const metadata=buildArabicMetadata(arabicHomeTitle,arabicHomeDescription,'/ar/',{en:'/', 'zh-Hans':'/zh/',ko:'/ko/',ja:'/ja/',es:'/es/',fr:'/fr/',de:'/de/',ar:'/ar/','x-default':'/'});
export default function Page() { return <ArabicHomePage/>; }
