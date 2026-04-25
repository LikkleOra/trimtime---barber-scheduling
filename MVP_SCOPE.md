# TrimTime Barber Scheduling - MVP Scope Document

## Executive Summary

**Project Name:** TrimTime (Fadezone Grooming Booking System)
**Version:** 2.0 (Complete Rebuild)
**Target Launch:** Q2 2026
**Platform:** Web Application (Mobile-First Progressive Web App)

### Business Objective
Create a streamlined, scalable barber booking system for Fadezone Grooming that enables customers to book appointments online while providing barbers with efficient management tools.

---

## MVP Feature Set

### 1. Core Customer Features (Must-Have)

#### 1.1 Service Browsing & Selection
- **Landing Page:** Brand-focused hero section with clear call-to-action
- **Service Catalog:** Display all available services with:
  - Service name, description, duration, and price
  - High-quality service images
  - Categorization (Haircuts, Dye & Treatments, Shaving)
- **Service Details:** Individual service cards with booking CTA

**User Stories:**
- As a customer, I want to browse available services so I can choose what I need
- As a customer, I want to see pricing upfront so I can make informed decisions

#### 1.2 Appointment Booking Flow
- **Date Selection:** Interactive calendar with:
  - Current month view with swipe navigation
  - Visual indication of today's date
  - Disabled past dates
- **Time Slot Selection:** Grid view showing:
  - Available time slots (30-minute intervals)
  - Booked slots (disabled/grayed out)
  - Working hours: 8:00 AM - 7:00 PM
- **Customer Information:** Form capturing:
  - Full name (required)
  - Phone number (required, WhatsApp-enabled)
  - Additional notes (optional)
- **Booking Confirmation:** Summary page showing:
  - Selected service, date, time
  - Customer details
  - Total price
  - Confirmation CTA

**User Stories:**
- As a customer, I want to select a convenient date and time for my appointment
- As a customer, I want to provide my contact information for confirmation
- As a customer, I want to receive booking confirmation via WhatsApp

#### 1.3 WhatsApp Integration
- **Booking Confirmation:** Automatic WhatsApp message generation with:
  - Service details
  - Appointment date and time
  - Customer name
  - Price
  - Location details
  - Re-booking link
- **Click-to-Chat:** Opens WhatsApp with pre-filled message
- **No Server-Side API:** Client-side implementation using WhatsApp URL scheme

**User Stories:**
- As a customer, I want to receive instant booking confirmation via WhatsApp
- As a customer, I want easy access to my booking details

#### 1.4 Review & Gallery System
- **Review Submission:**
  - Star rating (1-5 stars)
  - Written comment
  - Optional image upload
- **Gallery View:**
  - Display customer reviews with photos
  - Chronological ordering (newest first)
  - Visual carousel/grid layout

**User Stories:**
- As a customer, I want to leave a review of my experience
- As a prospective customer, I want to see previous customer reviews

### 2. Core Barber/Staff Features (Must-Have)

#### 2.1 Staff Authentication
- **Password-Protected Access:** Simple password authentication
- **Environment Variable Storage:** Secure credential management
- **Session Management:** Stay logged in until manual logout

**User Stories:**
- As a barber, I need secure access to the staff dashboard
- As a barber, I want to stay logged in during my work session

#### 2.2 Booking Management Dashboard
- **Booking List View:** Display all bookings with:
  - Customer name and phone
  - Service type
  - Date and time
  - Status (confirmed/pending)
- **Booking Actions:**
  - View booking details
  - Cancel/delete booking
  - Send WhatsApp reminder to customer
- **Real-Time Updates:** Live sync of bookings from database

**User Stories:**
- As a barber, I want to see all upcoming appointments in one place
- As a barber, I want to cancel appointments if needed
- As a barber, I want to send reminders to customers

### 3. Technical Foundation (Must-Have)

#### 3.1 Frontend Architecture
- **Framework:** React 19+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **State Management:** React hooks (useState, useCallback, useRef)
- **Routing:** Single-page application with step-based navigation

#### 3.2 Backend & Database
- **Backend-as-a-Service:** Convex
  - Real-time database
  - Serverless functions (queries/mutations)
  - File storage for review images
- **Data Models:**
  - Bookings table
  - Reviews table
  - Image storage

#### 3.3 Core APIs & Services
- **Booking Service:**
  - Create booking
  - Retrieve bookings
  - Delete booking
  - Update booking status
- **Review Service:**
  - Create review
  - Retrieve reviews
  - Upload review images
  - Generate upload URLs

---

## Out of Scope for MVP

### Features Deferred to Post-MVP

1. **User Accounts & Authentication**
   - Customer login/registration
   - Booking history for customers
   - Profile management
   - *Rationale:* Adds complexity; WhatsApp provides sufficient communication channel

2. **Multi-Location Support**
   - Multiple shop locations
   - Location-based booking
   - *Rationale:* Single location is sufficient for initial launch

3. **Multi-Barber Support**
   - Multiple barbers with individual schedules
   - Barber selection during booking
   - Barber-specific availability
   - *Rationale:* Single barber model is simpler and matches current business model

4. **Advanced Booking Features**
   - Recurring appointments
   - Group bookings
   - Waitlist management
   - Booking modifications (reschedule)
   - *Rationale:* Can handle via WhatsApp communication initially

5. **Payment Integration**
   - Online payment processing
   - Deposit/prepayment system
   - Payment tracking
   - *Rationale:* Cash/on-site payment acceptable for MVP

6. **Advanced Analytics**
   - Revenue tracking
   - Customer analytics
   - Booking trends
   - Marketing insights
   - *Rationale:* Manual tracking sufficient initially

7. **Email Notifications**
   - Email confirmations
   - Email reminders
   - *Rationale:* WhatsApp is primary communication channel

8. **SMS Notifications**
   - Automated SMS reminders
   - *Rationale:* WhatsApp serves this purpose

9. **Advanced Calendar Features**
   - Week/month view toggle
   - Holiday blocking
   - Custom working hours per day
   - Break time blocking
   - *Rationale:* Fixed schedule acceptable for MVP

10. **Staff Management**
    - Multiple staff accounts
    - Role-based permissions
    - Staff scheduling
    - *Rationale:* Single administrator sufficient

---

## Success Metrics

### Key Performance Indicators (KPIs)

1. **Booking Conversion Rate**
   - Target: 30% of landing page visitors complete a booking
   - Measurement: (Completed bookings / Total visitors) × 100

2. **Booking Completion Time**
   - Target: Average booking completed in under 2 minutes
   - Measurement: Time from service selection to confirmation

3. **Customer Satisfaction**
   - Target: Average review rating of 4.5+ stars
   - Measurement: Average of all review ratings

4. **WhatsApp Engagement**
   - Target: 80% of bookings result in WhatsApp message being sent
   - Measurement: WhatsApp link clicks / Total bookings

5. **Staff Adoption**
   - Target: 100% of bookings managed through dashboard
   - Measurement: Staff usage analytics

6. **System Reliability**
   - Target: 99.5% uptime
   - Measurement: Uptime monitoring

---

## User Personas

### Primary Persona: "Young Professional Customer"
**Name:** Thabo, 28
**Occupation:** Software Developer
**Tech Savviness:** High
**Goals:**
- Quick, convenient booking
- Minimal friction
- WhatsApp preferred over email/SMS

**Pain Points:**
- Busy schedule, needs flexibility
- Dislikes phone calls to book
- Wants instant confirmation

**Needs:**
- Mobile-first interface
- Fast booking process (< 2 minutes)
- Clear pricing and service info

### Secondary Persona: "Barber/Shop Owner"
**Name:** Alex, 35
**Occupation:** Master Barber, Shop Owner
**Tech Savviness:** Medium
**Goals:**
- Reduce no-shows
- Manage appointments efficiently
- Focus on cutting, not admin

**Pain Points:**
- Manual booking tracking is time-consuming
- Customers forget appointments
- Difficult to plan day without visibility

**Needs:**
- Simple dashboard
- Quick booking overview
- Easy reminder system

---

## User Flows

### Customer Booking Flow
```
1. Land on homepage
2. Browse services (optional) OR Click "Book A Fade"
3. Select service from menu
4. Select date from calendar
5. Select time from available slots
6. Enter customer information
7. Review booking summary
8. Confirm booking
9. WhatsApp opens with confirmation message
10. Send WhatsApp message to barber
11. Receive confirmation (via WhatsApp response)
```

### Staff Management Flow
```
1. Navigate to Staff Portal
2. Enter password
3. View dashboard with all bookings
4. Actions:
   - View booking details
   - Send reminder via WhatsApp
   - Cancel booking
5. Logout
```

### Review Submission Flow
```
1. Navigate from homepage to review section
2. Select star rating
3. Write comment (optional)
4. Upload photo (optional)
5. Submit review
6. Confirmation message
7. Return to gallery view
```

---

## Technical Requirements

### Performance Requirements
- **Page Load Time:** < 2 seconds on 3G connection
- **Time to Interactive:** < 3 seconds
- **Mobile Performance Score:** > 85 (Lighthouse)
- **Desktop Performance Score:** > 90 (Lighthouse)

### Browser Compatibility
- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari iOS 13+
- Chrome Android (latest version)

### Device Support
- **Primary:** Mobile devices (360px - 428px width)
- **Secondary:** Tablets (768px - 1024px width)
- **Tertiary:** Desktop (1024px+ width)

### Accessibility Requirements
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Minimum contrast ratio: 4.5:1
- Touch target size: minimum 44×44 pixels

### Security Requirements
- HTTPS only
- Environment variables for sensitive data
- XSS protection
- CSRF protection (handled by Convex)
- Input validation and sanitization

---

## Data Requirements

### Data Storage

#### Bookings Table
```typescript
{
  _id: string (auto-generated)
  serviceId: string
  date: string (YYYY-MM-DD)
  time: string (HH:mm)
  customerName: string
  customerPhone: string
  notes?: string
  status: 'confirmed' | 'pending'
  _creationTime: number (auto-generated)
}
```

#### Reviews Table
```typescript
{
  _id: string (auto-generated)
  rating: number (1-5)
  comment: string
  imageId?: string (storage reference)
  createdAt: number (timestamp)
}
```

### Data Retention
- **Bookings:** Retain for 6 months after appointment date
- **Reviews:** Retain indefinitely
- **Images:** Retain indefinitely (unless review is deleted)

---

## Constraints & Assumptions

### Constraints
1. **Budget:** Limited budget requiring free/low-cost services
2. **Timeline:** 4-6 week development window
3. **Resources:** Single developer
4. **Infrastructure:** Serverless architecture preferred
5. **Integration:** WhatsApp-only communication (no SMS/Email APIs)

### Assumptions
1. All customers have WhatsApp installed
2. Single barber operates the shop
3. Working hours are consistent (8 AM - 7 PM)
4. Shop operates 6 days a week (Monday-Saturday)
5. 30-minute appointment slots are sufficient
6. Customers will manually send WhatsApp message after booking
7. No-shows/cancellations handled manually via WhatsApp

---

## Dependencies

### External Services
1. **Convex:** Backend-as-a-Service (free tier sufficient for MVP)
2. **Netlify/Vercel:** Hosting platform (free tier)
3. **WhatsApp:** Communication platform (free)
4. **Unsplash:** Placeholder images (free)
5. **Google Fonts:** Typography (free)

### Third-Party Libraries
1. **React:** UI framework
2. **Vite:** Build tool
3. **Tailwind CSS:** Styling
4. **Lucide React:** Icons
5. **React Swipeable:** Touch gestures
6. **Convex React:** Database client

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| WhatsApp changes URL scheme | High | Low | Monitor WhatsApp API updates; have SMS backup plan |
| Users don't have WhatsApp | Medium | Low | Display clear messaging; provide alternative contact |
| Double bookings | High | Medium | Real-time database with atomic operations |
| No-shows | Medium | High | Implement reminder system; consider deposit in future |
| Browser compatibility issues | Medium | Low | Comprehensive testing; progressive enhancement |
| Database downtime | High | Very Low | Use reliable provider (Convex); monitor uptime |
| Performance issues on low-end devices | Medium | Medium | Optimize bundle size; lazy load images |
| Staff password leak | Medium | Low | Environment variables; regular rotation; add 2FA later |

---

## Launch Checklist

### Pre-Launch
- [ ] All MVP features implemented and tested
- [ ] Cross-browser testing completed
- [ ] Mobile device testing completed
- [ ] Performance optimization completed
- [ ] Security audit completed
- [ ] Staff training completed
- [ ] Backup/disaster recovery plan in place
- [ ] Analytics setup (Google Analytics or equivalent)
- [ ] Error monitoring setup (Sentry or equivalent)
- [ ] Domain and SSL configured

### Launch Day
- [ ] Deploy to production
- [ ] Verify all features working in production
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Staff available for support
- [ ] Social media announcement prepared

### Post-Launch (Week 1)
- [ ] Daily monitoring of bookings
- [ ] Daily monitoring of errors
- [ ] Collect user feedback
- [ ] Address critical bugs immediately
- [ ] Monitor performance metrics
- [ ] Review analytics data

---

## Post-MVP Roadmap (Prioritized)

### Phase 2 (Months 2-3)
1. Booking modification (reschedule/cancel by customer)
2. Multiple barber support
3. Email notifications as backup
4. Booking analytics dashboard

### Phase 3 (Months 4-6)
1. Customer accounts and booking history
2. Loyalty program integration
3. Advanced calendar features
4. Marketing automation

### Phase 4 (Months 7-12)
1. Payment integration
2. Multi-location support
3. Mobile app (React Native)
4. Advanced analytics and reporting

---

## Conclusion

This MVP scope focuses on delivering core value to both customers and staff with minimal complexity. The goal is to launch quickly, gather feedback, and iterate based on real-world usage data.

**Key Success Factors:**
- Simple, intuitive user experience
- Fast booking process (< 2 minutes)
- Reliable WhatsApp integration
- Clean, professional design
- Mobile-first approach

**Next Steps:**
1. Review and approve MVP scope
2. Create detailed Product Requirements Document (PRD)
3. Design technical architecture
4. Begin development sprint planning
