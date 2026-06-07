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

export default function Transport() {
  const { t } = useLanguage()

  return (
    <section id="transport" className="py-24 md:py-32 bg-cream relative">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-sky/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <SectionLabel label={t.transport.sectionTitle} />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
            {t.transport.heading}
          </h2>
        </div>

        {/* Transport airy grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20 mb-8 md:mb-14 mt-8 md:mt-12">
          {t.transport.options.map((option, i) => (
            <div key={i} className="flex flex-col items-center text-center">

              {/* Icon */}
              <div className="text-4xl md:text-5xl opacity-90 mb-6">
                {option.icon}
              </div>

              {/* Decorative line */}
              <div className="w-10 h-px bg-gold/40 mb-6"></div>

              {/* Title */}
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
                {option.title}
              </h3>

              {/* Description */}
              <p className="text-charcoal/70 text-base leading-relaxed font-light max-w-sm">
                {option.description}
              </p>

            </div>
          ))}
        </div>

        {/* General thank-you note */}
        <FlowerRow className="opacity-60 mb-12" />
        <div className="text-center max-w-xl mx-auto mt-4 md:mt-8">
          <p className="font-serif italic text-xl md:text-2xl text-gold/80 leading-relaxed">
            {t.transport.thankYouText.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
