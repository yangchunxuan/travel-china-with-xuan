export const homegroundBusiness = {
  brand: "Homeground China",
  publicName: "盛世美达（北京）国际旅行社有限公司",
  registeredName: "盛世美达（北京）国际旅行社有限公司",
  englishName:
    "SHENGSHI MEIDA (BEIJING) INTERNATIONAL TRAVEL AGENCY CO., LTD.",
  unifiedSocialCreditCode: "91110114MAE9HHGYX0",
  legalRepresentative: "李启忠",
  registeredAddress:
    "北京市昌平区景兴街18号院2号楼3层303-2471（集群注册）",
  registrationAuthority: "北京市昌平区市场监督管理局",
  registrationDate: "2025-01-15",
  travelAgencyLicenceNumber: "L-BJ10587",
  travelAgencyPermitDocumentNumber: "京文旅审〔2025〕276号",
  licensedBusinessScope: "境内旅游业务、入境旅游业务",
  travelAgencyLicenceAuthority: "北京市文化和旅游局",
  serviceEmail: "hello@homegroundchina.com",
  /** Korean visitors add this number in KakaoTalk; there is no public chat deep link by phone. */
  kakaoTalkPhone: { display: "010-6658-3226", e164: "+821066583226" },
  registryUrl: "https://www.gsxt.gov.cn/index.html",
  travelAgencyRegistryUrl: "https://mr.mct.gov.cn/",
} as const;

export type KakaoTalkPhone = { display: string; e164: string };

/** A Korean mobile number from the build-time override, or the published default. */
export function homegroundKakaoTalkPhone(configured = process.env.NEXT_PUBLIC_HOMEGROUND_KAKAOTALK_PHONE?.trim() || ""): KakaoTalkPhone {
  const compact = configured.replace(/[\s-]/g, "");
  const national = /^\+821[016789]\d{7,8}$/.test(compact) ? `0${compact.slice(3)}` : /^01[016789]\d{7,8}$/.test(compact) ? compact : "";
  if (!national) return homegroundBusiness.kakaoTalkPhone;
  const split = national.length === 11 ? 7 : 6;
  return { display: `${national.slice(0, 3)}-${national.slice(3, split)}-${national.slice(split)}`, e164: `+82${national.slice(1)}` };
}
