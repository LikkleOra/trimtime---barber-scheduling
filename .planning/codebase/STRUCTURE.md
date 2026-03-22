# Codebase Structure

**Analysis Date:** 2026-03-21

## Directory Layout

```
trimtime---barber-scheduling/
├── App.tsx                    # Main app component (440+ lines)
├── index.tsx                  # React entry point
├── index.html                  # HTML entry
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── styles.css                  # Custom brutalist styles
│
├── components/                # UI Components
│   ├── Layout.tsx              # App shell with nav
│   ├── TimeGrid.tsx            # Time slot picker (UNUSED)
│   ├── BookingSummary.tsx      # Booking confirmation (UNUSED)
│   ├── Gallery.tsx             # Reviews gallery (UNUSED)
│   ├── ReviewPage.tsx          # Submit review (UNUSED)
│   ├── TornEdge.tsx            # Decorative SVG
│   └── ConvexClientProvider.tsx # Convex wrapper (UNUSED)
│
├── services/                   # Data services
│   └── bookingService.ts       # localStorage CRUD
│
├── lib/                        # Utilities
│   └── utils.ts                # cn() helper
│
├── types.ts                    # TypeScript interfaces
├── constants.tsx               # App constants
│
└── convex/                     # Backend (disconnected)
    ├── schema.ts               # Database schema
    ├── bookings.ts             # Booking queries/mutations
    ├── reviews.ts              # Review queries/mutations
    └── _generated/              # Auto-generated Convex types
```

## Directory Purposes

**Root Level:**
- Entry points and configuration
- Main React app component

**`components/`:**
- Purpose: Reusable UI components
- Contains: Layout, navigation, booking widgets, decorative elements
- Key files: `Layout.tsx` (navigation shell)

**`services/`:**
- Purpose: Data layer abstraction
- Contains: Booking service for persistence
- Key files: `bookingService.ts`

**`lib/`:**
- Purpose: Shared utilities
- Contains: Tailwind merge helper (`cn`)
- Key files: `utils.ts`

**`convex/`:**
- Purpose: Serverless backend
- Contains: Database schema, API endpoints
- Status: Defined but not connected to frontend

## Key File Locations

**Entry Points:**
- `index.tsx`: React DOM mount
- `index.html`: HTML shell with font imports
- `App.tsx`: Main application component

**Configuration:**
- `package.json`: Dependencies and scripts
- `vite.config.ts`: Build and dev server config
- `tailwind.config.js`: Tailwind (v3 syntax - note v4 mismatch)

**Core Logic:**
- `App.tsx`: All state management and view routing
- `services/bookingService.ts`: Data persistence
- `constants.tsx`: Static data (services, barbers)

**Testing:** None present

## Naming Conventions

**Files:**
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Config: `camelCase.config.js`

**Directories:**
- All lowercase with hyphens for special purposes
- `components/`, `services/`, `lib/`, `convex/`

## Where to Add New Code

**New Feature:**
- Primary code: Add to `App.tsx` or create in `components/`
- Tests: Create `tests/` directory (not present)

**New Component/Module:**
- Implementation: `components/NewComponent.tsx`
- Import in `App.tsx` and add to render logic

**Utilities:**
- Shared helpers: `lib/utils.ts`
- Services: `services/newService.ts`

## Special Directories

**`convex/`:**
- Purpose: Convex serverless backend
- Generated: `_generated/` folder is auto-generated
- Committed: Entire folder should be committed

**`public/`:**
- Purpose: Static assets (images)
- Location: Referenced in `constants.tsx` as `/services/*.jpg`

## Missing Structure

**Should exist but doesn't:**
```
src/
├── hooks/           # Custom React hooks
├── contexts/        # React contexts for shared state
├── types/           # Type definitions (currently in root)
├── constants/       # Constants (currently in root)
├── utils/           # Utilities (currently in lib/)
└── tests/           # Test files
```

**Current state:** Flat structure with `components/`, `services/`, `lib/` subdirectories.

---

*Structure analysis: 2026-03-21*
