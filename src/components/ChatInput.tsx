import React, { useState, useRef } from 'react';
import {
  Mic,
  MicOff,
  Image as ImageIcon,
  Send,
  Loader2,
  Plus,
  X,
  Camera,
  Layers,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { VoiceInputHelper } from '../utils/speech';

interface ChatInputProps {
  lang: Language;
  role: UserRole;
  isProcessing: boolean;
  onSendMessage: (text: string, imageSrc?: string, isVoice?: boolean) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  lang,
  role,
  isProcessing,
  onSendMessage,
}) => {
  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechLang, setSpeechLang] = useState<'mr-IN' | 'hi-IN' | 'en-US'>(
    lang === 'hi' ? 'hi-IN' : lang === 'en' ? 'en-US' : 'mr-IN'
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState<boolean>(false);
  const [voiceHelper] = useState(() => new VoiceInputHelper());

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync speechLang when UI language changes unless manually overridden
  React.useEffect(() => {
    setSpeechLang(lang === 'hi' ? 'hi-IN' : lang === 'en' ? 'en-US' : 'mr-IN');
  }, [lang]);

  const placeholders: Record<Language, string> = {
    mr: 'KabadiwalaGPT ला काहीही विचारा किंवा बोला (उदा. "आनंद देशमुख पिकअप स्वीकारा")...',
    hi: 'KabadiwalaGPT से कुछ भी पूछें या बोलें (उदा. "आनंद देशमुख का पिकअप स्वीकार करो")...',
    en: 'Ask KabadiwalaGPT anything (e.g. "Accept Anand Deshmukh pickup", "Open dashboard")...',
  };

  const handleSend = () => {
    if ((!text.trim() && !selectedImage) || isProcessing) return;
    onSendMessage(text.trim(), selectedImage || undefined, false);
    setText('');
    setSelectedImage(null);
    setShowAttachmentMenu(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  const toggleListening = () => {
    if (isListening) {
      voiceHelper.stopListening();
      setIsListening(false);
      return;
    }

    const started = voiceHelper.startListening(
      speechLang,
      (transcript, isFinal) => {
        setText(transcript);
        if (isFinal) {
          setIsListening(false);
          setTimeout(() => {
            if (transcript.trim()) {
              // Direct Intent Dispatching
              onSendMessage(transcript.trim(), undefined, true);
              setText('');
            }
          }, 300);
        }
      },
      (err) => {
        console.warn('Web Speech API fallback simulation', err);
        simulateVoiceInput();
      },
      () => {
        setIsListening(false);
      }
    );

    if (!started) {
      simulateVoiceInput();
    } else {
      setIsListening(true);
    }
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      const voiceSamples: Record<UserRole, Record<string, string>> = {
        kabadiwala: {
          'mr-IN': 'आनंद देशमुख पिकअप स्वीकारा',
          'hi-IN': 'आनंद देशमुख का पिकअप स्वीकार करो',
          'en-US': 'Accept Anand Deshmukh pickup',
        },
        household: {
          'mr-IN': 'माझा डॅशबोर्ड उघडा',
          'hi-IN': 'मेरा डैशबोर्ड खोलो',
          'en-US': 'Open my dashboard',
        },
        mover: {
          'mr-IN': 'आजच्या वाहतूक ट्रिप्स दाखवा',
          'hi-IN': 'आज के ट्रांसपोर्ट ट्रिप्स दिखाओ',
          'en-US': 'Show today assigned transit trips',
        },
        warehouse: {
          'mr-IN': 'गोदाम साठा आणि सॉर्टिंग दाखवा',
          'hi-IN': 'वेयरहाउस स्टॉक और सॉर्टिंग दिखाओ',
          'en-US': 'Show warehouse inventory streams',
        },
        recycler: {
          'mr-IN': 'नवीन प्रमाणित स्क्रॅप बॅचेस दाखवा',
          'hi-IN': 'नए प्रमाणित स्क्रैप बैचेस दिखाओ',
          'en-US': 'Show verified bulk scrap batches',
        },
        ngo: {
          'mr-IN': 'इको स्टोअर मधील अपसायकल वस्तू दाखवा',
          'hi-IN': 'इको स्टोर में अपसाइक्ड वस्तुएं दिखाएं',
          'en-US': 'Show eco store upcycled goods',
        },
        regulator: {
          'mr-IN': 'EPR compliance व लँडफिल अहवाल',
          'hi-IN': 'EPR compliance और लैंडफिल रिपोर्ट',
          'en-US': 'EPR compliance and landfill report',
        },
      };

      const sample =
        voiceSamples[role]?.[speechLang] ||
        voiceSamples['kabadiwala'][speechLang] ||
        'Accept Anand Deshmukh pickup';
      setText(sample);
      setIsListening(false);
      setTimeout(() => {
        // Direct intent dispatching
        onSendMessage(sample, undefined, true);
        setText('');
      }, 300);
    }, 1200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setShowAttachmentMenu(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-[#f7f3ff] via-[#f7f3ff]/95 to-transparent backdrop-blur-md border-t border-purple-200/70 px-3 sm:px-6 py-3 z-30">
      <div className="max-w-3xl mx-auto space-y-2">
        {/* Attached Photo Preview */}
        {selectedImage && (
          <div className="relative inline-block">
            <img
              src={selectedImage}
              alt="Scrap Preview"
              className="w-16 h-16 object-cover rounded-2xl border-2 border-purple-500 shadow-md"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors shadow-sm cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Web Speech API Language Switcher & Quick Voice Intent Chips Bar */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 px-1 py-0.5 text-[11px]">
          {/* Language Selector for Speech Recognition */}
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xs px-2 py-1 rounded-xl border border-purple-200/80 shadow-2xs">
            <span className="font-semibold text-purple-900 flex items-center gap-1">
              <Mic className="w-3 h-3 text-purple-600" />
              <span>Voice:</span>
            </span>
            {(['mr-IN', 'hi-IN', 'en-US'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setSpeechLang(code)}
                className={`px-1.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                  speechLang === code
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'text-purple-700 hover:bg-purple-100'
                }`}
              >
                {code === 'mr-IN' ? 'मराठी' : code === 'hi-IN' ? 'हिंदी' : 'English'}
              </button>
            ))}
          </div>

          {/* Quick Direct Voice Action Chips */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => onSendMessage('Accept Anand Deshmukh pickup', undefined, true)}
              className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              ⚡ Accept Anand Deshmukh
            </button>
            <button
              type="button"
              onClick={() => onSendMessage('How many pickups today?', undefined, true)}
              className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              📊 Today's Pickups
            </button>
            <button
              type="button"
              onClick={() => onSendMessage('Open my dashboard', undefined, true)}
              className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              🚀 Open Dashboard
            </button>
          </div>
        </div>

        {/* Live Audio Listening & Waveform Banner (Light Purple) */}
        {isListening && (
          <div className="p-3 bg-purple-100/90 border border-purple-300 rounded-2xl flex items-center justify-between text-xs text-purple-950 animate-in fade-in duration-150 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-purple-600 animate-ping" />
              <span className="font-bold">
                {lang === 'mr'
                  ? 'KabadiwalaGPT ऐकत आहे... बोला'
                  : lang === 'hi'
                  ? 'KabadiwalaGPT सुन रहा है... बोलिए'
                  : 'KabadiwalaGPT is listening... Speak your request'}
              </span>
              {/* Waveform graphic bars */}
              <div className="flex items-center gap-0.5 h-4 ml-2">
                <span className="w-1 bg-purple-500 h-2 animate-pulse" />
                <span className="w-1 bg-purple-600 h-4 animate-bounce" />
                <span className="w-1 bg-purple-500 h-3 animate-pulse" />
                <span className="w-1 bg-purple-600 h-2 animate-bounce" />
              </div>
            </div>
            <button
              onClick={() => setIsListening(false)}
              className="px-2 py-0.5 text-xs text-purple-700 hover:text-purple-900 font-semibold underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Attachment Context Menu Popover */}
        {showAttachmentMenu && (
          <div className="bg-white/95 backdrop-blur-md border border-purple-200 rounded-2xl p-2 shadow-xl shadow-purple-500/10 grid grid-cols-2 sm:grid-cols-3 gap-1.5 animate-in slide-in-from-bottom-2 duration-150">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-purple-50 text-slate-800 text-xs font-semibold text-left transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4 text-purple-600" />
              <span>Camera AI Scan</span>
            </button>
            <button
              onClick={() => {
                setText('मी घरातील तांबे आणि जुनी रद्दी विकू इच्छितो');
                setShowAttachmentMenu(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-purple-50 text-slate-800 text-xs font-semibold text-left transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Select Scrap</span>
            </button>
            <button
              onClick={() => {
                setText('माझ्या पत्त्यावर त्वरित पिकअप पाठवा (Aundh, Pune)');
                setShowAttachmentMenu(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-purple-50 text-slate-800 text-xs font-semibold text-left transition-colors cursor-pointer col-span-2 sm:col-span-1"
            >
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>Send GPS Pin</span>
            </button>
          </div>
        )}

        {/* Main Floating Input Bar (Light Purple focus & Glass effect) */}
        <div className="relative flex items-end gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-md hover:bg-white focus-within:bg-white rounded-3xl p-2 border border-purple-200/90 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/15 shadow-sm shadow-purple-500/5 transition-all duration-200">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Plus / Attachment Menu Button */}
          <button
            type="button"
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            title="Attach scrap photo or quick action"
            className={`p-2.5 rounded-full transition-colors flex items-center justify-center shrink-0 cursor-pointer ${
              showAttachmentMenu
                ? 'bg-purple-100 text-purple-900 rotate-45'
                : 'text-purple-600/70 hover:text-purple-900 hover:bg-purple-50'
            }`}
          >
            <Plus className="w-4 h-4 transition-transform" />
          </button>

          {/* Photo quick attach button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Upload scrap photo for instant AI classification"
            className="p-2.5 rounded-full text-purple-600/70 hover:text-purple-900 hover:bg-purple-50 transition-colors flex items-center justify-center shrink-0 cursor-pointer hidden sm:flex"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[lang]}
            className="flex-1 max-h-32 min-h-[38px] py-2 px-1 text-xs sm:text-sm bg-transparent resize-none border-0 focus:outline-none text-slate-900 placeholder:text-purple-400 font-sans"
          />

          {/* Voice Microphone */}
          <button
            type="button"
            onClick={toggleListening}
            title={isListening ? 'Stop listening' : 'Speak with AI voice'}
            className={`p-2.5 rounded-full transition-all flex items-center justify-center shrink-0 cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-md ring-2 ring-rose-300'
                : 'text-purple-600/80 hover:text-purple-900 hover:bg-purple-100'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={(!text.trim() && !selectedImage) || isProcessing}
            className={`p-2.5 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              (text.trim() || selectedImage) && !isProcessing
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-sm shadow-purple-500/30 active:scale-95'
                : 'bg-purple-100 text-purple-300 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        <p className="text-[11px] text-purple-600/70 text-center font-medium">
          KabadiwalaGPT Circular OS • Light Purple Edition
        </p>
      </div>
    </div>
  );
};
