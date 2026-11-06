import React, { forwardRef } from "react";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

/**
 * MiniCardSnapshot
 * 
 * High-resolution 600x600 snapshot card component matching Screen 1 in the reference
 * and WHATSAPP_RICH_UNFURL_IMPLEMENTATION_PLAN.md.
 * Designed to be captured off-screen by html-to-image and uploaded as cardPreviewImage to Azure Blob Storage.
 */
const MiniCardSnapshot = forwardRef(({ cardData, className = "" }, ref) => {
  if (!cardData) return null;

  // 1. Resolve Name
  const prefix = cardData.prefix ? `${cardData.prefix} ` : "";
  const firstName = cardData.firstName || "";
  const lastName = cardData.lastName || "";
  const fullName = `${prefix}${firstName} ${lastName}`.trim() || cardData.name || "Priya Sharma";

  // 2. Resolve Designation & Company
  const jobTitle = cardData.jobTitle || cardData.tagline || "Marketing Manager";
  const companyName = cardData.companyName || cardData.organization || "BrightPath Solutions";

  // 3. Resolve Avatar
  const profilePhoto = cardData.profilePhoto ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400";

  // 4. Resolve Contacts
  const phone = (Array.isArray(cardData.phones) && cardData.phones[0]?.number) ||
    cardData.phone || cardData.mobile || "+91 98765 43210";

  const email = (Array.isArray(cardData.emails) && cardData.emails[0]?.address) ||
    cardData.email || "priya@brightpath.in";

  let location = "Bengaluru, India";
  if (Array.isArray(cardData.addresses) && cardData.addresses.length > 0) {
    const addr = cardData.addresses[0];
    location = addr.city && addr.country ? `${addr.city}, ${addr.country}` : (addr.fullAddress || addr.city || location);
  } else if (cardData.serviceArea) {
    location = cardData.serviceArea;
  } else if (cardData.location) {
    location = cardData.location;
  }

  // 5. Target URL & QR Code
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.revayah.one";
  const urlSlug = cardData.urlSlug || cardData.shareableUrl || "priya-sharma";
  const targetUrl = `${origin}/preview/${urlSlug}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(targetUrl)}&format=png&margin=0`;

  return (
    <div
      ref={ref}
      id="mini-card-snapshot"
      className={`w-[520px] bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 text-left select-none relative font-sans ${className}`}
      style={{
        boxShadow: "0 24px 50px -12px rgba(11, 30, 54, 0.35)",
      }}
    >
      {/* =========================================================================
          TOP HEADER: Dark Midnight Navy Stage (#0B1E36 / #08182F)
         ========================================================================= */}
      <div className="relative bg-gradient-to-br from-[#08182F] via-[#0B1E36] to-[#0E2C58] text-white pt-8 px-8 pb-4 overflow-hidden">
        
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 10px 10px, #ffffff 1.2px, transparent 0)",
            backgroundSize: "22px 22px"
          }}
        />

        {/* Top Row: Avatar on Left, QR Code on Right */}
        <div className="flex items-start justify-between relative z-10 mb-5">
          {/* Circular avatar with crisp white ring */}
          <div className="relative">
            <div className="w-[88px] h-[88px] rounded-full p-[3px] bg-white shadow-xl ring-2 ring-white/50">
              <img
                src={profilePhoto}
                alt={fullName}
                crossOrigin="anonymous"
                className="w-full h-full object-cover rounded-full bg-slate-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400";
                }}
              />
            </div>
          </div>

          {/* Dynamic QR Code */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-xl p-1 shadow-lg border border-white/40 flex items-center justify-center">
              <img
                src={qrApiUrl}
                alt="QR Code"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[9px] font-bold text-blue-200 tracking-wider uppercase mt-1 opacity-90">
              Scan Card
            </span>
          </div>
        </div>

        {/* Name, Designation, Company */}
        <div className="relative z-10 pb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
            {fullName}
          </h2>
          {jobTitle && (
            <p className="text-[14px] font-medium text-slate-200 mt-0.5 leading-tight">
              {jobTitle}
            </p>
          )}
          {companyName && (
            <p className="text-[13px] font-normal text-slate-300/90 mt-0.5 leading-tight">
              {companyName}
            </p>
          )}
        </div>

        {/* Golden Hairline Divider Curve */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 520 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-9 block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 24 C140 38, 350 38, 520 12 L520 36 L0 36 Z"
              fill="#FFFFFF"
            />
            <path
              d="M0 24 C140 38, 350 38, 520 12"
              stroke="#D4AF37"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          LIGHT BOTTOM STAGE: Contact Details with Dark Badges
         ========================================================================= */}
      <div className="bg-white px-8 pt-4 pb-6 space-y-4">
        {phone && (
          <div className="flex items-center gap-4 text-left">
            <div className="w-9 h-9 rounded-full bg-[#0B1E36] text-white flex items-center justify-center shrink-0 shadow-xs">
              <FaPhoneAlt className="w-4 h-4" />
            </div>
            <span className="text-[14.5px] font-semibold text-slate-800 tracking-tight">
              {phone}
            </span>
          </div>
        )}

        <div className="flex items-center gap-4 text-left">
          <div className="w-9 h-9 rounded-full bg-[#0B1E36] text-white flex items-center justify-center shrink-0 shadow-xs">
            <FaWhatsapp className="w-4.5 h-4.5 text-emerald-300" />
          </div>
          <span className="text-[14.5px] font-semibold text-slate-800 tracking-tight">
            WhatsApp
          </span>
        </div>

        {email && (
          <div className="flex items-center gap-4 text-left">
            <div className="w-9 h-9 rounded-full bg-[#0B1E36] text-white flex items-center justify-center shrink-0 shadow-xs">
              <FaEnvelope className="w-4 h-4 text-blue-200" />
            </div>
            <span className="text-[14px] font-medium text-slate-700 truncate tracking-tight">
              {email}
            </span>
          </div>
        )}

        {location && (
          <div className="flex items-center gap-4 text-left">
            <div className="w-9 h-9 rounded-full bg-[#0B1E36] text-white flex items-center justify-center shrink-0 shadow-xs">
              <FaMapMarkerAlt className="w-4 h-4 text-amber-200" />
            </div>
            <span className="text-[14px] font-medium text-slate-700 tracking-tight">
              {location}
            </span>
          </div>
        )}
      </div>

      {/* =========================================================================
          WARM IVORY FOOTER: "Powered by Reva-Yah One"
         ========================================================================= */}
      <div className="bg-[#FAF7F3] border-t border-slate-100 py-3 px-8 flex items-center justify-center gap-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4.5 h-4.5 text-[#C59B27] shrink-0"
        >
          <path
            d="M12 2L14.4 7.2L20 8L15.8 12.2L17 18L12 15.2L7 18L8.2 12.2L4 8L9.6 7.2L12 2Z"
            fill="currentColor"
          />
        </svg>

        <span className="text-[12px] text-slate-500 font-medium tracking-wide">
          Powered by{" "}
          <strong className="font-bold text-slate-800 tracking-tight">
            Reva-Yah One
          </strong>
        </span>
      </div>
    </div>
  );
});

MiniCardSnapshot.displayName = "MiniCardSnapshot";

export default MiniCardSnapshot;

