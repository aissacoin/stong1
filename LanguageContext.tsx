
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, TRANSLATIONS } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('st_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('st_lang', language);
    const translation = TRANSLATIONS[language];
    if (translation) {
      document.documentElement.dir = translation.dir || 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  // محرك الترجمة الذكي
  const t = useMemo(() => {
    const base = TRANSLATIONS[language] || TRANSLATIONS['en'];
    
    // وظيفة لمعالجة ترجمات الأدوات ديناميكياً
    // We assume the tool structure in TRANSLATIONS is already language-specific
    // as per the new translations.ts definition
    return base;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
