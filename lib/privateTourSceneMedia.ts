import type { LocalizedText, PrivateTourImage, PrivateTourRouteMediaGroup } from "./privateTourProducts";
import type { PrivateTourPhotoCredit } from "./privateTourPhotoCredits";

// Reuses only real photographs already published with documented Homeground website rights.
// Slug/day assignments were checked against the English itinerary; no product text or price changes.
type SceneAsset = Readonly<{ image: PrivateTourImage; label: LocalizedText; credit: PrivateTourPhotoCredit | null; provenance: string; rightsBasis: "published-license" | "owner-authorized-website-library" }>;
type SceneMode = "scene" | "preview" | "option";
type SceneAssignment = Readonly<{ day: number; items: readonly Readonly<{ asset: string; mode: SceneMode }>[] }>;

export const privateTourSceneAssets: Readonly<Record<string, SceneAsset>> = {
  "beijing-city": {
    "image": {
      "src": "/images/tours/beijing-highlights-5-day-private-tour/arrival-beijing-city-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Beijing's elevated roads and modern skyline after dark",
        "zh": "入夜后的北京立交与现代城市天际线",
        "ko": "밤의 베이징 고가도로와 현대 스카이라인"
      },
      "caption": {
        "en": "Your first night in Beijing · airport and hotel transfer confirmed for your booking",
        "zh": "抵达北京的第一晚 · 机场与酒店接送按你的订单确认",
        "ko": "베이징 도착 첫날 · 공항과 호텔 이동은 예약에 맞춰 확정"
      }
    },
    "label": {
      "en": "Beijing city",
      "zh": "北京城市风景",
      "ko": "베이징 도시 풍경"
    },
    "credit": null,
    "provenance": "beijing-highlights-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "beijing-departure": {
    "image": {
      "src": "/images/tours/beijing-highlights-5-day-private-tour/departure-beijing-layers-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Beijing's historic roofs with the modern CBD in the distance",
        "zh": "北京历史屋顶与远处的现代 CBD",
        "ko": "베이징의 역사적 지붕과 멀리 보이는 현대 CBD"
      },
      "caption": {
        "en": "Old and new Beijing in one view · airport and transfer time follow your booked flight",
        "zh": "古今北京同框，为行程收尾 · 机场与送机时间按已订航班确认",
        "ko": "역사와 현대의 베이징이 한 장면에 · 공항과 이동 시간은 예약된 항공편에 맞춤"
      }
    },
    "label": {
      "en": "Beijing city",
      "zh": "北京城市风景",
      "ko": "베이징 도시 풍경"
    },
    "credit": null,
    "provenance": "beijing-highlights-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "forbidden-city": {
    "image": {
      "src": "/images/tours/beijing-highlights-5-day-private-tour/forbidden-city-corridor-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A red palace corridor inside Beijing's Forbidden City",
        "zh": "北京故宫内的红色宫廊",
        "ko": "베이징 자금성 안의 붉은 회랑"
      },
      "caption": {
        "en": "The palace as you see it on foot · Tiananmen and Forbidden City entry depends on a successful advance reservation",
        "zh": "步行所见的故宫宫廊 · 天安门和故宫须实名预约成功才能进入",
        "ko": "걸으며 만나는 자금성 회랑 · 톈안먼과 자금성은 사전 실명 예약에 성공해야 입장 가능"
      }
    },
    "label": {
      "en": "Forbidden City",
      "zh": "故宫",
      "ko": "자금성"
    },
    "credit": null,
    "provenance": "beijing-highlights-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "forbidden-tower": {
    "image": {
      "src": "/images/tours/beijing-highlights-5-day-private-tour/gallery-forbidden-corner-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A Forbidden City corner tower reflected in the moat at dusk",
        "zh": "暮色中倒映在护城河里的故宫角楼",
        "ko": "해 질 무렵 해자에 비친 자금성 각루"
      },
      "caption": {
        "en": "Forbidden City corner tower · entry needs a successful real-name reservation",
        "zh": "故宫角楼 · 入内需实名预约成功",
        "ko": "자금성 각루 · 입장은 실명 예약에 성공해야 가능"
      }
    },
    "label": {
      "en": "Forbidden City corner tower",
      "zh": "故宫角楼",
      "ko": "자금성 각루"
    },
    "credit": null,
    "provenance": "beijing-highlights-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "temple-heaven": {
    "image": {
      "src": "/images/tours/beijing-highlights-5-day-private-tour/temple-of-heaven-2024-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "The complete Hall of Prayer for Good Harvests under a blue sky in September 2024",
        "zh": "2024 年 9 月蓝天下完整可见的北京天坛祈年殿",
        "ko": "2024년 9월 푸른 하늘 아래 온전히 보이는 베이징 천단공원 기년전"
      },
      "caption": {
        "en": "Hall of Prayer for Good Harvests · entrance gate and route inside the park can vary",
        "zh": "天坛祈年殿 · 入园门和园内路线可能会变",
        "ko": "천단공원 기년전 · 입장 문과 공원 안 동선은 달라질 수 있음"
      }
    },
    "label": {
      "en": "Temple of Heaven",
      "zh": "天坛",
      "ko": "톈탄"
    },
    "credit": {
      "subject": {
        "en": "Temple of Heaven",
        "zh": "北京天坛",
        "ko": "베이징 천단공원"
      },
      "author": "xiquinhosilva / Xiquinho Silva",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven_-_Hall_of_Prayer_for_Good_Harvests_01.jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    },
    "provenance": "beijing-highlights-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "summer-palace": {
    "image": {
      "src": "/images/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/route-day-4.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Seventeen-Arch Bridge at the Summer Palace",
        "zh": "颐和园十七孔桥",
        "ko": "이화원 십칠공교"
      },
      "caption": {
        "en": "Four Beijing nights let the sights spread out over several days.",
        "zh": "北京住 4 晚，景点不用挤在同一天。",
        "ko": "베이징에서 4박해 명소를 여러 날에 나눠 봅니다."
      }
    },
    "label": {
      "en": "Summer Palace",
      "zh": "颐和园",
      "ko": "이화원"
    },
    "credit": null,
    "provenance": "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "great-wall": {
    "image": {
      "src": "/images/destinations/beijing/great-wall-1200.webp",
      "width": 1200,
      "height": 750,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A restored Great Wall section on mountain ridges north of Beijing",
        "zh": "北京北部山脊上的一段修复长城",
        "ko": "베이징 북부 산등성이의 복원된 만리장성 구간"
      },
      "caption": {
        "en": "A Great Wall ridge, not identified as Badaling · your Badaling reservation, entry and attraction transport are confirmed separately",
        "zh": "山脊上的长城，未标明为八达岭 · 行程中的八达岭预约、入园和景交另行确认",
        "ko": "산등성이의 만리장성, 팔달령으로 특정하지 않음 · 일정의 팔달령 예약, 입장과 관광지 이동은 별도 확정"
      }
    },
    "label": {
      "en": "Great Wall scenery",
      "zh": "长城风景",
      "ko": "만리장성 풍경"
    },
    "credit": null,
    "provenance": "beijing-highlights-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "xian-city": {
    "image": {
      "src": "/images/tours/xian-terracotta-warriors-5-day-private-tour/arrival-city-wall-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A broad pedestrian view along Xi'an City Wall",
        "zh": "西安城墙上开阔的步行视角",
        "ko": "시안 성벽 위의 탁 트인 보행 풍경"
      },
      "caption": {
        "en": "The wall shows the scale of the old city; we confirm your exact airport or railway-station pickup for your booking.",
        "zh": "从城墙看古城的尺度；具体在哪个机场或车站接你，按你的订单确认。",
        "ko": "성벽으로 보는 시안 구시가의 규모입니다. 픽업할 공항이나 역은 예약에 맞춰 확정합니다."
      }
    },
    "label": {
      "en": "Xi’an city",
      "zh": "西安城市风景",
      "ko": "시안 도시 풍경"
    },
    "credit": null,
    "provenance": "xian-terracotta-warriors-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "xian-wall": {
    "image": {
      "src": "/images/tours/beijing-xian-shanghai-8-day-private-tour/route-day-5.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Watchtower on top of the Xi’an City Wall",
        "zh": "西安城墙上的城楼",
        "ko": "시안 성벽 위의 누각"
      },
      "caption": {
        "en": "On Day 5, walk or cycle the wall after the Terracotta Warriors.",
        "zh": "第 5 天看完兵马俑，再上城墙走走或骑车。",
        "ko": "5일 차 병마용을 본 뒤 성벽을 걷거나 자전거를 탑니다."
      }
    },
    "label": {
      "en": "Xi’an City Wall",
      "zh": "西安城墙",
      "ko": "시안 성벽"
    },
    "credit": null,
    "provenance": "beijing-xian-shanghai-8-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "terracotta": {
    "image": {
      "src": "/images/destinations/xian/terracotta-pit-one-1200.webp",
      "width": 1200,
      "height": 750,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Terracotta Warriors inside Pit 1 in Lintong",
        "zh": "临潼兵马俑一号坑内的陶俑军阵",
        "ko": "린퉁 병마용 1호갱 내부의 도용 군진"
      },
      "caption": {
        "en": "A full day set aside for the heritage sites east of the city; we confirm reservation availability separately.",
        "zh": "整整一天留给城东的遗址；实名预约和余票，我们另外帮你确认。",
        "ko": "시안 동쪽 유적에 하루를 온전히 씁니다. 실명 예약과 잔여 입장권은 따로 확인해 드립니다."
      }
    },
    "label": {
      "en": "Terracotta Warriors",
      "zh": "兵马俑",
      "ko": "병마용"
    },
    "credit": null,
    "provenance": "xian-terracotta-warriors-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "xian-food": {
    "image": {
      "src": "/images/tours/xian-terracotta-warriors-5-day-private-tour/gallery-muslim-quarter-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Food stalls and pedestrians in Xi'an's Muslim Quarter",
        "zh": "西安回民街的店铺、行人与街巷",
        "ko": "시안 회민거리의 상점과 보행자, 골목 풍경"
      },
      "caption": {
        "en": "On the old-city day, you walk the lanes around the Great Mosque and Muslim Quarter.",
        "zh": "古城这一天，走进大清真寺和回民街的街巷。",
        "ko": "구시가 일정에서는 대청진사와 회민거리의 생활감 있는 골목을 걸어 봅니다."
      }
    },
    "label": {
      "en": "Xi’an old-city streets",
      "zh": "西安老城街巷",
      "ko": "시안 구시가 거리"
    },
    "credit": null,
    "provenance": "xian-terracotta-warriors-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "chengdu-city": {
    "image": {
      "src": "/images/destinations/chengdu/jinjiang-bridge-1200.webp",
      "width": 1200,
      "height": 750,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A covered bridge and river scene in central Chengdu",
        "zh": "成都中心城区的廊桥与锦江河景",
        "ko": "청두 도심의 지붕 있는 다리와 강 풍경"
      },
      "caption": {
        "en": "A river view in central Chengdu, your base for the stay. Your exact airport or station transfer is confirmed with your booking.",
        "zh": "成都中心城区河景，这几晚都住在成都；具体从哪个机场或车站接送，按你的订单确认。",
        "ko": "이번 여행의 숙박 거점, 청두 도심의 강 풍경입니다. 공항 또는 역 이동은 예약 내용에 맞춰 확정합니다."
      }
    },
    "label": {
      "en": "Chengdu city",
      "zh": "成都城市风景",
      "ko": "청두 도시 풍경"
    },
    "credit": null,
    "provenance": "chengdu-pandas-sanxingdui-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "chengdu-departure": {
    "image": {
      "src": "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/departure-chengdu-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Chengdu IFS and evening traffic in the city centre",
        "zh": "成都 IFS 与市中心夜间车流",
        "ko": "청두 IFS와 도심 야간 교통"
      },
      "caption": {
        "en": "One last look at Chengdu before your transfer to the airport or railway station. The photo does not show your departure point.",
        "zh": "用这张成都夜景为旅程收尾，之后按订单送你去机场或车站；照片并非实际出发地点。",
        "ko": "청두 도심 야경으로 여정을 마친 뒤 예약에 맞춰 공항 또는 기차역으로 이동합니다. 사진은 실제 출발 지점을 뜻하지 않습니다."
      }
    },
    "label": {
      "en": "Chengdu city",
      "zh": "成都城市风景",
      "ko": "청두 도시 풍경"
    },
    "credit": null,
    "provenance": "chengdu-pandas-sanxingdui-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "panda": {
    "image": {
      "src": "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/hero-panda-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "20% 50%",
      "alt": {
        "en": "A giant panda at Chengdu Research Base of Giant Panda Breeding",
        "zh": "成都大熊猫繁育研究基地内的大熊猫",
        "ko": "청두 자이언트판다 번식연구기지의 자이언트판다"
      },
      "caption": {
        "en": "A real photo of Chengdu Panda Base, where you go on Day 2. Panda sightings and viewing conditions vary from day to day.",
        "zh": "真实照片：D2 要去的成都熊猫基地。能看到哪只熊猫、观赏状态如何，要看当天情况。",
        "ko": "D2에 방문하는 청두 판다기지의 실제 사진입니다. 볼 수 있는 판다와 관람 상태는 그날 상황에 따라 다릅니다."
      }
    },
    "label": {
      "en": "Chengdu Panda Base",
      "zh": "成都熊猫基地",
      "ko": "청두 판다기지"
    },
    "credit": {
      "subject": {
        "en": "Giant panda at Chengdu Research Base",
        "zh": "成都大熊猫繁育研究基地内的大熊猫",
        "ko": "청두 자이언트판다 번식연구기지의 자이언트판다"
      },
      "author": "George Lu",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    },
    "provenance": "chengdu-pandas-sanxingdui-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "teahouse": {
    "image": {
      "src": "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/gallery-teahouse-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A quiet teahouse terrace in a Chengdu lane",
        "zh": "成都街巷里安静的茶馆露台",
        "ko": "청두 골목의 조용한 찻집 테라스"
      },
      "caption": {
        "en": "Tea-house time shows the slower everyday rhythm that makes Chengdu a comfortable base.",
        "zh": "茶馆里的日常慢节奏，让成都很适合做旅行落脚点。",
        "ko": "찻집에서 보내는 느긋한 일상이 청두를 편안한 여행 거점으로 만들어 줍니다."
      }
    },
    "label": {
      "en": "Chengdu teahouse",
      "zh": "成都茶馆",
      "ko": "청두 찻집"
    },
    "credit": null,
    "provenance": "chengdu-pandas-sanxingdui-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "sanxingdui": {
    "image": {
      "src": "/images/guides/sanxingdui-museum-booking-and-gallery-order/hero-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Exterior and arrival plaza of the new Sanxingdui Museum",
        "zh": "三星堆新馆外观与到达广场",
        "ko": "싼싱두이 신관 외관과 입장 광장"
      },
      "caption": {
        "en": "Where you arrive at the new Sanxingdui Museum. Ticket availability and the gallery order are confirmed separately.",
        "zh": "三星堆新馆的到达区域。门票能否订到、展厅参观顺序另行确认。",
        "ko": "싼싱두이 신관에 도착하면 보이는 공간입니다. 입장권 예약 가능 여부와 전시 관람 순서는 별도로 확인합니다."
      }
    },
    "label": {
      "en": "Sanxingdui Museum",
      "zh": "三星堆博物馆",
      "ko": "싼싱두이박물관"
    },
    "credit": {
      "subject": {
        "en": "Sanxingdui New Museum",
        "zh": "三星堆博物馆新馆",
        "ko": "싼싱두이 신관"
      },
      "author": "STW932",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:New_Sandingdui_Museum_02.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "chengdu-pandas-sanxingdui-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "leshan": {
    "image": {
      "src": "/images/tours/chengdu-chongqing-8-day-private-tour/gallery-2.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Leshan Giant Buddha",
        "zh": "乐山大佛",
        "ko": "러산대불"
      },
      "caption": {
        "en": "Your confirmation names the land route or the boat view; we can't promise both.",
        "zh": "确认单会写明走登山游线还是坐游船，两种不一定都能安排。",
        "ko": "육로와 유람선 중 어느 쪽인지 확인서에 적어 드리며, 둘 다 한다고 약속드리지는 않습니다."
      }
    },
    "label": {
      "en": "Leshan Giant Buddha",
      "zh": "乐山大佛",
      "ko": "러산대불"
    },
    "credit": {
      "subject": {
        "en": "Leshan Giant Buddha",
        "zh": "乐山大佛全景",
        "ko": "러산대불 전경"
      },
      "author": "Ariel Steiner",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Leshan_Buddha_Statue_View.JPG",
      "licenseLabel": "CC BY-SA 2.5",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5/"
    },
    "provenance": "chengdu-chongqing-8-day-private-tour",
    "rightsBasis": "published-license"
  },
  "chongqing-city": {
    "image": {
      "src": "/images/tours/chongqing-wulong-5-day-private-tour/gallery-hongyadong-qiansimen-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "65% 50%",
      "alt": {
        "en": "Hongya Cave and Qiansimen Bridge illuminated beside the Jialing River",
        "zh": "嘉陵江畔亮灯的洪崖洞与跨江大桥",
        "ko": "자링강변에 불이 켜진 훙야둥과 첸쓰먼대교"
      },
      "caption": {
        "en": "Begin in the vertical city before heading into Wulong.",
        "zh": "从立体山城出发，再深入武隆。",
        "ko": "수직 도시에서 시작해 우룽으로 들어갑니다."
      }
    },
    "label": {
      "en": "Chongqing riverfront",
      "zh": "重庆滨江风景",
      "ko": "충칭 강변"
    },
    "credit": null,
    "provenance": "chongqing-wulong-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "chongqing-sunset": {
    "image": {
      "src": "/images/tours/beijing-xian-yangtze-cruise-shanghai-12-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Chongqing skyline across the river at sunset",
        "zh": "日落时江对岸的重庆",
        "ko": "해 질 녘 강 건너 충칭 스카이라인"
      },
      "caption": {
        "en": "On Day 6 you fly into Chongqing and board the ship that evening.",
        "zh": "第 6 天飞到重庆，晚上上船。",
        "ko": "6일 차에 충칭에 도착해 저녁에 배에 오릅니다."
      }
    },
    "label": {
      "en": "Chongqing city",
      "zh": "重庆城市风景",
      "ko": "충칭 도시 풍경"
    },
    "credit": null,
    "provenance": "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "liziba": {
    "image": {
      "src": "/images/tours/chongqing-wulong-5-day-private-tour/liziba-train-through-building-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A Line 2 train passing through Liziba Station with hillside buildings above and roads below",
        "zh": "重庆轨道 2 号线列车穿过李子坝站，上方可见山坡建筑、下方可见道路",
        "ko": "충칭 2호선 열차가 리쯔바역 건물을 통과하고 위쪽에는 산비탈 건물, 아래에는 도로가 보이는 장면"
      },
      "caption": {
        "en": "A train passing through the building at Liziba, with Chongqing's street levels above and below. Timetables and viewing-platform access can vary.",
        "zh": "李子坝轻轨穿楼而过，重庆街道高低错落；班次和观景平台是否开放，以当天实际情况为准。",
        "ko": "리쯔바에서 열차가 건물을 통과하고, 충칭의 도로가 위아래로 층층이 이어집니다. 열차 시간과 전망대 이용 여부는 당일 상황에 따라 다를 수 있습니다."
      }
    },
    "label": {
      "en": "Liziba monorail",
      "zh": "李子坝轻轨",
      "ko": "리쯔바 모노레일"
    },
    "credit": {
      "subject": {
        "en": "A Line 2 train at Liziba Station",
        "zh": "重庆李子坝站轻轨穿楼",
        "ko": "충칭 리쯔바역 건물 통과 열차"
      },
      "author": "David290",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E6%9D%8E%E5%AD%90%E5%9D%9D%E7%AB%99%E8%BD%BB%E8%BD%A8%E7%A9%BF%E6%A5%BC_0023.png",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "chongqing-wulong-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "wulong": {
    "image": {
      "src": "/images/destinations/chongqing/wulong-1200.webp",
      "width": 1200,
      "height": 800,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Natural-bridge karst landscape at Wulong",
        "zh": "武隆天生三桥喀斯特景观",
        "ko": "우룽 천생삼교 카르스트 풍경"
      },
      "caption": {
        "en": "Wulong's natural-bridge landscape. We check weather, shuttle and walking conditions for your visit.",
        "zh": "武隆天生三桥地貌；天气、景区交通和步行条件，按实际游览时确认。",
        "ko": "우룽 천생삼교 지형입니다. 날씨와 셔틀, 보행 조건은 방문 시점에 확인해 드립니다."
      }
    },
    "label": {
      "en": "Three Natural Bridges",
      "zh": "天生三桥",
      "ko": "천생삼교"
    },
    "credit": {
      "subject": {
        "en": "Three Natural Bridges, Wulong",
        "zh": "武隆天生三桥",
        "ko": "우룽 천생삼교"
      },
      "author": "Brookqi",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Wulongtianshengsanqiao.JPG",
      "licenseLabel": "Public Domain Mark",
      "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/"
    },
    "provenance": "chongqing-wulong-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "wulong-meadow": {
    "image": {
      "src": "/images/tours/chongqing-wulong-5-day-private-tour/route-day-4-extra.webp",
      "width": 1600,
      "height": 1000,
      "alt": {
        "en": "Meadow at Fairy Mountain in Wulong",
        "zh": "武隆仙女山草地",
        "ko": "우룽 선녀산 초원"
      },
      "caption": {
        "en": "Fairy Mountain shows one possible Day 4 landscape. Whether Fairy Mountain or Furong Cave is included will be stated in your written confirmation.",
        "zh": "仙女山是第 4 天可能看到的一种景观；实际包含仙女山还是芙蓉洞，以书面确认单为准。",
        "ko": "선녀산은 4일 차에 볼 수 있는 선택 풍경 중 하나입니다. 선녀산 또는 부용동 중 포함 장소는 서면 확인서에 명시합니다."
      }
    },
    "label": {
      "en": "Fairy Mountain",
      "zh": "仙女山",
      "ko": "셴뉘산"
    },
    "credit": {
      "subject": {
        "en": "Fairy Mountain option",
        "zh": "仙女山可选景观",
        "ko": "선녀산 선택 풍경"
      },
      "author": "杨志强Zhiqiang",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:重庆武隆仙女山_-_panoramio.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    "provenance": "chongqing-wulong-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "cruise-ship": {
    "image": {
      "src": "/images/tours/chongqing-yangtze-cruise-6-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Yangtze River cruise ship",
        "zh": "长江游轮",
        "ko": "창장 크루즈 선박"
      },
      "caption": {
        "en": "The actual ship and cabin are confirmed for the selected sailing date.",
        "zh": "实际船名与舱房按所选航期确认。",
        "ko": "실제 선박과 객실은 선택한 운항일에 맞춰 확인합니다."
      }
    },
    "label": {
      "en": "Yangtze cruise",
      "zh": "长江游轮",
      "ko": "창장 크루즈"
    },
    "credit": {
      "subject": {
        "en": "Yangtze River cruise ship",
        "zh": "长江游轮",
        "ko": "창장 크루즈 선박"
      },
      "author": "Gaynor",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:MV_Selina_Yangtze_River_Cruise_(12280525406).jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    },
    "provenance": "chongqing-yangtze-cruise-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "qutang": {
    "image": {
      "src": "/images/tours/chongqing-yangtze-cruise-6-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1067,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Qutang Gorge on the Yangtze River",
        "zh": "长江瞿塘峡",
        "ko": "창장 구당협"
      },
      "caption": {
        "en": "The cruise portion passes the main gorge section before finishing in Yichang.",
        "zh": "游轮穿过主要峡谷段后在宜昌结束。",
        "ko": "크루즈는 주요 협곡 구간을 지나 이창에서 마칩니다."
      }
    },
    "label": {
      "en": "Qutang Gorge",
      "zh": "瞿塘峡",
      "ko": "구당협"
    },
    "credit": {
      "subject": {
        "en": "Qutang Gorge on the Yangtze River",
        "zh": "长江瞿塘峡",
        "ko": "창장 구당협"
      },
      "author": "Tan Wei Liang Byorn",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Qutang_Gorge_on_Changjiang.jpg",
      "licenseLabel": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0/"
    },
    "provenance": "chongqing-yangtze-cruise-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "wu-gorge": {
    "image": {
      "src": "/images/tours/chongqing-yangtze-cruise-6-day-private-tour/route-day-5-extra.webp",
      "width": 1600,
      "height": 1000,
      "alt": {
        "en": "Wu Gorge seen from a boat on the Yangtze",
        "zh": "船上所见的长江巫峡",
        "ko": "배에서 본 창장 우협"
      },
      "caption": {
        "en": "Wu Gorge on the Yangtze; weather, water levels and the ship's exact route vary by sailing.",
        "zh": "长江巫峡实景；天气、水位与游轮实际航线以所选航次为准。",
        "ko": "창장 우협입니다. 날씨, 수위와 선박의 실제 항로는 운항일에 따라 달라집니다."
      }
    },
    "label": {
      "en": "Wu Gorge",
      "zh": "巫峡",
      "ko": "무협"
    },
    "credit": {
      "subject": {
        "en": "Wu Gorge",
        "zh": "巫峡",
        "ko": "우협"
      },
      "author": "Photnart",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Wu_Gorge_on_Yangtze.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "chongqing-yangtze-cruise-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "guilin-city": {
    "image": {
      "src": "/images/tours/guilin-yangshuo-5-day-private-tour/route-day-5-extra.webp",
      "width": 1600,
      "height": 1000,
      "alt": {
        "en": "Guilin city and surrounding karst hills",
        "zh": "桂林市区与周围喀斯特山峰",
        "ko": "구이린 시내와 주변 카르스트 산봉우리"
      },
      "caption": {
        "en": "Guilin city view for departure-day context; no sightseeing stop is scheduled on Day 5.",
        "zh": "桂林返程日的城市实景；第 5 天不安排观光景点。",
        "ko": "구이린 출발일의 시내 모습입니다. 5일 차에는 관광 정류장을 따로 배정하지 않습니다."
      }
    },
    "label": {
      "en": "Guilin city",
      "zh": "桂林城市风景",
      "ko": "구이린 도시 풍경"
    },
    "credit": {
      "subject": {
        "en": "Guilin city view",
        "zh": "桂林城市景观",
        "ko": "구이린 시내 풍경"
      },
      "author": "Chlukoe",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:City_guilin_guangxi.jpg",
      "licenseLabel": "CC0 1.0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "provenance": "guilin-yangshuo-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "guilin-pagodas": {
    "image": {
      "src": "/images/tours/guilin-yangshuo-5-day-private-tour/gallery-sun-moon-towers-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Sun and Moon Pagodas reflected in Guilin's lake at sunset",
        "zh": "夕阳下倒映湖面的桂林日月双塔",
        "ko": "해질 무렵 호수에 비친 구이린 일월쌍탑"
      },
      "caption": {
        "en": "A Guilin evening scene bookends the two-night Yangshuo stay.",
        "zh": "桂林湖畔的傍晚，阳朔两晚的前后都住在桂林。",
        "ko": "구이린의 호숫가 저녁 풍경. 양숴 2박의 앞뒤로 구이린에서 묵습니다."
      }
    },
    "label": {
      "en": "Guilin city",
      "zh": "桂林城市风景",
      "ko": "구이린 도시 풍경"
    },
    "credit": null,
    "provenance": "guilin-yangshuo-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "li-river": {
    "image": {
      "src": "/images/tours/guilin-yangshuo-5-day-private-tour/li-river-cruise-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A cruise boat travelling between Li River karst peaks",
        "zh": "游船穿行于漓江喀斯特峰林之间",
        "ko": "리강 카르스트 봉우리 사이를 지나는 유람선"
      },
      "caption": {
        "en": "On the river towards Yangshuo; the sailing, pier and cabin details are confirmed for your travel date.",
        "zh": "前往阳朔的水路。船班、码头和舱等按你的出行日期确认。",
        "ko": "양숴로 향하는 강 여정. 운항편, 선착장과 좌석 등급은 여행 날짜에 맞춰 확정합니다."
      }
    },
    "label": {
      "en": "Li River cruise",
      "zh": "漓江游船",
      "ko": "리강 유람선"
    },
    "credit": null,
    "provenance": "guilin-yangshuo-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "yulong": {
    "image": {
      "src": "/images/tours/guilin-yangshuo-5-day-private-tour/yulong-countryside-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A bamboo raft and fields beneath Yangshuo's karst hills",
        "zh": "阳朔喀斯特峰林下的竹筏、田野与水面",
        "ko": "양숴 카르스트 산 아래의 대나무 뗏목과 들판"
      },
      "caption": {
        "en": "Day 3 takes you into countryside like this for one simple family activity or gentle cycling; the rafts in the photo may not be running when you visit.",
        "zh": "D3 就在这样的乡村里安排一项基础家庭体验或轻骑行；照片里的竹筏，出行时不一定在运营。",
        "ko": "D3에는 이런 전원 풍경 속에서 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지를 진행합니다. 사진 속 뗏목은 여행 시기에 운항하지 않을 수 있습니다."
      }
    },
    "label": {
      "en": "Yulong River countryside",
      "zh": "遇龙河乡村",
      "ko": "위룽허 시골"
    },
    "credit": null,
    "provenance": "guilin-yangshuo-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "longji": {
    "image": {
      "src": "/images/tours/shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Golden rice terraces and a village at Longji",
        "zh": "龙脊金色梯田与村寨",
        "ko": "룽지의 금빛 다랑논과 마을"
      },
      "caption": {
        "en": "Day 9 takes you from Guilin to Longji and back.",
        "zh": "第 9 天从桂林去龙脊，当天回桂林。",
        "ko": "9일 차에 구이린에서 룽지에 다녀옵니다."
      }
    },
    "label": {
      "en": "Longji rice terraces",
      "zh": "龙脊梯田",
      "ko": "룽지 계단식 논"
    },
    "credit": null,
    "provenance": "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "shanghai-arrival": {
    "image": {
      "src": "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/arrival-shanghai-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A quiet Bund promenade and Huangpu River at sunrise",
        "zh": "清晨安静的外滩滨水平台与黄浦江",
        "ko": "이른 아침 조용한 와이탄 수변 산책로와 황푸강"
      },
      "caption": {
        "en": "Shanghai, your arrival city; the airport or station pickup follows your booking.",
        "zh": "抵达城市上海；接机或接站按你的订单安排。",
        "ko": "도착 도시 상하이. 공항·역 픽업은 예약 내용에 따라 진행합니다."
      }
    },
    "label": {
      "en": "Shanghai city",
      "zh": "上海城市风景",
      "ko": "상하이 도시 풍경"
    },
    "credit": null,
    "provenance": "shanghai-suzhou-hangzhou-6-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "shanghai-skyline": {
    "image": {
      "src": "/images/tours/shanghai-suzhou-5-day-private-tour/shanghai-skyline-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Shanghai Tower and the World Financial Center in the sunset light",
        "zh": "夕阳中的上海中心与环球金融中心",
        "ko": "노을 속 상하이타워와 세계금융센터"
      },
      "caption": {
        "en": "Day 2 links the historic Bund with present-day Pudong.",
        "zh": "D2 的路线，从历史外滩走到当代浦东。",
        "ko": "D2 동선은 역사적인 와이탄에서 현대의 푸둥까지 이어집니다."
      }
    },
    "label": {
      "en": "Shanghai skyline",
      "zh": "上海天际线",
      "ko": "상하이 스카이라인"
    },
    "credit": null,
    "provenance": "shanghai-suzhou-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "shanghai-bund": {
    "image": {
      "src": "/images/destinations/shanghai/bund-architecture-1200.webp",
      "width": 1200,
      "height": 750,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Historic architecture along Shanghai's Bund",
        "zh": "上海外滩历史建筑群",
        "ko": "상하이 와이탄의 역사 건축"
      },
      "caption": {
        "en": "The Bund anchors the full Shanghai sightseeing day before the route crosses the river.",
        "zh": "外滩是上海全天游览的起点，随后再跨江前往浦东。",
        "ko": "와이탄에서 상하이 전일 관광을 시작한 뒤 강을 건너 푸둥으로 이동합니다."
      }
    },
    "label": {
      "en": "The Bund",
      "zh": "外滩",
      "ko": "와이탄"
    },
    "credit": null,
    "provenance": "shanghai-suzhou-hangzhou-6-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "shanghai-night": {
    "image": {
      "src": "/images/tours/shanghai-suzhou-5-day-private-tour/gallery-shanghai-night-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Shanghai's illuminated skyline across the Huangpu River",
        "zh": "黄浦江两岸亮灯后的上海天际线",
        "ko": "황푸강 건너 불이 켜진 상하이 스카이라인"
      },
      "caption": {
        "en": "Shanghai at night, for a feel of the city; it doesn't promise a cruise, and lighting times may vary.",
        "zh": "上海夜景，呈现城市氛围；照片不代表含游船，亮灯时间以当天为准。",
        "ko": "도시 분위기를 담은 상하이 야경입니다. 유람선 포함을 뜻하지는 않으며, 조명 시간은 달라질 수 있습니다."
      }
    },
    "label": {
      "en": "Shanghai city",
      "zh": "上海城市风景",
      "ko": "상하이 도시 풍경"
    },
    "credit": null,
    "provenance": "shanghai-suzhou-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "shanghai-departure": {
    "image": {
      "src": "/images/tours/shanghai-suzhou-5-day-private-tour/departure-shanghai-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A quiet riverfront platform facing Shanghai's skyline",
        "zh": "面向上海天际线的滨水平台",
        "ko": "상하이 스카이라인을 바라보는 강변 플랫폼"
      },
      "caption": {
        "en": "A calm last look at Shanghai; the airport and transfer time are set from your booked flight.",
        "zh": "以安静的城市画面收尾；机场和送机时间按你订好的航班确认。",
        "ko": "차분한 도시 풍경으로 여정을 마무리합니다. 공항과 이동 시간은 예약하신 항공편에 맞춰 확정합니다."
      }
    },
    "label": {
      "en": "Shanghai city",
      "zh": "上海城市风景",
      "ko": "상하이 도시 풍경"
    },
    "credit": null,
    "provenance": "shanghai-suzhou-5-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "yu-garden": {
    "image": {
      "src": "/images/tours/shanghai-disneyland-5-day-private-tour/route-day-3.webp",
      "width": 1600,
      "height": 1068,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Traditional buildings and pond in Yu Garden",
        "zh": "豫园传统建筑与池塘",
        "ko": "예원의 전통 건축과 연못"
      },
      "caption": {
        "en": "Yu Garden is visited with the old city on the guided Shanghai day.",
        "zh": "豫园与老城安排在上海导游日。",
        "ko": "예원은 상하이 가이드 일정에 구시가와 함께 방문합니다."
      }
    },
    "label": {
      "en": "Yu Garden",
      "zh": "豫园",
      "ko": "예원"
    },
    "credit": {
      "subject": {
        "en": "Traditional buildings and pond in Yu Garden",
        "zh": "豫园传统建筑与池塘",
        "ko": "예원의 전통 건축과 연못"
      },
      "author": "King of Hearts",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Yu_Garden_Shanghai_November_2017_002.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "shanghai-disneyland-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "french-concession": {
    "image": {
      "src": "/images/tours/shanghai-disneyland-5-day-private-tour/route-day-4-extra.webp",
      "width": 1600,
      "height": 1000,
      "alt": {
        "en": "Tree-lined Yanqing Road in Shanghai's former French Concession, photographed in 2013",
        "zh": "2013 年拍摄的上海原法租界延庆路树荫街景",
        "ko": "2013년에 촬영한 상하이 옛 프랑스 조계 옌칭루 거리"
      },
      "caption": {
        "en": "Yanqing Road in Shanghai, photographed in 2013; this is a city neighbourhood scene, not Disneyland.",
        "zh": "2013 年拍摄的上海延庆路街景；这里是市区街巷，不是迪士尼乐园。",
        "ko": "2013년 상하이 옌칭루 거리입니다. 디즈니랜드가 아닌 도심 거리 모습입니다."
      }
    },
    "label": {
      "en": "Former French Concession",
      "zh": "原法租界街巷",
      "ko": "옛 프랑스 조계"
    },
    "credit": {
      "subject": {
        "en": "Former French Concession",
        "zh": "原法租界街区",
        "ko": "옛 프랑스 조계 거리"
      },
      "author": "Fabio Achilli",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:French_Concession,_Shanghai,_China_(9740638438).jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    },
    "provenance": "shanghai-disneyland-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "disney": {
    "image": {
      "src": "/images/tours/shanghai-disneyland-5-day-private-tour/hero.webp",
      "width": 1600,
      "height": 899,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Enchanted Storybook Castle at Shanghai Disneyland",
        "zh": "上海迪士尼奇幻童话城堡",
        "ko": "상하이 디즈니랜드 스토리북 성"
      },
      "caption": {
        "en": "Disneyland receives a full day; tickets are tied to the confirmed visit date.",
        "zh": "迪士尼安排完整一天，门票与已确认日期绑定。",
        "ko": "디즈니랜드에는 하루를 온전히 쓰며 입장권은 확정 날짜에 맞춰 예약합니다."
      }
    },
    "label": {
      "en": "Shanghai Disneyland",
      "zh": "上海迪士尼",
      "ko": "상하이 디즈니랜드"
    },
    "credit": {
      "subject": {
        "en": "Enchanted Storybook Castle at Shanghai Disneyland",
        "zh": "上海迪士尼奇幻童话城堡",
        "ko": "상하이 디즈니랜드 스토리북 성"
      },
      "author": "Josh Grenier",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:18-03-12_ShanghaiDisney_013.jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    },
    "provenance": "shanghai-disneyland-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "suzhou-garden": {
    "image": {
      "src": "/images/tours/shanghai-suzhou-5-day-private-tour/suzhou-humble-garden-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Pavilion, pond and planted landscape in Suzhou's Humble Administrator's Garden",
        "zh": "苏州拙政园的亭廊、池水与园林景观",
        "ko": "쑤저우 졸정원의 정자, 연못과 정원 풍경"
      },
      "caption": {
        "en": "The garden anchors the Suzhou rail day trip; weather, seasonal planting and ticket availability vary.",
        "zh": "拙政园是苏州高铁一日游的重点；天气、时令景观和门票余量都会变化。",
        "ko": "졸정원은 쑤저우 고속철도 당일 일정의 중심입니다. 날씨, 계절 풍경과 입장권 예약 상황은 달라질 수 있습니다."
      }
    },
    "label": {
      "en": "Humble Administrator’s Garden",
      "zh": "拙政园",
      "ko": "졸정원"
    },
    "credit": {
      "subject": {
        "en": "Humble Administrator's Garden",
        "zh": "拙政园",
        "ko": "졸정원"
      },
      "author": "Chainwit.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_(2024)_-_img_01.jpg",
      "licenseLabel": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
    },
    "provenance": "shanghai-suzhou-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "pingjiang": {
    "image": {
      "src": "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/pingjiang-road-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A stone bridge and canal-side houses along Pingjiang Road",
        "zh": "平江路的石桥、河道与白墙民居",
        "ko": "핑장루의 돌다리와 운하, 흰 벽의 집들"
      },
      "caption": {
        "en": "The Suzhou day closes among canals and old lanes after the garden and museum visits.",
        "zh": "完成园林与博物馆后，在平江路河道与老街巷中收尾。",
        "ko": "정원과 박물관 방문 후 핑장루의 운하와 옛 골목에서 하루를 마칩니다."
      }
    },
    "label": {
      "en": "Pingjiang Road",
      "zh": "平江路",
      "ko": "핑장루"
    },
    "credit": {
      "subject": {
        "en": "Pingjiang Road, Suzhou",
        "zh": "苏州平江路",
        "ko": "쑤저우 핑장루"
      },
      "author": "kevinmcgill",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:A_stone_arch_bridge_in_Pingjiang_Road,_Suzhou.jpg",
      "licenseLabel": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/"
    },
    "provenance": "shanghai-suzhou-hangzhou-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "hangzhou-lake": {
    "image": {
      "src": "/images/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A pavilion on the shore of West Lake in Hangzhou",
        "zh": "杭州西湖岸边的亭子",
        "ko": "항저우 서호 호숫가의 정자"
      },
      "caption": {
        "en": "With two nights in Hangzhou, West Lake gets a full day.",
        "zh": "杭州连住 2 晚，西湖留整天。",
        "ko": "항저우에서 2박해 서호를 하루 동안 봅니다."
      }
    },
    "label": {
      "en": "West Lake",
      "zh": "西湖",
      "ko": "서호"
    },
    "credit": null,
    "provenance": "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "hangzhou-tea": {
    "image": {
      "src": "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/gallery-hangzhou-tea-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A stone path beneath old trees in a Meijiawu tea garden",
        "zh": "梅家坞茶园古树下的石板小路与成片茶垄",
        "ko": "메이지아우 차밭의 오래된 나무 아래 돌길과 차나무 밭"
      },
      "caption": {
        "en": "The Hangzhou day includes one tea stop before West Lake.",
        "zh": "杭州游览日，去西湖之前会先到一处茶文化地点。",
        "ko": "항저우 관광일에는 서호에 가기 전 차 문화 장소 한 곳을 방문합니다."
      }
    },
    "label": {
      "en": "Hangzhou tea landscape",
      "zh": "杭州茶园风景",
      "ko": "항저우 차밭 풍경"
    },
    "credit": null,
    "provenance": "shanghai-suzhou-hangzhou-6-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "lingyin": {
    "image": {
      "src": "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/lingyin-feilai-peak-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Buddhist carvings in the limestone of Feilai Peak",
        "zh": "灵隐飞来峰岩壁上的佛教造像",
        "ko": "페이라이펑 석회암 벽면의 불교 조각"
      },
      "caption": {
        "en": "The Hangzhou sightseeing day begins at Feilai Peak and Lingyin Temple, then moves on to a tea stop and West Lake.",
        "zh": "杭州游览日从飞来峰和灵隐寺开始，再去茶文化地点和西湖。",
        "ko": "항저우 관광일은 페이라이펑과 링인사에서 시작해 차 문화 장소와 서호로 이어집니다."
      }
    },
    "label": {
      "en": "Feilai Peak",
      "zh": "飞来峰",
      "ko": "페이라이펑"
    },
    "credit": null,
    "provenance": "shanghai-suzhou-hangzhou-6-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "zhangjiajie-peaks": {
    "image": {
      "src": "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/wulingyuan-peaks-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Sandstone pillars in Wulingyuan, Zhangjiajie.",
        "zh": "张家界武陵源的砂岩峰林。",
        "ko": "장가계 무릉원의 사암 봉우리."
      },
      "caption": {
        "en": "The sandstone landscape at the start of the seven-day route.",
        "zh": "七天路线从张家界砂岩峰林开始。",
        "ko": "7일 여정은 장가계 사암 봉우리에서 시작합니다."
      }
    },
    "label": {
      "en": "Wulingyuan peaks",
      "zh": "武陵源峰林",
      "ko": "우링위안 봉우리"
    },
    "credit": {
      "subject": {
        "en": "Wulingyuan sandstone pillars",
        "zh": "武陵源砂岩峰林",
        "ko": "무릉원 사암 봉우리"
      },
      "author": "颐园居",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Wulingyuan,_Zhangjiajie,_Hunan_20230702.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "zhangjiajie-furong-fenghuang-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "zhangjiajie-tianzi": {
    "image": {
      "src": "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/tianzi-mountain-panorama-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "A panoramic view across the sandstone pillars of Tianzi Mountain.",
        "zh": "俯瞰天子山层叠的砂岩峰林。",
        "ko": "천자산의 겹겹이 이어진 사암 봉우리 전경."
      },
      "caption": {
        "en": "Tianzi Mountain, Yangjiajie and Yuanjiajie form the first full touring day.",
        "zh": "天子山、杨家界与袁家界组成第一个完整游览日。",
        "ko": "첫 종일 관광에서 천자산, 양가계와 원가계를 둘러봅니다."
      }
    },
    "label": {
      "en": "Tianzi Mountain",
      "zh": "天子山",
      "ko": "톈쯔산"
    },
    "credit": {
      "subject": {
        "en": "Tianzi Mountain panorama",
        "zh": "天子山峰林全景",
        "ko": "천자산 봉우리 전경"
      },
      "author": "Chensiyuan",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:1_tianzishan_wulingyuan_zhangjiajie_2012.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "zhangjiajie-furong-fenghuang-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "tianmen": {
    "image": {
      "src": "/images/guides/zhangjiajie/tianmen-1600.jpg",
      "width": 1600,
      "height": 1040,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "The long stairway climbing to Tianmen Cave on Tianmen Mountain",
        "zh": "天门山通往天门洞的长阶梯",
        "ko": "천문산 천문동으로 이어지는 긴 계단"
      },
      "caption": {
        "en": "Tianmen Mountain on Day 3. If it is closed or fogged in, the day switches to a boat on Baofeng Lake at no extra charge.",
        "zh": "D3 的天门山；如果关闭或大雾，当天改为宝峰湖坐船，不另外收费。",
        "ko": "D3의 천문산입니다. 폐쇄되거나 안개가 짙으면 추가 요금 없이 보봉호 유람선으로 바꿉니다."
      }
    },
    "label": {
      "en": "Tianmen Mountain",
      "zh": "天门山",
      "ko": "톈먼산"
    },
    "credit": null,
    "provenance": "zhangjiajie-forest-4-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "fenghuang": {
    "image": {
      "src": "/images/guides/border-town-fenghuang-chadong-shen-congwen/hero-1600.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Hongqiao entrance in Fenghuang Ancient Town.",
        "zh": "凤凰古城虹桥入口。",
        "ko": "봉황고성 훙차오 입구."
      },
      "caption": {
        "en": "The guide introduces Fenghuang’s public lanes and riverside on Day 5.",
        "zh": "D5 由导游陪同走凤凰公共街巷与沱江沿岸。",
        "ko": "D5에는 가이드와 봉황 골목과 강변을 둘러봅니다."
      }
    },
    "label": {
      "en": "Fenghuang Ancient Town",
      "zh": "凤凰古城",
      "ko": "펑황고성"
    },
    "credit": {
      "subject": {
        "en": "Hongqiao, Fenghuang",
        "zh": "凤凰古城虹桥",
        "ko": "봉황고성 훙차오"
      },
      "author": "xiquinhosilva",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_18.jpg",
      "licenseLabel": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
    },
    "provenance": "zhangjiajie-furong-fenghuang-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "fenghuang-river": {
    "image": {
      "src": "/images/guides/border-town-fenghuang-chadong-shen-congwen/tuojiang-stepping-stones-1126.webp",
      "width": 1126,
      "height": 819,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Visitors crossing stepping stones on the Tuojiang in Fenghuang.",
        "zh": "游客从凤凰沱江跳岩上过河。",
        "ko": "봉황 퉈장의 징검다리를 건너는 방문객들."
      },
      "caption": {
        "en": "Departure time follows your train or return-transfer plan.",
        "zh": "离开时间按你的车次或返程接送方案安排。",
        "ko": "출발 시간은 이용하실 열차나 귀환 이동 계획에 맞춥니다."
      }
    },
    "label": {
      "en": "Fenghuang Tuojiang River",
      "zh": "凤凰沱江",
      "ko": "펑황 퉈장"
    },
    "credit": {
      "subject": {
        "en": "Tuojiang stepping stones, Fenghuang",
        "zh": "凤凰沱江跳岩",
        "ko": "봉황 퉈장 징검다리"
      },
      "author": "Yu Hui (于回)",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Fenghuang_Ancient_Town.jpg",
      "licenseLabel": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/"
    },
    "provenance": "zhangjiajie-furong-fenghuang-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "kunming": {
    "image": {
      "src": "/images/tours/kunming-jianshui-yuanyang-6-day-private-tour/route-day-1.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Green Lake in Kunming",
        "zh": "昆明翠湖",
        "ko": "쿤밍 취호"
      },
      "caption": {
        "en": "Kunming is used as the arrival and departure base.",
        "zh": "昆明承担抵达与返程住宿。",
        "ko": "쿤밍은 도착과 출발 거점입니다."
      }
    },
    "label": {
      "en": "Kunming Green Lake",
      "zh": "昆明翠湖",
      "ko": "쿤밍 취호"
    },
    "credit": {
      "subject": {
        "en": "Green Lake in Kunming",
        "zh": "昆明翠湖",
        "ko": "쿤밍 취호"
      },
      "author": "Daderot",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Green_Lake_Park,_Kunming,_China_-_DSC03430.JPG",
      "licenseLabel": "Public domain",
      "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/"
    },
    "provenance": "kunming-jianshui-yuanyang-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "stone-forest": {
    "image": {
      "src": "/images/tours/beijing-xian-yunnan-14-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Limestone pillars reflected in a pool at the Stone Forest",
        "zh": "石林石柱倒映在水中",
        "ko": "석림 석회암 기둥이 비치는 연못"
      },
      "caption": {
        "en": "Stop at the Stone Forest between Kunming and the Dali train.",
        "zh": "昆明出发先看石林，再乘高铁去大理。",
        "ko": "쿤밍에서 석림을 본 뒤 다리로 가는 열차를 탑니다."
      }
    },
    "label": {
      "en": "Stone Forest",
      "zh": "石林",
      "ko": "석림"
    },
    "credit": null,
    "provenance": "beijing-xian-yunnan-14-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "dali-erhai": {
    "image": {
      "src": "/images/tours/kunming-dali-lijiang-8-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Erhai Lake near Dali",
        "zh": "大理洱海湖景",
        "ko": "다리 얼하이 풍경"
      },
      "caption": {
        "en": "The Dali stay leaves time for the lakeshore and Xizhou.",
        "zh": "在大理有时间去洱海边和喜洲走走。",
        "ko": "다리에서는 얼하이와 시저우를 둘러볼 시간이 있습니다."
      }
    },
    "label": {
      "en": "Erhai Lake",
      "zh": "洱海",
      "ko": "얼하이"
    },
    "credit": {
      "subject": {
        "en": "Erhai Lake, Dali",
        "zh": "大理洱海",
        "ko": "다리 얼하이 호수"
      },
      "author": "Mx. Granger",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tree_in_front_of_Erhai_Lake.jpg",
      "licenseLabel": "CC0 1.0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "provenance": "kunming-dali-lijiang-8-day-private-tour",
    "rightsBasis": "published-license"
  },
  "xizhou": {
    "image": {
      "src": "/images/tours/beijing-xian-yunnan-14-day-private-tour/route-day-8.webp",
      "width": 1600,
      "height": 1000,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Gateway in the Bai village of Xizhou",
        "zh": "白族村落喜洲的牌坊",
        "ko": "바이족 마을 시저우의 패방"
      },
      "caption": {
        "en": "Xizhou’s Bai courtyard houses fit into the Erhai Lake day.",
        "zh": "洱海这天，也去喜洲看白族院落。",
        "ko": "얼하이 호수를 보는 날 시저우 바이족 가옥도 갑니다."
      }
    },
    "label": {
      "en": "Xizhou village",
      "zh": "喜洲",
      "ko": "시저우"
    },
    "credit": null,
    "provenance": "beijing-xian-yunnan-14-day-private-tour",
    "rightsBasis": "owner-authorized-website-library"
  },
  "lijiang": {
    "image": {
      "src": "/images/tours/kunming-dali-lijiang-8-day-private-tour/hero.webp",
      "width": 1600,
      "height": 747,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Lijiang Old Town rooftops",
        "zh": "丽江古城屋顶",
        "ko": "리장고성 지붕"
      },
      "caption": {
        "en": "The route spends two nights in Lijiang before returning to Kunming by rail.",
        "zh": "路线在丽江连住两晚，再乘动车返回昆明。",
        "ko": "리장에서 2박한 뒤 열차로 쿤밍에 돌아옵니다."
      }
    },
    "label": {
      "en": "Lijiang Old Town",
      "zh": "丽江古城",
      "ko": "리장고성"
    },
    "credit": {
      "subject": {
        "en": "Lijiang Old Town rooftops",
        "zh": "丽江古城屋顶",
        "ko": "리장고성 지붕 풍경"
      },
      "author": "CEphoto, Uwe Aranas",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_Old-town-03.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    "provenance": "kunming-dali-lijiang-8-day-private-tour",
    "rightsBasis": "published-license"
  },
  "jade-dragon": {
    "image": {
      "src": "/images/tours/beijing-xian-yunnan-14-day-private-tour/route-day-10-extra.webp",
      "width": 1600,
      "height": 1000,
      "alt": {
        "en": "Jade Dragon Snow Mountain",
        "zh": "玉龙雪山",
        "ko": "옥룡설산"
      },
      "caption": {
        "en": "Jade Dragon Snow Mountain on this route. The photograph illustrates the place; access, weather and the final day order are confirmed for your dates.",
        "zh": "路线中的玉龙雪山实景。照片仅示地点，开放情况、天气和最终日期顺序按出行日期确认。",
        "ko": "옥룡설산의 실제 풍경입니다. 사진은 장소를 보여주며 입장, 날씨와 최종 방문 순서는 여행 날짜에 확인합니다."
      }
    },
    "label": {
      "en": "Jade Dragon Snow Mountain",
      "zh": "玉龙雪山",
      "ko": "옥룡설산"
    },
    "credit": {
      "subject": {
        "en": "Jade Dragon Snow Mountain",
        "zh": "玉龙雪山",
        "ko": "옥룡설산"
      },
      "author": "钉钉",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "beijing-xian-yunnan-14-day-private-tour",
    "rightsBasis": "published-license"
  },
  "xijiang": {
    "image": {
      "src": "/images/tours/guizhou-huangguoshu-libo-miao-7-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1280,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Xijiang Miao Village on the hillside",
        "zh": "山坡上的西江苗寨",
        "ko": "산비탈의 시장 먀오족 마을"
      },
      "caption": {
        "en": "Your stay in the village comes with one cultural activity.",
        "zh": "苗寨停留期间含一项文化体验。",
        "ko": "마을에 머무는 동안 문화 체험 한 가지가 포함됩니다."
      }
    },
    "label": {
      "en": "Xijiang Miao Village",
      "zh": "西江苗寨",
      "ko": "시쟝 먀오 마을"
    },
    "credit": {
      "subject": {
        "en": "Xijiang Miao Village",
        "zh": "西江千户苗寨",
        "ko": "시장 먀오족 마을"
      },
      "author": "SONG1907",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Xijiang_Miao_Village.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "guizhou-huangguoshu-libo-miao-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "xiamen": {
    "image": {
      "src": "/images/tours/xiamen-tulou-quanzhou-6-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1060,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Traditional rooftops on Gulangyu Island, Xiamen",
        "zh": "俯瞰厦门鼓浪屿街区与屋顶",
        "ko": "샤먼 구랑위의 골목과 지붕을 내려다본 풍경"
      },
      "caption": {
        "en": "You cross to Gulangyu by reserved ferry and explore the island on foot.",
        "zh": "乘预约好的船上鼓浪屿，岛上步行游览。",
        "ko": "예약된 배편으로 구랑위에 건너가 걸어서 둘러봅니다."
      }
    },
    "label": {
      "en": "Gulangyu, Xiamen",
      "zh": "厦门鼓浪屿",
      "ko": "샤먼 구랑위"
    },
    "credit": {
      "subject": {
        "en": "Gulangyu, Xiamen",
        "zh": "厦门鼓浪屿",
        "ko": "샤먼 구랑위"
      },
      "author": "Jakob Montrasio",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Gulangyu.jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    },
    "provenance": "xiamen-tulou-quanzhou-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "quanzhou": {
    "image": {
      "src": "/images/tours/xiamen-tulou-quanzhou-6-day-private-tour/route-day-2.webp",
      "width": 1600,
      "height": 1067,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Twin pagodas at Kaiyuan Temple in Quanzhou",
        "zh": "泉州开元寺双塔",
        "ko": "취안저우 개원사 쌍탑"
      },
      "caption": {
        "en": "Day 4 is for Quanzhou's old city and maritime heritage, before you head back to Xiamen.",
        "zh": "第 4 天集中游览泉州古城与海丝文化，第二天返回厦门。",
        "ko": "4일 차에 취안저우 고성과 해상 문화유산을 본 뒤 다음 날 샤먼으로 돌아갑니다."
      }
    },
    "label": {
      "en": "Kaiyuan Temple, Quanzhou",
      "zh": "泉州开元寺",
      "ko": "취안저우 카이위안사"
    },
    "credit": {
      "subject": {
        "en": "Twin pagodas of Kaiyuan Temple, Quanzhou",
        "zh": "泉州开元寺东西塔",
        "ko": "취안저우 카이위안사 동서탑"
      },
      "author": "Windmemories",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:20230129_Twin_pagodas_of_Kaiyuan_Temple.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "xiamen-tulou-quanzhou-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "shantou": {
    "image": {
      "src": "/images/tours/chaozhou-shantou-nanao-5-day-private-tour/route-day-3.webp",
      "width": 1600,
      "height": 765,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Historic arcade streets in central Shantou",
        "zh": "汕头开埠区骑楼街景",
        "ko": "산터우 개항 지구 기루 거리"
      },
      "caption": {
        "en": "The final full day returns to Shantou's historic port district.",
        "zh": "最后一个完整游览日回到汕头开埠街区。",
        "ko": "마지막 종일 일정은 산터우의 역사적 항구 지구로 돌아옵니다."
      }
    },
    "label": {
      "en": "Shantou old city",
      "zh": "汕头老城",
      "ko": "산터우 구시가"
    },
    "credit": {
      "subject": {
        "en": "Xiaogongyuan historic district, Shantou",
        "zh": "汕头小公园开埠区",
        "ko": "산터우 샤오궁위안 개항지구"
      },
      "author": "Sgnpkd",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Xiaogongyuan.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "chaozhou-shantou-nanao-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "chaozhou-street": {
    "image": {
      "src": "/images/tours/chaozhou-shantou-nanao-5-day-private-tour/gallery-2.webp",
      "width": 1600,
      "height": 1066,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Paifang Street in Chaozhou Old City",
        "zh": "潮州古城牌坊街",
        "ko": "차오저우 고성 패방가"
      },
      "caption": {
        "en": "Paifang Street · the Chaozhou day pairs the old city with one cultural activity",
        "zh": "牌坊街 · 潮州这一天，古城之外再加一项文化体验",
        "ko": "패방가 · 차오저우 일정은 고성 관광에 문화 체험 한 가지를 더합니다"
      }
    },
    "label": {
      "en": "Chaozhou old city",
      "zh": "潮州老城",
      "ko": "차오저우 구시가"
    },
    "credit": {
      "subject": {
        "en": "Paifang Street, Chaozhou",
        "zh": "潮州太平路牌坊街",
        "ko": "차오저우 파이팡제"
      },
      "author": "Windmemories",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:20230206_Taiping_Road,_Chaozhou.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "chaozhou-shantou-nanao-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "guangzhou": {
    "image": {
      "src": "/images/tours/guangzhou-shunde-foshan-5-day-private-tour/hero.webp",
      "width": 1589,
      "height": 1600,
      "objectPosition": "50% 45%",
      "alt": {
        "en": "Canton Tower and the Pearl River at night",
        "zh": "夜色中的广州塔与珠江",
        "ko": "밤의 광저우타워와 주강"
      },
      "caption": {
        "en": "Guangzhou's skyline; tower admission is separate unless your booking includes it.",
        "zh": "广州城市天际线；登塔不含在内，订单写明的除外。",
        "ko": "광저우 스카이라인 · 타워 입장은 예약에 넣은 경우가 아니면 별도입니다."
      }
    },
    "label": {
      "en": "Guangzhou city",
      "zh": "广州城市风景",
      "ko": "광저우 도시 풍경"
    },
    "credit": {
      "subject": {
        "en": "Canton Tower and Pearl River at night",
        "zh": "广州塔与珠江夜景",
        "ko": "광저우타워와 주장강 야경"
      },
      "author": "Daniel Lu（User:dllu）",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Canton_Tower_at_night_Guangzhou_2024_dllu.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "guangzhou-shunde-foshan-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "qinghui": {
    "image": {
      "src": "/images/tours/guangzhou-shunde-foshan-5-day-private-tour/gallery-2.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Qinghui Garden in Shunde",
        "zh": "顺德清晖园",
        "ko": "순더 청회원"
      },
      "caption": {
        "en": "The Shunde day pairs the garden with flexible food choices.",
        "zh": "顺德这一天，看园林，吃什么自己选。",
        "ko": "순더에서는 정원을 둘러보고, 먹을 음식은 자유롭게 고릅니다."
      }
    },
    "label": {
      "en": "Qinghui Garden",
      "zh": "清晖园",
      "ko": "칭후이위안"
    },
    "credit": {
      "subject": {
        "en": "Bixi Cottage, Qinghui Garden",
        "zh": "顺德清晖园碧溪草堂",
        "ko": "순더 칭후이위안 비시초당"
      },
      "author": "古海岸遗址",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Foshan_Shunde_Qinghui_Yuan_2024-05-11_16.12.39.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "guangzhou-shunde-foshan-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "huangshan": {
    "image": {
      "src": "/images/tours/huangshan-hongcun-huizhou-5-day-private-tour/hero.webp",
      "width": 1920,
      "height": 1440,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Granite peaks of Huangshan",
        "zh": "黄山花岗岩峰林",
        "ko": "황산 화강암 봉우리"
      },
      "caption": {
        "en": "Weather and seasonal access shape the mountain route.",
        "zh": "山上怎么走，要看天气和当季开放情况。",
        "ko": "산악 동선은 날씨와 계절별 개방 상황에 따라 달라집니다."
      }
    },
    "label": {
      "en": "Huangshan landscape",
      "zh": "黄山风景",
      "ko": "황산 풍경"
    },
    "credit": {
      "subject": {
        "en": "Mount Huangshan peaks",
        "zh": "黄山群峰",
        "ko": "황산 봉우리"
      },
      "author": "Francesco Bandarin",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mount_Huangshan-110978.jpg",
      "licenseLabel": "CC BY-SA 3.0 IGO",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/igo/"
    },
    "provenance": "huangshan-hongcun-huizhou-5-day-private-tour",
    "rightsBasis": "published-license"
  },
  "jingdezhen": {
    "image": {
      "src": "/images/tours/jingdezhen-wuyuan-wangxian-6-day-private-tour/gallery-1.webp",
      "width": 1920,
      "height": 2121,
      "objectPosition": "50% 48%",
      "alt": {
        "en": "Jingdezhen Imperial Kiln Museum",
        "zh": "景德镇御窑博物馆",
        "ko": "징더전 어요박물관"
      },
      "caption": {
        "en": "Your first two days centre on Jingdezhen, including a genuine half-day making session.",
        "zh": "前两天以景德镇为主，并留出真正的半天动手制作。",
        "ko": "징더전에서 2박하며, 그중 반나절은 직접 만들어 보는 시간입니다."
      }
    },
    "label": {
      "en": "Jingdezhen Imperial Kiln Museum",
      "zh": "景德镇御窑博物馆",
      "ko": "징더전 어요박물관"
    },
    "credit": {
      "subject": {
        "en": "Jingdezhen Imperial Kiln Museum",
        "zh": "景德镇御窑博物馆",
        "ko": "징더전 어요박물관"
      },
      "author": "Zhu Pei",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:02-Jingdezhen_Imperial_Kiln_Museum.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "jingdezhen-wuyuan-wangxian-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "wangxian": {
    "image": {
      "src": "/images/tours/jingdezhen-wuyuan-wangxian-6-day-private-tour/hero.webp",
      "width": 1920,
      "height": 1080,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Wangxian Valley near sunset",
        "zh": "日落时分的望仙谷",
        "ko": "해 질 무렵 왕셴구"
      },
      "caption": {
        "en": "From afternoon into the evening lights, in a developed scenic area.",
        "zh": "从下午游览到亮灯时段，这里是商业化景区。",
        "ko": "개발된 관광지로, 오후부터 저녁 조명이 켜질 때까지 둘러봅니다."
      }
    },
    "label": {
      "en": "Wangxian Valley",
      "zh": "望仙谷",
      "ko": "왕셴구"
    },
    "credit": {
      "subject": {
        "en": "Wangxian Valley at sunset",
        "zh": "望仙谷峡谷与灯笼步道",
        "ko": "왕셴구 협곡과 등롱 산책로"
      },
      "author": "茅野ふたば",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Wangxiangu_Scenic_Area_-_25_(July_19,_2025).jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "jingdezhen-wuyuan-wangxian-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "yanji-night": {
    "image": {
      "src": "/images/tours/changbaishan-yanji-winter-6-day-private-tour/gallery-1.webp",
      "width": 1920,
      "height": 1235,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Yanji city lights at night",
        "zh": "延吉城市夜景",
        "ko": "옌지 야경"
      },
      "caption": {
        "en": "The route ends with two nights in Yanji.",
        "zh": "路线最后在延吉连住两晚。",
        "ko": "여정은 옌지 2박으로 마칩니다."
      }
    },
    "label": {
      "en": "Yanji city",
      "zh": "延吉城市风景",
      "ko": "옌지 도시 풍경"
    },
    "credit": {
      "subject": {
        "en": "Yanji at night",
        "zh": "延吉夜景",
        "ko": "옌지 야경"
      },
      "author": "EditQ",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Yanji_at_night.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "changbaishan-yanji-winter-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "yanji-signs": {
    "image": {
      "src": "/images/tours/changbaishan-yanji-winter-6-day-private-tour/route-day-2.webp",
      "width": 1920,
      "height": 1440,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Korean and Chinese signs near Yanbian University",
        "zh": "延边大学周边的朝鲜文与中文招牌",
        "ko": "연변대학교 인근의 한글과 중국어 간판"
      },
      "caption": {
        "en": "Yanji's streets show the city's Korean-Chinese culture, while meals stay your own choice.",
        "zh": "延吉街区里能看到朝鲜族文化，吃什么由你自己选。",
        "ko": "옌지 거리에서 조선족 문화를 만나고, 식사는 자유롭게 고릅니다."
      }
    },
    "label": {
      "en": "Yanji neighbourhoods",
      "zh": "延吉街区",
      "ko": "옌지 거리"
    },
    "credit": {
      "subject": {
        "en": "Yanbian University popular wall, Yanji",
        "zh": "延边大学网红墙",
        "ko": "옌볜대학교 인기 벽거리"
      },
      "author": "Liuxingy",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%BB%B6%E5%90%89_%E5%BB%B6%E8%BE%B9%E5%A4%A7%E5%AD%A6%E7%BD%91%E7%BA%A2%E5%A2%99.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "changbaishan-yanji-winter-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "shaolin": {
    "image": {
      "src": "/images/tours/luoyang-dengfeng-kaifeng-6-day-private-tour/gallery-1.webp",
      "width": 800,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Shaolin Temple complex",
        "zh": "少林寺建筑",
        "ko": "소림사 경내"
      },
      "caption": {
        "en": "Shaolin Temple and Pagoda Forest are visited while crossing Dengfeng.",
        "zh": "经登封前往洛阳时游览少林寺与塔林。",
        "ko": "덩펑을 지나며 소림사와 탑림을 방문합니다."
      }
    },
    "label": {
      "en": "Shaolin Temple",
      "zh": "少林寺",
      "ko": "소림사"
    },
    "credit": {
      "subject": {
        "en": "Shaolin Temple complex",
        "zh": "少林寺建筑",
        "ko": "소림사 경내"
      },
      "author": "Gary Todd",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Shaolin_Temple_(10199309404).jpg",
      "licenseLabel": "CC0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "provenance": "luoyang-dengfeng-kaifeng-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "pingyao": {
    "image": {
      "src": "/images/tours/datong-pingyao-6-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 398,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Aerial view of Pingyao Ancient City",
        "zh": "平遥古城俯瞰",
        "ko": "핑야오고성 전경"
      },
      "caption": {
        "en": "Two nights in Pingyao make the old city more than a transfer stop.",
        "zh": "平遥连住两晚，不把古城当成转场打卡点。",
        "ko": "핑야오에서 2박하며 고성을 이동 중 잠깐 보는 곳으로 만들지 않습니다."
      }
    },
    "label": {
      "en": "Pingyao Ancient City",
      "zh": "平遥古城",
      "ko": "핑야오고성"
    },
    "credit": {
      "subject": {
        "en": "Aerial view of Pingyao Ancient City",
        "zh": "平遥古城俯瞰",
        "ko": "핑야오고성 전경"
      },
      "author": "Chensiyuan",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:1_pingyao_ancient_city_aerial_pano_2019.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "datong-pingyao-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "zhangye": {
    "image": {
      "src": "/images/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1067,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Colourful landforms at Zhangye Danxia",
        "zh": "张掖七彩丹霞",
        "ko": "장예 칠채단하"
      },
      "caption": {
        "en": "The route begins in Zhangye and continues west through the Hexi Corridor.",
        "zh": "路线从张掖开始，沿河西走廊一路向西。",
        "ko": "장예에서 시작해 허시회랑을 따라 서쪽으로 이동합니다."
      }
    },
    "label": {
      "en": "Zhangye Danxia",
      "zh": "张掖丹霞",
      "ko": "장예 단하"
    },
    "credit": {
      "subject": {
        "en": "Colourful landforms at Zhangye Danxia",
        "zh": "张掖七彩丹霞",
        "ko": "장예 칠채단하"
      },
      "author": "Marcus Hsu",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Zhangye_Danxia_2016.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "zhangye-jiayuguan-dunhuang-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "jiayuguan": {
    "image": {
      "src": "/images/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 994,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Jiayuguan Fort",
        "zh": "嘉峪关关城",
        "ko": "자위관성"
      },
      "caption": {
        "en": "Jiayuguan is an overnight stop rather than a rushed roadside visit.",
        "zh": "嘉峪关安排住宿，不作为匆忙路过的打卡点。",
        "ko": "자위관에서 숙박하며 급하게 지나가는 정류장으로 만들지 않습니다."
      }
    },
    "label": {
      "en": "Jiayuguan Fort",
      "zh": "嘉峪关关城",
      "ko": "자위관성"
    },
    "credit": {
      "subject": {
        "en": "Jiayuguan Fort",
        "zh": "嘉峪关关城",
        "ko": "자위관성"
      },
      "author": "Doron",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:JiayuguanFort.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    "provenance": "zhangye-jiayuguan-dunhuang-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "dunhuang": {
    "image": {
      "src": "/images/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/route-day-6.webp",
      "width": 1600,
      "height": 1067,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Mingsha Mountain and Crescent Moon Spring",
        "zh": "鸣沙山与月牙泉",
        "ko": "명사산과 월아천"
      },
      "caption": {
        "en": "The desert visit is timed around weather and temperature.",
        "zh": "沙漠游览时段按天气与温度调整。",
        "ko": "사막 방문 시간은 날씨와 기온에 맞춰 조정합니다."
      }
    },
    "label": {
      "en": "Mingsha Mountain and Crescent Moon Spring",
      "zh": "鸣沙山与月牙泉",
      "ko": "명사산과 월아천"
    },
    "credit": {
      "subject": {
        "en": "Mingsha Mountain and Crescent Moon Spring",
        "zh": "鸣沙山与月牙泉",
        "ko": "명사산과 월아천"
      },
      "author": "xiquinhosilva",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mingsha_Mountain_and_Crescent_Moon_Spring_(54532735713).jpg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    },
    "provenance": "zhangye-jiayuguan-dunhuang-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "mogao": {
    "image": {
      "src": "/images/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/route-day-5-extra.webp",
      "width": 1600,
      "height": 1000,
      "alt": {
        "en": "Exterior cliff and cave entrances at the Mogao Caves",
        "zh": "莫高窟外部崖面与洞窟入口",
        "ko": "막고굴 외부 절벽과 석굴 입구"
      },
      "caption": {
        "en": "The exterior of the Mogao Caves; interior access follows the confirmed ticket and site rules.",
        "zh": "莫高窟崖面外景；洞窟内部参观按已确认门票与景区规定安排。",
        "ko": "막고굴 외관입니다. 내부 관람은 확정된 입장권과 현장 규정에 따릅니다."
      }
    },
    "label": {
      "en": "Mogao Caves exterior",
      "zh": "莫高窟外景",
      "ko": "막고굴 외관"
    },
    "credit": {
      "subject": {
        "en": "Mogao Caves exterior",
        "zh": "莫高窟崖面外景",
        "ko": "막고굴 절벽 외관"
      },
      "author": "Tom Thai / eviltomthai",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mogao_Caves_Exterior_And_Chambers.jpeg",
      "licenseLabel": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
    },
    "provenance": "zhangye-jiayuguan-dunhuang-7-day-private-tour",
    "rightsBasis": "published-license"
  },
  "sayram": {
    "image": {
      "src": "/images/tours/xinjiang-ili-sayram-8-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Sayram Lake in Xinjiang",
        "zh": "新疆赛里木湖",
        "ko": "신장 싸이리무호"
      },
      "caption": {
        "en": "Sayram Lake anchors the western side of the seasonal circuit.",
        "zh": "赛里木湖是季节性环线西侧的核心停留。",
        "ko": "싸이리무호는 계절형 순환 일정 서쪽의 핵심입니다."
      }
    },
    "label": {
      "en": "Sayram Lake",
      "zh": "赛里木湖",
      "ko": "싸이리무호"
    },
    "credit": {
      "subject": {
        "en": "Sayram Lake in Xinjiang",
        "zh": "新疆赛里木湖",
        "ko": "신장 싸이리무호"
      },
      "author": "Tomskyhaha",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:In_Lake_Sayram_Scenic_Spot,_Xinjiang,_China_27.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "xinjiang-ili-sayram-8-day-private-tour",
    "rightsBasis": "published-license"
  },
  "nalati": {
    "image": {
      "src": "/images/tours/xinjiang-ili-sayram-8-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Nalati grassland",
        "zh": "那拉提草原",
        "ko": "나라티 초원"
      },
      "caption": {
        "en": "The exact scenic route depends on seasonal access and weather.",
        "zh": "具体景区路线取决于季节开放与天气。",
        "ko": "세부 관광 동선은 계절 개방과 날씨에 따릅니다."
      }
    },
    "label": {
      "en": "Nalati grassland",
      "zh": "那拉提草原",
      "ko": "나라티 초원"
    },
    "credit": {
      "subject": {
        "en": "Nalati grassland",
        "zh": "那拉提草原",
        "ko": "나라티 초원"
      },
      "author": "Yoshi Canopus",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Nalati_Grassland_4,_Xinjiang,_China.jpg",
      "licenseLabel": "CC0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "provenance": "xinjiang-ili-sayram-8-day-private-tour",
    "rightsBasis": "published-license"
  },
  "yining": {
    "image": {
      "src": "/images/tours/xinjiang-ili-sayram-8-day-private-tour/route-day-3.webp",
      "width": 1600,
      "height": 738,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Ili River at Yining",
        "zh": "伊宁伊犁河",
        "ko": "이닝의 이리강"
      },
      "caption": {
        "en": "Yining breaks the journey between Sayram Lake and Tekes.",
        "zh": "伊宁承担赛里木湖与特克斯之间的中段住宿。",
        "ko": "이닝은 싸이리무호와 터커스 사이의 중간 숙박지입니다."
      }
    },
    "label": {
      "en": "Ili River, Yining",
      "zh": "伊宁伊犁河",
      "ko": "이닝 이리강"
    },
    "credit": {
      "subject": {
        "en": "Ili River at Yining",
        "zh": "伊宁伊犁河",
        "ko": "이닝의 이리강"
      },
      "author": "Charlie Qi",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Along_the_Ili_River,_Yining,_Xinjiang_2020-10-03.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "xinjiang-ili-sayram-8-day-private-tour",
    "rightsBasis": "published-license"
  },
  "jianshui": {
    "image": {
      "src": "/images/tours/kunming-jianshui-yuanyang-6-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Jianshui Confucian Temple",
        "zh": "建水文庙",
        "ko": "젠수이 문묘"
      },
      "caption": {
        "en": "Jianshui gives the route a cultural stop between Kunming and Yuanyang.",
        "zh": "建水为昆明与元阳之间增加人文停留。",
        "ko": "젠수이는 쿤밍과 위안양 사이에 문화 일정을 더합니다."
      }
    },
    "label": {
      "en": "Jianshui Confucian Temple",
      "zh": "建水文庙",
      "ko": "젠수이 문묘"
    },
    "credit": {
      "subject": {
        "en": "Jianshui Confucian Temple",
        "zh": "建水文庙",
        "ko": "젠수이 문묘"
      },
      "author": "Vmenkov",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Jianshui_Confucian_Temple_-_P1360947.JPG",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    "provenance": "kunming-jianshui-yuanyang-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "yuanyang": {
    "image": {
      "src": "/images/tours/kunming-jianshui-yuanyang-6-day-private-tour/hero.webp",
      "width": 1598,
      "height": 946,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Yuanyang rice terraces photographed in December 2007",
        "zh": "2007 年 12 月拍摄的元阳梯田",
        "ko": "2007년 12월에 촬영한 위안양 계단식 논"
      },
      "caption": {
        "en": "This photograph was taken in December. Terrace water and colour change by season; two nights create more than one weather window, but no reflection or sunrise is guaranteed.",
        "zh": "这张照片拍摄于 12 月。梯田水面与颜色随季节变化；连住两晚增加天气窗口，但不保证倒影或日出。",
        "ko": "이 사진은 12월에 촬영했습니다. 계단식 논의 물과 색은 계절에 따라 달라지며, 2박으로 날씨 기회를 늘리지만 반영이나 일출을 보장하지 않습니다."
      }
    },
    "label": {
      "en": "Yuanyang rice terraces",
      "zh": "元阳梯田",
      "ko": "위안양 계단식 논"
    },
    "credit": {
      "subject": {
        "en": "Yuanyang rice terraces, photographed 2 December 2007",
        "zh": "2007 年 12 月 2 日拍摄的元阳梯田",
        "ko": "2007년 12월 2일 촬영한 위안양 계단식 논"
      },
      "author": "Takeaway",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:2007_12_02_yuanyang_rice_terraces_sunset.jpg",
      "licenseLabel": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    "provenance": "kunming-jianshui-yuanyang-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "shenzhen": {
    "image": {
      "src": "/images/tours/shenzhen-family-tech-4-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Futian skyline in Shenzhen",
        "zh": "深圳福田天际线",
        "ko": "선전 푸톈 스카이라인"
      },
      "caption": {
        "en": "The family route uses central Shenzhen as one hotel base.",
        "zh": "亲子路线以深圳市区同一家酒店为基地。",
        "ko": "가족 일정은 선전 도심 한 호텔을 거점으로 합니다."
      }
    },
    "label": {
      "en": "Shenzhen Futian skyline",
      "zh": "深圳福田天际线",
      "ko": "선전 푸톈 스카이라인"
    },
    "credit": {
      "subject": {
        "en": "Futian skyline in Shenzhen",
        "zh": "深圳福田天际线",
        "ko": "선전 푸톈 스카이라인"
      },
      "author": "Vikarna",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Futian_20220624.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "shenzhen-family-tech-4-day-private-tour",
    "rightsBasis": "published-license"
  },
  "shenzhen-museum": {
    "image": {
      "src": "/images/tours/shenzhen-family-tech-4-day-private-tour/gallery-1.webp",
      "width": 1600,
      "height": 1200,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Inside Shenzhen Science and Technology Museum",
        "zh": "深圳科学技术馆内部",
        "ko": "선전과학기술관 내부"
      },
      "caption": {
        "en": "The museum day is built around confirmed reservations and the children's ages.",
        "zh": "科学馆一天按预约与孩子年龄安排。",
        "ko": "과학관 일정은 예약과 아이 나이에 맞춰 구성합니다."
      }
    },
    "label": {
      "en": "Shenzhen Science and Technology Museum",
      "zh": "深圳科学技术馆",
      "ko": "선전과학기술관"
    },
    "credit": {
      "subject": {
        "en": "Inside Shenzhen Science and Technology Museum",
        "zh": "深圳科学技术馆内部",
        "ko": "선전과학기술관 내부"
      },
      "author": "GuoaMeni KammueDu",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%85%89%E6%98%8E%E5%8D%80_Guangming_%E6%B7%B1%E5%9C%B3%E7%A7%91%E5%AD%B8%E6%8A%80%E8%A1%93%E9%A4%A8_Shenzhen_Science_%26_Technology_Museum_tour_May_2025_R12S_19.jpg",
      "licenseLabel": "CC0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "provenance": "shenzhen-family-tech-4-day-private-tour",
    "rightsBasis": "published-license"
  },
  "hong-kong": {
    "image": {
      "src": "/images/tours/beijing-xian-guilin-hong-kong-10-day-private-tour/route-day-9-extra.webp",
      "width": 1600,
      "height": 1000,
      "alt": {
        "en": "Hong Kong skyline by the harbour",
        "zh": "维港旁的香港天际线",
        "ko": "항구 옆 홍콩 스카이라인"
      },
      "caption": {
        "en": "Hong Kong city view for the arrival by train; this does not depict the train or station.",
        "zh": "高铁抵港日的香港城市实景；不是列车或车站照片。",
        "ko": "고속철도 도착일의 홍콩 시내 모습으로, 열차나 역 사진은 아닙니다."
      }
    },
    "label": {
      "en": "Hong Kong harbour",
      "zh": "香港海港",
      "ko": "홍콩 항구"
    },
    "credit": {
      "subject": {
        "en": "Hong Kong skyline",
        "zh": "香港天际线",
        "ko": "홍콩 스카이라인"
      },
      "author": "Mustang Joe (Joe deSousa)",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hong_Kong_Skyline1.jpg",
      "licenseLabel": "CC0 1.0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "provenance": "beijing-xian-guilin-hong-kong-10-day-private-tour",
    "rightsBasis": "published-license"
  },
  "jiuzhaigou-preview": {
    "image": {
      "src": "/images/tours/chengdu-jiuzhaigou-huanglong-6-day-private-tour/hero.webp",
      "width": 1600,
      "height": 1064,
      "objectPosition": "50% 50%",
      "alt": {
        "en": "Five Flower Lake in Jiuzhaigou",
        "zh": "九寨沟五花海",
        "ko": "주자이거우 오화해"
      },
      "caption": {
        "en": "A full day for Jiuzhaigou, on the routes open that day.",
        "zh": "为九寨沟留出完整一天，具体游线看当天开放情况。",
        "ko": "주자이거우에 하루를 비워 두고, 동선은 당일 개방 상태에 따라 정합니다."
      }
    },
    "label": {
      "en": "Jiuzhaigou valley",
      "zh": "九寨沟山谷",
      "ko": "주자이거우 계곡"
    },
    "credit": {
      "subject": {
        "en": "Five Flower Lake, Jiuzhaigou",
        "zh": "九寨沟五花海",
        "ko": "주자이거우 오화해"
      },
      "author": "Chensiyuan",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
    "rightsBasis": "published-license"
  },
  "dazu": {
    "image": {
      "src": "/images/destinations/chongqing/dazu-1200.webp",
      "width": 1200,
      "height": 800,
      "alt": {
        "en": "Baodingshan rock carvings at Dazu",
        "zh": "大足宝顶山石刻",
        "ko": "다쭈 바오딩산 석각"
      },
      "caption": {
        "en": "Dazu Rock Carvings",
        "zh": "大足石刻",
        "ko": "다쭈석각"
      }
    },
    "label": {
      "en": "Dazu Rock Carvings",
      "zh": "大足石刻",
      "ko": "다쭈석각"
    },
    "credit": {
      "subject": {
        "en": "Dazu Rock Carvings",
        "zh": "大足石刻",
        "ko": "다쭈석각"
      },
      "author": "JL Cogburn",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dazu_rock_carvings_-_Baodingshan,_大足石刻-宝顶山摩崖造像,_Chongqing,_2023_(53563776088).jpg",
      "licenseLabel": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/"
    },
    "provenance": "docs/homeground-photo-provenance.md",
    "rightsBasis": "published-license"
  },
  "guiyang": {
    "image": {
      "src": "/images/guides/guiyang-nanming-old-city-day-to-night-walk/hero-1600.webp",
      "width": 1600,
      "height": 1000,
      "alt": {
        "en": "Jiaxiu Pavilion by the Nanming River in Guiyang",
        "zh": "贵阳南明河畔的甲秀楼",
        "ko": "구이양 난밍강가의 자슈러우"
      },
      "caption": {
        "en": "Guiyang city",
        "zh": "贵阳城市风景",
        "ko": "구이양 도시 풍경"
      }
    },
    "label": {
      "en": "Guiyang city",
      "zh": "贵阳城市风景",
      "ko": "구이양 도시 풍경"
    },
    "credit": {
      "subject": {
        "en": "Jiaxiu Pavilion, Guiyang",
        "zh": "贵阳甲秀楼",
        "ko": "구이양 자슈러우"
      },
      "author": "FN-082",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E7%94%B2%E7%A7%80%E6%A5%BC%E5%A4%9C%E6%99%AF%EF%BC%8C%E8%B4%B5%E5%B7%9E_202403_2.jpg",
      "licenseLabel": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "provenance": "public/images/guides/guiyang-nanming-old-city-day-to-night-walk/image-plan.json",
    "rightsBasis": "published-license"
  }
};

const assignments: Readonly<Record<string, readonly SceneAssignment[]>> = {
  "beijing-xian-shanghai-12-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "temple-heaven",
          "mode": "scene"
        },
        {
          "asset": "summer-palace",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "xian-wall",
          "mode": "scene"
        },
        {
          "asset": "xian-food",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "french-concession",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "shanghai-night",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "temple-heaven",
          "mode": "scene"
        },
        {
          "asset": "summer-palace",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "chengdu-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "panda",
          "mode": "scene"
        },
        {
          "asset": "sanxingdui",
          "mode": "option"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "guilin-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "li-river",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "yulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "option"
        },
        {
          "asset": "yu-garden",
          "mode": "option"
        },
        {
          "asset": "suzhou-garden",
          "mode": "option"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "temple-heaven",
          "mode": "scene"
        },
        {
          "asset": "summer-palace",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "chengdu-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "panda",
          "mode": "scene"
        },
        {
          "asset": "sanxingdui",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "guilin-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "li-river",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "yulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        },
        {
          "asset": "shanghai-skyline",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "zhangjiajie-peaks",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "zhangjiajie-tianzi",
          "mode": "scene"
        },
        {
          "asset": "zhangjiajie-peaks",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "tianmen",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "guilin-pagodas",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "li-river",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "yulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "option"
        },
        {
          "asset": "yu-garden",
          "mode": "option"
        },
        {
          "asset": "suzhou-garden",
          "mode": "option"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "zhangjiajie-peaks",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "zhangjiajie-tianzi",
          "mode": "scene"
        },
        {
          "asset": "zhangjiajie-peaks",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "tianmen",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "guilin-pagodas",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "li-river",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "yulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        },
        {
          "asset": "shanghai-skyline",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "temple-heaven",
          "mode": "scene"
        },
        {
          "asset": "summer-palace",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "chengdu-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "panda",
          "mode": "scene"
        },
        {
          "asset": "sanxingdui",
          "mode": "option"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "chongqing-sunset",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "liziba",
          "mode": "scene"
        },
        {
          "asset": "chongqing-city",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "cruise-ship",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "qutang",
          "mode": "scene"
        },
        {
          "asset": "wu-gorge",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 15,
      "items": [
        {
          "asset": "suzhou-garden",
          "mode": "scene"
        },
        {
          "asset": "pingjiang",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 16,
      "items": [
        {
          "asset": "french-concession",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 17,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "temple-heaven",
          "mode": "scene"
        },
        {
          "asset": "summer-palace",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "chengdu-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "panda",
          "mode": "scene"
        },
        {
          "asset": "sanxingdui",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "chongqing-sunset",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "liziba",
          "mode": "scene"
        },
        {
          "asset": "chongqing-city",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "cruise-ship",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "qutang",
          "mode": "scene"
        },
        {
          "asset": "wu-gorge",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 15,
      "items": [
        {
          "asset": "suzhou-garden",
          "mode": "scene"
        },
        {
          "asset": "pingjiang",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 16,
      "items": [
        {
          "asset": "french-concession",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 17,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-silk-road-15-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "zhangye",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "jiayuguan",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "dunhuang",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "mogao",
          "mode": "scene"
        },
        {
          "asset": "dunhuang",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "option"
        },
        {
          "asset": "shanghai-arrival",
          "mode": "option"
        }
      ]
    }
  ],
  "beijing-xian-silk-road-15-day-small-group-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "zhangye",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "jiayuguan",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "dunhuang",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "mogao",
          "mode": "scene"
        },
        {
          "asset": "dunhuang",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 15,
      "items": [
        {
          "asset": "beijing-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-yunnan-14-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "kunming",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "stone-forest",
          "mode": "scene"
        },
        {
          "asset": "dali-erhai",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "dali-erhai",
          "mode": "scene"
        },
        {
          "asset": "xizhou",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "lijiang",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "jade-dragon",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "shanghai-skyline",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "huangshan",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "huangshan",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "hangzhou-lake",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "hangzhou-lake",
          "mode": "scene"
        },
        {
          "asset": "hangzhou-tea",
          "mode": "preview"
        },
        {
          "asset": "lingyin",
          "mode": "option"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "suzhou-garden",
          "mode": "scene"
        },
        {
          "asset": "pingjiang",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "shanghai-skyline",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "french-concession",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "china-grand-tour-21-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "temple-heaven",
          "mode": "scene"
        },
        {
          "asset": "summer-palace",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "chengdu-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "panda",
          "mode": "scene"
        },
        {
          "asset": "sanxingdui",
          "mode": "option"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "guilin-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "li-river",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "yulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "zhangjiajie-peaks",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "zhangjiajie-tianzi",
          "mode": "scene"
        },
        {
          "asset": "zhangjiajie-peaks",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 14,
      "items": [
        {
          "asset": "tianmen",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 15,
      "items": [
        {
          "asset": "chongqing-sunset",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 16,
      "items": [
        {
          "asset": "liziba",
          "mode": "scene"
        },
        {
          "asset": "chongqing-city",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 17,
      "items": [
        {
          "asset": "cruise-ship",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 18,
      "items": [
        {
          "asset": "qutang",
          "mode": "scene"
        },
        {
          "asset": "wu-gorge",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 19,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 20,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "option"
        },
        {
          "asset": "yu-garden",
          "mode": "option"
        },
        {
          "asset": "suzhou-garden",
          "mode": "option"
        }
      ]
    },
    {
      "day": 21,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-guilin-shanghai-10-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "guilin-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "li-river",
          "mode": "scene"
        },
        {
          "asset": "yulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "option"
        },
        {
          "asset": "yu-garden",
          "mode": "option"
        },
        {
          "asset": "suzhou-garden",
          "mode": "option"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "temple-heaven",
          "mode": "scene"
        },
        {
          "asset": "summer-palace",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "hangzhou-lake",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "hangzhou-lake",
          "mode": "scene"
        },
        {
          "asset": "hangzhou-tea",
          "mode": "preview"
        },
        {
          "asset": "lingyin",
          "mode": "option"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "suzhou-garden",
          "mode": "scene"
        },
        {
          "asset": "pingjiang",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "shanghai-skyline",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "french-concession",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "zhangjiajie-peaks",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "zhangjiajie-tianzi",
          "mode": "scene"
        },
        {
          "asset": "zhangjiajie-peaks",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "tianmen",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "fenghuang-river",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "fenghuang",
          "mode": "scene"
        },
        {
          "asset": "fenghuang-river",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "guilin-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "longji",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "li-river",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "yulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 13,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-shanghai-8-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "option"
        },
        {
          "asset": "yu-garden",
          "mode": "option"
        },
        {
          "asset": "suzhou-garden",
          "mode": "option"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-guilin-hong-kong-10-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "guilin-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "li-river",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "yulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "hong-kong",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "hong-kong",
          "mode": "preview"
        }
      ]
    }
  ],
  "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "beijing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "forbidden-city",
          "mode": "scene"
        },
        {
          "asset": "forbidden-tower",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "great-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xian-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "terracotta",
          "mode": "scene"
        },
        {
          "asset": "xian-wall",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "liziba",
          "mode": "scene"
        },
        {
          "asset": "chongqing-city",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "cruise-ship",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "qutang",
          "mode": "scene"
        },
        {
          "asset": "wu-gorge",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 9,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 10,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        },
        {
          "asset": "yu-garden",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 11,
      "items": [
        {
          "asset": "suzhou-garden",
          "mode": "scene"
        },
        {
          "asset": "pingjiang",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 12,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "chengdu-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "jiuzhaigou-preview",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "panda",
          "mode": "scene"
        },
        {
          "asset": "teahouse",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "chengdu-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "kunming-dali-lijiang-8-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "kunming",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "dali-erhai",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "dali-erhai",
          "mode": "scene"
        },
        {
          "asset": "xizhou",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "lijiang",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "jade-dragon",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "kunming",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "kunming",
          "mode": "preview"
        }
      ]
    }
  ],
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "guiyang",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "xijiang",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "xijiang",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "guiyang",
          "mode": "preview"
        }
      ]
    }
  ],
  "xiamen-tulou-quanzhou-6-day-private-tour": [
    {
      "day": 5,
      "items": [
        {
          "asset": "quanzhou",
          "mode": "scene"
        },
        {
          "asset": "xiamen",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "xiamen",
          "mode": "preview"
        }
      ]
    }
  ],
  "chaozhou-shantou-nanao-5-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "shantou",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "chaozhou-street",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "shantou",
          "mode": "preview"
        }
      ]
    }
  ],
  "chengdu-chongqing-8-day-private-tour": [
    {
      "day": 2,
      "items": [
        {
          "asset": "panda",
          "mode": "scene"
        },
        {
          "asset": "teahouse",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "leshan",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "chongqing-city",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "wulong",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "wulong-meadow",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "dazu",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 8,
      "items": [
        {
          "asset": "chongqing-sunset",
          "mode": "preview"
        }
      ]
    }
  ],
  "guangzhou-shunde-foshan-5-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "guangzhou",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "qinghui",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "guangzhou",
          "mode": "preview"
        }
      ]
    }
  ],
  "huangshan-hongcun-huizhou-5-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "huangshan",
          "mode": "preview"
        }
      ]
    }
  ],
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "jingdezhen",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "wangxian",
          "mode": "scene"
        }
      ]
    }
  ],
  "changbaishan-yanji-winter-6-day-private-tour": [
    {
      "day": 4,
      "items": [
        {
          "asset": "yanji-night",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "yanji-signs",
          "mode": "preview"
        }
      ]
    }
  ],
  "shanghai-disneyland-5-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "shanghai-arrival",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "shanghai-bund",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "disney",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "shanghai-departure",
          "mode": "preview"
        }
      ]
    }
  ],
  "luoyang-dengfeng-kaifeng-6-day-private-tour": [
    {
      "day": 3,
      "items": [
        {
          "asset": "shaolin",
          "mode": "scene"
        }
      ]
    }
  ],
  "datong-pingyao-6-day-private-tour": [
    {
      "day": 4,
      "items": [
        {
          "asset": "pingyao",
          "mode": "scene"
        }
      ]
    }
  ],
  "zhangye-jiayuguan-dunhuang-7-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "zhangye",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 2,
      "items": [
        {
          "asset": "zhangye",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "jiayuguan",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "jiayuguan",
          "mode": "scene"
        },
        {
          "asset": "dunhuang",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 7,
      "items": [
        {
          "asset": "mogao",
          "mode": "preview"
        }
      ]
    }
  ],
  "chongqing-yangtze-cruise-6-day-private-tour": [
    {
      "day": 1,
      "items": [
        {
          "asset": "chongqing-sunset",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "dazu",
          "mode": "option"
        },
        {
          "asset": "cruise-ship",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "cruise-ship",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "qutang",
          "mode": "scene"
        }
      ]
    }
  ],
  "xinjiang-ili-sayram-8-day-private-tour": [
    {
      "day": 3,
      "items": [
        {
          "asset": "sayram",
          "mode": "scene"
        },
        {
          "asset": "yining",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "nalati",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "nalati",
          "mode": "scene"
        }
      ]
    }
  ],
  "kunming-jianshui-yuanyang-6-day-private-tour": [
    {
      "day": 2,
      "items": [
        {
          "asset": "stone-forest",
          "mode": "scene"
        },
        {
          "asset": "jianshui",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 3,
      "items": [
        {
          "asset": "jianshui",
          "mode": "scene"
        },
        {
          "asset": "yuanyang",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 5,
      "items": [
        {
          "asset": "yuanyang",
          "mode": "scene"
        },
        {
          "asset": "kunming",
          "mode": "preview"
        }
      ]
    },
    {
      "day": 6,
      "items": [
        {
          "asset": "kunming",
          "mode": "preview"
        }
      ]
    }
  ],
  "shenzhen-family-tech-4-day-private-tour": [
    {
      "day": 2,
      "items": [
        {
          "asset": "shenzhen-museum",
          "mode": "scene"
        }
      ]
    },
    {
      "day": 4,
      "items": [
        {
          "asset": "shenzhen",
          "mode": "preview"
        }
      ]
    }
  ]
};

function captionFor(id: string, mode: SceneMode, label: LocalizedText): LocalizedText {
  if (id === "great-wall") return {
    en: "Great Wall scenery near Beijing",
    zh: "北京附近长城风景",
    ko: "베이징 인근 만리장성 풍경",
  };
  if (id === "cruise-ship") return {
    en: "Yangtze cruise ship example · Vessel confirmed for your sailing",
    zh: "长江游轮示例船型 · 实际船名按航期确认",
    ko: "창장 크루즈 선박 예시 · 실제 선박은 출항일에 맞춰 확인",
  };
  if (mode === "preview") return {
    en: label.en + " · Destination view",
    zh: label.zh + " · 目的地一瞥",
    ko: label.ko + " · 여행지 풍경",
  };
  if (mode === "option") return {
    en: label.en + " · Optional itinerary stop",
    zh: label.zh + " · 备选行程",
    ko: label.ko + " · 선택 관광지",
  };
  return label;
}

export function getPrivateTourSceneMode(slug: string, day: number, src: string): SceneMode | undefined {
  const group = assignments[slug]?.find(item => item.day === day);
  return group?.items.find(item => privateTourSceneAssets[item.asset].image.src === src)?.mode;
}

export const privateTourSceneMediaBySlug: Readonly<Record<string, readonly PrivateTourRouteMediaGroup[]>> = Object.fromEntries(
  Object.entries(assignments).map(([slug, groups]) => [slug, groups.map(group => ({
    day: group.day,
    variants: group.items.map(item => {
      const asset = privateTourSceneAssets[item.asset];
      return { label: asset.label, image: { ...asset.image, caption: captionFor(item.asset, item.mode, asset.label) } };
    }),
  }))]),
);

export const privateTourSceneCreditsBySlug: Readonly<Record<string, readonly PrivateTourPhotoCredit[]>> = Object.fromEntries(
  Object.entries(assignments).map(([slug, groups]) => {
    const bySource = new Map<string, PrivateTourPhotoCredit>();
    for (const group of groups) for (const item of group.items) {
      const credit = privateTourSceneAssets[item.asset].credit;
      if (credit) bySource.set(credit.sourceUrl, credit);
    }
    return [slug, [...bySource.values()]];
  }),
);

// This records the published baseline plus these supplements, before aggregate deduplication.
export const privateTourSceneMediaCoverage = {
  "totals": {
    "products": 47,
    "itineraryDays": 414,
    "beforeCoveredDays": 144,
    "supplementedDays": 293,
    "newlyCoveredDays": 235,
    "afterCoveredDays": 379,
    "uncoveredDays": 35,
    "reusedAssets": 83,
    "productsWithSupplements": 36
  },
  "products": [
    {
      "slug": "shanghai-suzhou-hangzhou-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 6,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 6,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 3,
      "originalUniqueImages": 9,
      "afterUniqueImages": 9
    },
    {
      "slug": "chengdu-pandas-sanxingdui-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 5,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 7,
      "afterUniqueImages": 7
    },
    {
      "slug": "xian-terracotta-warriors-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 5,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 7,
      "afterUniqueImages": 7
    },
    {
      "slug": "chongqing-wulong-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 5,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 7,
      "afterUniqueImages": 7
    },
    {
      "slug": "guilin-yangshuo-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 5,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 3,
      "originalUniqueImages": 8,
      "afterUniqueImages": 8
    },
    {
      "slug": "harbin-winter-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 4,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 4,
      "uncoveredDays": [
        {
          "day": 3,
          "title": "Winter culture day"
        }
      ],
      "originalHeroGalleryImages": 1,
      "originalUniqueImages": 5,
      "afterUniqueImages": 5
    },
    {
      "slug": "shanghai-suzhou-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 5,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 3,
      "originalUniqueImages": 8,
      "afterUniqueImages": 8
    },
    {
      "slug": "beijing-highlights-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 5,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 3,
      "originalUniqueImages": 8,
      "afterUniqueImages": 8
    },
    {
      "slug": "zhangjiajie-forest-4-day-private-tour",
      "days": 4,
      "beforeCoveredDays": 4,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 4,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 3,
      "originalUniqueImages": 8,
      "afterUniqueImages": 8
    },
    {
      "slug": "zhangjiajie-furong-fenghuang-7-day-private-tour",
      "days": 7,
      "beforeCoveredDays": 7,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 7,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 9,
      "afterUniqueImages": 9
    },
    {
      "slug": "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 2,
      "supplementedDays": 4,
      "newlyCoveredDays": 4,
      "afterCoveredDays": 6,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 8
    },
    {
      "slug": "kunming-dali-lijiang-8-day-private-tour",
      "days": 8,
      "beforeCoveredDays": 2,
      "supplementedDays": 7,
      "newlyCoveredDays": 6,
      "afterCoveredDays": 8,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 7
    },
    {
      "slug": "guizhou-huangguoshu-libo-miao-7-day-private-tour",
      "days": 7,
      "beforeCoveredDays": 2,
      "supplementedDays": 4,
      "newlyCoveredDays": 4,
      "afterCoveredDays": 6,
      "uncoveredDays": [
        {
          "day": 6,
          "title": "Xijiang to Zhenyuan"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 5
    },
    {
      "slug": "xiamen-tulou-quanzhou-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 3,
      "supplementedDays": 2,
      "newlyCoveredDays": 2,
      "afterCoveredDays": 5,
      "uncoveredDays": [
        {
          "day": 2,
          "title": "Chengqi Lou and overnight in Nanjing"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 5
    },
    {
      "slug": "chaozhou-shantou-nanao-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 3,
      "supplementedDays": 3,
      "newlyCoveredDays": 2,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 3,
      "originalUniqueImages": 6,
      "afterUniqueImages": 6
    },
    {
      "slug": "chengdu-chongqing-8-day-private-tour",
      "days": 8,
      "beforeCoveredDays": 2,
      "supplementedDays": 7,
      "newlyCoveredDays": 6,
      "afterCoveredDays": 8,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 3,
      "originalUniqueImages": 5,
      "afterUniqueImages": 12
    },
    {
      "slug": "guangzhou-shunde-foshan-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 2,
      "supplementedDays": 3,
      "newlyCoveredDays": 3,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 3,
      "originalUniqueImages": 5,
      "afterUniqueImages": 5
    },
    {
      "slug": "huangshan-hongcun-huizhou-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 2,
      "supplementedDays": 1,
      "newlyCoveredDays": 1,
      "afterCoveredDays": 3,
      "uncoveredDays": [
        {
          "day": 4,
          "title": "Xidi, Nanping and Guanlu, then Tangmo"
        },
        {
          "day": 5,
          "title": "Tangmo, Chengkan, Tangyue archways and departure"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "jingdezhen-wuyuan-wangxian-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 2,
      "supplementedDays": 2,
      "newlyCoveredDays": 2,
      "afterCoveredDays": 4,
      "uncoveredDays": [
        {
          "day": 4,
          "title": "Sanqingshan mountain day"
        },
        {
          "day": 6,
          "title": "Depart from Shangrao"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "changbaishan-yanji-winter-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 2,
      "supplementedDays": 2,
      "newlyCoveredDays": 2,
      "afterCoveredDays": 4,
      "uncoveredDays": [
        {
          "day": 1,
          "title": "Arrive at Changbaishan resort"
        },
        {
          "day": 2,
          "title": "Beginner ski lesson and free snow time"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "shanghai-disneyland-5-day-private-tour",
      "days": 5,
      "beforeCoveredDays": 2,
      "supplementedDays": 4,
      "newlyCoveredDays": 3,
      "afterCoveredDays": 5,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 7
    },
    {
      "slug": "luoyang-dengfeng-kaifeng-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 2,
      "supplementedDays": 1,
      "newlyCoveredDays": 1,
      "afterCoveredDays": 3,
      "uncoveredDays": [
        {
          "day": 1,
          "title": "Arrive in Zhengzhou"
        },
        {
          "day": 5,
          "title": "White Horse Temple and Luoyang"
        },
        {
          "day": 6,
          "title": "Depart Luoyang or Zhengzhou"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "datong-pingyao-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 2,
      "supplementedDays": 1,
      "newlyCoveredDays": 1,
      "afterCoveredDays": 3,
      "uncoveredDays": [
        {
          "day": 1,
          "title": "Arrive in Datong"
        },
        {
          "day": 5,
          "title": "Shanxi courtyard and Taiyuan"
        },
        {
          "day": 6,
          "title": "Jinci and departure"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "zhangye-jiayuguan-dunhuang-7-day-private-tour",
      "days": 7,
      "beforeCoveredDays": 2,
      "supplementedDays": 5,
      "newlyCoveredDays": 5,
      "afterCoveredDays": 7,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "chongqing-yangtze-cruise-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 2,
      "supplementedDays": 4,
      "newlyCoveredDays": 3,
      "afterCoveredDays": 5,
      "uncoveredDays": [
        {
          "day": 6,
          "title": "Three Gorges Dam and Yichang departure"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 6
    },
    {
      "slug": "xinjiang-ili-sayram-8-day-private-tour",
      "days": 8,
      "beforeCoveredDays": 2,
      "supplementedDays": 3,
      "newlyCoveredDays": 3,
      "afterCoveredDays": 5,
      "uncoveredDays": [
        {
          "day": 1,
          "title": "Arrive in Urumqi"
        },
        {
          "day": 7,
          "title": "Return to Urumqi"
        },
        {
          "day": 8,
          "title": "Depart Urumqi"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "hulunbuir-7-day-private-tour",
      "days": 7,
      "beforeCoveredDays": 2,
      "supplementedDays": 0,
      "newlyCoveredDays": 0,
      "afterCoveredDays": 2,
      "uncoveredDays": [
        {
          "day": 1,
          "title": "Arrive in Hailar"
        },
        {
          "day": 3,
          "title": "Wetland, reindeer culture and forest country"
        },
        {
          "day": 5,
          "title": "Border road to Manzhouli"
        },
        {
          "day": 6,
          "title": "Hulun Lake and return to Hailar"
        },
        {
          "day": 7,
          "title": "Depart Hailar"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "kunming-jianshui-yuanyang-6-day-private-tour",
      "days": 6,
      "beforeCoveredDays": 2,
      "supplementedDays": 4,
      "newlyCoveredDays": 4,
      "afterCoveredDays": 6,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 5
    },
    {
      "slug": "shenzhen-family-tech-4-day-private-tour",
      "days": 4,
      "beforeCoveredDays": 2,
      "supplementedDays": 2,
      "newlyCoveredDays": 2,
      "afterCoveredDays": 4,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 4
    },
    {
      "slug": "beijing-xian-shanghai-12-day-private-tour",
      "days": 12,
      "beforeCoveredDays": 2,
      "supplementedDays": 12,
      "newlyCoveredDays": 10,
      "afterCoveredDays": 12,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 4,
      "afterUniqueImages": 20
    },
    {
      "slug": "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      "days": 14,
      "beforeCoveredDays": 3,
      "supplementedDays": 14,
      "newlyCoveredDays": 11,
      "afterCoveredDays": 14,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 25
    },
    {
      "slug": "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      "days": 14,
      "beforeCoveredDays": 3,
      "supplementedDays": 14,
      "newlyCoveredDays": 11,
      "afterCoveredDays": 14,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 25
    },
    {
      "slug": "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
      "days": 14,
      "beforeCoveredDays": 3,
      "supplementedDays": 14,
      "newlyCoveredDays": 11,
      "afterCoveredDays": 14,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 23
    },
    {
      "slug": "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour",
      "days": 14,
      "beforeCoveredDays": 3,
      "supplementedDays": 14,
      "newlyCoveredDays": 11,
      "afterCoveredDays": 14,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 23
    },
    {
      "slug": "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
      "days": 17,
      "beforeCoveredDays": 3,
      "supplementedDays": 17,
      "newlyCoveredDays": 14,
      "afterCoveredDays": 17,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 30
    },
    {
      "slug": "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
      "days": 17,
      "beforeCoveredDays": 3,
      "supplementedDays": 17,
      "newlyCoveredDays": 14,
      "afterCoveredDays": 17,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 30
    },
    {
      "slug": "beijing-xian-silk-road-15-day-private-tour",
      "days": 15,
      "beforeCoveredDays": 3,
      "supplementedDays": 10,
      "newlyCoveredDays": 7,
      "afterCoveredDays": 10,
      "uncoveredDays": [
        {
          "day": 10,
          "title": "High-speed train to Turpan"
        },
        {
          "day": 11,
          "title": "The Turpan oasis"
        },
        {
          "day": 12,
          "title": "High-speed train to Urumqi"
        },
        {
          "day": 13,
          "title": "Heavenly Lake"
        },
        {
          "day": 15,
          "title": "Depart"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 17
    },
    {
      "slug": "beijing-xian-silk-road-15-day-small-group-tour",
      "days": 15,
      "beforeCoveredDays": 3,
      "supplementedDays": 11,
      "newlyCoveredDays": 8,
      "afterCoveredDays": 11,
      "uncoveredDays": [
        {
          "day": 10,
          "title": "High-speed train to Turpan"
        },
        {
          "day": 11,
          "title": "The Turpan oasis"
        },
        {
          "day": 12,
          "title": "High-speed train to Urumqi"
        },
        {
          "day": 13,
          "title": "Heavenly Lake"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 17
    },
    {
      "slug": "beijing-xian-yunnan-14-day-private-tour",
      "days": 14,
      "beforeCoveredDays": 3,
      "supplementedDays": 12,
      "newlyCoveredDays": 9,
      "afterCoveredDays": 12,
      "uncoveredDays": [
        {
          "day": 11,
          "title": "Tiger Leaping Gorge to Shangri-La"
        },
        {
          "day": 12,
          "title": "Songzanlin Monastery and Pudacuo"
        }
      ],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 17
    },
    {
      "slug": "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
      "days": 14,
      "beforeCoveredDays": 3,
      "supplementedDays": 14,
      "newlyCoveredDays": 11,
      "afterCoveredDays": 14,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 23
    },
    {
      "slug": "china-grand-tour-21-day-private-tour",
      "days": 21,
      "beforeCoveredDays": 3,
      "supplementedDays": 21,
      "newlyCoveredDays": 18,
      "afterCoveredDays": 21,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 34
    },
    {
      "slug": "beijing-xian-guilin-shanghai-10-day-private-tour",
      "days": 10,
      "beforeCoveredDays": 3,
      "supplementedDays": 10,
      "newlyCoveredDays": 7,
      "afterCoveredDays": 10,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 20
    },
    {
      "slug": "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
      "days": 11,
      "beforeCoveredDays": 3,
      "supplementedDays": 11,
      "newlyCoveredDays": 8,
      "afterCoveredDays": 11,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 19
    },
    {
      "slug": "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
      "days": 13,
      "beforeCoveredDays": 3,
      "supplementedDays": 13,
      "newlyCoveredDays": 10,
      "afterCoveredDays": 13,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 17
    },
    {
      "slug": "beijing-xian-shanghai-8-day-private-tour",
      "days": 8,
      "beforeCoveredDays": 3,
      "supplementedDays": 8,
      "newlyCoveredDays": 5,
      "afterCoveredDays": 8,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 16
    },
    {
      "slug": "beijing-xian-guilin-hong-kong-10-day-private-tour",
      "days": 10,
      "beforeCoveredDays": 3,
      "supplementedDays": 10,
      "newlyCoveredDays": 7,
      "afterCoveredDays": 10,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 15
    },
    {
      "slug": "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour",
      "days": 12,
      "beforeCoveredDays": 3,
      "supplementedDays": 12,
      "newlyCoveredDays": 9,
      "afterCoveredDays": 12,
      "uncoveredDays": [],
      "originalHeroGalleryImages": 2,
      "originalUniqueImages": 5,
      "afterUniqueImages": 23
    }
  ]
} as const;
