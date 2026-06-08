import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#story', label: t.nav.story },
    { href: '#travel', label: t.nav.travel },
    { href: '#dresscode', label: t.nav.dressCode },
    { href: '#info', label: t.nav.info },
    { href: '#transport', label: t.nav.transport },
    { href: '#contact', label: t.nav.contact },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Names */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-serif text-xl md:text-2xl text-gold tracking-widest hover:opacity-75 transition-opacity"
          >
            T&amp;T
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-widest text-charcoal hover:text-gold transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language switch + hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop: pill switcher */}
            <div
              className="hidden md:flex items-center rounded-full p-0.5"
              style={{
                background: 'rgba(196, 180, 154, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(196, 180, 154, 0.4)',
              }}
            >
              <button onClick={() => setLanguage('cs')} className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 ${language === 'cs' ? 'bg-gold text-white shadow-sm' : 'text-charcoal hover:text-gold'}`}>CZ</button>
              <button onClick={() => setLanguage('en')} className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 ${language === 'en' ? 'bg-gold text-white shadow-sm' : 'text-charcoal hover:text-gold'}`}>EN</button>
            </div>

            {/* Mobile: globe icon with dropdown */}
            <div className="md:hidden relative">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="w-8 h-8 flex items-center justify-center text-gold"
                aria-label="Switch language"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9"/>
                  <path d="M3.6 9h16.8M3.6 15h16.8"/>
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-10 rounded-2xl overflow-hidden shadow-lg z-50 flex flex-col min-w-[140px]"
                  style={{ background: 'rgba(250,248,245,0.97)', border: '1px solid rgba(196,180,154,0.35)', backdropFilter: 'blur(12px)' }}
                >
                  {(['cs', 'en'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangOpen(false) }}
                      className={`px-6 py-3 text-sm uppercase tracking-widest transition-colors text-left ${language === lang ? 'text-gold font-semibold' : 'text-charcoal/60 hover:text-gold font-medium'}`}
                    >
                      {lang === 'cs' ? 'Čeština' : 'English'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-btn"
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-400 overflow-hidden ${
            mobileOpen ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1 bg-cream/98 rounded-2xl p-4 shadow-lg border border-sage/10">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm uppercase tracking-widest text-charcoal hover:text-gold hover:bg-sage/5 transition-all rounded-lg px-4 py-3 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
