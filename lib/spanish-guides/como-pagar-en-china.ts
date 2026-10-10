import type { SpanishGuide } from "../spanishGuideTypes";

export const comoPagarEnChina: SpanishGuide = {
  slug: "como-pagar-en-china",
  sourceGuideId: "how-to-pay-in-china-as-a-tourist",
  title: "Cómo pagar en China en 2026: Alipay, WeChat y tarjeta",
  headline: "Cómo pagar en China siendo extranjero: Alipay, WeChat Pay, tarjeta y efectivo",
  description:
    "Vincule una Visa o Mastercard a Alipay o WeChat Pay antes de volar. Comisión del 3 % por encima de 200 yuanes, límites, cajeros y qué hacer si el pago falla.",
  navTitle: "Cómo pagar en China",
  heroImage: {
    src: "/images/guides/how-to-pay-in-china-as-a-tourist/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: "Ilustración de un teléfono, una tarjeta bancaria y billetes, dispuestos como kit de pago de reserva para un viaje",
  },
  datePublished: "2026-10-11",
  dateModified: "2026-10-11",
  sourceReviewedDate: "2026-09-24",
  // Every traveller pays for something, so every Spanish tour page links this guide.
  general: true,
  tourSlugs: [
    "beijing-xian-shanghai-8-day-private-tour",
    "beijing-xian-guilin-shanghai-10-day-private-tour",
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Vincule una tarjeta Visa, Mastercard o UnionPay a Alipay o a WeChat Pay antes de volar y pague escaneando el código QR de la tienda o dejando que el cajero escanee el suyo. WeChat Pay no cobra comisión en los pagos con tarjeta de 200 yuanes o menos y cobra el 3 % de todo el importe por encima de esa cifra; cuente con lo mismo en Alipay. Lleve además una tarjeta física y algo de efectivo en yuanes como reserva. Comprobado el 24 de septiembre de 2026.",
      },
      { id: "setup-heading", type: "heading", level: 2, text: "Cómo preparar Alipay y WeChat Pay antes de volar" },
      {
        id: "setup-intro",
        type: "paragraph",
        text: "Hágalo en casa, una o dos semanas antes de salir, mientras todavía le llegan los SMS de su banco. Las dos aplicaciones funcionan con su propio número de móvil y su pasaporte; no hace falta una cuenta bancaria ni un teléfono chinos. En China continental, WeChat Pay se llama Weixin Pay.",
      },
      {
        id: "setup-list",
        type: "list",
        ordered: true,
        items: [
          "Instale Alipay y WeChat desde la tienda oficial de aplicaciones de su teléfono y regístrese con su número de móvil.",
          "Añada su tarjeta en cada aplicación y complete la verificación con el pasaporte si se la piden. En WeChat, las tarjetas están en el monedero (Wallet).",
          "Pida a su banco que permita el uso en el extranjero, en línea y en cajeros, y mantenga activa su app o los códigos por SMS fuera de su país; el primer pago puede necesitar su aprobación.",
          "Compruebe que la tarjeta aparece como disponible en cada aplicación. Solo un pago real la prueba del todo, así que haga el primero donde tenga alternativa, por ejemplo en una tienda del aeropuerto al llegar.",
          "Si una tarjeta no se vincula, pruebe con otra tarjeta o con la otra aplicación y llame a su banco; las causas habituales están más abajo.",
          "Lleve datos móviles que funcionen en China, una batería externa, una tarjeta física y algo de efectivo en yuanes, guardados aparte del teléfono. Si viajan varios adultos, prepare al segundo con otra aplicación u otra tarjeta: así una batería agotada o una tarjeta bloqueada no deja a todos sin pagar.",
        ],
      },
      {
        id: "counter",
        type: "paragraph",
        text: "En el mostrador hay dos formas: escanear el código QR de la tienda y teclear el importe, o abrir su código de pago y dejar que lo escanee el cajero. Busque el cartel azul de Alipay (支付宝) y el verde de WeChat Pay (微信支付). Una tarjeta extranjera en cualquiera de las dos aplicaciones sirve para tiendas, transporte y reservas, pero no para enviar dinero a particulares.",
      },
      { id: "fee-heading", type: "heading", level: 2, text: "Cuánto es la comisión del 3 %" },
      {
        id: "fee-copy",
        type: "paragraph",
        text: "La comisión la cobra la aplicación, no la tienda, y se calcula sobre todo el importe, no solo sobre lo que pasa de 200 yuanes. Aparte, su banco aplica su propio tipo de cambio y sus comisiones por compras en el extranjero.",
      },
      {
        id: "fee-table",
        type: "table",
        caption: "Comisión de la aplicación con tarjeta extranjera en WeChat Pay (cuente con lo mismo en Alipay)",
        columns: ["Importe de la cuenta", "Comisión de la aplicación", "Total"],
        rows: [
          ["100 yuanes", "0", "100 yuanes"],
          ["200 yuanes", "0", "200 yuanes"],
          ["300 yuanes", "9 yuanes (3 %)", "309 yuanes"],
          ["1.000 yuanes", "30 yuanes (3 %)", "1.030 yuanes"],
          ["3.000 yuanes", "90 yuanes (3 %)", "3.090 yuanes"],
        ],
      },
      { id: "fee-avoid-heading", type: "heading", level: 3, text: "Cómo pagar menos comisión" },
      {
        id: "fee-avoid-list",
        type: "list",
        items: [
          "Si nunca ha vinculado una tarjeta a WeChat Pay, hágalo antes del 31 de diciembre de 2026: Tencent no cobra la comisión durante 90 días desde la primera compra, hasta 1.000 yuanes de gasto al día. En un viaje corto, eso puede cubrir casi todos los pagos con WeChat Pay. Compruebe que la promoción aparece en su cuenta.",
          "Pague las cuentas grandes, como el hotel, con la tarjeta física en el mostrador: no hay comisión de la aplicación, aunque sí los cargos de su banco por operar en el extranjero.",
          "Mantenga cada pago con tarjeta en 200 yuanes o menos. Dividir una cuenta solo funciona si la tienda acepta.",
        ],
      },
      { id: "which-heading", type: "heading", level: 2, text: "¿Alipay o WeChat Pay?" },
      {
        id: "which-copy",
        type: "paragraph",
        text: "Prepare las dos si puede, para que una sustituya a la otra si rechaza su tarjeta. Si solo quiere una, use la que vincule su tarjeta sin errores. La exención de comisión de 90 días vigente en 2026 es de WeChat Pay.",
      },
      {
        id: "google-copy",
        type: "paragraph",
        text: "Google Pay no es una alternativa fiable: la lista de mercados de Google Wallet para añadir tarjetas no incluye China continental (comprobado el 24 de septiembre de 2026). Una tarjeta ya guardada en Google Wallet puede funcionar en un datáfono sin contacto que acepte su red, pero los códigos QR de las tiendas no admiten Google Pay.",
      },
      { id: "link-fail-heading", type: "heading", level: 2, text: "Si la tarjeta no se vincula o la cuenta no se verifica" },
      {
        id: "link-fail-copy",
        type: "paragraph",
        text: "Cuando una tarjeta no se vincula, la causa suele ser una de estas, y casi todas las resuelve su banco, no la aplicación. Arréglelo en casa; mientras tanto, pruebe con otra tarjeta o con la otra aplicación.",
      },
      {
        id: "link-fail-list",
        type: "list",
        items: [
          "WeChat puede pedir una «verificación con ayuda» después del registro: otro usuario de WeChat escanea un código para avalarle, o usted se verifica con una tarjeta de pago. Antes de volar, localice a un familiar o amigo que ya use WeChat.",
          "Su banco bloquea un pago nuevo en el extranjero o en línea, pide un código de seguridad o marca China como actividad inusual.",
          "Su nombre está escrito distinto que en el pasaporte o en la tarjeta (el orden, los espacios, un segundo nombre que falta), o no coinciden el número de pasaporte o la fecha de nacimiento.",
          "La marca de la tarjeta funciona en general, pero no para ese servicio, ese producto de transporte o esa tienda.",
          "El teléfono recibió el SMS de registro, pero no un código de seguridad posterior, porque cambió la itinerancia o el operador.",
          "La cuenta funciona al principio y después una revisión de seguridad pide más documentos. Registrarse no garantiza que todos los pagos pasen.",
        ],
      },
      { id: "card-heading", type: "heading", level: 2, text: "Cuándo conviene pagar con la tarjeta física" },
      {
        id: "card-copy",
        type: "paragraph",
        text: "Pague con la tarjeta física cuando el mostrador muestre el logotipo de su tarjeta y el personal confirme que la acepta. Suele ser el caso de los hoteles (incluido el depósito), las taquillas de aeropuertos y estaciones, las grandes atracciones, las cadenas internacionales, los grandes centros comerciales y supermercados y las tiendas libres de impuestos. En un puesto callejero, una tienda pequeña o un servicio rural, el código QR local o el efectivo pueden ser la única forma práctica de pagar.",
      },
      {
        id: "dcc",
        type: "callout",
        tone: "neutral",
        title: "Si el datáfono le ofrece cobrar en euros o en su moneda",
        body: "Elija yuanes. Pagar en su moneda en el datáfono es una conversión dinámica de divisa: según Visa, el terminal o el cajero debe mostrar las dos monedas, el tipo de cambio y cualquier recargo, y dejarle elegir. Si elige yuanes, la conversión la hace su propio banco.",
      },
      { id: "cash-heading", type: "heading", level: 2, text: "El efectivo sigue sirviendo" },
      {
        id: "cash-copy",
        type: "paragraph",
        text: "El efectivo sigue siendo de curso legal, y el banco central de China, el Ministerio de Comercio y el regulador de divisas indican a las grandes tiendas, hoteles y transportes que lo acepten. Las tiendas pequeñas pueden no tener cambio y algunos tornos no admiten billetes, así que lleve billetes pequeños como reserva, no como presupuesto principal.",
      },
      {
        id: "cash-table",
        type: "table",
        caption: "Tres sitios distintos pueden limitar el acceso a efectivo en yuanes",
        columns: ["Dónde puede fallar", "Qué puede frenarle", "Qué comprobar"],
        rows: [
          [
            "El cajero o la red de la tarjeta",
            "La máquina puede no mostrar el logotipo de su red, tener un tope por retirada o una restricción local.",
            "Use un cajero con el logotipo correspondiente y guarde el recibo. La página oficial de Shanghái para visitantes dice que un cajero suele limitar cada retirada a 3.000 yuanes; UnionPay da la misma cifra para tarjetas emitidas fuera de China continental.",
          ],
          [
            "Su banco",
            "Puede fijar un límite diario o mensual de efectivo, bloquear el uso en el extranjero, exigir PIN o cobrar por el adelanto o por la operación en divisa.",
            "Pregunte a su banco antes de volar. Su límite es independiente del límite del cajero.",
          ],
          [
            "La oficina o máquina de cambio",
            "Las divisas disponibles, el horario, el tipo de cambio y las comisiones varían según el banco, el aeropuerto y el lugar.",
            "Use un banco o un punto de cambio autorizado, compare el tipo de cambio anunciado y guarde el recibo.",
          ],
        ],
      },
      { id: "limits-heading", type: "heading", level: 2, text: "Límites y cifras oficiales de 2026" },
      {
        id: "limits-list",
        type: "list",
        items: [
          "Tope para visitantes en las aplicaciones: hasta 5.000 USD por operación y 50.000 USD al año con tarjetas internacionales en Alipay o WeChat Pay (página de pagos del gobierno de Shanghái, actualizada el 24 de julio de 2026). Es un techo regulatorio: su aplicación, su banco o la tienda pueden fijar un límite menor o rechazar el pago.",
          "Comisión con tarjeta internacional en WeChat Pay: gratis hasta 200 yuanes inclusive y 3 % de todo el importe por encima (aviso de Tenpay del 15 de enero de 2026). No encontramos una página actual de Alipay que indique su comisión; la guía de 2024 del Ministerio de Comercio da la misma regla.",
          "Efectivo en la frontera: según la guía vigente del Consejo de Estado, cada visitante puede entrar o salir de China con hasta 20.000 yuanes en efectivo cada vez. Es una norma aduanera, no una recomendación de llevar esa cantidad.",
        ],
      },
      { id: "recovery-heading", type: "heading", level: 2, text: "Si el pago falla: qué hacer, por orden" },
      {
        id: "recovery-table",
        type: "table",
        caption: "Cómo recuperarse sin duplicar un cargo ni quedarse sin la única forma de pago",
        columns: ["Problema", "Primera respuesta", "Alternativa"],
        rows: [
          [
            "El escaneo del QR falla o la pantalla se queda colgada",
            "Mire el historial de operaciones antes de reintentar. Confirme el importe y si está escaneando el código de la tienda o enseñando el suyo, y reintente con buena conexión.",
            "Cambie a la otra aplicación, a la tarjeta física si se ve su logotipo, o a efectivo.",
          ],
          [
            "La tarjeta es rechazada",
            "No siga intentándolo. Revise en su banco los ajustes de uso en el extranjero, en línea y antifraude, el límite disponible y el código de seguridad.",
            "Use una segunda tarjeta o efectivo mientras se aclara la causa.",
          ],
          [
            "El teléfono no tiene datos o batería",
            "Busque una conexión fiable y cargue el teléfono antes de reintentar.",
            "Pague con la tarjeta física o en efectivo. El teléfono de un segundo adulto, preparado por separado, es la mejor reserva.",
          ],
          [
            "No sabe si le han cobrado",
            "Mire el historial del monedero o del banco y pida a la tienda que compruebe su registro antes de pagar por segunda vez.",
            "Pague de otra forma solo cuando el primer intento haya fallado claramente o se haya devuelto.",
          ],
        ],
      },
      {
        id: "next",
        type: "internal-links",
        title: "Siga preparando el viaje",
        items: [
          {
            label: "¿Visado para China con pasaporte español?",
            href: "/es/guias/visado-china-espanoles/",
            description: "30 días sin visado hasta el 31 de diciembre de 2026: qué cubre y qué no.",
          },
          {
            label: "Viajes privados a China con precio publicado",
            href: "/es/tours/",
            description: "Rutas privadas con el itinerario día a día y el precio por persona.",
          },
        ],
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre los pagos en China",
        items: [
          {
            question: "¿Cómo se paga en China siendo extranjero?",
            answer:
              "Vincule una tarjeta Visa, Mastercard o UnionPay a Alipay o WeChat Pay antes de volar y pague con código QR en tiendas, restaurantes y transporte. Los pagos con tarjeta por encima de 200 yuanes llevan una comisión de la aplicación del 3 %. Lleve una tarjeta física para hoteles y grandes tiendas y algo de efectivo en yuanes para puestos pequeños o por si se queda sin batería.",
          },
          {
            question: "¿Qué es mejor para un turista, Alipay o WeChat Pay?",
            answer:
              "Prepare las dos si puede, para que una sustituya a la otra si rechaza su tarjeta. Si solo quiere una, use la que vincule su tarjeta sin errores. La exención de comisión de 90 días para una primera tarjeta, vigente hasta el 31 de diciembre de 2026, es de WeChat Pay.",
          },
          {
            question: "¿Se puede pagar con tarjeta de crédito en China?",
            answer:
              "Sí, donde el mostrador muestre el logotipo de su tarjeta: hoteles, taquillas de aeropuertos y estaciones, grandes atracciones, cadenas internacionales y grandes centros comerciales. En tiendas pequeñas y puestos, lo habitual es el código QR o el efectivo.",
          },
          {
            question: "¿Es mejor llevar efectivo o tarjeta a China?",
            answer:
              "Las dos cosas, más una aplicación de pago en el teléfono. La aplicación cubre casi todos los pagos del día a día, la tarjeta física cubre hoteles y tiendas grandes, y un poco de efectivo en yuanes cubre las compras pequeñas o un teléfono sin batería.",
          },
          {
            question: "¿Cuánto efectivo se puede sacar en un cajero chino con una tarjeta extranjera?",
            answer:
              "La página oficial de Shanghái para visitantes y UnionPay indican un límite habitual de 3.000 yuanes por retirada para tarjetas emitidas fuera de China continental. El límite diario de su banco y las normas del propio cajero se aplican aparte.",
          },
          {
            question: "¿Hay que recargar el monedero de WeChat antes de pagar con una tarjeta extranjera?",
            answer:
              "No. Al pagar con una tarjeta vinculada, elija esa tarjeta en la pantalla de pago; el saldo de WeChat (零钱) puede quedarse en cero.",
          },
          {
            question: "¿Funciona Google Pay en China?",
            answer:
              "No de forma fiable. La lista de mercados de Google Wallet para añadir tarjetas no incluye China continental, y los códigos QR de las tiendas no admiten Google Pay. Cuente con Alipay o WeChat Pay, una tarjeta física y efectivo.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes oficiales",
        items: [
          {
            label: "Aviso sobre las normas del servicio de pago con tarjeta internacional (15 de enero de 2026)",
            url: "https://posts.tenpay.com/posts/9e70c66564910e6002958e997eabb18b.html",
            publisher: "Tenpay Payment Technology Co., Ltd.",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Medidas de 2026 para los pagos de visitantes, con la exención de 90 días para la primera tarjeta (27 de mayo de 2026)",
            url: "https://www.tencent.com/zh-cn/articles/2202338.html",
            publisher: "Tencent",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Payment methods for foreigners (actualizada el 24 de julio de 2026)",
            url: "https://english.shanghai.gov.cn/en-PaymentMethods/20240313/6f4e58272f1a4cea9aec59c518915bdf.html",
            publisher: "Gobierno Municipal de Shanghái",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Guide to Working and Living in China: pago móvil, efectivo, cambio, hoteles y transporte",
            url: "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
            publisher: "Consejo de Estado de la República Popular China",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Guide for Foreign Businesspeople Working and Living in China (edición de 2024)",
            url: "https://nsd.mofcom.gov.cn/tzyts/art/2024/art_a08888d0b9da42f083b00223edaf1de7.html",
            publisher: "Ministerio de Comercio de la República Popular China",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Aviso sobre la diversidad de medios de pago y la aceptación de efectivo",
            url: "https://www.pbc.gov.cn/en/3688241/3688663/3688666/2025080817504289341/2024050714151715381.pdf",
            publisher: "Banco Popular de China, Ministerio de Comercio y SAFE",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Explore Mainland China Your Way: aceptación de tarjetas y cajeros",
            url: "https://www.unionpayintl.com/dynamic/ExploreMainlandChinaYourWay/en?currentPath=globalCard%2Fen",
            publisher: "UnionPay International",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Dynamic currency conversion",
            url: "https://www.visa.com/en-us/personal/travel/dynamic-currency-conversion",
            publisher: "Visa",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Google Wallet: mercados admitidos para añadir tarjetas",
            url: "https://support.google.com/wallet/answer/12059326?co=GENIE.CountryCode%3DHK&hl=en-GB",
            publisher: "Google",
            reviewedAt: "2026-09-24",
          },
        ],
      },
    ],
  },
};
