import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe,
  CheckCircle2,
  Layers,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function ServicesBentoGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current || isProgrammaticScrollRef.current) return;
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const itemRect = el.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scrollToService = (index) => {
    if (index < 0 || index >= servicesData.length) return;

    setActiveIndex(index);
    isProgrammaticScrollRef.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const container = scrollContainerRef.current;
    const item = itemRefs.current[index];

    if (container && item) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const itemCenterOffset = (itemRect.top + itemRect.height / 2) - (containerRect.top + containerRect.height / 2);

      container.scrollTo({
        top: container.scrollTop + itemCenterOffset,
        behavior: 'smooth'
      });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 400);
  };

  const activeService = servicesData[activeIndex];
  const ActiveIcon = activeService.icon;
  const featureIcons = [Zap, ShieldCheck, Globe, CheckCircle2, Layers, Sparkles];

  return (
    <section id="services" className="py-20 sm:py-28 bg-duna-offwhite relative z-10 border-duna-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-duna-dark mb-3 leading-tight">
              Transform your enterprise with Kulida Services
            </h2>
            <p className="text-duna-muted text-base sm:text-lg">
              End-to-end cloud architecture, workflow automation, and custom AI platforms.
            </p>
          </div>

          <div>
            <Link
              to={`/services/${activeService.slug}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-duna-dark text-sm font-medium hover:bg-black hover:text-white transition-all duration-200 shadow-sm"
            >
              <span>Explore</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT COLUMN: Scrollable Services List Container */}
          <div className="lg:col-span-5 bg-[#f4f2ed] rounded-3xl p-6 sm:p-8 flex flex-col justify-center items-center relative overflow-hidden border border-black/5 shadow-inner min-h-[480px]">

            {/* Soft Ambient Inner Radial Light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.75)_0%,_transparent_70%)] pointer-events-none" />

            {/* Mobile Navigation Arrow Up */}
            <button
              type="button"
              onClick={() => scrollToService(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous service"
              className="lg:hidden absolute top-3 z-30 p-2 rounded-full bg-white/90 shadow-md text-duna-dark hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronUp className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="w-full max-h-[380px] overflow-y-auto space-y-3 py-16 px-2 scroll-smooth no-scrollbar relative z-10 text-center"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              {servicesData.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === activeIndex;

                return (
                  <div
                    key={item.id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    onClick={() => scrollToService(index)}
                    className={`scroll-snap-align-center transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 mx-auto max-w-xs sm:max-w-sm ${isActive
                      ? 'bg-white shadow-xl scale-105 rounded-2xl py-3.5 px-6 border border-black/5 font-semibold text-duna-dark text-base sm:text-lg z-20'
                      : 'opacity-45 hover:opacity-80 scale-95 py-2.5 px-4 rounded-xl text-gray-700 text-sm font-medium z-10'
                      }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-black text-white' : 'bg-gray-200/80 text-gray-600'}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="truncate">{item.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Navigation Arrow Down */}
            <button
              type="button"
              onClick={() => scrollToService(Math.min(servicesData.length - 1, activeIndex + 1))}
              disabled={activeIndex === servicesData.length - 1}
              aria-label="Next service"
              className="lg:hidden absolute bottom-3 z-30 p-2 rounded-full bg-white/90 shadow-md text-duna-dark hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* RIGHT COLUMN: Active Service Detailed Description */}
          <div className="lg:col-span-7 flex flex-col space-y-6">

            {/* Top Featured Capability Card */}
            <div className="bg-[#f4f2ed] rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-black text-white shadow-sm">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-gray-400">Featured Capability</div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-duna-dark">
                    {activeService.features[0]?.title || activeService.title}
                  </h3>
                </div>
              </div>
              <p className="text-duna-muted text-sm sm:text-base leading-relaxed">
                {activeService.features[0]?.desc || activeService.shortDescription}
              </p>
            </div>

            {/* Additional Features List */}
            <div className="space-y-3 pl-1">
              {activeService.features.slice(1).map((feature, fIndex) => {
                const FeatureIcon = featureIcons[fIndex % featureIcons.length];
                return (
                  <div
                    key={fIndex}
                    className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-white/80 transition-all duration-200 border border-transparent hover:border-gray-200/60"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 text-duna-dark mt-0.5">
                      <FeatureIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-duna-dark mb-0.5">
                        {feature.title}
                      </h4>
                      <p className="text-duna-muted text-xs sm:text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
