/** Free / personal mailbox providers. Registration accepts company addresses only. */
const PERSONAL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "yahoo.co.uk", "ymail.com", "rocketmail.com",
  "hotmail.com", "hotmail.co.uk", "outlook.com", "outlook.in", "live.com", "live.in", "msn.com",
  "aol.com", "icloud.com", "me.com", "mac.com", "proton.me", "protonmail.com", "pm.me",
  "gmx.com", "gmx.net", "mail.com", "yandex.com", "yandex.ru", "zohomail.com", "zohomail.in",
  "rediffmail.com", "qq.com", "163.com", "126.com", "inbox.com", "fastmail.com", "tutanota.com", "hey.com",
]);

/** Returns an error message, or "" when the address is a valid company email. */
export function workEmailError(raw: string): string {
  const email = raw.trim().toLowerCase();
  if (!email) return "Please enter your work email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "Please enter a valid email address.";
  if (PERSONAL.has(email.split("@")[1])) return "Please use your company email. Personal addresses like Gmail or Outlook aren’t accepted.";
  return "";
}
