# Client copy update — Senior Finance Support page

**Source:** PDF dated 25.05.2026, pasted into chat 2026-05-21.

## Inline edit instructions applied

Throughout the source HTML, the client embedded notes between `**...**` markers indicating changes to apply:

1. **Hero CTA typo** — "Book yout finance review" → "Book your finance review"
2. **Hero meta placement** — `<p class="hero-meta">…</p>` had a `<b>** move this below the CTA**</b>` instruction → moved to its own block below the CTA button row
3. **Deliverable visual block** — the placeholder financial sample (Revenue £284k, Gross margin 62.4%, Runway 11.4mo, Cash on hand £612k) needs to be replaced with a process-flow visual covering 4 areas:
   - Process flows: Current → review → improvements
   - Controls: Approvals → checks → ownership
   - Information quality: Clean, clear, reliable
   - Scalability: Future automation

## Structural cleanups also applied

- Stripped HTML editor artifacts (empty `<p>` tags, `class="p1"` from Apple Pages export)
- Removed the bespoke top nav and bottom footer from the HTML — uses the project's shared `<Nav />` and `<Footer />` for site-wide consistency
- Removed the EDIT TOOLBAR and edit-mode CSS (not needed in production)
- Scoped the inline CSS to a `.cunos-sfs-page` root class so the styles don't leak to other routes
- Set document title via React effect to: "Senior Finance Support for Founder-Led Businesses | Cunos Consulting London"
