import React, { useState } from 'react';
import { Star, MessageSquare, ChevronLeft, Send } from 'lucide-react';

const ReviewPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for saving review will go here
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center space-y-6">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star size={40} className="text-black" fill="black" />
                </div>
                <h2 className="text-3xl font-brand italic uppercase">Lekker Nev!</h2>
                <p className="text-zinc-500 text-sm">Thanks for keeping the vibe alive. Your review is live!</p>
                <button
                    onClick={onBack}
                    className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest"
                >
                    Back to Styles
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8">
            <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-black">
                <ChevronLeft size={16} /> Back
            </button>

            <div className="space-y-2">
                <h2 className="text-4xl font-brand italic uppercase tracking-tighter text-white">Share the<br />Vibe</h2>
                <p className="text-zinc-500 text-sm">Tell the community about your legendary cut at Nev's.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">How's the cut?</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(s => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setRating(s)}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${rating >= s ? 'bg-yellow-400 text-black' : 'bg-zinc-900 text-zinc-700'
                                    }`}
                            >
                                <Star size={20} fill={rating >= s ? 'black' : 'none'} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Your Feedback</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What a vibe! The fade is legendary..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-white min-h-[150px] focus:outline-none focus:border-yellow-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3"
                >
                    Post Review <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ReviewPage;
