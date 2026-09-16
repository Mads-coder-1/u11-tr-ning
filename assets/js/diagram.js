/* U11 banetegninger – tegnes som SVG direkte i siden (ingen billedfiler). */
(function () {
  const W = 320, H = 214, TOP = 34, BOT = 202, WT = 236, WB = 306;
  const COL = {
    yellow: '#ffc928', red: '#e8412f', blue: '#2a78e4', orange: '#ff7a1a'
  };
  const TEAM = {
    blue: { shirt: '#1d5fcf', dark: '#123f8f', shorts: '#0b2545', socks: '#1d5fcf' },
    red: { shirt: '#e0352b', dark: '#a8231c', shorts: '#ffffff', socks: '#e0352b' },
    keeper: { shirt: '#f4c20d', dark: '#b88f00', shorts: '#1c1c1c', socks: '#f4c20d' },
    coach: { shirt: '#0b1f3a', dark: '#050f1f', shorts: '#0b1f3a', socks: '#0b1f3a' }
  };
  const SKIN = ['#f1c7a3', '#e6b48c', '#c98e62', '#8d5a3b'];
  const HAIR = ['#3b2616', '#6b4423', '#d9a441', '#1b1b1b', '#8a5a2b'];
  let uid = 0;

  const P = (u, v) => {
    const w = WT + (WB - WT) * v;
    return [W / 2 + (u - 0.5) * w, TOP + (BOT - TOP) * v];
  };
  const sc = v => 0.78 + 0.3 * v;
  const f = n => Math.round(n * 10) / 10;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function pitch(id) {
    const [x0, y0] = P(0, 0), [x1] = P(1, 0), [x2, y2] = P(1, 1), [x3] = P(0, 1);
    let s = `<defs><clipPath id="pc${id}"><polygon points="${x0},${y0} ${x1},${y0} ${x2},${y2} ${x3},${y2}"/></clipPath>
      <linearGradient id="gl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".16"/><stop offset=".6" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>`;
    s += `<polygon points="${x0 - 3},${y0 + 3} ${x1 + 3},${y0 + 3} ${x2 + 5},${y2 + 6} ${x3 - 5},${y2 + 6}" fill="#0b3d1c" opacity=".25"/>`;
    s += `<g clip-path="url(#pc${id})">`;
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = P(0, i / n), b = P(1, (i + 1) / n);
      s += `<rect x="0" y="${f(a[1])}" width="${W}" height="${f(b[1] - a[1] + 0.5)}" fill="${i % 2 ? '#3fa845' : '#4bb74f'}"/>`;
    }
    s += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#gl${id})"/></g>`;
    const q = [P(.025, .02), P(.975, .02), P(.975, .985), P(.025, .985)];
    s += `<polygon points="${q.map(p => p.map(f).join(',')).join(' ')}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.6"/>`;
    [[0, 0], [1, 0], [1, 1], [0, 1]].forEach(([u, v]) => { s += cone(u < .5 ? .025 : .975, v ? .985 : .02, 'orange', .8); });
    return s;
  }

  function cone(u, v, c, k = 1) {
    const [x, y] = P(u, v), s = sc(v) * k, col = COL[c] || c;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s * 10) / 10})">
      <ellipse cx="0" cy="0" rx="6.5" ry="2.4" fill="#000" opacity=".22"/>
      <path d="M-5.5 0 L-1.6 -11 Q0 -12.6 1.6 -11 L5.5 0 Z" fill="${col}"/>
      <path d="M-3.6 -5.2 L3.6 -5.2 L4.2 -3.6 L-4.2 -3.6 Z" fill="#fff" opacity=".85"/>
      <path d="M-5.5 0 L-1.6 -11 Q-.6 -11.8 0 -11.9 L-1.6 0 Z" fill="#000" opacity=".12"/></g>`;
  }

  function pole(u, v) {
    const [x, y] = P(u, v), s = sc(v);
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s * 10) / 10})">
      <ellipse cx="0" cy="0" rx="7" ry="2.6" fill="#000" opacity=".25"/>
      <rect x="-5.5" y="-3" width="11" height="3.5" rx="1.5" fill="#1b1b1b"/>
      <rect x="-1.6" y="-34" width="3.2" height="32" rx="1.4" fill="#ffc928"/>
      <rect x="-1.6" y="-26" width="3.2" height="5" fill="#1b1b1b"/><rect x="-1.6" y="-14" width="3.2" height="5" fill="#1b1b1b"/></g>`;
  }

  function gate(it) {
    const w = it.w || 0.13;
    const a = P(it.u - w / 2, it.v), b = P(it.u + w / 2, it.v);
    return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${COL[it.c]}" stroke-width="2.4" stroke-dasharray="3 2.4" opacity=".95"/>` +
      cone(it.u - w / 2, it.v, it.c) + cone(it.u + w / 2, it.v, it.c);
  }

  function goal(it) {
    const w = it.w || .3, hgt = it.small ? 17 : 27;
    const [xl, y] = P(it.u - w / 2, Math.max(it.v, .005)), [xr] = P(it.u + w / 2, it.v);
    const top = y - hgt, back = 7;
    let net = '';
    for (let x = xl + 5; x < xr - 1; x += 5) net += `M${f(x)} ${f(top)} L${f(x + (x - (xl + xr) / 2) * .05)} ${f(y - 1)} `;
    for (let yy = top + 5; yy < y; yy += 5) net += `M${f(xl)} ${f(yy)} L${f(xr)} ${f(yy)} `;
    return `<g><path d="M${f(xl)} ${f(y)} L${f(xl + 4)} ${f(top - back + hgt * .1)} L${f(xr - 4)} ${f(top - back + hgt * .1)} L${f(xr)} ${f(y)} Z" fill="#fff" opacity=".12"/>
      <rect x="${f(xl)}" y="${f(top)}" width="${f(xr - xl)}" height="${hgt}" fill="#ffffff" opacity=".22"/>
      <path d="${net}" stroke="#ffffff" stroke-width=".7" opacity=".8" fill="none"/>
      <path d="M${f(xl)} ${f(y + 1)} L${f(xl)} ${f(top)} L${f(xr)} ${f(top)} L${f(xr)} ${f(y + 1)}" fill="none" stroke="#fff" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M${f(xl)} ${f(y + 1)} L${f(xl)} ${f(top)} L${f(xr)} ${f(top)} L${f(xr)} ${f(y + 1)}" fill="none" stroke="#cfd8e3" stroke-width="1" stroke-linejoin="round" transform="translate(.8 .8)"/></g>`;
  }

  function hline(it) {
    const a = P(.025, it.v), b = P(.975, it.v);
    let s = `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#fff" stroke-width="${it.solid ? 2.2 : 1.6}" ${it.solid ? '' : 'stroke-dasharray="5 4"'} opacity=".9"/>`;
    if (it.label) s += `<text x="${f(b[0] - 6)}" y="${f(a[1] - 3)}" text-anchor="end" font-size="7.5" font-weight="800" fill="#fff" letter-spacing=".6" opacity=".95">${esc(it.label)}</text>`;
    return s;
  }

  function ballAt(x, y, s) {
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s * 10) / 10})"><ellipse cx="0" cy="3.2" rx="4" ry="1.4" fill="#000" opacity=".25"/>
      <circle r="3.6" fill="#fff" stroke="#1b1b1b" stroke-width=".7"/><path d="M0 -1.4 L1.4 -.3 L.9 1.3 L-.9 1.3 L-1.4 -.3 Z" fill="#1b1b1b"/></g>`;
  }

  function player(it, i) {
    const [x, y] = P(it.u, it.v), s = sc(it.v) * (it.t === 'coach' ? 1.08 : 1);
    const tm = TEAM[it.t === 'coach' ? 'coach' : it.team] || TEAM.blue;
    const skin = SKIN[(i * 7 + 1) % SKIN.length], hair = HAIR[(i * 3 + 2) % HAIR.length];
    const facing = it.u > .5 ? -1 : 1;
    let g = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s * 100) / 100})">
      <ellipse cx="0" cy="0" rx="8" ry="2.6" fill="#000" opacity=".25"/>
      <path d="M-3.6 -10 L-4.6 -1.2" stroke="${tm.socks}" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M3.4 -10 L5 -1.8" stroke="${tm.socks}" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M-3.6 -13 L-4 -8" stroke="${skin}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M3.4 -13 L3.8 -8" stroke="${skin}" stroke-width="2.6" stroke-linecap="round"/>
      <ellipse cx="-5.2" cy="-.6" rx="2.4" ry="1.2" fill="#111"/><ellipse cx="5.6" cy="-1.2" rx="2.4" ry="1.2" fill="#111"/>
      <path d="M-6 -18 L6 -18 L6.4 -11.5 Q0 -10 -6.4 -11.5 Z" fill="${tm.shorts}" stroke="#00000022" stroke-width=".5"/>
      <path d="M-6.4 -28 Q0 -30.5 6.4 -28 L6.2 -17.4 Q0 -16 -6.2 -17.4 Z" fill="${tm.shirt}"/>
      <path d="M-6.4 -28 L-10 -21.5 L-8 -20.2 L-5.6 -24" fill="${tm.shirt}"/>
      <path d="M6.4 -28 L10 -21.5 L8 -20.2 L5.6 -24" fill="${tm.shirt}"/>
      <circle cx="-9.2" cy="-19.6" r="1.4" fill="${skin}"/><circle cx="9.2" cy="-19.6" r="1.4" fill="${skin}"/>
      <path d="M1.5 -28.8 L6.4 -28 L6.2 -17.4 L2.4 -16.8 Z" fill="${tm.dark}" opacity=".45"/>
      <rect x="-1.6" y="-31.5" width="3.2" height="3" fill="${skin}"/>
      <circle cx="0" cy="-35" r="5" fill="${skin}"/>
      <path d="M-5.1 -35.6 Q-5 -41 0 -40.6 Q5 -41 5.2 -35.4 Q3 -38 -.5 -37.6 Q-3.6 -37.4 -5.1 -35.6 Z" fill="${it.t === 'coach' ? '#2a2a2a' : hair}"/>
      <circle cx="${1.8 * facing}" cy="-35" r=".7" fill="#1b1b1b"/>`;
    if (it.t === 'coach') g += `<path d="M-2.2 -27.6 L0 -22 L2.2 -27.6" stroke="#fff" stroke-width=".8" fill="none"/><circle cx="0" cy="-22" r="1" fill="#c9d3de"/>`;
    g += `</g>`;
    if (it.ball) g += ballAt(x + 7 * s * facing, y - 1, s);
    if (it.label) g += tag(x, y + 9 * s, it.label, it.team === 'red' ? '#b3261e' : '#0b1f3a', 6.5);
    if (it.say) g += bubble(x, y - 44 * s, it.say, it.u > .6 ? -1 : 1);
    return g;
  }

  function tag(x, y, text, bg = '#0b1f3a', fs = 7.5) {
    const w = text.length * fs * .62 + 10, h = fs + 6;
    x = Math.min(Math.max(x, w / 2 + 3), W - w / 2 - 3);
    return `<g><rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="${bg}" opacity=".92"/>
      <text x="${f(x)}" y="${f(y + fs * .36)}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="#fff" letter-spacing=".4">${esc(text)}</text></g>`;
  }

  function bubble(x, y, text, dir) {
    const fs = 10, w = text.length * fs * .66 + 14, h = 18;
    let bx = x + dir * (w / 2 + 4) - w / 2;
    bx = Math.min(Math.max(bx, 3), W - w - 3);
    const by = Math.max(y - h, 2);
    const tx = Math.min(Math.max(x, bx + 6), bx + w - 6);
    return `<g><path d="M${f(tx - 4)} ${f(by + h - 1)} L${f(x)} ${f(by + h + 7)} L${f(tx + 4)} ${f(by + h - 1)}" fill="#fff" stroke="#0b1f3a" stroke-width="1.2"/>
      <rect x="${f(bx)}" y="${f(by)}" width="${f(w)}" height="${h}" rx="7" fill="#fff" stroke="#0b1f3a" stroke-width="1.2"/>
      <path d="M${f(tx - 3.4)} ${f(by + h - 1.4)} L${f(tx + 3.4)} ${f(by + h - 1.4)}" stroke="#fff" stroke-width="2"/>
      <text x="${f(bx + w / 2)}" y="${f(by + 12.6)}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="#0b1f3a">${esc(text)}</text></g>`;
  }

  // Catmull-Rom gennem punkterne, samplet i banekoordinater og projiceret.
  function sample(pts) {
    if (pts.length < 3) {
      const out = [];
      for (let t = 0; t <= 1.0001; t += 1 / 24) out.push([pts[0][0] + (pts[1][0] - pts[0][0]) * t, pts[0][1] + (pts[1][1] - pts[0][1]) * t]);
      return out.map(p => P(p[0], p[1]));
    }
    const ps = [pts[0], ...pts, pts[pts.length - 1]], out = [];
    for (let i = 1; i < ps.length - 2; i++) {
      const [p0, p1, p2, p3] = [ps[i - 1], ps[i], ps[i + 1], ps[i + 2]];
      for (let k = 0; k < 16; k++) {
        const t = k / 16, t2 = t * t, t3 = t2 * t;
        const c = j => .5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
        out.push([c(0), c(1)]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out.map(p => P(p[0], p[1]));
  }

  function wavy(pts) {
    const out = [];
    let dist = 0;
    for (let i = 0; i < pts.length; i++) {
      if (i) dist += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, pts.length - 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      const fade = Math.min(1, (pts.length - 1 - i) / 4);
      const amp = 2.3 * Math.sin(dist / 3.2) * fade;
      out.push([pts[i][0] - dy / l * amp, pts[i][1] + dx / l * amp]);
    }
    return out;
  }

  function arrowHead(pts, color, size) {
    const b = pts[pts.length - 1];
    let a = pts[pts.length - 2], k = 2;
    while (Math.hypot(b[0] - a[0], b[1] - a[1]) < 4 && k < pts.length) a = pts[pts.length - ++k];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const p1 = [b[0] - size * Math.cos(ang - .45), b[1] - size * Math.sin(ang - .45)];
    const p2 = [b[0] - size * Math.cos(ang + .45), b[1] - size * Math.sin(ang + .45)];
    return `<path d="M${f(b[0])} ${f(b[1])} L${f(p1[0])} ${f(p1[1])} L${f(p2[0])} ${f(p2[1])} Z" fill="${color}"/>`;
  }

  function path(it) {
    let pts = sample(it.pts);
    const d = p => 'M' + p.map(q => f(q[0]) + ' ' + f(q[1])).join(' L');
    const op = it.alt ? ' opacity=".5"' : '';
    if (it.t === 'dribble') {
      const wp = wavy(pts.slice(0, -2)).concat(pts.slice(-2));
      return `<g${op}><path d="${d(wp)}" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
        <path d="${d(wp)}" fill="none" stroke="#0b1f3a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>${arrowHead(pts, '#0b1f3a', 7)}</g>`;
    }
    if (it.t === 'pass' || it.t === 'shot') {
      const col = it.t === 'shot' ? '#ffffff' : '#ffffff';
      const w = it.t === 'shot' ? 2.4 : 1.8;
      return `<g${op}><path d="${d(pts)}" fill="none" stroke="#0b1f3a" stroke-opacity=".35" stroke-width="${w + 1.6}" stroke-dasharray="${it.t === 'shot' ? '0' : '6 4'}"/>
        <path d="${d(pts)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-dasharray="${it.t === 'shot' ? '0' : '6 4'}" stroke-linecap="round"/>${arrowHead(pts, col, it.t === 'shot' ? 9 : 7.5)}</g>`;
    }
    // løb uden bold
    return `<g${op}><path d="${d(pts)}" fill="none" stroke="#ffe066" stroke-width="2" stroke-dasharray="1.5 3.2" stroke-linecap="round"/>${arrowHead(pts, '#ffe066', 7)}</g>`;
  }

  function render(diagram, opts = {}) {
    const id = ++uid;
    const items = diagram.items || [];
    const flat = [], people = [], over = [];
    items.forEach((it, i) => {
      if (['line'].includes(it.t)) flat.unshift([it, i]);
      else if (['dribble', 'pass', 'run', 'shot'].includes(it.t)) flat.push([it, i]);
      else if (it.t === 'tag') over.push([it, i]);
      else people.push([it, i]);
    });
    people.sort((a, b) => a[0].v - b[0].v);
    let s = `<svg class="pitch-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(opts.label || 'Banetegning')}" font-family="Inter, Arial, sans-serif">`;
    s += pitch(id);
    flat.forEach(([it]) => { s += it.t === 'line' ? hline(it) : path(it); });
    people.forEach(([it, i]) => {
      if (it.t === 'cone') s += cone(it.u, it.v, it.c);
      else if (it.t === 'pole') s += pole(it.u, it.v);
      else if (it.t === 'gate') s += gate(it);
      else if (it.t === 'goal') s += goal(it);
      else if (it.t === 'ball') { const [x, y] = P(it.u, it.v); s += ballAt(x, y, sc(it.v)); }
      else if (it.t === 'p' || it.t === 'coach') s += player(it, i);
    });
    over.forEach(([it]) => { const [x, y] = P(it.u, it.v); s += tag(x, y, it.text); });
    if (opts.step) s += `<g><circle cx="17" cy="17" r="11" fill="#0b1f3a"/><text x="17" y="21" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">${opts.step}</text></g>`;
    return s + '</svg>';
  }

  window.PitchDiagram = { render };
})();
