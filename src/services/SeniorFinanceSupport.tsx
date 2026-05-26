// @ts-nocheck — file under active development, strict TS checks disabled while in flux
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Compass,
  CreditCard,
  Eye,
  FileText,
  Layers,
  LineChart,
  Mail,
  Minus,
  Plus,
  Quote,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

import { CONTACT, Footer, Nav, RevealHeading, ScrollProgress } from '../App'

export const EASE = [0.22, 1, 0.36, 1] as const
export function PageProgressInternal() { return null }

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const PAGE_SECTIONS: Array<{ id: string; label: string }> = [
  { id: 'top', label: 'Service' },
  { id: 'problem', label: 'The problem' },
  { id: 'solution', label: 'What we cover' },
  { id: 'deliverable', label: 'The deliverable' },
  { id: 'voice', label: 'The promise' },
  { id: 'founder', label: 'Senior advisor' },
  { id: 'who', label: 'Who this is for' },
  { id: 'how', label: 'How we work' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'outcome', label: 'The outcome' },
  { id: 'faq', label: 'FAQ' },
  { id: 'review', label: 'Next step' },
]

export default function SeniorFinanceSupport() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useSeoMeta()

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-black text-ink">
      <ScrollProgress />
      <Nav />
      <PageProgress />
      <Hero />
      <Problem />
      <Solution />
      <Deliverable />
      <PullQuote />
      <FounderNote />
      <WhoFor />
      <HowWeWork />
      <Engagement />
      <Outcome />
      <FAQ />
      <FinalCTA />
      <StickyCTA />
      <Footer />
    </main>
  )
}

/* ----------------------------- SHARED ATOMS ---------------------------- */

export function Eyebrow({
  children,
  tone = 'light',
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
}) {
  const textCls = tone === 'dark' ? 'text-[#9fd0ff]' : 'text-[#0071E3]'
  const barCls = tone === 'dark' ? 'bg-[#9fd0ff]' : 'bg-[#0071E3]'
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
      }}
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${textCls} sm:text-[12px]`}
    >
      <motion.span
        aria-hidden
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE, delay: 0.15 } },
        }}
        className={`block h-px w-10 origin-left ${barCls}`}
      />
      {children}
    </motion.p>
  )
}

export const SECTION_H2_STYLE = {
  fontSize: 'clamp(40px, 5.6vw, 88px)',
  lineHeight: '1.02',
  letterSpacing: '-0.035em',
  fontWeight: 700,
} as const

export const HUGE_H2_STYLE = {
  fontSize: 'clamp(56px, 8.5vw, 156px)',
  lineHeight: '1.0',
  letterSpacing: '-0.04em',
  fontWeight: 700,
} as const

/* --------------------------------- HERO -------------------------------- */

function Hero() {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], reduce ? [1, 1, 1] : [1, 0.6, 0])
  const videoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140])
  const videoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1.04, 1.04] : [1.04, 1.2])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.play().catch(() => {})
    const onTime = () => {
      if (v.duration && v.currentTime >= v.duration * 0.92) v.currentTime = 0
    }
    v.addEventListener('timeupdate', onTime)
    return () => v.removeEventListener('timeupdate', onTime)
  }, [])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-black pt-28 sm:pt-32 md:pt-36"
    >
      {!reduce && (
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ y: videoY, scale: videoScale }}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
          src={`${import.meta.env.BASE_URL}media/services/senior-finance-support.mp4`}
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-[640px] max-w-[1200px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.30), transparent 70%)',
        }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative mx-auto w-full max-w-[1640px] px-4 pb-20 sm:px-5 sm:pb-28 md:px-6 md:pb-32 lg:px-8"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-[1200px]"
        >
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9fd0ff] sm:text-[13px]"
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="block h-px w-12 origin-left bg-[#9fd0ff]/85"
            />
            Senior finance support
          </motion.p>

          <h1
            className="mt-7 text-white sm:mt-9"
            style={{
              fontSize: 'clamp(56px, 9vw, 156px)',
              lineHeight: '1.0',
              letterSpacing: '-0.045em',
              fontWeight: 700,
            }}
          >
            <RevealHeading
              baseDelay={0.4}
              gap={0.16}
              parts={[
                { text: 'Full' },
                { text: 'Financial', mute: true },
                { text: 'Control.', mute: true },
              ]}
            />
          </h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
            className="mt-10 max-w-[780px] text-[18px] leading-[1.6] text-white/72 sm:text-[22px] sm:leading-[1.55]"
          >
            Experienced UK finance oversight for founder-led businesses — without the cost or
            commitment of hiring a full-time Finance Director.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.9, ease: EASE, delay: 1.55 }}
            className="mt-12 flex flex-col items-start gap-5 sm:mt-14 sm:flex-row sm:items-center sm:gap-7"
          >
            <MagneticButton
              href="#review"
              className="group inline-flex items-center justify-center gap-2.5 rounded-pill bg-[#0071E3] px-7 py-4 text-[15px] font-medium text-white transition-[background,box-shadow] duration-200 hover:bg-[#0077ED] hover:shadow-[0_18px_40px_-10px_rgba(0,113,227,0.55)] sm:px-8 sm:py-4 sm:text-[16px]"
            >
              Book a finance review
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </MagneticButton>
            <p className="max-w-[360px] text-[13.5px] leading-[1.5] text-white/55 sm:text-[14px]">
              A short conversation about what's working, what's stretched, and where better support
              could help.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ------------------- PROBLEM — sticky stacked cards -------------------- */

const PROBLEM_CARDS: Array<{
  symptom: string
  meaning: string
  video: string
}> = [
  {
    symptom: 'Invoices go out late.',
    meaning: 'Cash is not coming in as quickly as it should.',
    video: 'media/services/senior-finance-support.mp4',
  },
  {
    symptom: 'Payments become reactive.',
    meaning: 'There is not enough control over cash going out.',
    video: 'media/services/cashflow-forecast.mp4',
  },
  {
    symptom: 'Reports take longer to prepare.',
    meaning: 'Month-end is not giving you the clarity you need.',
    video: 'media/services/management-report.mp4',
  },
  {
    symptom: 'Finance becomes a bottleneck.',
    meaning: 'Decisions slow down. Risk goes up. The business carries it.',
    video: 'media/codex-bg.mp4',
  },
]

function Problem() {
  return (
    <section id="problem" className="relative isolate bg-[#fbfbfd] py-28 sm:py-36 md:py-44">
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            Your business has grown. Your finance setup needs to catch up.
          </h2>
          <p className="mt-9 max-w-[640px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
            As your business grows, finance gets harder to manage with the same setup. Four shifts
            happen before founders notice.
          </p>
        </div>

        {/* Stacking arena — short trailing zone so the final card lands as the
            climax for a beat, then the section releases. No scroll-hijack;
            aggressive scrolling carries straight through. */}
        <div className="relative mt-20 sm:mt-28 md:mt-32 min-h-[180vh]">
          {PROBLEM_CARDS.map((card, i) => (
            <ProblemCard key={card.symptom} {...card} index={i} total={PROBLEM_CARDS.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Visible "title strip" height — drives both the inter-card sticky offset
// and the card padding-top, so each behind card always shows its title.
const CARD_STRIP_REM = 8.5

function ProblemCard({
  symptom,
  meaning,
  video,
  index,
  total,
}: {
  symptom: string
  meaning: string
  video: string
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Subtle scroll-driven scale: cards behind settle back a touch as the next
  // one stacks on top — creates continuous visual motion without changing the
  // brand palette. Front card stays at scale 1.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    reduce ? [1, 1, 1, 1] : [1, 1, 0.99, 0.98],
  )

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.play().catch(() => {})
  }, [])

  const stickyTop = `calc(6rem + ${index * CARD_STRIP_REM}rem)`

  return (
    <motion.div
      ref={ref}
      style={{
        top: stickyTop,
        zIndex: 10 + index,
        scale,
        willChange: 'transform',
      }}
      className="sticky origin-top"
    >
      <article className="relative overflow-hidden rounded-[28px] border border-white/80 shadow-[0_30px_70px_-30px_rgba(8,24,52,0.45),0_1px_0_rgba(255,255,255,0.95)_inset] sm:rounded-[32px]">
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 h-full w-full scale-[1.05] object-cover"
          src={`${import.meta.env.BASE_URL}${video}`}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#06122a]/85 via-[#06122a]/68 to-[#06122a]/90"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Always-visible header strip — fits within CARD_STRIP_REM */}
        <div
          className="relative flex items-start justify-between gap-4 px-7 pt-6 text-white sm:gap-6 sm:px-10 sm:pt-7 md:px-14 md:pt-8 lg:px-16"
          style={{ minHeight: `${CARD_STRIP_REM}rem` }}
        >
          <h3
            className="text-white"
            style={{
              fontSize: 'clamp(32px, 5.4vw, 80px)',
              lineHeight: '1.04',
              letterSpacing: '-0.035em',
              fontWeight: 700,
            }}
          >
            {symptom}
          </h3>
          <span className="mt-2 inline-flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9fd0ff] sm:text-[12px]">
            <span className="block h-px w-8 bg-[#9fd0ff]" />
            <span className="tabular-nums">
              .{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </span>
        </div>

        {/* Detail area — hidden behind the next stacked card; visible only when this card is on top */}
        <div className="relative px-7 pb-10 pt-12 text-white sm:px-10 sm:pb-14 sm:pt-16 md:px-14 md:pb-20 md:pt-24 lg:px-16 lg:pt-28">
          <p className="max-w-[520px] border-l border-white/25 pl-5 text-[16px] leading-[1.55] text-white/78 sm:text-[19px]">
            {meaning}
          </p>
        </div>
      </article>
    </motion.div>
  )
}

/* ------------------------ PAIN POINTS — clean list --------------------- */

const PAIN_POINTS: Array<{ symptom: string; meaning: string }> = [
  {
    symptom: 'Invoices are going out late',
    meaning: 'Cash is not coming in as quickly as it should',
  },
  {
    symptom: 'Payments feel rushed or unclear',
    meaning: 'There is not enough control over cash going out',
  },
  {
    symptom: 'Reports are late or hard to understand',
    meaning: 'Month-end is not giving you the clarity you need',
  },
  {
    symptom: 'Errors keep appearing',
    meaning: 'The process is too manual or stretched',
  },
  {
    symptom: 'Finance relies on one person knowing everything',
    meaning: 'The business is carrying unnecessary risk',
  },
  {
    symptom: 'You only spot issues after they happen',
    meaning: 'There is not enough senior oversight',
  },
]

function PainPoints() {
  return (
    <section id="pain" className="relative isolate overflow-hidden bg-[#f5f8fc] py-28 text-[#1d1d1f] sm:py-40 md:py-48">
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>Signs to watch</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            Signs your finance setup is stretched.
          </h2>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 divide-y divide-black/[0.08] border-y border-black/[0.08] sm:mt-20"
        >
          {PAIN_POINTS.map((point, i) => (
            <PainRow key={point.symptom} {...point} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function PainRow({
  symptom,
  meaning,
  index,
}: {
  symptom: string
  meaning: string
  index: number
}) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease: EASE, delay: 0.04 * index },
        },
      }}
      className="group grid grid-cols-1 gap-y-3 py-8 sm:py-10 md:grid-cols-[7rem,1.1fr,1fr] md:items-baseline md:gap-x-10"
    >
      <span className="tabular-nums text-[12px] font-semibold tracking-[0.18em] text-[#0071E3] sm:text-[13px]">
        .{String(index + 1).padStart(2, '0')}
      </span>
      <p
        className="text-[#1d1d1f]"
        style={{
          fontSize: 'clamp(22px, 2.8vw, 36px)',
          lineHeight: '1.15',
          letterSpacing: '-0.025em',
          fontWeight: 500,
        }}
      >
        {symptom}.
      </p>
      <p className="text-[15px] italic leading-[1.5] text-[#6e6e73] sm:text-[17px]">
        → {meaning}.
      </p>
    </motion.li>
  )
}

/* -------------------- SOLUTION — draggable slides ---------------------- */

const SOLUTION_AREAS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: FileText,
    title: 'Invoicing',
    body: 'Strengthening the way billing is reviewed, tracked, and followed through.',
  },
  {
    icon: CreditCard,
    title: 'Supplier payments',
    body: 'Improving visibility over what needs to be paid and when.',
  },
  {
    icon: BarChart3,
    title: 'Month-end reporting',
    body: 'Creating a clearer reporting process and better review routine.',
  },
  {
    icon: ShieldCheck,
    title: 'Finance controls',
    body: 'Reducing errors, duplication, and unclear ownership.',
  },
  {
    icon: LineChart,
    title: 'Cash visibility',
    body: 'Helping you understand what is coming in, what is going out, and what needs attention.',
  },
  {
    icon: Workflow,
    title: 'Process structure',
    body: 'Moving finance away from messy, manual, reactive ways of working.',
  },
]

function Solution() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], [-100, 100])

  return (
    <section
      ref={ref}
      id="solution"
      className="relative isolate overflow-hidden bg-[#06122a] py-28 text-white sm:py-40 md:py-48"
    >
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="pointer-events-none absolute -left-32 top-[10%] h-[680px] w-[680px] rounded-full opacity-60"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,113,227,0.42), transparent 65%)',
          }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow tone="dark">What we help improve</Eyebrow>
          <h2 className="mt-7 text-white" style={SECTION_H2_STYLE}>
            Six finance areas, made stronger.
          </h2>
          <p className="mt-9 max-w-[720px] text-[17px] leading-[1.55] text-white/65 sm:text-[19px]">
            You may not need a full-time Finance Director yet. You may need someone senior enough
            to review how finance is working, identify the gaps, and create a clearer way forward.
          </p>
        </div>

        <SolutionSlider />
      </div>
    </section>
  )
}

function SolutionSlider() {
  const [active, setActive] = useState(0)
  const total = SOLUTION_AREAS.length
  const viewportRef = useRef<HTMLDivElement>(null)
  const slideWidthRef = useRef(0)

  const measure = () => {
    const node = viewportRef.current
    if (!node) return
    const first = node.querySelector<HTMLElement>('[data-slide]')
    if (!first) return
    const gap = parseFloat(getComputedStyle(node).columnGap || '20')
    slideWidthRef.current = first.offsetWidth + (Number.isFinite(gap) ? gap : 20)
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const goTo = (i: number) => {
    const node = viewportRef.current
    if (!node) return
    measure()
    const clamped = Math.max(0, Math.min(total - 1, i))
    setActive(clamped)
    node.scrollTo({ left: clamped * slideWidthRef.current, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const node = viewportRef.current
    if (!node || slideWidthRef.current === 0) return
    const idx = Math.round(node.scrollLeft / slideWidthRef.current)
    if (idx !== active) setActive(idx)
  }

  const progressBars = useMemo(() => Array.from({ length: total }), [total])

  return (
    <div className="mt-16 sm:mt-20">
      {/* Controls row */}
      <div className="flex items-center justify-between gap-6 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/55">
          <span className="tabular-nums text-white">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="block h-px w-8 bg-white/25" />
          <span className="tabular-nums">{String(total).padStart(2, '0')}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous area"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-white transition-all hover:border-[#5cb3ff]/50 hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-white/[0.06]"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            aria-label="Next area"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-white transition-all hover:border-[#5cb3ff]/50 hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-white/[0.06]"
          >
            <ArrowRight size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Progress bars */}
      <div className="mb-8 flex items-center gap-1.5 sm:mb-10">
        {progressBars.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to area ${i + 1}`}
            onClick={() => goTo(i)}
            className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"
          >
            <span
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                i < active ? 'w-full bg-[#5cb3ff]/55' : i === active ? 'w-full bg-[#5cb3ff]' : 'w-0 bg-[#5cb3ff]/55'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Viewport */}
      <div
        ref={viewportRef}
        onScroll={handleScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-5 sm:px-5 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8"
        style={{ scrollPaddingInline: 'inherit' }}
      >
        {SOLUTION_AREAS.map((area, i) => (
          <SolutionSlide
            key={area.title}
            area={area}
            index={i}
            total={total}
            active={i === active}
          />
        ))}
      </div>
    </div>
  )
}

function SolutionSlide({
  area,
  index,
  total,
  active,
}: {
  area: { icon: LucideIcon; title: string; body: string }
  index: number
  total: number
  active: boolean
}) {
  const Icon = area.icon
  return (
    <article
      data-slide
      className={`group relative flex shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border bg-white/[0.04] p-8 backdrop-blur-md transition-all duration-500 sm:p-10 md:p-12 ${active ? 'border-[#5cb3ff]/55 bg-white/[0.08] shadow-[0_30px_70px_-30px_rgba(92,179,255,0.5)]' : 'border-white/12'}`}
      style={{ width: 'min(82vw, 460px)', minHeight: 'clamp(420px, 48vh, 520px)' }}
    >
      <div className="flex items-start justify-between">
        <Icon
          size={26}
          strokeWidth={1.5}
          className={`transition-colors duration-300 ${active ? 'text-white' : 'text-[#9fd0ff]'}`}
        />
        <span className="tabular-nums text-[11px] font-semibold tracking-[0.18em] text-white/30">
          .{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <h3
        className="mt-auto pt-20 text-white"
        style={{
          fontSize: 'clamp(28px, 3vw, 40px)',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          fontWeight: 600,
        }}
      >
        {area.title}
      </h3>
      <p className="mt-4 max-w-[380px] text-[15px] leading-[1.55] text-white/65 sm:text-[16.5px]">
        {area.body}
      </p>
    </article>
  )
}

/* ------------------------------ PULL QUOTE ----------------------------- */

function PullQuote() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={ref}
      id="voice"
      className="relative isolate overflow-hidden bg-[#fbfbfd] py-28 text-[#1d1d1f] sm:py-40 md:py-48"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-[1200px] opacity-50"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.16), transparent 70%)',
          }}
        />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <Eyebrow>The promise</Eyebrow>
        <h2
          className="mt-7 max-w-[1500px] text-[#1d1d1f]"
          style={HUGE_H2_STYLE}
        >
          <RevealHeading
            baseDelay={0.05}
            gap={0.14}
            parts={[
              { text: 'Finance,' },
              { text: 'made' },
              { text: 'easier', mute: true },
              { text: 'to', mute: true },
              { text: 'manage.', mute: true },
            ]}
          />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="mt-10 max-w-[820px] font-serif text-[20px] italic leading-[1.45] text-[#3c3c43] sm:mt-14 sm:text-[26px]"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          <span className="text-[#0071E3]">“</span>The aim isn't more reports.
          It's better decisions — and the structure to make them.<span className="text-[#0071E3]">”</span>
        </motion.p>
      </div>
    </section>
  )
}

/* ----------------------- WHO FOR — compare block ----------------------- */

const WHO_PAIRS: Array<{ have: string; need: string }> = [
  { have: 'A bookkeeper or finance admin', need: 'More senior oversight' },
  { have: 'Regular invoices and supplier payments', need: 'Better process and control' },
  { have: 'Basic financial reports', need: 'Clearer monthly insight' },
  {
    have: 'Growing revenue or client work',
    need: 'Better visibility over cash and performance',
  },
  { have: 'A founder still involved in finance', need: 'More structure around decisions' },
]

function WhoFor() {
  return (
    <section
      id="who"
      className="relative isolate overflow-hidden bg-[#f5f8fc] py-28 text-[#1d1d1f] sm:py-40 md:py-48"
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            Built for founder-led businesses that need more structure.
          </h2>
          <p className="mt-9 max-w-[640px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
            For businesses that have moved beyond basic bookkeeping, but are not ready for a
            full-time Finance Director or CFO.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-y-10 sm:mt-20 md:grid-cols-2 md:gap-x-16 lg:gap-x-24"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#86868b] sm:text-[12px]"
            >
              You may have
            </motion.p>
            <motion.ul
              variants={stagger}
              className="mt-7 space-y-6 sm:mt-9 sm:space-y-7"
            >
              {WHO_PAIRS.map((p) => (
                <motion.li
                  key={p.have}
                  variants={fadeUp}
                  className="border-l border-black/[0.1] pl-5 text-[18px] leading-[1.4] text-[#6e6e73] sm:text-[22px]"
                >
                  {p.have}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div>
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071E3] sm:text-[12px]"
            >
              <span className="block h-px w-8 bg-[#0071E3]" />
              But now need
            </motion.p>
            <motion.ul
              variants={stagger}
              className="mt-7 space-y-6 sm:mt-9 sm:space-y-7"
            >
              {WHO_PAIRS.map((p) => (
                <motion.li
                  key={p.need}
                  variants={fadeUp}
                  className="border-l-2 border-[#0071E3] pl-5 text-[18px] font-medium leading-[1.4] tracking-[-0.01em] text-[#1d1d1f] sm:text-[22px]"
                >
                  {p.need}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ----------------------- HOW WE WORK — sticky timeline ----------------- */

const STEPS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Compass,
    title: 'Review the current setup',
    body: 'We review how finance currently works across invoicing, payments, reporting, controls, and cash visibility.',
  },
  {
    icon: TrendingDown,
    title: 'Identify what is stretched',
    body: 'We highlight where things are delayed, manual, unclear, duplicated, or relying too heavily on one person.',
  },
  {
    icon: Layers,
    title: 'Create a clearer finance routine',
    body: 'We help create better processes, clearer ownership, and reporting that gives the business a more useful view.',
  },
  {
    icon: TrendingUp,
    title: 'Support the business monthly',
    body: 'Through retained advisory support, we help keep finance moving in the right direction as the business grows.',
  },
]

function HowWeWork() {
  return (
    <section
      id="how"
      className="relative isolate overflow-hidden bg-[#fbfbfd] py-28 text-[#1d1d1f] sm:py-40 md:py-48"
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <Eyebrow>How we work</Eyebrow>
              <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
                A practical review of how finance is working.
              </h2>
              <p className="mt-9 max-w-[400px] text-[16px] leading-[1.55] text-[#6e6e73] sm:text-[17px]">
                Four practical steps from first review to monthly advisory support.
              </p>
            </div>
          </div>

          <ol className="relative md:col-span-8">
            <span
              aria-hidden
              className="absolute left-[15px] top-2 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-[#0071E3] via-[#0071E3]/30 to-transparent md:block"
            />
            {STEPS.map((step, i) => (
              <TimelineStep key={step.title} {...step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function TimelineStep({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: LucideIcon
  title: string
  body: string
  index: number
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.05 * index }}
      className="relative flex gap-7 pb-14 last:pb-0 md:gap-10 md:pb-20"
    >
      <div className="relative shrink-0 md:pt-1">
        <span
          aria-hidden
          className="absolute left-[15px] top-[12px] hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[#fbfbfd] md:block"
        />
        <motion.span
          aria-hidden
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 + 0.05 * index }}
          className="absolute left-[15px] top-[12px] hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[#0071E3] shadow-[0_0_0_4px_rgba(0,113,227,0.15)] md:block"
        />
        <span
          className="block pl-0 tabular-nums text-[#0071E3] md:pl-12"
          style={{
            fontSize: 'clamp(48px, 5.4vw, 84px)',
            lineHeight: '1',
            letterSpacing: '-0.045em',
            fontWeight: 300,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="min-w-0 flex-1 pt-1">
        <div className="flex items-center gap-3">
          <Icon size={17} strokeWidth={1.7} className="text-[#0071E3]/65" />
          <h3
            className="text-[#1d1d1f]"
            style={{
              fontSize: 'clamp(22px, 2.4vw, 34px)',
              lineHeight: '1.18',
              letterSpacing: '-0.025em',
              fontWeight: 600,
            }}
          >
            {title}
          </h3>
        </div>
        <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[#6e6e73] sm:text-[18px]">
          {body}
        </p>
      </div>
    </motion.li>
  )
}

/* ------------------------- OUTCOME — typographic ----------------------- */

function Outcome() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-140, 140])
  const orb2Y = useTransform(scrollYProgress, [0, 1], [140, -140])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.4, 1, 1, 0.5])

  return (
    <section
      ref={ref}
      id="outcome"
      className="relative isolate overflow-hidden bg-[#1a1330] py-32 text-white sm:py-44 md:py-52"
    >
      <motion.div
        aria-hidden
        style={{ y: orb1Y, opacity: orbOpacity }}
        className="pointer-events-none absolute -top-32 left-[10%] h-[640px] w-[640px] rounded-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, rgba(92,179,255,0.34), transparent 65%)',
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orb2Y, opacity: orbOpacity }}
        className="pointer-events-none absolute bottom-[-15%] right-[-5%] h-[560px] w-[560px] rounded-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, rgba(124,92,255,0.30), transparent 65%)',
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
        <Eyebrow tone="dark">The outcome</Eyebrow>
        <h2
          className="mt-7 max-w-[1500px] text-white"
          style={SECTION_H2_STYLE}
        >
          A finance function that feels less reactive.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 md:grid-cols-12 md:gap-12 lg:gap-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-[760px] text-[18px] leading-[1.55] text-white/72 sm:text-[22px] md:col-span-7"
          >
            With the right support, finance becomes easier to manage. You have clearer processes,
            cleaner reporting, fewer missed steps, and a stronger foundation for making decisions.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="max-w-[480px] text-[15px] italic leading-[1.5] text-white/50 sm:text-[17px] md:col-span-5"
          >
            The aim isn't to make finance more complicated. It's to make it easier to see what's
            happening, what needs attention, and what to do next.
          </motion.p>
        </div>

        {/* Stat band — animated counters reinforce the outcome quantitatively. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.05] sm:mt-24 sm:grid-cols-3"
        >
          {[
            { value: 13, suffix: ' weeks', label: 'Cashflow visibility', sub: 'Rolling 13-week forecast' },
            { value: 5, suffix: ' days', label: 'Month-end close', sub: 'Typical time to finished pack' },
            { value: 20, suffix: '+', label: 'Founder-led clients', sub: 'Across UK SME finance' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="bg-[#1a1330] px-6 py-7 sm:px-7 sm:py-8 md:px-9 md:py-10"
            >
              <p
                className="text-white"
                style={{
                  fontSize: 'clamp(40px, 5.4vw, 76px)',
                  lineHeight: '1.0',
                  letterSpacing: '-0.035em',
                  fontWeight: 300,
                }}
              >
                <AnimatedCounter to={s.value} suffix={s.suffix} duration={1.4 + i * 0.15} />
              </p>
              <p className="mt-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-[#9fd0ff]">
                {s.label}
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-white/55 sm:text-[14.5px]">
                {s.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------- FINAL CTA ----------------------------- */

function FinalCTA() {
  return (
    <section
      id="review"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#f2f7fb] py-28 sm:py-40 md:py-48"
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
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[#0b1220] p-10 text-white shadow-[0_40px_100px_-30px_rgba(8,24,52,0.55),0_1px_0_rgba(255,255,255,0.7)_inset] sm:rounded-[40px] sm:p-14 md:p-20 lg:p-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#0071E3]/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 right-4 h-72 w-72 rounded-full bg-[#5cb3ff]/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-14">
            <div className="md:col-span-7">
              <Eyebrow tone="dark">Next step</Eyebrow>

              <h2
                className="mt-7 text-white"
                style={SECTION_H2_STYLE}
              >
                Ready to review your finance setup?
              </h2>
              <p className="mt-8 max-w-[560px] text-[17px] leading-[1.55] text-white/72 sm:text-[20px]">
                Start with a short review of what's working, what's stretched, and where better
                structure is needed.
              </p>
            </div>

            <div className="md:col-span-5">
              <MagneticButton
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-[#0071E3] px-7 py-4 text-[15px] font-medium text-white transition-[background,box-shadow] duration-200 hover:bg-[#0077ED] hover:shadow-[0_18px_40px_-10px_rgba(0,113,227,0.55)] sm:px-8 sm:text-[16px]"
              >
                Book a finance review
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </MagneticButton>
              <div className="mt-6 flex flex-col gap-1.5 text-[13.5px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-[#9fd0ff]"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="transition-colors hover:text-[#9fd0ff]"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ===================================================================== */
/*                         POLISH-PASS COMPONENTS                         */
/* ===================================================================== */

/* ---------------------------- DELIVERABLE ------------------------------ */

function Deliverable() {
  return (
    <section
      id="deliverable"
      className="relative isolate overflow-hidden bg-[#fbfbfd] py-28 text-[#1d1d1f] sm:py-40 md:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-[1200px] opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.14), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="md:col-span-5">
            <Eyebrow>What you actually receive</Eyebrow>
            <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
              A monthly finance pack you can actually use.
            </h2>
            <p className="mt-9 max-w-[480px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
              Each month, a clear summary of how the business is performing, where cash is heading,
              and what needs attention next.
            </p>

            <ul className="mt-10 space-y-4 sm:mt-12">
              {[
                { Icon: BarChart3, label: 'KPI summary with trend commentary' },
                { Icon: LineChart, label: '13-week cashflow forecast' },
                { Icon: Eye, label: 'Variance vs. budget — flagged in plain English' },
                { Icon: CheckCircle2, label: 'Three clear next-step recommendations' },
              ].map(({ Icon, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 * i }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#0071E3]/15 bg-[#eef5ff] text-[#0071E3]">
                    <Icon size={15} strokeWidth={1.8} />
                  </span>
                  <span className="text-[15.5px] leading-[1.45] text-[#1d1d1f] sm:text-[17px]">
                    {label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7">
            <ReportMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function ReportMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.95, ease: EASE }}
      className="relative"
    >
      {/* Behind layer — second page peek */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-6 hidden h-[calc(100%-1rem)] rounded-[24px] border border-black/[0.06] bg-white/80 shadow-[0_30px_70px_-40px_rgba(15,15,30,0.18)] sm:block"
      />
      {/* Front pack */}
      <div className="relative overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_40px_90px_-40px_rgba(15,15,30,0.28),0_2px_0_rgba(255,255,255,0.95)_inset]">
        {/* Top brand bar */}
        <div
          aria-hidden
          className="h-1 w-full bg-gradient-to-r from-[#0071E3] via-[#5cb3ff] to-[#1d4ed8]"
        />

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/[0.06] px-6 py-6 sm:px-8 sm:py-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071E3]">
              Monthly Finance Pack
            </p>
            <h3
              className="mt-2 text-[#1d1d1f]"
              style={{
                fontSize: 'clamp(20px, 1.9vw, 26px)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                fontWeight: 700,
              }}
            >
              May 2026 — Acme Studio Ltd.
            </h3>
          </div>
          <div className="text-right text-[11px] text-[#86868b]">
            <p className="font-semibold uppercase tracking-[0.14em]">Prepared by</p>
            <p className="mt-1 text-[12.5px] text-[#1d1d1f]">Cunos Consulting</p>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 gap-px bg-black/[0.06] sm:grid-cols-4">
          {[
            { label: 'Revenue', value: '£284k', delta: '+8.2%', up: true },
            { label: 'Gross margin', value: '62.4%', delta: '+1.1pp', up: true },
            { label: 'Runway', value: '11.4mo', delta: '−0.3mo', up: false },
            { label: 'Cash on hand', value: '£612k', delta: '+£42k', up: true },
          ].map((k) => (
            <KPITile key={k.label} {...k} />
          ))}
        </div>

        {/* Mini cashflow chart */}
        <div className="border-b border-black/[0.06] px-6 py-7 sm:px-8 sm:py-9">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                13-week cash forecast
              </p>
              <p className="mt-1 text-[12.5px] text-[#1d1d1f]">
                <span className="font-semibold">£612k → £548k</span>
                <span className="text-[#86868b]"> · base case</span>
              </p>
            </div>
            <span className="hidden rounded-pill bg-[#eef5ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0071E3] sm:inline-block">
              Healthy
            </span>
          </div>
          <CashflowSparkline />
        </div>

        {/* Commentary */}
        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
            Commentary
          </p>
          <ul className="mt-3 space-y-2.5 text-[13.5px] leading-[1.5] text-[#1d1d1f] sm:text-[14.5px]">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071E3]" />
              Revenue up 8.2% on April; two new retainers signed in week 3.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071E3]" />
              Three overdue receivables ({'>'}45 days) — escalation memo attached.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071E3]" />
              Recommended: bring forward Q3 hire decision to August review.
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function KPITile({
  label,
  value,
  delta,
  up,
}: {
  label: string
  value: string
  delta: string
  up: boolean
}) {
  return (
    <div className="bg-white px-5 py-5 sm:px-6 sm:py-6">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
        {label}
      </p>
      <p
        className="mt-2 tabular-nums text-[#1d1d1f]"
        style={{
          fontSize: 'clamp(22px, 2.2vw, 30px)',
          lineHeight: '1.05',
          letterSpacing: '-0.025em',
          fontWeight: 600,
        }}
      >
        {value}
      </p>
      <p
        className={`mt-1 inline-flex items-center gap-1 text-[11.5px] font-semibold ${up ? 'text-emerald-600' : 'text-amber-600'}`}
      >
        {up ? <TrendingUp size={12} strokeWidth={2.4} /> : <TrendingDown size={12} strokeWidth={2.4} />}
        {delta}
      </p>
    </div>
  )
}

function CashflowSparkline() {
  // 13 weekly points — gentle dip then recovery
  const points = [612, 598, 605, 588, 572, 565, 548, 540, 552, 564, 575, 562, 548]
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1

  return (
    <div className="relative mt-6 h-32 w-full sm:h-36">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="cashfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0071E3" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* horizontal grid */}
        {[0, 1, 2, 3].map((g) => (
          <line
            key={g}
            x1="0"
            x2="100"
            y1={(g * 40) / 3}
            y2={(g * 40) / 3}
            stroke="rgba(15,15,30,0.06)"
            strokeWidth={0.2}
          />
        ))}

        {/* area fill */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: EASE }}
          d={`M0,40 ${points
            .map((p, i) => {
              const x = (i / (points.length - 1)) * 100
              const y = 38 - ((p - min) / range) * 32
              return `L${x.toFixed(2)},${y.toFixed(2)}`
            })
            .join(' ')} L100,40 Z`}
          fill="url(#cashfill)"
        />

        {/* line */}
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: EASE }}
          d={points
            .map((p, i) => {
              const x = (i / (points.length - 1)) * 100
              const y = 38 - ((p - min) / range) * 32
              return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
            })
            .join(' ')}
          fill="none"
          stroke="#0071E3"
          strokeWidth={0.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* end dot */}
        <motion.circle
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.2 }}
          cx={100}
          cy={38 - ((points[points.length - 1] - min) / range) * 32}
          r={0.8}
          fill="#0071E3"
        />
      </svg>

      {/* week labels */}
      <div className="absolute inset-x-0 bottom-[-1.6rem] flex justify-between text-[10px] text-[#86868b]">
        <span>Wk 1</span>
        <span className="hidden sm:inline">Wk 7</span>
        <span>Wk 13</span>
      </div>
    </div>
  )
}

/* ----------------------------- FOUNDER NOTE ---------------------------- */

export function FounderNote() {
  return (
    <section
      id="founder"
      className="relative isolate overflow-hidden bg-[#0b1220] py-28 text-white sm:py-40 md:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] max-w-[1200px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.22), transparent 70%)',
        }}
      />
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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center md:gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.95, ease: EASE }}
            className="md:col-span-5"
          >
            <FounderPortrait />
          </motion.div>

          <div className="md:col-span-7">
            <Eyebrow tone="dark">Senior advisor</Eyebrow>
            <Quote
              size={28}
              strokeWidth={1.4}
              className="mt-8 text-[#5cb3ff]/70"
              aria-hidden
            />
            <p
              className="mt-4 max-w-[820px] font-serif text-white"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(24px, 3.2vw, 44px)',
                lineHeight: '1.25',
                letterSpacing: '-0.015em',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              Most founder-led businesses don't need more reports. They need someone senior in the
              room when the numbers are read — and a routine that holds when the business gets
              busy.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            >
              <div>
                <p className="text-[16px] font-semibold tracking-[-0.005em] text-white sm:text-[18px]">
                  Cunos Consulting — London
                </p>
                <p className="mt-1 text-[13.5px] leading-[1.5] text-white/55 sm:text-[14.5px]">
                  Senior finance support for founder-led businesses across the UK.
                </p>
              </div>
              <a
                href="/#contact"
                className="group inline-flex items-center gap-2 self-start rounded-pill border border-white/20 bg-white/[0.06] px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-md transition-all hover:border-[#5cb3ff]/45 hover:bg-white/[0.12] sm:self-auto"
              >
                Meet the team
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FounderPortrait() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-gradient-to-br from-[#0071E3]/30 to-transparent blur-2xl"
      />
      <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[28px] border border-white/12 bg-gradient-to-br from-[#0d1830] via-[#0b1220] to-[#08101e] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
        {/* Soft brand gradient mask in lieu of a real photo */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 60% at 30% 25%, rgba(92,179,255,0.32), transparent 60%), radial-gradient(80% 60% at 80% 80%, rgba(0,113,227,0.28), transparent 70%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />

        {/* Caption block over the portrait area */}
        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/15 bg-white/[0.08] px-5 py-4 backdrop-blur-2xl sm:inset-x-7 sm:bottom-7 sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9fd0ff]">
            Cunos Consulting
          </p>
          <p className="mt-1.5 text-[15px] font-semibold tracking-[-0.005em] text-white sm:text-[16.5px]">
            Senior finance advisor
          </p>
          <p className="mt-0.5 text-[12.5px] text-white/55 sm:text-[13.5px]">
            20+ years across SME finance leadership
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- ENGAGEMENT MODEL ------------------------- */

const ENGAGEMENT_STEPS: Array<{ when: string; title: string; body: string; icon: LucideIcon }> = [
  {
    when: 'Week 1',
    title: 'Discovery + finance review',
    body: 'A short, structured review of how finance currently runs. No prep, no homework — we walk through what is working and what is stretched.',
    icon: Calendar,
  },
  {
    when: 'Weeks 2–4',
    title: 'Routine + controls in place',
    body: 'We help set the monthly cadence: clearer ownership, sharper controls, a reporting structure tuned to how you actually make decisions.',
    icon: Layers,
  },
  {
    when: 'From month 2',
    title: 'Retained advisory',
    body: 'A senior finance partner on retainer. Monthly pack, quarterly review, ad-hoc strategic calls. No long lock-in, no nine-month onboarding.',
    icon: TrendingUp,
  },
]

function Engagement() {
  return (
    <section
      id="engagement"
      className="relative isolate overflow-hidden bg-[#f5f8fc] py-28 text-[#1d1d1f] sm:py-40 md:py-48"
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>The engagement</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            How working together actually looks.
          </h2>
          <p className="mt-9 max-w-[640px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
            Light onboarding. Structured first month. Retained monthly advisory thereafter.
          </p>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-3 md:gap-6"
        >
          {ENGAGEMENT_STEPS.map((step, i) => (
            <EngagementCard key={step.title} {...step} index={i} total={ENGAGEMENT_STEPS.length} />
          ))}
        </motion.ol>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-4 rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_44px_-32px_rgba(15,15,30,0.18)] sm:mt-16 sm:grid-cols-3 sm:gap-6 sm:p-8"
        >
          {[
            { label: 'Cadence', value: 'Monthly retained' },
            { label: 'Commitment', value: 'Rolling, no lock-in' },
            { label: 'Pricing', value: 'Scope-based — shared after the review' },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">
                {m.label}
              </p>
              <p className="mt-2 text-[16px] font-medium leading-[1.35] tracking-[-0.005em] text-[#1d1d1f] sm:text-[17.5px]">
                {m.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function EngagementCard({
  when,
  title,
  body,
  icon: Icon,
  index,
  total,
}: {
  when: string
  title: string
  body: string
  icon: LucideIcon
  index: number
  total: number
}) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE, delay: 0.08 * index } },
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-8 shadow-[0_18px_44px_-32px_rgba(15,15,30,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071E3]/20 hover:shadow-[0_28px_60px_-30px_rgba(0,113,227,0.28)] sm:p-10"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-[#0071E3] via-[#5cb3ff] to-[#1d4ed8] transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-center justify-between">
        <span className="rounded-pill border border-[#0071E3]/15 bg-[#eef5ff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0071E3]">
          {when}
        </span>
        <span className="tabular-nums text-[11px] font-semibold tracking-[0.18em] text-[#86868b]">
          .{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <Icon size={22} strokeWidth={1.6} className="mt-10 text-[#0071E3]" />

      <h3
        className="mt-6 text-[#1d1d1f]"
        style={{
          fontSize: 'clamp(22px, 2.1vw, 28px)',
          lineHeight: '1.18',
          letterSpacing: '-0.025em',
          fontWeight: 600,
        }}
      >
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.55] text-[#6e6e73] sm:text-[16px]">{body}</p>
    </motion.li>
  )
}

/* --------------------------------- FAQ -------------------------------- */

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: 'How is this different from a bookkeeper or accountant?',
    a: 'A bookkeeper records the numbers. An accountant files them. Senior Finance Support sits at the layer above — making sure the numbers are reviewed, decisions are informed by them, and the finance function is structured to scale with the business.',
  },
  {
    q: "What's the time commitment from me as a founder?",
    a: 'Roughly one focused session per month, plus the occasional decision call. The point of Senior Finance Support is to take finance management off the founder, not to add another standing meeting.',
  },
  {
    q: 'Do you work with my existing accountant and tools?',
    a: 'Yes — we work alongside whoever you already have in place. We typically plug into Xero, QuickBooks, NetSuite, or whatever you run on. We do not replace your accountant; we strengthen the layer between them and you.',
  },
  {
    q: 'What size of business is this for?',
    a: 'Founder-led businesses doing roughly £1m to £25m in revenue, where finance has outgrown basic bookkeeping but a full-time Finance Director is either too expensive or too soon.',
  },
  {
    q: 'Is there a minimum commitment?',
    a: 'No long lock-in. The retained advisory engagement runs month to month after the first review. We aim to make the value obvious; if it stops being obvious, you can stop.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Scope-based. We agree on what is in and out of scope during the initial review, then a fixed monthly fee that reflects the cadence you need. No hourly billing, no surprises.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[#fbfbfd] py-28 text-[#1d1d1f] sm:py-40 md:py-48"
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Eyebrow>Questions, answered</Eyebrow>
              <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
                What founders usually ask first.
              </h2>
              <p className="mt-9 max-w-[400px] text-[16px] leading-[1.55] text-[#6e6e73] sm:text-[17px]">
                Don't see your question here? Reach out — we usually reply within one working day.
              </p>

              <a
                href={`mailto:${CONTACT.email}`}
                className="group mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#0071E3] transition-colors hover:text-[#0077ED]"
              >
                <Mail size={15} strokeWidth={1.8} />
                {CONTACT.email}
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          <ul className="md:col-span-7">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={item.q}
                {...item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function FAQItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string
  a: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <li className="border-b border-black/[0.08] first:border-t">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors hover:text-[#0071E3] sm:py-8"
      >
        <span
          className="text-[#1d1d1f] transition-colors group-hover:text-[#0071E3]"
          style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            lineHeight: '1.3',
            letterSpacing: '-0.015em',
            fontWeight: 500,
          }}
        >
          {q}
        </span>
        <span
          className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? 'border-[#0071E3] bg-[#0071E3] text-white' : 'border-black/[0.12] bg-white text-[#1d1d1f] group-hover:border-[#0071E3]/35 group-hover:text-[#0071E3]'}`}
        >
          {isOpen ? <Minus size={15} strokeWidth={2} /> : <Plus size={15} strokeWidth={2} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-12 text-[15.5px] leading-[1.6] text-[#3c3c43] sm:pb-8 sm:text-[17px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

/* ----------------------- STICKY CTA + PROGRESS ------------------------- */

export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 1.4
      const review = document.getElementById('review')
      const reviewInView = review
        ? review.getBoundingClientRect().top < window.innerHeight - 100
        : false
      setVisible(past && !reviewInView)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="pointer-events-none fixed inset-x-0 bottom-5 z-[55] flex justify-center px-4 sm:bottom-7 sm:px-6"
        >
          <a
            href="#review"
            className="pointer-events-auto group inline-flex items-center gap-3 rounded-pill border border-white/15 bg-[#0b1220]/85 px-5 py-3 text-[13.5px] font-medium text-white shadow-[0_18px_44px_-12px_rgba(8,24,52,0.55)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5cb3ff]/40 hover:bg-[#0b1220]/95 sm:gap-4 sm:py-3.5 sm:text-[14.5px]"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-[#5cb3ff] shadow-[0_0_0_3px_rgba(92,179,255,0.25)]" />
            Ready to talk?
            <span className="hidden text-white/55 sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5 text-[#9fd0ff] transition-transform group-hover:translate-x-0.5">
              Book a finance review
              <ArrowRight size={14} />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PageProgress() {
  const [active, setActive] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observers: IntersectionObserver[] = []
    PAGE_SECTIONS.forEach((s, idx) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(idx)
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const review = document.getElementById('review')
      const reviewInView = review
        ? review.getBoundingClientRect().top < window.innerHeight - 80
        : false
      setShow(window.scrollY > window.innerHeight * 0.6 && !reviewInView)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const total = PAGE_SECTIONS.length
  const current = PAGE_SECTIONS[active] ?? PAGE_SECTIONS[0]

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          {/* Dark glass panel — always-dark so the TOC is readable over any
              section background, light or dark. Labels are always visible
              (dimmed for inactive); active row brightens with brand accent. */}
          <div
            className="pointer-events-auto w-[220px] overflow-hidden rounded-[20px] border border-white/12 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_28px_70px_-22px_rgba(8,24,52,0.6),0_1px_0_rgba(255,255,255,0.08)_inset]"
            style={{ background: 'rgba(11, 18, 32, 0.88)' }}
          >
            {/* Header — current section in plain language */}
            <div className="border-b border-white/10 px-4 pb-3.5 pt-4">
              <p className="flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/45">
                <span className="tabular-nums text-white/85">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <span className="block h-px w-3 bg-white/25" />
                <span className="tabular-nums">{String(total).padStart(2, '0')}</span>
                <span className="ml-auto text-[#9fd0ff]">On this page</span>
              </p>
              <p className="mt-2 text-[14.5px] font-semibold tracking-[-0.005em] text-white">
                {current.label}
              </p>
            </div>

            {/* TOC list — labels always visible, active row highlighted */}
            <nav aria-label="On this page" className="px-1 py-2">
              <ul className="relative">
                {/* Vertical rail connecting all rows */}
                <span
                  aria-hidden
                  className="absolute right-[14px] top-2 bottom-2 w-px bg-white/8"
                />
                {PAGE_SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={i === active ? 'true' : undefined}
                      className={`group relative flex items-center justify-between gap-3 rounded-lg px-3 py-[7px] transition-colors duration-200 ${
                        i === active ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        className={`text-[11.5px] leading-tight transition-colors duration-300 ${
                          i === active
                            ? 'font-semibold text-white'
                            : 'font-medium text-white/45 group-hover:text-white/85'
                        }`}
                      >
                        {s.label}
                      </span>
                      <span
                        aria-hidden
                        className={`relative block shrink-0 rounded-full transition-all duration-300 ${
                          i === active
                            ? 'h-2 w-2 bg-[#5cb3ff] shadow-[0_0_0_4px_rgba(92,179,255,0.18)]'
                            : 'h-1.5 w-1.5 bg-white/35 group-hover:bg-white/70'
                        }`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

/* ------------------------- MAGNETIC BUTTON ----------------------------- */

export function MagneticButton({
  href,
  children,
  className = '',
  strength = 0.25,
  style,
}: {
  href: string
  children: ReactNode
  className?: string
  strength?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 240, damping: 22, mass: 0.6 })

  const onMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, ...style }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* ------------------------- ANIMATED COUNTER ---------------------------- */

export function AnimatedCounter({
  to,
  suffix = '',
  prefix = '',
  duration = 1.6,
  className = '',
  style,
}: {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {value.toLocaleString('en-GB')}
      {suffix}
    </span>
  )
}

/* ===================================================================== */
/*                            SEO / GEO / SEA                             */
/* ===================================================================== */

const SEO = {
  title:
    'Senior Finance Support for Founder-Led Businesses | Cunos Consulting London',
  description:
    'Cunos Consulting provides senior finance support for founder-led businesses across the UK — experienced outsourced finance oversight, 13-week cashflow forecasting, month-end reporting, and retained advisory without the cost of a full-time Finance Director.',
  url: 'https://cunos.co.uk/services/senior-finance-support',
  ogImage: 'https://cunos.co.uk/og/senior-finance-support.jpg',
  keywords: [
    'senior finance support',
    'outsourced finance director uk',
    'fractional finance director london',
    'founder-led business finance',
    'monthly finance pack',
    '13-week cashflow forecast',
    'month-end reporting',
    'retained finance advisory',
    'sme finance support uk',
    'cunos consulting',
  ].join(', '),
}

function useSeoMeta() {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const prevTitle = document.title
    document.title = SEO.title

    // Track elements we add so we can remove them on cleanup, preserving
    // anything already authored in index.html.
    const created: Element[] = []

    const setMeta = (
      attrName: 'name' | 'property',
      attrValue: string,
      content: string,
    ) => {
      let el = document.querySelector<HTMLMetaElement>(
        `meta[${attrName}="${attrValue}"]`,
      )
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attrName, attrValue)
        document.head.appendChild(el)
        created.push(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
        created.push(el)
      }
      el.setAttribute('href', href)
    }

    // Standard SEO
    setMeta('name', 'description', SEO.description)
    setMeta('name', 'keywords', SEO.keywords)
    setMeta('name', 'author', 'Cunos Consulting')
    setMeta('name', 'robots', 'index, follow, max-image-preview:large')
    setMeta('name', 'theme-color', '#06122a')

    // GEO targeting
    setMeta('name', 'geo.region', 'GB-LND')
    setMeta('name', 'geo.placename', 'London')
    setMeta('name', 'geo.position', '51.5074;-0.1278')
    setMeta('name', 'ICBM', '51.5074, -0.1278')

    // Open Graph
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'Cunos Consulting')
    setMeta('property', 'og:locale', 'en_GB')
    setMeta('property', 'og:url', SEO.url)
    setMeta('property', 'og:title', SEO.title)
    setMeta('property', 'og:description', SEO.description)
    setMeta('property', 'og:image', SEO.ogImage)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', SEO.title)
    setMeta('name', 'twitter:description', SEO.description)
    setMeta('name', 'twitter:image', SEO.ogImage)

    // Canonical
    setLink('canonical', SEO.url)

    // JSON-LD: Service + Organization + FAQPage + BreadcrumbList
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://cunos.co.uk/#organization',
          name: 'Cunos Consulting',
          url: 'https://cunos.co.uk',
          logo: 'https://cunos.co.uk/brand/logo.svg',
          email: CONTACT.email,
          telephone: CONTACT.phoneDisplay,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'London',
            addressCountry: 'GB',
          },
          areaServed: {
            '@type': 'Country',
            name: 'United Kingdom',
          },
          sameAs: [CONTACT.linkedinHref],
        },
        {
          '@type': 'Service',
          '@id': SEO.url + '#service',
          name: 'Senior Finance Support',
          serviceType: 'Outsourced finance leadership for founder-led businesses',
          description: SEO.description,
          provider: { '@id': 'https://cunos.co.uk/#organization' },
          areaServed: {
            '@type': 'Country',
            name: 'United Kingdom',
          },
          audience: {
            '@type': 'BusinessAudience',
            audienceType: 'Founder-led SMEs, £1m–£25m revenue',
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'GBP',
            priceSpecification: {
              '@type': 'PriceSpecification',
              description: 'Scope-based monthly retainer — agreed after the initial review.',
            },
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Senior Finance Support areas',
            itemListElement: SOLUTION_AREAS.map((a) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: a.title, description: a.body },
            })),
          },
        },
        {
          '@type': 'FAQPage',
          '@id': SEO.url + '#faq',
          mainEntity: FAQ_ITEMS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://cunos.co.uk/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://cunos.co.uk/#whats-next',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Senior Finance Support',
              item: SEO.url,
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': SEO.url,
          url: SEO.url,
          name: SEO.title,
          description: SEO.description,
          inLanguage: 'en-GB',
          isPartOf: {
            '@type': 'WebSite',
            url: 'https://cunos.co.uk',
            name: 'Cunos Consulting',
          },
          about: { '@id': SEO.url + '#service' },
          primaryImageOfPage: SEO.ogImage,
        },
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(jsonLd)
    script.setAttribute('data-jsonld', 'senior-finance-support')
    document.head.appendChild(script)
    created.push(script)

    return () => {
      document.title = prevTitle
      created.forEach((el) => el.parentElement?.removeChild(el))
    }
  }, [])
}
