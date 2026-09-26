export type LangMode = "NATIVE" | "EN";

export const nativeDict = {
  "nav_tarife": "Tarife",
  "nav_ablauf": "Pași",
  "nav_faq": "FAQ",
  "nav_blog": "Blog",
  "eyebrow_live": "EN VIVO · ACOPERIRE REȚEA ROMÂNIA",
  "headline_p1": "Conectează-te",
  "headline_p2_1": "înainte ",
  "headline_p2_2": "să ",
  "headline_p3": "aterizezi.",
  "subheadline_fallback": "eSIM preplătit pentru România fără contract și fără taxe de roaming. Cod QR prin e-mail — activ înainte de benzile de bagaje.",
  "device_check_title": "Telefonul tău suportă eSIM?",
  "device_check_select": "Selectează dispozitivul",
  "device_check_btn": "Vezi tarifele",
  "device_check_success": "✓ Dispozitivul tău este 100% compatibil cu eSIM!",
  "device_check_warn": "✕ Acest dispozitiv s-ar putea să nu suporte eSIM.",
  "stage_title": "ESIM · SEMNAL",
  "stage_scan": "Scanează & Conectează",
  "stage_active_in": "Activ în București",
  "stage_live_5min": "Activ în 5 min.",
  "pkg_popular": "POPULAR",
  "pkg_chip_unlimited": "NELIMITAT",
  "pkg_chip_hotspot": "HOTSPOT",
  "pkg_chip_instant": "INSTANT",
  "pkg_per_day": "zi",
  "pkg_per_days": "zile",
  "pkg_per_day_approx": "≈ %s / zi",
  "pkg_buy_btn": "Cumpără acum",
  "steps_eyebrow": "ONLINE ÎN TREI PAȘI",
  "steps_title": "În 3 pași simpli online",
  "steps_lead": "Gata de navigat în mai puțin de 2 minute — fără cartelă SIM fizică.",
  "step1_title": "Alege tariful pentru România",
  "step1_desc": "Selectează pachetul de date ideal pentru călătoria ta. Primul cod QR este livrat instant prin e-mail.",
  "step2_title": "Scanează codul QR",
  "step2_desc": "Scanează codul QR din setările smartphone-ului tău la 'Adăugare plan celular'.",
  "step3_title": "Conectează-te instant",
  "step3_desc": "Activează linia de date la sosire. Te conectezi direct la cea mai bună rețea locală.",
  "footer_rights": "Toate drepturile rezervate."
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
