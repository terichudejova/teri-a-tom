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
            d="M 0 380 L 0 240.0 L 0.0 240.0 L 16.7 230.1 L 33.3 221.0 L 50.0 211.1 L 66.7 199.4 L 83.3 189.6 L 100.0 177.3 L 115.0 181.4 L 130.0 186.8 L 145.0 189.5 L 160.0 194.1 L 175.0 185.7 L 190.0 171.2 L 205.0 163.1 L 220.0 151.5 L 235.0 143.5 L 250.0 141.1 L 265.0 151.6 L 280.0 163.4 L 295.0 176.5 L 310.0 177.9 L 325.0 185.2 L 340.0 194.7 L 355.0 199.8 L 370.0 217.7 L 385.0 234.7 L 400.0 244.6 L 415.0 235.1 L 430.0 213.4 L 445.0 188.4 L 460.0 173.6 L 475.0 151.0 L 490.0 138.8 L 505.0 134.3 L 520.0 114.9 L 535.0 106.0 L 550.0 89.3 L 565.4 85.5 L 580.8 94.3 L 596.2 101.2 L 611.5 107.3 L 626.9 132.7 L 642.3 141.9 L 657.7 155.6 L 673.1 169.0 L 688.5 164.5 L 703.8 172.8 L 719.2 181.4 L 734.6 187.0 L 750.0 209.4 L 765.4 207.4 L 780.8 202.8 L 796.2 202.5 L 811.5 184.9 L 826.9 172.5 L 842.3 167.3 L 857.7 154.3 L 873.1 159.8 L 888.5 157.3 L 903.8 151.8 L 919.2 152.4 L 934.6 137.6 L 950.0 126.8 L 965.6 122.1 L 981.2 110.4 L 996.9 112.0 L 1012.5 115.3 L 1028.1 110.0 L 1043.8 111.0 L 1059.4 98.5 L 1075.0 85.7 L 1090.6 81.4 L 1106.2 72.7 L 1121.9 73.8 L 1137.5 74.7 L 1153.1 68.1 L 1168.8 68.4 L 1184.4 56.9 L 1200.0 48.6 L 1215.0 62.2 L 1230.0 71.0 L 1245.0 86.5 L 1260.0 104.7 L 1275.0 117.1 L 1290.0 131.7 L 1305.0 143.4 L 1320.0 152.7 L 1335.0 166.3 L 1350.0 177.8 L 1365.0 171.6 L 1380.0 166.7 L 1395.0 160.2 L 1410.0 153.6 L 1425.0 147.1 L 1440.0 140.0 L 1440 380 Z"
            fill="#c3b39dff"
            opacity="0.28"
          />
          {/* Layer 2 – mid peaks, warm sage-brown */}
          <path
            d="M 0 380 L 0 280.0 L 0.0 280.0 L 16.0 271.1 L 32.0 262.6 L 48.0 253.8 L 64.0 243.6 L 80.0 234.8 L 97.5 235.6 L 115.0 239.5 L 132.5 243.6 L 150.0 246.4 L 166.0 235.4 L 182.0 219.0 L 198.0 203.9 L 214.0 190.7 L 230.0 174.2 L 245.0 189.9 L 260.0 201.9 L 275.0 211.9 L 290.0 226.7 L 305.0 232.7 L 320.0 238.0 L 335.0 247.5 L 350.0 253.3 L 365.0 266.5 L 380.0 284.2 L 395.0 276.7 L 410.0 272.3 L 425.0 263.1 L 440.0 248.1 L 455.0 240.3 L 470.0 228.5 L 485.0 217.0 L 500.0 220.2 L 515.0 213.8 L 530.0 210.5 L 545.0 205.2 L 560.0 187.7 L 575.0 176.7 L 590.0 170.7 L 605.0 155.7 L 620.0 159.5 L 635.4 174.5 L 650.8 185.1 L 666.2 200.7 L 681.5 203.7 L 696.9 207.4 L 712.3 219.0 L 727.7 219.9 L 743.1 236.3 L 758.5 254.7 L 773.8 264.0 L 789.2 281.2 L 804.6 287.1 L 820.0 287.1 L 835.3 279.3 L 850.6 264.5 L 865.9 259.7 L 881.2 261.3 L 896.5 252.1 L 911.8 250.3 L 927.1 240.2 L 942.4 219.6 L 957.6 213.8 L 972.9 201.7 L 988.2 190.7 L 1003.5 193.8 L 1018.8 184.0 L 1034.1 180.1 L 1049.4 172.4 L 1064.7 156.8 L 1080.0 146.6 L 1095.4 155.0 L 1110.8 160.1 L 1126.2 177.6 L 1141.5 189.5 L 1156.9 198.0 L 1172.3 210.3 L 1187.7 214.4 L 1203.1 220.7 L 1218.5 229.9 L 1233.8 236.7 L 1249.2 250.7 L 1264.6 262.6 L 1280.0 271.5 L 1296.0 268.5 L 1312.0 260.0 L 1328.0 253.5 L 1344.0 248.9 L 1360.0 242.8 L 1376.0 239.6 L 1392.0 235.2 L 1408.0 230.3 L 1424.0 225.4 L 1440.0 220.0 L 1440 380 Z"
            fill="#968671ff"
            opacity="0.30"
          />
          {/* Layer 3 – foreground ridges, forest green */}
          <path
            d="M 0 380 L 0 300.0 L 0.0 300.0 L 33.3 300.2 L 66.7 300.1 L 100.0 299.7 L 133.3 297.7 L 166.7 300.8 L 200.0 302.6 L 232.0 291.4 L 264.0 283.7 L 296.0 272.8 L 328.0 270.9 L 360.0 266.3 L 392.0 269.4 L 424.0 280.4 L 456.0 291.8 L 488.0 311.0 L 520.0 327.1 L 552.5 308.5 L 585.0 297.7 L 617.5 289.0 L 650.0 281.9 L 682.5 275.5 L 715.0 255.0 L 747.5 245.3 L 780.0 241.6 L 813.3 258.1 L 846.7 274.8 L 880.0 283.4 L 913.3 293.6 L 946.7 319.1 L 980.0 332.9 L 1010.0 325.1 L 1040.0 315.5 L 1070.0 306.7 L 1100.0 307.8 L 1130.0 299.9 L 1160.0 294.6 L 1190.0 284.3 L 1220.0 276.8 L 1250.0 290.6 L 1280.0 300.5 L 1310.0 312.3 L 1340.0 319.1 L 1370.0 329.4 L 1400.0 339.6 L 1440.0 320.0 L 1440 380 Z"
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

