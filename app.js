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
      id: 'kt',
      name: 'Kensington',
      address: '424 Commissioner street Kensington',
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
  user: JSON.parse(localStorage.getItem('trimtime_user')) || null,
  activeView: 'landing',
  selectedLocation: BARBER_CONFIG.locations[0],
  selectedService: null,
  selectedDate: new Date(),
  selectedTime: null,
  customerName: '',
  customerPhone: '',
  notes: '',
  bookings: [],
  reviews: JSON.parse(localStorage.getItem('trimtime_reviews')) || [],
  step: 0, // 0: Landing, 1: Services, 2: Time, 3: Summary
  isAdminMode: false,
  isAdminLogin: false,
  authError: ''
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
  },

  updateBookingStatus(id, status) {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      window.dispatchEvent(new Event('storage'));
    }
  },

  addReview(review) {
    const reviews = JSON.parse(localStorage.getItem('trimtime_reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('trimtime_reviews', JSON.stringify(reviews));
    state.reviews = reviews;
    window.dispatchEvent(new Event('storage'));
  }
};

const authService = {
  login(name, phone) {
    const user = { name, phone, role: 'client' };
    localStorage.setItem('trimtime_user', JSON.stringify(user));
    state.user = user;
    return user;
  },
  /**
   * TODO: [SECURITY] This client-side check is HIGHLY INSECURE.
   * Hardcoded passwords must be replaced with a secure server-side 
   * authentication endpoint (e.g., POST /auth/login) before production.
   * Admin roles must never be derived on the client and instead should 
   * be based on signed, server-validated tokens.
   */
  async adminLogin(password) {
    // Simulating a server call to a secure backend
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, the password check happens on the server
    if (password === 'fadezone') {
      const user = { name: 'FadeZone', phone: 'Admin', role: 'admin' };
      localStorage.setItem('trimtime_user', JSON.stringify(user));
      state.user = user;
      return user;
    }
    return null;
  },
  logout() {
    localStorage.removeItem('trimtime_user');
    state.user = null;
    window.location.reload();
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

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== RENDER FUNCTIONS =====

// ===== RENDER FUNCTIONS =====

function renderLandingPage() {
  const container = document.getElementById('landing-view');

  container.innerHTML = `
    <!-- Dynamic Hero Section -->
    <div class="hero-section bg-[#fbd600] relative min-h-[500px] flex flex-col md:flex-row items-center justify-center p-6 diagonal-stripes overflow-hidden">
      <!-- Brand Block (Left) - Sliding Entrance -->
      <div class="brand-block z-10 bg-[#3e2723] p-10 jagged-edge">
        <h2 class="text-6xl md:text-8xl font-heading text-[#fbd600] leading-none mb-2">
          FADEZONE<br>GROOMING
        </h2>
        <p class="brand-tagline text-white/50 font-bold tracking-[0.4em] uppercase text-xs">
          LEGENDARY GROOMING
        </p>
      </div>

      <!-- Bust (Right) - Image -->
      <div class="hero-bust mt-8 md:mt-0 md:-ml-12">
        <div class="bust-image-container w-64 h-64 md:w-96 md:h-96 rounded-full border-8 border-white overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" 
            class="w-full h-full object-cover"
            alt="FadeZone Vibe"
          >
        </div>
      </div>

      <!-- Floating Book Button -->
      <button 
        onclick="navigateToStep(1)"
        class="btn-bubble hover:scale-110 active:scale-95 transition-all"
      >
        BOOK AN APPOINTMENT
      </button>
    </div>

    <!-- Brand Story Section -->
    <div class="brand-story-section bg-[#e0f2f1] py-24 px-8 flex flex-col items-center text-center gap-12 sunburst-gradient">
      <div class="pigeon-container w-64 h-64 rounded-full border-8 border-white overflow-hidden shadow-xl bg-white flex items-center justify-center relative">
        <div class="absolute inset-0 sunburst-gradient opacity-50"></div>
        <div class="text-6xl">🕊️</div>
      </div>
      
      <div class="story-content max-w-xl space-y-8">
        <h3 class="story-title text-3xl md:text-5xl font-heading text-[#b32b2b] italic leading-tight">
          LOOKING TO THE INSPIRATION OF THE CITY IT WAS FOUNDED IN, FADEZONE GROOMING WAS BORN OUT OF A PASSION.
        </h3>
        <p class="story-text text-zinc-700 font-medium leading-relaxed">
          Captivated by good design, good coffee and exceptional haircuts, Alex wanted to create a space that delivered an authentic, modern barber experience. Having established the shop in 2010 he has built that space that opens before your first meeting.
        </p>
        <div class="story-actions flex flex-col md:flex-row gap-4 justify-center pt-8">
          <button 
            onclick="navigateToStep(1)"
            class="bg-[#b32b2b] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#8e2222] transition-colors"
          >
            BOOK AN APPOINTMENT
          </button>
          <button class="bg-[#fbd600] text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#e6c400] transition-colors">
            <span class="vid-play-icon"></span>
            VIEW OUR VIDEO
          </button>
        </div>
      </div>
    </div>

    <!-- Legendary Styles Carousel -->
    <div class="carousel-section bg-black py-24">
      <div class="section-header px-8 mb-12 flex flex-col gap-4">
        <h2 class="text-5xl md:text-7xl font-heading text-white leading-none">
          SEE OUR<br>
          <span class="text-[#fbd600] italic">LEGENDARY</span> STYLES
        </h2>
        <p class="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
          SELECT A STYLE TO START YOUR BOOKING IMMEDIATELY.
        </p>
      </div>

      <!-- Carousel Cards -->
      <div class="carousel no-scrollbar" id="style-carousel" style="padding: 0 2rem; gap: 1.5rem;">
        ${SERVICES.map(service => `
          <div 
            class="style-card min-w-[300px] h-[450px] relative rounded-[2.5rem] overflow-hidden snap-start group bg-zinc-900"
            onclick="selectService('${service.id}')"
            style="cursor: pointer;"
          >
            <img 
              src="${service.id === 'fade' ? "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600" :
      service.id === 'beard' ? "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600" :
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600"
    }" 
              class="w-full h-full object-cover grayscale transition-all duration-700"
              alt="${service.name}"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end items-start text-left">
              <span class="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">
                ${service.name.includes(' ') ? service.name.split(' ')[0] : 'Legendary'} • ${service.id.toUpperCase()}
              </span>
              <span class="text-5xl font-heading text-[#fbd600] italic leading-none">
                R${service.price}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- The Studio Section -->
    <div class="studio-section bg-white py-24 px-8">
      <div class="grid md:grid-cols-2 gap-16">
        <div class="studio-info space-y-8">
          <h2 class="text-6xl font-heading leading-none italic text-[#b32b2b]">THE STUDIO</h2>
          <div class="location-box flex gap-6 items-start">
            <div class="w-14 h-14 bg-[#fbd600] rounded-full flex items-center justify-center flex-shrink-0">
              <i data-feather="map-pin" style="color: black;"></i>
            </div>
            <div>
              <h4 class="text-2xl font-bold mb-2">${escapeHtml(state.selectedLocation.address)}</h4>
              <button class="text-[#b32b2b] font-black uppercase tracking-widest text-[10px] border-b-2 border-[#b32b2b] pb-1">
                GET DIRECTIONS
              </button>
            </div>
          </div>
          
          <div class="badges flex flex-wrap gap-3">
            <div class="badge px-6 py-3 border border-black/5 rounded-full text-[9px] font-black uppercase tracking-widest bg-zinc-50">KID FRIENDLY</div>
            <div class="badge px-6 py-3 border border-black/5 rounded-full text-[9px] font-black uppercase tracking-widest bg-zinc-50">SECURE PARKING</div>
            <div class="badge px-6 py-3 border border-black/5 rounded-full text-[9px] font-black uppercase tracking-widest bg-zinc-50">EXPERT BARBERS</div>
          </div>
        </div>

        <div class="opening-times bg-zinc-50 p-10 rounded-[3rem] border border-black/5">
          <h4 class="font-heading text-2xl mb-8 text-[#b32b2b]">OPENING TIMES</h4>
          <div class="hours-list space-y-4">
            ${state.selectedLocation.hours.map(h => `
              <div class="hours-row flex justify-between items-center border-b border-black/5 pb-2">
                <span class="font-black uppercase tracking-widest text-[10px] text-zinc-400">${h.day}</span>
                <span class="font-heading text-xl ${h.status === 'closed' ? 'text-zinc-300' : 'text-black'}">${h.time}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
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
    <!-- Header -->
    <div class="service-view-header bg-[#b32b2b] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden diagonal-stripes">
      <button onclick="navigateToStep(0)" class="absolute top-6 left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
        <i data-feather="chevron-left" style="color: white;"></i>
      </button>
      <div class="font-heading text-4xl text-white mb-2 italic">SELECT SERVICE</div>
      <div class="flex items-center gap-2 text-xs font-black text-[#fbd600] uppercase tracking-widest">
        <i data-feather="map-pin" style="width: 12px;"></i>
        <span>${escapeHtml(state.selectedLocation.name)}</span>
      </div>
    </div>

    <!-- Categories Grid -->
    <div class="px-8 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-12 bg-white">
      ${categories.map(cat => `
        <div class="category-block space-y-8">
          <div class="flex items-center gap-3">
            <div class="w-2 h-10 bg-[#fbd600]"></div>
            <h3 class="text-4xl font-heading italic uppercase text-black">${cat.name}</h3>
          </div>
          <div class="service-stack space-y-6">
            ${cat.services.map(s => `
              <div class="service-item bg-white p-8 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                <div class="flex justify-between items-start mb-6">
                  <div class="space-y-1">
                    <h4 class="text-xl font-black uppercase tracking-tight text-black">${s.name}</h4>
                    <p class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">${s.duration} MINS • ${s.description.toUpperCase()}</p>
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] font-heading text-zinc-300 block mb-0 leading-none">FROM</span>
                    <span class="text-3xl font-heading text-[#b32b2b] italic leading-none">R${s.price}</span>
                  </div>
                </div>
                <button
                  onclick="selectService('${s.id}')"
                  class="w-full py-4 bg-black text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-[#b32b2b] transition-colors"
                >
                  BOOK NOW
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  feather.replace();
}

function renderTimeSelection() {
  const container = document.getElementById('time-view');
  const slots = generateTimeSlots();
  const dateStr = formatDate(state.selectedDate);

  container.innerHTML = `
    <div class="time-selection bg-[#000] min-h-screen pb-24">
      <div class="bg-[#fbd600] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden diagonal-stripes">
        <button onclick="navigateToStep(1)" class="absolute top-6 left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
          <i data-feather="chevron-left" style="color: white;"></i>
        </button>
        <div class="font-heading text-4xl text-black mb-2 italic">SELECT TIME</div>
        <p class="text-[10px] font-black uppercase tracking-widest text-black/50">${dateStr.toUpperCase()}</p>
      </div>

      <div class="px-8 py-12">
        <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
          ${slots.map(time => {
    const isOccupied = state.bookings.some(b => escapeHtml(b.date) === escapeHtml(dateStr) && escapeHtml(b.time) === escapeHtml(time));
    const isSelected = state.selectedTime === time;
    return `
              <button 
                class="time-slot-btn py-4 px-2 rounded-none border text-xs font-black transition-all uppercase tracking-widest text-center
                ${isOccupied
        ? 'bg-zinc-950 border-zinc-900 text-zinc-800 cursor-not-allowed line-through'
        : isSelected
          ? 'bg-[#fbd600] border-[#fbd600] text-black shadow-[0_0_20px_rgba(251,214,0,0.4)] scale-[1.05] z-10'
          : 'bg-black border-zinc-800 text-zinc-400 hover:border-[#fbd600] hover:text-[#fbd600]'
      }"
                ${isOccupied ? 'disabled' : ''}
                onclick="selectTime('${escapeHtml(time)}')"
              >
                ${escapeHtml(time)}
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

  if (state.user && !state.customerName) state.customerName = state.user.name;
  if (state.user && !state.customerPhone) state.customerPhone = state.user.phone;

  container.innerHTML = `
    <div class="space-y-12 animate-in slide-in-from-bottom duration-500 pb-24 bg-[#e0f2f1] min-h-screen px-6 pt-12 sunburst-gradient">
      <!-- Title -->
      <h2 class="text-4xl font-heading text-[#b32b2b] text-center italic">BOOKING SUMMARY</h2>

      <!-- Physical Receipt Card -->
      <div class="bg-white p-8 space-y-8 relative shadow-2xl mx-auto max-w-sm jagged-edge receipt-paper">
        <!-- Receipt Header -->
        <div class="text-center space-y-2">
          <div class="font-heading text-2xl text-[#b32b2b]">FADEZONE GROOMING</div>
          <div class="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">EST. 2010 • DURBAN</div>
          <div class="text-[8px] font-mono text-zinc-400">TXN #NZ-2941-DN</div>
        </div>

        <div class="receipt-divider border-t-2 border-dashed border-zinc-100"></div>

        <!-- Location & Time -->
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-1">
            <p class="text-[8px] font-black uppercase tracking-widest text-zinc-400">DATE</p>
            <p class="text-xs font-black uppercase text-black">${dateStr}</p>
          </div>
          <div class="space-y-1 text-right">
            <p class="text-[8px] font-black uppercase tracking-widest text-zinc-400">TIME</p>
            <p class="text-xs font-black uppercase text-black">${state.selectedTime}</p>
          </div>
        </div>

        <div class="space-y-1">
          <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">LOCATION</p>
          <p className="text-xs font-bold leading-tight uppercase text-black">424 COMMISSIONER STREET<br>KENSINGTON</p>
        </div>

        <div class="receipt-divider border-t-2 border-dashed border-zinc-100"></div>

        <!-- Service Details -->
        <div class="space-y-6">
          <div class="flex justify-between items-start">
            <div class="space-y-1">
              <p class="text-xs font-black uppercase tracking-tight text-black">${service.name}</p>
              <p class="text-[9px] font-bold text-zinc-400 uppercase italic">${service.duration} MINS SESSION</p>
            </div>
            <span class="text-xl font-heading text-[#b32b2b] italic">R${service.price}</span>
          </div>

          <!-- Pricing Math -->
          <div class="space-y-2 pt-4 border-t border-zinc-100">
            <div class="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <span>SUBTOTAL</span>
              <span>R${service.price}</span>
            </div>
            <div class="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <span>SERVICE FEE</span>
              <span>R0</span>
            </div>
            <div class="flex justify-between text-xl font-heading text-black mt-4 pt-4 border-t-2 border-black italic">
              <span>TOTAL</span>
              <span>R${service.price}</span>
            </div>
          </div>
        </div>

        <div class="receipt-divider border-t-2 border-dashed border-zinc-100"></div>

        <!-- Barcode -->
        <div class="barcode-stack space-y-4 text-center pb-4">
          <div class="barcode-lines h-16 w-full flex items-center justify-center gap-[2px]">
            ${[...Array(20)].map(() => `<div class="bg-black h-full" style="width:${Math.random() * 4 + 1}px; opacity:${Math.random() > 0.3 ? 1 : 0.4}"></div>`).join('')}
          </div>
          <p class="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400">FADEZONE GROOMING SYSTEMS</p>
        </div>
      </div>

      <!-- Guest Details Input -->
      <div class="max-w-sm mx-auto space-y-6 pt-8">
        <h4 class="text-center text-[10px] font-black uppercase tracking-[0.2em] text-black/50">GUEST DETAILS</h4>
        <div class="space-y-3">
          <input 
            id="customer-name"
            type="text" 
            class="input-field-new"
            placeholder="FULL NAME"
            value="${escapeHtml(state.customerName)}"
            oninput="updateCustomerName(this.value)"
          >
          <input 
            id="customer-phone"
            type="tel" 
            class="input-field-new"
            placeholder="PHONE NUMBER"
            value="${escapeHtml(state.customerPhone)}"
            oninput="updateCustomerPhone(this.value)"
          >
        </div>

        <!-- Confirm Button -->
        <button 
          id="confirm-btn"
          onclick="confirmBooking()"
          class="w-full py-6 rounded-full text-sm font-black uppercase tracking-widest transition-all bg-[#b32b2b] text-white shadow-2xl hover:scale-105 active:scale-95"
        >
          CONFIRM VIA WHATSAPP
        </button>

        <p class="text-[8px] text-center text-black/40 font-bold uppercase tracking-widest leading-relaxed px-6">
          By confirming you agree to our 24h cancellation policy. Late arrivals may forfeit their slot and deposit.
        </p>
      </div>
    </div>
  `;

  feather.replace();
}

function renderAuthPage() {
  const container = document.getElementById('auth-view');
  const error = state.authError || '';

  container.innerHTML = `
    <div class="auth-screen">
      <div class="auth-container">
        <h2 class="section-title">${state.isAdminLogin ? 'Admin Access' : 'Welcome to TrimTime'}</h2>
        <p class="section-description">${state.isAdminLogin ? 'Enter password to access dashboard' : 'Please enter your details to continue'}</p>
        
        <form id="auth-form" onsubmit="handleAuthSubmit(event)">
          ${!state.isAdminLogin ? `
            <input type="text" id="auth-name" class="input-field" placeholder="Your Name" required>
            <input type="tel" id="auth-phone" class="input-field" placeholder="Phone Number" required>
          ` : `
            <input type="password" id="auth-password" class="input-field" placeholder="Admin Password" required autofocus>
          `}
          ${error ? `<p class="error-text">${error}</p>` : ''}
          <button type="submit" class="btn-primary" style="margin-top: 2rem;">
            ${state.isAdminLogin ? 'Login as Admin' : 'Start Booking'}
          </button>
        </form>

        <div class="auth-footer">
          <button class="link-btn" onclick="toggleAdminLogin()">
            ${state.isAdminLogin ? 'Back to Client Booking' : 'Are you looking for Admin Login?'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderAdminDashboard() {
  const container = document.getElementById('admin-view');
  const bookings = bookingService.getBookings();

  container.innerHTML = `
    <div class="admin-dashboard">
      <div class="admin-header">
        <h2 class="section-title">Admin Dashboard</h2>
        <button class="logout-btn" onclick="authService.logout()">Logout</button>
      </div>
      
      <div class="admin-content">
        <h3 class="category-title">Upcoming Appointments</h3>
        ${bookings.length === 0 ? '<p class="empty-text">No bookings yet...</p>' : `
          <div class="admin-booking-list">
            ${bookings.map(b => `
              <div class="admin-booking-card">
                <div class="booking-main">
                  <div class="booking-user">
                    <i data-feather="user"></i>
                    <span>${escapeHtml(b.customerName)}</span>
                  </div>
                  <div class="booking-time">
                    <i data-feather="clock"></i>
                    <span>${escapeHtml(b.date)} • ${escapeHtml(b.time)}</span>
                  </div>
                </div>
                <div class="booking-status-badge ${escapeHtml(b.status)}">${escapeHtml(b.status)}</div>
                <div class="booking-actions">
                  <button class="btn-confirm" onclick="updateStatus('${escapeHtml(b.id)}', 'confirmed')">Confirm</button>
                  <button class="btn-cancel" onclick="updateStatus('${escapeHtml(b.id)}', 'cancelled')">Cancel</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
  feather.replace();
}

function renderReviewPage() {
  const container = document.getElementById('review-view');
  container.innerHTML = `
    <div class="review-page">
      <button class="back-btn" onclick="navigateToStep(0)">
        <i data-feather="chevron-left"></i>
      </button>
      <h2 class="section-title">Share the Vibe</h2>
      <p class="section-description">Tell the community about your legendary cut.</p>
      
      <form id="review-form" onsubmit="handleReviewSubmit(event)" style="margin-top: 2rem;">
        <div class="rating-input">
          <p class="label">How's the cut?</p>
          <div class="stars">
            ${[1, 2, 3, 4, 5].map(s => `
              <i data-feather="star" onclick="setRating(${s})" class="${state.tempRating >= s ? 'active' : ''}"></i>
            `).join('')}
          </div>
        </div>
        <textarea id="review-comment" class="input-field" placeholder="What a vibe! The fade is legendary..." style="min-height: 150px;"></textarea>
        <button type="submit" class="btn-primary" style="margin-top: 2rem;">Post Review</button>
      </form>
    </div>
  `;
  feather.replace();
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
                    <h4 class="service-name">${escapeHtml(service ? service.name : 'Unknown Service')}</h4>
                    <p class="service-details">${escapeHtml(b.date)} • ${escapeHtml(b.time)}</p>
                  </div>
                  <div class="service-price-container">
                    <span class="service-price">${escapeHtml(b.status || 'Confirmed')}</span>
                  </div>
                </div>
                <button class="btn-book" onclick="deleteBooking('${escapeHtml(b.id)}')" style="background-color: var(--color-accent-red); color: white;">
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
        <h2 class="barber-title" style="color: var(--color-accent-primary);">About FadeZone</h2>
        <div class="barber-content">
          <p style="color: #ffffff; font-size: 1.25rem; font-weight: 900; font-style: italic; margin-bottom: 1rem;">Look Good. Feel Better.</p>
          <div style="color: #FFC107; display: flex; flex-direction: column; gap: 1rem;">
            <p>At FadeZone Grooming, we don’t just cut hair—we level up your confidence. Alex built this spot on a simple mix: high-end prestige and a vibe that’s actually chill.</p>
            <p>Whether you’re after a crisp fade or a total refresh, you can count on a look that’s sharp, consistent, and tailored to you. No ego, no guesswork—just reliable cuts and good energy every time you hit the chair.</p>
            <p style="text-transform: uppercase; font-weight: 900; letter-spacing: 0.1em; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; color: #ffffff;">Prestige service. Friendly atmosphere. Reliable results.</p>
          </div>
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

  // Update navigation visibility
  const nav = document.querySelector('nav');
  const supportFab = document.querySelector('.support-fab');
  const logoutBtn = document.getElementById('logout-btn');

  if (nav) {
    if (viewName === 'auth' || viewName === 'admin') {
      nav.style.display = 'none';
      if (supportFab) supportFab.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      if (supportFab) supportFab.style.display = 'flex';
    }
  }

  // Toggle logout button visibility
  if (logoutBtn) {
    if (viewName === 'auth') {
      logoutBtn.style.display = 'none';
    } else {
      logoutBtn.style.display = 'flex';
    }
  }

  // Update navigation active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`[data-view="${viewName}"]`) || document.querySelector(`[data-view="customer"]`);
  if (activeBtn && (viewName === 'landing' || viewName === 'customer')) {
    activeBtn.classList.add('active');
  } else if (activeBtn) {
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
    `_Sent via FadeZone Online Booking Systems_\n\n` +
    `Book another session with us: ${window.location.href}`;

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
      customerName: state.user.name || state.customerName, // Use logged in user name
      customerPhone: state.user.phone || state.customerPhone,
      status: 'pending'
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

  if (viewName === 'customer' || viewName === 'landing') {
    navigateToStep(state.step);
  } else if (viewName === 'bookings') {
    renderBookingsView();
    showView('bookings');
  } else if (viewName === 'about') {
    renderAboutView();
    showView('about');
  } else if (viewName === 'review') {
    renderReviewPage();
    showView('review');
  } else if (viewName === 'admin') {
    renderAdminDashboard();
    showView('admin');
  }
}

function deleteBooking(id) {
  if (confirm('Are you sure you want to cancel this booking?')) {
    bookingService.deleteBooking(id);
    renderBookingsView();
  }
}

function updateStatus(id, status) {
  bookingService.updateBookingStatus(id, status);
  renderAdminDashboard();
}

function toggleAdminLogin() {
  state.isAdminLogin = !state.isAdminLogin;
  state.authError = '';
  renderAuthPage();
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  try {
    if (state.isAdminLogin) {
      const pass = document.getElementById('auth-password').value;
      const user = await authService.adminLogin(pass);
      if (user) {
        init();
      } else {
        state.authError = 'Invalid admin password';
        renderAuthPage();
      }
    } else {
      const name = document.getElementById('auth-name').value;
      const phone = document.getElementById('auth-phone').value;

      if (!name || !phone) {
        throw new Error('Please enter both name and phone number');
      }

      authService.login(name, phone);
      init();
    }
  } catch (error) {
    console.error('Auth error:', error);
    alert('Authentication failed: ' + error.message);
  }
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const comment = document.getElementById('review-comment').value;
  bookingService.addReview({
    id: Date.now(),
    customerName: state.user.name,
    rating: state.tempRating || 5,
    comment,
    date: new Date().toISOString()
  });
  alert('Lekker FadeZone! Thanks for the feedback.');
  navigateToStep(0);
}

function setRating(r) {
  state.tempRating = r;
  renderReviewPage();
}

function refreshBookings() {
  state.bookings = bookingService.getBookings();
}



// ===== INITIALIZATION =====

function init() {
  // Load bookings
  refreshBookings();

  if (!state.user) {
    showView('auth');
    renderAuthPage();
  } else if (state.user.role === 'admin') {
    showView('admin');
    renderAdminDashboard();
  } else {
    // Render initial client view
    renderLandingPage();
    showView('landing');
  }

  console.log('FadeZone Grooming App initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Expose functions to global scope for HTML event handlers
window.changeView = changeView;
window.selectLocation = selectLocation;
window.navigateToStep = navigateToStep;
window.selectService = selectService;
window.selectTime = selectTime;
window.renderBookingSummary = renderBookingSummary;
window.validateBookingForm = validateBookingForm;
window.confirmBooking = confirmBooking;
window.scrollCarousel = scrollCarousel;
window.handleAuthSubmit = handleAuthSubmit;
window.toggleAdminLogin = toggleAdminLogin;
window.deleteBooking = deleteBooking;
window.updateStatus = updateStatus;
window.handleReviewSubmit = handleReviewSubmit;
window.setRating = setRating;
window.updateCustomerName = updateCustomerName;
window.updateCustomerPhone = updateCustomerPhone;
window.authService = authService;
