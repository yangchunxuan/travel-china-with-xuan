import type { PrivateTourPhotoCredit } from "./privateTourPhotoCredits";

// Creative Commons photographs on the long-haul routes. The other long-haul
// images come from the owner-authorised local library and are covered by the
// page's local-photo note.
const credit = (
  en: string,
  zh: string,
  ko: string,
  author: string,
  sourceUrl: string,
  licenseLabel: string,
  licenseUrl: string,
): PrivateTourPhotoCredit => ({
  subject: { en, zh, ko },
  author,
  sourceUrl,
  licenseLabel,
  licenseUrl,
});

export const privateTourLongHaulPhotoCreditsBySlug: Readonly<
  Record<string, readonly PrivateTourPhotoCredit[]>
> = Object.freeze({
  "beijing-xian-silk-road-15-day-private-tour": [
    credit(
      "Cave entrances at the Mogao Caves",
      "莫高窟崖面洞窟",
      "막고굴 절벽의 석굴 입구",
      "eviltomthai",
      "https://commons.wikimedia.org/wiki/File:Mogao_Caves_Exterior_And_Chambers.jpeg",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/",
    ),
  ],
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour": [
    credit(
      "Early light over the Huangshan summit",
      "黄山山顶的清晨天光",
      "황산 정상의 이른 아침 빛",
      "Politizer",
      "https://commons.wikimedia.org/wiki/File:Huangshan_sunrise.jpg",
      "CC BY 3.0",
      "https://creativecommons.org/licenses/by/3.0/",
    ),
  ],
});
