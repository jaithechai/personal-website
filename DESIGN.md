# Schematic sheet design

## Tokens

The only application palette is in `src/app/globals.css`. Tailwind references those CSS variables rather than maintaining a second palette.

| Role            | Value   | Use                                           |
| --------------- | ------- | --------------------------------------------- |
| `--sheet`       | #ffffff | Sheet and opaque content surfaces             |
| `--ink`         | #14161a | Primary text                                  |
| `--ink-2`       | #41464f | Secondary text, rules                         |
| `--symbol-fill` | #ffffc2 | Symbol interiors only                         |
| `--symbol-line` | #840000 | Symbol outlines, links, controls, title block |
| `--wire`        | #009600 | Wires and junctions only                      |
| `--wire-text`   | #006b00 | Reserved accessible green text                |
| `--pin`         | #006464 | Pins, net labels, table labels                |
| `--sheet-line`  | #840084 | Hover and keyboard focus                      |

A 24px dot grid at rgba(0,0,0,.10) sits on the white sheet. Green is never body text. Text roles use dark colors on white or pale yellow; secondary text exceeds 4.5:1. Focus has a 3px magenta outline and 4px offset.

## Type

Archivo and Martian Mono are self-hosted through `next/font/google`. Archivo paragraphs use normal width, weight 400, at least 16px and 1.6 line height, with a 68ch measure. Headings use Archivo weight 800 and the wdth axis at 125. The h1 scales from 3rem to at most 6rem. Heading tracking is -0.025em with balanced wrapping. Martian Mono is limited to reference designators, pin labels, table labels and the title block, never paragraphs or buttons.

## Components

- Navigation: server-rendered links with active-page indication, an accessible mobile toggle after hydration, route-change close, and all links available without JavaScript. The layout supplies one skip link.
- SymbolHeader: compact pale-yellow headers with a 2px dark-red outline, consistent reference designators, project names and values. Teal pins are short stubs with open-circle terminals. Their labels sit beside the stubs at mid-height and are hidden below 768px. Long descriptions remain on the white sheet.
- Connectors: CSS pseudo-elements run from J1 to J2 and from J2 into the Selected work heading. Their lengths follow the figure gap and shared grid geometry. The J1/J2 connector paints a static base before animating an overlay only under prefers-reduced-motion: no-preference. WorkBus uses a 2px element with a scaleY scroll overlay over a pale static rail, not SVG pathLength. CSS ticks join each project or section header; paired projects share a branch. The rail starts at U1 and ends at the Awards heading. Without JavaScript or with reduced motion the rail is fully drawn. About and not-found have no loose wires.
- ProjectMedia: real images with specific alt text, dimensions and responsive sizes. PCB entries use simplified functional diagrams with an inline SVG connector between blocks and HTML labels of at least 12px at every width. A CSS connection ties the control block to its parent block. Only named parts and values from BRIEF.md appear. Set a project's optional `image: { src, alt, width, height }` in `src/lib/content.ts` to replace its SVG without changing components. These diagrams are explanatory, not fabrication schematics.
- Title block: bottom right table with title, Austin location, revision 2026-11 and the four numbered sheets. The not-found page uses an explicit Unconnected sheet label. Values do not wrap, including its mobile revision value.
- Buttons: Archivo, consistent 3px radius, 2px outline and 48px minimum height. Form fields share the small radius and have persistent associated labels.
- Experience: one semantic ordered list uses CSS grid for Ref, Role, Org and Dates columns on desktop, with a decorative column header hidden from assistive technology. Mobile stacks each entry without repeated field labels. Notes remain visible. Leadership notes, Awards and At a glance use small red square markers and align left.
- Revision History: semantic two-column table with year and change; column headers stay on one line and hyphenation is disabled. Co-developed uses a non-breaking hyphen, and the temperature 180 F uses a non-breaking space. Education has no date.

## Layout and content

Home keeps the hero within the first 900px at 1440px width and shows all four selected projects, U1 through U4: a photo-led solar entry, two PCB diagrams side by side on desktop and a compact operations row. Work leads with the full-width solar system, pairs the PCBs on desktop, lets operations text span the row and pairs CNN with gym research. About splits the at-a-glance list and history. Contact retains a mailto form, its hint and a direct email fallback. All pages have exactly one h1. At widths below 768px the major layouts stack around a left-hand wire bus. No overflow is concealed with overflow-x clipping.

All project facts, experience, skills, awards, highlights and history live in `src/lib/content.ts`; Home and Work consume the same project objects. Email is defined only in `src/lib/site.ts`. Metadata uses SITE_URL, per-page titles and descriptions, a schematic favicon and a generated social image. Finished roles use past tense. No resume link or graduation year is shown.

The solar car image retains its full 16:9 composition so the entire car and team remain visible. The headshot is square and centered toward the face. CNN and gym figures retain their native aspect ratios so labels and chart axes are not cropped. The traffic photo is described as an annotated image, not presented as proof of model-generated detections.

## Dependencies and validation

Next and eslint-config-next are pinned to 15.5.28. Framer Motion is retained for the scroll-driven Work bus. Unused icon, slot, class-variant and class-merging dependencies are removed together with the unused utility module.

Required release checks: `npx tsc --noEmit`, `npm run build`, and `npm audit --omit=dev`. No deployment is part of this redesign. The production audit result and executed visual checks are recorded below after validation.

### Executed checks

- `npx tsc --noEmit` and `npm run build` passed with Next 15.5.28. The build statically generated all pages, favicon, social image, sitemap and robots routes. File tracing is explicitly rooted in this repository to avoid inference from a parent lockfile.
- Headless Chrome checked Home, Work, About, Contact and a missing route at 375px, with JavaScript both enabled and disabled. Each had one h1, visible main content, loaded images and no horizontal overflow or page errors. Desktop checks at 1440px also found no horizontal overflow. Screenshots were visually inspected. The mobile navigation opened and closed on route change. The missing route returned HTTP 404, and the social image returned HTTP 200 with image/png content.
- Fix-round verification: TypeScript and the production build passed. Headless Chrome checked Home, Work, About and not-found at 375px and 1440px with normal motion, reduced motion and JavaScript disabled (24 page scenarios). No overflow or page errors occurred. Screenshots of Home connectors and the Work rail during scrolling were visually inspected at both widths. Element geometry confirmed J1 ends at J2, J2 ends at the Selected work heading, and the 2px Work rail starts at U1 and ends at Awards. The overlay scale progressed to full length on scroll and stayed full for reduced motion and no JavaScript. The desktop hero ended at 771px, within the first 900px. All four selected reference designators appeared, diagram labels computed to 12px, and title-block values stayed unwrapped. This supersedes the earlier SVG pathLength implementation and its verification.
- `npm audit --omit=dev` reported **5 vulnerabilities: 4 high, 1 moderate, 0 critical**. Reported packages: nanoid (high), sharp (high), source-map-js (high), Next's nested postcss (high), and next (moderate, propagated from postcss). These findings remain open. The requested Next 15.5.28 pin is preserved; no forced audit upgrades or transitive overrides were applied. The audit suggests Next 16 for the nested PostCSS finding, outside the requested Next 15 scope.
