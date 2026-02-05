# JM Portfolio - GTA V Menu Inspired Portfolio

An interactive portfolio website inspired by the Grand Theft Auto V Online menu design. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Cinematic Design**: Dark, high-contrast UI with glassmorphism effects
- **Interactive Navigation**: Tab-based section switching with smooth transitions
- **Project Showcase**: Featured project hero panel with carousel selection
- **Multiple Sections**: Projects, Stats, Stacks (Tech Stack), Roles, Achievements, and Contact
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Support**: ESC to return home, optional arrow key navigation

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (for subtle animations)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx             # Main page with section routing
│   └── globals.css          # Global styles and design system
├── src/
│   ├── components/          # React components
│   │   ├── TopTabs.tsx      # Navigation tabs
│   │   ├── HomeDashboard.tsx # Home section
│   │   ├── HeroFeature.tsx  # Featured project hero
│   │   ├── TileGrid.tsx     # Navigation tiles
│   │   ├── ProjectCarousel.tsx # Project thumbnails
│   │   ├── Projects.tsx     # Projects section
│   │   ├── ProjectDetailsPanel.tsx # Project details drawer
│   │   ├── Stats.tsx        # About & skills
│   │   ├── Inventory.tsx    # Tech stack
│   │   ├── Crew.tsx         # Roles
│   │   ├── Achievements.tsx # Highlights
│   │   ├── SaveGame.tsx     # CV downloads
│   │   ├── Quit.tsx         # Contact
│   │   └── SectionShell.tsx # Section wrapper
│   ├── data/
│   │   └── portfolio.ts     # Portfolio data
│   └── lib/
│       └── cn.ts            # Utility functions
└── public/
    └── images/              # Image assets
        ├── hero/            # Hero background images
        ├── tiles/           # Tile background images
        └── projects/        # Project thumbnails
```

## Adding Images

Place your images in the following directories:

- `public/images/hero/` - Hero background images (hero-1.jpg, hero-2.jpg)
- `public/images/tiles/` - Tile background images (tile-projects.jpg, tile-stats.jpg, etc.)
- `public/images/projects/` - Project thumbnails (caresim-1.jpg, project-2.jpg, etc.)

If images are missing, the app will gracefully fall back to gradient backgrounds.

## Customization

### Update Portfolio Data

Edit `src/data/portfolio.ts` to update:
- Profile information
- Skills and percentages
- Tech stack
- Projects
- Achievements

### Update Contact Information

Edit `src/components/Quit.tsx` to update contact methods and links.

### Update Resume/CV Links

Edit `src/components/SaveGame.tsx` and place your PDF files in the `public/` directory.

## Design System

### Fonts
- **Display**: Bebas Neue (headings, tabs, large titles)
- **Body**: Inter (paragraphs, labels)

### Colors
- Background: Dark cinematic gradient with vignette
- Text: Off-white primary, gray secondary
- Accents: Muted cool blue/white highlights
- Glass panels: `bg-white/5` with `backdrop-blur-md`

### Typography
- Uppercase tabs and labels
- Letter spacing on headings
- Large display headings for emphasis

## Build for Production

```bash
npm run build
npm start
```

## License

This project is open source and available for personal use.

## Notes

- No copyrighted GTA assets are used
- All fonts are from Google Fonts
- Images should be original or properly licensed
- The design is inspired by game menu aesthetics but is original
