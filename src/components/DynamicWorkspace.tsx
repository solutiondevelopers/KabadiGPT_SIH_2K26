import React from 'react';
import { ActiveComponentType, Language, PickupRequest, WeighedItem, DetectedMaterial, BatchItem, RecyclerOffer, UserRole } from '../types';
import { recordWeight, createReceipt } from '../services/firebaseService';

// Concrete workflow component implementations
import { RequestCountCard } from './workflows/RequestCountCard';
import { RequestList } from './workflows/RequestList';
import { PickupDetails } from './workflows/PickupDetails';
import { PickupMap } from './workflows/PickupMap';
import { FullDashboard } from './workflows/FullDashboard';
import { SellScrapWorkflow } from './workflows/SellScrapWorkflow';
import { MaterialDetection } from './workflows/MaterialDetection';
import { DigitalWeighing } from './workflows/DigitalWeighing';
import { DigitalReceipt } from './workflows/DigitalReceipt';
import { EarningsCard } from './workflows/EarningsCard';
import { BatchCreation } from './workflows/BatchCreation';
import { BatchDetails } from './workflows/BatchDetails';
import { RecyclerMatching } from './workflows/RecyclerMatching';
import { TraceabilityTimeline } from './workflows/TraceabilityTimeline';
import { RegulatoryAnalytics } from './workflows/RegulatoryAnalytics';

export interface DynamicWorkspaceProps {
  activeComponent: ActiveComponentType | string | null;
  componentData?: Record<string, any> | null;
  lang: Language;
  role: UserRole;
  onTriggerAction: (actionText: string) => void;
  onComponentChange?: (component: ActiveComponentType | string, data?: any) => void;
}

/**
 * DynamicWorkspace Component
 * Dynamically resolves and renders workspace views based on activeComponent and componentData.
 * Designed to be extensible so backend/API intent results or UI events can determine what is rendered.
 */
export const DynamicWorkspace: React.FC<DynamicWorkspaceProps> = ({
  activeComponent,
  componentData = {},
  lang,
  role,
  onTriggerAction,
  onComponentChange,
}) => {
  if (!activeComponent) return null;

  // Normalize component key format (e.g. support REQUEST_COUNT or legacy RequestCountCard)
  const normalizedKey = activeComponent
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toUpperCase();

  // Role-based access control
  if (
    role !== 'kabadiwala' &&
    (normalizedKey === 'DIGITAL_WEIGHING' ||
      normalizedKey === 'DIGITAL_RECEIPT' ||
      normalizedKey === 'RECORD_WEIGHT' ||
      normalizedKey === 'COMPLETE_PICKUP' ||
      normalizedKey === 'CREATE_RECEIPT')
  ) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg">
        {lang === 'mr'
          ? 'हे फक्त कबाडीवाल्यांसाठी आहे. घरातील वापरकर्ते स्क्रॅप पिकअप बुक करू शकतात किंवा पूर्ण झालेली पावती पाहू शकतात.'
          : lang === 'hi'
          ? 'यह केवल कबाड़ीवाला के लिए है।'
          : 'This feature is only for Kabadiwalas.'}
      </div>
    );
  }

  switch (normalizedKey) {
    case 'REQUEST_COUNT':
    case 'REQUEST_COUNT_CARD':
      return (
        <RequestCountCard
          lang={lang}
          onViewRequests={() => {
            if (onComponentChange) onComponentChange('REQUEST_LIST');
            onTriggerAction(
              lang === 'mr'
                ? 'माझ्या जवळचे pickups दाखव'
                : lang === 'hi'
                ? 'मेरे पास के pickups दिखाओ'
                : 'Show pickups near me'
            );
          }}
          onOpenMap={() => {
            if (onComponentChange) onComponentChange('PICKUP_MAP');
            onTriggerAction(
              lang === 'mr'
                ? 'नकाशा दाखव'
                : lang === 'hi'
                ? 'मैप दिखाओ'
                : 'Show route map'
            );
          }}
        />
      );

    case 'VIEW_TODAY_REQUESTS':
    case 'REQUEST_LIST':
    case 'ACCEPT_PICKUP':
      return (
        <RequestList
          lang={lang}
          onSelectPickup={(req: PickupRequest) => {
            if (onComponentChange) onComponentChange('PICKUP_DETAILS', { pickup: req });
            onTriggerAction(
              lang === 'mr'
                ? `${req.customerName} चे पिकअप तपशील दाखव`
                : lang === 'hi'
                ? `${req.customerName} के पिकअप विवरण दिखाओ`
                : `Show pickup details for ${req.customerName}`
            );
          }}
          onOpenMap={() => {
            if (onComponentChange) onComponentChange('PICKUP_MAP');
            onTriggerAction(
              lang === 'mr'
                ? 'नकाशा दाखव'
                : lang === 'hi'
                ? 'मैप दिखाओ'
                : 'Show route map'
            );
          }}
          onStartWeighing={(req: PickupRequest) => {
            if (onComponentChange) onComponentChange('DIGITAL_WEIGHING', { pickup: req });
            onTriggerAction(
              lang === 'mr'
                ? 'कचरा वजन करा'
                : lang === 'hi'
                ? 'कबाड़ का वजन करें'
                : 'Open digital scale'
            );
          }}
        />
      );

    case 'VIEW_PICKUP_DETAILS':
    case 'PICKUP_DETAILS':
      return (
        <PickupDetails
          lang={lang}
          pickup={componentData?.pickup}
          onStartWeighing={() => {
            if (onComponentChange) onComponentChange('DIGITAL_WEIGHING', componentData);
            onTriggerAction(
              lang === 'mr'
                ? 'कचरा वजन करा'
                : lang === 'hi'
                ? 'कबाड़ का वजन करें'
                : 'Open digital scale'
            );
          }}
          onOpenMap={() => {
            if (onComponentChange) onComponentChange('PICKUP_MAP', componentData);
            onTriggerAction(
              lang === 'mr'
                ? 'नकाशा दाखव'
                : lang === 'hi'
                ? 'मैप दिखाओ'
                : 'Show route map'
            );
          }}
        />
      );

    case 'VIEW_NEARBY_PICKUPS':
    case 'NEARBY_PICKUPS':
      return (
        <div className="space-y-4">
          <PickupMap
            lang={lang}
            pickups={componentData?.pickups}
            onSelectPickup={(req: PickupRequest) => {
              if (onComponentChange) onComponentChange('PICKUP_DETAILS', { pickup: req });
              onTriggerAction(
                lang === 'mr'
                  ? `${req.customerName} चे पिकअप तपशील दाखव`
                  : lang === 'hi'
                  ? `${req.customerName} के पिकअप विवरण दिखाओ`
                  : `Show pickup details for ${req.customerName}`
              );
            }}
          />
          <RequestList
            lang={lang}
            onSelectPickup={(req: PickupRequest) => {
              if (onComponentChange) onComponentChange('PICKUP_DETAILS', { pickup: req });
            }}
            onStartWeighing={(req: PickupRequest) => {
              if (onComponentChange) onComponentChange('DIGITAL_WEIGHING', { pickup: req });
            }}
            onTriggerAction={onTriggerAction}
          />
        </div>
      );

    case 'START_PICKUP':
    case 'PICKUP_MAP':
      return (
        <PickupMap
          lang={lang}
          pickups={componentData?.pickups}
          onSelectPickup={(req: PickupRequest) => {
            if (onComponentChange) onComponentChange('PICKUP_DETAILS', { pickup: req });
            onTriggerAction(
              lang === 'mr'
                ? `${req.customerName} चे पिकअप तपशील दाखव`
                : lang === 'hi'
                ? `${req.customerName} के पिकअप विवरण दिखाओ`
                : `Show pickup details for ${req.customerName}`
            );
          }}
        />
      );

    case 'VIEW_FULL_DASHBOARD':
    case 'FULL_DASHBOARD':
      return (
        <FullDashboard
          lang={lang}
          onOpenScale={() => {
            if (onComponentChange) onComponentChange('DIGITAL_WEIGHING');
            onTriggerAction(
              lang === 'mr'
                ? 'कचरा वजन करा'
                : lang === 'hi'
                ? 'कबाड़ का वजन करें'
                : 'Open digital scale'
            );
          }}
          onOpenBatch={() => {
            if (onComponentChange) onComponentChange('BATCH_CREATION');
            onTriggerAction(
              lang === 'mr'
                ? 'नवीन bulk scrap batches दाखवा'
                : lang === 'hi'
                ? 'नए bulk scrap batches दिखाओ'
                : 'Create bulk scrap bale / batch'
            );
          }}
          onViewPickups={() => {
            if (onComponentChange) onComponentChange('REQUEST_LIST');
            onTriggerAction(
              lang === 'mr'
                ? 'माझ्या जवळचे pickups दाखव'
                : lang === 'hi'
                ? 'मेरे पास के pickups दिखाओ'
                : 'Show pickups near me'
            );
          }}
        />
      );

    case 'SELL_SCRAP':
    case 'CREATE_PICKUP_REQUEST':
    case 'SELL_SCRAP_WORKFLOW':
      return (
        <SellScrapWorkflow
          lang={lang}
          initialCategory={componentData?.initialCategory}
          onBookingComplete={() => {
            if (onComponentChange) onComponentChange('PICKUP_MAP');
            onTriggerAction(
              lang === 'mr'
                ? 'माझा pickup कुठे आहे?'
                : lang === 'hi'
                ? 'मेरा pickup कहाँ है?'
                : 'Where is my pickup?'
            );
          }}
        />
      );

    case 'MATERIAL_DETECTION':
      return (
        <MaterialDetection
          lang={lang}
          imageSrc={componentData?.imageSrc}
          fileName={componentData?.fileName}
          onAddToPickup={(mat: DetectedMaterial) => {
            if (onComponentChange) onComponentChange('SELL_SCRAP', { detected: mat });
            onTriggerAction(
              lang === 'mr'
                ? 'मला pickup book करायचा आहे'
                : lang === 'hi'
                ? 'मुझे pickup book करना है'
                : 'Book scrap pickup'
            );
          }}
          onOpenScale={() => {
            if (onComponentChange) onComponentChange('DIGITAL_WEIGHING');
            onTriggerAction(
              lang === 'mr'
                ? 'कचरा वजन करा'
                : lang === 'hi'
                ? 'कबाड़ का वजन करें'
                : 'Open digital scale'
            );
          }}
        />
      );

    case 'RECORD_WEIGHT':
    case 'COMPLETE_PICKUP':
    case 'DIGITAL_WEIGHING':
      return (
        <DigitalWeighing
          lang={lang}
          onGenerateReceipt={async (items: WeighedItem[]) => {
            const totalWeight = items.reduce((acc, i) => acc + (i.weightKg || 0), 0);
            const totalAmount = items.reduce((acc, i) => acc + (i.subtotal || i.amount || 0), 0);
            try {
              await recordWeight('PKP-CURRENT', items);
              await createReceipt({
                pickupId: 'PKP-CURRENT',
                customerName: 'Anand Deshmukh',
                collectorName: 'Ramesh Shinde',
                collectorId: 'COL-001',
                items,
                totalWeight,
                totalAmount,
                paymentMode: 'UPI',
                paymentStatus: 'COMPLETED',
                scaleBluetoothId: 'TaraScale-BT-402',
                qrVerificationHash: `SHA256-RCP-${Date.now()}`,
              });
            } catch (err) {
              console.warn('Firebase receipt record notice:', err);
            }
            if (onComponentChange) onComponentChange('DIGITAL_RECEIPT', { items });
            onTriggerAction(
              lang === 'mr'
                ? 'पावती दाखवा'
                : lang === 'hi'
                ? 'रसीद दिखाओ'
                : 'Show digital receipt'
            );
          }}
        />
      );

    case 'CREATE_RECEIPT':
    case 'DIGITAL_RECEIPT':
      return (
        <DigitalReceipt
          lang={lang}
          items={componentData?.items}
          onPaymentSuccess={() => {
            if (onComponentChange) onComponentChange('EARNINGS');
            onTriggerAction(
              lang === 'mr'
                ? 'माझी आजची कमाई किती?'
                : lang === 'hi'
                ? 'मेरी आज की कमाई कितनी है?'
                : 'Show my earnings'
            );
          }}
        />
      );

    case 'VIEW_EARNINGS':
    case 'EARNINGS':
    case 'EARNINGS_CARD':
      return (
        <EarningsCard
          lang={lang}
          onViewDashboard={() => {
            if (onComponentChange) onComponentChange('FULL_DASHBOARD');
            onTriggerAction(
              lang === 'mr'
                ? 'माझा पूर्ण dashboard दाखव'
                : lang === 'hi'
                ? 'मेरा पूरा dashboard दिखाओ'
                : 'Show my full dashboard'
            );
          }}
        />
      );

    case 'CREATE_BATCH':
    case 'BATCH_CREATION':
      return (
        <BatchCreation
          lang={lang}
          onBatchCreated={(batch: BatchItem) => {
            if (onComponentChange) onComponentChange('RECYCLER_MATCHING', { batch });
            onTriggerAction(
              lang === 'mr'
                ? 'Verified recycler matching'
                : lang === 'hi'
                ? 'Verified recycler matching'
                : 'Find verified recycler matching'
            );
          }}
          onMatchRecycler={(batchId: string) => {
            if (onComponentChange) onComponentChange('RECYCLER_MATCHING', { batchId });
            onTriggerAction(
              lang === 'mr'
                ? 'Verified recycler matching'
                : lang === 'hi'
                ? 'Verified recycler matching'
                : 'Find verified recycler matching'
            );
          }}
        />
      );

    case 'VIEW_BATCH':
    case 'RECEIVE_BATCH':
    case 'BATCH_DETAILS':
      return (
        <BatchDetails
          lang={lang}
          batch={componentData?.batch}
          onMatchRecycler={() => {
            if (onComponentChange) onComponentChange('RECYCLER_MATCHING', componentData);
            onTriggerAction(
              lang === 'mr'
                ? 'Verified recycler matching'
                : lang === 'hi'
                ? 'Verified recycler matching'
                : 'Find verified recycler matching'
            );
          }}
          onViewTraceability={() => {
            if (onComponentChange) onComponentChange('TRACEABILITY', componentData);
            onTriggerAction(
              lang === 'mr'
                ? 'Traceability manifest तपासणी'
                : lang === 'hi'
                ? 'ट्रेसेबिलिटी मैनिफेस्ट जांच'
                : 'Audit traceability manifest'
            );
          }}
        />
      );

    case 'RECYCLER_MATCHING':
      return (
        <RecyclerMatching
          lang={lang}
          batchWeightKg={componentData?.batchWeightKg || 420}
          onOfferAccepted={(offer: RecyclerOffer) => {
            if (onComponentChange) onComponentChange('TRACEABILITY', { offer });
            onTriggerAction(
              lang === 'mr'
                ? 'Traceability manifest तपासणी'
                : lang === 'hi'
                ? 'ट्रेसेबिलिटी मैनिफेस्ट जांच'
                : 'Audit traceability manifest'
            );
          }}
        />
      );

    case 'TRACK_PICKUP':
    case 'VIEW_TRACEABILITY':
    case 'TRACEABILITY':
    case 'TRACEABILITY_TIMELINE':
      return (
        <TraceabilityTimeline
          lang={lang}
          steps={componentData?.steps}
          batchId={componentData?.batchId || componentData?.batch?.batchId || componentData?.batch?.id}
        />
      );

    case 'VIEW_REGULATORY_ANALYTICS':
    case 'VIEW_FACILITY_RISK':
    case 'FACILITY_RISK':
    case 'REGULATORY_ANALYTICS':
      return <RegulatoryAnalytics lang={lang} />;


    default:
      console.warn(`[DynamicWorkspace] Unknown activeComponent: ${activeComponent}`);
      return null;
  }
};
