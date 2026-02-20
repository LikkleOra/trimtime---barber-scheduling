import React, { useState, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import TimeGrid from './components/TimeGrid';
import BookingSummary from './components/BookingSummary';
import ReviewPage from './components/ReviewPage';
import { SERVICES, BARBER_CONFIG } from './constants';
import { Service, Booking, ViewType } from './types';
import { ChevronRight, MapPin, CheckCircle, Smartphone, ChevronLeft, ArrowRight, Star } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "./convex/_generated/api";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('customer');
  const [selectedLocation, setSelectedLocation] = useState(BARBER_CONFIG.locations[0]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [staffPassword, setStaffPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);

  // Convex Data
  const bookings = useQuery(api.bookings.getBookings) || [];
  const addBookingMutation = useMutation(api.bookings.addBooking);

  // Calendar State
  const [viewDate, setViewDate] = useState(new Date());

  const scrollRef = useRef<HTMLDivElement>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay, year, month };
  };

  const renderCalendar = () => {
    const { days, firstDay, year, month } = getDaysInMonth(viewDate);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const changeMonth = (offset: number) => {
      const newDate = new Date(viewDate.setMonth(viewDate.getMonth() + offset));
      setViewDate(new Date(newDate));
    };

    return (
      <div className="w-full">
        {/* Calendar Header */}
        <div className="bg-black text-white p-6 flex justify-between items-center mb-6">
          <button onClick={() => changeMonth(-1)} className="hover:text-[#fbd600] transition-colors"><ChevronLeft size={20} /></button>
          <span className="font-black italic uppercase tracking-widest text-lg">{monthNames[month]} {year}</span>
          <button onClick={() => changeMonth(1)} className="hover:text-[#fbd600] transition-colors"><ChevronRight size={20} /></button>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {daysOfWeek.map(d => (
            <span key={d} className="text-zinc-400 font-bold text-xs uppercase">{d}</span>
          ))}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: days }).map((_, i) => {
            const day = i + 1;
            const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(new Date(year, month, day))}
                className={`
                  h-12 w-full flex items-center justify-center font-bold text-sm transition-all
                  ${isSelected ? 'bg-black text-[#fbd600] shadow-lg scale-110' : 'hover:bg-zinc-100 text-zinc-900'}
                  ${isToday && !isSelected ? 'border-b-2 border-[#b32b2b]' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handleConfirm = () => {
    if (!selectedService || !selectedTime) return;
    processBooking('27812687806');
  };

  const processBooking = async (consultantNumber: string) => {
    if (!selectedService || !selectedTime) return;
    const dateStr = selectedDate.toISOString().split('T')[0];

    // Stylish Message Construction
    const msg = `
*FADEZONE BOOKING CONFIRMED* ✂️🔥

*Service:* ${selectedService.name}
*Date:* ${dateStr}
*Time:* ${selectedTime}
*Client:* ${customerName}
*Price:* R${selectedService.price}

Vibe the vibe! We'll see you soon. 
📍 *424 Commissioner St, Kensington*

_Need to book again?_
https://fadezone-grooming.netlify.app/
    `.trim();

    try {
      // Store in Convex
      await addBookingMutation({
        serviceId: selectedService.id,
        date: dateStr,
        time: selectedTime,
        customerName,
        customerPhone,
        notes,
        status: 'confirmed'
      });

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${consultantNumber}?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');

      // Reset UI
      setStep(0);
      setSelectedService(null);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong with the booking. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsStaffAuthenticated(false);
    setStaffPassword('');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleGoToSection = (sectionId: string) => {
    if (step !== 0) {
      setStep(0);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-[#fbd600]">
      {/* Hero Section Redesign */}
      <section id="hero-section" className="relative min-h-screen lg:h-[85vh] bg-[#fbd600] diagonal-stripes flex items-center overflow-hidden pt-20">
        <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
          <p className="font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">EST 2020 • JOHANNESBURG</p>
        </div>

        <div className="grid lg:grid-cols-2 w-full h-full max-w-7xl mx-auto px-6 gap-8 md:gap-0">
          {/* Left Content */}
          <div className="flex flex-col justify-center items-start relative z-10 py-12 lg:py-0">
            <div className="bg-[#3e2723] p-6 lg:p-10 -skew-x-3 transform rotate-[-2deg] shadow-2xl mb-4 relative">
              {/* Jagged edge CSS would be ideal here, but using a simple box for now as per constraints */}
              <h1 className="text-6xl lg:text-[9rem] font-brand italic text-[#fbd600] leading-none uppercase tracking-tighter skew-x-3">
                FADEZONE
              </h1>
            </div>
            <div className="bg-black px-6 py-3 skew-x-[-10deg] ml-4">
              <p className="text-white font-black uppercase tracking-[0.3em] text-xs lg:text-sm skew-x-[10deg]">Master Class Barbering</p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[50vh] lg:h-full w-full lg:-mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbd600] via-transparent to-transparent z-10 lg:w-32"></div>
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80"
              className="w-full h-full object-cover grayscale contrast-125 border-l-4 border-black"
              alt="Barber"
            />
            {/* Floating CTA */}
            <button
              onClick={() => setStep(1)}
              className="absolute bottom-10 right-10 lg:-left-16 lg:bottom-32 bg-[#b32b2b] text-white px-8 py-5 font-black uppercase italic tracking-tighter shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 group z-20 text-lg md:text-xl"
            >
              Book A Fade <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section Redesign */}
      <section id="about-section" className="bg-[#e0f2f1] py-20 md:py-32 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-0 left-10 bg-[#fbd600] px-4 py-2">
          <span className="font-black uppercase tracking-widest text-xs">Since 2020</span>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-brand italic uppercase text-black leading-[0.9] tracking-tighter">
            The Standard.<br />No Compromise.
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-[#b32b2b]"></div>
            <h3 className="text-xl md:text-2xl font-black italic uppercase text-[#b32b2b] tracking-wider">
              JOHANNESBURG’S FINEST GROOMING HUB
            </h3>
          </div>
          <p className="text-lg md:text-xl font-serif italic text-zinc-600 leading-relaxed max-w-2xl border-l border-zinc-300 pl-6 py-2">
            "FADEZONE isn't just about the cut; it's about the transformation. We blend traditional craft with modern aesthetics to give every gentleman the look they deserve."
          </p>
        </div>
      </section>

      {/* Services / Prices Section */}
      <section id="prices-section" className="bg-black py-16 md:py-24 px-6 md:px-6">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 border-b border-zinc-900 pb-6 md:pb-8">
            <div>
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-brand italic text-white leading-none uppercase tracking-tighter">
                See Our<br /><span className="text-[#fbd600]">Legendary</span> Styles
              </h3>
              <p className="text-zinc-500 mt-3 md:mt-4 max-w-lg text-xs md:text-base uppercase font-bold tracking-widest">Select a style to start your booking immediately.</p>
            </div>
            <div className="flex gap-3 md:gap-4">
              <button onClick={() => scroll('left')} className="w-12 h-12 md:w-14 md:h-14 border-2 border-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-900 hover:border-[#fbd600] transition-all"><ChevronLeft size={22} /></button>
              <button onClick={() => scroll('right')} className="w-12 h-12 md:w-14 md:h-14 border-2 border-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-900 hover:border-[#fbd600] transition-all"><ChevronRight size={22} /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex overflow-x-auto gap-4 md:gap-8 no-scrollbar snap-x snap-mandatory py-4">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  setStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-w-[90vw] md:min-w-[45vw] lg:min-w-[30%] h-[300px] md:h-[380px] lg:h-[450px] relative overflow-hidden rounded-2xl md:rounded-[3rem] snap-center md:snap-start group bg-zinc-900 border-2 border-white/5 shadow-2xl text-left flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
                  <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-zinc-400 mb-1 md:mb-2 group-hover:text-white transition-colors">{service.name}</p>
                  <p className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-widest mb-2">{service.duration} MIN</p>
                  <p className="text-4xl md:text-6xl lg:text-7xl font-brand text-[#fbd600] italic leading-none">R{service.price}</p>
                  <div className="mt-4 md:mt-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 flex items-center gap-3 text-white font-black uppercase text-[10px] md:text-xs tracking-[0.3em]">
                    Book Now <ArrowRight size={16} className="text-[#fbd600]" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Review CTA */}
          <div className="pt-12 text-center border-t border-zinc-900">
            <button
              onClick={() => { setStep(4); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-10 py-5 bg-white text-black font-black uppercase italic tracking-tighter shadow-[8px_8px_0px_0px_rgba(251,214,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 mx-auto text-lg"
            >
              <Star className="text-[#b32b2b]" size={24} fill="#b32b2b" /> Review Your Experience
            </button>
          </div>
        </div>
      </section>

      {/* Modern Location/Hours Footer Info */}
      <section id="contact-section" className="bg-white py-16 md:py-32 px-6 md:px-20 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <h4 className="text-5xl md:text-7xl font-brand italic uppercase text-[#b32b2b] tracking-tighter">The Studio</h4>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#fbd600] rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin className="text-[#3e2723]" size={32} />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-black text-[#3e2723] leading-tight">{selectedLocation.address}</p>
                  <p className="mt-2 text-xl font-black text-[#b32b2b]">081 268 7806</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'Kid Friendly', icon: <Star size={12} /> },
                  { label: 'Secure Parking', icon: <CheckCircle size={12} /> },
                  { label: 'Expert Barbers', icon: <Smartphone size={12} /> }
                ].map(feat => (
                  <span key={feat.label} className="bg-zinc-50 border border-zinc-100 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-2 shadow-sm">
                    {feat.icon} {feat.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-zinc-50 p-12 rounded-[4rem] border border-zinc-100 shadow-inner">
            <h4 className="text-4xl font-brand italic uppercase text-[#b32b2b] mb-10">Opening Times</h4>
            <div className="space-y-4">
              {selectedLocation.hours.map(h => (
                <div key={h.day} className={`flex justify-between border-b border-zinc-200 pb-4 ${h.status === 'current' ? 'text-zinc-900 font-black' : 'text-zinc-400 font-bold'}`}>
                  <span className="uppercase tracking-[0.2em] text-xs">{h.day}</span>
                  <span className="text-xs font-mono">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div >
  );

  const renderServiceMenu = () => {
    const categories = [
      { name: 'Haircuts', services: SERVICES.filter(s => ['haircut', 'chiskop', 'brush-cut', 'kids-haircut', 'ladies-haircut'].includes(s.id)) },
      { name: 'Dye & Treatments', services: SERVICES.filter(s => ['haircut-dye', 'unique-haircut'].includes(s.id)) },
      { name: 'Shaving', services: SERVICES.filter(s => ['shave-beard', 'shave-trim'].includes(s.id)) }
    ];

    return (
      <div className="bg-[#fbd600] min-h-screen py-4 px-6 md:px-6">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-[50px]">
          <button onClick={() => setStep(0)} className="flex items-center gap-2 md:gap-3 text-[#3e2723] font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-transform"><ChevronLeft size={18} /> Return Home</button>

          <div className="text-center space-y-1">
            <h2 className="text-3xl md:text-5xl font-brand italic uppercase text-[#b32b2b] tracking-tighter leading-none">PRICING MENU</h2>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#3e2723]/60">Choose your legendary service</p>
          </div>

          <div className="space-y-8 md:space-y-[50px]">
            {categories.map(cat => (
              <div key={cat.name} className="space-y-4 md:space-y-[50px]">
                <div className="flex items-center gap-4 md:gap-6">
                  <h3 className="text-2xl md:text-4xl lg:text-6xl font-brand italic uppercase text-[#3e2723] whitespace-nowrap">{cat.name}</h3>
                  <div className="flex-1 h-1 bg-[#3e2723]/10 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  {cat.services.map(s => (
                    <div key={s.id} className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-2xl hover:translate-y-[-8px] transition-all border border-white group">
                      <div className="flex justify-between items-start mb-4 md:mb-8">
                        <div className="space-y-1 md:space-y-2">
                          <h4 className="text-lg md:text-2xl font-black uppercase tracking-tight text-[#3e2723]">{s.name}</h4>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{s.duration} MIN • {s.description}</p>
                        </div>
                        <span className="text-2xl md:text-3xl font-brand text-[#b32b2b] italic ml-2">R{s.price}</span>
                      </div>
                      <button
                        onClick={() => { setSelectedService(s); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="w-full bg-[#b32b2b] text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
                      >
                        Book This Session
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      activeView={activeView}
      onViewChange={setActiveView}
      currentStep={step}
      onGoToSection={handleGoToSection}
      isStaffAuthenticated={isStaffAuthenticated}
      onLogout={handleLogout}
    >
      <div className="w-full">
        {activeView === 'customer' ? (
          <>
            {step === 0 && renderLanding()}
            {step === 1 && renderServiceMenu()}
            {step === 2 && (
              <div className="min-h-screen bg-[#fbd600] pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                  <button onClick={() => setStep(1)} className="mb-8 flex items-center gap-3 text-black font-black uppercase text-xs tracking-[0.3em] hover:text-[#b32b2b] transition-colors"><ChevronLeft size={20} /> Back to Menu</button>

                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left: Select Date */}
                    <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-brand italic uppercase text-[#b32b2b] tracking-tighter">1. Select Date</h2>
                      <div className="bg-white p-4 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                        {renderCalendar()}
                      </div>
                    </div>

                    {/* Right: Select Time */}
                    <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-brand italic uppercase text-[#b32b2b] tracking-tighter">2. Select Time</h2>
                      <div className="flex justify-end border-b-2 border-black/10 pb-4">
                        <span className="font-black uppercase tracking-[0.2em] text-zinc-500 text-xs">
                          {selectedDate.toDateString()}
                        </span>
                      </div>
                      <div className="bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                        <TimeGrid
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onTimeSelect={(t) => { setSelectedTime(t); setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          bookings={bookings}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && selectedService && selectedTime && (
              <div className="min-h-screen bg-[#fbd600] py-24 px-6 md:px-6 relative">
                <div className="max-w-3xl mx-auto space-y-12">
                  <button onClick={() => setStep(2)} className="flex items-center gap-3 text-[#3e2723] font-black uppercase text-xs tracking-[0.3em]"><ChevronLeft size={20} /> Back to Time</button>
                  <div className="text-center space-y-4">
                    <h2 className="text-7xl md:text-8xl font-brand italic uppercase text-[#b32b2b] leading-none">BOOKING INFO</h2>
                    <p className="text-xs font-black uppercase tracking-[0.5em] text-[#3e2723]/60">Finalize your legendary session</p>
                  </div>
                  <div className="bg-white p-2 md:p-4 rounded-[4rem] shadow-2xl overflow-hidden border-8 border-white">
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
                </div>

              </div>
            )}
            {step === 4 && (
              <ReviewPage
                onBack={() => setStep(0)}
                onSubmitReview={async (review) => {
                  console.log('Review submitted:', review);
                  // In a real app, you'd upload the image to a storage bucket
                  // and save the review to a database.
                  await new Promise(resolve => setTimeout(resolve, 1500));
                }}
              />
            )}
          </>
        ) : !isStaffAuthenticated ? (
          <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="max-w-xl w-full bg-zinc-900/50 p-16 rounded-[4rem] border border-white/5 space-y-12 shadow-[0_0_100px_rgba(251,214,0,0.05)]">
              <div className="text-center space-y-4">
                <h2 className="text-6xl font-brand italic uppercase text-[#fbd600] leading-none">STAFF PORTAL</h2>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em]">Authorized access only</p>
              </div>
              <div className="space-y-8">
                <input
                  type="password"
                  placeholder="PORTAL ACCESS KEY"
                  value={staffPassword}
                  onChange={(e) => {
                    setStaffPassword(e.target.value);
                    setAuthError('');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      if (staffPassword === 'Alex') {
                        setIsStaffAuthenticated(true);
                        setAuthError('');
                      } else {
                        setAuthError('Invalid access key');
                        setStaffPassword('');
                      }
                    }
                  }}
                  className="w-full bg-black border-2 border-zinc-800 p-6 rounded-3xl font-mono text-sm uppercase tracking-[0.3em] focus:border-[#fbd600] outline-none text-white text-center shadow-inner"
                />
                {authError && <p className="text-red-500 text-xs font-bold text-center">{authError}</p>}
                <button
                  onClick={() => {
                    if (staffPassword === 'Alex') {
                      setIsStaffAuthenticated(true);
                      setAuthError('');
                    } else {
                      setAuthError('Invalid access key');
                      setStaffPassword('');
                    }
                  }}
                  className="w-full bg-[#fbd600] text-black py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-xl">Secure Authenticate</button>
              </div>
              <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest text-center">Protected by Fadezone Grooming Systems v2.0</p>
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-5xl md:text-7xl font-brand italic uppercase text-[#fbd600]">STAFF DASHBOARD</h2>
                <button
                  onClick={() => {
                    setIsStaffAuthenticated(false);
                    setStaffPassword('');
                  }}
                  className="bg-red-600 text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all"
                >
                  Logout
                </button>
              </div>
              <div className="bg-zinc-900 p-12 rounded-[4rem] border border-white/5 shadow-2xl">
                <h3 className="text-3xl font-black uppercase text-[#fbd600] mb-8">UPCOMING BOOKINGS</h3>
                {bookings.length === 0 ? (
                  <p className="text-zinc-400 text-center py-12">No bookings yet</p>
                ) : (
                  <div className="space-y-6">
                    {bookings.map((booking) => {
                      const service = SERVICES.find(s => s.id === booking.serviceId);
                      return (
                        <div key={booking.id} className="bg-black p-8 rounded-2xl border border-zinc-800 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[#fbd600] font-black text-lg">{service?.name || 'Unknown Service'}</p>
                              <p className="text-white font-bold">{booking.customerName}</p>
                              <p className="text-zinc-400 text-sm">{booking.customerPhone}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-black">{booking.date}</p>
                              <p className="text-[#fbd600] font-bold text-lg">{booking.time}</p>
                            </div>
                          </div>
                          <div className="flex gap-4 pt-4 border-t border-zinc-800">
                            <span className={`px-4 py-2 rounded-lg text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
