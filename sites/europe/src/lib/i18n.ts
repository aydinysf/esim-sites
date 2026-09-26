export type LangMode = "NATIVE" | "EN";

export const nativeDict = {
  "nav_tarife": "Tarife",
  "nav_ablauf": "Ablauf",
  "nav_faq": "FAQ",
  "nav_blog": "Blog",
  "eyebrow_live": "DIREKT · NETZABDECKUNG EUROPA",
  "headline_p1": "Verbinde dich",
  "headline_p2_1": "bevor ",
  "headline_p2_2": "du ",
  "headline_p3": "landest.",
  "subheadline_fallback": "Prepaid-eSIM für Europa ohne Vertrag und ohne Roaming-Falle. QR-Code direkt per E-Mail — aktiv, bevor das Gepäckband startet.",
  "device_check_title": "Unterstützt dein Handy eSIM?",
  "device_check_select": "Gerät wählen",
  "device_check_btn": "Zeig mir die Tarife",
  "device_check_success": "✓ Dein Gerät ist 100% eSIM-kompatibel!",
  "device_check_warn": "✕ Dieses Gerät unterstützt evtl. keine eSIM.",
  "stage_title": "ESIM · SIGNAL",
  "stage_scan": "Scannen & Verbinden",
  "stage_active_in": "Aktiv in Europa",
  "stage_live_5min": "Aktiv in 5 Min.",
  "pkg_popular": "BELIEBT",
  "pkg_chip_unlimited": "UNBEGRENZT",
  "pkg_chip_hotspot": "HOTSPOT",
  "pkg_chip_instant": "SOFORT",
  "pkg_per_day": "Tag",
  "pkg_per_days": "Tage",
  "pkg_per_day_approx": "≈ %s / Tag",
  "pkg_buy_btn": "Jetzt kaufen",
  "steps_eyebrow": "IN DREI SCHRITTEN ONLINE",
  "steps_title": "In 3 einfachen Schritten online",
  "steps_lead": "In weniger als 2 Minuten surffähig — ganz ohne physische SIM-Karte.",
  "step1_title": "Tarif für Europa wählen",
  "step1_desc": "Wähle das passende Datenpaket für deine Reise. Der QR-Code wird sofort per E-Mail geliefert.",
  "step2_title": "QR-Code scannen",
  "step2_desc": "Scanne den QR-Code in den Einstellungen deines Smartphones unter 'Mobilfunk hinzufügen'.",
  "step3_title": "Sofort verknüpft & surfen",
  "step3_desc": "Aktiviere die Datenleitung bei deiner Ankunft. Du bist sofort mit dem besten Netz verbunden.",
  "footer_rights": "Alle Rechte vorbehalten."
};

export const enDict = {
  "nav_tarife": "Plans",
  "nav_ablauf": "How it works",
  "nav_faq": "FAQ",
  "nav_blog": "Blog",
  "eyebrow_live": "LIVE · NETWORK COVERAGE",
  "headline_p1": "Get connected",
  "headline_p2_1": "before ",
  "headline_p2_2": "you ",
  "headline_p3": "land.",
  "subheadline_fallback": "Prepaid eSIM with zero contract and zero roaming traps. Instant QR code delivery by email — active before baggage claim.",
  "device_check_title": "Does your phone support eSIM?",
  "device_check_select": "Select device",
  "device_check_btn": "Show me plans",
  "device_check_success": "✓ Your device is 100% eSIM compatible!",
  "device_check_warn": "✕ This device may not support eSIM.",
  "stage_title": "ESIM · SIGNAL",
  "stage_scan": "Scan & Connect",
  "stage_active_in": "Active in destination",
  "stage_live_5min": "Live in 5 min",
  "pkg_popular": "POPULAR",
  "pkg_chip_unlimited": "UNLIMITED",
  "pkg_chip_hotspot": "HOTSPOT",
  "pkg_chip_instant": "INSTANT",
  "pkg_per_day": "day",
  "pkg_per_days": "days",
  "pkg_per_day_approx": "≈ %s / day",
  "pkg_buy_btn": "Buy now",
  "steps_eyebrow": "ONLINE IN THREE STEPS",
  "steps_title": "Get online in 3 easy steps",
  "steps_lead": "Ready to surf in less than 2 minutes — no physical SIM card needed.",
  "step1_title": "Choose your travel plan",
  "step1_desc": "Select the perfect data package for your trip. Instant QR code delivery by email.",
  "step2_title": "Scan the QR code",
  "step2_desc": "Scan the QR code in your smartphone settings under 'Add Cellular Plan'.",
  "step3_title": "Connect instantly",
  "step3_desc": "Enable data upon arrival and enjoy high-speed internet everywhere.",
  "footer_rights": "All rights reserved."
};

export function getTranslation(key: keyof typeof nativeDict, mode: LangMode = "NATIVE"): string {
  if (mode === "EN") {
    return enDict[key] || nativeDict[key] || key;
  }
  return nativeDict[key] || key;
}


export const t = {
  home: {
    packagesTitle: "eSIM Tarife & Datenpakete"
  },
  footer: {
    tagline: "Prepaid eSIM für schnelles mobiles Internet auf Reisen."
  }
};
