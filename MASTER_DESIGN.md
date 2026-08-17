# U11 Training System — Master Design

## Current master
**Master v1.3 — APPROVED**

The approved visual source of truth is now a **multi-page illustrated trainer-card system** rather than one compressed poster. The recurring visual language remains navy/white, green illustrated pitches, proper cartoon footballers/coaches, clear arrows, practical coaching text and strong mobile readability.

## NON-NEGOTIABLE visual standard
- The illustrated trainer cards are the product; the website is the polished interactive frame around them.
- Dark navy / white sports style with green pitch illustrations.
- Use proper AI-illustrated/cartoon-quality footballers, coaches, cones, goals, balls and movement arrows.
- Never replace rendered artwork with primitive HTML/CSS/SVG people, emoji players or generic vector characters.
- Each station must be readable on a phone without squeezing the other stations.
- **Station A is the locked proportion/layout reference.** B, C and D must use the same page dimensions, visual scale, pitch size, text density and four vertically stacked progression blocks as A.
- Do NOT generate A+B+C+D together on one poster. That repeatedly causes B/C/D to be compressed.
- Training 2 therefore consists of four separate rendered files: `training2-a`, `training2-b`, `training2-c`, `training2-d`, shown one after another on the website.

## LOCKED trainer identities
Use the approved caricature reference from the original trainer card consistently. Never invent new generic faces between cards.
- Visual order: **Jacob · Allan · Mads · Lars**.
- Jacob = first approved portrait.
- Allan = second approved portrait, bald.
- Mads = third approved portrait, **with glasses**.
- Lars = fourth approved portrait, blond/light-haired.
- Names and faces must remain paired exactly this way on every future card.

## Website standard
- The active training page shows the four full-size station pages vertically: **A → B → C → D**.
- Each page has its own details/feedback action.
- The website must not shrink B/C/D to fit on one screen or one poster.
- Audio, detail text and feedback remain interactive layers around the artwork.
- Archive remains accessible from the top bar.
- Download must deliver the actual rendered high-quality station artwork.

## Locked training structure
- Normally 2 sessions per week: Monday and Wednesday.
- One focus block normally lasts 3 weeks = 6 sessions.
- Sessions are labelled Training 1 of 6 through Training 6 of 6 everywhere: website, artwork, audio, archive and download.
- Main focus remains fixed through the block unless explicitly changed.
- Training 1–2: technique/confidence/simple decisions; 3–4: more choice/opposition; 5–6: game-like pressure and decisions.
- A/B/C/D are all real usable stations/options designed for **4–6 players per station** with little waiting time.

## LOCKED: progression inside every exercise
- Every station A/B/C/D has a visible **20-minute progression**.
- Default pattern is four vertically stacked phases, typically `0–5`, `5–10`, `10–15`, `15–20 min.`.
- Each phase gets a large illustrated pitch, concise explanation and coaching points.
- Progression should move logically from simple form → added choice/reaction → opponent/pressure → freer/game-like form.
- Keep the basic setup as stable as practical so coaches do not constantly rebuild the station.

## LOCKED: picture, detail text and audio must be 1:1 consistent
- One structured source of truth must exist before artwork generation.
- Define exact exercise name, players, setup, goals/ports/cones, movement, timed progression and coaching points.
- Generate artwork, click details and audio from the same data.
- Clicking A/B/C/D must explain exactly what the corresponding page shows.
- If data and picture disagree, fix the mismatch before publishing.

## Current Training 2 station content
- **A:** 1 mod 1 – dribling gennem porte. 0–5 free gate dribbling; 5–10 trainer calls gate/colour; 10–15 1v1 through a gate; 15–20 free duel with free gate choice.
- **B:** Drible og afslutte. 0–5 dribble to goal; 5–10 obstacles/direction changes; 10–15 passive defender; 15–20 active defender and finish.
- **C:** 2 mod 1 – overtal. 0–5 pass/keep ball; 5–10 find free player; 10–15 dribble can create the chance; 15–20 finish attack on goal.
- **D:** Drible, finte og afslutte. 0–5 feints in speed; 5–10 1v1 without goal; 10–15 1v1 with goal/goalkeeper; 15–20 competition.

## Deployment rule
1. Read this master and current structured exercise data.
2. Generate **four separate full-size station images**, not one combined poster.
3. Verify all four images use A-scale proportions and four vertical phases.
4. Verify approved trainer portraits/names are consistent: Jacob, Allan, Mads, Lars.
5. Store station images as separate assets and render them vertically on the active page.
6. Keep detail text/audio tied to the same exercise data.
7. Verify `TRÆNING X AF 6` on every rendered page.
8. Verify mobile load, archive, downloads, audio and A/B/C/D details before reporting success.

## Current focus block
- Focus: **Boldkontrol og dribling mod modstandere**.
- Training 1: completed / archived.
- Training 2: current.
- Current session label: **TRÆNING 2 AF 6**.

## Rule for future agents
Never compress all stations into one poster again. Never silently change the trainer portraits. Preserve separate A-sized station pages, 4–6 players per station, four vertical timed progressions, the six-session focus block, and 1:1 consistency between artwork, details and audio.