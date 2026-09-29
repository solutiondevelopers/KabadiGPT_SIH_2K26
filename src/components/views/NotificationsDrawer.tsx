import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Award,
  Package,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import { Language } from '../../types';
import { MOCK_NOTIFICATIONS } from '../../data/mockData';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  if (!isOpen) return null;

  const content = {
    mr: {
      title: 'सूचना केंद्र',
      subtitle: 'थेट चक्रीय सिस्टीम अपडेट्स',
      markAllRead: 'सर्व वाचल्याचे चिन्हांकित करा',
      noAlerts: 'कोणत्याही नवीन सूचना नाहीत',
      closeBtn: 'बंद करा',
      items: [
        {
          id: 'NT-1',
          title: 'कलेक्टर रमेश ५ मिनिटांत येत आहेत',
          message: 'तुमची पिकअप विनंती #REQ-101 साठी वाहन (रोहन निलय, औंध) येथे पोहोचत आहे.',
          time: '१० मिनिटांपूर्वी',
        },
        {
          id: 'NT-2',
          title: 'बॅच PUN-BAL-801 MRF गोदामात पोहोचली',
          message: 'तुमचे भंगार मध्यवर्ती MRF सॉर्टिंग हबवर सुरक्षितपणे जमा झाले. डिजिटल सील सुरक्षित आहे.',
          time: '१ तासापूर्वी',
        },
        {
          id: 'NT-3',
          title: '+८५ ई-पॉइंट्स जमा झाले!',
          message: 'अभिनंदन! २८.४ किलो कचरा पुनर्वापरासाठी वर्ग झाला. १८.२ किलो कार्बन उत्सर्जन वाचवले.',
          time: '३ तासांपूर्वी',
        },
        {
          id: 'NT-4',
          title: 'वजन पडताळणी ऑडिट पूर्ण',
          message: 'बॅच #७९८ साठी इलेक्ट्रॉनिक वजन काटा लॉग पूर्णपणे प्रमाणित करण्यात आला.',
          time: 'काल',
        },
      ],
    },
    hi: {
      title: 'अधिसूचना केंद्र',
      subtitle: 'लाइव चक्रीय सिस्टम अपडेट',
      markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
      noAlerts: 'कोई नई अधिसूचना नहीं',
      closeBtn: 'बंद करें',
      items: [
        {
          id: 'NT-1',
          title: 'कलेक्टर रमेश 5 मिनट में पहुंच रहे हैं',
          message: 'आपके पिकअप अनुरोध #REQ-101 हेतु वाहन (रोहन निलय, औंध) पहुंच रहा है।',
          time: '10 मिनट पहले',
        },
        {
          id: 'NT-2',
          title: 'बैच PUN-BAL-801 MRF वेयरहाउस पहुंचा',
          message: 'आपका कबाड़ केंद्रीय MRF हब पर सुरक्षित पहुंचा। डिजिटल सील सत्यापित।',
          time: '1 घंटे पहले',
        },
        {
          id: 'NT-3',
          title: '+85 ई-पॉइंट्स जुड़े!',
          message: 'बधाई हो! 28.4 किग्रा कचरे का पुनर्चक्रण। 18.2 किग्रा CO2 बचत दर्ज।',
          time: '3 घंटे पहले',
        },
        {
          id: 'NT-4',
          title: 'भार मिलान ऑडिट पूर्ण',
          message: 'बैच #798 का इलेक्ट्रॉनिक कांटे से मिलान सत्यापित हुआ।',
          time: 'कल',
        },
      ],
    },
    en: {
      title: 'Notifications & Alerts',
      subtitle: 'Live circular system updates',
      markAllRead: 'Mark all as read',
      noAlerts: 'No new notifications',
      closeBtn: 'Close',
      items: [
        {
          id: 'NT-1',
          title: 'Collector Ramesh is 5 mins away',
          message: 'Your pickup REQ-101 for Newspaper & Iron scrap is arriving shortly at Rohan Nilay, Aundh.',
          time: '10 mins ago',
        },
        {
          id: 'NT-2',
          title: 'Batch PUN-BAL-801 Reached MRF Warehouse',
          message: 'Your scrap batch was successfully verified at Central MRF Sorting Hub. Tamper seal intact.',
          time: '1 hour ago',
        },
        {
          id: 'NT-3',
          title: '+85 E-Points Credited!',
          message: 'Congratulations! 28.4 kg of scrap diverted from landfill. CO2 offset of 18.2 kg recorded.',
          time: '3 hours ago',
        },
        {
          id: 'NT-4',
          title: 'Discrepancy Audit Resolved',
          message: 'Weight reconciliation for Batch #798 verified with electronic weighbridge log.',
          time: 'Yesterday',
        },
      ],
    },
  }[lang];

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 bottom-0 right-0 z-50 w-full max-w-sm bg-white/95 backdrop-blur-xl border-l border-purple-200/80 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-purple-100 flex items-center justify-between bg-gradient-to-b from-purple-50/70 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{content.title}</h3>
              <p className="text-[11px] text-purple-700/80 font-medium">{content.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-900 hover:bg-purple-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {content.items.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 bg-white border border-purple-200/80 rounded-2xl shadow-2xs space-y-1 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <span className="text-[10px] text-purple-600/80 font-mono">{item.time}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-purple-100 bg-purple-50/50 flex items-center justify-between">
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{content.markAllRead}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
          >
            {content.closeBtn}
          </button>
        </div>
      </div>
    </>
  );
};
