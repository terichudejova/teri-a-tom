import { useLanguage } from '../context/LanguageContext'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 justify-center mb-6">
      <div className="w-8 h-px bg-gold/40" />
      <span className="text-xs uppercase tracking-[0.2em] text-gold/70 font-medium">{label}</span>
      <div className="w-8 h-px bg-gold/40" />
    </div>
  )
}

export default function DressCode() {
  const { t } = useLanguage()

  const womenPhotos = [
    { src: `${import.meta.env.BASE_URL}assets/women1.jpg`, alt: 'Women outfit inspiration 1' },
    { src: `${import.meta.env.BASE_URL}assets/women2.jpg`, alt: 'Women outfit inspiration 2' },
    { src: `${import.meta.env.BASE_URL}assets/women3.jpg`, alt: 'Women outfit inspiration 3' },
  ]

  const menPhotos = [
    { src: `${import.meta.env.BASE_URL}assets/men1.jpg`, alt: 'Men outfit inspiration 1' },
    { src: `${import.meta.env.BASE_URL}assets/men2.jpg`, alt: 'Men outfit inspiration 2' },
    { src: `${import.meta.env.BASE_URL}assets/men3.jpg`, alt: 'Men outfit inspiration 3' },
  ]

  return (
    <section id="dresscode" className="py-24 md:py-32 bg-cream relative">

      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-forest/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-sky/10 blur-3xl pointer-events-none" />

      {/* Watercolor dragonfly + butterfly */}
      <img
        src={`${import.meta.env.BASE_URL}assets/butterfly4.png`}
        alt=""
        aria-hidden="true"
        className="absolute bottom-20 right-[5%] pointer-events-none z-10 animate-float-slow w-14 md:w-20 select-none"
        style={{ animationDelay: '0.9s' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel label={t.dressCode.sectionTitle} />
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8">
            {t.dressCode.heading}
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-charcoal/70 text-lg leading-relaxed font-light [&_strong]:font-medium [&_strong]:text-charcoal">
            <p dangerouslySetInnerHTML={{ __html: t.dressCode.p }} />
          </div>
        </div>

        {/* Color palette – modern inline swatches */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold/60 font-medium text-center mb-8">
            {t.dressCode.paletteCaption}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-3xl mx-auto">
            {[
              { color: '#111111', name: 'Black', hex: '#111111', favourite: true },
              { color: '#1E2225', name: 'Onyx', hex: '#1E2225' },
              { color: '#28223A', name: 'Midnight', hex: '#28223A' },
              { color: '#1A231E', name: 'Forest', hex: '#1A231E' },
              { color: '#3A2820', name: 'Espresso', hex: '#3A2820' },
              { color: '#2C2830', name: 'Plum', hex: '#2C2830' },
            ].map(({ color, name, favourite }) => (
              <div key={color} className="flex flex-col items-center gap-3 group">
                <div
                  className="relative w-full aspect-[3/4] rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                  style={{ backgroundColor: color }}
                >
                  {favourite && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                      ★ fav
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                </div>
                <div className="text-center">
                  <p className="text-charcoal text-sm font-medium tracking-wide">{name}</p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="text-center text-charcoal/45 text-md font-light mt-8 max-w-md mx-auto leading-relaxed [&_strong]:font-medium [&_strong]:text-charcoal"
            dangerouslySetInnerHTML={{ __html: t.dressCode.paletteDescription }}
          />
        </div>

        {/* Women gallery */}
        <div className="mb-10">
          <h3 className="font-serif text-2xl text-charcoal text-center mb-6">
            {t.dressCode.womenTitle}
          </h3>
          <div className="grid grid-cols-3 gap-2 md:gap-4 h-64 md:h-80">
            {womenPhotos.map((photo, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Men gallery */}
        <div>
          <h3 className="font-serif text-2xl text-charcoal text-center mb-6">
            {t.dressCode.menTitle}
          </h3>
          <div className="grid grid-cols-3 gap-2 md:gap-4 h-64 md:h-80">
            {menPhotos.map((photo, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
