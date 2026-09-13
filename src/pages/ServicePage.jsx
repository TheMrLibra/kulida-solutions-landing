import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import ContactSection from '../components/ContactSection';

export default function ServicePage() {
  const { slug } = useParams();

  const service = servicesData.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-duna-dark mb-4">Service Not Found</h1>
        <p className="text-duna-muted mb-6 text-xs">[ 404_ROUTE_NOT_MATCHED ]</p>
        <Link to="/" className="bg-duna-dark text-white px-5 py-2.5 rounded-[10rem] text-sm font-medium">
          Return to Home
        </Link>
      </div>
    );
  }

  const Icon = service.icon;
  const currentIndex = servicesData.findIndex((s) => s.slug === slug);
  const prevService = servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];

  return (
    <div className="pt-24 pb-16">

      {/* ========================================== */}
      {/* BREADCRUMB & HERO                          */}
      {/* ========================================== */}
      <section className="py-12 md:py-20 bg-duna-offwhite border-duna-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-duna-muted mb-8 font-medium">
            <Link to="/" className="hover:text-duna-dark transition-colors">[ HOME ]</Link>
            <span>/</span>
            <Link to="/" className="hover:text-duna-dark transition-colors">[ EXPERTISE ]</Link>
            <span>/</span>
            <span className="text-duna-dark font-semibold">[ {service.id} {service.title.toUpperCase()} ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-duna-border text-[11px] duna-badge text-duna-blue mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-duna-blue animate-pulse"></span>
                {service.badge}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-duna-dark leading-[1.1] mb-6">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-duna-muted font-normal leading-relaxed mb-8 max-w-2xl">
                {service.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a href="#contact" className="bg-duna-dark hover:bg-black text-white text-sm font-medium px-6 py-3 rounded-[10rem] shadow-duna hover:shadow-duna-hover transition-all duration-200 text-center flex items-center justify-center gap-2 group">
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link to="/" className="bg-white/90 hover:bg-white text-duna-dark border border-duna-border text-sm font-medium px-6 py-3 rounded-[10rem] shadow-sm hover:shadow transition-all duration-200 text-center backdrop-blur-sm">
                  View All Services
                </Link>
              </div>
            </div>

            {/* Clinical Technical Specs Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl border border-duna-border p-6 shadow-duna-hover">
                <div className="flex items-center justify-between pb-4 mb-4 border-gray-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-duna-blue" />
                    <span className="font-semibold text-duna-dark">// TECH_SPECIFICATIONS</span>
                  </div>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">VERIFIED</span>
                </div>

                <div className="space-y-4 text-xs">
                  {service.techSpecs.map((spec, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-duna-surface border border-duna-border flex flex-col justify-between gap-1">
                      <span className="text-gray-400 uppercase text-[10px]">// {spec.label}</span>
                      <span className="text-duna-dark font-semibold text-xs">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* CORE CAPABILITIES                          */}
      {/* ========================================== */}
      <section className="py-20 bg-white border-duna-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-duna-surface border border-duna-border text-[11px] duna-badge text-duna-muted mb-4">
              [ Capabilities ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-duna-dark">
              Enterprise features designed for measurable ROI.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feat, idx) => (
              <div key={idx} className="bg-duna-offwhite rounded-xl p-7 border border-duna-border flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white text-duna-blue flex items-center justify-center shrink-0 border border-duna-border mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-duna-dark mb-2">{feat.title}</h3>
                  <p className="text-duna-muted text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SERVICE WORKFLOW PROCESS                   */}
      {/* ========================================== */}
      <section className="py-20 bg-duna-offwhite border-duna-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-duna-border text-[11px] duna-badge text-duna-blue mb-4 shadow-sm">
              [ Implementation Roadmap ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-duna-dark">
              How we execute {service.title}.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-duna-border flex flex-col justify-between shadow-duna">
                <div>
                  <div className="text-[11px] font-semibold text-duna-blue uppercase tracking-widest mb-3">
                    // PHASE {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-duna-dark mb-2">{step.title}</h3>
                  <p className="text-duna-muted text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* NEXT / PREVIOUS SERVICE NAVIGATOR          */}
      {/* ========================================== */}
      <section className="py-12 bg-white border-duna-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
            <Link
              to={`/services/${prevService.slug}`}
              className="flex items-center gap-2 text-duna-muted hover:text-duna-dark transition-colors p-3.5 px-6 rounded-[10rem] bg-duna-surface border border-duna-border w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← PREV: {prevService.title}</span>
            </Link>

            <Link
              to={`/services/${nextService.slug}`}
              className="flex items-center gap-2 text-duna-muted hover:text-duna-dark transition-colors p-3.5 px-6 rounded-[10rem] bg-duna-surface border border-duna-border w-full sm:w-auto justify-center"
            >
              <span>NEXT: {nextService.title} →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* CONTACT SECTION                            */}
      {/* ========================================== */}
      <ContactSection />

    </div>
  );
}
