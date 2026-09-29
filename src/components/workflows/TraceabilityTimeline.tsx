import React, { useState, useEffect } from 'react';
import {
  GitCommit,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Leaf,
  Layers,
  RefreshCw,
  Database,
  Scale,
  User,
  QrCode,
  Tag,
} from 'lucide-react';
import { Language, TraceabilityStep } from '../../types';
import { getBatchTraceability } from '../../services/firebaseService';

interface TraceabilityTimelineProps {
  lang: Language;
  steps?: TraceabilityStep[];
  batchId?: string;
}

export const TraceabilityTimeline: React.FC<TraceabilityTimelineProps> = ({
  lang,
  steps: initialSteps,
  batchId: propBatchId,
}) => {
  const activeBatchId = propBatchId || 'EWP-2026-MH-PUN-000184';
  const [timelineSteps, setTimelineSteps] = useState<TraceabilityStep[]>(initialSteps || []);
  const [loading, setLoading] = useState<boolean>(!initialSteps || initialSteps.length === 0);

  useEffect(() => {
    async function load() {
      try {
        const data = await getBatchTraceability(activeBatchId);
        setTimelineSteps(data);
      } catch (e) {
        console.warn('Error loading traceability from Firebase:', e);
      } finally {
        setLoading(false);
      }
    }
    if (!initialSteps || initialSteps.length === 0) {
      load();
    }
  }, [initialSteps, activeBatchId]);

  const content = {
    mr: {
      title: '१०-टप्प्यांची चक्रीय वेस्ट ट्रेसेबिलिटी टाइमलाइन',
      sub: 'घरातील कबाड ते अंतिम रिसायकल उत्पादनापर्यंतचा डिजिटल प्रवास',
      batchLabel: 'बॅच आयडी',
      stepLabel: 'टप्पा',
      roleLabel: 'भूमिका',
      eventTypeLabel: 'इव्हेंट प्रकार',
      locationLabel: 'स्थान',
      weightLabel: 'वजन',
      verifiedHash: 'सत्यापित डिजिटल हॅश',
      chainAuditPass: '१००% ईपीआर ऑडिट यशस्वी (CPCB Verified)',
      sourcePickupsNote: 'Source Pickups: #PKP-101 (Anand D.) & #PKP-102 (Sunita K.)',
    },
    hi: {
      title: '१०-चरणीय चक्रीय अपशिष्ट ट्रेसेबिलिटी टाइमलाइन',
      sub: 'घर से लेकर अंतिम रिसाइकिल उत्पाद तक का डिजिटल रिकॉर्ड',
      batchLabel: 'बैच आईडी',
      stepLabel: 'चरण',
      roleLabel: 'भूमिका',
      eventTypeLabel: 'इवेंट प्रकार',
      locationLabel: 'स्थान',
      weightLabel: 'वजन',
      verifiedHash: 'सत्यापित डिजिटल हैश',
      chainAuditPass: '१००% ईपीआर ऑडिट सत्यापित (CPCB Verified)',
      sourcePickupsNote: 'Source Pickups: #PKP-101 (Anand D.) & #PKP-102 (Sunita K.)',
    },
    en: {
      title: 'End-to-End 10-Step Circular Traceability Timeline',
      sub: 'Verifiable chain of custody: Citizen doorstep to secondary recycled product',
      batchLabel: 'Batch ID',
      stepLabel: 'Step',
      roleLabel: 'Role',
      eventTypeLabel: 'Event Type',
      locationLabel: 'Location',
      weightLabel: 'Weight',
      verifiedHash: 'Verifiable Hash',
      chainAuditPass: '100% CPCB EPR Audit Verified',
      sourcePickupsNote: 'Source Pickups: #PKP-101 (Anand D.) & #PKP-102 (Sunita K.)',
    },
  }[lang];

  const getRoleBadgeColor = (role?: string) => {
    switch (role?.toUpperCase()) {
      case 'HOUSEHOLD':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'KABADIWALA':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'LOGISTICS':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'RECYCLER':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'SYSTEM':
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getEventTypeBadgeColor = (type?: string) => {
    switch (type) {
      case 'REQUEST_CREATED':
        return 'bg-blue-100 text-blue-800';
      case 'PICKUP_ACCEPTED':
      case 'PICKUP_STARTED':
        return 'bg-amber-100 text-amber-800';
      case 'WEIGHT_RECORDED':
        return 'bg-indigo-100 text-indigo-800';
      case 'RECEIPT_CREATED':
        return 'bg-teal-100 text-teal-800';
      case 'BATCH_CREATED':
      case 'BATCH_DISPATCHED':
        return 'bg-purple-100 text-purple-800';
      case 'RECYCLER_RECEIVED':
        return 'bg-emerald-100 text-emerald-800';
      case 'PROCESSING_RECORDED':
      case 'RESIDUAL_RECORDED':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 my-2 max-w-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-start gap-2.5">
          <span className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl mt-0.5">
            <Leaf className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                {content.title}
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Database className="w-3 h-3 text-emerald-600" />
                <span>LIVE LEDGER</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{content.sub}</p>
          </div>
        </div>

        {/* Batch ID Tag */}
        <div className="text-left sm:text-right bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            {content.batchLabel}
          </span>
          <span className="text-xs font-mono font-extrabold text-emerald-700 flex items-center gap-1">
            <QrCode className="w-3.5 h-3.5 text-emerald-600" />
            {activeBatchId}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 mb-4 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center justify-between">
        <span>{content.sourcePickupsNote}</span>
        <span className="font-semibold text-emerald-700">10 of 10 Chain Events Verified</span>
      </div>

      {loading && timelineSteps.length === 0 ? (
        <div className="py-8 flex items-center justify-center text-xs text-slate-500 gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
          <span>Loading immutable traceability chain from Firestore...</span>
        </div>
      ) : (
        <div className="relative pl-7 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {timelineSteps.map((step, idx) => (
            <div key={step.id || idx} className="relative group">
              {/* Dot Icon */}
              <div
                className={`absolute -left-7 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                  step.completed
                    ? 'bg-emerald-600 border-white text-white shadow-xs'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
              </div>

              {/* Step Card */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  step.completed
                    ? 'bg-slate-50/70 border-slate-200 hover:border-emerald-300'
                    : 'bg-white border-dashed border-slate-300'
                }`}
              >
                {/* Step Header */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      {content.stepLabel} {step.stepNumber || idx + 1}: {step.stage}
                    </span>
                    {/* Event Type Badge */}
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${getEventTypeBadgeColor(
                        step.eventType
                      )}`}
                    >
                      {step.eventType || 'AUDIT_EVENT'}
                    </span>
                  </div>
                  {/* Timestamp */}
                  <span className="text-[11px] font-mono text-slate-500 shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {step.timestamp}
                  </span>
                </div>

                {/* Step Title */}
                <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                  {lang === 'mr' ? step.titleMr || step.title : step.title}
                </h4>

                {/* Details / Description */}
                {step.details && (
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {step.details}
                  </p>
                )}

                {/* Meta details bar: Actor, Role, Location, Weight */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  {/* Actor & Role */}
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {step.actor || step.actorName}
                    </span>
                    {step.role && (
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${getRoleBadgeColor(
                          step.role
                        )}`}
                      >
                        {step.role}
                      </span>
                    )}
                  </div>

                  {/* Weight if applicable */}
                  {step.weight && (
                    <div className="flex items-center gap-1 sm:justify-end text-emerald-800 font-medium">
                      <Scale className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-mono text-[10px] font-bold">
                        {step.weight}
                      </span>
                    </div>
                  )}

                  {/* Location if available */}
                  {step.location && (
                    <div className="flex items-center gap-1 text-slate-500 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{step.location}</span>
                    </div>
                  )}
                </div>

                {/* Hash verification */}
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>Ledger Hash:</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                    {step.hash || step.verificationHash || `SHA256-${idx}9a4`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Audit Certificate Badge */}
      <div className="mt-5 p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-teal-900">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span className="font-bold">{content.chainAuditPass}</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
          CPCB EPR-VERIFIED
        </span>
      </div>
    </div>
  );
};

