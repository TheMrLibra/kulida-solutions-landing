import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  Mic,
  FileText,
  ShieldCheck,
  Clock,
  Wrench,
  AlertCircle,
  FileCheck,
  Send,
  Sparkles,
  Smartphone,
  Play,
  Pause,
  RotateCcw,
  Camera,
  Layers,
  Search,
  Package,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Flame,
  ClipboardCheck,
  Zap,
  Building2,
  PhoneCall
} from 'lucide-react';

export default function FieldServiceAiPage() {
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Section 4 Interactive Demo States
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportState, setReportState] = useState('ready'); // 'idle' | 'generating' | 'ready' | 'approved'
  const [hoveredEntity, setHoveredEntity] = useState(null);
  const [showSignedToast, setShowSignedToast] = useState(false);

  // Parallax refs and states
  const problemSectionRef = useRef(null);
  const [problemProgress, setProblemProgress] = useState(0);

  const demoSectionRef = useRef(null);
  const [demoProgress, setDemoProgress] = useState(0);

  const trustSectionRef = useRef(null);
  const [trustProgress, setTrustProgress] = useState(0);

  const workflowRef = useRef(null);
  const [isWorkflowVisible, setIsWorkflowVisible] = useState(false);
  const [workflowProgress, setWorkflowProgress] = useState(0);

  const contactSectionRef = useRef(null);
  const contactBgRef = useRef(null);
  const contactFgRef = useRef(null);

  // SEO & Page Title initialization
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "AI Assistants for Field Service | Smarter Service Reports";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Custom AI assistants for field service teams. Turn technicians' voice notes into structured service reports, reduce paperwork, and get job details ready for invoicing."
      );
    }
  }, []);

  // Intersection Observer for Workflow steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWorkflowVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (workflowRef.current) {
      observer.observe(workflowRef.current);
    }

    return () => {
      if (workflowRef.current) observer.disconnect();
    };
  }, []);

  // Scroll listener for Parallax and Mist effects
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          // Parallax for Problem section
          if (problemSectionRef.current) {
            const rect = problemSectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
            setProblemProgress(p);
          }

          // Parallax for Demo section
          if (demoSectionRef.current) {
            const rect = demoSectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
            setDemoProgress(p);
          }

          // Parallax for Trust section
          if (trustSectionRef.current) {
            const rect = trustSectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
            setTrustProgress(p);
          }

          // Parallax for Workflow section
          if (workflowRef.current) {
            const rect = workflowRef.current.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
            setWorkflowProgress(p);
          }

          // Parallax for Contact section (Dual-layer cloud & mountain effect)
          if (contactSectionRef.current) {
            const rect = contactSectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight && rect.bottom >= 0) {
              const scrollOffset = windowHeight - rect.top;

              if (contactBgRef.current) {
                contactBgRef.current.style.transform = `translate3d(0, ${-scrollOffset * 0.08}px, 0)`;
              }
              if (contactFgRef.current) {
                contactFgRef.current.style.transform = `translate3d(0, ${-scrollOffset * 0.15}px, 0)`;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Simulated audio playback effect
  useEffect(() => {
    let interval = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Reset audio playback and approval state on scenario switch
  const handleScenarioChange = (index) => {
    setActiveScenarioIndex(index);
    setIsPlayingAudio(false);
    setAudioProgress(0);
    setReportState('ready');
    setHoveredEntity(null);
  };

  // Trigger report generation simulation
  const handleGenerateReport = () => {
    setIsGenerating(true);
    setReportState('generating');
    setTimeout(() => {
      setIsGenerating(false);
      setReportState('ready');
    }, 700);
  };

  // Trigger report approval
  const handleApproveReport = () => {
    setReportState('approved');
    setShowSignedToast(true);
    setTimeout(() => setShowSignedToast(false), 4000);
  };

  // Mist and Parallax calculations
  const problemMistOpacity = Math.pow(problemProgress, 1.15) * 0.94;
  const problemParallaxY = -problemProgress * 46;

  const demoMistOpacity = Math.pow(demoProgress, 1.15) * 0.94;
  const demoParallaxY = -demoProgress * 46;

  const trustMistOpacity = Math.pow(trustProgress, 1.15) * 0.94;
  const trustParallaxY = -trustProgress * 46;

  const workflowMistOpacity = Math.pow(workflowProgress, 1.15) * 0.94;
  const workflowParallaxY = -workflowProgress * 46;

  // 3 Illustrative Scenarios for Interactive Demonstration
  const demoScenarios = [
    {
      id: 'hvac',
      industry: 'Heat pumps & HVAC',
      icon: Flame,
      technician: 'Tom Henderson (Field Lead)',
      jobId: 'WO-4082',
      duration: '0:18',
      recordedTime: 'Today, 14:32',
      transcriptSegments: [
        { text: 'Serviced the heat pump.', entity: 'job' },
        { text: 'Replaced the filter.', entity: 'work' },
        { text: 'Three hours on site.', entity: 'labour' },
        { text: 'Used two metres of copper pipe.', entity: 'materials' },
        { text: 'The outdoor unit cable is damaged — recommend replacing it.', entity: 'followup' }
      ],
      report: {
        job: 'Heat pump service',
        customer: 'Oakwood Dental Practice',
        equipment: 'Daikin Altherma 3 (S/N: 2023-DK-8911)',
        workCompleted: 'Filter replaced; full annual inspection performed',
        timeOnSite: '3 hours',
        materials: 'Copper pipe — 2 m (15mm)',
        followUp: 'Replace damaged outdoor unit cable to avoid moisture fault',
        photosCount: 2,
        photos: ['Outdoor unit cable sheath', 'New filter installed'],
        customerSignature: 'Pending technician on-site review'
      }
    },
    {
      id: 'plumbing',
      industry: 'Plumbing & installations',
      icon: Wrench,
      technician: 'Dave Miller (Senior Plumber)',
      jobId: 'WO-1940',
      duration: '0:24',
      recordedTime: 'Today, 11:15',
      transcriptSegments: [
        { text: 'Replaced the leaking pressure relief valve on the main unvented cylinder.', entity: 'job' },
        { text: 'Tested at four bar.', entity: 'work' },
        { text: 'Two hours on site.', entity: 'labour' },
        { text: 'Used one three-quarter inch brass valve and thirty centimetres of push-fit pipe.', entity: 'materials' },
        { text: 'Return manifold shows surface corrosion — recommend quoting replacement.', entity: 'followup' }
      ],
      report: {
        job: 'Unvented cylinder repair',
        customer: 'Riverside Apartments · Unit 4B',
        equipment: 'Megaflo Eco 210L (S/N: MG-7712-A)',
        workCompleted: 'Leaking PRV replaced; pressure tested at 4.0 bar',
        timeOnSite: '2 hours',
        materials: '3/4" brass PRV, 30 cm push-fit pipe',
        followUp: 'Corrosion on return manifold — office quotation requested',
        photosCount: 2,
        photos: ['Original failed valve', 'New valve pressure test'],
        customerSignature: 'Pending technician on-site review'
      }
    },
    {
      id: 'inspection',
      industry: 'Inspections & maintenance',
      icon: ClipboardCheck,
      technician: 'Marcus Vance (Compliance Tech)',
      jobId: 'WO-8821',
      duration: '0:22',
      recordedTime: 'Today, 09:45',
      transcriptSegments: [
        { text: 'Completed statutory inspection on air handling unit two.', entity: 'job' },
        { text: 'Greased bearings and calibrated belt tension.', entity: 'work' },
        { text: 'One and a half hours on site.', entity: 'labour' },
        { text: 'Used one cartridge of synthetic bearing grease.', entity: 'materials' },
        { text: 'Fan drive belt forty-eight shows moderate wear — recommend replacing within sixty days.', entity: 'followup' }
      ],
      report: {
        job: 'Annual AHU compliance inspection',
        customer: 'Apex Logistics Hub · Plant Room 2',
        equipment: 'Trane AHU-02 Commercial (Asset #EQ-904)',
        workCompleted: 'Inspection passed; bearings greased; tension calibrated',
        timeOnSite: '1.5 hours',
        materials: 'High-temp synthetic grease (cartridge)',
        followUp: 'Replace fan drive belt (B-48) within 60 days',
        photosCount: 2,
        photos: ['Drive belt condition', 'Signed plant logbook'],
        customerSignature: 'Pending technician on-site review'
      }
    }
  ];

  const currentScenario = demoScenarios[activeScenarioIndex] || demoScenarios[0];

  // Section 8: How the project works
  const projectSteps = [
    {
      number: "01",
      title: "Understand your workflow",
      description: "In a free 30-minute call, we look at how your technicians document jobs and what your office needs afterwards."
    },
    {
      number: "02",
      title: "Build a focused pilot",
      description: "We set up the assistant with a real report template, your terminology and a small set of useful documents. If helpful, we spend time with your technicians to see the work firsthand."
    },
    {
      number: "03",
      title: "Try it with your team",
      description: "Two or three technicians use it on actual visits. We check report quality, how long reporting takes, and how quickly useful information reaches the office. We refine what doesn't fit."
    },
    {
      number: "04",
      title: "Roll out when it's working",
      description: "We agree on integrations, train the rest of the team and expand the assistant only where it creates value. Scope and pricing are agreed before each next step."
    }
  ];

  // Section 9: FAQs verbatim from requirements
  const faqs = [
    {
      q: "Will our technicians actually use it?",
      a: "We design the process around how they already describe their work, not around long forms. A small pilot with real technicians is how we find out what needs to change before rollout."
    },
    {
      q: "Will it understand technical terminology and product names?",
      a: "We can adapt the assistant to the products and vocabulary your team uses and test it on real examples. Technical terms still need checking, which is why the report is reviewed."
    },
    {
      q: "What if the assistant gets something wrong?",
      a: "Every report is a draft until your technician checks and approves it. They can correct missing or incorrect details before sending."
    },
    {
      q: "What if there is no mobile signal?",
      a: "We can build the phone workflow to save notes for later synchronisation. Generating the report and looking up live information normally require a connection."
    },
    {
      q: "Can it connect to our invoicing or job-management software?",
      a: "That depends on the system and the integrations it supports. We assess this early. A PDF or structured export is an option when direct integration isn't practical."
    },
    {
      q: "What happens to our customer and service data?",
      a: "Before a pilot, we agree on data access, storage, and how customer information will be handled. The solution should fit your security and privacy requirements."
    },
    {
      q: "Is this a technician tracking system?",
      a: "No. The goal is faster and more complete service documentation, not location tracking or surveillance."
    }
  ];

  return (
    <div className="pb-16 bg-[#ffffff] text-gray-900 selection:bg-gray-900 selection:text-white">

      {/* ================================================================= */}
      {/* SECTION 1 — HERO                                                  */}
      {/* ================================================================= */}
      <section className="relative pt-36 pb-24 md:pt-40 md:pb-28 lg:pt-44 lg:pb-36 overflow-hidden z-10 border-duna-border">
        {/* Parallax Background Layer with open landscape & sky */}
        <div
          className="absolute inset-0 bg-field-hero pointer-events-none"
          style={{
            transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
            willChange: 'transform'
          }}
        />

        {/* Gradient Fade Mask into Body Canvas */}
        <div className="absolute inset-0 hero-mask-gradient pointer-events-none z-10" />

        {/* Parallax Text & Content Layer */}
        <div
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            transform: `translate3d(0, ${scrollY * 0.18}px, 0)`,
            opacity: Math.max(0, 1 - scrollY / 750),
            willChange: 'transform, opacity'
          }}
        >
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">

            {/* Headline (H1) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-duna-dark leading-[1.1] mb-12 sm:mb-16 text-center">
              Your technicians talk.<br />
              The service report writes itself.
            </h1>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <a
                href="#contact"
                className="bg-duna-dark hover:bg-black text-white text-sm font-medium px-8 py-3.5 rounded-[10rem] shadow-duna hover:shadow-duna-hover transition-all duration-200 text-center flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                <span>Book a free 30-minute call</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — INTRODUCTION                                          */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline">
            <div className="lg:col-span-8">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 leading-snug">
                We build assistants around the way your service team already works: the phones they use, the reports they fill out, and the systems your office relies on.
              </p>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
                Start with simpler service reports. Add manuals, equipment history, stock information, or follow-up tasks where they actually help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — THE PROBLEM                                           */}
      {/* ================================================================= */}
      <section
        ref={problemSectionRef}
        id="problem"
        style={{ marginTop: '-1px' }}
        className="relative z-10 overflow-hidden py-20 sm:py-28 bg-white"
      >
        {/* Parallax Background Layer with warm-plains.png */}
        <div
          className="absolute -inset-y-20 inset-x-0 bg-warm-plains pointer-events-none"
          style={{
            transform: `translate3d(0, ${problemParallaxY}px, 0)`,
            willChange: 'transform'
          }}
        />

        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-white/45 pointer-events-none" />

        {/* Dispersion gradient */}
        <div className="absolute inset-0 value-mist-gradient pointer-events-none" />

        {/* Scroll-driven mist */}
        <div
          className="absolute inset-0 value-mist-gradient pointer-events-none"
          style={{ opacity: problemMistOpacity }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left: Concise Editorial Narrative & 3 Pain Points */}
            <div className="lg:col-span-7 space-y-6 text-gray-700 leading-relaxed">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
                The job is finished.<br />
                The paperwork isn't.
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-xl">
                A completed service visit shouldn't create another hour of admin work.
              </p>

              {/* Three Concise Pain Points */}
              <div className="space-y-4 pt-2">
                {[
                  "Reports arrive days after the job.",
                  "The office retypes handwritten notes.",
                  "Materials and extra work get missed."
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-amber-100/80 border border-amber-200/90 text-amber-800 flex items-center justify-center shrink-0 text-xs font-semibold">
                      ✕
                    </div>
                    <span className="text-gray-900 text-base sm:text-lg font-medium leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Realistic Incomplete Service Report Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-7 space-y-5">

                {/* Card Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-sm text-gray-900 tracking-tight">
                      Service report #4082
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Incomplete
                  </span>
                </div>

                {/* Technician's Note Area */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                    Technician's notes
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-amber-200/60 text-xs sm:text-sm text-gray-800 leading-relaxed font-mono">
                    “Replaced filter, 3 hrs, 2m copper pipe. Cable damaged.”
                  </div>
                </div>

                {/* Below Note: Two Issues */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                    Issues
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-700">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-medium">Material details missing</span>
                      </div>
                      <span className="text-[11px] font-mono text-gray-400">Fitting size</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-700">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-medium">Follow-up not recorded</span>
                      </div>
                      <span className="text-[11px] font-mono text-gray-400">Cable quote</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Waiting for clarification</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-mono text-[11px] font-medium">
                    Not ready to invoice
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — MAIN INTERACTIVE DEMONSTRATION (CENTERPIECE)          */}
      {/* ================================================================= */}
      <section
        ref={demoSectionRef}
        id="demo"
        style={{ marginTop: '-1px' }}
        className="relative z-10 overflow-hidden py-20 sm:py-28 bg-white"
      >
        {/* Parallax Background Layer with cold-plains.png */}
        <div
          className="absolute -inset-y-20 inset-x-0 bg-cold-plains pointer-events-none"
          style={{
            transform: `translate3d(0, ${demoParallaxY}px, 0)`,
            willChange: 'transform'
          }}
        />

        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />

        {/* Dispersion gradient */}
        <div className="absolute inset-0 value-mist-gradient pointer-events-none" />

        {/* Scroll-driven mist */}
        <div
          className="absolute inset-0 value-mist-gradient pointer-events-none"
          style={{ opacity: demoMistOpacity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4 leading-tight">
              One voice note.<br />
              A report your office can use.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              The technician explains what happened on site. The assistant turns that information into a structured report, ready to review.
            </p>
          </div>

          {/* Industry Switcher (Optional Enhancement) */}
          <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10">
            {demoScenarios.map((scenario, index) => {
              const isActive = activeScenarioIndex === index;
              const Icon = scenario.icon;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleScenarioChange(index)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${isActive
                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                    : 'bg-white/80 text-gray-700 border-gray-200/90 hover:bg-white hover:text-gray-900'
                    }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{scenario.industry}</span>
                </button>
              );
            })}
          </div>

          {/* Two Connected Panels: Left Phone vs Right Report */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ============================================================= */}
            {/* LEFT PANEL: TECHNICIAN'S PHONE MOCKUP (COMPACT IPHONE RATIO)  */}
            {/* ============================================================= */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                style={{ aspectRatio: '9 / 17' }}
                className="w-full max-w-[330px] sm:max-w-[340px] aspect-[9/16] bg-white rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden flex flex-col justify-between">
                {/* iPhone Status Bar & Notch */}
                <div className="pt-2.5 pb-1.5 px-5 bg-white flex justify-between items-center text-[10px] font-semibold text-gray-900 shrink-0">
                  <span className="w-8">9:41</span>
                  {/* Dynamic Island pill */}
                  <div className="w-20 h-5 bg-black rounded-full mx-auto flex items-center justify-end pr-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 border border-gray-800" />
                  </div>
                  <div className="w-8 flex items-center justify-end gap-1 text-[9px]">
                    <span>5G</span>
                    <div className="w-3.5 h-2 border border-gray-900 rounded-[2px] p-0.5 flex items-center">
                      <div className="w-full h-full bg-gray-900 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Mobile App Header */}
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/70 shrink-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-[11px] text-gray-900 tracking-tight">Kulida Field Assistant</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-400">{currentScenario.jobId}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">
                    {currentScenario.technician}
                  </div>
                </div>

                {/* Phone Body: Voice Note Player & Live Transcript */}
                <div className="p-3.5 flex-1 flex flex-col justify-between overflow-hidden space-y-2.5">

                  <div className="space-y-2.5">
                    {/* Audio Card */}
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Mic className="w-3 h-3 text-red-500" />
                          <span>Voice Note</span>
                        </span>
                        <span>{currentScenario.duration}</span>
                      </div>

                      {/* Waveform Visualization */}
                      <div className="flex items-center gap-1 h-7 px-2 py-0.5 bg-white rounded-lg border border-gray-200/70">
                        <button
                          type="button"
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          aria-label={isPlayingAudio ? "Pause audio note" : "Play audio note"}
                          className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 cursor-pointer hover:bg-black transition-colors"
                        >
                          {isPlayingAudio ? (
                            <Pause className="w-2.5 h-2.5" />
                          ) : (
                            <Play className="w-2.5 h-2.5 ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1 flex items-center gap-0.5 h-full px-1">
                          {[40, 70, 30, 90, 60, 100, 45, 80, 65, 95, 40, 75, 55, 85, 30, 60, 90, 50, 70].map((height, i) => {
                            const isPlayed = (i / 19) * 100 <= audioProgress;
                            return (
                              <span
                                key={i}
                                className={`flex-1 rounded-full transition-all duration-150 ${isPlayed
                                  ? 'bg-gray-900'
                                  : 'bg-gray-200'
                                  }`}
                                style={{
                                  height: isPlayingAudio ? `${Math.max(20, (height * Math.random()).toFixed(0))}%` : `${height}%`
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
                        <span>{currentScenario.recordedTime}</span>
                        <span>Clear audio</span>
                      </div>
                    </div>

                    {/* Transcription Display with Interactive Entity Mapping */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">
                          Transcription:
                        </span>
                        <span className="text-[9px] font-mono text-gray-400">
                          Hover to highlight
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-[11px] sm:text-xs text-gray-800 leading-relaxed space-y-1 shadow-2xs">
                        {currentScenario.transcriptSegments.map((seg, i) => {
                          const isHovered = hoveredEntity === seg.entity;
                          return (
                            <span
                              key={i}
                              onMouseEnter={() => setHoveredEntity(seg.entity)}
                              onMouseLeave={() => setHoveredEntity(null)}
                              className={`inline cursor-pointer rounded px-0.5 py-0.5 transition-colors mr-1 ${isHovered
                                ? 'bg-blue-100 text-blue-900 font-medium ring-1 ring-blue-300'
                                : 'hover:bg-gray-100'
                                }`}
                            >
                              “{seg.text}”
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Button to prepare report */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleGenerateReport}
                      disabled={isGenerating}
                      className="w-full bg-gray-900 hover:bg-black text-white text-xs font-medium py-2.5 px-3 rounded-full shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Preparing report...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Prepare report</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* iPhone Bottom Home Indicator */}
                <div className="pb-2 pt-1 bg-white flex justify-center shrink-0">
                  <div className="w-24 h-1 bg-gray-900/30 rounded-full" />
                </div>

              </div>
            </div>

            {/* ============================================================= */}
            {/* RIGHT PANEL: PREPARED SERVICE REPORT                          */}
            {/* ============================================================= */}
            <div className="lg:col-span-7">
              <div className="bg-white/95 backdrop-blur-sm border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[580px]">

                {/* Report Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-gray-200/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck className="w-4 h-4 text-gray-900" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                        Service Visit Report
                      </h3>
                      <span className="font-mono text-xs text-gray-400">#{currentScenario.jobId}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Customer: <strong className="text-gray-700">{currentScenario.report.customer}</strong>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {reportState === 'approved' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Approved & Sent to Office
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Draft — ready for technician review
                      </span>
                    )}
                  </div>
                </div>

                {/* Report Fields with Staged Progressive Reveal & Highlighting */}
                <div className={`py-6 space-y-4 text-xs sm:text-sm transition-opacity duration-300 ${isGenerating ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>

                  {/* Field 1: Job & Equipment */}
                  <div
                    onMouseEnter={() => setHoveredEntity('job')}
                    onMouseLeave={() => setHoveredEntity(null)}
                    className={`p-3.5 rounded-xl border transition-all ${hoveredEntity === 'job'
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-200'
                      : 'bg-gray-50/60 border-gray-100'
                      }`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                      Job & Equipment
                    </div>
                    <div className="font-semibold text-gray-900 text-sm mb-0.5">
                      {currentScenario.report.job}
                    </div>
                    <div className="text-xs font-mono text-gray-600">
                      {currentScenario.report.equipment}
                    </div>
                  </div>

                  {/* Field 2: Work Completed */}
                  <div
                    onMouseEnter={() => setHoveredEntity('work')}
                    onMouseLeave={() => setHoveredEntity(null)}
                    className={`p-3.5 rounded-xl border transition-all ${hoveredEntity === 'work'
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-200'
                      : 'bg-gray-50/60 border-gray-100'
                      }`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                      Work Completed
                    </div>
                    <div className="text-gray-800 font-medium">
                      {currentScenario.report.workCompleted}
                    </div>
                  </div>

                  {/* Field 3: Labour & Materials Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Labour */}
                    <div
                      onMouseEnter={() => setHoveredEntity('labour')}
                      onMouseLeave={() => setHoveredEntity(null)}
                      className={`p-3.5 rounded-xl border transition-all ${hoveredEntity === 'labour'
                        ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-200'
                        : 'bg-gray-50/60 border-gray-100'
                        }`}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                        Time on Site (Labour)
                      </div>
                      <div className="text-base font-semibold text-gray-900">
                        {currentScenario.report.timeOnSite}
                      </div>
                      <div className="text-[11px] text-gray-500">Billable field hours</div>
                    </div>

                    {/* Materials */}
                    <div
                      onMouseEnter={() => setHoveredEntity('materials')}
                      onMouseLeave={() => setHoveredEntity(null)}
                      className={`p-3.5 rounded-xl border transition-all ${hoveredEntity === 'materials'
                        ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-200'
                        : 'bg-gray-50/60 border-gray-100'
                        }`}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                        Materials Used
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {currentScenario.report.materials}
                      </div>
                      <div className="text-[11px] text-gray-500">Deducted from van stock</div>
                    </div>
                  </div>

                  {/* Field 4: Recommended Follow-up */}
                  <div
                    onMouseEnter={() => setHoveredEntity('followup')}
                    onMouseLeave={() => setHoveredEntity(null)}
                    className={`p-3.5 rounded-xl border transition-all ${hoveredEntity === 'followup'
                      ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                      : 'bg-amber-50/40 border-amber-100'
                      }`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-semibold mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Recommended Follow-up / Office Quote</span>
                    </div>
                    <div className="text-gray-800 font-medium">
                      {currentScenario.report.followUp}
                    </div>
                  </div>

                  {/* Field 5: Photos & Customer Signature Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Photos */}
                    <div className="p-3 rounded-xl bg-gray-50/60 border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-[11px] font-medium text-gray-900">Photos ({currentScenario.report.photosCount})</div>
                          <div className="text-[10px] text-gray-500">Added from visit</div>
                        </div>
                      </div>
                      <div className="flex -space-x-1.5">
                        <div className="w-6 h-6 rounded bg-gray-200 border border-white flex items-center justify-center text-[9px] font-mono text-gray-600">1</div>
                        <div className="w-6 h-6 rounded bg-gray-300 border border-white flex items-center justify-center text-[9px] font-mono text-gray-700">2</div>
                      </div>
                    </div>

                    {/* Signature */}
                    <div className="p-3 rounded-xl bg-gray-50/60 border border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-medium text-gray-900">Customer Signature</div>
                        <div className="text-[10px] text-gray-500">
                          {reportState === 'approved' ? 'Signed on mobile glass' : 'Pending review'}
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${reportState === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 font-semibold'
                        : 'bg-gray-200 text-gray-700'
                        }`}>
                        {reportState === 'approved' ? 'Signed' : 'Pending'}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Report Bottom Action Bar */}
                <div className="pt-5 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-gray-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>The technician approves every detail before dispatch.</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {reportState === 'approved' ? (
                      <button
                        type="button"
                        onClick={() => setReportState('ready')}
                        className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Demo</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApproveReport}
                        className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve & Send to Office</span>
                      </button>
                    )}
                  </div>
                </div>

                {showSignedToast && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Report approved! Clean PDF delivered to office and job record updated.</span>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — ADDITIONAL CAPABILITIES                               */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4 leading-tight">
              More than service reports,<br />
              when you need it.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Start with the core voice-to-report workflow. When your team is ready, add secondary capabilities that make field work even smoother.
            </p>
          </div>

          {/* Three Restrained Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Card 1 — Answers from your manuals */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FBFBF9] border border-gray-200/80 flex flex-col justify-between hover:border-gray-300 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-2xs">
                  <Search className="w-5 h-5 text-gray-800" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                  Answers from your manuals
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  A technician can ask about an error code, a servicing procedure or an equipment model and get a relevant answer from the documents you provide, with a reference to the source. Equipment history can be included when available.
                </p>
              </div>

              {/* Contextual UI Illustration */}
              <div className="mt-6 pt-5 border-t border-gray-200/70 space-y-2.5">
                <div className="p-3 rounded-xl bg-white border border-gray-200/80 text-xs space-y-1.5 shadow-2xs">
                  <div className="text-[10px] font-mono text-gray-400">Technician query:</div>
                  <div className="font-medium text-gray-800">“Error code E04 on Daikin Altherma 3”</div>
                  <div className="pt-1.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-medium">Low pressure (&lt; 0.8 bar)</span>
                    <span className="text-gray-400 font-mono text-[10px]">Manual p.48</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Parts and job information */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FBFBF9] border border-gray-200/80 flex flex-col justify-between hover:border-gray-300 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-2xs">
                  <Package className="w-5 h-5 text-gray-800" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                  Parts and job information
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  Check whether a part is available or see what happened on the last visit — when your stock and service records can be connected.
                </p>
              </div>

              {/* Contextual UI Illustration */}
              <div className="mt-6 pt-5 border-t border-gray-200/70 space-y-2.5">
                <div className="p-3 rounded-xl bg-white border border-gray-200/80 text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <span>Part availability:</span>
                    <span className="text-emerald-600 font-semibold">IN STOCK</span>
                  </div>
                  <div className="font-medium text-gray-800">Grundfos UPM3 circulator pump</div>
                  <div className="pt-1.5 border-t border-gray-100 text-[10px] text-gray-500 font-mono">
                    Van 2: 1 unit · Depot: 4 units
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Follow-ups that reach the office */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FBFBF9] border border-gray-200/80 flex flex-col justify-between hover:border-gray-300 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-2xs">
                  <CalendarCheck className="w-5 h-5 text-gray-800" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                  Follow-ups that reach the office
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  A customer mentions another repair or asks for a quotation? Record it during the visit and turn it into a clear task for the office.
                </p>
              </div>

              {/* Contextual UI Illustration */}
              <div className="mt-6 pt-5 border-t border-gray-200/70 space-y-2.5">
                <div className="p-3 rounded-xl bg-white border border-gray-200/80 text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between items-center text-[10px] font-mono text-amber-700 font-semibold">
                    <span>OFFICE ACTION REQUIRED</span>
                    <span className="text-gray-400">48h SLA</span>
                  </div>
                  <div className="font-medium text-gray-800">Quote repair: Outdoor cable replacement</div>
                  <div className="pt-1.5 border-t border-gray-100 text-[10px] text-gray-500 font-mono">
                    Tagged for office review with photo
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Closing Line */}
          <div className="mt-12 text-center text-gray-600 text-base sm:text-lg font-medium">
            Start with the part of the job that creates the most paperwork. The rest can come later.
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — FITS EXISTING SYSTEMS                                 */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBFBF9] border-t border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4 leading-tight">
              Built around your paperwork.<br />
              Not the other way around.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Your report template. Your terminology. Your products. Your existing workflow. We can work with the information and tools you already have.
            </p>
          </div>

          {/* 3 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

            {/* Category 1 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 text-xs font-mono font-semibold">
                01
              </div>
              <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                Service forms and documents
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Report templates, inspection checklists, manuals, and PDFs.
              </p>
              <div className="pt-3 flex flex-wrap gap-1.5 font-mono text-[11px] text-gray-600">
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">Word / PDF forms</span>
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">Checklists</span>
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">Manuals</span>
              </div>
            </div>

            {/* Category 2 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 text-xs font-mono font-semibold">
                02
              </div>
              <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                Job and customer records
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Work orders, equipment history, and customer information.
              </p>
              <div className="pt-3 flex flex-wrap gap-1.5 font-mono text-[11px] text-gray-600">
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">Work orders</span>
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">Asset history</span>
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">Customer info</span>
              </div>
            </div>

            {/* Category 3 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 text-xs font-mono font-semibold">
                03
              </div>
              <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                Office and billing tools
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Emailed PDFs, structured exports, or direct integrations where supported.
              </p>
              <div className="pt-3 flex flex-wrap gap-1.5 font-mono text-[11px] text-gray-600">
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">Emailed PDFs</span>
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">CSV/Excel</span>
                <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200">Direct APIs</span>
              </div>
            </div>

          </div>

          {/* Horizontal Workflow Visualization */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 font-medium">
              Primary Workflow Visualization
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {[
                {
                  step: "01",
                  title: "Service visit",
                  desc: "Technician describes work by voice on phone"
                },
                {
                  step: "02",
                  title: "Approved report",
                  desc: "Technician checks details, adds photos & signs"
                },
                {
                  step: "03",
                  title: "Office queue",
                  desc: "Clean PDF or data export arrives immediately"
                },
                {
                  step: "04",
                  title: "Invoicing",
                  desc: "Labour & materials ready for billing without delay"
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-1.5 relative">
                  <div className="text-[10px] font-mono text-gray-400 font-semibold">{item.step}</div>
                  <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
              You don't need to replace your job-management software to get started. If there isn't a practical integration, a clear PDF delivered to the office can already be useful.
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — TRUST AND USABILITY                                   */}
      {/* ================================================================= */}
      <section
        ref={trustSectionRef}
        id="trust"
        style={{ marginTop: '-1px' }}
        className="relative z-10 overflow-hidden py-20 sm:py-28 bg-white"
      >
        {/* Parallax Background Layer with les-reka.png */}
        <div
          className="absolute -inset-y-20 inset-x-0 bg-les-reka pointer-events-none"
          style={{
            transform: `translate3d(0, ${trustParallaxY}px, 0)`,
            willChange: 'transform'
          }}
        />

        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-white/45 pointer-events-none" />

        {/* Dispersion gradient */}
        <div className="absolute inset-0 value-mist-gradient pointer-events-none" />

        {/* Scroll-driven mist */}
        <div
          className="absolute inset-0 value-mist-gradient pointer-events-none"
          style={{ opacity: trustMistOpacity }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4 leading-tight">
              Not another app your technicians have to feed.
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              We design tools that technicians actually like using because they save time on site rather than creating extra hurdles.
            </p>
          </div>

          {/* Three Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            {/* Card 1 */}
            <div className="p-7 rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-sm space-y-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900">
                <Mic className="w-5 h-5 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                Speak instead of typing
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Built around short, natural job descriptions — including the product names and technical terms your team uses.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-sm space-y-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900">
                <CheckCircle2 className="w-5 h-5 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                The technician approves the report
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The assistant prepares a draft. The person who did the work can correct it before anything is sent.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-sm space-y-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900">
                <Smartphone className="w-5 h-5 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                Designed for real service visits
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Use the phones your team already has. Where required, we can design the capture flow to save notes without a signal and sync them later. Live document searches and AI processing need connectivity.
              </p>
            </div>

          </div>

          {/* Closing Trust Statement */}
          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 text-center max-w-2xl mx-auto shadow-2xs">
            <p className="text-base font-medium text-gray-900">
              The goal is to remove unnecessary paperwork, not to track where your technicians spend their day.
            </p>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 8 — HOW THE PROJECT WORKS (4-STEP TIMELINE)               */}
      {/* ================================================================= */}
      <section
        ref={workflowRef}
        id="workflow"
        style={{ marginTop: '-1px' }}
        className="relative z-10 overflow-hidden py-20 sm:py-28 bg-white"
      >
        {/* Parallax Background Layer with cottage-winter.png */}
        <div
          className="absolute -inset-y-20 inset-x-0 bg-cottage-winter pointer-events-none"
          style={{
            transform: `translate3d(0, ${workflowParallaxY}px, 0)`,
            willChange: 'transform'
          }}
        />

        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />

        {/* Dispersion gradient */}
        <div className="absolute inset-0 value-mist-gradient pointer-events-none" />

        {/* Scroll-driven mist */}
        <div
          className="absolute inset-0 value-mist-gradient pointer-events-none"
          style={{ opacity: workflowMistOpacity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-duna-dark leading-tight">
              Start small.<br />
              Test it on real jobs.
            </h2>
          </div>

          {/* Continuous Horizontal Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative">

            {/* Continuous Base Horizontal Line Across All Columns on Desktop */}
            <div
              className={`hidden lg:block absolute top-0 left-0 right-0 h-[1px] bg-gray-300 origin-left transition-transform duration-1000 ease-out pointer-events-none ${isWorkflowVisible ? 'scale-x-100' : 'scale-x-0'
                }`}
            />

            {projectSteps.map((step, idx) => {
              const delay = 200 + idx * 150;

              return (
                <div
                  key={idx}
                  className={`relative pt-6 lg:pt-8 text-left transition-all duration-700 transform ${isWorkflowVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                    }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {/* Round Bullet Node Marker */}
                  <div
                    className={`hidden lg:block absolute -top-[4px] left-0 w-2.5 h-2.5 bg-gray-900 rounded-full z-10 transition-transform duration-500 ease-out ${isWorkflowVisible ? 'scale-100' : 'scale-0'
                      }`}
                    style={{ transitionDelay: `${delay}ms` }}
                  />

                  {/* Step Number */}
                  <div className="font-mono text-xs text-gray-400 font-medium mb-3">
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 9 — FREQUENTLY ASKED QUESTIONS                            */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-10">
            Frequently asked questions
          </h2>

          <div className="divide-y divide-gray-200">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-3 text-sm sm:text-base text-gray-600 leading-relaxed pr-6 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 10 — FINAL CTA AND CONTACT FORM                           */}
      {/* ================================================================= */}
      <section
        ref={contactSectionRef}
        id="contact"
        className="relative py-24 sm:py-36 overflow-hidden z-10 bg-white border-duna-border"
      >
        {/* 1. Background Parallax Layer */}
        <div
          ref={contactBgRef}
          className="absolute -inset-y-20 inset-x-0 bg-cover bg-center pointer-events-none z-0 opacity-90 transition-transform ease-out duration-75"
          style={{
            backgroundImage: "url('/images/CTA-background.png')",
            willChange: 'transform'
          }}
        />

        {/* 2. Foreground Parallax Layer */}
        <div
          ref={contactFgRef}
          className="absolute -inset-y-20 inset-x-0 bg-cover bg-bottom pointer-events-none z-10 opacity-95 transition-transform ease-out duration-75"
          style={{
            backgroundImage: "url('/images/CTA-foreground.png')",
            willChange: 'transform'
          }}
        />

        {/* Soft Ambient Fade Mask */}
        <div
          className="absolute inset-0 pointer-events-none z-[15]"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 20%, rgba(255, 255, 255, 0.35) 45%, rgba(255, 255, 255, 0.75) 80%, #ffffff 92%, #ffffff 100%)'
          }}
        />

        {/* 3. Form Content Container Layer */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-left mb-10 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
              How much paperwork happens after the job is done?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Show us one of your current service reports and tell us what happens before it becomes an invoice. We'll discuss what a simpler process could look like for your team.
            </p>
          </div>

          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm">
            {!formSubmitted ? (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Book a free 30-minute consultation
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Zero commitment. We will explore whether a voice-to-report assistant fits your technicians and office workflow.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm"
                  />
                </div>

                {/* Work email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                    Work email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="contact-company" className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                    Company *
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    required
                    placeholder="Company name"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm"
                  />
                </div>

                {/* Type of service work */}
                <div>
                  <label htmlFor="contact-service-type" className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                    Type of service work *
                  </label>
                  <div className="relative">
                    <select
                      id="contact-service-type"
                      defaultValue="Heat pumps, HVAC, and boilers"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm appearance-none cursor-pointer focus:outline-none focus:border-black pr-10"
                    >
                      <option value="Heat pumps, HVAC, and boilers">Heat pumps, HVAC, and boilers</option>
                      <option value="Plumbing and electrical contracting">Plumbing and electrical contracting</option>
                      <option value="Equipment and machinery maintenance">Equipment and machinery maintenance</option>
                      <option value="Inspection and compliance services">Inspection and compliance services</option>
                      <option value="Solar installation and maintenance">Solar installation and maintenance</option>
                      <option value="Other field service operations">Other field service operations</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Number of technicians (optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-technicians" className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                      Number of technicians (optional)
                    </label>
                    <div className="relative">
                      <select
                        id="contact-technicians"
                        defaultValue="3–10 technicians"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm appearance-none cursor-pointer focus:outline-none focus:border-black pr-10"
                      >
                        <option value="1–2 technicians">1–2 technicians</option>
                        <option value="3–10 technicians">3–10 technicians</option>
                        <option value="11–30 technicians">11–30 technicians</option>
                        <option value="30+ technicians">30+ technicians</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* How reports are created today (optional) */}
                  <div>
                    <label htmlFor="contact-reporting-method" className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                      How reports are created today (optional)
                    </label>
                    <div className="relative">
                      <select
                        id="contact-reporting-method"
                        defaultValue="Paper dockets / carbon copy"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm appearance-none cursor-pointer focus:outline-none focus:border-black pr-10"
                      >
                        <option value="Paper dockets / carbon copy">Paper dockets / carbon copy</option>
                        <option value="WhatsApp / phone calls to office">WhatsApp / phone calls to office</option>
                        <option value="Generic mobile forms / rigid apps">Generic mobile forms / rigid apps</option>
                        <option value="Technicians fill in Word / Excel at home">Technicians fill in Word / Excel at home</option>
                        <option value="Other method">Other method</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* What takes the most time? */}
                <div>
                  <label htmlFor="contact-time-drain" className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                    What takes the most time?
                  </label>
                  <textarea
                    id="contact-time-drain"
                    rows={4}
                    placeholder="Tell us about your current reporting bottlenecks, paperwork chasing, or invoicing delays..."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm resize-y"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1c1917] hover:bg-black text-white font-medium text-sm px-6 py-3.5 rounded-full transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Book a free 30-minute call</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Consultation Request Received</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out. We will review your field operations and get back to you shortly to schedule our call.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
