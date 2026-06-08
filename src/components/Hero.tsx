import { useLanguage } from '../context/LanguageContext'
import { useCountdown } from '../hooks/useCountdown'
import { FlowerRow } from './Decorations'
import WildflowerMeadow from './WildflowerMeadow'
import { useRef, useEffect, useState } from 'react'

function MobileRevealPhoto({ src, alt, caption, objectY = '50%' }: { src: string; alt: string; caption: string; objectY?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Trigger strictly when the top edge reaches the bottom of the sticky header (64px on mobile)
      const triggerPoint = 64
      setVisible(rect.top <= triggerPoint && rect.bottom > triggerPoint)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <div ref={ref} className="w-full md:flex-1 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer h-[60vw] md:h-full">
      <img src={src} alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition: `50% ${objectY}` }}
      />
      <div className="absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
        style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <p className="text-white text-base font-light tracking-wide text-center px-6 drop-shadow">{caption}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 md:hidden"
        style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', opacity: visible ? 1 : 0 }}>
        <p className="text-white text-sm font-light tracking-wide text-center px-6 drop-shadow">{caption}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const { days, hours, minutes } = useCountdown()

  const photos = [
    { src: `${import.meta.env.BASE_URL}assets/landing-page-1.jpg`, alt: 'Teri & Tom - foto 1' },
    { src: `${import.meta.env.BASE_URL}assets/landing-page-2.JPG`, alt: 'Teri & Tom - foto 2' },
    { src: `${import.meta.env.BASE_URL}assets/landing-page-3.JPG`, alt: 'Teri & Tom - foto 3' },
  ]

  return (
    <section id="hero" className="relative min-h-screen bg-cream overflow-hidden">

      {/* ── Layered illustrated mountains – top area ── */}
      <div className="absolute top-0 left-0 right-0 w-full pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Layer 1 – distant peaks, warm beige */}
          <path
            d="M 0 380 L 0 200
               L 150 200 L 250 140 L 400 240
               L 550 80 L 750 210
               L 950 130 L 1200 50 L 1350 180 
               L 1440 140
               L 1440 380 Z"
            fill="#c3b39dff"
            opacity="0.28"
          />
          {/* Layer 2 – mid peaks, warm sage-brown */}
          <path
            d="M 0 380 L 0 250
               L 100 250 L 230 180 L 380 280
               L 620 160 L 820 290
               L 1080 150 L 1280 270 
               L 1440 220
               L 1440 380 Z"
            fill="#968671ff"
            opacity="0.30"
          />
          {/* Layer 3 – foreground ridges, forest green */}
          <path
            d="M 0 380 L 0 300
               L 200 300 L 360 260 L 520 320
               L 780 240 L 980 330
               L 1220 280 L 1400 340
               L 1440 320
               L 1440 380 Z"
            fill="#a9c1b3ff"
            opacity="0.45"
          />
        </svg>
        {/* Ombré fade into background */}
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-cream to-transparent" />
      </div>

      {/* ── Teri & Tom — overlapping mountains ── */}
      <div
        className="absolute left-0 right-0 z-20 flex justify-center items-end pointer-events-none"
        style={{ top: '4rem', height: 'calc(29vw - 2rem)' }}
      >
        <div className="text-center pb-4 mb-10 -translate-y-[3px]">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal tracking-[0.15em] animate-fade-in-up">
            {t.hero.names}
          </h1>
        </div>
      </div>

      {/* ── Content below mountains ── */}
      <div className="relative z-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" style={{ paddingTop: 'calc(29vw + 2rem)' }}>
        <FlowerRow className="relative z-10 opacity-70 -mt-8 mb-2 md:mt-0 md:mb-8 scale-[1.2] md:scale-100" />
        {/* Tagline + date + location */}
        <div className="text-center mb-10 md:mb-14 mt-0">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-gold/50" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold/70 font-medium animate-fade-in">
              {t.hero.tagline}
            </span>
            <div className="w-10 h-px bg-gold/50" />
          </div>
          <p className="text-charcoal/70 text-lg tracking-widest uppercase font-light">
            {t.hero.date} · {t.hero.time}
          </p>
          <p className="text-charcoal/50 text-sm tracking-wider mt-1 font-light">
            {t.hero.location}
          </p>
        </div>

        {/* 3-photo gallery */}
        {/* 3-photo gallery */}
        <div className="flex flex-col md:flex-row gap-3 md:h-[55vh] lg:h-[60vh] max-w-4xl mx-auto mb-16 md:mb-20">
          <MobileRevealPhoto src={photos[0].src} alt={photos[0].alt} caption={t.hero.photoCaptions[0]} />
          <MobileRevealPhoto src={photos[1].src} alt={photos[1].alt} caption={t.hero.photoCaptions[1]} objectY="65%" />
          <MobileRevealPhoto src={photos[2].src} alt={photos[2].alt} caption={t.hero.photoCaptions[2]} objectY="60%" />
        </div>

        {/* Countdown */}
        <div className="text-center mt-4 mb-10">
          <p className="text-charcoal/40 text-xs uppercase tracking-widest mb-8 font-medium">
            {t.hero.countdown.until}
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-14">
            {[
              { value: days, label: t.hero.countdown.days },
              { value: hours, label: t.hero.countdown.hours },
              { value: minutes, label: t.hero.countdown.minutes },
            ].map(({ value, label }, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-5xl md:text-7xl text-gold leading-none">
                  {String(value).padStart(2, '0')}
                </div>
                <div className="text-charcoal/50 text-xs uppercase tracking-widest mt-2 font-medium">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Wildflower meadow growing from bottom edge ── */}
      <WildflowerMeadow className="h-[280px] md:h-[140px]" />
    </section>
  )
}

