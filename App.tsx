
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import TimeGrid from './components/TimeGrid';
import BookingSummary from './components/BookingSummary';
import { SERVICES, BARBER_CONFIG } from './constants';
import { Service, Booking, ViewType } from './types';
import { bookingService } from './services/bookingService';
import { ChevronRight, MapPin, CheckCircle, Smartphone, ChevronLeft, ArrowRight, Star, Play, Circle, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedLocation, setSelectedLocation] = useState(BARBER_CONFIG.locations[0]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [lastBookingId, setLastBookingId] = useState<string | null>(null);
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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[55vh] flex flex-col items-center justify-end pb-12 diagonal-stripes border-b-4 border-black">
        <div className="absolute inset-x-0 top-0 h-full flex items-center justify-center overflow-hidden">
             <img 
                src="/services/haircut.jpg" 
                className="h-[110%] w-auto object-cover grayscale"
                alt="Hero Haircut"
             />
        </div>

        <div className="z-10 w-full px-6 flex justify-center">
            <button
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="neob-button-slanted w-full max-w-xs text-3xl italic font-brand"
            >
                <span>BOOK A FADE</span>
                <ArrowRight size={32} strokeWidth={3} className="rotate-[-45deg]" />
            </button>
        </div>
      </section>

      {/* Latest Styles Section */}
      <section className="py-12 px-6 bg-[#d9d9d9] border-b-4 border-black border-t-4">
        <div className="relative mb-8">
            <h2 className="text-6xl font-brand italic uppercase tracking-tighter text-black border-b-[12px] border-red-600 inline-block leading-[0.8]">
                LATEST STYLES
            </h2>
        </div>

        <div className="flex overflow-x-auto gap-10 pb-6 no-scrollbar snap-x snap-mandatory">
            {[
                { name: 'SKIN FADE', text: 'NEO-URBAN LOOK', img: '/services/haircut-black-dye.jpg' },
                { name: 'BUZZ CUT', text: 'MINIMALIST & SHARP', img: '/services/chiskop.jpg' },
                { name: 'BRUSH CUT', text: 'CLEAN & CLASSIC', img: '/services/brush-cut.jpg' }
            ].map((style, idx) => (
                <div key={idx} className="min-w-[75vw] md:min-w-[300px] flex flex-col gap-4 snap-center">
                    <div className="relative aspect-[4/5] neob-card overflow-hidden bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <img src={style.img} className="w-full h-full object-cover grayscale" alt={style.name} />
                        <div className="absolute bottom-6 left-0 flex items-center">
                            <div className="bg-red-600 text-white font-brand italic text-3xl px-8 py-2 transform skewX(-10deg) border-black border-4 border-l-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                <span className="block transform skewX(10deg)">{style.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="font-brand text-2xl tracking-tighter italic uppercase text-black">
                        {style.text}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Opening Times Highlight */}
      <section className="py-16 px-6 bg-yellow border-b-4 border-black">
        <h3 className="text-5xl font-brand italic text-red-600 mb-10 uppercase tracking-tighter">Opening Times</h3>
        <div className="space-y-4">
          {selectedLocation.hours.map((h, idx) => {
            const currentDay = new Date().getDay();
            const isCurrent = currentDay === idx;
            return (
              <div key={h.day} className={`flex justify-between items-center py-4 border-b-4 border-black/10 ${isCurrent ? 'bg-black text-white -mx-6 px-6 border-black' : ''}`}>
                <span className="font-label text-sm tracking-[0.2em]">{h.day}</span>
                <span className="font-brand text-2xl">{h.time}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );

  const renderBookings = () => {
    if (step === 0) {
        return (
            <div className="p-6 bg-yellow min-h-screen pb-32">
                <h2 className="text-6xl font-brand italic text-center mb-16 uppercase tracking-tighter">
                    SELECT YOUR STYLE
                </h2>
                <div className="space-y-16">
                    {SERVICES.map(s => (
                        <div key={s.id} className="neob-card bg-white p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex justify-between items-start mb-6 border-b-4 border-black pb-4">
                                <h3 className="text-5xl font-brand italic uppercase leading-none">{s.name}</h3>
                                <span className="text-5xl font-brand italic text-red-600 font-condensed">R{s.price}</span>
                            </div>
                            <div className="aspect-[4/5] overflow-hidden mb-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
                                <img src={s.image} className="w-full h-full object-cover grayscale" alt={s.name} />
                            </div>
                            <button 
                                onClick={() => { setSelectedService(s); setStep(1); window.scrollTo(0,0); }}
                                className="neob-button-red w-full text-3xl py-6 italic font-brand shadow-none border-4"
                            >
                                BOOK THIS SESSION
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (step === 1) {
        return (
            <div className="p-6 bg-yellow min-h-screen pb-32">
                <div className="neob-card bg-white p-8 mb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="grid grid-cols-3 border-b-4 border-black pb-6 mb-8 text-center">
                        <span className="font-brand text-4xl">THU</span>
                        <span className="font-brand text-4xl underline decoration-8 decoration-red-600 underline-offset-[12px]">MAR 05</span>
                        <span className="font-brand text-4xl">2026</span>
                    </div>
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-y-4 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="font-label text-xs font-black">{d}</div>
                        ))}
                        {Array.from({ length: 31 }).map((_, i) => (
                            <div key={i} className={`py-2 text-2xl font-brand ${i+1 === 5 ? 'bg-black text-white neob-card border-none shadow-none' : 'opacity-40'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-[5rem] font-brand italic text-center mb-12 text-red-600 uppercase tracking-tighter leading-none">SELECT TIME</h2>
                
                <div className="grid grid-cols-3 gap-6">
                    {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'].map(t => (
                        <button 
                            key={t}
                            onClick={() => { setSelectedTime(t); setStep(2); window.scrollTo(0,0); }}
                            className={`aspect-square flex items-center justify-center text-4xl font-brand italic border-4 border-black transition-all ${selectedTime === t ? 'bg-yellow text-black' : 'bg-black text-white'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                
                <div className="mt-16">
                    <button onClick={() => setStep(0)} className="neob-button-black w-full text-2xl py-6 underline">BACK TO SERVICES</button>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="p-6 bg-yellow min-h-screen pb-32">
                <h2 className="text-7xl font-brand italic text-center mb-12 text-black uppercase tracking-tighter">CONFIRM</h2>
                <div className="neob-card bg-white p-8 space-y-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="space-y-4">
                        <label className="font-label text-xs">YOUR NAME</label>
                        <input 
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full border-4 border-black p-6 text-3xl font-brand italic uppercase rounded-none outline-none focus:bg-yellow/10"
                            placeholder="NAME"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="font-label text-xs">WHATSAPP NUMBER</label>
                        <input 
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full border-4 border-black p-6 text-3xl font-brand italic uppercase rounded-none outline-none focus:bg-yellow/10"
                            placeholder="PHONE"
                        />
                    </div>
                    <div className="pt-10 space-y-6 border-t-[6px] border-black border-dashed">
                        <div className="flex justify-between items-baseline">
                            <span className="font-label text-sm">STYLE</span>
                            <span className="font-brand text-4xl italic">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="font-label text-sm">TIME</span>
                            <span className="font-brand text-4xl italic">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="font-label text-sm text-red-600">TOTAL</span>
                            <span className="font-brand text-5xl italic text-red-600 font-condensed">R{selectedService?.price}</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleConfirm}
                        className="neob-button-red w-full text-4xl py-8 italic font-brand"
                    >
                        CONFIRM BOOKING
                    </button>
                </div>
                <div className="mt-12">
                    <button onClick={() => setStep(1)} className="neob-button-black w-full text-2xl py-6 underline shadow-none border-none">BACK TO TIME</button>
                </div>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="p-6 bg-yellow min-h-screen flex flex-col items-center">
                <div className="neob-card bg-white p-10 w-full max-w-sm relative jagged-edge">
                    <div className="border-b-[6px] border-black border-double pb-6 mb-8 text-center">
                        <h3 className="font-brand text-[2.5rem] italic leading-tight">ORDER #FZ-{lastBookingId}</h3>
                    </div>
                    
                    <div className="space-y-8">
                        {[
                            { label: 'HAIRCUT', value: selectedService?.name },
                            { label: 'BARBER', value: 'ALEX' },
                            { label: 'DATE', value: selectedDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }).toUpperCase() },
                            { label: 'TIME', value: selectedTime }
                        ].map(item => (
                            <div key={item.label} className="flex justify-between border-b-2 border-black/10 pb-2">
                                <span className="font-label text-sm opacity-60 italic">{item.label}:</span>
                                <span className="font-brand text-2xl italic">{item.value}</span>
                            </div>
                        ))}
                        
                        <div className="flex justify-between pt-6">
                             <span className="font-brand text-5xl italic text-red-600 underline decoration-4 underline-offset-8">TOTAL</span>
                             <span className="font-brand text-5xl italic text-red-600 font-condensed">R{selectedService?.price}.00</span>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={() => { setActiveView('profile'); setStep(0); }}
                    className="neob-button-black w-full max-w-sm text-5xl py-8 mt-16 font-brand italic"
                >
                    DONE
                </button>
            </div>
        );
    }

    return null;
  };

  const renderProfile = () => (
    <div className="p-6 bg-[#1a1a1a] min-h-screen text-white pb-32">
        <h2 className="text-7xl font-brand italic text-center mb-16 uppercase tracking-tighter">YOUR FADES</h2>
        
        <div className="space-y-12">
            {bookings.length === 0 ? (
                <div className="neob-card bg-black border-white/20 p-12 text-center text-zinc-500 font-brand text-4xl italic border-dashed">
                    NO FADES<br/>YET
                </div>
            ) : (
                bookings.map(b => (
                    <div key={b.id} className="relative neob-card bg-black border-white/20 p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-between items-start mb-10">
                            <div className="space-y-1">
                                <h3 className="text-yellow text-[2.5rem] font-brand italic leading-none">{SERVICES.find(s => s.id === b.serviceId)?.name}</h3>
                                <p className="font-brand text-3xl italic uppercase text-white/80">BARBER: ALEX</p>
                                <p className="font-mono text-xs opacity-30 mt-4 tracking-tighter">REF# {b.id}</p>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <p className="text-yellow font-brand text-3xl italic mb-1">{b.date}</p>
                                <p className="text-white text-6xl font-brand italic">{b.time}</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <button className="flex-1 bg-green-500 text-black font-brand text-4xl py-6 italic border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1">
                                CONFIRMED
                            </button>
                            <button 
                                onClick={() => {
                                    if(window.confirm('Cancel this fade?')){
                                        bookingService.deleteBooking(b.id);
                                        refreshBookings();
                                    }
                                }}
                                className="neob-button-red px-6 border-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                            >
                                <Trash2 size={32} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
        
        <div className="mt-16">
            <button 
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="neob-button-red w-full text-3xl py-8 italic font-brand flex items-center justify-center gap-4 border-black"
            >
               BOOK NEW FADE <Plus size={32} strokeWidth={3} />
            </button>
        </div>
    </div>
  );

  const renderStaff = () => (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-xl w-full neob-card bg-zinc-900 border-white/10 p-16 space-y-12 shadow-none border-4">
        {!isStaffAuthenticated ? (
            <>
                <div className="text-center space-y-4 font-brand">
                    <h2 className="text-6xl italic uppercase text-yellow leading-none">STAFF</h2>
                    <p className="font-label text-xs text-zinc-500">Authorized access only</p>
                </div>
                <div className="space-y-8">
                    <input
                        type="password"
                        placeholder="ACCESS KEY"
                        value={staffPassword}
                        onChange={(e) => setStaffPassword(e.target.value)}
                        className="w-full bg-black border-4 border-black p-6 font-mono text-lg uppercase tracking-[0.3em] outline-none text-white text-center rounded-none"
                    />
                    <button
                        onClick={() => {
                            if (staffPassword === 'Alex') {
                                setIsStaffAuthenticated(true);
                            } else {
                                alert('Invalid Key');
                            }
                        }}
                        className="neob-button-red w-full text-3xl italic font-brand py-6"
                    >
                        AUTHENTICATE
                    </button>
                </div>
            </>
        ) : (
            <div className="space-y-12">
                <div className="flex justify-between items-center border-b-4 border-white/10 pb-8">
                    <h2 className="text-5xl font-brand italic text-yellow uppercase">STAFF</h2>
                    <button onClick={() => setIsStaffAuthenticated(false)} className="bg-red-600 text-white font-brand italic px-8 py-3 transform skewX(-10deg) border-black border-2 border-l-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">LOGOUT</button>
                </div>
                <div className="space-y-8 overflow-y-auto max-h-[60vh] no-scrollbar">
                    {bookings.map(b => (
                        <div key={b.id} className="bg-black/50 p-8 border-4 border-white/5 neob-card shadow-none">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-yellow font-brand text-4xl italic leading-none">{b.customerName}</p>
                                    <p className="text-white/60 font-mono text-xs mt-2">{b.customerPhone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-brand text-2xl italic">{b.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
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
            <div className="p-12 text-center diagonal-stripes min-h-screen flex items-center justify-center">
                <div className="neob-card bg-white p-16 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] max-w-sm">
                    <h2 className="text-[5rem] font-brand italic mb-8 leading-[0.85] tracking-tighter">STORE<br/>SOON</h2>
                    <p className="font-label text-xs opacity-60">FADEZONE GEAR COMING IN 2026</p>
                </div>
            </div>
        )}
        {activeView === 'profile' && renderProfile()}
        {activeView === 'staff' && renderStaff()}
    </Layout>
  );
};

export default App;
