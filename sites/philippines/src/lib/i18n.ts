export type LangMode = "NATIVE" | "EN";

export const nativeDict = {
  "nav_tarife": "Plans",
  "nav_ablauf": "Steps",
  "nav_faq": "FAQ",
  "nav_blog": "Blog",
  "eyebrow_live": "LIVE · COVERAGE PHILIPPINES",
  "headline_p1": "Get connected",
  "headline_p2_1": "before ",
  "headline_p2_2": "you ",
  "headline_p3": "land.",
  "subheadline_fallback": "Prepaid eSIM for Philippines with zero roaming fees. Instant QR code delivery by email — active before baggage claim.",
  "device_check_title": "Does your phone support eSIM?",
  "device_check_select": "Select device",
  "device_check_btn": "Show me plans",
  "device_check_success": "✓ Your device is 100% eSIM compatible!",
  "device_check_warn": "✕ This device may not support eSIM.",
  "stage_title": "ESIM · SIGNAL",
  "stage_scan": "Scan & Connect",
  "stage_active_in": "Active in Manila",
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
  "step1_title": "Choose your Philippines plan",
  "step1_desc": "Select the perfect data package for your trip. Instant QR code delivery by email.",
  "step2_title": "Scan the QR code",
  "step2_desc": "Scan the QR code in your smartphone settings under 'Add Cellular Plan'.",
  "step3_title": "Connect instantly",
  "step3_desc": "Enable data upon arrival and enjoy high-speed internet everywhere.",
  "footer_rights": "All rights reserved."
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
