# U11 Træning – regelsæt (godkendt af Mads 16. sep 2026)

> Erstatter den nuværende `MASTER_DESIGN.md`. Ændringerne i forhold til den gamle version er markeret med **[NY]**.

## 1. Forløbet
- Træning er **mandag og onsdag**.
- Et fokus-blok varer **6 uger**, og **1 træning = 1 uge** (Træning 1 af 6 … Træning 6 af 6). **[NY: før var 1 træning = 1 træningsgang]**
- Fokus skifter ikke inden for en blok.
- Progression over blokken:
  - Uge 1–2: teknik, tryghed og enkle valg.
  - Uge 3–4: flere valg, kombinationer og mere aktiv modstand.
  - Uge 5–6: kampnært med pres, omstilling og beslutninger.
- Nuværende blok: **Boldkontrol og dribling mod modstandere** (Træning 2 af 6 er uge 38).

## 2. Hver uge
- **4 øvelser, A–D**, alle ligeværdige og alle i samme fokus. **[NY: før var A/B primære og C/D alternativer]**
- Trænerne vælger på siden, hvilke øvelser de bruger mandag og onsdag. Standard er mandag A+B og onsdag C+D.
- Hver øvelse varer ca. 20 min., er til **4–6 børn** og har **4 faser**: 0–5, 5–10, 10–15 og 15–20 min.
- Faserne bygger oven på samme opstilling: teknik → valg → modstand → konkurrence. Der skal flyttes så lidt udstyr som muligt.
- Hver fase har en titel, en kort tekst, et "Fokus" og en **tegning**.
- Hver øvelse har også navn, formål, bane, antal spillere, udstyr, opstilling og 4 coachingpunkter.

## 3. Én kilde til alt
- Al indhold ligger i **`data/trainingN.json`**: tekst, tegninger (`diagram.items`), trænere og dage.
- Kort, detaljer og oplæsning bygges fra den samme fil og kan derfor ikke glide fra hinanden.
- `data/current.json` peger på ugens træning, fx `{ "file": "training3.json" }`. **[NY]**

## 4. Visuelt format **[NY – erstatter "rendered artwork"-reglerne]**
- **Tegningerne tegnes i kode (SVG) af `assets/js/diagram.js`.** Der uploades ikke billedfiler til kortene. Det var billedfilerne, der gik i stykker.
- Byggeklodserne i en tegning:
  - `gate` (port), `cone` (kegle), `pole` (stang), `goal` (mål), `line` (linje), `ball` (bold)
  - `p` (spiller: blue, red eller keeper), `coach` (træner, med taleboble)
  - `dribble` (dribling), `pass` (aflevering), `shot` (skud), `run` (løb uden bold), `tag` (skilt)
- Koordinaterne `u` og `v` går fra 0 til 1. `v = 0` er den fjerne ende, hvor målet står.
- Layoutet ligger fast og må ikke laves om:
  - mørk navy top
  - "I dag skal vi"
  - trænerkort under hinanden i rækkefølgen **Jacob · Allan · Mads · Lars**
  - dagsvælgeren
  - stationskortene A→D under hinanden og lige store
- Trænerne vises som silhuetter, indtil der er et foto (`coaches[].photo`).
- **Tegning og tekst skal passe 1:1.** Står der "passiv forsvarer" i teksten, skal tegningen vise en rød spiller mærket PASSIV. Det samme gælder antal spillere, mål, kegler og spilleretning.

## 5. Feedback **[NY]**
- Feedback skal kunne gives med **ét tryk**.
- Nederst på hvert stationskort står "Hvordan gik øvelsen?" med fem knapper **1 2 3 4 5**.
  - 1 = virkede ikke
  - 3 = ok
  - 5 = super
- Trykker træneren på en knap, sendes resten automatisk med: uge, dag (mandag eller onsdag, ud fra dagsvælgeren) og station, fx `T3-B`.
- Træneren ser "Tak! ✓". Der er ingen formular at udfylde og intet login.
- En kommentar er frivillig. Efter trykket vises et lille tekstfelt ("Noget vi skal ændre?"), som man kan springe over.
- Svarene sendes i baggrunden til en **Google Formular** og samles i et Google-ark. Arket er **publiceret som CSV**, og det er den adresse, robotten læser.
- Opsætningen ligger i `data/feedback.json`:
  `{"formUrl": "...", "fields": {"station": "entry.X", "score": "entry.Y", "comment": "entry.Z"}, "csvUrl": "..."}`
  Er `formUrl` tom, vises knapperne ikke, og siden fungerer som nu. Når feltet er udfyldt, virker de.
- Robotten tolker scoren sådan:
  - **1–2**: øvelsen justeres eller skiftes ud.
  - **3**: øvelsen justeres let.
  - **4–5**: øvelsen må komme igen i en sværere udgave.
- Flere svar på samme station lægges sammen til et gennemsnit.

## 6. Automatik **[NY]**
Kører som en **routine** (claude.ai/code/routines) med repoet `Mads-coder-1/u11-tr-ning` valgt, **søndag og tirsdag kl. 19**. Routinen kører i skyen, også når Mads' computer er slukket, og bruger hans abonnement. Ændringerne lægges op uden godkendelse, og Mads får et resumé i kørslen.

**Grene.** Prøv først at gemme direkte på `main`, så siden opdaterer sig selv. Bliver det afvist, så gem på en `claude/`-gren, åbn en pull request og skriv tydeligt i resuméet, at den skal godkendes.

### Søndag: byg næste uge
1. Læs dette regelsæt, `data/current.json`, arkivet og al feedback fra ugen.
2. Næste nummer = forrige + 1. Var forrige uge **Træning 6**:
   - Start en ny blok.
   - Vælg nyt fokus ud fra feedback og det, der mangler.
   - Skriv valget og begrundelsen i beskeden til Mads.
3. Byg 4 nye øvelser A–D efter progressionsmodellen i afsnit 1. Brug feedbacken:
   - Score 1–2 justeres eller skiftes ud, og score 3 justeres let.
   - Øvelser, der fik 4–5, må gerne komme igen i en sværere udgave.
   - Maks. 1 øvelse må gå igen uændret fra ugen før.
4. Skriv `data/trainingN.json`, opdatér `data/current.json`, og tilføj ugen før til arkivet.
5. **Kontrol før upload.** Stop og giv Mads besked, hvis noget fejler:
   - Filen er gyldig JSON og har 4 stationer med 4 faser hver.
   - Titlen er "TRÆNING N AF 6".
   - Hver tekst passer til sin tegning (afsnit 4).
   - Siden åbner i en mobilbrowser uden fejl i konsollen, og A–D er lige store.
6. Upload, vent på GitHub Pages, og tjek den offentlige side, før der meldes succes.

### Tirsdag: finjustér onsdag
1. Læs mandagens feedback for den aktuelle uge.
2. Øvelserne A–D ændres **ikke** midt i ugen.
3. Robotten må:
   - ændre onsdagens standardvalg, fx vælge den øvelse der ikke blev nået mandag
   - tilføje et kort **"Tip fra mandag"** på de relevante stationer, fx "Fase 3 var for svær – start med passiv forsvarer i 2 min. ekstra"
4. Kontrol og upload som om søndagen.

### Ingen feedback
Så bygges ugen alligevel efter progressionsmodellen, og beskeden siger, at der ikke var feedback.

## 7. Arkiv
- `archive.html` viser alle afsluttede uger. Hver uge åbnes med den samme side via `index.html?uge=N`, der indlæser `data/trainingN.json`.
- Træning 1 (det gamle billede) bevares, som det er.

## 8. Upload
- Routinen committer og pusher selv. Prøv `main` først, ellers `claude/`-gren med pull request.
- Aldrig: upload af billedfiler i stykker, og aldrig "succes" før den offentlige side er tjekket (`https://mads-coder-1.github.io/u11-tr-ning/`).

## 9. Opgaver der endnu ikke er lavet
Routinen må gerne løse disse, når den har tid i en kørsel, én ad gangen:
1. Byg feedback-knapperne (afsnit 5), når `data/feedback.json` har en `formUrl`.
2. Læg træningen om til `data/current.json` + `index.html?uge=N`, og udvid arkivet (afsnit 3 og 7).
3. Slet de døde filer `assets/training2/pages/*.webp`, `assets/master/u11-master-v2.webp`, `assets/players/blue-player.png` og `assets/training2/u11-training2-master.webp`. Rør ikke `assets/master/u11-master-stable.webp`, som arkivet bruger.
