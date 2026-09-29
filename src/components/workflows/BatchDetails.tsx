import React, { useState, useEffect } from 'react';
import {
  Layers,
  QrCode,
  ShieldCheck,
  CheckCircle,
  CheckCircle2,
  FileText,
  Truck,
  ArrowRight,
  Scale,
  AlertTriangle,
  RefreshCw,
  Camera,
  Calendar,
  Clock,
  ExternalLink,
  Sliders,
  Check,
  Package,
} from 'lucide-react';
import { Language, BatchItem, BatchDocument } from '../../types';
import {
  getIncomingBatches,
  receiveBatch,
} from '../../services/firebaseService';
import confetti from 'canvas-confetti';

interface BatchDetailsProps {
  lang: Language;
  batch?: BatchItem;
  onMatchRecycler?: (batchId: string) => void;
  onViewTraceability?: (batchId: string) => void;
  isIncoming?: boolean;
}

export const BatchDetails: React.FC<BatchDetailsProps> = ({
  lang,
  batch: initialBatch,
  onMatchRecycler,
  onViewTraceability,
}) => {
  const [batches, setBatches] = useState<BatchDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Active batch selected for receiving / inspection
  const [activeBatch, setActiveBatch] = useState<BatchDocument | null>(
    initialBatch || null
  );

  // Receiving Modal / View State
  const [isReceiving, setIsReceiving] = useState<boolean>(false);
  const [actualWeightInput, setActualWeightInput] = useState<string>('19.7');
  const [thresholdKg, setThresholdKg] = useState<number>(1.0); // Configurable threshold (e.g. 1.0 kg)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [scanningQr, setScanningQr] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const loadBatches = async () => {
    setLoading(true);
    try {
      const data = await getIncomingBatches();
      setBatches(data);
      if (!activeBatch && data.length > 0) {
        setActiveBatch(data[0]);
      } else if (activeBatch) {
        const refreshed = data.find((b) => b.id === activeBatch.id || b.batchId === activeBatch.batchId);
        if (refreshed) setActiveBatch(refreshed);
      }
    } catch (e) {
      console.warn('Error loading incoming batches:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const content = {
    mr: {
      title: 'इनकमिंग स्क्रॅप बॅचेस (Recycler Inwarding)',
      sub: 'रीसायकलिंग केंद्रासाठी थेट इनकमिंग लॉट्स व वजन पडताळणी',
      scanQrBtn: 'QR कोड स्कॅन करा (Prototype QR Scan)',
      receiveBtn: 'बॅच वजन नोंदवा व स्वीकारा (Inward Batch)',
      expectedWeightLabel: 'अपेक्षित वजन (Expected Weight):',
      actualWeightLabel: 'प्रत्यक्ष मोजलेले वजन (Actual Received Weight):',
      varianceLabel: 'वजन तफावत (Calculated Variance):',
      thresholdLabel: 'स्वीकार्य मर्यादा (Threshold):',
      statusLabel: 'स्थिती (Status):',
      requiresReviewNotice: '⚠️ तफावत १.० किग्रॅ पेक्षा जास्त आहे! स्थिती = REQUIRES_REVIEW (पुनरावलोकन आवश्यक)',
      receivedNotice: '✅ तफावत स्वीकार्य मर्यादेत आहे. स्थिती = RECEIVED (यशस्वीरीत्या प्राप्त)',
      confirmInwardBtn: 'प्राप्तीची पुष्टी करा व RECYCLER_RECEIVED नोंदवा',
      viewTraceBtn: 'या बॅचची संपूर्ण १०-टप्प्यांची ट्रेसेबिलिटी पहा',
      batchId: 'Batch ID',
      material: 'Material',
      kabadiwala: 'Kabadiwala',
      createdDate: 'Created Date',
      status: 'Status',
    },
    hi: {
      title: 'इनकमिंग स्क्रैप बैचेस (Recycler Inwarding)',
      sub: 'रीसाइक्लिंग यूनिट के लिए लाइव कंसाइनमेंट व वजन सत्यापन',
      scanQrBtn: 'QR कोड स्कैन करें (Prototype Scan)',
      receiveBtn: 'वजन दर्ज करें और बैच स्वीकार करें (Inward Batch)',
      expectedWeightLabel: 'अपेक्षित वजन (Expected Weight):',
      actualWeightLabel: 'वास्तविक प्राप्त वजन (Actual Received Weight):',
      varianceLabel: 'वजन अंतर (Calculated Variance):',
      thresholdLabel: 'स्वीकार्य सीमा (Threshold):',
      statusLabel: 'स्थिति (Status):',
      requiresReviewNotice: '⚠️ वजन अंतर १.० किलो से अधिक है! स्थिति = REQUIRES_REVIEW',
      receivedNotice: '✅ वजन अंतर सीमा के भीतर है। स्थिति = RECEIVED',
      confirmInwardBtn: 'प्राप्ति पुष्टि करें और RECYCLER_RECEIVED दर्ज करें',
      viewTraceBtn: 'इस बैच की संपूर्ण 10-चरणीय ट्रेसेबिलिटी देखें',
      batchId: 'Batch ID',
      material: 'Material',
      kabadiwala: 'Kabadiwala',
      createdDate: 'Created Date',
      status: 'Status',
    },
    en: {
      title: 'Incoming Scrap Consignments (Recycler Inwarding)',
      sub: 'Live verified scrap batches arriving from collection hubs for mill intake',
      scanQrBtn: 'Scan QR Code (Prototype QR)',
      receiveBtn: 'Verify Weight & Inward Batch',
      expectedWeightLabel: 'Expected Weight:',
      actualWeightLabel: 'Actual Received Weight:',
      varianceLabel: 'Calculated Variance:',
      thresholdLabel: 'Configurable Variance Threshold:',
      statusLabel: 'Consignment Status:',
      requiresReviewNotice: '⚠️ Weight variance exceeds configurable threshold! Status = REQUIRES_REVIEW',
      receivedNotice: '✅ Weight variance within tolerance threshold. Status = RECEIVED',
      confirmInwardBtn: 'Confirm Inward & Log RECYCLER_RECEIVED Event',
      viewTraceBtn: 'View Complete 10-Step Traceability Timeline',
      batchId: 'Batch ID',
      material: 'Material',
      kabadiwala: 'Kabadiwala',
      createdDate: 'Created Date',
      status: 'Status',
    },
  }[lang];

  // Prototype QR Scan simulation
  const handleSimulateQrScan = (batchItem: BatchDocument) => {
    setScanningQr(true);
    setTimeout(() => {
      setScanningQr(false);
      setActiveBatch(batchItem);
      setIsReceiving(true);
      setActualWeightInput('19.7'); // Default requested prototype example
    }, 600);
  };

  // Variance calculations
  const expectedWeight =
    activeBatch?.expectedWeight || activeBatch?.totalWeight || activeBatch?.totalWeightKg || 20.0;
  const actualWeightNum = parseFloat(actualWeightInput) || 0;
  const calculatedVariance =
    Math.round(Math.abs(expectedWeight - actualWeightNum) * 100) / 100;
  const isVarianceExceeded = calculatedVariance > thresholdKg;
  const resultingStatus = isVarianceExceeded ? 'REQUIRES_REVIEW' : 'RECEIVED';

  // Inward & save to Firestore with event: RECYCLER_RECEIVED
  const handleConfirmInward = async () => {
    if (!activeBatch) return;
    setIsSubmitting(true);
    try {
      const updated = await receiveBatch(
        activeBatch.id,
        actualWeightNum,
        thresholdKg
      );

      setActiveBatch(updated);
      setIsReceiving(false);
      setSuccessToast(
        `Batch #${updated.batchId || updated.id} received! Status: ${updated.status}. Event RECYCLER_RECEIVED created.`
      );

      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
        });
      } catch (e) {}

      await loadBatches();
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err) {
      console.error('Error inwarding batch:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 my-2 max-w-xl font-sans">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">{content.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{content.sub}</p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
          RECYCLER MILL
        </span>
      </div>

      {successToast && (
        <div className="mb-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* RECEIVING / INWARDING INTERACTION MODAL */}
      {isReceiving && activeBatch ? (
        <div className="bg-slate-50 border-2 border-purple-500 rounded-2xl p-4 sm:p-5 space-y-4 mb-4">
          <div className="flex items-start justify-between border-b border-slate-200 pb-2">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                INWARDING BATCH
              </span>
              <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
                {activeBatch.batchId || activeBatch.id}
              </span>
            </div>
            <button
              onClick={() => setIsReceiving(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold px-2 py-1 bg-white rounded-lg border border-slate-200"
            >
              Cancel
            </button>
          </div>

          {/* Expected vs Actual Weight Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                {content.expectedWeightLabel}
              </span>
              <span className="font-mono font-black text-xl text-slate-900 mt-1 block">
                {expectedWeight.toFixed(1)} kg
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Recorded at Hub
              </span>
            </div>

            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200">
              <label className="text-[10px] text-purple-900 font-bold uppercase tracking-wider block mb-1">
                {content.actualWeightLabel}
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  value={actualWeightInput}
                  onChange={(e) => setActualWeightInput(e.target.value)}
                  className="w-full text-base font-mono font-black text-purple-950 p-1.5 rounded-lg border border-purple-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-xs font-mono font-bold text-purple-800">
                  kg
                </span>
              </div>
              <span className="text-[10px] text-purple-700 mt-1 block">
                Gate Scale Reading
              </span>
            </div>
          </div>

          {/* Calculated Variance & Configurable Threshold */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">
                {content.varianceLabel}
              </span>
              <span
                className={`font-mono font-black text-sm px-2 py-0.5 rounded ${
                  isVarianceExceeded
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                {calculatedVariance.toFixed(1)} kg ({((calculatedVariance / expectedWeight) * 100).toFixed(1)}%)
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] font-medium">{content.thresholdLabel}</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.5"
                  value={thresholdKg}
                  onChange={(e) => setThresholdKg(Number(e.target.value))}
                  className="w-16 p-1 text-center font-mono font-bold text-xs border border-slate-300 rounded bg-slate-50"
                />
                <span className="text-xs text-slate-500 font-mono">kg</span>
              </div>
            </div>

            {/* Dynamic Status Preview Notification */}
            <div
              className={`p-2.5 rounded-xl border text-xs font-semibold ${
                isVarianceExceeded
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}
            >
              {isVarianceExceeded ? content.requiresReviewNotice : content.receivedNotice}
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmInward}
            disabled={isSubmitting || !actualWeightNum}
            className={`w-full min-h-[46px] px-4 py-2.5 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-white ${
              isVarianceExceeded
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20'
            }`}
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{content.confirmInwardBtn}</span>
              </>
            )}
          </button>
        </div>
      ) : null}

      {/* BATCHDETAILS CARDS: Show Each Incoming Batch */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-xs text-slate-500">
            <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
            <span>Loading incoming batches from Firestore...</span>
          </div>
        ) : batches.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            No incoming batches found. Create an E-waste batch first!
          </div>
        ) : (
          batches.map((batch) => {
            const rawStatus = (batch.status || 'CREATED').toUpperCase();
            const isRequiresReview = rawStatus === 'REQUIRES_REVIEW';
            const isReceived = rawStatus === 'RECEIVED';
            const expWeight =
              batch.expectedWeight || batch.totalWeight || batch.totalWeightKg || 20.0;
            const batchIdentifier = batch.batchId || batch.batchNumber || batch.id;

            return (
              <div
                key={batch.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isReceived
                    ? 'bg-emerald-50/30 border-emerald-200'
                    : isRequiresReview
                    ? 'bg-amber-50/30 border-amber-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Header: Batch ID, QR Prototype button, Status */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {batchIdentifier}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isReceived
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : isRequiresReview
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-blue-100 text-blue-900 border border-blue-300'
                        }`}
                      >
                        {rawStatus}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 mt-1">
                      {batch.materialType || 'E-Waste (Old TV, Copper wire, PCBs)'}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleSimulateQrScan(batch)}
                    className="p-1.5 bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-700 rounded-xl border border-slate-200 transition-colors flex items-center gap-1 text-[11px] font-semibold shrink-0 cursor-pointer"
                    title={content.scanQrBtn}
                  >
                    <QrCode className="w-4 h-4 text-purple-600" />
                    <span className="hidden sm:inline">Scan QR</span>
                  </button>
                </div>

                {/* Grid: Expected Weight, Kabadiwala, Created Date */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Expected Weight:
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {expWeight.toFixed(1)} kg
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Kabadiwala:
                    </span>
                    <span className="font-medium text-slate-800 truncate block">
                      {batch.kabadiwala || batch.collectorName || 'Ramesh Shinde'}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Created Date:
                    </span>
                    <span className="font-medium text-slate-600 truncate block">
                      {batch.createdDate || 'Today'}
                    </span>
                  </div>
                </div>

                {/* Variance Display if already received */}
                {batch.actualWeight !== undefined && (
                  <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">
                      Actual: <strong className="text-slate-900">{batch.actualWeight} kg</strong>
                    </span>
                    <span
                      className={`font-bold ${
                        isRequiresReview ? 'text-amber-800' : 'text-emerald-800'
                      }`}
                    >
                      Variance: {batch.variance ?? 0} kg
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={() =>
                      onViewTraceability &&
                      onViewTraceability(batchIdentifier)
                    }
                    className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900 font-bold py-1 px-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Traceability</span>
                  </button>

                  {!isReceived && (
                    <button
                      onClick={() => {
                        setActiveBatch(batch);
                        setIsReceiving(true);
                        setActualWeightInput('19.7');
                      }}
                      className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{content.receiveBtn}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
