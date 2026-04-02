# Aryan Wanve Portfolio Site

A production-style portfolio website built to present my work as a visual creator while also acting as a freelance/business landing page.

This project is for my personal brand as a videographer, photographer, editor, and visual storyteller. At the same time, it is also a serious engineering project I am building as a second-year engineering student who wants to ship polished, real-world web experiences instead of just coursework demos.

The goal was simple: make a portfolio that does not feel like a static gallery. I wanted it to feel cinematic, fast, intentional, and useful for actual client outreach. So instead of a plain portfolio page, I built a media-heavy Next.js site with a custom landing experience, animated sections, lazy-loaded videos, a dedicated work archive, and a Google Drive-backed content system that lets me update portfolio videos without manually rebuilding the whole UI every time.

## Project Purpose

This website is designed to do three jobs at once:

- present my editing, cinematography, photography, and motion work in a strong visual format
- act as a business-facing site for freelance inquiries and collaborations
- serve as a personal engineering project where I can apply frontend, performance, and content-delivery ideas to something I actually use

Instead of treating the portfolio as a one-time showcase, I approached it like a product:

- clear user flow from landing page to portfolio to contact
- media presentation designed around attention and storytelling
- reusable components for animation and video handling
- dynamic content sourcing for portfolio categories
- practical contact path for leads and collaborators

## What The Site Includes

### 1. Cinematic landing page

The homepage is built around full-screen video, strong typography, and section-based storytelling. It introduces the brand, highlights featured edits, explains the kind of work I do, and drives visitors toward either the work page or direct contact.

### 2. Featured work showcase

The landing page includes selected edits such as:

- concert reel
- clothing showcase
- talking head
- horizontal trailer
- cafe and interior piece

These are presented as looping embedded video blocks so visitors get immediate proof of style and quality instead of only reading descriptions.

### 3. Dedicated work page with portfolio folders

The `/work` route is designed like a browsable archive. It organizes portfolio videos into genres such as:

- ads
- brands
- cinematics
- college club
- color grading
- events
- misc reels
- short films
- talking head
- YouTube work

Users can switch between folders, see video thumbnails, and open a larger preview modal for each piece.

### 4. Google Drive-backed portfolio sync

One of the more practical parts of this project is the way the portfolio page gets its content.

The app attempts to:

1. fetch folder and file data from the Google Drive API using `GOOGLE_DRIVE_API_KEY`
2. fall back to scraping public Drive folder HTML if API access is unavailable
3. fall back again to a local static snapshot if both dynamic methods fail

This gives the site a useful balance:

- easier content maintenance for me
- resilience when API setup is missing
- no broken portfolio page if dynamic fetch fails

### 5. Lead capture through contact flow

The contact form is lightweight on purpose. It collects name, email, and project message, then opens a prefilled mail draft to my email so project inquiries are quick and direct.

### 6. Performance-focused media handling

Because the site relies heavily on video, I added basic performance-minded handling:

- lazy loading for non-priority videos with `IntersectionObserver`
- scroll reveal animations triggered only when needed
- cached media headers through Next.js config
- production service worker registration
- remote image support for Google Drive thumbnails

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- App Router
- Google Drive API
- Vanilla browser APIs like `IntersectionObserver`

## Architecture Notes

### App structure

- `src/app/page.js`
  Main landing page with hero, featured work, about section, and contact area.

- `src/app/work/page.js`
  Server-rendered entry for the portfolio archive page.

- `src/app/work/WorkPageClient.js`
  Client-side interaction layer for folder switching, thumbnail loading, modal previews, and active video state.

- `src/app/work/drivePortfolio.js`
  Handles dynamic portfolio loading from Google Drive with layered fallbacks.

- `src/app/work/portfolioData.js`
  Stores fallback portfolio folder and video metadata.

- `src/components/LazyVideo.js`
  Defers video source loading until the element is near the viewport.

- `src/components/RevealOnScroll.js`
  Adds progressive section reveal behavior on scroll.

- `src/components/ContactForm.js`
  Handles inquiry input and mail draft generation.

- `src/components/ServiceWorkerRegistration.js`
  Registers the service worker in production.

## Why I Built It This Way

Most portfolio sites for creators either look good but feel technically thin, or they are technically solid but visually generic. I wanted this one to sit in the middle.

As someone building freelance presence while still being a second-year engineering student, this project represents both sides of what I do:

- the creative side that cares about visual pacing, mood, and presentation
- the engineering side that cares about structure, reliability, loading behavior, and maintainability

This site is not just a page about my work. It is part of the work itself.

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Environment Variables

Create a local env file:

```bash
.env.local
```

Expected variable:

```env
GOOGLE_DRIVE_API_KEY=your_api_key_here
```

If the key is missing or fails, the work page still functions by falling back to scraped public folder data or the local snapshot in `portfolioData.js`.

## Current Product Direction

This project is being shaped as a real freelance-facing web product, not just a student experiment. The current direction is focused on:

- stronger personal branding
- cleaner client discovery flow
- easier portfolio updates
- better presentation of editing categories
- balancing heavy visual media with usable performance

## Future Improvements

- direct backend-based inquiry handling instead of `mailto`
- admin-friendly content management beyond Drive folders
- more structured project case studies
- analytics for traffic and inquiry behavior
- improved mobile media optimization
- better thumbnail and preview pipeline

## Author

**Aryan Wanve**

Visual creator building across videography, photography, cinematography, editing, graphics, and motion.

Also a second-year engineering student building real projects that connect design, storytelling, and software.

Email: `aryanwanve15@gmail.com`

## Status

Active personal project and portfolio platform under continuous improvement.
