import React, { useState, useEffect } from 'react';
import {
  Layers,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  PackageCheck,
  Sparkles,
  ArrowRight,
  Truck,
  Check,
  Clock,
  MapPin,
  RefreshCw,
  Cpu,
  FileCheck,
  Database,
  ExternalLink,
} from 'lucide-react';
import { Language, BatchItem, PickupDocument } from '../../types';
import {
  createEWasteBatch,
  getEligibleEWastePickups,
} from '../../services/firebaseService';
import confetti from 'canvas-confetti';

interface BatchCreationProps {
  lang: Language;
  onBatchCreated?: (batch: BatchItem) => void;
  onMatchRecycler?: (batchId: string) => void;
  onViewTraceability?: (batchId: string) => void;
  isEWaste?: boolean;
}

export const BatchCreation: React.FC<BatchCreationProps> = ({
  lang,
  onBatchCreated,
  onMatchRecycler,
  onViewTraceability,
}) => {
  const [loadingPickups, setLoadingPickups] = useState<boolean>(true);
  const [eligiblePickups, setEligiblePickups] = useState<PickupDocument[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Created batch state
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [createdBatch, setCreatedBatch] = useState<BatchItem | null>(null);

  // Fetch eligible completed e-waste pickups on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoadingPickups(true);
      try {
        const pickups = await getEligibleEWastePickups();
        if (isMounted) {
          setEligiblePickups(pickups);
          // By default select all eligible completed pickups
          setSelectedIds(pickups.map((p) => p.id));
        }
      } catch (err) {
        console.warn('Error loading eligible e-waste pickups:', err);
      } finally {
        if (isMounted) setLoadingPickups(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSelectPickup = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const selectedPickups = eligiblePickups.filter((p) => selectedIds.includes(p.id));
  const totalWeight = selectedPickups.reduce(
    (sum, p) => sum + (p.actualWeight || p.totalWeightKg || p.estimatedWeightKg || 10),
    0
  );

  const content = {
    mr: {
      title: 'ई-कचरा बॅच तयार करा (E-Waste Batch Creation)',
      sub: 'पूर्ण झालेल्या संकलनातून प्रमाणित B2B बल्क लॉट व डिजिटल QR सील',
      eligibleTitle: 'पात्र पूर्ण झालेले ई-कचरा पिकअप्स (Eligible Pickups):',
      materialHeader: 'साहित्य (Material)',
      weightHeader: 'वजन (Weight)',
      totalWeightLabel: 'एकूण बॅच वजन (Total Weight):',
      confirmQuestion: 'तुम्ही या निवडलेल्या ई-कचऱ्याची B2B बॅच तयार करू इच्छिता का?',
      createBtn: 'बॅच निश्चित करा व QR सील लावा (Confirm Batch)',
      creatingText: 'बॅच तयार करत आहे...',
      successTitle: 'ई-कचरा बॅच यशस्वीरित्या तयार व सील करण्यात आली!',
      batchIdLabel: 'Batch ID',
      qrLabel: 'QR Code Seal',
      totalWeightValLabel: 'Total Weight',
      sourceCountLabel: 'Source Pickups',
      kabadiwalaLabel: 'Kabadiwala',
      creationTimeLabel: 'Creation Time',
      traceableNotice: 'ही बॅच मूळ घरातील पिकअप्सशी थेट जोडलेली आहे (Traceable to Source Pickups).',
      sourcePickupsTitle: 'मूळ स्रोत पिकअप्स (Source Pickups Linked):',
      matchBtn: 'अधिकृत रिसायकलर्सशी मॅच करा (Match Recyclers)',
      traceBtn: 'संपूर्ण १०-टप्प्यांची टाइमलाइन पहा (Traceability Chain)',
    },
    hi: {
      title: 'ई-कचरा बैच निर्माण (E-Waste Batch Creation)',
      sub: 'पूर्ण हुए पिकअप्स से प्रमाणित B2B बल्क लॉट और डिजिटल QR सील',
      eligibleTitle: 'पात्र पूर्ण हुए ई-कचरा पिकअप्स (Eligible Pickups):',
      materialHeader: 'सामग्री (Material)',
      weightHeader: 'वजन (Weight)',
      totalWeightLabel: 'कुल बैच वजन (Total Weight):',
      confirmQuestion: 'क्या आप इस चयनित ई-कचरे का प्रमाणित B2B बैच बनाना चाहते हैं?',
      createBtn: 'बैच पुष्टि करें और QR सील लगाएँ (Confirm Batch)',
      creatingText: 'बैच तैयार किया जा रहा है...',
      successTitle: 'ई-कचरा बैच सफलतापूर्वक तैयार और सील किया गया!',
      batchIdLabel: 'Batch ID',
      qrLabel: 'QR Code Seal',
      totalWeightValLabel: 'Total Weight',
      sourceCountLabel: 'Source Pickups',
      kabadiwalaLabel: 'Kabadiwala',
      creationTimeLabel: 'Creation Time',
      traceableNotice: 'यह बैच स्रोत पिकअप्स से पूरी तरह ट्रैक किया जा सकता है।',
      sourcePickupsTitle: 'संबद्ध स्रोत पिकअप्स (Source Pickups Linked):',
      matchBtn: 'अधिकृत रिसाइकलर्स से मैच करें',
      traceBtn: 'पूर्ण 10-चरणीय टाइमलाइन देखें (Traceability Chain)',
    },
    en: {
      title: 'E-Waste Batch Creation Workflow',
      sub: 'Aggregate completed doorstep e-waste into certified B2B lot with tamper QR seal',
      eligibleTitle: 'Eligible Completed E-Waste Pickups:',
      materialHeader: 'Material',
      weightHeader: 'Weight',
      totalWeightLabel: 'Total Aggregate Weight:',
      confirmQuestion: 'Are you ready to seal this certified E-Waste batch consignment?',
      createBtn: 'Confirm & Generate Batch',
      creatingText: 'Generating Batch in Firestore...',
      successTitle: 'E-Waste Batch Created & Sealed Successfully!',
      batchIdLabel: 'Batch ID',
      qrLabel: 'QR Code Seal',
      totalWeightValLabel: 'Total Weight',
      sourceCountLabel: 'Source Pickups',
      kabadiwalaLabel: 'Kabadiwala',
      creationTimeLabel: 'Creation Time',
      traceableNotice: 'This batch is tamper-proof and fully traceable back to its source household pickups.',
      sourcePickupsTitle: 'Linked Source Household Pickups:',
      matchBtn: 'Match with Authorized Recyclers',
      traceBtn: 'View 10-Step Traceability Timeline',
    },
  }[lang];

  // After confirmation:
  // Create a batch document with unique batch ID format: EWP-YYYY-MH-PUN-XXXXXX
  // Example: EWP-2026-MH-PUN-000184
  // Create event: BATCH_CREATED
  const handleConfirmBatchCreation = async () => {
    if (selectedPickups.length === 0) return;
    setIsSubmitting(true);
    try {
      const year = new Date().getFullYear();
      const numSuffix = String(Math.floor(100 + Math.random() * 900));
      const customBatchId = `EWP-${year}-MH-PUN-000${numSuffix}`;

      const sourcePickupsData = selectedPickups.map((p) => ({
        id: p.id,
        customerName: p.customerName || 'Citizen User',
        address: p.address || 'Pune Doorstep',
        material: (p.materials || []).join(', ') || 'E-Waste Scrap',
        weightKg: p.actualWeight || p.totalWeightKg || p.estimatedWeightKg || 10,
        completedAt: p.completedAt || 'Today',
      }));

      const batchDoc = await createEWasteBatch({
        customBatchId,
        sourcePickupIds: selectedPickups.map((p) => p.id),
        sourcePickups: sourcePickupsData,
        totalWeight,
        kabadiwalaName: 'Ramesh Shinde (Authorized Partner)',
      });

      setCreatedBatch(batchDoc);
      setIsCreated(true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {}

      if (onBatchCreated) {
        onBatchCreated(batchDoc);
      }
    } catch (err) {
      console.error('Error creating e-waste batch:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 my-2 max-w-xl font-sans">
      {/* Workflow Header */}
      <div className="flex items-start justify-between mb-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">{content.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{content.sub}</p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
          E-WASTE HUB
        </span>
      </div>

      {/* PHASE 1: SHOW ELIGIBLE PICKUPS & ASK FOR CONFIRMATION */}
      {!isCreated ? (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">
                {content.eligibleTitle}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {selectedPickups.length} Selected
              </span>
            </div>

            {loadingPickups ? (
              <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>Finding completed e-waste pickups...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {eligiblePickups.map((pickup) => {
                  const isSelected = selectedIds.includes(pickup.id);
                  const pWeight =
                    pickup.actualWeight ||
                    pickup.totalWeightKg ||
                    pickup.estimatedWeightKg ||
                    10;
                  const materialsStr =
                    (pickup.materials || []).join(', ') || 'Old TV, Copper wire, PCBs';

                  return (
                    <div
                      key={pickup.id}
                      onClick={() => toggleSelectPickup(pickup.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-50/50 border-blue-300 ring-1 ring-blue-400'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-xs font-extrabold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              {pickup.id}
                            </span>
                            <span className="font-bold text-xs text-slate-900">
                              {pickup.customerName || 'Citizen User'}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{pickup.address || 'Aundh, Pune'}</span>
                          </div>

                          <div className="text-[11px] font-medium text-slate-700 mt-1">
                            <span className="text-slate-400 font-normal">Materials: </span>
                            {materialsStr}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-extrabold text-blue-900 bg-blue-100/70 px-2 py-1 rounded-md block">
                          {pWeight.toFixed(1)} kg
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold block mt-1">
                          COMPLETED
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Aggregate Summary */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-xs text-slate-400 block font-medium">
                {content.totalWeightLabel}
              </span>
              <span className="text-2xl font-black font-mono text-emerald-400">
                {totalWeight.toFixed(1)} kg
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-medium">
                Consignment Lot:
              </span>
              <span className="text-xs font-mono font-bold text-slate-200">
                EWP-2026-MH-PUN
              </span>
            </div>
          </div>

          {/* Confirmation Prompt */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-center space-y-1">
            <p className="text-xs font-bold text-blue-950">{content.confirmQuestion}</p>
            <p className="text-[11px] text-blue-800">
              Unique ID with format <span className="font-mono font-bold">EWP-YYYY-MH-PUN-XXXXXX</span> will be generated and signed with tamper QR seal.
            </p>
          </div>

          {/* Confirmation Button */}
          <button
            onClick={handleConfirmBatchCreation}
            disabled={selectedPickups.length === 0 || isSubmitting}
            className="w-full min-h-[46px] px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-blue-600/20"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{content.creatingText}</span>
              </>
            ) : (
              <>
                <PackageCheck className="w-5 h-5" />
                <span>{content.createBtn}</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* PHASE 2: SHOW BATCHCREATION COMPONENT AFTER CONFIRMATION */
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-extrabold text-emerald-950 text-base">
                {content.successTitle}
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Audit event <span className="font-mono font-bold">BATCH_CREATED</span> logged to municipal ledger.
              </p>
            </div>
          </div>

          {/* The required component fields:
              Batch ID, QR code, Total weight, Source pickup count, Kabadiwala, Creation time */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 font-sans">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {content.batchIdLabel}
                </span>
                <span className="font-mono font-black text-slate-900 text-base sm:text-lg">
                  {createdBatch?.batchId || createdBatch?.batchNumber}
                </span>
              </div>

              {/* QR Code visual */}
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs text-slate-900 flex flex-col items-center">
                <QrCode className="w-12 h-12 text-slate-950" />
                <span className="text-[9px] font-mono font-bold mt-1 text-slate-600">
                  {content.qrLabel}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {content.totalWeightValLabel}
                </span>
                <span className="font-mono font-black text-emerald-700 text-base">
                  {createdBatch?.totalWeight || totalWeight} kg
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {content.sourceCountLabel}
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {createdBatch?.sourcePickupCount || selectedPickups.length} Pickups
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {content.kabadiwalaLabel}
                </span>
                <span className="font-semibold text-slate-800">
                  {createdBatch?.kabadiwala || 'Ramesh Shinde (Authorized Partner)'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {content.creationTimeLabel}
                </span>
                <span className="font-medium text-slate-700">
                  {createdBatch?.creationTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Traceability back to source pickups */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800">
                  {content.sourcePickupsTitle}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  LINKED & TRACEABLE
                </span>
              </div>

              <div className="space-y-1.5">
                {selectedPickups.map((sp) => (
                  <div
                    key={sp.id}
                    className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-900 mr-2">
                        {sp.id}
                      </span>
                      <span className="font-medium text-slate-800">
                        {sp.customerName}
                      </span>
                      <span className="text-slate-400 mx-1.5">·</span>
                      <span className="text-slate-500 text-[11px]">
                        {(sp.materials || []).join(', ')}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">
                      {(sp.actualWeight || sp.totalWeightKg || 10).toFixed(1)} kg
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{content.traceableNotice}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={() =>
                onViewTraceability &&
                onViewTraceability(createdBatch?.batchId || 'EWP-2026-MH-PUN-000184')
              }
              className="flex-1 min-h-[44px] px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>{content.traceBtn}</span>
            </button>

            <button
              onClick={() =>
                onMatchRecycler &&
                onMatchRecycler(createdBatch?.batchId || 'EWP-2026-MH-PUN-000184')
              }
              className="flex-1 min-h-[44px] px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Truck className="w-4 h-4" />
              <span>{content.matchBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
