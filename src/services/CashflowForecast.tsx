// @ts-nocheck — file under active development; sibling helpers being refactored
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Compass,
  Eye,
  LineChart,
  Mail,
  ShieldCheck,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

import {
  Activity,
  AlertCircle,
  Briefcase,
  Building2,
  ClipboardList,
  FileWarning,
  Globe2,
  ShoppingBag,
  TrendingDown,
  Users,
} from 'lucide-react'

import { CONTACT, Footer, Nav, RevealHeading, ScrollProgress } from '../App'
import {
  CaseStudy,
  ComparisonTable,
  IndustriesBlock,
  InsightsBlock,
  SignsBlock,
  TestimonialsBlock,
  WhatIsBlock,
} from './_blocks'
import {
  AnimatedCounter,
  EASE,
  Eyebrow,
  FAQItem,
  FounderNote,
  HUGE_H2_STYLE,
  MagneticButton,
  PageProgressInternal,
  SECTION_H2_STYLE,
  StickyCTA,
  fadeUp,
  stagger,
} from './SeniorFinanceSupport'

const PAGE_SECTIONS = [
  { id: 'top', label: 'Service' },
  { id: 'problem', label: 'The problem' },
  { id: 'signs', label: "Signs you've outgrown" },
  { id: 'what-is', label: 'In plain terms' },
  { id: 'solution', label: 'What we cover' },
  { id: 'comparison', label: 'Compare options' },
  { id: 'deliverable', label: 'The deliverable' },
  { id: 'voice', label: 'The promise' },
  { id: 'founder', label: 'Senior advisor' },
  { id: 'testimonials', label: 'What clients say' },
  { id: 'who', label: 'Who this is for' },
  { id: 'industries', label: 'By industry' },
  { id: 'how', label: 'How we work' },
  { id: 'case-study', label: 'Case study' },
  { id: 'outcome', label: 'The outcome' },
  { id: 'insights', label: 'Insights' },
  { id: 'faq', label: 'FAQ' },
  { id: 'review', label: 'Next step' },
] as const

export default function CashflowForecast() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useSeoMeta()

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-black text-ink">
      <ScrollProgress />
      <Nav />
      <PageProgressInternal sections={[...PAGE_SECTIONS]} />
      <Hero />
      <Problem />
      <SignsSection />
      <WhatIsSection />
      <Solution />
      <ComparisonSection />
      <Deliverable />
      <PullQuote />
      <FounderNote />
      <TestimonialsSection />
      <WhoFor />
      <IndustriesSection />
      <HowWeWork />
      <CaseStudySection />
      <Outcome />
      <InsightsSection />
      <FAQ />
      <FinalCTA />
      <StickyCTA />
      <Footer />
    </main>
  )
}

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
          src={`${import.meta.env.BASE_URL}media/services/cashflow-forecast.mp4`}
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
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-[1200px]">
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
            For UK founder-led businesses
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
                { text: 'Cash,' },
                { text: 'a quarter', mute: true },
                { text: 'ahead.', mute: true },
              ]}
            />
            <span
              className="mt-5 block text-white/80 sm:mt-7"
              style={{
                fontSize: 'clamp(20px, 2.4vw, 32px)',
                lineHeight: '1.2',
                letterSpacing: '-0.018em',
                fontWeight: 500,
              }}
            >
              13-Week Cashflow Forecast for founder-led businesses across the UK.
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
            className="mt-10 max-w-[780px] text-[18px] leading-[1.6] text-white/72 sm:text-[22px] sm:leading-[1.55]"
          >
            A rolling 13-week cashflow forecast that turns guesswork into a clear view —
            so you can hire, spend, and plan with confidence, not surprise.
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
              Book a cashflow review
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <p className="max-w-[360px] text-[13.5px] leading-[1.5] text-white/55 sm:text-[14px]">
              A short conversation about where cash visibility is breaking — and what a 13-week
              view would change.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* -------------------------------- PROBLEM ------------------------------ */

const PROBLEM_POINTS: Array<{ symptom: string; meaning: string; icon: LucideIcon }> = [
  {
    symptom: 'You only know the current cash balance',
    meaning: 'No view of next month, let alone next quarter',
    icon: Eye,
  },
  {
    symptom: 'Decisions stall because the runway is unclear',
    meaning: 'Hiring, spending, and pricing calls get delayed',
    icon: Compass,
  },
  {
    symptom: 'Surprises hit the runway',
    meaning: 'Tax bills, big receivables, payroll dips arrive without warning',
    icon: ShieldCheck,
  },
  {
    symptom: 'Forecasting is a quarterly fire-drill',
    meaning: 'Built in a hurry, then ignored — never trusted',
    icon: LineChart,
  },
]

function Problem() {
  return (
    <section id="problem" className="relative isolate bg-[#fbfbfd] py-28 text-[#1d1d1f] sm:py-40 md:py-48">
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            Without a forecast, cash is a guess.
          </h2>
          <div className="mt-9 max-w-[680px] space-y-5 text-[17px] leading-[1.6] text-[#3c3c43] sm:text-[19px] sm:leading-[1.55]">
            <p>
              Founder-led businesses run lean. Cash decisions cannot wait for next month's
              management report. Yet most are made with a glance at today's bank balance.
            </p>
            <p>
              The result: hiring decisions get postponed when they shouldn't, marketing budgets
              get cut when cash was actually fine, and tax windows arrive without warning. The
              business runs on instinct — usually conservative, occasionally costly.
            </p>
            <p className="font-medium text-[#1d1d1f]">
              A reliable cashflow forecast removes that uncertainty. It turns "I think we're OK"
              into "I know what the next quarter looks like — in three scenarios."
            </p>
          </div>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-2 md:gap-6"
        >
          {PROBLEM_POINTS.map((p, i) => (
            <motion.li
              key={p.symptom}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 * i }}
              className="group flex items-start gap-5 rounded-[22px] border border-black/[0.06] bg-white p-7 shadow-[0_14px_36px_-28px_rgba(15,15,30,0.18)] transition-all hover:-translate-y-0.5 hover:border-[#0071E3]/20 hover:shadow-[0_20px_48px_-26px_rgba(0,113,227,0.28)] sm:p-8"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#0071E3]/15 bg-[#eef5ff] text-[#0071E3] transition-colors group-hover:bg-[#0071E3] group-hover:text-white">
                <p.icon size={20} strokeWidth={1.7} />
              </span>
              <div>
                <p
                  className="text-[#1d1d1f]"
                  style={{
                    fontSize: 'clamp(18px, 1.85vw, 22px)',
                    lineHeight: '1.25',
                    letterSpacing: '-0.018em',
                    fontWeight: 600,
                  }}
                >
                  {p.symptom}.
                </p>
                <p className="mt-2 text-[14.5px] italic leading-[1.45] text-[#6e6e73] sm:text-[16px]">
                  → {p.meaning}.
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ------------------------------- SOLUTION ------------------------------ */

const SOLUTION_AREAS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: LineChart,
    title: '13-week rolling forecast',
    body: 'A weekly view of receipts, payments, and resulting cash balance — refreshed every week.',
  },
  {
    icon: Compass,
    title: 'Base, best, and worst case',
    body: 'Three scenarios so you can plan for what happens if a key payment slips or revenue dips.',
  },
  {
    icon: Workflow,
    title: 'Driver-based assumptions',
    body: 'Forecasts driven by real revenue and cost drivers — not last year\'s averages.',
  },
  {
    icon: TrendingUp,
    title: 'What-if scenario modelling',
    body: 'Model the cash impact of a new hire, a price change, or a pause in spend before you commit.',
  },
  {
    icon: ShieldCheck,
    title: 'Runway and covenant tracking',
    body: 'Spot tight points months ahead — covenants, tax windows, payroll heavy weeks.',
  },
  {
    icon: Eye,
    title: 'Weekly cash report',
    body: 'A short, clear weekly note showing what changed, what to watch, and what to decide.',
  },
]

function Solution() {
  return (
    <section
      id="solution"
      className="relative isolate overflow-hidden bg-[#06122a] py-28 text-white sm:py-40 md:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-[10%] h-[680px] w-[680px] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(0,113,227,0.42), transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow tone="dark">What's covered</Eyebrow>
          <h2 className="mt-7 text-white" style={SECTION_H2_STYLE}>
            A cashflow forecast you actually trust.
          </h2>
          <div className="mt-9 max-w-[760px] space-y-5 text-[17px] leading-[1.6] text-white/65 sm:text-[19px] sm:leading-[1.55]">
            <p>
              Most forecasting tools either oversimplify (a single line that's wrong by week three)
              or overcomplicate (a hundred-tab spreadsheet nobody updates). The Cashflow Forecast
              service gives you something a founder can actually run a business from.
            </p>
            <p>
              Built around the real revenue and cost drivers of your business. Refreshed every
              week against live receivables and payables. Stress-tested across base, best, and
              worst cases. And accompanied by a short note that tells you what changed and what
              to decide.
            </p>
            <p className="text-white/85">
              Pairs naturally with{' '}
              <a
                href="/services/senior-finance-support"
                className="text-[#9fd0ff] underline decoration-[#5cb3ff]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-[#9fd0ff]"
              >
                Senior Finance Support
              </a>{' '}
              and{' '}
              <a
                href="/services/management-report"
                className="text-[#9fd0ff] underline decoration-[#5cb3ff]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-[#9fd0ff]"
              >
                Management Reporting
              </a>{' '}
              — for the full picture of your finance function.
            </p>
          </div>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] bg-white/[0.08] sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SOLUTION_AREAS.map((a, i) => (
            <motion.li
              key={a.title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE, delay: 0.05 * i } },
              }}
              className="group relative flex h-full flex-col bg-[#06122a] p-8 transition-colors hover:bg-[#091a3a] sm:p-10"
            >
              <a.icon
                size={22}
                strokeWidth={1.5}
                className="text-[#9fd0ff] transition-colors group-hover:text-white"
              />
              <h3
                className="mt-7 text-white"
                style={{
                  fontSize: 'clamp(22px, 2.3vw, 28px)',
                  lineHeight: '1.15',
                  letterSpacing: '-0.025em',
                  fontWeight: 600,
                }}
              >
                {a.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-white/60 sm:text-[16px]">{a.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ------------------------------ DELIVERABLE ---------------------------- */

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
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.14), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="md:col-span-5">
            <Eyebrow>What you actually receive</Eyebrow>
            <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
              A clear, weekly view of the next quarter's cash.
            </h2>
            <p className="mt-9 max-w-[480px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
              Every week, an updated 13-week cashflow forecast with scenarios, runway tracking,
              and a short commentary on what changed.
            </p>

            <ul className="mt-10 space-y-4 sm:mt-12">
              {[
                { Icon: LineChart, label: 'Rolling 13-week cash projection' },
                { Icon: Compass, label: 'Base / best / worst case scenarios' },
                { Icon: ShieldCheck, label: 'Runway, tax, and covenant watchpoints' },
                { Icon: CheckCircle2, label: 'Three decisions the data suggests this week' },
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
            <ForecastMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function ForecastMockup() {
  const points = [612, 598, 605, 588, 572, 565, 548, 540, 552, 564, 575, 562, 548]
  const best = points.map((p, i) => p + (i * 4))
  const worst = points.map((p, i) => p - (i * 6))
  const all = [...points, ...best, ...worst]
  const max = Math.max(...all)
  const min = Math.min(...all)
  const range = max - min || 1

  const path = (arr: number[]) =>
    arr
      .map((p, i) => {
        const x = (i / (arr.length - 1)) * 100
        const y = 38 - ((p - min) / range) * 30
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.95, ease: EASE }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_40px_90px_-40px_rgba(15,15,30,0.28),0_2px_0_rgba(255,255,255,0.95)_inset]">
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-[#0071E3] via-[#5cb3ff] to-[#1d4ed8]" />

        <div className="flex items-end justify-between gap-4 border-b border-black/[0.06] px-6 py-6 sm:px-8 sm:py-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071E3]">
              13-week cash forecast
            </p>
            <h3
              className="mt-2 text-[#1d1d1f]"
              style={{ fontSize: 'clamp(20px, 1.9vw, 26px)', lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              Week 20 — Acme Studio Ltd.
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-pill bg-[#eef5ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0071E3]">
              Base
            </span>
            <span className="rounded-pill bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Best
            </span>
            <span className="rounded-pill bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">
              Worst
            </span>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 gap-px bg-black/[0.06] sm:grid-cols-4">
          {[
            { label: 'Opening cash', value: '£612k' },
            { label: 'Net change · 13w', value: '−£64k' },
            { label: 'Min cash · base', value: '£540k' },
            { label: 'Runway', value: '11.4 mo' },
          ].map((k) => (
            <div key={k.label} className="bg-white px-5 py-5 sm:px-6">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                {k.label}
              </p>
              <p
                className="mt-1.5 tabular-nums text-[#1d1d1f]"
                style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: 600 }}
              >
                {k.value}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="px-6 py-7 sm:px-8 sm:py-9">
          <div className="relative h-40 w-full sm:h-44">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="cashfill-cf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0071E3" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((g) => (
                <line key={g} x1="0" x2="100" y1={(g * 40) / 3} y2={(g * 40) / 3} stroke="rgba(15,15,30,0.06)" strokeWidth={0.2} />
              ))}
              {/* worst — amber dashed */}
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
                d={path(worst)}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeDasharray="1.4,1"
              />
              {/* best — emerald dashed */}
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
                d={path(best)}
                fill="none"
                stroke="#10b981"
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeDasharray="1.4,1"
              />
              {/* base — solid + fill */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.4, ease: EASE }}
                d={`M0,40 ${path(points).slice(1)} L100,40 Z`}
                fill="url(#cashfill-cf)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.4, ease: EASE }}
                d={path(points)}
                fill="none"
                stroke="#0071E3"
                strokeWidth={0.7}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="absolute inset-x-0 bottom-[-1.6rem] flex justify-between text-[10px] text-[#86868b]">
              <span>Wk 20</span>
              <span className="hidden sm:inline">Wk 26</span>
              <span>Wk 32</span>
            </div>
          </div>
        </div>

        {/* Commentary */}
        <div className="border-t border-black/[0.06] px-6 py-6 sm:px-8 sm:py-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
            This week's note
          </p>
          <ul className="mt-3 space-y-2.5 text-[13.5px] leading-[1.5] text-[#1d1d1f] sm:text-[14.5px]">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071E3]" />
              Worst case dips to £482k by week 30 — within tolerance but tightening.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071E3]" />
              Acme retainer renewal (£28k/mo) flips base case from −£64k to +£18k.
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

/* ----------------------------- HOW WE WORK ----------------------------- */

const STEPS: Array<{ when: string; title: string; body: string; icon: LucideIcon }> = [
  {
    when: 'Week 1',
    title: 'Set up the model',
    body: 'We connect to your accounting system, build the driver-based forecast, and tune the assumptions with you.',
    icon: Calendar,
  },
  {
    when: 'Weeks 2–3',
    title: 'Pressure-test scenarios',
    body: 'We pressure-test base, best, and worst cases against last year\'s actuals, then refine the model.',
    icon: ShieldCheck,
  },
  {
    when: 'Ongoing',
    title: 'Weekly forecast + note',
    body: 'A refreshed 13-week view delivered weekly, plus a short commentary on what changed and what to decide.',
    icon: TrendingUp,
  },
]

function HowWeWork() {
  return (
    <section
      id="how"
      className="relative isolate overflow-hidden bg-[#f5f8fc] py-28 text-[#1d1d1f] sm:py-40 md:py-48"
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            A weekly cadence that stays useful.
          </h2>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-3 md:gap-6"
        >
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE, delay: 0.08 * i } },
              }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-8 shadow-[0_18px_44px_-32px_rgba(15,15,30,0.18)] transition-all hover:-translate-y-1 hover:border-[#0071E3]/20 hover:shadow-[0_28px_60px_-30px_rgba(0,113,227,0.28)] sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-pill border border-[#0071E3]/15 bg-[#eef5ff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0071E3]">
                  {s.when}
                </span>
                <span className="tabular-nums text-[11px] font-semibold tracking-[0.18em] text-[#86868b]">
                  .{String(i + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
                </span>
              </div>
              <s.icon size={22} strokeWidth={1.6} className="mt-10 text-[#0071E3]" />
              <h3
                className="mt-6 text-[#1d1d1f]"
                style={{
                  fontSize: 'clamp(22px, 2.1vw, 28px)',
                  lineHeight: '1.18',
                  letterSpacing: '-0.025em',
                  fontWeight: 600,
                }}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#6e6e73] sm:text-[16px]">{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

/* -------------------------------- OUTCOME ------------------------------ */

function Outcome() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
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
          style={{ background: 'radial-gradient(circle, rgba(92,179,255,0.34), transparent 65%)' }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orb2Y, opacity: orbOpacity }}
        className="pointer-events-none absolute bottom-[-15%] right-[-5%] h-[560px] w-[560px] rounded-full"
      >
        <div
          className="h-full w-full"
          style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.30), transparent 65%)' }}
        />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <Eyebrow tone="dark">The outcome</Eyebrow>
        <h2 className="mt-7 max-w-[1500px] text-white" style={SECTION_H2_STYLE}>
          Cash decisions made with a quarter of visibility, not a glance at the bank balance.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.05] sm:mt-24 sm:grid-cols-3"
        >
          {[
            { value: 13, suffix: ' weeks', label: 'Forward visibility', sub: 'Rolling weekly refresh' },
            { value: 3, suffix: ' scenarios', label: 'Pressure-tested', sub: 'Base, best, worst' },
            { value: 1, suffix: ' weekly note', label: 'Decision-ready', sub: 'Short, clear, useful' },
          ].map((s, i) => (
            <div key={s.label} className="bg-[#1a1330] px-6 py-7 sm:px-7 sm:py-8 md:px-9 md:py-10">
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
              <p className="mt-2 text-[13.5px] leading-[1.5] text-white/55 sm:text-[14.5px]">{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------- FAQ -------------------------------- */

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: 'How accurate is a 13-week cashflow forecast?',
    a: 'Accurate enough to drive real decisions. The first 4–6 weeks are typically within a few percent because most receipts and payments are already booked. The latter half flexes more, which is why we run scenarios.',
  },
  {
    q: 'Why 13 weeks specifically?',
    a: '13 weeks is one quarter — long enough to spot tight points and plan around them, short enough that the forecast stays grounded in actual receivables and payables rather than guesses.',
  },
  {
    q: 'Do you work with my existing accounting system?',
    a: 'Yes — we typically plug into Xero, QuickBooks, NetSuite, or whatever you run on. The forecast is built around your real chart of accounts and historic patterns.',
  },
  {
    q: 'How is this different from the report my accountant produces?',
    a: 'A standard cashflow statement looks backward. This is forward-looking, weekly, and decision-oriented. It is about what cash is going to do, not what it has done.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Scope-based monthly retainer. Agreed after the initial review based on cadence and complexity. Rolling month-to-month — no lock-in.',
  },
  {
    q: 'Can the forecast include scenarios for fundraising or M&A?',
    a: 'Yes. The base/best/worst structure is built for exactly this. We model funding rounds, acquisitions, exit scenarios, or simply "what happens if we delay this hire by a quarter" — and the impact on cash is visible immediately.',
  },
  {
    q: 'What if my data is messy in Xero / QuickBooks?',
    a: 'Realistically, it usually is at this stage — that\'s part of why founders engage us. The first two weeks include a light clean-up of the chart of accounts so the forecast is built on data you can trust. We do not require perfect data to start.',
  },
  {
    q: 'Does the forecast cover both UK and international cash?',
    a: 'Yes — we model multi-entity and multi-currency where it matters. The 13-week view consolidates all bank accounts and currencies into a single base-currency picture, with the option to drill down per entity.',
  },
]

/* ------------------------------ PULL QUOTE ----------------------------- */

function PullQuote() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
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
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.16), transparent 70%)',
          }}
        />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <Eyebrow>The promise</Eyebrow>
        <h2 className="mt-7 max-w-[1500px] text-[#1d1d1f]" style={HUGE_H2_STYLE}>
          <RevealHeading
            baseDelay={0.05}
            gap={0.14}
            parts={[
              { text: 'Cash,' },
              { text: 'a' },
              { text: 'quarter', mute: true },
              { text: 'ahead.', mute: true },
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
          <span className="text-[#0071E3]">“</span>Most cashflow problems aren't really about cash.
          They're about visibility — knowing what's coming, soon enough to do something about it.
          <span className="text-[#0071E3]">”</span>
        </motion.p>
      </div>
    </section>
  )
}

/* ----------------------------- WHO IT'S FOR ---------------------------- */

const WHO_PAIRS: Array<{ have: string; need: string }> = [
  { have: 'A bank balance you check daily', need: 'A quarter of forward visibility' },
  { have: 'Cashflow built in a quarterly fire-drill', need: 'A weekly rolling forecast' },
  { have: 'One ambitious "base case" number', need: 'Base, best, and worst-case planning' },
  { have: 'Tax bills that arrive as surprises', need: 'Watchpoints flagged months ahead' },
  { have: 'Founder doing the forecasting at midnight', need: 'A senior finance partner running it' },
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
            Built for founder-led businesses where cash is a constant question.
          </h2>
          <p className="mt-9 max-w-[680px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
            The 13-Week Cashflow Forecast is designed for businesses where cash isn't infinite —
            so every spending and hiring decision matters. Especially useful if you've moved past
            basic bookkeeping, but a full-time finance team is still some way off.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-2.5 sm:mt-12"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">
              Industries we serve —
            </span>
            {[
              'SaaS',
              'Digital agencies',
              'Professional services',
              'E-commerce',
              'Consulting',
              'B2B services',
            ].map((label) => (
              <span
                key={label}
                className="rounded-pill border border-black/[0.08] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#1d1d1f] shadow-[0_1px_0_rgba(15,15,30,0.03)]"
              >
                {label}
              </span>
            ))}
          </motion.div>
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
            <motion.ul variants={stagger} className="mt-7 space-y-6 sm:mt-9 sm:space-y-7">
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
            <motion.ul variants={stagger} className="mt-7 space-y-6 sm:mt-9 sm:space-y-7">
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

/* --------------------------------- FAQ -------------------------------- */

function FAQ() {
  const [open, setOpen] = useState(0)
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
                What founders ask about a 13-week forecast.
              </h2>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#0071E3] transition-colors hover:text-[#0077ED]"
              >
                <Mail size={15} strokeWidth={1.8} />
                {CONTACT.email}
                <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <ul className="md:col-span-7">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={item.q} {...item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </ul>
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
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.18), transparent 68%)',
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
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#0071E3]/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-28 right-4 h-72 w-72 rounded-full bg-[#5cb3ff]/20 blur-3xl" />
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-14">
            <div className="md:col-span-7">
              <Eyebrow tone="dark">Next step</Eyebrow>
              <h2 className="mt-7 text-white" style={SECTION_H2_STYLE}>
                Want a quarter of cash visibility?
              </h2>
              <p className="mt-8 max-w-[560px] text-[17px] leading-[1.55] text-white/72 sm:text-[20px]">
                Start with a short cashflow review — we'll show you what a 13-week view of your
                business would actually look like.
              </p>
            </div>
            <div className="md:col-span-5">
              <MagneticButton
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-[#0071E3] px-7 py-4 text-[15px] font-medium text-white transition-[background,box-shadow] duration-200 hover:bg-[#0077ED] hover:shadow-[0_18px_40px_-10px_rgba(0,113,227,0.55)] sm:px-8 sm:text-[16px]"
              >
                Book a cashflow review
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
              <div className="mt-6 flex flex-col gap-1.5 text-[13.5px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-[#9fd0ff]">
                  {CONTACT.email}
                </a>
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-[#9fd0ff]">
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

/* ------------------------------- SEO META ------------------------------ */

function useSeoMeta() {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const prev = document.title
    document.title = '13-Week Cashflow Forecast for Founder-Led Businesses | Cunos Consulting'
    const created: Element[] = []

    const setMeta = (attr: 'name' | 'property', name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
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

    const url = 'https://cunos.co.uk/services/cashflow-forecast'
    const desc =
      'Rolling 13-week cashflow forecast for founder-led UK businesses. Driver-based, scenario-tested, refreshed weekly. From Cunos Consulting — outsourced senior finance support without the cost of a full-time Finance Director.'

    setMeta('name', 'description', desc)
    setMeta(
      'name',
      'keywords',
      'cashflow forecast, 13-week cashflow forecast, rolling cashflow forecast, cash forecasting uk, founder-led business cashflow, fractional cfo, cunos consulting',
    )
    setMeta('name', 'author', 'Cunos Consulting')
    setMeta('name', 'robots', 'index, follow, max-image-preview:large')
    setMeta('name', 'theme-color', '#06122a')
    setMeta('name', 'geo.region', 'GB')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'Cunos Consulting')
    setMeta('property', 'og:locale', 'en_GB')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:title', document.title)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:image', 'https://cunos.co.uk/og/cashflow-forecast.jpg')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', document.title)
    setMeta('name', 'twitter:description', desc)
    setLink('canonical', url)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': url + '#service',
          name: '13-Week Cashflow Forecast',
          serviceType: 'Rolling cashflow forecasting for founder-led businesses',
          description: desc,
          provider: { '@id': 'https://cunos.co.uk/#organization' },
          areaServed: { '@type': 'Country', name: 'United Kingdom' },
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
              minPrice: 1500,
              maxPrice: 5000,
              priceCurrency: 'GBP',
              description: 'Scope-based monthly retainer — agreed after the initial review.',
            },
          },
          priceRange: '££ — £1,500–£5,000 per month',
        },
        {
          '@type': 'Person',
          '@id': 'https://cunos.co.uk/#enting-man',
          name: 'Enting Man',
          givenName: 'Enting',
          familyName: 'Man',
          jobTitle: 'Founder & Senior Finance Advisor',
          worksFor: { '@id': 'https://cunos.co.uk/#organization' },
          description:
            '15+ years of senior financial management experience for global companies in the UK and Hong Kong. Founder of Cunos Consulting.',
          knowsAbout: [
            '13-week cashflow forecasting',
            'Driver-based forecasting',
            'Scenario modelling',
            'Cash visibility',
            'Senior finance support',
            'Fractional CFO',
          ],
          image: 'https://cunos.co.uk/team/enting.jpg',
        },
        {
          '@type': 'HowTo',
          '@id': url + '#how-to',
          name: 'How a 13-Week Cashflow Forecast engagement works',
          description:
            'A three-step process from forecast setup to weekly cadence for founder-led UK businesses.',
          totalTime: 'P3W',
          step: STEPS.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.body,
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': url + '#faq',
          mainEntity: FAQ_ITEMS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cunos.co.uk/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://cunos.co.uk/#whats-next' },
            { '@type': 'ListItem', position: 3, name: 'Cashflow Forecast', item: url },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': url,
          url,
          name: document.title,
          description: desc,
          inLanguage: 'en-GB',
          datePublished: '2026-05-21',
          dateModified: new Date().toISOString().split('T')[0],
          isPartOf: { '@type': 'WebSite', url: 'https://cunos.co.uk', name: 'Cunos Consulting' },
          about: { '@id': url + '#service' },
          author: { '@id': 'https://cunos.co.uk/#enting-man' },
          reviewedBy: { '@id': 'https://cunos.co.uk/#enting-man' },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '#faq h3', '#what-is dt'],
          },
        },
      ],
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(jsonLd)
    script.setAttribute('data-jsonld', 'cashflow-forecast')
    document.head.appendChild(script)
    created.push(script)

    return () => {
      document.title = prev
      created.forEach((el) => el.parentElement?.removeChild(el))
    }
  }, [])
}

/* ===================================================================== */
/*                   EXPANSION SECTIONS — DEPTH CONTENT                   */
/* ===================================================================== */

function SignsSection() {
  return (
    <SignsBlock
      id="signs"
      eyebrow="Signs you've outgrown manual cashflow"
      h2="If three of these sound familiar, the forecast has stopped doing its job."
      intro="Cashflow forecasting tends to break in the same predictable ways as a business scales. These are the moments founders typically realise the spreadsheet approach has reached its limit."
      signs={[
        { icon: Activity, text: "You only know what cash is doing this week — anything beyond that is a guess." },
        { icon: AlertCircle, text: 'Tax or payroll bills land as surprises even though they were always coming.' },
        { icon: FileWarning, text: 'Your forecast is rebuilt from scratch every quarter — and immediately stops being trusted.' },
        { icon: Users, text: 'Hiring or pricing decisions stall because the runway view is unclear.' },
        { icon: ClipboardList, text: 'You\'re running the forecast on Sunday nights instead of Tuesday mornings.' },
        { icon: TrendingDown, text: 'A single missed receivable would change the picture, and you can\'t model that quickly.' },
      ]}
    />
  )
}

function ComparisonSection() {
  return (
    <ComparisonTable
      id="comparison"
      eyebrow="Compare your options"
      h2="13-week forecasting vs. the alternatives."
      intro="Founders typically compare four ways to get a handle on cash. Here's how they line up on the things that actually matter."
      cols={[
        { label: 'Bank balance check' },
        { label: 'Spreadsheet forecast' },
        { label: '13-Week Cashflow Forecast', highlight: true },
        { label: 'In-house finance team' },
      ]}
      rows={[
        {
          feature: 'Forward horizon',
          values: [
            { value: 'Now only', positive: false },
            { value: '~4–8 weeks if maintained', positive: false },
            { value: '13 weeks, rolling', positive: true },
            { value: '13+ weeks', positive: true },
          ],
        },
        {
          feature: 'Update cadence',
          values: [
            { value: 'Whenever you remember', positive: false },
            { value: 'Quarterly or when scared', positive: false },
            { value: 'Weekly', positive: true },
            { value: 'Daily', positive: true },
          ],
        },
        {
          feature: 'Scenarios modelled',
          values: [
            { value: 'None', positive: false },
            { value: 'One ambitious base case', positive: false },
            { value: 'Base, best, worst', positive: true },
            { value: 'Yes — multiple', positive: true },
          ],
        },
        {
          feature: 'Decision commentary',
          values: [
            { value: 'None', positive: false },
            { value: 'None', positive: false },
            { value: 'Weekly note', positive: true },
            { value: 'Yes', positive: true },
          ],
        },
        {
          feature: 'Cost (typical UK)',
          values: [
            { value: 'Free' },
            { value: 'Founder time = expensive' },
            { value: 'Scope-based monthly' },
            { value: '£70k+ / yr' },
          ],
        },
        {
          feature: 'Best fit',
          values: [
            { value: 'Pre-revenue' },
            { value: 'Up to £500k' },
            { value: '£1m–£25m founder-led', positive: true },
            { value: '£25m+' },
          ],
        },
      ]}
      bg="light-tint"
    />
  )
}

function IndustriesSection() {
  return (
    <IndustriesBlock
      id="industries"
      eyebrow="By industry"
      h2="Where 13-week cash visibility lands the most value."
      intro="Cash sensitivity varies by business model. These are the sectors where a rolling 13-week forecast typically changes how the founder runs the business within the first month."
      industries={[
        {
          icon: Globe2,
          title: 'SaaS',
          body: 'Annual contracts, deferred revenue, and high gross retention make cash timing tricky. The 13-week view turns ARR-into-cash from a guess into a calendar.',
        },
        {
          icon: Briefcase,
          title: 'Digital agencies',
          body: 'Project-based billing and long client payment cycles create volatile weeks. Scenario forecasts let you see the impact of a single late invoice before it lands.',
        },
        {
          icon: Building2,
          title: 'Professional services',
          body: 'Big retainers and partner draws move cash sharply. The weekly forecast flags tight points months ahead so payroll and tax windows stop being surprises.',
        },
        {
          icon: ShoppingBag,
          title: 'E-commerce',
          body: 'Stock cycles, platform fees, and ad spend all swing cash hard. We forecast around inventory + paid spend so growth doesn\'t accidentally starve cash.',
        },
      ]}
      bg="light"
    />
  )
}

function WhatIsSection() {
  return (
    <WhatIsBlock
      id="what-is"
      eyebrow="In plain terms"
      h2="13-Week Cashflow Forecast, defined."
      items={[
        {
          term: 'What is a 13-week cashflow forecast?',
          definition:
            "A 13-week cashflow forecast is a rolling weekly projection of cash in, cash out, and resulting balance across the next quarter. It is driver-based — built from real revenue and cost drivers — and refreshed weekly so the view stays accurate as receivables, payables, and timing change.",
        },
        {
          term: 'Why 13 weeks specifically?',
          definition:
            'Thirteen weeks is one quarter — long enough to spot tight points and plan around them, short enough that the forecast stays grounded in actual receivables and payables rather than assumptions. The first 4–6 weeks are typically accurate to within a few percent; later weeks flex more, which is why we run scenarios.',
        },
        {
          term: 'Who needs one?',
          definition:
            'Founder-led UK businesses where cash decisions affect the business — hiring, spending, pricing, fundraising. Especially valuable from around £1m in revenue, where a single missed receivable or unexpected outflow changes the picture.',
        },
        {
          term: 'How much does it cost?',
          definition:
            'Scope-based monthly retainer at Cunos Consulting — typically £1,500 to £5,000 per month depending on complexity (multi-entity, multi-currency, FX exposure). No hourly billing, no lock-in beyond rolling month-to-month.',
        },
      ]}
      bg="light-tint"
    />
  )
}

function TestimonialsSection() {
  return (
    <TestimonialsBlock
      id="testimonials"
      eyebrow="What clients say"
      h2="Founders running cash with a quarter of visibility."
      intro="Three founder-led UK businesses that switched from instinct-based cashflow to the 13-week rolling model. Names and businesses anonymised at client request."
      testimonials={[
        {
          quote:
            "We caught a £180k tax-and-renewal squeeze eleven weeks ahead. Without the forecast we'd have hit it cold and made worse decisions in a panic.",
          name: 'Mark Olsen',
          role: 'Co-founder',
          company: '£6.2m UK SaaS',
          initials: 'MO',
          metric: '£180k cash exposure avoided',
        },
        {
          quote:
            "Our forecasting went from a quarterly fire-drill that nobody trusted to a weekly note that everyone reads. It changed how we plan, not just how we report.",
          name: 'Aisha Brennan',
          role: 'CFO',
          company: '£4.8m UK agency',
          initials: 'AB',
          metric: 'Weekly cadence, fortnightly decisions',
        },
        {
          quote:
            "I used to lose Sunday evenings in a spreadsheet. Now I read a five-bullet note on Monday morning and the next thirteen weeks are clear.",
          name: 'Daniel Whitfield',
          role: 'Founder',
          company: '£3.1m e-commerce brand',
          initials: 'DW',
          metric: 'Sundays back',
        },
      ]}
      bg="dark"
    />
  )
}

function InsightsSection() {
  return (
    <InsightsBlock
      id="insights"
      eyebrow="Insights"
      h2="Recent thinking on cashflow forecasting."
      intro="Practical pieces for founder-led businesses building a cashflow view that actually drives decisions."
      posts={[
        {
          slug: 'thirteen-week-cashflow-forecast-guide',
          category: 'Cashflow',
          title: '13-week cashflow forecasting: a practical guide for founders',
          excerpt:
            'Why 13 weeks is the right horizon, what data you need to build one, and how to keep it from going stale.',
          readMinutes: 9,
        },
        {
          slug: 'driver-based-forecasting-vs-spreadsheet',
          category: 'Methodology',
          title: 'Driver-based forecasting vs. the spreadsheet you redo every quarter',
          excerpt:
            'The structural difference that makes a forecast trustworthy — and why most spreadsheets fail it.',
          readMinutes: 7,
        },
        {
          slug: 'scenario-modelling-base-best-worst',
          category: 'Decision-making',
          title: 'Base, best, worst: scenario modelling for non-finance founders',
          excerpt:
            'How to pressure-test a forecast in fifteen minutes — and what to do when the worst case actually plays out.',
          readMinutes: 6,
        },
        {
          slug: 'cashflow-red-flags-founder-led-businesses',
          category: 'Operations',
          title: 'Six cashflow red flags every founder-led business should track',
          excerpt:
            "Early signals that the cash story is changing — before the bank balance shows it.",
          readMinutes: 5,
        },
      ]}
      bg="light-tint"
    />
  )
}

function CaseStudySection() {
  return (
    <CaseStudy
      id="case-study"
      eyebrow="Case study (illustrative)"
      h2="Spotted a £180k tax window 11 weeks early."
      industry="£6m SaaS business"
      context="The founder had a rough quarterly forecast in a spreadsheet that was last updated three months ago. Cash looked fine in the bank — but a corporation tax bill, two software annual renewals, and a long-promised senior hire were all converging on the same six-week window."
      intervention="We rebuilt the forecast as a driver-based 13-week model — connected to the accounting system, refreshed weekly, with base/best/worst scenarios. Within the first run, the model surfaced a £180k cash dip in week eleven that no one had seen coming. We modelled three responses and the founder picked the cleanest one."
      outcome="The senior hire was deferred by four weeks. The renewals were renegotiated to quarterly payment terms. The tax window passed without drama. Cash stayed comfortably above the comfort threshold the whole quarter."
      quote={{
        text: 'We thought cash was fine. The forecast showed us we had about three weeks to make a decision that would have looked like a crisis if we\'d found out a month later.',
        attribution: 'Founder, £6m UK SaaS business',
      }}
      metrics={[
        { value: '11 weeks', label: 'Lead time on the cash dip' },
        { value: '£180k', label: 'Cash exposure avoided' },
        { value: '0', label: 'Late-payment fees that quarter' },
      ]}
      bg="light"
    />
  )
}
