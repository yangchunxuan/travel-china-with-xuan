/**
 * Credits for openly licensed photos shown on the Destinations pages, city
 * pages and sight pages. Nothing is written on a photo: each credit is shown
 * on a line under the photo or under the grid or row that holds it.
 */
export interface PhotoCredit {
  readonly author: string;
  readonly license: string;
  readonly licenseUrl: string;
  readonly sourceUrl: string;
}

/**
 * The credit of each tour card's photo under an attribution licence. The
 * card photo and its rights come from docs/homeground-private-tour-card-derivatives.json
 * (`rightsBasis`); the author, licence and source are the tour's own photo
 * credit for that file. Owner photos and CC0 need none.
 */
export const tourCardCredits: Readonly<Partial<Record<string, PhotoCredit>>> = {
  "beijing-xian-shanghai-12-day-private-tour": {
    author: "Pixelflake",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Forbidden_City_-_View_from_Coal_Hill.jpg",
  },
  "changbaishan-yanji-winter-6-day-private-tour": {
    author: "Wang65",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tianchi_Changbai.JPG",
  },
  "chaozhou-shantou-nanao-5-day-private-tour": {
    author: "Akira CA",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chaozhou_Guangji_Bridge_20191211_2.jpg",
  },
  "chengdu-chongqing-8-day-private-tour": {
    author: "Jonashtand",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:202308_Hongya_Cave_at_night_from_Qiansimen_Bridge.jpg",
  },
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": {
    author: "Chensiyuan",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg",
  },
  "chengdu-pandas-sanxingdui-5-day-private-tour": {
    author: "George Lu",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg",
  },
  "chongqing-yangtze-cruise-6-day-private-tour": {
    author: "Tan Wei Liang Byorn",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Qutang_Gorge_on_Changjiang.jpg",
  },
  "guangzhou-shunde-foshan-5-day-private-tour": {
    author: "Daniel Lu (User:dllu)",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Canton_Tower_at_night_Guangzhou_2024_dllu.jpg",
  },
  "guilin-yangshuo-5-day-private-tour": {
    author: "Liuxingy",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%E6%A1%82%E6%9E%97%E9%98%B3%E6%9C%94%E5%8D%81%E9%87%8C%E7%94%BB%E5%BB%8A%E9%81%87%E9%BE%99%E6%B2%B3%E9%A3%8E%E6%99%AF_01.jpg",
  },
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": {
    author: "SONG1907",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Xijiang_Miao_Village.jpg",
  },
  "hulunbuir-7-day-private-tour": {
    author: "Sergio Tittarini",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hulunbuir_Grasslands,_Inner_Mongolia_-_9758734754.jpg",
  },
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": {
    author: "茅野ふたば",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Wangxiangu_Scenic_Area_-_25_(July_19,_2025).jpg",
  },
  "kunming-dali-lijiang-8-day-private-tour": {
    author: "CEphoto, Uwe Aranas",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_Old-town-03.jpg",
  },
  "kunming-jianshui-yuanyang-6-day-private-tour": {
    author: "Takeaway",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2007_12_02_yuanyang_rice_terraces_sunset.jpg",
  },
  "luoyang-dengfeng-kaifeng-6-day-private-tour": {
    author: "Hiroooooo",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Longmen_Grottoes,_Luoyang,_Henan.jpg",
  },
  "shanghai-disneyland-5-day-private-tour": {
    author: "Josh Grenier",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:18-03-12_ShanghaiDisney_013.jpg",
  },
  "shenzhen-family-tech-4-day-private-tour": {
    author: "Vikarna",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Futian_20220624.jpg",
  },
  "xiamen-tulou-quanzhou-6-day-private-tour": {
    author: "Jakob Montrasio",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Gulangyu.jpg",
  },
  "xinjiang-ili-sayram-8-day-private-tour": {
    author: "Tomskyhaha",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:In_Lake_Sayram_Scenic_Spot,_Xinjiang,_China_27.jpg",
  },
  "zhangjiajie-furong-fenghuang-7-day-private-tour": {
    author: "颐园居",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Wulingyuan,_Zhangjiajie,_Hunan_20230702.jpg",
  },
  "zhangye-jiayuguan-dunhuang-7-day-private-tour": {
    author: "Marcus Hsu",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Zhangye_Danxia_2016.jpg",
  },
  "huangshan-hongcun-huizhou-5-day-private-tour": {
    author: "Francesco Bandarin",
    license: "CC BY-SA 3.0 IGO",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/igo/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mount_Huangshan-110978.jpg",
  },
};
