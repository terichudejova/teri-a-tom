import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  //comment

  return (
    <footer className="bg-charcoal text-white/60 py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-serif text-3xl text-white/90 tracking-widest mb-2">Teri & Tom</p>
        <div className="w-8 h-px bg-gold/40 mx-auto mb-5" />
        <p className="text-white/50 text-base font-light mt-1">
          {t.footer.seeYou}
        </p>
        <p className="mt-6 text-white/25 text-xs tracking-wider">
          Podlešanský mlýn · Lešany 29 · 5.9.2026
        </p>
        <p className="mt-2 text-xs tracking-wider">© Teri Chudějová, 2026</p>
      </div>
    </footer>
  )
}
