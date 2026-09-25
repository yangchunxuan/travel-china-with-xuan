# Source log: best-2-week-china-tour

Reviewed 2026-09-25.

- Price amounts displayed in the proposed product data and fixed departure dates are read from `lib/privateTourLongHaulProducts.ts`. Regenerate the guide bodies when a long-haul price or date changes. Other figures, service rules, inclusions and route comparisons are written in the generator and must be reviewed against the product pages and supplier facts separately.
- The product URLs are part of this proposed release; they remain unavailable on the live site until this branch is approved and deployed.
- Travel times and site rules were checked against the product drafts on 2026-09-25 (see the long-haul handoff). Recheck date-sensitive details before release.
- China Railway 12306 is the official place to verify train schedules for the travel date (https://kyfw.12306.cn/index). The approximately seven-hour rail legs repeat the product fact-check; 2027 timetables are not published yet.
- Shangri-La City Government puts Jiantang town at about 3,300 metres above sea level (https://www.xianggelila.gov.cn/zfxxgk_xglls/fdzdgknr/gzdt/202508/20250801_231010.html).
