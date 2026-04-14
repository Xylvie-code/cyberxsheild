// ── TYPEWRITER ANIMATION ─────────────────────────────────────────────────────
(function () {
  const phrases = [
    "Your first line of defense against digital threats.",
    "AI-powered URL, SMS, and email scanning.",
    "Stay safe. Stay informed. Stay protected.",
    "Detect phishing before it reaches you.",
  ];
  const el = document.getElementById("typewriter");
  if (!el) return;

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  // Add blinking cursor
  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor";
  el.appendChild(cursorSpan);

  function type() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      el.appendChild(cursorSpan);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000); // pause before deleting
        return;
      }
      setTimeout(type, 50);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      el.appendChild(cursorSpan);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30);
    }
  }
  setTimeout(type, 800);
})();

// ── PARTICLE BACKGROUND ─────────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h;
  const particles = [];
  const count = 40;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(178, 34, 34, ${p.opacity})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Pre-fill Groq API key
window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('apiKeyInput');
  const stored = sessionStorage.getItem('csxApiKey');
  if(input) {
    input.value = stored || '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';
    sessionStorage.setItem('csxApiKey', input.value);
  }
});

// ── TAB SWITCHING ────────────────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ── THREAT COUNTER ────────────────────────────────────────────────────────────
let tick = 0;
setInterval(() => {
  tick++;
  const el = document.getElementById('threatCount');
  if(el) el.textContent = '⚠ THREATS: ' + (tick * 3 + 12847).toLocaleString();
}, 1000);

// ── SAMPLE DATA ───────────────────────────────────────────────────────────────
const SAMPLES = {
  url: ["https://google.com", "http://secure-bank-login.tk/verify", "paypal-update.xyz/confirm", "https://amazon.com/deals"],
  sms: [
    { label: "Sample 1", text: "Congratulations! You've won $5000. Click bit.ly/claim-now to collect your prize!" },
    { label: "Sample 2", text: "Your OTP is 847291. Never share this with anyone." },
    { label: "Sample 3", text: "URGENT: Your account has been suspended. Verify at paypa1-secure.com immediately." },
    { label: "Sample 4", text: "Hi, your Amazon package will arrive tomorrow. Track: amz.to/track123" },
  ],
  email: [
    { label: "Email 1", text: "From: security@paypa1.com\nSubject: URGENT: Your account will be suspended!\n\nDear Customer, We've detected suspicious activity. Click here immediately to verify: http://paypal-verify.tk/login\n\nFailure to verify within 24 hours will result in permanent account closure." },
    { label: "Email 2", text: "From: newsletter@amazon.com\nSubject: Your order has shipped!\n\nHi Jane, Your order #105-123 has shipped and will arrive by Tuesday. Track your package at amazon.com/track." },
    { label: "Email 3", text: "From: lottery@globalprize.co\nSubject: YOU'VE WON $2,000,000!!\n\nCongratulations! You have been selected as our lucky winner. To claim your prize, send us your bank details and pay $200 processing fee to prize@globalprize.co" },
  ]
};

// Populate sample buttons
['url'].forEach(tab => {
  const container = document.getElementById(tab + '-samples');
  if(!container) return;
  SAMPLES[tab].forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'sample-btn';
    btn.textContent = s;
    btn.onclick = () => { document.getElementById(tab + '-input').value = s; };
    container.appendChild(btn);
  });
  const inputEl = document.getElementById(tab + '-input');
  if(inputEl) {
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter') runScan(tab);
    });
  }
});
['sms', 'email'].forEach(tab => {
  const container = document.getElementById(tab + '-samples');
  if(!container) return;
  SAMPLES[tab].forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'sample-btn';
    btn.textContent = s.label;
    btn.onclick = () => { document.getElementById(tab + '-input').value = s.text; };
    container.appendChild(btn);
  });
});

// ── AI SYSTEM PROMPTS ─────────────────────────────────────────────────────────
const SYSTEMS = {

  url: `You are a website threat intelligence AI for CyberShield X. Given a URL, analyze it and return ONLY a JSON object (no markdown):
{"trustScore":<0-100, where 100=fully trusted, 0=dangerous>,"risk":"<Safe|Suspicious|Phishing|Malware|Spam>","httpsPresent":<true|false>,"urlLength":<character count>,"suspiciousKeywords":["<kw1>","<kw2>"],"domainAgeDays":<estimated age in days or null>,"phishingPatterns":["<pattern1>","<pattern2>"],"aiScore":<0-100>,"communityScore":<0-100>,"threatDbScore":<0-100>,"factors":["<factor1>","<factor2>","<factor3>"],"summary":"<2-sentence analysis>","category":"<E-commerce|Social Media|Finance|News|Phishing Site|Malware Host|Unknown>"}`,

  sms: `You are an SMS spam detection AI for CyberShield X. Analyze the SMS text and return ONLY a JSON object (no markdown):
{"spamProbability":<0-100>,"risk":"<Safe|Suspicious|Spam|Phishing|Scam>","threatType":"<None|Phishing|OTP Fraud|Prize Scam|Bank Fraud|Malware Link|Impersonation>","urgencyScore":<0-100>,"linkCount":<number of URLs found>,"suspiciousLinks":["<url1 if any>"],"triggerWords":["<word1>","<word2>"],"senderSpoofing":<true|false>,"factors":["<factor1>","<factor2>","<factor3>"],"summary":"<2-sentence analysis>"}`,

  email: `You are a Gmail phishing detection AI for CyberShield X. Analyze the email content and return ONLY a JSON object (no markdown):
{"phishingScore":<0-100>,"risk":"<Safe|Suspicious|Phishing|Scam|Malware>","senderSpoofing":<true|false>,"urgencyLanguage":<true|false>,"suspiciousLinks":<number>,"attachmentRisk":"<None|Low|Medium|High>","impersonating":"<brand/entity being impersonated or None>","aiScore":<0-100>,"communityScore":<0-100>,"threatDbScore":<0-100>,"triggerPhrases":["<phrase1>","<phrase2>"],"factors":["<factor1>","<factor2>","<factor3>"],"summary":"<2-sentence analysis>"}`
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function getRiskColor(level) {
  if (!level) return 'var(--text2)';
  const l = level.toLowerCase();
  if (l.includes('safe') || l.includes('legit')) return 'var(--green)';
  if (l.includes('suspicious') || l.includes('moderate')) return 'var(--yellow)';
  if (l.includes('phish')) return 'var(--orange)';
  return 'var(--red)';
}
function getRiskClass(level) {
  if (!level) return '';
  const l = level.toLowerCase();
  if (l.includes('safe') || l.includes('legit')) return 'risk-safe';
  if (l.includes('suspicious') || l.includes('moderate')) return 'risk-suspicious';
  if (l.includes('phish')) return 'risk-phishing';
  return 'risk-spam';
}

function buildRing(score, color) {
  const r = 42, cx = 52, cy = 52;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return `<div class="score-ring" style="width:104px;height:104px">
<svg width="104" height="104">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="8"
    stroke-dasharray="${filled} ${circ}" stroke-linecap="round"
    style="filter:drop-shadow(0 0 6px ${color})"/>
</svg>
<div class="score-number">
  <span class="score-val" style="color:${color}">${score}</span>
  <span class="score-label">SCORE</span>
</div>
</div>`;
}

function buildBar(label, val, color) {
  return `<div class="bar-row">
<span class="bar-label">${label}</span>
<div class="bar-track"><div class="bar-fill" style="width:${val}%;background:${color}"></div></div>
<span class="bar-val">${val}</span>
</div>`;
}

function chips(arr, cls) {
  return (arr||[]).map(t => `<span class="chip ${cls}">${t}</span>`).join('');
}

function factors(arr) {
  return (arr||[]).map(f => `<div class="factor-item"><span class="factor-icon">▸</span><span>${f}</span></div>`).join('');
}

// ── RENDER RESULTS ────────────────────────────────────────────────────────────
function renderPhone(r) {
  const color = getRiskColor(r.risk);
  const riskIcon = r.risk === 'Safe' ? '✓' : r.risk === 'Suspicious' ? '⚠' : '✗';
  return `
<div class="score-row">
  ${buildRing(r.score, color)}
  <div class="score-info">
    <div class="risk-badge ${getRiskClass(r.risk)}">${riskIcon} ${r.risk}</div>
    <div class="result-summary">${r.summary}</div>
    <div class="chip-row">
      <span class="chip chip-blue">${r.callerType}</span>
      ${r.fraudCategory !== 'None' ? `<span class="chip chip-red">${r.fraudCategory}</span>` : ''}
      ${r.region ? `<span class="chip chip-purple">${r.region}</span>` : ''}
      ${r.operatorHint ? `<span class="chip chip-blue">${r.operatorHint}</span>` : ''}
    </div>
  </div>
</div>
<div class="community-row">
  <div class="comm-stat"><div class="comm-val">${(r.communityReports || 0).toLocaleString()}</div><div class="comm-lbl">Reports</div></div>
  <div class="comm-stat"><div class="comm-val" style="color:var(--red)">${(r.spamReports || 0).toLocaleString()}</div><div class="comm-lbl">Spam Tags</div></div>
  <div class="comm-stat"><div class="comm-val" style="color:var(--green)">${100 - r.score}</div><div class="comm-lbl">Trust %</div></div>
</div>
<div class="divider"></div>
<div class="factors-title">// Detection Factors</div>
<div class="factor-list">${factors(r.factors || [])}</div>`;
}

function renderUrl(r) {
  const color = getRiskColor(r.risk);
  const riskIcon = r.risk === 'Safe' ? '✓' : '⚠';
  return `
<div class="score-row">
  ${buildRing(r.trustScore, color)}
  <div class="score-info">
    <div class="risk-badge ${getRiskClass(r.risk)}">${riskIcon} ${r.risk}</div>
    <div class="result-summary">${r.summary}</div>
    <div class="chip-row">
      <span class="chip ${r.httpsPresent ? 'chip-green' : 'chip-red'}">${r.httpsPresent ? '🔒 HTTPS' : '⚠ HTTP'}</span>
      <span class="chip chip-blue">${r.category}</span>
      ${r.urlLength ? `<span class="chip chip-purple">LEN: ${r.urlLength}</span>` : ''}
    </div>
  </div>
</div>
<div class="score-bars">
  ${buildBar('AI Analysis', r.aiScore, 'var(--accent)')}
  ${buildBar('Community', r.communityScore, 'var(--purple)')}
  ${buildBar('Threat DB', r.threatDbScore, 'var(--green)')}
</div>
${r.suspiciousKeywords?.length ? `<div class="divider"></div><div class="factors-title">// Suspicious Keywords</div><div class="chip-row">${chips(r.suspiciousKeywords, 'chip-red')}</div>` : ''}
${r.phishingPatterns?.length ? `<div class="divider"></div><div class="factors-title">// Phishing Patterns Detected</div><div class="factor-list">${(r.phishingPatterns||[]).map(p => `<div class="factor-item"><span class="factor-icon">⚡</span><span>${p}</span></div>`).join('')}</div>` : ''}
<div class="divider"></div>
<div class="factors-title">// Detection Factors</div>
<div class="factor-list">${factors(r.factors || [])}</div>`;
}

function renderSms(r) {
  const color = getRiskColor(r.risk);
  const riskIcon = r.risk === 'Safe' ? '✓' : '⚠';
  return `
<div class="score-row">
  ${buildRing(r.spamProbability, color)}
  <div class="score-info">
    <div class="risk-badge ${getRiskClass(r.risk)}">${riskIcon} ${r.risk}</div>
    <div class="result-summary">${r.summary}</div>
    <div class="chip-row">
      ${r.threatType !== 'None' ? `<span class="chip chip-red">${r.threatType}</span>` : ''}
      <span class="chip chip-purple">URGENCY: ${r.urgencyScore}%</span>
      <span class="chip chip-blue">LINKS: ${r.linkCount}</span>
      ${r.senderSpoofing ? '<span class="chip chip-red">⚠ SPOOFING</span>' : ''}
    </div>
  </div>
</div>
${r.triggerWords?.length ? `<div class="divider"></div><div class="factors-title">// Trigger Words Found</div><div class="chip-row">${chips(r.triggerWords, 'chip-yellow')}</div>` : ''}
${r.suspiciousLinks?.length ? `<div class="divider"></div><div class="factors-title">// Suspicious Links</div><div class="chip-row">${chips(r.suspiciousLinks, 'chip-red')}</div>` : ''}
<div class="divider"></div>
<div class="factors-title">// Detection Factors</div>
<div class="factor-list">${factors(r.factors || [])}</div>`;
}

function renderEmail(r) {
  const color = getRiskColor(r.risk);
  const riskIcon = r.risk === 'Safe' ? '✓' : '⚠';
  return `
<div class="score-row">
  ${buildRing(r.phishingScore, color)}
  <div class="score-info">
    <div class="risk-badge ${getRiskClass(r.risk)}">${riskIcon} ${r.risk}</div>
    <div class="result-summary">${r.summary}</div>
    <div class="chip-row">
      ${r.senderSpoofing ? '<span class="chip chip-red">⚠ SPOOFED SENDER</span>' : ''}
      ${r.urgencyLanguage ? '<span class="chip chip-yellow">⚡ URGENCY LANGUAGE</span>' : ''}
      <span class="chip ${r.attachmentRisk === 'None' ? 'chip-green' : 'chip-red'}">ATTACHMENT: ${r.attachmentRisk}</span>
      ${r.impersonating !== 'None' ? `<span class="chip chip-red">IMPERSONATING: ${r.impersonating}</span>` : ''}
    </div>
  </div>
</div>
<div class="score-bars" style="margin-top:16px">
  ${buildBar('AI Analysis', r.aiScore, 'var(--accent)')}
  ${buildBar('Community', r.communityScore, 'var(--purple)')}
  ${buildBar('Threat DB', r.threatDbScore, 'var(--green)')}
</div>
${r.triggerPhrases?.length ? `<div class="divider"></div><div class="factors-title">// Trigger Phrases Found</div><div class="chip-row" style="flex-wrap:wrap">${chips(r.triggerPhrases, 'chip-yellow')}</div>` : ''}
<div class="divider"></div>
<div class="factors-title">// Detection Factors</div>
<div class="factor-list">${factors(r.factors || [])}</div>`;
}

// ── API KEY MANAGEMENT ────────────────────────────────────────────────────────
function saveKey() {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (key) {
    sessionStorage.setItem('csxApiKey', key);
    const saved = document.getElementById('apiSaved');
    if(saved) {
      saved.classList.add('show');
      setTimeout(() => saved.classList.remove('show'), 2000);
    }
  }
}

// ── MAIN SCAN FUNCTION ────────────────────────────────────────────────────────
async function runScan(type) {
  const inputEl = document.getElementById(type + '-input');
  if(!inputEl) return;
  const val = inputEl.value.trim();
  if (!val) return;

  const inputKeyEl = document.getElementById('apiKeyInput');
  const apiKey = (inputKeyEl ? inputKeyEl.value.trim() : '') || sessionStorage.getItem('csxApiKey') || '';
  if (!apiKey) {
    const errEl = document.getElementById(type + '-error');
    if(errEl) {
      errEl.textContent = '⚠ Please enter your API key in the banner above.';
      errEl.classList.add('visible');
    }
    return;
  }

  const btn = document.getElementById(type + '-btn');
  const scanEl = document.getElementById(type + '-scanning');
  const errEl = document.getElementById(type + '-error');
  const resEl = document.getElementById(type + '-result');

  if(btn) {
    btn.disabled = true;
    btn.textContent = type === 'phone' ? 'SCANNING' : type === 'url' ? 'SCANNING' : type === 'sms' ? 'ANALYZING MESSAGE...' : 'SCANNING EMAIL...';
  }
  if(scanEl) scanEl.style.display = 'block';
  if(errEl) errEl.classList.remove('visible');
  if(resEl) resEl.classList.remove('visible');

  const userMessages = {
    url: `Analyze this URL: ${val}`,
    sms: `Analyze this SMS: "${val}"`,
    email: `Analyze this email:\n\n${val}`
  };

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: SYSTEMS[type] },
          { role: 'user', content: userMessages[type] }
        ]
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const clean = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    const renderers = { phone: renderPhone, url: renderUrl, sms: renderSms, email: renderEmail };
    if(resEl) {
      resEl.innerHTML = renderers[type](result);
      resEl.classList.add('visible');
    }
  } catch (e) {
    if(errEl) {
      errEl.textContent = '⚠ Analysis failed: ' + (e.message || 'Check your API key and try again.');
      errEl.classList.add('visible');
    }
  }

  if(scanEl) scanEl.style.display = 'none';
  if(btn) {
    btn.disabled = false;
    btn.textContent = type === 'url' ? 'SCAN URL' : type === 'sms' ? 'ANALYZE SMS' : 'DETECT PHISHING';
  }
}
