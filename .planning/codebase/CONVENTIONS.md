# Coding Conventions

**Analysis Date:** 2026-03-21

## Naming Patterns

**Files:**
- Components: PascalCase (`TimeGrid.tsx`, `BookingSummary.tsx`)
- Services: camelCase (`bookingService.ts`)
- Types/Constants: PascalCase (`types.ts`, `constants.tsx`)

**Functions:**
- React components: PascalCase (`const App = () => ...`)
- Event handlers: camelCase with `handle` prefix (`handleConfirm`, `handleSubmit`)
- Callbacks: camelCase (`refreshBookings`)

**Variables:**
- camelCase for all variables and state (`selectedService`, `customerName`)
- UPPERCASE for constant arrays (`SERVICES`, `WORKING_HOURS`)

**Types/Interfaces:**
- PascalCase (`interface Service`, `interface Booking`)

---

## Code Style

**Formatting:**
- Tool: Tailwind CSS (v4) with custom brutalist styles
- Indentation: 2 spaces
- No Prettier or ESLint detected

**Linting:**
- Tool: Not detected
- No `.eslintrc*` or `eslint.config.*` files found

**Style Patterns:**
- Heavy use of Tailwind utility classes
- Custom CSS variables for design system
- Neo-brutalist aesthetic (bold borders, shadows, transforms)

---

## Import Organization

**Order in `App.tsx`:**
1. React imports (`useState`, `useEffect`, etc.)
2. Component imports (`Layout`, `TornEdge`)
3. Constants/types (`SERVICES`, `BARBER_CONFIG`, types)
4. Services (`bookingService`)
5. Icons (`lucide-react`)

**Path aliases:**
- `@/` aliased to project root in `vite.config.ts`

---

## Error Handling

**Current pattern:** Minimal error handling
- No try-catch around `JSON.parse` in `bookingService.ts`
- No form validation in customer input
- Silent failures possible

**What should be added:**
```typescript
// In bookingService
try {
  return data ? JSON.parse(data) : [];
} catch {
  console.error('Failed to parse bookings');
  return [];
}
```

---

## Comments

**When used:**
- Configuration notes in `constants.tsx` (helpful)
- Inline style comments in CSS
- No JSDoc on functions

**JSDoc/TSDoc:**
- Not used in codebase

---

## Function Design

**Size:** Large functions acceptable (App.tsx has 440+ lines with multiple inline render functions)

**Parameters:**
- Prop interfaces defined for components
- Direct destructuring in component signatures

**Return Values:**
- Explicit returns
- Null returns for default switch cases

---

## Module Design

**Exports:**
- Default exports for components
- Named exports for utilities (`cn`, queries, mutations)

**Barrel Files:** None detected

---

## Additional Observations

### Inconsistencies Found

1. **Mixed styling approaches:**
   - Some components use Tailwind classes
   - Some use custom CSS classes (`.brutalist-card`, `.text-aggressive`)
   - Some use inline styles

2. **State management:**
   - All state in `App.tsx` (monolithic)
   - No context or state library
   - Prop drilling for shared state

3. **Data fetching:**
   - localStorage for bookings
   - Convex backend defined but unused
   - No unified data layer

---

## Recommended Conventions to Add

1. **ESLint + Prettier** for consistent formatting
2. **Strict TypeScript** mode
3. **JSDoc** for public functions
4. **Error boundaries** for React
5. **Form validation** library (e.g., react-hook-form + zod)

---

*Convention analysis: 2026-03-21*
