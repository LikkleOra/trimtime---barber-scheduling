# Testing Patterns

**Analysis Date:** 2026-03-21

## Current State: No Tests

**Test Framework:** None detected
**Test Files:** 0 found
**Coverage:** 0%

---

## Test Configuration

**Config Files Present:** None
```
No jest.config.*, vitest.config.*, or testing library configs found
```

**Run Commands:** N/A (no test framework installed)

---

## Required Test Coverage (Recommended)

Given the critical issues found in the codebase, the following test coverage is required:

### 1. Booking Flow Tests

**File to test:** `App.tsx`

**Critical scenarios:**
```typescript
// 1. Service selection persists
test('selecting a service updates selectedService state')
test('selected service displays correct name and price in step 2')

// 2. Date selection works
test('calendar allows selecting different dates')
test('selected date displays in header')

// 3. Time selection works  
test('time slots render based on WORKING_HOURS constant')
test('selecting a time updates selectedTime state')
test('booked times are visually disabled')

// 4. Customer form validation
test('confirmation disabled when name is empty')
test('confirmation disabled when phone is invalid')
test('confirmation enabled when all fields valid')

// 5. Booking creation
test('handleConfirm creates booking with correct data')
test('booking ID is generated')
test('redirects to receipt view after confirmation')
```

### 2. Booking Service Tests

**File to test:** `services/bookingService.ts`

```typescript
// 1. Get bookings
test('returns empty array when no bookings exist')
test('returns parsed bookings from localStorage')

// 2. Add booking
test('adds new booking to existing list')
test('triggers storage event for reactivity')

// 3. Delete booking
test('removes booking by id')
test('returns unchanged array when id not found')

// 4. Error handling
test('handles malformed JSON gracefully')
test('handles localStorage quota exceeded')
```

### 3. TimeGrid Component Tests

**File to test:** `components/TimeGrid.tsx`

```typescript
test('generates correct slots from WORKING_HOURS')
test('disables occupied slots for selected date')
test('calls onTimeSelect when available slot clicked')
test('shows correct number of slots')
```

---

## Recommended Test Setup

**Framework:** Vitest (matches existing Vite setup)
**Coverage Tool:** v8

```bash
npm install -D vitest @testing-library/react jsdom
```

**vitest.config.ts:**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts'
  }
})
```

**Sample test file structure:**
```
tests/
├── setup.ts
├── App.test.tsx
├── services/
│   └── bookingService.test.ts
└── components/
    └── TimeGrid.test.tsx
```

---

## Test Patterns Observed in Codebase

**Mocking localStorage:**
```typescript
// Needed for bookingService tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  dispatchEvent: jest.fn()
};
global.localStorage = localStorageMock;
```

**Component testing pattern (React Testing Library):**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

test('booking flow step 1 shows services', () => {
  render(<App />);
  expect(screen.getByText('SELECT YOUR STYLE')).toBeInTheDocument();
});
```

---

## Integration Test Priorities

1. **End-to-end booking flow** - Critical path
2. **Calendar date selection** - Currently broken
3. **localStorage persistence** - Data safety
4. **View transitions** - Navigation

---

*Testing analysis: 2026-03-21*
