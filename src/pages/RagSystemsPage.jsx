import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Check,
  FileText
} from 'lucide-react';

export default function RagSystemsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);

  const workflowRef = useRef(null);
  const [isWorkflowVisible, setIsWorkflowVisible] = useState(false);

  const contactSectionRef = useRef(null);
  const contactBgRef = useRef(null);
  const contactFgRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          // Parallax for contact section matching ContactSection.jsx
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real business demonstration scenarios (Section 4)
  const demoScenarios = [
    {
      id: 'contract-search',
      title: 'Contract search',
      question: '“Which contracts contain a 90-day notice period?”',
      answer: [
        'I found 3 active contracts with a 90-day termination clause:',
        '• Supplier Agreement v3 — clause 11.1',
        '• Kovo SLA — clause 9.4',
        '• HQ Facility Lease — clause 14.2'
      ],
      sources: [
        { name: 'Supplier_Agreement_2025.pdf', detail: 'clause 11.1', type: 'document' },
        { name: 'Kovo_SLA_final.docx', detail: 'clause 9.4', type: 'document' },
        { name: 'HQ_Facility_Lease.pdf', detail: 'clause 14.2', type: 'document' }
      ],
      note: 'Searches by meaning rather than relying only on exact keywords or file names.'
    },
    {
      id: 'customer-commitments',
      title: 'Customer commitments',
      question: '“What did we promise this customer about response times?”',
      answer: [
        'The original service agreement specifies a 4-hour response time for critical incidents. Amendment 2 later changed weekend coverage from optional to included.'
      ],
      sources: [
        { name: 'Service_Agreement.pdf', detail: 'section 5.2', type: 'document' },
        { name: 'Amendment_2.pdf', detail: 'section 3', type: 'document' },
        { name: 'Re_Support_Coverage.eml', detail: '', type: 'document' }
      ],
      note: 'Combines information from contracts, amendments and related correspondence.'
    },
    {
      id: 'product-specifications',
      title: 'Product specifications',
      question: '“Which of our pump models support 3-phase power and meet these requirements?”',
      answer: [
        'Two models match the requested criteria:',
        '• PX-420 — 400 V, 3-phase, max pressure 12 bar',
        '• MX-310 — 400 V, 3-phase, max pressure 10 bar'
      ],
      sources: [
        { name: 'Pump_Catalogue_2026.pdf', detail: '', type: 'document' },
        { name: 'PX_Series_Technical_Manual.pdf', detail: '', type: 'document' }
      ],
      note: 'Retrieves product specifications from catalogues and technical documentation.'
    },
    {
      id: 'internal-procedure',
      title: 'Internal procedure',
      question: '“How do we handle a failed pressure test?”',
      answer: [
        'According to the current quality procedure:',
        '1. Stop the batch and mark it as non-conforming.',
        '2. Notify the shift supervisor.',
        '3. Record the test result in the quality system.',
        '4. Follow procedure QP-17 before restarting production.'
      ],
      sources: [
        { name: 'QP-17_Pressure_Test_Failure.pdf', detail: 'section 4', type: 'document' }
      ],
      note: 'Gives employees the current procedure without repeatedly interrupting experienced colleagues.'
    },
    {
      id: 'cross-system-query',
      title: 'Cross-system query',
      question: '“Which customers have unpaid invoices and contracts expiring this quarter?”',
      answer: [
        'I found 2 customers matching both conditions:',
        '• Acme Corp — contract expires in 42 days, 1 overdue invoice (€14,200)',
        '• Novák Ltd. — contract expires in 58 days, 1 unpaid invoice (€4,500)'
      ],
      sources: [
        { name: 'Acme_MSA_2024.pdf', detail: 'contract', type: 'document' },
        { name: 'Novak_Service_Agreement.pdf', detail: 'contract', type: 'document' },
        { name: 'ERP Invoicing API', detail: 'live data', type: 'live' }
      ],
      note: 'Combines document retrieval with live business data and tool calling.'
    }
  ];

  const currentScenario = demoScenarios[activeScenarioIndex] || demoScenarios[0];

  // Deployment comparison table rows
  const comparisonRows = [
    { label: "Documents", onprem: "Your infrastructure", hybrid: "Usually your infrastructure", cloud: "Cloud" },
    { label: "OCR", onprem: "Your infrastructure", hybrid: "Configurable", cloud: "Cloud" },
    { label: "Search / RAG", onprem: "Your infrastructure", hybrid: "Configurable", cloud: "Cloud" },
    { label: "Application", onprem: "Your infrastructure", hybrid: "Configurable", cloud: "Cloud" },
    { label: "Databases", onprem: "Your infrastructure", hybrid: "Configurable", cloud: "Cloud" },
    { label: "Language model", onprem: "Your infrastructure", hybrid: "Usually external", cloud: "Cloud / external" },
    { label: "Tool integrations", onprem: "Internal / controlled", hybrid: "Internal + external", cloud: "Cloud + external" },
    { label: "Local AI hardware", onprem: "Usually required", hybrid: "Usually not required", cloud: "Not required" },
    { label: "Infrastructure control", onprem: "Maximum", hybrid: "High / configurable", cloud: "Cloud-based" }
  ];

  // Concise, high-value FAQs (Top 5 essential questions)
  const faqs = [
    {
      q: "How is this different from uploading documents to ChatGPT?",
      a: "A custom production system is integrated directly into your organisation. It includes automatic document synchronisation, role-based access controls, local or cloud OCR, database and API connectivity, verifiable citations, and your preferred deployment architecture. It becomes part of your infrastructure rather than a manual process of uploading files into a public third-party chatbot."
    },
    {
      q: "Can the AI give a wrong answer?",
      a: "Yes. No AI system should be treated as automatically infallible. That is why for document-based answers, we provide the original source and exact passage so users can verify the information immediately. For complex agentic workflows, we test tool calls and retrieved data against real questions during the pilot."
    },
    {
      q: "Do our documents have to leave our infrastructure?",
      a: "No. With a fully on-premise deployment, the complete solution operates entirely inside your environment — including document processing, OCR, databases, search, integrations, and locally hosted language models."
    },
    {
      q: "Do we need to organise all our documents first?",
      a: "Not perfectly. We can usually start with the information you already use. The pilot often reveals duplicate versions, outdated files, or contradictory data, allowing you to address them where they materially affect results."
    },
    {
      q: "How long does implementation take?",
      a: "A focused pilot is typically built within a few weeks. A full production rollout depends on data source volume, integration complexity, tool count, and customization needs."
    }
  ];

  const projectSteps = [
    {
      number: "01",
      title: "Understand",
      description: "We map the questions people ask, where knowledge lives, and what systems need access."
    },
    {
      number: "02",
      title: "Pilot",
      description: "We build a limited prototype around real questions from your team and rigorously measure results."
    },
    {
      number: "03",
      title: "Production",
      description: "We deploy the architecture with access controls, enterprise tool integrations, and monitoring."
    },
    {
      number: "04",
      title: "Improve",
      description: "New data sources, business tools, and model updates are added as your company evolves."
    }
  ];

  const aiComplexityLevels = [
    {
      number: "01",
      title: "Simple assistant",
      inputs: ["Documents"],
      output: "Answer",
      desc: "Search and answer over a defined set of documents."
    },
    {
      number: "02",
      title: "Production retrieval",
      inputs: ["Documents", "OCR", "Permissions", "Sync"],
      output: "Answer with sources",
      desc: "Built for real document estates, access rules and continuously changing content."
    },
    {
      number: "03",
      title: "Cross-system automation",
      inputs: ["Documents", "ERP", "APIs", "Tools"],
      output: "Answer / Action",
      desc: "Combine knowledge with live business data and actions across systems."
    }
  ];

  const alternativeLevel = {
    number: "04",
    title: "Sometimes not AI",
    inputs: ["Database", "Search", "Script"],
    output: "Simpler solution",
    desc: "If conventional software is faster, cheaper and more predictable, we use that instead."
  };

  return (
    <div className="pb-16 bg-[#ffffff] text-gray-900 selection:bg-gray-900 selection:text-white">

      {/* ================================================================= */}
      {/* 1. HERO — HOMEPAGE PARALLAX STYLE WITH RAG_HERO.PNG               */}
      {/* ================================================================= */}
      <section className="relative pt-36 pb-24 md:pt-40 md:pb-28 lg:pt-44 lg:pb-36 overflow-hidden z-10 border-duna-border">
        {/* Parallax Background Painterly Canvas Layer */}
        <div
          className="absolute inset-0 bg-rag-hero pointer-events-none"
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
          {/* Breadcrumbs — Top Left */}
          <div className="flex items-center gap-2 text-xs text-duna-muted mb-8 md:mb-12 font-medium">
            <Link to="/" className="hover:text-duna-dark transition-colors">[ HOME ]</Link>
            <span>/</span>
            <Link to="/" className="hover:text-duna-dark transition-colors">[ SERVICES ]</Link>
            <span>/</span>
            <span className="text-duna-dark font-semibold">[ 03 RAG & AI AGENTS ]</span>
          </div>

          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">

            {/* Headline (H1) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-duna-dark leading-[1.1] mb-12 sm:mb-16 text-center">
              Your company already has the answers.
              We make them easier to find and use.
            </h1>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <a
                href="#contact"
                className="bg-duna-dark hover:bg-black text-white text-sm font-medium px-7 py-3.5 rounded-[10rem] shadow-duna hover:shadow-duna-hover transition-all duration-200 text-center flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                <span>See what it could do with your data</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. CORE CAPABILITY BRIDGE SECTION                                 */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline">
            <div className="lg:col-span-8">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 leading-snug">
                We build AI systems that work with your documents, databases and internal tools — so your team can ask questions in plain language instead of searching across folders and systems.
              </p>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
                From simple document search to workflows that combine contracts, live business data and APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. THE HUMAN PROBLEM — "YOU PROBABLY KNOW THIS SITUATION"         */}
      {/* (Clean editorial text on the left, simple converging source funnel on the right — NO BOXES!) */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBFBF9] border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Pure Editorial Narrative */}
            <div className="lg:col-span-7 space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight mb-4">
                You probably know this situation.
              </h2>

              <p>
                You know the answer exists somewhere.
              </p>

              <p className="text-gray-600 pl-4 border-l-2 border-gray-300 space-y-1 my-4">
                <span className="block">Maybe it is in a contract.</span>
                <span className="block">Maybe somebody wrote it in an email six months ago.</span>
                <span className="block">Maybe it lives in SharePoint.</span>
                <span className="block">Maybe only one colleague remembers it.</span>
              </p>

              <p>
                So someone starts searching. They open folders, ask around, check another system and eventually piece the answer together.
              </p>

              <p className="text-gray-900 font-medium pt-2">
                That works. It just takes far too much time.
              </p>

              <p className="text-gray-600 italic text-sm sm:text-base pt-1">
                That is the kind of problem we build these systems for.
              </p>
            </div>

            {/* Right: Clean, Understated Funnel Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-6 sm:p-8 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">

                <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 pb-2 border-b border-gray-100">
                  FRAGMENTED SOURCES
                </div>

                <div className="space-y-2 text-xs font-mono text-gray-600">
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <span>Contracts & Agreements</span>
                    <span className="text-gray-400">PDF</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <span>Email & Correspondence</span>
                    <span className="text-gray-400">Inbox</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <span>ERP & Invoicing</span>
                    <span className="text-gray-400">Live Data</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <span>Manuals & SOPs</span>
                    <span className="text-gray-400">Wiki / Share</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <span>CRM & Support</span>
                    <span className="text-gray-400">Tickets</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-gray-400 font-mono text-xs">
                  ↓ one plain question
                </div>

                <div className="p-3.5 rounded-xl bg-gray-900 text-white text-xs font-medium text-center shadow-xs">
                  One verified answer + citations
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. SO WHAT IS RAG? (NATURAL, SIMPLE EXPLANATION)                  */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBFBF9] border-b border-gray-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            So what is RAG?
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            RAG stands for <strong>Retrieval-Augmented Generation</strong>. The name is more complicated than the idea.
          </p>

          <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
            A normal AI model does not automatically know what is inside your contracts, manuals or internal systems. A RAG system gives it access to the information it needs when a question is asked.
          </p>

          <div className="py-4 my-2 pl-6 border-l-2 border-gray-300 space-y-3">
            <p className="text-sm font-mono uppercase tracking-wider text-gray-400">Example:</p>
            <p className="text-lg sm:text-xl font-medium text-gray-900">
              “What did we agree with this customer about delivery deadlines?”
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              The system finds the relevant contract, amendment or email, gives that information to the AI and produces an answer. And because the answer is based on your documents, it can show you where it came from.
            </p>
          </div>

          <div className="py-4 text-xs sm:text-sm font-mono text-gray-600 bg-white p-4 rounded-xl border border-gray-200/80">
            <strong>Question</strong> → Find the right information → <strong>Answer</strong> → Source citation
          </div>

          <p className="text-gray-500 text-sm italic pt-2">
            That is the basic idea. Sometimes that is all you need. Sometimes the system needs to do more.
          </p>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. WHAT COULD THIS LOOK LIKE IN YOUR COMPANY? (INTERACTIVE DEMO)  */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Desktop Two-column / Mobile responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Column: Heading, Intro, Scenario List */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
                  What could this look like in your company?
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Explore a few examples of how employees can ask natural questions across contracts, documents, internal procedures and live systems.
                </p>
              </div>

              {/* Mobile Horizontal Pill Selector */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {demoScenarios.map((scenario, index) => {
                  const isActive = activeScenarioIndex === index;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => setActiveScenarioIndex(index)}
                      className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${isActive
                          ? 'bg-gray-900 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                        }`}
                    >
                      {scenario.title}
                    </button>
                  );
                })}
              </div>

              {/* Desktop Vertical Scenario List */}
              <div className="hidden lg:flex flex-col space-y-2 pt-2">
                {demoScenarios.map((scenario, index) => {
                  const isActive = activeScenarioIndex === index;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => setActiveScenarioIndex(index)}
                      aria-selected={isActive}
                      className={`group w-full text-left px-4 py-3.5 rounded-xl border transition-all text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 ${isActive
                          ? 'bg-[#FBFBF9] border-gray-300 text-gray-900 shadow-xs'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-400 group-hover:text-gray-600'}`}>
                            0{index + 1}
                          </span>
                          <span className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                            {scenario.title}
                          </span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: AI Workspace Preview */}
            <div className="lg:col-span-7">
              <div className="bg-[#FBFBF9] border border-gray-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs min-h-[460px]">

                {/* Workspace Header / Meta bar */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200/80 mb-6 text-xs font-mono uppercase tracking-wider text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-gray-700 font-medium">Internal Knowledge Workspace</span>
                  </div>
                  <span>Scenario 0{activeScenarioIndex + 1} / 05</span>
                </div>

                {/* Main Content with subtle transition */}
                <div key={currentScenario.id} className="space-y-6 flex-1 transition-opacity duration-150">

                  {/* User Question Area */}
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                      Question
                    </div>
                    <p className="text-lg sm:text-xl font-medium text-gray-900 leading-snug">
                      {currentScenario.question}
                    </p>
                  </div>

                  {/* Assistant Response Area */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      Answer
                    </div>
                    <div className="text-sm sm:text-base text-gray-800 leading-relaxed space-y-1.5">
                      {currentScenario.answer.map((line, idx) => {
                        const isListItem = line.startsWith('•') || /^\d+\./.test(line);
                        return (
                          <p
                            key={idx}
                            className={isListItem ? 'pl-2 text-gray-700 font-medium' : ''}
                          >
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sources & Live Data Section */}
                  <div className="pt-4 border-t border-gray-200/80">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                      Sources & verified data
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentScenario.sources.map((src, idx) => {
                        const isLive = src.type === 'live';
                        return (
                          <div
                            key={idx}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${isLive
                                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                                : 'bg-white border-gray-200/90 text-gray-700'
                              }`}
                          >
                            {isLive ? (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                <span className="text-emerald-900">{src.name}</span>
                                {src.detail && (
                                  <span className="text-emerald-700/80 font-sans text-[11px] font-medium bg-emerald-100/60 px-1.5 py-0.5 rounded">
                                    {src.detail}
                                  </span>
                                )}
                              </>
                            ) : (
                              <>
                                <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span className="text-gray-800">{src.name}</span>
                                {src.detail && (
                                  <span className="text-gray-500 font-sans text-[11px]">
                                    — {src.detail}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Small Explanatory Note */}
                <div className="pt-5 border-t border-gray-200/80 mt-6 flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                  <span className="font-mono uppercase tracking-wider text-gray-400 shrink-0">Note:</span>
                  <span>{currentScenario.note}</span>
                </div>

              </div>
            </div>

          </div>

          {/* Closing Copy */}
          <div className="mt-14 pt-8 border-t border-gray-200 text-gray-800 text-base sm:text-lg leading-relaxed">
            <p className="font-medium text-gray-900 mb-1">
              Your questions will be different. That is the point.
            </p>
            <p className="text-gray-600">
              We build around the questions your team actually asks — not around a predefined chatbot template.
            </p>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. SOMETIMES THE ANSWER IS NOT IN A DOCUMENT (AGENTIC FLOW)       */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBFBF9] border-b border-gray-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Sometimes the answer is not in a document.
          </h2>

          {/* Visual Example Card & Flow */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-6">

            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Question:</p>
              <p className="text-xl sm:text-2xl font-medium text-gray-900 leading-snug">
                “Which customers have unpaid invoices and contracts renewing in the next 60 days?”
              </p>
            </div>

            {/* Flow */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">System Flow:</p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-gray-700">
                <span className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200/80 font-medium">Contracts</span>
                <span className="text-gray-400 text-base font-sans">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200/80 font-medium">ERP Invoices</span>
                <span className="text-gray-400 text-base font-sans">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200/80 font-medium">Current Dates</span>
                <span className="text-gray-400 text-base font-sans mx-1">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-gray-900 text-white font-medium">One verified answer</span>
              </div>
            </div>

          </div>

          {/* 2 sentences about Agentic RAG */}
          <div className="space-y-3 text-base sm:text-lg text-gray-600 leading-relaxed">
            <p>
              Part of the answer lives in customer contracts, but current invoice data lives in your ERP or accounting system.
            </p>
            <p>
              This is <strong>Agentic RAG</strong>. The system doesn't just search files — it queries APIs, checks live data, and reasons across multiple systems before producing a verified answer.
            </p>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. BUILT AROUND THE SYSTEMS AND DATA YOU ALREADY HAVE             */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
              Built around the systems and data you already have.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              You do not need to migrate or clean up everything first. Real company knowledge is messy, lives across several systems, and changes daily. We connect directly to where it is:
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mb-12">

            {/* Pillar 1: Documents */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">01 / Storage</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Documents
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                PDFs, Word documents, Excel sheets, emails, SharePoint, Google Drive, and local network shared folders.
              </p>
            </div>

            {/* Pillar 2: Business systems */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">02 / Live Data</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Business systems
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                ERP systems, CRM platforms, SQL databases, ticketing queues, accounting tools, and internal business APIs.
              </p>
            </div>

            {/* Pillar 3: Production requirements */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">03 / Reliability</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Production requirements
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                OCR for scanned files, role-based access permissions, source citation audits, and continuous automatic synchronization.
              </p>
            </div>

          </div>

          <div className="pt-6 border-t border-gray-100 text-sm text-gray-500">
            Every answer is verified against your actual access rules — employees only see what their permissions allow.
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. WE ARE NOT SELLING YOU A CHATBOT (CONTINUUM OF COMPLEXITY)    */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBFBF9] border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-duna-dark leading-tight mb-4">
              We are not selling you a chatbot.
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Some problems only need a simple assistant.<br className="hidden sm:inline" />{' '}
              Others need OCR, permissions, live data and workflow logic.
            </p>
          </div>

          {/* 2-Column Asymmetric Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 sm:mb-20">

            {/* Left Column: Visual Anchor & Trimmed Focus */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl font-medium tracking-tight text-gray-900 leading-snug">
                  A generic chatbot is easy to build.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  A production system has to fit your data, permissions, infrastructure and workflows.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200/80">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-duna-dark leading-tight">
                  We use AI where it adds value — and simpler technology where it doesn't.
                </h3>
              </div>
            </div>

            {/* Right Column: Progressive Continuum of Complexity */}
            <div className="lg:col-span-7">
              {/* Top Label for 01-03 */}
              <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span>From simple retrieval to full workflow integration</span>
              </div>

              {/* Steps 01 to 03 with connecting vertical line */}
              <div className="relative space-y-8 sm:space-y-10">
                {/* Thin Vertical Continuum Line */}
                <div className="absolute left-[5px] top-2 bottom-3 w-[1px] bg-gray-200 pointer-events-none" />

                {aiComplexityLevels.map((level, idx) => (
                  <div key={idx} className="relative pl-8 sm:pl-10">
                    {/* Node marker on the line */}
                    <span className="absolute left-[1px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-900 ring-4 ring-white" />

                    {/* Step Number & Title */}
                    <div className="flex items-baseline gap-2.5 mb-1">
                      <span className="font-mono text-xs font-medium text-gray-400">
                        {level.number}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-900 tracking-tight">
                        {level.title}
                      </h4>
                    </div>

                    {/* Complexity Formula Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-gray-700 my-2">
                      {level.inputs.map((inp, i) => (
                        <React.Fragment key={i}>
                          <span className="px-2 py-0.5 rounded bg-gray-100/90 border border-gray-200/60 text-gray-800 font-medium">
                            {inp}
                          </span>
                          {i < level.inputs.length - 1 && (
                            <span className="text-gray-400 font-sans text-xs">+</span>
                          )}
                        </React.Fragment>
                      ))}
                      <span className="text-gray-400 font-sans text-xs mx-0.5">→</span>
                      <span className="px-2 py-0.5 rounded font-medium bg-[#1c1917] text-white">
                        {level.output}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {level.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Alternative Branch: Step 04 */}
              <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-gray-100">
                {/* Branch Label */}
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  <span>Or take a different route</span>
                </div>

                <div className="relative pl-8 sm:pl-10">
                  {/* Distinct Node Symbol: open geometric square node */}
                  <span className="absolute left-[1px] top-1.5 w-2.5 h-2.5 rounded-sm border-2 border-gray-900 bg-white ring-4 ring-white" />

                  {/* Step Number & Title */}
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="font-mono text-xs font-medium text-gray-400">
                      {alternativeLevel.number}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900 tracking-tight">
                      {alternativeLevel.title}
                    </h4>
                  </div>

                  {/* Complexity Formula Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-gray-700 my-2">
                    {alternativeLevel.inputs.map((inp, i, arr) => (
                      <React.Fragment key={i}>
                        <span className="px-2 py-0.5 rounded bg-gray-100/90 border border-gray-200/60 text-gray-800 font-medium">
                          {inp}
                        </span>
                        {i < arr.length - 1 && (
                          <span className="text-gray-400 font-sans text-xs">/</span>
                        )}
                      </React.Fragment>
                    ))}
                    <span className="text-gray-400 font-sans text-xs mx-0.5">→</span>
                    <span className="px-2 py-0.5 rounded font-medium bg-gray-800 text-white">
                      {alternativeLevel.output}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {alternativeLevel.desc}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Final Punchline across full width */}
          <div className="pt-10 sm:pt-12 border-t border-gray-200/70">
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-gray-900 max-w-4xl leading-snug">
              We start with the problem and build only the complexity that is actually useful.
            </p>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 8. RUN IT WHERE IT MAKES SENSE (3 ELEVATED DEPLOYMENT CARDS)       */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-duna-dark leading-tight mb-4">
              Run it where it makes sense.
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              We do not force you into one platform or deployment model.
            </p>
          </div>

          {/* 3 Distinct Elevated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">

            {/* Card 1: On-premise */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#FBFBF9] border border-gray-200/90 shadow-xs flex flex-col justify-between hover:border-gray-400/50 transition-colors">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Model 01</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">On-premise</h3>
                <p className="text-base text-gray-700 font-medium mb-4">
                  Everything stays inside your infrastructure.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-4">
                  <li>• Air-gapped or private network servers</li>
                  <li>• Local open-source AI models</li>
                  <li>• Zero data transmitted externally</li>
                  <li>• Maximum regulatory compliance & sovereignty</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Hybrid */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#FBFBF9] border border-gray-200/90 shadow-xs flex flex-col justify-between hover:border-gray-400/50 transition-colors">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Model 02</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Hybrid</h3>
                <p className="text-base text-gray-700 font-medium mb-4">
                  Keep your data internal, use external models where useful.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-4">
                  <li>• Documents and vector indices remain on-prem</li>
                  <li>• Heavy reasoning via secure private APIs</li>
                  <li>• High performance without local GPU clusters</li>
                  <li>• Balanced operational cost & data governance</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Cloud */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#FBFBF9] border border-gray-200/90 shadow-xs flex flex-col justify-between hover:border-gray-400/50 transition-colors">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Model 03</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Cloud</h3>
                <p className="text-base text-gray-700 font-medium mb-4">
                  Run the complete stack in your preferred cloud environment.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-4">
                  <li>• AWS, Azure, GCP or private EU cloud</li>
                  <li>• Scalable, fully managed container setup</li>
                  <li>• High availability and continuous monitoring</li>
                  <li>• Fast rollout with zero hardware overhead</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Optional Expandable Comparison Table */}
          <div className="pt-2">
            <button
              onClick={() => setShowComparisonTable(!showComparisonTable)}
              className="text-xs font-mono text-gray-600 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <span>{showComparisonTable ? "Hide" : "Show"} architectural comparison table</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showComparisonTable ? 'rotate-180' : ''}`} />
            </button>

            {showComparisonTable && (
              <div className="mt-4 p-6 bg-white rounded-2xl border border-gray-200 overflow-x-auto text-xs sm:text-sm">
                <table className="w-full text-left min-w-[580px]">
                  <thead>
                    <tr className="border-b border-gray-200 font-mono text-gray-500 uppercase text-xs">
                      <th className="py-2.5 px-3">Layer</th>
                      <th className="py-2.5 px-3">On-premise</th>
                      <th className="py-2.5 px-3">Hybrid</th>
                      <th className="py-2.5 px-3">Cloud</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {comparisonRows.map((r, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 font-medium text-gray-900">{r.label}</td>
                        <td className="py-2.5 px-3 text-gray-600">{r.onprem}</td>
                        <td className="py-2.5 px-3 text-gray-900 font-medium bg-gray-50/50">{r.hybrid}</td>
                        <td className="py-2.5 px-3 text-gray-600">{r.cloud}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 9. THE PILOT — HIGH-IMPACT DARK CONVERSION CENTERPIECE             */}
      {/* ================================================================= */}
      <section className="py-24 sm:py-32 bg-[#0D0D0C] text-white relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-4">
              LOW-RISK VALIDATION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight mb-4">
              Start with a small, measurable pilot.
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 font-normal leading-relaxed">
              Your data. Your questions. A working prototype.
            </p>
          </div>

          {/* Evidence Deliverables Grid */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161614] border border-white/10 mb-10">
            <div className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-6">
              What the pilot delivers:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="space-y-2">
                <div className="text-2xl font-semibold text-white font-mono">20–30</div>
                <div className="text-sm font-medium text-gray-200">Real questions</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Collected directly from your team's everyday work.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-semibold text-white font-mono">Quality</div>
                <div className="text-sm font-medium text-gray-200">→ Measured answers</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Exact accuracy rates and failure analysis on hard edge cases.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-semibold text-white font-mono">Audit</div>
                <div className="text-sm font-medium text-gray-200">→ Source verification</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Direct citations tracing each fact back to the original document.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-semibold text-white font-mono">Roadmap</div>
                <div className="text-sm font-medium text-gray-200">→ Architecture spec</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Concrete blueprint, hosting costs, and production scope.
                </p>
              </div>

            </div>
          </div>

          {/* Reassurance and CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-white/10">
            <p className="text-base sm:text-lg text-gray-300 font-medium">
              No large commitment before you know it works.
            </p>
            <a
              href="#contact"
              className="bg-white hover:bg-gray-100 text-[#0D0D0C] text-sm font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all shadow-md shrink-0"
            >
              <span>Discuss a pilot on your data</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </a>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 10. HOW THE PROJECT WORKS (STREAMLINED LINEAR PROGRESSION)        */}
      {/* ================================================================= */}
      <section
        ref={workflowRef}
        id="workflow"
        className="py-20 sm:py-28 bg-white border-b border-gray-200/70 relative z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-duna-dark leading-tight">
              How the project works
            </h2>
          </div>

          {/* Continuous Horizontal Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative">

            {/* Continuous Base Horizontal Line Across All Columns */}
            <div
              className={`absolute top-0 left-0 right-0 h-[1px] bg-gray-200 origin-left transition-transform duration-1000 ease-out pointer-events-none ${isWorkflowVisible ? 'scale-x-100' : 'scale-x-0'
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
                    className={`absolute -top-[4px] left-0 w-2.5 h-2.5 bg-gray-900 rounded-full z-10 transition-transform duration-500 ease-out ${isWorkflowVisible ? 'scale-100' : 'scale-0'
                      }`}
                    style={{ transitionDelay: `${delay}ms` }}
                  />

                  {/* Step Number */}
                  <div className="font-mono text-xs text-gray-400 font-medium mb-3">
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl font-medium tracking-tight text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Crisp 1-2 sentence description */}
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
      {/* 12. FREQUENTLY ASKED QUESTIONS (CLEAN ACCORDION)                  */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBFBF9] border-b border-gray-200/70">
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
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base font-semibold text-gray-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-3 text-sm text-gray-600 leading-relaxed pr-6">
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
      {/* 13. FINAL CLOSING & CONSULTATION BOOKING FORM                     */}
      {/* ================================================================= */}
      <section ref={contactSectionRef} id="contact" className="relative py-24 sm:py-36 overflow-hidden z-10 bg-white border-duna-border">

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

        {/* Soft Ambient Fade Mask (Solid White at top 0-20% → soft image in middle → Solid White at bottom 90-100%) */}
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
              Let's talk about your company's data.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Tell us what questions your team repeatedly asks, where your documents or data live, and we will propose an approach that makes sense.
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
                    Zero commitment. We will explore whether RAG or agentic tools fit your use case.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Name *"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Business email *"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                    Deployment Preference
                  </label>
                  <div className="relative">
                    <select
                      defaultValue="Undecided / Open to recommendation"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm appearance-none cursor-pointer focus:outline-none focus:border-black pr-10"
                    >
                      <option value="Undecided / Open to recommendation">Undecided / Open to recommendation</option>
                      <option value="Fully on-premise (Maximum Security)">Fully on-premise (Maximum Security)</option>
                      <option value="Hybrid (Local Data + Hosted Model)">Hybrid (Local Data + Hosted Model)</option>
                      <option value="Fully cloud-hosted">Fully cloud-hosted</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="What documents or systems (ERP, CRM, files) does your team spend too much time searching through?"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm resize-y"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1c1917] hover:bg-black text-white font-medium text-sm px-6 py-3.5 rounded-full transition-all shadow-xs cursor-pointer"
                  >
                    Book a free 30-minute consultation
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
                  Thank you for reaching out. We will review your systems and requirements and get back to you shortly.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
