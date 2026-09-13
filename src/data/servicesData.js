import { Cloud, RefreshCw, BrainCircuit, FileText, Calendar, Mic, ShoppingBag } from 'lucide-react';

export const servicesData = [
  {
    id: "01",
    slug: "cloud-adoption",
    title: "Cloud Adoption",
    tag: "[ SERVICE 01 ]",
    badge: "[ CLOUD & INFRASTRUCTURE ]",
    badgeColor: "text-duna-blue bg-blue-50 border-blue-100",
    icon: Cloud,
    shortDescription: "Cloud architecture design, migration of on-premise systems to the cloud (Azure, GCP), and infrastructure modernization for maximum security and scalability.",
    heroDescription: "We design resilient cloud architectures, migrate legacy on-premise infrastructure to Azure and GCP, and deploy automated DevOps pipelines to ensure enterprise-grade security and maximum scalability.",
    colSpan: "lg:col-span-7",
    metaLeft: "Stack: Azure / GCP / Kubernetes",
    metaRight: "99.99% Availability",
    rightColor: "text-emerald-600 font-semibold",
    features: [
      {
        title: "Multi-Cloud Architecture",
        desc: "High-availability system design across Azure, GCP, and hybrid cloud environments."
      },
      {
        title: "Seamless On-Prem Migration",
        desc: "Zero-downtime database and application migration strategies for legacy corporate tech."
      },
      {
        title: "Automated IaC & Security",
        desc: "Infrastructure as Code with Terraform and automated compliance policy enforcement."
      },
      {
        title: "Cost Optimization (FinOps)",
        desc: "Continuous cloud cost auditing and workload autoscaling to maximize ROI."
      }
    ],
    techSpecs: [
      { label: "Cloud Providers", value: "Microsoft Azure, Google Cloud Platform (GCP)" },
      { label: "Containerization", value: "Docker, Kubernetes (AKS / GKE)" },
      { label: "IaC & CI/CD", value: "Terraform, GitHub Actions, Azure DevOps" },
      { label: "SLA Guarantee", value: "99.99% Uptime with Multi-Region Failover" }
    ],
    processSteps: [
      { step: "01", title: "Infrastructure Audit", desc: "Assessing legacy compute, dependencies, and bandwidth requirements." },
      { step: "02", title: "Migration Blueprint", desc: "Architecting cloud landing zones and automated staging environments." },
      { step: "03", title: "Cutover & Migration", desc: "Executing automated migration scripts with zero business disruption." },
      { step: "04", title: "Optimization & Security", desc: "Deploying 24/7 SIEM monitoring, threat detection, and autoscaling." }
    ]
  },
  {
    id: "02",
    slug: "process-automation",
    title: "Process Automation",
    tag: "[ SERVICE 02 ]",
    badge: "[ INTELLIGENT AUTOMATION ]",
    badgeColor: "text-purple-600 bg-purple-50 border-purple-100",
    icon: RefreshCw,
    shortDescription: "Application integration, elimination of manual administration, and seamless automation of workflows across all your departments.",
    heroDescription: "Eliminate administrative drag and manual errors by connecting disparate enterprise applications into unified, event-driven automated pipelines across finance, HR, operations, and sales.",
    colSpan: "lg:col-span-5",
    metaLeft: "Workflow Engine",
    metaRight: "Zero-Touch Pipeline",
    rightColor: "text-purple-600",
    features: [
      {
        title: "Cross-Departmental Workflows",
        desc: "Connecting CRM, ERP, HRMS, and accounting tools into continuous event streams."
      },
      {
        title: "API & Webhook Orchestration",
        desc: "Custom middleware and webhook handlers for real-time data sync."
      },
      {
        title: "RPA & Intelligent Bots",
        desc: "Automating legacy UI clicks and data transfers where native APIs don't exist."
      },
      {
        title: "Real-time Exception Handling",
        desc: "Automated alert routing and human-in-the-loop fallback approval mechanisms."
      }
    ],
    techSpecs: [
      { label: "Integration Protocols", value: "REST, GraphQL, gRPC, Webhooks, WebSockets" },
      { label: "Orchestration Tools", value: "Apache Airflow, n8n, Custom Node.js Microservices" },
      { label: "Throughput Capacity", value: "100,000+ Automated Tasks / Hour" },
      { label: "Error Reduction", value: "99.8% Reduction in Manual Processing Errors" }
    ],
    processSteps: [
      { step: "01", title: "Workflow Discovery", desc: "Mapping manual touchpoints and calculating potential hour savings." },
      { step: "02", title: "API Mapping", desc: "Designing secure data schemas and integration endpoints." },
      { step: "03", title: "Pipeline Deployment", desc: "Building modular micro-automation microservices." },
      { step: "04", title: "Telemetry & Scaling", desc: "Monitoring execution speed and error rate logs in real-time." }
    ]
  },
  {
    id: "03",
    slug: "rag-systems",
    title: "RAG Systems",
    tag: "[ SERVICE 03 ]",
    badge: "[ ENTERPRISE AI & KNOWLEDGE ]",
    badgeColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    icon: BrainCircuit,
    shortDescription: "Development of custom knowledge bases and AI assistants capable of answering queries based on your internal company documents and real-time data.",
    heroDescription: "Empower your workforce with enterprise-grade Retrieval-Augmented Generation (RAG). We build secure AI assistants that query your private internal documentation, PDFs, and databases with sub-second accuracy and strict data isolation.",
    colSpan: "lg:col-span-4",
    singleMeta: "[ Vector Database + LLM Router ]",
    singleMetaColor: "text-emerald-700",
    features: [
      {
        title: "Private Vector Search",
        desc: "Indexing company wikis, technical sheets, and contracts into vector embeddings."
      },
      {
        title: "Hallucination-Free Guardrails",
        desc: "Strict context-grounded response synthesis with precise source citation links."
      },
      {
        title: "Multi-Modal Document Parsing",
        desc: "Understanding complex tables, technical diagrams, and formatted text."
      },
      {
        title: "Role-Based Access Control",
        desc: "Querying filtered strictly by user permissions and corporate security levels."
      }
    ],
    techSpecs: [
      { label: "Vector Databases", value: "Pinecone, Qdrant, Milvus, PostgreSQL (pgvector)" },
      { label: "LLM Orchestration", value: "LangChain, LlamaIndex, OpenAI Enterprise, Anthropic Claude" },
      { label: "Retrieval Latency", value: "< 50ms Vector Search + Hybrid Sparse/Dense Ranking" },
      { label: "Data Governance", value: "Zero Data Retention Training, SOC2 & GDPR Compliant" }
    ],
    processSteps: [
      { step: "01", title: "Ingestion Pipeline", desc: "Extracting and chunking internal PDFs, Notion, Confluence, and drive data." },
      { step: "02", title: "Vector Embedding", desc: "Generating high-dimensional semantic embeddings for context mapping." },
      { step: "03", title: "Assistant Interface", desc: "Integrating chat widgets into Slack, Teams, or custom internal web tools." },
      { step: "04", title: "Evaluation & Tuning", desc: "Measuring retrieval precision and continuous RAG benchmarking." }
    ]
  },
  {
    id: "04",
    slug: "document-intelligence",
    title: "Document Intelligence",
    tag: "[ SERVICE 04 ]",
    badge: "[ DOCUMENT OCR & PARSING ]",
    badgeColor: "text-amber-600 bg-amber-50 border-amber-100",
    icon: FileText,
    shortDescription: "Automatic data extraction from invoices, contracts, purchase orders, and technical sheets with direct synchronization into your corporate systems.",
    heroDescription: "Transform unstructured physical and digital paperwork into structured JSON data. Our AI document intelligence models automatically parse invoices, receipts, purchase orders, and complex contracts with direct ERP synchronization.",
    colSpan: "lg:col-span-4",
    singleMeta: "[ Multi-Format OCR & Parsing ]",
    singleMetaColor: "text-amber-700",
    features: [
      {
        title: "Automated Invoice & PO Parsing",
        desc: "Extracting line items, tax IDs, totals, and vendor details in milliseconds."
      },
      {
        title: "Complex Contract Analytics",
        desc: "Identifying key legal terms, renewal dates, liability clauses, and obligations."
      },
      {
        title: "Direct ERP Synchronization",
        desc: "Automatically pushing extracted values into SAP, Dynamics, or QuickBooks."
      },
      {
        title: "Confidence Score Scoring",
        desc: "Routing low-confidence fields to human validation interfaces."
      }
    ],
    techSpecs: [
      { label: "OCR Engine", value: "Custom LayoutLM, Azure Form Recognizer, AWS Textract" },
      { label: "Supported Formats", value: "PDF, TIFF, PNG, JPG, Scanned Documents, Handwritten Text" },
      { label: "Extraction Accuracy", value: "99.4% Field Accuracy on Standard Financial Invoices" },
      { label: "Processing Speed", value: "< 1.2 seconds per multi-page document" }
    ],
    processSteps: [
      { step: "01", title: "Document Classification", desc: "Auto-identifying invoice types, contracts, or technical spec sheets." },
      { step: "02", title: "Spatial Layout Analysis", desc: "Extracting key-value pairs, nested tables, and signature blocks." },
      { step: "03", title: "Validation Engine", desc: "Cross-referencing invoice line items with purchase orders." },
      { step: "04", title: "System Sync", desc: "Writing validated payload directly into core financial databases." }
    ]
  },
  {
    id: "05",
    slug: "booking-reservation",
    title: "Booking & Reservation Systems",
    tag: "[ SERVICE 05 ]",
    badge: "[ SCHEDULING & PAYMENTS ]",
    badgeColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    icon: Calendar,
    shortDescription: "Custom development of systems for managing appointments, capacities, and client reservations, complete with payment gateway and calendar integrations.",
    heroDescription: "Empower your clients with seamless appointment booking and capacity management. We build high-throughput reservation engines complete with multi-time-zone calendar syncing, Stripe payments, and automated SMS/email reminders.",
    colSpan: "lg:col-span-4",
    singleMeta: "[ Real-time Availability Sync ]",
    singleMetaColor: "text-indigo-700",
    features: [
      {
        title: "Real-Time Slot Engine",
        desc: "Preventing double-booking across multi-location & multi-staff schedules."
      },
      {
        title: "Payment Gateway Integration",
        desc: "Processing deposits and full prepayments via Stripe, Adyen, and Apple Pay."
      },
      {
        title: "Calendar Syncing",
        desc: "Two-way synchronization with Google Calendar, Outlook, and Apple iCal."
      },
      {
        title: "Client Portal & Reminders",
        desc: "Self-service cancellation, rescheduling, and automated WhatsApp/SMS alerts."
      }
    ],
    techSpecs: [
      { label: "Payment Providers", value: "Stripe, Adyen, PayPal, Apple Pay, Google Pay" },
      { label: "Calendar Protocols", value: "CalDAV, Google Calendar API, Microsoft Graph API" },
      { label: "Notification Channels", value: "Twilio SMS, WhatsApp Business API, SendGrid Email" },
      { label: "Concurrency Control", value: "Distributed Redis Lock Engine for 0% Double Booking" }
    ],
    processSteps: [
      { step: "01", title: "Capacity Modeling", desc: "Structuring staff availability, resource rooms, and service durations." },
      { step: "02", title: "Engine Development", desc: "Building real-time reservation microservices with Redis locking." },
      { step: "03", title: "Payment Integration", desc: "Connecting secure checkout flows with instant receipt generation." },
      { step: "04", title: "Client Rollout", desc: "Embedding booking widgets into web applications and mobile apps." }
    ]
  },
  {
    id: "06",
    slug: "field-service-ai",
    title: "AI Assistants for Field Service",
    tag: "[ SERVICE 06 ]",
    badge: "[ VOICE & MOBILE AI ]",
    badgeColor: "text-teal-600 bg-teal-50 border-teal-100",
    icon: Mic,
    shortDescription: "Tools for voice dictation of field notes, rapid searching through service documentation, and automated report generation on the go.",
    heroDescription: "Equip your mobile field engineers with hands-free AI productivity. Our voice-enabled mobile assistants transcribe technician audio, search dense equipment manuals on the spot, and compile client sign-off reports automatically.",
    colSpan: "lg:col-span-5",
    metaLeft: "Voice-to-Text Dictation",
    metaRight: "Offline First",
    rightColor: "text-teal-600",
    features: [
      {
        title: "Voice-to-Report Dictation",
        desc: "Converting noisy hands-free voice notes into structured service logs."
      },
      {
        title: "Offline Technical Search",
        desc: "Instant search across thousands of pages of machinery schematics offline."
      },
      {
        title: "Automated Sign-Off Reports",
        desc: "Generating PDF customer work orders with captured photos and signatures."
      },
      {
        title: "Parts & Inventory Lookup",
        desc: "Checking real-time warehouse spare part availability from the field."
      }
    ],
    techSpecs: [
      { label: "Speech Recognition", value: "Whisper AI, Custom Domain-Tuned Acoustic Models" },
      { label: "Mobile Frameworks", value: "React Native, iOS Swift, Android Kotlin" },
      { label: "Offline Storage", value: "SQLite Vector Database with Background Sync" },
      { label: "Report Format", value: "Automated PDF Generation with Geo-Tagging & E-Sign" }
    ],
    processSteps: [
      { step: "01", title: "Field Workflow Study", desc: "Observing field technician environments and terminology." },
      { step: "02", title: "Speech Model Tuning", desc: "Customizing voice recognition for specialized technical jargon." },
      { step: "03", title: "Mobile App Integration", desc: "Deploying lightweight offline-first iOS and Android applications." },
      { step: "04", title: "Backend Synchronization", desc: "Syncing field reports directly into central CRM / ERP databases." }
    ]
  },
  {
    id: "07",
    slug: "ecommerce-b2b",
    title: "E-commerce & B2B Portals",
    tag: "[ SERVICE 07 ]",
    badge: "[ B2B PORTALS & ERP SYNC ]",
    badgeColor: "text-rose-600 bg-rose-50 border-rose-100",
    icon: ShoppingBag,
    shortDescription: "Custom e-commerce solutions, B2B purchasing zones with individualized pricing, and self-service client portals fully integrated with your ERP.",
    heroDescription: "Scale B2B transactions with enterprise commerce portals. We craft customized purchasing portals featuring client-specific tier pricing, credit limit management, quick reorder forms, and real-time ERP inventory sync.",
    colSpan: "lg:col-span-7",
    metaLeft: "ERP Integration: SAP / Dynamics",
    metaRight: "Dynamic Tier Pricing",
    rightColor: "text-rose-600",
    features: [
      {
        title: "Individualized Contract Pricing",
        desc: "Dynamic price matrix resolution per logged-in business account."
      },
      {
        title: "Credit Limit & PO Purchasing",
        desc: "Supporting purchase orders, invoice terms, and credit balance checks."
      },
      {
        title: "Real-time ERP Inventory",
        desc: "Bi-directional stock and order sync with SAP, Dynamics 365, and Oracle."
      },
      {
        title: "Self-Service Client Portal",
        desc: "Order tracking, invoice downloads, reordering, and warranty management."
      }
    ],
    techSpecs: [
      { label: "ERP Connectors", value: "SAP S/4HANA, Microsoft Dynamics 365, NetSuite, Oracle" },
      { label: "Commerce Tech", value: "Headless Next.js / React, Shopify Plus, Custom Commerce API" },
      { label: "Catalog Scale", value: "1,000,000+ SKUs with Sub-100ms Search Indexing" },
      { label: "Authentication", value: "SSO / SAML 2.0 / OAuth2 for Corporate Accounts" }
    ],
    processSteps: [
      { step: "01", title: "ERP Data Modeling", desc: "Mapping customer pricing tiers, credit rules, and SKU structures." },
      { step: "02", title: "Portal Engineering", desc: "Building high-speed headless frontend purchasing experiences." },
      { step: "03", title: "Order Pipeline Test", desc: "Validating real-time order push and inventory deduction." },
      { step: "04", title: "Client Onboarding", desc: "Rolling out SSO login access for enterprise purchasing managers." }
    ]
  }
];
