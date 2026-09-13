import React from 'react';
import { Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export default function ValueProposition() {
  return (
    <section id="value" className="py-20 sm:py-28 bg-white relative z-10 border-duna-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
