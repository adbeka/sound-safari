// Language Context - Provides language state and translations throughout the app
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, soundTranslations, Language, Translations, SoundTranslations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  getSoundTranslation: (soundId: string) => SoundTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const getSoundTranslation = (soundId: string): SoundTranslations => {
    return soundTranslations[language][soundId] || soundTranslations['en'][soundId] || {
      displayName: soundId,
      description: ''
    };
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
    getSoundTranslation
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
