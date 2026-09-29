import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Upload,
  User,
  Building,
  Landmark,
  ArrowRight,
  Info,
  Sparkles,
  Truck,
  Home,
  Check,
  QrCode,
  FileText,
  BadgeCheck,
  Scale,
  Layers,
  Building2,
} from 'lucide-react';
import { SupportedRole, KycStatus, Language } from '../types';
import confetti from 'canvas-confetti';

interface RoleOnboardingWorkflowProps {
  role: SupportedRole;
  lang: Language;
  onComplete: (kycStatus: KycStatus, kycDetails: Record<string, any>) => void;
}

export const RoleOnboardingWorkflow: React.FC<RoleOnboardingWorkflowProps> = ({
  role,
  lang,
  onComplete,
}) => {
  // Common KYC form states
  const [kycStatus, setKycStatus] = useState<KycStatus>('PENDING');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [selectedProofSim, setSelectedProofSim] = useState<string>('document_proof_sim.pdf');

  // Household fields
  const [householdName, setHouseholdName] = useState('Anand Deshmukh');
  const [householdAddress, setHouseholdAddress] = useState('B-402, Rohan Nilay, Aundh, Pune - 411007');
  const [householdDocType, setHouseholdDocType] = useState('Electricity Bill / Address Proof');
  const [upiId, setUpiId] = useState('anand.deshmukh@okhdfcbank');
  const [scrapTypes, setScrapTypes] = useState<string[]>(['Newspaper / Paper', 'Plastic Bottles', 'Old Electronics']);

  // Kabadiwala fields
  const [collectorName, setCollectorName] = useState('Ramesh Shinde');
  const [collectionWard, setCollectionWard] = useState('Aundh Ward #4, Pune Municipal Corporation');
  const [vehicleNumber, setVehicleNumber] = useState('MH-12-RP-3012 (EV Cargo Loader)');
  const [hubAssociation, setHubAssociation] = useState('Aundh Circular Micro-Hub #4');
  const [smartScaleId, setSmartScaleId] = useState('TaraScale-BT-402');
  const [dailyCapacity, setDailyCapacity] = useState('350 kg/day');

  // Mover fields
  const [moverFleetName, setMoverFleetName] = useState('GreenLogix Transporters');
  const [truckType, setTruckType] = useState('Tata Ace EV 1.2T + Eicher Pro 7.5T');
  const [commercialPermit, setCommercialPermit] = useState('MH-LOG-PERMIT-8832');
  const [assignedRoute, setAssignedRoute] = useState('Micro-Hub #4 -> Central Hadapsar MRF -> Chakan Plant');

  // Warehouse MRF fields
  const [warehouseHubName, setWarehouseHubName] = useState('Hadapsar Central Material Recovery Facility');
  const [operatorOrg, setOperatorOrg] = useState('PMC Swachh Co-operative MRF');
  const [weighbridgeModel, setWeighbridgeModel] = useState('Avery Weigh-Tronix Bridge 40T');
  const [activeStreams, setActiveStreams] = useState<string[]>(['PET Bottles', 'HDPE/PP', 'Corrugated Cardboard', 'E-Waste']);

  // Recycler fields
  const [facilityName, setFacilityName] = useState('EcoPlast Polymers Ltd');
  const [ctoLicenseNumber, setCtoLicenseNumber] = useState('MPCB-CTO-PUN-2024-9041');
  const [capacityTons, setCapacityTons] = useState('500 Metric Tonnes / Month');
  const [gstNumber, setGstNumber] = useState('27AAACE1234F1Z5');
  const [recyclerTypes, setRecyclerTypes] = useState<string[]>(['PET Bottles (Food-grade Flakes)', 'HDPE / PP Polymers']);

  // Government fields
  const [officerName, setOfficerName] = useState('Dr. Sanjay Kulkarni');
  const [department, setDepartment] = useState('Maharashtra Pollution Control Board (MPCB) / PMC');
  const [designation, setDesignation] = useState('Deputy Environmental Engineer - Solid Waste Management Cell');
  const [employeeGovId, setEmployeeGovId] = useState('GOV-MH-ENV-8841');
  const [jurisdiction, setJurisdiction] = useState('Pune City & Pimpri Chinchwad Zone');

  const content = {
    mr: {
      tag: 'प्रोटोटाइप पडताळणी · Prototype Verification',
      notice:
        '⚠️ प्रोटोटाइप पडताळणी: हे केवळ प्रात्यक्षिक (Prototype) स्क्रीन आहे. येथे कोणताही प्रत्यक्ष आधार किंवा शासकीय डेटाबेस तपासला जात नाही.',
      householdTitle: 'घरगुती नागरिक केवायसी नोंदणी (Household Onboarding)',
      householdSub: 'कबाड पिकअप व तात्काळ यूपीआय पेमेंटसाठी प्राथमिक माहिती नोंदवा',
      kabadiwalaTitle: 'कबाडीवाला व्यावसायिक नोंदणी व केवायसी (Collector Onboarding)',
      kabadiwalaSub: 'अधिकृत संकलक बॅज, ब्लूटूथ डिजिटल काटा व थेट मायक्रो-हब खरेदीसाठी नोंदणी',
      moverTitle: 'वाहतूकदार लॉजिस्टिक्स परवाना पडताळणी (Mover Onboarding)',
      moverSub: 'मायक्रो-हब ते MRF गोदाम ट्रान्झिट फ्लीट व वाहनांची नोंदणी',
      warehouseTitle: 'MRF सॉर्टिंग केंद्र प्रमाणीकरण (Warehouse Hub Onboarding)',
      warehouseSub: 'वेब्रिज गेट, ५-स्ट्रीम सॉर्टिंग युनिट व आउटगोइंग बॅच डिस्पॅच परवाना',
      recyclerTitle: 'अधिकृत रिसायकलिंग फॅक्टरी ईपीआर पडताळणी (Recycler Onboarding)',
      recyclerSub: 'सीटीओ परवाना, जीएसटी व ईपीआर क्रेडिट्स जारी करण्यासाठी पडताळणी',
      govTitle: 'शासकीय व मनपा अधिकारी ओळख प्रमाणीकरण (Government Onboarding)',
      govSub: 'शहर-स्तरीय कचरा डायव्हर्जन डेटा व ऑडिट अहवाल तपासणीसाठी अधिकृत प्रवेश',
      submitBtn: 'प्रोटोटाइप केवायसी पूर्ण करा',
      verifying: 'डेटा तपासला जात आहे...',
      statusLabel: 'केवायसी स्थिती (KYC Status):',
      statusChangeHint: 'चाचणीसाठी केवायसी स्थिती बदला (Test KYC Statuses):',
      verifiedSuccess: 'पडताळणी यशस्वी! मुख्य सहाय्यक उघडत आहे...',
      uploadNotice: 'प्रोटोटाइप ओळखपत्र सिमुलेशन जोडले आहे.',
    },
    hi: {
      tag: 'प्रोटोटाइप सत्यापन · Prototype Verification',
      notice:
        '⚠️ प्रोटोटाइप सत्यापन: यह केवल एक प्रोटोटाइप सिमुलेशन स्क्रीन है। कोई वास्तविक आधार, पैन या सीपीसीबी डेटाबेस उपयोग नहीं किया जा रहा है।',
      householdTitle: 'घरेलू नागरिक केवाईसी पंजीकरण (Household Onboarding)',
      householdSub: 'डोरस्टेप कबाड़ पिकअप व तुरंत यूपीआई भुगतान हेतु विवरण दर्ज करें',
      kabadiwalaTitle: 'कबाड़ीवाला व्यावसायिक पंजीकरण व सत्यापन (Collector Onboarding)',
      kabadiwalaSub: 'अधिकृत कलेक्टर बैज, डिजिटल कांटा व माइक्रो-हब डिलीवरी हेतु',
      moverTitle: 'मूवर लॉजिस्टिक्स परमिट सत्यापन (Mover Onboarding)',
      moverSub: 'माइक्रो-हब से MRF वेयरहाउस ट्रांजिट फ्लीट व वाहन पंजीकरण',
      warehouseTitle: 'MRF सॉर्टिंग सेंटर प्रमाणीकरण (Warehouse Hub Onboarding)',
      warehouseSub: 'वेब्रिज गेट, ५-स्ट्रीम सॉर्टिंग यूनिट व लॉट डिस्पैच परमिट',
      recyclerTitle: 'अधिकृत रीसाइक्लिंग फैक्ट्री ईपीआर सत्यापन (Recycler Onboarding)',
      recyclerSub: 'सीटीओ लाइसेंस, जीएसटी व ईपीआर क्रेडिट्स हेतु',
      govTitle: 'सरकारी व नगर निगम अधिकारी प्रमाणीकरण (Government Onboarding)',
      govSub: 'शहर-स्तरीय कचरा डायवर्जन व ऑडिट रिपोर्ट्स एक्सेस हेतु',
      submitBtn: 'प्रोटोटाइप केवाईसी पूर्ण करें',
      verifying: 'डेटा सत्यापित हो रहा है...',
      statusLabel: 'केवाईसी स्थिति (KYC Status):',
      statusChangeHint: 'परीक्षण हेतु केवाईसी स्थिति बदलें (Test KYC Statuses):',
      verifiedSuccess: 'सत्यापन सफल! मुख्य इंटरफेस खुल रहा है...',
      uploadNotice: 'प्रोटोटाइप पहचान पत्र सिमुलेशन संलग्न है।',
    },
    en: {
      tag: 'Prototype Verification · Simulation Only',
      notice:
        '⚠️ Prototype Verification: This is a simulation screen for demonstration. No real government databases are queried or stored.',
      householdTitle: 'Household Citizen Onboarding (Household)',
      householdSub: 'Setup verified doorstep collection profile and instant UPI scrap payouts',
      kabadiwalaTitle: 'Kabadiwala Collector Formalization & KYC',
      kabadiwalaSub: 'Obtain certified partner badge, smart scale pairing, and micro-hub access',
      moverTitle: 'Mover Logistics Permit & Fleet Registration',
      moverSub: 'Register transit vehicles for Hub-to-MRF and MRF-to-Recycler bulk runs',
      warehouseTitle: 'MRF Sorting Facility Hub Onboarding',
      warehouseSub: 'Register intake weighbridge, 5-stream sorting lines & dispatch lots',
      recyclerTitle: 'Authorized Recycler Compliance Onboarding',
      recyclerSub: 'Consent to Operate (CTO) & CPCB EPR plastic crediting integration',
      govTitle: 'Government & Municipal Officer Verification',
      govSub: 'Access municipal solid waste diversion telematics and regulatory ledger',
      submitBtn: 'Complete Prototype Onboarding',
      verifying: 'Verifying prototype credentials...',
      statusLabel: 'KYC Status:',
      statusChangeHint: 'Test different prototype KYC statuses:',
      verifiedSuccess: 'Verification Complete! Opening workspace...',
      uploadNotice: 'Prototype simulated ID document attached.',
    },
  }[lang];

  const handleSimulateStatus = (newStatus: KycStatus) => {
    setKycStatus(newStatus);
  };

  const handleCompleteKYC = () => {
    setIsVerifying(true);
    setTimeout(() => {
      let finalStatus: KycStatus = kycStatus;
      if (finalStatus === 'PENDING') {
        finalStatus = role === 'RECYCLER' || role === 'GOVERNMENT' || role === 'WAREHOUSE'
          ? 'COMPLIANCE_VERIFIED'
          : 'IDENTITY_VERIFIED';
      }

      let details: Record<string, any> = {};

      if (role === 'HOUSEHOLD') {
        details = {
          name: householdName,
          address: householdAddress,
          docType: householdDocType,
          upiId: upiId,
          scrapTypes: scrapTypes,
          verifiedDate: new Date().toISOString(),
        };
      } else if (role === 'KABADIWALA') {
        details = {
          collectorName,
          ward: collectionWard,
          vehicle: vehicleNumber,
          hub: hubAssociation,
          scaleId: smartScaleId,
          dailyCapacity,
          collectorBadgeId: 'MH-KAB-PUN-042',
        };
      } else if (role === 'MOVER') {
        details = {
          moverFleetName,
          truckType,
          commercialPermit,
          assignedRoute,
        };
      } else if (role === 'WAREHOUSE') {
        details = {
          warehouseHubName,
          operatorOrg,
          weighbridgeModel,
          activeStreams,
        };
      } else if (role === 'RECYCLER') {
        details = {
          facilityName,
          license: ctoLicenseNumber,
          capacity: capacityTons,
          gst: gstNumber,
          recyclerTypes,
          eprAuditPass: true,
        };
      } else if (role === 'GOVERNMENT') {
        details = {
          officerName,
          department,
          designation,
          employeeId: employeeGovId,
          jurisdiction,
          securityClearance: 'Level-2 Municipal Auditor',
        };
      }

      setKycStatus(finalStatus);
      setIsVerifying(false);

      if (finalStatus === 'IDENTITY_VERIFIED' || finalStatus === 'COMPLIANCE_VERIFIED') {
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch (e) {}
      }

      setTimeout(() => {
        onComplete(finalStatus, details);
      }, 900);
    }, 800);
  };

  const getStatusBadge = (status: KycStatus) => {
    switch (status) {
      case 'IDENTITY_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            IDENTITY_VERIFIED
          </span>
        );
      case 'COMPLIANCE_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-800 border border-violet-200">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
            COMPLIANCE_VERIFIED
          </span>
        );
      case 'REQUIRES_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            REQUIRES_REVIEW
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            REJECTED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            PENDING
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 my-2 max-w-xl">
      {/* Explicit Prototype Verification notice */}
      <div className="mb-4 p-3 bg-violet-50 border border-violet-200 rounded-xl text-xs text-violet-900 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">{content.tag}</strong>
          <p className="mt-0.5 opacity-90 leading-relaxed">{content.notice}</p>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
            {role === 'HOUSEHOLD' && content.householdTitle}
            {role === 'KABADIWALA' && content.kabadiwalaTitle}
            {role === 'MOVER' && content.moverTitle}
            {role === 'WAREHOUSE' && content.warehouseTitle}
            {role === 'RECYCLER' && content.recyclerTitle}
            {role === 'GOVERNMENT' && content.govTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'HOUSEHOLD' && content.householdSub}
            {role === 'KABADIWALA' && content.kabadiwalaSub}
            {role === 'MOVER' && content.moverSub}
            {role === 'WAREHOUSE' && content.warehouseSub}
            {role === 'RECYCLER' && content.recyclerSub}
            {role === 'GOVERNMENT' && content.govSub}
          </p>
        </div>
        <div className="shrink-0">{getStatusBadge(kycStatus)}</div>
      </div>

      {/* FORM: Household */}
      {role === 'HOUSEHOLD' && (
        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Name / पूर्ण नाव</label>
            <input
              type="text"
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Pickup Address / पत्ता</label>
            <input
              type="text"
              value={householdAddress}
              onChange={(e) => setHouseholdAddress(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">UPI ID for Direct Payouts</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* FORM: Kabadiwala */}
      {role === 'KABADIWALA' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Collector Name / नाव</label>
              <input
                type="text"
                value={collectorName}
                onChange={(e) => setCollectorName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Assigned Ward</label>
              <input
                type="text"
                value={collectionWard}
                onChange={(e) => setCollectionWard(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Vehicle / Loader No.</label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Bluetooth Scale ID</label>
              <input
                type="text"
                value={smartScaleId}
                onChange={(e) => setSmartScaleId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* FORM: Mover */}
      {role === 'MOVER' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Logistics / Fleet Name</label>
              <input
                type="text"
                value={moverFleetName}
                onChange={(e) => setMoverFleetName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Commercial Permit No.</label>
              <input
                type="text"
                value={commercialPermit}
                onChange={(e) => setCommercialPermit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Assigned Transit Corridor</label>
            <input
              type="text"
              value={assignedRoute}
              onChange={(e) => setAssignedRoute(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* FORM: Warehouse MRF */}
      {role === 'WAREHOUSE' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">MRF Sorting Facility Name</label>
              <input
                type="text"
                value={warehouseHubName}
                onChange={(e) => setWarehouseHubName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Operator Organization</label>
              <input
                type="text"
                value={operatorOrg}
                onChange={(e) => setOperatorOrg(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Intake Weighbridge Model</label>
            <input
              type="text"
              value={weighbridgeModel}
              onChange={(e) => setWeighbridgeModel(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* FORM: Recycler */}
      {role === 'RECYCLER' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Plant / Factory Name</label>
              <input
                type="text"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">MPCB CTO License Number</label>
              <input
                type="text"
                value={ctoLicenseNumber}
                onChange={(e) => setCtoLicenseNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">GSTIN Number</label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Monthly Capacity</label>
              <input
                type="text"
                value={capacityTons}
                onChange={(e) => setCapacityTons(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* FORM: Government */}
      {role === 'GOVERNMENT' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Officer Name</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Govt Employee ID</label>
              <input
                type="text"
                value={employeeGovId}
                onChange={(e) => setEmployeeGovId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Department / Cell</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Status override pills for testing */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <label className="text-[11px] text-slate-500 font-semibold block mb-1.5">
          {content.statusChangeHint}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(['PENDING', 'IDENTITY_VERIFIED', 'COMPLIANCE_VERIFIED', 'REQUIRES_REVIEW'] as KycStatus[]).map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleSimulateStatus(status)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                  kycStatus === status
                    ? 'bg-violet-600 text-white border-violet-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-5">
        <button
          onClick={handleCompleteKYC}
          disabled={isVerifying}
          className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-violet-600/25 transition-colors cursor-pointer"
        >
          {isVerifying ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{content.verifying}</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>{content.submitBtn}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
