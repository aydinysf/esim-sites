export type LangMode = "NATIVE" | "EN";

export const nativeDict = {
  "nav_tarife": "Tarify",
  "nav_ablauf": "Postup",
  "nav_faq": "FAQ",
  "nav_blog": "Blog",
  "eyebrow_live": "ŽIVĚ · POKRYTÍ SÍTĚ ČESKO",
  "headline_p1": "Připojte se",
  "headline_p2_1": "než ",
  "headline_p2_2": "vám ",
  "headline_p3": "přistane.",
  "subheadline_fallback": "Prepaid eSIM pro Česko bez smlouvy a bez roamingových poplatků. QR kód doručen e-mailem — aktivní ještě před výdejem zavazadel.",
  "device_check_title": "Podporuje váš telefon eSIM?",
  "device_check_select": "Vybrat zařízení",
  "device_check_btn": "Zobrazit tarify",
  "device_check_success": "✓ Vaše zařízení je 100% kompatibilní s eSIM!",
  "device_check_warn": "✕ Toto zařízení nemusí podporovat eSIM.",
  "stage_title": "ESIM · SIGNÁL",
  "stage_scan": "Naskenovat & Připojit",
  "stage_active_in": "Aktivní v Praze",
  "stage_live_5min": "Aktivní za 5 min.",
  "pkg_popular": "OBLÍBENÉ",
  "pkg_chip_unlimited": "NEOMEZENĚ",
  "pkg_chip_hotspot": "HOTSPOT",
  "pkg_chip_instant": "IHNED",
  "pkg_per_day": "den",
  "pkg_per_days": "dní",
  "pkg_per_day_approx": "≈ %s / den",
  "pkg_buy_btn": "Koupit nyní",
  "steps_eyebrow": "VE TŘECH KROCÍCH ONLINE",
  "steps_title": "Ve 3 jednoduchých krocích online",
  "steps_lead": "Připraven k surfování za méně než 2 minuty — bez fyzické SIM karty.",
  "step1_title": "Vyberte si tarif pro Česko",
  "step1_desc": "Vyberte si ideální datový balíček pro vaši cestu. QR kód obdržíte ihned e-mailem.",
  "step2_title": "Naskenujte QR kód",
  "step2_desc": "Naskenujte QR kód v nastavení svého smartphonu v sekci 'Přidat mobilní tarif'.",
  "step3_title": "Připojte se ihned",
  "step3_desc": "Po příjezdu aktivujte datovou linku. Budete ihned připojeni k nejlepší místní síti.",
  "footer_rights": "Všechna práva vyhrazena."
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
