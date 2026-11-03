# Lance De Vera — Portfolio Website

A modern, high-fashion tech editorial portfolio website for **Lance De Vera**, BSIT (Network & Security) student at the University of the Cordilleras. Inspired by Swiss modernist layouts, crisp typography, and interactive WebGL elements.

## Features

- 🎨 **Atelier Editorial Design System**: Achromatic monochrome high-contrast register, 1px hairline dividers, Hanken Grotesk & EB Garamond typography.
- 🆔 **Interactive 3D Swinging Lanyard ID Card**: Built with **Three.js** rendering a high-res custom canvas ID badge (`UC-2026-8841`) with dynamic mouse pendulum physics.
- 📱 **Fully Responsive Layout**: Built with Tailwind CSS, supporting Desktop, Tablet, and Mobile viewports with a seamless sliding navigation menu.
- ✨ **Micro-Interactions**: Scroll reveal animations, magnetic cursor tracking, active section scroll monitoring, and one-click email clipboard copy with toast feedback.
- ⚡ **Vercel Ready**: Configured for zero-config instant static deployment on Vercel (`vercel.json`).

## Project Structure

```
.
├── index.html              # Main portfolio website (HTML5, Tailwind, Three.js)
├── vercel.json             # Vercel static deployment & security headers config
├── assets/                 # Image assets and icons
│   ├── images/
│   │   ├── photo.png       # Profile portrait
│   │   └── favicon.png     # Favicon
└── README.md               # Project documentation & deployment guide
```

## Deploying to Vercel

### Option 1: Vercel CLI (Recommended)

1. Open your terminal in this repository directory.
2. Run the Vercel deployment command:
   ```bash
   npx vercel
   ```
3. Follow the quick prompts to link your project and deploy.

### Option 2: GitHub / Vercel Dashboard

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Atelier Editorial Portfolio"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your repository and click **Deploy**. Vercel will automatically detect the static site and `vercel.json` configuration!

---

© 2026 Lance De Vera. All rights reserved.
