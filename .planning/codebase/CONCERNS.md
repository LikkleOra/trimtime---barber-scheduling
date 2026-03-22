# Codebase Concerns

**Analysis Date:** 2026-03-21

## Critical Functional Issues

### 1. Booking Flow is Incomplete - User Selections Are Ignored

**Files:** `App.tsx`

**Problem:** The entire booking flow from step 1 (date selection) to step 3 (confirmation) does NOT use the user's actual selections. The `selectedDate` state is never read after being set.

**Impact:** 
- User picks a date in the calendar, but it's ignored
- User picks a time slot, but the confirmation shows a different hardcoded time ("12 OCT", "ANUEL" barber)
- The `dateStr` created from `selectedDate` (line 35) is only used to save to localStorage, not displayed back to the user

**Evidence:**
```typescript
// Line 161-162: Calendar header is HARDCODED
<span>THU</span>
<span className="underline decoration-8 decoration-[#FF0000] underline-offset-[12px]">MAR 05</span>
<span>2026</span>

// Should be:
<span>{selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</span>
<span className="underline...">{selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</span>
<span>{selectedDate.getFullYear()}</span>

// Line 263-264: Receipt shows HARDCODED values, not user selections
{ label: 'BARBER:', val: 'ANUEL' },  // Hardcoded!
{ label: 'DATE:', val: '12 OCT' },   // Hardcoded!
```

---

### 2. Calendar is Non-Functional - Always Shows March 5th

**Files:** `App.tsx` (step 1 rendering)

**Problem:** The calendar grid is completely fake. It only highlights day 5 regardless of which day is selected or which month is being displayed.

**Evidence (Line 170):**
```typescript
{i+1 === 5 ? 'bg-[#FFD700] text-black font-black' : 'bg-white text-black/30'}
```
This always checks if `i+1 === 5`, meaning only March 5th is ever "selected".

**Issues:**
- No month/year navigation
- No `selectedDate` comparison
- No past date blocking
- Days don't reflect actual calendar (31 slots for every month)

---

### 3. Time Slots are Hardcoded, Not Dynamic

**Files:** `App.tsx` (line 180)

**Problem:** Time slots are a static array instead of using the `WORKING_HOURS` constant or checking against existing bookings.

**Evidence:**
```typescript
// Line 180 - HARDCODED slots
{['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'].map(t => (
```

**Issues:**
- Only shows morning slots (8 AM - 12 PM)
- Doesn't match `WORKING_HOURS` which goes from 8:00 to 19:00 with 30-min intervals
- Doesn't disable already-booked times for the selected date
- No visual distinction between available/booked/selected times

---

### 4. Data Layer Disconnect - localStorage vs Convex Backend

**Files:** `services/bookingService.ts`, `convex/bookings.ts`, `App.tsx`

**Problem:** There are TWO separate data systems that are NOT connected:
1. **localStorage** via `bookingService` - what the UI actually uses
2. **Convex backend** - defined but NEVER called from frontend

**Impact:** 
- Bookings only persist in the browser's localStorage
- No real-time sync across devices
- Staff dashboard shows only localStorage data
- Reviews system exists in Convex but is never connected

**Evidence:**
```typescript
// services/bookingService.ts uses ONLY localStorage
localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

// convex/bookings.ts defines proper API but is never called
export const addBooking = mutation({...});  // Never invoked

// App.tsx line 24 - Only loads from localStorage
setBookings(bookingService.getBookings());
```

---

## Dead Code - Unused Components

### 5. TimeGrid Component Never Used

**File:** `components/TimeGrid.tsx`

**Problem:** This component exists with proper slot generation and booking conflict detection, but is never imported or used in `App.tsx`.

**Evidence:** 
- Not in `import` statements in `App.tsx`
- The actual time selection uses hardcoded buttons instead

---

### 6. BookingSummary Component Never Used  

**File:** `components/BookingSummary.tsx`

**Problem:** This component has:
- WhatsApp integration (line 126: "Confirm Via WhatsApp")
- Proper form validation (line 24)
- Receipt-style summary with barcode
- But it's never imported

**Evidence:** Not in `App.tsx` imports. The step 2 in App uses inline JSX instead.

**Additional Issues in this file:**
- Line 34: Hardcoded reference number `#NZ-2941-DN`
- Line 36: Hardcoded location "Durban North"
- Line 87: Hardcoded "PM" suffix regardless of actual time
- Line 93: References `.barcode-pattern` class that doesn't exist in CSS

---

### 7. Gallery Component Never Used

**File:** `components/Gallery.tsx`

**Problem:** Gallery for displaying reviews exists but is never shown in the app.

---

### 8. ReviewPage Component Never Used

**File:** `components/ReviewPage.tsx`

**Problem:** Full review submission form exists but is never displayed.

---

### 9. ConvexClientProvider Never Used

**File:** `components/ConvexClientProvider.tsx`

**Problem:** The Convex client provider wrapper exists but is never used to wrap the app.

---

## Unused Imports

### 10. Many Imports Never Used in App.tsx

**File:** `App.tsx`

**Evidence:**
```typescript
// Line 4: Imported but never used
import TornEdge from './components/TornEdge';

// Line 8: Half of these icons are never used
import { 
  ChevronRight, MapPin, CheckCircle, Smartphone, 
  ChevronLeft, ArrowRight, Star, Play, Circle, 
  Plus, Trash2, Calendar as CalendarIcon 
} from 'lucide-react';

// Line 6: Booking type imported but...
import { Service, Booking, ViewType } from './types';
// Booking is never explicitly used in type annotations
```

---

## Form Validation Issues

### 11. No Input Validation

**Files:** `App.tsx` (customer form in step 2)

**Problems:**
- No minimum length for name
- No phone number format validation
- Empty/whitespace-only names are accepted
- No required field enforcement before confirming

**Evidence (Line 34):**
```typescript
// handleConfirm just checks if service and time exist, not customer info
if (!selectedService || !selectedTime) return;
```

**Fix Approach:** Add validation before allowing confirmation:
```typescript
const isValidPhone = /^[0-9+\s-]{10,}$/.test(customerPhone);
const isValidName = customerName.trim().length >= 2;
if (!selectedService || !selectedTime || !isValidName || !isValidPhone) return;
```

---

### 12. LocalStorage Error Handling Missing

**Files:** `services/bookingService.ts`

**Problem:** `JSON.parse` calls are not wrapped in try-catch. Malformed data will crash the app.

**Evidence:**
```typescript
// Line 9 - No error handling
return data ? JSON.parse(data) : [];

// Line 15 - No error handling  
localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
```

---

## Security Issues

### 13. Staff Password Hardcoded in Plain Text

**File:** `App.tsx` (line 385)

**Problem:** The staff password is directly hardcoded in the component logic.

```typescript
// Line 385 - SECURITY RISK
if (staffPassword === 'Alex') {
    setIsStaffAuthenticated(true);
}
```

**Issues:**
- Password visible in source code
- No rate limiting on login attempts
- No secure comparison (timing attack vulnerable)
- Should use environment variable and proper auth

---

## CSS/Tailwind Issues

### 14. Tailwind v4 with v3 Config Syntax

**Files:** `tailwind.config.js`, `styles.css`

**Problem:** 
- `package.json` shows `"tailwindcss": "^4.1.18"` (v4)
- `tailwind.config.js` uses v3 syntax (theme.extend, plugins: [])
- `styles.css` uses `@import "tailwindcss"` (v4 syntax)

**Impact:** The v3 config file is ignored by Tailwind v4. Custom fonts defined in config won't work unless using v4 approach.

**Evidence:**
```javascript
// tailwind.config.js - v3 syntax (ignored in v4)
export default {
  theme: {
    extend: { ... }
  }
}

// Should use CSS or @theme directive for v4
```

---

### 15. Missing CSS Classes Referenced in Components

**Files:** `components/TimeGrid.tsx`, `components/BookingSummary.tsx`

**Problem:** Components reference CSS classes that don't exist in `styles.css`:

**Evidence:**
```typescript
// TimeGrid.tsx line 41-49
className={`time-slot ${isOccupied ? 'opacity-20...' : isSelected ? 'selected' : ''}`}

// BookingSummary.tsx line 92
<div className="barcode-pattern" />
```

Neither `.time-slot`, `.selected`, nor `.barcode-pattern` are defined in `styles.css`.

---

## Branding Inconsistencies

### 16. Conflicting Shop Names

**Files:** Multiple files show different branding:

| File | Shop Name |
|------|-----------|
| `index.html` | "Nev the Barber" |
| `App.tsx` | "FADEZONE" |
| `constants.tsx` | "FADEZONE Grooming" |
| `BookingSummary.tsx` | "Fadezone Grooming Systems" |
| CSS comments | "Fadezone Barber Booking App" |

**Impact:** Confusing user experience and maintenance burden.

---

## Type Safety Issues

### 17. Booking Status Missing 'cancelled' State

**Files:** `types.ts`, `convex/schema.ts`

**Problem:** The `Booking.status` type only allows 'confirmed' | 'pending' but the UI has a delete/cancel button that doesn't update status properly.

**Evidence:**
```typescript
// types.ts line 19
status: 'confirmed' | 'pending';  // Missing 'cancelled'
```

---

### 18. Barber Selection Never Implemented

**Files:** `constants.tsx` has `BARBER_CONFIG`, but no barber selection UI

**Problem:** `BARBER_CONFIG` defines a single barber 'Alex', but there's no way to select a barber, and the receipt hardcodes "ANUEL" or "ALEX".

---

## Build/Performance Issues

### 19. No Lazy Loading / Code Splitting

**Files:** `App.tsx`

**Problem:** All view render functions are in one large component file. With React.lazy(), each view could be a separate chunk.

**Evidence:** 442-line App.tsx with 5 different views in one file.

---

### 20. Missing Dependency Arrays

**Files:** `App.tsx`

**Problem:** `handleConfirm` and render functions are recreated on every render but aren't memoized.

**Evidence:**
```typescript
// Line 33: handleConfirm uses setStep but isn't in useCallback
const handleConfirm = () => {
    // ... uses setLastBookingId, setStep
}
```

---

## Summary Table

| Priority | Issue | Files | Impact |
|----------|-------|-------|--------|
| CRITICAL | User selections ignored | `App.tsx` | Booking flow broken |
| CRITICAL | Calendar non-functional | `App.tsx` | Can't select dates |
| CRITICAL | localStorage/Convex disconnect | `services/`, `convex/` | No data persistence |
| HIGH | 5+ unused components | `components/*.tsx` | Dead code bloat |
| HIGH | No input validation | `App.tsx` | Invalid data accepted |
| HIGH | Hardcoded password | `App.tsx` | Security vulnerability |
| MEDIUM | Tailwind v3/v4 mismatch | `tailwind.config.js` | Config ignored |
| MEDIUM | Missing CSS classes | `TimeGrid.tsx`, `BookingSummary.tsx` | Broken styles |
| LOW | Branding inconsistencies | Multiple | UX confusion |

---

*Concerns audit: 2026-03-21*
