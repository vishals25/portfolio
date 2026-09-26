# Vishal S — Portfolio

Personal portfolio of Vishal S, a backend-focused software engineer based in Coimbatore, India.
Live at **https://vishals25.github.io/portfolio/**.

A single-page site built with **React 19 + Vite** and plain CSS: no UI libraries, no icon packages, content bundled at build time (the only runtime request is the optional GitHub activity feed).

## Structure

```
index.html              SEO head (meta, Open Graph, JSON-LD), fonts, reveal gate, noscript fallback
public/                 Static files served as-is (photo, og-image, resume.pdf, favicon, robots.txt, sitemap.xml)
src/
  main.jsx              Entry point (global CSS imported before components)
  App.jsx               Page composition + scroll-reveal observer
  index.css             Design tokens (light/dark), type scale, reset, shared components
  data/                 All site content as JSON
  components/           One component + one CSS file per section
    Navbar, Hero (+ HeroDiagram SVG), About, Experience, Projects (case study + list),
    Skills, Achievements, Activity (live GitHub repos), Contact (+ ContactForm, footer), Icons
```

## Editing content

All text lives in `src/data/`. Edit the JSON and the page updates; no component changes needed.

| File                  | What it holds                                   |
|-----------------------|-------------------------------------------------|
| `profile.json`        | Name, role, headline, summary, stack line, availability, links, résumé file, GitHub username, optional `leetcode` URL and `contactFormEndpoint` |
| `experience.json`     | Roles: company, title, period, summary, highlights, tech, optional `caseStudy` anchor |
| `education.json`      | Degree, institution, period, CGPA               |
| `projects.json`       | `featured` case study (problem, implementation, snippet, metrics, findings) and `projects` list (summary, key decisions, tech, links; empty string hides a link) |
| `skills.json`         | Skill groups; items listed in `core` are highlighted |
| `achievements.json`   | Publications / academic highlights              |
| `certifications.json` | Certificates with issuer, date and verification link (empty link = plain text) |

The case-study architecture stages live in `PIPELINE` inside `src/components/Projects.jsx`.

### Contact form (optional)

The site is static, so the form only renders when an endpoint is configured. Create a form at
[Formspree](https://formspree.io) (or any service accepting JSON `POST` with `Accept: application/json`)
and either set `contactFormEndpoint` in `profile.json` or build with `VITE_CONTACT_ENDPOINT=<url>`.
The form includes validation, loading/success/error states, a honeypot and duplicate-submit protection.

### GitHub activity

`Activity` fetches the most recently pushed public, non-fork repositories for `githubUser` from the
public GitHub API when the section nears the viewport, caches them for 30 minutes in `sessionStorage`,
and shows a retry + profile link if the API is unavailable or rate-limited.

To update the résumé, replace `public/resume.pdf`. To update the photo, replace `public/me.jpg` (800×1000) and `public/me-sm.jpg` (480×600).

## Commands

```bash
npm install       # install dependencies
npm run dev       # start the dev server
npm run lint      # run ESLint
npm run build     # production build into dist/
npm run preview   # preview the production build
npm run deploy    # build and publish dist/ to GitHub Pages (gh-pages branch)
```

The site is served from `/portfolio/` (see `base` in `vite.config.js`); asset URLs in components use `import.meta.env.BASE_URL`.
