"use client";

import { useState, useEffect } from 'react';

type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  timestamp?: string;
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      }
    }
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text || rating === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, text, rating }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
        setName('');
        setText('');
        setRating(0);
        setHoverRating(0);
        setCurrentIndex(0); // Jump back to the newest review
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSlide = () => {
    if (currentIndex + 3 < reviews.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <section id="testimonials" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center text-[#8A2BE2] mb-12 tracking-widest uppercase drop-shadow-md">
          Testimonials
        </h2>

        {/* Carousel Section */}
        <div className="relative mb-20 min-h-[200px] flex items-center justify-center">
          {reviews.length === 0 ? (
            <div className="text-center text-zinc-500 italic text-lg">
              No reviews yet. Be the first to share your experience!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 md:gap-6 w-full">
              {/* Prev Button */}
              {reviews.length > 3 && (
                <button 
                  onClick={prevSlide} 
                  disabled={currentIndex === 0} 
                  className="text-[#8A2BE2] disabled:opacity-20 hover:text-white transition-colors p-2"
                  aria-label="Previous Reviews"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {visibleReviews.map((review) => (
                  <div key={review.id} className="bg-zinc-950 border border-zinc-800 p-8 rounded-md shadow-lg flex flex-col transform transition-all hover:scale-[1.02] duration-300">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 drop-shadow-[0_0_2px_rgba(250,204,21,0.8)]' : 'text-zinc-800'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-zinc-300 flex-grow italic mb-6 leading-relaxed">"{review.text}"</p>
                    <p className="text-[#8A2BE2] font-bold uppercase tracking-widest text-sm">- {review.name}</p>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              {reviews.length > 3 && (
                <button 
                  onClick={nextSlide} 
                  disabled={currentIndex + 3 >= reviews.length} 
                  className="text-[#8A2BE2] disabled:opacity-20 hover:text-white transition-colors p-2"
                  aria-label="Next Reviews"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Leave a Review Form */}
        <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 p-8 rounded-md relative overflow-hidden">
          {/* Subtle gradient background accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8A2BE2] to-transparent opacity-50"></div>
          
          <h3 className="text-2xl text-center text-white mb-8 uppercase tracking-wide font-bold">
            Leave a review.
          </h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
            
            {/* Star Rating Input */}
            <div className="flex gap-2 mb-2" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  className="focus:outline-none transition-transform hover:scale-125 duration-200"
                  aria-label={`Rate ${star} stars`}
                >
                  <svg
                    className={`w-10 h-10 ${
                      star <= (hoverRating || rating) 
                        ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' 
                        : 'text-zinc-800'
                    } transition-colors duration-200`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-zinc-800 text-white rounded-md px-5 py-4 focus:outline-none focus:border-[#8A2BE2] transition-colors"
              required
            />
            
            <textarea
              placeholder="Tell us about your experience..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-black border border-zinc-800 text-white rounded-md px-5 py-4 h-32 resize-none focus:outline-none focus:border-[#8A2BE2] transition-colors"
              required
            />

            <button
              type="submit"
              disabled={!name || !text || rating === 0 || isSubmitting}
              className="w-full px-8 py-4 bg-[#8A2BE2] text-white font-bold rounded-md uppercase tracking-wider hover:bg-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#8A2BE2] shadow-[0_0_15px_rgba(138,43,226,0.3)] hover:shadow-[0_0_25px_rgba(138,43,226,0.5)]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
