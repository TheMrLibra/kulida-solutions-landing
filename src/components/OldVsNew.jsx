import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OldVsNew() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  const transformations = [
    {
      id: "01",
      oldText: "Siloed systems",
      newText: "Integrated cloud infrastructure"
    },
    {
      id: "02",
      oldText: "Manual data entry",
      newText: "Automated workflows"
    },
    {
      id: "03",
      oldText: "Undocumented processes",
      newText: "AI-assisted operations"
    },
    {
      id: "04",
      oldText: "Slow response times",
      newText: "Real-time insights"
    }
  ];

  // Auto-cycle through items every 4 seconds unless user interacts
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % transformations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, transformations.length]);

  const activeItem = transformations[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="pt-8 sm:pt-12 pb-20 sm:pb-28 bg-white relative z-10 border-b border-duna-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Item Showcase Card */}
        <div className={`bg-[#FBFBF9] border border-gray-200/80 rounded-3xl p-8 sm:p-12 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>

          {/* Header Controls: Step Tabs (01..04) & Arrow Buttons */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/70">
            <div className="flex items-center gap-2 sm:gap-3">
              {transformations.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? 'bg-duna-dark text-white font-semibold shadow-sm scale-105'
                    : 'bg-white text-gray-400 hover:text-gray-700 border border-gray-200/80'
                    }`}
                >
                  {item.id}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous transformation"
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-duna-dark hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next transformation"
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-duna-dark hover:text-white transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Single Item Transformation - Equal Spacing Flex Layout */}
          <div key={currentIndex} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 py-4 min-h-[160px]">

            {/* Left: The Old Way (Right-aligned to arrow on desktop for symmetrical spacing) */}
            <div className="flex-1 text-left md:text-right transition-all duration-500">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2">
                THE OLD WAY
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-400 line-through decoration-gray-300 leading-snug">
                {activeItem.oldText}
              </h3>
            </div>

            {/* Center: Vector Static Transformation Arrow */}
            <div className="shrink-0 flex items-center justify-center py-2 md:py-0 self-start md:self-center">
              <div className="relative flex items-center justify-center w-20 sm:w-28 h-8">
                <svg
                  className="w-full h-full text-duna-dark overflow-visible"
                  viewBox="0 0 120 24"
                  fill="none"
                >
                  {/* Base Track */}
                  <line
                    x1="6"
                    y1="12"
                    x2="102"
                    y2="12"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Active Vector Arrow Shaft Line */}
                  <line
                    x1="6"
                    y1="12"
                    x2="102"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Vector Arrow Head */}
                  <path
                    d="M 93 5 L 105 12 L 93 19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Right: The New Way (Left-aligned to arrow) */}
            <div className="flex-1 text-left transition-all duration-500">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-900 font-semibold block mb-2">
                THE NEW WAY
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-duna-dark leading-snug">
                {activeItem.newText}
              </h3>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
