# U11 Training System — Master Design

## Current master
**Master v1.0**

The approved illustrated one-pager is the visual source of truth for the U11 Training System.

### Locked visual principles
- One-page trainer card as the primary visual format.
- Dark navy / white sports style with green pitch illustrations.
- Use the approved **AI-illustrated/cartoon quality** for football players, coaches, cones, goals and movement arrows.
- Coaches must be illustrated/caricature-style portraits, not simple geometric or hand-built SVG figures.
- Players on pitches must be full illustrated footballers in the same visual family as the approved one-pager.
- **Never redraw the visual master with primitive HTML/CSS/SVG people, circles, rectangles or generic vector characters.**
- SVG/HTML may be used only as a technical wrapper, hotspot layer or container around the approved rendered illustration. It must not replace the illustrated artwork.
- Monday: Jacob & Allan.
- Wednesday: Lars & Mads.
- Mads is the coach with glasses.
- The web version must visually feel like the illustrated one-pager made interactive — not like a generic web app.
- Detailed instructions and feedback are secondary layers opened from the trainer card.

## Locked training structure
- One main focus is maintained for normally **2–3 weeks**. Do not change focus from session to session.
- Each training session has **2 primary stations/exercises**, normally about 20 minutes each.
- A station is one coherent exercise/setup with progression inside it — the progression steps are **not separate exercises**.
- The trainer card shows the 2 primary stations clearly and simply.
- Each session also has **2 alternative exercises** (C and D) that support the exact same current focus.
- Alternatives on the web must also have **proper illustrated mini-pitch artwork in the approved style**, not synthetic web diagrams.
- The purpose of alternatives is practical flexibility: group level, attendance, space, energy or an exercise that does not work on the day.
- Prefer simple setups that can be progressed without moving lots of equipment.
- Trainer feedback from the completed session should influence the next session while preserving the current focus block.

### Exercise identity and feedback
- Primary stations use stable IDs such as `T2-A` and `T2-B`.
- Alternatives use `T2-C` and `T2-D`.
- Feedback is attached to the station/exercise, with an optional note about which progression step it concerns.
- Do not model three progression phases as A1/A2/A3 or B1/B2/B3 separate exercises.

## Focus-cycle model
- Focus block: normally 2–3 weeks.
- Training 1: introduce the core skill and simple decisions.
- Training 2: progress with more choices, combinations and pressure.
- Training 3: make the same focus more game-realistic and pressure-rich.
- Only after the block is completed should a new main focus normally be selected.

## Automation rule
For scheduled Monday/Wednesday generation:
1. Read this master, the current focus block, archive and feedback.
2. Generate the **rendered illustrated trainer card first** in the approved drawing style.
3. Store that rendered artwork as the visual source for the website/download.
4. Add HTML/SVG only as interaction/hotspot layers around the rendered artwork.
5. Never substitute a hand-built vector reconstruction merely because it is technically easier to deploy.
6. Do not report success until the actual illustrated artwork is present and referenced by the live page.

## How the master may be changed
The master is versioned. A proposed visual change is first a draft and must not silently replace the current master.

Change flow:
1. Create a proposed revision, e.g. `Master v1.1 draft`.
2. Compare it against the current approved master.
3. Mads explicitly approves the change.
4. Promote the approved draft to the new master version.
5. Keep the previous master in history so it can be restored.

Minor changes such as wording, exercise content or weekly focus do **not** create a new design master. A new master version is required when the recurring visual structure, illustration style, trainer-card hierarchy or interaction model changes.

## Rule for future agents
Never redesign the master implicitly. Preserve both the illustrated visual master and the training structure: 2 primary stations + 2 alternatives inside a 2–3 week focus block. If a requested task requires changing the master itself, make that explicit and create a draft version for approval first.
