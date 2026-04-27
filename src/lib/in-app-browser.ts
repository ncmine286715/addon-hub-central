// Detects if the page is being viewed inside an in-app browser
// (TikTok, Instagram, Facebook, Snapchat, etc.) where Terabox / external
// downloads are heavily restricted. Returns the app name when detected.
export type InAppBrowser =
  | "TikTok"
  | "Instagram"
  | "Facebook"
  | "Snapchat"
  | "Twitter"
  | "LinkedIn"
  | "WeChat"
  | "Line"
  | null;

export function detectInAppBrowser(ua?: string): InAppBrowser {
  if (typeof window === "undefined" && !ua) return null;
  const u = (ua ?? navigator.userAgent ?? "").toLowerCase();

  if (/musical_ly|bytedance|tiktok|trill/.test(u)) return "TikTok";
  if (/instagram/.test(u)) return "Instagram";
  if (/fbav|fban|fb_iab|fbios/.test(u)) return "Facebook";
  if (/snapchat/.test(u)) return "Snapchat";
  if (/twitter|twitterandroid/.test(u)) return "Twitter";
  if (/linkedinapp/.test(u)) return "LinkedIn";
  if (/micromessenger/.test(u)) return "WeChat";
  if (/line\//.test(u)) return "Line";
  return null;
}

export function isMobile(ua?: string): boolean {
  if (typeof window === "undefined" && !ua) return false;
  const u = (ua ?? navigator.userAgent ?? "").toLowerCase();
  return /android|iphone|ipad|ipod|mobile/.test(u);
}

export function isIOS(ua?: string): boolean {
  if (typeof window === "undefined" && !ua) return false;
  const u = (ua ?? navigator.userAgent ?? "").toLowerCase();
  return /iphone|ipad|ipod/.test(u);
}
