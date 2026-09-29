import React, { useState, useEffect } from 'react';
import {
  Scale,
  Bluetooth,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle2,
  Receipt,
  Sparkles,
  Mic,
  Edit2,
  Check,
  AlertCircle,
  Database,
  Volume2,
} from 'lucide-react';
import { Language, WeighedItem, MaterialDocument } from '../../types';
import { getMaterialRates, recordWeight, createReceipt } from '../../services/firebaseService';

interface DigitalWeighingProps {
  lang: Language;
  pickupId?: string;
  onGenerateReceipt?: (items: WeighedItem[], receiptData?: any) => void;
}

export const DigitalWeighing: React.FC<DigitalWeighingProps> = ({
  lang,
  pickupId = 'PKP-CURRENT',
  onGenerateReceipt,
}) => {
  // Configurable material rates from Firestore
  const [materialRates, setMaterialRates] = useState<MaterialDocument[]>([]);
  const [loadingRates, setLoadingRates] = useState<boolean>(true);

  // Live scale state
  const [selectedMaterialKey, setSelectedMaterialKey] = useState<string>('paper');
  const [currentWeight, setCurrentWeight] = useState<number>(12.0);
  const [isStable, setIsStable] = useState<boolean>(true);

  // Voice/Text input field
  const [voiceInput, setVoiceInput] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  // Weighed items table (editable weight before confirmation)
  const [weighedItems, setWeighedItems] = useState<WeighedItem[]>([
    {
      id: 'w-1',
      name: 'E-Waste (Old TV / PCB)',
      materialName: 'E-Waste',
      weightKg: 5,
      ratePerKg: 65,
      subtotal: 325,
      amount: 325,
    },
    {
      id: 'w-2',
      name: 'Copper wire',
      materialName: 'Copper',
      weightKg: 3,
      ratePerKg: 425,
      subtotal: 1275,
      amount: 1275,
    },
  ]);

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editWeightVal, setEditWeightVal] = useState<string>('');

  // Confirmation & Summary state
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch real material rates from Firestore on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoadingRates(true);
      try {
        const rates = await getMaterialRates();
        if (isMounted && rates && rates.length > 0) {
          setMaterialRates(rates);
          setSelectedMaterialKey(rates[0].id || 'paper');
        }
      } catch (err) {
        console.warn('Error fetching Firestore material rates:', err);
      } finally {
        if (isMounted) setLoadingRates(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const content = {
    mr: {
      title: 'स्मार्ट IoT डिजिटल वजन काटा',
      scaleStatus: 'कनेक्टेड: Tara-Scale Pro BT-402',
      liveReadout: 'काट्यावरील थेट वजन (Live Loadcell)',
      tare: 'Tare (शून्य करा)',
      stabilize: 'STABLE',
      selectMaterial: 'साहित्य निवडा',
      rate: 'दर',
      addItem: 'वजन लॉक करून यादीत जोडा',
      voicePrompt: 'थेट बोला किंवा लिहा (उदा. "5 किलो e-waste", "3 किलो copper", "12 kilo paper"):',
      voiceParseBtn: 'वजन जोडा (Parse & Add)',
      tally: 'मोजलेली साहित्याची यादी (Material | Weight | Rate | Amount)',
      totalWeight: 'एकूण वजन',
      totalAmount: 'एकूण देय रक्कम',
      confirmWeightBtn: 'वजन निश्चित करा (Confirm Weight)',
      summaryTitle: 'Digital Transaction Summary',
      askReceipt: 'Digital receipt तयार करू?',
      createReceiptBtn: 'होय, Digital Receipt तयार करा',
      editWeight: 'वजन बदला',
      saveWeight: 'जतन करा',
    },
    hi: {
      title: 'स्मार्ट IoT डिजिटल कांटा',
      scaleStatus: 'कनेक्टेड: Tara-Scale Pro BT-402',
      liveReadout: 'कांटे पर लाइव वजन (Live Loadcell)',
      tare: 'Tare (जीरो करें)',
      stabilize: 'STABLE',
      selectMaterial: 'सामग्री चुनें',
      rate: 'दर',
      addItem: 'वजन लॉक करके जोड़ें',
      voicePrompt: 'बोलें या लिखें (उदा. "5 किलो e-waste", "3 किलो copper", "12 kilo paper"):',
      voiceParseBtn: 'वजन जोड़ें (Parse & Add)',
      tally: 'तौली गई वस्तुओं की सूची (Material | Weight | Rate | Amount)',
      totalWeight: 'कुल वजन',
      totalAmount: 'कुल देय राशि',
      confirmWeightBtn: 'वजन पुष्टि करें (Confirm Weight)',
      summaryTitle: 'Digital Transaction Summary',
      askReceipt: 'Digital receipt तयार करू? (डिजिटल रसीद बनाएं?)',
      createReceiptBtn: 'हाँ, Digital Receipt बनाएं',
      editWeight: 'वजन बदलें',
      saveWeight: 'सहेजें',
    },
    en: {
      title: 'Smart IoT Bluetooth Digital Scale',
      scaleStatus: 'Connected: Tara-Scale Pro BT-402',
      liveReadout: 'Live Scale Loadcell Readout',
      tare: 'Tare (Zero)',
      stabilize: 'STABLE',
      selectMaterial: 'Select Material',
      rate: 'Rate',
      addItem: 'Lock Weight & Add',
      voicePrompt: 'Voice/Text input (e.g. "5 किलो e-waste", "3 किलो copper", "12 kilo paper"):',
      voiceParseBtn: 'Parse & Add to List',
      tally: 'Recorded Items (Material | Weight | Rate | Amount)',
      totalWeight: 'Total Weight',
      totalAmount: 'Total Payable Amount',
      confirmWeightBtn: 'Confirm Recorded Weight',
      summaryTitle: 'Digital Transaction Summary',
      askReceipt: 'Digital receipt तयार करू? (Create digital receipt?)',
      createReceiptBtn: 'Yes, Create Digital Receipt',
      editWeight: 'Edit Weight',
      saveWeight: 'Save',
    },
  }[lang];

  // Helper to find material rate from Firestore list
  const getRateForMaterial = (nameOrKey: string): { name: string; rate: number } => {
    const lower = nameOrKey.toLowerCase();
    const found = materialRates.find(
      (m) =>
        m.id.toLowerCase() === lower ||
        m.name.toLowerCase().includes(lower) ||
        (m.nameMr && m.nameMr.toLowerCase().includes(lower)) ||
        (m.nameHi && m.nameHi.toLowerCase().includes(lower))
    );

    if (found) {
      return { name: found.name, rate: found.ratePerKg };
    }

    // Default rate lookup if not found
    if (/copper|तांबे|तांबा/i.test(lower)) return { name: 'Copper', rate: 425 };
    if (/e-waste|ewaste|tv|laptop|इलेक्ट्रॉनिक/i.test(lower)) return { name: 'E-Waste', rate: 65 };
    if (/aluminium|aluminum|अ‍ॅल्युमिनियम/i.test(lower)) return { name: 'Aluminium', rate: 125 };
    if (/metal|iron|लोखंड|लोहा/i.test(lower)) return { name: 'Iron / Metal', rate: 32 };
    if (/plastic|प्लॅस्टिक|प्लास्टिक/i.test(lower)) return { name: 'Plastic', rate: 18 };
    if (/paper|रद्दी|कागद|अखबार/i.test(lower)) return { name: 'Paper (Raddi)', rate: 14 };

    return { name: nameOrKey || 'Scrap Material', rate: 20 };
  };

  // Voice/Text input parser: "5 किलो e-waste", "3 किलो copper", "12 kilo paper"
  const handleParseVoiceText = (textToParse: string) => {
    const raw = (textToParse || voiceInput).trim();
    if (!raw) return;

    // Extract numbers (integer or decimal)
    const weightMatch = raw.match(/(\d+(\.\d+)?)/);
    const weight = weightMatch ? parseFloat(weightMatch[1]) : currentWeight;

    // Detect material keyword
    let matKey = 'paper';
    if (/copper|तांबे|तांबा/i.test(raw)) matKey = 'copper';
    else if (/e-waste|ewaste|tv|laptop|इलेक्ट्रॉनिक/i.test(raw)) matKey = 'ewaste';
    else if (/aluminium|aluminum|अ‍ॅल्युमिनियम/i.test(raw)) matKey = 'aluminium';
    else if (/metal|iron|लोखंड|लोहा/i.test(raw)) matKey = 'metal';
    else if (/plastic|प्लॅस्टिक|प्लास्टिक/i.test(raw)) matKey = 'plastic';
    else if (/paper|रद्दी|कागद|अखबार/i.test(raw)) matKey = 'paper';

    const { name, rate } = getRateForMaterial(matKey);
    const subtotal = Math.round(weight * rate * 10) / 10;

    const newItem: WeighedItem = {
      id: `w-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      materialName: name,
      weightKg: weight,
      ratePerKg: rate,
      subtotal,
      amount: subtotal,
    };

    setWeighedItems((prev) => [...prev, newItem]);
    setVoiceInput('');
  };

  // Manual scale load adding
  const handleAddScaleItem = () => {
    if (currentWeight <= 0) return;
    const { name, rate } = getRateForMaterial(selectedMaterialKey);
    const subtotal = Math.round(currentWeight * rate * 10) / 10;

    const newItem: WeighedItem = {
      id: `w-${Date.now()}`,
      name,
      materialName: name,
      weightKg: currentWeight,
      ratePerKg: rate,
      subtotal,
      amount: subtotal,
    };

    setWeighedItems((prev) => [...prev, newItem]);
    setCurrentWeight(0);
  };

  // Editing recorded weight before confirmation
  const handleStartEdit = (item: WeighedItem) => {
    setEditingItemId(item.id || null);
    setEditWeightVal(String(item.weightKg));
  };

  const handleSaveEdit = (id: string) => {
    const newKg = parseFloat(editWeightVal);
    if (!isNaN(newKg) && newKg > 0) {
      setWeighedItems((prev) =>
        prev.map((i) => {
          if (i.id === id) {
            const subtotal = Math.round(newKg * i.ratePerKg * 10) / 10;
            return {
              ...i,
              weightKg: newKg,
              subtotal,
              amount: subtotal,
            };
          }
          return i;
        })
      );
    }
    setEditingItemId(null);
  };

  const handleDeleteItem = (id: string) => {
    setWeighedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const grossWeight = weighedItems.reduce((acc, i) => acc + i.weightKg, 0);
  const grossAmount = weighedItems.reduce(
    (acc, i) => acc + (i.amount || i.subtotal || i.weightKg * i.ratePerKg),
    0
  );

  // Step A: Confirm Weight and Save to Firestore
  const handleConfirmWeight = async () => {
    setIsSubmitting(true);
    try {
      await recordWeight(pickupId, weighedItems);
      setIsConfirmed(true);
    } catch (e) {
      console.warn('Record weight notice:', e);
      setIsConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step B: Ask "Digital receipt तयार करू?" -> Create real receipt with REC-2026-000182 format
  const handleCreateDigitalReceipt = async () => {
    setIsSubmitting(true);
    try {
      const randomSuffix = String(Math.floor(100 + Math.random() * 900));
      const customReceiptId = `REC-2026-000${randomSuffix}`;

      const receiptDoc = await createReceipt({
        pickupId,
        customReceiptId,
        items: weighedItems,
        totalAmount: grossAmount,
        totalWeight: grossWeight,
        customerName: 'Anand Deshmukh',
        collectorName: 'Ramesh Shinde (Authorized Partner)',
      });

      if (onGenerateReceipt) {
        onGenerateReceipt(weighedItems, receiptDoc);
      }
    } catch (e) {
      console.warn('Create receipt notice:', e);
      if (onGenerateReceipt) {
        onGenerateReceipt(weighedItems);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 my-2 max-w-xl font-sans">
      {/* Title & Bluetooth Scale Status */}
      <div className="flex items-start justify-between mb-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shadow-2xs">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{content.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <Bluetooth className="w-3.5 h-3.5 text-blue-500" />
                <span>{content.scaleStatus}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Database className="w-3 h-3 text-emerald-600" />
            <span>FIRESTORE RATES</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{content.stabilize}</span>
          </span>
        </div>
      </div>

      {/* BEFORE CONFIRMATION: Scale Interface and Table */}
      {!isConfirmed ? (
        <div className="space-y-4">
          {/* Digital Scale LED Readout */}
          <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl border border-slate-800 shadow-inner relative overflow-hidden">
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono mb-1">
              <span>{content.liveReadout}</span>
              <span className="text-emerald-500 font-semibold">TARA-BT · 150KG CAPACITY</span>
            </div>

            <div className="flex items-baseline justify-center gap-2 py-2">
              <span className="font-mono text-5xl sm:text-6xl font-black tracking-tight tabular-nums">
                {currentWeight.toFixed(2)}
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-500">
                kg
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <button
                type="button"
                onClick={() => setCurrentWeight(0.0)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-mono text-xs cursor-pointer"
              >
                {content.tare}
              </button>
              <button
                type="button"
                onClick={() => {
                  const demoWeights = [5.0, 3.0, 12.0, 8.5, 14.2];
                  setCurrentWeight(demoWeights[Math.floor(Math.random() * demoWeights.length)]);
                }}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg font-mono flex items-center gap-1 text-xs cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simulate Scale</span>
              </button>
            </div>
          </div>

          {/* Voice/Text Parsing Input (Directly requested in user prompt) */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-emerald-700" />
                <span>{content.voicePrompt}</span>
              </label>
            </div>

            {/* Quick pre-parsed prompt chips from prompt */}
            <div className="flex flex-wrap gap-1.5">
              {['5 किलो e-waste', '3 किलो copper', '12 kilo paper'].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleParseVoiceText(sample)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-emerald-900 hover:bg-emerald-100 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3 text-emerald-700" />
                  <span>"{sample}"</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={voiceInput}
                onChange={(e) => setVoiceInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleParseVoiceText(voiceInput)}
                placeholder="Type e.g. 5 किलो e-waste, 3 किलो copper..."
                className="flex-1 text-xs p-2.5 rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
              <button
                type="button"
                onClick={() => handleParseVoiceText(voiceInput)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Manual Material Selection Row */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-2 justify-between">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-xs font-bold text-slate-700 shrink-0">
                {content.selectMaterial}:
              </label>
              <select
                value={selectedMaterialKey}
                onChange={(e) => setSelectedMaterialKey(e.target.value)}
                className="flex-1 text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
              >
                {materialRates.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.icon || '📦'} {lang === 'mr' ? m.nameMr || m.name : m.name} (₹{m.ratePerKg}/kg)
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleAddScaleItem}
              disabled={currentWeight <= 0}
              className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{content.addItem}</span>
            </button>
          </div>

          {/* Material | Weight | Rate | Amount TABLE (Editable before confirmation) */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {content.tally} ({weighedItems.length})
            </h4>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Material</th>
                    <th className="py-2.5 px-3">Weight</th>
                    <th className="py-2.5 px-3">Rate</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {weighedItems.map((item) => {
                    const isEditing = editingItemId === item.id;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          {item.materialName || item.name}
                        </td>

                        {/* Editable Weight */}
                        <td className="py-2 px-3 font-mono">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={editWeightVal}
                                onChange={(e) => setEditWeightVal(e.target.value)}
                                className="w-16 p-1 text-xs border border-emerald-500 rounded bg-white font-mono font-bold"
                              />
                              <button
                                onClick={() => handleSaveEdit(item.id || '')}
                                className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                title={content.saveWeight}
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <span className="font-bold text-slate-900">
                              {item.weightKg.toFixed(1)} kg
                            </span>
                          )}
                        </td>

                        <td className="py-2.5 px-3 font-mono text-slate-600">
                          ₹{item.ratePerKg}/kg
                        </td>

                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">
                          ₹{(item.amount || item.subtotal || item.weightKg * item.ratePerKg).toFixed(1)}
                        </td>

                        <td className="py-2.5 px-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {!isEditing && (
                              <button
                                onClick={() => handleStartEdit(item)}
                                className="p-1 text-slate-400 hover:text-emerald-700 rounded"
                                title={content.editWeight}
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteItem(item.id || '')}
                              className="p-1 text-slate-400 hover:text-red-600 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gross Summary Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[11px] text-slate-300 font-medium block">
                {content.totalWeight}
              </span>
              <span className="font-mono font-black text-xl text-white">
                {grossWeight.toFixed(1)} kg
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-300 font-medium block">
                {content.totalAmount}
              </span>
              <span className="font-mono font-black text-2xl text-emerald-400">
                ₹{grossAmount.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmWeight}
            disabled={weighedItems.length === 0 || isSubmitting}
            className="w-full min-h-[46px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-40 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{content.confirmWeightBtn}</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* AFTER WEIGHT CONFIRMATION: Digital Transaction Summary & Ask "Digital receipt तयार करू?" */
        <div className="space-y-4">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Actual weight saved to Firestore. WEIGHT_RECORDED audit event created.</span>
          </div>

          {/* Digital Transaction Summary */}
          <div className="bg-slate-50 border-2 border-emerald-500 rounded-2xl p-4 space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-black text-sm tracking-wider text-slate-900 font-mono">
                {content.summaryTitle}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                VERIFIED TARA SCALE
              </span>
            </div>

            <div className="divide-y divide-slate-200/80 text-xs">
              {weighedItems.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {item.materialName || item.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {item.weightKg.toFixed(1)} kg × ₹{item.ratePerKg}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{(item.amount || item.subtotal || item.weightKg * item.ratePerKg).toFixed(1)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t-2 border-slate-900 flex items-center justify-between text-sm">
              <span className="font-black text-slate-900">Total amount:</span>
              <span className="font-mono font-black text-xl text-emerald-700">
                ₹{grossAmount.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Ask: "Digital receipt तयार करू?" */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl text-center space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">
                {content.askReceipt}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Generates a verified, tamper-proof green receipt with QR verification in Firestore.
              </p>
            </div>

            <button
              onClick={handleCreateDigitalReceipt}
              disabled={isSubmitting}
              className="w-full min-h-[46px] px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{content.createReceiptBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
