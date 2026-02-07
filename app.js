/* =====================================
   TrimTime Barber Scheduling - App Logic
   ===================================== */

// ===== DATA & CONSTANTS =====

const SERVICES = [
  {
    id: 'scholar',
    name: 'THE SCHOLAR',
    price: 80,
    duration: 30,
    description: 'High schoolers & students'
  },
  {
    id: 'fade',
    name: 'THE FADE',
    price: 150,
    duration: 45,
    description: 'Skin fade or taper'
  },
  {
    id: 'buzz',
    name: 'BUZZ CUT',
    price: 100,
    duration: 20,
    description: 'One length all over'
  },
  {
    id: 'beard',
    name: 'THE BEARD',
    price: 120,
    duration: 30,
    description: 'Shape, trim & hot towel'
  },
  {
    id: 'full',
    name: 'THE FULL WORKS',
    price: 200,
    duration: 60,
    description: 'Haircut, Beard & Wash'
  }
];

const WORKING_HOURS = {
  start: 7,
  end: 17,
  interval: 30
};

const BARBER_CONFIG = {
  name: 'FadeZone Grooming',
  phone: '27785962689',
  shopName: 'FadeZone Grooming',
  locations: [
    {
      id: 'jb',
      name: 'Johannesburg',
      address: 'Sandton City, Sandton, Johannesburg',
      hours: [
        { day: 'Monday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Tuesday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Wednesday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Thursday', time: '08:00 - 18:00', status: 'active' },
        { day: 'Friday', time: '08:00 - 18:00', status: 'current' },
        { day: 'Saturday', time: '08:00 - 16:00', status: 'active' },
        { day: 'Sunday', time: 'CLOSED', status: 'closed' }
      ]
    }
  ]
};

// ===== STATE MANAGEMENT =====

const state = {
  activeView: 'customer',
  selectedLocation: BARBER_CONFIG.locations[0],
  selectedService: null,
  selectedDate: new Date(),
  selectedTime: null,
  customerName: '',
  customerPhone: '',
  notes: '',
  bookings: [],
  step: 0 // 0: Landing, 1: Services, 2: Time, 3: Summary
};

// ===== BOOKING SERVICE (Local Storage) =====

const STORAGE_KEY = 'trimtime_bookings';

const bookingService = {
  getBookings() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addBooking(booking) {
    const bookings = this.getBookings();
    bookings.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new Event('storage'));
  },

  deleteBooking(id) {
    const bookings = this.getBookings();
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  }
};

// ===== UTILITY FUNCTIONS =====

function generateTimeSlots() {
  const slots = [];
  const { start, end, interval } = WORKING_HOURS;
  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += interval) {
      const h = hour.toString().padStart(2, '0');
      const m = min.toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
    }
  }
  return slots;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// ===== RENDER FUNCTIONS =====

function renderLandingPage() {
  const container = document.getElementById('landing-view');

  container.innerHTML = `
    <!-- Location Display -->
    <div class="location-toggle">
      <div class="toggle-buttons">
        <button class="toggle-btn active" style="flex: 1; cursor: default;">
          ${state.selectedLocation.name}
        </button>
      </div>
    </div>

    <!-- Legendary Styles Section -->
    <div class="styles-section">
      <div class="section-header">
        <h2 class="section-title">See Our<br>Legendary<br>Styles</h2>
        <p class="section-description">
          Check out our Legendary styles that would best suite you.
        </p>
        <div class="section-controls">
          <button class="view-more-btn">
            View More Styles 
            <i data-feather="arrow-right"></i>
          </button>
          <div class="carousel-controls">
            <button class="carousel-btn" onclick="scrollCarousel('left')">
              <i data-feather="chevron-left"></i>
            </button>
            <button class="carousel-btn" onclick="scrollCarousel('right')">
              <i data-feather="chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Style Cards Carousel -->
      <div class="carousel no-scrollbar" id="style-carousel">
        <div class="style-card">
          <img 
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600" 
            alt="Adult Haircut Fade"
          >
          <div class="style-card-content">
            <p class="style-card-label">Adult Haircut • Fade</p>
            <p class="style-card-price">R150</p>
          </div>
        </div>
        <div class="style-card">
          <img 
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600" 
            alt="Beard Shave Clipper"
          >
          <div class="style-card-content">
            <p class="style-card-label">Beard Shave • Clipper</p>
            <p class="style-card-price">R120</p>
          </div>
        </div>
        <div class="style-card">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" 
            alt="The Scholar"
          >
          <div class="style-card-content">
            <p class="style-card-label">The Scholar • Student</p>
            <p class="style-card-price">R80</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Opening Times & Location Info -->
    <div class="info-grid">
      <div class="info-section">
        <h4>Opening Times</h4>
        <div class="hours-list">
          ${state.selectedLocation.hours.map(h => `
            <div class="hours-item ${h.status === 'current' ? 'current' : ''}">
              <div class="hours-day">
                <div class="status-dot ${h.status === 'active' || h.status === 'current' ? 'active' : ''}"></div>
                <span>${h.day.slice(0, 3)}</span>
              </div>
              <span>${h.time}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="info-section">
        <h4>The Spot</h4>
        <div class="location-info">
          <p>${state.selectedLocation.address}</p>
          <div class="location-features">
            <div class="feature-item">
              <div class="feature-icon">
                <i data-feather="check-circle"></i>
              </div>
              <span class="feature-label">Instant Confirm</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">P</div>
              <span class="feature-label">Street Parking</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <div class="cta-container">
      <button class="btn-primary" onclick="navigateToStep(1)">
        Book an Appointment
        <i data-feather="chevron-right"></i>
      </button>
    </div>
  `;

  feather.replace();
}

function renderServiceMenu() {
  const container = document.getElementById('service-view');

  const categories = [
    { name: 'Hair', services: SERVICES.filter(s => ['scholar', 'fade', 'buzz'].includes(s.id)) },
    { name: 'Beard', services: SERVICES.filter(s => s.id === 'beard') },
    { name: 'Combo', services: SERVICES.filter(s => s.id === 'full') }
  ];

  container.innerHTML = `
    <!-- Sub Header -->
    <div class="service-header">
      <button class="back-btn" onclick="navigateToStep(0)">
        <i data-feather="chevron-left"></i>
      </button>
      <div class="shop-logo"></div>
      <h2 class="shop-name">${state.selectedLocation.name}</h2>
      <div class="shop-location">
        <i data-feather="map-pin"></i>
        <span>Johannesburg</span>
      </div>
    </div>

    <!-- Menu Sections -->
    ${categories.map(cat => `
      <div class="service-category">
        <div class="category-header">
          <div class="category-bar"></div>
          <h3 class="category-title">${cat.name}</h3>
        </div>
        <div class="service-list">
          ${cat.services.map(s => `
            <div class="service-card">
              <div class="service-card-header">
                <div>
                  <h4 class="service-name">${s.name}</h4>
                  <p class="service-details">${s.duration} mins • ${s.description}</p>
                </div>
                <div class="service-price-container">
                  <span class="price-label">From</span>
                  <span class="service-price">R${s.price}</span>
                </div>
              </div>
              <button 
                class="btn-book ${s.id === 'full' ? 'premium' : ''}"
                onclick="selectService('${s.id}')"
              >
                Book Now
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}

    <!-- Shop Details Summary -->
    <div class="shop-details">
      <div class="shop-details-card">
        <h4 class="shop-details-title">Shop Details</h4>
        <div class="details-list">
          <div class="detail-item">
            <div class="detail-icon">
              <i data-feather="check-circle"></i>
            </div>
            <span class="detail-label">Instant Confirmation</span>
          </div>
          <div class="detail-item">
            <div class="detail-icon">
              <i data-feather="smartphone"></i>
            </div>
            <span class="detail-label">Kid-friendly Atmosphere</span>
          </div>
          <div class="detail-item">
            <div class="detail-icon">
              <i data-feather="map-pin"></i>
            </div>
            <span class="detail-label">Street Parking</span>
          </div>
        </div>
      </div>
    </div>
  `;

  feather.replace();
}

function renderTimeSelection() {
  const container = document.getElementById('time-view');
  const slots = generateTimeSlots();
  const dateStr = formatDate(state.selectedDate);

  container.innerHTML = `
    <div class="time-selection">
      <button class="back-btn" onclick="navigateToStep(1)" style="margin-bottom: 1rem;">
        <i data-feather="chevron-left"></i>
      </button>
      <div class="time-header">
        <h2 class="time-title">Select Time</h2>
      </div>
      <div class="time-grid-container">
        <div class="time-grid">
          ${slots.map(time => {
    const isOccupied = state.bookings.some(b => b.date === dateStr && b.time === time);
    const isSelected = state.selectedTime === time;
    return `
              <button 
                class="time-slot ${isSelected ? 'selected' : ''}"
                ${isOccupied ? 'disabled' : ''}
                onclick="selectTime('${time}')"
              >
                ${time}
              </button>
            `;
  }).join('')}
        </div>
      </div>
    </div>
  `;

  feather.replace();
}

function renderBookingSummary() {
  const container = document.getElementById('summary-view');
  const service = state.selectedService;
  const dateStr = formatDate(state.selectedDate);

  container.innerHTML = `
    <div class="booking-summary">
      <button class="back-btn" onclick="navigateToStep(2)" style="margin-bottom: 1rem;">
        <i data-feather="chevron-left"></i>
      </button>

      <!-- Receipt Card -->
      <div class="receipt-card">
        <!-- Header -->
        <div class="receipt-header">
          <div>
            <h3 class="receipt-title">Booking Summary</h3>
            <p class="receipt-ref">Ref: #NZ-2941-DN</p>
          </div>
          <span class="receipt-badge">${state.selectedLocation.name}</span>
        </div>

        <!-- Location Section -->
        <div class="receipt-location">
          <div class="location-icon-box">
            <div class="location-box"></div>
          </div>
          <div class="location-text">
            <h5>Location</h5>
            <p>${state.selectedLocation.address}</p>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Service Details -->
        <div class="receipt-service">
          <h5>Service</h5>
          <div class="service-info">
            <div>
              <h4>${service.name}</h4>
              <p class="service-meta">${service.duration} Mins • All professionals</p>
            </div>
            <span class="service-amount">R ${service.price.toFixed(2)}</span>
          </div>

          <div class="receipt-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>R ${service.price.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Tax (Incl.)</span>
              <span>R 0.00</span>
            </div>
          </div>

          <div class="grand-total">
            <span>Total</span>
            <span>R ${service.price.toFixed(2)}</span>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Date Time Section -->
        <div class="receipt-datetime">
          <span>Date: ${dateStr}</span>
          <span>Time: ${state.selectedTime}</span>
        </div>

        <!-- Barcode Element -->
        <div class="barcode-container">
          <div class="barcode-pattern"></div>
          <p class="barcode-text">Fadezone Grooming Systems</p>
        </div>
      </div>

      <!-- Inputs -->
      <div class="form-group">
        <input 
          id="customer-name"
          type="text" 
          class="input-field"
          placeholder="ENTER YOUR NAME"
          value="${state.customerName}"
          oninput="updateCustomerName(this.value)"
        >
        <input 
          id="customer-phone"
          type="tel" 
          class="input-field"
          placeholder="PHONE NUMBER"
          value="${state.customerPhone}"
          oninput="updateCustomerPhone(this.value)"
        >
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn-icon">
          <i data-feather="phone"></i>
        </button>
        <button 
          id="whatsapp-confirm-btn"
          class="btn-whatsapp"
          ${!state.customerName.trim() || !state.customerPhone.trim() ? 'disabled' : ''}
          onclick="confirmBooking()"
        >
          <i data-feather="message-square"></i>
          Confirm Via WhatsApp
        </button>
      </div>

      <!-- Bottom Features -->
      <div class="features">
        <div class="feature">
          <div class="feature-box">✓</div>
          Instant Confirm
        </div>
        <div class="feature">
          <div class="feature-box">☺</div>
          Kid Friendly
        </div>
        <div class="feature">
          <div class="feature-box">P</div>
          Parking
        </div>
      </div>

      <div class="disclaimer">
        By confirming you agree to our 24h cancellation policy. Late arrivals may forfeit their slot.
      </div>
    </div>
  `;

  feather.replace();
}

function renderProfileView() {
  const container = document.getElementById('barber-view');

  container.innerHTML = `
    <div class="barber-view">
      <h2 class="barber-title">My Profile</h2>
      <div class="barber-content">
        Manage your profile and preferences here. This section will be expanded with more details later.
      </div>
    </div>
  `;
}

function renderBookingsView() {
  const container = document.getElementById('bookings-view');
  const bookings = bookingService.getBookings();

  container.innerHTML = `
    <div class="booking-summary">
      <h2 class="barber-title">My Bookings</h2>
      ${bookings.length === 0 ? `
        <div class="barber-content">
          You have no active bookings.
        </div>
      ` : `
        <div class="service-list">
          ${bookings.map(b => {
    const service = SERVICES.find(s => s.id === b.serviceId);
    return `
              <div class="service-card" style="margin-bottom: 1rem;">
                <div class="service-card-header">
                  <div>
                    <h4 class="service-name">${service ? service.name : 'Unknown Service'}</h4>
                    <p class="service-details">${b.date} • ${b.time}</p>
                  </div>
                  <div class="service-price-container">
                    <span class="service-price">Confirmed</span>
                  </div>
                </div>
                <button class="btn-book" onclick="deleteBooking('${b.id}')" style="background-color: var(--color-accent-red); color: white;">
                  Cancel Booking
                </button>
              </div>
            `;
  }).join('')}
        </div>
      `}
    </div>
  `;
}

function renderAboutView() {
  const container = document.getElementById('about-view');

  container.innerHTML = `
    <div class="barber-view">
      <h2 class="barber-title">About FadeZone</h2>
      <div class="barber-content">
        FadeZone Grooming is a premium barbershop dedicated to industrial excellence in grooming. Located in the heart of Johannesburg, we provide the best fades, beard trims, and student cuts in the city.
      </div>
    </div>
  `;
}

// ===== VIEW MANAGEMENT =====

function showView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });

  // Show selected view
  const viewElement = document.getElementById(`${viewName}-view`);
  if (viewElement) {
    viewElement.classList.add('active');
  }

  // Update navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`[data-view="${viewName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

function navigateToStep(step) {
  state.step = step;

  if (step === 0) {
    renderLandingPage();
    showView('landing');
  } else if (step === 1) {
    renderServiceMenu();
    showView('service');
  } else if (step === 2) {
    renderTimeSelection();
    showView('time');
  } else if (step === 3) {
    renderBookingSummary();
    showView('summary');
  }
}

// ===== EVENT HANDLERS =====

function selectLocation(locationId) {
  state.selectedLocation = BARBER_CONFIG.locations.find(loc => loc.id === locationId);
  renderLandingPage();
}

function scrollCarousel(direction) {
  const carousel = document.getElementById('style-carousel');
  if (!carousel) return;

  const { scrollLeft, clientWidth } = carousel;
  const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
  carousel.scrollTo({ left: scrollTo, behavior: 'smooth' });
}

function selectService(serviceId) {
  state.selectedService = SERVICES.find(s => s.id === serviceId);
  navigateToStep(2);
}

function selectTime(time) {
  state.selectedTime = time;
  navigateToStep(3);
}

function updateCustomerName(value) {
  state.customerName = value.toUpperCase();
  validateBookingForm();
}

function updateCustomerPhone(value) {
  state.customerPhone = value;
  validateBookingForm();
}

function validateBookingForm() {
  const btn = document.getElementById('whatsapp-confirm-btn');
  if (btn) {
    btn.disabled = !state.customerName.trim() || !state.customerPhone.trim();
  }
}

function confirmBooking() {
  if (!state.selectedService || !state.selectedTime) return;
  if (!state.customerName.trim() || !state.customerPhone.trim()) return;

  const dateStr = formatDate(state.selectedDate);
  const msg = `*New Booking Request - FadeZone Grooming* 💈\n\n` +
    `✂️ *Service:* ${state.selectedService.name}\n` +
    `📅 *Date:* ${dateStr}\n` +
    `⏰ *Time:* ${state.selectedTime}\n\n` +
    `👤 *Customer:* ${state.customerName}\n` +
    `📱 *Phone:* ${state.customerPhone}\n\n` +
    `_Sent via FadeZone Online Booking Systems_`;

  const confirmBtn = document.getElementById('whatsapp-confirm-btn');
  if (confirmBtn) {
    confirmBtn.innerHTML = '<i data-feather="loader"></i> Redirecting...';
    confirmBtn.disabled = true;
    feather.replace();
  }

  const whatsappUrl = `https://wa.me/${BARBER_CONFIG.phone}?text=${encodeURIComponent(msg)}`;

  setTimeout(() => {
    window.open(whatsappUrl, '_blank');

    // Save booking
    bookingService.addBooking({
      id: Math.random().toString(36).substr(2, 9),
      serviceId: state.selectedService.id,
      date: dateStr,
      time: state.selectedTime,
      customerName: state.customerName,
      customerPhone: state.customerPhone,
      status: 'confirmed'
    });

    // Reset state & navigate
    state.step = 0;
    state.selectedService = null;
    state.selectedTime = null;
    state.customerName = '';
    state.customerPhone = '';
    refreshBookings();
    navigateToStep(0);
  }, 800);
}

function changeView(viewName) {
  state.activeView = viewName;

  if (viewName === 'customer') {
    navigateToStep(state.step);
  } else if (viewName === 'bookings') {
    renderBookingsView();
    showView('bookings');
  } else if (viewName === 'about') {
    renderAboutView();
    showView('about');
  } else if (viewName === 'barber') {
    renderProfileView();
    showView('barber');
  }
}

function deleteBooking(id) {
  if (confirm('Are you sure you want to cancel this booking?')) {
    bookingService.deleteBooking(id);
    renderBookingsView();
  }
}

function refreshBookings() {
  state.bookings = bookingService.getBookings();
}

// ===== INITIALIZATION =====

function init() {
  // Load bookings
  refreshBookings();

  // Listen for storage changes
  window.addEventListener('storage', refreshBookings);

  // Render initial view
  renderLandingPage();
  showView('landing');

  console.log('FadeZone Grooming App initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
