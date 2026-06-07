import { useLanguage } from '../context/LanguageContext'
import { FlowerRow } from './Decorations'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 justify-center mb-6">
      <div className="w-8 h-px bg-gold/40" />
      <span className="text-xs uppercase tracking-[0.2em] text-gold/70 font-medium">{label}</span>
      <div className="w-8 h-px bg-gold/40" />
    </div>
  )
}

export default function OurStory() {
  const { t } = useLanguage()

  return (
    <section id="story" className="pb-0 pt-24 md:pt-32 bg-white relative overflow-hidden">


      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-6 md:pb-8">
        <SectionLabel label={t.story.sectionTitle} />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-12 leading-tight">
          {t.story.heading}
        </h2>

        <div className="space-y-6 text-charcoal/70 text-lg leading-relaxed font-light">
          <p>{t.story.p}</p>
        </div>
      </div>

      <FlowerRow className="relative z-10 opacity-70" />

      {/* ── Mountain photo – bottom of section ── */}
      <div className="relative w-full pointer-events-none select-none" style={{ height: '380px', marginTop: '-60px' }}>
        <img
          src={`${import.meta.env.BASE_URL}assets/mountains.jpg`}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-full object-cover select-none"
          style={{ opacity: 0.55, objectPosition: 'center 55%' }}
        />
        {/* Ombré: solid white at top → fully transparent at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.75) 25%, rgba(255,255,255,0.15) 60%, transparent 100%)',
          }}
        />
      </div>
    </section>
  )
}
