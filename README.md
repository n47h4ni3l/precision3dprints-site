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

## 4. Connect the quote form

This is a static site, so the form needs a small free service to actually
receive submissions and email them to you — there's no server to write the
code for. Full instructions are in the comment block at the top of
`script.js`. Quickest option:

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a form, copy the endpoint URL it gives you (`https://formspree.io/f/xxxxxxxx`).
3. In `index.html`, find `<form id="quote-form" class="quote-form" action="#" method="POST">` and replace `action="#"` with your Formspree URL.
4. In `script.js`, delete the `e.preventDefault();` line inside the form's submit handler (search for `QUOTE FORM` in that file — the comment there explains it) so the real submission goes through.

Until this is connected, the form shows a friendly placeholder message
instead of failing silently, so the site won't look broken to visitors.

## 5. Swap in real photos

The hero uses a technical line-drawing rather than a stock photo. For the
biggest lift to actual conversions, add real photos of finished prints —
a `/images` folder, referenced from `index.html`, works well. Actual
proof-of-work photos will do more for trust here than any more design
polish.

## 6. Add real reviews

The Reviews section (`#reviews` in `index.html`) currently has three
placeholder cards — deliberately left as-is rather than filled with made-up
quotes. Replace the placeholder text and author lines with real quotes
copied from Google or Facebook reviews, or swap the section for an embedded
Google Reviews widget if you'd rather it stay always up to date.
