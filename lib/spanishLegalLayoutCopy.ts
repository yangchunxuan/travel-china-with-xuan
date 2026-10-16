import { getHomegroundLegalCopy, type HomegroundLegalCopy, type HomegroundLegalPageId } from './homegroundLegalI18n';
import type { HomegroundPrivacyCopy } from './homegroundPrivacyI18n';
import { getSpanishLegalCopy } from './spanishLegalCopy';
import { homegroundBusiness as business } from './homegroundBusiness';
import { travelAgencyCertificateHolder as certificates } from './homegroundTravelAgencyCredentials';

/** Spanish content for the original legal components, preserving their structure. */
export function getSpanishLegalLayoutCopy(pageId: HomegroundLegalPageId): HomegroundLegalCopy {
  const source = getHomegroundLegalCopy(pageId, 'en');
  const base: HomegroundLegalCopy = {
    ...source, htmlLang: 'es', pagePath: `/es/${pageId}/`, homePath: '/es/', languageShort: 'ES',
    skipLink: 'Ir al contenido',
    navigation: { homeLabel: 'Inicio de Homeground China', languageLabel: 'Idioma de la página', pageLabel: 'Información legal', homeCta: 'Hablar de mi viaje' },
    relatedLabel: 'Información sobre la empresa y los servicios',
    related: { business: 'Información de la empresa', terms: 'Condiciones del servicio', refund: 'Reembolsos y entrega', privacy: 'Privacidad', contact: 'Escríbenos' },
  };
  if (pageId !== 'business-information') {
    const copy = getSpanishLegalCopy(pageId);
    return { ...base, metadata: copy.metadata, navigation: { ...base.navigation, pageLabel: copy.hero.eyebrow }, hero: { ...copy.hero, reviewedLabel: 'Última revisión del texto original' }, callout: copy.callout, sections: copy.sections };
  }
  return {
    ...base,
    metadata: { title: 'Información legal y licencia de Homeground China', description: 'Empresa operadora, registro y licencia de agencia de viajes de Homeground China, documentos y condiciones de confirmación antes del pago.' },
    hero: { eyebrow: 'Información de la empresa', title: '¿Quién está detrás de Homeground?', intro: 'Homeground es una marca de viajes por China operada por una agencia registrada legalmente en Pekín, China continental. Su licencia cubre el turismo nacional y la recepción de viajeros procedentes del extranjero.', reviewedLabel: 'Última revisión del texto original', reviewedValue: '15 de septiembre de 2026' },
    callout: { label: 'Empezar con claridad', title: 'Una empresa que puedes verificar y servicios definidos antes del pago.', body: 'Cuéntanos tu proyecto. Aclaramos tus necesidades y los siguientes pasos por escrito. Para cualquier servicio aceptado, indicamos el contenido, el precio, el alcance, los plazos y las condiciones de pago antes de que pagues.' },
    sections: [
      { id: 'registered-details', title: 'Datos de registro', facts: [
        { label: 'Denominación registrada', value: business.registeredName },
        { label: 'Código Unificado de Crédito Social', value: business.unifiedSocialCreditCode },
        { label: 'Representante legal', value: business.legalRepresentative },
        { label: 'Domicilio social', value: business.registeredAddress },
        { label: 'Autoridad de registro', value: business.registrationAuthority },
        { label: 'Fecha de constitución', value: business.registrationDate },
        { label: 'Registro oficial', value: 'Sistema Nacional de Información Crediticia Empresarial de China', detail: `Busca el código ${business.unifiedSocialCreditCode} en este sitio en chino.`, href: business.registryUrl, external: true },
      ] },
      { id: 'travel-agency-credentials', title: 'Licencia y documentos de la agencia', paragraphs: ['La empresa que opera Homeground dispone de los documentos siguientes para el turismo nacional y receptivo en China.'], facts: [
        { label: 'Empresa operadora', value: business.registeredName, detail: business.englishName },
        { label: 'Código Unificado de Crédito Social', value: business.unifiedSocialCreditCode },
        { label: 'Número de licencia de agencia de viajes', value: business.travelAgencyLicenceNumber },
        { label: 'Referencia de la autorización', value: business.travelAgencyPermitDocumentNumber },
        { label: 'Actividades autorizadas', value: 'Turismo nacional en China y turismo receptivo' },
        { label: 'Licencia de agencia de viajes', value: 'Consultar la licencia', href: certificates.travelAgencyLicencePath },
        { label: 'Licencia comercial', value: 'Consultar la licencia comercial', href: certificates.businessLicencePath },
        { label: 'Verificar la licencia turística', value: 'Ministerio de Cultura y Turismo de China', detail: 'Busca el nombre chino de la empresa indicado arriba en este sitio en chino.', href: business.travelAgencyRegistryUrl, external: true },
        { label: 'Verificar el registro', value: 'Sistema Nacional de Información Crediticia Empresarial de China', detail: `Busca el código ${business.unifiedSocialCreditCode} en este sitio en chino.`, href: business.registryUrl, external: true },
      ] },
      { id: 'current-services', title: 'Servicios actuales', cards: [{ title: 'Planificación del viaje y asistencia en destino', body: 'Comparte tu proyecto completo con Homeground. Empezamos por las fechas, quiénes viajan, las prioridades y la ayuda que necesitas; después definimos los servicios y una propuesta viable.' }], paragraphs: ['Ya no ofrecemos la revisión ni el diseño de itinerarios como servicios independientes de pago. Los servicios aceptados anteriormente mantienen su acuerdo escrito original. Para los viajes privados, la organización, los servicios incluidos, el precio y las condiciones de pago se confirman por escrito antes de reservar.'] },
      { id: 'how-it-starts', title: 'Los pasos de tu solicitud', numbered: ['Cuéntanos tu proyecto de viaje sin coste.', 'Homeground aclara tus necesidades y los servicios que puede ofrecer el equipo.', 'Antes del pago, recibe una confirmación escrita con la empresa operadora, el servicio, el precio y la moneda, lo incluido, los datos necesarios, la fecha de entrega y las condiciones aplicables.', 'Las instrucciones de pago se envían por separado.', 'Los servicios acordados comienzan después de confirmar el pago y recibir todos los datos necesarios.'] },
      { id: 'payment-records', title: 'Pago y datos de contacto', paragraphs: ['No envíes datos de tarjetas, credenciales bancarias ni códigos QR de pago por el formulario del sitio. Antes de pagar, comprueba que el destinatario coincide con la confirmación escrita. Las opciones de factura o recibo se aclaran antes del pago.'], facts: [{ label: 'Consultas sobre los servicios o tus datos', value: business.serviceEmail, href: `mailto:${business.serviceEmail}` }, { label: 'Domicilio social', value: business.registeredAddress }] },
    ],
  };
}

/** Map the complete Spanish notice onto the original privacy layout. */
export function getSpanishPrivacyLayoutCopy(): HomegroundPrivacyCopy {
  const copy = getSpanishLegalCopy('privacy');
  function section(id: string) {
    const item = copy.sections.find(s => s.id === id);
    if (!item) throw new Error(`Missing Spanish privacy section: ${id}`);
    return item;
  }
  function rows(id: string, eyebrow: string) {
    const item = section(id);
    return { eyebrow, title: item.title, intro: item.paragraphs?.join(' ') ?? '', rows: (item.facts ?? []).map(f => ({ label: f.label, value: f.value, detail: f.detail ?? '' })) };
  }
  const flow = section('current-flow'), collection = section('collection'), choices = section('choices'), contact = section('contact');
  return {
    htmlLang: 'es', pagePath: '/es/privacy/', homePath: '/es/', languageShort: 'ES', metadata: copy.metadata, skipLink: 'Ir al aviso de privacidad',
    navigation: { homeLabel: 'Inicio de Homeground China', languageLabel: 'Idioma del aviso', privacyLabel: 'Privacidad', homeCta: 'Hablar de mi viaje' },
    hero: { ...copy.hero, reviewedLabel: 'Última revisión del texto original' },
    status: { eyebrow: copy.callout!.label, title: copy.callout!.title, body: copy.callout!.body, blockersTitle: 'Los puntos esenciales', blockers: copy.callout!.bullets ?? [] },
    currentFlow: { title: flow.title, paragraphs: flow.paragraphs ?? [] },
    collection: { eyebrow: 'Los datos que recogemos', title: collection.title, intro: collection.paragraphs?.join(' ') ?? '', items: (collection.facts ?? []).map(f => ({ name: f.label, stage: f.value, purpose: f.detail ?? '' })) },
    reservation: rows('attraction-reservations', 'Reservas aceptadas'), providers: rows('providers', 'Proveedores'), configuration: rows('configuration', 'Conservación y acceso'),
    choices: { eyebrow: 'Tus opciones', title: choices.title, paragraphs: choices.paragraphs ?? [], items: choices.bullets ?? [] },
    contact: { eyebrow: 'Tus datos personales', title: contact.title, body: contact.paragraphs?.join(' ') ?? '', emailLabel: 'Correo de privacidad', emailPlaceholder: business.serviceEmail, addressLabel: 'Domicilio social', addressPlaceholder: business.registeredAddress },
    footer: section('scope').paragraphs?.join(' ') ?? '',
  };
}
