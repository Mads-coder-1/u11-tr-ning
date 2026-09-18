/* U11 træningsside – alt (kort, detaljer, oplæsning) bygges fra data/trainingN.json.
   Aktuel uge peges ud af data/current.json, eller af ?uge=N i adressen (bruges af arkivet). */
(function () {
  const $ = id => document.getElementById(id);
  const LETTERS = ['A', 'B', 'C', 'D'];
  let STORE = 'u11-t-plan';
  let DATA = null, day = null, mode = 'day', plan = {};

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(STORE) || 'null'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(STORE, JSON.stringify(v)); } catch (e) { /* ingen lagring */ } }
  };

  const SILHOUETTE = `<svg viewBox="0 0 76 76" aria-hidden="true"><rect width="76" height="76" fill="#c9d8ec"/>
    <circle cx="38" cy="29" r="14" fill="#6f87a6"/>
    <path d="M10 76c2-17 13-26 28-26s26 9 28 26z" fill="#0b2d5c"/>
    <path d="M31 51l7 10 7-10" fill="none" stroke="#fff" stroke-width="2"/>
    <text x="38" y="72" text-anchor="middle" font-size="7" font-weight="800" fill="#ffc928" font-family="Arial">TRÆNER</text></svg>`;
  const WHISTLE = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="14" r="6" fill="#fff"/><path d="M13 9h9v4h-7" fill="#fff"/><circle cx="9" cy="14" r="2" fill="#061d3d"/></svg>`;

  function defaultDay() {
    const d = new Date().getDay(); // 0 søn … 6 lør
    return (d === 0 || d === 1 || d === 2) ? 'man' : 'ons';
  }

  function loadPlan() {
    STORE = `u11-t${DATA.session}-plan`;
    plan = {};
    Object.keys(DATA.days).forEach(k => { plan[k] = DATA.days[k].default.slice(); });
    const saved = store.get();
    if (saved) Object.keys(plan).forEach(k => { if (Array.isArray(saved[k])) plan[k] = saved[k].filter(x => LETTERS.includes(x)); });
    const h = new URLSearchParams(location.hash.slice(1));
    let fromLink = false;
    Object.keys(plan).forEach(k => {
      if (h.has(k)) { plan[k] = h.get(k).toUpperCase().split('').filter(x => LETTERS.includes(x)); fromLink = true; }
    });
    day = h.get('dag') && DATA.days[h.get('dag')] ? h.get('dag') : defaultDay();
    if (fromLink) store.set(plan);
  }

  function renderStatic() {
    $('title').textContent = `TRÆNING ${DATA.session} AF ${DATA.sessionTotal}`;
    $('focus').textContent = DATA.focus;
    document.title = `${DATA.team} Træning · Træning ${DATA.session} af ${DATA.sessionTotal}`;
    $('goals').innerHTML = DATA.goals.map(g => `<div class="goal"><span class="check">✓</span>${esc(g)}</div>`).join('');
    $('coaches').innerHTML = DATA.coaches.map(c => `
      <div class="coach">
        <div class="avatar">${c.photo ? `<img src="${esc(c.photo)}" alt="${esc(c.name)}">` : SILHOUETTE}</div>
        <div><div class="rl">Træner</div><div class="nm">${esc(c.name)}</div></div>
        <span class="daychip ${c.day === 'Onsdag' ? 'ons' : ''}">${esc(c.day)}</span>
      </div>`).join('');
    $('legend').innerHTML = `
      <span><svg width="30" height="10"><path d="M1 5 q3.5 -4 7 0 t7 0 t7 0" stroke="#0b1f3a" stroke-width="1.8" fill="none"/><path d="M22 1 l7 4 -7 4z" fill="#0b1f3a"/></svg>Dribling</span>
      <span><svg width="30" height="10"><rect width="30" height="10" rx="3" fill="#43ad4a"/><path d="M2 5 H22" stroke="#fff" stroke-width="1.8" stroke-dasharray="4 3"/><path d="M22 1.5 l6 3.5 -6 3.5z" fill="#fff"/></svg>Aflevering/skud</span>
      <span><svg width="30" height="10"><rect width="30" height="10" rx="3" fill="#43ad4a"/><path d="M2 5 H22" stroke="#ffe066" stroke-width="2" stroke-dasharray="1.5 3" stroke-linecap="round"/><path d="M22 1.5 l6 3.5 -6 3.5z" fill="#ffe066"/></svg>Løb uden bold</span>`;

    $('stations').innerHTML = LETTERS.map(L => {
      const s = DATA.stations[L];
      return `<article class="station" id="station-${L}" data-letter="${L}">
        <button class="st-head" type="button" data-open="${L}" aria-label="Detaljer for station ${L}">
          <span class="st-letter">${L}</span>
          <span>
            <span class="st-kicker">STATION ${L} · 20 MIN.</span>
            <span class="st-name" style="display:block">${esc(s.name)}</span>
            <span class="st-purpose" style="display:block">${esc(s.purpose)}</span>
            <span class="st-days" id="days-${L}"></span>
          </span>
        </button>
        <div class="st-meta">
          <div><b>Bane</b>${esc(s.pitch)}</div>
          <div><b>Spillere</b>${esc(s.players)}</div>
          <div><b>Progression</b>4 faser · 20 min.</div>
        </div>
        <div class="phases">${s.phases.map((p, i) => `
          <section class="phase">
            <div class="ph-top"><span class="time">${esc(p.time)}</span><span class="ph-title">${esc(p.title)}</span></div>
            ${window.PitchDiagram.render(p.diagram, { step: i + 1, label: `Station ${L}, fase ${i + 1}: ${p.title}` })}
            <p class="ph-text">${esc(p.text)}</p>
            <div class="ph-focus"><b>Fokus:</b> ${esc(p.focus)}</div>
          </section>`).join('')}
        </div>
        <div class="st-foot">
          <div class="coachbox"><span class="whistle">${WHISTLE}</span><div><h4>COACHINGPUNKTER</h4><ul>${s.coaching.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div></div>
          <div class="st-btns">
            <button class="btn light" type="button" data-open="${L}">Opstilling &amp; detaljer</button>
            <button class="btn light" type="button" data-read="${L}">🔊 Læs station ${L} op</button>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  function renderPlan() {
    $('tabs').innerHTML = Object.entries(DATA.days).map(([k, d]) =>
      `<button class="tab" role="tab" type="button" data-day="${k}" aria-selected="${k === day}">${esc(d.label)}<small>${esc(d.coaches)}</small></button>`).join('');
    const sel = plan[day];
    $('picks').innerHTML = LETTERS.map(L => {
      const on = sel.includes(L);
      const nr = on ? sel.indexOf(L) + 1 : '';
      return `<button class="pick" type="button" data-pick="${L}" aria-pressed="${on}">
        <span class="lt">${L}</span>
        <span class="tx">${esc(DATA.stations[L].name)}<small>${on ? `Nr. ${nr} i rækkefølgen · 20 min.` : 'Tryk for at vælge'}</small></span>
        <span class="tick">${on ? '✓' : ''}</span></button>`;
    }).join('');
    const d = DATA.days[day];
    $('flow').innerHTML = sel.length
      ? `${esc(d.label)}: ${sel.join(' → ')} <span>· ${sel.length * 20} min. stationer</span>`
      : `<span>Vælg mindst én øvelse til ${esc(d.label.toLowerCase())}</span>`;
    LETTERS.forEach(L => {
      const tags = Object.entries(plan).filter(([, v]) => v.includes(L)).map(([k]) => `<span>${esc(DATA.days[k].label)}</span>`).join('');
      $('days-' + L).innerHTML = tags;
    });
    $('showDay').textContent = `${d.label}s øvelser`;
    $('showDay').setAttribute('aria-pressed', mode === 'day');
    $('showAll').setAttribute('aria-pressed', mode === 'all');
    const order = mode === 'day' && sel.length ? sel.concat(LETTERS.filter(x => !sel.includes(x))) : LETTERS;
    order.forEach(L => {
      const el = $('station-' + L);
      $('stations').appendChild(el);
      el.hidden = mode === 'day' && sel.length > 0 && !sel.includes(L);
    });
    equalize();
    history.replaceState(null, '', `#dag=${day}&` + Object.entries(plan).map(([k, v]) => `${k}=${v.join('')}`).join('&'));
  }

  // Alle fire kort får samme proportioner: fase n er lige høj på tværs af A–D
  function equalize() {
    const cards = LETTERS.map(L => $('station-' + L));
    const hidden = cards.map(c => c.hidden);
    cards.forEach(c => { c.hidden = false; });
    const groups = [];
    cards.forEach(c => {
      c.querySelectorAll('.phase').forEach((ph, i) => (groups[i] = groups[i] || []).push(ph));
      (groups.head = groups.head || []).push(c.querySelector('.st-head'));
      (groups.foot = groups.foot || []).push(c.querySelector('.coachbox'));
      (groups.meta = groups.meta || []).push(c.querySelector('.st-meta'));
    });
    const all = [...groups, groups.head, groups.foot, groups.meta];
    all.forEach(g => g.forEach(el => { el.style.minHeight = ''; }));
    all.forEach(g => { const m = Math.max(...g.map(el => el.offsetHeight)); g.forEach(el => { el.style.minHeight = m + 'px'; }); });
    cards.forEach((c, i) => { c.hidden = hidden[i]; });
  }
  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => DATA && equalize(), 150); });

  // Sheet
  function openSheet(L) {
    const s = DATA.stations[L];
    $('sh-title').textContent = `STATION ${L} · ${s.name}`;
    const subject = encodeURIComponent(`U11 feedback · Træning ${DATA.session} · Station ${L} · ${s.name}`);
    const body = encodeURIComponent(`Station ${L}: ${s.name}\nFase/minutter: \n\nHvad virkede?\n\nHvad skal ændres?\n`);
    $('sh-body').innerHTML = `
      <p style="margin-top:0"><b>Formål:</b> ${esc(s.purpose)}</p>
      <h3>OPSTILLING</h3><p>${esc(s.setup)}</p>
      <p><b>Bane:</b> ${esc(s.pitch)} · <b>Spillere:</b> ${esc(s.players)}<br><b>Udstyr:</b> ${esc(s.gear)}</p>
      <h3>PROGRESSION · 20 MIN.</h3>
      <div class="tl">${s.phases.map((p, i) => `<div><span class="time">${esc(p.time)}</span><span><b>${i + 1}. ${esc(p.title)}</b><br>${esc(p.text)}<br><i>Fokus: ${esc(p.focus)}</i></span></div>`).join('')}</div>
      <h3>COACHINGPUNKTER</h3><ul>${s.coaching.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      <div class="st-btns" style="margin-top:14px">
        <button class="btn primary" type="button" data-read="${L}">🔊 Læs station ${L} op</button>
        <a class="btn light" href="mailto:mail@madsmnielsen.dk?subject=${subject}&body=${body}">Giv feedback</a>
      </div>`;
    $('sheet').classList.add('open');
    $('sheet').setAttribute('aria-hidden', 'false');
    $('backdrop').classList.add('on');
  }
  function closeSheet() {
    $('sheet').classList.remove('open');
    $('sheet').setAttribute('aria-hidden', 'true');
    $('backdrop').classList.remove('on');
  }

  // Oplæsning – teksten bygges fra samme data som kortene
  const spokenTime = t => t.replace('–', ' til ').replace('min.', 'minutter');
  function stationSpeech(L) {
    const s = DATA.stations[L];
    const parts = [`Station ${L}: ${s.name}.`, `Formål: ${s.purpose}`, `Opstilling: ${s.setup}`];
    s.phases.forEach((p, i) => parts.push(`Fase ${i + 1}, ${spokenTime(p.time)}: ${p.title}. ${p.text} Fokus: ${p.focus}`));
    parts.push(`Coachingpunkter: ${s.coaching.join('. ')}.`);
    return parts;
  }
  function daySpeech() {
    const d = DATA.days[day], sel = plan[day];
    const parts = [`${DATA.team}, træning ${DATA.session} af ${DATA.sessionTotal}. Fokus: ${DATA.focus}.`,
      `${d.label} med ${d.coaches.replace('&', 'og')}.`];
    if (!sel.length) parts.push('Der er ikke valgt nogen øvelser endnu.');
    else parts.push(`Vi laver ${sel.length === 1 ? 'station ' + sel[0] : 'stationerne ' + sel.slice(0, -1).join(', ') + ' og ' + sel[sel.length - 1]}, 20 minutter hver.`);
    sel.forEach(L => parts.push(...stationSpeech(L)));
    return parts;
  }
  function speak(parts, label) {
    if (!('speechSynthesis' in window)) { $('status').textContent = 'Din browser understøtter ikke oplæsning.'; return; }
    speechSynthesis.cancel();
    const voice = speechSynthesis.getVoices().find(v => /^da/i.test(v.lang));
    let i = 0;
    const next = () => {
      if (i >= parts.length) { $('status').textContent = 'Oplæsningen er færdig.'; return; }
      const u = new SpeechSynthesisUtterance(parts[i++]);
      u.lang = 'da-DK'; if (voice) u.voice = voice; u.rate = .95;
      u.onend = next;
      u.onerror = e => { if (e.error !== 'interrupted' && e.error !== 'canceled') $('status').textContent = 'Oplæsningen blev afbrudt.'; };
      speechSynthesis.speak(u);
    };
    $('status').textContent = `Læser op: ${label}`;
    next();
  }
  function stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    $('status').textContent = 'Oplæsningen er stoppet.';
  }

  async function share() {
    const url = location.href;
    const d = DATA.days[day];
    const text = `U11 ${d.label}: ${plan[day].map(L => `${L} – ${DATA.stations[L].name}`).join(', ')}`;
    try {
      if (navigator.share) { await navigator.share({ title: 'U11 træningsplan', text, url }); return; }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      $('status').textContent = 'Link til planen er kopieret – sæt det ind i trænergruppen.';
    } catch (e) { /* brugeren annullerede */ }
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-day],[data-pick],[data-open],[data-read]');
    if (!t) return;
    if (t.dataset.day) { day = t.dataset.day; renderPlan(); }
    else if (t.dataset.pick) {
      const L = t.dataset.pick, sel = plan[day];
      plan[day] = sel.includes(L) ? sel.filter(x => x !== L) : sel.concat(L);
      store.set(plan); renderPlan();
    }
    else if (t.dataset.open) openSheet(t.dataset.open);
    else if (t.dataset.read) speak(stationSpeech(t.dataset.read), `Station ${t.dataset.read}`);
  });
  $('readBtn').onclick = () => { if (DATA) speak(daySpeech(), `${DATA.days[day].label}s træning`); };
  $('stopBtn').onclick = stop;
  $('closeBtn').onclick = closeSheet;
  $('backdrop').onclick = closeSheet;
  $('shareBtn').onclick = share;
  $('showDay').onclick = () => { mode = 'day'; renderPlan(); };
  $('showAll').onclick = () => { mode = 'all'; renderPlan(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
  if ('speechSynthesis' in window) speechSynthesis.getVoices();

  function trainingFile() {
    const uge = new URLSearchParams(location.search).get('uge');
    if (uge && /^\d+$/.test(uge)) return Promise.resolve(`data/training${uge}.json`);
    return fetch('data/current.json', { cache: 'no-cache' })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(c => `data/${c.file}`);
  }

  trainingFile()
    .then(file => fetch(`${file}?v=20260918`, { cache: 'no-cache' }))
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(d => {
      DATA = d; loadPlan(); renderStatic(); renderPlan();
      $('status').textContent = 'Vælg dag og øvelser – oplæsningen følger dit valg.';
    })
    .catch(() => { $('status').textContent = 'Træningen kunne ikke indlæses. Prøv at genindlæse siden.'; });
})();
