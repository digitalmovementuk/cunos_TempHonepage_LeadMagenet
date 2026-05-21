import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const SeoAnalyser = lazy(() => import('./seo/SeoAnalyser'))
const SeniorFinanceSupportPage = lazy(() => import('./services/SeniorFinanceSupport'))

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  TrendingUp,
  X,
  type LucideIcon,
} from 'lucide-react'

export const CONTACT = {
  email: 'office@cunos.co.uk',
  phoneDisplay: '+44 7520 654 301',
  phoneHref: 'tel:+447520654301',
  whatsappHref:
    'https://wa.me/447520654301?text=Hi%20Cunos%2C%20I%27d%20like%20to%20discuss%20finance%20support.',
  linkedinHref: 'https://www.linkedin.com/company/cunos-consulting',
  /* Form submissions route to this inbox via FormSubmit.co (no backend required). */
  formEndpoint: 'https://formsubmit.co/ajax/enting@cunos.co.uk',
}

export function WhatsAppIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

export default function App() {
  if (typeof window !== 'undefined' && window.location.pathname === '/seo-analyse') {
    return (
      <Suspense
        fallback={
          <main className="grid min-h-screen w-full place-items-center bg-black text-ink/40">
            <Loader2 size={20} className="animate-spin" />
          </main>
        }
      >
        <SeoAnalyser />
      </Suspense>
    )
  }

  if (
    typeof window !== 'undefined' &&
    window.location.pathname.replace(/\/$/, '') === '/services/senior-finance-support'
  ) {
    return (
      <Suspense
        fallback={
          <main className="grid min-h-screen w-full place-items-center bg-black text-ink/40">
            <Loader2 size={20} className="animate-spin" />
          </main>
        }
      >
        <SeniorFinanceSupportPage />
      </Suspense>
    )
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-black text-ink">
      <ScrollProgress />
      <Nav />
      <Hero />
      <ComingSoon />
      <Scorecard />
      <Contact />
      <Footer />
    </main>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#0071E3] via-[#5cb3ff] to-[#9fd0ff] shadow-[0_0_18px_rgba(92,179,255,0.55)]"
    />
  )
}

/* -------------------------------- NAV -------------------------------- */

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [overLight, setOverLight] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      setOverLight(window.scrollY > window.innerHeight - 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navLinks: Array<[string, string]> = [
    ['Services', '/#whats-next'],
    ['About us', '/#about'],
    ['Contact', '/#contact'],
  ]

  const drawerServices: Array<[string, string]> = [
    ['Senior Finance Support', '/services/senior-finance-support'],
    ['Cashflow Forecast', '/services/cashflow-forecast'],
    ['Management Report', '/services/management-report'],
  ]

  const headerCls = !scrolled
    ? 'bg-transparent'
    : overLight
      ? 'bg-white/75 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.08]'
      : 'bg-black/65 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10'
  const brandCls = overLight ? 'text-[#1d1d1f]' : 'text-white'
  const linkCls = overLight
    ? 'text-[#1d1d1f]/80 hover:text-[#1d1d1f]'
    : 'text-white/80 hover:text-white'
  const hamburgerCls = overLight
    ? 'border-black/10 bg-white text-[#1d1d1f] hover:bg-black/[0.03]'
    : 'border-white/20 bg-white/10 text-white hover:bg-white/15'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ${headerCls}`}
        style={{
          clipPath: scrolled
            ? 'inset(0.5rem 4% 0.5rem 4% round 999px)'
            : 'inset(0px 0px 0px 0px round 0px)',
          transition:
            'clip-path 0.42s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="mx-auto flex h-[64px] w-full max-w-[1640px] items-center justify-between px-4 sm:px-5 md:h-[88px] md:px-6 lg:px-8">
          <a
            href="/"
            className={`font-display text-[18px] font-semibold tracking-[-0.012em] transition-colors duration-300 sm:text-[20px] md:text-[22px] ${brandCls}`}
          >
            Cunos Consulting
          </a>

          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={`text-[15px] font-medium tracking-tight transition-colors duration-300 ${linkCls}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CONTACT.phoneHref}
              aria-label="Call Cunos"
              className={`grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all ${hamburgerCls}`}
            >
              <Phone size={15} strokeWidth={1.8} />
            </a>

            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Cunos on WhatsApp"
              className={`grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all ${
                overLight
                  ? 'border-[#25D366]/30 bg-[#25D366]/[0.08] text-[#25D366] hover:bg-[#25D366]/15'
                  : 'border-[#25D366]/40 bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25'
              }`}
            >
              <WhatsAppIcon size={16} />
            </a>

            <a
              href={CONTACT.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cunos on LinkedIn"
              className={`hidden h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all sm:grid ${hamburgerCls}`}
            >
              <Linkedin size={15} strokeWidth={1.8} />
            </a>

            <a
              href="/#contact"
              className="ml-1 hidden items-center gap-1.5 rounded-pill bg-[#0071E3] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#0077ED] sm:inline-flex md:px-5 md:py-2.5 md:text-[14px]"
            >
              Book a call <ArrowRight size={13} />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`ml-0.5 grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all md:hidden ${hamburgerCls}`}
            >
              <Menu size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[88%] max-w-[400px] flex-col bg-[#fbfbfd] px-6 pb-8 pt-5 shadow-[-30px_0_60px_rgba(15,15,30,0.18)] sm:px-7 md:hidden"
            >
              <div className="flex items-center justify-between">
                <p className="font-display text-[18px] font-semibold tracking-[-0.012em] text-[#1d1d1f]">
                  Cunos Consulting
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col">
                {navLinks.map(([label, href], i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
                    className="block border-b border-black/[0.08] py-5 font-display text-[26px] font-semibold tracking-[-0.014em] text-[#1d1d1f]"
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071E3]">
                  <span className="mr-3 inline-block h-px w-7 align-middle bg-[#0071E3]" />
                  Services
                </p>
                <ul className="mt-3 space-y-2">
                  {drawerServices.map(([label, href], i) => (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.16 + i * 0.05 }}
                    >
                      <a
                        href={href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-2xl border border-black/[0.08] bg-white px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[#0071E3]/25 hover:shadow-[0_12px_28px_-18px_rgba(0,113,227,0.35)]"
                      >
                        <span className="text-[15px] font-medium text-[#1d1d1f]">{label}</span>
                        <ArrowRight
                          size={14}
                          className="text-[#0071E3] transition-transform group-hover:translate-x-0.5"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-pill bg-[#0071E3] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#0077ED]"
              >
                Book a call <ArrowRight size={15} />
              </a>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-pill border border-black/10 bg-white px-4 py-3 text-[14px] font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.03]"
                >
                  <Phone size={15} strokeWidth={1.8} /> Call
                </a>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-pill border border-[#25D366]/30 bg-[#25D366]/[0.08] px-4 py-3 text-[14px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#25D366]/15"
                >
                  <WhatsAppIcon size={15} className="text-[#25D366]" /> WhatsApp
                </a>
              </div>

              <div className="mt-auto pt-10 text-[13px] leading-[1.5] text-[#6e6e73]">
                <a
                  href="mailto:hello@cunos.consulting"
                  className="text-white/90 transition-colors hover:text-[#5cb3ff]"
                >
                  hello@cunos.consulting
                </a>
                <p className="mt-1.5 inline-flex items-center gap-1.5">
                  <MapPin size={12} strokeWidth={1.8} />
                  London, United Kingdom
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* -------------------------------- HERO -------------------------------- */

function Hero() {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })
  const paragraphRef = useRef<HTMLDivElement>(null)
  // 'start end' = top of paragraph enters viewport bottom; 'end start' = bottom leaves viewport top.
  // This range is wider than the sticky-pin window and always produces a usable 0→1 progress.
  const { scrollYProgress: paragraphProgress } = useScroll({
    target: paragraphRef,
    offset: ['start end', 'end start'],
  })

  // Video subtle parallax + zoom across whole section
  const videoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80])
  const videoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1.05, 1.05] : [1.05, 1.16])

  const paragraphText =
    'A practical alternative to in-house finance support. Ensuring financial control and transparency. Without adding a full-time role to your team.'
  const paragraphWords = paragraphText.split(' ')
  // Indices of the phrase to highlight after the reveal completes.
  const highlightPhrase = 'Ensuring financial control and transparency.'.split(' ')
  const highlightStart = paragraphWords.findIndex((_, i) =>
    paragraphWords.slice(i, i + highlightPhrase.length).join(' ') === highlightPhrase.join(' '),
  )
  const highlightIndices = new Set<number>(
    Array.from({ length: highlightPhrase.length }, (_, k) => highlightStart + k),
  )

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.play().catch(() => {})
    // Source clip fades to black in its last ~8% — restart early so the loop stays lit.
    const onTime = () => {
      if (v.duration && v.currentTime >= v.duration * 0.92) v.currentTime = 0
    }
    v.addEventListener('timeupdate', onTime)
    return () => v.removeEventListener('timeupdate', onTime)
  }, [])

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative isolate w-full bg-black"
      style={{ height: '300svh' }}
    >
      {/* Sticky video — pinned in viewport across both slides */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {!reduce && (
          <motion.video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ y: videoY, scale: videoScale }}
            className="absolute inset-0 h-full w-full object-cover"
            src={`${import.meta.env.BASE_URL}media/v9-hero-background.mp4`}
          />
        )}

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/25" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,1,13,0.55) 0%, rgba(7,1,13,0) 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,1,13,0) 0%, rgba(7,1,13,0.35) 70%, rgba(7,1,13,0.55) 100%)',
          }}
        />
      </div>

      {/* Content layer — overlays both viewports above the sticky video */}
      <div className="absolute inset-x-0 top-0 z-10 h-full">
        {/* Slide 1 — kicker, H1, subhead, CTAs */}
        <div className="relative flex h-[100svh] items-end">
          <div className="mx-auto w-full max-w-[1640px] px-4 pb-7 sm:px-5 sm:pb-10 md:px-6 md:pb-12 lg:px-8 lg:pb-14">
            <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-end md:justify-between md:gap-12 md:text-left">
              <div className="min-w-0 flex-1">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-[14px] font-semibold uppercase tracking-[0.05em] text-white sm:text-[19px]"
                >
                  Senior finance support
                </motion.p>

                <h1
                  className="mx-auto mt-2 text-white sm:mt-3 md:mx-0"
                  style={{
                    fontSize: 'clamp(40px, 6.5vw, 88px)',
                    lineHeight: '1.06',
                    letterSpacing: '-0.025em',
                    fontWeight: 300,
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="block whitespace-nowrap"
                  >
                    Outsourced
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="block whitespace-nowrap font-normal text-white/95"
                  >
                    Finance Management
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="mx-auto mt-3 text-[16px] leading-[1.4] text-white/70 sm:mt-4 sm:text-[20px] sm:text-white/65 md:mx-0 md:whitespace-nowrap"
                >
                  Finance leadership, reporting, and cash visibility — made for founders.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mt-5 flex justify-center sm:mt-6 md:justify-start"
                >
                  <a
                    href="#whats-next"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[14px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15"
                  >
                    Find out more
                    <ArrowRight size={13} />
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex w-full flex-col items-center gap-3 md:w-auto md:flex-shrink-0 md:items-end md:gap-3"
              >
                <a
                  href="#audit"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#0071E3] px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#0077ED] sm:w-auto sm:py-2"
                >
                  Start the assessment
                  <ArrowRight size={13} />
                </a>
                <p className="text-center text-[13px] font-medium leading-snug text-white/70 sm:whitespace-nowrap sm:text-[15px] md:text-right">
                  Free 30-second self-assessment
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide 2 — practical alternative paragraph, pinned to viewport center while scroll drives the reveal */}
        <div
          ref={paragraphRef}
          className="relative h-[200svh]"
        >
          <div className="sticky top-0 flex h-[100svh] items-center justify-center">
          <div className="mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
            <h2
              className="mx-auto max-w-[1500px] text-balance text-center text-white"
              style={{
                fontSize: 'clamp(48px, 7vw, 132px)',
                lineHeight: '1.02',
                letterSpacing: '-0.04em',
                fontWeight: 700,
              }}
            >
              {paragraphWords.map((word, i) => (
                <ScrollWord
                  key={`${word}-${i}`}
                  word={word}
                  index={i}
                  total={paragraphWords.length}
                  progress={paragraphProgress}
                  reduce={!!reduce}
                  highlight={highlightIndices.has(i)}
                  highlightOrder={highlightIndices.has(i) ? i - highlightStart : -1}
                  highlightCount={highlightPhrase.length}
                />
              ))}
            </h2>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScrollWord({
  word,
  index,
  total,
  progress,
  reduce,
  highlight = false,
  highlightOrder = -1,
  highlightCount = 0,
}: {
  word: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reduce: boolean
  highlight?: boolean
  highlightOrder?: number
  highlightCount?: number
}) {
  // Per-word reveal: each word fades from transparent → full white as the user scrolls.
  // useTransform clamps outside its range, so once a word reaches opacity 1 it stays there
  // permanently — no fade-out, even when scrolling further past the section.
  // Paragraph pin window is ~0.333 → 0.667 of paragraphProgress. Reveal occupies the first
  // ~60% of the pin so the highlighter has room to play out while text is still visible.
  const REVEAL_WIN_START = 0.34
  const REVEAL_WIN_END = 0.55
  const revealSpan = REVEAL_WIN_END - REVEAL_WIN_START
  const step = revealSpan / total
  const wStart = REVEAL_WIN_START + index * step
  const wEnd = wStart + step * 1.25
  // Explicit clamp guarantees no fade-out once a word reaches full white,
  // regardless of how framer-motion's useTransform clamp default behaves across versions.
  const opacity = useTransform(progress, (v) => {
    if (reduce) return 1
    const t = (v - wStart) / (wEnd - wStart)
    return Math.max(0, Math.min(1, t))
  })
  const blur = useTransform(progress, (v) => {
    if (reduce) return 'blur(0px)'
    const t = Math.max(0, Math.min(1, (v - wStart) / (wEnd - wStart)))
    return `blur(${(1 - t) * 5}px)`
  })

  // Highlighter sweep — strictly sequential, one word at a time, tied directly to scroll.
  // Each word's slot ends exactly where the next begins, so two strokes are never in motion together.
  // Sits inside the pinned window (after reveal completes, before paragraph leaves viewport).
  const HL_START = 0.56
  const HL_END = 0.66
  const perWord = highlightCount > 0 ? (HL_END - HL_START) / highlightCount : 0
  const hlA = highlight ? HL_START + highlightOrder * perWord : 0
  const hlB = highlight ? hlA + perWord : 1
  // Non-linear keyframes give the stroke a hand-drawn feel — quick start, slow middle, snap to end —
  // without using a spring (which would decay past the slot and overlap the next word).
  const markerScale = useTransform(
    progress,
    [hlA, hlA + (hlB - hlA) * 0.3, hlA + (hlB - hlA) * 0.62, hlA + (hlB - hlA) * 0.88, hlB],
    reduce || !highlight ? [0, 0, 0, 0, 0] : [0, 0.42, 0.78, 0.96, 1],
  )
  // Inverse-color: flip the swept word's text from white → near-black just after the marker
  // has covered the bulk of it. Snap-ish transition so the eye reads it as a stamp, not a fade.
  const textColor = useTransform(
    progress,
    [hlA + (hlB - hlA) * 0.45, hlA + (hlB - hlA) * 0.7],
    reduce || !highlight ? ['#ffffff', '#ffffff'] : ['#ffffff', '#000000'],
  )

  // Per-word jitter so adjacent strokes don't look mechanically identical.
  const tilt = highlight
    ? [-0.9, 0.6, -0.4, 0.8, -0.7, 0.5, -0.3][highlightOrder % 7] ?? -0.5
    : 0
  // Vertical bleed: extend the marker slightly above the cap-height and below the baseline
  // so every glyph (caps, descenders, dots above 'i') is fully wrapped — no stub of a letter
  // poking out above or below the stroke.
  const yTop = highlight
    ? [-0.08, -0.05, -0.09, -0.06, -0.08, -0.05, -0.07][highlightOrder % 7] ?? -0.07
    : -0.07
  const yBottom = highlight
    ? [-0.06, -0.04, -0.07, -0.05, -0.06, -0.04, -0.05][highlightOrder % 7] ?? -0.05
    : -0.05
  const radiusOptions = [
    '3px 8px 5px 6px',
    '4px 6px 7px 4px',
    '5px 7px 4px 8px',
    '3px 9px 6px 5px',
    '4px 7px 5px 7px',
  ]
  const radius = highlight ? radiusOptions[highlightOrder % radiusOptions.length] : '4px'

  return (
    <>
      <motion.span
        style={{ opacity, filter: blur }}
        className="relative inline-block will-change-[opacity,filter]"
      >
        {highlight && !reduce && (
          <motion.span
            aria-hidden
            style={{
              scaleX: markerScale,
              transformOrigin: 'left center',
              rotate: `${tilt}deg`,
              top: `${yTop}em`,
              bottom: `${yBottom}em`,
              left: '-0.12em',
              right: '-0.12em',
              borderRadius: radius,
              // Solid opaque white — maximum contrast against the dark text being inverted.
              // Subtle near-white shimmer only (no transparency dips) so coverage stays uniform.
              background:
                'linear-gradient(102deg, #ffffff 0%, #f6f9ff 30%, #ffffff 55%, #f7faff 78%, #ffffff 100%)',
              boxShadow:
                'inset 0 -0.05em 0 rgba(10,16,32,0.12), 0 0.03em 0.18em rgba(255,255,255,0.45)',
            }}
            className="pointer-events-none absolute -z-10"
          />
        )}
        <motion.span style={{ color: textColor }} className="relative">
          {word}
        </motion.span>
      </motion.span>
      {index < total - 1 ? ' ' : ''}
    </>
  )
}

/* ---------------------------- REVEAL HEADING -------------------------- */

export function RevealHeading({
  parts,
  className = '',
  style,
  baseDelay = 0.1,
  gap = 0.15,
}: {
  parts: Array<{ text: string; mute?: boolean }>
  className?: string
  style?: CSSProperties
  baseDelay?: number
  gap?: number
}) {
  return (
    <span className={`flex flex-wrap justify-center gap-x-[0.25em] md:justify-start ${className}`} style={style}>
      {parts.map((p, i) => (
        <motion.span
          key={`${p.text}-${i}`}
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, delay: baseDelay + i * gap, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block ${p.mute ? 'opacity-55' : ''}`}
        >
          {p.text}
        </motion.span>
      ))}
    </span>
  )
}

/* ------------------------------ SERVICES ------------------------------ */

const services = [
  {
    title: 'Senior Finance Support',
    body: 'Ensuring reliable finance operations and finance strategy advice.',
    href: '/services/senior-finance-support',
    video: 'senior-finance-support',
    tint: 'from-[#0071E3]/45 to-[#5cb3ff]/10',
  },
  {
    title: 'Cashflow Forecast',
    body: 'Delivering cash balance clarity and forecasts so you can plan with confidence.',
    href: '/services/cashflow-forecast',
    video: 'cashflow-forecast',
    tint: 'from-emerald-500/40 to-[#0071E3]/10',
  },
  {
    title: 'Management Report',
    body: 'Executive reporting delivering the foundation for sustainable business growth.',
    href: '/services/management-report',
    video: 'management-report',
    tint: 'from-[#7c5cff]/45 to-[#0071E3]/10',
  },
] as const

function ComingSoon() {
  const ease = [0.22, 1, 0.36, 1] as const

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  }

  return (
    <section
      id="whats-next"
      className="relative isolate overflow-hidden bg-white py-28 sm:py-36 md:py-44 lg:py-56"
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mx-auto max-w-[1080px] text-center md:mx-0 md:text-left"
        >
          <motion.p
            variants={item}
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6e6e73] sm:text-[15px]"
          >
            What you get
          </motion.p>

          <h2
            className="mt-6 text-[#1d1d1f] sm:mt-8"
            style={{
              fontSize: 'clamp(64px, 9vw, 160px)',
              lineHeight: '1.0',
              letterSpacing: '-0.04em',
              fontWeight: 700,
            }}
          >
            <RevealHeading
              parts={[
                { text: 'Fractional' },
                { text: 'CFO', mute: true },
              ]}
            />
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mt-20 grid grid-cols-1 gap-x-8 gap-y-20 sm:mt-24 md:mt-32 md:grid-cols-3 md:gap-x-8"
        >
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              variants={item}
              className="flex h-full flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="group/video relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-black/[0.06] bg-[#0c0716] shadow-[0_24px_60px_-32px_rgba(15,15,30,0.35)]">
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-br ${s.tint}`}
                />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full scale-105 object-cover opacity-95 transition-transform duration-700 group-hover/video:scale-110"
                  src={`${import.meta.env.BASE_URL}media/services/${s.video}.mp4`}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                />
                <span className="absolute left-5 top-5 inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[12px] font-medium tabular-nums tracking-[0.05em] text-white backdrop-blur-md">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3
                className="mt-7 text-[#1d1d1f]"
                style={{
                  fontSize: 'clamp(28px, 2.9vw, 40px)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.035em',
                  fontWeight: 700,
                  minHeight: '2.2em',
                }}
              >
                {s.title}
              </h3>
              <p
                className="mt-5 text-[18px] leading-[1.5] text-[#6e6e73] sm:text-[20px]"
                style={{ minHeight: '4.5em' }}
              >
                {s.body}
              </p>
              <a
                href={s.href}
                className="group/link mt-auto inline-flex items-center gap-1.5 pt-7 text-[15px] font-medium text-[#0071E3] transition-colors hover:text-[#0077ED]"
              >
                See more
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ------------------------------ SCORECARD ----------------------------- */

type Pillar = 'cash' | 'reporting' | 'planning'

const PILLAR_META: Record<Pillar, { label: string; weight: number }> = {
  cash: { label: 'Cash visibility', weight: 0.4 },
  reporting: { label: 'Reporting rhythm', weight: 0.3 },
  planning: { label: 'Forward planning', weight: 0.3 },
}

const SCORECARD_QUESTIONS: Array<{
  pillar: Pillar
  question: string
  options: Array<{ label: string; score: number }>
}> = [
  {
    pillar: 'cash',
    question: "How many days into the month before you see last month's numbers?",
    options: [
      { label: 'Within 5 days', score: 3 },
      { label: '5 to 10 days', score: 2 },
      { label: '10 to 20 days', score: 1 },
      { label: 'More than 20 days', score: 0 },
    ],
  },
  {
    pillar: 'cash',
    question: 'Can you see your cash position 13 weeks ahead?',
    options: [
      { label: 'Yes, in detail', score: 3 },
      { label: 'Roughly', score: 2 },
      { label: 'No, just the current balance', score: 1 },
      { label: 'I never look that far', score: 0 },
    ],
  },
  {
    pillar: 'cash',
    question: 'When did you last update your cash forecast?',
    options: [
      { label: 'This week', score: 3 },
      { label: 'This month', score: 2 },
      { label: 'This quarter', score: 1 },
      { label: 'Longer ago, or never', score: 0 },
    ],
  },
  {
    pillar: 'reporting',
    question: 'Who actually reads your monthly numbers?',
    options: [
      { label: 'Me, the team, and the board', score: 3 },
      { label: 'Me and my team', score: 2 },
      { label: 'Mainly just me', score: 1 },
      { label: 'No one, regularly', score: 0 },
    ],
  },
  {
    pillar: 'reporting',
    question: 'Does your monthly report include trends and variance commentary?',
    options: [
      { label: 'Always', score: 3 },
      { label: 'Sometimes', score: 2 },
      { label: 'Rarely', score: 1 },
      { label: 'Never', score: 0 },
    ],
  },
  {
    pillar: 'planning',
    question: 'How confident are you in your runway estimate?',
    options: [
      { label: 'Very confident', score: 3 },
      { label: 'Somewhat confident', score: 2 },
      { label: 'Not really', score: 1 },
      { label: 'No clear idea', score: 0 },
    ],
  },
  {
    pillar: 'planning',
    question: 'Do you have an annual budget you track against?',
    options: [
      { label: 'Yes, reviewed weekly', score: 3 },
      { label: 'Yes, reviewed monthly', score: 2 },
      { label: 'Yes, but loosely', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
]

const NEXT_STEPS: Record<Pillar, { high: string; mid: string; low: string }> = {
  cash: {
    high: 'Tighten your cash forecasting cadence to weekly during growth months. The small lift compounds.',
    mid: 'Build a 13-week rolling cashflow you trust. The visibility alone changes how you make hiring and spending calls.',
    low: 'Get a 13-week cashflow forecast in place this month. It is the highest-leverage finance move when cash is tight.',
  },
  reporting: {
    high: 'Pair your numbers with forward-looking commentary. Make the monthly report a decision tool, not a record.',
    mid: 'Move from raw P&L to a monthly pack with KPI trends and variance commentary. Your team will engage with it.',
    low: 'Establish a regular monthly reporting rhythm. Even a one-page summary changes how the business runs.',
  },
  planning: {
    high: 'Pressure-test your budget against best, likely, and worst cases. Turn confidence into resilience.',
    mid: 'Build a budget you actually track against monthly. Variance is where the insight lives.',
    low: 'Build a 12-month budget tied to your strategic goals. Without one, every spending decision is a guess.',
  },
}

function getNextStep(pillar: Pillar, score: number): string {
  if (score >= 70) return NEXT_STEPS[pillar].high
  if (score >= 40) return NEXT_STEPS[pillar].mid
  return NEXT_STEPS[pillar].low
}

function getBand(score: number): { label: string; color: string; bgClass: string } {
  if (score >= 80)
    return {
      label: 'Excellent control',
      color: '#10b981',
      bgClass: 'border-emerald-500/25 bg-emerald-50 text-emerald-700',
    }
  if (score >= 60)
    return {
      label: 'Solid foundation',
      color: '#0071E3',
      bgClass: 'border-[#0071E3]/25 bg-[#eef5ff] text-[#0071E3]',
    }
  if (score >= 40)
    return {
      label: 'Notable gaps',
      color: '#f59e0b',
      bgClass: 'border-amber-500/25 bg-amber-50 text-amber-700',
    }
  return {
    label: 'Major gaps',
    color: '#ef4444',
    bgClass: 'border-red-500/25 bg-red-50 text-red-700',
  }
}

function computeScores(answers: number[]): {
  overall: number
  perPillar: Record<Pillar, number>
} {
  const sums: Record<Pillar, { sum: number; max: number }> = {
    cash: { sum: 0, max: 0 },
    reporting: { sum: 0, max: 0 },
    planning: { sum: 0, max: 0 },
  }
  SCORECARD_QUESTIONS.forEach((q, i) => {
    const score = answers[i]
    if (score >= 0) sums[q.pillar].sum += score
    sums[q.pillar].max += 3
  })
  const perPillar: Record<Pillar, number> = {
    cash: sums.cash.max ? Math.round((sums.cash.sum / sums.cash.max) * 100) : 0,
    reporting: sums.reporting.max ? Math.round((sums.reporting.sum / sums.reporting.max) * 100) : 0,
    planning: sums.planning.max ? Math.round((sums.planning.sum / sums.planning.max) * 100) : 0,
  }
  const overall = Math.round(
    perPillar.cash * PILLAR_META.cash.weight +
      perPillar.reporting * PILLAR_META.reporting.weight +
      perPillar.planning * PILLAR_META.planning.weight,
  )
  return { overall, perPillar }
}

type ScorecardStep = 'intro' | 'question' | 'reveal' | 'capture' | 'sent'

function Scorecard() {
  const [step, setStep] = useState<ScorecardStep>('intro')
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(() =>
    new Array(SCORECARD_QUESTIONS.length).fill(-1),
  )
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStart = () => {
    setQIndex(0)
    setAnswers(new Array(SCORECARD_QUESTIONS.length).fill(-1))
    setError(null)
    setStep('question')
  }

  const handleAnswer = (score: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = score
      return next
    })
    setTimeout(() => {
      if (qIndex < SCORECARD_QUESTIONS.length - 1) {
        setQIndex((i) => i + 1)
      } else {
        setStep('reveal')
      }
    }, 240)
  }

  const handleQuestionBack = () => {
    if (qIndex > 0) setQIndex((i) => i - 1)
    else setStep('intro')
  }

  const handleStartCapture = () => {
    setError(null)
    setStep('capture')
  }

  const handleCaptureBack = () => {
    setError(null)
    setStep('reveal')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (String(data.get('_honey') ?? '')) return

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const revenue = String(data.get('revenue') ?? '').trim()

    setError(null)
    setSending(true)

    const { overall, perPillar } = computeScores(answers)
    const answersDigest = SCORECARD_QUESTIONS.map((q, i) => {
      const opt = q.options.find((o) => o.score === answers[i])
      return `Q${i + 1} (${PILLAR_META[q.pillar].label}): ${opt?.label ?? '—'}`
    }).join('\n')

    const recommendations = (Object.keys(PILLAR_META) as Pillar[])
      .map((p) => `${PILLAR_META[p].label} (${perPillar[p]}/100): ${getNextStep(p, perPillar[p])}`)
      .join('\n')

    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          revenue,
          score: `${overall}/100  ·  Cash ${perPillar.cash}  ·  Reporting ${perPillar.reporting}  ·  Planning ${perPillar.planning}`,
          answers: answersDigest,
          recommendations,
          _subject: `Cunos audit — ${name || email} (${revenue || 'unspecified revenue'}) — ${overall}/100`,
          _template: 'table',
          _captcha: 'false',
          _autoresponse: `Hi ${name},\n\nThanks for taking the Cunos finance audit. Your score is ${overall}/100.\n\nBreakdown:\n· Cash visibility: ${perPillar.cash}/100\n· Reporting rhythm: ${perPillar.reporting}/100\n· Forward planning: ${perPillar.planning}/100\n\nA member of the Cunos team will be in touch within one working day with your detailed scorecard and recommended next steps.\n\n— The Cunos team`,
        }),
      })
      if (!res.ok) throw new Error(`Form gateway returned ${res.status}`)
      setStep('sent')
    } catch (err) {
      console.error(err)
      setError(`Sorry — something went wrong. Please email us at ${CONTACT.email}.`)
    } finally {
      setSending(false)
    }
  }

  const handleReset = () => {
    setStep('intro')
    setQIndex(0)
    setAnswers(new Array(SCORECARD_QUESTIONS.length).fill(-1))
    setError(null)
  }

  const scores = computeScores(answers)

  return (
    <section
      id="audit"
      className="relative isolate flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden bg-[#f2f7fb] py-10 sm:py-12 md:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[560px] max-w-[1180px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.18), transparent 68%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-white/70 bg-[#0b1220] p-5 shadow-[0_40px_100px_-30px_rgba(8,24,52,0.55),0_1px_0_rgba(255,255,255,0.7)_inset] sm:rounded-[32px] md:p-7"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#0071E3]/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 right-4 h-72 w-72 rounded-full bg-[#5cb3ff]/20 blur-3xl"
          />

          <div className="relative grid gap-4 lg:grid-cols-[0.82fr,1.18fr] lg:items-stretch">
            <div
              data-scorecard-panel="summary"
              className="flex flex-col items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.06] p-5 text-center text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] sm:p-6 lg:items-start lg:p-7 lg:text-left lg:min-h-[440px]"
            >
              <div className="w-full">
                <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/10 px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#9fd0ff]">
                  <Sparkles size={14} strokeWidth={2} />
                  Finance audit
                </span>

                <h2
                  className="mx-auto mt-5 max-w-[760px] text-white lg:mx-0"
                  style={{
                    fontSize: 'clamp(64px, 9vw, 160px)',
                    lineHeight: '1.0',
                    letterSpacing: '-0.04em',
                    fontWeight: 700,
                  }}
                >
                  <RevealHeading
                    parts={[{ text: "What's your" }, { text: 'situation?', mute: true }]}
                  />
                </h2>

                <p className="mx-auto mt-5 max-w-[460px] text-[17px] leading-[1.5] text-white/72 sm:text-[19px] lg:mx-0">
                  Pinpoint the weak link across cash, reporting, and planning.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-[14px] font-medium text-white/65 lg:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/10 px-3.5 py-2">
                  <Clock size={14} />
                  30 seconds
                </span>
              </div>
            </div>

            <div className="relative flex lg:min-h-[440px]">
              <AnimatePresence mode="wait">
                {step === 'intro' && <ScorecardIntro key="intro" onStart={handleStart} />}
                {step === 'question' && (
                  <ScorecardQuestion
                    key={`q-${qIndex}`}
                    index={qIndex}
                    total={SCORECARD_QUESTIONS.length}
                    question={SCORECARD_QUESTIONS[qIndex]}
                    selected={answers[qIndex]}
                    onSelect={handleAnswer}
                    onBack={handleQuestionBack}
                  />
                )}
                {step === 'reveal' && (
                  <ScorecardReveal key="reveal" scores={scores} onContinue={handleStartCapture} />
                )}
                {step === 'capture' && (
                  <ScorecardCapture
                    key="capture"
                    scores={scores}
                    onSubmit={handleSubmit}
                    onBack={handleCaptureBack}
                    sending={sending}
                    error={error}
                  />
                )}
                {step === 'sent' && (
                  <SuccessCard
                    key="sent"
                    onReset={handleReset}
                    title="Your audit is on its way."
                    body="Check your inbox for your detailed scorecard. A member of the Cunos team will follow up within one working day."
                    resetLabel="Take the audit again"
                    className="h-full lg:min-h-[440px]"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const SCORECARD_STEP_ENTER = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
} as const

function ScorecardCardChrome({ children }: { children: ReactNode }) {
  return (
    <div
      data-scorecard-panel="tool"
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-white/80 bg-white p-5 shadow-[0_28px_70px_-34px_rgba(3,12,30,0.58),0_1px_0_rgba(255,255,255,0.95)_inset] sm:rounded-[26px] sm:p-6 md:p-8 lg:min-h-[440px]"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0071E3] via-[#5cb3ff] to-[#1d4ed8]"
      />
      {children}
    </div>
  )
}

function ScorecardIntro({ onStart }: { onStart: () => void }) {
  const previewPillars: Array<{ Icon: LucideIcon; key: Pillar; hint: string }> = [
    { Icon: TrendingUp, key: 'cash', hint: 'Close speed, forecasts, runway' },
    { Icon: BarChart3, key: 'reporting', hint: 'Audience, depth, commentary' },
    { Icon: Compass, key: 'planning', hint: 'Confidence, budget, scenarios' },
  ]

  return (
    <motion.div {...SCORECARD_STEP_ENTER} className="h-full w-full">
      <ScorecardCardChrome>
        <div className="flex h-full flex-col items-center text-center sm:items-stretch sm:text-left">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#0071E3]/20 bg-[#eef5ff]">
              <Sparkles size={20} strokeWidth={1.6} className="text-[#0071E3]" />
            </div>
            <span className="rounded-pill border border-black/[0.08] bg-[#fbfbfd] px-3.5 py-2 text-[13px] font-semibold text-[#6e6e73]">
              01 / Start
            </span>
          </div>

          <h3
            className="mt-5 max-w-[560px] tracking-[-0.025em] text-[#1d1d1f]"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: '1.1', fontWeight: 700 }}
          >
            Start with your current finance rhythm.
          </h3>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.55] text-[#6e6e73] sm:text-[18px]">
            7 questions across three pillars. We score your answers in real time and show you where
            to focus first.
          </p>

          <ul className="mt-6 grid w-full grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-3">
            {previewPillars.map(({ Icon, key, hint }) => (
              <li
                key={key}
                className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-[#fbfbfd] p-4 text-left sm:flex-col sm:items-start sm:gap-3 sm:p-5"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#0071E3]/15 bg-white text-[#0071E3]">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-tight text-[#1d1d1f]">
                    {PILLAR_META[key].label}
                  </p>
                  <p className="mt-1 text-[14px] leading-[1.45] text-[#6e6e73]">{hint}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex w-full flex-col items-center gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-[#0071E3] px-7 py-4 text-[16px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0077ED] hover:shadow-[0_14px_34px_-10px_rgba(0,113,227,0.55)] sm:w-auto"
            >
              Start the assessment
              <ArrowRight size={17} />
            </button>
            <p className="text-[14px] text-[#86868b] sm:text-right">
              30 seconds · No email needed to see your score.
            </p>
          </div>
        </div>
      </ScorecardCardChrome>
    </motion.div>
  )
}

function ScorecardQuestion({
  index,
  total,
  question,
  selected,
  onSelect,
  onBack,
}: {
  index: number
  total: number
  question: (typeof SCORECARD_QUESTIONS)[number]
  selected: number
  onSelect: (score: number) => void
  onBack: () => void
}) {
  const progress = Math.round(((index + 1) / total) * 100)

  return (
    <motion.div {...SCORECARD_STEP_ENTER} className="h-full w-full">
      <ScorecardCardChrome>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0071E3]">
            {PILLAR_META[question.pillar].label}
          </p>
          <span className="rounded-pill border border-black/[0.08] bg-[#fbfbfd] px-3.5 py-2 text-[13px] font-semibold text-[#6e6e73]">
            {progress}% complete
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= index ? 'bg-[#0071E3]' : 'bg-black/[0.06]'
              }`}
            />
          ))}
        </div>
        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">
          Question {index + 1} of {total}
        </p>

        <h3
          className="mt-3 max-w-[680px] tracking-[-0.025em] text-[#1d1d1f]"
          style={{ fontSize: 'clamp(26px, 2.8vw, 36px)', lineHeight: '1.15', fontWeight: 700 }}
        >
          {question.question}
        </h3>

        <ul className="mt-7 space-y-3">
          {question.options.map((opt, optIndex) => {
            const isSelected = selected === opt.score
            return (
              <li key={opt.label}>
                <button
                  type="button"
                  onClick={() => onSelect(opt.score)}
                  aria-pressed={isSelected}
                  className={`group flex min-h-[60px] w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-[17px] font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-[#0071E3] bg-[#eef5ff] text-[#1d1d1f] shadow-[0_4px_18px_-6px_rgba(0,113,227,0.35)]'
                      : 'border-black/[0.1] bg-white text-[#1d1d1f] hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_8px_22px_-12px_rgba(15,15,30,0.18)]'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold transition-colors ${
                        isSelected
                          ? 'bg-[#0071E3] text-white'
                          : 'bg-black/[0.04] text-[#6e6e73] group-hover:bg-[#eef5ff] group-hover:text-[#0071E3]'
                      }`}
                    >
                      {optIndex + 1}
                    </span>
                    <span>{opt.label}</span>
                  </span>
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${
                      isSelected
                        ? 'border-[#0071E3] bg-[#0071E3] text-white'
                        : 'border-black/[0.18] bg-white text-transparent group-hover:border-black/30'
                    }`}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
        >
          <ArrowLeft size={15} />
          {index === 0 ? 'Back to intro' : 'Previous question'}
        </button>
      </ScorecardCardChrome>
    </motion.div>
  )
}

function ScorecardRadialDial({ score, color }: { score: number; color: string }) {
  const reduce = useReducedMotion()
  const radius = 64
  const stroke = 12
  const size = 160
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const filled = Math.max(0, Math.min(1, score / 100)) * circumference

  const [display, setDisplay] = useState(reduce ? score : 0)
  useEffect(() => {
    if (reduce) {
      setDisplay(score)
      return
    }
    const start = performance.now()
    const duration = 1400
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(score * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score, reduce])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e8e8ed"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-[#1d1d1f]"
          style={{ fontSize: 44, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          {display}
        </span>
        <span className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#86868b]">
          out of 100
        </span>
      </div>
    </div>
  )
}

function ScorecardPillarBar({
  label,
  score,
  color,
  delay,
}: {
  label: string
  score: number
  color: string
  delay: number
}) {
  const reduce = useReducedMotion()
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-[#1d1d1f]">{label}</span>
        <span className="text-[13px] font-medium text-[#6e6e73]">{score}/100</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{
            duration: reduce ? 0 : 1,
            ease: [0.22, 1, 0.36, 1],
            delay: reduce ? 0 : delay,
          }}
        />
      </div>
    </div>
  )
}

function ScorecardReveal({
  scores,
  onContinue,
}: {
  scores: { overall: number; perPillar: Record<Pillar, number> }
  onContinue: () => void
}) {
  const band = getBand(scores.overall)
  const pillars: Array<{ key: Pillar; color: string }> = [
    { key: 'cash', color: '#0071E3' },
    { key: 'reporting', color: '#5cb3ff' },
    { key: 'planning', color: '#1d4ed8' },
  ]

  return (
    <motion.div {...SCORECARD_STEP_ENTER} className="h-full w-full">
      <ScorecardCardChrome>
        <div className="flex h-full flex-col">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${band.bgClass}`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: band.color }}
              />
              {band.label}
            </span>
            <span className="rounded-pill border border-black/[0.08] bg-[#fbfbfd] px-3 py-1.5 text-[12px] font-semibold text-[#6e6e73]">
              03 / Results
            </span>
          </div>

          {/* Dial + pillar bars */}
          <div className="mt-4 grid items-center gap-5 md:grid-cols-[auto,1fr] md:gap-8">
            <div className="mx-auto md:mx-0">
              <ScorecardRadialDial score={scores.overall} color={band.color} />
            </div>
            <div>
              <h3
                className="tracking-[-0.02em] text-[#1d1d1f]"
                style={{ fontSize: 'clamp(20px, 2.1vw, 26px)', lineHeight: '1.18', fontWeight: 400 }}
              >
                Your finance clarity score.
              </h3>
              <div className="mt-3 space-y-3 sm:mt-4">
                {pillars.map((p, i) => (
                  <ScorecardPillarBar
                    key={p.key}
                    label={PILLAR_META[p.key].label}
                    score={scores.perPillar[p.key]}
                    color={p.color}
                    delay={0.4 + i * 0.15}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Compact next-steps grid */}
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:mt-6">
            {(Object.keys(PILLAR_META) as Pillar[]).map((p) => (
              <div
                key={p}
                className="rounded-xl border border-black/[0.06] bg-[#fbfbfd] p-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0071E3]">
                  {PILLAR_META[p].label}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-[1.45] text-[#1d1d1f] sm:text-[13px]">
                  {getNextStep(p, scores.perPillar[p])}
                </p>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-5 flex flex-col gap-2 border-t border-black/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-5">
            <p className="text-[12.5px] leading-[1.5] text-[#6e6e73] sm:text-[13px]">
              Detailed breakdown + 2–3 things to ask Cunos in a free call.
            </p>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <a
                href="#contact"
                className="text-[12.5px] font-medium text-[#6e6e73] transition-colors hover:text-[#0071E3]"
              >
                Skip — book a call →
              </a>
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-[#0071E3] px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-200 hover:bg-[#0077ED] hover:shadow-[0_10px_28px_-8px_rgba(0,113,227,0.45)]"
              >
                Email me the breakdown
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </ScorecardCardChrome>
    </motion.div>
  )
}

function ScorecardCapture({
  scores,
  onSubmit,
  onBack,
  sending,
  error,
}: {
  scores: { overall: number; perPillar: Record<Pillar, number> }
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onBack: () => void
  sending: boolean
  error: string | null
}) {
  return (
    <motion.div {...SCORECARD_STEP_ENTER} className="h-full w-full">
      <ScorecardCardChrome>
        <form onSubmit={onSubmit} className="relative">
          <div className="rounded-2xl border border-[#0071E3]/15 bg-[#eef5ff] px-5 py-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0071E3]">
              Your score
            </p>
            <p className="mt-1.5 text-[15px] text-[#1d1d1f] sm:text-[16px]">
              <span className="font-medium">{scores.overall}/100</span>
              <span className="text-[#6e6e73]">
                {' '}· Cash {scores.perPillar.cash} · Reporting {scores.perPillar.reporting} ·
                Planning {scores.perPillar.planning}
              </span>
            </p>
          </div>

          <h3
            className="mt-7 tracking-[-0.02em] text-[#1d1d1f]"
            style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: '1.2', fontWeight: 400 }}
          >
            Where should we send your detailed breakdown?
          </h3>
          <p className="mt-2 text-[14px] leading-[1.55] text-[#6e6e73] sm:text-[15px]">
            We'll email your scorecard, benchmarks for businesses your size, and 2–3 things you
            could ask Cunos in a free 30-minute call.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field name="name" label="Name" placeholder="Your full name" required />
            <Field
              name="email"
              type="email"
              label="Email"
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="mt-5">
            <label className="block">
              <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-[#86868b]">
                Annual revenue (rough)
              </span>
              <select
                name="revenue"
                defaultValue=""
                className="block w-full rounded-2xl border border-black/[0.13] bg-white px-4 py-3.5 text-[16px] text-[#1d1d1f] shadow-[0_1px_2px_rgba(15,15,30,0.03)] transition-all duration-200 focus:border-[#2997ff] focus:outline-none focus:ring-4 focus:ring-[#2997ff]/15 sm:text-[15px]"
              >
                <option value="" disabled>
                  Select a band
                </option>
                <option value="Pre-revenue">Pre-revenue</option>
                <option value="Up to £1m">Up to £1m</option>
                <option value="£1m – £5m">£1m – £5m</option>
                <option value="£5m – £10m">£5m – £10m</option>
                <option value="£10m – £25m">£10m – £25m</option>
                <option value="£25m+">£25m+</option>
              </select>
            </label>
          </div>

          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-[1.5] text-red-700"
            >
              {error}
            </div>
          )}

          <div className="mt-7 flex flex-col-reverse items-stretch gap-4 border-t border-black/[0.06] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
            >
              <ArrowLeft size={14} />
              Back to results
            </button>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-[#0071E3] px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#0077ED] hover:shadow-[0_10px_28px_-8px_rgba(0,113,227,0.45)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-none"
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send me the breakdown
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          <p className="mt-4 text-center text-[12px] leading-[1.5] text-[#86868b] sm:text-right">
            Your answers are sent privately to Cunos. We don't share your details.
          </p>
        </form>
      </ScorecardCardChrome>
    </motion.div>
  )
}

/* ------------------------------- CONTACT ------------------------------ */

function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-120, 120])
  const orb2Y = useTransform(scrollYProgress, [0, 1], [120, -120])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.4, 1, 1, 0.5])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    /* Honeypot check — bots fill this hidden field */
    if (String(data.get('_honey') ?? '')) return

    setError(null)
    setSending(true)

    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          _subject: `Cunos enquiry — ${name || email}`,
          _template: 'table',
          _captcha: 'false',
          _autoresponse:
            "Thanks for getting in touch with Cunos. We'll come back to you within one working day. — The Cunos team",
        }),
      })

      if (!res.ok) throw new Error(`Form gateway returned ${res.status}`)

      form.reset()
      setSent(true)
    } catch (err) {
      console.error(err)
      setError(
        `Sorry — something went wrong sending your message. Please email us directly at ${CONTACT.email}.`,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate overflow-hidden bg-[#1a1330] py-24 sm:py-32 md:py-40 lg:py-48"
    >
      <motion.div
        aria-hidden
        style={{ y: orb1Y, opacity: orbOpacity }}
        className="pointer-events-none absolute -top-40 left-[10%] h-[680px] w-[680px] rounded-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, rgba(92,179,255,0.32), transparent 65%)',
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orb2Y, opacity: orbOpacity }}
        className="pointer-events-none absolute bottom-[-20%] right-[-5%] h-[600px] w-[600px] rounded-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, rgba(124,92,255,0.28), transparent 65%)',
          }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Left — eyebrow, headline, supporting copy, contact items */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
            className="text-center md:col-span-5 md:text-left"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5cb3ff] md:justify-start"
            >
              <span className="h-px w-7 bg-[#5cb3ff] sm:w-8" />
              Contact
            </motion.div>

            <h2
              className="mt-5 text-white sm:mt-6"
              style={{
                fontSize: 'clamp(64px, 9vw, 160px)',
                lineHeight: '1.0',
                letterSpacing: '-0.04em',
                fontWeight: 700,
              }}
            >
              <RevealHeading
                parts={[{ text: "Let's" }, { text: 'talk.', mute: true }]}
              />
            </h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="mx-auto mt-5 max-w-[460px] text-[17px] font-normal leading-[1.55] text-white/65 sm:mt-6 sm:text-[19px] md:mx-0"
            >
              Tell us where you struggle with your finances. In a personal call, we'll provide a
              first audit and identify your road to financial control.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <ContactDetails className="mt-10 hidden space-y-5 rounded-[24px] border border-white/25 bg-white/[0.10] p-6 shadow-[0_24px_64px_-30px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:mt-12 md:block" />
            </motion.div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="md:col-span-7"
          >
            {sent ? (
              <SuccessCard onReset={() => setSent(false)} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-[28px] border border-white/25 bg-white/[0.12] p-7 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55),0_12px_36px_-24px_rgba(92,179,255,0.45)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[32px] sm:p-10 md:p-14"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-60"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)',
                  }}
                />

                <div className="relative mb-8 border-b border-white/15 pb-7 text-center sm:mb-10 sm:pb-8 sm:text-left">
                  <span className="inline-flex items-center gap-2 rounded-pill border border-[#5cb3ff]/40 bg-[#5cb3ff]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9fd0ff]">
                    <Mail size={13} strokeWidth={1.8} />
                    Contact form
                  </span>
                  <h3 className="mt-5 text-[30px] font-bold leading-[1.05] tracking-[-0.035em] text-white sm:text-[40px]">
                    Send a short message.
                  </h3>
                  <p className="mx-auto mt-3 max-w-[560px] text-[16px] leading-[1.55] text-white/75 sm:mx-0 sm:text-[17px]">
                    Tell us what feels unclear. We'll come back within one working day.
                  </p>
                </div>

                <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field name="name" label="Name" placeholder="Your full name" required />
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="relative mt-6">
                  <Field name="company" label="Company" placeholder="Where do you work?" />
                </div>

                <div className="relative mt-6">
                  <Field
                    name="message"
                    label="What do you need support with?"
                    placeholder="A few lines about where finance feels unclear right now."
                    textarea
                    required
                  />
                </div>

                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                {error && (
                  <div
                    role="alert"
                    className="relative mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[14px] leading-[1.5] text-red-200 backdrop-blur-md"
                  >
                    {error}
                  </div>
                )}

                <div className="relative mt-10 flex flex-col gap-4 border-t border-white/15 pt-8">
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-[#0071E3] px-7 py-4 text-[16px] font-medium text-white transition-all duration-200 hover:bg-[#2997ff] hover:shadow-[0_14px_36px_-8px_rgba(41,151,255,0.55)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-none"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[12px] leading-[1.5] text-white/45">
                    By submitting you agree to be contacted by Cunos Consulting. We don't share
                    your details.
                  </p>
                </div>
              </form>
            )}

            <ContactDetails className="mt-8 space-y-5 rounded-[24px] border border-white/25 bg-white/[0.10] p-6 shadow-[0_24px_64px_-30px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SuccessCard({
  onReset,
  title = 'Message sent.',
  body = "Thanks for reaching out. We'll come back to you within one working day.",
  resetLabel = 'Send another message',
  className = '',
}: {
  onReset: () => void
  title?: string
  body?: string
  resetLabel?: string
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center justify-center rounded-[28px] border border-white/15 bg-white/[0.06] p-10 text-center shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:rounded-[32px] sm:p-14 md:p-16 ${className}`}
    >
      <div className="grid h-16 w-16 place-items-center rounded-full border border-[#5cb3ff]/30 bg-[#5cb3ff]/15 backdrop-blur-md">
        <CheckCircle2 size={30} strokeWidth={1.8} className="text-[#5cb3ff]" />
      </div>
      <h3
        className="mt-6 text-white"
        style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', lineHeight: '1.1', letterSpacing: '-0.035em', fontWeight: 700 }}
      >
        {title}
      </h3>
      <p className="mt-3 max-w-[460px] text-[17px] leading-[1.5] text-white/65">{body}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#5cb3ff] transition-colors hover:text-white"
      >
        {resetLabel}
        <ArrowRight size={14} />
      </button>
    </motion.div>
  )
}

function ContactItem({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon
  label: string
  value: ReactNode
}) {
  return (
    <li className="flex items-start gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/25 bg-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
        <Icon size={17} strokeWidth={1.6} className="text-white/85" />
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
          {label}
        </p>
        <p className="mt-1 text-[16px] text-white/90">{value}</p>
      </div>
    </li>
  )
}

function ContactDetails({ className = '' }: { className?: string }) {
  return (
    <ul className={className}>
      <ContactItem
        Icon={Mail}
        label="Email"
        value={
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-white/90 transition-colors hover:text-[#5cb3ff]"
          >
            {CONTACT.email}
          </a>
        }
      />
      <ContactItem
        Icon={Phone}
        label="Call"
        value={
          <a
            href={CONTACT.phoneHref}
            className="text-white/90 transition-colors hover:text-[#5cb3ff]"
          >
            {CONTACT.phoneDisplay}
          </a>
        }
      />
      <ContactItem Icon={MapPin} label="Based in" value="London, United Kingdom" />
      <ContactItem Icon={Clock} label="Response" value="Within one working day" />
    </ul>
  )
}

type FieldProps = {
  name: string
  label: string
  placeholder?: string
  type?: string
  textarea?: boolean
  required?: boolean
}

function Field({ name, label, placeholder, type = 'text', textarea, required }: FieldProps) {
  const baseCls =
    'block w-full rounded-2xl border border-white/25 bg-white/[0.10] px-5 py-4 text-[16px] text-white placeholder-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-md transition-all duration-200 focus:border-[#9fd0ff]/70 focus:bg-white/[0.14] focus:outline-none focus:ring-4 focus:ring-[#5cb3ff]/25 sm:text-[17px]'
  return (
    <label className="block">
      <span className="mb-2.5 block text-[12px] font-medium uppercase tracking-[0.08em] text-white/55">
        {label}
        {required ? <span className="ml-1 text-[#5cb3ff]">*</span> : null}
      </span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={5} className={baseCls} />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={baseCls}
        />
      )}
    </label>
  )
}

/* -------------------------------- FOOTER ------------------------------ */

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-[#f5f8fc]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(15,15,30,0.1), transparent)',
        }}
      />

      <div className="mx-auto w-full max-w-[1640px] px-4 py-14 sm:px-5 sm:py-16 md:px-6 md:py-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
          className="flex flex-col items-center gap-6 border-b border-black/[0.08] pb-10 text-center md:flex-row md:items-center md:justify-between md:pb-12 md:text-left"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0071E3]">
              Next step
            </p>
            <h2
              className="mt-3 text-[#1d1d1f]"
              style={{
                fontSize: 'clamp(64px, 9vw, 160px)',
                lineHeight: '1.0',
                letterSpacing: '-0.04em',
                fontWeight: 700,
              }}
            >
              <RevealHeading
                parts={[
                  { text: 'Ready for' },
                  { text: 'clearer' },
                  { text: 'finance' },
                  { text: 'control?', mute: true },
                ]}
              />
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-[1.55] text-[#6e6e73] sm:text-[16px] md:mx-0">
              Send a short message or contact Cunos directly. We’ll come back within one working
              day.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:shrink-0"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-[#0071E3] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#0077ED]"
            >
              Book a call
              <ArrowRight size={15} />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-black/[0.1] bg-white px-6 py-3 text-[14px] font-medium text-[#1d1d1f] transition-all hover:border-[#0071E3]/30 hover:text-[#0071E3]"
            >
              <Mail size={15} strokeWidth={1.8} />
              Email us
            </a>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 pt-10 md:grid-cols-12 md:gap-16 md:pt-12">
          {/* Brand block */}
          <div className="text-center md:col-span-5 md:text-left">
            <a href="#top" className="inline-block">
              <p className="font-display text-[20px] font-semibold tracking-[-0.014em] text-[#1d1d1f] sm:text-[22px]">
                Cunos Consulting
              </p>
            </a>
            <p className="mx-auto mt-3 max-w-[340px] text-[14px] leading-[1.55] text-[#6e6e73] sm:text-[15px] md:mx-0">
              Senior finance support, reporting, and cash visibility — made for founders.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2.5 sm:mt-7 md:justify-start">
              <SocialLink href={CONTACT.whatsappHref} label="WhatsApp Cunos">
                <WhatsAppIcon size={15} className="text-[#25D366]" />
              </SocialLink>
              <SocialLink href={CONTACT.phoneHref} label="Call Cunos">
                <Phone size={15} strokeWidth={1.8} />
              </SocialLink>
              <SocialLink href={`mailto:${CONTACT.email}`} label="Email Cunos">
                <Mail size={15} strokeWidth={1.8} />
              </SocialLink>
              <SocialLink href={CONTACT.linkedinHref} label="LinkedIn">
                <Linkedin size={15} strokeWidth={1.8} />
              </SocialLink>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:gap-x-10">
              <FooterCol
                title="Site"
                links={[
                  ['Overview', '#top'],
                  ["What's next", '#whats-next'],
                  ['Contact', '#contact'],
                ]}
              />
              <FooterCol
                title="Get in touch"
                links={[
                  ['Email us', `mailto:${CONTACT.email}`],
                  ['Call Cunos', CONTACT.phoneHref],
                  ['Book a call', '#contact'],
                ]}
              />
              <FooterCol
                title="Company"
                links={[
                  ['London, United Kingdom'],
                  ['Response within one working day'],
                  ['Cunos Consulting Ltd.'],
                ]}
              />
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-16 flex flex-col items-center gap-3 border-t border-black/[0.08] pt-7 text-center text-[12px] text-[#86868b] md:flex-row md:items-center md:justify-between md:text-left">
          <p>© {year} Cunos Consulting Ltd. All rights reserved.</p>
          <p className="inline-flex items-center justify-center gap-1.5">
            <MapPin size={12} strokeWidth={1.8} className="text-[#86868b]" />
            London, United Kingdom
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="grid h-9 w-9 place-items-center rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] transition-all duration-200 hover:border-[#0071E3]/30 hover:text-[#0071E3] hover:shadow-[0_4px_12px_rgba(0,113,227,0.12)]"
    >
      {children}
    </a>
  )
}

function FooterCol({ title, links }: { title: string; links: ReadonlyArray<readonly [string, string?]> }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            {href ? (
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[14px] text-[#1d1d1f]/85 transition-colors hover:text-[#0071E3]"
              >
                {label}
              </a>
            ) : (
              <span className="text-[14px] text-[#1d1d1f]/70">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
