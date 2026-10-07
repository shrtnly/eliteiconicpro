import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Target, 
  Compass, 
  CheckCircle2, 
  Trees, 
  Landmark, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Calendar, 
  ChevronRight, 
  Users, 
  FileText, 
  TrendingUp,
  Layers,
  Scale
} from 'lucide-react'

export default function CorporateAboutPage({ lang = 'en', onScheduleVisit, navigateTo }) {
  const isBn = lang === 'bn'

  const services = [
    {
      id: 1,
      icon: Trees,
      titleBn: "মেগা টাউনশিপ ও প্লট উন্নয়ন",
      titleEn: "Mega Township & Land Development",
      descBn: "পরিকল্পিত মাস্টার প্ল্যানে ১০০', ৮০', ৬০' ও ৪০' ফুট প্রশস্ত এভিনিউ রোড, লেকভিউ এবং শতভাগ নিষ্কণ্টক আবাসিক ও বাণিজ্যিক প্লট উন্নয়ন।",
      descEn: "Developing master-planned townships with 100', 80', 60' and 40' wide avenues, lakeside promenades, and 100% unencumbered plots.",
      tagBn: "মূল সেবা",
      tagEn: "Core Service",
      image: "/land-development.png"
    },
    {
      id: 2,
      icon: Layers,
      titleBn: "আর্কিটেকচারাল ও মাস্টার প্ল্যানিং",
      titleEn: "Architectural & Master Planning",
      descBn: "বুয়েট ও আন্তর্জাতিক নগর পরিকল্পনাবিদদের তত্ত্বাবধানে আধুনিক ড্রেনেজ, সুয়ারেজ, ভূগর্ভস্থ ক্যাবলিং ও সবুজ ইকোলজিক্যাল জোন বাস্তবায়ন।",
      descEn: "World-class urban and ecological master planning supervised by BUET and renowned architects with integrated civic infrastructure.",
      tagBn: "পরিকল্পনা",
      tagEn: "Planning",
      image: "/feasibility-study.png"
    },
    {
      id: 3,
      icon: Building2,
      titleBn: "ভবন ও অবকাঠামো নির্মাণ",
      titleEn: "Building & Infrastructure Construction",
      descBn: "আধুনিক যন্ত্রপাতি ও প্রকৌশল উৎকর্ষতায় কালভার্ট, ব্রিজ, গার্ডওয়াল, কেন্দ্রীয় মসজিদ, স্কুল এবং গেটেড কমিউনিটি অবকাঠামো নির্মাণ।",
      descEn: "High-grade civil infrastructure execution including bridges, culverts, boundary walls, central mosque, and civic facilities.",
      tagBn: "নির্মাণ",
      tagEn: "Construction",
      image: "/building-development.png"
    },
    {
      id: 4,
      icon: Scale,
      titleBn: "আইনি সেবা, রেজিস্ট্রি ও নামজারি",
      titleEn: "Legal Advisory, Registration & Mutation",
      descBn: "সিএস, এসএ, আরএস, বিএস খতিয়ান ও ডিসিআর যাচাইপূর্বক সম্পূর্ণ নিরাপদ দলিল সম্পাদন, নামজারি ও তাৎক্ষণিক সাফ-কবলা হস্তান্তর।",
      descEn: "End-to-end legal verification of land records (CS/SA/RS/BS), zero dispute assurance, and fast-track deed registration & mutation.",
      tagBn: "আইনি সুরক্ষা",
      tagEn: "Legal Security",
      image: "/feasibility-study.png"
    },
    {
      id: 5,
      icon: TrendingUp,
      titleBn: "ভূমি সম্ভাব্যতা যাচাই ও ইনভেস্টমেন্ট অ্যাডভাইজরি",
      titleEn: "Feasibility Study & Investment Advisory",
      descBn: "রিয়েল এস্টেট খাতের সর্বোচ্চ মূল্যায়নে লাভজনক প্লট নির্বাচন, ভবিষ্যত প্রবৃদ্ধি বিশ্লেষণ ও প্রবাসীদের জন্য নির্ভরযোগ্য ইনভেস্টমেন্ট গাইড।",
      descEn: "High-yield real estate investment counseling, land valuation, ROI forecasting, and priority portfolio management for NRB investors.",
      tagBn: "পরামর্শ",
      tagEn: "Advisory",
      image: "/land-development.png"
    },
    {
      id: 6,
      icon: Landmark,
      titleBn: "সহজ কিস্তি ও কাস্টমাইজড পেমেন্ট প্ল্যান",
      titleEn: "Flexible Installments & Payment Plans",
      descBn: "মাত্র ২০% ডাউন পেমেন্টে প্লট বুকিং এবং মধ্যবিত্ত ও চাকুরিজীবীদের জন্য ৬০ মাস পর্যন্ত সুদমুক্ত সহজ কিস্তি সুবিধা।",
      descEn: "Affordable booking starting at just 20% down payment with tailored up to 60-month interest-free installment options.",
      tagBn: "আর্থিক সুবিধা",
      tagEn: "Financing",
      image: "/building-development.png"
    }
  ]

  const coreValues = [
    {
      titleBn: "শতভাগ আইনি সুরক্ষা ও নিষ্কণ্টক জমি",
      titleEn: "100% Legal Transparency & Clear Title",
      descBn: "প্রতিটি প্রকল্পে সরকারি নিয়ম ও রাজউক বিধিমালা অনুসরণ করে সম্পূর্ণ ভেজালমুক্ত জমিতে প্লট বরাদ্দ দেওয়া হয়।",
      descEn: "Every project adheres strictly to RAJUK and government regulations on completely unencumbered land."
    },
    {
      titleBn: "টেকসই ও পরিবেশবান্ধব সবুজ নগরায়ন",
      titleEn: "Sustainable Eco-Friendly Urbanism",
      descBn: "প্রাকৃতিক লেক, উন্মুক্ত উদ্যান এবং আধুনিক ড্রেনেজ ব্যবস্থার সমন্বয়ে বাসযোগ্য আগামী তৈরি করাই আমাদের লক্ষ্য।",
      descEn: "Preserving natural water bodies and expansive green canopies to foster sustainable community living."
    },
    {
      titleBn: "গ্রাহক সন্তুষ্টি ও সময়মতো হস্তান্তর",
      titleEn: "Customer Centricity & Timely Handover",
      descBn: "অঙ্গীকার অনুযায়ী নির্দিষ্ট সময়ে প্লট উন্নয়ন ও বুঝিয়ে দেওয়ার বিষয়ে আমরা আপসহীন ও দায়বদ্ধ।",
      descEn: "Uncompromising commitment to scheduled development milestones, handover, and client satisfaction."
    },
    {
      titleBn: "অভিজ্ঞ পরিচালনা ও আর্থিক স্বচ্ছতা",
      titleEn: "Experienced Leadership & Trust",
      descBn: "১১২ জন স্বনামধন্য প্রতিষ্ঠাতা পরিচালক ও দক্ষ ম্যানেজমেন্ট টিমের সার্বক্ষণিক তত্ত্বাবধানে পরিচালিত।",
      descEn: "Governed with absolute integrity under the stewardship of 112 honorable founder directors."
    }
  ]

  return (
    <main className="corporate-about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero-section">
        <div className="section-container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">
              {isBn ? 'এলিট আইকনিক প্রপার্টিজ এন্ড কনস্ট্রাকশন লিঃ' : 'Elite Iconic Properties & Construction Ltd.'}
            </h1>
            <div className="section-divider-line" />
            <p className="about-hero-subtitle">
              {isBn 
                ? 'বিশ্বস্ততা, টেকসই নগর উন্নয়ন এবং আধুনিক জীবনযাত্রার অঙ্গীকার নিয়ে ঢাকার বুকে ভবিষ্যৎ প্রজন্মের জন্য গড়ে তুলছি আধুনিক মেগা টাউনশিপ।'
                : 'Pioneering sustainable urban development, trusted land acquisition, and state-of-the-art master-planned townships in Dhaka.'}
            </p>

            {/* Hero Quick Key Highlights Ribbon */}
            <div className="about-highlights-strip">
              <div className="about-highlight-item">
                <span className="hl-val">১৫+</span>
                <span className="hl-lbl">{isBn ? 'বছরের সম্মিলিত অভিজ্ঞতা' : 'Years Experience'}</span>
              </div>
              <div className="about-highlight-item">
                <span className="hl-val">২,৫০০+</span>
                <span className="hl-lbl">{isBn ? 'কাঠা চলমান ল্যান্ড ব্যাংক' : 'Katha Land Bank'}</span>
              </div>
              <div className="about-highlight-item">
                <span className="hl-val">১১২</span>
                <span className="hl-lbl">{isBn ? 'সম্মানিত প্রতিষ্ঠাতা পরিচালক' : 'Founder Directors'}</span>
              </div>
              <div className="about-highlight-item">
                <span className="hl-val">১০০%</span>
                <span className="hl-lbl">{isBn ? 'নিষ্কণ্টক ও অনুমোদিত জমি' : 'Clean & Verified Land'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="about-who-section" id="who-we-are">
        <div className="section-container">
          <div className="about-who-grid">
            {/* Left Narrative Column */}
            <div className="about-who-text-col">
              <h2 className="about-section-heading">
                {isBn ? 'ঢাকার আধুনিক নগরায়নে আস্থার এক নতুন দিগন্ত' : 'Redefining Urban Living with Unmatched Integrity'}
              </h2>
              <div className="section-divider-line left" />

              <p className="about-paragraph">
                {isBn 
                  ? 'এলিট আইকনিক প্রপার্টিজ এন্ড কনস্ট্রাকশন লিমিটেড বাংলাদেশের রিয়েল এস্টেট খাতের অন্যতম অগ্রগামী প্রতিষ্ঠান। রাজধানী ঢাকার তীব্র যানজট ও দূষণমুক্ত পরিবেশে আধুনিক নাগরিক সকল সুযোগ-সুবিধা নিশ্চিত করে বিশ্বমানের আবাসন গড়ে তোলাই আমাদের প্রধান লক্ষ্য।'
                  : 'Elite Iconic Properties & Construction Limited stands as a premier real estate conglomerate in Bangladesh, committed to delivering sustainable, master-planned living environments close to Dhaka city center.'}
              </p>

              <p className="about-paragraph">
                {isBn 
                  ? 'গোল্ডেন আই ডেভেলপার্স লিমিটেড-এর সুদীর্ঘ অভিজ্ঞতা, ঢাকা ডেভেলপার্স এন্ড রিয়েল এস্টেট গ্রুপ (DD REG) এবং বাংলাদেশ ল্যান্ড ডেভেলপার্স অ্যাসোসিয়েশন (বিএলডিএ)-এর সংশ্লিষ্টতা আমাদের প্রতিটি প্রকল্পের আইনি ও পেশাদার ভিত্তি সুদৃঢ় করেছে। বীরুলিয়া ব্রিজ সংলগ্ন ঢাকা আইকন সিটি ছাড়াও পুষ্প ইকো সিটি, পুষ্প স্যাটেলাইট সিটি এবং ঢাকা ওয়েস্টার্ন ভ্যালির মতো মেগা প্রকল্প বাস্তবায়নে আমরা বদ্ধপরিকর।'
                  : 'Backed by the long-standing industry heritage of Goldeneye Developers Ltd. and affiliations with DD REG and BLDA, our projects offer undisputed land tenure, governmental compliance, and unmatched locational advantages.'}
              </p>

              {/* Verified Trust Credentials Badges */}
              <div className="who-credentials-list">
                <div className="who-cred-chip">
                  <ShieldCheck size={20} className="text-emerald" />
                  <div>
                    <strong>{isBn ? 'রাজউক নিবন্ধন নং:' : 'RAJUK Registration:'}</strong>
                    <span>RAJUK/DC/REDMR 001262/24</span>
                  </div>
                </div>

                <div className="who-cred-chip">
                  <Award size={20} className="text-emerald" />
                  <div>
                    <strong>{isBn ? 'জাতীয় অ্যাসোসিয়েশন সংশ্লিষ্টতা:' : 'National Associations:'}</strong>
                    <span>DD REG & BLDA Member Network</span>
                  </div>
                </div>
              </div>

              <div className="about-cta-btns-row">
                <button 
                  type="button" 
                  className="btn-about-primary"
                  onClick={onScheduleVisit}
                >
                  <Calendar size={18} />
                  <span>{isBn ? 'হেড অফিসে মিটিং শিডিউল করুন' : 'Schedule Office Visit'}</span>
                </button>
                <button 
                  type="button" 
                  className="btn-about-secondary"
                  onClick={() => navigateTo('leadership-team')}
                >
                  <Users size={18} />
                  <span>{isBn ? 'পরিচালনা পর্ষদ দেখুন' : 'View Leadership Team'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="about-who-media-col">
              <div className="who-image-card">
                <img 
                  src="/who-we-are.png" 
                  alt="Elite Iconic Headquarters & Vision" 
                  className="who-main-image"
                />
                <div className="who-image-overlay-stat">
                  <div className="stat-bubble">
                    <strong>100%</strong>
                    <span>{isBn ? 'সরকারি নিয়ম মেনে নিষ্কণ্টক' : 'Fully Regulated & Safe'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION, VISION & CORE VALUES */}
      <section className="about-vision-section" id="mission-vision">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-main-heading">
              {isBn ? 'আমাদের রূপকল্প ও মূল্যবোধ' : 'Our Driving Purpose & Values'}
            </h2>
            <div className="section-divider-line" />
            <p className="section-sub-desc">
              {isBn 
                ? 'স্বচ্ছতা, সততা ও ভবিষ্যৎমুখী চিন্তায় প্রতিটি গ্রাহকের বিনিয়োগকে সুরক্ষিত ও লাভজনক করাই আমাদের সার্বক্ষণিক প্রয়াস।'
                : 'Guided by transparency, accountability, and forward-looking urbanization principles.'}
            </p>
          </div>

          {/* Mission & Vision Twin Cards */}
          <div className="mission-vision-twin-grid">
            {/* Vision Card */}
            <div className="mv-card vision-card">
              <div className="mv-card-top">
                <div className="mv-icon-wrap gold">
                  <Compass size={28} />
                </div>
                <span className="mv-badge gold">{isBn ? 'আমাদের রূপকল্প' : 'Our Vision'}</span>
              </div>
              <h3 className="mv-title">
                {isBn ? 'টেকসই ও স্মার্ট আবাসন গড়ে তোলা' : 'Pioneering Sustainable Townships'}
              </h3>
              <p className="mv-text">
                {isBn 
                  ? 'বাংলাদেশের শীর্ষস্থানীয় ও সর্বাধিক নির্ভরযোগ্য আবাসন ব্র্যান্ড হিসেবে প্রতিষ্ঠিত হয়ে পরিবেশবান্ধব, সুপরিকল্পিত এবং আধুনিক নাগরিক সুযোগ-সুবিধা সম্বলিত এমন সব টাউনশিপ বিনির্মাণ করা যা প্রজন্মের পর প্রজন্ম গর্বের সাথে বেঁচে থাকার পরিবেশ নিশ্চিত করবে।'
                  : 'To stand as Bangladesh’s most respected and visionary real estate leader, curating eco-resilient, smart, and fully integrated urban communities that elevate the quality of human life.'}
              </p>
            </div>

            {/* Mission Card */}
            <div className="mv-card mission-card">
              <div className="mv-card-top">
                <div className="mv-icon-wrap emerald">
                  <Target size={28} />
                </div>
                <span className="mv-badge emerald">{isBn ? 'আমাদের মিশন' : 'Our Mission'}</span>
              </div>
              <h3 className="mv-title">
                {isBn ? 'নিরাপদ বিনিয়োগ ও স্বচ্ছ মালিকানা' : 'Delivering Trust & Value Excellence'}
              </h3>
              <p className="mv-text">
                {isBn 
                  ? 'প্রতিটি প্লট শতভাগ নিষ্কণ্টক আইনি মালিকানায়, অনুমোদিত মাস্টার প্ল্যানে এবং যথাসময়ে গ্রাহকের হাতে তুলে দেওয়া। পাশাপাশি মধ্যবিত্ত থেকে শুরু করে প্রবাসী সকল শ্রেণির মানুষের ক্রয়ক্ষমতার মধ্যে সহজ কিস্তিতে স্বপ্নের প্লট নিশ্চিত করা।'
                  : 'To deliver 100% dispute-free land ownership with rigorous governmental compliance, timely infrastructure handover, and flexible installment plans accessible to all prospective homeowners and NRB investors.'}
              </p>
            </div>
          </div>

          {/* Core Values 4-Grid */}
          <div className="core-values-wrapper">
            <h3 className="core-values-heading">
              {isBn ? 'আমাদের মূল স্তম্ভ ও কাজের মূলনীতি' : 'Core Pillars of Our Organization'}
            </h3>
            <div className="core-values-grid">
              {coreValues.map((val, idx) => (
                <div key={idx} className="core-value-item">
                  <div className="cv-icon-dot">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="cv-content">
                    <h4>{isBn ? val.titleBn : val.titleEn}</h4>
                    <p>{isBn ? val.descBn : val.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SERVICES */}
      <section className="about-services-section" id="our-services">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-main-heading">
              {isBn ? 'আমরা যেসকল সেবা প্রদান করি' : 'Comprehensive Real Estate Services'}
            </h2>
            <div className="section-divider-line" />
            <p className="section-sub-desc">
              {isBn 
                ? 'জমি অধিগ্রহণ ও প্লট উন্নয়ন থেকে শুরু করে আর্কিটেকচারাল প্ল্যানিং, আইনি যাচাই ও হস্তান্তর পর্যন্ত পূর্ণাঙ্গ রিয়েল এস্টেট সলিউশন।'
                : 'End-to-end real estate expertise spanning land development, architectural planning, construction, and legal advisory.'}
            </p>
          </div>

          <div className="about-services-grid">
            {services.map((service) => {
              const IconComp = service.icon
              return (
                <div key={service.id} className="about-service-card">
                  <div className="svc-card-header">
                    <div className="svc-icon-box">
                      <IconComp size={24} />
                    </div>
                    <span className="svc-tag-chip">
                      {isBn ? service.tagBn : service.tagEn}
                    </span>
                  </div>
                  <h3 className="svc-card-title">
                    {isBn ? service.titleBn : service.titleEn}
                  </h3>
                  <p className="svc-card-desc">
                    {isBn ? service.descBn : service.descEn}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. CORPORATE HEADQUARTERS & CONTACT CARD */}
      <section className="about-hq-section">
        <div className="section-container">
          <div className="about-hq-card">
            <div className="hq-left-content">
              <span className="hq-chip-label">{isBn ? 'প্রধান কর্পোরেট কার্যালয়' : 'Corporate Headquarters'}</span>
              <h2 className="hq-headline">
                {isBn ? 'নাফি টাওয়ার, লেভেল ১০, গুলশান-০১' : 'Nafi Tower, Level 10, Gulshan-01'}
              </h2>
              <p className="hq-sub-address">
                ৫৩ গুলশান এভিনিউ, ঢাকা-১২১২, বাংলাদেশ | 53 Gulshan Avenue, Dhaka-1212
              </p>
              
              <div className="hq-contact-points">
                <div className="hq-point">
                  <Phone size={18} className="text-emerald" />
                  <div>
                    <span className="hq-lbl">Hotline:</span>
                    <a href="tel:+8801815311232" className="hq-val">+880 1815-311232</a>
                  </div>
                </div>

                <div className="hq-point">
                  <Mail size={18} className="text-emerald" />
                  <div>
                    <span className="hq-lbl">Email:</span>
                    <a href="mailto:info@eliteiconic.com" className="hq-val">info@eliteiconic.com</a>
                  </div>
                </div>

                <div className="hq-point">
                  <Building2 size={18} className="text-emerald" />
                  <div>
                    <span className="hq-lbl">Visiting Hours:</span>
                    <span className="hq-val">{isBn ? 'শনি-বৃহস্পতি: সকাল ১০টা - সন্ধ্যা ৭টা' : 'Sat-Thu: 10:00 AM - 7:00 PM'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hq-right-action">
              <div className="hq-cta-prompt">
                <h3>{isBn ? 'সরাসরি আমাদের সাথে কথা বলতে চান?' : 'Want to Discuss in Person?'}</h3>
                <p>{isBn ? 'আমাদের গুলশান কর্পোরেট কার্যালয়ে কফি আড্ডায় আপনার পছন্দের প্লট ও নিরাপদ বিনিয়োগ নিয়ে বিস্তারিত পরামর্শ নিন।' : 'Schedule an executive consultation or priority site inspection at our Gulshan office.'}</p>
                <button 
                  type="button" 
                  className="btn-hq-book"
                  onClick={onScheduleVisit}
                >
                  <Calendar size={18} />
                  <span>{isBn ? 'ভিজিট শিডিউল করুন' : 'Schedule Executive Consultation'}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
