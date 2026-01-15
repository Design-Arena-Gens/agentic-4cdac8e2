const competitors = [
  {
    name: "Get Licensed",
    segment: "Consumer-focused SIA licence courses, job marketplace",
    strengths:
      "High brand awareness, online/offline blended delivery, large job board partnerships",
    gaps:
      "Course quality varies by partner provider, limited enterprise pathways, basic analytics",
    pricing: "£195-£450 per course, pay-per-course with upsells",
    opportunities:
      "Position with assured trainer vetting, deeper employer integrations, transparent outcomes data",
  },
  {
    name: "Skills for Security",
    segment: "Trade association for fire & security qualifications",
    strengths:
      "Accredited qualifications, apprenticeship funding expertise, national reach",
    gaps:
      "Aging learner portal, limited self-paced options, small employer marketplace",
    pricing: "Funded/apprenticeship models, bespoke corporate pricing",
    opportunities:
      "Modern LMS UX, rapid SIA upskilling tracks, unified talent funnel",
  },
  {
    name: "Highfield Qualifications",
    segment: "Awarding body delivering security compliance courses",
    strengths:
      "Strong accreditation credibility, extensive compliance catalogue",
    gaps:
      "Focus on content licensing not talent placement, minimal student support",
    pricing: "Licences to training centres, exam fees",
    opportunities:
      "Bundle accredited courses with guaranteed work placements, offer analytics",
  },
  {
    name: "City & Guilds (Security Programmes)",
    segment: "Broad vocational provider with SIA-aligned modules",
    strengths:
      "Trusted legacy brand, national testing infrastructure, modular content",
    gaps:
      "Generic platform experience, no real-time job placement, slow content updates",
    pricing: "Institution contracts, per-learner fees",
    opportunities:
      "Specialise in private security verticals, deliver faster CPD refresh cycles",
  },
  {
    name: "Tavcom Training",
    segment: "Technical security systems training (CCTV, alarms)",
    strengths:
      "Deep technical expertise, hybrid delivery, global recognition",
    gaps:
      "Niche focus, lacks end-to-end talent services, minimal digital tracking",
    pricing: "£245-£1,200 per module, premium workshops",
    opportunities:
      "Integrate technical modules into compliance bundles, showcase skills-to-role mapping",
  },
  {
    name: "Securitas UK Academy",
    segment: "Employer-led training & recruitment",
    strengths:
      "Guaranteed employment pipeline, internal compliance audits, employer trust",
    gaps:
      "Closed ecosystem, limited third-party employer access, legacy LMS",
    pricing: "Employee development cost centre, limited external revenue",
    opportunities:
      "Offer independent assessment services, open marketplace with verified badges",
  },
];

const positioningInsights = [
  "Differentiate on measurable learner outcomes (completion, placement) with transparent dashboards.",
  "Offer modular SIA + CPD pathways combining compliance, soft skills, and technical security specialisms.",
  "Win SMEs by bundling recruitment services with subsidised training credits and fast-track vetting.",
  "Promote trust via third-party accreditations, GDPR-by-design data governance, and ISO 27001 roadmap.",
];

const mvpFeatureSets = [
  {
    title: "Public Marketing Site",
    items: [
      "Home, services, sectors, success stories, FAQ, compliance assurance page",
      "Lead capture with CRM integration (HubSpot or Pipedrive)",
      "Resource hub (guides, webinar registration) with gated downloads",
    ],
  },
  {
    title: "Learner Portal",
    items: [
      "Course catalogue with filters (licence type, modality, language)",
      "Interactive syllabus, SCORM/xAPI content player, bookmarking",
      "Progress tracking, quiz engine with proctoring hooks, certificate wallet",
      "Offline-ready PWA module for critical documents and video sync",
    ],
  },
  {
    title: "Employer Portal",
    items: [
      "Job posting builder with compliance requirements and vetting checklist",
      "Candidate shortlists, interview scheduling, SLA tracking",
      "Analytics on pipeline health and placement velocity",
    ],
  },
  {
    title: "Recruiter Console",
    items: [
      "AI-assisted matching engine using skills, certifications, location, availability",
      "Manual override workflows with notes and task assignments",
      "Bulk messaging, document requests, vetting status dashboard",
    ],
  },
  {
    title: "Shared Services",
    items: [
      "Secure authentication (magic link + MFA) with role-based access",
      "Notifications via email/SMS/in-app, audit logs, consent capture",
      "Certificate issuance with QR verification and expiry alerts",
    ],
  },
];

const architectureLayers = [
  {
    heading: "Client Layer",
    detail:
      "Next.js app deploying to Vercel with edge caching; React Query for data fetching; Tailwind for UI. Public pages static-rendered, portals protected via middleware.",
  },
  {
    heading: "Services Layer",
    detail:
      "Node.js (NestJS) API hosted on managed containers (Render/Fly.io) with GraphQL + REST endpoints. Background workers (BullMQ) handle reporting, notifications, and matching jobs.",
  },
  {
    heading: "Data Layer",
    detail:
      "PostgreSQL (Supabase or RDS) for relational data; Redis for queues and session caching; S3-compatible storage (Backblaze/Vercel Blob) for documents and certificates.",
  },
  {
    heading: "Integration Layer",
    detail:
      "CRM/marketing automation (HubSpot), payment gateway (Stripe), identity verification (Onfido/Veriff), email (Resend), SMS (Twilio).",
  },
  {
    heading: "Security Layer",
    detail:
      "OIDC-compliant auth (Auth0/Clerk) with RBAC, centralized secrets via Doppler, automated compliance scanning, SIEM logging to Datadog.",
  },
];

const dataModelEntities = [
  {
    name: "User",
    attributes:
      "id, role (learner/employer/recruiter/admin), contact info, verification status, consent flags",
    relationships: "1:N with Enrolment, Application, AuditLog",
  },
  {
    name: "Organisation",
    attributes:
      "id, type (employer/training partner), accreditation level, billing profile",
    relationships: "1:N Users, 1:N JobPostings, 1:N Contracts",
  },
  {
    name: "Course",
    attributes:
      "id, category, accreditation body, modality, language, duration, price",
    relationships: "1:N Modules, 1:N Enrolments, N:M Competencies",
  },
  {
    name: "Module",
    attributes:
      "id, content package ref, SCORM manifest, assessment ids",
    relationships: "1:N Assessments",
  },
  {
    name: "Assessment",
    attributes:
      "id, type (quiz/exam/practical), question bank ref, pass criteria, proctoring status",
    relationships: "1:N Attempts",
  },
  {
    name: "Enrolment",
    attributes:
      "id, userId, courseId, status, progress %, issuedCertificates[]",
    relationships: "N:1 User, N:1 Course, 1:N Attempts",
  },
  {
    name: "Certificate",
    attributes:
      "id, enrolmentId, credentialId, issueDate, expiryDate, verificationHash",
    relationships: "N:1 Enrolment",
  },
  {
    name: "JobPosting",
    attributes:
      "id, organisationId, role, location, clearance level, pay band, licence requirements",
    relationships: "1:N Applications",
  },
  {
    name: "Application",
    attributes:
      "id, jobId, candidateId, stage, vetting status, interviewer notes",
    relationships: "N:1 JobPosting, N:1 User",
  },
  {
    name: "Match",
    attributes:
      "id, applicationId, score components, recommendation rationale",
    relationships: "N:1 Application",
  },
  {
    name: "AuditLog",
    attributes:
      "id, actorId, action, entity, payload snapshot, timestamp, ip",
    relationships: "N:1 User",
  },
];

const complianceChecklist = [
  "GDPR/UK DPA 2018: DPIA, data minimisation, SAR workflows, retention schedules.",
  "ISO 27001 roadmap: documented ISMS, risk register, supplier due diligence, quarterly reviews.",
  "SIA-aligned training accreditation: align with Ofqual Level 2/3 frameworks, maintain trainer verification and CPD logs.",
  "Identity verification: KYC for learners, right-to-work and DBS integration for placements.",
  "Accessibility (WCAG 2.2 AA) across portals, including screen-reader support and multilingual content.",
  "Secure coding standards (OWASP ASVS), annual penetration testing, vulnerability management SLAs.",
  "Data residency within UK/EU, encryption at rest (AES-256) and in transit (TLS 1.2+).",
  "Role-based access policies with least privilege, quarterly access reviews, comprehensive audit logging.",
];

const deploymentSteps = [
  "Monorepo with frontend (Next.js) and backend (NestJS) packages managed via Turborepo.",
  "CI via GitHub Actions: lint, type-check, unit/integration tests, security scans (Snyk/Dependabot).",
  "Automated migrations using Prisma or Sequelize; review gates before production deploys.",
  "Staging environment on Vercel + Fly.io mirroring production integrations for UAT and penetration testing.",
  "Monitoring with Datadog or New Relic; structured logging shipped to OpenSearch; uptime checks via Better Uptime.",
  "Backups: daily PostgreSQL snapshots, weekly disaster recovery drills, object storage versioning.",
];

const budgetPhases = [
  {
    name: "Discovery & Compliance Blueprint",
    timeline: "Weeks 1-2",
    cost: "£12k-£18k",
    focus: "Stakeholder interviews, requirements, compliance mapping, technical architecture, MVP backlog finalisation.",
  },
  {
    name: "MVP Build Sprint 1",
    timeline: "Weeks 3-6",
    cost: "£45k-£60k",
    focus: "Core platform setup, authentication, course catalogue, basic learner portal, initial job board.",
  },
  {
    name: "MVP Build Sprint 2",
    timeline: "Weeks 7-10",
    cost: "£40k-£55k",
    focus: "Assessments, progress tracking, employer portal, recruitment workflows, analytics baseline.",
  },
  {
    name: "Stabilisation & Launch",
    timeline: "Weeks 11-12",
    cost: "£15k-£22k",
    focus: "Security hardening, content migration, UAT/training, deployment, go-to-market assets.",
  },
];

const successMetrics = [
  {
    category: "Learner Acquisition",
    metrics: [
      "Website-to-enrolment conversion rate",
      "Cost per qualified lead",
      "Monthly active learners",
    ],
  },
  {
    category: "Learning Outcomes",
    metrics: [
      "Course completion rate within target duration",
      "Assessment pass rate and resit frequency",
      "Certificate renewal adherence",
    ],
  },
  {
    category: "Placement Efficiency",
    metrics: [
      "Time-to-hire from course completion",
      "Employer repeat engagement",
      "Candidate satisfaction (CSAT/NPS)",
    ],
  },
  {
    category: "Operational Excellence",
    metrics: [
      "Incident response SLA compliance",
      "System uptime and page performance (Core Web Vitals)",
      "Data subject request resolution time",
    ],
  },
];

const techStack = [
  {
    layer: "Frontend",
    choice:
      "Next.js 14 App Router, TypeScript, Tailwind, React Query, Zustand for state, i18next for localisation, Vercel hosting.",
  },
  {
    layer: "Backend",
    choice:
      "NestJS with GraphQL + REST, Prisma ORM, Node 20 runtime on Fly.io or AWS Fargate, background workers via BullMQ.",
  },
  {
    layer: "Data",
    choice:
      "PostgreSQL (Supabase/AWS RDS), Redis (Upstash) for caching/queues, S3-compatible storage for assets, OpenSearch for search.",
  },
  {
    layer: "Identity & Compliance",
    choice:
      "Auth0/Clerk for auth + MFA, Onfido for verification, Drata for compliance automation, Vanta-style continuous monitoring.",
  },
  {
    layer: "Analytics",
    choice:
      "Mixpanel for product analytics, Metabase for BI, customer data platform via Segment to orchestrate journeys.",
  },
];

const mvpMilestones = [
  {
    milestone: "MVP Scope Freeze",
    deadline: "End of Week 2",
    outcomes: [
      "Signed-off requirements, prioritised backlog, staffing plan",
      "Compliance blueprint and risk register",
    ],
  },
  {
    milestone: "Portal Alpha",
    deadline: "Week 6",
    outcomes: [
      "Authentication across roles, course catalogue browsing, enrolment flow",
      "Employer job posting, basic admin controls",
    ],
  },
  {
    milestone: "Beta with Assessments",
    deadline: "Week 9",
    outcomes: [
      "Assessment engine, progress tracking, certificate issuance",
      "Matching engine v1 with manual overrides",
    ],
  },
  {
    milestone: "Launch Readiness",
    deadline: "Week 12",
    outcomes: [
      "Security testing passed, analytics dashboards live, GTM assets prepared",
      "Support and operations playbooks published",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/60 backdrop-blur border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-300">
              Virpio Security & Agile Security Training
            </p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
              Security Education & Recruitment Transformation Blueprint
            </h1>
          </div>
          <div className="max-w-md text-sm text-slate-300">
            <p>
              Consultant recommendation package aligning with SIA standards, accelerating
              compliant training delivery and talent placement for a mid-sized provider.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">Market Positioning</h2>
          <p className="text-slate-300">
            Comparative view of UK security education and placement competitors with actionable
            whitespace opportunities.
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-900/60 text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">Segment</th>
                  <th className="px-4 py-3">Strengths</th>
                  <th className="px-4 py-3">Gaps</th>
                  <th className="px-4 py-3">Pricing</th>
                  <th className="px-4 py-3">Opportunity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {competitors.map((competitor) => (
                  <tr key={competitor.name} className="hover:bg-slate-900/80">
                    <td className="px-4 py-4 font-medium text-slate-100">
                      {competitor.name}
                    </td>
                    <td className="px-4 py-4 text-slate-300">{competitor.segment}</td>
                    <td className="px-4 py-4 text-slate-300">{competitor.strengths}</td>
                    <td className="px-4 py-4 text-slate-300">{competitor.gaps}</td>
                    <td className="px-4 py-4 text-slate-300">{competitor.pricing}</td>
                    <td className="px-4 py-4 text-slate-300">{competitor.opportunities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold text-indigo-200">Exploitable Gaps</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
              {positioningInsights.map((insight) => (
                <li key={insight}>{insight}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">Architecture Overview</h2>
          <p className="text-slate-300">
            Layered blueprint aligning web experience, services, integrations, and security for
            scalable delivery.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {architectureLayers.map((layer) => (
              <div
                key={layer.heading}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-100">{layer.heading}</h3>
                <p className="mt-2 text-sm text-slate-300">{layer.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">MVP Feature Set & Workflows</h2>
          <p className="text-slate-300">
            Prioritised feature pillars to deliver a compliant, outcome-focused learner and employer
            experience within 12 weeks.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {mvpFeatureSets.map((featureSet) => (
              <div
                key={featureSet.title}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-100">{featureSet.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {featureSet.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">Suggested Tech Stack</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {techStack.map((stack) => (
              <div
                key={stack.layer}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-100">{stack.layer}</h3>
                <p className="mt-2 text-sm text-slate-300">{stack.choice}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">Data Model Outline</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {dataModelEntities.map((entity) => (
              <div
                key={entity.name}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-100">{entity.name}</h3>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="font-semibold text-slate-100">Attributes:</span> {entity.attributes}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="font-semibold text-slate-100">Relationships:</span> {entity.relationships}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">Security & Compliance Checklist</h2>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {complianceChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">Deployment & Operations</h2>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {deploymentSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">MVP Milestones & Timeline</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mvpMilestones.map((milestone) => (
              <div
                key={milestone.milestone}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-100">{milestone.milestone}</h3>
                <p className="mt-1 text-sm text-indigo-200">{milestone.deadline}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {milestone.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">Budget & Resourcing</h2>
          <p className="text-slate-300">
            Indicative ranges for a blended team (product, design, engineering, compliance) suitable
            for a mid-sized organisation.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {budgetPhases.map((phase) => (
              <div
                key={phase.name}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-100">{phase.name}</h3>
                <p className="mt-1 text-sm text-indigo-200">{phase.timeline}</p>
                <p className="mt-1 text-sm font-medium text-slate-100">{phase.cost}</p>
                <p className="mt-3 text-sm text-slate-300">{phase.focus}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-200">Success Metrics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {successMetrics.map((group) => (
              <div
                key={group.category}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-100">{group.category}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {group.metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-slate-500">
          © {new Date().getFullYear()} Virpio Security & Agile Security Training. Strategic plan prepared for SIA-aligned growth.
        </div>
      </footer>
    </div>
  );
}
