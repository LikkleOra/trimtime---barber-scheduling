import React, { useState } from 'react';
import { User, Lock, Phone, User as UserIcon, Loader2 } from 'lucide-react';
import { authService } from '../services/authService';

interface AuthScreenProps {
    onAuthComplete: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthComplete }) => {
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleClientLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name || !phone) {
            setError('Please fill in all fields');
            return;
        }

        // Basic phone validation (at least 10 digits)
        const phoneRegex = /^[0-9+\s-]{10,}$/;
        if (!phoneRegex.test(phone)) {
            setError('Invalid phone number');
            return;
        }

        setIsLoading(true);
        try {
            await authService.login(phone, name);
            onAuthComplete();
        } catch (err) {
            console.error('Login failed:', err);
            setError('Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await authService.adminLogin(password);
            if (user) {
                onAuthComplete();
            }
        } catch (err: any) {
            setError(err.message || 'Invalid admin password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl font-brand italic uppercase tracking-tighter text-white">
                        {isAdminMode ? 'Admin Access' : 'Welcome to TrimTime'}
                    </h2>
                    <p className="text-zinc-500 text-sm mt-2">
                        {isAdminMode ? 'Enter password to access dashboard' : 'Please enter your details to continue'}
                    </p>
                </div>

                <form onSubmit={isAdminMode ? handleAdminLogin : handleClientLogin} className="space-y-4">
                    {!isAdminMode ? (
                        <>
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#FFC107] transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#FFC107] transition-colors"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                            <input
                                type="password"
                                placeholder="Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#FFC107] transition-colors"
                            />
                        </div>
                    )}

                    {error && <p className="text-red-500 text-xs text-center font-bold uppercase">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#FFC107] text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                {isAdminMode ? 'Authenticating...' : 'Processing...'}
                            </>
                        ) : (
                            isAdminMode ? 'Login as Admin' : 'Start Booking'
                        )}
                    </button>
                </form>

                <div className="text-center pt-8">
                    <button
                        onClick={() => { setIsAdminMode(!isAdminMode); setError(''); }}
                        className="text-zinc-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                        {isAdminMode ? 'Back to Client Booking' : 'Are you Nev? (Admin Login)'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
