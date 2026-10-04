import type { PrivateTourImage, PrivateTourProduct } from "./privateTourProducts";
import type { PrivateTourPhotoCredit } from "./privateTourPhotoCredits";

type Replacement = Readonly<{
  oldSrc: string; src: string; width: number; height: number;
  products: readonly string[]; replacesSourceUrl: string | null;
  credit: PrivateTourPhotoCredit; text?: PrivateTourImage["alt"];
  objectPosition?: string;
}>;

/** Genuine high-resolution source photos; see the dated source manifest. */
const replacements: readonly Replacement[] = [
  {
    "oldSrc": "/images/tours/shared-scenes/zhenyuan-1600.webp",
    "src": "/images/tours/photo-quality-20261004/zhenyuan.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "guizhou-huangguoshu-libo-miao-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Wuyang_River_in_Zhenyuan_County_13.jpg",
    "credit": {
      "subject": {
        "en": "Zhenyuan riverside",
        "zh": "镇远古城河畔",
        "ko": "전위안 강변"
      },
      "author": "Huangdan2060",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Wuyang_River_in_Zhenyuan_County_13.jpg",
      "licenseLabel": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/chengqi-1600.webp",
    "src": "/images/tours/photo-quality-20261004/chengqi.webp",
    "width": 2560,
    "height": 1600,
    "products": [
      "xiamen-tulou-quanzhou-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Chengqi_Tulou_20140829.JPG",
    "credit": {
      "subject": {
        "en": "Chengqi Lou",
        "zh": "承启楼",
        "ko": "청치러우"
      },
      "author": "颐园新居",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chengqi_Tulou_20140829.JPG",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/xidi-1600.webp",
    "src": "/images/tours/photo-quality-20261004/xidi.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "huangshan-hongcun-huizhou-5-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Xidi_2.jpg",
    "credit": {
      "subject": {
        "en": "Xidi village",
        "zh": "西递古村",
        "ko": "시디 마을"
      },
      "author": "EditQ",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Xidi_2.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/sanqingshan-1600.webp",
    "src": "/images/tours/photo-quality-20261004/sanqingshan.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "jingdezhen-wuyuan-wangxian-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Sanqing_Mountain_is_surrounded_by_clouds_and_mists1.jpg",
    "credit": {
      "subject": {
        "en": "Sanqingshan",
        "zh": "三清山",
        "ko": "싼칭산"
      },
      "author": "Huangdan2060",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sanqing_Mountain_is_surrounded_by_clouds_and_mists1.jpg",
      "licenseLabel": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/shangrao-1600.webp",
    "src": "/images/tours/photo-quality-20261004/shangrao.webp",
    "width": 3200,
    "height": 2127,
    "products": [
      "jingdezhen-wuyuan-wangxian-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:201705_Station_building_and_Tracks_at_Shangrao_Station.jpg",
    "credit": {
      "subject": {
        "en": "Shangrao railway station",
        "zh": "上饶站",
        "ko": "상라오역"
      },
      "author": "MNXANL",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:201705_Station_building_and_Tracks_at_Shangrao_Station.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/changbai-1600.webp",
    "src": "/images/tours/photo-quality-20261004/changbai.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "changbaishan-yanji-winter-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Antu2.jpg",
    "credit": {
      "subject": {
        "en": "Changbai winter scenery",
        "zh": "长白山冬景",
        "ko": "창바이산 겨울 풍경"
      },
      "author": "冥想",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Antu2.jpg",
      "licenseLabel": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/zhengzhou-1600.webp",
    "src": "/images/tours/photo-quality-20261004/zhengzhou.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "luoyang-dengfeng-kaifeng-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Zhengzhou_Greenland_Central_Plaza_on_29_Oct_2018.jpg",
    "credit": {
      "subject": {
        "en": "Zhengzhou city",
        "zh": "郑州城市风景",
        "ko": "정저우 도시 풍경"
      },
      "author": "Windmemories",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Zhengzhou_Greenland_Central_Plaza_on_29_Oct_2018.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/whitehorse-1600.webp",
    "src": "/images/tours/photo-quality-20261004/whitehorse.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "luoyang-dengfeng-kaifeng-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:2011-06_White_Horse_Temple_02.jpg",
    "credit": {
      "subject": {
        "en": "White Horse Temple",
        "zh": "洛阳白马寺",
        "ko": "뤄양 백마사"
      },
      "author": "Gary Todd",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:2011-06_White_Horse_Temple_02.jpg",
      "licenseLabel": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/dam-1600.webp",
    "src": "/images/tours/photo-quality-20261004/dam.webp",
    "width": 3200,
    "height": 1775,
    "products": [
      "chongqing-yangtze-cruise-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Three_Gorges_Dam_2015-07-25.jpg",
    "credit": {
      "subject": {
        "en": "Three Gorges Dam",
        "zh": "三峡大坝",
        "ko": "싼샤댐"
      },
      "author": "Thomas  Bächinger",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Three_Gorges_Dam_2015-07-25.jpg",
      "licenseLabel": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/datong-1600.webp",
    "src": "/images/tours/photo-quality-20261004/datong.webp",
    "width": 2560,
    "height": 1707,
    "products": [
      "datong-pingyao-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Datong_Ancient_City_Wall_01.jpg",
    "credit": {
      "subject": {
        "en": "Datong city wall",
        "zh": "大同城墙",
        "ko": "다퉁 성벽"
      },
      "author": "xiquinhosilva",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Datong_Ancient_City_Wall_01.jpg",
      "licenseLabel": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/jinci-1600.webp",
    "src": "/images/tours/photo-quality-20261004/jinci.webp",
    "width": 3000,
    "height": 1743,
    "products": [
      "datong-pingyao-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Jinci_Temple_74032-Taiyuan_(49222875647).jpg",
    "credit": {
      "subject": {
        "en": "Jinci Temple",
        "zh": "晋祠",
        "ko": "진츠"
      },
      "author": "xiquinhosilva",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Jinci_Temple_74032-Taiyuan_(49222875647).jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/genhe-1600.webp",
    "src": "/images/tours/photo-quality-20261004/genhe.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "hulunbuir-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Gegengol_in_Greater_Khingan_forest2017.jpg",
    "credit": {
      "subject": {
        "en": "Genhe forest country",
        "zh": "根河森林风景",
        "ko": "건허 산림 풍경"
      },
      "author": "Charlie fong",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Gegengol_in_Greater_Khingan_forest2017.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/manzhouli-1600.webp",
    "src": "/images/tours/photo-quality-20261004/manzhouli.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "hulunbuir-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Manzhouli_view.jpg",
    "credit": {
      "subject": {
        "en": "Manzhouli city",
        "zh": "满洲里城市风景",
        "ko": "만저우리 도시 풍경"
      },
      "author": "Alexander V. Solomin",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Manzhouli_view.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/hulun-1600.webp",
    "src": "/images/tours/photo-quality-20261004/hulun.webp",
    "width": 3200,
    "height": 1874,
    "products": [
      "hulunbuir-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:HulunLake2.jpg",
    "credit": {
      "subject": {
        "en": "Hulun Lake",
        "zh": "呼伦湖",
        "ko": "후룬호"
      },
      "author": "Fanghong",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:HulunLake2.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/gorge-1600.webp",
    "src": "/images/tours/photo-quality-20261004/gorge.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "beijing-xian-yunnan-14-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Yunnan_China_Tiger-Leaping-Gorge-01.jpg",
    "credit": {
      "subject": {
        "en": "Tiger Leaping Gorge",
        "zh": "虎跳峡",
        "ko": "후탸오샤"
      },
      "author": "CEphoto, Uwe Aranas",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Yunnan_China_Tiger-Leaping-Gorge-01.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/songzanlin-1600.webp",
    "src": "/images/tours/photo-quality-20261004/songzanlin.webp",
    "width": 3200,
    "height": 1159,
    "products": [
      "beijing-xian-yunnan-14-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:1_songzanlin_monastery_yunnan_2018.jpg",
    "credit": {
      "subject": {
        "en": "Songzanlin Monastery",
        "zh": "松赞林寺",
        "ko": "쑹짠린쓰"
      },
      "author": "Chensiyuan",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:1_songzanlin_monastery_yunnan_2018.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/jiaohe-1600.webp",
    "src": "/images/tours/photo-quality-20261004/jiaohe.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "beijing-xian-silk-road-15-day-private-tour",
      "beijing-xian-silk-road-15-day-small-group-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Jiaohe_City(Yarkhoto),Turpan,Xinjiang_HY7.jpg",
    "credit": {
      "subject": {
        "en": "Jiaohe ruins, Turpan",
        "zh": "吐鲁番交河故城",
        "ko": "투루판 자오허 고성"
      },
      "author": "Hiroooooo",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Jiaohe_City(Yarkhoto),Turpan,Xinjiang_HY7.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  },
  {
    "oldSrc": "/images/tours/shared-scenes/urumqi-1600.webp",
    "src": "/images/tours/photo-quality-20261004/urumqi.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "xinjiang-ili-sayram-8-day-private-tour",
      "beijing-xian-silk-road-15-day-private-tour",
      "beijing-xian-silk-road-15-day-small-group-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Urumqi_skyline_(3).jpg",
    "credit": {
      "subject": {
        "en": "Urumqi from Hongshan",
        "zh": "红山所见乌鲁木齐",
        "ko": "훙산에서 본 우루무치"
      },
      "author": "Radosław Botev",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Urumqi_skyline_(3).jpg",
      "licenseLabel": "CC BY 3.0 pl",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0/pl/deed.en"
    }
  },
  {
    "oldSrc": "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/hero-panda-1600.webp",
    "src": "/images/tours/photo-quality-20261004/panda.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "chengdu-pandas-sanxingdui-5-day-private-tour",
      "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
      "chengdu-chongqing-8-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
      "china-grand-tour-21-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg",
    "credit": {
      "subject": {
        "en": "Chengdu Panda Base",
        "zh": "成都熊猫基地",
        "ko": "청두 판다기지"
      },
      "author": "George Lu",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    "text": {
      "en": "Chengdu Panda Base",
      "zh": "成都熊猫基地",
      "ko": "청두 판다기지"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/guides/sanxingdui-museum-booking-and-gallery-order/hero-1600.webp",
    "src": "/images/tours/photo-quality-20261004/sanxingdui.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "chengdu-pandas-sanxingdui-5-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
      "china-grand-tour-21-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:New_Sandingdui_Museum_02.jpg",
    "credit": {
      "subject": {
        "en": "Sanxingdui Museum",
        "zh": "三星堆博物馆",
        "ko": "싼싱두이박물관"
      },
      "author": "STW932",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:New_Sandingdui_Museum_02.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "text": {
      "en": "Sanxingdui Museum",
      "zh": "三星堆博物馆",
      "ko": "싼싱두이박물관"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/tours/shared-scenes/volga-1600.webp",
    "src": "/images/tours/photo-quality-20261004/volga.webp",
    "width": 2880,
    "height": 3840,
    "products": [
      "harbin-winter-5-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%93%88%E5%B0%94%E6%BB%A8%E4%BC%8F%E5%B0%94%E5%8A%A0%E5%BA%84%E5%9B%AD%E4%B8%AD%E7%9A%84%E5%9C%A3%E2%80%A2%E5%B0%BC%E5%8F%A4%E6%8B%89%E5%A4%A7%E6%95%99%E5%A0%82.jpg",
    "credit": {
      "subject": {
        "en": "Volga Manor",
        "zh": "伏尔加庄园",
        "ko": "볼가 장원"
      },
      "author": "Hehua",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%93%88%E5%B0%94%E6%BB%A8%E5%9C%A3%E5%B0%BC%E5%8F%A4%E6%8B%89%E6%95%99%E5%A0%82_%E4%BC%8F%E5%B0%94%E5%8A%A0%E5%BA%84%E5%9B%AD_20240519.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "text": {
      "en": "Volga Manor",
      "zh": "伏尔加庄园",
      "ko": "볼가 장원"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/tours/shared-scenes/hailar-1600.webp",
    "src": "/images/tours/photo-quality-20261004/hailar.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "hulunbuir-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:%E6%B5%B7%E6%8B%89%E5%B0%94_Hailar_-_panoramio.jpg",
    "credit": {
      "subject": {
        "en": "Hailar",
        "zh": "海拉尔",
        "ko": "하이라얼"
      },
      "author": "Liuxingy",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E6%B5%B7%E6%8B%89%E5%B0%94_%E4%BF%AF%E7%9E%B0%E5%9F%8E%E5%8C%BA_03.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "text": {
      "en": "Hailar",
      "zh": "海拉尔",
      "ko": "하이라얼"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/tours/shared-scenes/taiyuan-1600.webp",
    "src": "/images/tours/photo-quality-20261004/taiyuan.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "datong-pingyao-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Fen_River_Park_Taiyuan_20110709.jpg",
    "credit": {
      "subject": {
        "en": "Fen River, Taiyuan",
        "zh": "太原汾河",
        "ko": "타이위안 펀허"
      },
      "author": "lienyuan lee",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E6%B1%BE%E6%B2%B3_Fen_River_-_panoramio.jpg",
      "licenseLabel": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0"
    },
    "text": {
      "en": "Fen River, Taiyuan",
      "zh": "太原汾河",
      "ko": "타이위안 펀허"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/tours/shared-scenes/tianchi-1600.webp",
    "src": "/images/tours/photo-quality-20261004/tianchi.webp",
    "width": 3200,
    "height": 1259,
    "products": [
      "beijing-xian-silk-road-15-day-private-tour",
      "beijing-xian-silk-road-15-day-small-group-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Tianshan_tianchi.jpg",
    "credit": {
      "subject": {
        "en": "Tianchi Lake, Tianshan",
        "zh": "天山天池",
        "ko": "톈산 천지"
      },
      "author": "Babak Fakhamzadeh from São Paulo, Brazil",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tian_Chi_(8869581842).jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    "text": {
      "en": "Tianchi Lake, Tianshan",
      "zh": "天山天池",
      "ko": "톈산 천지"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/destinations/shanghai/bund-architecture-1200.webp",
    "src": "/images/tours/photo-quality-20261004/bund.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "shanghai-suzhou-hangzhou-6-day-private-tour",
      "shanghai-disneyland-5-day-private-tour",
      "beijing-xian-shanghai-12-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
      "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
      "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
      "china-grand-tour-21-day-private-tour",
      "beijing-xian-guilin-shanghai-10-day-private-tour",
      "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
      "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
      "beijing-xian-shanghai-8-day-private-tour",
      "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour"
    ],
    "replacesSourceUrl": null,
    "credit": {
      "subject": {
        "en": "The Bund, Shanghai",
        "zh": "上海外滩",
        "ko": "상하이 와이탄"
      },
      "author": "Another Believer",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:The_Bund,_Shanghai,_China_(December_2015)_-_11.JPG",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "text": {
      "en": "The Bund, Shanghai",
      "zh": "上海外滩",
      "ko": "상하이 와이탄"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/destinations/chengdu/jinjiang-bridge-1200.webp",
    "src": "/images/tours/photo-quality-20261004/jinjiang.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "chengdu-pandas-sanxingdui-5-day-private-tour",
      "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
      "china-grand-tour-21-day-private-tour"
    ],
    "replacesSourceUrl": null,
    "credit": {
      "subject": {
        "en": "Jin River, Chengdu",
        "zh": "成都锦江",
        "ko": "청두 진강"
      },
      "author": "tyrosin",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Anshun_Bridge_Chengdu.jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    "text": {
      "en": "Jin River, Chengdu",
      "zh": "成都锦江",
      "ko": "청두 진강"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/destinations/chengdu/dujiangyan-1200.webp",
    "src": "/images/tours/photo-quality-20261004/dujiangyan.webp",
    "width": 3200,
    "height": 1800,
    "products": [
      "chengdu-pandas-sanxingdui-5-day-private-tour"
    ],
    "replacesSourceUrl": null,
    "credit": {
      "subject": {
        "en": "Dujiangyan",
        "zh": "都江堰",
        "ko": "도강언"
      },
      "author": "RG72",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dujiangyan-kanalo_18.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "text": {
      "en": "Dujiangyan",
      "zh": "都江堰",
      "ko": "도강언"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/destinations/xian/dayanta-1200.webp",
    "src": "/images/tours/photo-quality-20261004/dayanta.webp",
    "width": 2560,
    "height": 1920,
    "products": [
      "xian-terracotta-warriors-5-day-private-tour"
    ],
    "replacesSourceUrl": null,
    "credit": {
      "subject": {
        "en": "Giant Wild Goose Pagoda",
        "zh": "大雁塔",
        "ko": "대안탑"
      },
      "author": "颐园新居",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Giant_Wild_Goose_Pagoda_20140502.JPG",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    "text": {
      "en": "Giant Wild Goose Pagoda",
      "zh": "大雁塔",
      "ko": "대안탑"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/destinations/xian/terracotta-pit-one-1200.webp",
    "src": "/images/tours/photo-quality-20261004/terracotta.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "xian-terracotta-warriors-5-day-private-tour",
      "beijing-xian-shanghai-12-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
      "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
      "beijing-xian-silk-road-15-day-private-tour",
      "beijing-xian-silk-road-15-day-small-group-tour",
      "beijing-xian-yunnan-14-day-private-tour",
      "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
      "china-grand-tour-21-day-private-tour",
      "beijing-xian-guilin-shanghai-10-day-private-tour",
      "beijing-xian-shanghai-8-day-private-tour",
      "beijing-xian-guilin-hong-kong-10-day-private-tour",
      "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour"
    ],
    "replacesSourceUrl": null,
    "credit": {
      "subject": {
        "en": "Terracotta Army, Pit 1",
        "zh": "兵马俑一号坑",
        "ko": "병마용 1호갱"
      },
      "author": "Gary Todd from Xinzheng, China",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Qin_Terracotta_Army,_Pit_1_(9895750725).jpg",
      "licenseLabel": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    "text": {
      "en": "Terracotta Army, Pit 1",
      "zh": "兵马俑一号坑",
      "ko": "병마용 1호갱"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/destinations/beijing/great-wall-1200.webp",
    "src": "/images/tours/photo-quality-20261004/wall.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "beijing-highlights-5-day-private-tour",
      "beijing-xian-shanghai-12-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
      "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
      "beijing-xian-silk-road-15-day-private-tour",
      "beijing-xian-silk-road-15-day-small-group-tour",
      "beijing-xian-yunnan-14-day-private-tour",
      "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
      "china-grand-tour-21-day-private-tour",
      "beijing-xian-guilin-shanghai-10-day-private-tour",
      "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
      "beijing-xian-shanghai-8-day-private-tour",
      "beijing-xian-guilin-hong-kong-10-day-private-tour",
      "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour"
    ],
    "replacesSourceUrl": null,
    "credit": {
      "subject": {
        "en": "Great Wall near Beijing",
        "zh": "北京长城",
        "ko": "베이징 만리장성"
      },
      "author": "Francesco Bini",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mutianyu,_grande_muraglia_cinese,_veduta_(autunno_2024)_11.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "text": {
      "en": "Great Wall near Beijing",
      "zh": "北京长城",
      "ko": "베이징 만리장성"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/destinations/chongqing/wulong-1200.webp",
    "src": "/images/tours/photo-quality-20261004/wulong.webp",
    "width": 2848,
    "height": 2136,
    "products": [
      "chongqing-wulong-5-day-private-tour",
      "chengdu-chongqing-8-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Wulongtianshengsanqiao.JPG",
    "credit": {
      "subject": {
        "en": "Three Natural Bridges, Wulong",
        "zh": "武隆天生三桥",
        "ko": "우롱 천생삼교"
      },
      "author": "Nyx Ning",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E9%87%8D%E5%BA%86-%E6%AD%A6%E9%9A%86-%E5%A4%A9%E5%9D%91%E5%86%85%E5%A4%A9%E7%94%9F%E6%A1%A5_-_panoramio.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    "text": {
      "en": "Three Natural Bridges, Wulong",
      "zh": "武隆天生三桥",
      "ko": "우롱 천생삼교"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/destinations/chongqing/chongqing-east-station-1200.webp",
    "src": "/images/tours/photo-quality-20261004/chongqing-east.webp",
    "width": 3200,
    "height": 1802,
    "products": [
      "chongqing-wulong-5-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:September_2025_at_Chongqing_East_Railway_Station_02.jpg",
    "credit": {
      "subject": {
        "en": "Chongqing East Railway Station",
        "zh": "重庆东站",
        "ko": "충칭동역"
      },
      "author": "Renek78",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:September_2025_at_Chongqing_East_Railway_Station_02.jpg",
      "licenseLabel": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    }
  },
  {
    "oldSrc": "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/furong-waterfall-1280.webp",
    "src": "/images/tours/photo-quality-20261004/furong-waterfall.webp",
    "width": 3200,
    "height": 1855,
    "products": [
      "zhangjiajie-furong-fenghuang-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:1_furong_panorama_2012.jpg",
    "credit": {
      "subject": {
        "en": "Furong Town waterfall",
        "zh": "芙蓉镇瀑布",
        "ko": "부용진 폭포"
      },
      "author": "chensiyuan",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:1_furong_panorama_2012.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "oldSrc": "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/furong-night-960.webp",
    "src": "/images/tours/photo-quality-20261004/furong-night.webp",
    "width": 2160,
    "height": 3840,
    "products": [
      "zhangjiajie-furong-fenghuang-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Furongzhen_nuit.jpg",
    "credit": {
      "subject": {
        "en": "Furong Town at night",
        "zh": "芙蓉镇夜景",
        "ko": "부용진 야경"
      },
      "author": "Popolon",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Furongzhen_nuit.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  },
  {
    "oldSrc": "/images/guides/border-town-fenghuang-chadong-shen-congwen/tuojiang-stepping-stones-1126.webp",
    "src": "/images/tours/photo-quality-20261004/fenghuang-river.webp",
    "width": 2560,
    "height": 1707,
    "products": [
      "zhangjiajie-furong-fenghuang-7-day-private-tour",
      "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Fenghuang_Ancient_Town.jpg",
    "credit": {
      "subject": {
        "en": "Tuo River, Fenghuang",
        "zh": "凤凰沱江",
        "ko": "봉황 타강"
      },
      "author": "xiquinhosilva",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_12.jpg",
      "licenseLabel": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    "text": {
      "en": "Tuo River, Fenghuang",
      "zh": "凤凰沱江",
      "ko": "봉황 타강"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/tours/guizhou-huangguoshu-libo-miao-7-day-private-tour/gallery-1.webp",
    "src": "/images/tours/photo-quality-20261004/huangguoshu.webp",
    "width": 2061,
    "height": 3840,
    "products": [
      "guizhou-huangguoshu-libo-miao-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Huangguoshu_Waterfall_2.jpg",
    "credit": {
      "subject": {
        "en": "Huangguoshu Waterfall",
        "zh": "黄果树瀑布",
        "ko": "황궈수 폭포"
      },
      "author": "Dounai",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Huangguoshu_Waterfall_2.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  },
  {
    "oldSrc": "/images/destinations/chongqing/dazu-1200.webp",
    "src": "/images/tours/photo-quality-20261004/dazu.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "chengdu-chongqing-8-day-private-tour",
      "chongqing-yangtze-cruise-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Dazu_rock_carvings_-_Baodingshan,_%E5%A4%A7%E8%B6%B3%E7%9F%B3%E5%88%BB-%E5%AE%9D%E9%A1%B6%E5%B1%B1%E6%91%A9%E5%B4%96%E9%80%A0%E5%83%8F,_Chongqing,_2023_(53563776088).jpg",
    "credit": {
      "subject": {
        "en": "Dazu Rock Carvings",
        "zh": "大足石刻",
        "ko": "다쭈석각"
      },
      "author": "JL Cogburn",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dazu_rock_carvings_-_Baodingshan,_%E5%A4%A7%E8%B6%B3%E7%9F%B3%E5%88%BB-%E5%AE%9D%E9%A1%B6%E5%B1%B1%E6%91%A9%E5%B4%96%E9%80%A0%E5%83%8F,_Chongqing,_2023_(53563776088).jpg",
      "licenseLabel": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  },
  {
    "oldSrc": "/images/tours/huangshan-hongcun-huizhou-5-day-private-tour/gallery-1.webp",
    "src": "/images/tours/photo-quality-20261004/hongcun.webp",
    "width": 3200,
    "height": 2400,
    "products": [
      "huangshan-hongcun-huizhou-5-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Huangshan_11.jpg",
    "credit": {
      "subject": {
        "en": "Moon Pond, Hongcun",
        "zh": "宏村月沼",
        "ko": "훙춘 월소"
      },
      "author": "EditQ",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Moon_Pond,_Hongcun.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "text": {
      "en": "Moon Pond, Hongcun",
      "zh": "宏村月沼",
      "ko": "훙춘 월소"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/tours/huangshan-hongcun-huizhou-5-day-private-tour/route-day-2.webp",
    "src": "/images/tours/photo-quality-20261004/greeting-pine.webp",
    "width": 3200,
    "height": 2133,
    "products": [
      "huangshan-hongcun-huizhou-5-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Huangshan_Yingkesong.jpg",
    "credit": {
      "subject": {
        "en": "Greeting Pine, Huangshan",
        "zh": "黄山迎客松",
        "ko": "황산 영객송"
      },
      "author": "De-Shao Liu (Terry850324)",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Huangshan,_September_2018_27.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "text": {
      "en": "Greeting Pine, Huangshan",
      "zh": "黄山迎客松",
      "ko": "황산 영객송"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/tours/luoyang-dengfeng-kaifeng-6-day-private-tour/gallery-1.webp",
    "src": "/images/tours/photo-quality-20261004/shaolin.webp",
    "width": 2560,
    "height": 3840,
    "products": [
      "luoyang-dengfeng-kaifeng-6-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Shaolin_Temple_(10199309404).jpg",
    "credit": {
      "subject": {
        "en": "Shaolin Temple",
        "zh": "少林寺",
        "ko": "소림사"
      },
      "author": "Gary Todd from Xinzheng, China",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Shaolin_Temple_(10199309404).jpg",
      "licenseLabel": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    }
  },
  {
    "oldSrc": "/images/tours/hulunbuir-7-day-private-tour/gallery-1.webp",
    "src": "/images/tours/photo-quality-20261004/horses.webp",
    "width": 3200,
    "height": 2119,
    "products": [
      "hulunbuir-7-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Horses_in_Zhalatu.jpg",
    "credit": {
      "subject": {
        "en": "Horses on the Hulunbuir grasslands",
        "zh": "呼伦贝尔草原上的马群",
        "ko": "후룬베이얼 초원의 말"
      },
      "author": "User:Popolon",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hulunbuir.cheveaux_steppe.jpg",
      "licenseLabel": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    "text": {
      "en": "Horses on the Hulunbuir grasslands",
      "zh": "呼伦贝尔草原上的马群",
      "ko": "후룬베이얼 초원의 말"
    },
    "objectPosition": "50% 50%"
  },
  {
    "oldSrc": "/images/tours/shenzhen-family-tech-4-day-private-tour/route-day-2.webp",
    "src": "/images/tours/photo-quality-20261004/huaqiangbei.webp",
    "width": 2879,
    "height": 3840,
    "products": [
      "shenzhen-family-tech-4-day-private-tour"
    ],
    "replacesSourceUrl": "https://commons.wikimedia.org/wiki/File:Huaqiangbei%26Shennan_Cross2021.jpg",
    "credit": {
      "subject": {
        "en": "Huaqiangbei, Shenzhen",
        "zh": "深圳华强北",
        "ko": "선전 화창베이"
      },
      "author": "Charlie fong",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Huaqiangbei%26Shennan_Cross2021.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  }
];

const byOldSource = new Map(replacements.map(item => [item.oldSrc, item]));
const byNewSource = new Map(replacements.map(item => [item.src, item]));

export function originalPrivateTourPhotoSource(src: string): string {
  return byNewSource.get(src)?.oldSrc ?? src;
}

function upgrade(image: PrivateTourImage): PrivateTourImage {
  const replacement = byOldSource.get(image.src);
  if (!replacement) return image;
  return {
    ...image, src: replacement.src, width: replacement.width, height: replacement.height,
    ...(replacement.objectPosition ? { objectPosition: replacement.objectPosition } : {}),
    ...(replacement.text ? { alt: replacement.text, caption: replacement.text } : {}),
  };
}

export function withPrivateTourPhotoQuality(product: PrivateTourProduct): PrivateTourProduct {
  return {
    ...product,
    heroImage: upgrade(product.heroImage),
    gallery: product.gallery.map(upgrade),
    routeMedia: product.routeMedia?.map(group => ({
      ...group, variants: group.variants.map(variant => ({ ...variant, image: upgrade(variant.image) })),
    })),
  };
}

function sourceKey(url: string): string {
  return decodeURIComponent(url).replaceAll("_", " ");
}

export function applyPrivateTourQualityCredits(slug: string, credits: readonly PrivateTourPhotoCredit[]): readonly PrivateTourPhotoCredit[] {
  const used = replacements.filter(item => item.products.includes(slug));
  const replaced = new Set(used.flatMap(item => item.replacesSourceUrl ? [sourceKey(item.replacesSourceUrl)] : []));
  return [ ...credits.filter(credit => !replaced.has(sourceKey(credit.sourceUrl))), ...used.map(item => item.credit) ];
}
