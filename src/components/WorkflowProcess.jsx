import React, { useState, useEffect, useRef } from 'react';

export default function WorkflowProcess() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const steps = [
    {
      number: "01",
      title: "Analysis",
      description: "We map your existing processes to identify bottlenecks and growth opportunities."
    },
    {
      number: "02",
      title: "Prototyping",
      description: "We prepare a technical concept with a clearly defined scope and expected business value."
    },
    {
      number: "03",
      title: "Implementation",
      description: "We develop the custom solution and integrate it seamlessly with your existing tools."
    },
    {
      number: "04",
      title: "Support",
      description: "We provide team training, ongoing system monitoring, and infrastructure scalability."
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="py-20 sm:py-28 bg-white relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className={`max-w-3xl mb-16 sm:mb-20 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-duna-dark leading-tight">
            How does it work?
          </h2>
        </div>

        {/* Continuous Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative">

          {/* Continuous Base Horizontal Line Across All Columns (Animated draw from left to right) */}
          <div
            className={`absolute top-0 left-0 right-0 h-[1px] bg-gray-200 origin-left transition-transform duration-1000 ease-out pointer-events-none ${isVisible ? 'scale-x-100' : 'scale-x-0'
              }`}
          />

          {steps.map((step, idx) => {
            const delay = 300 + idx * 200;

            return (
              <div
                key={idx}
                className={`relative pt-6 lg:pt-8 text-left transition-all duration-700 transform ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                  }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Round Bullet Node Marker (Animated pop-in when line reaches it) */}
                <div
                  className={`absolute -top-[4px] left-0 w-2.5 h-2.5 bg-gray-900 rounded-full z-10 transition-transform duration-500 ease-out ${isVisible ? 'scale-100' : 'scale-0'
                    }`}
                  style={{ transitionDelay: `${delay}ms` }}
                />

                {/* Step Number (01, 02, 03, 04) in Monospace */}
                <div className="font-mono text-xs text-gray-400 font-medium mb-3">
                  {step.number}
                </div>

                {/* Step Title (e.g. Analysis, Prototyping) */}
                <h3 className="text-2xl font-medium tracking-tight text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
