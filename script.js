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

// Note: card fade-in is handled in pure CSS (see styles.css) rather than
// JS + IntersectionObserver. The previous JS version set opacity:0 on load
// and relied on a scroll callback to restore it — reliable in some testing,
// but if that callback never fires for any reason, content stays invisible.
// CSS animations can't get stuck that way, so this is the safer choice for
// something as important as your services/pricing actually being visible.

/**
 * QUOTE FORM
 * This posts to the same Formspree endpoint (https://formspree.io/f/xaqyvgeb)
 * the original site used, so it's already live — no setup needed. It's a
 * plain HTML form post, so it works even with JavaScript disabled.
 * Submissions email your existing Formspree-connected inbox and redirect
 * to precision3dprints.com.au/thanks.html (the "_next" hidden field below).
 *
 * Heads up: because this endpoint is real, test submissions during preview
 * will send a real email — that's expected, just don't be surprised by a
 * "test" lead landing in your inbox.
 *
 * Want submissions to go somewhere else? Create your own form at
 * https://formspree.io and swap the endpoint in the <form action="..."> in
 * index.html.
 */
const form = document.getElementById('quote-form');

// Only show State/Postcode (and require them) when shipping is selected —
// pickup orders don't need an address.
const deliveryEl = document.getElementById('delivery');
const shippingMini = document.getElementById('shipping-mini');
const stateEl = document.getElementById('state');
const postcodeEl = document.getElementById('postcode');
function syncShippingFields() {
  const isShipping = deliveryEl.value.toLowerCase().includes('shipping');
  shippingMini.hidden = !isShipping;
  stateEl.required = isShipping;
  postcodeEl.required = isShipping;
}
deliveryEl.addEventListener('change', syncShippingFields);
syncShippingFields();

form.addEventListener('submit', () => {
  // Optional GA4 lead event — harmless no-op until gtag.js is actually added.
  try { gtag('event', 'generate_lead', { event_category: 'form', event_label: 'quote_request' }); } catch (e) {}
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  // No preventDefault — let the browser submit to Formspree normally.
});
