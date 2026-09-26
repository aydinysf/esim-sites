export type LangMode = "NATIVE" | "EN";

export const nativeDict = {
  "nav_tarife": "Tariflər",
  "nav_ablauf": "Qaydalar",
  "nav_faq": "FAQ",
  "nav_blog": "Blog",
  "eyebrow_live": "CANLI · ŞƏBƏKƏ ƏHATƏSİ AZƏRBAYCAN",
  "headline_p1": "Qoşulun",
  "headline_p2_1": "enməzdən ",
  "headline_p2_2": "əvvəl ",
  "headline_p3": "ölkəyə.",
  "subheadline_fallback": "Müqaviləsiz və rouminqsiz öncədən ödənişli eSIM. E-poçtla dərhal QR kod — baqajınızı almadan aktivdir.",
  "device_check_title": "Telefonunuz eSIM dəstəkləyir?",
  "device_check_select": "Cihazı seçin",
  "device_check_btn": "Tariflərə bax",
  "device_check_success": "✓ Cihazınız 100% eSIM ilə uyğundur!",
  "device_check_warn": "✕ Bu cihaz eSIM dəstəkləməyə bilər.",
  "stage_title": "ESIM · SİQNAL",
  "stage_scan": "Skan et & Qoşul",
  "stage_active_in": "Bakıda aktivdir",
  "stage_live_5min": "5 dəqiqəyə aktiv",
  "pkg_popular": "MƏŞHUR",
  "pkg_chip_unlimited": "LİMİTSİZ",
  "pkg_chip_hotspot": "HOTSPOT",
  "pkg_chip_instant": "DƏRHAL",
  "pkg_per_day": "gün",
  "pkg_per_days": "gün",
  "pkg_per_day_approx": "≈ %s / gün",
  "pkg_buy_btn": "İndi al",
  "steps_eyebrow": "ÜÇ ADIMDA ONLAYN",
  "steps_title": "3 asan addımda qoşulun",
  "steps_lead": "2 dəqiqədən az müddətdə hazır — fiziki SIM karta ehtiyac yoxdur.",
  "step1_title": "Azərbaycan üçün tarif seçin",
  "step1_desc": "Səyahətiniz üçün ideal məlumat paketini seçin. QR kodu dərhal e-poçtla alın.",
  "step2_title": "QR kodu skan edin",
  "step2_desc": "Smartfonunuzun tənzimləmələrində 'Mobil plan əlavə et' bölməsindən QR kodu skan edin.",
  "step3_title": "Dərhal qoşulun",
  "step3_desc": "Gəldikdə məlumat xəttini aktivləşdirin. Ən yaxşı şəbəkəyə dərhal qoşulun.",
  "footer_rights": "Bütün hüquqlar qorunur."
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
