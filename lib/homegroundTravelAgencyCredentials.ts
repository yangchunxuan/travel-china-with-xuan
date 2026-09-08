// Transcribed from the two certificates supplied by the owner on 2026-09-08.
// Keep the certificate holder separate from Homeground's website operator.
// These documents do not establish a separately registered Homeground branch.
export const travelAgencyCertificateHolder = {
  registeredName: "盛世美达（北京）国际旅行社有限公司",
  englishName:
    "SHENGSHI MEIDA (BEIJING) INTERNATIONAL TRAVEL AGENCY CO., LTD.",
  unifiedSocialCreditCode: "91110114MAE9HHGYX0",
  travelAgencyLicenceNumber: "L-BJ10587",
  travelAgencyLicencePath:
    "/documents/business/shengshi-meida-travel-agency-licence.jpg",
  businessLicencePath:
    "/documents/business/shengshi-meida-business-licence.png",
} as const;

const holder = travelAgencyCertificateHolder;

export const travelAgencyCredentials = {
  en: {
    id: "travel-agency-credentials",
    title: "Travel agency credentials",
    paragraphs: [
      "The certificates below are issued to the named travel agency and cover domestic and inbound tourism in China.",
    ],
    facts: [
      { label: "Certificate holder", value: holder.registeredName, detail: holder.englishName },
      { label: "Unified Social Credit Code", value: holder.unifiedSocialCreditCode },
      { label: "Travel agency licence number", value: holder.travelAgencyLicenceNumber },
      { label: "Licensed services", value: "Domestic tourism in China and inbound tourism" },
      { label: "Travel agency licence", value: "View the travel agency licence", href: holder.travelAgencyLicencePath },
      { label: "Business licence", value: "View the business licence", href: holder.businessLicencePath },
    ],
  },
  zh: {
    id: "travel-agency-credentials",
    title: "旅行社资质",
    paragraphs: ["以下展示持证旅行社的登记信息和证照，许可业务为境内旅游、入境旅游。"],
    facts: [
      { label: "持证公司", value: holder.registeredName },
      { label: "统一社会信用代码", value: holder.unifiedSocialCreditCode },
      { label: "旅行社许可证编号", value: holder.travelAgencyLicenceNumber },
      { label: "许可经营业务", value: "境内旅游业务、入境旅游业务" },
      { label: "旅行社业务经营许可证", value: "查看经营许可证原图", href: holder.travelAgencyLicencePath },
      { label: "营业执照", value: "查看营业执照原图", href: holder.businessLicencePath },
    ],
  },
  ko: {
    id: "travel-agency-credentials",
    title: "여행사 등록 및 허가 정보",
    paragraphs: ["아래 증서는 명시된 여행사에 발급되었으며, 중국 국내 관광 및 외국인 방중 관광 업무를 허가합니다."],
    facts: [
      { label: "증서 명의 회사", value: holder.registeredName, detail: holder.englishName },
      { label: "통일사회신용코드", value: holder.unifiedSocialCreditCode },
      { label: "여행사 허가번호", value: holder.travelAgencyLicenceNumber },
      { label: "허가 업무", value: "중국 국내 관광 및 외국인 방중 관광" },
      { label: "여행사 영업허가증", value: "여행사 영업허가증 원본 보기", href: holder.travelAgencyLicencePath },
      { label: "사업자등록증", value: "사업자등록증 원본 보기", href: holder.businessLicencePath },
    ],
  },
} as const;
