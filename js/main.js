// ---------------------------------------------------------------------------
// Hero video: loop just the first 8 seconds
// ---------------------------------------------------------------------------

const heroVideo = document.getElementById('hero-video');

if (heroVideo) {
  const loopEnd = 8;

  const tick = () => {
    if (heroVideo.currentTime >= loopEnd) heroVideo.currentTime = 0;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  heroVideo.play().catch(() => {});
}

// ---------------------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------------------

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------------------------------------------------
// Benefit cards ("Different by design" section)
// ---------------------------------------------------------------------------

const benefits = [
  { from: 'Cycles', to: 'Missions', desc: 'No more annual, one-size-fits-all cycles. FeedFwd is organised around missions and the objectives that define them.' },
  { from: 'Uniform', to: 'Personalized', desc: 'One person’s mission might run three months. Another’s, two years. FeedFwd lets you set a cadence that’s right for each person.' },
  { from: 'Feedback', to: 'Feedforward', desc: 'Feedback is a judgement on past performance. FeedFwd gives advice on how to reach what’s ahead.' },
  { from: 'Reviewers', to: 'Advisors', desc: 'Feedback asks reviewers to pass judgement on behaviour. FeedFwd asks stakeholders for advice on how to help someone succeed.' },
  { from: 'Individuals + Teams', desc: 'Performance is a team sport, and missions aren’t just for one person. A whole team can share a mission and get advice together.' },
  { from: 'Anonymous', to: 'Public', desc: 'Anonymous feedback tends to get personal. FeedFwd focuses on the mission, not the person, and is transparent by default.' },
  { from: 'End-of-Cycle', to: 'Continuous', desc: '360 feedback usually lands at the end of the cycle. FeedFwd ensures advice arrives throughout the mission.' },
  { from: 'Manual', to: 'Automated', desc: 'Stop chasing people for input. FeedFwd handles reminders and follow-ups automatically, so you don’t have to.' },
  { from: 'Dashboards', to: 'Agents', desc: 'No more scrolling through dashboards for answers. FeedFwd lets you query your team’s mission data in natural language.', tag: 'Org only' },
];

const benefitsGrid = document.getElementById('benefits-grid');

benefitsGrid.innerHTML = benefits.map((b) => `
  <div class="benefit-card">
    <div class="benefit-card__row">
      <span class="benefit-card__word">${b.from}</span>
      ${b.to ? `
        <span class="benefit-card__arrow">→</span>
        <span class="benefit-card__word">${b.to}</span>
      ` : ''}
    </div>
    <p class="benefit-card__desc">${b.desc}</p>
    ${b.tag ? `<span class="benefit-card__tag">${b.tag}</span>` : ''}
  </div>
`).join('');

// ---------------------------------------------------------------------------
// Pricing: annual / monthly billing toggle for the Org plan
// ---------------------------------------------------------------------------

const orgPriceEl = document.getElementById('org-price');
const orgBillingNoteEl = document.getElementById('org-billing-note');
const billingToggle = document.getElementById('billing-toggle');

let billing = 'annual';

function renderBilling() {
  const isAnnual = billing === 'annual';
  orgPriceEl.textContent = isAnnual ? '$4' : '$5';
  orgBillingNoteEl.textContent = isAnnual ? 'billed annually' : 'billed monthly';
  billingToggle.textContent = `switch to ${isAnnual ? 'monthly' : 'annual'}`;
}

billingToggle.addEventListener('click', (e) => {
  e.preventDefault();
  billing = billing === 'annual' ? 'monthly' : 'annual';
  renderBilling();
});

renderBilling();
