import React from 'react';
import { Booking } from '../types';
import { bookingService } from '../services/bookingService';
import { Check, X, Clock, User } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const bookings = bookingService.getBookings();

    const handleStatusChange = (id: string, status: 'confirmed' | 'cancelled') => {
        bookingService.updateBookingStatus(id, status);
    };

    return (
        <div className="p-6 space-y-8 pb-24">
            <div className="space-y-2">
                <h2 className="text-3xl font-brand italic uppercase">Admin Dashboard</h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Manage your bookings & reviews</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-widest border-b border-zinc-900 pb-2">Upcoming Appointments</h3>
                {bookings.length === 0 ? (
                    <p className="text-zinc-600 italic text-sm py-4">No bookings yet...</p>
                ) : (
                    <div className="space-y-4">
                        {bookings.map(b => (
                            <div key={b.id} className="bg-zinc-900/50 p-6 border border-zinc-800 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-yellow-400" />
                                            <span className="font-black uppercase text-sm tracking-wider">{b.customerName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase">
                                            <Clock size={12} />
                                            <span>{b.date} • {b.time}</span>
                                        </div>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded ${b.status === 'confirmed' ? 'bg-green-500/20 text-green-500' :
                                        b.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                            'bg-red-500/20 text-red-500'
                                        }`}>
                                        {b.status}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleStatusChange(b.id, 'confirmed')}
                                        className="flex-1 bg-green-600 text-white py-2 rounded font-black uppercase text-[10px] flex items-center justify-center gap-1"
                                    >
                                        <Check size={14} /> Confirm
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(b.id, 'cancelled')}
                                        className="flex-1 bg-zinc-800 text-white py-2 rounded font-black uppercase text-[10px] flex items-center justify-center gap-1"
                                    >
                                        <X size={14} /> Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
