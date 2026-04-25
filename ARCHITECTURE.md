# TrimTime Barber Scheduling - Technical Architecture Document

**Version:** 2.0
**Last Updated:** April 25, 2026
**Author:** Thabiso Buthelezi
**Status:** Draft for Review

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Backend Architecture](#4-backend-architecture)
5. [Data Architecture](#5-data-architecture)
6. [Integration Architecture](#6-integration-architecture)
7. [Security Architecture](#7-security-architecture)
8. [Deployment Architecture](#8-deployment-architecture)
9. [Performance Optimization](#9-performance-optimization)
10. [Scalability Considerations](#10-scalability-considerations)
11. [Development Workflow](#11-development-workflow)
12. [Testing Strategy](#12-testing-strategy)
13. [Monitoring & Observability](#13-monitoring--observability)
14. [Migration Plan](#14-migration-plan)

---

## 1. Executive Summary

### 1.1 Architecture Overview

TrimTime v2.0 is a modern, serverless web application built with a React frontend and Convex backend. The architecture prioritizes:

- **Simplicity:** Minimal complexity, easy to maintain
- **Performance:** Fast load times, responsive interactions
- **Scalability:** Ability to grow with business needs
- **Reliability:** High uptime, graceful error handling
- **Cost-Efficiency:** Leveraging free tiers and serverless architecture

### 1.2 Key Architectural Decisions

| Decision | Rationale | Trade-offs |
|----------|-----------|------------|
| **React SPA** | Modern, component-based, excellent ecosystem | No server-side rendering (SSR) in MVP |
| **TypeScript** | Type safety, better DX, fewer runtime errors | Slight learning curve, build complexity |
| **Convex BaaS** | Real-time sync, serverless, generous free tier | Vendor lock-in, less control over backend |
| **Tailwind CSS** | Rapid development, small bundle, utility-first | Non-semantic class names, learning curve |
| **Vite** | Fast builds, modern tooling, HMR | Less mature than Webpack, smaller ecosystem |
| **Client-side WhatsApp** | No API costs, simple implementation | Manual user action required |
| **Netlify/Vercel Hosting** | Free tier, CDN, automatic deployments | Platform limitations on free tier |

### 1.3 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React 19 + TypeScript SPA                  │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │
│  │  │  Pages/  │  │Components│  │  State   │  │ Utils  │  │   │
│  │  │  Views   │  │          │  │ Management│ │        │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │
│  │         ▲             ▲             ▲                    │   │
│  │         │             │             │                    │   │
│  │         └─────────────┴─────────────┘                    │   │
│  │                       │                                   │   │
│  │                 Convex React SDK                         │   │
│  └─────────────────────────┬─────────────────────────────────┘   │
└─────────────────────────────┼─────────────────────────────────────┘
                              │ WebSocket (Live Queries)
                              │ HTTPS (Mutations)
┌─────────────────────────────┼─────────────────────────────────────┐
│                         BACKEND LAYER                            │
│  ┌─────────────────────────┴─────────────────────────────────┐   │
│  │                   Convex Backend                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │ Queries  │  │Mutations │  │ Database │  │  Storage │  │   │
│  │  │(Read Ops)│  │(Write Ops)│ │ (NoSQL)  │  │ (Files)  │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │   │
│  │       │              │             │             │         │   │
│  │       └──────────────┴─────────────┴─────────────┘         │   │
│  │                    Convex Runtime                          │   │
│  └───────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────┼─────────────────────────────────────┐
│                     INTEGRATION LAYER                            │
│  ┌────────────────────┐         ┌──────────────────────────┐     │
│  │  WhatsApp          │         │  Analytics / Monitoring  │     │
│  │  (Click-to-Chat)   │         │  (GA4, Sentry)          │     │
│  └────────────────────┘         └──────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. System Architecture Overview

### 2.1 Architectural Style

**Pattern:** Client-Server with Real-Time Synchronization

**Key Characteristics:**
- **Frontend:** Single Page Application (SPA)
- **Backend:** Serverless Backend-as-a-Service (BaaS)
- **Communication:** WebSocket (live queries) + HTTPS (mutations)
- **Data Flow:** Unidirectional (React state → Convex → React state)

### 2.2 Technology Stack Summary

#### Frontend Stack
```typescript
{
  "framework": "React 19.2.4",
  "language": "TypeScript 5.8.2",
  "buildTool": "Vite 7.3.2",
  "styling": "Tailwind CSS 4.1.18",
  "stateManagement": "React Hooks (useState, useCallback, useRef)",
  "dataFetching": "Convex React SDK (useQuery, useMutation)",
  "icons": "Lucide React 0.563.0",
  "gestures": "React Swipeable 7.0.2"
}
```

#### Backend Stack
```typescript
{
  "platform": "Convex",
  "database": "Convex NoSQL Database",
  "functions": "Convex Serverless Functions",
  "storage": "Convex File Storage",
  "realtime": "Convex Live Queries (WebSocket)"
}
```

#### DevOps Stack
```typescript
{
  "hosting": "Netlify / Vercel",
  "versionControl": "Git / GitHub",
  "cicd": "Netlify / Vercel (automatic deployments)",
  "monitoring": "Sentry (errors), Google Analytics (usage)",
  "cdn": "Built-in (Netlify/Vercel)"
}
```

### 2.3 System Context

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          USERS                                  │
│                                                                 │
│  ┌───────────────┐              ┌──────────────────┐          │
│  │   Customers   │              │   Barber/Staff   │          │
│  │  (Mobile/Web) │              │   (Mobile/Web)   │          │
│  └───────┬───────┘              └────────┬─────────┘          │
│          │                               │                     │
└──────────┼───────────────────────────────┼─────────────────────┘
           │                               │
           ▼                               ▼
    ┌──────────────────────────────────────────────┐
    │         TrimTime Web Application             │
    │  (Hosted on Netlify/Vercel + Convex)        │
    └──────────────────┬───────────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  External Services   │
            │  - WhatsApp          │
            │  - Google Analytics  │
            │  - Sentry            │
            └──────────────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Component Architecture

#### 3.1.1 Component Hierarchy

```
App (Root)
├── Layout
│   ├── Header
│   └── Footer
├── Customer View (activeView === 'customer')
│   ├── LandingPage (step === 0)
│   │   ├── HeroSection
│   │   ├── AboutSection
│   │   ├── ServicesShowcase
│   │   │   └── ServiceCard[]
│   │   └── ContactSection
│   ├── ServiceMenu (step === 1)
│   │   └── ServiceCategory[]
│   │       └── ServiceCard[]
│   ├── BookingFlow (step === 2)
│   │   ├── DateSelection
│   │   │   └── Calendar
│   │   └── TimeSelection
│   │       └── TimeGrid
│   ├── CustomerInfo (step === 3)
│   │   └── BookingSummary
│   ├── ReviewPage (step === 4)
│   │   └── ReviewForm
│   └── Gallery (step === 5)
│       └── ReviewCard[]
└── Staff View (activeView === 'barber')
    ├── StaffLogin
    └── StaffDashboard
        ├── BookingList
        └── BookingCard[]
```

#### 3.1.2 Component Specifications

**App.tsx (Root Component)**
```typescript
// Responsibilities:
// - Top-level state management
// - View routing (customer vs staff)
// - Step management (0-5)
// - Convex data fetching (bookings, reviews)
// - WhatsApp integration logic

interface AppState {
  activeView: 'customer' | 'barber';
  step: 0 | 1 | 2 | 3 | 4 | 5;
  selectedService: Service | null;
  selectedDate: Date;
  selectedTime: string | null;
  customerName: string;
  customerPhone: string;
  notes: string;
  isStaffAuthenticated: boolean;
  lastBookingId: string | null;
}
```

**Layout.tsx**
```typescript
// Responsibilities:
// - Consistent header/footer
// - Navigation between views
// - Responsive container

interface LayoutProps {
  activeView: 'customer' | 'barber';
  onViewChange: (view: 'customer' | 'barber') => void;
  currentStep: number;
  onGoToSection: (sectionId: string) => void;
  isStaffAuthenticated: boolean;
  onLogout: () => void;
  children: React.ReactNode;
}
```

**TimeGrid.tsx**
```typescript
// Responsibilities:
// - Display available time slots
// - Handle slot selection
// - Show booked slots (disabled)
// - Real-time availability updates

interface TimeGridProps {
  selectedDate: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  bookings: Booking[];
}

// Logic:
// 1. Generate time slots (8:00 AM - 7:00 PM, 30-min intervals)
// 2. Filter bookings for selected date
// 3. Mark slots as booked if they match existing bookings
// 4. Render grid of time slot buttons
```

**BookingSummary.tsx**
```typescript
// Responsibilities:
// - Display booking details
// - Collect customer information
// - Validate form inputs
// - Trigger booking confirmation

interface BookingSummaryProps {
  service: Service;
  time: string;
  date: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onNotesChange: (notes: string) => void;
  onConfirm: () => void;
}
```

**ReviewPage.tsx**
```typescript
// Responsibilities:
// - Review form UI
// - Star rating selector
// - Image upload
// - Form submission

interface ReviewPageProps {
  onBack: () => void;
  onSubmitReview: (review: ReviewSubmission) => Promise<void>;
}

interface ReviewSubmission {
  rating: number;
  comment: string;
  image?: File;
}
```

**Gallery.tsx**
```typescript
// Responsibilities:
// - Display all reviews
// - Image rendering
// - Lazy loading
// - Responsive grid

interface GalleryProps {
  reviews: Review[];
  onBack: () => void;
}
```

### 3.2 State Management

#### 3.2.1 State Architecture

**Local Component State:**
- Form inputs (controlled components)
- UI state (modals, dropdowns, etc.)
- Transient state (hover, focus, etc.)

**Application State (App.tsx):**
- View/step navigation
- Booking form data
- Authentication status
- Selected service/date/time

**Server State (Convex):**
- Bookings data
- Reviews data
- Real-time synchronization

#### 3.2.2 State Flow

```
User Interaction
      │
      ▼
Component Event Handler
      │
      ▼
State Update (useState)
      │
      ▼
Re-render Component
      │
      ▼
Convex Mutation (if needed)
      │
      ▼
Database Update
      │
      ▼
Convex Live Query Push
      │
      ▼
React Re-render (all subscribed components)
```

### 3.3 Routing Strategy

**Step-Based Navigation (No React Router):**

```typescript
// Navigation is controlled by 'step' state
const steps = {
  0: 'Landing Page',
  1: 'Service Menu',
  2: 'Date & Time Selection',
  3: 'Customer Info & Booking Summary',
  4: 'Review Page',
  5: 'Gallery'
};

// Navigation flow:
// Landing (0) → Service Menu (1) → Booking (2) → Summary (3) → WhatsApp
// Landing (0) → Review (4)
// Landing (0) → Gallery (5)
```

**Benefits:**
- Simple implementation
- No additional dependencies
- Full control over navigation flow
- Easy to implement back/forward logic

**Trade-offs:**
- No URL-based navigation
- Can't bookmark specific steps
- Browser back button doesn't work intuitively

**Future Enhancement:**
- Add React Router for proper URL routing
- Use URL params for step/service selection
- Enable deep linking

### 3.4 Data Fetching Strategy

**Convex React SDK:**

```typescript
// Live Queries (Real-time, auto-updating)
const bookings = useQuery(api.bookings.getBookings);
const reviews = useQuery(api.reviews.getReviews);

// Mutations (Write operations)
const addBooking = useMutation(api.bookings.addBooking);
const deleteBooking = useMutation(api.bookings.deleteBooking);
const addReview = useMutation(api.reviews.addReview);

// Usage pattern:
// 1. Component mounts → useQuery fetches data
// 2. Data updates in DB → useQuery auto-updates
// 3. User action → useMutation sends update
// 4. Mutation completes → useQuery receives update → Component re-renders
```

**Benefits:**
- Automatic real-time updates
- No manual cache invalidation
- Optimistic UI updates
- Offline support (Convex handles)

### 3.5 Error Handling

**Strategy:**

```typescript
// API Errors
try {
  await addBookingMutation({ ... });
  // Success handling
} catch (error) {
  console.error("Booking failed:", error);
  alert("Something went wrong. Please try again.");
}

// Form Validation Errors
if (!customerName || customerName.length < 2) {
  setError("Name must be at least 2 characters");
  return;
}

// Network Errors
// Convex SDK handles automatically with retries
```

**Error UI Patterns:**
- Inline validation errors (form fields)
- Alert/toast for critical errors
- Console logging for debugging
- Error boundary for component crashes (future)

---

## 4. Backend Architecture

### 4.1 Convex Architecture

#### 4.1.1 Convex Overview

**What is Convex?**
- Backend-as-a-Service (BaaS) platform
- Real-time database with serverless functions
- Automatic API generation
- Built-in authentication (not used in MVP)
- File storage
- Live queries (WebSocket-based)

**Why Convex?**
- Zero backend code to write initially
- Real-time sync out of the box
- Generous free tier (5GB bandwidth/month)
- TypeScript-first
- Excellent developer experience

#### 4.1.2 Convex Project Structure

```
convex/
├── _generated/
│   ├── api.d.ts         # Auto-generated API types
│   ├── api.js           # Auto-generated API exports
│   ├── dataModel.d.ts   # Auto-generated data model types
│   ├── server.d.ts      # Server-side types
│   └── server.js        # Server-side runtime
├── schema.ts            # Database schema definition
├── bookings.ts          # Booking queries & mutations
├── reviews.ts           # Review queries & mutations
└── tsconfig.json        # TypeScript config for Convex
```

### 4.2 Database Schema

#### 4.2.1 Schema Definition

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Bookings table
  bookings: defineTable({
    serviceId: v.string(),           // References SERVICES constant
    date: v.string(),                // YYYY-MM-DD format
    time: v.string(),                // HH:mm format (24-hour)
    customerName: v.string(),        // Full name
    customerPhone: v.string(),       // E.164 format (e.g., 27812687806)
    notes: v.optional(v.string()),   // Optional notes
    status: v.union(
      v.literal("confirmed"),
      v.literal("pending")
    ),
  }),

  // Reviews table
  reviews: defineTable({
    rating: v.number(),              // Integer 1-5
    comment: v.string(),             // Review text
    imageId: v.optional(v.id("_storage")), // Reference to uploaded image
    createdAt: v.number(),           // Unix timestamp
  }),
});
```

#### 4.2.2 Data Model Diagram

```
┌─────────────────────────────────────────────┐
│              BOOKINGS TABLE                 │
├─────────────────────────────────────────────┤
│ _id: Id<"bookings"> (auto)                 │
│ serviceId: string                           │
│ date: string (YYYY-MM-DD)                   │
│ time: string (HH:mm)                        │
│ customerName: string                        │
│ customerPhone: string                       │
│ notes?: string                              │
│ status: "confirmed" | "pending"             │
│ _creationTime: number (auto)                │
└─────────────────────────────────────────────┘
                │
                │ Foreign Key (logical, not enforced)
                ▼
        ┌───────────────┐
        │   SERVICES    │
        │  (constants)  │
        └───────────────┘

┌─────────────────────────────────────────────┐
│               REVIEWS TABLE                 │
├─────────────────────────────────────────────┤
│ _id: Id<"reviews"> (auto)                  │
│ rating: number (1-5)                        │
│ comment: string                             │
│ imageId?: Id<"_storage">                    │
│ createdAt: number                           │
└─────────────────────────────────────────────┘
                │
                │ Foreign Key (if image exists)
                ▼
        ┌───────────────┐
        │   _storage    │
        │   (Convex)    │
        └───────────────┘
```

### 4.3 Serverless Functions

#### 4.3.1 Queries (Read Operations)

**bookings.getBookings**
```typescript
// convex/bookings.ts
export const getBookings = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all bookings, ordered by creation time
    return await ctx.db.query("bookings").collect();
  },
});

// Usage: const bookings = useQuery(api.bookings.getBookings);
```

**reviews.getReviews**
```typescript
// convex/reviews.ts
export const getReviews = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all reviews, newest first
    const reviews = await ctx.db.query("reviews").order("desc").collect();

    // Fetch image URLs for reviews with images
    return Promise.all(
      reviews.map(async (review) => ({
        ...review,
        imageUrl: review.imageId
          ? await ctx.storage.getUrl(review.imageId)
          : null,
      }))
    );
  },
});

// Usage: const reviews = useQuery(api.reviews.getReviews);
```

#### 4.3.2 Mutations (Write Operations)

**bookings.addBooking**
```typescript
// convex/bookings.ts
export const addBooking = mutation({
  args: {
    serviceId: v.string(),
    date: v.string(),
    time: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    notes: v.optional(v.string()),
    status: v.union(v.literal("confirmed"), v.literal("pending")),
  },
  handler: async (ctx, args) => {
    // Insert booking into database
    const bookingId = await ctx.db.insert("bookings", args);
    return bookingId;
  },
});

// Usage:
// const addBooking = useMutation(api.bookings.addBooking);
// await addBooking({ serviceId: "haircut", date: "2026-05-15", ... });
```

**bookings.deleteBooking**
```typescript
// convex/bookings.ts
export const deleteBooking = mutation({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    // Delete booking by ID
    await ctx.db.delete(args.id);
  },
});

// Usage:
// const deleteBooking = useMutation(api.bookings.deleteBooking);
// await deleteBooking({ id: bookingId });
```

**reviews.addReview**
```typescript
// convex/reviews.ts
export const addReview = mutation({
  args: {
    rating: v.number(),
    comment: v.string(),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // Insert review with current timestamp
    await ctx.db.insert("reviews", {
      rating: args.rating,
      comment: args.comment,
      imageId: args.imageId,
      createdAt: Date.now(),
    });
  },
});

// Usage:
// const addReview = useMutation(api.reviews.addReview);
// await addReview({ rating: 5, comment: "Great service!", imageId });
```

**reviews.generateUploadUrl**
```typescript
// convex/reviews.ts
export const generateUploadUrl = mutation(async (ctx) => {
  // Generate temporary upload URL for image
  return await ctx.storage.generateUploadUrl();
});

// Usage:
// const generateUploadUrl = useMutation(api.reviews.generateUploadUrl);
// const uploadUrl = await generateUploadUrl();
// await fetch(uploadUrl, { method: "POST", body: imageFile });
```

### 4.4 File Storage

**Convex Storage Architecture:**

```
Image Upload Flow:
1. Client calls generateUploadUrl mutation
2. Convex returns temporary upload URL
3. Client uploads file to URL (POST request)
4. Convex stores file and returns storage ID
5. Client saves storage ID in review document
6. When fetching reviews, client gets signed URL for each image
```

**Implementation:**
```typescript
// Upload image
const uploadUrl = await generateUploadUrl();
const response = await fetch(uploadUrl, {
  method: "POST",
  headers: { "Content-Type": imageFile.type },
  body: imageFile,
});
const { storageId } = await response.json();

// Save review with image reference
await addReview({
  rating: 5,
  comment: "Great!",
  imageId: storageId,
});

// Fetch image URL (automatic in getReviews query)
const imageUrl = await ctx.storage.getUrl(storageId);
```

### 4.5 Real-Time Synchronization

**Live Queries Mechanism:**

```
┌──────────────┐                    ┌──────────────┐
│   Client A   │                    │   Client B   │
│  (Customer)  │                    │   (Barber)   │
└──────┬───────┘                    └──────┬───────┘
       │ useQuery(getBookings)             │ useQuery(getBookings)
       │                                    │
       ▼                                    ▼
┌────────────────────────────────────────────────────┐
│              Convex Backend                        │
│  ┌──────────────────────────────────────────────┐ │
│  │  Live Query Subscriptions (WebSocket)       │ │
│  │  - Client A subscribed to bookings          │ │
│  │  - Client B subscribed to bookings          │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │          Database (bookings table)           │ │
│  └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
       │                                    │
       │ Customer creates booking           │
       │ (mutation)                         │
       ▼                                    │
Database updated                            │
       │                                    │
       │ Convex pushes update               │
       ├────────────────────────────────────┤
       ▼                                    ▼
Client A re-renders              Client B re-renders
(sees own booking)               (sees new booking)
```

**Benefits:**
- No polling required
- Instant updates across all clients
- Reduced server load
- Better user experience

---

## 5. Data Architecture

### 5.1 Data Flow Diagrams

#### 5.1.1 Booking Creation Flow

```
┌─────────────┐
│   Customer  │
└──────┬──────┘
       │ 1. Fill booking form
       ▼
┌─────────────────────────┐
│     React Component     │
│  (BookingSummary.tsx)   │
└──────┬──────────────────┘
       │ 2. onConfirm()
       ▼
┌─────────────────────────┐
│     App.tsx             │
│  handleConfirm()        │
└──────┬──────────────────┘
       │ 3. Call mutation
       ▼
┌─────────────────────────┐
│   addBookingMutation    │
│   (Convex SDK)          │
└──────┬──────────────────┘
       │ 4. HTTPS POST
       ▼
┌─────────────────────────┐
│   Convex Backend        │
│   addBooking mutation   │
└──────┬──────────────────┘
       │ 5. Insert into DB
       ▼
┌─────────────────────────┐
│   Bookings Table        │
└──────┬──────────────────┘
       │ 6. Return booking ID
       ▼
┌─────────────────────────┐
│     App.tsx             │
│  setLastBookingId()     │
└──────┬──────────────────┘
       │ 7. Generate WhatsApp URL
       ▼
┌─────────────────────────┐
│   WhatsApp              │
│  (Opens with message)   │
└─────────────────────────┘
       │
       │ 8. Live query update
       ▼
┌─────────────────────────┐
│  All Subscribed Clients │
│  (Staff dashboard, etc.)│
└─────────────────────────┘
```

#### 5.1.2 Real-Time Update Flow

```
Staff Dashboard                Convex Backend              Customer Browser
     │                              │                            │
     │  useQuery(getBookings)       │                            │
     ├──────────────────────────────►                            │
     │  WebSocket subscribe         │                            │
     │◄─────────────────────────────┤                            │
     │  Initial data                │                            │
     │                              │                            │
     │                              │   Customer creates booking │
     │                              │◄───────────────────────────┤
     │                              │   addBooking mutation      │
     │                              │                            │
     │                              │   Database insert          │
     │                              │                            │
     │  WebSocket push (update)     │                            │
     │◄─────────────────────────────┤                            │
     │                              │                            │
     │  React re-render             │                            │
     │  (new booking appears)       │                            │
     │                              │                            │
```

### 5.2 Data Validation

#### 5.2.1 Client-Side Validation

**Booking Form:**
```typescript
// Validation logic in BookingSummary.tsx
const validateBooking = () => {
  const errors: string[] = [];

  // Name validation
  if (!customerName || customerName.length < 2) {
    errors.push("Name must be at least 2 characters");
  }
  if (customerName.length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  // Phone validation (South African format)
  const phoneRegex = /^(\+27|27|0)[6-8][0-9]{8}$/;
  if (!phoneRegex.test(customerPhone)) {
    errors.push("Invalid phone number format");
  }

  // Notes validation
  if (notes && notes.length > 500) {
    errors.push("Notes must be less than 500 characters");
  }

  return errors;
};
```

**Review Form:**
```typescript
// Validation logic in ReviewPage.tsx
const validateReview = () => {
  const errors: string[] = [];

  // Rating validation
  if (rating < 1 || rating > 5) {
    errors.push("Rating must be between 1 and 5");
  }

  // Comment validation
  if (!comment || comment.length < 10) {
    errors.push("Comment must be at least 10 characters");
  }
  if (comment.length > 500) {
    errors.push("Comment must be less than 500 characters");
  }

  // Image validation
  if (image) {
    if (image.size > 5 * 1024 * 1024) { // 5MB
      errors.push("Image must be less than 5MB");
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      errors.push("Image must be JPEG, PNG, or WebP");
    }
  }

  return errors;
};
```

#### 5.2.2 Server-Side Validation

**Convex Schema Validation:**
```typescript
// convex/schema.ts enforces types
// If client sends invalid data, Convex throws error

// Example: Invalid status value
await addBooking({
  ...args,
  status: "invalid" // ❌ Type error, must be "confirmed" | "pending"
});

// Example: Missing required field
await addBooking({
  serviceId: "haircut",
  // ❌ Missing 'date' field → Convex throws error
});
```

**Additional Server Validation (Future):**
```typescript
// convex/bookings.ts
export const addBooking = mutation({
  args: { ... },
  handler: async (ctx, args) => {
    // Validate date is in the future
    const bookingDate = new Date(args.date);
    if (bookingDate < new Date()) {
      throw new Error("Cannot book in the past");
    }

    // Validate time is within working hours
    const hour = parseInt(args.time.split(':')[0]);
    if (hour < 8 || hour >= 19) {
      throw new Error("Booking must be within working hours (8 AM - 7 PM)");
    }

    // Check for double booking (optional)
    const existingBooking = await ctx.db
      .query("bookings")
      .filter(q => q.eq(q.field("date"), args.date))
      .filter(q => q.eq(q.field("time"), args.time))
      .first();

    if (existingBooking) {
      throw new Error("This time slot is already booked");
    }

    // Insert booking
    const bookingId = await ctx.db.insert("bookings", args);
    return bookingId;
  },
});
```

### 5.3 Data Transformations

**Service ID to Service Details:**
```typescript
// SERVICES constant in constants.tsx
export const SERVICES: Service[] = [
  { id: 'haircut', name: 'HAIR CUT', price: 70, duration: 30, ... },
  { id: 'chiskop', name: 'CHISKOP', price: 40, duration: 20, ... },
  // ...
];

// In StaffDashboard component
const service = SERVICES.find(s => s.id === booking.serviceId);
// Use service.name, service.price, etc.
```

**Date Formatting:**
```typescript
// Storage format: YYYY-MM-DD (e.g., "2026-05-15")
// Display format: "Friday, May 15, 2026"

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
```

**Phone Number Formatting:**
```typescript
// Input: "0812687806" or "+27812687806" or "27812687806"
// Storage: "27812687806" (E.164 without +)
// WhatsApp URL: "27812687806"

const normalizePhone = (phone: string): string => {
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, '');

  // Add country code if missing
  if (digits.startsWith('0')) {
    digits = '27' + digits.substring(1);
  } else if (!digits.startsWith('27')) {
    digits = '27' + digits;
  }

  return digits;
};
```

---

## 6. Integration Architecture

### 6.1 WhatsApp Integration

#### 6.1.1 Click-to-Chat Implementation

**Architecture:**
```
┌─────────────────────────────────────────────────────┐
│              TrimTime Application                   │
│  ┌───────────────────────────────────────────────┐ │
│  │  Booking Confirmation / Reminder Logic        │ │
│  │  - Generate message text                      │ │
│  │  - Format customer/barber phone number        │ │
│  │  - Build WhatsApp URL                         │ │
│  │  - Open URL in new window                     │ │
│  └────────────────┬──────────────────────────────┘ │
└───────────────────┼──────────────────────────────────┘
                    │
                    ▼
       window.open(whatsappUrl, '_blank')
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│          User's Device / Browser                    │
│  ┌───────────────────────────────────────────────┐ │
│  │  WhatsApp Application                         │ │
│  │  - Opens with pre-filled message              │ │
│  │  - User reviews and manually sends            │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

#### 6.1.2 Message Templates

**Booking Confirmation:**
```typescript
const generateBookingMessage = (booking: {
  serviceName: string;
  date: string;
  time: string;
  customerName: string;
  price: number;
}): string => {
  return `
*FADEZONE BOOKING CONFIRMED* ✂️🔥

*Service:* ${booking.serviceName}
*Date:* ${booking.date}
*Time:* ${booking.time}
*Client:* ${booking.customerName}
*Price:* R${booking.price}

Vibe the vibe! We'll see you soon.
📍 *424 Commissioner St, Kensington*

_Need to book again?_
https://fadezone-grooming.netlify.app/
`.trim();
};
```

**Reminder Message:**
```typescript
const generateReminderMessage = (booking: {
  customerName: string;
  time: string;
}): string => {
  return `Yo ${booking.customerName}! Just a reminder of your legendary fade tomorrow at ${booking.time} at Fadezone. See you then! 🔥`;
};
```

#### 6.1.3 WhatsApp URL Construction

```typescript
const createWhatsAppUrl = (phoneNumber: string, message: string): string => {
  // Phone number format: country code without + symbol
  // Message: URL-encoded

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Usage
const whatsappUrl = createWhatsAppUrl('27812687806', bookingMessage);
window.open(whatsappUrl, '_blank');
```

### 6.2 Analytics Integration

#### 6.2.1 Google Analytics 4 (GA4)

**Setup:**
```html
<!-- index.html -->
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

**Event Tracking:**
```typescript
// Track service selection
const trackServiceSelection = (serviceId: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'select_service', {
      service_id: serviceId,
      event_category: 'booking',
    });
  }
};

// Track booking completion
const trackBookingComplete = (booking: Booking) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'booking_complete', {
      service_id: booking.serviceId,
      booking_date: booking.date,
      booking_time: booking.time,
      event_category: 'conversion',
      value: SERVICES.find(s => s.id === booking.serviceId)?.price || 0,
      currency: 'ZAR',
    });
  }
};

// Track WhatsApp click
const trackWhatsAppClick = () => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
    });
  }
};
```

### 6.3 Error Tracking

#### 6.3.1 Sentry Integration

**Setup:**
```typescript
// index.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE, // "development" or "production"
});

// Wrap App component
const App = Sentry.withProfiler(() => { ... });
```

**Error Capture:**
```typescript
// Manual error capture
try {
  await addBookingMutation({ ... });
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'booking',
      action: 'create',
    },
    extra: {
      serviceId: selectedService.id,
      date: selectedDate.toISOString(),
    },
  });

  // Show user-friendly error
  alert("Something went wrong. Please try again.");
}

// Automatic error capture
// Sentry automatically captures unhandled errors and promise rejections
```

---

## 7. Security Architecture

### 7.1 Authentication & Authorization

**Current Implementation (MVP):**
```typescript
// Simple password-based authentication
// constants.tsx or .env.local
const STAFF_PASSWORD = import.meta.env.VITE_STAFF_PASSWORD;

// App.tsx
const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);

const handleLogin = () => {
  if (staffPassword === STAFF_PASSWORD) {
    setIsStaffAuthenticated(true);
  } else {
    setAuthError('Invalid password');
  }
};
```

**Security Considerations:**
- ✅ Password stored in environment variable (not in code)
- ✅ HTTPS required for production
- ❌ Client-side password comparison (not secure for production)
- ❌ No session tokens or JWT
- ❌ No password hashing
- ❌ No multi-user support

**Future Improvements:**
```typescript
// Phase 2: Convex Auth
import { useQuery } from "convex/react";
import { useAuth } from "@convex-dev/auth/react";

const { isAuthenticated, isLoading } = useAuth();

// Phase 3: Role-Based Access Control (RBAC)
interface User {
  id: string;
  email: string;
  role: 'admin' | 'barber' | 'customer';
}
```

### 7.2 Data Security

**Sensitive Data:**
- Customer names (PII)
- Customer phone numbers (PII)
- Staff password

**Security Measures:**
```typescript
// 1. HTTPS Only (enforced by Netlify/Vercel)
// 2. Environment variables for secrets
// .env.local
VITE_STAFF_PASSWORD=your_secure_password
VITE_CONVEX_URL=https://your-project.convex.cloud

// 3. Input sanitization
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script[^>]*>.*?<\/script>/gi, '');
};

// 4. No sensitive data in logs/analytics
// Avoid logging phone numbers, passwords, etc.
```

### 7.3 Frontend Security

**XSS Prevention:**
```typescript
// React automatically escapes values in JSX
// Safe:
<div>{customerName}</div>

// Dangerous (avoid):
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Use DOMPurify if you must render HTML:
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

**CSRF Protection:**
- Not applicable for SPA without traditional forms
- Convex handles CSRF protection automatically

**Content Security Policy (CSP):**
```html
<!-- index.html or Netlify headers -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://esm.sh https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://www.google-analytics.com;
">
```

### 7.4 API Security

**Convex Security:**
- Automatic rate limiting
- DDoS protection
- Encrypted connections (TLS 1.3)
- Secure WebSocket connections

**Future: API Authentication:**
```typescript
// convex/bookings.ts
import { Auth } from "convex/server";

export const addBooking = mutation({
  args: { ... },
  handler: async (ctx, args) => {
    // Require authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Optional: Role-based authorization
    if (identity.role !== 'customer' && identity.role !== 'admin') {
      throw new Error("Forbidden");
    }

    // Insert booking
    const bookingId = await ctx.db.insert("bookings", {
      ...args,
      userId: identity.subject, // Link to user
    });

    return bookingId;
  },
});
```

---

## 8. Deployment Architecture

### 8.1 Hosting Strategy

**Platform:** Netlify (Primary) or Vercel (Alternative)

**Architecture:**
```
┌─────────────────────────────────────────────────────────┐
│                    Global CDN                           │
│  (Netlify/Vercel Edge Network - 100+ Locations)        │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS/HTTP2
                     ▼
┌─────────────────────────────────────────────────────────┐
│            Static Site Hosting                          │
│  - HTML, CSS, JavaScript                                │
│  - Images, fonts                                        │
│  - Service Worker (future PWA)                          │
└────────────────────┬────────────────────────────────────┘
                     │ API Calls
                     ▼
┌─────────────────────────────────────────────────────────┐
│            Convex Backend                               │
│  (Deployed separately, managed by Convex)               │
│  - Database                                             │
│  - Serverless Functions                                 │
│  - File Storage                                         │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Build & Deployment Pipeline

**Continuous Deployment:**
```
┌───────────────┐
│  Developer    │
│  (Local Dev)  │
└───────┬───────┘
        │ git push
        ▼
┌───────────────┐
│   GitHub      │
│  (Repository) │
└───────┬───────┘
        │ Webhook
        ▼
┌───────────────────────────────────────────────────────┐
│           Netlify/Vercel Build                        │
│  1. Clone repository                                  │
│  2. Install dependencies (npm install)                │
│  3. Build project (npm run build)                     │
│     - Vite bundles React app                          │
│     - TypeScript compilation                          │
│     - Tailwind CSS processing                         │
│     - Asset optimization                              │
│  4. Deploy to CDN                                     │
│  5. Invalidate cache                                  │
└───────────────────┬───────────────────────────────────┘
                    │
                    ▼
           ✅ Deployment Complete
           📧 Email notification (optional)
           💬 Slack notification (optional)
```

**Build Commands:**
```json
// package.json
{
  "scripts": {
    "dev": "vite",                    // Local development
    "build": "vite build",            // Production build
    "preview": "vite preview",        // Preview production build
    "deploy": "npm run build"         // Deploy command
  }
}
```

**Netlify Configuration:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 8.3 Environment Management

**Environment Variables:**
```bash
# .env.local (development)
VITE_CONVEX_URL=https://dev-project.convex.cloud
VITE_STAFF_PASSWORD=dev_password
VITE_SENTRY_DSN=https://...@sentry.io/...
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Production (Netlify/Vercel Environment Variables)
VITE_CONVEX_URL=https://prod-project.convex.cloud
VITE_STAFF_PASSWORD=secure_production_password
VITE_SENTRY_DSN=https://...@sentry.io/...
VITE_GA_MEASUREMENT_ID=G-YYYYYYYYYY
```

**Accessing Environment Variables:**
```typescript
// Use import.meta.env in Vite projects
const convexUrl = import.meta.env.VITE_CONVEX_URL;
const staffPassword = import.meta.env.VITE_STAFF_PASSWORD;

// TypeScript types
interface ImportMetaEnv {
  readonly VITE_CONVEX_URL: string;
  readonly VITE_STAFF_PASSWORD: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
}
```

### 8.4 Domain Configuration

**DNS Setup:**
```
Domain: fadezone-grooming.com (example)

A Record:
  @ → Netlify IP (e.g., 75.2.60.5)

CNAME Record:
  www → your-site.netlify.app

SSL Certificate:
  - Automatic via Let's Encrypt (Netlify/Vercel)
  - Auto-renewal every 90 days
```

---

## 9. Performance Optimization

### 9.1 Bundle Optimization

**Code Splitting:**
```typescript
// Lazy load gallery and review components
const Gallery = React.lazy(() => import('./components/Gallery'));
const ReviewPage = React.lazy(() => import('./components/ReviewPage'));

// Usage
<React.Suspense fallback={<LoadingSpinner />}>
  {step === 5 && <Gallery reviews={reviews} onBack={() => setStep(0)} />}
</React.Suspense>
```

**Tree Shaking:**
```typescript
// Good: Import only what you need
import { Star, ChevronRight } from 'lucide-react';

// Bad: Import entire library
import * as Icons from 'lucide-react';
```

**Bundle Analysis:**
```bash
# Add bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
});

# Run build and open bundle report
npm run build
```

### 9.2 Image Optimization

**Strategies:**
```typescript
// 1. Lazy loading
<img
  src="/services/haircut.jpg"
  alt="Haircut"
  loading="lazy"  // Native lazy loading
/>

// 2. Responsive images
<img
  src="/services/haircut.jpg"
  srcSet="/services/haircut-400.jpg 400w,
          /services/haircut-800.jpg 800w,
          /services/haircut-1200.jpg 1200w"
  sizes="(max-width: 640px) 90vw,
         (max-width: 1024px) 45vw,
         30vw"
  alt="Haircut"
/>

// 3. Modern formats (WebP, AVIF)
<picture>
  <source srcSet="/services/haircut.avif" type="image/avif" />
  <source srcSet="/services/haircut.webp" type="image/webp" />
  <img src="/services/haircut.jpg" alt="Haircut" />
</picture>

// 4. Image optimization tools
// - Use Squoosh, ImageOptim, or Sharp
// - Target: <200KB per image
// - Dimensions: 800x800px for service images
```

### 9.3 Caching Strategy

**Browser Caching:**
```toml
# netlify.toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

**Service Worker (Future PWA):**
```typescript
// sw.js
const CACHE_NAME = 'trimtime-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/main.js',
  '/services/haircut.jpg',
  // ...
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### 9.4 Rendering Performance

**React Optimization:**
```typescript
// 1. Memoization
const MemoizedServiceCard = React.memo(ServiceCard);

const expensiveCalculation = useMemo(() => {
  return computeAvailableSlots(bookings, selectedDate);
}, [bookings, selectedDate]);

// 2. useCallback for event handlers
const handleTimeSelect = useCallback((time: string) => {
  setSelectedTime(time);
  setStep(3);
}, []);

// 3. Virtualization (for long lists - future)
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={bookings.length}
  itemSize={120}
>
  {({ index, style }) => (
    <div style={style}>
      <BookingCard booking={bookings[index]} />
    </div>
  )}
</FixedSizeList>
```

---

## 10. Scalability Considerations

### 10.1 Current Capacity

**Convex Free Tier:**
- 5GB bandwidth/month
- 1GB database storage
- 1GB file storage
- Unlimited functions, queries, mutations

**Estimated Capacity:**
- ~1,000 bookings/month
- ~10,000 page views/month
- ~100 reviews with images

### 10.2 Scaling Strategy

**Vertical Scaling (Database):**
```
Current: Convex Free Tier
 ↓ (if needed)
Tier 1: Convex Pro ($25/month)
 - 25GB bandwidth
 - 5GB database
 - 10GB file storage
 ↓
Tier 2: Convex Team ($99/month)
 - Unlimited bandwidth
 - Unlimited database
 - Custom limits
```

**Horizontal Scaling (Application):**
```
Phase 1: Single location, single barber
 ↓
Phase 2: Single location, multiple barbers
 - Add barber selection to booking flow
 - Separate schedules per barber
 ↓
Phase 3: Multiple locations
 - Location selection
 - Separate databases per location (or partitioning)
 ↓
Phase 4: Franchise model
 - Multi-tenant architecture
 - White-label branding
```

### 10.3 Database Partitioning

**Future: Partition by Location:**
```typescript
// convex/schema.ts (future)
export default defineSchema({
  locations: defineTable({
    name: v.string(),
    address: v.string(),
    // ...
  }),

  bookings: defineTable({
    locationId: v.id("locations"),  // Partition key
    barberId: v.id("barbers"),
    // ...
  }).index("by_location", ["locationId", "date"]),

  barbers: defineTable({
    locationId: v.id("locations"),
    name: v.string(),
    // ...
  }),
});

// Query bookings for specific location
const bookings = await ctx.db
  .query("bookings")
  .withIndex("by_location", q => q.eq("locationId", locationId))
  .collect();
```

---

## 11. Development Workflow

### 11.1 Local Development Setup

**Prerequisites:**
```bash
# Install Node.js 20+
nvm install 20
nvm use 20

# Install dependencies
npm install

# Install Convex CLI
npm install -g convex

# Set up Convex project
npx convex dev
```

**Environment Setup:**
```bash
# .env.local
VITE_CONVEX_URL=https://dev-project.convex.cloud
VITE_STAFF_PASSWORD=dev_password
```

**Development Commands:**
```bash
# Start development server
npm run dev
# → Opens http://localhost:5173

# Start Convex backend
npx convex dev
# → Syncs schema and functions

# Run both concurrently (future)
npm install --save-dev concurrently
# package.json:
# "dev": "concurrently \"npm run dev\" \"npx convex dev\""
```

### 11.2 Git Workflow

**Branching Strategy:**
```
main (production)
 ↑
 └── develop (staging)
      ↑
      ├── feature/booking-flow
      ├── feature/review-system
      ├── bugfix/calendar-overflow
      └── hotfix/whatsapp-encoding
```

**Commit Conventions:**
```bash
# Format: <type>(<scope>): <subject>

feat(booking): Add date selection calendar
fix(timegrid): Correct time slot availability logic
docs(readme): Update installation instructions
style(css): Format Tailwind classes
refactor(state): Extract booking logic to custom hook
test(booking): Add unit tests for date validation
chore(deps): Update React to 19.2.4
```

### 11.3 Code Review Process

**Pull Request Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Local testing completed
- [ ] Cross-browser testing
- [ ] Mobile testing

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No console.log statements
- [ ] Environment variables documented
```

---

## 12. Testing Strategy

### 12.1 Testing Pyramid

```
         ┌─────────────┐
         │   E2E (5%)  │  ← Playwright (Future)
         └─────────────┘
       ┌─────────────────┐
       │Integration (15%)│  ← React Testing Library (Future)
       └─────────────────┘
    ┌──────────────────────┐
    │  Unit Tests (80%)    │  ← Vitest (Future)
    └──────────────────────┘
```

### 12.2 Manual Testing Checklist

**Booking Flow:**
- [ ] Select service → navigates to date/time
- [ ] Select date → updates time grid
- [ ] Select time → navigates to customer info
- [ ] Submit valid form → creates booking
- [ ] WhatsApp opens with correct message
- [ ] Booking appears in staff dashboard

**Edge Cases:**
- [ ] Past dates are disabled
- [ ] Booked slots are disabled
- [ ] Form validation shows errors
- [ ] Double booking is prevented
- [ ] Special characters in names/notes

**Browser Testing:**
- [ ] Chrome (desktop/mobile)
- [ ] Safari (desktop/mobile)
- [ ] Firefox
- [ ] Edge

**Device Testing:**
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet
- [ ] Desktop (1920×1080, 1366×768)

### 12.3 Future: Automated Testing

**Unit Tests (Vitest):**
```typescript
// __tests__/utils.test.ts
import { describe, it, expect } from 'vitest';
import { normalizePhone, formatDate } from '../lib/utils';

describe('normalizePhone', () => {
  it('adds country code to numbers starting with 0', () => {
    expect(normalizePhone('0812687806')).toBe('27812687806');
  });

  it('preserves numbers with country code', () => {
    expect(normalizePhone('27812687806')).toBe('27812687806');
  });

  it('adds 27 to numbers without country code', () => {
    expect(normalizePhone('812687806')).toBe('27812687806');
  });
});
```

**Component Tests (React Testing Library):**
```typescript
// __tests__/BookingSummary.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import BookingSummary from '../components/BookingSummary';

describe('BookingSummary', () => {
  const mockProps = {
    service: { id: 'haircut', name: 'HAIR CUT', price: 70, duration: 30 },
    time: '14:00',
    date: '2026-05-15',
    customerName: '',
    customerPhone: '',
    notes: '',
    onNameChange: jest.fn(),
    onPhoneChange: jest.fn(),
    onNotesChange: jest.fn(),
    onConfirm: jest.fn(),
  };

  it('renders booking details', () => {
    render(<BookingSummary {...mockProps} />);
    expect(screen.getByText('HAIR CUT')).toBeInTheDocument();
    expect(screen.getByText('R70')).toBeInTheDocument();
  });

  it('validates customer name', () => {
    render(<BookingSummary {...mockProps} />);
    const confirmButton = screen.getByText('Confirm Booking');
    fireEvent.click(confirmButton);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });
});
```

---

## 13. Monitoring & Observability

### 13.1 Logging Strategy

**Frontend Logging:**
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    if (import.meta.env.MODE === 'development') {
      console.log(`[INFO] ${message}`, data);
    }
    // Send to analytics in production (optional)
  },

  error: (message: string, error?: Error, context?: any) => {
    console.error(`[ERROR] ${message}`, error, context);

    // Send to Sentry
    if (import.meta.env.MODE === 'production') {
      Sentry.captureException(error, {
        tags: { context: message },
        extra: context,
      });
    }
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
};

// Usage
logger.info('Booking created', { bookingId: result });
logger.error('Failed to create booking', error, { serviceId });
```

**Backend Logging (Convex):**
```typescript
// convex/bookings.ts
export const addBooking = mutation({
  args: { ... },
  handler: async (ctx, args) => {
    console.log('Creating booking:', args);

    try {
      const bookingId = await ctx.db.insert("bookings", args);
      console.log('Booking created successfully:', bookingId);
      return bookingId;
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  },
});
```

### 13.2 Performance Monitoring

**Web Vitals:**
```typescript
// index.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 13.3 Alerting

**Sentry Alerts:**
- Configure email/Slack notifications for:
  - Error rate > 1% of total requests
  - New error types
  - Performance degradation (LCP > 2.5s)

**Uptime Monitoring:**
- Use UptimeRobot or Pingdom
- Monitor: https://fadezone-grooming.com
- Alert on: Downtime > 5 minutes

---

## 14. Migration Plan

### 14.1 Current State Analysis

**Existing System:**
- React SPA with Convex backend
- Single-file component structure (App.tsx ~660 lines)
- Basic booking and review functionality
- WhatsApp integration working
- No tests, minimal documentation

### 14.2 Rebuild Strategy

**Phase 1: Foundation (Week 1)**
- [ ] Set up new repository
- [ ] Initialize Vite + React + TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up Convex project
- [ ] Create environment configuration
- [ ] Implement folder structure

**Phase 2: Core Features (Week 2-3)**
- [ ] Build component library (Layout, TimeGrid, etc.)
- [ ] Implement booking flow
- [ ] Integrate Convex queries/mutations
- [ ] Implement WhatsApp integration
- [ ] Build staff dashboard

**Phase 3: Secondary Features (Week 4)**
- [ ] Implement review system
- [ ] Build gallery
- [ ] Add analytics
- [ ] Add error tracking

**Phase 4: Polish & Launch (Week 5-6)**
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Documentation
- [ ] Deployment
- [ ] Launch

### 14.3 Data Migration

**Bookings Migration:**
```typescript
// No migration needed if rebuilding from scratch
// If migrating existing data:
// 1. Export from old Convex project
// 2. Transform data to new schema
// 3. Import to new Convex project

const migrateBookings = async () => {
  const oldBookings = await oldDb.query("bookings").collect();

  for (const booking of oldBookings) {
    await newDb.insert("bookings", {
      serviceId: booking.serviceId,
      date: booking.date,
      time: booking.time,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      notes: booking.notes,
      status: booking.status || 'confirmed',
    });
  }
};
```

### 14.4 Rollback Plan

**Rollback Triggers:**
- Critical bugs affecting bookings
- Performance issues (load time > 5s)
- Security vulnerabilities
- Uptime < 95% in first 24 hours

**Rollback Process:**
1. Revert Netlify deployment to previous version
2. Update DNS if domain changed
3. Notify customers via social media
4. Analyze issues and plan fixes
5. Redeploy when ready

---

## Appendix

### A. File Structure Reference

```
trimtime---barber-scheduling/
├── public/
│   ├── services/
│   │   ├── haircut.jpg
│   │   ├── chiskop.jpg
│   │   └── ...
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── TimeGrid.tsx
│   │   ├── BookingSummary.tsx
│   │   ├── ReviewPage.tsx
│   │   ├── Gallery.tsx
│   │   └── ConvexClientProvider.tsx
│   ├── convex/
│   │   ├── _generated/
│   │   ├── schema.ts
│   │   ├── bookings.ts
│   │   └── reviews.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── logger.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── constants.tsx
│   └── styles.css
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── netlify.toml
├── README.md
├── MVP_SCOPE.md
├── PRD.md
└── ARCHITECTURE.md (this file)
```

### B. Technology Decisions Record

| Technology | Alternatives Considered | Decision Rationale |
|------------|------------------------|-------------------|
| React | Vue, Svelte | Largest ecosystem, best job market, team familiarity |
| TypeScript | JavaScript | Type safety, better IDE support, fewer runtime errors |
| Vite | Webpack, Parcel | Faster builds, modern, better DX |
| Tailwind CSS | Styled Components, CSS Modules | Rapid development, small bundle, utility-first |
| Convex | Firebase, Supabase, AWS Amplify | Real-time by default, TypeScript-first, generous free tier |
| Netlify | Vercel, AWS S3 | Familiarity, generous free tier, easy setup |

### C. Glossary

- **BaaS:** Backend-as-a-Service
- **CDN:** Content Delivery Network
- **CRUD:** Create, Read, Update, Delete
- **CSP:** Content Security Policy
- **DX:** Developer Experience
- **E2E:** End-to-End
- **HMR:** Hot Module Replacement
- **MVP:** Minimum Viable Product
- **NoSQL:** Non-relational database
- **PII:** Personally Identifiable Information
- **PWA:** Progressive Web App
- **RBAC:** Role-Based Access Control
- **SPA:** Single Page Application
- **SSR:** Server-Side Rendering
- **TTI:** Time To Interactive
- **UX:** User Experience
- **XSS:** Cross-Site Scripting

---

**Document End**

*This architecture document should be reviewed and updated as the project evolves. Next review date: Post-MVP Launch (Q3 2026)*
