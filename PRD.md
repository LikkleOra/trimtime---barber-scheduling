# Product Requirements Document (PRD)
# TrimTime Barber Scheduling System v2.0

**Document Version:** 1.0
**Last Updated:** April 25, 2026
**Product Owner:** Thabiso Buthelezi
**Document Status:** Draft for Review

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Goals & Objectives](#2-goals--objectives)
3. [Target Users](#3-target-users)
4. [Feature Specifications](#4-feature-specifications)
5. [User Interface Requirements](#5-user-interface-requirements)
6. [Technical Specifications](#6-technical-specifications)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Integration Requirements](#8-integration-requirements)
9. [Data Requirements](#9-data-requirements)
10. [Constraints & Assumptions](#10-constraints--assumptions)
11. [Success Metrics](#11-success-metrics)
12. [Release Criteria](#12-release-criteria)

---

## 1. Product Overview

### 1.1 Product Description

TrimTime is a mobile-first web application designed for Fadezone Grooming, a premium barber shop in Johannesburg, South Africa. The application enables customers to browse services, book appointments online, and leave reviews, while providing barbers with efficient tools to manage bookings and communicate with customers via WhatsApp.

### 1.2 Problem Statement

**Customer Pain Points:**
- Customers must call during business hours to book appointments
- No visibility into available time slots
- No confirmation system leads to forgotten appointments
- Unclear pricing and service offerings

**Barber Pain Points:**
- Time-consuming phone booking process interrupts service
- Manual booking tracking is error-prone
- High no-show rate
- Difficult to manage schedule visibility

### 1.3 Solution Summary

TrimTime solves these problems by providing:
- 24/7 online booking system
- Real-time availability display
- Instant WhatsApp confirmations
- Digital booking management dashboard
- Transparent pricing and service catalog

### 1.4 Product Vision

"To create the most streamlined barber booking experience in Johannesburg, enabling Fadezone Grooming to serve more customers with less administrative overhead while delivering a premium digital experience that matches their premium service."

---

## 2. Goals & Objectives

### 2.1 Business Goals

1. **Increase Bookings:** 30% increase in monthly bookings within 3 months
2. **Reduce No-Shows:** Decrease no-show rate from ~20% to <10%
3. **Improve Efficiency:** Reduce time spent on booking administration by 50%
4. **Enhance Brand:** Position Fadezone as a modern, tech-forward barbershop
5. **Enable Growth:** Create foundation for multi-location expansion

### 2.2 Product Goals

1. **Ease of Use:** Enable booking completion in under 2 minutes
2. **Mobile-First:** 80%+ of bookings occur on mobile devices
3. **Reliability:** Maintain 99.5% uptime
4. **Performance:** Load time under 2 seconds on 3G
5. **Accessibility:** WCAG 2.1 Level AA compliance

### 2.3 Success Criteria

- 100+ bookings in first month
- Average booking completion time <2 minutes
- Customer satisfaction score >4.5/5 stars
- Mobile usage >75% of total traffic
- Staff adoption rate 100%

---

## 3. Target Users

### 3.1 Primary User: Customer

**Demographics:**
- Age: 18-45
- Gender: Predominantly male (80%), some female (20%)
- Location: Johannesburg metropolitan area
- Income: Middle to upper-middle class

**Psychographics:**
- Tech-savvy, smartphone users
- Value convenience and time efficiency
- Appreciate quality grooming services
- Active on social media and WhatsApp

**Technical Proficiency:**
- Comfortable with mobile apps
- Regular WhatsApp users
- Expect modern, responsive web experiences

**User Behaviors:**
- Book appointments 1-7 days in advance
- Prefer mobile over desktop
- Prefer messaging over phone calls
- Research services and pricing before booking

### 3.2 Secondary User: Barber/Staff

**Demographics:**
- Age: 25-45
- Professional barbers
- Small business owners/operators

**Technical Proficiency:**
- Moderate technical skills
- WhatsApp power users
- Prefer simple, intuitive interfaces
- Limited time for system training

**User Behaviors:**
- Check bookings multiple times per day
- Need quick access to customer info
- Prefer mobile dashboard access
- Communicate primarily via WhatsApp

---

## 4. Feature Specifications

### 4.1 Landing Page

**Priority:** P0 (Must Have)

#### 4.1.1 Hero Section

**Description:** Eye-catching first impression showcasing the Fadezone brand

**Requirements:**
- Large, bold "FADEZONE" branding using Anton font family
- High-quality barber/grooming imagery
- Primary CTA: "Book A Fade" button
- Responsive design for all screen sizes
- Diagonal stripe background pattern in brand yellow (#fbd600)
- Established date ("EST 2020 • JOHANNESBURG")

**Acceptance Criteria:**
- ✓ Hero section fills viewport on all devices
- ✓ CTA button is prominently displayed and functional
- ✓ Images load within 1 second
- ✓ Text is readable on all backgrounds (WCAG AA contrast)
- ✓ Layout adapts smoothly from mobile (360px) to desktop (1920px+)

#### 4.1.2 About Section

**Description:** Brief introduction to Fadezone Grooming's value proposition

**Requirements:**
- Headline: "The Standard. No Compromise."
- Subheading: "Johannesburg's Finest Grooming Hub"
- Descriptive paragraph about the brand philosophy
- Clean, minimal design with ample whitespace

**Acceptance Criteria:**
- ✓ Section is visible without scrolling on desktop
- ✓ Text is scannable and concise (<50 words)
- ✓ Brand voice is consistent (confident, premium, approachable)

#### 4.1.3 Services Showcase

**Description:** Horizontal scrollable carousel of service offerings

**Requirements:**
- Display all services with images, names, durations, and prices
- Horizontal scroll with snap points
- Navigation arrows for desktop
- Swipe gestures for mobile
- "See Our Legendary Styles" heading
- Each service card is clickable to initiate booking

**Acceptance Criteria:**
- ✓ Smooth scroll/swipe behavior
- ✓ All services display correctly
- ✓ Images are optimized (<200KB each)
- ✓ Cards are touch-friendly (minimum 44×44px tap targets)
- ✓ Clicking service navigates to booking flow

#### 4.1.4 Contact/Location Section

**Description:** Shop location, hours, and contact information

**Requirements:**
- Address: 424 Commissioner Street, Kensington, Johannesburg
- Phone: 081 268 7806
- Operating hours for each day of the week
- Features: Kid Friendly, Secure Parking, Expert Barbers
- Clean, organized layout

**Acceptance Criteria:**
- ✓ Phone number is click-to-call on mobile
- ✓ Address is accurate and properly formatted
- ✓ Hours are clearly displayed
- ✓ Current day is highlighted

#### 4.1.5 Review/Gallery CTA

**Description:** Call-to-action buttons to view gallery and submit reviews

**Requirements:**
- "See the Legend's Gallery" button → navigates to gallery
- "Review Your Experience" button → navigates to review form
- Prominent placement after services section

**Acceptance Criteria:**
- ✓ Buttons are visually distinct
- ✓ Navigation works correctly
- ✓ Touch targets are appropriately sized

---

### 4.2 Service Selection & Booking Flow

**Priority:** P0 (Must Have)

#### 4.2.1 Service Menu Page

**Description:** Categorized list of all services with detailed information

**Requirements:**
- Services grouped by category:
  - Haircuts (Hair Cut, Chiskop, Brush Cut, Kids Cut, Ladies Cut, Versatile Fade)
  - Dye & Treatments (Haircut + Black Dye, Haircut + Custom Dye)
  - Shaving (Beard Shave, Trimming)
- Each service displays:
  - Name
  - Description
  - Duration (in minutes)
  - Price (in South African Rand)
  - Image
  - "Book This Session" button
- Back button to return to homepage
- Category headings with visual separators

**Acceptance Criteria:**
- ✓ All 10 services are displayed
- ✓ Categorization is logical and clear
- ✓ Pricing matches business requirements
- ✓ Images are high-quality and representative
- ✓ "Book This Session" initiates booking for that service
- ✓ Layout is responsive (single column mobile, multi-column desktop)

#### 4.2.2 Date Selection

**Description:** Interactive calendar for selecting appointment date

**Requirements:**
- Display current month with ability to navigate forward/backward
- Highlight current day
- Disable past dates (cannot book in the past)
- Selected date is visually distinct
- Swipe gestures on mobile to change months
- Arrow buttons for month navigation
- Month and year display at top

**User Interactions:**
- Tap/click any future date to select
- Swipe left/right on mobile to change months
- Click arrows to change months on desktop

**Acceptance Criteria:**
- ✓ Calendar displays correctly for all months
- ✓ Cannot select dates in the past
- ✓ Selected date is clearly highlighted
- ✓ Navigation is smooth and responsive
- ✓ Dates wrap correctly at month boundaries
- ✓ Leap years are handled correctly

**Technical Notes:**
- Use JavaScript Date object for date handling
- Store date in YYYY-MM-DD format
- Handle timezone considerations (assume local Johannesburg time)

#### 4.2.3 Time Slot Selection

**Description:** Grid of available time slots for selected date

**Requirements:**
- Display time slots in 30-minute intervals
- Operating hours: 8:00 AM - 7:00 PM
- Show selected date at top of section
- Indicate which slots are:
  - Available (default state)
  - Booked (disabled, grayed out)
  - Selected (highlighted)
- Grid layout for easy scanning
- Real-time availability (check against existing bookings)

**User Interactions:**
- Tap/click any available slot to select
- Cannot select booked slots
- Selecting a slot automatically advances to customer info step

**Acceptance Criteria:**
- ✓ All time slots within operating hours are displayed
- ✓ Booked slots are clearly disabled
- ✓ Selected slot is visually distinct
- ✓ Availability updates in real-time
- ✓ Grid is responsive (fewer columns on mobile)
- ✓ Selecting a slot advances to next step

**Technical Notes:**
- Query Convex database for existing bookings on selected date
- Compare booking times to generate availability
- Handle edge cases (back-to-back bookings, service duration overlap)

#### 4.2.4 Customer Information Form

**Description:** Form to collect customer contact details

**Requirements:**
- Fields:
  - Full Name (required, text input)
  - Phone Number (required, tel input, validates WhatsApp format)
  - Additional Notes (optional, textarea)
- Form validation:
  - Name: minimum 2 characters, maximum 100 characters
  - Phone: South African format (10 digits or +27 format)
  - Notes: maximum 500 characters
- Clear error messages for invalid inputs
- "Back" button to return to time selection
- Form persistence (if user navigates back, data is retained)

**Acceptance Criteria:**
- ✓ All fields display correctly
- ✓ Required field validation works
- ✓ Phone number validation accepts valid SA formats
- ✓ Error messages are clear and helpful
- ✓ Form data persists on navigation
- ✓ Submission only enabled when valid

**Technical Notes:**
- Phone number must be WhatsApp-compatible (include country code)
- Store as E.164 format for consistency
- No duplicate booking prevention (same person can book multiple times)

#### 4.2.5 Booking Summary & Confirmation

**Description:** Review and confirm booking details before final submission

**Requirements:**
- Display:
  - Service name and price
  - Selected date (formatted: e.g., "Friday, May 15, 2026")
  - Selected time (formatted: e.g., "2:30 PM")
  - Customer name
  - Customer phone
  - Additional notes (if provided)
- "Confirm Booking" button
- "Edit" or "Back" option for each section
- Loading state during submission
- Success state after submission

**User Interactions:**
- Review all details
- Click "Confirm Booking" to finalize
- Navigate back to edit any detail
- After confirmation, WhatsApp opens automatically

**Acceptance Criteria:**
- ✓ All booking details display correctly
- ✓ Editing returns to appropriate step
- ✓ Confirmation button is clearly visible
- ✓ Loading state prevents double-submission
- ✓ Success triggers WhatsApp integration
- ✓ Booking is saved to database before WhatsApp opens

**Technical Notes:**
- Atomic database operation (create booking)
- Store booking ID for potential cancellation
- Handle errors gracefully (display error message, retain form data)

---

### 4.3 WhatsApp Integration

**Priority:** P0 (Must Have)

#### 4.3.1 Booking Confirmation Message

**Description:** Automatically generate and send booking confirmation via WhatsApp

**Requirements:**
- Message template:
  ```
  *FADEZONE BOOKING CONFIRMED* ✂️🔥

  *Service:* {Service Name}
  *Date:* {YYYY-MM-DD}
  *Time:* {HH:mm}
  *Client:* {Customer Name}
  *Price:* R{Price}

  Vibe the vibe! We'll see you soon.
  📍 *424 Commissioner St, Kensington*

  _Need to book again?_
  https://fadezone-grooming.netlify.app/
  ```
- Recipient: Barber's WhatsApp number (27812687806)
- Sender: Customer (via WhatsApp Click to Chat)
- Opens in new tab/window
- Uses WhatsApp URL scheme: `https://wa.me/{phone}?text={encoded_message}`

**Acceptance Criteria:**
- ✓ Message contains all booking details
- ✓ Message formatting renders correctly in WhatsApp
- ✓ URL opens WhatsApp with pre-filled message
- ✓ Works on mobile and desktop
- ✓ Works with WhatsApp Web and native app
- ✓ Message is URL-encoded properly

**Technical Notes:**
- Use `encodeURIComponent()` for message encoding
- Phone number format: country code without + symbol
- No server-side API required (client-side only)
- User must manually press "Send" in WhatsApp (not automated)

#### 4.3.2 Staff Reminder Message

**Description:** Staff can send reminders to customers from dashboard

**Requirements:**
- Message template:
  ```
  Yo {Customer Name}! Just a reminder of your legendary fade tomorrow at {Time} at Fadezone. See you then! 🔥
  ```
- Recipient: Customer's WhatsApp number
- Sender: Barber (via WhatsApp Click to Chat)
- Triggered by "Send Reminder" button in dashboard
- Opens in new tab/window

**Acceptance Criteria:**
- ✓ Message personalizes with customer name and time
- ✓ Opens WhatsApp with pre-filled message
- ✓ Works for all valid phone numbers
- ✓ Button is easily accessible in dashboard

**Technical Notes:**
- Same URL scheme as booking confirmation
- Validate customer phone number format before generating URL

---

### 4.4 Review System

**Priority:** P0 (Must Have)

#### 4.4.1 Review Submission Form

**Description:** Allow customers to submit reviews with ratings and optional photos

**Requirements:**
- Star rating selector (1-5 stars, required)
- Comment text area (required, 10-500 characters)
- Image upload (optional):
  - Accepted formats: JPEG, PNG, WebP
  - Maximum file size: 5MB
  - Image preview after selection
- "Submit Review" button
- "Back" button to return to homepage
- Form validation

**User Interactions:**
- Click star to select rating (1-5)
- Type comment in text area
- Click "Upload Image" to select photo
- Preview image before submission
- Click "Submit Review" to save

**Acceptance Criteria:**
- ✓ Star selection is intuitive and visual
- ✓ Comment validation enforces character limits
- ✓ Image upload shows preview
- ✓ File type and size validation works
- ✓ Form submits successfully
- ✓ Success message displays after submission
- ✓ Navigates to gallery after successful submission

**Technical Notes:**
- Use Convex file storage for images
- Generate upload URL via Convex mutation
- Store image reference ID in review document
- Handle upload errors gracefully

#### 4.4.2 Review Gallery

**Description:** Display all customer reviews in visual gallery format

**Requirements:**
- Display reviews in chronological order (newest first)
- Each review shows:
  - Star rating (visual stars)
  - Comment text
  - Photo (if provided)
  - Date (relative: "2 days ago" or absolute: "May 15, 2026")
- Responsive grid layout
- Image lightbox/modal for full-size viewing
- "Back to Home" button

**Acceptance Criteria:**
- ✓ Reviews display in correct order
- ✓ Images load efficiently (lazy loading)
- ✓ Layout is responsive (1 column mobile, 2-3 columns desktop)
- ✓ Star ratings display correctly
- ✓ Clicking image opens full-size view
- ✓ Date formatting is consistent

**Technical Notes:**
- Query Convex for all reviews
- Fetch image URLs from storage
- Use lazy loading for images (Intersection Observer)
- Cache reviews for performance

---

### 4.5 Staff Dashboard

**Priority:** P0 (Must Have)

#### 4.5.1 Staff Authentication

**Description:** Password-protected access to staff dashboard

**Requirements:**
- Login screen with:
  - Password input field (type="password")
  - "Secure Authenticate" button
  - Error message for invalid password
- Password stored in environment variable (`VITE_STAFF_PASSWORD`)
- Session persists until logout
- No registration process (single password for all staff)

**Security Requirements:**
- Password not stored in frontend code
- Password loaded from environment variable
- HTTPS required for production
- No password reset mechanism (contact admin)

**Acceptance Criteria:**
- ✓ Correct password grants access
- ✓ Incorrect password displays error
- ✓ Session persists on page refresh
- ✓ Logout clears session
- ✓ Cannot access dashboard without authentication

**Technical Notes:**
- Store authentication state in React state (not persistent storage for MVP)
- Compare password client-side (acceptable for MVP; improve in v2)
- No token-based authentication for MVP

#### 4.5.2 Booking List View

**Description:** Display all upcoming bookings with key details

**Requirements:**
- Show all bookings sorted by date, then time (ascending)
- Each booking card displays:
  - Customer name
  - Customer phone number
  - Service name
  - Date (formatted: "May 15, 2026")
  - Time (formatted: "2:30 PM")
  - Status badge (confirmed/pending)
- Empty state: "No bookings yet" when no bookings exist
- Real-time updates (Convex live queries)

**Acceptance Criteria:**
- ✓ All bookings display correctly
- ✓ Sorting is correct (chronological)
- ✓ Customer info is accurate
- ✓ Service names match booking IDs
- ✓ Empty state displays when appropriate
- ✓ Updates in real-time when new booking is made

**Technical Notes:**
- Use Convex `useQuery` for real-time updates
- Map service IDs to service details from constants
- Handle missing service IDs gracefully

#### 4.5.3 Booking Management Actions

**Description:** Staff can manage bookings with actions

**Requirements:**
- Actions per booking:
  - "Send Reminder" → Opens WhatsApp with reminder message
  - "Cancel Booking" → Deletes booking after confirmation
- Confirmation modal for destructive actions (cancel)
- Success/error feedback after actions

**User Interactions:**
- Click "Send Reminder" → WhatsApp opens
- Click "Cancel Booking" → Confirmation modal appears
- Confirm cancellation → Booking is deleted, modal closes
- Cancel cancellation → Modal closes, booking remains

**Acceptance Criteria:**
- ✓ "Send Reminder" opens WhatsApp correctly
- ✓ "Cancel Booking" shows confirmation modal
- ✓ Cancellation deletes booking from database
- ✓ UI updates immediately after cancellation
- ✓ Error handling for failed operations

**Technical Notes:**
- Use Convex `useMutation` for delete operation
- Use `window.confirm()` for MVP (custom modal in v2)
- Optimistic UI updates for better UX

#### 4.5.4 Logout Functionality

**Description:** Staff can log out of dashboard

**Requirements:**
- "Logout" button prominently displayed in header
- Clicking logout clears session and returns to login screen
- No confirmation required (non-destructive action)

**Acceptance Criteria:**
- ✓ Logout button is visible and accessible
- ✓ Clicking logout clears authentication state
- ✓ Returns to login screen after logout

---

### 4.6 Navigation & Layout

**Priority:** P0 (Must Have)

#### 4.6.1 Header/Navigation

**Description:** Persistent navigation component

**Requirements:**
- Logo/branding: "FADEZONE" text logo
- View toggle:
  - "Customer View" (default)
  - "Staff Portal" (navigates to staff login)
- Responsive behavior:
  - Full header on desktop
  - Hamburger menu on mobile (if needed)
- Sticky/fixed position (always visible)

**Acceptance Criteria:**
- ✓ Header is visible on all pages
- ✓ View toggle works correctly
- ✓ Logo is clickable and returns to homepage
- ✓ Responsive design adapts to screen size
- ✓ Doesn't obscure content (appropriate z-index)

#### 4.6.2 Footer

**Description:** Footer with essential information and links

**Requirements:**
- Copyright notice: "© 2026 Fadezone Grooming"
- Contact information (phone, address)
- Social media links (if applicable)
- Simple, minimal design

**Acceptance Criteria:**
- ✓ Footer displays on all pages
- ✓ Contact info is accurate
- ✓ Links are functional
- ✓ Responsive design

---

## 5. User Interface Requirements

### 5.1 Design System

#### 5.1.1 Color Palette

**Primary Colors:**
- Brand Yellow: `#fbd600` (hex) / `rgb(251, 214, 0)`
- Brand Red: `#b32b2b` (hex) / `rgb(179, 43, 43)`
- Dark Brown: `#3e2723` (hex) / `rgb(62, 39, 35)`

**Neutral Colors:**
- Black: `#000000` / `rgb(0, 0, 0)`
- White: `#ffffff` / `rgb(255, 255, 255)`
- Gray 100: `#f5f5f5`
- Gray 400: `#9ca3af`
- Gray 900: `#1f2937`

**Accent Colors:**
- Light Teal: `#e0f2f1` (background accents)

**Usage Guidelines:**
- Primary CTA buttons: Brand Yellow (#fbd600) background, black text
- Secondary CTA buttons: Brand Red (#b32b2b) background, white text
- Headings: Brand Red or Dark Brown
- Body text: Black or Gray 900
- Backgrounds: White, Brand Yellow, or Light Teal

#### 5.1.2 Typography

**Font Families:**
```css
Primary Brand Font: 'Anton', sans-serif
Headings: 'Anton', sans-serif (italic for emphasis)
Body Text: 'Inter', sans-serif
Serif Accents: 'Playfair Display', serif (italics)
Monospace: 'JetBrains Mono', monospace (for time/dates)
```

**Type Scale:**
- Heading 1 (Hero): 96px (desktop), 48px (mobile)
- Heading 2: 64px (desktop), 32px (mobile)
- Heading 3: 48px (desktop), 24px (mobile)
- Heading 4: 32px (desktop), 20px (mobile)
- Body Large: 20px
- Body: 16px
- Body Small: 14px
- Caption: 12px
- Micro: 10px

**Font Weights:**
- Regular: 400
- Bold: 700
- Black: 900

**Line Heights:**
- Headings: 1.1 (tight)
- Body: 1.6 (comfortable reading)

#### 5.1.3 Spacing System

**8-Point Grid:**
- Base unit: 8px
- Spacing scale: 8, 16, 24, 32, 40, 48, 64, 80, 96, 128

**Component Spacing:**
- Tight: 8px
- Default: 16px
- Comfortable: 24px
- Spacious: 32px+

#### 5.1.4 Components

**Buttons:**
- Primary:
  - Background: #fbd600
  - Text: Black, uppercase, bold
  - Padding: 16px 32px
  - Border radius: 24px
  - Shadow: 8px 8px 0px 0px rgba(0,0,0,1) (comic book style)
  - Hover: Translate shadow effect
- Secondary:
  - Background: #b32b2b
  - Text: White, uppercase, bold
  - Same padding and styling as primary

**Input Fields:**
- Background: White or Black (depending on context)
- Border: 2px solid (gray or brand color)
- Border radius: 24px
- Padding: 16px
- Font size: 16px (prevent mobile zoom)

**Cards:**
- Background: White
- Border: 2px solid black (or none)
- Border radius: 32px (large) or 16px (small)
- Shadow: 8px 8px 0px 0px rgba(0,0,0,1)
- Padding: 32px

### 5.2 Responsive Design

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Mobile-First Approach:**
- Design for mobile first
- Progressive enhancement for larger screens
- Touch-friendly targets (minimum 44×44px)

**Grid System:**
- Mobile: Single column
- Tablet: 2-3 columns
- Desktop: Up to 4 columns (depending on content)

### 5.3 Animation & Interaction

**Transitions:**
- Duration: 200-300ms
- Easing: ease-in-out or cubic-bezier(0.23, 1, 0.32, 1)

**Hover States:**
- Buttons: Shadow transform effect
- Cards: Lift effect (translateY)
- Links: Color change

**Loading States:**
- Spinner for async operations
- Skeleton screens for content loading

**Page Transitions:**
- Smooth scroll to top when navigating
- Fade-in for new content

---

## 6. Technical Specifications

### 6.1 Technology Stack

**Frontend:**
- **Framework:** React 19.2.4+
- **Language:** TypeScript 5.8.2
- **Build Tool:** Vite 7.3.2
- **Styling:** Tailwind CSS 4.1.18
- **Icons:** Lucide React 0.563.0
- **Gestures:** React Swipeable 7.0.2

**Backend:**
- **BaaS:** Convex 1.32.0
  - Real-time database
  - Serverless functions (queries/mutations)
  - File storage

**Hosting:**
- **Platform:** Netlify (recommended) or Vercel
- **SSL:** Automatic via hosting platform
- **CDN:** Built-in via hosting platform

### 6.2 Architecture

**Frontend Architecture:**
- Single Page Application (SPA)
- Component-based architecture
- State management: React hooks (useState, useCallback, useRef)
- Step-based navigation (0-5 steps)

**Backend Architecture:**
- Serverless functions (Convex)
- Real-time data synchronization
- Optimistic UI updates

**Data Flow:**
1. User interaction → React component
2. Component calls Convex mutation/query
3. Convex updates database
4. Convex pushes updates to all connected clients
5. React re-renders with new data

### 6.3 API Specifications

#### 6.3.1 Booking APIs

**getBookings (Query)**
```typescript
// No arguments
// Returns: Array of booking objects
interface Booking {
  _id: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  notes?: string;
  status: 'confirmed' | 'pending';
  _creationTime: number;
}
```

**addBooking (Mutation)**
```typescript
// Arguments:
interface AddBookingArgs {
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  notes?: string;
  status: 'confirmed' | 'pending';
}
// Returns: booking ID (string)
```

**deleteBooking (Mutation)**
```typescript
// Arguments:
interface DeleteBookingArgs {
  id: string; // Booking ID
}
// Returns: void
```

**updateBookingStatus (Mutation)**
```typescript
// Arguments:
interface UpdateBookingStatusArgs {
  id: string; // Booking ID
  status: 'confirmed' | 'pending';
}
// Returns: void
```

#### 6.3.2 Review APIs

**getReviews (Query)**
```typescript
// No arguments
// Returns: Array of review objects with image URLs
interface Review {
  _id: string;
  rating: number; // 1-5
  comment: string;
  imageId?: string;
  imageUrl?: string | null;
  createdAt: number; // timestamp
}
```

**addReview (Mutation)**
```typescript
// Arguments:
interface AddReviewArgs {
  rating: number; // 1-5
  comment: string;
  imageId?: string; // Storage ID
}
// Returns: void
```

**generateUploadUrl (Mutation)**
```typescript
// No arguments
// Returns: Upload URL (string)
```

### 6.4 Database Schema

**Convex Schema:**
```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookings: defineTable({
    serviceId: v.string(),
    date: v.string(), // YYYY-MM-DD
    time: v.string(), // HH:mm
    customerName: v.string(),
    customerPhone: v.string(),
    notes: v.optional(v.string()),
    status: v.union(v.literal("confirmed"), v.literal("pending")),
  }),
  reviews: defineTable({
    rating: v.number(),
    comment: v.string(),
    imageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
  }),
});
```

### 6.5 File Structure

```
trimtime---barber-scheduling/
├── public/
│   ├── services/           # Service images
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── TimeGrid.tsx
│   │   ├── BookingSummary.tsx
│   │   ├── ReviewPage.tsx
│   │   ├── Gallery.tsx
│   │   └── ConvexClientProvider.tsx
│   ├── convex/
│   │   ├── _generated/     # Auto-generated
│   │   ├── schema.ts
│   │   ├── bookings.ts
│   │   └── reviews.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx             # Main application
│   ├── index.tsx           # Entry point
│   ├── types.ts            # TypeScript types
│   ├── constants.tsx       # Services, hours, config
│   └── styles.css          # Global styles
├── .env.local              # Environment variables
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 7. Non-Functional Requirements

### 7.1 Performance

**Load Time:**
- Initial page load: <2 seconds on 3G
- Time to Interactive (TTI): <3 seconds
- First Contentful Paint (FCP): <1.5 seconds

**Bundle Size:**
- Total JavaScript: <500KB (gzipped)
- CSS: <50KB (gzipped)
- Images: Lazy loaded, <200KB each

**Optimization Techniques:**
- Code splitting by route
- Lazy loading images
- Tree shaking
- Minification
- Compression (Brotli/Gzip)

### 7.2 Scalability

**Current Capacity:**
- 1,000 bookings per month
- 10,000 monthly active users
- 100 reviews

**Future Scalability:**
- Convex free tier: 5GB bandwidth/month
- Upgrade path available if needed

### 7.3 Reliability

**Uptime:**
- Target: 99.5% uptime
- Monitoring: Uptime monitoring service

**Error Handling:**
- Graceful degradation
- User-friendly error messages
- Error tracking (Sentry or similar)

**Backup:**
- Convex handles automatic backups
- Export capability for data portability

### 7.4 Security

**Authentication:**
- Staff password protection
- Environment variable storage
- HTTPS only in production

**Data Protection:**
- No sensitive data stored (no credit cards, etc.)
- Customer phone numbers are necessary for WhatsApp
- GDPR considerations (if applicable)

**Input Validation:**
- Client-side validation
- Server-side validation (Convex schema)
- XSS prevention
- SQL injection not applicable (NoSQL database)

### 7.5 Accessibility

**WCAG 2.1 Level AA Compliance:**
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios: minimum 4.5:1
- Alt text for images
- ARIA labels where appropriate
- Focus indicators
- Skip navigation links

**Testing Tools:**
- axe DevTools
- WAVE
- Lighthouse Accessibility Audit

### 7.6 Browser Compatibility

**Supported Browsers:**
- Chrome 90+ (85% users)
- Safari 14+ (10% users)
- Firefox 88+ (3% users)
- Edge 90+ (2% users)

**Mobile Browsers:**
- Chrome Android (latest)
- Safari iOS 13+ (latest 2 versions)

**Testing Strategy:**
- BrowserStack for cross-browser testing
- Real device testing (iOS, Android)

### 7.7 Internationalization

**Current Support:**
- English only
- South African Rand (ZAR) currency
- 24-hour time format (or 12-hour with AM/PM)

**Future Considerations:**
- Multi-language support (isiZulu, Afrikaans)
- Multiple currencies
- Date/time format localization

---

## 8. Integration Requirements

### 8.1 WhatsApp Integration

**Method:** WhatsApp Click to Chat (URL Scheme)

**Requirements:**
- Phone number format: E.164 (e.g., 27812687806)
- Message encoding: URL-encoded
- Platform support: Works on all devices with WhatsApp

**Limitations:**
- Requires user to manually send message
- No delivery confirmation
- No automated sending

**Future Enhancements:**
- WhatsApp Business API for automated messages

### 8.2 Analytics Integration

**Recommended:** Google Analytics 4 (GA4)

**Events to Track:**
- Page views
- Service selections
- Booking completions
- Booking cancellations
- Review submissions
- WhatsApp link clicks
- Error occurrences

### 8.3 Error Tracking

**Recommended:** Sentry

**Configuration:**
- Track JavaScript errors
- Track API errors
- Source maps for debugging
- User feedback on errors

---

## 9. Data Requirements

### 9.1 Data Models

*See Section 6.4 for detailed schema*

### 9.2 Data Validation

**Booking Validation:**
- Service ID must exist in SERVICES constant
- Date must be valid and in the future
- Time must be within operating hours (8:00-19:00)
- Customer name: 2-100 characters
- Customer phone: Valid SA phone number
- Notes: Max 500 characters

**Review Validation:**
- Rating: Integer 1-5
- Comment: 10-500 characters
- Image: JPEG/PNG/WebP, max 5MB

### 9.3 Data Retention

**Bookings:**
- Retain for 6 months after appointment date
- Auto-delete or archive after retention period

**Reviews:**
- Retain indefinitely
- Admin can delete inappropriate reviews

**Images:**
- Retain while review exists
- Delete when review is deleted

### 9.4 Data Privacy

**Personal Data Collected:**
- Customer name
- Customer phone number
- Optional notes

**Data Usage:**
- Booking management
- Customer communication
- Service improvement

**Data Sharing:**
- Not shared with third parties
- WhatsApp integration (user-initiated)

**User Rights:**
- Request data deletion (via WhatsApp contact)
- No account system, so no self-service deletion

---

## 10. Constraints & Assumptions

### 10.1 Constraints

1. **Budget:** Limited budget, requiring free/low-cost services
2. **Timeline:** 4-6 week development window
3. **Resources:** Single developer
4. **Technical:** No native mobile app (web only)
5. **Communication:** WhatsApp-only (no SMS/email APIs)

### 10.2 Assumptions

1. **User Base:**
   - All customers have smartphones with WhatsApp
   - Majority (80%) book via mobile devices
   - Users are comfortable with web applications

2. **Business Operations:**
   - Single barber operates the shop
   - Consistent working hours (8 AM - 7 PM, Mon-Sat)
   - 30-minute appointment slots are sufficient
   - Walk-ins are still accepted (not blocked by online bookings)

3. **Technical:**
   - Modern browsers (last 2 versions)
   - Stable internet connection for real-time updates
   - Convex free tier is sufficient for traffic volume

4. **Communications:**
   - WhatsApp is reliable and accessible
   - Customers will manually send WhatsApp confirmation
   - No-shows/cancellations handled via WhatsApp

---

## 11. Success Metrics

### 11.1 Key Performance Indicators (KPIs)

**Booking Metrics:**
- Total bookings per month: Target 100+ in Month 1
- Booking conversion rate: Target 30%
- Average booking time: Target <2 minutes
- Booking cancellation rate: Target <5%

**User Engagement:**
- Return visitor rate: Target 40%
- WhatsApp click-through rate: Target 80%
- Review submission rate: Target 20% of bookings

**Business Impact:**
- No-show reduction: Target 50% decrease
- Revenue increase: Track monthly revenue
- Customer satisfaction: Target 4.5+ star average

**Technical Performance:**
- Page load time: <2 seconds
- Error rate: <0.1%
- Uptime: 99.5%

### 11.2 Analytics Implementation

**Tools:**
- Google Analytics 4 for user behavior
- Convex dashboard for database metrics
- Sentry for error tracking

**Dashboards:**
- Weekly booking summary
- Monthly performance review
- Real-time error monitoring

---

## 12. Release Criteria

### 12.1 MVP Launch Checklist

**Functionality:**
- [ ] All P0 features implemented
- [ ] End-to-end booking flow works
- [ ] WhatsApp integration functional
- [ ] Staff dashboard accessible
- [ ] Review system operational

**Quality:**
- [ ] No critical bugs
- [ ] Cross-browser testing passed
- [ ] Mobile device testing passed
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance benchmarks met

**Security:**
- [ ] HTTPS configured
- [ ] Environment variables secured
- [ ] Input validation implemented
- [ ] XSS protection in place

**Deployment:**
- [ ] Production environment configured
- [ ] Domain connected
- [ ] SSL certificate active
- [ ] Analytics tracking live
- [ ] Error monitoring active

**Documentation:**
- [ ] User guide for staff
- [ ] Technical documentation complete
- [ ] API documentation complete
- [ ] README updated

**Training & Support:**
- [ ] Staff trained on dashboard
- [ ] Support plan in place
- [ ] Escalation process defined

### 12.2 Post-Launch Monitoring

**First 24 Hours:**
- Monitor error logs hourly
- Check booking success rate
- Verify WhatsApp integration
- Staff availability for support

**First Week:**
- Daily analytics review
- User feedback collection
- Bug triage and fixes
- Performance monitoring

**First Month:**
- Weekly metrics review
- User survey (optional)
- Feature usage analysis
- Planning for v2 features

---

## Appendix

### A. Glossary

- **MVP:** Minimum Viable Product
- **BaaS:** Backend-as-a-Service
- **SPA:** Single Page Application
- **PWA:** Progressive Web App
- **CTA:** Call To Action
- **WCAG:** Web Content Accessibility Guidelines
- **KPI:** Key Performance Indicator
- **TTI:** Time To Interactive
- **FCP:** First Contentful Paint

### B. References

- Convex Documentation: https://docs.convex.dev/
- React Documentation: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- WhatsApp Click to Chat: https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat

### C. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-04-25 | Thabiso Buthelezi | Initial PRD creation |

---

**Document Approval:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | Thabiso Buthelezi | ___________ | _______ |
| Technical Lead | Thabiso Buthelezi | ___________ | _______ |
| Stakeholder | Fadezone Grooming | ___________ | _______ |

---

*End of Product Requirements Document*
