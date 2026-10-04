import type { LocalizedPrivateTourImage } from "./privateTourProducts";

const subjects: Readonly<Record<string, string>> = {
  "/images/tours/photo-quality-20261004/panda.webp": "成都パンダ基地",
  "/images/tours/photo-quality-20261004/sanxingdui.webp": "三星堆博物館",
  "/images/tours/photo-quality-20261004/volga.webp": "ヴォルガ・マナー",
  "/images/tours/photo-quality-20261004/hailar.webp": "ハイラル",
  "/images/tours/photo-quality-20261004/taiyuan.webp": "太原の汾河",
  "/images/tours/photo-quality-20261004/tianchi.webp": "天山天池",
  "/images/tours/photo-quality-20261004/bund.webp": "上海の外灘",
  "/images/tours/photo-quality-20261004/jinjiang.webp": "成都の錦江",
  "/images/tours/photo-quality-20261004/dujiangyan.webp": "都江堰",
  "/images/tours/photo-quality-20261004/dayanta.webp": "大雁塔",
  "/images/tours/photo-quality-20261004/terracotta.webp": "兵馬俑の1号坑",
  "/images/tours/photo-quality-20261004/wall.webp": "北京近郊の長城",
  "/images/tours/photo-quality-20261004/wulong.webp": "武隆の天生三橋",
  "/images/tours/photo-quality-20261004/fenghuang-river.webp": "鳳凰の沱江",
  "/images/tours/photo-quality-20261004/hongcun.webp": "宏村の月沼",
  "/images/tours/photo-quality-20261004/greeting-pine.webp": "黄山の迎客松",
  "/images/tours/photo-quality-20261004/horses.webp": "フルンボイル草原の馬"
};

export function withJapanesePhotoQuality(image: LocalizedPrivateTourImage): LocalizedPrivateTourImage {
  const text = subjects[image.src];
  return text ? { ...image, alt: text, caption: text } : image;
}
