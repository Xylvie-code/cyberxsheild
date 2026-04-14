// ═══════════════════════════════════════════════════════════
// CyberShield X — Cyber Security Survey Module
// ═══════════════════════════════════════════════════════════

const SURVEY_QUESTIONS = [
  {
    q: "Someone claiming to be from your bank calls and asks for your OTP. What do you do?",
    options: [
      { text: "Share it — they said it's urgent", risk: 7, reason: "OTP sharing with callers" },
      { text: "Ask them to verify my identity first", risk: 3, reason: "OTP sharing with callers" },
      { text: "Hang up and call my bank directly", risk: 0, reason: null },
    ]
  },
  {
    q: "You find a useful app that's not on the official app store. Do you install it from a third-party website?",
    options: [
      { text: "Yes, if it looks legit", risk: 6, reason: "Installing apps from unknown sources" },
      { text: "Only if a friend recommended it", risk: 4, reason: "Installing apps from unknown sources" },
      { text: "No, I only use official app stores", risk: 0, reason: null },
    ]
  },
  {
    q: "You receive a text with a link saying you've won a prize. What do you do?",
    options: [
      { text: "Click it to check — might be real", risk: 7, reason: "Clicking unknown/suspicious links" },
      { text: "Google the sender first, then decide", risk: 2, reason: null },
      { text: "Delete it immediately", risk: 0, reason: null },
    ]
  },
  {
    q: "How many of your online accounts use the same password?",
    options: [
      { text: "Most of them", risk: 7, reason: "Password reuse across accounts" },
      { text: "A few share the same one", risk: 4, reason: "Password reuse across accounts" },
      { text: "Each account has a unique password", risk: 0, reason: null },
    ]
  },
  {
    q: "Does your phone have a screen lock (PIN, fingerprint, or Face ID)?",
    options: [
      { text: "No, it's faster without one", risk: 6, reason: "No screen lock on device" },
      { text: "Yes, a simple 4-digit PIN", risk: 2, reason: null },
      { text: "Yes, biometric + strong passcode", risk: 0, reason: null },
    ]
  },
  {
    q: "When an app asks for access to your contacts, camera, and location — do you check why?",
    options: [
      { text: "No, I just allow everything", risk: 6, reason: "Blindly granting app permissions" },
      { text: "Sometimes, if the request seems odd", risk: 3, reason: "Blindly granting app permissions" },
      { text: "Always — I deny unnecessary permissions", risk: 0, reason: null },
    ]
  },
  {
    q: "You're at a café. Do you connect to the free public Wi-Fi to check your bank balance?",
    options: [
      { text: "Yes, it's convenient", risk: 7, reason: "Banking on public Wi-Fi" },
      { text: "Yes, but I use a VPN", risk: 1, reason: null },
      { text: "No, I use mobile data for sensitive tasks", risk: 0, reason: null },
    ]
  },
  {
    q: "How quickly do you install software/OS updates when they become available?",
    options: [
      { text: "I keep postponing them", risk: 6, reason: "Delaying software updates" },
      { text: "Within a week or so", risk: 2, reason: null },
      { text: "As soon as they're available", risk: 0, reason: null },
    ]
  },
  {
    q: "An email from 'Netflix' says your payment failed and asks you to re-enter card details. What do you do?",
    options: [
      { text: "Click the link and update my card info", risk: 7, reason: "Falling for email phishing scams" },
      { text: "Check the sender's email address carefully", risk: 2, reason: null },
      { text: "Go directly to Netflix.com to check my account", risk: 0, reason: null },
    ]
  },
  {
    q: "Do you use two-factor authentication (2FA) on your important accounts?",
    options: [
      { text: "I don't know what that is", risk: 6, reason: "No two-factor authentication" },
      { text: "On some accounts, not all", risk: 3, reason: "No two-factor authentication" },
      { text: "Yes, on all important accounts", risk: 0, reason: null },
    ]
  },
  {
    q: "A friend sends you a strange link on social media with no context. What do you do?",
    options: [
      { text: "Click it — it's from a friend", risk: 6, reason: "Clicking unknown/suspicious links" },
      { text: "Ask them about it first before clicking", risk: 1, reason: null },
      { text: "Don't click — their account might be hacked", risk: 0, reason: null },
    ]
  },
  {
    q: "Where do you store your passwords?",
    options: [
      { text: "Written on a sticky note or notebook", risk: 5, reason: "Insecure password storage" },
      { text: "In my browser's auto-save feature", risk: 3, reason: "Insecure password storage" },
      { text: "In a dedicated password manager app", risk: 0, reason: null },
    ]
  },
  {
    q: "You receive an SMS saying your package is held at customs and you need to pay a small fee. What do you do?",
    options: [
      { text: "Pay the fee — I am expecting a package", risk: 7, reason: "Falling for SMS scams" },
      { text: "Check the tracking number on the official site", risk: 1, reason: null },
      { text: "Ignore it — I recognize it as a scam", risk: 0, reason: null },
    ]
  },
  {
    q: "Do you regularly back up your important data (photos, documents)?",
    options: [
      { text: "No, I haven't backed up in months", risk: 5, reason: "No regular data backups" },
      { text: "Occasionally, when I remember", risk: 3, reason: "No regular data backups" },
      { text: "Yes, automatic cloud or local backups", risk: 0, reason: null },
    ]
  },
  {
    q: "Someone on social media offers you a job with high pay and asks for your personal details upfront. What do you do?",
    options: [
      { text: "Send my details — it seems like a great opportunity", risk: 7, reason: "Sharing personal data with strangers online" },
      { text: "Research the company first", risk: 2, reason: null },
      { text: "Ignore it — legitimate offers don't work this way", risk: 0, reason: null },
    ]
  },
];

// Global state
let surveyCurrentQ = 0;
let surveyAnswers = [];
let surveyFinalScore = 0;
let surveyFinalStatus = '';
let surveyFinalStatusClass = '';
let surveyTopReasons = [];

function startSurvey() {
  surveyCurrentQ = 0;
  surveyAnswers = [];
  document.getElementById('survey-intro').style.display = 'none';
  document.getElementById('survey-result').style.display = 'none';
  document.getElementById('survey-question').style.display = 'block';
  renderSurveyQuestion();
}

function renderSurveyQuestion() {
  const total = SURVEY_QUESTIONS.length;
  const q = SURVEY_QUESTIONS[surveyCurrentQ];

  const pct = ((surveyCurrentQ) / total) * 100;
  document.getElementById('survey-progress-fill').style.width = pct + '%';
  document.getElementById('survey-progress-text').textContent = (surveyCurrentQ + 1) + ' / ' + total;

  document.getElementById('survey-q-text').textContent = q.q;

  const optContainer = document.getElementById('survey-options');
  optContainer.innerHTML = '';
  q.options.forEach(function(opt, idx) {
    const btn = document.createElement('button');
    btn.className = 'survey-opt';
    btn.textContent = opt.text;
    btn.addEventListener('click', function() { selectSurveyAnswer(idx); });
    optContainer.appendChild(btn);
  });
}

function selectSurveyAnswer(idx) {
  const q = SURVEY_QUESTIONS[surveyCurrentQ];
  const chosen = q.options[idx];

  surveyAnswers.push({
    question: q.q,
    answer: chosen.text,
    risk: chosen.risk,
    reason: chosen.reason,
  });

  var opts = document.querySelectorAll('.survey-opt');
  opts.forEach(function(o, i) {
    o.classList.remove('selected');
    if (i === idx) o.classList.add('selected');
    o.disabled = true;
  });

  setTimeout(function() {
    surveyCurrentQ++;
    if (surveyCurrentQ < SURVEY_QUESTIONS.length) {
      renderSurveyQuestion();
    } else {
      showSurveyResult();
    }
  }, 400);
}

function showSurveyResult() {
  document.getElementById('survey-question').style.display = 'none';

  // Calculate score
  var maxPossible = 0;
  for (var i = 0; i < SURVEY_QUESTIONS.length; i++) {
    var maxR = 0;
    for (var j = 0; j < SURVEY_QUESTIONS[i].options.length; j++) {
      if (SURVEY_QUESTIONS[i].options[j].risk > maxR) maxR = SURVEY_QUESTIONS[i].options[j].risk;
    }
    maxPossible += maxR;
  }
  var totalRisk = 0;
  for (var i = 0; i < surveyAnswers.length; i++) {
    totalRisk += surveyAnswers[i].risk;
  }
  surveyFinalScore = Math.round((totalRisk / maxPossible) * 100);

  // Classification
  if (surveyFinalScore <= 30) {
    surveyFinalStatus = 'SAFE';
    surveyFinalStatusClass = 'safe';
  } else if (surveyFinalScore <= 70) {
    surveyFinalStatus = 'AT RISK';
    surveyFinalStatusClass = 'warn';
  } else {
    surveyFinalStatus = 'HIGH RISK';
    surveyFinalStatusClass = 'danger';
  }

  // Top 3 reasons
  var risky = [];
  for (var i = 0; i < surveyAnswers.length; i++) {
    if (surveyAnswers[i].reason) risky.push(surveyAnswers[i]);
  }
  risky.sort(function(a, b) { return b.risk - a.risk; });
  var seen = {};
  surveyTopReasons = [];
  for (var i = 0; i < risky.length; i++) {
    if (!seen[risky[i].reason]) {
      seen[risky[i].reason] = true;
      surveyTopReasons.push(risky[i].reason);
      if (surveyTopReasons.length === 3) break;
    }
  }

  // Explanation
  var explanations = {
    safe: "Your digital habits are strong. You demonstrate good awareness of common cyber threats and take proactive steps to protect yourself.",
    warn: "You have some risky habits that could leave you vulnerable. Focus on the weak areas identified below to strengthen your security.",
    danger: "Your current digital habits put you at significant risk. Multiple areas need immediate attention. Review the findings below and take action."
  };

  // Color
  var colorMap = { safe: '#30D158', warn: '#FFD60A', danger: '#B22222' };
  var ringColor = colorMap[surveyFinalStatusClass];
  var dashLen = (surveyFinalScore / 100) * 314;

  // Status emoji
  var emojiMap = { safe: '✅', warn: '⚠️', danger: '🚨' };

  // Build reasons HTML
  var reasonsHTML = '';
  if (surveyTopReasons.length > 0) {
    reasonsHTML = '<div class="survey-reasons"><h4 class="survey-reasons-title">Key Risk Areas</h4>';
    for (var i = 0; i < surveyTopReasons.length; i++) {
      reasonsHTML += '<div class="survey-reason-item"><span class="survey-reason-num">' + (i + 1) + '</span><span>' + surveyTopReasons[i] + '</span></div>';
    }
    reasonsHTML += '</div>';
  }

  var resEl = document.getElementById('survey-result');
  resEl.style.display = 'block';
  resEl.innerHTML =
    '<div class="survey-result-card">' +
      '<div class="survey-score-ring" style="--survey-color:' + ringColor + '">' +
        '<svg width="120" height="120" viewBox="0 0 120 120">' +
          '<circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>' +
          '<circle cx="60" cy="60" r="50" fill="none" stroke="' + ringColor + '" stroke-width="8" ' +
            'stroke-dasharray="' + dashLen + ' 314" stroke-linecap="round" ' +
            'style="transform:rotate(-90deg);transform-origin:center;filter:drop-shadow(0 0 8px ' + ringColor + ');transition:stroke-dasharray 1s ease"/>' +
        '</svg>' +
        '<div class="survey-score-num"><span class="survey-score-val" style="color:' + ringColor + '">' + surveyFinalScore + '</span></div>' +
      '</div>' +
      '<div class="survey-status survey-status-' + surveyFinalStatusClass + '">' + emojiMap[surveyFinalStatusClass] + ' ' + surveyFinalStatus + '</div>' +
      '<p class="survey-explanation">' + explanations[surveyFinalStatusClass] + '</p>' +
      reasonsHTML +
      '<div class="survey-actions">' +
        '<button class="scan-btn scan-btn-full" id="survey-download-btn" onclick="downloadSurveyPDF()">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
          'Download Report' +
        '</button>' +
        '<button class="survey-retake-btn" onclick="startSurvey()">Retake Survey</button>' +
      '</div>' +
    '</div>';
}

// ── PDF DOWNLOAD ─────────────────────────────────────────────────────
function downloadSurveyPDF() {
  // Check if jsPDF loaded
  if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
    alert('PDF library is loading. Please wait a moment and try again.');
    return;
  }

  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF('p', 'mm', 'a4');

  var now = new Date();
  var dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // ── Page 1: Summary ──

  // Background
  doc.setFillColor(10, 10, 12);
  doc.rect(0, 0, 210, 297, 'F');

  // Top accent line
  doc.setFillColor(178, 34, 34);
  doc.rect(0, 0, 210, 3, 'F');

  // Title
  doc.setTextColor(245, 245, 247);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('Cyber Security Risk Report', 105, 30, { align: 'center' });

  // Subtitle
  doc.setTextColor(134, 134, 139);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('CyberShield X  |  Unified Threat Intelligence', 105, 40, { align: 'center' });

  // Date
  doc.setFontSize(10);
  doc.text('Report Date: ' + dateStr, 105, 48, { align: 'center' });

  // Divider
  doc.setDrawColor(40, 40, 45);
  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);

  // ── Score Section ──
  doc.setTextColor(134, 134, 139);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('RISK SCORE', 20, 70);

  // Score value
  doc.setFontSize(48);
  doc.setFont('helvetica', 'bold');
  if (surveyFinalScore <= 30) doc.setTextColor(48, 209, 88);
  else if (surveyFinalScore <= 70) doc.setTextColor(255, 214, 10);
  else doc.setTextColor(178, 34, 34);
  doc.text(String(surveyFinalScore), 20, 90);

  // Risk level
  doc.setFontSize(18);
  doc.text(surveyFinalStatus, 20, 102);

  // Score context
  doc.setTextColor(100, 100, 105);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Score Range: 0 (safest) to 100 (highest risk)', 20, 112);

  // Divider
  doc.setDrawColor(40, 40, 45);
  doc.line(20, 120, 190, 120);

  // ── Explanation ──
  doc.setTextColor(134, 134, 139);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ASSESSMENT', 20, 133);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 180, 185);

  var explanationText = '';
  if (surveyFinalScore <= 30) {
    explanationText = 'Your digital habits are strong. You demonstrate good awareness of common cyber threats and take proactive steps to protect yourself. Continue maintaining these security practices.';
  } else if (surveyFinalScore <= 70) {
    explanationText = 'You have some risky habits that could leave you vulnerable to common cyber attacks. Focus on improving the weak areas identified below to strengthen your overall security posture.';
  } else {
    explanationText = 'Your current digital habits put you at significant risk of cyber attacks and data breaches. Multiple areas require immediate attention. Review the key risk factors below and take corrective action.';
  }

  var expLines = doc.splitTextToSize(explanationText, 165);
  doc.text(expLines, 20, 143);

  // ── Key Risk Factors ──
  var riskY = 143 + expLines.length * 6 + 15;

  doc.setDrawColor(40, 40, 45);
  doc.line(20, riskY - 8, 190, riskY - 8);

  doc.setTextColor(134, 134, 139);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY RISK FACTORS', 20, riskY);
  riskY += 10;

  if (surveyTopReasons.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(48, 209, 88);
    doc.setFontSize(11);
    doc.text('No significant risk factors detected. Excellent work!', 20, riskY);
  } else {
    for (var i = 0; i < surveyTopReasons.length; i++) {
      // Number circle
      doc.setFillColor(178, 34, 34);
      doc.circle(26, riskY - 1.5, 4, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(String(i + 1), 26, riskY, { align: 'center' });

      // Reason text
      doc.setTextColor(200, 200, 205);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(surveyTopReasons[i], 34, riskY);
      riskY += 12;
    }
  }

  // ── Page 2: Detailed Responses ──
  doc.addPage();
  doc.setFillColor(10, 10, 12);
  doc.rect(0, 0, 210, 297, 'F');
  doc.setFillColor(178, 34, 34);
  doc.rect(0, 0, 210, 3, 'F');

  doc.setTextColor(245, 245, 247);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Responses', 20, 22);

  doc.setDrawColor(40, 40, 45);
  doc.line(20, 28, 190, 28);

  var y = 38;

  for (var i = 0; i < surveyAnswers.length; i++) {
    if (y > 265) {
      doc.addPage();
      doc.setFillColor(10, 10, 12);
      doc.rect(0, 0, 210, 297, 'F');
      doc.setFillColor(178, 34, 34);
      doc.rect(0, 0, 210, 3, 'F');
      y = 20;
    }

    // Question number
    doc.setTextColor(178, 34, 34);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Q' + (i + 1), 20, y);

    // Question text
    doc.setTextColor(200, 200, 205);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    var qLines = doc.splitTextToSize(surveyAnswers[i].question, 155);
    doc.text(qLines, 30, y);
    y += qLines.length * 5;

    // Answer
    if (surveyAnswers[i].risk === 0) doc.setTextColor(48, 209, 88);
    else if (surveyAnswers[i].risk <= 3) doc.setTextColor(255, 214, 10);
    else doc.setTextColor(178, 34, 34);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    var aLines = doc.splitTextToSize('> ' + surveyAnswers[i].answer, 155);
    doc.text(aLines, 30, y + 1);
    y += aLines.length * 5 + 10;
  }

  // Footer
  doc.setTextColor(60, 60, 65);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Generated by CyberShield X  |  For educational purposes only  |  ' + dateStr, 105, 290, { align: 'center' });

  // Save
  doc.save('CyberShield_X_Report.pdf');
}
