# U11 Training System — Master Design

## Current master
**Master v1.2 — APPROVED**

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
- The session number must be correct **everywhere**: website header, rendered artwork, download, audio, archive metadata and detail view. Never leave old `X of 3` wording in artwork.
- Do not change the main focus from session to session.
- After Training 6, use feedback and progression across the block to select/propose the next focus.
- A focus block may exceptionally be shortened or extended only by an explicit coaching decision; the default is six sessions.
- Each training session has **2 primary stations/exercises**, normally about 20 minutes each.
- A station is one coherent exercise/setup with progression inside it. Progression steps are not separate exercises.
- Each session also has **2 alternatives (C and D)** supporting the exact same current focus.
- Alternatives provide practical flexibility for group level, attendance, space, energy or an exercise that does not work on the day.
- Prefer simple setups that can be progressed without moving lots of equipment.
- Trainer feedback from completed sessions must influence subsequent sessions while preserving the current focus block.

## LOCKED: progression inside every exercise
This is different from the six-session progression across the focus block.

- Every primary station A/B must have a **timed progression inside the 20-minute exercise**.
- Alternatives C/D must also have a usable timed progression when chosen instead of A/B.
- The progression should normally contain 3–5 chronological phases, for example `0–4`, `4–9`, `9–14`, `14–20 min.`. Exact timings depend on the exercise.
- Each new phase must build on the same basic setup wherever possible: technique -> decision/choice -> pressure/opponent -> game-like competition.
- The detail view must show both **time interval + what changes in that interval**. Generic bullet points without time progression are not sufficient.
- The progression must be practical for coaches on the pitch: minimal rebuilding of cones/equipment, clear trigger for when to move on, and concrete coaching focus.
- Audio should explain the progression in chronological order.

## LOCKED: picture, detail text and audio must be 1:1 consistent
- There must be **one source of truth for exercise content** before artwork is generated.
- For each exercise, define: ID, exact exercise name, visible setup, players/opponents, goals/cones/balls, movement pattern, timed progression and coaching points.
- Generate the illustrated picture **from that data**.
- Generate clickable A/B/C/D detail text **from the same data**.
- Generate audio **from the same data**.
- Therefore, clicking A, B, C or D must explain exactly what the user can see in that part of the card — not a related or generic exercise.
- If artwork and data disagree, do not silently rewrite the text to something else. Fix the mismatch before publishing.
- Before deploy, perform an explicit consistency check for A/B/C/D: exercise name, number of players, opponent count, goals, cones/markers, direction of play and progression must correspond to the picture.

## Six-session progression model
- **Training 1–2:** establish technique, confidence and simple decisions.
- **Training 3–4:** add choices, combinations, timing and more active opposition.
- **Training 5–6:** make the same focus increasingly game-realistic with pressure, transitions and decision-making.
- Wednesday should build naturally on Monday; Monday should build on the previous Wednesday and accumulated feedback.
- Do not make six unrelated sessions. The block should feel like one coherent learning progression.

## Exercise identity and feedback
- Primary stations use stable IDs such as `T2-A` and `T2-B`.
- Alternatives use `T2-C` and `T2-D`.
- Feedback is attached to the station/exercise, with an optional note about which timed progression phase it concerns.
- Do not model progression phases as A1/A2/A3 or B1/B2/B3 separate exercises.

## Automation rule
For scheduled Monday/Wednesday generation:
1. Read this master, current focus block, archive and available feedback.
2. Determine the next session number in the six-session focus block.
3. Preserve the current focus unless the previous session was Training 6 or an explicit coaching decision changes it.
4. Build the session as the next logical progression, not as a standalone random practice.
5. **Create structured exercise data first** for A/B/C/D: exact visible setup + timed intra-exercise progression + coaching + audio wording.
6. Generate the **rendered illustrated trainer card from that exact exercise data** in the approved visual standard.
7. Include 2 primary stations A/B and 2 illustrated alternatives C/D in the session system.
8. Store/use the rendered artwork as the visual source for website and download.
9. Generate click details and audio from the **same structured exercise data** used for the artwork.
10. Add HTML/SVG only for interaction, audio, details, download, archive and feedback around the artwork.
11. Never substitute a hand-built vector reconstruction because it is easier to deploy.
12. Verify that the rendered artwork itself has the correct `TRÆNING X AF 6` label.
13. Perform the A/B/C/D picture-vs-text consistency check before deployment.
14. Do not report success until the actual illustrated artwork is present, referenced by the live page, and all consistency checks pass.

## Current focus block
- Focus: **Boldkontrol og dribling mod modstandere**.
- Training 1: completed / archived.
- Training 2: current/next session.
- Current card must be labelled **TRÆNING 2 AF 6** everywhere.
- `data/training2.json` is the current source of truth for the four clickable exercises and their timed progression.

## How the master may be changed
The master is versioned. A proposed future visual change is first a draft and must not silently replace the approved master.

Change flow:
1. Create a proposed revision, e.g. `Master v1.3 draft`.
2. Compare it against the current approved master.
3. Mads explicitly approves the change.
4. Promote the approved draft to the new master version.
5. Keep the previous master in history so it can be restored.

Minor changes such as wording, exercise content or weekly focus do not create a new design master. A new master version is required when the recurring visual structure, illustration style, trainer-card hierarchy, progression model or interaction model changes.

## Rule for future agents
Never redesign the master implicitly. Preserve the approved illustrated-card standard, six-session focus progression, timed progression inside every exercise, 2 primary stations and 2 illustrated alternatives. Picture, detail text and audio must come from one exercise source of truth. The website is subordinate to the card. If a request requires changing the master itself, make that explicit and create a draft version for approval first.
