
import React, { useState } from 'react';
import { Home, Calendar, User, Menu, X, Landmark, Zap, MapPin, Info } from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: Landmark, label: 'HOME' },
    { id: 'bookings', icon: Calendar, label: 'BOOK A FADE' },
    { id: 'profile', icon: Zap, label: 'MY ACCOUNT' }
  ];

  const handleNav = (id: ViewType) => {
    onViewChange(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFD700] text-black selection:bg-black selection:text-[#FFD700]">
      <div className="desktop-center flex flex-col relative">
        {/* Compressed Header */}
        <header className="px-5 h-[62px] flex justify-between items-center sticky top-0 bg-[#FFD700] z-[101] border-b-4 border-black">
          <div className="flex items-center gap-2">
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 hover:scale-110 active:scale-95 transition-all text-black"
             >
                {isMenuOpen ? <X size={28} strokeWidth={4} /> : <Menu size={28} strokeWidth={4} />}
             </button>
             <button 
                onClick={() => handleNav('home')}
                className="text-xl font-black italic uppercase tracking-tighter leading-none text-black ml-1 cursor-pointer transition-transform active:scale-95"
             >
                FADEZONE
             </button>
          </div>

          <button onClick={() => handleNav('staff')} className="p-1 active:scale-95 transition-transform">
              <User size={26} strokeWidth={3} className="text-black" />
          </button>
        </header>

        {/* FULL SCREEN NEO-BRUTALIST MENU OVERLAY */}
        <div 
            className={`fixed inset-0 z-[110] bg-[#FFD700] flex flex-col h-[100dvh] w-full transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
            {/* Replicated Header inside menu so users can close it */}
            <header className="px-5 h-[62px] min-h-[62px] flex justify-between items-center bg-[#FFD700] border-b-4 border-black">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-1 hover:scale-110 active:scale-95 transition-all text-black"
                    >
                        <X size={28} strokeWidth={4} />
                    </button>
                    <button 
                        onClick={() => handleNav('home')}
                        className="text-xl font-black italic uppercase tracking-tighter leading-none text-black ml-1 cursor-pointer transition-transform active:scale-95"
                    >
                        FADEZONE
                    </button>
                </div>
                <button onClick={() => handleNav('staff')} className="p-1 active:scale-95 transition-transform">
                    <User size={26} strokeWidth={3} className="text-black" />
                </button>
            </header>

            <div className="flex-1 flex flex-col p-10 pt-16 overflow-y-auto">
                <div className="space-y-8">
                    {navItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id as ViewType)}
                            style={{ transitionDelay: isMenuOpen ? `${index * 75 + 100}ms` : '0ms' }}
                            className={`group flex items-center gap-6 w-full text-left transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'} ${activeView === item.id ? 'translate-x-4' : ''}`}
                        >
                            <div className={`p-3 border-2 border-black transition-transform group-hover:scale-110 group-active:scale-95 shadow-solid-4px ${activeView === item.id ? 'bg-black text-[#FFD700]' : 'bg-white text-black'}`}>
                                <item.icon size={24} strokeWidth={4} />
                            </div>
                            <span className={`text-5xl font-black italic uppercase tracking-tighter transition-colors group-hover:text-red-600 ${activeView === item.id ? 'text-red-600' : 'text-black'}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
                
                <div 
                    style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
                    className={`mt-auto border-t-4 border-black pt-8 pb-8 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                    <p className="text-sm font-black italic uppercase mb-2">MASTER BARBER ON CALL</p>
                    <p className="text-3xl font-black tracking-widest hover:text-red-600 transition-colors cursor-pointer text-black">081 268 7806</p>
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-x-hidden bg-[#F2F2F2] border-x-4 border-b-4 border-black shadow-solid-6px">
          {children}
        </main>
      </div>
    </div>
  );
};


export default Layout;

