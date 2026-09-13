import React from 'react';

export default function WorkflowProcess() {
  const steps = [
    {
      number: "// STEP 01",
      title: "Analysis",
      description: "We map your existing processes to identify bottlenecks and growth opportunities.",
      phase: "[ Phase 01: Audit ]"
    },
    {
      number: "// STEP 02",
      title: "Prototyping",
      description: "We prepare a technical concept with a clearly defined scope and expected business value.",
      phase: "[ Phase 02: Architecture ]"
    },
    {
      number: "// STEP 03",
      title: "Implementation",
      description: "We develop the custom solution and integrate it seamlessly with your existing tools.",
      phase: "[ Phase 03: Engineering ]"
    },
    {
      number: "// STEP 04",
      title: "Support",
      description: "We provide team training, ongoing system monitoring, and infrastructure scalability.",
      phase: "[ Phase 04: Maintenance ]"
    }
  ];

  return (
    <section id="workflow" className="py-20 sm:py-28 bg-white relative z-10 border-duna-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-duna-dark">
            How does it work?
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-duna-offwhite rounded-xl p-7 border border-duna-border flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-duna-dark mb-3">{step.title}</h3>
                <p className="text-duna-muted text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-duna-border text-[11px] text-gray-500">
                {step.phase}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
