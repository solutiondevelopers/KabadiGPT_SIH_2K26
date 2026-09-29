import React from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import { UserRole, Language, SupportedRole } from '../types';

interface SuggestedPromptsProps {
  role: UserRole;
  lang: Language;
  isOnboarding?: boolean;
  onSelectPrompt: (promptText: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  role,
  lang,
  isOnboarding,
  onSelectPrompt,
}) => {
  if (isOnboarding) {
    const onboardingChoices: Record<SupportedRole, Record<Language, string>> = {
      HOUSEHOLD: {
        mr: 'मी घरातून कबाड विकतो',
        hi: 'मैं घर से कबाड़ बेचता हूँ',
        en: 'I sell scrap from household',
      },
      KABADIWALA: {
        mr: 'मी कबाडीवाला आहे',
        hi: 'मैं कबाड़ीवाला हूँ',
        en: 'I am a kabadiwala (Collector)',
      },
      MOVER: {
        mr: 'मी वाहतूकदार / मूव्हर आहे',
        hi: 'मैं ट्रांसपोर्टर / मूवर हूँ',
        en: 'I am a mover / transporter',
      },
      WAREHOUSE: {
        mr: 'मी गोदाम / MRF ऑपरेटर आहे',
        hi: 'मैं वेयरहाउस / MRF ऑपरेटर हूँ',
        en: 'I manage a warehouse / MRF',
      },
      RECYCLER: {
        mr: 'मी अधिकृत recycler आहे',
        hi: 'मैं अधिकृत recycler हूँ',
        en: 'I am an authorized recycler',
      },
      NGO: {
        mr: 'मी एनजीओ / सामाजिक संस्था आहे',
        hi: 'मैं NGO / सामाजिक संगठन हूँ',
        en: 'I represent an NGO / Social Partner',
      },
      GOVERNMENT: {
        mr: 'मी government / regulator officer आहे',
        hi: 'मैं government / regulator officer हूँ',
        en: 'I am a government officer',
      },
    };

    const rolesList: SupportedRole[] = [
      'HOUSEHOLD',
      'KABADIWALA',
      'MOVER',
      'WAREHOUSE',
      'RECYCLER',
      'NGO',
      'GOVERNMENT',
    ];

    return (
      <div className="py-2 animate-in fade-in duration-300">
        <div className="flex items-center gap-1.5 text-xs text-purple-700/80 font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>
            {lang === 'mr'
              ? 'खालीलपैकी तुमची भूमिका निवडा:'
              : lang === 'hi'
              ? 'अपनी भूमिका चुनें:'
              : 'Choose your account role:'}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {rolesList.map((supRole) => {
            const label = onboardingChoices[supRole][lang];
            return (
              <button
                key={supRole}
                onClick={() => onSelectPrompt(label)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 hover:bg-purple-100/80 hover:border-purple-300 border border-purple-200/90 text-purple-950 shadow-2xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const promptData: Record<UserRole, Record<Language, string[]>> = {
    household: {
      mr: [
        'माझा जुना टीव्ही विकायचा आहे',
        '५ किलो रद्दी आणि प्लास्टिक भाव किती?',
        'माझा पिकअप सध्या कुठे आहे?',
        'इको स्टोअर मधील अपसायकल वस्तू दाखवा',
      ],
      hi: [
        'पुराना टीवी बेचना है',
        '5 किलो रद्दी और प्लास्टिक का क्या भाव है?',
        'मेरा पिकअप कहाँ तक पहुँचा है?',
        'इको स्टोर में अपसाइक्ड वस्तुएं दिखाएं',
      ],
      en: [
        'Sell my old TV and 5kg paper',
        'Check today spot scrap rates',
        'Track my active doorstep pickup',
        'Browse eco store and upcycled crafts',
      ],
    },
    kabadiwala: {
      mr: [
        'आज किती pickup आहेत?',
        'माझ्या जवळचे pickup दाखव',
        'पहिली request accept कर',
        'मी pickup वर पोहोचलो',
      ],
      hi: [
        'आज कितने pickup हैं?',
        'मेरे नजदीकी pickup दिखाओ',
        'पहला request accept करो',
        'मैं pickup पर पहुँच गया',
      ],
      en: [
        'How many pickup requests today?',
        'Show pickups near me',
        'Accept pickup request',
        'Start IoT scale weighing',
      ],
    },
    mover: {
      mr: [
        'आजच्या वाहतूक ट्रिप्स दाखवा',
        'बॅच हँडओव्हर ओटीपी पडताळा',
      ],
      hi: [
        'आज के ट्रांसपोर्ट ट्रिप्स दिखाओ',
        'बैच हैंडओवर ओटीपी सत्यापित करें',
      ],
      en: [
        'Show today assigned transit trips',
        'Verify batch handover OTP',
      ],
    },
    warehouse: {
      mr: [
        'गोदाम साठा आणि सॉर्टिंग दाखवा',
        'गेट वजन पडताळणी तपासा',
      ],
      hi: [
        'वेयरहाउस स्टॉक और सॉर्टिंग दिखाओ',
        'गेट वजन मिलान जांचें',
      ],
      en: [
        'Show warehouse streams',
        'Check gate weight reconciliation',
      ],
    },
    recycler: {
      mr: [
        'माझे incoming batches दाखव.',
        'Verified recycler matching',
      ],
      hi: [
        'मेरे incoming batches दिखाओ',
        'Verified recycler matching',
      ],
      en: [
        'Show my incoming batches',
        'Find verified recycler matching',
      ],
    },
    ngo: {
      mr: [
        'इको स्टोअर मधील अपसायकल वस्तू दाखवा',
        'साहित्य वाटप व पुनर्वसन अहवाल',
      ],
      hi: [
        'इको स्टोर में अपसाइक्ड वस्तुएं दिखाएं',
        'सामग्री आवंटन व पुनर्वास रिपोर्ट',
      ],
      en: [
        'Show eco store upcycled goods',
        'Track material allocations for rehabilitation',
      ],
    },
    regulator: {
      mr: [
        'EPR compliance summary',
        'City-wide waste diversion analytics',
      ],
      hi: [
        'EPR compliance summary',
        'City-wide waste diversion analytics',
      ],
      en: [
        'EPR compliance summary',
        'City-wide waste diversion analytics',
      ],
    },
  };

  const prompts = promptData[role]?.[lang] || promptData[role]?.mr || promptData['household'].en;

  return (
    <div className="py-2">
      <div className="flex items-center gap-1.5 text-xs text-purple-700/80 font-medium mb-2">
        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
        <span>
          {lang === 'mr'
            ? 'सुचवलेले प्रश्न व क्रिया:'
            : lang === 'hi'
            ? 'सुझाए गए प्रश्न:'
            : 'Suggested Actions:'}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {prompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/90 hover:bg-purple-100/90 hover:border-purple-300 hover:text-purple-950 border border-purple-200/90 text-purple-950 shadow-2xs transition-all hover:scale-[1.01] active:scale-95 cursor-pointer text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
