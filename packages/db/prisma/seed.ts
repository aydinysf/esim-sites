import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.upsert({
    where: { email: "admin@esim-sites.com" },
    update: {},
    create: {
      email: "admin@esim-sites.com",
      passwordHash: await bcrypt.hash("change-me-123", 12),
      name: "Admin",
    },
  });

  const countryData = [
    {
      code: "DE",
      domain: "esim-germany.com",
      name: "Deutschland",
      heroHeadline: "eSIM für Deutschland — online in 5 Minuten",
      heroSubheadline: "Prepaid-Datentarife ab 1,88 € — ohne Vertrag, ohne Roaming-Gebühren. QR-Code scannen und sofort lossurfen.",
      heroCtaText: "Tarife vergleichen",
      stats: [{ value: "ab 1,88 €", label: "Tarife" }, { value: "24/7", label: "Support" }, { value: "5 Min.", label: "Aktivierung" }],
      whyTitle: "Warum eSIM?",
      whyItems: [
        { icon: "zap", title: "Sofort startklar", description: "eSIM per E-Mail und QR-Code — keine Wartezeit, kein Versand." },
        { icon: "globe", title: "Starkes Netz, deutschlandweit", description: "Zuverlässiges 4G/LTE von Berlin bis München." },
        { icon: "shield", title: "Ohne Vertrag", description: "Prepaid statt Abo-Falle. Keine versteckten Kosten." }
      ],
      howTitle: "So funktioniert es",
      howSteps: [
        { step: 1, title: "Tarif wählen", description: "Datenmenge und Laufzeit vergleichen." },
        { step: 2, title: "Sicher bezahlen", description: "Der QR-Code kommt sofort per E-Mail." },
        { step: 3, title: "Scannen & lossurfen", description: "QR-Code scannen — in unter 5 Min. online." }
      ],
      ctaTitle: "Bereit für Deutschland?",
      ctaSub: "Wähle deinen Tarif und sei in 5 Minuten online.",
      headerCta: "Tarife ansehen",
      footerTagline: "Die besten eSIM-Tarife für Deutschland. Sofort aktivieren.",
      menu: [
        { label: "Start", href: "/", order: 0 },
        { label: "Tarife", href: "/packages", order: 1 },
        { label: "Guides", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "AZ",
      domain: "esim-azerbaijan.com",
      name: "Azərbaycan",
      heroHeadline: "Azərbaycan üçün eSIM — 5 dəqiqəyə onlayn olun",
      heroSubheadline: "Ən sərfəli prepaid məlumat tarifləri — müqaviləsiz, roaming haqqı olmadan. QR-kod skan edin və qoşulun.",
      heroCtaText: "Tarifləri müqayisə et",
      stats: [{ value: "Sərfəli", label: "Tariflər" }, { value: "24/7", label: "Dəstək" }, { value: "5 Dəq.", label: "Aktivləşdirmə" }],
      whyTitle: "Niyə eSIM?",
      whyItems: [
        { icon: "zap", title: "Dərhal hazır", description: "eSIM e-poçt və QR-kod ilə — gözləmədən dərhal qoşulun." },
        { icon: "globe", title: "Güclü şəbəkə", description: "Azərbaycan üzrə etibarlı 4G/LTE şəbəkəsi." },
        { icon: "shield", title: "Müqaviləsiz", description: "Gizli xərclər olmadan prepaid istifadə." }
      ],
      howTitle: "Necə çalışır",
      howSteps: [
        { step: 1, title: "Tarifi seçin", description: "Sizə uyğun paketi seçin." },
        { step: 2, title: "Təhlükəsiz ödəyin", description: "Ödənişdən sonra QR-kod e-poçtunuza gəlir." },
        { step: 3, title: "Skan edin və istifadə edin", description: "QR-kodu skan edərək 5 dəqiqəyə qoşulun." }
      ],
      ctaTitle: "Azərbaycan üçün hazırsınız?",
      ctaSub: "Paketinizi seçin və dərhal onlayn olun.",
      headerCta: "Tariflərə bax",
      footerTagline: "Azərbaycan üçün prepaid eSIM tarifləri. Müqaviləsiz, dərhal aktivləşdirmə.",
      menu: [
        { label: "Ana səhifə", href: "/", order: 0 },
        { label: "Tariflər", href: "/packages", order: 1 },
        { label: "Bələdçi", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "SSS", href: "/faq", order: 4 }
      ]
    },
    {
      code: "EU",
      domain: "esim-europe.com",
      name: "Europe",
      heroHeadline: "eSIM for Europe — Online in 5 minutes",
      heroSubheadline: "Best prepaid data plans across 30+ European countries. Instant QR activation, zero roaming fees.",
      heroCtaText: "Compare Plans",
      stats: [{ value: "30+ EU", label: "Countries" }, { value: "24/7", label: "Support" }, { value: "5 Min", label: "Activation" }],
      whyTitle: "Why Europe eSIM?",
      whyItems: [
        { icon: "zap", title: "Instant Delivery", description: "Get your QR code via email immediately after purchase." },
        { icon: "globe", title: "Cross-Border Connectivity", description: "One eSIM works seamlessly across all major European destinations." },
        { icon: "shield", title: "No Contracts", description: "Prepaid data only. No hidden roaming charges." }
      ],
      howTitle: "How It Works",
      howSteps: [
        { step: 1, title: "Choose Your Plan", description: "Select data volume and validity for Europe." },
        { step: 2, title: "Pay Securely", description: "Receive instant QR code in your inbox." },
        { step: 3, title: "Scan & Connect", description: "Scan the QR code and enjoy instant 4G/5G data." }
      ],
      ctaTitle: "Traveling to Europe?",
      ctaSub: "Get connected in 5 minutes across EU countries without changing SIM cards.",
      headerCta: "View Plans",
      footerTagline: "Best eSIM data plans for Europe. Instant QR delivery without roaming fees.",
      menu: [
        { label: "Home", href: "/", order: 0 },
        { label: "Plans", href: "/packages", order: 1 },
        { label: "Guides", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "AT",
      domain: "esimcard.at",
      name: "Österreich",
      heroHeadline: "eSIM für Österreich — in 5 Minuten online",
      heroSubheadline: "Prepaid-Datentarife ohne Vertrag, ohne Roaming-Gebühren. QR-Code scannen und sofort lossurfen.",
      heroCtaText: "Tarife vergleichen",
      stats: [{ value: "4G/5G", label: "Speed" }, { value: "24/7", label: "Support" }, { value: "5 Min.", label: "Aktivierung" }],
      whyTitle: "Warum eSIM für Österreich?",
      whyItems: [
        { icon: "zap", title: "Sofort startklar", description: "eSIM per E-Mail und QR-Code — keine Wartezeit, kein Versand." },
        { icon: "globe", title: "Starkes Netz in ganz Österreich", description: "Zuverlässiges 4G/LTE in Wien, Salzburg und Tirol." },
        { icon: "shield", title: "Ohne Vertrag, ohne Risiko", description: "Prepaid statt Abo. Keine versteckten Kosten." }
      ],
      howTitle: "So funktioniert es",
      howSteps: [
        { step: 1, title: "Tarif wählen", description: "Datenmenge und Laufzeit für Österreich vergleichen." },
        { step: 2, title: "Sicher bezahlen", description: "Der QR-Code kommt sofort per E-Mail." },
        { step: 3, title: "Scannen & lossurfen", description: "QR-Code scannen, eSIM aktivieren — in unter 5 Min. online." }
      ],
      ctaTitle: "Bereit für Österreich?",
      ctaSub: "Wähle deinen Tarif und sei in 5 Minuten online.",
      headerCta: "Tarife ansehen",
      footerTagline: "Die besten eSIM-Tarife für Österreich. Sofort aktivieren.",
      menu: [
        { label: "Start", href: "/", order: 0 },
        { label: "Tarife", href: "/packages", order: 1 },
        { label: "Ratgeber", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "BE",
      domain: "esimcard.be",
      name: "België",
      heroHeadline: "eSIM voor België — Binnen 5 minuten online",
      heroSubheadline: "Prepaid mobiele data zonder contract en zonder roamingkosten. Scan de QR-code en surf direct.",
      heroCtaText: "Tarieven vergelijken",
      stats: [{ value: "4G/5G", label: "Snelheid" }, { value: "24/7", label: "Support" }, { value: "5 Min.", label: "Activering" }],
      whyTitle: "Waarom eSIM voor België?",
      whyItems: [
        { icon: "zap", title: "Direct klaar voor gebruik", description: "eSIM per e-mail en QR-code — geen wachttijd, geen verzending." },
        { icon: "globe", title: "Sterk netwerk in heel België", description: "Betrouwbaar 4G/LTE netwerk in Brussel, Antwerpen en Gent." },
        { icon: "shield", title: "Zonder contract", description: "Prepaid data zonder abonnement of verborgen kosten." }
      ],
      howTitle: "Hoe het werkt",
      howSteps: [
        { step: 1, title: "Kies je tarief", description: "Vergelijk databundels en geldigheid voor België." },
        { step: 2, title: "Veilig betalen", description: "Ontvang je QR-code direct in je mailbox." },
        { step: 3, title: "Scan en surf", description: "Scan de QR-code en wees binnen 5 minuten online." }
      ],
      ctaTitle: "Klaar voor België?",
      ctaSub: "Kies je bundel en wees binnen 5 minuten online.",
      headerCta: "Bekijk Tarieven",
      footerTagline: "De beste eSIM-abonnementen voor België. Direct geactiveerd.",
      menu: [
        { label: "Home", href: "/", order: 0 },
        { label: "Tarieven", href: "/packages", order: 1 },
        { label: "Gidsen", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "CH",
      domain: "esimcard.ch",
      name: "Schweiz",
      heroHeadline: "eSIM für die Schweiz — in 5 Minuten online",
      heroSubheadline: "Prepaid-Datentarife ohne Vertrag, ohne teure Schweizer Roaming-Gebühren. QR-Code scannen.",
      heroCtaText: "Tarife vergleichen",
      stats: [{ value: "4G/5G", label: "Speed" }, { value: "24/7", label: "Support" }, { value: "5 Min.", label: "Aktivierung" }],
      whyTitle: "Warum eSIM für die Schweiz?",
      whyItems: [
        { icon: "zap", title: "Sofort startklar", description: "eSIM per E-Mail und QR-Code — direkt einsatzbereit." },
        { icon: "globe", title: "Starkes Schweizer Netz", description: "Zuverlässiges 4G/LTE in Zürich, Genf und den Alpen." },
        { icon: "shield", title: "Keine Roaming-Falle", description: "Prepaid-Guthaben ohne teure Zusatzkosten." }
      ],
      howTitle: "So funktioniert es",
      howSteps: [
        { step: 1, title: "Tarif wählen", description: "Datenmenge für die Schweiz wählen." },
        { step: 2, title: "Sicher bezahlen", description: "QR-Code kommt sofort per E-Mail." },
        { step: 3, title: "Scannen & lossurfen", description: "QR-Code scannen und in unter 5 Min. online sein." }
      ],
      ctaTitle: "Bereit für die Schweiz?",
      ctaSub: "Wähle deinen Tarif und sei in 5 Minuten online.",
      headerCta: "Tarife ansehen",
      footerTagline: "Die besten eSIM-Tarife für die Schweiz. Sofort aktivieren.",
      menu: [
        { label: "Start", href: "/", order: 0 },
        { label: "Tarife", href: "/packages", order: 1 },
        { label: "Ratgeber", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "CZ",
      domain: "esimcard.cz",
      name: "Česko",
      heroHeadline: "eSIM pro Česko — Online do 5 minut",
      heroSubheadline: "Prepaid datové tarify bez smlouvy a bez poplatků za roaming. Naskenujte QR kód a surfujte.",
      heroCtaText: "Porovnat tarify",
      stats: [{ value: "4G/5G", label: "Rychlost" }, { value: "24/7", label: "Podpora" }, { value: "5 Min.", label: "Aktivace" }],
      whyTitle: "Proč eSIM pro Českou republiku?",
      whyItems: [
        { icon: "zap", title: "Okamžitě připraveno", description: "eSIM e-mailem a přes QR kód — žádné čekání ani doručování." },
        { icon: "globe", title: "Silná síť po celém Česku", description: "Spolehlivé 4G/LTE v Praze, Brně i na horách." },
        { icon: "shield", title: "Bez smlouvy", description: "Prepaid data bez paušálu a bez skrytých poplatků." }
      ],
      howTitle: "Jak to funguje",
      howSteps: [
        { step: 1, title: "Vyberte si tarif", description: "Porovnejte objem dat a platnost pro Česko." },
        { step: 2, title: "Zaplaťte bezpečně", description: "Obdržte QR kód ihned do své e-mailové schránky." },
        { step: 3, title: "Naskenujte a surfujte", description: "Aktivujte eSIM do 5 minut a buďte online." }
      ],
      ctaTitle: "Jste připraveni pro Česko?",
      ctaSub: "Vyberte si tarif a buďte online do 5 minut.",
      headerCta: "Zobrazit tarify",
      footerTagline: "Nejlepší eSIM tarify pro Českou republiku. Okamžitá aktivace.",
      menu: [
        { label: "Domů", href: "/", order: 0 },
        { label: "Tarify", href: "/packages", order: 1 },
        { label: "Návody", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "ES",
      domain: "esimcard.es",
      name: "España",
      heroHeadline: "eSIM para España — Conéctate en 5 minutos",
      heroSubheadline: "Tarifas de datos prepago sin contrato ni gastos de roaming. Escanea el código QR y navega.",
      heroCtaText: "Comparar planes",
      stats: [{ value: "4G/5G", label: "Velocidad" }, { value: "24/7", label: "Soporte" }, { value: "5 Min.", label: "Activación" }],
      whyTitle: "¿Por qué eSIM para España?",
      whyItems: [
        { icon: "zap", title: "Listo al instante", description: "Recibe tu eSIM por email con código QR sin esperas ni envíos." },
        { icon: "globe", title: "Gran cobertura en toda España", description: "Red 4G/LTE de alta velocidad en Madrid, Barcelona y costas." },
        { icon: "shield", title: "Sin contrato", description: "Prepago sin permanencia ni costes ocultos." }
      ],
      howTitle: "Cómo funciona",
      howSteps: [
        { step: 1, title: "Elige tu plan", description: "Compara paquetes de datos y duración para España." },
        { step: 2, title: "Pago seguro", description: "Recibe tu código QR de inmediato en tu correo." },
        { step: 3, title: "Escanea y navega", description: "Escanea el código QR y conéctate en menos de 5 minutos." }
      ],
      ctaTitle: "¿Listo para España?",
      ctaSub: "Elige tu plan y conéctate en 5 minutos.",
      headerCta: "Ver planes",
      footerTagline: "Las mejores tarifas eSIM para España. Activación instantánea.",
      menu: [
        { label: "Inicio", href: "/", order: 0 },
        { label: "Planes", href: "/packages", order: 1 },
        { label: "Guías", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "PH",
      domain: "esimcard.ph",
      name: "Philippines",
      heroHeadline: "eSIM for Philippines — Online in 5 Minutes",
      heroSubheadline: "Fast prepaid mobile data with no contract and no roaming fees across the Philippines.",
      heroCtaText: "Compare Plans",
      stats: [{ value: "4G/5G", label: "Speed" }, { value: "24/7", label: "Support" }, { value: "5 Min", label: "Activation" }],
      whyTitle: "Why eSIM for the Philippines?",
      whyItems: [
        { icon: "zap", title: "Instant Setup", description: "Receive your QR code via email immediately." },
        { icon: "globe", title: "Nationwide Coverage", description: "Reliable 4G/LTE across Manila, Cebu, Boracay and islands." },
        { icon: "shield", title: "No Contract", description: "Pure prepaid data without hidden fees." }
      ],
      howTitle: "How It Works",
      howSteps: [
        { step: 1, title: "Select Plan", description: "Choose your data allowance and validity." },
        { step: 2, title: "Pay Securely", description: "Receive your QR code instantly." },
        { step: 3, title: "Scan & Connect", description: "Scan QR code and connect in 5 minutes." }
      ],
      ctaTitle: "Ready for the Philippines?",
      ctaSub: "Choose your plan and get connected in 5 minutes.",
      headerCta: "View Plans",
      footerTagline: "Best eSIM data plans for the Philippines. Instant QR delivery.",
      menu: [
        { label: "Home", href: "/", order: 0 },
        { label: "Plans", href: "/packages", order: 1 },
        { label: "Guides", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "RO",
      domain: "esimcard.ro",
      name: "România",
      heroHeadline: "eSIM pentru România — Online în 5 minute",
      heroSubheadline: "Cartele prepaid de date fără abonament și fără taxe de roaming. Scanează codul QR și navighează.",
      heroCtaText: "Compară planurile",
      stats: [{ value: "4G/5G", label: "Viteză" }, { value: "24/7", label: "Suport" }, { value: "5 Min.", label: "Activare" }],
      whyTitle: "De ce eSIM pentru România?",
      whyItems: [
        { icon: "zap", title: "Gata instant", description: "Primești eSIM pe e-mail prin cod QR — fără așteptare, fără livrare fizică." },
        { icon: "globe", title: "Acoperire națională", description: "Rețea rapidă 4G/LTE în București, Cluj și în întreaga țară." },
        { icon: "shield", title: "Fără abonament", description: "Serviciu prepaid fără costuri ascunse." }
      ],
      howTitle: "Cum funcționează",
      howSteps: [
        { step: 1, title: "Alege planul", description: "Compară pachetele de date și valabilitatea pentru România." },
        { step: 2, title: "Plătește în siguranță", description: "Primești codul QR imediat pe e-mail." },
        { step: 3, title: "Scanează și conectează-te", description: "Scanează codul QR și fii online în sub 5 minute." }
      ],
      ctaTitle: "Ești gata pentru România?",
      ctaSub: "Alege planul tău și conectează-te în 5 minute.",
      headerCta: "Vezi planurile",
      footerTagline: "Cele mai bune cartele eSIM pentru România. Activare instantă.",
      menu: [
        { label: "Acasă", href: "/", order: 0 },
        { label: "Planuri", href: "/packages", order: 1 },
        { label: "Ghiduri", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    },
    {
      code: "VN",
      domain: "esimcard.vn",
      name: "Việt Nam",
      heroHeadline: "eSIM cho Việt Nam — Kết nối internet sau 5 phút",
      heroSubheadline: "Gói cước dữ liệu trả trước không hợp đồng, không phí chuyển vùng. Quét mã QR và dùng ngay.",
      heroCtaText: "So sánh gói cước",
      stats: [{ value: "4G/5G", label: "Tốc độ" }, { value: "24/7", label: "Hỗ trợ" }, { value: "5 Phút", label: "Kích hoạt" }],
      whyTitle: "Tại sao chọn eSIM cho Việt Nam?",
      whyItems: [
        { icon: "zap", title: "Sẵn sàng tức thì", description: "Nhận eSIM qua email bằng mã QR — không cần chờ đợi giao hàng." },
        { icon: "globe", title: "Mạng tốc độ cao toàn quốc", description: "Mạng 4G/LTE ổn định tại Hà Nội, TP.HCM, Đà Nẵng va các điểm du lịch." },
        { icon: "shield", title: "Không hợp đồng", description: "Trả trước linh hoạt, không chi phí ẩn." }
      ],
      howTitle: "Cách thức hoạt động",
      howSteps: [
        { step: 1, title: "Chọn gói cước", description: "So sánh dung lượng và thời hạn phù hợp cho chuyến đi Việt Nam." },
        { step: 2, title: "Thanh toán an toàn", description: "Nhận mã QR ngay lập tức qua email." },
        { step: 3, title: "Quét mã & kết nối", description: "Quét mã QR để kích hoạt eSIM và online sau 5 phút." }
      ],
      ctaTitle: "Sẵn sàng đến Việt Nam?",
      ctaSub: "Chọn gói cước của bạn và kết nối internet sau 5 phút.",
      headerCta: "Xem gói cước",
      footerTagline: "Gói cước eSIM hàng đầu cho Việt Nam. Kích hoạt tức thì.",
      menu: [
        { label: "Trang chủ", href: "/", order: 0 },
        { label: "Gói cước", href: "/packages", order: 1 },
        { label: "Hướng dẫn", href: "/guides", order: 2 },
        { label: "Blog", href: "/blog", order: 3 },
        { label: "FAQ", href: "/faq", order: 4 }
      ]
    }
  ];

  for (const c of countryData) {
    await prisma.homepage.upsert({
      where: { country: c.code },
      update: {
        heroHeadline: c.heroHeadline,
        heroSubheadline: c.heroSubheadline,
        heroCtaText: c.heroCtaText,
        stats: c.stats,
        whyEsimTitle: c.whyTitle,
        whyEsimItems: c.whyItems,
        howItWorksTitle: c.howTitle,
        howItWorksSteps: c.howSteps,
        ctaBandTitle: c.ctaTitle,
        ctaBandSubtitle: c.ctaSub,
        headerCtaText: c.headerCta,
        footerTagline: c.footerTagline,
      },
      create: {
        country: c.code,
        heroHeadline: c.heroHeadline,
        heroSubheadline: c.heroSubheadline,
        heroCtaText: c.heroCtaText,
        heroImage: "/images/hero-germany.svg",
        stats: c.stats,
        whyEsimTitle: c.whyTitle,
        whyEsimItems: c.whyItems,
        howItWorksTitle: c.howTitle,
        howItWorksSteps: c.howSteps,
        ctaBandTitle: c.ctaTitle,
        ctaBandSubtitle: c.ctaSub,
        ctaBandCtaText: c.heroCtaText + " →",
        ctaBandCtaHref: "/packages",
        headerCtaText: c.headerCta,
        headerCtaHref: "/packages",
        footerTagline: c.footerTagline,
        blogPageTitle: "Blog",
        blogPageSubtitle: "Guides & news",
        guidesPageTitle: "eSIM Guides",
        guidesPageSubtitle: "Everything you need to know",
        faqPageTitle: "FAQ",
        faqPageSubtitle: "Frequently Asked Questions",
        packagesPageTitle: `eSIM ${c.name}`,
        packagesPageSubtitle: `Compare all available eSIM packages for ${c.name}`,
        metaSiteTitle: `eSIM ${c.name} | ${c.domain}`,
        metaSiteDescription: c.footerTagline,
      },
    });

    for (const mi of c.menu) {
      const exists = await prisma.menuItem.findFirst({ where: { country: c.code, href: mi.href } });
      if (exists) {
        await prisma.menuItem.update({ where: { id: exists.id }, data: { label: mi.label } });
      } else {
        await prisma.menuItem.create({ data: { country: c.code, target: "_self", ...mi } });
      }
    }
  }

  console.log("Database re-seeded with native language content for all 11 countries!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
