import { getHomegroundStudioCopy, type HomegroundStudioCopy } from './homegroundStudioI18n';
import { germanGuideLanguageNote } from './germanSite';

const original = getHomegroundStudioCopy('en');
const members: Record<string, Omit<HomegroundStudioCopy['members'][number], 'image'> & { alt: string }> = {
  evan: {
    id: 'evan', name: 'Evan', role: 'Reiseplanung und interkulturelle Koordination',
    value: 'Aus den Unsicherheiten einer ersten China-Reise klare Möglichkeiten machen, die wir gemeinsam besprechen können.',
    bio: 'Evan hat an der Sogang-Universität in Korea studiert und auch in Taiwan, Thailand und Malaysia gelebt. Diese Erfahrung hilft ihm, die Fragen ausländischer Reisender vor dem ersten China-Aufenthalt zu verstehen: Welche Städte sollen bleiben, sind die Transfers realistisch und wird die Verständigung funktionieren? Er legt die Grundzüge der Reise fest und erklärt komplexe Entscheidungen auf Englisch oder Koreanisch.',
    tags: ['Englisch', 'Koreanisch', 'Interkulturelle Verständigung', 'Reisen durch mehrere Städte'], alt: 'Evan liest in einer Buchhandlung',
  },
  yoyo: {
    id: 'yoyo', name: 'Yoyo', role: 'Routenplanung und Abstimmung der Details',
    value: 'Auch lose Wünsche zu einer stimmigen Route verbinden.',
    bio: 'Ihr Studium der Buchhaltung hat Yoyos Sinn für Struktur geprägt. Sie verwandelt erste Ideen in umsetzbare Routen und prüft Übernachtungszahlen, Verbindungen zwischen den Städten und leicht übersehene Details. Durch ihre Arbeit mit Reisenden, besonders in Peking, fragt sie stets, ob der Plan wirklich zu den Menschen passt, die danach reisen werden.',
    tags: ['Routenplanung', 'Verteilung der Übernachtungen', 'Prüfung der Details', 'Verbindungen zwischen Städten'], alt: 'Yoyo an einem Bergsee während einer China-Reise',
  },
  tantan: {
    id: 'tantan', name: 'Tantan', role: 'Reiseplanung und Koordination in Hunan',
    value: 'Die Bedingungen vor Ort in jede Route rund um Zhangjiajie einbeziehen.',
    bio: 'Tantan arbeitet sowohl an der Reiseplanung als auch an der Koordination in Hunan, insbesondere in Zhangjiajie, Changsha und Fenghuang. Sie weiß, dass eine auf dem Papier einfache Strecke durch Fahrzeiten, Warteschlangen und Wetter komplizierter werden kann. Ihre Aufgabe ist zu prüfen, ob das Programm auch vor Ort funktioniert.',
    tags: ['Zhangjiajie', 'Changsha', 'Fenghuang', 'Koordination in Hunan'], alt: 'Tantan lächelt neben einem Elefanten während einer Thailandreise',
  },
  kevin: {
    id: 'kevin', name: 'Kevin', role: 'Reiseplanung und Organisation vor Ort',
    value: 'Abstimmungsprobleme erkennen, bevor sie einen Reisetag stören.',
    bio: 'Kevin hat Englisch studiert und schon während des Studiums als örtlicher Reiseleiter und in der Reiseorganisation gearbeitet. So hat er rund vier Jahre praktische Erfahrung gesammelt. Von der Ankunft über Stadttransfers und die Kommunikation mit Gästen bis zum Reiseablauf kennt er die verschiedenen Schritte. Er erkennt, wo die Abstimmung zwischen Beteiligten besondere Aufmerksamkeit braucht, und achtet darauf, dass ein ansprechendes Programm bei der Ankunft auch umsetzbar bleibt.',
    tags: ['Unterstützung auf Englisch', 'Organisation vor Ort', 'Begleitung der Abläufe', 'Prüfung des Reiseablaufs'], alt: 'Kevin vor der Putra-Moschee auf einer Malaysiareise',
  },
  vivi: {
    id: 'vivi', name: 'Vivi', role: 'Gästebetreuung und örtliche Koordination',
    value: 'Dafür sorgen, dass sich Reisende gehört, informiert und begleitet fühlen.',
    bio: 'Vivi bringt Erfahrung in der Betreuung vor Ort und eine herzliche Kommunikation mit. Neben der Liste der Besichtigungen achtet sie auf rechtzeitige Antworten, klare Übergaben zwischen Teams und die Wünsche der Reisenden. Sie unterstützt den Austausch und die örtliche Koordination und kümmert sich persönlich um die praktischen Einzelheiten des Aufenthalts.',
    tags: ['Austausch mit Reisenden', 'Örtliche Koordination', 'Übergaben zwischen Teams', 'Unterstützung während der Reise'], alt: 'Vivi macht auf einer Reise eine Getränkepause',
  },
};

export const germanStudioCopy: HomegroundStudioCopy = {
  path: '/de/studio/',
  metadata: { title: 'So plant Homeground Ihre China-Reise', description: 'Aus Ihren Terminen, Wünschen und Buchungen entsteht eine stimmige Route, mit schriftlich vereinbarten Leistungen und einem Team vor Ort.', openGraphTitle: 'So plant Homeground eine China-Reise' },
  eyebrow: 'So bereiten wir Ihre Reise vor',
  title: 'Von Ihrer Idee zu einer Reise, die funktioniert.',
  intro: 'Sagen Sie uns, was feststeht, was Ihnen wichtig ist und was noch offen ist. Eine feste Ansprechperson entwickelt eine stimmige Route, prüft die Umsetzbarkeit vor Ort und klärt den Arbeitsumfang, bevor kostenpflichtige Leistungen beginnen.',
  overview: {
    title: 'Vom ersten Gespräch zum schriftlichen Programm',
    stages: [
      { label: '01 / Ihr Vorhaben', title: 'Bei Ihrer Ausgangslage beginnen', detail: 'Termine, Reisende, Wunschziele, Tempo, Mobilität, bestehende Buchungen und offene Fragen.' },
      { label: '02 / Unsere Arbeit', title: 'Zuhören, prüfen und schriftlich festhalten', detail: 'Eine Ansprechperson prüft, was gut zusammenpasst, wo Schwierigkeiten liegen und welche Entscheidungen zuerst nötig sind.' },
      { label: '03 / Ihr Programm', title: 'Ein genauer Ablauf mit klaren Leistungen', detail: 'Sie erhalten das vereinbarte Dokument für Ihre Reise mit gemeinsam festgelegten Leistungen und konkreten Schritten.' },
    ],
    termsLabel: '04 / Der Zeitplan', termsTitle: 'Die Frist vereinbaren, bevor kostenpflichtige Arbeit beginnt',
    terms: [{ label: 'Frist', value: 'Der Übergabetermin für das vereinbarte Dokument wird vor der Zahlung bestätigt' }],
  },
  collageLabel: 'Fünf Mitglieder des Homeground-China-Teams', peopleEyebrow: 'Wer übernimmt welche Aufgabe?',
  peopleTitle: 'Unterschiedliche Erfahrungen, gemeinsam geplante Reisen.',
  peopleIntro: 'Ihre feste Ansprechperson hält den Austausch zusammen. Je nach Bedarf bringt das übrige Team Kenntnisse über Routen, Reiseziele, Organisation vor Ort und Gästebetreuung ein.',
  peopleDetailsLabel: 'Werdegang und Erfahrung',
  proof: { label: 'Homeground in Zahlen', people: 'Menschen im Homeground-Team', guides: 'veröffentlichte englischsprachige Ratgeber', tours: 'veröffentlichte Reisen', languages: 'Sprachausgaben der Website' },
  members: original.members.map(member => {
    const { alt, ...text } = members[member.id];
    return { ...text, image: { ...member.image, alt } };
  }),
  trust: {
    eyebrow: 'Unsere Arbeitsweise', title: 'Was nach Ihrer ersten Nachricht passiert.',
    body: 'Sie behalten eine feste Ansprechperson, die Ihre gesamte Reise kennt. Ihre Reisebestätigung hält fest, was Homeground organisiert und welche Unterstützung während des Aufenthalts enthalten ist.',
    inputsTitle: 'Was Sie uns schicken',
    inputs: ['Termine sowie Ankunfts- und Abreiseorte', 'Reisende, gewünschtes Tempo sowie Anforderungen an Mobilität und Zimmeraufteilung', 'Unverzichtbare Ziele und Stationen, auf die Sie verzichten könnten', 'Bestehende Buchungen, ein Budgetrahmen und Entscheidungen mit festen Fristen'],
    stepsTitle: 'Was wir tun',
    points: [
      { title: 'Ihr Vorhaben verstehen', detail: 'Wir klären, was feststeht, was flexibel bleibt und welche fehlenden Informationen die Route verändern könnten.' },
      { title: 'Die gesamte Reise prüfen', detail: 'Reihenfolge der Städte, Nächte, Transfers, Tempo und örtliche Einschränkungen werden gemeinsam betrachtet, damit die Etappen zusammenpassen.' },
      { title: 'Vor kostenpflichtiger Arbeit bestätigen', detail: 'Wir halten den passenden Service, die vorgesehenen Leistungen, das Angebot und die nächsten Schritte schriftlich fest.' },
    ],
    deliverablesTitle: 'Was Sie erhalten',
    deliverables: ['Bei vollständiger Betreuung: ein individuelles Reisedokument mit Vorbereitung, Reservierungen und Unterstützung vor Ort', 'Die zugrunde gelegten Annahmen, mögliche Kompromisse und nächste Entscheidungen für die vereinbarte Leistung'],
    boundary: `Die erste Anfrage zu einer Privatreise ist kostenlos. Wir bestätigen Reiseorganisation, enthaltene Leistungen und das Angebot für Ihre Termine und Gruppe vor der Buchung. ${germanGuideLanguageNote}`,
  },
  cta: { label: 'Der nächste Schritt', title: 'Welche Orte möchten Sie auf keinen Fall verpassen?', body: 'Schreiben Sie uns auf WhatsApp oder hinterlassen Sie Ihre E-Mail-Adresse. Eine Ansprechperson hilft, offene Punkte und den nächsten Schritt zu klären. Kostenpflichtige Leistungen beginnen erst nach Vereinbarung von Inhalt, Preis und Frist.', button: 'Meine Reise mit dem Team besprechen', secondaryButton: 'Alle Leistungen entdecken' },
  homeLink: 'Das Team kennenlernen, das Ihre Reise plant',
};
