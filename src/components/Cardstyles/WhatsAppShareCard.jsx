import React, { forwardRef } from "react";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaQrcode } from "react-icons/fa";

/**
 * WhatsAppShareCard
 * 
 * Exact digital identity card structure for WhatsApp sharing matching the user specification:
 * 1. Deep Luxury Navy curved header with golden/amber sweep line
 * 2. Circular avatar with white ring
 * 3. Dynamic QR code in top-right
 * 4. Full Name in bold white, designation and company in light slate
 * 5. Pure white body with dark navy circular contact icon badges (Phone, WhatsApp, Email, Location)
 * 6. Soft ivory/cream footer with "Powered by Reva-Yah One"
 */
const WhatsAppShareCard = forwardRef(({ cardData, className = "" }, ref) => {
  if (!cardData) return null;

  // 1. Resolve Name
  const prefix = cardData.prefix ? `${cardData.prefix} ` : "";
  const firstName = cardData.firstName || "";
  const lastName = cardData.lastName || "";
  const fullName = `${prefix}${firstName} ${lastName}`.trim() || cardData.name || "Priya Sharma";

  // 2. Resolve Role & Company
  const jobTitle = cardData.jobTitle || cardData.tagline || "Marketing Manager";
  const companyName = cardData.companyName || "BrightPath Solutions";

  // 3. Resolve Avatar
  const profilePhoto = cardData.profilePhoto ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400";

  // 4. Resolve Contacts
  const phone = (Array.isArray(cardData.phones) && cardData.phones[0]?.number) ||
    cardData.phone || cardData.mobile || "+91 98765 43210";

  const email = (Array.isArray(cardData.emails) && cardData.emails[0]?.address) ||
    cardData.email || "priya@brightpath.in";

  // Resolve Location
  let location = "Bengaluru, India";
  if (Array.isArray(cardData.addresses) && cardData.addresses.length > 0) {
    const addr = cardData.addresses[0];
    location = addr.city && addr.country ? `${addr.city}, ${addr.country}` : (addr.fullAddress || addr.city || location);
  } else if (cardData.serviceArea) {
    location = cardData.serviceArea;
  } else if (cardData.location) {
    location = cardData.location;
  }

  // 5. Target URL for QR Code
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.revayah.one";
  const urlSlug = cardData.urlSlug || cardData.shareableUrl || "priya-sharma";
  const targetUrl = `${origin}/preview/${urlSlug}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(targetUrl)}&format=png&margin=0`;

  return (
    <div
      ref={ref}
      id="whatsapp-share-card-container"
      className={`w-[320px] sm:w-[340px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 text-left select-none relative font-sans ${className}`}
      style={{
        boxShadow: "0 20px 45px -12px rgba(10, 31, 60, 0.28), 0 0 0 1px rgba(10, 31, 60, 0.06)",
      }}
    >
      {/* =========================================================================
          TOP HEADER: Deep Luxury Navy with Avatar, QR, and Identity Information
         ========================================================================= */}
      <div className="relative bg-gradient-to-br from-[#08182F] via-[#0B2142] to-[#0E2C58] text-white pt-6 px-6 pb-2 overflow-hidden">
        
        {/* Subtle decorative background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 10px 10px, #ffffff 1px, transparent 0)",
            backgroundSize: "20px 20px"
          }}
        />

        {/* Top Row: Avatar on Left, QR Code on Right */}
        <div className="flex items-start justify-between relative z-10 mb-4">
          
          {/* Avatar with clean white ring */}
          <div className="relative">
            <div className="w-[74px] h-[74px] rounded-full p-[2.5px] bg-white shadow-lg ring-2 ring-white/40">
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

          {/* Dynamic QR Code in top right */}
          <div className="flex flex-col items-center">
            <div className="w-13 h-13 bg-white/95 rounded-xl p-1 shadow-md border border-white/40 backdrop-blur-xs flex items-center justify-center">
              <img
                src={qrApiUrl}
                alt="QR Code"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = '<span class="text-[#0B2142]"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v32h-32v-32zm-64 0h32v32h-32v-32zm-32 32h32v32h-32v-32zm96 32h32v32h-32v-32zm-32 32h32v32h-32v-32zm-32 32h32v32h-32v-32zm64 0h32v32h-32v-32zm32-64h32v32h-32v-32z"></path></svg></span>';
                }}
              />
            </div>
            <span className="text-[8px] font-bold text-blue-200 tracking-wider uppercase mt-1 opacity-90">
              Scan Card
            </span>
          </div>

        </div>

        {/* Identity Details: Name, Designation, Company */}
        <div className="relative z-10 pb-5">
          <h2 className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
            {fullName}
          </h2>
          {jobTitle && (
            <p className="text-[12.5px] font-medium text-slate-200 mt-0.5 leading-tight">
              {jobTitle}
            </p>
          )}
          {companyName && (
            <p className="text-[11.5px] font-normal text-slate-300/90 mt-0.5 leading-tight">
              {companyName}
            </p>
          )}
        </div>

        {/* =========================================================================
            ELEGANT CURVED WAVE DIVIDER with Golden / Amber Accent Sweep
           ========================================================================= */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 340 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8 block"
            preserveAspectRatio="none"
          >
            {/* White Body wave fill */}
            <path
              d="M0 20 C90 32, 230 32, 340 10 L340 32 L0 32 Z"
              fill="#FFFFFF"
            />
            {/* Golden luxury hairline accent sweep */}
            <path
              d="M0 20 C90 32, 230 32, 340 10"
              stroke="#D4AF37"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

      </div>

      {/* =========================================================================
          MIDDLE BODY: Crisp White with Dark Circular Icon Badges
         ========================================================================= */}
      <div className="bg-white px-6 pt-3 pb-5 space-y-3.5">
        
        {/* 1. Phone */}
        {phone && (
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-8 h-8 rounded-full bg-[#0B2142] text-white flex items-center justify-center shrink-0 shadow-xs">
              <FaPhoneAlt className="w-3.5 h-3.5" />
            </div>
            <span className="text-[13px] font-semibold text-slate-800 tracking-tight select-all">
              {phone}
            </span>
          </div>
        )}

        {/* 2. WhatsApp */}
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-8 h-8 rounded-full bg-[#0B2142] text-white flex items-center justify-center shrink-0 shadow-xs">
            <FaWhatsapp className="w-4 h-4 text-emerald-300" />
          </div>
          <span className="text-[13px] font-semibold text-slate-800 tracking-tight">
            WhatsApp
          </span>
        </div>

        {/* 3. Email */}
        {email && (
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-8 h-8 rounded-full bg-[#0B2142] text-white flex items-center justify-center shrink-0 shadow-xs">
              <FaEnvelope className="w-3.5 h-3.5 text-blue-200" />
            </div>
            <span className="text-[12.5px] font-medium text-slate-700 truncate tracking-tight select-all">
              {email}
            </span>
          </div>
        )}

        {/* 4. Location */}
        {location && (
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-8 h-8 rounded-full bg-[#0B2142] text-white flex items-center justify-center shrink-0 shadow-xs">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-amber-200" />
            </div>
            <span className="text-[12.5px] font-medium text-slate-700 tracking-tight">
              {location}
            </span>
          </div>
        )}

      </div>

      {/* =========================================================================
          BOTTOM FOOTER: Warm Ivory Pill with "Powered by Reva-Yah One"
         ========================================================================= */}
      <div className="bg-[#FAF7F3] border-t border-slate-100/80 py-2.5 px-6 flex items-center justify-center gap-2">
        {/* Golden Reva-Yah emblem */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-[#C59B27] shrink-0"
        >
          <path
            d="M12 2L14.4 7.2L20 8L15.8 12.2L17 18L12 15.2L7 18L8.2 12.2L4 8L9.6 7.2L12 2Z"
            fill="currentColor"
          />
        </svg>

        <span className="text-[11px] text-slate-500 font-medium tracking-wide">
          Powered by{" "}
          <strong className="font-bold text-slate-800 tracking-tight">
            Reva-Yah One
          </strong>
        </span>
      </div>

    </div>
  );
});

WhatsAppShareCard.displayName = "WhatsAppShareCard";

export default WhatsAppShareCard;

