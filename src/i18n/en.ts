export const en = {
  landing: {
    badge: "CONNNECTO MVP Version 1.0",
    title1: "AI Consultancy with",
    title2: "Human Touch",
    description: "Transform vague business problems into structured diagnosis, strategic direction, and ready-to-use deliverables.",
    startBtn: "Start Consultation",
    agentBtn: "Agent Dashboard",
    feature1: {
      title: "Smart Diagnosis",
      desc: "We don't just take orders. Our AI reframes your unstructured problem like a senior consultant."
    },
    feature2: {
      title: "Actionable Output",
      desc: "Get instantly usable brand introductions, email drafts, and project scope outlines."
    },
    feature3: {
      title: "Human PM Review",
      desc: "Premium quality control. Expert human PMs review and refine critical strategic deliverables."
    }
  },
  intake: {
    back: "Back to Home",
    title: "New Consultation",
    description: "Describe your business, brand, or communication challenge. Our AI consultant will diagnose the root cause and recommend the best strategic deliverables.",
    label: "What is the core issue you are facing?",
    placeholder: "e.g., Our startup offers an innovative B2B SaaS, but customers say our website looks generic. How do we differentiate?",
    analyzing: "Your input will be analyzed using CONNNECTO's proprietary consulting framework.",
    button: "Analyze Problem",
    cats: [
      { t: "Brand Positioning", d: "Define your core differentiation and messaging." },
      { t: "Client Comm.", d: "Negotiate scope and protect business boundaries." },
      { t: "Scope Planning", d: "Structure vague ideas into actionable execution." }
    ]
  },
  workspace: {
    title: "Case Workspace",
    stage: "Stage",
    status: "Status",
    input: "Original Input",
    diagnosisTitle: "AI Diagnosis",
    genDiagBtn: "Generate",
    probRef: "Problem Redefinition",
    cat: "Category",
    bizStage: "Business Stage",
    priorities: "Top Priorities",
    diagPending: "Diagnosis pending. Click generate to analyze.",
    delivTitle: "Deliverables",
    genBtnPrefix: "Generate",
    generating: "AI Generating...",
    noDeliv: "No deliverables generated yet.",
    pmTitle: "PM Review Status",
    pmWaiting: "Waiting for internal PM review.",
    generateFailed: "Failed to generate deliverable.",
    btnSaveMsg: "Save Message",
    guestError: "Failed to submit case. Setup Supabase to continue."
  },
  agent: {
    title: "PM Review Dashboard",
    colId: "Case ID / Input",
    colClient: "Client",
    colStage: "Stage",
    colStatus: "Status",
    colDate: "Date",
    colAction: "Action",
    btnReview: "Review",
    noCases: "No cases found."
  },
  auth: {
    title: "Welcome Back",
    desc: "Sign in to track your consulting cases & deliverables.",
    google: "Continue with Google",
    tos: "By signing in, you agree to our Terms of Service & Privacy Policy."
  },
  thinIntake: {
    back: "Back to Home",
    title: "New Consultation",
    desc: "Select your consulting focus and describe the issue. Our AI will analyze your problem and generate a comprehensive strategy report.",
    step1: "1. Consulting Focus",
    step2: "2. Describe your current business challenge",
    placeholder: "e.g., We have a great product but struggling to differentiate our positioning from competitors...",
    timing: "Takes ~15 seconds to generate the full structured report.",
    analyzing: "Analyzing & Consulting...",
    generate: "Generate Full Report",
    types: {
      branding: { label: 'Brand & Positioning', desc: 'Define your core differentiation' },
      marketing: { label: 'Marketing Strategy', desc: 'Acquisition and messaging' },
      sales: { label: 'Sales & Comm', desc: 'Client engagement and scope' },
      automation: { label: 'Process Automation', desc: 'Streamline workflows' }
    }
  },
  leadModal: {
    title: "Get Free Expert Consultation",
    desc: "Leave your contact info before viewing the report. A professional consultant will reach out directly.",
    company: "Company or Full Name",
    companyPlaceholder: "e.g., CONNNECTO Inc. / Jane Smith",
    phone: "Mobile Number",
    phonePlaceholder: "e.g., +82-10-1234-5678",
    email: "Email Address",
    emailPlaceholder: "e.g., hello@connecto-wyw.com",
    submit: "View Report",
    submitting: "Saving...",
  },
  thinReport: {
    title: "Consulting Report",
    focus: "Focus:",
    expertBtn: "Get Real Expert Consultation (Free)",
    requestReview: "Request Expert Review",
    inputLabel: "Client's Input",
    step1: "1. Diagnosis",
    step2: "2. Strategy",
    step3: "3. Action Plan",
    step4: "4. Deliverables",
    rootDiagnosis: "1. Root Diagnosis",
    probRef: "Problem Redefinition",
    rootCauses: "Root Causes",
    priority: "Priority Focus",
    stratDir: "2. Strategic Direction",
    coreDir: "Core Direction",
    positioning: "Positioning",
    scope: "Project Scope",
    actionPlan: "3. Action Plan",
    readyOutput: "4. Ready-to-Use Output",
    execSummary: "Executive Summary",
    marketingMsg: "Marketing / Comms Message",
    notFound: "Consulting Case not found."
  },
  common: {
    loading: "Loading..."
  }
};
