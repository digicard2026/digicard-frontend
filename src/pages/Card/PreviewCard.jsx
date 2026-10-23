import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toPng } from "html-to-image";
import DefaultCard from "../../components/Cardstyles/DefaultCard";
import ModernCard from "../../components/Cardstyles/ModernCard";
import DarkCard from "../../components/Cardstyles/DarkCard";
import LightCard from "../../components/Cardstyles/LightCard";
import ModernCard2 from "../../components/Cardstyles/ModernCard2";
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

  const [cardData, setCardData] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Card not found: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.card) {
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

  const getPublicLink = () => {
    if (cardData?.urlSlug) {
      return `${window.location.origin}/preview/${cardData.urlSlug}`;
    }
    return window.location.href;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPublicLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = () => {
    const shareUrl = getPublicLink();
    const fullName = `${cardData?.prefix ? cardData.prefix + " " : ""}${cardData?.firstName || ""} ${cardData?.lastName || ""}`.trim();
    const shareTitle = `${fullName}'s Digital Identity Card`;
    const shareText = `Connect with ${fullName} on Revayah One:`;

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        setShowQrModal(true);
      });
    } else {
      setShowQrModal(true);
    }
  };

  const handleDownloadPng = () => {
    if (cardRef.current) {
      toPng(cardRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${cardData?.firstName || "card"}_digital_card.png`;
        link.click();
      });
    }
  };

  const renderCard = () => {
    if (!cardData) return null;

    switch (cardData.design) {
      case "creative":
        return <ModernCard2 cardData={cardData} />;
      case "modern":
        return <ModernCard cardData={cardData} />;
      case "dark":
        return <DarkCard cardData={cardData} />;
      case "light":
        return <LightCard cardData={cardData} />;
      default:
        return <DefaultCard cardData={cardData} />;
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
          <span className="text-xs font-semibold text-slate-300 truncate max-w-[170px]">
            {fullName}
          </span>
        </div>

        <div className="flex items-center gap-2">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <FaShareAlt className="w-3 h-3" />
            <span>Share</span>
          </button>

          <button
            onClick={() => setShowQrModal(true)}
            title="View QR Code"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
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
          <div className="overflow-hidden rounded-[36px] bg-black shadow-inner" ref={cardRef}>
            {renderCard()}
          </div>

          {/* Home Bar Indicator */}
          <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-2.5"></div>
        </div>
      </div>

      {/* MOBILE FULL-BLEED VIEW (Mobile view) */}
      <div className="sm:hidden w-full min-h-[100dvh] z-10" ref={cardRef}>
        {renderCard()}
      </div>

      {/* MOBILE FLOATING BOTTOM ACTION BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800/80 flex items-center justify-between gap-3 safe-area-pb">
        <button
          type="button"
          onClick={() => generateVCard(cardData)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md active:scale-95 transition-transform"
        >
          <FaDownload className="w-3.5 h-3.5" />
          <span>Save to Contacts</span>
        </button>
        <button
          type="button"
          onClick={handleNativeShare}
          className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-sm active:scale-95 transition-transform flex-shrink-0"
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
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1.5 mb-4">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent text-xs text-slate-300 px-2 flex-1 outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copied
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

            {/* Quick Social Share Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out ${fullName}'s digital card: ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share via WhatsApp"
                className="w-10 h-10 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(`${fullName}'s Digital Card`)}&body=${encodeURIComponent(`Hi,\n\nCheck out ${fullName}'s digital identity card on Revayah One:\n${shareUrl}`)}`}
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
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${fullName}'s digital card:`)}&url=${encodeURIComponent(shareUrl)}`}
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
    </div>
  );
};

export default PreviewCard;