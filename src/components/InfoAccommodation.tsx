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

export default function InfoAccommodation() {
  const { t } = useLanguage()

  const photos = [
    { src: `${import.meta.env.BASE_URL}assets/place1.jpg`, alt: 'Podlešanský mlýn - foto 1' },
    { src: `${import.meta.env.BASE_URL}assets/place2.jpg`, alt: 'Podlešanský mlýn - foto 2' },
    { src: `${import.meta.env.BASE_URL}assets/place3.jpg`, alt: 'Podlešanský mlýn - foto 3' },
  ]

  return (
    <section id="info" className="py-24 md:py-32 bg-white relative">

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header centered over both columns */}
        <div className="text-center mb-16 md:mb-24">
          <SectionLabel label={t.infoAccommodation.sectionTitle} />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
            {t.infoAccommodation.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column: Essential Data & Checkout */}
          <div className="flex flex-col gap-10 text-center md:text-left">
            <div className="flex flex-col gap-8">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold/60 font-medium mb-3">{t.infoAccommodation.dateLabel}</div>
                <div className="font-serif text-3xl md:text-4xl text-charcoal mb-1">{t.infoAccommodation.dateValue}</div>
                <div className="text-charcoal/50 text-base">{t.infoAccommodation.timeValue}</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold/60 font-medium mb-3">{t.infoAccommodation.placeLabel}</div>
                <div className="font-serif text-3xl md:text-4xl text-charcoal mb-2">{t.infoAccommodation.placeValue}</div>
                <div className="text-charcoal/60 text-base mb-4 font-light">{t.infoAccommodation.addressValue}</div>
                <a
                  href="https://maps.google.com/?q=Podlešanský+mlýn,+Lešany+29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-sage hover:text-forest font-medium transition-colors border-b border-sage/30 hover:border-forest pb-1"
                >
                  {t.infoAccommodation.mapLink} <span className="text-lg">→</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Text */}
          <div className="flex flex-col gap-10 text-center md:text-left">

            {/* Merged Accommodation & Biotop Info */}
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-5 flex items-center justify-center md:justify-start gap-3">
                {t.infoAccommodation.accommodationHeading}
                <span className="text-3xl leading-none">🌿</span>
              </h3>
              <p
                className="text-charcoal/70 leading-relaxed font-light text-lg mb-8 [&>strong]:font-medium [&>strong]:text-charcoal"
                dangerouslySetInnerHTML={{ __html: t.infoAccommodation.p1 }}
              />

              {/* Checkout info */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center md:justify-start">
                <div>
                  <div className="text-xs text-gold/60 uppercase tracking-widest font-medium mb-1">{t.infoAccommodation.checkout}</div>
                  <div className="font-serif text-xl text-charcoal">{t.infoAccommodation.checkoutValue}</div>
                </div>
                <div>
                  <div className="text-xs text-gold/60 uppercase tracking-widest font-medium mb-1">{t.infoAccommodation.mainBuildingLabel}</div>
                  <div className="font-serif text-xl text-forest">{t.infoAccommodation.mainBuildingValue}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3-photo gallery of the venue */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 h-auto md:h-[45vh] lg:h-[50vh] w-full mt-12 md:mt-16">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="flex-1 rounded-2xl overflow-hidden shadow-sm relative group h-52 md:h-auto"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <FlowerRow className="mt-2 -mb-20 md:mt-8 md:-mb-20 opacity-55 scale-[1.1] md:scale-100" />

      </div>
    </section>
  )
}
