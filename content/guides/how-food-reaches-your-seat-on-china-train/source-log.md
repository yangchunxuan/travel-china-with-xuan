# Source log — how-food-reaches-your-seat-on-china-train

- Status: COPY READY — ASSETS NEEDED
- Candidate B13; new canonical; checked 2026-08-13. No exact conflict found.
- Boundary: order-to-seat operational chain, dynamic availability and failure fallback. It does not duplicate national ticketing or boarding instructions.

## Dynamic facts

- Current 12306 agreement: for products from outside merchants, the platform blocks orders/cancellations within 60 minutes of scheduled departure at the delivery station; a merchant may require an earlier cutoff. The rule is not generalised to all train-operated meals.
- The agreement lists Alipay and WeChat; the Shanghai municipal explainer also mentions cards. The copy exposes the difference and tells travellers to trust live checkout rather than promising card acceptance.
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
