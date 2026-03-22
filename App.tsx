
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import TornEdge from './components/TornEdge';
import { SERVICES, BARBER_CONFIG } from './constants';
import { Service, Booking, ViewType } from './types';
import { bookingService } from './services/bookingService';
import { ArrowLeft, ArrowRight, Plus, Trash2, Calendar as CalendarIcon, Clock, ChevronRight, Star } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [lastBookingId, setLastBookingId] = useState<string | null>(null);
  const [staffPassword, setStaffPassword] = useState('');
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);

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
    const newId = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    bookingService.addBooking({
      id: newId,
      serviceId: selectedService.id,
      date: dateStr,
      time: selectedTime,
      customerName,
      customerPhone,
      status: 'confirmed'
    });

    setLastBookingId(newId);
    setStep(3); // Receipt view
  };

  const renderHome = () => (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-end overflow-hidden">
        <img 
            src="/services/haircut.jpg" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero Background"
        />
        <div className="absolute inset-0 hero-overlay" />
        
        <div className="relative z-10 p-8 pb-12 w-full text-white">
            <div className="flex items-center gap-2 mb-4">
                <div className="h-[2px] w-12 bg-[#D4A84B]" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A84B]">Premium Cutz</span>
            </div>
            <h1 className="text-5xl font-display leading-[1] mb-6 tracking-tighter shadow-black/20 text-shadow-sm">
                ELEVATE<br/>YOUR VIBE
            </h1>
            <button
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="btn-premium px-10 py-5 text-lg rounded-full"
            >
                BOOK A FADE <ArrowRight size={20} />
            </button>
        </div>
      </section>

      {/* Latest Styles Section */}
      <section className="py-12 px-6 bg-[#F5F0EB]">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-2xl font-display text-black">LATEST STYLES</h2>
                <div className="h-1 w-16 bg-[#8B1E3F] mt-1" />
            </div>
            <button className="text-xs font-bold text-[#8B1E3F] border-b border-[#8B1E3F] pb-0.5">VIEW ALL</button>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
            {[
                { name: 'SKIN FADE', price: 'R60', tag: 'FEATURED', img: '/services/haircut-black-dye.jpg' },
                { name: 'BUZZ CUT', price: 'R40', tag: 'NEW', img: '/services/chiskop.jpg' },
                { name: 'BRUSH CUT', price: 'R50', tag: 'SALE', img: '/services/brush-cut.jpg' }
            ].map((style, idx) => (
                <div key={idx} className="min-w-[160px] flex flex-col snap-center">
                    <div className="premium-card h-[220px] relative mb-3">
                        <img src={style.img} className="w-full h-[140px] object-cover" alt={style.name} />
                        <div className="absolute top-3 left-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black text-white ${style.tag === 'NEW' ? 'bg-[#10B981]' : style.tag === 'SALE' ? 'bg-[#EF4444]' : 'bg-[#F59E0B]'}`}>
                                {style.tag}
                            </span>
                        </div>
                        <div className="p-3">
                            <h3 className="text-[13px] font-bold text-black uppercase leading-tight mb-1">{style.name}</h3>
                            <span className="text-[14px] font-bold text-[#D4A84B]">{style.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Why Fadezone Section */}
      <section className="py-16 px-8 bg-black text-white">
          <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                  <span className="text-4xl font-display text-[#D4A84B]">10+</span>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/50">Master Barbers</p>
              </div>
              <div className="space-y-2">
                  <span className="text-4xl font-display text-[#D4A84B]">99%</span>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/50">Vibe Rating</p>
              </div>
          </div>
      </section>
    </div>
  );

  const renderBookings = () => {
    if (step === 0) {
        return (
            <div className="p-6 bg-[#F5F5F5] min-h-screen">
                <header className="py-8 space-y-2">
                    <div className="flex items-center gap-2">
                         <div className="h-[2px] w-6 bg-black" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Step 1 of 3</span>
                    </div>
                    <h1 className="text-3xl font-display uppercase tracking-tight">
                        SELECT SERVICE
                    </h1>
                </header>
                
                <div className="grid grid-cols-2 gap-4 pb-32">
                    {SERVICES.map(s => (
                        <div key={s.id} className="premium-card flex flex-col h-full group">
                            <div className="relative aspect-square overflow-hidden">
                                <img src={s.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={s.name} />
                                <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                                    <span className="bg-white/90 backdrop-blur rounded px-2 py-1 text-xs font-bold text-[#8B1E3F] shadow-sm italic">
                                        R{s.price}
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 flex flex-col justify-between flex-1">
                                <div>
                                    <h2 className="text-[14px] font-bold text-black leading-tight uppercase mb-1">{s.name}</h2>
                                    <p className="text-[10px] text-gray-500 line-clamp-1 mb-2">30 mins session</p>
                                </div>
                                <button 
                                    onClick={() => { setSelectedService(s); setStep(1); window.scrollTo(0,0); }}
                                    className="w-full bg-[#1A1A1A] text-white text-[11px] font-bold py-2.5 rounded-lg active:scale-95 transition-all uppercase tracking-wider"
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (step === 1) {
        return (
            <div className="p-6 bg-[#F5F0EB] min-h-screen">
                <button onClick={() => setStep(0)} className="flex items-center gap-2 mb-8 text-black/60 hover:text-black transition-colors">
                    <ArrowLeft size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Back to services</span>
                </button>

                <div className="premium-card p-6 mb-10 bg-white">
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-bold text-black uppercase tracking-tight">March 2026</h2>
                        <div className="flex gap-4">
                            <button className="p-1 border border-gray-200 rounded-full opacity-30"><ArrowLeft size={14} /></button>
                            <button className="p-1 border border-gray-100 rounded-full"><ChevronRight size={14} /></button>
                        </div>
                    </div>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-y-2 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="p-2 text-[10px] font-bold text-center text-gray-400 uppercase tracking-widest">{d}</div>
                        ))}
                        {Array.from({ length: 31 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center justify-center">
                                <div className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-full cursor-pointer transition-all ${i+1 === 5 ? 'bg-[#8B1E3F] text-white' : 'hover:bg-gray-100'}`}>
                                    {i + 1}
                                </div>
                                {i + 1 === 23 && <div className="w-1 h-1 bg-[#D4A84B] rounded-full mt-0.5" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">Available Times</h3>
                    <div className="grid grid-cols-4 gap-3 mb-20">
                        {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'].map(t => (
                            <button 
                                key={t}
                                onClick={() => { setSelectedTime(t); setStep(2); window.scrollTo(0,0); }}
                                className={`h-11 flex items-center justify-center text-[13px] font-semibold rounded-lg transition-all ${selectedTime === t ? 'bg-[#1A1A1A] text-white' : 'bg-gray-200/50 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="p-6 bg-[#F5F5F5] min-h-screen">
                <header className="py-8">
                    <h1 className="text-3xl font-display uppercase tracking-tight text-center">CONFIRMATION</h1>
                </header>

                <div className="premium-card bg-white p-8 max-w-sm mx-auto space-y-8">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                        <input 
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full border-b border-gray-200 py-3 text-lg font-bold text-black focus:border-[#8B1E3F] transition-colors outline-none bg-transparent"
                            placeholder="Alex Doe"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">WhatsApp Contact</label>
                        <input 
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full border-b border-gray-200 py-3 text-lg font-bold text-black focus:border-[#8B1E3F] transition-colors outline-none bg-transparent"
                            placeholder="+27 00 000 0000"
                        />
                    </div>
                    
                    <div className="pt-8 space-y-4 border-t border-gray-50">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Service</span>
                            <span className="text-black">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Time</span>
                            <span className="text-black">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                             <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Price</span>
                             <span className="text-2xl font-display text-[#D4A84B]">R{selectedService?.price}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleConfirm}
                        className="btn-premium w-full py-5 text-lg rounded-xl shadow-lg mt-4"
                    >
                        Confirm Booking
                    </button>
                    <button onClick={() => setStep(1)} className="w-full text-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors pt-2">
                        Change Time
                    </button>
                </div>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="p-6 bg-[#F5F0EB] min-h-screen flex flex-col items-center">
                <main className="receipt-container w-full max-w-[340px] mx-auto mt-16 scale-105">
                    <TornEdge position="top" />
                    <TornEdge position="bottom" />

                    <div className="text-center py-6 mb-8 border-b border-gray-100">
                        <div className="inline-block bg-[#1A1A1A] text-white px-3 py-1 text-[10px] font-bold tracking-[0.3em] mb-4">CONFIRMED</div>
                        <h1 className="text-xl font-bold tracking-widest leading-none">
                            ORDER #{lastBookingId}
                        </h1>
                    </div>
                    
                    <div className="space-y-6">
                        {[
                            { label: 'Service', val: selectedService?.name },
                            { label: 'Barber', val: 'Anuel' },
                            { label: 'Date', val: '23 Mar 2026' },
                            { label: 'Time', val: selectedTime }
                        ].map(item => (
                            <div key={item.label} className="flex justify-between items-center bg-[#F9F9F9] p-3 rounded-lg">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                                <span className="text-[14px] font-bold text-black uppercase">{item.val}</span>
                            </div>
                        ))}
                        
                        <div className="flex justify-between items-center pt-8 px-2">
                             <span className="text-lg font-display text-gray-800">TOTAL:</span>
                             <span className="text-3xl font-display text-[#D4A84B]">R{selectedService?.price}.00</span>
                        </div>
                    </div>
                </main>
                
                <button 
                    onClick={() => { setActiveView('profile'); setStep(0); }}
                    className="mt-20 w-full max-w-[340px] btn-premium py-6 text-xl rounded-full"
                >
                    DONE
                </button>
            </div>
        );
    }

    return null;
  };

  const renderProfile = () => (
    <div className="p-6 bg-[#1C1C1C] min-h-screen text-white pb-32">
        <header className="py-12 space-y-2">
            <h1 className="text-4xl font-display text-center uppercase tracking-tight">
                YOUR FADES
            </h1>
            <p className="text-[10px] text-center font-bold uppercase tracking-[0.4em] text-white/40">Appointment History</p>
        </header>

        <main className="max-w-lg mx-auto w-full space-y-6">
            {bookings.length === 0 ? (
                <div className="p-20 text-center border-2 border-white/5 rounded-3xl bg-white/5">
                    <Plus size={40} className="mx-auto mb-4 text-white/20" />
                    <p className="text-white/40 font-bold uppercase text-xs tracking-widest">No Fades Booked Yet</p>
                </div>
            ) : (
                bookings.map(b => (
                    <div key={b.id} className="relative bg-[#2C2C2C] p-6 rounded-[20px] flex flex-col gap-6 shadow-xl border border-white/5">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h2 className="text-[#D4AF37] text-2xl font-bold leading-none uppercase">
                                    {SERVICES.find(s => s.id === b.serviceId)?.name || 'HAIRCUT'}
                                </h2>
                                <p className="text-white/60 text-xs font-bold uppercase">
                                    Barber: Alex
                                </p>
                            </div>
                            <div className="bg-[#1B5E20] px-3 py-1 rounded-full border border-[#00C853]/50">
                                <span className="text-[#00C853] text-[9px] font-bold tracking-widest uppercase">Confirmed</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 py-4 border-y border-white/5">
                            <div className="flex items-center gap-2">
                                <CalendarIcon size={14} className="text-[#D4AF37]" />
                                <span className="text-xs font-bold">{b.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-[#D4AF37]" />
                                <span className="text-xs font-bold">{b.time}</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <button className="flex-1 bg-[#D4AF37] text-black text-[11px] font-black py-4 rounded-xl uppercase tracking-widest active:scale-95 transition-all">
                                View Details
                            </button>
                            <button 
                                onClick={() => {
                                    if(window.confirm('Cancel this fade?')){
                                        bookingService.deleteBooking(b.id);
                                        refreshBookings();
                                    }
                                }}
                                className="bg-[#EF4444]/20 p-4 rounded-xl text-[#EF4444] border border-[#EF4444]/30 active:scale-95 transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </main>
        
        <div className="mt-16">
            <button 
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="btn-premium w-full rounded-full py-6 text-lg"
            >
               BOOK NEW FADE <Plus size={24} />
            </button>
        </div>
    </div>
  );

  const renderStaff = () => (
    <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-[#2C2C2C] p-12 rounded-[32px] space-y-10 shadow-2xl border border-white/10">
        {!isStaffAuthenticated ? (
            <>
                <div className="text-center space-y-3">
                    <h2 className="text-4xl font-display text-[#D4A84B]">STAFF LOGIN</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Authorized Access Only</p>
                </div>
                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest pl-2">Access Key</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={staffPassword}
                            onChange={(e) => setStaffPassword(e.target.value)}
                            className="w-full bg-black/40 border-2 border-white/5 p-5 font-mono text-xl tracking-[0.5em] text-white text-center rounded-2xl outline-none focus:border-[#D4A84B]/50 transition-colors"
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (staffPassword === 'Alex') {
                                setIsStaffAuthenticated(true);
                            } else {
                                alert('Invalid Key');
                            }
                        }}
                        className="btn-premium w-full py-6 rounded-2xl text-lg mt-4"
                    >
                        Authenticate
                    </button>
                </div>
            </>
        ) : (
            <div className="space-y-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                    <h2 className="text-2xl font-display text-[#D4A84B]">DASHBOARD</h2>
                    <button onClick={() => setIsStaffAuthenticated(false)} className="px-5 py-2 rounded-full bg-white/5 text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Logout</button>
                </div>
                <div className="space-y-6 overflow-y-auto max-h-[50vh] pr-2 no-scrollbar">
                    {bookings.length === 0 ? (
                        <p className="text-center py-20 text-white/20 font-bold uppercase text-[10px] tracking-widest">No Bookings Yet</p>
                    ) : (
                        bookings.map(b => (
                            <div key={b.id} className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[#D4A84B] font-bold text-lg leading-tight">{b.customerName}</p>
                                        <p className="text-white/40 text-[10px] font-bold mt-1">{b.customerPhone}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-[#8B1E3F]/20 text-[#8B1E3F] text-[10px] font-black px-2 py-1 rounded inline-block px-3">{b.time}</div>
                                        <p className="text-white/30 text-[9px] font-bold mt-2">{b.date}</p>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-white/40">SERVICE:</span>
                                    <span className="text-[11px] font-bold text-white/80 uppercase">{SERVICES.find(s => s.id === b.serviceId)?.name}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout activeView={activeView} onViewChange={(v) => { setActiveView(v); setStep(0); }}>
        {activeView === 'home' && renderHome()}
        {activeView === 'bookings' && renderBookings()}
        {activeView === 'store' && (
            <div className="p-12 text-center bg-[#F5F0EB] min-h-screen flex items-center justify-center">
                <div className="premium-card bg-white p-16 max-w-sm">
                    <div className="h-1 w-24 bg-[#D4A84B] mx-auto mb-10" />
                    <h2 className="text-6xl font-display mb-6 leading-none tracking-tighter">STORE<br/>SOON</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Premium Apparel & Gear 2026</p>
                </div>
            </div>
        )}
        {activeView === 'profile' && renderProfile()}
        {activeView === 'staff' && renderStaff()}
    </Layout>
  );
};

export default App;
