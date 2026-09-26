export type LangMode = "NATIVE" | "EN";

export const nativeDict = {
  "nav_tarife": "Tarifas",
  "nav_ablauf": "Pasos",
  "nav_faq": "FAQ",
  "nav_blog": "Blog",
  "eyebrow_live": "EN VIVO · COBERTURA ESPAÑA",
  "headline_p1": "Conéctate",
  "headline_p2_1": "antes ",
  "headline_p2_2": "de ",
  "headline_p3": "aterrizar.",
  "subheadline_fallback": "eSIM prepago sin contrato ni trampas de roaming para España. Código QR directo por e-mail: activo antes de la recogida de equipaje.",
  "device_check_title": "¿Tu teléfono soporta eSIM?",
  "device_check_select": "Seleccionar dispositivo",
  "device_check_btn": "Ver tarifas",
  "device_check_success": "✓ ¡Tu dispositivo es 100% compatible con eSIM!",
  "device_check_warn": "✕ Este dispositivo podría no soportar eSIM.",
  "stage_title": "ESIM · SEÑAL",
  "stage_scan": "Escanear & Conectar",
  "stage_active_in": "Activo en Madrid",
  "stage_live_5min": "Activo en 5 min.",
  "pkg_popular": "POPULAR",
  "pkg_chip_unlimited": "ILIMITADO",
  "pkg_chip_hotspot": "ZONA WI-FI",
  "pkg_chip_instant": "AL INSTANTE",
  "pkg_per_day": "día",
  "pkg_per_days": "días",
  "pkg_per_day_approx": "≈ %s / día",
  "pkg_buy_btn": "Comprar ahora",
  "steps_eyebrow": "EN TRES PASOS ONLINE",
  "steps_title": "En 3 sencillos pasos online",
  "steps_lead": "Listo para navegar en menos de 2 minutos, sin tarjeta SIM física.",
  "step1_title": "Elige tu tarifa para España",
  "step1_desc": "Selecciona el paquete de datos ideal para tu viaje. Recibirás el código QR al instante por e-mail.",
  "step2_title": "Escanea el código QR",
  "step2_desc": "Escanea el código QR desde los ajustes de tu smartphone en 'Añadir plan móvil'.",
  "step3_title": "Conéctate al instante",
  "step3_desc": "Activa la línea de datos al llegar. Conéctate directamente a la mejor red local.",
  "footer_rights": "Todos los derechos reservados."
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
