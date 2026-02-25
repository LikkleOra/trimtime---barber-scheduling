import React from 'react';
import { Star, ChevronLeft } from 'lucide-react';

interface Review {
    _id: string;
    rating: number;
    comment: string;
    imageUrl?: string | null;
    createdAt: number;
}

interface GalleryProps {
    reviews: Review[];
    onBack: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ reviews, onBack }) => {
    return (
        <div className="bg-black min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-8">
                    <div className="space-y-4">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-3 text-[#fbd600] font-black uppercase text-xs tracking-[0.3em] hover:text-white transition-colors"
                        >
                            <ChevronLeft size={20} /> Back Home
                        </button>
                        <h2 className="text-5xl md:text-7xl font-brand italic uppercase text-white tracking-tighter leading-tight">
                            Legendary<br />
                            <span className="text-[#b32b2b]">Vibes</span>
                        </h2>
                        <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">
                            See what our community has to say about the Fadezone experience.
                        </p>
                    </div>
                </div>

                {reviews.length === 0 ? (
                    <div className="bg-zinc-900 border border-zinc-800 p-12 text-center rounded-[2rem]">
                        <p className="text-white text-xl font-bold uppercase tracking-widest">No reviews yet.</p>
                        <p className="text-[#fbd600] mt-2 font-black uppercase text-sm tracking-widest">Be the first to share your experience!</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {reviews.map((review) => (
                            <div key={review._id} className="break-inside-avoid bg-zinc-900 p-6 rounded-3xl border border-white/5 shadow-2xl space-y-4 hover:border-[#fbd600]/30 transition-all">
                                {review.imageUrl && (
                                    <div className="relative w-full overflow-hidden rounded-2xl mb-4 group aspect-video">
                                        <img
                                            src={review.imageUrl}
                                            alt="Review Image"
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                )}
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={16}
                                            fill={star <= review.rating ? '#fbd600' : 'transparent'}
                                            className={star <= review.rating ? 'text-[#fbd600]' : 'text-zinc-700'}
                                        />
                                    ))}
                                </div>
                                <p className="text-zinc-300 font-bold italic leading-relaxed text-sm md:text-base">"{review.comment}"</p>
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] border-t border-zinc-800 pt-4">
                                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
