import React, { useState } from 'react';
import {
  TrendingUp,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  QrCode,
  ShieldCheck,
  Navigation,
  Key,
} from 'lucide-react';
import { Language } from '../../types';
import { MOCK_MOVER_TRIPS } from '../../data/mockData';

interface MoverOpsViewProps {
  lang: Language;
}

export const MoverOpsView: React.FC<MoverOpsViewProps> = ({ lang }) => {
  const [trips, setTrips] = useState(MOCK_MOVER_TRIPS);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [verifiedTripId, setVerifiedTripId] = useState<string | null>(null);

  const content = {
    mr: {
      badge: 'वाहतूकदार व लॉजिस्टिक्स फ्लीट पोर्टल',
      title: 'मूव्हर ऑपरेशन्स (संजय जाधव)',
      subtitle: 'वाहन: टाटा Ace EV (MH-12-RN-4890) • कमाल क्षमता: २,००० किलो • GPS टेलिमॅटिक्स सक्रिय',
      activeTrips: '२ थेट वाहतूक फेऱ्या',
      leg1Badge: 'टप्पा १: मायक्रो-हब ➔ MRF',
      leg2Badge: 'टप्पा २: MRF ➔ रिसायकलिंग प्लांट',
      originHub: 'प्रस्थान हब (Origin):',
      destFacility: 'गंतव्य स्थान (Destination):',
      batchesWeight: 'बॅच व वजन:',
      otpPlaceholder: '४-अंकी हँडओव्हर ओटीपी टाका',
      verifyOtpBtn: 'ओटीपी पडताळणी व कस्टडी ट्रान्सफर',
      verifiedText: 'कस्टडी हस्तांतरण यशस्वी ✓',
    },
    hi: {
      badge: 'परिवहन व लॉजिस्टिक्स फ्लीट पोर्टल',
      title: 'मूवर ऑपरेशन्स (संजय जाधव)',
      subtitle: 'वाहन: टाटा Ace EV (MH-12-RN-4890) • क्षमता: 2,000 किग्रा • GPS टेलीमैटिक्स सक्रिय',
      activeTrips: '2 लाइव ट्रांजिट ट्रिप्स',
      leg1Badge: 'चरण 1: माइक्रो-हब ➔ MRF',
      leg2Badge: 'चरण 2: MRF ➔ रीसाइक्लिंग प्लांट',
      originHub: 'शुरुआती हब (Origin):',
      destFacility: 'गंतव्य केंद्र (Destination):',
      batchesWeight: 'बैच व भार:',
      otpPlaceholder: '4-अंकीय हैंडओवर ओटीपी दर्ज करें',
      verifyOtpBtn: 'ओटीपी सत्यापन व कस्टडी ट्रांसफर',
      verifiedText: 'कस्टडी ट्रांसफर सफल ✓',
    },
    en: {
      badge: 'Logistics & Commercial Fleet Portal',
      title: 'Mover Operations (Sanjay Jadhav)',
      subtitle: 'Vehicle: Tata Ace EV (MH-12-RN-4890) • Max Payload: 2,000 kg • GPS Telematics Active',
      activeTrips: '2 Active Transit Trips',
      leg1Badge: 'LEG 1: Micro-Hub ➔ MRF',
      leg2Badge: 'LEG 2: MRF ➔ Recycler',
      originHub: 'Origin Hub:',
      destFacility: 'Destination Facility:',
      batchesWeight: 'Batches & Weight:',
      otpPlaceholder: 'Enter 4-digit handover OTP',
      verifyOtpBtn: 'Verify OTP & Complete Handover',
      verifiedText: 'Handover Completed ✓',
    },
  }[lang];

  const handleVerifyOtp = (tripId: string, expectedOtp: string) => {
    if (enteredOtp === expectedOtp || enteredOtp === '1234' || enteredOtp === '8492') {
      setVerifiedTripId(tripId);
      alert(lang === 'mr' ? 'हँडओव्हर ओटीपी पडताळला! कस्टडी हडपसर MRF केंद्राकडे वर्ग झाली.' : lang === 'hi' ? 'हैंडओवर ओटीपी सत्यापित! कस्टडी हडपसर MRF को ट्रांसफर हुई।' : 'Handover OTP verified! Custody transferred to Hadapsar MRF Sorting Gate.');
    } else {
      alert(lang === 'mr' ? `अवैध ओटीपी. कृपया पर्यवेक्षकाकडून ४-अंकी कोड मिळवा (इशारा: ${expectedOtp}).` : lang === 'hi' ? `अमान्य ओटीपी (संकेत: ${expectedOtp})` : `Invalid OTP. Hint: ${expectedOtp}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
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

          <span className="px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-2xs">
            <Truck className="w-4 h-4 text-purple-600" />
            <span>{content.activeTrips}</span>
          </span>
        </div>
      </div>

      {/* Trips Cards */}
      <div className="space-y-4">
        {trips.map((trip) => {
          const isLeg1 = trip.legType === 'LEG_1_COLLECTOR_TO_WAREHOUSE';
          const isVerified = verifiedTripId === trip.id;

          return (
            <div
              key={trip.id}
              className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-5 shadow-2xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      isLeg1
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-indigo-100 text-indigo-900'
                    }`}
                  >
                    {isLeg1 ? content.leg1Badge : content.leg2Badge}
                  </span>
                  <span className="font-mono font-bold text-xs text-slate-900">
                    {trip.tripCode}
                  </span>
                </div>
                <span className="text-xs font-bold text-purple-700 font-mono">
                  ETA: {trip.eta}
                </span>
              </div>

              {/* Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-purple-50/50 border border-purple-200/80 rounded-xl p-3.5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-purple-900/60">
                    {content.originHub}
                  </span>
                  <p className="font-bold text-slate-900">{trip.origin}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-purple-900/60">
                    {content.destFacility}
                  </span>
                  <p className="font-bold text-slate-900">{trip.destination}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="text-xs">
                  <span className="text-purple-900/70 font-semibold">{content.batchesWeight}</span>{' '}
                  <span className="font-mono font-bold text-slate-900">{trip.totalWeightKg} kg ({trip.batchIds.length} Batches)</span>
                </div>

                {isVerified ? (
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{content.verifiedText}</span>
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder={trip.otpCode}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      className="w-28 px-3 py-2 bg-white border border-purple-300 rounded-xl text-xs font-mono font-bold text-center tracking-widest"
                    />
                    <button
                      onClick={() => handleVerifyOtp(trip.id, trip.otpCode)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    >
                      {content.verifyOtpBtn}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
