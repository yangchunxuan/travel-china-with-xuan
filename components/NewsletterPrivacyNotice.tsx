import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getNewsletterEndpoint } from "../lib/newsletter";
import styles from "./HomegroundPrivacyPage.module.css";
const copy = {
  en: {
    title: "Travel newsletter",
    body: "When you choose to subscribe, we collect your email, interface language, the page where you signed up and a record of your newsletter permission. These records are separate from travel enquiries. Cookie choices do not subscribe you to emails. We activate your subscription only after you confirm it by email.",
    service: "Subscriber records are stored in Supabase and confirmation emails are delivered through Resend. We use your details to deliver the newsletter and manage subscription choices. Opening a confirmation or unsubscribe page does not change your subscription until you press its button. These pages do not load our optional analytics or marketing measurement.",
    retention: "Unconfirmed requests are removed after 7 days. After an unsubscribe, the email and first name are removed from the subscriber record after 30 days; a protected email hash and permission history remain to honour the unsubscribe. Active subscriptions remain while you subscribe. Confirmation delivery records are kept for up to 30 days. You can unsubscribe through the link in our emails or contact us to request deletion.",
    storage: "Your browser stores a small interface preference to prevent repeated newsletter prompts. It contains no email address and does not enable analytics or advertising.",
  },
  zh: {
    title: "旅行简报订阅",
    body: "主动订阅时，我们保存你的邮箱、界面语言、订阅来源页面和邮件订阅许可记录。这些记录与旅行咨询分开保存。选择 Cookie 不等于订阅邮件，只有你通过邮箱确认后，订阅才会生效。",
    service: "订阅记录保存在 Supabase，确认邮件通过 Resend 发送。我们使用这些信息发送简报和管理订阅选择。打开确认或退订页面不会直接改变订阅状态，需点击页面按钮后才会生效。这些页面不加载我们的可选分析或广告衡量。",
    retention: "未确认的申请在 7 天后删除。退订后，订阅记录中的邮箱与称呼在 30 天后移除，保留受保护的邮箱哈希和许可历史，以遵守你的退订选择。有效订阅在你保持订阅期间保留。确认邮件发送记录最多保留 30 天。你可以通过邮件中的链接退订，或联系我们申请删除。",
    storage: "浏览器会保存一个防止简报窗口反复出现的界面偏好，其中不含邮箱，也不会开启分析或广告追踪。",
  },
  ko: {
    title: "여행 뉴스레터 구독",
    body: "직접 구독을 신청하면 이메일, 화면 언어, 신청 페이지와 구독 동의 기록을 저장합니다. 여행 문의와 별도로 관리하며, 쿠키 선택만으로 이메일을 구독하게 되지는 않습니다. 이메일 확인을 마쳐야 구독이 시작됩니다.",
    service: "구독 정보는 Supabase에 저장하고 확인 이메일은 Resend로 발송합니다. 뉴스레터 발송과 구독 관리에 이 정보를 사용합니다. 확인 또는 해지 페이지를 여는 것만으로 상태가 바뀌지 않으며, 페이지의 버튼을 눌러야 적용됩니다. 이 페이지에서는 선택적 분석이나 광고 측정을 사용하지 않습니다.",
    retention: "미확인 신청은 7일 후 삭제합니다. 구독 해지 후 30일이 지나면 이메일과 이름을 구독 정보에서 지우며, 해지 선택을 존중하기 위해 보호된 이메일 해시와 동의 이력은 보관합니다. 활성 구독은 구독 기간 동안 유지합니다. 확인 메일 발송 기록은 최대 30일간 보관합니다. 메일의 링크로 해지하거나 연락하여 삭제를 요청할 수 있습니다.",
    storage: "브라우저에는 구독 안내가 반복되지 않도록 화면 설정을 저장합니다. 이메일 주소는 포함되지 않으며 분석이나 광고 추적을 활성화하지 않습니다.",
  },
};
export function NewsletterPrivacyNotice({ locale }: { locale: HomegroundLocale }) {
  if (!getNewsletterEndpoint()) return null;
  const text = copy[locale];
  return <section className={styles.section} aria-labelledby="newsletter-privacy-title">
    <header className={styles.sectionHeading}><h2 id="newsletter-privacy-title">{text.title}</h2></header>
    <p>{text.body}</p><p>{text.service}</p><p>{text.retention}</p><p>{text.storage}</p>
  </section>;
}
