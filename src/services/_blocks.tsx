// @ts-nocheck — file under active development; sibling helpers being refactored
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Minus, Quote, type LucideIcon } from 'lucide-react'

import {
  EASE,
  Eyebrow,
  SECTION_H2_STYLE,
  fadeUp,
  stagger,
} from './SeniorFinanceSupport'

/* ===================================================================== */
/*                          SHARED CONTENT BLOCKS                         */
/* ===================================================================== */

/* --------------------------- COMPARISON TABLE -------------------------- */

export type ComparisonCol = {
  label: string
  highlight?: boolean
}

export type ComparisonRow = {
  feature: string
  values: Array<string | { value: string; positive?: boolean }>
}

export function ComparisonTable({
  id = 'comparison',
  eyebrow,
  h2,
  intro,
  cols,
  rows,
  bg = 'light',
}: {
  id?: string
  eyebrow: string
  h2: string
  intro: string
  cols: ComparisonCol[]
  rows: ComparisonRow[]
  bg?: 'light' | 'light-tint'
}) {
  const bgCls = bg === 'light-tint' ? 'bg-[#f5f8fc]' : 'bg-[#fbfbfd]'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-28 text-[#1d1d1f] sm:py-40 md:py-48 ${bgCls}`}
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            {h2}
          </h2>
          <p className="mt-9 max-w-[680px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
            {intro}
          </p>
        </div>

        {/* Desktop table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-16 hidden overflow-hidden rounded-[24px] border border-black/[0.08] bg-white shadow-[0_18px_44px_-32px_rgba(15,15,30,0.18)] md:block"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/[0.08]">
                <th className="px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b] lg:px-8 lg:py-6">
                  Feature
                </th>
                {cols.map((c) => (
                  <th
                    key={c.label}
                    className={`px-5 py-5 text-[12.5px] font-semibold lg:px-6 lg:py-6 ${
                      c.highlight
                        ? 'bg-[#eef5ff] text-[#0071E3]'
                        : 'text-[#1d1d1f]'
                    }`}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-[#fbfbfd]'}
                >
                  <td className="px-6 py-5 text-[14.5px] font-medium text-[#1d1d1f] lg:px-8 lg:py-6">
                    {row.feature}
                  </td>
                  {row.values.map((v, j) => {
                    const isObj = typeof v !== 'string'
                    const text = isObj ? v.value : v
                    const positive = isObj && v.positive
                    return (
                      <td
                        key={j}
                        className={`px-5 py-5 text-[13.5px] leading-[1.5] lg:px-6 lg:py-6 ${
                          cols[j]?.highlight ? 'bg-[#eef5ff] font-medium text-[#0071E3]' : 'text-[#3c3c43]'
                        }`}
                      >
                        <span className="inline-flex items-start gap-2">
                          {isObj && (
                            <span
                              aria-hidden
                              className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                                positive ? 'bg-emerald-500/15 text-emerald-600' : 'bg-black/[0.06] text-[#86868b]'
                              }`}
                            >
                              {positive ? (
                                <Check size={11} strokeWidth={2.5} />
                              ) : (
                                <Minus size={11} strokeWidth={2.5} />
                              )}
                            </span>
                          )}
                          {text}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile — each column becomes a stacked card */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:hidden">
          {cols.map((c, ci) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 * ci }}
              className={`overflow-hidden rounded-[22px] border bg-white shadow-[0_18px_44px_-32px_rgba(15,15,30,0.18)] ${
                c.highlight ? 'border-[#0071E3]/30 ring-2 ring-[#0071E3]/15' : 'border-black/[0.08]'
              }`}
            >
              <div
                className={`border-b border-black/[0.05] px-6 py-4 ${
                  c.highlight ? 'bg-[#eef5ff]' : 'bg-[#fbfbfd]'
                }`}
              >
                <p
                  className={`text-[15px] font-semibold ${
                    c.highlight ? 'text-[#0071E3]' : 'text-[#1d1d1f]'
                  }`}
                >
                  {c.label}
                </p>
              </div>
              <dl className="divide-y divide-black/[0.06]">
                {rows.map((row) => {
                  const v = row.values[ci]
                  const isObj = typeof v !== 'string'
                  const text = isObj ? v?.value : v
                  return (
                    <div key={row.feature} className="px-6 py-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                        {row.feature}
                      </dt>
                      <dd className="mt-1 text-[14.5px] leading-[1.4] text-[#1d1d1f]">
                        {text}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- SIGNS BLOCK ----------------------------- */

export type SignItem = {
  icon: LucideIcon
  text: string
}

export function SignsBlock({
  id = 'signs',
  eyebrow,
  h2,
  intro,
  signs,
  bg = 'light-tint',
}: {
  id?: string
  eyebrow: string
  h2: string
  intro: string
  signs: SignItem[]
  bg?: 'light' | 'light-tint'
}) {
  const bgCls = bg === 'light-tint' ? 'bg-[#f5f8fc]' : 'bg-[#fbfbfd]'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-28 text-[#1d1d1f] sm:py-40 md:py-48 ${bgCls}`}
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
                {h2}
              </h2>
              <p className="mt-9 max-w-[420px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[18px]">
                {intro}
              </p>
            </div>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-4 md:col-span-7 md:space-y-5"
          >
            {signs.map((s) => (
              <motion.li
                key={s.text}
                variants={fadeUp}
                className="group flex items-start gap-5 rounded-[20px] border border-black/[0.06] bg-white px-6 py-5 shadow-[0_14px_36px_-28px_rgba(15,15,30,0.18)] transition-all hover:-translate-y-0.5 hover:border-[#0071E3]/20 hover:shadow-[0_20px_48px_-26px_rgba(0,113,227,0.28)] sm:px-7 sm:py-6"
              >
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[#0071E3]/15 bg-[#eef5ff] text-[#0071E3] transition-colors group-hover:bg-[#0071E3] group-hover:text-white">
                  <s.icon size={17} strokeWidth={1.7} />
                </span>
                <p
                  className="pt-0.5 text-[#1d1d1f]"
                  style={{
                    fontSize: 'clamp(16px, 1.6vw, 19px)',
                    lineHeight: '1.4',
                    letterSpacing: '-0.012em',
                    fontWeight: 500,
                  }}
                >
                  {s.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

/* --------------------------- INDUSTRIES BLOCK -------------------------- */

export type IndustryItem = {
  icon: LucideIcon
  title: string
  body: string
}

export function IndustriesBlock({
  id = 'industries',
  eyebrow,
  h2,
  intro,
  industries,
  bg = 'light',
}: {
  id?: string
  eyebrow: string
  h2: string
  intro: string
  industries: IndustryItem[]
  bg?: 'light' | 'light-tint' | 'dark'
}) {
  const bgCls =
    bg === 'dark'
      ? 'bg-[#06122a] text-white'
      : bg === 'light-tint'
        ? 'bg-[#f5f8fc] text-[#1d1d1f]'
        : 'bg-[#fbfbfd] text-[#1d1d1f]'
  const dark = bg === 'dark'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-28 sm:py-40 md:py-48 ${bgCls}`}
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow tone={dark ? 'dark' : 'light'}>{eyebrow}</Eyebrow>
          <h2
            className={`mt-7 ${dark ? 'text-white' : 'text-[#1d1d1f]'}`}
            style={SECTION_H2_STYLE}
          >
            {h2}
          </h2>
          <p
            className={`mt-9 max-w-[680px] text-[17px] leading-[1.55] sm:text-[19px] ${
              dark ? 'text-white/65' : 'text-[#3c3c43]'
            }`}
          >
            {intro}
          </p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {industries.map((ind, i) => (
            <motion.li
              key={ind.title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.05 * i } },
              }}
              className={`group flex h-full flex-col rounded-[22px] border p-7 transition-all hover:-translate-y-1 sm:p-8 ${
                dark
                  ? 'border-white/10 bg-white/[0.04] hover:border-[#5cb3ff]/35 hover:bg-white/[0.08]'
                  : 'border-black/[0.06] bg-white shadow-[0_14px_36px_-28px_rgba(15,15,30,0.18)] hover:border-[#0071E3]/20 hover:shadow-[0_20px_48px_-26px_rgba(0,113,227,0.28)]'
              }`}
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-2xl transition-colors ${
                  dark
                    ? 'border border-white/12 bg-white/[0.06] text-[#9fd0ff] group-hover:text-white'
                    : 'border border-[#0071E3]/15 bg-[#eef5ff] text-[#0071E3] group-hover:bg-[#0071E3] group-hover:text-white'
                }`}
              >
                <ind.icon size={18} strokeWidth={1.7} />
              </span>
              <h3
                className={`mt-7 ${dark ? 'text-white' : 'text-[#1d1d1f]'}`}
                style={{
                  fontSize: 'clamp(20px, 1.9vw, 24px)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                }}
              >
                {ind.title}
              </h3>
              <p
                className={`mt-3 text-[14.5px] leading-[1.55] sm:text-[15.5px] ${
                  dark ? 'text-white/65' : 'text-[#6e6e73]'
                }`}
              >
                {ind.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ------------------------------ CASE STUDY ----------------------------- */

export type CaseStudyMetric = { value: string; label: string }

export function CaseStudy({
  id = 'case-study',
  eyebrow,
  h2,
  industry,
  context,
  intervention,
  outcome,
  quote,
  metrics,
  bg = 'light',
}: {
  id?: string
  eyebrow: string
  h2: string
  industry: string
  context: string
  intervention: string
  outcome: string
  quote: { text: string; attribution: string }
  metrics: CaseStudyMetric[]
  bg?: 'light' | 'light-tint'
}) {
  const bgCls = bg === 'light-tint' ? 'bg-[#f5f8fc]' : 'bg-[#fbfbfd]'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-28 text-[#1d1d1f] sm:py-40 md:py-48 ${bgCls}`}
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            {h2}
          </h2>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="mt-16 grid grid-cols-1 gap-12 rounded-[28px] border border-black/[0.06] bg-white p-8 shadow-[0_24px_60px_-32px_rgba(15,15,30,0.22)] sm:p-12 md:mt-20 md:grid-cols-12 md:gap-14 md:p-16 lg:p-20"
        >
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071E3]">
              <span className="rounded-pill border border-[#0071E3]/20 bg-[#eef5ff] px-3 py-1.5">
                Illustrative scenario
              </span>
              <span className="text-[#86868b]">{industry}</span>
            </div>

            <div className="mt-10 space-y-7 text-[16px] leading-[1.65] text-[#3c3c43] sm:text-[17.5px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                  Context
                </p>
                <p className="mt-2.5">{context}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                  What we did
                </p>
                <p className="mt-2.5">{intervention}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                  Outcome
                </p>
                <p className="mt-2.5 text-[#1d1d1f]">{outcome}</p>
              </div>
            </div>

            <figure className="mt-12 rounded-[22px] border border-black/[0.06] bg-[#fbfbfd] p-6 sm:p-7">
              <blockquote
                className="font-serif text-[18px] italic leading-[1.5] text-[#1d1d1f] sm:text-[20px]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                <span className="text-[#0071E3]">“</span>
                {quote.text}
                <span className="text-[#0071E3]">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[13px] font-medium uppercase tracking-[0.14em] text-[#86868b]">
                — {quote.attribution}
              </figcaption>
            </figure>
          </div>

          <div className="md:col-span-5 md:border-l md:border-black/[0.06] md:pl-12 lg:pl-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071E3]">
              Numbers, before and after
            </p>
            <dl className="mt-7 space-y-7">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dd
                    className="tabular-nums text-[#1d1d1f]"
                    style={{
                      fontSize: 'clamp(34px, 4.2vw, 56px)',
                      lineHeight: '1.0',
                      letterSpacing: '-0.035em',
                      fontWeight: 300,
                    }}
                  >
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

/* ----------------------------- TESTIMONIALS ---------------------------- */

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  initials: string
  /** Optional path to a real photo (e.g., '/team/sarah-chen.jpg'). Falls back
      to brand-tinted initials when missing. */
  photo?: string
  /** Optional headline metric tied to this testimonial (e.g., "Closed £2m round"). */
  metric?: string
}

export function TestimonialsBlock({
  id = 'testimonials',
  eyebrow,
  h2,
  intro,
  testimonials,
  bg = 'dark',
}: {
  id?: string
  eyebrow: string
  h2: string
  intro: string
  testimonials: Testimonial[]
  bg?: 'light' | 'dark'
}) {
  const dark = bg === 'dark'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-28 sm:py-40 md:py-48 ${
        dark ? 'bg-[#0b1220] text-white' : 'bg-[#fbfbfd] text-[#1d1d1f]'
      }`}
    >
      {dark && (
        <>
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
        </>
      )}

      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow tone={dark ? 'dark' : 'light'}>{eyebrow}</Eyebrow>
          <h2
            className={`mt-7 ${dark ? 'text-white' : 'text-[#1d1d1f]'}`}
            style={SECTION_H2_STYLE}
          >
            {h2}
          </h2>
          <p
            className={`mt-9 max-w-[680px] text-[17px] leading-[1.55] sm:text-[19px] ${
              dark ? 'text-white/65' : 'text-[#3c3c43]'
            }`}
          >
            {intro}
          </p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.li
              key={`${t.name}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE, delay: 0.06 * i } },
              }}
              className={`group relative flex h-full flex-col rounded-[24px] p-7 transition-all hover:-translate-y-1 sm:p-8 ${
                dark
                  ? 'border border-white/12 bg-white/[0.04] hover:border-[#5cb3ff]/35 hover:bg-white/[0.07]'
                  : 'border border-black/[0.06] bg-white shadow-[0_18px_44px_-32px_rgba(15,15,30,0.18)] hover:border-[#0071E3]/20 hover:shadow-[0_24px_56px_-30px_rgba(0,113,227,0.32)]'
              }`}
            >
              <Quote
                aria-hidden
                size={22}
                strokeWidth={1.4}
                className={dark ? 'text-[#5cb3ff]/70' : 'text-[#0071E3]/55'}
              />

              <blockquote
                className={`mt-5 flex-1 font-serif italic ${
                  dark ? 'text-white/90' : 'text-[#1d1d1f]'
                }`}
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: 'clamp(17px, 1.5vw, 19.5px)',
                  lineHeight: '1.45',
                  letterSpacing: '-0.005em',
                  fontWeight: 400,
                }}
              >
                <span className={dark ? 'text-[#9fd0ff]' : 'text-[#0071E3]'}>“</span>
                {t.quote}
                <span className={dark ? 'text-[#9fd0ff]' : 'text-[#0071E3]'}>”</span>
              </blockquote>

              {t.metric && (
                <p
                  className={`mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] ${
                    dark ? 'text-[#9fd0ff]' : 'text-[#0071E3]'
                  }`}
                >
                  {t.metric}
                </p>
              )}

              <div
                className={`mt-7 flex items-center gap-4 border-t pt-6 ${
                  dark ? 'border-white/12' : 'border-black/[0.07]'
                }`}
              >
                <TestimonialAvatar testimonial={t} dark={dark} />
                <div className="min-w-0">
                  <p
                    className={`text-[14.5px] font-semibold tracking-[-0.005em] ${
                      dark ? 'text-white' : 'text-[#1d1d1f]'
                    }`}
                  >
                    {t.name}
                  </p>
                  <p
                    className={`mt-0.5 text-[12.5px] leading-[1.4] ${
                      dark ? 'text-white/55' : 'text-[#6e6e73]'
                    }`}
                  >
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function TestimonialAvatar({
  testimonial,
  dark,
}: {
  testimonial: Testimonial
  dark: boolean
}) {
  const fallback = (
    <span
      aria-hidden
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-[14px] font-semibold tracking-[-0.005em] ${
        dark
          ? 'border border-white/15 bg-gradient-to-br from-[#0d1830] via-[#0b1220] to-[#08101e] text-[#9fd0ff]'
          : 'border border-[#0071E3]/15 bg-[#eef5ff] text-[#0071E3]'
      }`}
      style={{
        background: dark
          ? 'radial-gradient(120% 100% at 30% 30%, rgba(92,179,255,0.32), transparent 60%), #0b1220'
          : undefined,
      }}
    >
      {testimonial.initials}
    </span>
  )

  if (!testimonial.photo) return fallback

  return (
    <img
      src={testimonial.photo}
      alt={`Portrait of ${testimonial.name}, ${testimonial.role} at ${testimonial.company}`}
      width="48"
      height="48"
      loading="lazy"
      decoding="async"
      className="h-12 w-12 shrink-0 rounded-full object-cover"
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement
        el.style.display = 'none'
      }}
    />
  )
}

/* ------------------------------- INSIGHTS ------------------------------ */

export type InsightPost = {
  slug: string
  category: string
  title: string
  excerpt: string
  readMinutes: number
}

export function InsightsBlock({
  id = 'insights',
  eyebrow,
  h2,
  intro,
  posts,
  bg = 'light',
}: {
  id?: string
  eyebrow: string
  h2: string
  intro: string
  posts: InsightPost[]
  bg?: 'light' | 'light-tint'
}) {
  const bgCls = bg === 'light-tint' ? 'bg-[#f5f8fc]' : 'bg-[#fbfbfd]'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-28 text-[#1d1d1f] sm:py-40 md:py-48 ${bgCls}`}
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[820px]">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
              {h2}
            </h2>
            <p className="mt-9 max-w-[640px] text-[17px] leading-[1.55] text-[#3c3c43] sm:text-[19px]">
              {intro}
            </p>
          </div>
          <a
            href="/insights"
            className="group inline-flex items-center gap-2 self-start rounded-pill border border-black/[0.1] bg-white px-5 py-3 text-[13.5px] font-medium text-[#1d1d1f] transition-all hover:-translate-y-0.5 hover:border-[#0071E3]/30 hover:text-[#0071E3] hover:shadow-[0_14px_28px_-18px_rgba(0,113,227,0.35)]"
          >
            All insights
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {posts.map((p, i) => (
            <motion.li
              key={p.slug}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.06 * i } },
              }}
              className="group flex h-full flex-col"
            >
              <a
                href={`/insights/${p.slug}`}
                className="flex h-full flex-col rounded-[22px] border border-black/[0.06] bg-white p-7 shadow-[0_14px_36px_-28px_rgba(15,15,30,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071E3]/20 hover:shadow-[0_24px_56px_-30px_rgba(0,113,227,0.32)] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-pill border border-[#0071E3]/15 bg-[#eef5ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0071E3]">
                    {p.category}
                  </span>
                  <span className="text-[11px] font-medium text-[#86868b]">
                    {p.readMinutes} min read
                  </span>
                </div>
                <h3
                  className="mt-7 text-[#1d1d1f]"
                  style={{
                    fontSize: 'clamp(19px, 1.7vw, 23px)',
                    lineHeight: '1.25',
                    letterSpacing: '-0.018em',
                    fontWeight: 600,
                  }}
                >
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.55] text-[#6e6e73]">
                  {p.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0071E3] transition-colors group-hover:text-[#0077ED]">
                  Read article
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* -------------------------------- WHAT-IS ------------------------------ */

export type WhatIsItem = {
  term: string
  definition: string
}

export function WhatIsBlock({
  id = 'what-is',
  eyebrow,
  h2,
  items,
  bg = 'light',
}: {
  id?: string
  eyebrow: string
  h2: string
  items: WhatIsItem[]
  bg?: 'light' | 'light-tint'
}) {
  const bgCls = bg === 'light-tint' ? 'bg-[#f5f8fc]' : 'bg-[#fbfbfd]'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-28 text-[#1d1d1f] sm:py-40 md:py-48 ${bgCls}`}
    >
      <div className="relative mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="max-w-[1100px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-7 text-[#1d1d1f]" style={SECTION_H2_STYLE}>
            {h2}
          </h2>
        </div>

        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 md:gap-10 lg:gap-14"
        >
          {items.map((it, i) => (
            <motion.div
              key={it.term}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.06 * i } },
              }}
              className="rounded-[22px] border border-black/[0.06] bg-white p-7 shadow-[0_14px_36px_-28px_rgba(15,15,30,0.18)] sm:p-8"
            >
              <dt
                className="text-[#1d1d1f]"
                style={{
                  fontSize: 'clamp(20px, 1.85vw, 26px)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                }}
              >
                {it.term}
              </dt>
              <dd className="mt-4 text-[15.5px] leading-[1.6] text-[#3c3c43] sm:text-[17px]">
                {it.definition}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

