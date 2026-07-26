import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.upsert({
    where: { email: "admin@esim-germany.com" },
    update: {},
    create: {
      email: "admin@esim-germany.com",
      passwordHash: await bcrypt.hash("change-me-123", 12),
      name: "Admin",
    },
  });

  await prisma.homepage.upsert({
    where: { country: "DE" },
    update: {},
    create: {
      country: "DE",

      // Hero
      heroHeadline: "eSIM für Deutschland — online in 5 Minuten",
      heroSubheadline: "Prepaid-Datentarife ab 1,88 € — ohne Vertrag, ohne Roaming-Gebühren. QR-Code scannen und sofort lossurfen.",
      heroCtaText: "Tarife vergleichen",
      heroImage: "/images/hero-germany.svg",

      // Stats
      stats: [
        { value: "ab 1,88 €", label: "Tarife" },
        { value: "24/7", label: "Support" },
        { value: "5 Min.", label: "Aktivierung" },
      ],

      // Why eSIM
      whyEsimTitle: "Warum eSIM?",
      whyEsimItems: [
        { icon: "zap", title: "Sofort startklar", description: "eSIM per E-Mail und QR-Code — keine Wartezeit, kein Versand, keine Abholung" },
        { icon: "globe", title: "Starkes Netz, deutschlandweit", description: "Zuverlässiges 4G/LTE von Berlin bis München — auch unterwegs und im Zug" },
        { icon: "shield", title: "Ohne Vertrag, ohne Risiko", description: "Prepaid statt Abo-Falle. 30 Tage Geld-zurück, solange die eSIM nicht installiert wurde" },
      ],

      // How it works
      howItWorksTitle: "So funktioniert es",
      howItWorksSteps: [
        { step: 1, title: "Tarif wählen", description: "Datenmenge und Laufzeit vergleichen — Tarife ab 1,88 €" },
        { step: 2, title: "Sicher bezahlen", description: "Mit Kreditkarte oder PayPal auf polosim.com — der QR-Code kommt sofort per E-Mail" },
        { step: 3, title: "Scannen & lossurfen", description: "QR-Code scannen, eSIM aktivieren — in unter 5 Minuten online" },
      ],

      // CTA band
      ctaBandTitle: "Bereit für Deutschland?",
      ctaBandSubtitle: "Wähle deinen Tarif und sei in 5 Minuten online — ohne Vertrag, ohne versteckte Kosten.",
      ctaBandCtaText: "Jetzt Tarife vergleichen →",
      ctaBandCtaHref: "/packages",

      // Header
      headerCtaText: "Tarife ansehen",
      headerCtaHref: "/packages",

      // Footer
      footerTagline: "Prepaid eSIM-Tarife für Deutschland. Sofort per QR-Code — ohne Vertrag, ohne Roaming-Gebühren.",

      // Blog sayfası
      blogPageTitle: "Blog",
      blogPageSubtitle: "Tipps, Anleitungen und Neuigkeiten rund um Germany eSIM.",

      // Rehberler
      guidesPageTitle: "eSIM Guides für Deutschland",
      guidesPageSubtitle: "Alles, was Sie zur Einrichtung und Nutzung Ihrer Germany eSIM wissen müssen.",

      // SSS
      faqPageTitle: "Häufig gestellte Fragen",
      faqPageSubtitle: "Alles, was Sie über Germany eSIM-Tarife und Aktivierung wissen müssen.",

      // Paketler
      packagesPageTitle: "Germany eSIM Tarife",
      packagesPageSubtitle: "Vergleiche alle verfügbaren eSIM-Tarife für Deutschland. Online kaufen und sofort aktivieren.",

      // Meta
      metaSiteTitle: "Germany eSIM | PoloSim",
      metaSiteDescription: "Die besten eSIM-Tarife für Deutschland. Sofort aktivieren, kein Vertrag.",
    },
  });

  // ─── Blog Yazıları ───────────────────────────────────────
  const now = new Date();
  const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000);

  const posts = [
    {
      slug: "esim-deutschland-aktivieren-anleitung",
      title: "eSIM in Deutschland aktivieren — die komplette Anleitung 2026",
      excerpt: "Schritt für Schritt: So richtest du deine eSIM in unter 5 Minuten ein und bist sofort im deutschen Netz online.",
      category: "GUIDE" as const,
      tags: ["aktivierung", "anleitung", "qr-code"],
      featured: true,
      publishedAt: daysAgo(2),
      body: `<p>Eine eSIM ist die einfachste Art, in Deutschland online zu gehen. Keine physische Karte, kein Warten – du scannst einen QR-Code und bist verbunden.</p>
<h2>Was du brauchst</h2>
<ul><li>Ein eSIM-fähiges Smartphone (iPhone XS oder neuer, die meisten Android-Geräte ab 2019)</li><li>Eine stabile WLAN-Verbindung zur Einrichtung</li><li>Deinen eSIM-QR-Code von PoloSim</li></ul>
<h2>Schritt für Schritt</h2>
<p>Öffne die Einstellungen, wähle „Mobilfunk“ und dann „eSIM hinzufügen“. Scanne den QR-Code, den du nach dem Kauf erhältst. Aktiviere das Datenroaming und fertig – du bist im deutschen Netz.</p>
<p>Der gesamte Vorgang dauert weniger als fünf Minuten. Bei Fragen steht unser Support rund um die Uhr bereit.</p>`,
    },
    {
      slug: "esim-vs-physische-sim-vergleich",
      title: "eSIM vs. physische SIM-Karte: Was lohnt sich 2026?",
      excerpt: "Vor- und Nachteile im direkten Vergleich. Wir zeigen, warum die eSIM für Reisende und Vielnutzer fast immer die bessere Wahl ist.",
      category: "COMPARISON" as const,
      tags: ["vergleich", "esim", "sim-karte"],
      featured: true,
      publishedAt: daysAgo(6),
      body: `<p>Die klassische SIM-Karte hat ausgedient – zumindest für die meisten Anwendungsfälle. Hier der ehrliche Vergleich.</p>
<h2>Geschwindigkeit der Aktivierung</h2>
<p>Während du bei einer physischen SIM auf den Versand wartest oder in einen Shop musst, ist die eSIM sofort einsatzbereit. Kaufen, scannen, online.</p>
<h2>Flexibilität</h2>
<p>Mit einer eSIM kannst du mehrere Tarife auf einem Gerät speichern und bequem zwischen ihnen wechseln – ideal für Reisende.</p>
<h2>Fazit</h2>
<p>Für Reisende, Pendler und alle, die schnell online sein wollen, ist die eSIM klar im Vorteil.</p>`,
    },
    {
      slug: "beste-esim-tarife-deutschland-2026",
      title: "Die besten eSIM-Tarife für Deutschland im Jahr 2026",
      excerpt: "Von günstigen Datenpaketen bis Unlimited – wir haben die Top-Tarife für jeden Bedarf zusammengestellt.",
      category: "TIP" as const,
      tags: ["tarife", "vergleich", "daten"],
      featured: true,
      publishedAt: daysAgo(10),
      body: `<p>Nicht jeder braucht das gleiche Datenvolumen. Hier findest du den passenden Tarif für deinen Bedarf.</p>
<h2>Für Kurzreisen</h2>
<p>5 GB für 7 Tage reichen für Karten, Messenger und gelegentliches Surfen völlig aus.</p>
<h2>Für längere Aufenthalte</h2>
<p>20 GB oder mehr mit 30 Tagen Gültigkeit – perfekt für Geschäftsreisen oder Studienaufenthalte.</p>
<h2>Für Vielnutzer</h2>
<p>Unlimited-Tarife sorgen für sorgenfreies Streaming und Tethering ohne Limit.</p>`,
    },
    {
      slug: "datenroaming-eu-deutschland",
      title: "Datenroaming in der EU: Das musst du über Deutschland wissen",
      excerpt: "Roaming-Gebühren, EU-Regelungen und wie du mit einer eSIM die volle Kontrolle über deine Kosten behältst.",
      category: "GUIDE" as const,
      tags: ["roaming", "eu", "kosten"],
      featured: false,
      publishedAt: daysAgo(14),
      body: `<p>Innerhalb der EU gilt „Roam like at home“ – doch bei eSIMs gibt es ein paar Besonderheiten zu beachten.</p>
<h2>Wie funktioniert Roaming mit eSIM?</h2>
<p>Deine PoloSim eSIM verbindet sich automatisch mit dem stärksten verfügbaren Netz. Du musst nichts manuell einstellen.</p>
<h2>Kostenkontrolle</h2>
<p>Da du ein festes Datenpaket kaufst, gibt es keine bösen Überraschungen auf der Rechnung.</p>`,
    },
    {
      slug: "esim-fuer-iphone-einrichten",
      title: "eSIM auf dem iPhone einrichten: Die schnelle Anleitung",
      excerpt: "iOS macht die eSIM-Einrichtung besonders einfach. So gehst du vor – mit Screenshots aus den Einstellungen.",
      category: "GUIDE" as const,
      tags: ["iphone", "ios", "einrichtung"],
      featured: false,
      publishedAt: daysAgo(20),
      body: `<p>Apple-Geräte gehören zu den eSIM-freundlichsten Smartphones überhaupt. Hier die Anleitung für iOS.</p>
<h2>Einstellungen öffnen</h2>
<p>Gehe zu „Einstellungen“ → „Mobilfunk“ → „eSIM hinzufügen“ → „QR-Code verwenden“.</p>
<h2>QR-Code scannen</h2>
<p>Halte die Kamera über den Code. iOS erkennt die eSIM automatisch und installiert sie.</p>`,
    },
    {
      slug: "esim-netzabdeckung-deutschland",
      title: "Netzabdeckung in Deutschland: Wo du überall online bist",
      excerpt: "Stadt, Land, Bahn – ein Überblick über die Mobilfunkabdeckung und welches Netz wo am stärksten ist.",
      category: "NEWS" as const,
      tags: ["netz", "abdeckung", "5g"],
      featured: false,
      publishedAt: daysAgo(28),
      body: `<p>Deutschland hat in den letzten Jahren stark in 4G und 5G investiert. Hier der Stand 2026.</p>
<h2>Ballungsräume</h2>
<p>In Städten wie Berlin, München und Hamburg ist 5G nahezu flächendeckend verfügbar.</p>
<h2>Ländliche Regionen</h2>
<p>Auch auf dem Land hat sich die Abdeckung deutlich verbessert. PoloSim wählt automatisch das beste verfügbare Netz.</p>`,
    },
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { country_slug: { country: "DE", slug: p.slug } },
      update: {},
      create: {
        country: "DE",
        status: "PUBLISHED",
        coverImage: null,
        metaTitle: p.title,
        metaDescription: p.excerpt,
        ...p,
      },
    });
  }

  // ─── Rehberler ───────────────────────────────────────────
  const guides = [
    { slug: "was-ist-eine-esim", title: "Was ist eine eSIM und wie funktioniert sie?", order: 1, difficulty: "EASY" as const, estimatedTime: "3 Min.",
      body: `<p>Eine eSIM (embedded SIM) ist ein fest im Gerät verbauter Chip, der die Funktion einer klassischen SIM-Karte übernimmt – nur digital. Statt eine Plastikkarte einzulegen, lädst du dein Mobilfunkprofil per QR-Code herunter.</p><p>Das spart Platz im Gerät, ermöglicht mehrere Profile gleichzeitig und macht den Anbieterwechsel zum Kinderspiel.</p>` },
    { slug: "esim-kompatible-geraete", title: "Welche Geräte unterstützen eSIM?", order: 2, difficulty: "EASY" as const, estimatedTime: "4 Min.",
      body: `<p>Die meisten modernen Smartphones unterstützen eSIM. Dazu gehören iPhone XS und neuer, Google Pixel ab Generation 3, Samsung Galaxy S20 und neuer sowie viele weitere.</p><p>Prüfe im Zweifel die Spezifikationen deines Geräts oder wähle in den Einstellungen „eSIM hinzufügen“ – ist die Option vorhanden, bist du startklar.</p>` },
    { slug: "esim-installation-android", title: "eSIM auf Android-Geräten installieren", order: 3, difficulty: "MEDIUM" as const, estimatedTime: "5 Min.",
      body: `<p>Bei Android-Geräten findest du die eSIM-Einrichtung unter „Einstellungen“ → „Netzwerk & Internet“ → „SIMs“ → „SIM hinzufügen“ → „Stattdessen eine eSIM herunterladen“.</p><p>Scanne den QR-Code und folge den Anweisungen. Aktiviere anschließend das Datenroaming.</p>` },
    { slug: "esim-aktivierung-probleme-loesen", title: "Häufige Aktivierungsprobleme und Lösungen", order: 4, difficulty: "ADVANCED" as const, estimatedTime: "6 Min.",
      body: `<p>Funktioniert die Aktivierung nicht? Hier die häufigsten Ursachen: kein WLAN während der Einrichtung, deaktiviertes Datenroaming oder ein nicht entsperrtes Gerät.</p><p>Starte das Gerät neu, prüfe die APN-Einstellungen und kontaktiere bei anhaltenden Problemen unseren 24/7-Support.</p>` },
    { slug: "esim-datenverbrauch-verwalten", title: "Datenverbrauch verwalten und sparen", order: 5, difficulty: "MEDIUM" as const, estimatedTime: "4 Min.",
      body: `<p>Behalte deinen Verbrauch im Blick: In den Einstellungen kannst du den Datenzähler einsehen und Warnungen einrichten.</p><p>Tipps zum Sparen: Updates nur über WLAN, Streaming-Qualität reduzieren und Hintergrunddaten für nicht genutzte Apps deaktivieren.</p>` },
  ];

  for (const g of guides) {
    await prisma.guide.upsert({
      where: { country_slug: { country: "DE", slug: g.slug } },
      update: {},
      create: { country: "DE", status: "PUBLISHED", metaTitle: g.title, ...g },
    });
  }

  // ─── SSS ─────────────────────────────────────────────────
  const existingFaqs = await prisma.faq.count({ where: { country: "DE" } });
  if (existingFaqs === 0) {
    await prisma.faq.createMany({
      data: [
        { country: "DE", category: "GENERAL", order: 1, question: "Was ist eine eSIM?", answer: "Eine eSIM ist eine digitale SIM-Karte, die fest in deinem Gerät verbaut ist. Du aktivierst sie per QR-Code – ganz ohne physische Karte." },
        { country: "DE", category: "GENERAL", order: 2, question: "Funktioniert die eSIM in ganz Deutschland?", answer: "Ja. Unsere eSIMs verbinden sich automatisch mit dem stärksten verfügbaren Netz und bieten deutschlandweite Abdeckung." },
        { country: "DE", category: "SETUP", order: 3, question: "Wie aktiviere ich meine eSIM?", answer: "Nach dem Kauf erhältst du einen QR-Code. Diesen scannst du in den Mobilfunk-Einstellungen deines Geräts. Die Aktivierung dauert weniger als 5 Minuten." },
        { country: "DE", category: "SETUP", order: 4, question: "Brauche ich WLAN zur Einrichtung?", answer: "Ja, für die einmalige Installation des eSIM-Profils benötigst du eine WLAN-Verbindung. Danach nutzt du das Mobilfunknetz." },
        { country: "DE", category: "SETUP", order: 5, question: "Welche Geräte werden unterstützt?", answer: "Die meisten Smartphones ab 2019, darunter iPhone XS und neuer, Google Pixel 3+, Samsung Galaxy S20+ und viele weitere." },
        { country: "DE", category: "PACKAGES", order: 6, question: "Wie lange ist mein Tarif gültig?", answer: "Die Gültigkeit hängt vom gewählten Tarif ab – von 7 bis 30 Tagen. Die genaue Laufzeit findest du bei jedem Paket." },
        { country: "DE", category: "PACKAGES", order: 7, question: "Was passiert, wenn mein Datenvolumen aufgebraucht ist?", answer: "Du kannst jederzeit ein neues Paket kaufen und es zusätzlich aktivieren. Es entstehen keine automatischen Zusatzkosten." },
        { country: "DE", category: "PACKAGES", order: 8, question: "Kann ich meinen Tarif zurückerstatten lassen?", answer: "Solange die eSIM noch nicht aktiviert wurde, ist eine Rückerstattung möglich. Kontaktiere dazu einfach unseren Support." },
        { country: "DE", category: "OPERATORS", order: 9, question: "Mit welchen Netzen arbeitet PoloSim?", answer: "Wir arbeiten mit den führenden deutschen Mobilfunknetzen zusammen, um die bestmögliche Abdeckung sicherzustellen." },
        { country: "DE", category: "OPERATORS", order: 10, question: "Kann ich meine eSIM auch im EU-Ausland nutzen?", answer: "Viele unserer Tarife unterstützen EU-weites Roaming. Achte bei der Auswahl auf den Hinweis „EU-Roaming inklusive“." },
      ],
    });
  }

  // ─── Banner / Slider ─────────────────────────────────────
  const existingBanners = await prisma.banner.count({ where: { country: "DE" } });
  if (existingBanners === 0) {
    await prisma.banner.createMany({
      data: [
        {
          country: "DE", order: 0, active: true,
          image: "/uploads/banner-1.svg",
          title: "Germany eSIM — sofort online",
          subtitle: "Kein Warten, keine physische Karte. QR-Code scannen und in unter 5 Minuten verbunden.",
          ctaText: "Tarife ansehen", ctaHref: "/packages",
        },
        {
          country: "DE", order: 1, active: true,
          image: "/uploads/banner-2.svg",
          title: "Deutschlandweite Abdeckung",
          subtitle: "Stabile 4G/5G-Verbindung im ganzen Land — automatisch im stärksten Netz.",
          ctaText: "Mehr erfahren", ctaHref: "/guides",
        },
        {
          country: "DE", order: 2, active: true,
          image: "/uploads/banner-3.svg",
          title: "Flexibel & ohne Vertrag",
          subtitle: "Wähle genau das Datenpaket, das du brauchst. Keine Bindung, keine versteckten Kosten.",
          ctaText: "Jetzt vergleichen", ctaHref: "/packages",
        },
      ],
    });
  }

  // ─── Varsayılan Menü Öğeleri ─────────────────────────────
  const defaultMenu = [
    { label: "Start",    href: "/",         order: 0 },
    { label: "Tarife",   href: "/packages", order: 1 },
    { label: "Ratgeber", href: "/guides",   order: 2 },
    { label: "Blog",     href: "/blog",     order: 3 },
    { label: "FAQ",      href: "/faq",      order: 4 },
  ];
  for (const mi of defaultMenu) {
    const exists = await prisma.menuItem.findFirst({ where: { country: "DE", href: mi.href } });
    if (!exists) {
      await prisma.menuItem.create({ data: { country: "DE", target: "_self", ...mi } });
    }
  }

  console.log("Seed tamamlandı");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
