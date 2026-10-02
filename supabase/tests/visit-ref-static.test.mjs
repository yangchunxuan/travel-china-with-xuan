import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");

const ref = await import("../../lib/visitRef.ts");

const targets = { whatsappNumber: "8613174215999", email: "hello@homegroundchina.com" };

test("only notice countries with a matching time zone get the line", () => {
  const notice = (country, timeZone) =>
    ref.classifyVisitRegion({ country, timeZone, globalPrivacyControl: false, automated: false });
  assert.deepEqual([...ref.visitRefNoticeCountries], ["KR", "US", "SG", "MY", "AU", "HK"]);
  assert.equal(notice("KR", "Asia/Seoul"), "notice");
  assert.equal(notice("US", "America/Los_Angeles"), "notice");
  assert.equal(notice("MY", "Asia/Kuala_Lumpur"), "notice");
  assert.equal(notice("HK", "Asia/Hong_Kong"), "notice");
  // Strict countries and unknowns.
  for (const country of ["DE", "FR", "GB", "CH", "CN", "CA", "JP", "TW", null]) {
    assert.equal(notice(country, "Asia/Seoul"), "strict", String(country));
  }
  // A notice-country IP with a strict time zone (VPN from China, Europe, Canada).
  assert.equal(notice("HK", "Asia/Shanghai"), "strict");
  assert.equal(notice("US", "Europe/Berlin"), "strict");
  assert.equal(notice("US", "America/Toronto"), "strict");
  // Global Privacy Control and automated browsers.
  assert.equal(ref.classifyVisitRegion({ country: "KR", timeZone: "Asia/Seoul", globalPrivacyControl: true, automated: false }), "strict");
  assert.equal(ref.classifyVisitRegion({ country: "US", timeZone: null, globalPrivacyControl: false, automated: true }), "strict");
});

test("the country is read from Cloudflare's trace body", () => {
  assert.equal(ref.countryFromTrace("fl=1\nh=homegroundchina.com\nloc=KR\ntls=TLSv1.3\n"), "KR");
  assert.equal(ref.countryFromTrace("loc=US"), "US");
  assert.equal(ref.countryFromTrace("location=KR\n"), null);
  assert.equal(ref.countryFromTrace(""), null);
});

test("sources are grouped into a few labels and never echo an unknown host", () => {
  const label = (referrer, utmSource = null) =>
    ref.visitSourceLabel({ referrer, utmSource, ownHost: "homegroundchina.com" });
  assert.equal(label("https://www.google.com/"), "google");
  assert.equal(label("https://www.google.com.sg/"), "google");
  assert.equal(label("https://gemini.google.com/app"), "gemini");
  assert.equal(label("https://search.naver.com/search.naver?query=x"), "naver");
  assert.equal(label("https://blog.naver.com/xuantour/1"), "naver-blog");
  assert.equal(label("https://chatgpt.com/"), "chatgpt");
  assert.equal(label("https://www.perplexity.ai/search"), "perplexity");
  assert.equal(label("https://l.facebook.com/l.php"), "facebook");
  assert.equal(label("https://www.tripadvisor.com.my/"), "tripadvisor");
  assert.equal(label("https://some-private-blog.example/post"), "other");
  assert.equal(label(""), "direct");
  assert.equal(label("not a url"), "other");
  assert.equal(label("https://homegroundchina.com/zh/"), "site");
  // Landing UTM wins; ChatGPT's own utm_source is folded into the same label.
  assert.equal(label("", "chatgpt.com"), "chatgpt");
  assert.equal(label("https://www.google.com/", "facebook"), "utm:facebook");
  assert.equal(label("", "bad value with spaces"), "direct");
});

test("page tags are short paths, and invalid paths give no line", () => {
  assert.equal(ref.visitPageTag("/zh/guides/forbidden-city-for-foreign-visitors/"), "zh/guides/forbidden-city-for-foreign-visitors");
  assert.equal(ref.visitPageTag("/"), "home");
  assert.equal(ref.visitPageTag("/guides/<script>/"), null);
  assert.equal(ref.visitPageTag(null), null);
  assert.equal(ref.visitRefLine("guides/x", "google"), "Ref: guides/x · google");
  assert.equal(ref.visitRefLine(null, "google"), null);
});

test("only Homeground's own WhatsApp and email links are rewritten, once", () => {
  const line = "Ref: zh/guides/forbidden-city-for-foreign-visitors · google";
  const text = "你好，我想请 Homeground 代预约中国景点门票。\n服务: 景点代预约";
  const wa = `https://wa.me/8613174215999?text=${encodeURIComponent(text)}`;
  const rewritten = ref.appendVisitRefToContactHref(wa, line, targets);
  assert.equal(decodeURIComponent(new URL(rewritten).searchParams.get("text")), `${text}\n\n${line}`);
  assert.doesNotMatch(rewritten, /\+/u, "spaces stay percent-encoded for WhatsApp");
  assert.equal(ref.appendVisitRefToContactHref(rewritten, line, targets), rewritten, "a second click does not add a second line");

  const mail = `mailto:hello@homegroundchina.com?subject=${encodeURIComponent("Reservation")}&body=${encodeURIComponent("Hi")}`;
  const mailRewritten = ref.appendVisitRefToContactHref(mail, line, targets);
  assert.match(mailRewritten, /^mailto:hello@homegroundchina\.com\?subject=Reservation&body=/u);
  assert.equal(decodeURIComponent(mailRewritten.split("&body=")[1]), `Hi\n\n${line}`);

  for (const other of [
    `https://wa.me/447700900123?text=${encodeURIComponent(text)}`,
    "mailto:someone@example.com?body=Hi",
    "https://m.me/homegroundchina",
    "https://homegroundchina.com/zh/",
  ]) {
    assert.equal(ref.appendVisitRefToContactHref(other, line, targets), other, other);
  }
  assert.equal(ref.appendVisitRefToContactHref(wa, null, targets), wa, "no line, no change");
});

test("the line is started site-wide, added to KakaoTalk text, and disclosed in every privacy notice", async () => {
  const [siteAnalytics, kakao, module] = await Promise.all([
    source("components/SiteAnalytics.tsx"),
    source("components/KakaoTalkContact.tsx"),
    source("lib/visitRef.ts"),
  ]);
  assert.match(siteAnalytics, /startVisitRef\(\{/u);
  assert.match(kakao, /appendVisitRef\(inquiry\(\), currentVisitRefLine\(\)\)/u);
  assert.doesNotMatch(module, /localStorage|sessionStorage|document\.cookie|indexedDB/u, "nothing is stored on the device");
  assert.match(module, /document\.addEventListener\("click", rewriteClickedContactLink, true\)/u);

  const expected = {
    en: /Korea, the United States, Singapore, Malaysia, Australia and Hong Kong[\s\S]*Ref: guides\/forbidden-city-for-foreign-visitors · google[\s\S]*Global Privacy Control/u,
    zh: /韩国、美国、新加坡、马来西亚、澳大利亚和香港[\s\S]*Ref: guides\/forbidden-city-for-foreign-visitors · google[\s\S]*全球隐私控制/u,
    ko: /한국, 미국, 싱가포르, 말레이시아, 호주, 홍콩[\s\S]*Ref: guides\/forbidden-city-for-foreign-visitors · google[\s\S]*글로벌 개인정보 보호 제어/u,
  };
  const privacyCopy = await source("lib/homegroundPrivacyI18n.ts");
  for (const locale of ["en", "zh", "ko"]) assert.match(privacyCopy, expected[locale], locale);
});
