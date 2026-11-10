# Progress: two-version redesign (started 2026-11-09)

## Goal
Jai: "Study these websites and their code and try and recreate something like them... Give me a whole redesign. Give me one website that is my personal website's information, but with this stuff adapted. And then show me a second version with this stuff adapted, as well as some type of ECE type of spin on it... You need to have two finished products."
References: https://loueylahwel.me/ and https://xotoe.com/

## Decisions
- Both versions are routes in this app: `/a` (Poster) and `/b` (Board, PCB layout look). Existing pages untouched.
- Version B is a PCB layout look, not a schematic sheet (Jai rejected the KiCad schematic-sheet redesign on 2026-11-04).
- Shared facts in `src/lib/content.ts`, copied from the current components.
- Added dependency `lenis` (smooth scroll, same library the first reference uses).
- Nothing committed or pushed. Push to `main` redeploys the live site, needs Jai's yes.

## Reference notes
- loueylahwel.me: Lenis, sticky stacked project cards, poster hero (ink circle, inverted giant name, rotating text ring), word-by-word bio reveal, sticky skill words, fixed bezel, bottom pill nav, ticket cards. Mona Sans / Geist / Geist Mono, #111 and #F4F2EE.
- xotoe.com: preloader with iris wipe, pinned sections, scroll-scrubbed horizontal timeline, hard offset shadows, pill labels, grid paper, pixel cursor, interactive demo. Clash Display / Archivo, #EF6B32, #FFF6EC, #FFC700.

## Steps
- [x] Read current site and brain hub
- [x] Study both references
- [x] Briefs written (inside workflow script, run wf_a69a6b95-18e)
- [x] Build A and B
- [x] `npm run build` passes, `npx tsc --noEmit` clean. Checked `/a` and `/b` in the preview (port 3100, `site-preview`) at 1024x768 and 375x812: every section renders, no console errors, no sideways scroll, no em dashes, no class year, no tagline.
- [x] Fixes after the build: `/a` hero layout, word reveal stuck half-lit (range-form opacity transforms replaced by `src/lib/ramp.ts`), blank project cards 01 and 02 (`va/Reveal.tsx` now observes an unclipped wrapper), contact form spacing, `/b` awards scrollbar colour.

## Feedback round 1 (2026-11-09)
Jai: "I like version b mroe forsure." Changes asked for and done on `/b`, built and checked in the preview at 1280x800:
- Hero corner label is now "PORTFOLIO" (handle removed, also on `/a`).
- About copy rewritten in `src/lib/content.ts` (`aboutIntro`, `intro`). Jai: "if there's something that's just like kind of like not adding to it, then don't say anything." The Texas Speedboat Racing sentence is my wording, Jai has not approved it.
- Six different project entrances in `vb/Projects.tsx`: curtain, sweep, rise, scale, iris, diag. They only run at 900px and wider.
- Awards is an endless auto-scrolling row (list rendered twice, CSS `pb-marquee`, pauses on hover, plain scroll row under reduced motion).
- "Built with Next.js" removed from `va/Footer.tsx` and `vb/Footer.tsx`.
- Back to top link in `vb/Footer.tsx` (`data-top`, handled in `vb/Board.tsx`).

## Feedback round 2 (2026-11-09)
Done on `/b`, built, checked in the preview at 1280x800:
- About: "I want to build things that have a real-world application and can help people." (Jai's wording.)
- Back to top takes 2.8 s (`vb/Board.tsx`, measured 2.77 s).
- Solar car: Jai: "make an animation of the car driving across teh screen rly small and cartoony as i scroll down." `vb/SolarCar.tsx`, a road strip under the card's role line; the car crosses while the strip is on screen. The team's Drive schematics were not opened or used.
- Op-amp: Jai: "do all of them." `vb/OpAmpDemo.tsx` + `opamp.css`: RV1 gain slider with clipping, frequency sweep with gain curve, hotspots on the real Lab 4 board (`public/board-opamp.svg`, made from the KiCad layer SVGs). Model is ideal: 3 MHz gain-bandwidth, rails assumed plus and minus 2 V. The real supply voltage is unknown.
- CNN: `vb/SteerDemo.tsx` + `steer.css`, five preset scenes, labelled as an illustration, not model output.
- Buck card shows the real Lab 7 board (`public/board-buck.svg`).
- Gym form: nothing, as asked.

## Feedback round 3 (2026-11-09)
Done on `/b`, built, checked in the preview at 1280x800:
- Car: Jai: "Use this photo for inspiration for the cartoon car." `vb/SolarCar.tsx` redrawn from the photo: grey wing deck, blue dome with a face, three black wheels, blue "67" plate. Road strip is 72px tall.
- Hotspots: Jai: "The clickable hotspots aren't very obvious." New shared `vb/BoardHot.tsx`: numbered cream circles with a pulse ring, gold when selected, "Click a number" hint. Used by the op-amp and the buck boards.
- Buck: Jai: "do the Sam thing for the buck converter. Pick a different interactive thing for the buck converter to vin and v out for example." 15 hotspots on the Lab 7 board (positions from the `.kicad_pcb` pads) plus a current-path animation ("Follow the current"), which Jai removed in round 4. Vin is fixed at 12 V. R4/R5 gain text (1 + 20k / 5k = 5) is inferred from the nets.
- CNN: Jai: "I don't like the steering demo, maybe don't make it interactive." `vb/SteerDemo.tsx` now plays on its own: a car laps a winding road, an arrow and readout show the steering direction. Labelled as an illustration.

## Feedback round 4 (2026-11-09)
Done on `/b`, built, checked in the preview at 1280x800:
- Buck: Jai: "Remove the current following thing. i jsut want you to change interactive part above to have vin and v out as you vary the duty cycle." Current path gone from `vb/BuckDemo.tsx`. The scope shows a dotted Vin line (12 V, fixed) and a dashed Vout line, both labelled with values, driven by the duty slider. No Vin slider (Jai rejected it in round 3).
- Layers: Jai asked for an exploded-view scroll animation of the PCB layers. `vb/BoardLayers.tsx` (used through the `layers` prop of `vb/BoardHot.tsx`) shows silkscreen, exposed pads, top copper, FR-4 core, bottom copper as tilted plates that pull apart as the block scrolls up the screen. Per-layer SVGs in `public/boards/`, split from the combined board SVGs. On both the Lab 4 and Lab 7 boards. Under reduced motion the plates sit fully spread.
- Layers follow-up: Jai: "can you the pcb explode animation start a little bit later, it starts before i actually get to it and make it look better." The stack now stays closed until the stage's middle is 70% down the screen and is fully open at 35%. Added spring smoothing, a tilt that deepens as it opens, wider gaps (58px), more opaque plates with shadows, a gold-edged core, and legend labels that light up one by one.

## Not checked
- Round 4 pieces at phone width (375px) and under reduced motion.
- Round 3 pieces at phone width (375px) and under reduced motion.
- Round 2 pieces at phone width (375px) and under reduced motion.
- Safari and Firefox, real touch devices, reduced-motion setting, the contact form's mailto send.
- `/a` experience pinned sideways mode needs a window at least 900x780; only the vertical list was seen.
- Awards row cannot be swiped by hand on touch screens; it only moves on its own.

## Next step
Jai reviews round 4 and sends the Agentic Ops System details. Then `/b` replaces `/`. Nothing is committed.

## Open questions
- (Settled 2026-11-09) Op-amp demo rails: Jai said "Keep ±2 V". Still an assumed value, labelled as such on the site.
- Whether the Texas Speedboat Racing sentence stays in About.
- Agentic Ops System content (Jai will send).

## Go-live (2026-11-09)
- Board is the home page (`src/app/(board)/`), `/a` = Poster, old `/about` `/work` `/contact` `/b` redirect. Pushed to main as 83428f6, live at https://jai-portfolio-cyan.vercel.app.
- Open: redirects to `/#projects` land at page top; old page files still in repo; phone width not checked on live.

## Agentic Ops graph (in progress)
- Jai: "create a type of knowlegde graph or soemthing cool and maybe intercative for my site and that section, maybe it could be one dot that kind of explodes into multiple nodes, come up wiht a few ideas before you execute"
- Research done: brain hubs (global-brain, tools), ai-hub README, session list. Card content is in `src/lib/content.ts:203`.
- Jai picked: "Idea 1 plus 2" (burst graph plus button-triggered task trace).
- Built, not committed: `src/components/vb/AgentGraph.tsx`, `src/components/vb/agents.css`, one import and one line in `src/components/vb/Projects.tsx`. No new dependency.
- Checked on the production build at localhost:3100: `tsc` and `npm run build` pass; burst on scroll-in; node select by click and by Enter key; OK trace to step 6 / 6, fail trace to step 7 / 7; 1280 wide and 375 wide layouts, no horizontal overflow; no new console errors.
- Feedback round (2026-11-09). Jai: "The orchestrator is already open when I scroll to it. And then no child nodes open up when I click it. Then for send a task and then send one that fails, could you do like make it a little faster and make it look a little cooler?" Done: burst waits until 60% of the map is inside the upper three quarters of the screen; tapping the open orchestrator replays the burst; under 560 px the map uses a tighter viewBox and numbered child nodes that match numbered panel entries; trace runs 1300 ms per step with a glowing dot and tail, flowing dashes, arrival rings, visited nodes kept gold, step pips, and red from the failing step on.
- Round checked on the production build at 375 and 1280 wide: closed while partly in view, bursts once scrolled in, child nodes show, replay works, both traces finish, no new console errors.
- Feedback round (2026-11-09). Jai: "i want the orhcetrator only to open if it clicked. the child nodes still dont open on click, just remove it all together." Done: no auto-open on scroll; the map opens only when the orchestrator or a task button is pressed; child nodes removed from the map (the three sub-items still list as text in the side panel); unused child CSS deleted. Checked at 375 wide: stays closed in view, bursts on click, no child nodes.
- Not checked: reduced-motion rendering, a real phone, the live site.
- Wording defaults Jai has not confirmed: no paths, repo names or quota numbers; Career Scout shown as "Opportunity scout"; trading hunt left off; the Hub text mentions quota without numbers.
- Next step: Jai's yes to commit and push (push redeploys the public site).
