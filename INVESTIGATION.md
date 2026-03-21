# Fadezone New Designs - Investigation Report

**Date:** March 19, 2026  
**Status:** 🔍 Investigation Complete

---

## Overview

This subdirectory contains a **redesign/iteration** of the main Fadezone barber scheduling app. Key differentiators from the parent:

| Aspect | Main App | New Designs |
|--------|----------|-------------|
| Backend | Convex (serverless DB) | localStorage only |
| Styling | Tailwind CSS 4 (Vite plugin) | Tailwind CDN + inline styles |
| Branding | "FADEZONE" | "Nev the Barber" |
| Complexity | More features (Reviews, Gallery) | Streamlined (booking only) |
| Tech Stack | React 19 + Vite | React 19 + ESM CDN |

---

## Architecture

### Technology Stack

```
Frontend:
├── React 19.2.3 (via esm.sh CDN)
├── Tailwind CSS (CDN)
├── Lucide React Icons (via esm.sh)
└── No build step (ESM imports)
```

### Data Flow

```
User Interaction
      ↓
App.tsx (State Management)
      ↓
┌─────────────────────────────┐
│ Local State (useState)      │
│ • selectedService           │
│ • selectedDate              │
│ • selectedTime              │
│ • customerName/Phone        │
│ • bookings[] (localStorage) │
└─────────────────────────────┘
      ↓
bookingService (localStorage wrapper)
      ↓
LocalStorage ('trimtime_bookings')
```

---

## Component Breakdown

### App.tsx (452 lines)
**Responsibilities:**
- Multi-step booking flow (steps 0-3)
- View switching (customer/barber)
- Staff authentication
- Booking CRUD operations

**Views:**
| Step | Component | Purpose |
|------|-----------|---------|
| 0 | `renderLanding()` | Hero, About, Services carousel, Contact |
| 1 | `renderServiceMenu()` | Categorized pricing menu |
| 2 | Time selection | Date picker + TimeGrid |
| 3 | Booking form | Customer info + WhatsApp confirm |

### Layout.tsx (67 lines)
- Sticky header with logo
- Desktop navigation (About, Pricing, Bookings, Contact)
- Staff portal toggle
- Footer with social links

### TimeGrid.tsx (59 lines)
- Generates 30-min slots from 7:00-17:00
- Filters booked slots from localStorage
- Visual states: available, occupied, selected

### BookingSummary.tsx (152 lines)
- Receipt-style booking summary card
- Customer input fields (name, phone)
- WhatsApp confirmation button
- Static location: "28 Mackeurtan Avenue, Durban North"

---

## Key Findings

### ✅ Strengths

1. **No Build Step** - Uses ESM CDN imports, runs directly in browser
2. **Simpler Architecture** - localStorage instead of Convex = fewer dependencies
3. **Cleaner Branding** - "Nev the Barber" with distinctive Durban aesthetic
4. **Better Receipt UI** - BookingSummary has a polished receipt/card design

### ⚠️ Issues / Inconsistencies

1. **Mismatched Service IDs**
   - `renderServiceMenu()` references: `'scholar', 'fade', 'buzz'`
   - `constants.tsx` defines: `'haircut', 'chiskop', 'brush-cut'`
   - **Result:** Service menu shows empty categories!

2. **Hardcoded Location Conflict**
   - `constants.tsx`: "424 Commissioner Street, Kensington, Johannesburg"
   - `BookingSummary.tsx`: "28 Mackeurtan Avenue, Durban North"
   - **Result:** Conflicting shop addresses

3. **Missing Features**
   - No Review/Gallery system (exists in main app)
   - No Convex backend integration
   - Staff dashboard is read-only (no WhatsApp reminders)

4. **Working Hours Discrepancy**
   - `constants.tsx`: 7:00 - 17:00
   - Main app: 8:00 - 19:00
   - Different business hours

5. **Tailwind CDN Limitation**
   - Using CDN `<script>` prevents full Tailwind features
   - No JIT compilation
   - Limited customization options

---

## Critical Bug: Empty Service Categories

**Location:** `App.tsx` lines 238-243

```tsx
const categories = [
  { name: 'Hair', services: SERVICES.filter(s => ['scholar', 'fade', 'buzz'].includes(s.id)) },
  { name: 'Beard', services: SERVICES.filter(s => s.id === 'beard') },
  { name: 'Combo', services: SERVICES.filter(s => s.id === 'full') }
];
```

**Problem:** None of these IDs exist in `constants.tsx`:
- `'scholar'` → should be `'kids-haircut'`?
- `'fade'` → should be `'haircut'`?
- `'buzz'` → should be `'chiskop'`?
- `'beard'` → should be `'shave-beard'`?
- `'full'` → should be `'unique-haircut'`?

**Result:** All service categories render empty.

---

## Recommendations

### High Priority
1. **Fix service ID mappings** in `renderServiceMenu()`
2. **Unify location data** - choose one address or make it dynamic
3. **Add missing Convex integration** OR document localStorage-only limitation

### Medium Priority
4. **Align working hours** across both app versions
5. **Add Review/Gallery features** if keeping parity with main app
6. **Consider Vite build** for better DX and Tailwind support

### Low Priority
7. Add animations via CSS classes (currently only slide-in defined)
8. Mobile navigation drawer implementation

---

## File Structure

```
Fadezone new designs/
├── index.html          # Entry point, Tailwind CDN, fonts
├── index.tsx           # React mount
├── App.tsx             # Main app logic
├── types.ts            # TypeScript interfaces
├── constants.tsx       # Services + Barber config
├── vite.config.ts      # (unused? no package.json deps)
├── package.json        # Minimal deps (only react, lucide)
├── .env.local          # VITE_STAFF_PASSWORD
│
├── components/
│   ├── Layout.tsx      # Header, footer, nav
│   ├── TimeGrid.tsx    # Time slot picker
│   ├── BookingSummary.tsx  # Receipt + form
│   └── ReviewPage.tsx  # (referenced but missing?)
│
├── services/
│   └── bookingService.ts   # localStorage CRUD
│
└── screenshots/       # Design reference images
```

---

## Comparison Matrix

| Feature | Main App | New Designs |
|---------|----------|-------------|
| Backend | Convex | localStorage |
| Reviews/Gallery | ✅ | ❌ |
| Staff WhatsApp reminders | ✅ | ❌ |
| Date picker | Custom calendar | ❌ (missing step) |
| Mobile nav drawer | ✅ | ❌ |
| Service images | ✅ | ❌ |
| Production-ready | Mostly | Needs fixes |

---

## Vercel Deployment Errors

### Error 1: `Property 'env' does not exist on type 'ImportMeta'`

**Location:** `App.tsx` lines 359, 373

```typescript
// Current code:
if (staffPassword === import.meta.env.VITE_STAFF_PASSWORD)
```

**Cause:** TypeScript doesn't know about Vite's `import.meta.env` types.

**Solution:** Create `src/vite-env.d.ts` or add to tsconfig:

```typescript
/// <reference types="vite/client" />
```

Or in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

---

### Error 2: Type Mismatch - `_id` vs `id` (Main App Only)

**Location:** `App.tsx` line 449, 600

**Cause:** Convex returns `_id` field, but the `Booking` type expects `id`:

```typescript
// types.ts expects:
interface Booking {
  id: string;  // ← Code expects this
  ...
}

// Convex returns:
{ _id: Id<"bookings">; ... }  // ← Actually returns this
```

**Solution:** Either:
1. Update `Booking` type to use `_id`
2. Add a transform layer when fetching from Convex
3. Map `_id` → `id` in the component

---

### Error 3: Missing Environment Variable Types

**Root Cause:** No `env.d.ts` file defining Vite environment types.

**Files to add:**

`vite-env.d.ts`:
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STAFF_PASSWORD: string;
  readonly GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

### Error 4: Vite Config References Non-existent Env Vars

**Location:** `vite.config.ts` line 14-15

```typescript
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

**Problem:** References `GEMINI_API_KEY` but:
- The app doesn't actually use Gemini API
- The `.env.local` only has `VITE_STAFF_PASSWORD`

**Fix:** Remove unused define, or add actual API key handling.

---

## Quick Fix Checklist for Vercel Deployment

| # | Fix | File |
|---|-----|------|
| 1 | Add Vite client types | `tsconfig.json` or `vite-env.d.ts` |
| 2 | Fix `id` → `_id` mapping | `App.tsx` (main app only) |
| 3 | Add env var to Vercel dashboard | Vercel project settings |
| 4 | Clean up unused vite config | `vite.config.ts` |

---

## Recommended Deployment Configuration

For Vercel, create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

Environment variables to set in Vercel:
- `VITE_STAFF_PASSWORD` - Staff portal password

---

## Next Steps

1. **Decision Point:** Merge back into main app OR continue as separate project?
2. **Bug Fixes:** Service ID mappings, location consistency
3. **Feature Parity:** Add missing features if merging
4. **Tech Decision:** localStorage vs Convex for new version
