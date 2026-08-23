import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const projectRoot = path.resolve(import.meta.dirname, "..");
const libraryRoot =
  process.env.HOMEGROUND_FACEBOOK_MEDIA_ROOT ??
  "/Users/yangchunxuan/Desktop/Facebook图片素材";

const assets = [
  {
    source: "上海优选素材/01_外滩与万国建筑/老城屋顶与陆家嘴黄昏_01.jpg",
    sourceSha:
      "0566e11dc1c7051bdac33b634bf22936ef288ec14f7fa1777a01f6e49701db90",
    output:
      "public/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/gallery-shanghai-dusk-1600.webp",
  },
  {
    source: "杭州优选素材/04_龙井梅家坞与茶文化/梅家坞茶园1.jpg",
    sourceSha:
      "726245fb58cd36fefc8fe16ec078fe993fea31bc60753e11822a7fa511519486",
    output:
      "public/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/gallery-hangzhou-tea-1600.webp",
  },
  {
    source: "上海优选素材/04_上海街巷与人文/清晨外滩观景平台_01.jpg",
    sourceSha:
      "657411c8798dcbedda5c4076ae0f406dfd0e096aba03f708a584da2fdf67459f",
    output:
      "public/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/arrival-shanghai-1600.webp",
    position: "centre",
  },
  {
    source: "成都优选素材/04_人民公园茶馆与生活/成都宽窄巷子里临街茶屋阳台.jpg",
    sourceSha:
      "999b4cd299866e7d84bc98abe2bb9de2ba489ad56fb5512065e779b00397b3d4",
    output:
      "public/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/gallery-teahouse-1600.webp",
  },
  {
    source:
      "成都优选素材/05_九眼桥锦江与城市夜景/成都IFS国际金融中心全景转角车流夜晚.jpg",
    sourceSha:
      "8ddc318cc0cd0d97258fe4d9a62a22a812513aa95d8d61e8b3960c18fc4ead1d",
    output:
      "public/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/departure-chengdu-1600.webp",
  },
  {
    source: "西安优选素材/05_街巷美食与人文/六妹素材 (8).jpg",
    sourceSha:
      "ee96b973f2f88846dd2f43f9e8179e1ce4dab078b43cb2232d5685a0d50af5a8",
    output:
      "public/images/tours/xian-terracotta-warriors-5-day-private-tour/gallery-muslim-quarter-1600.webp",
  },
  {
    source: "西安优选素材/01_城墙钟鼓楼与古城/西安古城墙在黄昏.jpg",
    sourceSha:
      "8d62c44451dff435621e4f3652f6dc4de52ba7d16c0e7d269a110102f74c5b7e",
    output:
      "public/images/tours/xian-terracotta-warriors-5-day-private-tour/arrival-city-wall-1600.webp",
  },
  {
    source: "重庆优选素材/01_重庆地标建筑/千厮门大桥与洪崖洞_02.jpg",
    sourceSha:
      "002f4e5fa7f3e1399e76860d239d9656b7f71053cd9a6a921827d129004125de",
    output:
      "public/images/tours/chongqing-wulong-5-day-private-tour/gallery-hongyadong-qiansimen-1600.webp",
    position: "east",
  },
  {
    source: "重庆优选素材/03_重庆自然景观/武隆天生三桥_峡谷碧水_01.jpg",
    sourceSha:
      "1277723ac2af0fa6381d8cbaea11cd493a27173f9827b6a0e8dfdb6aa99a4aee",
    output:
      "public/images/tours/chongqing-wulong-5-day-private-tour/gallery-wulong-canyon-1600.webp",
    position: "centre",
  },
  {
    source:
      "重庆优选素材/05_重庆桥梁与城市交通/重庆江北国际机场_自助值机_01.jpg",
    sourceSha:
      "0ac5e35014f3aabd916737f5d15b978e5c982e715f9fc1af38a0fbcf76a9a208",
    output:
      "public/images/tours/chongqing-wulong-5-day-private-tour/arrival-jiangbei-airport-1600.webp",
  },
  {
    source: "桂林优选素材/01_漓江与阳朔山水/六妹素材 (121).jpg",
    sourceSha:
      "2ccebbde46406c2956442ae1c4505add5130e7ec8d3e49e56e3ac9f8cc5fd9c0",
    output:
      "public/images/tours/guilin-yangshuo-5-day-private-tour/gallery-li-river-aerial-1600.webp",
  },
  {
    source: "桂林优选素材/03_两江四湖与日月双塔/六妹素材 (317).jpg",
    sourceSha:
      "ed85df972a32f9253dd1d118b48b2d18dad94830024424d6423f44c2dd71f17c",
    output:
      "public/images/tours/guilin-yangshuo-5-day-private-tour/gallery-sun-moon-towers-1600.webp",
  },
  {
    source: "桂林优选素材/01_漓江与阳朔山水/六妹素材 (75).jpg",
    sourceSha:
      "30871fb4431b39b772a41fba22261b189c5d6a00e9726ed440ddf4d3e9536eaf",
    output:
      "public/images/tours/guilin-yangshuo-5-day-private-tour/li-river-cruise-1600.webp",
  },
  {
    source: "桂林优选素材/06_竹筏游船与旅行体验/六妹素材 (225).jpg",
    sourceSha:
      "a5a72a0464550e5abe9afa0056be9b8b684a6dc0109432d90242647f0a9be2a0",
    output:
      "public/images/tours/guilin-yangshuo-5-day-private-tour/yulong-countryside-1600.webp",
  },
  {
    source: "桂林优选素材/02_象鼻山与城市地标/六妹素材 (306).jpg",
    sourceSha:
      "7306837c54c294495e1b29a77f486000bfe5ff972f67280e011f23812f7815ae",
    output:
      "public/images/tours/guilin-yangshuo-5-day-private-tour/elephant-trunk-hill-1600.webp",
  },
  {
    source: "上海优选素材/01_外滩与万国建筑/外滩钟楼与陆家嘴_01.jpg",
    sourceSha:
      "dcd9bfc865375c399abe7a726ad70c25579a2f1ef5bbeaae13c9e528037de5ed",
    output:
      "public/images/tours/shanghai-suzhou-5-day-private-tour/hero-shanghai-clocktower-1600.webp",
  },
  {
    source: "上海优选素材/05_夜景与城市氛围/上海夜景与城市氛围_01.jpg",
    sourceSha:
      "191875ad1b1892f146bf15a1a3fa286e379f941d2a63a7fd85f30e6143cd62ec",
    output:
      "public/images/tours/shanghai-suzhou-5-day-private-tour/gallery-shanghai-night-1600.webp",
  },
  {
    source: "上海优选素材/05_夜景与城市氛围/上海夜景与城市氛围_05.jpg",
    sourceSha:
      "fcf450a1a98a0d7535dd1d5e628110967319cd2ae272377440e08e6117a96dff",
    output:
      "public/images/tours/shanghai-suzhou-5-day-private-tour/arrival-shanghai-dusk-1600.webp",
  },
  {
    source:
      "上海优选素材/02_陆家嘴与东方明珠/上海中心与环球金融中心日落_01.jpg",
    sourceSha:
      "11160dfc14ac2a44be5ef23ce125ad00a331976a90174a8b52d79c79533527c9",
    output:
      "public/images/tours/shanghai-suzhou-5-day-private-tour/shanghai-skyline-1600.webp",
  },
  {
    source: "上海优选素材/05_夜景与城市氛围/极简滨水平台与陆家嘴_01.jpg",
    sourceSha:
      "fca06b730793ca53b8173fbbd56ddacc545876b8c54adbc51720611b63635ef8",
    output:
      "public/images/tours/shanghai-suzhou-5-day-private-tour/departure-shanghai-1600.webp",
  },
  {
    source: "北京优选素材/01_北京古都地标/故宫角楼暮色_01.jpg",
    sourceSha:
      "946d23187e01a342c1c957a3f91c14bee7c226a9ccedc092cade6c435dd94a16",
    output:
      "public/images/tours/beijing-highlights-5-day-private-tour/gallery-forbidden-corner-1600.webp",
  },
  {
    source: "北京优选素材/04_北京胡同与人文/北京胡同街巷_02.jpg",
    sourceSha:
      "c5dd20219f23f65499da102f58457c77cb0248c9ec16df6a4372d523b3bfab9f",
    output:
      "public/images/tours/beijing-highlights-5-day-private-tour/gallery-hutong-lane-1600.webp",
  },
  {
    source: "北京优选素材/06_北京交通与旅程/北京CBD立交夜景_01.jpg",
    sourceSha:
      "dfe63ef1f61c194d3739078b7e40cdbe6ce9de2ea596ff666a0a394e214af7e7",
    output:
      "public/images/tours/beijing-highlights-5-day-private-tour/arrival-beijing-city-1600.webp",
  },
  {
    source: "北京优选素材/01_北京古都地标/故宫宫廊_01.jpg",
    sourceSha:
      "61f67b2b17e038e33dcff61dfc148643100034929fb1d86e011e4a00c41eb47f",
    output:
      "public/images/tours/beijing-highlights-5-day-private-tour/forbidden-city-corridor-1600.webp",
  },
  {
    source: "北京优选素材/05_北京现代地标与城市/故宫与北京CBD_01.jpg",
    sourceSha:
      "3e296599e795dbfe5b7346724a6b42d9402d59e6c6d0e25fbdf33a3c6199f4a9",
    output:
      "public/images/tours/beijing-highlights-5-day-private-tour/departure-beijing-layers-1600.webp",
  },
];

const remoteAssets = [
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg",
    sourceSha:
      "6bf6c97be1d27b29c9700d29b14a29cfcb361f88f9fab9a1d92115046163d3e8",
    output:
      "public/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/hero-panda-1600.webp",
  },
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/%E6%9D%8E%E5%AD%90%E5%9D%9D%E7%AB%99%E8%BD%BB%E8%BD%A8%E7%A9%BF%E6%A5%BC_0023.png",
    sourceSha:
      "600ee1b9dca79fb76a7caf3c97b36d26a4fdd9058b2887d1898427e3527c86e8",
    output:
      "public/images/tours/chongqing-wulong-5-day-private-tour/liziba-train-through-building-1600.webp",
  },
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/Pan_Men.jpg",
    sourceSha:
      "ec5d2b54e0b49b4ead923074fbb28590cd89321f2a2aa16dbe43beb786a1c383",
    output:
      "public/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/panmen-1600.webp",
  },
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/00/Suzhou_Museum%2C_China_%282015%29_-_01.JPG",
    sourceSha:
      "cc49ffe5e6a776e5d7b9c1bc0406887b1a64f3568b3485b1677e4efa59450b16",
    output:
      "public/images/tours/shanghai-suzhou-5-day-private-tour/gallery-suzhou-museum-1600.webp",
    position: "north",
  },
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Humble_Administrator%27s_Garden_Suzhou_%282024%29_-_img_01.jpg",
    sourceSha:
      "2866b364a9f565bf109ea6e576b1632bfb37162102a6b596ab4bfd268afbc45a",
    output:
      "public/images/tours/shanghai-suzhou-5-day-private-tour/suzhou-humble-garden-1600.webp",
  },
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/54/St._Sophia_Cathedral%2C_Harbin%2C_China.jpg",
    sourceSha:
      "dd5ac7f466a32288e85850f92b56ece87e601b1ecb5f52682fbf6c573d93e6f9",
    output:
      "public/images/tours/harbin-winter-5-day-private-tour/gallery-sophia-2026-1600.webp",
  },
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Harbin_Ice_%26_Snow_Festival_2026.jpg",
    sourceSha:
      "6b12e4242f5ebb8f91a9280686295ea351a94221f5e81d1bf171e59238036c29",
    output:
      "public/images/tours/harbin-winter-5-day-private-tour/hero-ice-world-1600.webp",
  },
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/201907_Harbin_Railway_Station_07.jpg",
    sourceSha:
      "57d06e12b7ffe82eb59bb76febf1b59d56969d6741975baa9a0ca00d0c452ac6",
    output:
      "public/images/tours/harbin-winter-5-day-private-tour/departure-harbin-station-1600.webp",
  },
  {
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Temple_of_Heaven_-_Hall_of_Prayer_for_Good_Harvests_01.jpg",
    sourceSha:
      "7f6d470c16adeb0e6305089375f6eeb393b7f9ddb1dfd6cc2a66da169e8fc482",
    output:
      "public/images/tours/beijing-highlights-5-day-private-tour/temple-of-heaven-2024-1600.webp",
  },
];

const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");

for (const asset of assets) {
  const sourcePath = path.join(libraryRoot, asset.source);
  const outputPath = path.join(projectRoot, asset.output);
  const sourceBuffer = await readFile(sourcePath);
  const actualSourceSha = digest(sourceBuffer);
  if (actualSourceSha !== asset.sourceSha) {
    throw new Error(
      `Source hash mismatch for ${asset.source}: expected ${asset.sourceSha}, received ${actualSourceSha}`,
    );
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(sourceBuffer)
    .rotate()
    .resize(1600, 1000, {
      fit: "cover",
      position: asset.position ?? "centre",
    })
    .webp({ quality: 84 })
    .toFile(outputPath);

  const outputBuffer = await readFile(outputPath);
  console.log(
    JSON.stringify({
      source: asset.source,
      sourceSha: actualSourceSha,
      output: asset.output,
      outputSha: digest(outputBuffer),
      width: 1600,
      height: 1000,
    }),
  );
}

for (const asset of remoteAssets) {
  const response = await fetch(asset.sourceUrl, {
    headers: { "user-agent": "Homeground-China-media-review/2026-08-24" },
  });
  if (!response.ok) {
    throw new Error(
      `Unable to download ${asset.sourceUrl}: HTTP ${response.status}`,
    );
  }
  const sourceBuffer = Buffer.from(await response.arrayBuffer());
  const actualSourceSha = digest(sourceBuffer);
  if (actualSourceSha !== asset.sourceSha) {
    throw new Error(
      `Source hash mismatch for ${asset.sourceUrl}: expected ${asset.sourceSha}, received ${actualSourceSha}`,
    );
  }

  const outputPath = path.join(projectRoot, asset.output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(sourceBuffer)
    .rotate()
    .resize(1600, 1000, {
      fit: "cover",
      position: asset.position ?? "centre",
    })
    .webp({ quality: 84 })
    .toFile(outputPath);

  const outputBuffer = await readFile(outputPath);
  console.log(
    JSON.stringify({
      source: asset.sourceUrl,
      sourceSha: actualSourceSha,
      output: asset.output,
      outputSha: digest(outputBuffer),
      width: 1600,
      height: 1000,
    }),
  );
}
