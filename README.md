# Precision 3D Prints — website

A static site (plain HTML/CSS/JS, no build step) redesigned to replace the
current precision3dprints.com.au front end.

## Files

- `index.html` — all page content
- `styles.css` — styling
- `script.js` — nav menu, FAQ accordion, scroll-in animation, quote form handling
- `CNAME` — tells GitHub Pages to serve this at your custom domain

## 1. Put this on GitHub

1. Go to https://github.com/new and create a new repository (e.g. `precision3dprints-site`). Keep it **Public** (required for free GitHub Pages).
2. On your computer, unzip the files you downloaded from this chat.
3. Upload them: on the new repo's page, click **"uploading an existing file"**, drag in all files (`index.html`, `styles.css`, `script.js`, `CNAME`, `README.md`), and commit.

   *(If you're comfortable with git instead: `git init`, `git add .`, `git commit -m "New site"`, `git remote add origin <your repo url>`, `git push -u origin main`.)*

## 2. Turn on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. GitHub will give you a URL like `https://yourusername.github.io/precision3dprints-site/` — wait a minute and check it loads.

## 3. Point your real domain at it

You already own `precision3dprints.com.au`. To make it serve this new site:

1. In the same **Settings → Pages** screen, under **Custom domain**, enter
   `precision3dprints.com.au` and save. (This matches the included `CNAME` file — leave that file in the repo, GitHub Pages needs it.)
2. In your domain's DNS settings (wherever you registered/manage
   precision3dprints.com.au — e.g. VentraIP, Crazy Domains, GoDaddy, Cloudflare):
   - Add an **A record** for the root domain (`@`) pointing to each of GitHub's four IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add a **CNAME record** for `www` pointing to `yourusername.github.io`.
3. DNS changes can take a few hours to propagate. Once it does, tick **"Enforce HTTPS"** back in Settings → Pages.

## 4. The quote form, uploads and reviews are already live

Once you sent over your original `index.html`, I pulled your real, working
setup into this rebuild instead of using placeholders:

- **Quote form** posts to your existing Formspree endpoint
  (`formspree.io/f/xaqyvgeb`), with the same field names, the same spam
  honeypot, and the same redirect to `thanks.html` (included in this
  folder, restyled to match). Submissions land in whatever inbox your
  Formspree account already sends to — nothing to set up.
- **File uploads** use your existing Dropbox file-request link. It's now
  linked from the nav, hero, "how it works," pricing, and the form itself,
  same as before.
- **Reviews** use your real, already-configured Elfsight widget, so it
  shows your actual Google/Facebook reviews automatically and stays current
  — no fake testimonials, nothing to maintain.

One thing to know: because the Formspree endpoint is real, clicking
"Get a fast quote" while previewing — even on a `github.io` URL or a
Netlify Drop link — sends a real email to your sales inbox. That's normal,
just don't be surprised by a "test" lead showing up while you're checking
the site over.

If you'd rather submissions go elsewhere, create a new form at
[formspree.io](https://formspree.io) and swap the endpoint in the
`<form action="...">` in `index.html` (and update `thanks.html`'s links if
needed).

## 5. Real logo, favicon and hero photo — now in

Your actual brand files are wired in under `assets/`:

- `logo-mark.png` (transparent) in the header and footer
- `favicon.png` as the real browser tab icon
- `banner.png` as the social-share preview image (Open Graph tags in `<head>`)
- `logo-print.jpg` — your photo of the logo printed as a physical two-tone
  piece — is now the hero image, cropped in a bit to keep the desk clutter
  out of frame.

On your "I've always wanted my logo to look like that photo" comment: I
can't generate a true photorealistic 3D-plastic render of the logo — I
don't have a 3D rendering engine (something like Blender) available here,
so anything I produced flat would just be a stylized approximation, not a
real match to that lighting and material. What I've done instead is put
the actual photo front and center in the hero — since that photo already
is your logo, physically realized, it does more for the "we really print
things" impression than any illustration could. If you'd like, I can also
take a pass at a stylized "chunky/extruded" treatment of the flat wordmark
(CSS bevels and shadows nodding at the printed look) as a smaller design
accent elsewhere on the site — say the word and I'll mock one up.

## 6. Optional: connect real analytics

The form still fires a `gtag('event', 'generate_lead', …)` call on submit,
same as your original — but neither site actually loads Google Analytics,
so right now it's a harmless no-op. If you have a GA4 Measurement ID, send
it over and I'll wire in the real tracking snippet so that event actually
gets recorded.
