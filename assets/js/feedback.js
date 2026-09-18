/* Trænerfeedback: ét tryk fra 1 til 5 på hvert stationskort.
   Svarene sendes til Google Formularen i data/feedback.json. Filen er tom = knapperne vises ikke. */
(function () {
  const CSS = `
.fb{border-top:1px solid #d9e2ec;padding-top:12px;display:grid;gap:8px}
.fb h4{margin:0;font-size:12px;letter-spacing:1px;color:#5e7187;text-transform:uppercase}
.fbrow{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.fbrow button{border:2px solid #d9e2ec;background:#fff;color:#0d2a46;border-radius:11px;padding:12px 0;font-weight:900;font-size:17px;cursor:pointer;min-height:48px}
.fbrow button:hover{border-color:#1760c4}
.fbrow button[aria-pressed=true]{background:#1760c4;border-color:#1760c4;color:#fff}
.fbscale{display:flex;justify-content:space-between;font-size:11px;color:#5e7187;font-weight:700}
.fbnote{display:none;gap:6px}
.fbnote.on{display:flex}
.fbnote input{flex:1;border:1px solid #d9e2ec;border-radius:10px;padding:10px;font:inherit;min-width:0}
.fbnote button{border:0;background:#e9f1fc;color:#1760c4;border-radius:10px;padding:10px 12px;font-weight:800;cursor:pointer}
.fbtak{font-size:13px;font-weight:800;color:#15793a}`;

  const $ = s => document.querySelector(s);

  function dayLabel() {
    const t = document.querySelector('.tab[aria-selected="true"]');
    if (!t) return '';
    const c = t.cloneNode(true);
    const small = c.querySelector('small');
    if (small) small.remove();
    return c.textContent.trim();
  }
  function session() {
    const m = ($('#title')?.textContent || '').match(/\d+/);
    return m ? m[0] : '?';
  }

  function send(cfg, station, score, comment) {
    const data = new URLSearchParams();
    data.append(cfg.fields.station, station);
    data.append(cfg.fields.score, String(score));
    if (comment) data.append(cfg.fields.comment, comment);
    return fetch(cfg.formUrl, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data.toString()
    }).catch(() => {});
  }

  function build(cfg) {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    document.querySelectorAll('.station').forEach(card => {
      const L = card.dataset.letter;
      const box = document.createElement('div');
      box.className = 'fb';
      box.innerHTML = `<h4>Hvordan gik øvelsen?</h4>
        <div class="fbrow">${[1, 2, 3, 4, 5].map(n => `<button type="button" data-score="${n}" aria-pressed="false" aria-label="Giv ${n} ud af 5">${n}</button>`).join('')}</div>
        <div class="fbscale"><span>1 = virkede ikke</span><span>5 = super</span></div>
        <div class="fbnote"><input type="text" placeholder="Noget vi skal ændre? (valgfrit)" aria-label="Kommentar"><button type="button" data-send>Send</button></div>`;
      card.querySelector('.st-foot').appendChild(box);

      const row = box.querySelector('.fbrow');
      const note = box.querySelector('.fbnote');
      const input = box.querySelector('input');
      let score = null;

      row.addEventListener('click', e => {
        const b = e.target.closest('button[data-score]');
        if (!b) return;
        score = b.dataset.score;
        [...row.children].forEach(x => x.setAttribute('aria-pressed', x === b));
        send(cfg, `T${session()}-${L} · ${dayLabel()}`, score, '');
        note.classList.add('on');
        let tak = box.querySelector('.fbtak');
        if (!tak) { tak = document.createElement('div'); tak.className = 'fbtak'; box.appendChild(tak); }
        tak.textContent = 'Tak! ✓ Svaret er sendt.';
      });

      box.querySelector('[data-send]').addEventListener('click', () => {
        const txt = input.value.trim();
        if (!txt || !score) return;
        send(cfg, `T${session()}-${L} · ${dayLabel()}`, score, txt);
        input.value = '';
        note.classList.remove('on');
        box.querySelector('.fbtak').textContent = 'Tak! ✓ Kommentaren er sendt.';
      });
    });
  }

  function start() {
    fetch('data/feedback.json?v=' + Date.now(), { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : null)
      .then(cfg => {
        if (!cfg || !cfg.formUrl || !cfg.fields || !cfg.fields.station) return;
        const wait = setInterval(() => {
          if (document.querySelectorAll('.station .st-foot').length >= 1) { clearInterval(wait); build(cfg); }
        }, 200);
        setTimeout(() => clearInterval(wait), 15000);
      })
      .catch(() => {});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
