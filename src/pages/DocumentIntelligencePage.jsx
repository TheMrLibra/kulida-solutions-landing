import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  FileText,
  FileCheck,
  Layers,
  ShieldCheck,
  Cpu,
  Database,
  ScanLine,
  Code2,
  Copy,
  ExternalLink,
  Inbox,
  HardDrive,
  Cloud,
  Lock,
  Building2,
  Table,
  CheckCircle2,
  Sparkles,
  FileSpreadsheet,
  Receipt,
  FileSignature,
  FileCode,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function DocumentIntelligencePage() {
  const [scrollY, setScrollY] = useState(0);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Interactive Demo State
  const [activeDocType, setActiveDocType] = useState('invoice');
  const [demoViewMode, setDemoViewMode] = useState('fields'); // 'fields' | 'json'
  const [hoveredFieldKey, setHoveredFieldKey] = useState(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const docPreviewRef = useRef(null);
  const [docPreviewHeight, setDocPreviewHeight] = useState(null);

  // Parallax refs and states
  const problemSectionRef = useRef(null);
  const [problemProgress, setProblemProgress] = useState(0);

  const demoSectionRef = useRef(null);
  const [demoProgress, setDemoProgress] = useState(0);

  const beyondOcrSectionRef = useRef(null);
  const [beyondOcrProgress, setBeyondOcrProgress] = useState(0);

  const workflowRef = useRef(null);
  const [isWorkflowVisible, setIsWorkflowVisible] = useState(false);
  const [workflowProgress, setWorkflowProgress] = useState(0);

  const contactSectionRef = useRef(null);
  const contactBgRef = useRef(null);
  const contactFgRef = useRef(null);

  // Document Processing Pipeline Animation State (Section 6)
  const pipelineSectionRef = useRef(null);
  const [pipelineStep, setPipelineStep] = useState(0); // 0 (idle) to 5 (complete)
  const [pipelineStarted, setPipelineStarted] = useState(false);
  const pipelineTimeoutsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Document Intelligence & IDP | Kulida Solutions";

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "From documents to business-ready data. Custom AI-powered Document Intelligence and Intelligent Document Processing (IDP) solutions that extract, validate, and integrate structured data into your business workflows."
      );
    }
  }, []);

  // Sync right panel's fields height to match the left document preview's exact content height
  useEffect(() => {
    const updateHeight = () => {
      if (docPreviewRef.current) {
        setDocPreviewHeight(docPreviewRef.current.offsetHeight);
      }
    };

    updateHeight();

    let ro;
    if (typeof ResizeObserver !== 'undefined' && docPreviewRef.current) {
      ro = new ResizeObserver(() => {
        updateHeight();
      });
      ro.observe(docPreviewRef.current);
    }

    window.addEventListener('resize', updateHeight);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [activeDocType]);

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

  // Trigger subtle sequential workflow animation once when section enters viewport
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setPipelineStep(5);
      setPipelineStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pipelineStarted) {
          setPipelineStarted(true);
          observer.disconnect();

          setPipelineStep(1);
          const t1 = setTimeout(() => setPipelineStep(2), 650);
          const t2 = setTimeout(() => setPipelineStep(3), 1300);
          const t3 = setTimeout(() => setPipelineStep(4), 1950);
          const t4 = setTimeout(() => setPipelineStep(5), 2600);
          pipelineTimeoutsRef.current = [t1, t2, t3, t4];
        }
      },
      { threshold: 0.2 }
    );

    if (pipelineSectionRef.current) {
      observer.observe(pipelineSectionRef.current);
    }

    return () => {
      observer.disconnect();
      pipelineTimeoutsRef.current.forEach(clearTimeout);
    };
  }, [pipelineStarted]);



  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          const vh = window.innerHeight || 1;

          // Parallax for Problem section
          if (problemSectionRef.current) {
            const rect = problemSectionRef.current.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
            setProblemProgress(p);
          }

          // Parallax for Interactive demo section
          if (demoSectionRef.current) {
            const rect = demoSectionRef.current.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
            setDemoProgress(p);
          }

          // Parallax for Beyond OCR section
          if (beyondOcrSectionRef.current) {
            const rect = beyondOcrSectionRef.current.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
            setBeyondOcrProgress(p);
          }

          // Parallax for Workflow progression section
          if (workflowRef.current) {
            const rect = workflowRef.current.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
            setWorkflowProgress(p);
          }

          // Parallax for contact section
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

  // Parallax and mist calculations
  const problemMistOpacity = Math.pow(problemProgress, 1.15) * 0.94;
  const problemParallaxY = -problemProgress * 46;

  const demoMistOpacity = Math.pow(demoProgress, 1.15) * 0.94;
  const demoParallaxY = -demoProgress * 46;

  const beyondOcrMistOpacity = Math.pow(beyondOcrProgress, 1.15) * 0.94;
  const beyondOcrParallaxY = -beyondOcrProgress * 46;

  const workflowMistOpacity = Math.pow(workflowProgress, 1.15) * 0.94;
  const workflowParallaxY = -workflowProgress * 46;

  // =========================================================================
  // DEMO DATA DEFINITIONS
  // =========================================================================
  const demoDocuments = {
    invoice: {
      id: 'invoice',
      name: 'Invoice & PO Match',
      typeLabel: 'Commercial Tax Invoice',
      filename: 'INV-2026-1042_Acme_Europe.pdf',
      format: 'Digital PDF · 2 pages',
      receivedVia: 'invoices@company.com',
      systemTarget: 'SAP S/4HANA & NetSuite ERP',
      validationBadge: '100% Passed · 3-Way Match Confirmed',
      preview: {
        vendorName: 'Acme Ltd.',
        vendorLegal: 'Acme Industrial Technologies Ltd.',
        vendorAddress: '84 Innovation Boulevard, D02 Dublin, Ireland',
        vendorVat: 'IE 98765432B',
        billToName: 'Nordic Retailers Corp',
        billToAddress: 'Industriestraße 42, 8005 Zürich, Switzerland',
        billToVat: 'CHE-109.876.543',
        invoiceNumber: 'INV-2026-1042',
        poNumber: 'PO-2026-0881',
        invoiceDate: '14 Oct 2026',
        dueDate: '13 Nov 2026',
        paymentTerms: 'Net 30 Days',
        currency: 'EUR (€)',
        items: [
          {
            desc: 'Cloud Infrastructure Integration Cluster',
            code: 'SRV-8821',
            qty: 1,
            unitPrice: '€1,200.00',
            taxRate: '21%',
            amount: '€1,200.00'
          },
          {
            desc: 'Custom API Middleware Connector License',
            code: 'LIC-4029',
            qty: 2,
            unitPrice: '€350.00',
            taxRate: '21%',
            amount: '€700.00'
          },
          {
            desc: 'Tier-1 Mission-Critical SLA Package (Q4)',
            code: 'SLA-1002',
            qty: 1,
            unitPrice: '€124.79',
            taxRate: '21%',
            amount: '€124.79'
          }
        ],
        subtotal: '€2,024.79',
        vatRate: '21%',
        vatAmount: '€425.21',
        total: '€2,450.00',
        iban: 'IE44 HBUK 9876 5432 1098 76',
        bic: 'HBUKIE2D',
        bankName: 'HSBC Continental Europe'
      },
      fields: [
        {
          key: 'supplier',
          label: 'Supplier',
          value: 'Acme Ltd.',
          subvalue: 'Acme Industrial Technologies Ltd.',
          confidence: '99.9%',
          status: 'Validated',
          tag: 'Vendor Master #V-4091'
        },
        {
          key: 'invoiceNumber',
          label: 'Invoice Number',
          value: 'INV-2026-1042',
          subvalue: 'Unique document ID',
          confidence: '99.9%',
          status: 'Validated',
          tag: 'No duplicate detected'
        },
        {
          key: 'date',
          label: 'Date',
          value: '14 Oct 2026',
          subvalue: 'Due: 13 Nov 2026 (Net 30)',
          confidence: '99.8%',
          status: 'Validated',
          tag: 'Standard payment term'
        },
        {
          key: 'poNumber',
          label: 'PO Match',
          value: 'PO-2026-0881',
          subvalue: '3-way match against open PO',
          confidence: '99.7%',
          status: 'Validated',
          tag: 'PO amount matches 100%'
        },
        {
          key: 'subtotal',
          label: 'Net Subtotal',
          value: '€2,024.79',
          subvalue: 'Sum of 3 line items',
          confidence: '99.9%',
          status: 'Validated',
          tag: 'Calculation verified'
        },
        {
          key: 'vat',
          label: 'VAT / Tax (21%)',
          value: '€425.21',
          subvalue: 'Tax ID: IE 98765432B',
          confidence: '99.8%',
          status: 'Validated',
          tag: 'VIES registry valid'
        },
        {
          key: 'total',
          label: 'Total',
          value: '€2,450.00',
          subvalue: 'EUR currency confirmed',
          confidence: '100%',
          status: 'Validated',
          tag: 'Math verified'
        },
        {
          key: 'iban',
          label: 'Remittance Bank',
          value: 'IE44 HBUK 9876 5432 1098 76',
          subvalue: 'BIC: HBUKIE2D · HSBC Europe',
          confidence: '99.8%',
          status: 'Validated',
          tag: 'IBAN checksum valid'
        }
      ],
      json: {
        document_id: "DOC-2026-X992",
        document_type: "INVOICE",
        processing_timestamp: "2026-10-14T09:14:22Z",
        ocr_confidence: 0.998,
        validation_status: "PASSED",
        extracted_data: {
          supplier: {
            name: "Acme Ltd.",
            legal_entity: "Acme Industrial Technologies Ltd.",
            tax_id: "IE 98765432B",
            vendor_id: "V-4091",
            vies_verified: true
          },
          recipient: {
            name: "Nordic Retailers Corp",
            tax_id: "CHE-109.876.543"
          },
          invoice_metadata: {
            invoice_number: "INV-2026-1042",
            po_number: "PO-2026-0881",
            issue_date: "2026-10-14",
            due_date: "2026-11-13",
            payment_terms: "NET_30"
          },
          financials: {
            currency: "EUR",
            subtotal_amount: 2024.79,
            tax_rate_percent: 21.0,
            tax_amount: 425.21,
            total_amount: 2450.00,
            mathematical_check: "OK"
          },
          line_items: [
            {
              item_number: 1,
              code: "SRV-8821",
              description: "Cloud Infrastructure Integration Cluster",
              quantity: 1,
              unit_price: 1200.00,
              total_price: 1200.00
            },
            {
              item_number: 2,
              code: "LIC-4029",
              description: "Custom API Middleware Connector License",
              quantity: 2,
              unit_price: 350.00,
              total_price: 700.00
            },
            {
              item_number: 3,
              code: "SLA-1002",
              description: "Tier-1 Mission-Critical SLA Package (Q4)",
              quantity: 1,
              unit_price: 124.79,
              total_price: 124.79
            }
          ],
          payment_details: {
            bank_name: "HSBC Continental Europe",
            iban: "IE44HBUK98765432109876",
            bic: "HBUKIE2D",
            checksum_valid: true
          }
        },
        integration_target: "SAP_S4HANA_ACCOUNTS_PAYABLE",
        auto_post_eligible: true
      }
    },
    contract: {
      id: 'contract',
      name: 'Contract & Agreement',
      typeLabel: 'Master Services Agreement (MSA)',
      filename: 'MSA_AlpineLogistics_Nordmann_2026.pdf',
      format: 'Scanned Legal PDF · 14 pages',
      receivedVia: 'SharePoint / Legal Intake',
      systemTarget: 'Salesforce CRM & Contract Lifecycle',
      validationBadge: 'Validated · Key Clauses Extracted',
      preview: {
        title: 'MASTER SERVICES & LOGISTICS FRAMEWORK AGREEMENT',
        reference: 'AGR-2026-LEGAL-772',
        partiesText: 'This Master Services Agreement is entered into by and between Alpine Logistics GmbH ("Provider") and Nordmann Industrial AG ("Customer").',
        effectiveDateText: '1. EFFECTIVE DATE & TERM: This Agreement enters into force on 01 November 2026 ("Effective Date") and shall remain valid through 31 October 2029 ("Expiration Date"), establishing an initial term of thirty-six (36) months.',
        renewalClauseText: '6.2 RENEWAL TERMS: This Agreement shall automatically renew for consecutive twelve (12) month periods unless either party delivers written notice of non-renewal at least ninety (90) calendar days prior to the expiration of the then-current term.',
        obligationsText: '8. SERVICE LEVEL & OBLIGATIONS: Provider guarantees a minimum transport availability SLA of 99.9% uptime across all priority freight corridors. Critical incident response time shall not exceed 4 hours. Customer retains rights to conduct quarterly quality and compliance audits.',
        liabilityText: '14.3 LIMITATION OF LIABILITY: Neither party shall be liable for indirect damages. Aggregate liability under this Agreement shall not exceed €2,000,000 (Two Million Euros), except in cases of willful breach.',
        governingLawText: '21. GOVERNING LAW: This Agreement is governed by the laws of Switzerland, with exclusive venue in the courts of Zürich.'
      },
      fields: [
        {
          key: 'parties',
          label: 'Parties',
          value: 'Alpine Logistics GmbH & Nordmann Industrial AG',
          subvalue: 'Provider: Alpine · Customer: Nordmann',
          confidence: '99.8%',
          status: 'Validated',
          tag: 'CRM Entities Matched'
        },
        {
          key: 'effectiveDate',
          label: 'Effective Date',
          value: '01 Nov 2026',
          subvalue: 'Commencement of contract',
          confidence: '99.7%',
          status: 'Validated',
          tag: 'Clause 1 confirmed'
        },
        {
          key: 'expirationDate',
          label: 'Expiration Date',
          value: '31 Oct 2029',
          subvalue: 'Initial term: 36 months (3 Years)',
          confidence: '99.6%',
          status: 'Validated',
          tag: 'Active term mapped'
        },
        {
          key: 'renewalTerms',
          label: 'Renewal Terms',
          value: 'Auto-renew 12 months (90-day notice)',
          subvalue: 'Non-renewal notice deadline: 02 Aug 2029',
          confidence: '99.4%',
          status: 'Validated',
          tag: 'Clause 6.2 parsed'
        },
        {
          key: 'keyObligations',
          label: 'Key Obligations',
          value: '99.9% SLA uptime · 4h response · Quarterly audits',
          subvalue: 'Mandatory quarterly audit compliance',
          confidence: '98.9%',
          status: 'Validated',
          tag: 'SLA parameters linked'
        },
        {
          key: 'liabilityCap',
          label: 'Liability Cap',
          value: '€2,000,000 aggregate limit',
          subvalue: 'Two Million Euro standard limit',
          confidence: '99.5%',
          status: 'Validated',
          tag: 'Risk Tier: Standard'
        },
        {
          key: 'governingLaw',
          label: 'Governing Law',
          value: 'Swiss Law (Courts of Zürich)',
          subvalue: 'Exclusive jurisdiction venue',
          confidence: '99.7%',
          status: 'Validated',
          tag: 'Jurisdiction confirmed'
        },
        {
          key: 'status',
          label: 'Validation Status',
          value: 'Validated',
          subvalue: 'All mandatory contractual clauses identified',
          confidence: '99.5%',
          status: 'Validated',
          tag: '0 Deviations flagged'
        }
      ],
      json: {
        document_id: "CTR-2026-L772",
        document_type: "LEGAL_CONTRACT",
        classification: "MASTER_SERVICES_AGREEMENT",
        ocr_confidence: 0.994,
        validation_status: "PASSED",
        extracted_data: {
          parties: {
            provider: {
              name: "Alpine Logistics GmbH",
              crm_id: "ACC-8812",
              role: "SERVICE_PROVIDER"
            },
            customer: {
              name: "Nordmann Industrial AG",
              crm_id: "ACC-1049",
              role: "CLIENT"
            }
          },
          timeline: {
            effective_date: "2026-11-01",
            expiration_date: "2026-10-31",
            term_months: 36,
            renewal_clause: {
              automatic_renewal: true,
              renewal_period_months: 12,
              notice_period_days: 90,
              next_notice_deadline: "2029-08-02"
            }
          },
          service_level_commitments: {
            uptime_guarantee_percent: 99.9,
            critical_incident_response_hours: 4,
            audit_rights: "QUARTERLY"
          },
          legal_risk_metrics: {
            liability_cap_amount: 2000000,
            currency: "EUR",
            governing_law: "Switzerland",
            court_venue: "Zürich",
            risk_deviation_flag: false
          }
        },
        integration_target: "SALESFORCE_CONTRACTS_MODULE",
        auto_sync: true
      }
    },
    application: {
      id: 'application',
      name: 'Application Form',
      typeLabel: 'Commercial Credit Facility Application',
      filename: 'CreditApp_8891_Rostova_Engineering.pdf',
      format: 'Structured Web Form / Scanned PDF',
      receivedVia: 'Client Portal Upload',
      systemTarget: 'Core Banking & Risk Underwriting Engine',
      validationBadge: 'Validated · Identity & VAT Verified',
      preview: {
        formHeader: 'APPLICATION FOR COMMERCIAL CREDIT FACILITY',
        appId: 'APP-2026-8891',
        applicantName: 'Elena Rostova',
        position: 'Chief Financial Officer (CFO)',
        company: 'Rostova Engineering s.r.o.',
        businessId: 'CZ09841284',
        registeredAddress: 'Evropská 142/8, 160 00 Praha 6, Czech Republic',
        submissionDate: '12 Oct 2026',
        facilityRequested: '€150,000.00',
        facilityType: 'Revolving Working Capital Facility',
        tenor: '60-Day Settlement Cycles',
        verificationDetails: 'Statutory verification completed via automated commercial registry integration. Identity document confirmed valid. Tax compliance confirmed in good standing via Ministry of Finance interface. Corporate credit risk rating: Class A+ (Low Risk).'
      },
      fields: [
        {
          key: 'applicantName',
          label: 'Applicant Name',
          value: 'Elena Rostova',
          subvalue: 'CFO / Authorized Signatory',
          confidence: '99.9%',
          status: 'Validated',
          tag: 'Signatory authority verified'
        },
        {
          key: 'applicationId',
          label: 'Application ID',
          value: 'APP-2026-8891',
          subvalue: 'Unique tracking reference',
          confidence: '100%',
          status: 'Validated',
          tag: 'Unique record created'
        },
        {
          key: 'submissionDate',
          label: 'Submission Date',
          value: '12 Oct 2026',
          subvalue: 'Received at 16:45 CET',
          confidence: '99.8%',
          status: 'Validated',
          tag: 'Timestamp confirmed'
        },
        {
          key: 'documentType',
          label: 'Document Type',
          value: 'Commercial Credit Facility Form',
          subvalue: 'B2B Financing Application',
          confidence: '99.9%',
          status: 'Validated',
          tag: 'Class: B2B Onboarding'
        },
        {
          key: 'companyEntity',
          label: 'Corporate Entity',
          value: 'Rostova Engineering s.r.o.',
          subvalue: 'Tax ID: CZ09841284',
          confidence: '99.7%',
          status: 'Validated',
          tag: 'Registry status: Active'
        },
        {
          key: 'facilityAmount',
          label: 'Requested Limit',
          value: '€150,000.00',
          subvalue: 'Revolving working capital (60-day)',
          confidence: '99.6%',
          status: 'Validated',
          tag: 'Within automated tier'
        },
        {
          key: 'validationStatus',
          label: 'Validation Status',
          value: 'Validated',
          subvalue: 'ID Check: Passed · VAT: Valid · Credit: A+',
          confidence: '99.8%',
          status: 'Validated',
          tag: 'Ready for underwriting'
        }
      ],
      json: {
        document_id: "APP-2026-8891",
        document_type: "ONBOARDING_APPLICATION",
        form_name: "COMMERCIAL_CREDIT_FACILITY",
        ocr_confidence: 0.998,
        validation_status: "PASSED",
        extracted_data: {
          applicant: {
            full_name: "Elena Rostova",
            corporate_title: "Chief Financial Officer",
            signatory_verified: true
          },
          entity: {
            legal_name: "Rostova Engineering s.r.o.",
            registration_id: "09841284",
            vat_number: "CZ09841284",
            registry_status: "ACTIVE",
            jurisdiction: "Czech Republic"
          },
          request_parameters: {
            facility_type: "REVOLVING_WORKING_CAPITAL",
            requested_limit: 150000.00,
            currency: "EUR",
            settlement_cycle_days: 60
          },
          risk_and_compliance: {
            identity_check: "PASSED",
            tax_compliance: "GOOD_STANDING",
            external_credit_score: "A+",
            automated_underwriting_ready: true
          }
        },
        integration_target: "CORE_BANKING_RISK_API",
        auto_decision_eligible: true
      }
    }
  };

  const activeDoc = demoDocuments[activeDocType] || demoDocuments.invoice;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(activeDoc.json, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Deployment comparison table rows
  const comparisonRows = [
    { label: "Document Ingestion", onprem: "Your internal storage / network", privateCloud: "Dedicated VPC / Encrypted", cloud: "Cloud storage endpoint" },
    { label: "OCR & Layout Analysis", onprem: "Local GPU / CPU instances", privateCloud: "Dedicated cluster", cloud: "Managed cloud OCR" },
    { label: "AI Extraction Models", onprem: "Local open-source / fine-tuned", privateCloud: "Dedicated private instances", cloud: "State-of-the-art managed models" },
    { label: "Business Rules & Validation", onprem: "Your infrastructure", privateCloud: "Your private VPC", cloud: "Managed engine" },
    { label: "ERP / System Connectors", onprem: "Direct internal network API", privateCloud: "Direct secure VPN / VPC link", cloud: "REST API & Webhooks" },
    { label: "Local AI Hardware", onprem: "Recommended", privateCloud: "Managed by cloud provider", cloud: "None required" },
    { label: "Data Sovereignty", onprem: "Maximum (zero data egress)", privateCloud: "High (isolated tenancy)", cloud: "Standard enterprise cloud" }
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: "Do all documents need to follow the same template?",
      a: "No. AI-based extraction can handle multiple layouts and document formats. We test your actual documents to determine what can be processed reliably."
    },
    {
      q: "Can you process scanned documents and PDFs?",
      a: "Yes. We can combine OCR and document-understanding models to extract information from digital PDFs and scanned documents. The quality of the original document affects the results."
    },
    {
      q: "How accurate is AI document extraction?",
      a: "Accuracy depends on document quality, complexity, and the information being extracted. We evaluate performance on representative documents and add validation rules and human review where needed."
    },
    {
      q: "Can the system connect to our ERP or other software?",
      a: "Yes, provided suitable integration options are available. We can connect through APIs, databases, file interfaces, or custom integrations."
    },
    {
      q: "Can we keep sensitive documents in our own infrastructure?",
      a: "We can design private-cloud or on-premises architectures, depending on the AI models, technical requirements, and infrastructure involved."
    }
  ];

  // Implementation Process Steps
  const projectSteps = [
    {
      number: "01",
      title: "Understand",
      description: "We review your document types, current workflows, processing volumes, existing systems, and automation goals."
    },
    {
      number: "02",
      title: "Prove",
      description: "We test the solution on representative documents, measure extraction quality, and identify which steps can be automated reliably."
    },
    {
      number: "03",
      title: "Build & integrate",
      description: "We develop the complete processing workflow, including extraction, validation, exception handling, and connections to your systems."
    },
    {
      number: "04",
      title: "Deploy & improve",
      description: "We deploy the solution, monitor its performance, and refine it as new document formats and requirements appear."
    }
  ];

  return (
    <div className="pb-16 bg-[#ffffff] text-gray-900 selection:bg-gray-900 selection:text-white">

      {/* ================================================================= */}
      {/* 1. HERO SECTION                                                   */}
      {/* ================================================================= */}
      <section className="relative pt-36 pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28 overflow-hidden z-10 border-duna-border">
        {/* Parallax Background Canvas Layer */}
        <div
          className="absolute inset-0 bg-doc-hero pointer-events-none"
          style={{
            transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
            willChange: 'transform'
          }}
        />

        {/* Gradient Fade Mask into Body Canvas */}
        <div className="absolute inset-0 hero-mask-gradient pointer-events-none z-10" />

        {/* Parallax Content Layer */}
        <div
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            transform: `translate3d(0, ${scrollY * 0.18}px, 0)`,
            opacity: Math.max(0, 1 - scrollY / 750),
            willChange: 'transform, opacity'
          }}
        >
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

            {/* Headline (H1) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-duna-dark leading-[1.15] mb-8 sm:mb-10 text-center">
              <span className="block">Your documents already contain the data.</span>
              <span className="block mt-2 sm:mt-3">We make it ready to use.</span>
            </h1>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <a
                href="#contact"
                className="bg-duna-dark hover:bg-black text-white text-sm font-medium px-8 py-3.5 rounded-[10rem] shadow-duna hover:shadow-duna-hover transition-all duration-200 text-center flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. DOCUMENT AUTOMATION — CAPABILITIES & BUSINESS PROCESSES        */}
      {/* ================================================================= */}
      <section id="document-automation" className="pt-12 pb-16 sm:pt-16 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-4">
              Less manual work. More automated workflows.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Every invoice, contract or form requires information to be found, checked and entered somewhere else. We automate these repetitive steps, turning documents into structured data ready for your business systems.
            </p>
          </div>

          {/* 4 Clean Cards Grid — Compact 4-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">

            {/* Card 1: Invoices & POs */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBF9] border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex flex-col flex-1">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs mb-4">
                  <Receipt className="w-4.5 h-4.5 text-gray-800" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Invoices &amp; POs
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Extract invoice data, match orders and prepare ERP records.
                </p>
                <div className="flex-1 min-h-[16px]" />
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-gray-200/70">
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Line items <span className="text-gray-300 mx-1.5 font-normal">·</span> VAT <span className="text-gray-300 mx-1.5 font-normal">·</span> ERP
                </p>
              </div>
            </div>

            {/* Card 2: Contracts */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBF9] border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex flex-col flex-1">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs mb-4">
                  <FileSignature className="w-4.5 h-4.5 text-gray-800" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Contracts
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Identify key clauses, obligations and renewal dates.
                </p>
                <div className="flex-1 min-h-[16px]" />
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-gray-200/70">
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Clauses <span className="text-gray-300 mx-1.5 font-normal">·</span> Dates <span className="text-gray-300 mx-1.5 font-normal">·</span> Terms
                </p>
              </div>
            </div>

            {/* Card 3: Forms & Applications */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBF9] border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex flex-col flex-1">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs mb-4">
                  <FileCheck className="w-4.5 h-4.5 text-gray-800" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Forms &amp; Applications
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Turn forms and applications into structured digital records.
                </p>
                <div className="flex-1 min-h-[16px]" />
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-gray-200/70">
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Onboarding <span className="text-gray-300 mx-1.5 font-normal">·</span> Claims <span className="text-gray-300 mx-1.5 font-normal">·</span> KYC
                </p>
              </div>
            </div>

            {/* Card 4: Business Documents */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBF9] border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex flex-col flex-1">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs mb-4">
                  <FileSpreadsheet className="w-4.5 h-4.5 text-gray-800" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Business Documents
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Process delivery notes, certificates and technical reports.
                </p>
                <div className="flex-1 min-h-[16px]" />
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-gray-200/70">
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Delivery <span className="text-gray-300 mx-1.5 font-normal">·</span> Reports <span className="text-gray-300 mx-1.5 font-normal">·</span> Specs
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. INTERACTIVE DOCUMENT-PROCESSING DEMONSTRATION                  */}
      {/* ================================================================= */}
      <section
        ref={demoSectionRef}
        id="interactive-demo"
        style={{ marginTop: '-1px' }}
        className="relative z-10 overflow-hidden py-20 sm:py-28 bg-white"
      >
        {/* Parallax Background Layer with levander-cottage.png */}
        <div
          className="absolute -inset-y-20 inset-x-0 bg-levander-cottage pointer-events-none"
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
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-600 font-medium mb-2">
              Interactive Demonstration
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
              From incoming documents to usable data.
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              A document is more than a page of text. It contains information your business needs to act on. Our systems turn that information into structured, validated data that can flow directly into your existing processes.
            </p>
          </div>

          {/* Top Controls: Document Switcher Tabs & View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

            {/* Document Type Selector Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/90 shadow-xs overflow-x-auto no-scrollbar">
              <button
                type="button"
                id="doc-tab-invoice"
                onClick={() => {
                  setActiveDocType('invoice');
                  setHoveredFieldKey(null);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeDocType === 'invoice'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                  }`}
              >
                01 / Invoice
              </button>
              <button
                type="button"
                id="doc-tab-contract"
                onClick={() => {
                  setActiveDocType('contract');
                  setHoveredFieldKey(null);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeDocType === 'contract'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                  }`}
              >
                02 / Contract
              </button>
              <button
                type="button"
                id="doc-tab-application"
                onClick={() => {
                  setActiveDocType('application');
                  setHoveredFieldKey(null);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeDocType === 'application'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                  }`}
              >
                03 / Application Form
              </button>
            </div>

            {/* Pipeline Stage Indicator & View Mode Switcher */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-gray-200/80 text-xs font-mono text-gray-600">
                <span>Document</span>
                <span className="text-gray-400">→</span>
                <span>AI Extract</span>
                <span className="text-gray-400">→</span>
                <span>Validation</span>
                <span className="text-gray-400">→</span>
                <span className="font-semibold text-gray-900">ERP Sync</span>
              </div>

              {/* Fields vs JSON view toggle */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-white/90 border border-gray-200/90 shadow-xs">
                <button
                  type="button"
                  id="view-mode-fields"
                  onClick={() => setDemoViewMode('fields')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${demoViewMode === 'fields'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Fields</span>
                </button>
                <button
                  type="button"
                  id="view-mode-json"
                  onClick={() => setDemoViewMode('json')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${demoViewMode === 'json'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Workspace Canvas */}
          <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

            {/* Workspace Top Bar */}
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-mono text-gray-700">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{activeDoc.filename}</span>
                </div>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="text-gray-500 font-mono hidden sm:inline">{activeDoc.format}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {activeDoc.validationBadge}
                </span>
                <span className="hidden md:inline-block text-[11px] font-mono text-gray-400">
                  Target: {activeDoc.systemTarget}
                </span>
              </div>
            </div>

            {/* Main Interactive Split Pane: Left Document Preview / Right Extracted Structured Data */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">

              {/* LEFT PANEL: Realistic Document Preview */}
              <div className="lg:col-span-6 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200/80 bg-gray-50/30 flex flex-col justify-between">

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      ORIGINAL DOCUMENT PREVIEW
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">
                      OCR Spatial Analysis
                    </span>
                  </div>

                  {/* Document Container styling mimicking real paper / sheet */}
                  <div
                    ref={docPreviewRef}
                    className="p-6 bg-white rounded-2xl border border-gray-200/90 shadow-xs font-sans text-gray-900 transition-all text-xs sm:text-sm"
                  >

                    {/* RENDER INVOICE PREVIEW */}
                    {activeDocType === 'invoice' && (
                      <div className="space-y-5">
                        <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                          <div
                            className={`p-2 rounded-lg transition-all duration-150 ${hoveredFieldKey === 'supplier'
                              ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-900'
                              : ''
                              }`}
                          >
                            <h4 className="font-bold text-base text-gray-900 tracking-tight">
                              {activeDoc.preview.vendorName}
                            </h4>
                            <p className="text-gray-500 text-xs">{activeDoc.preview.vendorLegal}</p>
                            <p className="text-gray-400 text-[11px]">{activeDoc.preview.vendorAddress}</p>
                            <p className="text-gray-500 font-mono text-[11px] mt-0.5">
                              VAT: {activeDoc.preview.vendorVat}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-mono text-[11px] font-semibold">
                              TAX INVOICE
                            </span>
                            <div
                              className={`mt-1.5 p-1 rounded transition-all ${hoveredFieldKey === 'invoiceNumber'
                                ? 'bg-blue-50 ring-2 ring-blue-500'
                                : ''
                                }`}
                            >
                              <span className="block font-mono font-semibold text-gray-900">
                                {activeDoc.preview.invoiceNumber}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Invoice Metadata Row */}
                        <div className="grid grid-cols-2 gap-4 text-xs py-1">
                          <div
                            className={`p-1.5 rounded transition-all ${hoveredFieldKey === 'date'
                              ? 'bg-blue-50 ring-2 ring-blue-500'
                              : ''
                              }`}
                          >
                            <span className="block text-gray-400 text-[10px] uppercase font-mono">Invoice Date</span>
                            <span className="font-medium text-gray-800">{activeDoc.preview.invoiceDate}</span>
                            <span className="block text-gray-400 text-[10px] mt-0.5">Due: {activeDoc.preview.dueDate}</span>
                          </div>

                          <div
                            className={`p-1.5 rounded transition-all ${hoveredFieldKey === 'poNumber'
                              ? 'bg-blue-50 ring-2 ring-blue-500'
                              : ''
                              }`}
                          >
                            <span className="block text-gray-400 text-[10px] uppercase font-mono">PO Reference</span>
                            <span className="font-mono font-semibold text-gray-900">{activeDoc.preview.poNumber}</span>
                            <span className="block text-emerald-600 text-[10px] mt-0.5 font-medium">✓ Matched in ERP</span>
                          </div>
                        </div>

                        {/* Line Items Table */}
                        <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                          <div className="grid grid-cols-12 bg-gray-50/80 px-3 py-2 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                            <div className="col-span-7">Description</div>
                            <div className="col-span-2 text-right">Qty</div>
                            <div className="col-span-3 text-right">Amount</div>
                          </div>
                          <div className="divide-y divide-gray-100">
                            {activeDoc.preview.items.map((item, idx) => (
                              <div
                                key={idx}
                                className={`grid grid-cols-12 px-3 py-2 text-[11px] items-center transition-colors ${hoveredFieldKey === 'subtotal' ? 'bg-blue-50/50' : ''
                                  }`}
                              >
                                <div className="col-span-7 font-medium text-gray-800">
                                  {item.desc}
                                  <span className="block text-[10px] font-mono text-gray-400">{item.code}</span>
                                </div>
                                <div className="col-span-2 text-right font-mono text-gray-600">{item.qty}</div>
                                <div className="col-span-3 text-right font-mono font-medium text-gray-900">{item.amount}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Totals & Banking */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
                          <div
                            className={`p-2 rounded-lg text-xs transition-all ${hoveredFieldKey === 'iban'
                              ? 'bg-blue-50 ring-2 ring-blue-500'
                              : ''
                              }`}
                          >
                            <span className="block text-[10px] font-mono uppercase text-gray-400">Payment Remittance</span>
                            <span className="font-mono text-gray-800 text-[11px] block">{activeDoc.preview.iban}</span>
                            <span className="text-gray-400 text-[10px]">BIC: {activeDoc.preview.bic} · {activeDoc.preview.bankName}</span>
                          </div>

                          <div className="w-full sm:w-48 space-y-1 text-xs">
                            <div
                              className={`flex justify-between py-0.5 px-1.5 rounded transition-all ${hoveredFieldKey === 'subtotal' ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                                }`}
                            >
                              <span className="text-gray-500">Subtotal:</span>
                              <span className="font-mono font-medium text-gray-800">{activeDoc.preview.subtotal}</span>
                            </div>
                            <div
                              className={`flex justify-between py-0.5 px-1.5 rounded transition-all ${hoveredFieldKey === 'vat' ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                                }`}
                            >
                              <span className="text-gray-500">VAT (21%):</span>
                              <span className="font-mono font-medium text-gray-800">{activeDoc.preview.vatAmount}</span>
                            </div>
                            <div
                              className={`flex justify-between py-1 px-1.5 rounded border-t border-gray-200 transition-all font-semibold ${hoveredFieldKey === 'total' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-900' : 'text-gray-900'
                                }`}
                            >
                              <span>Total Due:</span>
                              <span className="font-mono text-sm">{activeDoc.preview.total}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* RENDER CONTRACT PREVIEW */}
                    {activeDocType === 'contract' && (
                      <div className="space-y-4 text-xs text-gray-700">
                        <div className="border-b border-gray-100 pb-3">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                            LEGAL DOCUMENT REF: {activeDoc.preview.reference}
                          </span>
                          <h4 className="font-semibold text-sm text-gray-900 mt-1">
                            {activeDoc.preview.title}
                          </h4>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'parties' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950' : 'bg-gray-50/50'
                            }`}
                        >
                          <span className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Preamble & Parties</span>
                          <p className="leading-relaxed">{activeDoc.preview.partiesText}</p>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'effectiveDate' || hoveredFieldKey === 'expirationDate'
                            ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950'
                            : 'bg-gray-50/50'
                            }`}
                        >
                          <span className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Clause 1: Term & Dates</span>
                          <p className="leading-relaxed">{activeDoc.preview.effectiveDateText}</p>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'renewalTerms' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950' : 'bg-gray-50/50'
                            }`}
                        >
                          <span className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Clause 6.2: Renewal Terms</span>
                          <p className="leading-relaxed">{activeDoc.preview.renewalClauseText}</p>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'keyObligations' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950' : 'bg-gray-50/50'
                            }`}
                        >
                          <span className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Clause 8: SLAs & Obligations</span>
                          <p className="leading-relaxed">{activeDoc.preview.obligationsText}</p>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'liabilityCap' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950' : 'bg-gray-50/50'
                            }`}
                        >
                          <span className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Clause 14.3: Liability Limitation</span>
                          <p className="leading-relaxed">{activeDoc.preview.liabilityText}</p>
                        </div>
                      </div>
                    )}

                    {/* RENDER APPLICATION PREVIEW */}
                    {activeDocType === 'application' && (
                      <div className="space-y-4 text-xs text-gray-700">
                        <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                              OFFICIAL B2B ONBOARDING FORM
                            </span>
                            <h4 className="font-semibold text-sm text-gray-900 mt-0.5">
                              {activeDoc.preview.formHeader}
                            </h4>
                          </div>
                          <div
                            className={`p-1.5 rounded font-mono text-xs font-semibold ${hoveredFieldKey === 'applicationId' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-900' : 'bg-gray-100 text-gray-800'
                              }`}
                          >
                            {activeDoc.preview.appId}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div
                            className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'applicantName' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950' : 'bg-gray-50/50'
                              }`}
                          >
                            <span className="block text-[10px] font-mono uppercase text-gray-400">Applicant Details</span>
                            <span className="font-semibold text-gray-900 block">{activeDoc.preview.applicantName}</span>
                            <span className="text-gray-500 text-[11px]">{activeDoc.preview.position}</span>
                          </div>

                          <div
                            className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'companyEntity' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950' : 'bg-gray-50/50'
                              }`}
                          >
                            <span className="block text-[10px] font-mono uppercase text-gray-400">Business Entity</span>
                            <span className="font-semibold text-gray-900 block">{activeDoc.preview.company}</span>
                            <span className="font-mono text-gray-500 text-[11px]">ID: {activeDoc.preview.businessId}</span>
                          </div>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'facilityAmount' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950' : 'bg-gray-50/50'
                            }`}
                        >
                          <span className="block text-[10px] font-mono uppercase text-gray-400">Requested Facility</span>
                          <div className="flex items-baseline justify-between mt-0.5">
                            <span className="font-mono text-sm font-bold text-gray-900">{activeDoc.preview.facilityRequested}</span>
                            <span className="text-gray-500 text-[11px]">{activeDoc.preview.facilityType}</span>
                          </div>
                          <span className="text-gray-400 text-[10px] block mt-1">Tenor: {activeDoc.preview.tenor}</span>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border border-gray-100 transition-all ${hoveredFieldKey === 'validationStatus' ? 'bg-blue-50 ring-2 ring-blue-500 text-blue-950' : 'bg-gray-50/50'
                            }`}
                        >
                          <span className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Automated Registry Verification</span>
                          <p className="text-[11px] leading-relaxed text-gray-600">{activeDoc.preview.verificationDetails}</p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Left Panel Footer Note */}
                <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <span>Hover over extracted fields on the right to trace back</span>
                  <span>Spatial Confidence: 99.8%</span>
                </div>

              </div>

              {/* RIGHT PANEL: Extracted Structured Information or JSON */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">

                <div>

                  {/* Panel Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200/80 mb-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                        EXTRACTED STRUCTURED DATA
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {demoViewMode === 'fields' ? 'Validated Business Fields' : 'Normalized JSON Schema'}
                      </h3>
                    </div>

                    {demoViewMode === 'json' && (
                      <button
                        type="button"
                        onClick={handleCopyJson}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-mono text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedJson ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gray-500" />
                            <span>Copy JSON</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* VIEW MODE 1: HUMAN-READABLE EXTRACTED FIELDS */}
                  {demoViewMode === 'fields' && (
                    <div
                      style={docPreviewHeight ? { height: `${docPreviewHeight}px` } : undefined}
                      className="space-y-2.5 overflow-y-auto pr-1"
                    >
                      {activeDoc.fields.map((field) => {
                        const isHovered = hoveredFieldKey === field.key;
                        return (
                          <div
                            key={field.key}
                            onMouseEnter={() => setHoveredFieldKey(field.key)}
                            onMouseLeave={() => setHoveredFieldKey(null)}
                            className={`p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer ${isHovered
                              ? 'bg-blue-50/60 border-blue-400 shadow-xs'
                              : 'bg-[#FBFBF9] border-gray-200/80 hover:border-gray-300'
                              }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-500">
                                {field.label}
                              </span>
                              <div className="flex items-center gap-2">
                                {field.tag && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-gray-200/80 text-gray-600">
                                    {field.tag}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-medium">
                                  <Check className="w-2.5 h-2.5" />
                                  <span>{field.status}</span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-baseline justify-between gap-4">
                              <div className="text-sm font-semibold text-gray-900 tracking-tight">
                                {field.value}
                              </div>
                              <span className="text-[11px] font-mono text-gray-400 shrink-0">
                                {field.confidence}
                              </span>
                            </div>

                            {field.subvalue && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                {field.subvalue}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* VIEW MODE 2: RAW SYNTAX-HIGHLIGHTED JSON OUTPUT */}
                  {demoViewMode === 'json' && (
                    <div
                      style={docPreviewHeight ? { height: `${docPreviewHeight}px` } : undefined}
                      className="bg-gray-950 text-gray-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed shadow-inner"
                    >
                      <pre>
                        <code>{JSON.stringify(activeDoc.json, null, 2)}</code>
                      </pre>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. HOW DOCUMENT PROCESSING WORKS (5-STEP WORKFLOW)                */}
      {/* ================================================================= */}
      <section id="how-it-works" ref={pipelineSectionRef} className="py-16 sm:py-20 lg:py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
              From document to workflow.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We build automated document pipelines that turn incoming files into validated, structured data ready for your business systems.
            </p>
          </div>

          {/* ============================================================= */}
          {/* DESKTOP PIPELINE: 5-CARD HORIZONTAL CONNECTED GRID (lg+)      */}
          {/* ============================================================= */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4 xl:gap-5 relative">

            {/* Subtle, thin horizontal connecting line through icon centers (no dots/circles) */}
            <div className="absolute top-11 left-[10%] right-[10%] h-px bg-gray-200 z-0 pointer-events-none" />
            <div className="absolute top-11 left-[10%] right-[10%] h-px z-0 pointer-events-none overflow-hidden">
              <div
                className="h-full bg-gray-900 transition-all duration-700 ease-out origin-left"
                style={{
                  width:
                    pipelineStep === 0 ? '0%' :
                      pipelineStep === 1 ? '25%' :
                        pipelineStep === 2 ? '50%' :
                          pipelineStep === 3 ? '75%' : '100%'
                }}
              />
            </div>

            {/* Step 01 — Receive & classify */}
            <div
              className={`relative z-10 flex flex-col justify-between p-5 xl:p-6 rounded-3xl bg-[#FBFBF9] border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300 cursor-default h-full ${pipelineStep >= 1 ? 'border-gray-400/90 shadow-xs' : 'border-gray-200/90'
                }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs mb-4">
                  <Inbox className="w-5 h-5 text-gray-900" />
                </div>

                <h3 className="text-base xl:text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Receive & classify
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Documents arrive through email, uploads or connected systems.
                </p>
              </div>
            </div>

            {/* Step 02 — Read & extract */}
            <div
              className={`relative z-10 flex flex-col justify-between p-5 xl:p-6 rounded-3xl bg-[#FBFBF9] border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300 cursor-default h-full ${pipelineStep >= 2 ? 'border-gray-400/90 shadow-xs' : 'border-gray-200/90'
                }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs mb-4">
                  <ScanLine className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Read & extract
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  AI extracts relevant fields, tables and document data.
                </p>
              </div>
            </div>

            {/* Step 03 — Validate */}
            <div
              className={`relative z-10 flex flex-col justify-between p-5 xl:p-6 rounded-3xl bg-[#FBFBF9] border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300 cursor-default h-full ${pipelineStep >= 3 ? 'border-gray-400/90 shadow-xs' : 'border-gray-200/90'
                }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs mb-4">
                  <CheckCircle2 className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Validate
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Data is checked against formats, business rules and reference values.
                </p>
              </div>
            </div>

            {/* Step 04 — Review when needed */}
            <div
              className={`relative z-10 flex flex-col justify-between p-5 xl:p-6 rounded-3xl bg-[#FBFBF9] border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300 cursor-default h-full ${pipelineStep >= 4 ? 'border-gray-400/90 shadow-xs' : 'border-gray-200/90'
                }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs mb-4">
                  <AlertCircle className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 tracking-tight mb-2">
                  Review when needed
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Only flagged exceptions require human review.
                </p>
              </div>
            </div>

            {/* Step 05 — Send to systems (Dark Final Card) */}
            <div
              className={`relative z-10 flex flex-col justify-between p-5 xl:p-6 rounded-3xl bg-gray-900 text-white border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-700 cursor-default h-full ${pipelineStep >= 5 ? 'border-gray-700 shadow-md' : 'border-gray-800'
                }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white shadow-xs mb-4">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base xl:text-lg font-semibold text-white tracking-tight mb-2">
                  Send to systems
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Validated data flows into your business applications.
                </p>
              </div>
            </div>

          </div>

          {/* ============================================================= */}
          {/* MOBILE & TABLET: VERTICAL TIMELINE LAYOUT (<lg)               */}
          {/* ============================================================= */}
          <div className="lg:hidden relative pl-6 sm:pl-8">

            {/* Simple vertical connecting line running alongside cards (no dots/circles) */}
            <div className="absolute left-3 sm:left-4 top-8 bottom-8 w-px bg-gray-200 pointer-events-none">
              <div
                className="w-full bg-gray-900 transition-all duration-700 ease-out origin-top"
                style={{
                  height:
                    pipelineStep === 0 ? '0%' :
                      pipelineStep === 1 ? '25%' :
                        pipelineStep === 2 ? '50%' :
                          pipelineStep === 3 ? '75%' : '100%'
                }}
              />
            </div>

            <div className="space-y-4 sm:space-y-5">

              {/* Step 01 Mobile */}
              <div
                className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-default bg-[#FBFBF9] hover:border-gray-300 ${pipelineStep >= 1 ? 'border-gray-400/90 shadow-xs' : 'border-gray-200/90'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs shrink-0">
                    <Inbox className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-gray-400 font-medium mb-1">01</div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight mb-1.5">
                      Receive & classify
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Documents arrive through email, uploads or connected systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 02 Mobile */}
              <div
                className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-default bg-[#FBFBF9] hover:border-gray-300 ${pipelineStep >= 2 ? 'border-gray-400/90 shadow-xs' : 'border-gray-200/90'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs shrink-0">
                    <ScanLine className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-gray-400 font-medium mb-1">02</div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight mb-1.5">
                      Read & extract
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      AI extracts relevant fields, tables and document data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 03 Mobile */}
              <div
                className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-default bg-[#FBFBF9] hover:border-gray-300 ${pipelineStep >= 3 ? 'border-gray-400/90 shadow-xs' : 'border-gray-200/90'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-gray-400 font-medium mb-1">03</div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight mb-1.5">
                      Validate
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Data is checked against formats, business rules and reference values.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 04 Mobile */}
              <div
                className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-default bg-[#FBFBF9] hover:border-gray-300 ${pipelineStep >= 4 ? 'border-gray-400/90 shadow-xs' : 'border-gray-200/90'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-900 shadow-xs shrink-0">
                    <AlertCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-gray-400 font-medium mb-1">04</div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight mb-1.5">
                      Review when needed
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Only flagged exceptions require human review.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 05 Mobile (Dark Final Card) */}
              <div
                className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-default bg-gray-900 text-white hover:border-gray-700 ${pipelineStep >= 5 ? 'border-gray-700 shadow-md' : 'border-gray-800'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white shadow-xs shrink-0">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-gray-400 font-medium mb-1">05</div>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-1.5">
                      Send to systems
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      Validated data flows into your business applications.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================= */}
          {/* COHESIVE LEFT-ALIGNED BOTTOM SUMMARY                          */}
          {/* ============================================================= */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200/80">
            <div className="flex items-start sm:items-center gap-3.5 max-w-2xl">
              <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200/70 flex items-center justify-center text-gray-700 shrink-0 mt-0.5 sm:mt-0">
                <Clock className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                  Less manual handling. Faster document workflows.
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-0.5">
                  Documents are processed automatically, with human attention focused on exceptions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>




      {/* ================================================================= */}
      {/* 10. IMPLEMENTATION PROCESS (4 STAGES WITH HORIZONTAL TIMELINE)    */}
      {/* ================================================================= */}
      <section
        ref={workflowRef}
        id="workflow"
        style={{ marginTop: '-1px' }}
        className="relative z-10 overflow-hidden py-20 sm:py-28 bg-white"
      >
        {/* Parallax Background Layer with levander-flat.png */}
        <div
          className="absolute -inset-y-20 inset-x-0 bg-levander-flat pointer-events-none"
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
              How the project works
            </h2>
          </div>

          {/* Continuous Horizontal Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative">

            {/* Continuous Base Horizontal Line Across All Columns */}
            <div
              className={`absolute top-0 left-0 right-0 h-[1px] bg-gray-300 origin-left transition-transform duration-1000 ease-out pointer-events-none ${isWorkflowVisible ? 'scale-x-100' : 'scale-x-0'
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

                  {/* Step Title */}
                  <h3 className="text-2xl font-medium tracking-tight text-gray-900 mb-3">
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
      {/* 11. FREQUENTLY ASKED QUESTIONS (ACCORDION)                        */}
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
      {/* 12. FINAL CLOSING & CONSULTATION BOOKING FORM                     */}
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

        {/* Soft Ambient Fade Mask */}
        <div
          className="absolute inset-0 pointer-events-none z-[15]"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 20%, rgba(255, 255, 255, 0.35) 45%, rgba(255, 255, 255, 0.75) 80%, #ffffff 92%, #ffffff 100%)'
          }}
        />

        {/* 3. Form Content Container Layer */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-left mb-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
              Let's turn your documents into something useful.
            </h2>
            <p className="text-base sm:text-lg text-gray-900 font-semibold pt-1">
              We'll help you find the most practical way to automate it.
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
                    Schedule a Consultation
                  </h3>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                      Monthly Volume
                    </label>
                    <div className="relative">
                      <select
                        defaultValue="500 – 5,000 documents / month"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm appearance-none cursor-pointer focus:outline-none focus:border-black pr-10"
                      >
                        <option value="< 500 documents / month">&lt; 500 documents / month</option>
                        <option value="500 – 5,000 documents / month">500 – 5,000 documents / month</option>
                        <option value="5,000 – 25,000 documents / month">5,000 – 25,000 documents / month</option>
                        <option value="25,000+ documents / month">25,000+ documents / month</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
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
                        <option value="Dedicated Private Cloud">Dedicated Private Cloud</option>
                        <option value="Scalable Cloud">Scalable Cloud</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 font-medium mb-1 pl-1">
                    What types of documents do you want to process?
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g., Invoices, purchase orders, vendor agreements, claims, onboarding forms, or technical specifications..."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black text-sm resize-y"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1c1917] hover:bg-black text-white font-medium text-sm px-6 py-3.5 rounded-full transition-all shadow-xs cursor-pointer"
                  >
                    Schedule a Consultation
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
                  Thank you for reaching out. We will review your document requirements and get back to you shortly.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
