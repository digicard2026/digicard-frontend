import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toPng, toBlob } from "html-to-image";
import DefaultCard from "../../components/Cardstyles/DefaultCard";
import ModernCard from "../../components/Cardstyles/ModernCard";
import DarkCard from "../../components/Cardstyles/DarkCard";
import LightCard from "../../components/Cardstyles/LightCard";
import ModernCard2 from "../../components/Cardstyles/ModernCard2";
import WhatsAppShareModal from "../../components/Cardstyles/WhatsAppShareModal";
import CardRenderer from "../../components/Cardstyles/CardRenderer";
import { CARD_URL } from "../../utility/constants";
import { generateVCard } from "../../utility/vcard";
import {
  FaDownload,
  FaShareAlt,
  FaQrcode,
  FaCopy,
  FaCheck,
  FaTimes,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedinIn,
  FaGlobe,
  FaArrowLeft,
  FaPlus
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PreviewCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { urlSlug } = useParams();
  const cardRef = useRef(null);
  const desktopCardRef = useRef(null);
  const mobileCardRef = useRef(null);
  const snapshotRef = useRef(null);

  const [cardData, setCardData] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const getActiveCardNode = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640 && mobileCardRef.current) {
      return mobileCardRef.current;
    }
    return desktopCardRef.current || mobileCardRef.current || cardRef.current;
  };

  useEffect(() => {
    console.log("🎴 [PreviewCard] Page opened with urlSlug:", urlSlug || location.state?.urlSlug || "none");
    // ALWAYS fetch from database - never use location.state directly
    if (urlSlug) {
      fetchCardFromDatabase(urlSlug, false);
    } else if (location.state?.cardData?._id) {
      fetchCardFromDatabase(location.state.cardData._id, true);
    } else if (location.state?.urlSlug) {
      fetchCardFromDatabase(location.state.urlSlug, true);
    } else {
      setError("No card identifier found");
    }
  }, [location.state, urlSlug]);

  const fetchCardFromDatabase = async (identifier, showButtons = false) => {
    try {
      setLoading(true);
      setError(null);

      let url;
      if (identifier.length === 24) {
        url = `${CARD_URL}/${identifier}`;
      } else {
        url = `${CARD_URL}/share/${identifier}`;
      }
      console.log("🔍 [PreviewCard] Fetching card data from:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Card not found: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.card) {
        console.log("✅ [PreviewCard] Card loaded:", (data.card.prefix ? data.card.prefix + " " : "") + (data.card.firstName || "") + " " + (data.card.lastName || ""));
        console.log("🖼️ [PreviewCard] Current cardPreviewImage in DB:", data.card.cardPreviewImage || "None (will generate now)");
        setCardData(data.card);
        setButtonsVisible(showButtons);
      } else {
        throw new Error("Card data not found in response");
      }
    } catch (err) {
      console.error("Error fetching card:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // Auto-generate & persist high-resolution cardPreviewImage to Azure Blob Storage for WhatsApp & social rich previews
  const [snapshotStatus, setSnapshotStatus] = useState("");
  const [needsSnapshot, setNeedsSnapshot] = useState(false);
  const hasGeneratedRef = useRef(false);

  const captureAndUploadCardSnapshot = async () => {
    const cardId = cardData?._id || cardData?.urlSlug || urlSlug;
    if (!cardId) {
      setNeedsSnapshot(false);
      return;
    }
    const node = snapshotRef.current;
    if (!node) {
      setNeedsSnapshot(false);
      return;
    }

    try {
      console.log("📸 Capturing card preview snapshot...");
      setSnapshotStatus("Generating WhatsApp preview card...");

      // Ensure all images are loaded inside the snapshot container
      const imgs = Array.from(node.querySelectorAll("img"));
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          });
        })
      );

      // Brief delay for DOM & fonts stabilization
      await new Promise((r) => setTimeout(r, 400));

      let dataUrl;
      try {
        dataUrl = await toPng(node, {
          pixelRatio: 2,
          cacheBust: false,
          skipFonts: true,
        });
      } catch (err1) {
        console.warn("Snapshot attempt 1 failed, retrying without cacheBust...", err1);
        dataUrl = await toPng(node, {
          pixelRatio: 1.5,
          skipFonts: true,
        });
      }

      if (!dataUrl) {
        setSnapshotStatus("Failed to generate image");
        setNeedsSnapshot(false);
        return;
      }

      const response = await fetch(`${CARD_URL}/upload-preview-image/${cardId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardPreviewImage: dataUrl }),
      });

      const result = await response.json();
      console.log("✅ Card preview uploaded:", result);
      if (result.success && result.cardPreviewImage) {
        setCardData((prev) => (prev ? { ...prev, cardPreviewImage: result.cardPreviewImage } : prev));
        setSnapshotStatus("✅ WhatsApp preview card updated!");
      } else {
        setSnapshotStatus("Upload failed");
      }
    } catch (err) {
      console.error("❌ Snapshot error:", err);
      const msg = err.message?.includes("Failed to fetch")
        ? "⚠️ Backend not running on port 3000. Start backend with 'npm start'."
        : "Error: " + err.message;
      setSnapshotStatus(msg);
    } finally {
      setNeedsSnapshot(false);
      setTimeout(() => setSnapshotStatus(""), 5000);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if ((cardData?._id || cardData?.urlSlug) && !hasGeneratedRef.current) {
      // If card already has an image, skip capturing
      if (cardData.cardPreviewImage && typeof cardData.cardPreviewImage === "string" && cardData.cardPreviewImage.startsWith("http")) {
        console.log("ℹ️ [PreviewCard] Card already has snapshot image:", cardData.cardPreviewImage);
        return;
      }
      console.log("📸 [PreviewCard] Generating fresh snapshot...");
      hasGeneratedRef.current = true;
      setNeedsSnapshot(true);
      const timer = setTimeout(() => {
        if (isMounted) captureAndUploadCardSnapshot();
      }, 1500);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }
  }, [cardData?._id, cardData?.urlSlug, cardData?.cardPreviewImage]);

  const getPublicLink = () => {
    // 1. If explicit public share base URL is configured in .env (for local tunnel testing):
    const customShareBase = import.meta.env.VITE_PUBLIC_SHARE_URL;
    if (customShareBase && cardData?.urlSlug) {
      return `${customShareBase.replace(/\/+$/, "")}/preview/${cardData.urlSlug}`;
    }

    // 2. If currently accessed through a public tunnel (localhost.run, ngrok, localtunnel), share via tunnel so crawlers can reach it!
    if (typeof window !== "undefined" && (window.location.hostname.includes("lhr.life") || window.location.hostname.includes("ngrok") || window.location.hostname.includes("loca.lt"))) {
      if (cardData?.urlSlug) {
        return `${window.location.origin}/preview/${cardData.urlSlug}`;
      }
      return window.location.href;
    }

    const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const origin = isLocal ? "https://www.revayah.one" : (typeof window !== "undefined" ? window.location.origin : "https://www.revayah.one");
    if (cardData?.urlSlug) {
      return `${origin}/preview/${cardData.urlSlug}`;
    }
    return isLocal ? "https://www.revayah.one" : window.location.href;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPublicLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper to generate a high-res shareable image File of the active card
  const getCardSnapshotFile = async () => {
    try {
      const node = getActiveCardNode();
      if (!node) return null;

      // Ensure all images within the card are loaded before capture
      const imgs = Array.from(node.querySelectorAll("img"));
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          });
        })
      );

      const blob = await toBlob(node, {
        cacheBust: false,
        pixelRatio: 2,
        backgroundColor: "#FFFFFF",
      });

      if (!blob) return null;
      const fileName = `${cardData?.firstName || "digital"}_identity_card.png`;
      return new File([blob], fileName, { type: "image/png" });
    } catch (err) {
      console.warn("Card snapshot file generation error:", err);
      return null;
    }
  };

  const handleNativeShare = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const shareUrl = getPublicLink();
    const fullName = `${cardData?.prefix ? cardData.prefix + " " : ""}${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim() || "My Digital Identity Card";
    const shareTitle = `${fullName} | Digital Identity Card`;
    const shareText = `Hi! Here's my digital identity card. Click to view my profile:\n${shareUrl}`;

    // 1. Pre-copy clean link to clipboard for convenience
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }

    // 2. Open the OS "Share link" dialog (Windows 11 / Android / iOS)
    // Passing 'url' and 'text' (without 'files') opens the exact "Share link" surface
    // containing WhatsApp in the list of app icons (along with Teams, Outlook, Gmail, Twitter, LinkedIn)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        console.warn("navigator.share fallback:", err);
      }
    }

    // 3. Fallback on browsers without navigator.share
    setShowQrModal(true);
  };

  const handleWhatsAppShare = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setShowQrModal(false);

    const shareUrl = getPublicLink();
    const fullName = `${cardData?.prefix ? cardData.prefix + " " : ""}${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim() || "My Digital Identity Card";
    const shareTitle = `${fullName} | Digital Identity Card`;
    const shareText = `Hi! Here's my digital identity card. Click to view my profile:\n${shareUrl}`;
    const isMobile = typeof navigator !== "undefined" && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && !window.MSStream));

    // Copy link to clipboard for convenience
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }

    // On mobile devices, attempt native share with card snap image attached directly
    if (isMobile && typeof navigator !== "undefined" && navigator.share) {
      setIsSharing(true);
      try {
        const file = await getCardSnapshotFile();
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            files: [file],
          });
          setIsSharing(false);
          return;
        }
      } catch (err) {
        if (err.name === "AbortError") {
          setIsSharing(false);
          return;
        }
        console.warn("Mobile WhatsApp file share failed, opening modal:", err);
      } finally {
        setIsSharing(false);
      }
    }

    // On desktop, open the WhatsApp Share Modal with live chat preview, card image clipboard copy, and WhatsApp Web launch
    setShowWhatsAppModal(true);
  };

  const handleDownloadPng = async () => {
    const node = getActiveCardNode();
    if (!node) return;
    try {
      const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${cardData?.firstName || "card"}_digital_identity_card.png`;
      link.click();
    } catch (err) {
      console.error("Failed to generate PNG:", err);
    }
  };

  const renderCard = () => {
    if (!cardData) return null;

    const props = {
      cardData,
      onShare: handleNativeShare,
    };

    switch (cardData.design) {
      case "creative":
        return <ModernCard2 {...props} />;
      case "modern":
        return <ModernCard {...props} />;
      case "dark":
        return <DarkCard {...props} />;
      case "light":
        return <LightCard {...props} />;
      default:
        return <DefaultCard {...props} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-300 font-medium text-sm tracking-wide">Loading digital identity...</p>
        <span className="text-xs text-slate-500 mt-1">Revayah One Platform</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl mb-4">
          ⚠️
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Card Not Found</h3>
        <p className="text-slate-400 text-sm max-w-sm mb-6">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </button>
      </div>
    );
  }

  const shareUrl = getPublicLink();
  const fullName = `${cardData?.prefix ? cardData.prefix + " " : ""}${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim() || "Digital Card";
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#070b1a] to-slate-950 text-white flex flex-col items-center justify-center relative p-0 sm:py-8 sm:px-4 selection:bg-blue-500 selection:text-white">
      {/* Ambient Radial Lighting Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl z-0"></div>
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl z-0"></div>

      {/* DESKTOP TOP ACTION BAR (Hidden on small mobile) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[420px] mb-4 z-10 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-300 truncate max-w-[130px]">
            {fullName}
          </span>
          {copied && (
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded-full animate-fade-in shadow-sm shadow-emerald-500/20">
              Copied!
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => generateVCard(cardData)}
            title="Save Contact to Phone"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-600/90 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <FaDownload className="w-3 h-3" />
            <span>Save</span>
          </button>

          <button
            onClick={handleNativeShare}
            title="Share Digital Card"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FaShareAlt className="w-3 h-3" />
            <span>Share</span>
          </button>

          <button
            onClick={() => setShowQrModal(true)}
            title="View QR Code"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FaQrcode className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* DESKTOP SMARTPHONE MOCKUP FRAME (Desktop view) */}
      <div className="hidden sm:block relative z-10 w-full max-w-[420px]">
        <div className="relative rounded-[48px] p-3 bg-gradient-to-b from-slate-700/80 via-slate-800/80 to-slate-950/90 border border-slate-700/80 shadow-2xl shadow-blue-950/60 backdrop-blur-md">
          {/* Simulated Dynamic Island / Speaker */}
          <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center border border-slate-800/80 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800"></span>
          </div>

          {/* Screen Content Wrapper */}
          <div className="overflow-hidden rounded-[36px] bg-black shadow-inner" ref={desktopCardRef}>
            {renderCard()}
          </div>

          {/* Home Bar Indicator */}
          <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-2.5"></div>
        </div>
      </div>

      {/* MOBILE FULL-BLEED VIEW (Mobile view) */}
      <div className="sm:hidden w-full min-h-[100dvh] z-10" ref={mobileCardRef}>
        {renderCard()}
      </div>

      {/* MOBILE FLOATING BOTTOM ACTION BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800/80 flex items-center justify-between gap-2 safe-area-pb">
        <button
          type="button"
          onClick={() => generateVCard(cardData)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-transform"
        >
          <FaDownload className="w-3.5 h-3.5" />
          <span>Save Contact</span>
        </button>
        <button
          type="button"
          onClick={handleNativeShare}
          title="Share Card"
          className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-base active:scale-95 transition-transform flex-shrink-0 cursor-pointer"
        >
          <FaShareAlt className="w-4 h-4" />
        </button>
      </div>

      {/* ADMIN / EDIT MODE FLOATING BUTTONS (If arriving from Create wizard) */}
      {buttonsVisible && cardData && (
        <div className="relative z-10 mt-6 flex flex-wrap gap-2 justify-center max-w-md w-full px-4">
          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-800 hover:bg-slate-100 shadow-md transition-all"
          >
            <span>Edit This Card</span>
          </button>
          <button
            onClick={handleDownloadPng}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
          >
            <FaDownload className="w-3 h-3" />
            <span>Download PNG</span>
          </button>
          <button
            onClick={() => navigate("/card-dashbord")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-md transition-all"
          >
            <span>Dashboard</span>
          </button>
        </div>
      )}

      {/* DESKTOP FOOTER WATERMARK */}
      <div className="hidden sm:block relative z-10 mt-6 text-center text-xs text-slate-500">
        <a
          href="/"
          className="inline-flex items-center gap-2 hover:text-slate-300 transition-colors"
        >
          <span>Powered by</span>
          <strong className="text-slate-400 font-semibold">Revayah One</strong>
          <span className="text-slate-600">•</span>
          <span>Smart Digital Identity Platform</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400">v1.2</span>
        </a>
      </div>

      {/* WHATSAPP SHARE MODAL */}
      <WhatsAppShareModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        cardData={cardData}
      />

      {/* SHARE & QR MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center">
            {/* Close Button */}
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>

            {/* Modal Title */}
            <h4 className="text-lg font-bold text-white mb-1">Share Digital Card</h4>
            <p className="text-xs text-slate-400 mb-5">Point a camera to scan or share directly</p>

            {/* QR Code Container */}
            <div className="w-48 h-48 mx-auto p-3 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-5">
              <img
                src={qrImageUrl}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Share Link Row with 1-Tap Copy */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1.5 mb-3">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent text-xs text-slate-300 px-2 flex-1 outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${copied
                    ? "bg-emerald-500 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {copied ? (
                  <>
                    <FaCheck className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct 1-Tap WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              disabled={isSharing}
              className="w-full mb-3 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <FaWhatsapp className="w-4 h-4 text-white" />
              <span>{isSharing ? "Preparing Card..." : "Share to WhatsApp (Card & Link)"}</span>
            </button>

            {/* Quick Native / More Options */}
            <button
              onClick={handleNativeShare}
              className="w-full mb-4 py-2.5 px-4 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FaShareAlt className="w-3.5 h-3.5" />
              <span>More Share Options...</span>
            </button>

            {/* Quick Social Share Buttons */}
            <div className="flex items-center justify-center gap-3 pt-1 border-t border-slate-800/60">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                title="Share via WhatsApp"
                className="w-10 h-10 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4" />
              </button>

              <a
                href={`mailto:?subject=${encodeURIComponent(`${fullName}'s Digital Identity Card`)}&body=${encodeURIComponent(`Hi,\n\nHere's my digital identity card. Click to view my profile:\n${shareUrl}`)}`}
                title="Share via Email"
                className="w-10 h-10 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="w-10 h-10 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border border-blue-600/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Hi! Here's my digital identity card. Click to view my profile:`)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center transition-all hover:scale-110"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Off-screen high-res card snapshot for Azure Blob Storage thumbnail upload */}
      {needsSnapshot && cardData && (
        <div
          style={{
            position: "fixed",
            left: "-9999px",
            top: "-9999px",
            width: "400px",
            pointerEvents: "none",
            opacity: 1,
            visibility: "visible",
            overflow: "hidden"
          }}
        >
          <div
            ref={snapshotRef}
            style={{ width: "400px", backgroundColor: "#ffffff" }}
            className="rounded-[28px] overflow-hidden shadow-2xl border border-slate-200"
          >
            <CardRenderer
              design={cardData?.design || "default"}
              data={cardData}
              isPreview={true}
              isSnapshot={true}
              plan={cardData?.planType || cardData?.plan || "Personal"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewCard;