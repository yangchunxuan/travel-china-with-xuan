import type { LocalizedText, PrivateTourLocale } from "./privateTourProducts";

export interface PrivateTourPhotoCredit {
  subject: LocalizedText;
  author: string;
  sourceUrl: string;
  licenseLabel: string;
  licenseUrl: string;
}

export interface LocalizedPrivateTourPhotoCredit {
  subject: string;
  author: string;
  sourceUrl: string;
  licenseLabel: string;
  licenseUrl: string;
}

const text = (en: string, zh: string, ko: string): LocalizedText => ({
  en,
  zh,
  ko,
});

const credit = (
  subject: LocalizedText,
  author: string,
  sourceUrl: string,
  licenseLabel: string,
  licenseUrl: string,
): PrivateTourPhotoCredit => ({
  subject,
  author,
  sourceUrl,
  licenseLabel,
  licenseUrl,
});

const ccBy4 = "https://creativecommons.org/licenses/by/4.0/";
const ccBySa4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const ccBySa2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const ccBy2 = "https://creativecommons.org/licenses/by/2.0/";
const cc0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

export const privateTourPhotoCreditsBySlug: Readonly<
  Record<string, readonly PrivateTourPhotoCredit[]>
> = Object.freeze({
  "shanghai-suzhou-hangzhou-6-day-private-tour": [
    credit(
      text("Pan Men, Suzhou", "苏州盘门", "쑤저우 판먼"),
      "钉钉",
      "https://commons.wikimedia.org/wiki/File:Pan_Men.jpg",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
    credit(
      text("Pingjiang Road, Suzhou", "苏州平江路", "쑤저우 핑장루"),
      "kevinmcgill",
      "https://commons.wikimedia.org/wiki/File:A_stone_arch_bridge_in_Pingjiang_Road,_Suzhou.jpg",
      "CC BY-SA 2.0",
      ccBySa2,
    ),
    credit(
      text("Hangzhou East Railway Station", "杭州东站", "항저우동역"),
      "Staeiou",
      "https://commons.wikimedia.org/wiki/File:Hangzhou_East_railway_station_interior.jpg",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
  ],
  "chengdu-pandas-sanxingdui-5-day-private-tour": [
    credit(
      text(
        "Giant panda at Chengdu Research Base",
        "成都大熊猫繁育研究基地内的大熊猫",
        "청두 자이언트판다 번식연구기지의 자이언트판다",
      ),
      "George Lu",
      "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg",
      "CC BY 2.0",
      ccBy2,
    ),
    credit(
      text("Sanxingdui New Museum", "三星堆博物馆新馆", "싼싱두이 신관"),
      "STW932",
      "https://commons.wikimedia.org/wiki/File:New_Sandingdui_Museum_02.jpg",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
  ],
  "xian-terracotta-warriors-5-day-private-tour": [
    credit(
      text("Xi'an Bell Tower at night", "西安钟楼夜景", "시안 종루 야경"),
      "TarnishedPath",
      "https://commons.wikimedia.org/wiki/File:Bell_Tower_of_Xi%27an_at_night.jpg",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
    credit(
      text("Xi'an North Railway Station", "西安北站", "시안북역"),
      "YikyuenG",
      "https://commons.wikimedia.org/wiki/File:Station_Hall_of_Xi%27an_North_Railway_Station,_Xi%27an,_Shaanxi.jpg",
      "CC BY 4.0",
      ccBy4,
    ),
  ],
  "chongqing-wulong-5-day-private-tour": [
    credit(
      text(
        "A Line 2 train at Liziba Station",
        "重庆李子坝站轻轨穿楼",
        "충칭 리쯔바역 건물 통과 열차",
      ),
      "David290",
      "https://commons.wikimedia.org/wiki/File:%E6%9D%8E%E5%AD%90%E5%9D%9D%E7%AB%99%E8%BD%BB%E8%BD%A8%E7%A9%BF%E6%A5%BC_0023.png",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
    credit(
      text("Three Natural Bridges, Wulong", "武隆天生三桥", "우룽 천생삼교"),
      "Brookqi",
      "https://commons.wikimedia.org/wiki/File:Wulongtianshengsanqiao.JPG",
      "Public Domain Mark",
      publicDomain,
    ),
    credit(
      text("Chongqing East Railway Station", "重庆东站", "충칭동역"),
      "Renek78",
      "https://commons.wikimedia.org/wiki/File:September_2025_at_Chongqing_East_Railway_Station_02.jpg",
      "CC0 1.0",
      cc0,
    ),
  ],
  "guilin-yangshuo-5-day-private-tour": [
    credit(
      text("Yulong River, Yangshuo", "阳朔遇龙河", "양숴 위룽허"),
      "Liuxingy",
      "https://commons.wikimedia.org/wiki/File:%E6%A1%82%E6%9E%97%E9%98%B3%E6%9C%94%E5%8D%81%E9%87%8C%E7%94%BB%E5%BB%8A%E9%81%87%E9%BE%99%E6%B2%B3%E9%A3%8E%E6%99%AF_01.jpg",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
    credit(
      text("Guilin Railway Station", "桂林站", "구이린역"),
      "Rat2",
      "https://commons.wikimedia.org/wiki/File:Guilin_Railway_Station_202102.jpg",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
  ],
  "harbin-winter-5-day-private-tour": [
    credit(
      text("Saint Sophia Cathedral", "圣索菲亚教堂", "성 소피아 성당"),
      "ChiralJon",
      "https://commons.wikimedia.org/wiki/File:St._Sophia_Cathedral,_Harbin,_China.jpg",
      "CC BY 2.0",
      ccBy2,
    ),
    credit(
      text("Harbin Ice and Snow Festival", "哈尔滨冰雪节", "하얼빈 빙설제"),
      "Garosio33",
      "https://commons.wikimedia.org/wiki/File:Harbin_Ice_%26_Snow_Festival_2026.jpg",
      "CC0 1.0",
      cc0,
    ),
    credit(
      text("Harbin Railway Station", "哈尔滨站", "하얼빈역"),
      "Jonashtand",
      "https://commons.wikimedia.org/wiki/File:201907_Harbin_Railway_Station_07.jpg",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
  ],
  "shanghai-suzhou-5-day-private-tour": [
    credit(
      text("Suzhou Museum", "苏州博物馆", "쑤저우박물관"),
      "Another Believer",
      "https://commons.wikimedia.org/wiki/File:Suzhou_Museum,_China_(2015)_-_01.JPG",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
    credit(
      text("Zhujiajiao water town", "朱家角水乡", "주자자오 수향마을"),
      "Chensiyuan",
      "https://commons.wikimedia.org/wiki/File:1_zhujiajiao_ancient_water_town_2023.jpg",
      "CC BY-SA 4.0",
      ccBySa4,
    ),
    credit(
      text("Humble Administrator's Garden", "拙政园", "졸정원"),
      "Chainwit.",
      "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_(2024)_-_img_01.jpg",
      "CC BY 4.0",
      ccBy4,
    ),
  ],
  "beijing-highlights-5-day-private-tour": [
    credit(
      text("Temple of Heaven", "北京天坛", "베이징 천단공원"),
      "xiquinhosilva / Xiquinho Silva",
      "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven_-_Hall_of_Prayer_for_Good_Harvests_01.jpg",
      "CC BY 2.0",
      ccBy2,
    ),
  ],
});

export const privateTourPhotoCreditCopy = {
  en: {
    title: "Photo credits",
    intro:
      "The location-specific external photographs are credited below. They were cropped, resized and converted to WebP; no generative edits were made.",
    by: "Photo by",
    localNote:
      "All remaining photographs were selected from the Homeground project library and authorised by the site owner for this website. Only routine cropping, resizing and format conversion were applied.",
  },
  zh: {
    title: "图片来源与授权",
    intro:
      "地点明确的外部照片在下方逐张标注。本站只做裁切、缩放与 WebP 格式转换，没有生成式修改。",
    by: "摄影",
    localNote:
      "其余照片由网站负责人从 Homeground 项目素材库选用并授权用于本站，仅做常规裁切、缩放和格式转换。",
  },
  ko: {
    title: "사진 출처 및 라이선스",
    intro:
      "장소가 확인된 외부 사진의 출처를 아래에 표시했습니다. 자르기, 크기 조정과 WebP 변환만 했으며 생성형 편집은 사용하지 않았습니다.",
    by: "촬영",
    localNote:
      "나머지 사진은 사이트 소유자가 Homeground 프로젝트 자료실에서 선택해 이 웹사이트 사용을 승인했습니다. 일반적인 자르기, 크기 조정과 형식 변환만 적용했습니다.",
  },
} as const;

export function getLocalizedPrivateTourPhotoCredits(
  slug: string,
  locale: PrivateTourLocale,
): readonly LocalizedPrivateTourPhotoCredit[] {
  return (privateTourPhotoCreditsBySlug[slug] ?? []).map((item) => ({
    subject: item.subject[locale],
    author: item.author,
    sourceUrl: item.sourceUrl,
    licenseLabel: item.licenseLabel,
    licenseUrl: item.licenseUrl,
  }));
}
