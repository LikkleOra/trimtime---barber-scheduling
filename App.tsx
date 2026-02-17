
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import TimeGrid from './components/TimeGrid';
import BookingSummary from './components/BookingSummary';
import { SERVICES, BARBER_CONFIG } from './constants';
import { Service, Booking, ViewType } from './types';
import { bookingService } from './services/bookingService';
import { ChevronRight, MapPin, CheckCircle, Smartphone, ChevronLeft, ArrowRight, Star, Play } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('customer');
  const [selectedLocation, setSelectedLocation] = useState(BARBER_CONFIG.locations[0]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [staffPassword, setStaffPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshBookings = useCallback(() => {
    setBookings(bookingService.getBookings());
  }, []);

  useEffect(() => {
    refreshBookings();
    window.addEventListener('storage', refreshBookings);
    return () => window.removeEventListener('storage', refreshBookings);
  }, [refreshBookings]);

  const handleConfirm = () => {
    if (!selectedService || !selectedTime) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    const msg = `Lekker Nev! Booking: ${selectedService.name} on ${dateStr} at ${selectedTime}. Customer: ${customerName}. Vibe the vibe!`;
    const whatsappUrl = `https://wa.me/${BARBER_CONFIG.phone}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    
    bookingService.addBooking({
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectedService.id,
      date: dateStr,
      time: selectedTime,
      customerName,
      customerPhone,
      status: 'confirmed'
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

  const renderLanding = () => (
    <div className="min-h-screen bg-[#fbd600]">
      {/* Animated Hero Section */}
      <section className="relative h-[calc(100vh-120px)] flex flex-col items-center justify-center overflow-hidden diagonal-stripes">
        <div className="absolute top-4 right-4 md:top-10 md:right-10 z-20">
          <button
            onClick={() => setStep(1)}
            className="bg-[#b32b2b] text-white px-8 py-4 rounded-full font-black italic uppercase tracking-tighter text-sm md:text-base shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 border-2 border-white/20"
          >
            Book An Appointment
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 z-10 w-full px-6 max-w-6xl">
          <div className="animate-slide-left">
            <div className="bg-[#3e2723] p-6 md:p-12 jagged-edge shadow-2xl">
               <h1 className="text-6xl md:text-[8rem] font-brand italic text-[#fbd600] leading-none uppercase tracking-tighter flex flex-col">
                  <span>NEV</span>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl md:text-6xl text-white">THE</span>
                    <span>BARBER</span>
                  </div>
               </h1>
            </div>
          </div>
          <div className="animate-slide-right md:-ml-20">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#fbd600] rounded-full blur-2xl opacity-50"></div>
              <img
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600"
                className="w-56 h-72 md:w-[350px] md:h-[500px] object-cover rounded-full border-[12px] border-white shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                alt="The Barber"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story / Pigeon Section */}
      <section className="bg-[#e0f2f1] py-24 md:py-32 px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 sunburst flex justify-center relative">
            <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full"></div>
            <div className="relative z-10 w-72 h-72 md:w-[500px] md:h-[500px] bg-white/50 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <img 
                src="https://img.icons8.com/color/512/pigeon.png" 
                className="w-56 h-56 md:w-[400px] md:h-[400px] opacity-90 transition-transform duration-1000 hover:rotate-12" 
                alt="Durban Pigeon"
              />
            </div>
          </div>
          <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start gap-8">
               <button className="text-[11px] font-black uppercase tracking-[0.3em] text-[#b32b2b] border-b-2 border-[#b32b2b] pb-1">About Nev</button>
               <button className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black transition-colors">Pricing</button>
               <button className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black transition-colors">Contact</button>
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase text-[#b32b2b] leading-tight tracking-tighter">
              Looking to the inspiration of the city it was founded in, Nev the Barber was born out of a passion.
            </h2>
            <p className="text-base md:text-lg font-medium text-zinc-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Captivated by good design, good coffee and exceptional haircuts, Nev wanted to create a space that delivered an authentic, modern barber experience. Having established the shop in 2010 he has built that space that opens before your first meeting.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
              <button 
                onClick={() => setStep(1)}
                className="bg-[#b32b2b] text-white px-12 py-5 rounded-full font-black italic uppercase tracking-tighter shadow-2xl hover:scale-105 transition-all active:scale-95"
              >
                Book An Appointment
              </button>
              <button className="bg-[#fbd600] text-[#3e2723] px-12 py-5 rounded-full font-black italic uppercase tracking-tighter shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                <Play size={18} fill="currentColor"/> View Our Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Legendary Styles Section */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
            <div>
              <h3 className="text-5xl md:text-7xl font-brand italic text-white leading-none uppercase tracking-tighter">
                See Our<br /><span className="text-[#fbd600]">Legendary</span> Styles
              </h3>
              <p className="text-zinc-500 mt-4 max-w-lg text-sm md:text-base uppercase font-bold tracking-widest">Select a style to start your booking immediately.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => scroll('left')} className="w-14 h-14 border-2 border-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-900 hover:border-[#fbd600] transition-all"><ChevronLeft size={28} /></button>
              <button onClick={() => scroll('right')} className="w-14 h-14 border-2 border-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-900 hover:border-[#fbd600] transition-all"><ChevronRight size={28} /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex overflow-x-auto gap-8 no-scrollbar snap-x snap-mandatory py-4">
            {[
              { id: 'fade', name: 'Adult Haircut • Fade', price: 'R220', img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800' },
              { id: 'beard', name: 'Beard Shave • Clipper', price: 'R110', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800' },
              { id: 'scholar', name: 'The Scholar • Student', price: 'R150', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800' },
              { id: 'full', name: 'The Full Works', price: 'R320', img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800' }
            ].map((style) => (
              <button
                key={style.id}
                onClick={() => {
                  const s = SERVICES.find(sv => sv.id === style.id);
                  if (s) {
                    setSelectedService(s);
                    setStep(2);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="min-w-[340px] md:min-w-[500px] h-[450px] relative overflow-hidden rounded-[4rem] snap-start group bg-zinc-900 border-2 border-white/5 shadow-2xl text-left"
              >
                <img src={style.img} className="w-full h-full object-cover grayscale opacity-60 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100" alt={style.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-12">
                  <p className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 mb-2 group-hover:text-white transition-colors">{style.name}</p>
                  <p className="text-6xl md:text-8xl font-brand text-[#fbd600] italic leading-none">{style.price}</p>
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 flex items-center gap-3 text-white font-black uppercase text-xs tracking-[0.3em]">
                    Start Booking <ArrowRight size={20} className="text-[#fbd600]" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Location/Hours Footer Info */}
      <section className="bg-white py-32 px-6 md:px-20 border-t border-zinc-100">
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
                    <button className="mt-4 text-[11px] font-black uppercase tracking-widest text-[#b32b2b] hover:text-black border-b border-[#b32b2b]">Get Directions</button>
                 </div>
               </div>
               <div className="flex flex-wrap gap-4">
                  {[
                    { label: 'Kid Friendly', icon: <Star size={12}/> },
                    { label: 'Secure Parking', icon: <CheckCircle size={12}/> },
                    { label: 'Expert Barbers', icon: <Smartphone size={12}/> }
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
    </div>
  );

  const renderServiceMenu = () => {
    const categories = [
      { name: 'Hair', services: SERVICES.filter(s => ['scholar', 'fade', 'buzz'].includes(s.id)) },
      { name: 'Beard', services: SERVICES.filter(s => s.id === 'beard') },
      { name: 'Combo', services: SERVICES.filter(s => s.id === 'full') }
    ];

    return (
      <div className="bg-[#fbd600] min-h-screen py-4 px-6">
        <div className="max-w-6xl mx-auto space-y-[50px]">
          <button onClick={() => setStep(0)} className="flex items-center gap-3 text-[#3e2723] font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-transform"><ChevronLeft size={20}/> Return Home</button>
          
          <div className="text-center space-y-1">
            <h2 className="text-4xl md:text-5xl font-brand italic uppercase text-[#b32b2b] tracking-tighter leading-none">PRICING MENU</h2>
            <p className="text-xs font-black uppercase tracking-[0.5em] text-[#3e2723]/60">Choose your legendary service</p>
          </div>

          <div className="space-y-[50px]">
            {categories.map(cat => (
              <div key={cat.name} className="space-y-[50px]">
                <div className="flex items-center gap-6">
                  <h3 className="text-4xl md:text-6xl font-brand italic uppercase text-[#3e2723]">{cat.name}</h3>
                  <div className="flex-1 h-1 bg-[#3e2723]/10 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.services.map(s => (
                    <div key={s.id} className="bg-white p-10 rounded-[3rem] shadow-2xl hover:translate-y-[-8px] transition-all border border-white group">
                      <div className="flex justify-between items-start mb-8">
                        <div className="space-y-2">
                          <h4 className="text-2xl font-black uppercase tracking-tight text-[#3e2723]">{s.name}</h4>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{s.duration} MIN • {s.description}</p>
                        </div>
                        <span className="text-3xl font-brand text-[#b32b2b] italic">R{s.price}</span>
                      </div>
                      <button 
                        onClick={() => { setSelectedService(s); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="w-full bg-[#b32b2b] text-white py-5 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
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
    <Layout activeView={activeView} onViewChange={setActiveView}>
      <div className="w-full">
        {activeView === 'customer' ? (
          <>
            {step === 0 && renderLanding()}
            {step === 1 && renderServiceMenu()}
            {step === 2 && (
              <div className="min-h-screen bg-[#fbd600] py-24 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                  <button onClick={() => setStep(1)} className="flex items-center gap-3 text-[#3e2723] font-black uppercase text-xs tracking-[0.3em]"><ChevronLeft size={20}/> Back to Menu</button>
                  <div className="text-center space-y-4">
                    <h2 className="text-7xl md:text-8xl font-brand italic uppercase text-[#b32b2b] leading-none">SELECT TIME</h2>
                    <p className="text-xs font-black uppercase tracking-[0.5em] text-[#3e2723]/60">Available slots for {selectedDate.toDateString()}</p>
                  </div>
                  <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-white">
                    <TimeGrid 
                      selectedDate={selectedDate} 
                      selectedTime={selectedTime} 
                      onTimeSelect={(t) => { setSelectedTime(t); setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      bookings={bookings}
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 3 && selectedService && selectedTime && (
              <div className="min-h-screen bg-[#fbd600] py-24 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                   <button onClick={() => setStep(2)} className="flex items-center gap-3 text-[#3e2723] font-black uppercase text-xs tracking-[0.3em]"><ChevronLeft size={20}/> Back to Time</button>
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
