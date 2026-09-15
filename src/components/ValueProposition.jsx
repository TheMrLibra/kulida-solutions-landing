import React, { useState, useEffect, useRef } from 'react';
import { Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export default function ValueProposition() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // 0 when the slide's top first enters at the bottom of the viewport,
        // 1 by the time that top reaches the top of the viewport.
        const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
        setProgress(p);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Mist thickens as the slide fully enters, so the image only shows during
  // the transition and the copy always lands on near-opaque white.
  const mistOpacity = Math.pow(progress, 1.15) * 0.94;
  // Gentle parallax for the "moving forward" feel. Kept <= 0 (image only ever
  // shifts UP) so the exposed edge is always at the BOTTOM — which sits in the
  // opaque mist zone and is invisible — never a gap at the top seam.
  const parallaxY = -progress * 46;

  return (
    <section ref={sectionRef} id="value" style={{ marginTop: '-1px' }} className="relative z-10 overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 border-duna-border bg-white">
      {/* Continuation image — a closer view of the hero's river (parallax).
          Only ever shifts up, so the bottom (not the top seam) is what may
          expose an edge, and that sits under the opaque mist. */}
      <div
        className="absolute -inset-y-20 inset-x-0 bg-hero-continuation pointer-events-none"
        style={{ transform: `translate3d(0, ${parallaxY}px, 0)`, willChange: 'transform' }}
      />
      {/* Dispersion gradient: image at the top → white toward the content */}
      <div className="absolute inset-0 value-mist-gradient pointer-events-none" />
      {/* Scroll-driven mist: thickens as the slide fully enters. Uses the same
          top-transparent dispersion shape, so it whitens the image zone below
          the seam but NEVER the seam itself (which would make a white stripe). */}
      <div
        className="absolute inset-0 value-mist-gradient pointer-events-none"
        style={{ opacity: mistOpacity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Metadata Title Column */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-duna-dark leading-tight">
              Technology with measurable ROI.
            </h2>
          </div>

          {/* Right Paragraph & ROI Metrics Column */}
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-duna-muted font-normal leading-relaxed mb-10">
              We don't build tech for the sake of tech. We help businesses modernize their processes and infrastructure by designing stable architectures, connecting existing tools, and deploying practical AI solutions that save time, eliminate manual errors, and deliver a clear return on investment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-duna-border">
              <div className="p-3">
                <div className="mb-3 text-duna-dark bg-gray-100/80 p-3 rounded-2xl w-fit">
                  <Zap className="w-6 h-6 text-duna-dark" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-duna-dark">Faster Workflows</div>
                <div className="text-[11px] text-gray-500 mt-1">Eliminating administrative drag.</div>
              </div>

              <div className="p-3">
                <div className="mb-3 text-duna-dark bg-gray-100/80 p-3 rounded-2xl w-fit">
                  <ShieldCheck className="w-6 h-6 text-duna-dark" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-duna-dark">Smarter Insights</div>
                <div className="text-[11px] text-gray-500 mt-1">Data-driven decision making.</div>
              </div>

              <div className="p-3">
                <div className="mb-3 text-duna-dark bg-gray-100/80 p-3 rounded-2xl w-fit">
                  <TrendingUp className="w-6 h-6 text-duna-dark" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-duna-dark">Better Scalability</div>
                <div className="text-[11px] text-gray-500 mt-1">Adapt to changing needs.</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
