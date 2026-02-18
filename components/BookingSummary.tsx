
import React from 'react';
import { Service } from '../types';
import { Phone, MessageSquare } from 'lucide-react';

interface BookingSummaryProps {
  service: Service;
  time: string;
  date: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onNotesChange: (val: string) => void;
  onConfirm: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  service, time, date, customerName, customerPhone, notes,
  onNameChange, onPhoneChange, onNotesChange, onConfirm
}) => {
  const isFormValid = customerName.trim() && customerPhone.trim();

  return (

    <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-10">
      {/* Receipt Card - Redesigned to match screenshot 135050 */}
      <div className="bg-[#111] border-2 border-[#FFC107] p-8 space-y-6 relative overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-dashed border-zinc-800 pb-6">
          <div>
            <h3 className="text-3xl font-brand italic uppercase text-white tracking-tighter">Booking Summary</h3>
            <p className="text-[10px] font-black text-zinc-500 uppercase mt-1 tracking-widest">Ref: #FZ-{Math.floor(Math.random() * 9000) + 1000}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rotate-1">
            <span className="text-[10px] font-black uppercase text-[#FFC107] tracking-widest">Johannesburg</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-8 py-4">
          {/* Service */}
          <div className="space-y-1">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Service</p>
            <p className="text-xl font-brand italic text-white uppercase leading-none tracking-tight">{service.name}</p>
            <p className="text-[10px] font-bold text-zinc-500 uppercase">{service.duration} Mins • Master Barber</p>
          </div>

          {/* Price */}
          <div className="space-y-1 text-right">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Total</p>
            <p className="text-3xl font-brand italic text-[#FFC107] leading-none">R{service.price}</p>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Date</p>
            <p className="text-lg font-black text-white uppercase tracking-tight">{date}</p>
          </div>

          {/* Time */}
          <div className="space-y-1 text-right">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Time</p>
            <p className="text-lg font-black text-white uppercase tracking-tight">{time}</p>
          </div>
        </div>

        {/* Location Box */}
        <div className="bg-zinc-900/50 p-4 border border-zinc-800 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FFC107] flex items-center justify-center text-black font-black italic rounded-lg">
            LOC
          </div>
          <div>
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Grooming HQ</p>
            <p className="text-xs font-bold text-white uppercase tracking-wider">424 Commissioner St, Kensington</p>
          </div>
        </div>

        {/* Barcode / Footer */}
        <div className="border-t border-dashed border-zinc-800 pt-6 text-center space-y-2">
          <div className="h-8 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gYIFgo2jU95yQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAASSURBVAjXY2BgYHBgYGBgYAAAAAUAAc1ibO4AAAAASUVORK5CYII=')] opacity-30 bg-repeat-x"></div>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.5em]">Authentic Fadezone Experience</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4 px-2">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Your Name</label>
          <input
            type="text"
            placeholder="ENTER FULL NAME"
            value={customerName}
            onChange={(e) => onNameChange(e.target.value.toUpperCase())}
            className="w-full bg-white border-4 border-black p-4 text-sm font-black tracking-widest uppercase focus:outline-none focus:border-[#FFC107] focus:bg-zinc-50 transition-all placeholder:text-zinc-300 text-black"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Mobile Number</label>
          <input
            type="tel"
            placeholder="08X XXX XXXX"
            value={customerPhone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="w-full bg-white border-4 border-black p-4 text-sm font-black tracking-widest uppercase focus:outline-none focus:border-[#FFC107] focus:bg-zinc-50 transition-all placeholder:text-zinc-300 text-black"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-2 pt-4">
        <button className="w-20 bg-zinc-900 flex items-center justify-center border-2 border-zinc-800 hover:border-white transition-colors group">
          <Phone size={24} className="text-zinc-500 group-hover:text-white transition-colors" />
        </button>
        <button
          disabled={!isFormValid}
          onClick={onConfirm}
          className={`flex-1 flex items-center justify-center gap-3 py-6 text-sm font-black uppercase tracking-widest transition-all
            ${isFormValid
              ? 'bg-[#25D366] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
              : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
        >
          <MessageSquare size={20} fill="currentColor" />
          Confirm Via WhatsApp
        </button>
      </div>

      <div className="text-[9px] text-center text-zinc-400 font-bold uppercase tracking-widest px-12 opacity-50">
        Strict 24h cancellation policy applies. Late arrivals may forfeit their slot.
      </div>
    </div>
  );
};

export default BookingSummary;
