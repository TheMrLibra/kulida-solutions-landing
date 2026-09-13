import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative pt-44 pb-24 md:pt-56 md:pb-12 lg:pt-64 overflow-hidden z-10 border-duna-border">
      {/* Parallax Background Painterly Canvas Layer */}
      <div
        className="absolute inset-0 bg-hero-painterly pointer-events-none"
        style={{
          transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
          willChange: 'transform'
        }}
      />

      {/* Gradient Fade Mask into Body Canvas */}
      <div className="absolute inset-0 hero-mask-gradient pointer-events-none z-10" />

      {/* Parallax Text & Content Layer */}
      <div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
        style={{
          transform: `translate3d(0, ${scrollY * 0.18}px, 0)`,
          opacity: Math.max(0, 1 - scrollY / 750),
          willChange: 'transform, opacity'
        }}
      >
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center lg:pt-32">

          {/* Headline (H1) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-duna-dark leading-[1.1] mb-6 text-center">
            Modern IT solutions and AI for your business growth.
          </h1>

          {/* Subheadline: Using custom .hero-subheadline class */}
          <p className="hero-subheadline text-duna-muted font-normal leading-relaxed mb-10 max-w-3xl mx-auto text-center">
            We transform companies through the cloud, intelligent automation, and custom systems. Eliminate routine and gain an edge with technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 w-full sm:w-auto">
            <a href="#contact" className="bg-duna-dark hover:bg-black text-white text-sm font-medium px-6 py-3 rounded-[10rem] shadow-duna hover:shadow-duna-hover transition-all duration-200 text-center flex items-center justify-center gap-2 group w-full sm:w-auto">
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
