import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const fgRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate relative scroll progress inside viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const scrollOffset = windowHeight - rect.top;

        if (bgRef.current) {
          // Background layer moves slower (depth effect)
          bgRef.current.style.transform = `translate3d(0, ${scrollOffset * 0.1}px, 0)`;
        }
        if (fgRef.current) {
          // Foreground layer moves faster for 3D parallax depth
          fgRef.current.style.transform = `translate3d(0, ${scrollOffset * 0.22}px, 0)`;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 sm:py-36 overflow-hidden z-10 bg-duna-offwhite border-duna-border">

      {/* 1. Background Parallax Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-90 transition-transform ease-out duration-75"
        style={{
          backgroundImage: "url('/images/CTA-background.png')",
          willChange: 'transform'
        }}
      />

      {/* 2. Foreground Parallax Layer */}
      <div
        ref={fgRef}
        className="absolute inset-0 bg-cover bg-bottom pointer-events-none z-10 opacity-95 transition-transform ease-out duration-75"
        style={{
          backgroundImage: "url('/images/CTA-foreground.png')",
          willChange: 'transform'
        }}
      />

      {/* Soft Ambient Fade Mask to maintain high legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/70 pointer-events-none z-15" />

      {/* 3. Form Content Container Layer */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-duna-dark mb-4 drop-shadow-sm">
            Get started
          </h2>
          <p className="text-duna-dark/80 font-normal text-base sm:text-lg">
            Fill out the form and we will reach out to you soon.
          </p>
        </div>

        {/* Centered Form Container */}
        <div className="max-w-xl mx-auto">
          {!submitted ? (
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Name * */}
              <div>
                <input
                  type="text"
                  required
                  placeholder="Name *"
                  className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-gray-300/90 rounded-2xl text-duna-dark placeholder-gray-500 focus:outline-none focus:border-black text-base transition-colors shadow-sm"
                />
              </div>

              {/* Business email * */}
              <div>
                <input
                  type="email"
                  required
                  placeholder="Business email *"
                  className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-gray-300/90 rounded-2xl text-duna-dark placeholder-gray-500 focus:outline-none focus:border-black text-base transition-colors shadow-sm"
                />
              </div>

              {/* Phone number */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-gray-300/90 rounded-2xl text-duna-dark placeholder-gray-500 focus:outline-none focus:border-black text-base transition-colors shadow-sm"
                />
              </div>

              {/* How did you hear about us? (Select) */}
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-1.5 pl-1">
                  How did you hear about us?
                </label>
                <div className="relative">
                  <select
                    defaultValue="Google search"
                    className="w-full px-5 py-3.5 bg-[#f4f2ed]/90 backdrop-blur-md border-none rounded-2xl text-duna-dark text-base appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/10 pr-12 transition-colors shadow-sm"
                  >
                    <option value="Google search">Google search</option>
                    <option value="Social media">Social media</option>
                    <option value="Recommendation">Recommendation</option>
                    <option value="Article / News">Article / News</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* How can we help? */}
              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help?"
                  className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-gray-300/90 rounded-2xl text-duna-dark placeholder-gray-500 focus:outline-none focus:border-black text-base transition-colors resize-y shadow-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="bg-[#1c1917] hover:bg-black text-white font-medium text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer inline-flex items-center justify-center min-w-[200px]"
                >
                  Schedule a demo
                </button>
              </div>

            </form>
          ) : (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 text-center border border-gray-200 shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-duna-dark">Request Received!</h3>
              <p className="text-duna-muted text-base">Thank you for reaching out. We will review your request and get back to you shortly.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
