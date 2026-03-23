
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
    { id: 'about', icon: Info, label: 'OUR STORY' },
    { id: 'contacts', icon: MapPin, label: 'REACH US' },
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
             <h1 className="text-xl font-black italic uppercase tracking-tighter leading-none text-black ml-1">
                FADEZONE
             </h1>
          </div>

          <button onClick={() => handleNav('staff')} className="p-1 active:scale-95 transition-transform">
              <User size={26} strokeWidth={3} className="text-black" />
          </button>
        </header>

        {/* NEO-BRUTALIST MENU OVERLAY */}
        {isMenuOpen && (
            <div className="fixed inset-0 z-[100] bg-[#FFD700] flex flex-col p-10 pt-24 animate-in fade-in slide-in-from-top duration-200 h-full max-w-[450px] left-1/2 -translate-x-1/2">
                <div className="space-y-6">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id as ViewType)}
                            className={`flex items-center gap-6 w-full text-left transition-all ${activeView === item.id ? 'translate-x-4' : ''}`}
                        >
                            <div className={`p-3 border-2 border-black shadow-solid-4px ${activeView === item.id ? 'bg-black text-[#FFD700]' : 'bg-white text-black'}`}>
                                <item.icon size={24} strokeWidth={4} />
                            </div>
                            <span className={`text-4xl font-black italic uppercase tracking-tighter hover:text-red-600 ${activeView === item.id ? 'text-red-600' : 'text-black'}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
                
                <div className="mt-auto border-t-4 border-black pt-8">
                    <p className="text-sm font-black italic uppercase mb-2">MASTER BARBER ON CALL</p>
                    <p className="text-3xl font-black tracking-widest text-black/40">081 268 7806</p>
                </div>
            </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-x-hidden bg-[#F2F2F2] border-x-4 border-b-4 border-black shadow-solid-6px">
          {children}
        </main>
      </div>
    </div>
  );
};


export default Layout;

