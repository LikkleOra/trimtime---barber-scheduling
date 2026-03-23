
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
    <div className="flex flex-col bg-[#F2F2F2]">
      {/* Hero Section - COMPRESSED */}
      <section className="relative h-[320px] flex items-center justify-center hero-diagonal-pattern border-b-6 border-black">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
             <img 
                src="/services/haircut.jpg" 
                className="w-full h-full object-cover grayscale contrast-150 brightness-110"
                alt="Hero Haircut"
             />
        </div>

        <div className="relative z-10 flex flex-col items-center mt-12 transform-tilted">
            <button
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="btn-brutalist-red flex items-center gap-3 text-3xl italic font-black uppercase tracking-tighter shadow-solid-6px"
            >
                BOOK A FADE <ArrowRight size={32} strokeWidth={4} className="rotate-[-45deg]" />
            </button>
        </div>
      </section>

      {/* Latest Styles Section - CAROUSEL */}
      <section className="py-10 bg-[#F2F2F2]">
        <div className="mb-6">
            <h2 className="section-title-underlined text-4xl font-black italic uppercase tracking-tighter">
                LATEST STYLES
            </h2>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4 snap-x snap-mandatory">
            {[
                { id: 'ladies-haircut', name: 'LADIES CUT', text: 'URBAN FEMME', img: '/services/ladies-cut.jpg' },
                { id: 'shave-trim', name: 'TRIM & EDGE', text: 'SHARP FINISH', img: '/services/trimming.jpg' },
                { id: 'haircut', name: 'THE CLASSIC', text: 'TIMELESS LOOK', img: '/services/haircut.jpg' },
                { id: 'unique-haircut', name: 'CUSTOM DYE', text: 'LOUD COLORS', img: '/services/haircut-custom-dye.jpg' }
            ].map((style, idx) => (
                <div 
                    key={idx} 
                    className="min-w-[200px] flex flex-col gap-2 snap-start cursor-pointer group"
                    onClick={() => {
                        const service = SERVICES.find(s => s.id === style.id);
                        if (service) {
                            setSelectedService(service);
                            setActiveView('bookings');
                            setStep(1);
                            window.scrollTo(0,0);
                        }
                    }}
                >
                    <div className="relative brutalist-card-thick aspect-[4/5] bg-white shadow-solid-4px transition-transform group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none">
                        <img src={style.img} className="w-full h-full object-cover grayscale contrast-125 brightness-110" alt={style.name} />
                        <div className="absolute bottom-3 left-0">
                            <div className="tilted-label text-lg font-black italic uppercase tracking-tighter border-2 border-black">
                                {style.name}
                            </div>
                        </div>
                    </div>
                    <div className="text-xs font-black italic uppercase tracking-tighter text-black/60 mt-1">
                        {style.text}
                    </div>
                </div>
            ))}
        </div>
      </section>


      {/* Stats Section - COMPACT */}
      <section className="py-10 px-8 bg-black text-[#FFD700] border-t-4 border-black">
          <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                  <span className="text-5xl font-black italic tracking-tighter">10+</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#FFD700]/60">MASTER BARBERS</p>
              </div>
              <div className="flex flex-col items-center">
                  <span className="text-5xl font-black italic tracking-tighter">99%</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#FFD700]/60">VIBE RATING</p>
              </div>
          </div>
      </section>
    </div>
  );


  const renderBookings = () => {
    // Note: Re-applying Brutalist styling to Booking flow too for consistency
    if (step === 0) {
        return (
            <div className="p-4 bg-[#FFD700] min-h-screen">
                <header className="py-8 border-b-2 border-black mb-6">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                        SELECT SERVICE
                    </h1>
                </header>
                
                <div className="grid grid-cols-1 gap-4 pb-32">
                    {SERVICES.map(s => (
                        <div key={s.id} className="brutalist-card-thick flex flex-col h-full bg-white shadow-solid-4px">
                            <div className="relative aspect-video overflow-hidden border-b-2 border-black">
                                <img src={s.image} className="w-full h-full object-cover grayscale contrast-125 transition-transform hover:scale-110" alt={s.name} />
                                <div className="absolute top-2 right-2">
                                    <div className="tilted-label text-lg px-2 py-1 border-2 border-black shadow-solid-4px mb-1">
                                        R{s.price}
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">{s.name}</h2>
                                <button 
                                    onClick={() => { setSelectedService(s); setStep(1); window.scrollTo(0,0); }}
                                    className="btn-brutalist-red w-full text-lg py-2 rounded-none shadow-solid-4px"
                                >
                                    BOOK SESSION
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
            <div className="p-4 bg-[#FFD700] min-h-screen">
                <button onClick={() => setStep(0)} className="mb-6 font-black italic uppercase tracking-tighter text-lg bg-black text-white px-3 py-1 flex items-center gap-2 shadow-solid-4px">
                    <ArrowLeft size={18} /> BACK
                </button>

                <div className="brutalist-card-thick p-4 mb-8 bg-white shadow-solid-4px">
                    <header className="mb-4 border-b-2 border-black pb-2 text-center">
                         <h2 className="text-2xl font-black italic uppercase tracking-tighter">MARCH 2026</h2>
                    </header>
                    
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="p-1 text-[10px] font-black text-center border border-black bg-black text-white">{d}</div>
                        ))}
                        {Array.from({ length: 31 }).map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-10 flex items-center justify-center text-sm font-black border border-black cursor-pointer transition-all ${i+1 === 5 ? 'bg-black text-white' : 'bg-white text-black hover:bg-black/5'}`}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-center text-3xl font-black italic uppercase tracking-tighter text-red-600 mb-4">SELECT TIME</h3>
                    <div className="grid grid-cols-3 gap-3 mb-20">
                        {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(t => (
                            <button 
                                key={t}
                                onClick={() => { setSelectedTime(t); setStep(2); window.scrollTo(0,0); }}
                                className={`h-12 flex items-center justify-center text-lg font-black border-2 border-black transition-all ${selectedTime === t ? 'bg-[#FFD700] text-black shadow-none' : 'bg-black text-white shadow-solid-4px'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Confirmation Step
    if (step === 2) {
        return (
            <div className="p-4 bg-[#FFD700] min-h-screen">
                <header className="py-8 border-b-4 border-black mb-8">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-center">CHECKOUT</h1>
                </header>

                <div className="brutalist-card-thick bg-white p-6 max-w-[340px] mx-auto space-y-6 shadow-solid-6px">
                    <div className="space-y-1">
                        <label className="text-lg font-black italic uppercase tracking-tighter">Your Name</label>
                        <input 
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full border-2 border-black p-3 text-xl font-black focus:bg-yellow-50 outline-none"
                            placeholder="NAME"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-lg font-black italic uppercase tracking-tighter">Contact #</label>
                        <input 
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full border-2 border-black p-3 text-xl font-black focus:bg-yellow-50 outline-none"
                            placeholder="+27 000"
                        />
                    </div>
                    
                    <div className="pt-4 space-y-2 border-t-2 border-black">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-black uppercase tracking-tighter opacity-50">Service</span>
                            <span className="text-md font-black uppercase text-right leading-none">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-black uppercase tracking-tighter opacity-50">Time Slot</span>
                            <span className="text-md font-black uppercase">{selectedTime}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleConfirm}
                        className="btn-brutalist-red w-full py-4 text-2xl shadow-solid-6px active:translate-y-1 active:shadow-none"
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        );
    }

    // Receipt View
    if (step === 3) {
        return (
            <div className="p-4 bg-[#F2F2F2] min-h-screen flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 rotate-6 bg-[#FFD700] w-[150%] h-[100px] -translate-y-12 border-b-6 border-black z-0"></div>
                
                <main className="relative z-10 w-full max-w-[320px] mt-16 bg-white border-4 border-black p-6 shadow-solid-6px">
                    <TornEdge position="top" />
                    <TornEdge position="bottom" />

                    <div className="text-center py-4 mb-4 border-b-4 border-black border-dashed">
                        <div className="tilted-label text-md mb-4">#READY</div>
                        <h1 className="text-2xl font-black italic tracking-tighter leading-tight">
                            REF: {lastBookingId}
                        </h1>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { label: 'Service', val: selectedService?.name },
                            { label: 'Time', val: selectedTime },
                            { label: 'Total', val: 'R'+selectedService?.price }
                        ].map(item => (
                            <div key={item.label} className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-black/40 uppercase tracking-tighter">{item.label}</span>
                                <span className="text-sm font-black uppercase">{item.val}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t-4 border-black text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-4">SCREENSHOT FOR ENTRY</p>
                        <button 
                            onClick={() => {
                                const msg = `Hey Alex, I've booked a ${selectedService?.name} at ${selectedTime}. Ref: ${lastBookingId}`;
                                window.open(`https://wa.me/27812687806?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                            className="w-full bg-[#25D366] text-black font-black italic uppercase text-xs py-2 border-2 border-black shadow-solid-4px active:translate-y-1 active:shadow-none"
                        >
                            CONFIRM VIA WHATSAPP
                        </button>
                    </div>
                </main>

                
                <button 
                    onClick={() => { setActiveView('profile'); setStep(0); }}
                    className="relative z-10 mt-12 btn-brutalist-red px-12 py-4 text-2xl transform-tilted shadow-solid-6px"
                >
                    GOT IT
                </button>
            </div>
        );
    }

    return null;
  };

  const renderProfile = () => (
    <div className="p-4 bg-black min-h-screen text-[#FFD700] pb-32">
        <header className="py-8 border-b-2 border-[#FFD700] mb-6 text-center">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                YOUR FADES
            </h1>
        </header>

        <main className="max-w-md mx-auto w-full space-y-6">
            {bookings.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-[#FFD700]/30">
                    <p className="text-[#FFD700]/30 font-black italic uppercase text-lg tracking-tighter">No Active Bookings</p>
                </div>
            ) : (
                bookings.map(b => (
                    <div key={b.id} className="relative group brutalist-card-thick bg-black border-2 border-[#FFD700] p-4 shadow-none">
                        <div className="absolute inset-0 bg-[#FFD700] translate-x-1.5 translate-y-1.5 -z-10" />
                        
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-[#FFD700] text-xl font-black italic uppercase tracking-tighter leading-tight">
                                {SERVICES.find(s => s.id === b.serviceId)?.name}
                            </h2>
                            <div className="bg-[#00FF00] text-black px-2 py-0.5 text-[10px] font-black uppercase italic -skew-x-12">OK</div>
                        </div>

                        <div className="flex justify-between items-center py-2 border-y border-[#FFD700]/20 mb-4 font-black uppercase text-lg italic tracking-tighter">
                            <span>{b.date}</span>
                            <span>{b.time}</span>
                        </div>
                        
                        <div className="flex gap-2">
                            <button className="flex-1 bg-[#00FF00] text-black text-lg font-black italic py-2 border border-black active:translate-y-0.5 shadow-solid-4px">
                                DETAILS
                            </button>
                            <button 
                                onClick={() => {
                                    if(window.confirm('Cancel this fade?')){
                                        bookingService.deleteBooking(b.id);
                                        refreshBookings();
                                    }
                                }}
                                className="bg-[#FF0000] p-2 text-white border border-black shadow-solid-4px"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </main>
        
        <div className="mt-12">
            <button 
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="w-full bg-[#FFD700] text-black font-black italic uppercase tracking-tighter py-4 text-2xl border-4 border-black shadow-solid-6px active:shadow-none active:translate-y-1"
            >
               BOOK NEW SESSION <Plus size={24} />
            </button>
        </div>
    </div>
  );


  const renderStaff = () => (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-[#FFD700] p-12 border-8 border-black space-y-10 shadow-solid-8px">
        {!isStaffAuthenticated ? (
            <>
                <div className="text-center space-y-2">
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter">ADMIN LOGIN</h2>
                    <p className="text-xs font-black uppercase tracking-widest opacity-40">Staff Personnel Only</p>
                </div>
                <div className="space-y-6">
                    <input
                        type="password"
                        placeholder="ACCESS KEY"
                        value={staffPassword}
                        onChange={(e) => setStaffPassword(e.target.value)}
                        className="w-full border-4 border-black p-5 text-3xl font-black tracking-[0.3em] text-center outline-none focus:bg-white transition-colors"
                    />
                    <button
                        onClick={() => {
                            if (staffPassword === 'Alex') {
                                setIsStaffAuthenticated(true);
                            } else {
                                alert('Wrong Code');
                            }
                        }}
                        className="btn-brutalist-red w-full py-6 text-3xl"
                    >
                        UNLOCKED
                    </button>
                </div>
            </>
        ) : (
            <div className="space-y-10">
                <div className="flex justify-between items-center border-b-4 border-black pb-6 font-black italic uppercase tracking-tighter">
                    <h2 className="text-4xl text-black">CONTROL PANEL</h2>
                    <button onClick={() => setIsStaffAuthenticated(false)} className="px-4 py-2 bg-black text-white text-sm">LOGOUT</button>
                </div>
                <div className="space-y-6 overflow-y-auto max-h-[50vh] pr-2 no-scrollbar">
                    {bookings.length === 0 ? (
                        <p className="text-center py-20 font-black italic uppercase text-2xl opacity-20">System Idle</p>
                    ) : (
                        bookings.map(b => (
                            <div key={b.id} className="bg-white border-4 border-black p-6 space-y-4 shadow-solid-4px">
                                <div className="flex justify-between items-start">
                                    <div className="font-black italic uppercase tracking-tighter">
                                        <p className="text-[#FF0000] text-2xl">{b.customerName}</p>
                                        <p className="text-black/40 text-sm mt-1">{b.customerPhone}</p>
                                    </div>
                                    <div className="text-right font-black italic uppercase tracking-tighter">
                                        <div className="bg-black text-white px-3 py-1 flex items-center gap-2">
                                            <Clock size={16} /> {b.time}
                                        </div>
                                        <p className="text-black/30 text-xs mt-2">{b.date}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t-2 border-black/10 flex justify-between items-center font-black italic uppercase tracking-tighter">
                                    <span className="text-black/40 text-[10px]">Session:</span>
                                    <span className="text-black text-lg">{SERVICES.find(s => s.id === b.serviceId)?.name}</span>
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

  const renderAbout = () => (
    <div className="flex flex-col bg-[#F2F2F2] min-h-screen">
        <header className="py-12 border-b-6 border-black mb-10 text-center">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">STORY</h1>
        </header>
        
        <div className="space-y-12">
            <div className="brutalist-card-thick bg-white p-6 shadow-solid-6px -rotate-1">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-red-600 mb-4">THE VIBE</h2>
                <p className="text-lg font-bold leading-tight uppercase tracking-tight">
                    FADEZONE ISN'T JUST A BARBERSHOP. IT'S THE URBAN BEAT OF KENSINGTON. WE BLEND STREET CULTURE WITH PRECISION GROOMING TO ENSURE YOU LEAVE SCREAMING STYLE.
                </p>
            </div>

            <div className="relative aspect-video brutalist-card-thick">
                <img src="/services/haircut.jpg" className="w-full h-full object-cover grayscale contrast-150" alt="Vibe" />
                <div className="absolute top-4 left-4">
                    <div className="tilted-label text-xl">#BORNINKENSINGTON</div>
                </div>
            </div>

            <div className="p-6 bg-black text-[#FFD700] border-4 border-black shadow-solid-6px">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">OUR CODE</h2>
                <ul className="space-y-4 text-xl font-black italic uppercase tracking-tighter">
                    <li>• NO APPOINTMENT? NO FLEX.</li>
                    <li>• PRECISION OVER EVERYTHING.</li>
                    <li>• URBAN ATTITUDE.</li>
                </ul>
            </div>
        </div>
    </div>
  );

  const renderContacts = () => (
    <div className="flex flex-col bg-[#FFD700] min-h-screen">
        <header className="py-12 border-b-6 border-black mb-10 text-center">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">REACH</h1>
        </header>

        <div className="space-y-10">
            <div className="brutalist-card-thick bg-white p-6 shadow-solid-6px rotate-1">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">LOCATION</h2>
                <p className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">424 COMMISSIONER ST</p>
                <p className="text-lg font-black uppercase tracking-tighter opacity-40 italic">KENSINGTON, JOHANNESBURG</p>
                <button className="mt-4 w-full bg-black text-white py-4 font-black italic uppercase text-xl shadow-solid-4px active:translate-y-1">
                    GET DIRECTIONS
                </button>
            </div>

            <div className="brutalist-card-thick bg-black text-[#FFD700] p-6 shadow-solid-6px -rotate-1">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-6 border-b-2 border-[#FFD700]/20 pb-2">HOURS</h2>
                <div className="space-y-3">
                    {[
                        { day: 'MON-FRI', time: '08:00 - 18:00' },
                        { day: 'SATURDAY', time: '08:00 - 19:00' },
                        { day: 'SUNDAY', time: 'CLOSED', red: true }
                    ].map(h => (
                        <div key={h.day} className="flex justify-between items-center text-xl font-black italic tracking-tighter">
                            <span className="opacity-50">{h.day}</span>
                            <span className={h.red ? 'text-red-500' : ''}>{h.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="brutalist-card-thick bg-white p-6 shadow-solid-6px">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">DIRECT LINE</h2>
                <p className="text-3xl font-black tracking-widest text-center py-4 bg-gray-100 border-2 border-black border-dashed">
                    081 268 7806
                </p>
                <button className="mt-6 w-full btn-brutalist-red py-4 text-2xl flex items-center justify-center gap-4">
                    CALL NOW <Zap size={24} />
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <Layout activeView={activeView} onViewChange={(v) => { setActiveView(v); setStep(0); }}>
        {activeView === 'home' && renderHome()}
        {activeView === 'bookings' && renderBookings()}
        {activeView === 'about' && renderAbout()}
        {activeView === 'contacts' && renderContacts()}
        {activeView === 'store' && (
            <div className="p-12 text-center bg-[#FFD700] min-h-screen flex items-center justify-center">
                <div className="brutalist-card-thick bg-white p-12 max-w-sm shadow-solid-8px -rotate-2">
                    <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-6">STORE<br/>SOON</h2>
                    <div className="h-4 w-full bg-red-600 mb-8" />
                    <p className="text-[12px] font-black uppercase tracking-[0.2em] opacity-30 italic">Apparel & Gear Coming Winter 2026</p>
                </div>
            </div>
        )}
        {activeView === 'profile' && renderProfile()}
        {activeView === 'staff' && renderStaff()}
    </Layout>
  );
};


export default App;
