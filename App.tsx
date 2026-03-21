
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
      <section className="relative h-[65vh] flex flex-col items-center justify-center diagonal-stripes border-b-4 border-black border-t-4">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
             <img 
                src="/services/haircut.jpg" 
                className="w-full h-full object-cover grayscale opacity-80"
                alt="Hero Haircut"
             />
             <div className="absolute inset-0 bg-yellow/20"></div>
        </div>

        <div className="z-10 flex flex-col items-center">
            <button
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="neob-button-red flex items-center gap-4 text-3xl px-12 py-6 mb-8"
            >
                BOOK A FADE <ArrowRight size={32} strokeWidth={3} className="rotate-[-45deg]" />
            </button>
        </div>
      </section>

      {/* Latest Styles Section */}
      <section className="py-12 px-6 bg-[#f0f0f0] border-b-4 border-black">
        <h2 className="text-5xl font-brand italic mb-8 border-b-8 border-red-600 inline-block">
            LATEST STYLES
        </h2>

        <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar">
            {[
                { name: 'SKIN FADE', text: 'NEO-URBAN LOOK', img: '/services/haircut-black-dye.jpg' },
                { name: 'BUZZ CUT', text: 'MINIMALIST & SHARP', img: '/services/chiskop.jpg' },
                { name: 'BRUSH CUT', text: 'CLEAN & CLASSIC', img: '/services/brush-cut.jpg' }
            ].map((style, idx) => (
                <div key={idx} className="min-w-[280px] flex flex-col gap-4">
                    <div className="relative aspect-square neob-card overflow-hidden">
                        <img src={style.img} className="w-full h-full object-cover grayscale" alt={style.name} />
                        <div className="absolute bottom-4 left-0">
                            <div className="neob-button-red py-2 px-4 text-xl">
                                {style.name}
                            </div>
                        </div>
                    </div>
                    <div className="font-brand text-2xl tracking-tighter italic">
                        {style.text}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Opening Times Highlight */}
      <section className="py-12 px-6 bg-white border-b-4 border-black">
        <h3 className="text-3xl font-brand italic text-red-600 mb-6 uppercase">Opening Times</h3>
        <div className="space-y-3">
          {selectedLocation.hours.map((h, idx) => {
            const currentDay = new Date().getDay();
            const isCurrent = currentDay === idx;
            return (
              <div key={h.day} className={`flex justify-between items-center py-2 border-b-2 border-black/5 ${isCurrent ? 'bg-yellow -mx-6 px-6 border-black' : ''}`}>
                <span className="font-label text-xs tracking-[0.2em]">{h.day}</span>
                <span className="font-mono text-sm font-bold">{h.time}</span>
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
            <div className="p-6 bg-yellow min-h-screen">
                <h2 className="text-5xl font-brand italic text-center mb-12 uppercase tracking-tighter">
                    SELECT YOUR STYLE
                </h2>
                <div className="space-y-12">
                    {SERVICES.map(s => (
                        <div key={s.id} className="neob-card bg-white p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-4xl font-brand italic">{s.name}</h3>
                                <span className="text-4xl font-brand italic text-red-600 font-condensed">R{s.price}</span>
                            </div>
                            <div className="aspect-[16/9] overflow-hidden mb-4 border-4 border-black">
                                <img src={s.image} className="w-full h-full object-cover grayscale" alt={s.name} />
                            </div>
                            <button 
                                onClick={() => { setSelectedService(s); setStep(1); window.scrollTo(0,0); }}
                                className="neob-button-red w-full text-2xl py-4"
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
            <div className="p-6 bg-yellow min-h-screen">
                <div className="calendar-card mb-12">
                    <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
                        <span className="font-brand text-3xl">THU</span>
                        <span className="font-brand text-3xl underline decoration-4 decoration-red-600">MAR 05</span>
                        <span className="font-brand text-3xl">2026</span>
                    </div>
                    {/* Simplified Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="text-center font-label text-[10px] pb-2">{d}</div>
                        ))}
                        {Array.from({ length: 31 }).map((_, i) => (
                            <div key={i} className={`text-center py-1 font-bold ${i+1 === 5 ? 'bg-black text-white' : ''}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-6xl font-brand italic text-center mb-12 text-red-600 uppercase">SELECT TIME</h2>
                <TimeGrid 
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onTimeSelect={(t) => { setSelectedTime(t); setStep(2); window.scrollTo(0,0); }}
                    bookings={bookings}
                />
                
                <div className="mt-12">
                    <button onClick={() => setStep(0)} className="neob-button-black w-full text-xl shadow-none">BACK TO SERVICES</button>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="p-6 bg-yellow min-h-screen">
                <h2 className="text-6xl font-brand italic text-center mb-12 text-black uppercase">CONFIRM BOOKING</h2>
                <div className="neob-card bg-white p-8 space-y-8">
                    <div className="space-y-4">
                        <label className="font-label text-xs">Your Name</label>
                        <input 
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full border-4 border-black p-4 text-xl font-bold rounded-none outline-none focus:bg-yellow/10"
                            placeholder="NAME"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="font-label text-xs">Phone Number</label>
                        <input 
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full border-4 border-black p-4 text-xl font-bold rounded-none outline-none focus:bg-yellow/10"
                            placeholder="PHONE"
                        />
                    </div>
                    <div className="pt-8 space-y-4 border-t-4 border-black">
                        <div className="flex justify-between">
                            <span className="font-label text-xs">Service</span>
                            <span className="font-brand text-2xl italic">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-label text-xs">Time</span>
                            <span className="font-brand text-2xl italic">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-label text-xs">Price</span>
                            <span className="font-brand text-2xl italic text-red-600 font-condensed">R{selectedService?.price}</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleConfirm}
                        className="neob-button-red w-full text-2xl py-6"
                    >
                        CONFIRM & PAY R{selectedService?.price}
                    </button>
                </div>
                <div className="mt-8">
                    <button onClick={() => setStep(1)} className="neob-button-black w-full text-xl shadow-none">BACK TO TIME</button>
                </div>
            </div>
        );
    }

    if (step === 3) {
        // Receipt View
        return (
            <div className="p-6 bg-yellow min-h-screen flex flex-col items-center">
                <div className="neob-card bg-white p-8 w-full max-w-sm jagged-edge relative">
                    <div className="border-b-4 border-black pb-4 mb-6 text-center">
                        <h3 className="font-brand text-3xl italic">ORDER #FZ-{lastBookingId}</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex justify-between border-b-2 border-black/5 pb-2">
                             <span className="font-label text-[10px] opacity-60">HAIRCUT:</span>
                             <span className="font-brand text-xl italic">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between border-b-2 border-black/5 pb-2">
                             <span className="font-label text-[10px] opacity-60">BARBER:</span>
                             <span className="font-brand text-xl italic">ALEX</span>
                        </div>
                        <div className="flex justify-between border-b-2 border-black/5 pb-2">
                             <span className="font-label text-[10px] opacity-60">DATE:</span>
                             <span className="font-brand text-xl italic">{selectedDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between border-b-2 border-black/5 pb-2">
                             <span className="font-label text-[10px] opacity-60">TIME:</span>
                             <span className="font-brand text-xl italic">{selectedTime}</span>
                        </div>
                        
                        <div className="flex justify-between pt-4">
                             <span className="font-brand text-3xl italic text-red-600">TOTAL:</span>
                             <span className="font-brand text-3xl italic text-red-600 font-condensed">R{selectedService?.price}.00</span>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={() => { setActiveView('profile'); setStep(0); }}
                    className="neob-button-black w-full max-w-sm text-3xl py-6 mt-12"
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
        <h2 className="text-5xl font-brand italic text-center mb-12 uppercase">YOUR FADES</h2>
        
        <div className="space-y-8">
            {bookings.length === 0 ? (
                <div className="neob-card bg-black border-white/20 p-12 text-center text-zinc-500 font-brand text-2xl italic">
                    NO FADES BOOKED YET
                </div>
            ) : (
                bookings.map(b => (
                    <div key={b.id} className="ticket-card">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-yellow text-4xl font-brand italic leading-none">{SERVICES.find(s => s.id === b.serviceId)?.name}</h3>
                                <p className="font-brand text-2xl italic mt-1 uppercase text-white/80">BARBER: ALEX</p>
                                <p className="font-mono text-[10px] opacity-40 mt-2">REF: {b.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-yellow font-brand text-2xl italic">{b.date}</p>
                                <p className="text-white text-5xl font-brand italic">{b.time}</p>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex gap-4">
                            <button className="flex-1 bg-green-500 text-black font-brand text-2xl py-4 italic border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                CONFIRMED
                            </button>
                            <button 
                                onClick={() => {
                                    if(window.confirm('Cancel this fade?')){
                                        bookingService.deleteBooking(b.id);
                                        refreshBookings();
                                    }
                                }}
                                className="neob-button-red px-4 border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Trash2 size={24} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
        
        <div className="mt-12">
            <button 
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="neob-button-red w-full text-xl flex items-center justify-center gap-4"
            >
               BOOK ANOTHER FADE <Plus />
            </button>
        </div>
    </div>
  );

  const renderStaff = () => (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-xl w-full neob-card bg-zinc-900 border-white/10 p-16 space-y-12 shadow-none">
        {!isStaffAuthenticated ? (
            <>
                <div className="text-center space-y-4">
                    <h2 className="text-6xl font-brand italic uppercase text-yellow leading-none">STAFF PORTAL</h2>
                    <p className="font-label text-[10px] text-zinc-500">Authorized access only</p>
                </div>
                <div className="space-y-8">
                    <input
                        type="password"
                        placeholder="PORTAL ACCESS KEY"
                        value={staffPassword}
                        onChange={(e) => setStaffPassword(e.target.value)}
                        className="w-full bg-black border-4 border-black p-6 font-mono text-sm uppercase tracking-[0.3em] outline-none text-white text-center"
                    />
                    <button
                        onClick={() => {
                            if (staffPassword === 'Alex') {
                                setIsStaffAuthenticated(true);
                            } else {
                                alert('Invalid Key');
                            }
                        }}
                        className="neob-button-red w-full text-2xl"
                    >
                        AUTHENTICATE
                    </button>
                </div>
            </>
        ) : (
            <div className="space-y-12">
                <div className="flex justify-between items-center">
                    <h2 className="text-5xl font-brand italic text-yellow uppercase">DASHBOARD</h2>
                    <button onClick={() => setIsStaffAuthenticated(false)} className="neob-button-red py-2 px-4 shadow-none border-2">LOGOUT</button>
                </div>
                <div className="space-y-6">
                    {bookings.map(b => (
                        <div key={b.id} className="bg-black p-6 border-2 border-white/10 flex justify-between items-center">
                            <div>
                                <p className="text-yellow font-brand text-2xl">{b.customerName}</p>
                                <p className="text-white/60 text-xs">{b.customerPhone}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-brand text-xl">{b.date} @ {b.time}</p>
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
                <div className="neob-card bg-white p-12">
                    <h2 className="text-6xl font-brand italic mb-4">STORE COMING SOON</h2>
                    <p className="font-label opacity-60">GET YOUR FADEZONE GEAR HERE IN 2026</p>
                </div>
            </div>
        )}
        {activeView === 'profile' && renderProfile()}
        {activeView === 'staff' && renderStaff()}
    </Layout>
  );
};

export default App;
