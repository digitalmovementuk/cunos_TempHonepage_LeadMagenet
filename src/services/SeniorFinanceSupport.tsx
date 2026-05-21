import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Compass,
  CreditCard,
  FileText,
  Layers,
  LineChart,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

import { CONTACT, Footer, Nav, RevealHeading, ScrollProgress } from '../App'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export default function SeniorFinanceSupport() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-black text-ink">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Problem />
      <PainPoints />
      <Solution />
      <PullQuote />
      <WhoFor />
      <HowWeWork />
      <Outcome />
      <FinalCTA />
      <Footer />
    </main>
  )
}

/* ----------------------------- SHARED ATOMS ---------------------------- */

function Eyebrow({
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

const SECTION_H2_STYLE = {
  fontSize: 'clamp(40px, 5.6vw, 88px)',
  lineHeight: '1.02',
  letterSpacing: '-0.035em',
  fontWeight: 700,
} as const

const HUGE_H2_STYLE = {
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
            Experienced finance oversight for founder-led businesses — without the cost or
            commitment of hiring a full-time Finance Director.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.9, ease: EASE, delay: 1.55 }}
            className="mt-12 flex flex-col items-start gap-5 sm:mt-14 sm:flex-row sm:items-center sm:gap-7"
          >
            <a
              href="#review"
              className="group inline-flex items-center justify-center gap-2.5 rounded-pill bg-[#0071E3] px-7 py-4 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0077ED] hover:shadow-[0_18px_40px_-10px_rgba(0,113,227,0.55)] sm:px-8 sm:py-4 sm:text-[16px]"
            >
              Book a finance review
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
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

        <div className="mt-20 sm:mt-28 md:mt-32">
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
const CARD_STRIP_REM = 6.25

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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.play().catch(() => {})
  }, [])

  const stickyTop = `calc(6rem + ${index * CARD_STRIP_REM}rem)`

  return (
    <div
      style={{
        top: stickyTop,
        zIndex: 10 + index,
      }}
      className="sticky"
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
              fontSize: 'clamp(22px, 3.2vw, 44px)',
              lineHeight: '1.1',
              letterSpacing: '-0.025em',
              fontWeight: 600,
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
    </div>
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
    <section className="relative isolate overflow-hidden bg-[#f5f8fc] py-28 text-[#1d1d1f] sm:py-40 md:py-48">
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
              <a
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-[#0071E3] px-7 py-4 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0077ED] hover:shadow-[0_18px_40px_-10px_rgba(0,113,227,0.55)] sm:px-8 sm:text-[16px]"
              >
                Book a finance review
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
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
