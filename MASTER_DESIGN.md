# U11 Training System — Master Design

## Current master
**Master v1.0**

The approved one-pager is the visual source of truth for the U11 Training System.

### Locked visual principles
- One-page trainer card as the primary visual format.
- Dark navy / white sports style with green pitch illustrations.
- Illustrated football players, coaches, cones, goals and clear movement arrows.
- Monday: Jacob & Allan.
- Wednesday: Lars & Mads.
- Mads is the coach with glasses.
- The web version must visually feel like the one-pager made interactive — not like a generic web app.
- Detailed instructions and feedback are secondary layers opened from the trainer card.

## Locked training structure
- One main focus is maintained for normally **2–3 weeks**. Do not change focus from session to session.
- Each training session has **2 primary stations/exercises**, normally about 20 minutes each.
- A station is one coherent exercise/setup with progression inside it — the progression steps are **not separate exercises**.
- The trainer card shows the 2 primary stations clearly and simply.
- Each session also has **2 alternative exercises** (C and D) that support the exact same current focus.
- Alternatives are available on the web as optional swaps and do not clutter the primary one-pager.
- The purpose of alternatives is practical flexibility: group level, attendance, space, energy or an exercise that does not work on the day.
- Prefer simple setups that can be progressed without moving lots of equipment.
- Trainer feedback from the completed session should influence the next session while preserving the current focus block.

### Exercise identity and feedback
- Primary stations use stable IDs such as `T2-A` and `T2-B`.
- Alternatives use `T2-C` and `T2-D`.
- Feedback is attached to the station/exercise, with an optional note about which progression step it concerns.
- Do not model three progression phases as A1/A2/A3 or B1/B2/B3 separate exercises.

## Focus-cycle model
Example:
- Focus block 1: 2–3 weeks.
- Training 1: introduce the core skill and simple decisions.
- Training 2: progress with more choices, combinations and pressure.
- Training 3: make the same focus more game-realistic and pressure-rich.
- Only after the block is completed should a new main focus normally be selected.

## How the master may be changed
The master is not permanent forever. It is **versioned**.

A proposed visual change is first treated as a draft and must not silently replace the current master.

Change flow:
1. Create a proposed revision, e.g. `Master v1.1 draft`.
2. Compare it against the current approved master.
3. Mads explicitly approves the change.
4. The approved draft is promoted to the new master version.
5. The previous master stays in history and can be restored.

Minor changes such as wording, exercise content or weekly focus do **not** create a new design master. A new master version is required when the recurring visual structure, illustration style, trainer-card hierarchy or interaction model changes.

## Rule for future agents
Never redesign the master implicitly. Preserve both the visual master and the training structure: 2 primary stations + 2 alternatives inside a 2–3 week focus block. If a requested task requires changing the master itself, make that explicit and create a draft version for approval first.
