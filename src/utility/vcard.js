/**
 * vCard (.vcf) Generator for Revayah One Digital Identity Cards
 * Generates standards-compliant vCard 3.0 file and triggers native download / import.
 */

export const generateVCard = (cardData = {}) => {
  if (!cardData) return;

  const prefix = cardData.prefix || "";
  const firstName = cardData.firstName || "";
  const lastName = cardData.lastName || "";
  const suffix = cardData.suffix || "";
  const fullName = `${prefix ? prefix + " " : ""}${firstName} ${lastName}${suffix ? " " + suffix : ""}`.trim() || "Contact";

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;${prefix};${suffix}`,
    `FN:${fullName}`,
  ];

  if (cardData.jobTitle) {
    lines.push(`TITLE:${cardData.jobTitle.replace(/;/g, "\\;")}`);
  }

  if (cardData.companyName || cardData.organization) {
    const org = cardData.companyName || cardData.organization;
    lines.push(`ORG:${org.replace(/;/g, "\\;")}`);
  }

  // Primary Email & Additional Emails
  const primaryEmail = cardData.email || (cardData.emails && cardData.emails[0]?.address);
  if (primaryEmail) {
    lines.push(`EMAIL;TYPE=INTERNET,PREF:${primaryEmail}`);
  }

  if (Array.isArray(cardData.emails)) {
    cardData.emails.forEach((e) => {
      const emailAddr = typeof e === "string" ? e : e?.address;
      if (emailAddr && emailAddr !== primaryEmail) {
        const label = (typeof e === "object" && e?.label) ? e.label.toUpperCase() : "WORK";
        lines.push(`EMAIL;TYPE=INTERNET,${label}:${emailAddr}`);
      }
    });
  }

  // Phone Numbers
  if (Array.isArray(cardData.phones) && cardData.phones.length > 0) {
    cardData.phones.forEach((p, idx) => {
      const num = typeof p === "string" ? p : p?.number;
      if (num) {
        const isPref = idx === 0 || p?.isPrimary ? ",PREF" : "";
        const label = (typeof p === "object" && p?.label) ? p.label.toUpperCase() : "CELL";
        lines.push(`TEL;TYPE=${label}${isPref}:${num}`);
      }
    });
  } else if (cardData.virtualNumber) {
    lines.push(`TEL;TYPE=WORK:${cardData.virtualNumber}`);
  }

  // Digital Card URL & Websites
  const digitalCardUrl = cardData.shareableUrl || (typeof window !== "undefined" && window.location.href);
  if (digitalCardUrl) {
    lines.push(`URL;TYPE=DIGICARD:${digitalCardUrl}`);
  }

  if (Array.isArray(cardData.websites)) {
    cardData.websites.forEach((w) => {
      const url = typeof w === "string" ? w : w?.url;
      if (url) {
        lines.push(`URL;TYPE=WEBSITE:${url}`);
      }
    });
  }

  // Addresses
  if (Array.isArray(cardData.addresses) && cardData.addresses.length > 0) {
    cardData.addresses.forEach((addr) => {
      const street = addr?.street || "";
      const city = addr?.city || "";
      const state = addr?.state || "";
      const postal = addr?.postalCode || "";
      const country = addr?.country || "";
      lines.push(`ADR;TYPE=WORK:;;${street};${city};${state};${postal};${country}`);
    });
  }

  // Bio / Notes
  const notes = cardData.aboutText || cardData.bio || cardData.tagline;
  if (notes) {
    lines.push(`NOTE:${notes.replace(/\r?\n/g, "\\n").replace(/;/g, "\\;")}`);
  }

  lines.push("REV:" + new Date().toISOString());
  lines.push("END:VCARD");

  const vcfString = lines.join("\r\n");
  const blob = new Blob([vcfString], { type: "text/vcard;charset=utf-8;" });
  const downloadUrl = URL.createObjectURL(blob);

  const safeFileName = `${firstName || "contact"}_${lastName || "card"}`.trim().replace(/\s+/g, "_") + ".vcf";

  const downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.setAttribute("download", safeFileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);
};
