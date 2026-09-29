import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  QrCode,
  ShieldCheck,
  TrendingUp,
  Scale,
  Package,
  ArrowRight,
  Phone,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Language, PickupRequest } from '../../types';
import { MOCK_PICKUPS } from '../../data/mockData';

interface CollectorOpsViewProps {
  lang: Language;
  onSelectPickup?: (req: PickupRequest) => void;
}

export const CollectorOpsView: React.FC<CollectorOpsViewProps> = ({
  lang,
  onSelectPickup,
}) => {
  const [pickups, setPickups] = useState<PickupRequest[]>(MOCK_PICKUPS);
  const [selectedTab, setSelectedTab] = useState<'requests' | 'batch' | 'earnings'>('requests');
  const [newBatchCreated, setNewBatchCreated] = useState<boolean>(false);

  const content = {
    mr: {
      badge: 'कबाडीवाला ऑपरेशन्स डॅशबोर्ड',
      title: 'कलेक्टर हब (रमेश शिंदे)',
      subtitle: 'बॅज #४०८ • मायक्रो-हब औंध #४ • वाहन: पियाजिओ EV लोडर (MH-12-RN-4890)',
      scaleOnline: 'काटा BT-992 जोडला आहे',
      kpi1Title: 'आजचे संकलन विनंत्या',
      kpi1Value: '७ विनंत्या (४ पूर्ण)',
      kpi2Title: 'एकूण गोळा केलेले वजन',
      kpi2Cap: '/ ५०० किलो क्षमता',
      kpi3Title: 'आजचे कमिशन / कमाई',
      tabRequests: 'थेट पिकअप विनंत्या',
      tabBatch: 'बॅच व सील पॅकेजिंग',
      tabEarnings: 'कमाई व हिशोब',
      acceptBtn: 'मार्ग स्वीकारा (Accept)',
      acceptedBtn: 'स्वीकारले ✓',
      callCustomer: 'ग्राहकाला कॉल करा',
      createBatchBtn: 'नवीन प्रमाणित बॅच तयार करा (PUN-BAL-803)',
    },
    hi: {
      badge: 'कबाड़ीवाला ऑपरेशन्स डैशबोर्ड',
      title: 'कलेक्टर हब (रमेश शिंदे)',
      subtitle: 'बैज #408 • माइक्रो-हब औंध #4 • वाहन: Piaggio EV लोडर (MH-12-RN-4890)',
      scaleOnline: 'कांटा BT-992 कनेक्टेड',
      kpi1Title: 'आज के पिकअप अनुरोध',
      kpi1Value: '7 अनुरोध (4 पूर्ण)',
      kpi2Title: 'कुल संकलित भार',
      kpi2Cap: '/ 500 किग्रा क्षमता',
      kpi3Title: 'आज का कमीशन / आय',
      tabRequests: 'लाइव पिकअप अनुरोध',
      tabBatch: 'बैच व सील पैकेजिंग',
      tabEarnings: 'कमाई व बहीखाता',
      acceptBtn: 'स्वीकार करें (Accept)',
      acceptedBtn: 'स्वीकृत ✓',
      callCustomer: 'ग्राहक को कॉल करें',
      createBatchBtn: 'नया प्रमाणित बैच बनाएं (PUN-BAL-803)',
    },
    en: {
      badge: 'Field Operations Portal',
      title: 'Collector Hub (Ramesh Shinde)',
      subtitle: 'Badge #408 • Micro-Hub Aundh #4 • Vehicle: Piaggio EV Loader (MH-12-RN-4890)',
      scaleOnline: 'Scale BT-992 Online',
      kpi1Title: "Today's Collections",
      kpi1Value: '7 Requests (4 Done)',
      kpi2Title: 'Scrap Weight Collected',
      kpi2Cap: '/ 500kg cap',
      kpi3Title: "Today's Commission",
      tabRequests: 'Live Pickup Requests',
      tabBatch: 'Batch & Tamper Seal',
      tabEarnings: 'Earnings Ledger',
      acceptBtn: 'Accept Pickup Route',
      acceptedBtn: 'Accepted ✓',
      callCustomer: 'Call Customer',
      createBatchBtn: 'Generate Manifest Batch #PUN-BAL-803',
    },
  }[lang];

  const handleAcceptRequest = (id: string) => {
    setPickups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'accepted' } : p))
    );
    alert(lang === 'mr' ? `विनंती #${id} स्वीकारली! जीपीएस मार्ग अपडेट झाला.` : lang === 'hi' ? `अनुरोध #${id} स्वीकृत! जीपीएस रूट अपडेट हुआ।` : `Request #${id} accepted! GPS routing navigation updated.`);
  };

  const handleCreateBatch = () => {
    setNewBatchCreated(true);
    alert(lang === 'mr' ? 'नवीन बॅच #PUN-BAL-2026-803 डिजिटल सील TS-9988-MH सह तयार झाली! वाहतूकदाराला हस्तांतरणासाठी सज्ज.' : lang === 'hi' ? 'नया बैच #PUN-BAL-2026-803 डिजिटल सील TS-9988-MH के साथ तैयार हुआ।' : 'New Batch #PUN-BAL-2026-803 created with Tamper Seal TS-9988-MH!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner with Field Stats */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl p-4 sm:p-6 shadow-sm shadow-purple-500/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              {content.badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {content.title}
            </h2>
            <p className="text-xs sm:text-sm text-purple-700/80">
              {content.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <Wifi className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>{content.scaleOnline}</span>
            </span>
          </div>
        </div>

        {/* 3 Quick KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-purple-100">
          <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3">
            <span className="text-xs text-purple-700/80 font-medium">{content.kpi1Title}</span>
            <div className="text-lg font-extrabold text-slate-900 font-mono mt-0.5">
              {content.kpi1Value}
            </div>
          </div>
          <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3">
            <span className="text-xs text-purple-700/80 font-medium">{content.kpi2Title}</span>
            <div className="text-lg font-extrabold text-slate-900 font-mono mt-0.5">
              184.2 kg <span className="text-xs font-bold text-slate-400">{content.kpi2Cap}</span>
            </div>
          </div>
          <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3">
            <span className="text-xs text-purple-700/80 font-medium">{content.kpi3Title}</span>
            <div className="text-lg font-extrabold text-purple-700 font-mono mt-0.5">
              ₹1,840.00
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-2 border-t border-purple-100">
          <button
            onClick={() => setSelectedTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTab === 'requests'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                : 'bg-purple-50 hover:bg-purple-100 text-slate-700'
            }`}
          >
            {content.tabRequests}
          </button>
          <button
            onClick={() => setSelectedTab('batch')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTab === 'batch'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                : 'bg-purple-50 hover:bg-purple-100 text-slate-700'
            }`}
          >
            {content.tabBatch}
          </button>
          <button
            onClick={() => setSelectedTab('earnings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTab === 'earnings'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                : 'bg-purple-50 hover:bg-purple-100 text-slate-700'
            }`}
          >
            {content.tabEarnings}
          </button>
        </div>
      </div>

      {/* Pickups List Tab */}
      {selectedTab === 'requests' && (
        <div className="space-y-3">
          {pickups.map((req) => (
            <div
              key={req.id}
              className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-4 shadow-2xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                    #{req.id}
                  </span>
                  <span className="font-bold text-sm text-slate-900">{req.customerName}</span>
                  <span className="text-xs text-purple-600/80 font-medium">({req.distanceKm} km)</span>
                </div>
                <span className="text-xs font-bold text-slate-500">{req.scheduledTime}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <p><span className="font-bold text-purple-900">Address:</span> {req.address}</p>
                <p><span className="font-bold text-purple-900">Estimated:</span> {req.estimatedWeightKg} kg (~₹{req.estimatedEarnings})</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-purple-100">
                <a
                  href={`tel:${req.phone}`}
                  className="px-3 py-1.5 border border-purple-200 hover:bg-purple-50 text-purple-900 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-600" />
                  <span>{content.callCustomer}</span>
                </a>

                <button
                  onClick={() => handleAcceptRequest(req.id)}
                  className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  {req.status === 'accepted' ? content.acceptedBtn : content.acceptBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Batch Packaging Tab */}
      {selectedTab === 'batch' && (
        <div className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-6 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {lang === 'mr' ? 'मायक्रो-हब बेलिंग व डिजिटल सील जनरेटर' : lang === 'hi' ? 'माइक्रो-हब बेलिंग व डिजिटल सील जनरेटर' : 'Micro-Hub Baling & Tamper Seal Generator'}
          </h3>
          <p className="text-xs text-purple-700/80 max-w-md mx-auto">
            {lang === 'mr' ? 'सर्व संकलित साहित्याचे वर्गीकरण पूर्ण करून ४२० किलोची प्रमाणित बॅच तयार करा.' : lang === 'hi' ? 'संकलित सामग्री का वर्गीकरण पूरा कर 420 किग्रा का प्रमाणित बैच तैयार करें।' : 'Aggregate collected scrap and generate a certified batch for logistics transport.'}
          </p>
          <button
            onClick={handleCreateBatch}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            {content.createBatchBtn}
          </button>
        </div>
      )}

      {/* Earnings Tab */}
      {selectedTab === 'earnings' && (
        <div className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-6 space-y-3 shadow-2xs text-xs">
          <h4 className="font-bold text-slate-900 text-sm">
            {lang === 'mr' ? 'थेट बँक ट्रान्सफर व कमिशन पावती' : lang === 'hi' ? 'सीधे बैंक ट्रांसफर व कमीशन रसीद' : 'Commission Direct Bank Ledger'}
          </h4>
          <div className="divide-y divide-purple-100">
            <div className="py-2.5 flex justify-between">
              <span>{lang === 'mr' ? '२७ सप्टेंबर (४ पिकअप्स)' : lang === 'hi' ? '27 सितंबर (4 पिकअप्स)' : '27 Sep (4 Pickups)'}</span>
              <span className="font-bold text-emerald-700 font-mono">+₹1,840.00</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span>{lang === 'mr' ? '२६ सप्टेंबर (६ पिकअप्स)' : lang === 'hi' ? '26 सितंबर (6 पिकअप्स)' : '26 Sep (6 Pickups)'}</span>
              <span className="font-bold text-emerald-700 font-mono">+₹2,420.00</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
