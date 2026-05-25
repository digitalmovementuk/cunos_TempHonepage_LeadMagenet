import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { Footer, Nav, ScrollProgress } from '../App'

// Shim exports for sibling WIP files (ManagementReport, CashflowForecast, _blocks).
// These were previously defined in the WIP version of this file; preserved here as
// minimal stubs so the WIP siblings keep compiling while they're being refactored.
export const EASE = [0.22, 1, 0.36, 1] as const
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
export const SECTION_H2_STYLE: CSSProperties = {
  fontSize: 'clamp(40px, 5.6vw, 88px)',
  lineHeight: 1.02,
  letterSpacing: '-0.035em',
  fontWeight: 700,
}
export const HUGE_H2_STYLE: CSSProperties = {
  fontSize: 'clamp(56px, 8.5vw, 156px)',
  lineHeight: 1,
  letterSpacing: '-0.04em',
  fontWeight: 700,
}
export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  const color = tone === 'dark' ? '#9fd0ff' : '#0071E3'
  return (
    <p
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color,
        margin: 0,
      }}
    >
      <span style={{ width: 40, height: 1, background: color, display: 'inline-block' }} />
      {children}
    </p>
  )
}
export function MagneticButton({ children, ...props }: { children: ReactNode; [k: string]: unknown }) {
  return <button {...(props as object)}>{children}</button>
}
export function PageProgressInternal() {
  return null
}
export function StickyCTA() {
  return null
}
export function AnimatedCounter({ value }: { value: ReactNode }) {
  return <>{value}</>
}
export function FAQItem({ q, a }: { q: ReactNode; a: ReactNode }) {
  return (
    <details>
      <summary>{q}</summary>
      <div>{a}</div>
    </details>
  )
}
export function FounderNote({ children }: { children?: ReactNode }) {
  return <div>{children}</div>
}

const SFS_CSS = `
.cunos-sfs-page{
  --canvas:#07010d;--canvas-deep:#000;--ink:#f4eefb;--muted:#b7a9c7;
  --line:rgba(255,255,255,0.12);--line-soft:rgba(255,255,255,0.06);
  --light:#fbfbfd;--light-tint:#f5f8fc;--light-ink:#1d1d1f;--light-mute:#86868b;--light-rule:rgba(0,0,0,0.08);
  --blue:#0071E3;--blue-bright:#0077ED;--blue-soft:#eef5ff;--blue-light:#9fd0ff;
  --green:#34c759;--green-soft:rgba(52,199,89,.15);
  --sans:'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-family:var(--sans);background:var(--canvas-deep);color:var(--ink);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
}
.cunos-sfs-page *,.cunos-sfs-page *::before,.cunos-sfs-page *::after{box-sizing:border-box}
.cunos-sfs-page img,.cunos-sfs-page svg{display:block;max-width:100%}
.cunos-sfs-page a{color:inherit;text-decoration:none}

.cunos-sfs-page section{padding:112px 32px;position:relative;isolation:isolate;overflow:hidden}
.cunos-sfs-page section.light{background:var(--light);color:var(--light-ink)}
.cunos-sfs-page section.light-tint{background:var(--light-tint);color:var(--light-ink)}
.cunos-sfs-page section.dark{background:var(--canvas-deep);color:var(--ink)}
.cunos-sfs-page section.dark-navy{background:#06122a;color:var(--ink)}
.cunos-sfs-page .shell{max-width:1640px;margin:0 auto;padding:0;position:relative;z-index:1}
.cunos-sfs-page .shell--narrow{max-width:1100px;margin:0 auto}

.cunos-sfs-page .eyebrow{display:flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--blue);margin-bottom:28px}
.cunos-sfs-page .eyebrow::before{content:"";width:40px;height:1px;background:var(--blue)}
.cunos-sfs-page section.dark .eyebrow,.cunos-sfs-page section.dark-navy .eyebrow{color:var(--blue-light)}
.cunos-sfs-page section.dark .eyebrow::before,.cunos-sfs-page section.dark-navy .eyebrow::before{background:var(--blue-light)}

.cunos-sfs-page h1.hero-h1{font-size:clamp(56px,9vw,156px);line-height:1.0;letter-spacing:-.045em;font-weight:700;margin:0;color:#fff}
.cunos-sfs-page .hero-h1__sub{display:block;margin-top:24px;font-size:clamp(20px,2.4vw,32px);line-height:1.2;letter-spacing:-.018em;font-weight:500;color:rgba(255,255,255,.8)}
.cunos-sfs-page h2.section-h2{font-size:clamp(40px,5.6vw,88px);line-height:1.02;letter-spacing:-.035em;font-weight:700;margin:28px 0 0;max-width:1100px}
.cunos-sfs-page h3{font-size:24px;font-weight:600;letter-spacing:-.015em;margin:0 0 14px;line-height:1.25}
.cunos-sfs-page p{margin:0 0 16px}
.cunos-sfs-page .lede{margin-top:36px;max-width:680px;font-size:19px;line-height:1.55;color:rgba(255,255,255,.72)}
.cunos-sfs-page section.light .lede,.cunos-sfs-page section.light-tint .lede{color:#3c3c43}

.cunos-sfs-page .btn{display:inline-flex;align-items:center;gap:10px;padding:16px 28px;border-radius:999px;font-size:15px;font-weight:500;transition:all .2s;cursor:pointer;border:0;font-family:inherit}
.cunos-sfs-page .btn--primary{background:var(--blue);color:#fff;box-shadow:0 18px 40px -10px rgba(0,113,227,0)}
.cunos-sfs-page .btn--primary:hover{background:var(--blue-bright);box-shadow:0 18px 40px -10px rgba(0,113,227,.55)}
.cunos-sfs-page .btn-row{display:flex;gap:16px;flex-wrap:wrap;align-items:center;margin-top:48px}

.cunos-sfs-page .hero{background:#000;padding:160px 32px 120px;min-height:80vh;display:flex;align-items:center}
.cunos-sfs-page .hero::before{content:"";position:absolute;inset:-100px;background:radial-gradient(ellipse at 50% 0%,rgba(0,113,227,.30),transparent 70%);pointer-events:none;z-index:0}
.cunos-sfs-page .hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.35) 50%,rgba(0,0,0,.9) 100%);pointer-events:none;z-index:0}
.cunos-sfs-page .hero .shell{max-width:1200px;position:relative;z-index:1}
.cunos-sfs-page .hero-eyebrow{font-size:13px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--blue-light);display:flex;align-items:center;gap:14px;margin-bottom:36px}
.cunos-sfs-page .hero-eyebrow::before{content:"";width:48px;height:1px;background:var(--blue-light);opacity:.85}
.cunos-sfs-page .hero-deck{margin-top:40px;max-width:780px;font-size:22px;line-height:1.55;color:rgba(255,255,255,.72)}
.cunos-sfs-page .hero-meta{margin-top:20px;max-width:540px;font-size:14px;line-height:1.5;color:rgba(255,255,255,.55)}

.cunos-sfs-page .stats{background:var(--canvas-deep);border-top:1px solid var(--line);padding:80px 32px}
.cunos-sfs-page .stats__grid{max-width:1640px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:48px}
.cunos-sfs-page .stat{padding-right:32px;border-right:1px solid var(--line)}
.cunos-sfs-page .stat:last-child{border-right:0}
.cunos-sfs-page .stat__value{font-size:clamp(56px,7vw,96px);font-weight:700;letter-spacing:-.04em;line-height:1;color:#fff;margin-bottom:18px}
.cunos-sfs-page .stat__value small{font-size:.45em;font-weight:500;color:var(--muted);margin-left:6px}
.cunos-sfs-page .stat__value .ongoing{font-size:.55em;font-weight:600;letter-spacing:-.025em;color:#fff}
.cunos-sfs-page .stat__label{font-size:15px;font-weight:500;color:#fff;margin-bottom:4px}
.cunos-sfs-page .stat__sub{font-size:13px;color:var(--muted)}
@media(max-width:780px){.cunos-sfs-page .stats__grid{grid-template-columns:1fr;gap:32px}.cunos-sfs-page .stat{border-right:0;border-bottom:1px solid var(--line);padding:0 0 32px 0}.cunos-sfs-page .stat:last-child{border-bottom:0;padding-bottom:0}}

.cunos-sfs-page .problem-cards{margin-top:80px;display:flex;flex-direction:column;gap:24px}
.cunos-sfs-page .problem-card{background:linear-gradient(135deg,#06122a 0%,#0a1a3a 100%);border-radius:28px;padding:64px 56px;color:#fff;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08)}
.cunos-sfs-page .problem-card::before{content:"";position:absolute;inset:0;background:radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:24px 24px;opacity:.6}
.cunos-sfs-page .problem-card__num{font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--blue-light);margin-bottom:18px;position:relative}
.cunos-sfs-page .problem-card__symptom{font-size:clamp(32px,5vw,64px);line-height:1.05;letter-spacing:-.035em;font-weight:700;margin:0 0 24px;color:#fff;max-width:14ch;position:relative}
.cunos-sfs-page .problem-card__meaning{font-size:18px;color:rgba(255,255,255,.72);max-width:42ch;margin:0;position:relative;line-height:1.5}
@media(max-width:780px){.cunos-sfs-page .problem-card{padding:40px 28px}}

.cunos-sfs-page .signs-list{margin-top:72px;display:grid;grid-template-columns:1fr 1fr;gap:24px 48px;list-style:none;padding:0}
.cunos-sfs-page .signs-list li{padding-left:36px;font-size:16px;line-height:1.55;position:relative;color:var(--light-ink)}
.cunos-sfs-page .signs-list li .num{position:absolute;left:0;top:4px;width:24px;height:24px;background:var(--blue-soft);color:var(--blue);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:600;font-size:11px}
@media(max-width:780px){.cunos-sfs-page .signs-list{grid-template-columns:1fr;gap:18px}}

.cunos-sfs-page .what-is__h1{font-size:clamp(56px,8.5vw,156px);line-height:1.0;letter-spacing:-.04em;font-weight:700;margin:24px 0 0;color:var(--light-ink)}
.cunos-sfs-page .what-is__h1 .mute{color:#a1a1a6}
.cunos-sfs-page .what-is__body{margin-top:48px;max-width:760px;font-size:21px;line-height:1.55;color:#3c3c43}

.cunos-sfs-page .solution-grid{margin-top:80px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.cunos-sfs-page .solution-card{background:#fff;border:1px solid var(--light-rule);border-radius:24px;padding:40px;transition:transform .3s ease,box-shadow .3s ease}
.cunos-sfs-page .solution-card:hover{transform:translateY(-4px);box-shadow:0 30px 60px -30px rgba(15,15,30,.18)}
.cunos-sfs-page .solution-card__icon{width:48px;height:48px;border-radius:14px;background:var(--blue-soft);display:flex;align-items:center;justify-content:center;margin-bottom:24px;color:var(--blue)}
.cunos-sfs-page .solution-card__icon svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.8;fill:none}
.cunos-sfs-page .solution-card h3{font-size:22px;font-weight:600;color:var(--light-ink);margin:0 0 12px;letter-spacing:-.015em}
.cunos-sfs-page .solution-card p{font-size:15px;color:#3c3c43;line-height:1.6;margin:0}
@media(max-width:980px){.cunos-sfs-page .solution-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.cunos-sfs-page .solution-grid{grid-template-columns:1fr}}

.cunos-sfs-page .compare{margin-top:80px;overflow:hidden;border-radius:24px;border:1px solid var(--light-rule);background:#fff;box-shadow:0 18px 44px -32px rgba(15,15,30,.18)}
.cunos-sfs-page .compare table{width:100%;border-collapse:collapse;text-align:left}
.cunos-sfs-page .compare thead th{padding:24px 24px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--light-mute);border-bottom:1px solid var(--light-rule);background:#fff;vertical-align:top}
.cunos-sfs-page .compare thead th.feat{width:24%}
.cunos-sfs-page .compare thead th.col-highlight{background:var(--blue-soft);color:var(--blue)}
.cunos-sfs-page .compare tbody td{padding:20px 24px;font-size:14px;border-bottom:1px solid var(--light-rule);vertical-align:top;color:#3c3c43;line-height:1.5}
.cunos-sfs-page .compare tbody td.feat{font-weight:500;color:var(--light-ink)}
.cunos-sfs-page .compare tbody tr:nth-child(odd){background:#fbfbfd}
.cunos-sfs-page .compare tbody tr:last-child td{border-bottom:0}
.cunos-sfs-page .compare td.col-highlight{background:var(--blue-soft);font-weight:500;color:var(--blue)}
.cunos-sfs-page .compare .pos{display:inline-flex;align-items:center;gap:8px}
.cunos-sfs-page .compare .pos::before{content:"\\2713";width:18px;height:18px;background:var(--green-soft);color:var(--green);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
.cunos-sfs-page .compare .neg{display:inline-flex;align-items:center;gap:8px;color:var(--light-mute)}
.cunos-sfs-page .compare .neg::before{content:"\\2212";width:18px;height:18px;background:rgba(0,0,0,.06);color:var(--light-mute);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0}
@media(max-width:780px){.cunos-sfs-page .compare{font-size:13px}.cunos-sfs-page .compare thead th,.cunos-sfs-page .compare tbody td{padding:14px 12px}}

.cunos-sfs-page .deliverable{display:grid;grid-template-columns:1fr 1fr;gap:64px;margin-top:80px;align-items:center}
.cunos-sfs-page .deliverable-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:20px}
.cunos-sfs-page .deliverable-list li{display:flex;align-items:flex-start;gap:18px;padding:20px;background:#fff;border:1px solid var(--light-rule);border-radius:16px}
.cunos-sfs-page .deliverable-list .ico{width:36px;height:36px;flex-shrink:0;border-radius:10px;background:var(--blue-soft);display:flex;align-items:center;justify-content:center;color:var(--blue);font-weight:700;font-size:14px}
.cunos-sfs-page .deliverable-list .txt{font-size:15.5px;color:var(--light-ink);font-weight:500;line-height:1.45}
.cunos-sfs-page .deliverable-visual{background:linear-gradient(135deg,#06122a 0%,#0a1a3a 100%);border-radius:24px;padding:36px;color:#fff}
.cunos-sfs-page .deliverable-visual__head{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-light);margin-bottom:24px}
.cunos-sfs-page .flow-row{padding:20px 0;border-bottom:1px solid rgba(255,255,255,.1)}
.cunos-sfs-page .flow-row:last-child{border-bottom:0}
.cunos-sfs-page .flow-row__name{font-size:14px;font-weight:600;color:#fff;margin-bottom:10px;display:flex;align-items:center;gap:10px;letter-spacing:.01em}
.cunos-sfs-page .flow-row__name .dot{width:8px;height:8px;border-radius:50%;background:var(--blue-light);flex-shrink:0}
.cunos-sfs-page .flow-row__steps{display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:rgba(255,255,255,.75);font-size:13.5px;padding-left:18px}
.cunos-sfs-page .flow-row__steps .arrow{color:var(--blue-light);font-weight:700;opacity:.7}
@media(max-width:980px){.cunos-sfs-page .deliverable{grid-template-columns:1fr;gap:40px}}

.cunos-sfs-page .pull-quote{padding:140px 32px}
.cunos-sfs-page .pull-quote__text{font-size:clamp(32px,4.5vw,64px);line-height:1.15;letter-spacing:-.025em;font-weight:600;color:#fff;max-width:1100px;margin:0 auto}
.cunos-sfs-page .pull-quote__text::before{content:"\\201C";color:var(--blue-light);font-size:1em;margin-right:.1em}
.cunos-sfs-page .pull-quote__text::after{content:"\\201D";color:var(--blue-light);font-size:1em}

.cunos-sfs-page .founder{display:grid;grid-template-columns:1fr 2fr;gap:64px;margin-top:64px;align-items:start}
.cunos-sfs-page .founder-photo{aspect-ratio:1;background:linear-gradient(135deg,#06122a,#1a2f5a);border-radius:24px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:64px;font-weight:700;letter-spacing:-.02em}
.cunos-sfs-page .founder-text{font-size:21px;line-height:1.55;color:var(--light-ink);font-weight:400}
.cunos-sfs-page .founder-text strong{font-weight:600}
.cunos-sfs-page .founder-text p{margin:0 0 20px}
.cunos-sfs-page .founder-text .sig{display:block;margin-top:32px;font-size:15px;color:var(--light-mute);font-weight:500}
@media(max-width:780px){.cunos-sfs-page .founder{grid-template-columns:1fr;gap:32px}}

.cunos-sfs-page .testimonials-grid{margin-top:80px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.cunos-sfs-page .testi{background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:24px;padding:40px;display:flex;flex-direction:column}
.cunos-sfs-page .testi__quote{font-size:18px;line-height:1.55;color:rgba(255,255,255,.92);margin:0 0 28px;flex-grow:1}
.cunos-sfs-page .testi__author{display:flex;align-items:center;gap:14px;padding-top:24px;border-top:1px solid var(--line)}
.cunos-sfs-page .testi__avatar{width:44px;height:44px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0}
.cunos-sfs-page .testi__meta strong{display:block;color:#fff;font-weight:600;font-size:15px}
.cunos-sfs-page .testi__meta span{font-size:13px;color:var(--muted)}
@media(max-width:980px){.cunos-sfs-page .testimonials-grid{grid-template-columns:1fr}}

.cunos-sfs-page .who-grid{margin-top:80px;display:grid;grid-template-columns:repeat(2,1fr);gap:48px}
.cunos-sfs-page .who-col h3{font-size:18px;font-weight:600;color:var(--light-mute);text-transform:uppercase;letter-spacing:.12em;margin:0 0 24px;padding-bottom:16px;border-bottom:1px solid var(--light-rule)}
.cunos-sfs-page .who-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:18px}
.cunos-sfs-page .who-list li{font-size:17px;line-height:1.5;color:var(--light-ink);padding-left:32px;position:relative}
.cunos-sfs-page .who-col--have li::before{content:"";position:absolute;left:0;top:8px;width:18px;height:18px;border-radius:50%;background:rgba(0,0,0,.08)}
.cunos-sfs-page .who-col--need li::before{content:"";position:absolute;left:0;top:8px;width:18px;height:18px;border-radius:50%;background:var(--blue);box-shadow:0 0 0 4px rgba(0,113,227,.15)}
@media(max-width:780px){.cunos-sfs-page .who-grid{grid-template-columns:1fr;gap:32px}}

.cunos-sfs-page .industries-grid{margin-top:80px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.cunos-sfs-page .industry{background:#fff;border:1px solid var(--light-rule);border-radius:20px;padding:36px 28px;text-align:left;transition:transform .25s,box-shadow .25s}
.cunos-sfs-page .industry:hover{transform:translateY(-4px);box-shadow:0 18px 44px -32px rgba(15,15,30,.2)}
.cunos-sfs-page .industry h3{font-size:18px;font-weight:600;color:var(--light-ink);margin:0 0 12px}
.cunos-sfs-page .industry p{font-size:14px;color:#3c3c43;line-height:1.5;margin:0}
@media(max-width:980px){.cunos-sfs-page .industries-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.cunos-sfs-page .industries-grid{grid-template-columns:1fr}}

.cunos-sfs-page .steps{margin-top:80px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;position:relative}
.cunos-sfs-page .step{background:#fff;border:1px solid var(--light-rule);border-radius:22px;padding:36px 28px}
.cunos-sfs-page .step__num{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);margin-bottom:14px}
.cunos-sfs-page .step h3{font-size:19px;font-weight:600;color:var(--light-ink);margin:0 0 12px;line-height:1.25}
.cunos-sfs-page .step p{font-size:14.5px;line-height:1.55;color:#3c3c43;margin:0}
@media(max-width:980px){.cunos-sfs-page .steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:580px){.cunos-sfs-page .steps{grid-template-columns:1fr}}

.cunos-sfs-page .engagement-rows{margin-top:64px;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:24px;padding:8px 32px;backdrop-filter:blur(8px)}
.cunos-sfs-page .eng-row{display:flex;justify-content:space-between;align-items:center;padding:24px 0;border-bottom:1px solid var(--line)}
.cunos-sfs-page .eng-row:last-child{border-bottom:0}
.cunos-sfs-page .eng-row__label{font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.cunos-sfs-page .eng-row__value{font-size:19px;font-weight:500;color:#fff;text-align:right}
@media(max-width:580px){.cunos-sfs-page .eng-row{flex-direction:column;align-items:flex-start;gap:6px}.cunos-sfs-page .eng-row__value{text-align:left;font-size:17px}}

.cunos-sfs-page .case{margin-top:64px;padding:56px;background:linear-gradient(135deg,#06122a 0%,#0a1a3a 100%);border-radius:32px;color:#fff;position:relative;overflow:hidden}
.cunos-sfs-page .case::before{content:"";position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(0,113,227,.25),transparent 70%);pointer-events:none}
.cunos-sfs-page .case__quote{font-size:clamp(22px,2.6vw,32px);line-height:1.35;letter-spacing:-.015em;color:#fff;font-weight:500;margin:0 0 48px;max-width:880px;position:relative}
.cunos-sfs-page .case__author{display:flex;align-items:center;gap:16px;margin-bottom:40px;position:relative}
.cunos-sfs-page .case__avatar{width:48px;height:48px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:15px;flex-shrink:0}
.cunos-sfs-page .case__author strong{display:block;font-size:16px;color:#fff;font-weight:600}
.cunos-sfs-page .case__author span{font-size:13px;color:var(--muted)}
.cunos-sfs-page .case__metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;padding-top:40px;border-top:1px solid rgba(255,255,255,.15);position:relative}
.cunos-sfs-page .case__metric-val{font-size:clamp(28px,3vw,44px);font-weight:700;letter-spacing:-.025em;color:#fff;line-height:1;margin-bottom:8px}
.cunos-sfs-page .case__metric-label{font-size:13.5px;color:var(--muted)}
@media(max-width:780px){.cunos-sfs-page .case{padding:36px 28px}.cunos-sfs-page .case__metrics{grid-template-columns:1fr;gap:24px}}

.cunos-sfs-page .insights-grid{margin-top:64px;display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.cunos-sfs-page .insight{background:#fff;border:1px solid var(--light-rule);border-radius:20px;padding:32px;transition:transform .25s,box-shadow .25s;display:block}
.cunos-sfs-page .insight:hover{transform:translateY(-2px);box-shadow:0 18px 40px -28px rgba(15,15,30,.2)}
.cunos-sfs-page .insight__kicker{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);margin-bottom:12px}
.cunos-sfs-page .insight h3{font-size:20px;font-weight:600;color:var(--light-ink);margin:0;line-height:1.3}
@media(max-width:780px){.cunos-sfs-page .insights-grid{grid-template-columns:1fr}}

.cunos-sfs-page .faq-list{margin-top:64px;display:flex;flex-direction:column;gap:14px;max-width:980px}
.cunos-sfs-page .faq-item{background:#fff;border:1px solid var(--light-rule);border-radius:18px;overflow:hidden;transition:border-color .2s}
.cunos-sfs-page .faq-item[open]{border-color:var(--blue)}
.cunos-sfs-page .faq-item summary{padding:28px 32px;cursor:pointer;font-size:18px;font-weight:600;color:var(--light-ink);display:flex;align-items:center;justify-content:space-between;gap:20px;list-style:none}
.cunos-sfs-page .faq-item summary::-webkit-details-marker{display:none}
.cunos-sfs-page .faq-item summary::after{content:"+";font-size:28px;color:var(--blue);transition:transform .2s;flex-shrink:0;line-height:1;font-weight:400}
.cunos-sfs-page .faq-item[open] summary::after{content:"\\2212"}
.cunos-sfs-page .faq-item__answer{padding:0 32px 28px;font-size:16px;line-height:1.65;color:#3c3c43;max-width:760px}

.cunos-sfs-page .final{background:#000;padding:140px 32px;text-align:center;position:relative}
.cunos-sfs-page .final::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(0,113,227,.22),transparent 60%);pointer-events:none}
.cunos-sfs-page .final h2{font-size:clamp(40px,6vw,96px);line-height:1.0;letter-spacing:-.04em;font-weight:700;color:#fff;max-width:18ch;margin:0 auto 32px;position:relative}
.cunos-sfs-page .final__sub{font-size:20px;color:rgba(255,255,255,.75);max-width:50ch;margin:0 auto 48px;line-height:1.55;position:relative}
.cunos-sfs-page .final__email{margin-top:32px;font-size:14px;color:var(--muted);position:relative}
.cunos-sfs-page .final__email a{color:var(--blue-light)}

@media(max-width:780px){
  .cunos-sfs-page section{padding:80px 20px}
  .cunos-sfs-page .stats{padding:56px 20px}
  .cunos-sfs-page .hero{padding:140px 20px 90px}
}
`

type FlowArea = { name: string; steps: string[] }
const FLOW_AREAS: FlowArea[] = [
  { name: 'Process flows', steps: ['Current', 'review', 'improvements'] },
  { name: 'Controls', steps: ['Approvals', 'checks', 'ownership'] },
  { name: 'Information quality', steps: ['Clean', 'clear', 'reliable'] },
  { name: 'Scalability', steps: ['Future', 'automation'] },
]

const SOLUTION_CARDS: Array<{ title: string; body: string; svg: ReactNode }> = [
  {
    title: 'Creditors Review',
    body: 'Get invoices out on time, in the right format, with the right cadence. Reduce debtor days. Free up working capital.',
    svg: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    title: 'Payables Review',
    body: "A structured payment run, approvals where they're needed, no surprise outflows. Suppliers paid on terms, not on chase.",
    svg: (
      <svg viewBox="0 0 24 24">
        <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
        <path d="M1 10h22" />
      </svg>
    ),
  },
  {
    title: 'Month-end reporting',
    body: 'A clean monthly close. Financial information that becomes usable for reporting and decision making.',
    svg: (
      <svg viewBox="0 0 24 24">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
      </svg>
    ),
  },
  {
    title: 'Finance controls',
    body: 'Approval thresholds, segregation of duties, audit trail. The boring layer that prevents the expensive mistakes.',
    svg: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Cash visibility',
    body: 'Helping you understand what is coming in, what is going out, and what needs attention.',
    svg: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Process structure',
    body: "Repeatable routines documented so finance doesn't depend on one person. The business carries less risk; the team carries less load.",
    svg: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

const SIGNS = [
  'Month-end close takes weeks, and reports land after decisions are needed.',
  'You catch errors and unusual numbers yourself, after the fact, rather than the system flagging them.',
  'Different teams are running off different numbers — sales, ops, and finance never quite line up.',
  "Finance lives in one person's head. If they were unavailable, the business would stall within days.",
  "You're spending nights on spreadsheets that should have been automated routines a year ago.",
  "Cash decisions are made on instinct because the forecast isn't trusted — or doesn't exist.",
]

const INDUSTRIES = [
  { name: 'SaaS', body: 'ARR vs revenue, deferred income, runway under different acquisition assumptions. The metrics investors expect.' },
  { name: 'Digital agencies', body: 'Utilisation, project margin, WIP/recoverability. The unglamorous numbers that decide whether you grow profitably.' },
  { name: 'Professional services', body: 'Realisation rates, partner economics, retainer vs project mix. Built around the partner-led P&L.' },
  { name: 'E-commerce', body: 'Contribution margin, marketing payback, channel mix. The numbers that decide your next paid-acquisition decision.' },
]

const STEPS = [
  { num: 'Step 01 · Week 1', title: 'Review the current setup', body: 'A short call and read-only system review to understand how finance currently works before we recommend changes.' },
  { num: 'Step 02 · Week 2', title: 'Identify what is stretched', body: 'We highlight what is working, what needs attention, and where better structure would have the most impact.' },
  { num: 'Step 03 · Month 1', title: 'Create a cleaner month-end close', body: 'We improve the month-end routine, tighten key controls, and make the numbers easier to trust.' },
  { num: 'Step 04 · Monthly', title: 'Keep the finance function on track', body: 'We review progress, make improvements, and keep the finance setup aligned as the business grows.' },
]

const TESTIMONIALS = [
  { quote: "For the first time in three years, I'm not the person closing the month. Enting and the team run the cadence; I read the pack and we decide what to do. Worth every penny.", avatar: 'SC', name: 'Sarah Chen', meta: 'Founder · SaaS · £4m ARR' },
  { quote: "We had three different versions of the P&L floating around the leadership team. Cunos rebuilt it as one pack, in one format, and now there's nothing to argue about. We argue about decisions instead.", avatar: 'JW', name: 'James Walker', meta: 'CEO · Digital agency · 42 staff' },
  { quote: "The 13-week forecast caught a cash dip we'd have walked straight into. We had eight weeks to react instead of two days. That alone paid for the year.", avatar: 'PP', name: 'Priya Patel', meta: 'Founder · Professional services · UK + EU' },
]

const INSIGHTS = [
  { mins: '8 min', title: 'Bookkeeper vs accountant vs Finance Director — the £1m–£10m playbook' },
  { mins: '6 min', title: 'When to hire a full-time Finance Director vs. outsource senior finance' },
  { mins: '7 min', title: 'The 7 KPIs every founder-led business should track monthly' },
  { mins: '5 min', title: 'How to close the month in 5 days (without hiring anyone)' },
]

const FAQS = [
  { q: 'How is this different from a bookkeeper or accountant?', a: 'A bookkeeper records the numbers. An accountant files them. Senior Finance Support sits at the layer above — making sure the numbers are reviewed, decisions are informed by them, and the finance function is structured to scale with the business.', open: true },
  { q: "What's the time commitment from me as a founder?", a: 'Roughly one focused session per month, plus the occasional decision call. The point of Senior Finance Support is to take finance management off the founder, not to add another standing meeting.' },
  { q: 'Do you work with my existing accountant and tools?', a: 'Yes — we work alongside whoever you already have in place. We typically plug into Xero, QuickBooks, NetSuite, or whatever you run on. We do not replace your accountant; we strengthen the layer between them and you.' },
  { q: 'What size of business is this for?', a: 'Founder-led businesses doing roughly £1m to £25m in revenue, where finance has outgrown basic bookkeeping but a full-time Finance Director is either too expensive or too soon.' },
  { q: 'Is there a minimum commitment?', a: 'No long lock-in. The retained advisory engagement runs month to month after the first review. We aim to make the value obvious; if it stops being obvious, you can stop.' },
  { q: 'How is pricing structured?', a: 'Scope-based. We agree on what is in and out of scope during the initial review, then a fixed monthly fee that reflects the cadence you need. No hourly billing, no surprises.' },
  { q: 'How long does it take to feel the impact?', a: 'Month one is mostly diagnostic and structural — rebuilding the reporting layer, plugging into your stack, and tightening the close. Most clients describe a "before and after" moment around month two or three, when the monthly pack becomes the spine of how the leadership team runs the business.' },
  { q: 'Will my team still own the day-to-day finance work?', a: 'Yes. Senior Finance Support is an oversight + advisory layer, not a replacement for your bookkeeper or finance admin. Your team keeps doing what they do — we make sure the structure, controls, and reporting around them are designed to scale.' },
  { q: 'Do you sign an NDA before the first review?', a: 'Yes — standard practice. We sign a mutual NDA before any data is shared. The first review is confidential, and there is no obligation to engage further afterwards.' },
]

export default function SeniorFinanceSupport() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const previous = document.title
    document.title = 'Senior Finance Support for Founder-Led Businesses | Cunos Consulting London'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="cunos-sfs-page relative min-h-screen w-full">
      <style dangerouslySetInnerHTML={{ __html: SFS_CSS }} />
      <ScrollProgress />
      <Nav />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="shell">
          <p className="hero-eyebrow">For UK founder-led businesses</p>
          <h1 className="hero-h1">
            Full <span style={{ color: 'rgba(255,255,255,.55)' }}>Financial Control.</span>
            <span className="hero-h1__sub">
              Senior Finance Support for founder-led businesses across the UK.
            </span>
          </h1>
          <p className="hero-deck">
            Experienced UK finance oversight for founder-led businesses — without the cost or
            commitment of hiring a full-time Finance Director.
          </p>
          <div className="btn-row">
            <a href="#review" className="btn btn--primary">
              Book your finance review →
            </a>
          </div>
          <p className="hero-meta">
            A short conversation about what's working, what's stretched, and where better support
            could help.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats__grid">
          <div className="stat">
            <div className="stat__value">
              4<small>areas</small>
            </div>
            <p className="stat__label">Finance function review</p>
            <p className="stat__sub">Processes, controls, numbers and visibility</p>
          </div>
          <div className="stat">
            <div className="stat__value">
              1<small>month</small>
            </div>
            <p className="stat__label">Cleaner month-end close</p>
            <p className="stat__sub">Improve the routine behind the numbers</p>
          </div>
          <div className="stat">
            <div className="stat__value">
              <span className="ongoing">Ongoing</span>
            </div>
            <p className="stat__label">Keeping your business on track</p>
            <p className="stat__sub">Support that scales as your business grows</p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="light" id="problem">
        <div className="shell">
          <p className="eyebrow">The problem</p>
          <h2 className="section-h2">Your business has grown. Your finance setup needs to catch up.</h2>
          <p className="lede">
            As your business grows, finance gets harder to manage with the same setup. Shifts happen
            before founders notice.
          </p>
          <div className="problem-cards">
            {[
              { num: '01', symptom: 'Invoices go out late.', meaning: 'Cash is not coming in as quickly as it should.' },
              { num: '02', symptom: 'Payments become reactive.', meaning: 'There is not enough control over cash going out.' },
              { num: '03', symptom: 'Reports take longer to prepare.', meaning: 'Month-end is not giving you the clarity you need.' },
              { num: '04', symptom: 'Finance becomes a bottleneck.', meaning: 'Decisions slow down. Risk goes up. The business carries it.' },
            ].map((p) => (
              <div key={p.num} className="problem-card">
                <p className="problem-card__num">{p.num}</p>
                <h3 className="problem-card__symptom">{p.symptom}</h3>
                <p className="problem-card__meaning">{p.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNS */}
      <section className="light-tint" id="signs">
        <div className="shell shell--narrow">
          <p className="eyebrow">You've outgrown your current setup if…</p>
          <h2 className="section-h2">Six signs the finance layer needs an upgrade.</h2>
          <p className="lede">
            If three or more of these are familiar, your finance setup is being held together by
            founder time and luck.
          </p>
          <ul className="signs-list">
            {SIGNS.map((sign, i) => (
              <li key={i}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                {sign}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT IS / SOLUTION */}
      <section className="light" id="solution">
        <div className="shell">
          <p className="eyebrow">In plain terms</p>
          <h2 className="what-is__h1">
            Finance, <span className="mute">made easier to manage.</span>
          </h2>
          <p className="what-is__body">
            Senior Finance Support means an experienced finance professional sits inside your
            business — on retainer, not on payroll. Reviewing your numbers, tightening the controls,
            owning the cadence. The hands-on accountant or bookkeeper stays in place. We sit one
            layer up, making sure the work happens, the numbers are trusted, and the founder gets
            time back.
          </p>

          <p className="eyebrow" style={{ marginTop: 96 }}>What we cover</p>
          <h2 className="section-h2">Multiple areas. One steady cadence.</h2>

          <div className="solution-grid">
            {SOLUTION_CARDS.map((card) => (
              <div key={card.title} className="solution-card">
                <div className="solution-card__icon">{card.svg}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="light-tint" id="comparison">
        <div className="shell">
          <p className="eyebrow">Compare options</p>
          <h2 className="section-h2">
            Bookkeeper, accountant, FD — where Senior Finance Support sits.
          </h2>
          <p className="lede">
            Four roles. Different jobs. Most growing businesses confuse the gap between accountant
            and full-time Finance Director. Senior Finance Support fills it.
          </p>
          <div className="compare">
            <table>
              <thead>
                <tr>
                  <th className="feat">Feature</th>
                  <th>Bookkeeper</th>
                  <th>Accountant</th>
                  <th className="col-highlight">Senior Finance Support</th>
                  <th>Full-time Finance Director</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feat">Day-to-day finance ops</td>
                  <td><span className="pos">Yes — primary role</span></td>
                  <td><span className="neg">Reviews only</span></td>
                  <td className="col-highlight"><span className="pos">Strengthens + structures</span></td>
                  <td><span className="pos">Yes — oversees</span></td>
                </tr>
                <tr>
                  <td className="feat">Statutory + tax filings</td>
                  <td><span className="neg">Often not</span></td>
                  <td><span className="pos">Yes — primary role</span></td>
                  <td className="col-highlight"><span className="pos">Coordinates with accountant</span></td>
                  <td><span className="pos">Yes — oversees</span></td>
                </tr>
                <tr>
                  <td className="feat">Forward-looking advice</td>
                  <td><span className="neg">No</span></td>
                  <td><span className="neg">Occasional</span></td>
                  <td className="col-highlight"><span className="pos">Yes — core role</span></td>
                  <td><span className="pos">Yes — core role</span></td>
                </tr>
                <tr>
                  <td className="feat">Strategic + board input</td>
                  <td><span className="neg">No</span></td>
                  <td><span className="neg">Limited</span></td>
                  <td className="col-highlight"><span className="pos">Yes — monthly cadence</span></td>
                  <td><span className="pos">Yes — daily</span></td>
                </tr>
                <tr>
                  <td className="feat">Cost (typical UK)</td>
                  <td>£500–£2k / mo</td>
                  <td>£3k–£10k / yr</td>
                  <td className="col-highlight">Scope-based monthly</td>
                  <td>£90k–£140k / yr + bonus / equity</td>
                </tr>
                <tr>
                  <td className="feat">Best fit</td>
                  <td>Early stage</td>
                  <td>Every business needs one</td>
                  <td className="col-highlight"><span className="pos">£1m–£20m founder-led</span></td>
                  <td>£25m+ / pre-IPO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DELIVERABLE */}
      <section className="light" id="deliverable">
        <div className="shell">
          <p className="eyebrow">The deliverable</p>
          <h2 className="section-h2">What improves inside your finance function.</h2>
          <p className="lede">
            Senior Finance Support strengthens the finance function behind your reporting,
            forecasting and financial decision making.
          </p>
          <div className="deliverable">
            <ul className="deliverable-list">
              <li><span className="ico">01</span><span className="txt">Finance performance review</span></li>
              <li><span className="ico">02</span><span className="txt">Internal control improvements</span></li>
              <li><span className="ico">03</span><span className="txt">Cleaner financial information</span></li>
              <li><span className="ico">04</span><span className="txt">Scalable finance structure</span></li>
            </ul>
            <div className="deliverable-visual">
              <p className="deliverable-visual__head">Finance function review · process flow</p>
              {FLOW_AREAS.map((area) => (
                <div key={area.name} className="flow-row">
                  <div className="flow-row__name">
                    <span className="dot" />
                    {area.name}
                  </div>
                  <div className="flow-row__steps">
                    {area.steps.map((step, i) => (
                      <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        {step}
                        {i < area.steps.length - 1 && <span className="arrow">›</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="dark" id="voice">
        <div className="pull-quote">
          <p className="pull-quote__text">
            Finance you can stop carrying. Numbers you can act on. A monthly rhythm that takes the
            founder out of finance — without taking finance out of the founder's view.
          </p>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="light" id="founder">
        <div className="shell">
          <p className="eyebrow">Senior advisor</p>
          <h2 className="section-h2">Why I built Cunos.</h2>
          <div className="founder">
            <div className="founder-photo">EM</div>
            <div className="founder-text">
              <p>
                I have spent over a decade working across finance functions in private equity,
                private and public businesses, founder-led companies, and MNCs across APAC. What I
                kept seeing was that growing businesses do not always need more finance admin. They
                need better finance structure.
              </p>
              <p>
                Founders are often very strong at what they do, but the finance function can become
                reactive, manual, or unclear as the business grows.
              </p>
              <p>
                <strong>Cunos exists to help at this stage.</strong> We provide senior finance
                support on a retainer basis, sitting alongside your accountant and bookkeeper to
                make the numbers more reliable, the processes stronger, and the finance function
                easier to scale.
              </p>
              <span className="sig">— Enting Man · Founder, Cunos Consulting</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="dark-navy" id="testimonials">
        <div className="shell">
          <p className="eyebrow">What clients say</p>
          <h2 className="section-h2">Founder-led businesses, monthly cadence.</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testi">
                <p className="testi__quote">{t.quote}</p>
                <div className="testi__author">
                  <div className="testi__avatar">{t.avatar}</div>
                  <div className="testi__meta">
                    <strong>{t.name}</strong>
                    <span>{t.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO FOR */}
      <section className="light" id="who">
        <div className="shell shell--narrow">
          <p className="eyebrow">Who this is for</p>
          <h2 className="section-h2">If this sounds like you, the fit is good.</h2>
          <div className="who-grid">
            <div className="who-col who-col--have">
              <h3>You have</h3>
              <ul className="who-list">
                <li>A founder-led business doing <strong>£1m–£25m in revenue</strong>.</li>
                <li>An accountant or bookkeeper already in place.</li>
                <li>Growth that's outpaced the finance setup.</li>
                <li>A leadership team that needs better numbers.</li>
              </ul>
            </div>
            <div className="who-col who-col--need">
              <h3>You need</h3>
              <ul className="who-list">
                <li>Senior finance oversight without hiring a full-time FD.</li>
                <li>A monthly cadence the leadership team can rely on.</li>
                <li>Financial information you can use to make real decisions.</li>
                <li>Finance to stop being a bottleneck in the business.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="light-tint" id="industries">
        <div className="shell">
          <p className="eyebrow">By industry</p>
          <h2 className="section-h2">Where we work most.</h2>
          <p className="lede">
            Sector-specific dynamics shape the numbers. Here's where we've built the most
            pattern-recognition.
          </p>
          <div className="industries-grid">
            {INDUSTRIES.map((i) => (
              <div key={i.name} className="industry">
                <h3>{i.name}</h3>
                <p>{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="light" id="how">
        <div className="shell">
          <p className="eyebrow">How we work</p>
          <h2 className="section-h2">Four steps from first call to monthly cadence.</h2>
          <div className="steps">
            {STEPS.map((s) => (
              <div key={s.num} className="step">
                <p className="step__num">{s.num}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="dark-navy" id="engagement">
        <div className="shell shell--narrow">
          <p className="eyebrow">Engagement</p>
          <h2 className="section-h2">How it's structured.</h2>
          <div className="engagement-rows">
            <div className="eng-row">
              <span className="eng-row__label">Cadence</span>
              <span className="eng-row__value">Monthly retained</span>
            </div>
            <div className="eng-row">
              <span className="eng-row__label">Commitment</span>
              <span className="eng-row__value">Rolling · no lock-in</span>
            </div>
            <div className="eng-row">
              <span className="eng-row__label">Pricing</span>
              <span className="eng-row__value">Scope-based — shared after the review</span>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="light" id="case-study">
        <div className="shell">
          <p className="eyebrow">Case study</p>
          <h2 className="section-h2">From Sunday-night spreadsheets to first-of-the-month clarity.</h2>
          <div className="case">
            <p className="case__quote">
              "I used to spend my Sundays in spreadsheets. Now I read a five-page pack on the first
              of every month and we just… know what to do."
            </p>
            <div className="case__author">
              <div className="case__avatar">SC</div>
              <div>
                <strong>Sarah Chen</strong>
                <span>Founder · SaaS · £4m ARR</span>
              </div>
            </div>
            <div className="case__metrics">
              <div>
                <div className="case__metric-val">21d → 5d</div>
                <p className="case__metric-label">Time to month-end pack</p>
              </div>
              <div>
                <div className="case__metric-val">+£1.2m</div>
                <p className="case__metric-label">Forward revenue secured</p>
              </div>
              <div>
                <div className="case__metric-val">0 hires</div>
                <p className="case__metric-label">In finance team headcount</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="light-tint" id="insights">
        <div className="shell">
          <p className="eyebrow">Insights</p>
          <h2 className="section-h2">Notes from the founder finance frontline.</h2>
          <div className="insights-grid">
            {INSIGHTS.map((i) => (
              <a key={i.title} href="#" className="insight">
                <p className="insight__kicker">Reading · {i.mins}</p>
                <h3>{i.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="light" id="faq">
        <div className="shell">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-h2">Questions founders ask before booking.</h2>
          <div className="faq-list">
            {FAQS.map((f) => (
              <details key={f.q} className="faq-item" open={f.open}>
                <summary>{f.q}</summary>
                <div className="faq-item__answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="review">
        <div className="shell">
          <h2>Get clear on what finance needs next.</h2>
          <p className="final__sub">
            Book a 30-minute finance review. We'll look at how finance works today, identify the
            areas to strengthen, and discuss how we could work together to create more financial
            clarity.
          </p>
          <a
            href="mailto:office@cunos.co.uk?subject=Senior%20Finance%20Support%20%E2%80%94%20Booking%20Request"
            className="btn btn--primary"
          >
            Book your finance review →
          </a>
          <p className="final__email">
            Or email directly:{' '}
            <a href="mailto:office@cunos.co.uk">office@cunos.co.uk</a> ·{' '}
            <a href="tel:+447520654301">+44 7520 654 301</a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
