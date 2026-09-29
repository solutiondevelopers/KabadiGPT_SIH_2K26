import React, { useState } from 'react';
import {
  CheckCircle2,
  QrCode,
  Share2,
  Download,
  ShieldCheck,
  Calendar,
  User,
  Package,
  Sparkles,
  ArrowRight,
  FileCheck,
} from 'lucide-react';
import { Language, WeighedItem, ReceiptDocument } from '../../types';
import confetti from 'canvas-confetti';

interface DigitalReceiptProps {
  lang: Language;
  items?: WeighedItem[];
  receiptData?: ReceiptDocument | any;
  customerName?: string;
  collectorName?: string;
  pickupId?: string;
  onPaymentSuccess?: () => void;
}

export const DigitalReceipt: React.FC<DigitalReceiptProps> = ({
  lang,
  items,
  receiptData,
  customerName = 'Anand Deshmukh',
  collectorName = 'Ramesh Shinde (Authorized Partner)',
  pickupId = 'REQ-2026-MH-PUN-000101',
  onPaymentSuccess,
}) => {
  const defaultItems: WeighedItem[] = [
    {
      id: 'i-1',
      name: 'E-Waste (Old TV / PCB)',
      materialName: 'E-Waste',
      weightKg: 5.0,
      ratePerKg: 65,
      subtotal: 325.0,
    },
    {
      id: 'i-2',
      name: 'Copper wire',
      materialName: 'Copper',
      weightKg: 3.0,
      ratePerKg: 425,
      subtotal: 1275.0,
    },
  ];

  const receiptItems = items && items.length > 0 ? items : defaultItems;
  const totalWeight = receiptItems.reduce((acc, i) => acc + i.weightKg, 0);
  const totalAmount = Math.round(
    receiptItems.reduce((acc, i) => acc + (i.amount || i.subtotal || i.weightKg * i.ratePerKg), 0)
  );

  const receiptId =
    receiptData?.id ||
    `REC-2026-000${String(Math.floor(100 + Math.random() * 900))}`;
  const effectivePickupId = receiptData?.pickupId || pickupId;
  const effectiveHousehold = receiptData?.customerName || customerName;
  const effectiveKabadiwala = receiptData?.collectorName || collectorName;
  const verificationStatus = receiptData?.verificationStatus || 'VERIFIED · SHA256 QR SEALED';

  const [shareToast, setShareToast] = useState<string | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const content = {
    mr: {
      title: 'सत्यापित डिजिटल ग्रीन पावती',
      sub: 'शासकीय ईपीआर आणि चक्रीय अर्थव्यवस्था प्रमाणित पावती',
      receiptIdLabel: 'Receipt ID',
      pickupIdLabel: 'Pickup ID',
      dateTimeLabel: 'Date & Time',
      householdLabel: 'Household (विक्रेता)',
      kabadiwalaLabel: 'Kabadiwala (संकलक)',
      materialsBreakdownLabel: 'Material Breakdown (साहित्य तपशील)',
      totalAmountLabel: 'Total Amount (एकूण देय रक्कम):',
      verificationStatusLabel: 'Verification Status',
      shareBtn: 'Share',
      downloadBtn: 'Download',
      shareSuccess: 'पावतीची लिंक कॉपी झाली किंवा शेअर केली!',
      downloadSuccess: 'Digital Receipt PDF डाऊनलोड सुरू झाली!',
    },
    hi: {
      title: 'सत्यापित डिजिटल ग्रीन रसीद',
      sub: 'सरकारी ईपीआर एवं चक्रीय अर्थव्यवस्था प्रमाणित रसीद',
      receiptIdLabel: 'Receipt ID',
      pickupIdLabel: 'Pickup ID',
      dateTimeLabel: 'Date & Time',
      householdLabel: 'Household (विक्रेता)',
      kabadiwalaLabel: 'Kabadiwala (संकलक)',
      materialsBreakdownLabel: 'Material Breakdown (सामग्री विवरण)',
      totalAmountLabel: 'Total Amount (कुल देय राशि):',
      verificationStatusLabel: 'Verification Status',
      shareBtn: 'Share',
      downloadBtn: 'Download',
      shareSuccess: 'रसीद लिंक कॉपी या साझा की गई!',
      downloadSuccess: 'Digital Receipt PDF डाउनलोड शुरू!',
    },
    en: {
      title: 'Certified Digital Green Receipt',
      sub: 'Tamper-proof circular economy transaction & EPR audit pass',
      receiptIdLabel: 'Receipt ID',
      pickupIdLabel: 'Pickup ID',
      dateTimeLabel: 'Date & Time',
      householdLabel: 'Household (Seller)',
      kabadiwalaLabel: 'Kabadiwala (Collector)',
      materialsBreakdownLabel: 'Material Breakdown',
      totalAmountLabel: 'Total Amount:',
      verificationStatusLabel: 'Verification Status',
      shareBtn: 'Share',
      downloadBtn: 'Download',
      shareSuccess: 'Receipt link copied to clipboard!',
      downloadSuccess: 'Digital Receipt PDF downloaded successfully!',
    },
  }[lang];

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `KabadiGPT Receipt #${receiptId}`,
          text: `KabadiGPT Scrap Receipt #${receiptId} for ₹${totalAmount}. Total weight: ${totalWeight} kg.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(
        `KabadiGPT Receipt #${receiptId} | Amount: ₹${totalAmount} | Weight: ${totalWeight} kg`
      );
      setShareToast(content.shareSuccess);
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  const handleDownload = () => {
    setDownloadToast(content.downloadSuccess);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch (e) {}
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const formattedDateTime = new Date().toLocaleString(
    lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    }
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 my-2 max-w-xl font-sans">
      {/* Receipt Header Bar */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">{content.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{content.sub}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED</span>
          </span>
        </div>
      </div>

      {/* Main Digital Receipt Card */}
      <div className="my-3 bg-slate-50/80 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3 relative overflow-hidden">
        {/* Receipt ID & Pickup ID Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-3 border-b border-slate-200/80 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {content.receiptIdLabel}
            </span>
            <span className="font-mono font-black text-slate-900 text-xs sm:text-sm">
              {receiptId}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {content.pickupIdLabel}
            </span>
            <span className="font-mono font-bold text-emerald-800 text-xs">
              {effectivePickupId}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {content.dateTimeLabel}
            </span>
            <span className="font-medium text-slate-800 text-[11px]">
              {formattedDateTime}
            </span>
          </div>
        </div>

        {/* Stakeholder Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200/80 text-xs">
          <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {content.householdLabel}
            </span>
            <p className="font-bold text-slate-900 text-xs mt-0.5">{effectiveHousehold}</p>
            <p className="text-[11px] text-slate-500">Aundh, Pune · Doorstep Seller</p>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {content.kabadiwalaLabel}
            </span>
            <p className="font-bold text-slate-900 text-xs mt-0.5">{effectiveKabadiwala}</p>
            <p className="text-[11px] text-slate-500">Certified Waste Collector · UID Verified</p>
          </div>
        </div>

        {/* Material Breakdown */}
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
            {content.materialsBreakdownLabel}
          </span>
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-600 font-bold text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">Material</th>
                  <th className="py-2 px-3">Weight</th>
                  <th className="py-2 px-3">Rate</th>
                  <th className="py-2 px-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receiptItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-semibold text-slate-900">
                      {item.materialName || item.name}
                    </td>
                    <td className="py-2 px-3 font-mono font-medium text-slate-800">
                      {item.weightKg.toFixed(1)} kg
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-600">
                      ₹{item.ratePerKg}/kg
                    </td>
                    <td className="py-2 px-3 font-mono font-bold text-slate-900 text-right">
                      ₹{(item.amount || item.subtotal || item.weightKg * item.ratePerKg).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Amount & Verification Status */}
        <div className="pt-2 border-t-2 border-slate-900 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              {content.verificationStatusLabel}
            </span>
            <span className="inline-flex items-center gap-1 font-mono font-bold text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{verificationStatus}</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-black text-slate-700 block">
              {content.totalAmountLabel}
            </span>
            <span className="font-mono font-black text-2xl text-emerald-700">
              ₹{totalAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Toast Feedback notifications */}
      {shareToast && (
        <div className="mb-2 p-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{shareToast}</span>
        </div>
      )}

      {downloadToast && (
        <div className="mb-2 p-2 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold flex items-center gap-1.5 border border-blue-200">
          <Download className="w-4 h-4 text-blue-600" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Prototype Action Buttons: [Share] and [Download] (Explicitly requested by user prompt) */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleShare}
          className="flex-1 min-h-[44px] px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <Share2 className="w-4 h-4" />
          <span>{content.shareBtn}</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex-1 min-h-[44px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm shadow-emerald-600/20"
        >
          <Download className="w-4 h-4" />
          <span>{content.downloadBtn}</span>
        </button>
      </div>
    </div>
  );
};
