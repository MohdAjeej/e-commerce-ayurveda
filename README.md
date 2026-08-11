# OJAS Himalayan Herbs

React + Vite recreation of [ihp.ind.in](https://ihp.ind.in/), a WordPress/Elementor Ayurvedic
wellness site, rebuilt from scratch with no WordPress/PHP/Elementor dependency.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
├── assets/
│   └── images.js              # centralized image registry (placeholder metadata per slot)
├── components/
│   ├── layout/                # persistent chrome rendered on every page
│   │   ├── Header.jsx / .css
│   │   └── Footer.jsx / .css
│   ├── sections/               # one component per homepage/page section
│   │   ├── Hero.jsx / .css
│   │   ├── FounderSection.jsx / .css
│   │   ├── ProductsSection.jsx / .css
│   │   ├── WellnessSection.jsx / .css
│   │   ├── TestimonialSection.jsx / .css
│   │   ├── InfoBand.jsx / .css        # shared offset-box layout...
│   │   ├── AyurvedaSection.jsx        # ...used by these two
│   │   ├── ResearchSection.jsx
│   │   ├── FocusAreas.jsx / .css
│   │   ├── SocialSection.jsx / .css
│   │   └── ContactSection.jsx / .css
│   └── common/                 # small reusable pieces with no section identity
│       ├── PlaceholderImage.jsx / .css
│       ├── Reveal.jsx          # scroll fade-in-up wrapper
│       ├── SocialIcons.jsx     # inline SVG brand icons
│       └── PageIntro.jsx / .css
├── data/                       # static content, separated from presentation
│   ├── products.js
│   ├── ingredients.js
│   ├── testimonials.js
│   ├── focusAreas.js
│   ├── navLinks.js
│   ├── legalLinks.js
│   ├── socialLinks.js
│   └── supportLinks.js
├── hooks/
│   └── useInViewFade.js        # IntersectionObserver hook backing <Reveal>
├── pages/
│   ├── Home.jsx                # assembles all sections in site order
│   ├── About.jsx
│   ├── Products.jsx
│   └── Contact.jsx
├── App.jsx                     # router + layout shell
├── main.jsx                    # React entry point
└── index.css                   # design tokens, reset, shared utility classes
```

## Notes on images

The live reference site currently 404s on every media file it references (logo, hero art,
founder photo, product photos, ingredient/focus icons). Since none of that photography can be
reused, `src/assets/images.js` defines one entry per image slot (aspect ratio, role, tone) and
`PlaceholderImage` renders a styled icon-based stand-in for any slot without a `real` path set.
Drop a real image in and set `real` on that entry to replace a placeholder — no component changes
needed.
