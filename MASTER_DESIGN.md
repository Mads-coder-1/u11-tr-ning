# U11 Training System — Master Design

## Current master
**Master v1.1 — APPROVED**

The approved illustrated one-pager/trainer card is the visual source of truth for the U11 Training System. The reference is the polished illustrated card approved on 16 August 2026: navy/white sports layout, green illustrated pitches, full footballer illustrations, clear drill arrows, compact information hierarchy, coaching boxes and alternatives integrated in the same professional visual language.

## NON-NEGOTIABLE visual standard
- The **illustrated trainer card is the product**. The website is the polished interactive frame around it.
- Future cards must reproduce the same overall quality, density, hierarchy and visual family as the approved illustrated card — not merely use similar colours.
- Dark navy / white sports style with green pitch illustrations.
- Use proper AI-illustrated/cartoon-quality footballers, coaches, cones, goals, balls and movement arrows.
- Players on pitches must be full illustrated footballers, never primitive web markers.
- Coaches, when shown, must be illustrated/caricature-style portraits, never geometric SVG figures.
- Never redraw the visual master with primitive HTML/CSS/SVG people, circles, rectangles, emoji players or generic vector characters.
- SVG/HTML may be used only as a technical wrapper, interaction/hotspot layer or container around rendered artwork. It must never visually replace the rendered illustrations.
- Alternatives C and D must have the **same illustrated quality** as primary stations A and B.
- The card must remain readable and attractive on mobile and suitable for download/print.
- Monday trainers: Jacob & Allan.
- Wednesday trainers: Lars & Mads.
- Mads is the coach with glasses.
- Detailed instructions, audio and feedback are secondary interactive layers. They must not degrade or clutter the trainer card itself.

## Website standard
- The website must feel like a polished U11 training app built around the illustrated cards, not a generic HTML page.
- The current training card is the visual centre of the page.
- Keep the top UI compact and intentional: current focus/session plus clear actions for audio, download and archive.
- Avoid large empty areas, broken-image placeholders, technical-looking controls and duplicated information.
- Archive uses visual card previews.
- Clicking A/B/C/D opens drill details and feedback without replacing the visual master.
- Download must return the actual high-quality illustrated trainer card.

## Locked training structure
- There are normally **2 training sessions per week: Monday and Wednesday**.
- One main focus block normally lasts **3 weeks = 6 training sessions**.
- Sessions are numbered **Training 1 of 6** through **Training 6 of 6** within that focus block.
- Do not change the main focus from session to session.
- After Training 6, use feedback and progression across the block to select/propose the next focus.
- A focus block may exceptionally be shortened or extended only by an explicit coaching decision; the default is six sessions.
- Each training session has **2 primary stations/exercises**, normally about 20 minutes each.
- A station is one coherent exercise/setup with progression inside it. Progression steps are not separate exercises.
- Each session also has **2 alternatives (C and D)** supporting the exact same current focus.
- Alternatives provide practical flexibility for group level, attendance, space, energy or an exercise that does not work on the day.
- Prefer simple setups that can be progressed without moving lots of equipment.
- Trainer feedback from completed sessions must influence subsequent sessions while preserving the current focus block.

## Six-session progression model
- **Training 1–2:** establish technique, confidence and simple decisions.
- **Training 3–4:** add choices, combinations, timing and more active opposition.
- **Training 5–6:** make the same focus increasingly game-realistic with pressure, transitions and decision-making.
- Wednesday should build naturally on Monday; Monday should build on the previous Wednesday and accumulated feedback.
- Do not make six unrelated sessions. The block should feel like one coherent learning progression.

## Exercise identity and feedback
- Primary stations use stable IDs such as `T2-A` and `T2-B`.
- Alternatives use `T2-C` and `T2-D`.
- Feedback is attached to the station/exercise, with an optional note about which progression step it concerns.
- Do not model progression phases as A1/A2/A3 or B1/B2/B3 separate exercises.

## Automation rule
For scheduled Monday/Wednesday generation:
1. Read this master, current focus block, archive and available feedback.
2. Determine the next session number in the six-session focus block.
3. Preserve the current focus unless the previous session was Training 6 or an explicit coaching decision changes it.
4. Build the session as the next logical progression, not as a standalone random practice.
5. Generate the **rendered illustrated trainer card first** in the approved visual standard.
6. Include 2 primary stations A/B and 2 illustrated alternatives C/D in the session system.
7. Store/use the rendered artwork as the visual source for website and download.
8. Add HTML/SVG only for interaction, audio, details, download, archive and feedback around the artwork.
9. Never substitute a hand-built vector reconstruction because it is easier to deploy.
10. Do not report success until the actual illustrated artwork is present and referenced by the live page.

## Current focus block
- Focus: **Boldkontrol og dribling mod modstandere**.
- Training 1: completed / archived.
- Training 2: current/next session.
- Therefore the current card must be labelled **TRÆNING 2 AF 6**, not 2 of 3.

## How the master may be changed
The master is versioned. A proposed future visual change is first a draft and must not silently replace the approved master.

Change flow:
1. Create a proposed revision, e.g. `Master v1.2 draft`.
2. Compare it against the current approved master.
3. Mads explicitly approves the change.
4. Promote the approved draft to the new master version.
5. Keep the previous master in history so it can be restored.

Minor changes such as wording, exercise content or weekly focus do not create a new design master. A new master version is required when the recurring visual structure, illustration style, trainer-card hierarchy or interaction model changes.

## Rule for future agents
Never redesign the master implicitly. Preserve the approved illustrated-card standard, six-session focus progression, 2 primary stations and 2 illustrated alternatives. The website is subordinate to the card. If a request requires changing the master itself, make that explicit and create a draft version for approval first.
