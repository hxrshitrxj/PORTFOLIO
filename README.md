# Cinematic Interactive Scrolling Hero & Portfolio

A high-end, award-winning developer & creator portfolio featuring an interactive, scroll-driven camera storytelling hero experience with 4-layer 3D depth, procedural Web Audio, and velocity physics.

---

## 🌟 Visual Architecture & Layering

The hero section uses a pinned sticky viewport stage across a **280vh scroll track**:

```
[ Layer 1: Background Plate ]
  ├── 2048x1144 dithered gradient (Deep Wine Red → Fiery Orange → Golden Amber)
  ├── Reactive ambient radial light spheres (opacity & scale grow with scroll)
  └── Subtle technical coordinate grid

[ Layer 2: 3D Typography Stage ]
  ├── Positioned in 3D perspective BEHIND the person
  ├── 4-Word Storytelling Loop:
  │    1. "BUILD." (0% - 25% camera push-in)
  │    2. "CREATE." (25% - 50% lateral sweep)
  │    3. "EXPERIMENT." (50% - 75% cinematic hold)
  │    4. "REPEAT." (75% - 95% grand resolution)
  └── 5-transform dynamic interpolation: opacity, translateY/X, scale, blur, letter-spacing

[ Layer 3: Person Foreground Cutout ]
  ├── Isolated alpha cutout matching original reference photo
  ├── Preserves golden headphones, sunglasses, hair, and posture
  ├── Seamlessly aligns with background at 0% scroll
  ├── Scales up (1.00x → 1.38x) and shifts with subtle 3D perspective
  └── Person physically passes IN FRONT of the typography

[ Layer 4: Interactive Sparkles & Foreground HUD ]
  ├── Exact 4-point concave sparkle star from original photo
  ├── Scroll velocity physics: fast scroll = rapid spin & scale flare
  ├── Real-time Camera Telemetry HUD (Cam push %, Focal length, Zoom, Velocity)
  ├── 35mm film grain & cinematic vignette
  └── Interactive Web Audio synthesizer toggle (headphones theme!)

[ Lower Portfolio Stream ]
  ├── Selected Works (interactive project cards, GitHub & live links)
  ├── Frequency Synth Lab (real-time Web Audio DSP & oscilloscope visualizer)
  ├── Architecture & Manifesto (capabilities & performance standards)
  └── Contact Dispatch (1-click email copy & live IST local time clock)
```

---

## 🚀 Running the Project

```bash
# Start development server
npm run dev

# Run Oxlint
npm run lint

# Production build
npm run build
```

Dev Server URL: `http://127.0.0.1:5173/`
