/**
 * Private-tour deposit, change and cancellation terms, set by the owner on
 * 2026-10-22. Each private tour page shows them next to the price and the
 * refund page repeats them, in every language from this one source.
 * Small-group departures keep their own terms on their tour pages.
 */
export type PrivateTourTermsLanguage = "en" | "zh" | "ko" | "ja" | "fr" | "de" | "es" | "ar";

export interface PrivateTourBookingTerms {
  readonly title: string;
  readonly refundSectionTitle: string;
  readonly items: readonly { readonly title: string; readonly body: string }[];
  readonly smallGroups: { readonly title: string; readonly body: string };
}

export const privateTourBookingTerms: Readonly<Record<PrivateTourTermsLanguage, PrivateTourBookingTerms>> = {
  en: {
    title: "Deposit, changes and cancellation",
    refundSectionTitle: "Private tours",
    items: [
      { title: "Deposit and balance", body: "A 30% deposit confirms your private tour, and you pay the rest after you arrive in China. We add no fee of our own; card payments through VBill carry a 4% fee charged by VBill." },
      { title: "Cancelling 60 days or more before departure", body: "We keep 10% of the tour price for planning and booking, and refund the rest of what you paid us." },
      { title: "Cancelling 30–59 days before departure", body: "We keep 20% of the tour price and refund the rest of what you paid us." },
      { title: "Cancelling less than 30 days before departure", body: "The deposit is not refunded." },
      { title: "Costs we cannot recover", body: "If costs already paid out and not refundable, such as a non-refundable hotel, are higher than the amount above, we keep the actual cost instead." },
      { title: "Card fee", body: "The 4% fee VBill charges on card payments is not refunded in any case; refunds cover what you paid to us." },
      { title: "Visa refused", body: "Send us the official refusal notice and we treat the cancellation as 60 days or more before departure: we keep 10% of the tour price." },
      { title: "Changing dates, travellers or the route", body: "We re-price the trip first. Any loss already incurred, such as hotel or ticket change fees, is charged at cost for each change." },
      { title: "If we cannot deliver", body: "If a confirmed hotel, guide, vehicle or ticket falls through on our side, we arrange an equivalent or better alternative. If that is not possible or you do not accept it, we refund that item in full." },
      { title: "Forbidden City and Tiananmen", body: "On private tours that include Beijing, if we cannot book the Forbidden City or Tiananmen, we refund everything you have paid us, provided we have your passport details at least 8 days before the Forbidden City visit." },
    ],
    smallGroups: { title: "Small groups", body: "Each small-group tour page states its own deposit, minimum-numbers check, date-change and cancellation terms." },
  },
  zh: {
    title: "订金、变更与取消",
    refundSectionTitle: "私家团",
    items: [
      { title: "订金与尾款", body: "付团费的 30% 作为订金确认行程，其余到中国后再付。我们不另加任何费用；通过 VBill 刷卡时，VBill 平台收取 4% 手续费。" },
      { title: "出发前 60 天以上取消", body: "扣团费总价的 10% 作为规划和预订服务费，其余已付给我们的款项退还。" },
      { title: "出发前 30–59 天取消", body: "扣团费总价的 20%，其余已付给我们的款项退还。" },
      { title: "出发前不到 30 天取消", body: "订金全部不退。" },
      { title: "退不回来的费用", body: "已经付出去、退不回来的费用（比如不可退的酒店）如果比上面扣的多，按实际扣。" },
      { title: "刷卡手续费", body: "VBill 收取的 4% 刷卡手续费在任何情况下都不退；退款只退付给我们的那部分。" },
      { title: "拒签", body: "发来官方拒签通知，按出发前 60 天以上那一档处理，扣团费总价的 10%。" },
      { title: "改日期、人数或行程", body: "先重新计算价格；每次变更已经产生的实际损失（如酒店、门票改签费用）按实际收取。" },
      { title: "我们无法履约时", body: "已确认的酒店、导游、车辆或门票因我们的原因无法提供时，先安排同等或更好的替代；无法替代或你不接受时，退还这一项的全部费用。" },
      { title: "故宫和天安门", body: "含北京段的私家团，如果订不到故宫或天安门，退还你已付给我们的全部费用；前提是在故宫参观前至少 8 天把护照信息交给我们。" },
    ],
    smallGroups: { title: "小团", body: "每条小团线路页写明它自己的订金、人数核对、改期和取消规则。" },
  },
  ko: {
    title: "예약금, 변경, 취소",
    refundSectionTitle: "프라이빗 투어",
    items: [
      { title: "예약금과 잔금", body: "여행 금액의 30%를 예약금으로 내시면 일정이 확정되고, 나머지는 중국에 도착한 뒤 내십니다. Homeground는 별도 수수료를 받지 않지만, VBill로 카드 결제하면 VBill이 4% 수수료를 부과합니다." },
      { title: "출발 60일 이상 전 취소", body: "여행 금액의 10%를 계획·예약 비용으로 공제하고, 나머지 결제 금액을 환불합니다." },
      { title: "출발 30–59일 전 취소", body: "여행 금액의 20%를 공제하고, 나머지 결제 금액을 환불합니다." },
      { title: "출발 30일 미만 전 취소", body: "예약금은 환불되지 않습니다." },
      { title: "돌려받을 수 없는 비용", body: "이미 지불했고 환불받을 수 없는 비용(예: 환불 불가 호텔)이 위 공제액보다 많으면 실제 비용을 공제합니다." },
      { title: "카드 수수료", body: "VBill이 부과하는 4% 카드 수수료는 어떤 경우에도 환불되지 않으며, 환불 대상은 Homeground에 지불한 금액입니다." },
      { title: "비자 거절", body: "공식 거절 통지를 보내 주시면 출발 60일 이상 전 취소로 처리해 여행 금액의 10%를 공제합니다." },
      { title: "날짜·인원·일정 변경", body: "먼저 가격을 다시 계산합니다. 변경할 때마다 이미 발생한 실제 손실(호텔·입장권 변경 비용 등)은 실비로 청구합니다." },
      { title: "Homeground가 제공하지 못할 때", body: "확정된 호텔, 가이드, 차량, 입장권을 저희 사정으로 제공하지 못하면 같은 수준 이상의 대안을 마련합니다. 대안이 없거나 받아들이지 않으시면 해당 항목 비용 전액을 환불합니다." },
      { title: "고궁과 톈안먼", body: "베이징 일정이 포함된 프라이빗 투어에서 고궁(자금성)이나 톈안먼을 예약하지 못하면 Homeground에 지불한 금액 전액을 환불합니다. 단, 고궁 방문 최소 8일 전까지 여권 정보를 보내 주셔야 합니다." },
    ],
    smallGroups: { title: "소규모 그룹", body: "소규모 그룹 투어는 각 상품 페이지에 예약금, 인원 확인, 날짜 변경, 취소 조건을 따로 안내합니다." },
  },
  ja: {
    title: "お支払い・変更・キャンセル",
    refundSectionTitle: "プライベートツアー",
    items: [
      { title: "申込金と残金", body: "旅行代金の30%を申込金としてお支払いいただくと旅程が確定し、残金は中国到着後にお支払いいただきます。当社独自の手数料はいただきませんが、VBillでのカード決済にはVBillの手数料4%がかかります。" },
      { title: "出発60日以上前のキャンセル", body: "旅行代金の10%を企画・手配料として差し引き、残りのお支払い額を返金します。" },
      { title: "出発30〜59日前のキャンセル", body: "旅行代金の20%を差し引き、残りのお支払い額を返金します。" },
      { title: "出発30日前を過ぎてからのキャンセル", body: "申込金は返金されません。" },
      { title: "返金を受けられない費用", body: "すでに支払い済みで返金を受けられない費用（返金不可のホテルなど）が上記の金額を上回る場合は、実費を差し引きます。" },
      { title: "カード手数料", body: "VBillが請求する4%のカード手数料は、いかなる場合も返金されません。返金の対象は当社にお支払いいただいた金額です。" },
      { title: "ビザが発給されなかった場合", body: "公的な不許可通知をお送りいただければ、出発60日以上前のキャンセルとして扱い、旅行代金の10%を差し引きます。" },
      { title: "日程・人数・旅程の変更", body: "まず料金を再計算します。変更のたびにすでに発生した実際の損失（ホテルや入場券の変更費用など）は実費でいただきます。" },
      { title: "当社が手配できない場合", body: "確定したホテル、ガイド、車両、入場券を当社の事情で提供できない場合は、同等以上の代替手段を手配します。代替できない場合やご承諾いただけない場合は、その項目の代金を全額返金します。" },
      { title: "故宮と天安門", body: "北京を含むプライベートツアーで故宮または天安門を予約できなかった場合は、当社にお支払いいただいた全額を返金します。ただし、故宮見学の8日前までにパスポート情報をお送りいただくことが条件です。" },
    ],
    smallGroups: { title: "少人数グループ", body: "少人数グループの各ツアーページに、申込金、人数確認、日程変更、キャンセルの条件をそれぞれ記載しています。" },
  },
  fr: {
    title: "Acompte, modifications et annulation",
    refundSectionTitle: "Circuits privés",
    items: [
      { title: "Acompte et solde", body: "Un acompte de 30 % confirme votre circuit privé ; vous réglez le solde après votre arrivée en Chine. Nous n’ajoutons aucun frais ; les paiements par carte via VBill comportent des frais de 4 % prélevés par VBill." },
      { title: "Annulation 60 jours ou plus avant le départ", body: "Nous conservons 10 % du prix du circuit pour la préparation et les réservations, et remboursons le reste de ce que vous nous avez versé." },
      { title: "Annulation 30 à 59 jours avant le départ", body: "Nous conservons 20 % du prix du circuit et remboursons le reste de ce que vous nous avez versé." },
      { title: "Annulation moins de 30 jours avant le départ", body: "L’acompte n’est pas remboursé." },
      { title: "Frais non récupérables", body: "Si des frais déjà engagés et non remboursables, comme un hôtel non remboursable, dépassent le montant ci-dessus, nous retenons le coût réel." },
      { title: "Frais de carte", body: "Les frais de 4 % prélevés par VBill sur les paiements par carte ne sont jamais remboursés ; le remboursement porte sur ce que vous nous avez versé." },
      { title: "Refus de visa", body: "Envoyez-nous la notification officielle de refus : l’annulation est traitée comme faite 60 jours ou plus avant le départ, et nous conservons 10 % du prix du circuit." },
      { title: "Changement de dates, de voyageurs ou d’itinéraire", body: "Nous recalculons d’abord le prix. Toute perte déjà engagée, comme des frais de modification d’hôtel ou de billets, est facturée au coût réel à chaque changement." },
      { title: "Si nous ne pouvons pas fournir une prestation", body: "Si un hôtel, un guide, un véhicule ou un billet confirmé fait défaut de notre fait, nous proposons une solution équivalente ou meilleure. Si ce n’est pas possible ou si vous la refusez, nous remboursons intégralement cette prestation." },
      { title: "Cité interdite et Tiananmen", body: "Pour les circuits privés passant par Pékin, si nous ne pouvons pas réserver la Cité interdite ou Tiananmen, nous remboursons tout ce que vous nous avez versé, à condition d’avoir reçu vos données de passeport au moins 8 jours avant la visite de la Cité interdite." },
    ],
    smallGroups: { title: "Petits groupes", body: "Chaque page de circuit en petit groupe indique ses propres conditions d’acompte, de vérification du nombre de participants, de changement de date et d’annulation." },
  },
  de: {
    title: "Anzahlung, Änderungen und Stornierung",
    refundSectionTitle: "Privatreisen",
    items: [
      { title: "Anzahlung und Restzahlung", body: "Mit einer Anzahlung von 30 % ist Ihre Privatreise bestätigt; den Rest zahlen Sie nach Ihrer Ankunft in China. Wir berechnen keine eigenen Gebühren; bei Kartenzahlung über VBill erhebt VBill eine Gebühr von 4 %." },
      { title: "Stornierung 60 Tage oder mehr vor Abreise", body: "Wir behalten 10 % des Reisepreises für Planung und Buchung ein und erstatten den Rest Ihrer Zahlungen an uns." },
      { title: "Stornierung 30–59 Tage vor Abreise", body: "Wir behalten 20 % des Reisepreises ein und erstatten den Rest Ihrer Zahlungen an uns." },
      { title: "Stornierung weniger als 30 Tage vor Abreise", body: "Die Anzahlung wird nicht erstattet." },
      { title: "Nicht erstattbare Kosten", body: "Sind bereits gezahlte, nicht erstattbare Kosten – etwa für ein nicht stornierbares Hotel – höher als der Betrag oben, behalten wir stattdessen die tatsächlichen Kosten ein." },
      { title: "Kartengebühr", body: "Die Gebühr von 4 %, die VBill bei Kartenzahlungen erhebt, wird in keinem Fall erstattet; erstattet wird, was Sie an uns gezahlt haben." },
      { title: "Visum abgelehnt", body: "Senden Sie uns den offiziellen Ablehnungsbescheid; dann gilt die Stornierung als 60 Tage oder mehr vor Abreise, und wir behalten 10 % des Reisepreises ein." },
      { title: "Änderung von Datum, Reisenden oder Route", body: "Wir berechnen den Preis zuerst neu. Bereits entstandene Verluste, etwa Umbuchungsgebühren für Hotels oder Tickets, berechnen wir bei jeder Änderung zu den tatsächlichen Kosten." },
      { title: "Wenn wir eine Leistung nicht erbringen können", body: "Fällt ein bestätigtes Hotel, ein Guide, ein Fahrzeug oder ein Ticket aus Gründen auf unserer Seite aus, organisieren wir gleichwertigen oder besseren Ersatz. Ist das nicht möglich oder lehnen Sie ihn ab, erstatten wir diese Leistung vollständig." },
      { title: "Verbotene Stadt und Tiananmen", body: "Können wir bei Privatreisen mit Peking die Verbotene Stadt oder den Tiananmen nicht buchen, erstatten wir alles, was Sie an uns gezahlt haben – vorausgesetzt, Ihre Passdaten liegen uns mindestens 8 Tage vor dem Besuch der Verbotenen Stadt vor." },
    ],
    smallGroups: { title: "Kleingruppen", body: "Jede Kleingruppenreise nennt auf ihrer eigenen Seite die Bedingungen für Anzahlung, Teilnehmerprüfung, Terminwechsel und Stornierung." },
  },
  es: {
    title: "Depósito, cambios y cancelación",
    refundSectionTitle: "Viajes privados",
    items: [
      { title: "Depósito y saldo", body: "Un depósito del 30 % confirma tu viaje privado y pagas el resto al llegar a China. No añadimos ninguna comisión propia; los pagos con tarjeta mediante VBill tienen una comisión del 4 % que cobra VBill." },
      { title: "Cancelación con 60 días o más de antelación", body: "Retenemos el 10 % del precio del viaje por la planificación y las reservas, y devolvemos el resto de lo que nos pagaste." },
      { title: "Cancelación entre 30 y 59 días antes", body: "Retenemos el 20 % del precio del viaje y devolvemos el resto de lo que nos pagaste." },
      { title: "Cancelación con menos de 30 días", body: "El depósito no se devuelve." },
      { title: "Costes que no podemos recuperar", body: "Si los costes ya pagados y no reembolsables, como un hotel no reembolsable, superan el importe anterior, retenemos el coste real." },
      { title: "Comisión de tarjeta", body: "La comisión del 4 % que cobra VBill por los pagos con tarjeta no se devuelve en ningún caso; el reembolso cubre lo que nos pagaste a nosotros." },
      { title: "Visado denegado", body: "Envíanos la notificación oficial de denegación y tratamos la cancelación como hecha con 60 días o más de antelación: retenemos el 10 % del precio del viaje." },
      { title: "Cambios de fechas, viajeros o ruta", body: "Primero recalculamos el precio. Cualquier pérdida ya generada, como cargos por cambiar hoteles o entradas, se cobra al coste real en cada cambio." },
      { title: "Si no podemos cumplir", body: "Si un hotel, guía, vehículo o entrada confirmados fallan por causa nuestra, organizamos una alternativa equivalente o mejor. Si no es posible o no la aceptas, devolvemos íntegro el importe de ese servicio." },
      { title: "Ciudad Prohibida y Tiananmén", body: "En los viajes privados que incluyen Pekín, si no podemos reservar la Ciudad Prohibida o Tiananmén, te devolvemos todo lo que nos pagaste, siempre que tengamos los datos de tu pasaporte al menos 8 días antes de la visita a la Ciudad Prohibida." },
    ],
    smallGroups: { title: "Grupos reducidos", body: "Cada página de viaje en grupo reducido indica sus propias condiciones de depósito, comprobación de plazas, cambio de fecha y cancelación." },
  },
  ar: {
    title: "العربون والتعديلات والإلغاء",
    refundSectionTitle: "الرحلات الخاصة",
    items: [
      { title: "العربون والرصيد", body: "يؤكد عربون بنسبة 30% رحلتك الخاصة، وتدفع الباقي بعد وصولك إلى الصين. لا نضيف أي رسوم من جانبنا؛ أما الدفع بالبطاقة عبر VBill فتفرض عليه VBill رسومًا بنسبة 4%." },
      { title: "الإلغاء قبل المغادرة بـ60 يومًا أو أكثر", body: "نحتفظ بـ10% من سعر الرحلة مقابل التخطيط والحجوزات، ونرد إليك باقي ما دفعته لنا." },
      { title: "الإلغاء قبل المغادرة بـ30 إلى 59 يومًا", body: "نحتفظ بـ20% من سعر الرحلة، ونرد إليك باقي ما دفعته لنا." },
      { title: "الإلغاء قبل المغادرة بأقل من 30 يومًا", body: "لا يُرد العربون." },
      { title: "التكاليف غير المستردة", body: "إذا كانت التكاليف المدفوعة غير القابلة للاسترداد، مثل فندق غير قابل للاسترداد، أكبر من المبلغ أعلاه، نحتفظ بالتكلفة الفعلية بدلًا منه." },
      { title: "رسوم البطاقة", body: "رسوم الـ4% التي تفرضها VBill على الدفع بالبطاقة لا تُرد في أي حال، ويشمل الاسترداد ما دفعته لنا." },
      { title: "رفض التأشيرة", body: "أرسل إلينا إشعار الرفض الرسمي، فنعامل الإلغاء كأنه قبل المغادرة بـ60 يومًا أو أكثر، ونحتفظ بـ10% من سعر الرحلة." },
      { title: "تغيير التواريخ أو المسافرين أو المسار", body: "نعيد حساب السعر أولًا، وتُحتسب أي خسارة سبق تكبدها، مثل رسوم تعديل الفنادق أو التذاكر، بتكلفتها الفعلية عند كل تغيير." },
      { title: "إذا لم نتمكن من تقديم الخدمة", body: "إذا تعذّر تقديم فندق أو مرشد أو مركبة أو تذكرة مؤكدة لسبب يعود إلينا، نرتب بديلًا مماثلًا أو أفضل، وإذا تعذّر ذلك أو لم تقبله، نرد كامل قيمة هذه الخدمة." },
      { title: "المدينة المحرمة وتيانانمن", body: "في الرحلات الخاصة التي تشمل بكين، إذا لم نتمكن من حجز المدينة المحرمة أو تيانانمن، نرد إليك كل ما دفعته لنا، بشرط أن تصلنا بيانات جواز سفرك قبل زيارة المدينة المحرمة بـ8 أيام على الأقل." },
    ],
    smallGroups: { title: "المجموعات الصغيرة", body: "تذكر كل صفحة رحلة لمجموعة صغيرة شروطها الخاصة للعربون ومراجعة عدد المشاركين وتغيير الموعد والإلغاء." },
  },
};

/** The refund page's numbered sections for private tours and small groups, as cards. */
export function privateTourRefundSections(language: PrivateTourTermsLanguage, firstNumber: number) {
  const terms = privateTourBookingTerms[language];
  return [
    { id: "private-tours", title: `${firstNumber}. ${terms.refundSectionTitle}`, cards: terms.items },
    { id: "small-groups", title: `${firstNumber + 1}. ${terms.smallGroups.title}`, cards: [terms.smallGroups] },
  ] as const;
}
