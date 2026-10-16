import type { ContactEdition } from './contactEdition.ts';
import type { PrivateTourInquiryContext } from './privateTourInquiryContext.ts';
import type { TourContactDraft } from './tourContactDraft.ts';
import { homegroundBusiness } from './homegroundBusiness.ts';
import { homegroundWhatsAppHref } from './tourContact.ts';
import { spanishContactTourNames, spanishContactPackageLabels } from './spanishContactNames.ts';
import { spanishLegacyZhangjiajieContactTitle, spanishLegacyStayNames, spanishLegacyDraftStayName } from './spanishLegacyContactCopy.ts';
export { spanishContactTourNames, spanishContactPackageLabels } from './spanishContactNames.ts';
const pattern=/^\/es\/tours\/([a-z0-9-]+)\/$/u;
function tourName(context:PrivateTourInquiryContext){return context.slug==='zhangjiajie-4-day-private-tour'?spanishLegacyZhangjiajieContactTitle:spanishContactTourNames[context.slug]??context.name;}
function travellersLabel(count:number){return `${count} ${count===1?'viajero':'viajeros'}`;}
function selectionLabel(context:PrivateTourInquiryContext){
 const selected=context.selection;if(!selected)return null;
 const label=context.slug==='zhangjiajie-4-day-private-tour'?spanishLegacyStayNames[selected.packageId as keyof typeof spanishLegacyStayNames]:spanishContactPackageLabels[`${context.slug}:${selected.packageId}`];
 return label?`${label} · ${travellersLabel(selected.travelers)}`:null;
}
function draftText(draft?:TourContactDraft){
 if(!draft)return '';
 const stay=spanishLegacyDraftStayName(draft.stayPreference);
 return [`Llegada prevista: ${draft.travelDate||'fechas por decidir'}`,draft.requestedTravelers!=null?`Viajeros: ${draft.requestedTravelers}`:'',stay?`Alojamiento preferido (por confirmar): ${stay}`:'',draft.note.trim()?`Detalles del viaje: ${draft.note.trim()}`:'',draft.referralSource?`Cómo conocí Homeground: ${draft.referralSource==='friend'?'Recomendación de amigos o familia':draft.referralSource==='other'?'Otro':draft.referralSource}`:''].filter(Boolean).join('\n');
}
function messageText(context:PrivateTourInquiryContext|null,path?:string,draft?:TourContactDraft){
 const page=context?`/es/tours/${context.slug}/`:path;
 const stay=context?.customGroup?.stayId?spanishLegacyStayNames[context.customGroup.stayId]:null;
 return ['Hola, me gustaría organizar un viaje a China.',context?tourName(context):'',context?selectionLabel(context):'',stay&&!draft?.stayPreference?`Alojamiento preferido (por confirmar): ${stay}`:'',page?.startsWith('/es/')?`Página: https://homegroundchina.com${page}`:'',draftText(draft),'Guía en español (con suplemento):'].filter(Boolean).join('\n');
}
export function spanishContactWhatsAppHref(context:PrivateTourInquiryContext|null,path?:string){return homegroundWhatsAppHref(messageText(context,path));}
/** Spanish UI; the existing English intake contract and server validation stay unchanged. */
export const spanishContactEdition:ContactEdition={
 language:'es',intlLocale:'es-ES',toursPath:'/es/tours/',privacyHref:'/es/privacy/',homePath:'/es/',
 tourPath:slug=>`/es/tours/${slug}/`,tourSlugFromPath:path=>pattern.exec(path)?.[1]??null,isGuidePath:path=>/^\/es\/guias\/(?:[a-z0-9-]+\/)?$/u.test(path),
 tourName,travellersLabel,selectionLabel,messageText,
 stayPreferenceLabel:context=>context.customGroup?.stayId?spanishLegacyStayNames[context.customGroup.stayId]:null,
 mailtoHref:(context,draft,guide)=>`mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(context?`Presupuesto: ${tourName(context)}`:'Mi viaje a China')}&body=${encodeURIComponent(messageText(context,guide?.path,draft).replace(/\r?\n/g,'\r\n'))}`,
 noteMarker:path=>`[Sent from the Spanish page https://homegroundchina.com${path}; the traveller read it in Spanish. Spanish-speaking guide is quoted separately.]`,
 noteTooLong:limit=>`El mensaje no puede superar los ${limit} caracteres.`,
 frame:{title:'Hablemos de tu viaje',close:'Cerrar'},
 card:{
  title:'Hablemos de tu viaje',close:'Cerrar',chinaTime:'Hora de China',tourLabel:'Tu itinerario',guideLabel:'Sobre esta guía',
  scanTitle:'Continúa la conversación en tu móvil',scanSteps:['Escanea el código con la cámara del móvil.','WhatsApp se abrirá con un mensaje listo para enviar.'],qrLabel:'Código QR para hablar con Homeground por WhatsApp',numberLabel:'WhatsApp',copy:'Copiar',copied:'Copiado',copyNumber:'Copiar el número de WhatsApp',copyEmail:'Copiar la dirección de correo',useHere:'Usar WhatsApp en este ordenador',or:'o',replyFrom:'Respondemos desde',directEmailAction:'Escribir por correo',openMailApp:'Abrir tu aplicación de correo',tabsLabel:'Formas de contactar',tabWhatsApp:'WhatsApp',tabEmail:'Correo',tabMessenger:'Messenger',messengerScanTitle:'Escanea para hablar por Messenger',messengerSteps:['Escanea el código con tu móvil.','Messenger abrirá una conversación con nosotros.'],messengerQrLabel:'Código QR para hablar con Homeground por Messenger',
 },
 desk:{
  whatsappAction:'Abrir WhatsApp',whatsappOpensExternally:'Abre WhatsApp en otra pestaña o en la aplicación. Debes enviar el mensaje desde allí para contactar con nosotros.',whatsappUnavailable:'El chat de WhatsApp no está disponible en este momento.',messengerAction:'Escribir por Messenger',messengerOpensExternally:'Abre Messenger en otra pestaña o en la aplicación. Debes enviar el mensaje desde allí para contactar con nosotros.',
  emailTitle:'Déjanos tu correo',emailLabel:'Tu dirección de correo',emailPlaceholder:'tu@ejemplo.com',emailAction:'Quiero recibir una respuesta',emailSubmitting:'Guardando…',emailUse:'Usamos tu dirección solo para responder a esta consulta. No te añadimos a una lista comercial.',privacyLead:'Cómo usamos tus datos:',privacyAction:'Privacidad',emailInvalid:'Escribe una dirección de correo válida.',retryAction:'Comprobar y reintentar',failed:'No se ha guardado tu correo. Inténtalo de nuevo o usa WhatsApp.',uncertain:'No podemos confirmar la recepción. Vuelve a intentarlo con el mismo correo para comprobar si nos ha llegado.',emailUnavailable:'El formulario no está disponible en este momento.',
 },
 tourContact:{
  title:'Preparemos tu viaje.',intro:'Dinos tus fechas. Te enviaremos un presupuesto personalizado por correo.',ask:'Hablar de mi viaje',close:'Cerrar el formulario',whatsapp:'Hablar por WhatsApp',email:'Dirección de correo',date:'Fecha de llegada prevista',undecided:'Todavía no tengo fechas',note:'¿Qué te gustaría contarnos?',optional:'Opcional',placeholder:'Tu grupo, tus intereses, el idioma del guía o algún cambio en la ruta…',submit:'Pedir mi presupuesto',sending:'Enviando…',privacy:'Privacidad',consent:'Usamos estos datos para responder a tu consulta.',manual:'Comprobaremos la disponibilidad y confirmaremos el precio final.',success:'Tu consulta se ha guardado.',successBody:'Revisaremos tu idea y te responderemos por correo.',reference:'Referencia',done:'Volver al itinerario',failed:'No se ha guardado tu consulta. Inténtalo de nuevo o contacta con nosotros mediante las opciones de abajo.',uncertain:'No podemos confirmar la recepción. Usa «Comprobar y reintentar» para retomar esta consulta.',retry:'Comprobar y reintentar',fallback:'¿Prefieres hablar directamente con nosotros?',unavailable:'Escríbenos sobre este viaje. El mensaje incluirá el itinerario elegido.',guideBody:'¿Estás preparando un viaje a China? Hablemos de las etapas, el alojamiento y la ayuda que necesitas.',guideEmail:'Escribir por correo',tours:'Ver itinerarios y precios',selected:'Tu itinerario',alternative:'O hablar por WhatsApp',
 },
 direct:{intro:'Escríbenos desde tu correo o por WhatsApp. Te responderemos en la misma conversación.',email:'Escribir por correo',formIntro:'¿Prefieres que te contactemos? Déjanos tus datos para recibir un presupuesto personalizado.',failed:'No se ha guardado tu consulta. Inténtalo de nuevo o escríbenos directamente con el enlace de arriba.'},
 quote:{placeholder:'Habitaciones, edades de los niños, llegada y salida, ritmo de caminata…',source:'¿Cómo nos conociste?',blank:'Elige una opción (opcional)',friend:'Amigos o familia',other:'Otro',group:'¿Cuántas personas viajan?',groupHint:'Prepararemos el presupuesto para este número de personas.',groupError:'Indica entre 1 y 99 viajeros.'},
 fieldErrors:{email:'Revisa tu dirección de correo.',date:'Escribe una fecha válida o indica que todavía no tienes fechas.',note:'El mensaje no puede superar los 1.000 caracteres.',control:'Hay caracteres copiados que no se admiten. Elimínalos o vuelve a escribir el mensaje.'},
 labels:{stayPreference:'Alojamiento preferido (por confirmar)',guide:'Sobre esta guía',brand:'HOMEGROUND CHINA'},
 date:{placeholder:'DD/MM/AAAA',formatHint:'Día / mes / año (DD/MM/AAAA)',invalid:'Escribe una fecha válida con el formato DD/MM/AAAA.',openCalendar:'Abrir el calendario',closeCalendar:'Cerrar el calendario',title:'Elige una fecha',loadingCalendar:'Cargando el calendario…',calendarUnavailable:'No se ha podido cargar el calendario. Ciérralo para escribir la fecha o vuelve a abrirlo para intentarlo de nuevo.'},
 receipt:{
  correctionSubject:'Corregir el correo de mi consulta',correctionBody:'Hola, necesito corregir la dirección de correo de esta consulta.',correctionAddress:'Dirección correcta: ',continuationGreeting:'Hola, he enviado una consulta y me gustaría continuar por aquí.',details:'Ver los detalles de la consulta',destinations:'Destinos que te interesan',nights:'Duración del viaje (noches)',
  suppressedNext:'¿Buscas una confirmación anterior? Revisa el correo no deseado y, si está allí, márcala como «No es spam». También puedes escribirnos a',directNext:'También puedes escribirnos a',
  title:'Hemos recibido tu consulta',reference:'Referencia',email:'Te responderemos a',phone:'Respuesta por WhatsApp',homepage:'Idea de viaje',planner:'Consulta para organizar un viaje',tour:'Tu viaje',selection:'Opción elegida',date:'Fecha de llegada',undecided:'Fechas por decidir',party:'Viajeros',
  boundary:'Es una consulta, no una reserva. Comprobamos la composición del grupo y la disponibilidad antes de enviarte el presupuesto.',
  next:'¿No encuentras la confirmación después de unos minutos? Revisa el correo no deseado. Si está allí, márcala como «No es spam» y responde «Recibido». Si necesitas ayuda, escríbenos a',
  whatsappNext:'El equipo de Homeground revisará tu consulta y te responderá por WhatsApp.',due:'Respuesta prevista antes del',zone:'hora de China (UTC+8)',
  queued:'Estamos enviando el correo de confirmación. Está escrito en inglés; puedes responder en español. No hace falta que vuelvas a enviar la consulta.',
  disabled:'Una persona del equipo te responderá por correo. Puedes escribirnos en español. No hace falta que vuelvas a enviar la consulta.',
  suppressed:'Tu consulta se ha guardado; esta vez no se envía otro correo de confirmación. No hace falta que la repitas.',
  unavailable:'No se ha podido enviar el correo de confirmación, pero tu consulta se ha guardado y el equipo te responderá.',
  correct:'¿Hay un error en la dirección?',correction:'Escríbenos con esta referencia para solicitar la corrección.',emailAction:'Escribir por correo',whatsappAction:'WhatsApp',continueWhatsapp:'Continuar por WhatsApp',typoEnd:'?',typo:'¿Querías escribir',use:'Usar esta dirección',correctionLabel:'Corregir la dirección de correo',correctionHelp:'Usaremos esta dirección para responderte. El contenido de tu consulta no cambia.',correctionSave:'Guardar dirección',correctionCancel:'Cancelar',correctionSaving:'Guardando…',correctionSaved:'Dirección actualizada. Es posible que ya se haya enviado una confirmación a la dirección anterior.',correctionInvalid:'Escribe una dirección de correo válida.',correctionFailed:'No se ha podido actualizar la dirección. Inténtalo de nuevo.',correctionUncertain:'No podemos confirmar el cambio. Usa «Comprobar y reintentar» para retomarlo.',correctionRetry:'Comprobar y reintentar',correctionUnavailable:'La corrección en línea ya no está disponible. Escríbenos con la referencia de tu consulta.',correctionConflict:'Esta dirección se ha modificado en otro lugar. Escríbenos con la referencia antes de volver a intentarlo.',correctionBusy:'Hay un mensaje en proceso de envío. Inténtalo dentro de un momento.',correctionSame:'Esta ya es tu dirección de respuesta actual.',
 },
 sheetSteps:[325,381,466],sheetHeights:[[744,792],[724,772],[703,742],[656,695]],
};