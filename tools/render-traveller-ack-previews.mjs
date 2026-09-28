// Render deterministic review artifacts only. No email provider or network calls.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve,join } from 'node:path';
import { renderTravellerAcknowledgement } from '../supabase/functions/_shared/traveller-ack.ts';
import { getPrivateTourInquiryContext } from '../lib/privateTourInquiryContext.ts';
const target=resolve(process.argv[2]||'.local-review/confirmation-emails');
await mkdir(target,{recursive:true});
const entries=[];
for(const locale of ['en','zh','ko','ja'])for(const kind of ['homepage','tour']){
  const product=getPrivateTourInquiryContext('shanghai-suzhou-5-day-private-tour',locale,{packageId:'standard-guided',travelers:6});
  const mail=renderTravellerAcknowledgement({public_reference:'HG-1234-5678-ABCD',locale,
    entry_path:kind==='homepage'?'homepage_email':'private_tour_quote',
    answers:kind==='homepage'?{informationStatus:'not_provided'}:{productInterest:product,travelDate:'2026-12-03'},
    inquiry_created_at:'2026-09-28T06:00:00Z',first_response_due_at:'2026-09-29T06:00:00Z'});
  const name=`${locale}-${kind}`;
  await writeFile(join(target,`${name}.html`),mail.html);
  await writeFile(join(target,`${name}.txt`),`From: Homeground China <hello@homegroundchina.com>\nReply-To: hello@homegroundchina.com\nSubject: ${mail.subject}\n\n${mail.text}\n`);
  entries.push(`<li><strong>${locale.toUpperCase()} · ${kind==='homepage'?'首页咨询':'产品询价'}</strong> — <a href="${name}.html">HTML 预览</a> · <a href="${name}.txt">纯文本与邮件头</a></li>`);
}
await writeFile(join(target,'index.html'),`<!doctype html><html lang="zh"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Homeground 确认信本地预览</title><style>body{font:17px/1.7 system-ui,sans-serif;max-width:850px;margin:48px auto;padding:0 24px;color:#171717;background:#f9f8f6}li{padding:10px 0}a{color:#953923}strong{font-weight:650}.notice{padding:16px 22px;background:#fff;border:1px solid #ddd;border-radius:12px}</style><h1>确认信本地预览</h1><p class="notice">仅供审核，没有发送邮件。这里的 24 小时回复时限是演示值，正式启用前待确认。发件域认证、hello@ 的值守及真实投递尚未验证。</p><ul>${entries.join('')}</ul><p>自动确认信不提问，不要求再次提交，也不代表预订确认。</p></html>`);
console.log(`Rendered 8 HTML + 8 text confirmation previews: ${target}`);
