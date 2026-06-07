import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { cs } from '../i18n/cs'
import { en } from '../i18n/en'
import type { Translations } from '../i18n/cs'

type Language = 'cs' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Translations> = { cs, en }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('cs')
  const t = translations[language]
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider')
  return ctx
}
