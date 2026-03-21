
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import TornEdge from './components/TornEdge';
import { SERVICES, BARBER_CONFIG } from './constants';
import { Service, Booking, ViewType } from './types';
import { bookingService } from './services/bookingService';
import { ChevronRight, MapPin, CheckCircle, Smartphone, ChevronLeft, ArrowRight, Star, Play, Circle, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';

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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[480px] flex flex-col items-center justify-center hero-diagonal-texture border-b-4 border-black border-t-4">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
             <img 
                src="/services/haircut.jpg" 
                className="w-full h-full object-cover grayscale brightness-125 contrast-150"
                alt="Hero Haircut"
             />
        </div>

        <div className="z-10 bg-black/5 flex flex-col items-center mt-32">
            <button
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="btn-brutalist text-4xl w-[320px] rounded-[50px]"
            >
                BOOK A FADE <ArrowRight size={32} strokeWidth={4} />
            </button>
        </div>
      </section>

      {/* Latest Styles Section */}
      <section className="py-12 px-6 bg-[#F2F2F2] border-b-4 border-black">
        <div className="flex items-baseline gap-4 mb-10">
            <h2 className="text-aggressive text-5xl text-black">
                LATEST STYLES
            </h2>
        </div>

        <div className="flex overflow-x-auto gap-10 pb-10 no-scrollbar snap-x snap-mandatory">
            {[
                { name: 'SKIN FADE', text: 'NEO-URBAN LOOK', img: '/services/haircut-black-dye.jpg' },
                { name: 'BUZZ CUT', text: 'MINIMALIST & SHARP', img: '/services/chiskop.jpg' },
                { name: 'BRUSH CUT', text: 'CLEAN & CLASSIC', img: '/services/brush-cut.jpg' }
            ].map((style, idx) => (
                <div key={idx} className="min-w-[320px] flex flex-col gap-6 snap-center">
                    <div className="relative aspect-square brutalist-card overflow-hidden bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <img src={style.img} className="w-full h-full object-cover grayscale contrast-125" alt={style.name} />
                        <div className="absolute bottom-6 left-0">
                            <div className="label-badge text-2xl uppercase">
                                {style.name}
                            </div>
                        </div>
                    </div>
                    <div className="text-aggressive text-3xl tracking-tighter text-black/80">
                        {style.text}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Footer Branded Stats */}
      <section className="py-16 px-6 bg-black text-[#FFD700] flex justify-between">
          <div className="flex flex-col items-center">
              <span className="text- aggressive text-6xl">99%</span>
              <span className="font-label text-xs">VIBE RATE</span>
          </div>
          <div className="flex flex-col items-center">
              <span className="text-aggressive text-6xl">10+</span>
              <span className="font-label text-xs">BARBERS</span>
          </div>
      </section>
    </div>
  );

  const renderBookings = () => {
    if (step === 0) {
        return (
            <div className="p-6 bg-[#FFD700] min-h-screen">
                <header className="py-10">
                    <h1 className="text-aggressive text-6xl text-center">
                        SELECT YOUR STYLE
                    </h1>
                </header>
                <div className="max-w-md mx-auto space-y-12 pb-32 px-2">
                    {SERVICES.map(s => (
                        <div key={s.id} className="brutalist-card bg-white p-0 overflow-hidden group">
                            <div className="p-6 flex justify-between items-center bg-[#F2F2F2] border-b-4 border-black relative">
                                <h2 className="text-aggressive text-4xl leading-none">{s.name}</h2>
                                <span className="text-aggressive text-3xl text-[#FF0000] bg-white px-3 py-1 border-2 border-black absolute top-[-10px] right-[10px] skew-x-[-12deg]">
                                    <span className="block skew-x-[12deg]">R{s.price}</span>
                                </span>
                            </div>
                            <div className="px-6 py-6">
                                <img src={s.image} className="w-full aspect-square object-cover border-4 border-black grayscale contrast-150 brightness-110" alt={s.name} />
                            </div>
                            <div className="px-6 pb-8">
                                <button 
                                    onClick={() => { setSelectedService(s); setStep(1); window.scrollTo(0,0); }}
                                    className="btn-brutalist w-full rounded-[50px] text-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                >
                                    BOOK THIS SESSION
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
            <div className="p-6 bg-[#FFD700] min-h-screen">
                <div className="brutalist-card bg-white p-6 mb-12">
                    <div className="grid grid-cols-3 border-b-4 border-black pb-6 mb-8 text-aggressive text-3xl text-center">
                        <span>THU</span>
                        <span className="underline decoration-8 decoration-[#FF0000] underline-offset-[12px]">MAR 05</span>
                        <span>2026</span>
                    </div>
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-[2px] bg-black border-[3px] border-black">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="bg-white p-2 font-label text-[10px] text-center opacity-60">{d}</div>
                        ))}
                        {Array.from({ length: 31 }).map((_, i) => (
                            <div key={i} className={`p-4 font-label text-sm text-center ${i+1 === 5 ? 'bg-[#FFD700] text-black font-black' : 'bg-white text-black/30'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-aggressive text-[5rem] text-center mb-10 text-[#FF0000] leading-none">SELECT TIME</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-20">
                    {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'].map(t => (
                        <button 
                            key={t}
                            onClick={() => { setSelectedTime(t); setStep(2); window.scrollTo(0,0); }}
                            className={`h-[50px] flex items-center justify-center font-display text-2xl italic border-[4px] border-black transition-all ${selectedTime === t ? 'bg-[#FFD700] text-black scale-105 z-10' : 'bg-black text-white hover:bg-[#FFD700] hover:text-black'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                
                <div className="mt-16 mb-40">
                    <button onClick={() => setStep(0)} className="btn-brutalist w-full bg-black text-[#FFD700] shadow-none rounded-[50px] border-none text-2xl underline italic">BACK TO SERVICES</button>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="p-6 bg-[#FFD700] min-h-screen">
                <h2 className="text-aggressive text-8xl text-center mb-12">CONFIRM</h2>
                <div className="brutalist-card bg-white p-8 space-y-12 max-w-md mx-auto shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="space-y-6">
                        <label className="font-label text-xs tracking-widest opacity-60">YOUR NAME</label>
                        <input 
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full border-4 border-black p-6 text-3xl text-aggressive rounded-none outline-none focus:bg-[#FFD700]/10 placeholder:opacity-20"
                            placeholder="NAME"
                        />
                    </div>
                    <div className="space-y-6">
                        <label className="font-label text-xs tracking-widest opacity-60">WHATSAPP NUMBER</label>
                        <input 
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full border-4 border-black p-6 text-3xl text-aggressive rounded-none outline-none focus:bg-[#FFD700]/10 placeholder:opacity-20"
                            placeholder="PHONE"
                        />
                    </div>
                    <div className="pt-10 space-y-8 border-t-[4px] border-black border-dashed">
                        {[
                            { label: 'STYLE', val: selectedService?.name },
                            { label: 'TIME', val: selectedTime },
                            { label: 'TOTAL', val: `R${selectedService?.price}`, red: true }
                        ].map(item => (
                            <div key={item.label} className="flex justify-between items-baseline">
                                <span className="font-label text-xs opacity-60">{item.label}</span>
                                <span className={`text-aggressive text-4xl ${item.red ? 'text-[#FF0000] text-5xl' : ''}`}>{item.val}</span>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={handleConfirm}
                        className="btn-brutalist w-full text-4xl py-8 rounded-[50px]"
                    >
                        CONFIRM BOOKING
                    </button>
                </div>
                <div className="mt-12 mb-40 text-center">
                    <button onClick={() => setStep(1)} className="text-aggressive text-2xl text-black underline decoration-4 underline-offset-8">BACK TO TIME</button>
                </div>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="p-6 bg-[#FFD700] min-h-screen flex flex-col items-center">
                <main className="receipt-container w-full max-w-[360px] mx-auto mt-20">
                    <TornEdge position="top" />
                    <TornEdge position="bottom" />

                    <div className="border-y-[6px] border-black py-6 mb-10 text-center">
                        <h1 className="text-aggressive text-[2.5rem] tracking-tighter leading-none">
                            ORDER #FZ-{lastBookingId}
                        </h1>
                    </div>
                    
                    <div className="space-y-8">
                        {[
                            { label: 'HAIRCUT:', val: selectedService?.name, size: 'text-3xl' },
                            { label: 'BARBER:', val: 'ANUEL', size: 'text-3xl' },
                            { label: 'DATE:', val: '12 OCT', size: 'text-2xl', labelSize: 'text-[12px]' },
                            { label: 'TIME:', val: selectedTime, size: 'text-3xl' }
                        ].map(item => (
                            <div key={item.label} className="flex justify-between border-b-[4px] border-black py-4 items-baseline">
                                <span className={`font-label font-black opacity-40 ${item.labelSize || 'text-xl'} italic uppercase`}>{item.label}</span>
                                <span className={`text-aggressive ${item.size} tracking-tighter`}>{item.val}</span>
                            </div>
                        ))}
                        
                        <div className="flex justify-between pt-8 pb-4">
                             <span className="text-aggressive text-5xl text-[#FF0000]">TOTAL:</span>
                             <span className="text-aggressive text-5xl text-[#FF0000]">R{selectedService?.price}.00</span>
                        </div>
                        <div className="h-[6px] bg-black w-full" />
                    </div>
                </main>
                
                <div className="mt-20 w-full max-w-[360px] relative">
                    <div className="absolute inset-0 border-[3px] border-black translate-x-3 translate-y-3 rounded-[50px]" />
                    <button 
                        onClick={() => { setActiveView('profile'); setStep(0); }}
                        className="relative w-full bg-black text-[#FFD700] py-8 text-6xl text-aggressive rounded-[50px] border-[3px] border-black active:translate-x-1 active:translate-y-1 transition-all"
                    >
                        DONE
                    </button>
                </div>
            </div>
        );
    }


    return null;
  };

  const renderProfile = () => (
    <div className="p-6 bg-[#1A1A1D] min-h-screen text-white pb-32">
        <header className="py-12">
            <h1 className="text-white text-aggressive text-7xl text-center">
                YOUR FADES
            </h1>
        </header>

        <main className="max-w-lg mx-auto w-full space-y-12">
            {bookings.length === 0 ? (
                <div className="brutalist-card bg-black border-zinc-800 p-20 text-center border-dashed">
                    <p className="text-[#FFD700] text-aggressive text-5xl">NO FADES<br/>YET</p>
                </div>
            ) : (
                bookings.map(b => (
                    <div key={b.id} className="relative group">
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-2xl" />
                        <div className="relative bg-[#000000] border-[1px] border-zinc-800 p-6 rounded-2xl flex flex-col gap-8 overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-[#FFD700] text-aggressive text-[3.5rem] leading-none mb-2">
                                        {SERVICES.find(s => s.id === b.serviceId)?.name || 'HAIRCUT'}
                                    </h2>
                                    <p className="text-white text-aggressive text-2xl">
                                        BARBER: ALEX
                                    </p>
                                    <p className="font-label text-[10px] text-zinc-500 mt-4 tracking-tighter">REF# {b.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[#FFD700] text-aggressive text-2xl">{b.date}</p>
                                    <p className="text-white text-aggressive text-5xl leading-none mt-2">{b.time}</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <button className="flex-1 bg-[#1DB954] text-black text-aggressive text-4xl py-6 rounded-xl shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
                                    CONFIRMED
                                </button>
                                <button 
                                    onClick={() => {
                                        if(window.confirm('Cancel this fade?')){
                                            bookingService.deleteBooking(b.id);
                                            refreshBookings();
                                        }
                                    }}
                                    className="bg-[#8B0000] px-8 rounded-xl border-none flex items-center justify-center text-white active:scale-95 transition-transform"
                                >
                                    <Trash2 size={32} />
                                </button>
                            </div>

                        </div>
                    </div>
                ))
            )}
        </main>
        
        <div className="mt-16">
            <button 
                onClick={() => { setActiveView('bookings'); setStep(0); }}
                className="btn-brutalist w-full rounded-[50px] text-3xl bg-[#FF0000]"
            >
               BOOK NEW FADE <Plus size={32} strokeWidth={4} />
            </button>
        </div>
    </div>
  );

  const renderStaff = () => (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-xl w-full brutalist-card bg-zinc-900 border-white/10 p-16 space-y-12 shadow-none border-4">
        {!isStaffAuthenticated ? (
            <>
                <div className="text-center space-y-4">
                    <h2 className="text-aggressive text-6xl text-yellow">STAFF</h2>
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
                        className="btn-brutalist w-full text-3xl rounded-[50px]"
                    >
                        AUTHENTICATE
                    </button>
                </div>
            </>
        ) : (
            <div className="space-y-12">
                <div className="flex justify-between items-center border-b-4 border-white/10 pb-8">
                    <h2 className="text-5xl text-aggressive text-yellow">DASHBOARD</h2>
                    <button onClick={() => setIsStaffAuthenticated(false)} className="btn-brutalist py-2 px-8 rounded-[50px] shadow-none border-2">LOGOUT</button>
                </div>
                <div className="space-y-8 overflow-y-auto max-h-[60vh] no-scrollbar">
                    {bookings.map(b => (
                        <div key={b.id} className="bg-black/50 p-8 border-4 border-white/5 brutalist-card shadow-none">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-yellow text-aggressive text-4xl italic leading-none">{b.customerName}</p>
                                    <p className="text-white/60 font-mono text-xs mt-2">{b.customerPhone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white text-aggressive text-2xl">{b.time}</p>
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
            <div className="p-12 text-center hero-diagonal-texture min-h-screen flex items-center justify-center">
                <div className="brutalist-card bg-white p-16 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] max-w-sm">
                    <h2 className="text-aggressive text-[6rem] mb-8 leading-[0.85] tracking-tighter">STORE<br/>SOON</h2>
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
