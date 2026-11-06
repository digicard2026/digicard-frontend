import React, { useRef, useState } from "react";
import { FaWhatsapp, FaDownload, FaCopy, FaCheck, FaTimes, FaShareAlt } from "react-icons/fa";
import { toBlob, toPng } from "html-to-image";
import WhatsAppShareCard from "./WhatsAppShareCard";
import CardRenderer from "./CardRenderer";

/**
 * WhatsAppShareModal
 * 
 * Interactive sharing modal providing:
 * 1. Pixel-perfect WhatsApp chat simulation with message text and card structure
 * 2. 1-Tap native mobile file sharing directly to WhatsApp (image + link)
 * 3. Desktop fallback: automatic clipboard copy of image + wa.me URL launch
 * 4. High-resolution PNG card download
 */
const WhatsAppShareModal = ({ isOpen, onClose, cardData }) => {
  const cardRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  if (!isOpen || !cardData) return null;

  // 1. Resolve Info
  const prefix = cardData.prefix ? `${cardData.prefix} ` : "";
  const fullName = `${prefix}${cardData.firstName || ""} ${cardData.lastName || ""}`.trim() || cardData.name || "My Digital Identity Card";
  // Always use public production origin for WhatsApp sharing so recipients and WhatsApp crawlers can access it
  const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  const origin = isLocal ? "https://www.revayah.one" : (typeof window !== "undefined" ? window.location.origin : "https://www.revayah.one");
  const urlSlug = cardData.urlSlug || cardData.shareableUrl || "";
  const shareUrl = urlSlug ? `${origin}/preview/${urlSlug}` : window.location.href;

  const shareText = `Hi! Here's my digital identity card. Click to view my profile:\n${shareUrl}`;

  // 2. High-res card image generation helper
  const generateCardBlob = async () => {
    if (!cardRef.current) return null;
    try {
      return await toBlob(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: "#FFFFFF",
      });
    } catch (err) {
      console.error("Card image capture error:", err);
      return null;
    }
  };

  // 3. Share to WhatsApp handler (Mobile File Share + Desktop Clipboard wa.me)
  const handleShareToWhatsApp = async () => {
    setIsProcessing(true);
    setStatusMessage("Preparing card image...");

    try {
      const blob = await generateCardBlob();

      // Mobile Web Share with File
      if (blob && navigator.canShare) {
        const file = new File(
          [blob],
          `${cardData.firstName || "digital"}_identity_card.png`,
          { type: "image/png" }
        );

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${fullName} | Digital Identity Card`,
            text: shareText,
            files: [file],
          });
          setIsProcessing(false);
          setStatusMessage("");
          return;
        }
      }

      // Desktop / Web Fallback:
      // Try copying image to clipboard for easy Ctrl+V in WhatsApp Web
      let imageCopiedToClipboard = false;
      if (blob && typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          imageCopiedToClipboard = true;
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 3000);
        } catch (clipErr) {
          console.log("Clipboard image write not permitted", clipErr);
        }
      }

      // Open WhatsApp Web / App with pre-filled message link
      const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      if (imageCopiedToClipboard) {
        setStatusMessage("✅ Card image copied to clipboard! Paste (Ctrl+V) in WhatsApp chat.");
      } else {
        setStatusMessage("Opening WhatsApp with your link...");
      }

    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("WhatsApp share failed:", err);
        const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    } finally {
      setIsProcessing(false);
      setTimeout(() => setStatusMessage(""), 4000);
    }
  };

  // 4. Download Card Image Handler
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsProcessing(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#FFFFFF",
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${cardData.firstName || "digital"}_identity_card.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setStatusMessage("✅ Card downloaded successfully!");
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // 5. Copy Link Handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setStatusMessage("Link copied to clipboard!");
    setTimeout(() => {
      setCopiedLink(false);
      setStatusMessage("");
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-[#25D366]/25">
              <FaWhatsapp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                Share via WhatsApp
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Send card image & profile link directly to chat
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center transition-colors"
          >
            <FaTimes className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Preview Area (WhatsApp Chat Simulation) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#EFEAE2] dark:bg-[#0b141a] flex flex-col items-center">
          
          {/* Simulated WhatsApp Chat Bubble Container */}
          <div className="w-full max-w-[340px] space-y-2.5">
            
            {/* 1. Message Bubble: Text Intro + Link */}
            <div className="bg-[#DCF8C6] dark:bg-[#005c4b] text-slate-800 dark:text-slate-100 rounded-2xl rounded-tr-xs p-3 text-xs leading-relaxed shadow-xs relative">
              <p className="font-medium text-[12.5px] leading-snug">
                Hi! Here's my digital identity card. Click to view my profile:
              </p>
              <p className="text-[11.5px] font-semibold text-blue-700 dark:text-emerald-200 underline break-all mt-1">
                {shareUrl}
              </p>
              <div className="text-[9px] text-slate-400 dark:text-slate-300/80 text-right mt-1 font-mono">
                Just now • Sent ✓✓
              </div>
            </div>

            {/* 2. Message Bubble: Digital Card Preview */}
            <div className="flex justify-center">
              <div
                ref={cardRef}
                className="w-full max-w-[340px] rounded-[28px] overflow-hidden shadow-xl border border-slate-200/80 bg-white"
              >
                <CardRenderer
                  design={cardData.design || "default"}
                  data={cardData}
                  isPreview={true}
                  plan={cardData.planType || cardData.plan || "Personal"}
                />
              </div>
            </div>

          </div>

          {/* Status Feedback Pill */}
          {statusMessage && (
            <div className="mt-3 py-1.5 px-3 rounded-full bg-slate-900/90 text-white text-[11px] font-medium shadow-md animate-in fade-in">
              {statusMessage}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          
          {/* Primary Action: Send to WhatsApp */}
          <button
            onClick={handleShareToWhatsApp}
            disabled={isProcessing}
            className="w-full py-3 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4 text-white" />
            <span>{isProcessing ? "Preparing Card..." : "Send to WhatsApp (Card & Link)"}</span>
          </button>

          {/* Secondary Quick Actions: Download Image & Copy Link */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadImage}
              disabled={isProcessing}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FaDownload className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Card Image</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Profile Link</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default WhatsAppShareModal;

