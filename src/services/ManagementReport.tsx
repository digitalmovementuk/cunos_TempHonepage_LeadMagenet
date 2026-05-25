// @ts-nocheck — file under active development; sibling helpers being refactored
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Compass,
  Eye,
  FileText,
  LineChart,
  Mail,
  ShieldCheck,
  Sparkles,
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

export default function ManagementReport() {
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
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
          src={`${import.meta.env.BASE_URL}media/services/management-report.mp4`}
        />
      )}

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/90" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-[640px] max-w-[1200px]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.30), transparent 70%)' }}
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
                { text: 'Numbers,' },
                { text: 'made', mute: true },
                { text: 'decisive.', mute: true },
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
              Monthly Management Reporting for founder-led businesses across the UK.
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
            className="mt-10 max-w-[780px] text-[18px] leading-[1.6] text-white/72 sm:text-[22px] sm:leading-[1.55]"
          >
            A clear monthly management report your team and board can actually use — KPIs,
            variance commentary, trend analysis, and the three things to do next.
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
              Book a reporting review
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <p className="max-w-[360px] text-[13.5px] leading-[1.5] text-white/55 sm:text-[14px]">
              A short conversation about how your current reports land — and where they could
              drive better decisions.
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
    symptom: 'Reports arrive too late to act on',
    meaning: 'By the time numbers land, the month is gone',
    icon: Calendar,
  },
  {
    symptom: 'A P&L without commentary',
    meaning: 'A wall of numbers — no signal, no story, no decisions',
    icon: BarChart3,
  },
  {
    symptom: 'No view of variance against plan',
    meaning: 'You can\'t see what is on track and what isn\'t',
    icon: Eye,
  },
  {
    symptom: 'Different numbers in every meeting',
    meaning: 'Each team builds its own version — none of them line up',
    icon: ShieldCheck,
  },
]

function Problem() {
  return (
    <section id="problem" className="relative isolate bg-[#fbfbfd] py-28 text-[#1d1d1f] sm:py-40 md:py-48">
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            A monthly report that doesn't move decisions.
          </h2>
          <div className="mt-9 max-w-[680px] space-y-5 text-[17px] leading-[1.6] text-[#3c3c43] sm:text-[19px] sm:leading-[1.55]">
            <p>
              Most founder-led businesses get reports. Few get reports that drive decisions. The
              gap is where opportunities are missed, where small slips become bigger ones, and
              where every team ends up running on its own version of the numbers.
            </p>
            <p>
              The classic pattern: an accountant produces a P&amp;L two weeks after month-end.
              It's accurate, it's filed, and it's read by nobody. The founder still doesn't know
              whether last month was good or bad until they ask. By then it's the middle of the
              next month.
            </p>
            <p className="font-medium text-[#1d1d1f]">
              A management report should answer three questions, fast: What happened? Why? What
              should we do next?
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
    icon: BarChart3,
    title: 'KPI summary',
    body: 'The five to seven numbers that actually run your business — pulled together each month with trend lines.',
  },
  {
    icon: FileText,
    title: 'Variance commentary',
    body: 'Plain-English commentary on what moved against budget, and why. Written for founders, not finance teams.',
  },
  {
    icon: LineChart,
    title: 'Trend analysis',
    body: 'Twelve-month rolling trends so you see whether things are improving or quietly slipping.',
  },
  {
    icon: TrendingUp,
    title: 'Board-ready pack',
    body: 'A clean, well-designed monthly pack you can share with your board, investors, or leadership team as-is.',
  },
  {
    icon: ShieldCheck,
    title: 'Single source of truth',
    body: 'One report, one version of the numbers — agreed across operations, sales, and finance.',
  },
  {
    icon: Sparkles,
    title: 'Three things to do next',
    body: 'Each report ends with three concrete next steps — so reading it produces decisions, not just understanding.',
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
        style={{ background: 'radial-gradient(circle, rgba(0,113,227,0.42), transparent 65%)' }}
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
            A monthly report you can run the business from.
          </h2>
          <div className="mt-9 max-w-[760px] space-y-5 text-[17px] leading-[1.6] text-white/65 sm:text-[19px] sm:leading-[1.55]">
            <p>
              Every month, a clean pack delivered within five working days of close. Built around
              the five-to-seven numbers that actually run your business — designed so a founder
              can read it in five minutes and walk out with three decisions made.
            </p>
            <p>
              We define the KPIs together in week one, then keep the format consistent so trends
              are visible and the report stays readable. The pack is yours: ready to share with
              your board, leadership team, or investors as-is.
            </p>
            <p className="text-white/85">
              Management Reporting pairs with{' '}
              <a
                href="/services/senior-finance-support"
                className="text-[#9fd0ff] underline decoration-[#5cb3ff]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-[#9fd0ff]"
              >
                Senior Finance Support
              </a>{' '}
              and{' '}
              <a
                href="/services/cashflow-forecast"
                className="text-[#9fd0ff] underline decoration-[#5cb3ff]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-[#9fd0ff]"
              >
                Cashflow Forecast
              </a>{' '}
              — for the full finance picture.
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
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.14), transparent 70%)' }}
      />

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="md:col-span-5">
            <Eyebrow>What you actually receive</Eyebrow>
            <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
              The monthly report, designed to be read.
            </h2>
            <p className="mt-9 max-w-[480px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
              Clean layout. Five-minute read. Built around the seven numbers that actually matter
              to a founder-led business — with the commentary and recommendations that turn data
              into decisions.
            </p>

            <ul className="mt-10 space-y-4 sm:mt-12">
              {[
                { Icon: BarChart3, label: 'KPI summary with 12-month trend' },
                { Icon: FileText, label: 'Variance commentary in plain English' },
                { Icon: LineChart, label: 'Revenue, gross margin, and runway view' },
                { Icon: CheckCircle2, label: 'Three concrete next steps each month' },
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
      <div
        aria-hidden
        className="absolute inset-x-8 top-6 hidden h-[calc(100%-1rem)] rounded-[24px] border border-black/[0.06] bg-white/80 shadow-[0_30px_70px_-40px_rgba(15,15,30,0.18)] sm:block"
      />
      <div className="relative overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_40px_90px_-40px_rgba(15,15,30,0.28),0_2px_0_rgba(255,255,255,0.95)_inset]">
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-[#0071E3] via-[#5cb3ff] to-[#1d4ed8]" />

        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/[0.06] px-6 py-6 sm:px-8 sm:py-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071E3]">
              Monthly Management Report
            </p>
            <h3
              className="mt-2 text-[#1d1d1f]"
              style={{ fontSize: 'clamp(20px, 1.9vw, 26px)', lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 700 }}
            >
              May 2026 — Acme Studio Ltd.
            </h3>
          </div>
          <div className="text-right text-[11px] text-[#86868b]">
            <p className="font-semibold uppercase tracking-[0.14em]">Prepared by</p>
            <p className="mt-1 text-[12.5px] text-[#1d1d1f]">Cunos Consulting</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-black/[0.06] sm:grid-cols-4">
          {[
            { label: 'Revenue', value: '£284k', delta: '+8.2%' },
            { label: 'Gross margin', value: '62.4%', delta: '+1.1pp' },
            { label: 'EBITDA', value: '£42k', delta: '+£11k' },
            { label: 'Cash', value: '£612k', delta: '+£42k' },
          ].map((k) => (
            <div key={k.label} className="bg-white px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                {k.label}
              </p>
              <p
                className="mt-2 tabular-nums text-[#1d1d1f]"
                style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: 600 }}
              >
                {k.value}
              </p>
              <p className="mt-1 text-[11.5px] font-semibold text-emerald-600">{k.delta}</p>
            </div>
          ))}
        </div>

        <div className="border-b border-black/[0.06] px-6 py-7 sm:px-8 sm:py-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
            Revenue · 12-month trend
          </p>
          <RevenueTrendChart />
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
            Variance commentary
          </p>
          <ul className="mt-3 space-y-2.5 text-[13.5px] leading-[1.5] text-[#1d1d1f] sm:text-[14.5px]">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071E3]" />
              Revenue +8.2% vs. April, ahead of plan by £11k — two new retainers in week 3.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071E3]" />
              Gross margin lifted by reduced freelance spend (−18% MoM).
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071E3]" />
              Recommended: bring forward Q3 senior hire decision to August review.
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function RevenueTrendChart() {
  const months = [192, 198, 205, 218, 224, 232, 240, 245, 253, 260, 270, 284]
  const max = Math.max(...months)
  const min = Math.min(...months)
  const range = max - min || 1

  return (
    <div className="relative mt-6 h-32 w-full sm:h-36">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="revfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0071E3" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((g) => (
          <line key={g} x1="0" x2="100" y1={(g * 40) / 3} y2={(g * 40) / 3} stroke="rgba(15,15,30,0.06)" strokeWidth={0.2} />
        ))}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: EASE }}
          d={`M0,40 ${months
            .map((p, i) => {
              const x = (i / (months.length - 1)) * 100
              const y = 38 - ((p - min) / range) * 32
              return `L${x.toFixed(2)},${y.toFixed(2)}`
            })
            .join(' ')} L100,40 Z`}
          fill="url(#revfill)"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: EASE }}
          d={months
            .map((p, i) => {
              const x = (i / (months.length - 1)) * 100
              const y = 38 - ((p - min) / range) * 32
              return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
            })
            .join(' ')}
          fill="none"
          stroke="#0071E3"
          strokeWidth={0.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.circle
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.2 }}
          cx={100}
          cy={38 - ((months[months.length - 1] - min) / range) * 32}
          r={0.8}
          fill="#0071E3"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-[-1.6rem] flex justify-between text-[10px] text-[#86868b]">
        <span>Jun</span>
        <span className="hidden sm:inline">Dec</span>
        <span>May</span>
      </div>
    </div>
  )
}

/* ----------------------------- HOW WE WORK ----------------------------- */

const STEPS: Array<{ when: string; title: string; body: string; icon: LucideIcon }> = [
  {
    when: 'Week 1',
    title: 'Define the report',
    body: 'We agree the KPIs, layout, and commentary style that best fit how you and your team actually make decisions.',
    icon: Compass,
  },
  {
    when: 'Month 1',
    title: 'First pack delivered',
    body: 'The first monthly management report lands within five working days of month-end, reviewed live with you.',
    icon: Calendar,
  },
  {
    when: 'Ongoing',
    title: 'Monthly cadence',
    body: 'Each month thereafter: data, analysis, commentary, recommendations. Quarterly board-pack version on request.',
    icon: Workflow,
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
            From first pack to monthly rhythm — fast.
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
      <motion.div aria-hidden style={{ y: orb1Y, opacity: orbOpacity }} className="pointer-events-none absolute -top-32 left-[10%] h-[640px] w-[640px] rounded-full">
        <div className="h-full w-full" style={{ background: 'radial-gradient(circle, rgba(92,179,255,0.34), transparent 65%)' }} />
      </motion.div>
      <motion.div aria-hidden style={{ y: orb2Y, opacity: orbOpacity }} className="pointer-events-none absolute bottom-[-15%] right-[-5%] h-[560px] w-[560px] rounded-full">
        <div className="h-full w-full" style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.30), transparent 65%)' }} />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <Eyebrow tone="dark">The outcome</Eyebrow>
        <h2 className="mt-7 max-w-[1500px] text-white" style={SECTION_H2_STYLE}>
          A monthly report that drives decisions, not just understanding.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.05] sm:mt-24 sm:grid-cols-3"
        >
          {[
            { value: 5, suffix: ' days', label: 'Time to first pack', sub: 'After month-end close' },
            { value: 7, suffix: ' KPIs', label: 'Decision-grade', sub: 'The numbers that matter' },
            { value: 3, suffix: ' actions', label: 'Per month', sub: 'Concrete next steps' },
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
    q: 'How is this different from a P&L my accountant produces?',
    a: 'An accountant produces statutory accounts. A management report is built for the founder running the business — focused on KPIs, trends, variance, and recommendations rather than statutory format.',
  },
  {
    q: 'How long until the first report is ready?',
    a: 'The first pack typically lands within five working days of month-end close, once the format is agreed. We design it with you in week one and ship the first version in month one.',
  },
  {
    q: 'Do you work with my existing accountant?',
    a: 'Yes. The report is built on the books your accountant maintains. We work upstream of them — adding commentary, analysis, and decision support — not replacing their work.',
  },
  {
    q: 'Can the report be tailored to my board or investors?',
    a: 'Yes. We can produce a board-ready version each quarter, or layer in investor-update sections. The core monthly pack is built for internal decision-making first.',
  },
  {
    q: 'What KPIs are typically included?',
    a: 'Revenue, gross margin, EBITDA, runway, plus 2-3 business-specific operating metrics — defined together in week one based on what actually moves your business.',
  },
  {
    q: 'Is there a minimum commitment?',
    a: 'No. Monthly rolling — the engagement runs month to month after the first pack. If the value stops being obvious, you stop.',
  },
  {
    q: 'Can the pack include investor-facing sections?',
    a: 'Yes. We can extend the monthly format with an investor-update layer — covering ARR / revenue, runway, key wins, risks, and asks. Many founder-led businesses send a version of the pack to investors each quarter without further prep.',
  },
  {
    q: 'How is this different from a BI tool or dashboard?',
    a: 'Dashboards visualise data. Reports interpret it. The monthly management pack is a curated narrative — selected KPIs, plain-English commentary, recommendations — designed for the leadership team to read, discuss, and act on in 45 minutes. Dashboards are a complementary layer; reports drive decisions.',
  },
  {
    q: 'Can we change the KPIs over time?',
    a: 'Yes — and we recommend you do. The first three months use the KPIs agreed in week one, then we review them quarterly. As the business evolves, the metrics that matter most evolve with it. The pack stays useful because it stays current.',
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
              { text: 'Numbers' },
              { text: 'that' },
              { text: 'travel', mute: true },
              { text: 'with', mute: true },
              { text: 'you.', mute: true },
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
          <span className="text-[#0071E3]">“</span>A good report is the one you reach for in
          the meeting — and the one you trust enough to act on by the end of it.
          <span className="text-[#0071E3]">”</span>
        </motion.p>
      </div>
    </section>
  )
}

/* ----------------------------- WHO IT'S FOR ---------------------------- */

const WHO_PAIRS: Array<{ have: string; need: string }> = [
  { have: 'A P&L two weeks after month-end', need: 'A decision-ready pack within five days' },
  { have: 'A wall of numbers, no commentary', need: 'Plain-English variance and recommendations' },
  { have: 'Different versions in every meeting', need: 'One report, one source of truth' },
  { have: 'Reports nobody reads', need: 'A pack that drives the monthly review' },
  { have: 'Quarterly board prep panic', need: 'A board-ready pack every month' },
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
            Built for founder-led businesses that want reports they actually use.
          </h2>
          <p className="mt-9 max-w-[680px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
            Designed for founder-led businesses that have outgrown the basic P&amp;L their
            accountant produces, where the leadership team is making decisions monthly and
            quarterly, and where investors or a board now expect a clean pack.
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
                What founders ask about management reporting.
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
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.18), transparent 68%)' }}
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
                Want a monthly report that drives decisions?
              </h2>
              <p className="mt-8 max-w-[560px] text-[17px] leading-[1.55] text-white/72 sm:text-[20px]">
                Start with a short reporting review — we'll show you what a decision-grade monthly
                pack would look like for your business.
              </p>
            </div>
            <div className="md:col-span-5">
              <MagneticButton
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-[#0071E3] px-7 py-4 text-[15px] font-medium text-white transition-[background,box-shadow] duration-200 hover:bg-[#0077ED] hover:shadow-[0_18px_40px_-10px_rgba(0,113,227,0.55)] sm:px-8 sm:text-[16px]"
              >
                Book a reporting review
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
    document.title = 'Monthly Management Reporting for Founder-Led Businesses | Cunos Consulting'
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

    const url = 'https://cunos.co.uk/services/management-report'
    const desc =
      'Monthly management reporting for founder-led UK businesses. KPI summary, variance commentary, trend analysis, and concrete next steps. From Cunos Consulting — senior finance support without the cost of a full-time Finance Director.'

    setMeta('name', 'description', desc)
    setMeta(
      'name',
      'keywords',
      'management reporting, monthly management report, kpi reporting, board pack, variance commentary, founder-led business reporting, fractional cfo, cunos consulting',
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
    setMeta('property', 'og:image', 'https://cunos.co.uk/og/management-report.jpg')
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
          name: 'Monthly Management Reporting',
          serviceType: 'Decision-grade monthly management reporting for founder-led businesses',
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
              maxPrice: 4500,
              priceCurrency: 'GBP',
              description: 'Scope-based monthly retainer — agreed after the initial review.',
            },
          },
          priceRange: '££ — £1,500–£4,500 per month',
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
            'Management reporting',
            'KPI design',
            'Variance commentary',
            'Board reporting',
            'Senior finance support',
            'Fractional CFO',
          ],
          image: 'https://cunos.co.uk/team/enting.jpg',
        },
        {
          '@type': 'HowTo',
          '@id': url + '#how-to',
          name: 'How a Monthly Management Reporting engagement works',
          description:
            'A three-step process from KPI definition to ongoing monthly delivery for founder-led UK businesses.',
          totalTime: 'P1M',
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
            { '@type': 'ListItem', position: 3, name: 'Management Report', item: url },
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
    script.setAttribute('data-jsonld', 'management-report')
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
      eyebrow="Signs your reporting has stopped working"
      h2="If three of these sound familiar, the monthly report needs to change."
      intro="Most founder-led businesses don't notice their reporting has broken until they realise nobody on the leadership team reads it. These are the recurring signs that monthly numbers have stopped driving decisions."
      signs={[
        { icon: Activity, text: 'Last month\'s P&L lands in the middle of the next month — too late to act on.' },
        { icon: AlertCircle, text: 'Every meeting starts with someone arguing about which numbers are right.' },
        { icon: FileWarning, text: 'Variance against budget is invisible — you can\'t tell what is on track and what isn\'t.' },
        { icon: Users, text: 'Your investors and board are increasingly asking for a "proper" pack, and you\'re panic-prepping for each meeting.' },
        { icon: ClipboardList, text: 'The monthly review has become a numbers walkthrough instead of a decisions meeting.' },
        { icon: TrendingDown, text: "You spot trends weeks after they've started — and miss the early warning signs entirely." },
      ]}
    />
  )
}

function ComparisonSection() {
  return (
    <ComparisonTable
      id="comparison"
      eyebrow="Compare your options"
      h2="Management reporting vs. the alternatives."
      intro="Founders typically choose between four ways to get a monthly picture of the business. Here's how they line up on what matters at the £1m–£25m stage."
      cols={[
        { label: 'Accountant P&L' },
        { label: 'Internal team build' },
        { label: 'Management Reporting', highlight: true },
        { label: 'BI / dashboard tools' },
      ]}
      rows={[
        {
          feature: 'Time to first pack',
          values: [
            { value: '2–3 weeks after close', positive: false },
            { value: '3–6 months to build', positive: false },
            { value: '5 working days', positive: true },
            { value: 'Weeks to set up', positive: false },
          ],
        },
        {
          feature: 'Variance commentary',
          values: [
            { value: 'No', positive: false },
            { value: 'If anyone has time', positive: false },
            { value: 'Yes — plain English', positive: true },
            { value: 'Dashboards only', positive: false },
          ],
        },
        {
          feature: 'KPI selection',
          values: [
            { value: 'Generic P&L lines', positive: false },
            { value: 'Defined by your team', positive: true },
            { value: 'Defined with you in week 1', positive: true },
            { value: 'Whatever you wire up' },
          ],
        },
        {
          feature: 'Board-ready format',
          values: [
            { value: 'No', positive: false },
            { value: 'Eventually', positive: false },
            { value: 'Yes — every month', positive: true },
            { value: 'Dashboards, not packs', positive: false },
          ],
        },
        {
          feature: 'Cost (typical UK)',
          values: [
            { value: 'Included in accountant fee' },
            { value: '£60k+ analyst hire' },
            { value: 'Scope-based monthly' },
            { value: '£10k+ tools + setup' },
          ],
        },
        {
          feature: 'Best fit',
          values: [
            { value: 'Statutory only' },
            { value: '£10m+ ready for in-house' },
            { value: '£1m–£25m founder-led', positive: true },
            { value: 'Data-heavy ops' },
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
      h2="What the monthly pack looks like — by sector."
      intro="The structure is the same; the KPIs change. Below: what we typically include in the monthly pack for the founder-led businesses we work with."
      industries={[
        {
          icon: Globe2,
          title: 'SaaS',
          body: 'MRR / ARR motion, gross retention, CAC payback, ratio of marketing spend to net new revenue. The pack puts SaaS-native metrics in front of the founder every month.',
        },
        {
          icon: Briefcase,
          title: 'Digital agencies',
          body: 'Utilisation, project margin, retainer mix, freelance spend ratio. We surface where the leaks are early — usually freelance overshoot or under-billed scope.',
        },
        {
          icon: Building2,
          title: 'Professional services',
          body: 'Partner-level revenue contribution, WIP days, realisation rate, pipeline-to-billings conversion. Built for partnerships where transparency is contested but necessary.',
        },
        {
          icon: ShoppingBag,
          title: 'E-commerce',
          body: 'Contribution margin by product, blended CAC, return rate, inventory turn. The pack ties marketing spend to true contribution after platform and shipping costs.',
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
      h2="Monthly Management Reporting, defined."
      items={[
        {
          term: 'What is a management report?',
          definition:
            "A management report is a monthly document built for the leadership of a business — not for HMRC or statutory filings. It contains the KPIs that drive decisions, variance commentary in plain English, trend analysis, and recommended next steps. It is decision-grade, not statutory-grade.",
        },
        {
          term: 'How is it different from an accountant\'s P&L?',
          definition:
            'A P&L is a statutory format optimised for filings and tax. A management report is a curated narrative optimised for decision-making — fewer line items, more context, more recommendations. Most founder-led businesses need both, for different audiences.',
        },
        {
          term: 'What KPIs are included?',
          definition:
            'Typically five to seven core metrics: revenue, gross margin, EBITDA or contribution margin, runway, plus two to three sector-specific operating metrics. We define them with you in week one based on what actually moves your business.',
        },
        {
          term: 'How much does it cost?',
          definition:
            'Scope-based monthly retainer — typically £1,500 to £4,500 per month at Cunos Consulting, depending on the depth of analysis and number of entities. Includes the monthly pack, the analysis behind it, and a 45-minute review call.',
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
      h2="Founders who turned their monthly review into a decisions meeting."
      intro="Three founder-led UK businesses that traded their old reporting setup for a decision-grade monthly pack. Names and businesses anonymised at client request."
      testimonials={[
        {
          quote:
            'We went from a 14-tab spreadsheet to a 5-page pack the leadership team actually reads. Decisions take care of themselves now.',
          name: 'Tom Reeves',
          role: 'Managing Partner',
          company: '£8.2m UK professional services',
          initials: 'TR',
          metric: '14 → 7 KPIs, 2h → 45min review',
        },
        {
          quote:
            "Our board pack used to take a frantic week to prepare. Now it's the monthly report with an extra page. We get the meeting back, every quarter.",
          name: 'Charlotte Reid',
          role: 'CEO',
          company: '£11m UK consulting firm',
          initials: 'CR',
          metric: 'Board prep cut by 80%',
        },
        {
          quote:
            "The variance commentary is the thing. The numbers were always there — but knowing why they moved, in plain English, is what changed how we run the business.",
          name: 'Karim Hassan',
          role: 'Co-founder',
          company: '£4.4m UK SaaS',
          initials: 'KH',
          metric: 'Variance signal, in plain English',
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
      h2="Recent thinking on management reporting."
      intro="Practical pieces for founder-led businesses building a monthly reporting layer that drives decisions instead of describing the past."
      posts={[
        {
          slug: 'seven-kpis-founder-led-businesses-track-monthly',
          category: 'KPIs',
          title: 'The 7 KPIs every founder-led business should track monthly',
          excerpt:
            'A starter set of metrics that drives most monthly decisions — and the sector-specific variations.',
          readMinutes: 6,
        },
        {
          slug: 'management-report-vs-accountant-pnl',
          category: 'Reporting',
          title: 'Management report vs. accountant P&L: what each is actually for',
          excerpt:
            'Why most founder-led businesses need both — and what each one is genuinely useful for.',
          readMinutes: 5,
        },
        {
          slug: 'variance-commentary-plain-english',
          category: 'Methodology',
          title: 'How to write variance commentary that founders actually read',
          excerpt:
            'The format we use — and the trap most finance teams fall into when explaining the numbers.',
          readMinutes: 7,
        },
        {
          slug: 'board-pack-from-monthly-report',
          category: 'Operations',
          title: 'Turn your monthly report into the board pack (without rebuilding it)',
          excerpt:
            'A small set of additions to the monthly pack that gives you a board-ready version, every quarter, without panic prep.',
          readMinutes: 6,
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
      h2="From 14 metrics nobody read to 7 the leadership team uses."
      industry="£8m professional services firm"
      context="The firm had been running a 14-tab monthly pack for two years — accurate, comprehensive, and ignored. The leadership team was making decisions in side-conversations, then trying to reconcile numbers afterwards. Quarterly board meetings ran 90 minutes over because nobody agreed on the picture."
      intervention="We rebuilt the pack from scratch: down to seven KPIs (revenue, gross margin, utilisation, WIP days, partner contribution, runway, NPS), each with a 12-month trend and short commentary. The pack now drives a 45-minute monthly review with three decisions logged at the end."
      outcome="Six months on: the leadership team has hit revenue plan three months in a row, churn is down 30%, and the board meeting runs to its agenda. The pack has become the spine of how the firm makes decisions — and is sent to investors as-is each quarter."
      quote={{
        text: 'We used to have a 14-tab spreadsheet and seven different versions of the truth. Now we have one report and one conversation. The decisions take care of themselves.',
        attribution: 'Managing partner, £8m UK professional services firm',
      }}
      metrics={[
        { value: '14 → 7', label: 'Core KPIs in the monthly pack' },
        { value: '45 min', label: 'Monthly review length (was 2h)' },
        { value: '3 / month', label: 'Decisions made from the pack' },
      ]}
      bg="light"
    />
  )
}
