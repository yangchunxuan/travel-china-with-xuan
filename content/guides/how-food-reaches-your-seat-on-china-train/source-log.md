# Source log — how-food-reaches-your-seat-on-china-train

- Status: RELEASE READY
- Candidate B13; new canonical; checked 2026-08-13. No exact conflict found.
- Boundary: order-to-seat operational chain, dynamic availability and failure fallback. It does not duplicate national ticketing or boarding instructions.

## Dynamic facts

- Current 12306 agreement: for products from outside merchants, the platform blocks orders/cancellations within 60 minutes of scheduled departure at the delivery station; a merchant may require an earlier cutoff. The rule is not generalised to all train-operated meals.
- The current 12306 agreement explicitly lists only Alipay and WeChat. The Shanghai municipal explainer mentions cards, but that secondary explainer is not treated as a platform guarantee; the copy does not promise card acceptance and tells travellers to trust live checkout.
- Ticket change/refund does not itself change the meal order: the user must cancel that separate order within its window. The agreement's no-seat handoff, merchant ten-minute confirmation and defined disruption-refund cases are now reflected in the copy.
- Eligible trains, stations, merchants, menus, interface, phone/contact requirements and delivery conditions are live-platform facts and are not hard-coded.
- Official public explainers cross-check the process; an independent operations paper cross-checks the timed network structure.

## Sources

- [12306 service agreement](https://kyfw.12306.cn/otn/gonggao/excater.html)
- [Shanghai official ordering explainer](https://english.shanghai.gov.cn/en-Transportation/20241213/1a3e604aa23140619e06d90e8d3004f4.html)
- [Beijing South service update](https://www.bjwmb.gov.cn/yw/10119254.html)
- [NDRC delivery-chain account](https://www.ndrc.gov.cn/xwdt/ztzl/cjsjyth1/xwzx/202111/t20211115_1303935_ext.html)
- [Independent optimisation study](https://www.hznu.edu.cn/upload/resources/file/2023/05/06/7774953.pdf)

- EN/ZH/KO preserve the six-stage relay, scoped delivery-station cutoff, independent meal-order recovery and passenger fallbacks.

## Final hero image

- Source: [12306 network meal-delivery centre at Nanjing South](https://commons.wikimedia.org/wiki/File:12306_network_ordering_delivery_center_at_Nanjingnan_Railway_Station_(20190224181934).jpg), N509FZ, 2019-02-24, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Processing: cropped to 1600×1000 WebP and stripped of metadata; the derivative remains under CC BY-SA 4.0.
- Evidence boundary: this is a historical operating scene. It does not establish 2026 merchants, eligible trains, ordering cut-offs or delivery volume.
