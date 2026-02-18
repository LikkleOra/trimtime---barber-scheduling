import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, Send, Loader2, Camera, X } from 'lucide-react';

interface ReviewPageProps {
    onBack: () => void;
    onSubmitReview: (review: { rating: number; comment: string; image?: File | null }) => Promise<void> | void;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ onBack, onSubmitReview }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!comment.trim()) {
            setError('Please share a few words about your experience');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmitReview({ rating, comment: comment.trim(), image });
            setSubmitted(true);
        } catch (err) {
            console.error('Failed to submit review:', err);
            setError('Failed to post review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#fbd600] flex flex-col items-center justify-center p-6 text-center space-y-6">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-2xl">
                    <Star size={48} className="text-[#fbd600]" fill="#fbd600" />
                </div>
                <h2 className="text-4xl md:text-6xl font-brand italic uppercase text-[#b32b2b]">Lekker!</h2>
                <p className="text-black font-black uppercase tracking-widest text-xs">Thanks for keeping the vibe alive. Your review is live!</p>
                <button
                    onClick={onBack}
                    className="bg-black text-[#fbd600] px-12 py-4 rounded-full font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:scale-105 transition-transform"
                >
                    Back to Styles
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#fbd600] min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-xl mx-auto space-y-8">
                <button onClick={onBack} className="flex items-center gap-3 text-black font-black uppercase text-xs tracking-[0.3em] hover:text-[#b32b2b] transition-colors">
                    <ChevronLeft size={20} /> Back to Styles
                </button>

                <div className="text-center space-y-2">
                    <h2 className="text-5xl md:text-7xl font-brand italic uppercase text-[#b32b2b] tracking-tighter leading-tight">Share the<br />Vibe</h2>
                    <p className="text-black/60 font-black uppercase tracking-widest text-[10px]">Tell the community about your legendary cut at Fadezone.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 border-black space-y-8">
                    <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase tracking-widest text-[#b32b2b]">1. Rate the Fade</label>
                        <div className="flex justify-between">
                            {[1, 2, 3, 4, 5].map(s => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setRating(s)}
                                    className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all border-2 border-black ${rating >= s ? 'bg-black text-[#fbd600]' : 'bg-white text-zinc-300'
                                        }`}
                                >
                                    <Star size={24} fill={rating >= s ? '#fbd600' : 'none'} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase tracking-widest text-[#b32b2b]">2. Your Thoughts</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What a vibe! The fade is legendary..."
                            className="w-full bg-zinc-50 border-2 border-black p-6 text-black font-bold focus:outline-none focus:bg-white disabled:opacity-50 min-h-[150px]"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[12px] font-black uppercase tracking-widest text-[#b32b2b]">3. Show the Cut</label>
                        <div className="flex flex-col gap-4">
                            {!imagePreview ? (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full border-2 border-dashed border-black/20 py-10 flex flex-col items-center justify-center gap-2 hover:bg-zinc-50 transition-colors bg-zinc-50/50"
                                >
                                    <Camera size={32} className="text-zinc-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Upload Image</span>
                                </button>
                            ) : (
                                <div className="relative aspect-video w-full border-2 border-black overflow-hidden group">
                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-black text-white p-2 rounded-full hover:bg-[#b32b2b] transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    {error && <p className="text-[#b32b2b] text-[10px] font-black uppercase text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-[#fbd600] py-6 font-black uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(179,43,43,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:bg-zinc-800 disabled:text-zinc-600 active:scale-95"
                    >
                        {isSubmitting ? (
                            <>Posting... <Loader2 className="animate-spin" size={20} /></>
                        ) : (
                            <>Post Review <Send size={20} /></>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewPage;
