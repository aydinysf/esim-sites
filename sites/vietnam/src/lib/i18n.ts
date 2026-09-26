export type LangMode = "NATIVE" | "EN";

export const nativeDict = {
  "nav_tarife": "Gói cước",
  "nav_ablauf": "Quy trình",
  "nav_faq": "FAQ",
  "nav_blog": "Blog",
  "eyebrow_live": "TRỰC TIẾP · PHỦ SÓNG VIỆT NAM",
  "headline_p1": "Kết nối ngay",
  "headline_p2_1": "trước ",
  "headline_p2_2": "khi ",
  "headline_p3": "hạ cánh.",
  "subheadline_fallback": "eSIM trả trước cho Việt Nam không hợp đồng và không phí roaming. Mã QR nhận ngay qua email — kích hoạt tức thì.",
  "device_check_title": "Điện thoại của bạn có hỗ trợ eSIM không?",
  "device_check_select": "Chọn thiết bị",
  "device_check_btn": "Xem gói cước",
  "device_check_success": "✓ Thiết bị của bạn tương thích 100% với eSIM!",
  "device_check_warn": "✕ Thiết bị này có thể không hỗ trợ eSIM.",
  "stage_title": "ESIM · TÍN HIỆU",
  "stage_scan": "Quét & Kết nối",
  "stage_active_in": "Hoạt động tại Hà Nội",
  "stage_live_5min": "Kích hoạt sau 5 phút",
  "pkg_popular": "PHỔ BIẾN",
  "pkg_chip_unlimited": "KHÔNG GIỚI HẠN",
  "pkg_chip_hotspot": "HOTSPOT",
  "pkg_chip_instant": "NGAY LẬP TỨC",
  "pkg_per_day": "ngày",
  "pkg_per_days": "ngày",
  "pkg_per_day_approx": "≈ %s / ngày",
  "pkg_buy_btn": "Mua ngay",
  "steps_eyebrow": "3 BƯỚC ĐƠN GIẢN ONLINE",
  "steps_title": "Kết nối chỉ trong 3 bước",
  "steps_lead": "Sẵn sàng lướt web trong chưa đầy 2 phút — không cần thẻ SIM vật lý.",
  "step1_title": "Chọn gói cước cho Việt Nam",
  "step1_desc": "Chọn gói dữ liệu phù hợp nhất cho chuyến đi của bạn. Nhận mã QR ngay qua email.",
  "step2_title": "Quét mã QR",
  "step2_desc": "Quét mã QR trong cài đặt điện thoại của bạn ở mục 'Thêm gói cước di động'.",
  "step3_title": "Kết nối tức thì",
  "step3_desc": "Kích hoạt dữ liệu khi đến nơi. Kết nối trực tiếp với mạng tốt nhất.",
  "footer_rights": "Tất cả các quyền được bảo lưu."
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
