import React from 'react';
import {
  Recycle,
  User,
  Volume2,
  Mic,
  Sparkles,
} from 'lucide-react';
import {
  ChatMessage as ChatMessageType,
  Language,
  ActiveComponentType,
  SupportedRole,
  KycStatus,
  UserRole,
} from '../types';
import { speakText } from '../utils/speech';
import { DynamicWorkspace } from './DynamicWorkspace';
import { RoleOnboardingWorkflow } from './RoleOnboardingWorkflow';

interface ChatMessageProps {
  message: ChatMessageType;
  lang: Language;
  role: UserRole;
  onTriggerAction: (actionText: string) => void;
  onComponentChange?: (component: ActiveComponentType | string, data?: any) => void;
  onCompleteOnboarding?: (role: SupportedRole, kycStatus: KycStatus, details: Record<string, any>) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  lang,
  role,
  onTriggerAction,
  onComponentChange,
  onCompleteOnboarding,
}) => {
  const isUser = message.sender === 'user';

  const handleSpeak = () => {
    speakText(message.text, lang);
  };

  return (
    <div
      className={`py-2 flex gap-3 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Bot Avatar on Left for AI */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs shadow-purple-500/20 text-xs font-bold">
          AI
        </div>
      )}

      {/* Message Body & Embedded Workspace Card */}
      <div className={`max-w-[92%] sm:max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* User image preview if user attached one */}
        {isUser && message.imageAttachment && (
          <div className="mb-2 flex justify-end">
            <img
              src={message.imageAttachment}
              alt="User upload"
              className="w-48 sm:w-60 h-36 sm:h-44 object-cover rounded-2xl border-2 border-purple-500 shadow-md shadow-purple-500/15"
            />
          </div>
        )}

        {/* Text bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white rounded-br-xs shadow-md shadow-purple-500/15'
              : 'bg-white/95 backdrop-blur-md border border-purple-200/90 text-slate-800 rounded-bl-xs shadow-sm shadow-purple-500/5'
          }`}
        >
          {isUser && message.isVoice && (
            <div className="flex items-center gap-1 text-[11px] text-purple-200 font-medium mb-1">
              <Mic className="w-3 h-3" />
              <span>Voice Note</span>
            </div>
          )}

          <div className="whitespace-pre-wrap font-sans">{message.text}</div>

          {/* Timestamp & Speak button on AI message */}
          <div
            className={`flex items-center gap-2 mt-1.5 text-[10px] ${
              isUser ? 'text-purple-200 justify-end' : 'text-purple-400 justify-start'
            }`}
          >
            <span>{message.timestamp}</span>
            {!isUser && (
              <button
                onClick={handleSpeak}
                className="hover:text-purple-800 flex items-center gap-0.5 transition-colors p-0.5 cursor-pointer text-purple-600 font-semibold"
                title="Read aloud"
              >
                <Volume2 className="w-3 h-3" />
                <span className="text-[9px]">Speak</span>
              </button>
            )}
          </div>
        </div>

        {/* KYC Onboarding Form if AI triggered it */}
        {message.onboardingRole && onCompleteOnboarding && (
          <div className="mt-3">
            <RoleOnboardingWorkflow
              role={message.onboardingRole}
              lang={lang}
              onComplete={(status, details) => {
                if (message.onboardingRole) {
                  onCompleteOnboarding(message.onboardingRole, status, details);
                }
              }}
            />
          </div>
        )}

        {/* Embedded Dynamic Interactive Component Card */}
        {message.workflow && (
          <div className="mt-3">
            <DynamicWorkspace
              activeComponent={message.workflow.type}
              componentData={message.workflow.data}
              lang={lang}
              role={role}
              onTriggerAction={onTriggerAction}
              onComponentChange={onComponentChange}
            />
          </div>
        )}
      </div>

      {/* User Avatar on Right */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs shadow-xs">
          <User className="w-4 h-4 text-slate-200" />
        </div>
      )}
    </div>
  );
};
