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
  { from: 'Reviewers', to: 'Advisors', desc: 'The people around your team member help them succeed, not just rate their behaviour.' },
  { from: 'End-of-cycle', to: 'Continuous', desc: 'Input arrives throughout the mission, while it can still help, not stockpiled for one review at the end.' },
  { from: 'Manual', to: 'Automated', desc: 'No chasing people for input. Reminders and follow-ups happen automatically.' },
  { from: 'Reviews', to: 'Advice', desc: 'Your team gets input on how to hit their goal, not a scorecard on their last six months.' },
  { from: 'Cycles', to: 'Missions', desc: 'No fixed quarterly or annual window. Input follows how long the goal actually takes.' },
  { from: 'Dashboards', to: 'Agents', desc: 'Query your team’s mission data directly instead of scrolling through a dashboard.', tag: 'Org only' },
];

const benefitsGrid = document.getElementById('benefits-grid');

benefitsGrid.innerHTML = benefits.map((b) => `
  <div class="benefit-card">
    <div class="benefit-card__row">
      <span class="benefit-card__word">${b.from}</span>
      <span class="benefit-card__arrow">→</span>
      <span class="benefit-card__word">${b.to}</span>
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
