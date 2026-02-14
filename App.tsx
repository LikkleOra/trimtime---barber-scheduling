
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import TimeGrid from './components/TimeGrid';
import BookingSummary from './components/BookingSummary';
import AuthScreen from './components/AuthScreen';
import AdminDashboard from './components/AdminDashboard';
import ReviewPage from './Fadezone new designs/components/ReviewPage';
import { SERVICES, BARBER_CONFIG } from './constants';
import { Service, Booking, User } from './types';
import { bookingService } from './services/bookingService';
import { authService } from './services/authService';
import { ChevronRight, MapPin, CheckCircle, Smartphone, ChevronLeft, ArrowRight, Star } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [selectedLocation, setSelectedLocation] = useState(BARBER_CONFIG.locations[0]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0); // 0: Landing, 1: Services, 2: Time, 3: Summary, 4: Reviews, 5: My Bookings, 6: About
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshBookings = useCallback(() => {
    setBookings(bookingService.getBookings());
  }, []);

  useEffect(() => {
    refreshBookings();
    const handleStorage = () => {
      refreshBookings();
      setUser(authService.getCurrentUser());
    };
    window.addEventListener('storage', handleStorage);
  }, [refreshBookings]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const handleConfirm = () => {
    if (!selectedService || !selectedTime) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    const msg = `Hi Nev! Booking: ${selectedService.name} on ${dateStr} at ${selectedTime}. Customer: ${customerName}. Vibe the vibe! \n\nBook your session: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/${BARBER_CONFIG.phone}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');

    bookingService.addBooking({
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectedService.id,
      date: dateStr,
      time: selectedTime,
      customerName,
      customerPhone,
      status: 'pending' // Default to pending for admin to confirm
    });

    setStep(0);
    setSelectedService(null);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!user) {
    return <AuthScreen onAuthComplete={() => setUser(authService.getCurrentUser())} />;
  }

  if (user.role === 'admin') {
    return (
      <Layout onLogout={handleLogout}>
        <AdminDashboard />
      </Layout>
    );
  }

  const renderLandingPage = () => (
    <div className="space-y-0 pb-10 overflow-hidden w-full">
      {/* Dynamic Hero Section */}
      <div className="bg-[#fbd600] relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center p-6 md:p-12 diagonal-stripes overflow-hidden">
        {/* Book Button - Top Right */}
        <button
          onClick={() => setStep(1)}
          className="absolute top-10 md:top-20 right-10 md:right-20 bg-[#b32b2b] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs z-20 hover:scale-110 active:scale-95 transition-all shadow-lg"
        >
          BOOK AN APPOINTMENT
        </button>

        {/* Brand Block (Left) - Sliding Entrance */}
        <div className="z-10 bg-[#3e2723] p-6 md:p-12 jagged-edge animate-in slide-in-from-left-[150%] duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex-1">
          <h2 className="text-6xl md:text-9xl lg:text-[12rem] font-heading text-[#fbd600] leading-none mb-2">
            NEV
          </h2>
          <h2 className="text-4xl md:text-7xl lg:text-9xl font-heading text-white leading-none mb-1">
            THE
          </h2>
          <h2 className="text-6xl md:text-9xl lg:text-[12rem] font-heading text-[#fbd600] leading-none">
            BARBER
          </h2>
        </div>

        {/* Bust (Right) - Sliding Entrance */}
        <div className="mt-8 md:mt-0 md:flex-1 md:flex md:items-center md:justify-center relative animate-in slide-in-from-right-[150%] duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]">
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-[#fbd600] rounded-full blur-3xl opacity-50 w-72 h-72 md:w-[450px] md:h-[450px]" />
          <div className="w-56 h-72 md:w-[450px] md:h-[600px] rounded-full border-[12px] border-white overflow-hidden shadow-2xl relative z-10 group">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              alt="Nev the Barber"
            />
          </div>
        </div>
      </div>

      {/* Brand Story Section ("Durban Pigeon") */}
      <div className="bg-[#e0f2f1] py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-72 h-72 md:w-[500px] md:h-[500px] rounded-full border-8 border-white overflow-hidden shadow-2xl bg-white flex items-center justify-center relative group hover:rotate-12 transition-transform duration-500">
              <div className="absolute inset-0 sunburst-gradient opacity-50"></div>
              {/* Placeholder for Pigeon SVG */}
              <div className="text-[120px] md:text-[200px] z-10">🕊️</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 lg:text-left text-center">
            {/* Tab Navigation */}
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
              <button className="text-xs md:text-sm font-black uppercase tracking-widest text-[#b32b2b] border-b-4 border-[#b32b2b] pb-2">ABOUT NEV</button>
              <button className="text-xs md:text-sm font-black uppercase tracking-widest text-zinc-400 border-b-4 border-transparent pb-2 hover:text-black transition-colors">PRICING</button>
              <button className="text-xs md:text-sm font-black uppercase tracking-widest text-zinc-400 border-b-4 border-transparent pb-2 hover:text-black transition-colors">CONTACT</button>
            </div>

            <h3 className="text-4xl md:text-6xl font-heading text-[#b32b2b] italic leading-tight">
              LOOKING TO THE INSPIRATION OF THE CITY IT WAS FOUNDED IN, NEV THE BARBER WAS BORN OUT OF A PASSION.
            </h3>
            <p className="text-zinc-700 font-medium leading-relaxed text-sm md:text-base">
              Captivated by good design, good coffee and exceptional haircuts, Nev wanted to create a space that delivered an authentic, modern barber experience. Established in 2010, he has built a space that opens before your first meeting.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start pt-8">
              <button
                onClick={() => setStep(1)}
                className="bg-[#b32b2b] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-xs md:text-sm hover:bg-[#8e2222] transition-colors shadow-lg"
              >
                BOOK AN APPOINTMENT
              </button>
              <button className="bg-[#fbd600] text-black px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#e6c400] transition-colors shadow-lg">
                <span className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent"></span>
                VIEW OUR VIDEO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legendary Styles Carousel */}
      <div className="bg-black py-32 px-6 md:px-12">
        <div className="mb-16 flex flex-col gap-6">
          <div>
            <h2 className="text-6xl md:text-9xl font-heading text-white leading-none">
              SEE OUR<br />
              <span className="text-[#fbd600] italic">LEGENDARY</span>
            </h2>
            <h2 className="text-6xl md:text-9xl font-heading text-white italic">STYLES</h2>
          </div>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
            SELECT A STYLE TO START YOUR BOOKING IMMEDIATELY.
          </p>
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/5 transition-colors">
              <ChevronLeft size={28} />
            </button>
            <button onClick={() => scroll('right')} className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/5 transition-colors">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 no-scrollbar snap-x snap-mandatory"
        >
          {SERVICES.map(service => (
            <button
              key={service.id}
              onClick={() => { setSelectedService(service); setStep(2); }}
              className="min-w-[340px] md:min-w-[500px] h-[400px] md:h-[600px] relative rounded-[4rem] overflow-hidden snap-start group bg-zinc-900 flex-shrink-0 border-2 border-white/5"
            >
              <img
                src={
                  service.id === 'fade' ? "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600" :
                    service.id === 'beard' ? "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600" :
                      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600"
                }
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                alt={service.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-between items-start">
                {/* Start Booking Text - Shows on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white font-black uppercase tracking-widest text-xs md:text-sm">START BOOKING</span>
                </div>

                {/* Bottom Details */}
                <div>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/60 mb-2 block">
                    {service.name.includes(' ') ? service.name.split(' ')[0] : 'Legendary'} • {service.id.toUpperCase()}
                  </span>
                  <span className="text-4xl md:text-6xl font-heading text-[#fbd600] italic leading-none">
                    R{service.price}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Studio Info Section ("THE STUDIO") */}
      <div className="bg-white py-32 px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-20 md:gap-32">
          {/* Left Column */}
          <div className="space-y-12">
            <h2 className="text-6xl md:text-7xl font-heading italic text-[#b32b2b] leading-tight">THE STUDIO</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-[#fbd600] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={28} className="text-black" />
                </div>
                <div>
                  <h4 className="text-lg md:text-2xl font-bold mb-3">
                    {BARBER_CONFIG.locations[0].address}
                  </h4>
                  <button className="text-[#b32b2b] font-black uppercase tracking-widest text-[10px] border-b-2 border-[#b32b2b] pb-1 hover:opacity-70 transition-opacity">
                    GET DIRECTIONS
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {['INSTANT CONFIRM', 'KID FRIENDLY', 'EXPERT BARBERS'].map(badge => (
                  <div key={badge} className="px-6 py-3 border-2 border-black/10 rounded-full text-[9px] font-black uppercase tracking-widest bg-white hover:bg-zinc-50 transition-colors">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Hours Box */}
          <div className="bg-zinc-50 p-12 md:p-16 rounded-[4rem] border border-zinc-100 shadow-inner h-fit">
            <h4 className="font-heading text-3xl md:text-4xl mb-10 text-[#b32b2b] italic">OPENING TIMES</h4>
            <div className="space-y-5">
              {BARBER_CONFIG.locations[0].hours.map(h => (
                <div key={h.day} className="flex justify-between items-center border-b border-zinc-200 pb-3">
                  <span className="font-black uppercase tracking-widest text-[10px] text-zinc-500">{h.day}</span>
                  <span className={`font-heading text-lg md:text-2xl ${h.status === 'closed' ? 'text-zinc-300' : h.status === 'current' ? 'text-[#b32b2b]' : 'text-black font-black'}`}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServiceMenu = () => {
    const categories = [
      { name: 'Hair', services: SERVICES.filter(s => ['scholar', 'fade', 'buzz'].includes(s.id)) },
      { name: 'Beard', services: SERVICES.filter(s => s.id === 'beard') },
      { name: 'Combo', services: SERVICES.filter(s => s.id === 'full') }
    ];

    return (
      <div className="min-h-screen bg-[#fbd600] py-16 md:py-24 px-6 md:px-12">
        {/* Back Button */}
        <button onClick={() => setStep(0)} className="flex items-center gap-2 text-black/70 uppercase text-[10px] md:text-xs font-black mb-12 hover:text-black transition-colors">
          <ChevronLeft size={18} /> BACK
        </button>

        {/* Title */}
        <div className="mb-20 md:mb-32 space-y-3">
          <h1 className="text-7xl md:text-9xl font-heading text-[#b32b2b] italic leading-none">PRICING</h1>
          <h1 className="text-5xl md:text-7xl font-heading text-black leading-none">MENU</h1>
          <div className="flex items-center gap-2 text-xs md:text-sm font-black text-black uppercase tracking-widest mt-4">
            <MapPin size={14} />
            <span>{selectedLocation.name}</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {categories.map(cat => (
            <div key={cat.name} className="space-y-10">
              {/* Category Header with Decorative Line */}
              <div className="space-y-4">
                <h3 className="text-5xl md:text-6xl font-heading italic uppercase text-black">{cat.name}</h3>
                <div className="w-16 h-1 bg-black/20"></div>
              </div>

              {/* Service Cards */}
              <div className="space-y-8">
                {cat.services.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setSelectedService(s); setStep(2); }}
                    className="w-full bg-white p-8 md:p-10 border border-black/5 shadow-md hover:shadow-lg hover:translate-y-[-8px] transition-all duration-300 group relative overflow-hidden rounded-[3rem] text-left"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <h4 className="text-lg md:text-2xl font-black uppercase tracking-tight text-black">{s.name}</h4>
                          <p className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{s.duration} MINS • {s.description.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end gap-4 mt-6 pt-4 border-t border-black/5">
                        <span className="text-4xl md:text-5xl font-heading text-[#b32b2b] italic leading-none">R{s.price}</span>
                        <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">FROM</span>
                      </div>
                    </div>
                    <button
                      onClick={() => { setSelectedService(s); setStep(2); }}
                      className="w-full mt-6 py-4 md:py-5 bg-[#b32b2b] text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-[#8e2222] transition-colors rounded-full"
                    >
                      BOOK THIS SESSION
                    </button>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Shop Details Footer */}
        <div className="px-0 md:px-8 mt-32 md:mt-48">
          <div className="bg-[#3e2723] p-12 md:p-16 text-white rounded-[3rem] diagonal-stripes flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-4 text-center md:text-left">
              <h4 className="font-heading text-3xl md:text-4xl text-[#fbd600]">SHOP DETAILS</h4>
              <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest max-w-sm">Everything you need for a premium grooming experience in Durban.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full md:w-auto">
              {[
                { icon: <CheckCircle size={24} />, label: 'INSTANT CONFIRM' },
                { icon: <Smartphone size={24} />, label: 'MOBILE BOOKING' },
                { icon: <MapPin size={24} />, label: 'STREET PARKING' }
              ].map(detail => (
                <div key={detail.label} className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#fbd600] flex items-center justify-center text-black">
                    {detail.icon}
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white">{detail.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMyBookings = () => {
    const myBookings = bookings.filter(b => b.customerPhone === user.phone);
    return (
      <div className="p-6 space-y-8">
        <button onClick={() => setStep(0)} className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-black"><ChevronLeft size={16} /> Back</button>
        <h2 className="text-4xl font-brand italic uppercase tracking-tighter">My Bookings</h2>
        {myBookings.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-zinc-500 italic">No bookings yet. Ready for a legendary cut?</p>
            <button onClick={() => setStep(1)} className="text-[#FFC107] font-black uppercase text-xs border-b border-[#FFC107]">Book Now</button>
          </div>
        ) : (
          <div className="space-y-4">
            {myBookings.map(b => (
              <div key={b.id} className="bg-zinc-900/50 p-6 border border-zinc-800 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-sm font-black uppercase block">{SERVICES.find(s => s.id === b.serviceId)?.name || 'Haircut'}</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">{b.date} • {b.time}</span>
                </div>
                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${b.status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const renderAboutView = () => (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button onClick={() => setStep(0)} className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-black">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="space-y-6">
        <h2 className="text-4xl font-brand italic uppercase tracking-tighter text-[#FFC107]">About FadeZone</h2>

        <div className="space-y-6 leading-relaxed font-medium">
          <p className="text-xl text-white font-black italic">Look Good. Feel Better.</p>

          <div className="text-[#FFC107] space-y-6">
            <p>
              At FadeZone Grooming, we don’t just cut hair—we level up your confidence.
              Alex built this spot on a simple mix: high-end prestige and a vibe that’s actually chill.
            </p>

            <p>
              Whether you’re after a crisp fade or a total refresh, you can count on a look
              that’s sharp, consistent, and tailored to you. No ego, no guesswork—just
              reliable cuts and good energy every time you hit the chair.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-900">
            <p className="text-sm font-black uppercase tracking-widest text-white">
              Prestige service. Friendly atmosphere. Reliable results.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <div className="bg-zinc-900/50 p-6 border border-zinc-800 space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Location</h4>
          <p className="text-sm font-bold">{selectedLocation.address}</p>
        </div>
      </div>
    </div>
  );

  const handleReviewSubmit = async (review: { rating: number; comment: string }) => {
    const newReview = {
      id: Date.now().toString(),
      customerName: customerName || 'Anonymous',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0]
    };

    bookingService.addReview(newReview);
  };

  return (
    <Layout
      onLogout={handleLogout}
      onReviewClick={() => setStep(4)}
      onMyBookingsClick={() => setStep(5)}
      onServicesClick={() => setStep(1)}
      onAboutClick={() => setStep(6)}
    >
      {step === 0 && renderLandingPage()}
      {step === 1 && renderServiceMenu()}
      {step === 6 && renderAboutView()}
      {step === 2 && (
        <div className="p-6 space-y-8">
          <button onClick={() => setStep(1)} className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-black"><ChevronLeft size={16} /> Back to Menu</button>
          <div className="space-y-6">
            <h2 className="text-2xl font-brand italic uppercase text-center">Select Date & Time</h2>
            <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar -mx-2 px-2">
              {[...Array(14)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const isSelected = selectedDate.toDateString() === date.toDateString();
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNum = date.getDate();
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center min-w-[60px] py-4 rounded-2xl border transition-all ${isSelected
                      ? 'bg-yellow-400 border-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-tighter mb-1">{dayName}</span>
                    <span className="text-xl font-black italic">{dayNum}</span>
                  </button>
                );
              })}
            </div>
            <div className="bg-zinc-900 p-6">
              <TimeGrid
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onTimeSelect={(t) => { setSelectedTime(t); setStep(3); }}
                bookings={bookings}
              />
            </div>
          </div>
        </div>
      )}
      {step === 3 && selectedService && selectedTime && (
        <div className="p-6 space-y-8">
          <button onClick={() => setStep(2)} className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-black"><ChevronLeft size={16} /> Back to Time</button>
          <BookingSummary
            service={selectedService}
            time={selectedTime}
            date={selectedDate.toISOString().split('T')[0]}
            customerName={customerName}
            customerPhone={customerPhone}
            notes={notes}
            onNameChange={setCustomerName}
            onPhoneChange={setCustomerPhone}
            onNotesChange={setNotes}
            onConfirm={handleConfirm}
          />
        </div>
      )}
      {step === 4 && <ReviewPage onBack={() => setStep(0)} onSubmitReview={handleReviewSubmit} />}
      {step === 5 && renderMyBookings()}
    </Layout>
  );
};

export default App;
