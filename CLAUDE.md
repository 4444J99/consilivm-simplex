# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Victoroff Group is a static single-page landing site for a strategic asset architecture firm. It implements the "Mobile Prime Protocol" — a mobile-first design system with luxury black/white minimalism. Deployed on Vercel at `https://victoroffgroup.com` (also `victoroff-group.vercel.app`).

## Commands

```bash
npm install                # Install dependencies
npm run dev                # Local dev server at http://localhost:8080 (opens browser)
npm run lint               # Stylelint — brand palette, typography, CSS conventions
npm test                   # Playwright test suite (Desktop Chrome + Mobile Chrome)
npm run validate           # Lint + test in sequence

# Single test file or by name
npx playwright test tests/disclosure.spec.ts --config .config/playwright.config.ts
npx playwright test -g "design tokens" --config .config/playwright.config.ts
```

No build step. The site is pure HTML/CSS/JS served directly. Tests auto-start `http-server` on port 8080 serving `src/`.

## Architecture

**Single-file architecture**: All content, styles, and scripts live in `src/index.html`. No framework, no transpilation, no module system.

**Routing**: `vercel.json` sets `outputDirectory: "src"`, making `src/` the site root on Vercel. No URL rewrites.

**Responsive pattern**: Mobile gets a bottom-docked thumb nav (54px tap targets); desktop (1024px+) gets a top horizontal header. Controlled by CSS media queries.

**Key UI patterns in `src/index.html`**:
- **Disclosure/accordion**: Click triggers open one item and auto-close siblings. Uses `aria-expanded` and max-height animation.
- **Scroll-spy**: `IntersectionObserver` at 50% threshold activates `.nav-tab.active` class for current section.
- **Design tokens**: CSS custom properties on `:root` — `--bg: #000000`, `--fg: #ffffff`, `--font-mono: "Geist Mono"`, `--font-sans: "Geist"`. All color usage must reference these tokens, not raw values.

## Linting

Stylelint (`.config/stylelint.config.mjs`) enforces brand rules at the CSS level:
- **No named colors** (`color-named: never`) — use design tokens
- CSS inside HTML parsed via `postcss-html`
- Vendor prefixes allowed (Safari `-webkit-` requirements)

Run `npm run lint` before committing. This catches brand violations that would otherwise only surface in Playwright tests.

## Test Suite

Seven Playwright test files in `tests/`, run against both Desktop Chrome and Mobile Chrome (Pixel 5):

| File | What it validates |
|------|-------------------|
| `structure.spec.ts` | Core components, footer, design token values on `:root` |
| `navigation.spec.ts` | 5 nav tabs, hash navigation targets |
| `a11y.spec.ts` | Axe accessibility audit (color-contrast disabled by design for experimental aesthetic) |
| `aesthetic.spec.ts` | Brand compliance: black bg, white text, Geist font, no "Growth Auditor" |
| `cta.spec.ts` | Exactly 6 CTAs, all section CTAs link to `#access`, submit text |
| `disclosure.spec.ts` | Open/close interaction, sibling auto-close, aria-expanded state |
| `responsive.spec.ts` | Mobile bottom nav, desktop top nav, icon visibility, 48px tap targets |

Config: `.config/playwright.config.ts`. Tests auto-provision a local HTTP server.

## Brand Constraints

Enforced by both stylelint and Playwright tests — don't violate them:
- Background must be pure black (`#000000`), text pure white (`#ffffff`)
- All colors must use CSS custom properties, never raw hex or named colors in declarations
- Typography must use Geist family (Sans + Mono)
- Copy must reference "Strategic Asset Architecture", never "Growth Auditor"
- Tone: established, expensive, intentional, quiet — not flashy or attention-seeking
