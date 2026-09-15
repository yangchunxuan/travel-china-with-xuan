import { homegroundBusiness } from "./homegroundBusiness.ts";

// Transcribed from the two certificates supplied by the owner on 2026-09-08.
// The certificate holder is the operating entity shown across the website.
export const travelAgencyCertificateHolder = {
  registeredName: homegroundBusiness.registeredName,
  englishName: homegroundBusiness.englishName,
  unifiedSocialCreditCode: homegroundBusiness.unifiedSocialCreditCode,
  travelAgencyLicenceNumber: homegroundBusiness.travelAgencyLicenceNumber,
  travelAgencyLicencePath:
    "/documents/business/shengshi-meida-travel-agency-licence.jpg",
  businessLicencePath:
    "/documents/business/shengshi-meida-business-licence.png",
} as const;

const holder = travelAgencyCertificateHolder;
const officialLicenceLookup = homegroundBusiness.travelAgencyRegistryUrl;
const officialBusinessLookup = homegroundBusiness.registryUrl;

export const travelAgencyCredentials = {
  en: {
    id: "travel-agency-credentials",
    title: "Travel agency credentials",
    paragraphs: [
      "Homeground's operating company holds the certificates below for domestic and inbound tourism in China.",
    ],
    facts: [
      { label: "Operating company", value: holder.registeredName, detail: holder.englishName },
      { label: "Unified Social Credit Code", value: holder.unifiedSocialCreditCode },
      { label: "Travel agency licence number", value: holder.travelAgencyLicenceNumber },
      { label: "Permit document number", value: homegroundBusiness.travelAgencyPermitDocumentNumber },
      { label: "Licensed services", value: "Domestic tourism in China and inbound tourism" },
      { label: "Travel agency licence", value: "View the travel agency licence", href: holder.travelAgencyLicencePath },
      { label: "Business licence", value: "View the business licence", href: holder.businessLicencePath },
      {
        label: "Verify the travel agency licence",
        value: "China Ministry of Culture and Tourism",
        detail: "Search the certificate holder’s Chinese name above (Chinese website).",
        href: officialLicenceLookup,
        external: true,
      },
      {
        label: "Verify company registration",
        value: "National Enterprise Credit Information Publicity System",
        detail: `Search credit code ${holder.unifiedSocialCreditCode} (Chinese website).`,
        href: officialBusinessLookup,
        external: true,
      },
    ],
  },
  zh: {
    id: "travel-agency-credentials",
    title: "旅行社资质",
    paragraphs: ["Homeground 的运营公司持有以下证照，许可业务为境内旅游、入境旅游。"],
    facts: [
      { label: "运营公司", value: holder.registeredName },
      { label: "统一社会信用代码", value: holder.unifiedSocialCreditCode },
      { label: "旅行社许可证编号", value: holder.travelAgencyLicenceNumber },
      { label: "许可文号", value: homegroundBusiness.travelAgencyPermitDocumentNumber },
      { label: "许可经营业务", value: homegroundBusiness.licensedBusinessScope },
      { label: "旅行社业务经营许可证", value: "查看经营许可证原图", href: holder.travelAgencyLicencePath },
      { label: "营业执照", value: "查看营业执照原图", href: holder.businessLicencePath },
      {
        label: "官方查询旅行社许可",
        value: "全国旅游监管服务平台",
        detail: "输入上方持证公司的中文全称查询。",
        href: officialLicenceLookup,
        external: true,
      },
      {
        label: "官方查询企业登记",
        value: "国家企业信用信息公示系统",
        detail: `输入代码 ${holder.unifiedSocialCreditCode} 查询。`,
        href: officialBusinessLookup,
        external: true,
      },
    ],
  },
  ko: {
    id: "travel-agency-credentials",
    title: "여행사 등록 및 허가 정보",
    paragraphs: ["Homeground 운영사는 아래 증서를 보유하고 있으며 중국 국내 관광 및 외국인 방중 관광 업무 허가를 받았습니다."],
    facts: [
      { label: "운영사", value: holder.registeredName, detail: holder.englishName },
      { label: "통일사회신용코드", value: holder.unifiedSocialCreditCode },
      { label: "여행사 허가번호", value: holder.travelAgencyLicenceNumber },
      { label: "허가 문서 번호", value: homegroundBusiness.travelAgencyPermitDocumentNumber },
      { label: "허가 업무", value: "중국 국내 관광 및 외국인 방중 관광" },
      { label: "여행사 영업허가증", value: "여행사 영업허가증 원본 보기", href: holder.travelAgencyLicencePath },
      { label: "사업자등록증", value: "사업자등록증 원본 보기", href: holder.businessLicencePath },
      {
        label: "여행사 허가 공식 조회",
        value: "중국 문화여유부 관광 관리 플랫폼",
        detail: "위에 표시된 증서 명의 회사의 중국어 이름으로 검색하세요. 중국어 사이트입니다.",
        href: officialLicenceLookup,
        external: true,
      },
      {
        label: "기업 등록 공식 조회",
        value: "중국 국가기업신용정보공시시스템",
        detail: `신용코드 ${holder.unifiedSocialCreditCode}로 검색하세요. 중국어 사이트입니다.`,
        href: officialBusinessLookup,
        external: true,
      },
    ],
  },
} as const;
