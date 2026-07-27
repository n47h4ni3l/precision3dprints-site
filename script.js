// Precision 3D Prints — site interactions

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// FAQ accordion
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    // close others
    document.querySelectorAll('.accordion-trigger').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', String(!expanded));
    panel.style.maxHeight = expanded ? null : panel.scrollHeight + 'px';
  });
});

// Scroll reveal for cards/sections
const revealTargets = document.querySelectorAll(
  '.service-card, .material-card, .price-card, .source-card, .review-card, .steps li'
);
if ('IntersectionObserver' in window) {
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => io.observe(el));
}

/**
 * QUOTE FORM
 * This front end is ready to submit, but it needs a form backend since this
 * is a static site with no server. Two easy free options:
 *
 * 1) Formspree (recommended, ~5 min setup):
 *    - Create a free account at https://formspree.io
 *    - Create a new form, copy the endpoint (looks like
 *      https://formspree.io/f/xxxxabcd)
 *    - Replace the `action="#"` on the <form id="quote-form"> in index.html
 *      with that endpoint, and change method stays "POST".
 *    - Delete or keep the JS below — Formspree works with a plain HTML
 *      form post, no JS required. Remove the preventDefault() call below
 *      once you've wired up the real endpoint, so the browser can submit
 *      to Formspree and follow its redirect.
 *
 * 2) Netlify Forms (if you host on Netlify instead of GitHub Pages):
 *    - Add `data-netlify="true"` and `name="quote"` to the <form> tag.
 *    - Netlify handles the rest automatically.
 *
 * Until a backend is connected, this script just shows a confirmation
 * message in place of the form so the page never appears "broken."
 */
const form = document.getElementById('quote-form');
form.addEventListener('submit', function (e) {
  const formIsWiredUp = form.getAttribute('action') !== '#';
  if (!formIsWiredUp) {
    e.preventDefault();
    form.innerHTML = `
      <div style="text-align:center; padding: 40px 0;">
        <p style="font-family:'Space Grotesk',sans-serif; font-size:1.2rem; color:var(--ink); margin-bottom:10px;">
          Quote form isn't connected yet
        </p>
        <p style="max-width:46ch; margin:0 auto;">
          This is a preview build. Connect Formspree or Netlify Forms (see the
          comment at the top of script.js) to start receiving real quote
          requests here — or email
          <a href="mailto:hello@precision3dprints.com.au" style="color:var(--accent);">hello@precision3dprints.com.au</a>
          in the meantime.
        </p>
      </div>`;
  }
  // If wired up, let the form submit normally to the configured endpoint.
});
