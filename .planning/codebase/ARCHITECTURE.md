# Architecture

**Analysis Date:** 2026-03-21

## Pattern Overview

**Overall:** Monolithic SPA with disconnected backend

**Key Characteristics:**
- Single-page React application
- All state managed in root `App.tsx` component
- localStorage for client-side persistence
- Convex backend defined but NOT connected to frontend
- Component-based UI with Tailwind CSS

---

## Layers

**UI Components:**
- Purpose: Render views and capture user interactions
- Location: `components/*.tsx`
- Contains: Layout, TimeGrid, BookingSummary, Gallery, ReviewPage, TornEdge
- Depends on: React, lucide-react icons, Tailwind
- Used by: `App.tsx`

**State Management:**
- Purpose: Manage application state
- Location: `App.tsx` (main), `services/bookingService.ts` (data)
- Contains: View state, form inputs, bookings list
- Depends on: React hooks (useState, useCallback, useEffect)
- Used by: UI components via props

**Data Layer:**
- Purpose: Persist bookings
- Location: `services/bookingService.ts`
- Contains: CRUD operations for localStorage
- Depends on: localStorage API
- Used by: `App.tsx`

**Backend (Disconnected):**
- Purpose: Server-side data storage and business logic
- Location: `convex/*.ts`
- Contains: Schema, bookings mutations/queries, reviews mutations/queries
- Depends on: Convex cloud
- Status: **NOT connected to frontend**

---

## Data Flow

**Current (Broken) Booking Flow:**

```
User selects service → setSelectedService
User "selects" date → setSelectedDate (but never used!)
User selects time → setSelectedTime
User enters name/phone → state updates
User clicks confirm → handleConfirm
  → create booking object
  → save to localStorage (bookingService.addBooking)
  → setStep(3) to show receipt
```

**Issues with current flow:**
- `selectedDate` is stored but never displayed or validated
- Date shown in receipt is hardcoded ("12 OCT")
- Time shown is from selection, but date comes from nowhere

**Expected (Correct) Flow:**

```
User selects service → setSelectedService
User selects date → setSelectedDate (validate, display, store)
User selects time → setSelectedTime (filter by existing bookings)
User enters name/phone → validate inputs
User clicks confirm → handleConfirm
  → validate all fields
  → create booking with actual selectedDate
  → sync to backend (Convex)
  → localStorage fallback
  → setStep(3) to show receipt with real data
```

---

## Key Abstractions

**ViewType:**
- Purpose: Navigation state
- Location: `types.ts`
- Examples: `'home' | 'bookings' | 'store' | 'profile' | 'staff'`
- Pattern: String literal union type

**Service/Booking Interfaces:**
- Purpose: Type definitions
- Location: `types.ts`
- Pattern: TypeScript interfaces

**bookingService:**
- Purpose: Data persistence abstraction
- Location: `services/bookingService.ts`
- Pattern: Module with object export
- Note: Only wraps localStorage, should wrap Convex too

---

## Entry Points

**App Entry:**
- Location: `index.tsx`
- Triggers: Page load
- Responsibilities: Mounts React app to #root

**Main App:**
- Location: `App.tsx`
- Triggers: App entry render
- Responsibilities: All state, routing (view switching), booking flow

---

## Error Handling

**Strategy:** Minimal - mostly silent failures

**Patterns:**
- No error boundaries
- No try-catch in localStorage operations
- No validation feedback to user
- Console.error only for review submission

---

## Cross-Cutting Concerns

**Logging:** None (console only)
**Validation:** None (inputs accepted as-is)
**Authentication:** Basic staff password check (hardcoded)

---

## Architecture Problems (Critical)

### 1. Dual Data Systems Not Connected

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              App.tsx (State)                    │   │
│  │  - selectedService, selectedDate, selectedTime  │   │
│  │  - bookings (from localStorage only)            │   │
│  └─────────────────────┬───────────────────────────┘   │
│                        │                                │
│                        ▼                                │
│         ┌─────────────────────────────┐                 │
│         │  bookingService (localStorage)│                │
│         │  - getBookings()             │                │
│         │  - addBooking()              │                │
│         │  - deleteBooking()           │                │
│         └─────────────────────────────┘                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          │
           ┌──────────────┴──────────────┐
           │         DISCONNECTED        │
           └──────────────┬──────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND (Convex)                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  convex/schema.ts                               │   │
│  │  - bookings table                               │   │
│  │  - reviews table                                │   │
│  └─────────────────────┬───────────────────────────┘   │
│                        │                                │
│                        ▼                                │
│         ┌─────────────────────────────┐                 │
│         │  convex/bookings.ts          │                 │
│         │  - getBookings query         │                 │
│         │  - addBooking mutation       │                 │
│         │  - deleteBooking mutation    │                 │
│         └─────────────────────────────┘                 │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  convex/reviews.ts                               │   │
│  │  - getReviews query                             │   │
│  │  - addReview mutation                           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2. Dead Components

5 components exist but are never imported:
- `TimeGrid.tsx` - Should be used for time selection
- `BookingSummary.tsx` - Should be used in confirmation step
- `Gallery.tsx` - Should be used for reviews display
- `ReviewPage.tsx` - Should be used for submitting reviews
- `ConvexClientProvider.tsx` - Should wrap the app

---

*Architecture analysis: 2026-03-21*
