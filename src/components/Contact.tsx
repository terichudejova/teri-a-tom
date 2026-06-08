import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import WildflowerMeadow from './WildflowerMeadow'

// ─── Google Forms configuration ───────────────────────────────────────────────
// Replace these with your actual Google Forms values:
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSc8uGyoVli6BkL_Wxo47Yc1dNpsQ09vG0TCOyaFNPqzLcur_Q/formResponse'
const ENTRY_NAME = 'entry.872335370'    // Replace with your actual entry ID for "Name"
const ENTRY_MESSAGE = 'entry.239879200' // Replace with your actual entry ID for "Message"
// ──────────────────────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 justify-center mb-6">
      <div className="w-8 h-px bg-gold/40" />
      <span className="text-xs uppercase tracking-[0.2em] text-gold/70 font-medium">{label}</span>
      <div className="w-8 h-px bg-gold/40" />
    </div>
  )
}

type FormState = 'idle' | 'submitting' | 'success'

export default function Contact() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setFormState('submitting')
    const body = new FormData()
    body.append(ENTRY_NAME, name.trim())
    body.append(ENTRY_MESSAGE, message.trim())
    try {
      await fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body })
    } catch { /* no-cors always resolves opaquely */ }
    setName('')
    setMessage('')
    setFormState('success')
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">

      {/* ── Wildflower meadow growing from bottom edge ── */}
      <WildflowerMeadow className="h-[280px] md:h-[140px]" />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <SectionLabel label={t.contact.sectionTitle} />
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            {t.contact.heading}
          </h2>
          <p className="text-charcoal/60 text-lg font-light leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        {formState === 'success' ? (
          <div
            id="contact-thankyou"
            className="bg-gradient-to-br from-sage/10 to-sky/10 rounded-3xl p-10 text-center border border-sage/20 shadow-sm"
          >
            <div className="text-5xl mb-4">🌸</div>
            <h3 className="font-serif text-3xl text-forest mb-3">{t.contact.thankYouTitle}</h3>
            <p className="text-charcoal/70 text-lg font-light">{t.contact.thankYouMessage}</p>
          </div>
        ) : (
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="bg-cream rounded-3xl p-6 md:p-10 shadow-sm border border-sage/10 space-y-6"
          >
            <div>
              <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest text-gold/70 font-medium mb-2">
                {t.contact.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.contact.namePlaceholder}
                required
                className="w-full bg-white border border-sage/20 rounded-xl px-4 py-3.5 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all duration-200 text-base cursor-text"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest text-gold/70 font-medium mb-2">
                {t.contact.messageLabel}
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={t.contact.messagePlaceholder}
                required
                rows={5}
                className="w-full bg-white border border-sage/20 rounded-xl px-4 py-3.5 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all duration-200 text-base resize-none cursor-text"
              />
            </div>
            <button
              id="contact-submit"
              type="submit"
              disabled={formState === 'submitting'}
              className="w-full bg-gold hover:bg-gold/90 text-white font-medium tracking-widest uppercase text-sm py-4 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {formState === 'submitting' ? '...' : t.contact.submitButton}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
