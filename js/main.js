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
  { from: 'Cycles', to: 'Missions', desc: 'No more annual, one-size-fits-all cycles. FeedFwd is organised around missions and paced to fit each person: one mission might run three months, another two years.' },
  { from: 'Reviewers', to: 'Advisors', desc: 'Feedback asks reviewers to pass judgement on past behaviour. FeedFwd asks stakeholders for advice on how to help someone succeed in the future.' },
  { from: 'Individuals + Teams', desc: 'Performance is a team sport, and missions aren’t just for one person. A whole team can share a mission and get advice together.' },
  { from: 'Anonymous', to: 'Public', desc: 'Anonymous feedback tends to get personal. FeedFwd focuses on the mission, not the person, and is transparent by default.' },
  { from: 'End-of-Cycle', to: 'Continuous', desc: '360 feedback usually lands at the end of the cycle. FeedFwd ensures advice arrives throughout the mission.' },
  { from: 'Manual', to: 'Automated', desc: 'Stop chasing people for input, and stop digging through dashboards for answers. FeedFwd handles reminders automatically and lets you query data in natural language.' },
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

// ---------------------------------------------------------------------------
// Signup modal — the app isn't live yet, so every signup CTA opens this
// instead of linking anywhere.
// ---------------------------------------------------------------------------

const signupModal = document.getElementById('signup-modal');
const signupTriggers = document.querySelectorAll('[data-signup-trigger]');
let lastFocusedBeforeModal = null;

function openSignupModal(e) {
  e.preventDefault();
  lastFocusedBeforeModal = document.activeElement;
  signupModal.hidden = false;
  document.body.classList.add('modal-open');
  signupModal.querySelector('.modal__close').focus();
}

function closeSignupModal() {
  signupModal.hidden = true;
  document.body.classList.remove('modal-open');
  lastFocusedBeforeModal?.focus();
}

signupTriggers.forEach((trigger) => {
  trigger.addEventListener('click', openSignupModal);
});

signupModal.querySelectorAll('[data-modal-close]').forEach((el) => {
  el.addEventListener('click', closeSignupModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !signupModal.hidden) closeSignupModal();
});

signupModal.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusable = signupModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});
