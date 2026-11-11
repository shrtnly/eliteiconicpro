import {
  Compass,
  Target,
  ShieldCheck,
  Trees,
  CheckCircle2,
  Users,
  Calendar,
  ChevronRight,
  FileText,
  Award,
  Sparkles,
  Building2
} from 'lucide-react'
import './MissionVisionPage.css'

export default function MissionVisionPage({ lang = 'en', onScheduleVisit, navigateTo }) {
  const isBn = lang === 'bn'

  const highlights = [
    {
      icon: ShieldCheck,
      titleBn: 'শতভাগ নিষ্কণ্টক মালিকানা',
      titleEn: '100% Clear Land Title',
      subBn: 'সিএস, এসএ, আরএস ও বিএস যাচাইকৃত',
      subEn: 'CS, SA, RS & BS Legally Audited'
    },
    {
      icon: Award,
      titleBn: 'রাজউক নিবন্ধিত প্রকল্প',
      titleEn: 'RAJUK Registered',
      subBn: 'নিবন্ধন: RAJUK/DC/REDMR 001262/24',
      subEn: 'Reg: RAJUK/DC/REDMR 001262/24'
    },
    {
      icon: Trees,
      titleBn: 'পরিবেশবান্ধব সবুজ নগরায়ন',
      titleEn: 'Eco-Smart Urbanism',
      subBn: 'সুপরিকল্পিত লেক, পার্ক ও প্রশস্ত সড়ক',
      subEn: 'Lakes, Green Parks & Wide Avenues'
    },
    {
      icon: Building2,
      titleBn: 'সময়মতো হস্তান্তর অঙ্গীকার',
      titleEn: 'On-Time Handover Pledge',
      subBn: 'কিস্তি ও নগদে দ্রুত সাফ-কবলা',
      subEn: 'Fast Registry & Milestone Clarity'
    }
  ]

  const visionPoints = [
    {
      bn: 'বাংলাদেশের সর্বাধিক বিশ্বস্ত ও টেকসই মেগা টাউনশিপ নির্মাতা হিসেবে প্রতিষ্ঠা লাভ।',
      en: 'Establish Bangladesh’s most respected benchmark in sustainable mega-township development.'
    },
    {
      bn: 'সবুজ উদ্যান, প্রাকৃতিক জলাশয় ও স্মার্ট ভূগর্ভস্থ ইউটিলিটি ব্যবস্থার সমন্বয়ে স্বাস্থ্যকর আবাসন নিশ্চিত করা।',
      en: 'Integrate green belts, natural water bodies, and smart underground civic utilities for healthier living.'
    },
    {
      bn: 'আগামী প্রজন্মের জন্য নিরাপদ, আধুনিক ও উচ্চ মূল্যায়নযোগ্য নাগরিক সমাজ গড়ে তোলা।',
      en: 'Create future-ready communities that deliver enduring generational pride and capital growth.'
    }
  ]

  const missionPoints = [
    {
      bn: 'প্রতিটি গ্রাহককে শতভাগ ভেজালমুক্ত, আইনিভাবে সুরক্ষিত এবং রাজউক বিধিমালা অনুসারী প্লট হস্তান্তর।',
      en: 'Deliver 100% dispute-free plots backed by verified land titles and strict RAJUK compliance.'
    },
    {
      bn: 'স্বল্প ডাউন পেমেন্ট ও ৬০ মাস পর্যন্ত সুদমুক্ত সহজ কিস্তির মাধ্যমে মধ্যবিত্ত ও প্রবাসীদের আবাসন স্বপ্ন পূরণ।',
      en: 'Make prime land ownership accessible through 20% down payment and up to 60-month flexible installments.'
    },
    {
      bn: 'প্রকৌশল উৎকর্ষতা, স্বচ্ছ ডকুমেন্টেশন ও নির্ধারিত সময়ের মধ্যে অবকাঠামো উন্নয়ন ও হস্তান্তর সম্পন্ন করা।',
      en: 'Uphold engineering excellence, open document verification, and punctual project handover milestones.'
    }
  ]

  const corePillars = [
    {
      idx: '01',
      icon: ShieldCheck,
      titleBn: 'আইনি স্বচ্ছতা ও নিরাপত্তা',
      titleEn: 'Legal Transparency & Security',
      descBn: 'বুকিংয়ের পূর্বেই সকল খতিয়ান, দলিল ও সরকারি নিবন্ধনপত্র সরাসরি যাচাই করার পূর্ণ স্বাধীনতা।',
      descEn: 'Clients can inspect original chain-of-title records, registration papers, and approvals before booking.'
    },
    {
      idx: '02',
      icon: Trees,
      titleBn: 'টেকসই সবুজ পরিবেশ',
      titleEn: 'Sustainable Green Living',
      descBn: '১০০, ৮০, ৬০ ও ৪০ ফুট প্রশস্ত সড়কের পাশাপাশি উন্মুক্ত পার্ক, লেকভিউ এবং পর্যাপ্ত বনায়ন।',
      descEn: 'Thoughtful zoning balancing wide 40\'–100\' roads with open parks, lake promenades, and tree canopies.'
    },
    {
      idx: '03',
      icon: CheckCircle2,
      titleBn: 'প্রতিশ্রুতিবদ্ধ হস্তান্তর',
      titleEn: 'Committed Delivery Standards',
      descBn: 'নির্ধারিত সময়সীমার মধ্যে বালু ভরাট, বাউন্ডারি, ড্রেনেজ এবং রাস্তা নির্মাণ কাজ সম্পন্ন করা।',
      descEn: 'Disciplined engineering schedules covering land filling, drainage, boundary security, and paved roads.'
    },
    {
      idx: '04',
      icon: Users,
      titleBn: 'সম্মিলিত বোর্ড নেতৃত্ব',
      titleEn: 'Unified Board Stewardship',
      descBn: '১১২ জন প্রতিষ্ঠাতা পরিচালকের তত্ত্বাবধানে প্রাতিষ্ঠানিক জবাবদিহিতা ও আর্থিক সুশাসন নিশ্চিতকরণ।',
      descEn: 'Guided by institutional accountability and collective governance from 112 honorable founder directors.'
    }
  ]

  const roadmapSteps = [
    {
      step: 'PHASE 01',
      titleBn: 'আইনি যাচাই ও মাস্টার প্ল্যানিং',
      titleEn: 'Legal Audit & Master Planning',
      descBn: 'জমির সম্পূর্ণ স্বত্ব যাচাই, পরিবেশ ছাড়পত্র প্রক্রিয়াকরণ এবং আধুনিক নগর পরিকল্পনাবিদদের দ্বারা ব্লক লেআউট প্রণয়ন।',
      descEn: 'Complete land title diligence, statutory clearances, and expert urban sector layout engineering.'
    },
    {
      step: 'PHASE 02',
      titleBn: 'অভ্যন্তরীণ সড়ক ও ইউটিলিটি',
      titleEn: 'Roads & Core Infrastructure',
      descBn: 'প্রশস্ত প্রধান এভিনিউ, কালভার্ট, সুয়ারেজ, স্টর্ম ড্রেনেজ ও বিদ্যুৎ অবকাঠামোর দ্রুত বাস্তবায়ন।',
      descEn: 'Construction of wide connecting avenues, bridges, storm drainage, and dedicated power networks.'
    },
    {
      step: 'PHASE 03',
      titleBn: 'নাগরিক সুবিধা ও সবুজ উদ্যান',
      titleEn: 'Civic Hubs & Green Spaces',
      descBn: 'কেন্দ্রীয় মসজিদ, শিক্ষা অঞ্চল, কনভেনশন সেন্টার, শপিং জোন ও লেকসাইড পার্ক ডেভেলপমেন্ট।',
      descEn: 'Developing the central mosque, educational zones, commercial avenues, and landscaped lakeside parks.'
    },
    {
      step: 'PHASE 04',
      titleBn: 'দলিল রেজিস্ট্রি ও কমিউনিটি হস্তান্তর',
      titleEn: 'Registry & Community Handover',
      descBn: 'দ্রুত সাফ-কবলা রেজিস্ট্রেশন, নামজারি সহায়তা ও আধুনিক গেটেড কমিউনিটি পরিচালনা শুরু।',
      descEn: 'Seamless deed registration, mutation support, and transition into a secure gated township.'
    }
  ]

  return (
    <main className="mission-vision-page">
      {/* 1. ARCHITECTURAL HERO BANNER */}
      <section className="mv-hero-section">
        <svg
          className="mv-hero-bg-svg"
          viewBox="0 0 1440 380"
          preserveAspectRatio="xMidYBottom slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mvSkylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(120, 224, 166, 0.14)" />
              <stop offset="100%" stopColor="rgba(120, 224, 166, 0.0)" />
            </linearGradient>
          </defs>
          <g stroke="rgba(120, 224, 166, 0.14)" strokeWidth="1" fill="url(#mvSkylineGrad)">
            <rect x="85" y="180" width="54" height="170" />
            <rect x="152" y="135" width="68" height="215" />
            <rect x="234" y="205" width="46" height="145" />
            <rect x="1140" y="155" width="64" height="195" />
            <rect x="1216" y="118" width="76" height="232" />
            <rect x="1304" y="190" width="52" height="160" />
          </g>
          <line x1="0" y1="350" x2="1440" y2="350" stroke="rgba(120, 224, 166, 0.22)" strokeWidth="1.5" />
        </svg>

        <div className="section-container mv-hero-inner">
          <div className="mv-hero-content">
            <div className="mv-hero-kicker">
              <Sparkles size={13} />
              <span>{isBn ? 'আমাদের লক্ষ্য ও ভবিষ্যৎ রূপকল্প' : 'OUR PURPOSE & STRATEGIC DIRECTION'}</span>
            </div>

            <h1 className="mv-hero-title">
              {isBn ? (
                <>
                  <span className="title-white">আমাদের মিশন ও </span>
                  <span className="title-mint">ভবিষ্যৎ রূপকল্প</span>
                </>
              ) : (
                <>
                  <span className="title-white">Mission &amp; </span>
                  <span className="title-mint">Vision</span>
                </>
              )}
            </h1>

            <div className="mv-hero-divider" aria-hidden="true" />

            <p className="mv-hero-subtitle">
              {isBn
                ? 'সততা, আইনি স্বচ্ছতা ও আধুনিক নগর পরিকল্পনার মাধ্যমে প্রতিটি পরিবারের জন্য নিরাপদ বিনিয়োগ এবং প্রজন্মের পর প্রজন্ম বেঁচে থাকার উপযোগী সবুজ টাউনশিপ বিনির্মাণ করাই আমাদের অঙ্গীকার।'
                : 'Guided by legal transparency, engineering excellence, and sustainable urban planning to create secure real estate investments and livable future townships across Dhaka.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING PURPOSE HIGHLIGHTS */}
      <div className="section-container mv-overlap-wrap">
        <div className="mv-highlights-bar">
          {highlights.map((item, index) => {
            const IconComp = item.icon
            return (
              <div key={index} className="mv-highlight-item">
                <div className="mv-highlight-icon">
                  <IconComp size={21} />
                </div>
                <div className="mv-highlight-body">
                  <strong>{isBn ? item.titleBn : item.titleEn}</strong>
                  <span>{isBn ? item.subBn : item.subEn}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. VISION & MISSION TWIN STATEMENTS */}
      <section className="mv-statements-section">
        <div className="section-container">
          <div className="amenities-center-header">
            <div className="amenities-kicker-row">
              <span className="amenities-kicker-rule" aria-hidden="true" />
              <span className="amenities-kicker-text">
                {isBn ? 'প্রতিষ্ঠানের মূল দর্শন' : 'OUR DRIVING PURPOSE'}
              </span>
              <span className="amenities-kicker-rule" aria-hidden="true" />
            </div>

            <h2 className="amenities-main-title">
              {isBn ? 'রূপকল্প, মিশন ও অঙ্গীকার' : 'Vision & Mission Statements'}
            </h2>

            <div className="amenities-dual-divider" aria-hidden="true">
              <span className="divider-seg-green" />
              <span className="divider-seg-gold" />
            </div>

            <p className="amenities-sub-desc">
              {isBn
                ? 'গ্রাহকের আস্থাকে সর্বোচ্চ অগ্রাধিকার দিয়ে আমরা গড়ে তুলছি এমন একটি আবাসন ব্যবস্থা যেখানে স্বচ্ছতা, মান ও বিনিয়োগের নিরাপত্তা একসাথে নিশ্চিত হয়।'
                : 'Every milestone at Elite Iconic is anchored in customer trust, transparent governance, and measurable urban quality.'}
            </p>
          </div>

          <div className="mv-statements-grid">
            {/* Vision Card */}
            <article className="mv-statement-card vision">
              <div className="mv-card-header-row">
                <div className="mv-card-icon-circle gold">
                  <Compass size={27} />
                </div>
                <span className="mv-card-badge gold">
                  {isBn ? 'আমাদের রূপকল্প' : 'OUR VISION'}
                </span>
              </div>

              <h3 className="mv-statement-title">
                {isBn ? 'টেকসই ও স্মার্ট আগামীর নগরী বিনির্মাণ' : 'Pioneering Sustainable Future Townships'}
              </h3>

              <p className="mv-statement-lead">
                {isBn
                  ? 'বাংলাদেশের শীর্ষস্থানীয় ও সর্বাধিক নির্ভরযোগ্য আবাসন প্রতিষ্ঠান হিসেবে পরিবেশবান্ধব, সুপরিকল্পিত এবং আধুনিক নাগরিক সুযোগ-সুবিধা সম্বলিত এমন সব মেগা টাউনশিপ গড়ে তোলা, যা ভবিষ্যৎ প্রজন্মের জন্য গর্বের ঠিকানা হয়ে থাকবে।'
                  : 'To stand as Bangladesh’s most respected and visionary real estate leader, curating eco-resilient, smart, and fully integrated urban communities that elevate life for generations.'}
              </p>

              <ul className="mv-points-list">
                {visionPoints.map((pt, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={17} />
                    <span>{isBn ? pt.bn : pt.en}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Mission Card */}
            <article className="mv-statement-card mission">
              <div className="mv-card-header-row">
                <div className="mv-card-icon-circle emerald">
                  <Target size={27} />
                </div>
                <span className="mv-card-badge emerald">
                  {isBn ? 'আমাদের মিশন' : 'OUR MISSION'}
                </span>
              </div>

              <h3 className="mv-statement-title">
                {isBn ? 'নিরাপদ বিনিয়োগ ও স্বচ্ছ মালিকানা নিশ্চিত করা' : 'Delivering Trust, Clarity & Enduring Value'}
              </h3>

              <p className="mv-statement-lead">
                {isBn
                  ? 'প্রতিটি প্লট শতভাগ নিষ্কণ্টক আইনি মালিকানায়, সুপরিকল্পিত মাস্টার প্ল্যানে এবং যথাসময়ে গ্রাহকের হাতে তুলে দেওয়া। পাশাপাশি সহজ ডাউন পেমেন্ট ও দীর্ঘমেয়াদী কিস্তির মাধ্যমে সকল শ্রেণির মানুষের জন্য স্বপ্নের ঠিকানা সহজলভ্য করা।'
                  : 'To deliver 100% dispute-free land ownership backed by rigorous regulatory compliance, timely infrastructure handover, and flexible installment plans tailored for local and NRB families.'}
              </p>

              <ul className="mv-points-list">
                {missionPoints.map((pt, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={17} />
                    <span>{isBn ? pt.bn : pt.en}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 4. 4 CORE PILLARS */}
      <section className="mv-pillars-section">
        <div className="section-container">
          <div className="amenities-center-header">
            <div className="amenities-kicker-row">
              <span className="amenities-kicker-rule" aria-hidden="true" />
              <span className="amenities-kicker-text">
                {isBn ? 'কাজের মূলনীতি' : 'FOUNDATIONAL PRINCIPLES'}
              </span>
              <span className="amenities-kicker-rule" aria-hidden="true" />
            </div>

            <h2 className="amenities-main-title">
              {isBn ? 'আমাদের ৪টি মূল স্তম্ভ' : '4 Core Pillars of Our Organization'}
            </h2>

            <div className="amenities-dual-divider" aria-hidden="true">
              <span className="divider-seg-green" />
              <span className="divider-seg-gold" />
            </div>
          </div>

          <div className="mv-pillars-grid">
            {corePillars.map((pillar) => {
              const IconComp = pillar.icon
              return (
                <div key={pillar.idx} className="mv-pillar-card">
                  <div className="mv-pillar-top">
                    <div className="mv-pillar-icon">
                      <IconComp size={21} />
                    </div>
                    <span className="mv-pillar-num">{pillar.idx}</span>
                  </div>
                  <h3>{isBn ? pillar.titleBn : pillar.titleEn}</h3>
                  <p>{isBn ? pillar.descBn : pillar.descEn}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. EXECUTION ROADMAP */}
      <section className="mv-roadmap-section">
        <div className="section-container">
          <div className="mv-roadmap-header">
            <span className="mv-roadmap-kicker">
              {isBn ? 'বাস্তবায়ন রোডম্যাপ' : 'HOW WE DELIVER ON OUR PROMISE'}
            </span>
            <h2>
              {isBn ? 'পরিকল্পনা থেকে হস্তান্তর — আমাদের ৪ ধাপ' : '4-Phase Commitment from Plan to Handover'}
            </h2>
            <p>
              {isBn
                ? 'প্রতিটি ধাপে মান নিয়ন্ত্রণ ও স্বচ্ছ ডকুমেন্টেশনের মাধ্যমে আমরা গ্রাহকের স্বপ্নকে বাস্তবে রূপ দিই।'
                : 'Structured execution ensuring legal certainty, engineering quality, and community readiness at every stage.'}
            </p>
          </div>

          <div className="mv-roadmap-grid">
            {roadmapSteps.map((item) => (
              <div key={item.step} className="mv-roadmap-step">
                <span className="mv-step-badge">{item.step}</span>
                <h3>{isBn ? item.titleBn : item.titleEn}</h3>
                <p>{isBn ? item.descBn : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXECUTIVE CONSULTATION CTA */}
      <section className="mv-cta-section">
        <div className="section-container">
          <div className="mv-cta-box">
            <div className="mv-cta-copy">
              <span className="mv-cta-kicker">
                {isBn ? 'সরাসরি পরামর্শ ও নথি যাচাই' : 'EXPERIENCE THE VISION FIRSTHAND'}
              </span>
              <h2>
                {isBn
                  ? 'ঢাকা আইকন সিটি প্রকল্প ও মূল নথিপত্র সরাসরি দেখুন'
                  : 'Inspect Our Master Plan & Legal Papers in Person'}
              </h2>
              <p>
                {isBn
                  ? 'আমাদের গুলশান-০১ কর্পোরেট কার্যালয়ে এসে কিংবা সাইট ভিজিটের মাধ্যমে আমাদের প্রকল্পের বাস্তব অগ্রগতি ও রাজউক নিবন্ধিত নথি যাচাই করুন।'
                  : 'Schedule a VIP site tour or executive consultation at our Gulshan-01 corporate office to review our master plan and RAJUK registration documents.'}
              </p>
            </div>

            <div className="mv-cta-actions">
              <button
                type="button"
                className="mv-btn-primary"
                onClick={onScheduleVisit}
              >
                <Calendar size={17} />
                <span>{isBn ? 'ভিজিট শিডিউল করুন' : 'Schedule Visit'}</span>
                <ChevronRight size={17} />
              </button>
              <button
                type="button"
                className="mv-btn-secondary"
                onClick={() => navigateTo && navigateTo('legal-documents')}
              >
                <FileText size={17} />
                <span>{isBn ? 'আইনি নথিপত্র দেখুন' : 'View Legal Docs'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

