import { useState, useEffect } from 'react'
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  Download
} from 'lucide-react'

export default function GalleryPage({ lang = 'en', onScheduleVisit }) {
  const isBn = lang === 'bn'
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const categories = [
    { id: 'all', labelBn: 'সব ছবি', labelEn: 'All Photos' },
    { id: 'field', labelBn: 'মাঠ উন্নয়ন ও ড্রেজিং', labelEn: 'Field Development' },
    { id: 'vip-visit', labelBn: 'ভিআইপি সাইট ভিজিট', labelEn: 'VIP Site Visits' },
    { id: 'corporate', labelBn: 'কর্পোরেট ও প্যাভিলিয়ন', labelEn: 'Corporate & Pavilion' },
    { id: 'masterplan', labelBn: 'মাস্টারপ্ল্যান ও গেট', labelEn: 'Masterplan & Gate' },
    { id: 'retreat', labelBn: 'টিম রিট্রিট', labelEn: 'Team Retreat' }
  ]

  const galleryItems = [
    {
      id: 1,
      category: 'field',
      image: '/gallery/field-dredging-sandfilling-inspection.jpg',
      titleBn: 'তুরাগ নদী সংলগ্ন বালু ভরাট ও ড্রেজিং পাইপলাইন পরিদর্শন',
      titleEn: 'Turag River Dredging & Hydraulic Sand Filling Inspection',
      descBn: 'তুরাগ নদীর পাড় ঘেঁষে ড্রেজিং পাইপলাইনের মাধ্যমে দ্রুতগতিতে চলমান মাটি ও বালু ভরাট সরেজমিনে পর্যবেক্ষণ করছেন সম্মানিত বিনিয়োগকারী ও ব্যবস্থাপনা পর্ষদ।',
      descEn: 'Investors and executive management on-site inspecting live hydraulic sand filling and ground leveling along the Turag riverfront.',
      dateBn: 'সেপ্টেম্বর ২০২৬',
      dateEn: 'September 2026',
      locationBn: 'তুরাগ নদী তীরবর্তী সেক্টর, বীরুলিয়া',
      locationEn: 'Turag Riverfront Sector, Birulia'
    },
    {
      id: 2,
      category: 'vip-visit',
      image: '/gallery/vip-client-site-inspection-delegation.jpg',
      titleBn: 'সম্মানিত ক্রেতা ও বিনিয়োগকারীদের সাইট পরিদর্শন ও উপহার প্রদান',
      titleEn: 'Investor & Client VIP Site Inspection & Memento Handover',
      descBn: 'বার্ষিক আবাসন মেলা ও সাইট ডেলিগেশনে সম্মানিত গ্রাহকদের সরাসরি প্রকল্প এলাকা পরিদর্শন এবং ঢাকা আইকন সিটির শুভেচ্ছা উপহার প্রদান।',
      descEn: 'Annual housing fair delegation where VIP clients and investors validated plot demarcations on ground with executive gift handover.',
      dateBn: 'ফেব্রুয়ারি ২০২৬',
      dateEn: 'February 2026',
      locationBn: 'ঢাকা আইকন সিটি প্রজেক্ট ফিল্ড',
      locationEn: 'Dhaka Icon City Project Field'
    },
    {
      id: 3,
      category: 'corporate',
      image: '/gallery/dhaka-icon-masterplan-pavilion.jpg',
      titleBn: 'ঢাকা আইকন সিটি মেগা মাস্টারপ্ল্যান প্যাভিলিয়ন ও পর্যালোচনা',
      titleEn: 'Dhaka Icon City Master Plan Exhibition Pavilion',
      descBn: 'কোম্পানির উচ্চপদস্থ পরিচালকবৃন্দ গ্রাহকদের সাথে সরাসরি প্রকল্পের সামগ্রিক মাস্টারপ্ল্যান, ১০০ ফুট এভিনিউ ও লেকভিউ জোন পর্যালোচনা করছেন।',
      descEn: 'Company directors demonstrating the comprehensive township layout, 100ft avenue road networks, and civic zones to prospective buyers.',
      dateBn: 'সেপ্টেম্বর ২০২৬',
      dateEn: 'September 2026',
      locationBn: 'এক্সিবিশন প্যাভিলিয়ন, ঢাকা',
      locationEn: 'Exhibition Pavilion, Dhaka'
    },
    {
      id: 4,
      category: 'corporate',
      image: '/gallery/corporate-boardroom-meeting.jpg',
      titleBn: 'চেয়ারম্যান মহোদয়ের সভাপতিত্বে বোর্ডরুম কৌশলগত পর্যালোচনা বৈঠক',
      titleEn: 'Executive Boardroom Strategy & Governance Meeting',
      descBn: 'প্রধান কার্যালয়ে চেয়ারম্যান মহোদয় এবং পরিচালনা পর্ষদের ঢাকা আইকন সিটি বাস্তবায়নের উচ্চপর্যায়ের নীতিনির্ধারণী ও অগ্রগতি পর্যালোচনা সভা।',
      descEn: 'Chairman Muksudur Rahaman presiding over the executive board meeting at corporate HQ assessing engineering timelines and development milestones.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'নাফি টাওয়ার, লেভেল ১০, গুলশান-০১',
      locationEn: 'Nafi Tower, Level 10, Gulshan-1 HQ'
    },
    {
      id: 13,
      category: 'corporate',
      image: '/gallery/westin-dhaka-leadership-summit.jpg',
      titleBn: 'দ্য ওয়েস্টিন ঢাকায় এক্সিকিউটিভ লিডারশিপ সামিট ও কর্পোরেট সম্মেলন',
      titleEn: 'Executive Leadership Summit & Corporate Conference at The Westin Dhaka',
      descBn: 'রাজধানীর দ্য ওয়েস্টিন হোটেলে কোম্পানির পরিচালনা পর্ষদ ও ঊর্ধ্বতন কর্মকর্তাদের অংশগ্রহণে ঢাকা আইকন সিটির কৌশলগত সম্প্রসারণ ও গ্রাহক সেবা পর্যালোচনা সম্মেলন।',
      descEn: 'Elite Iconic Properties board of directors and senior executive leaders gathered at The Westin Dhaka for high-level strategic alignment and real estate roadmap review.',
      dateBn: 'জুলাই ২০২৬',
      dateEn: 'July 2026',
      locationBn: 'গ্র্যান্ড বলরুম, দ্য ওয়েস্টিন ঢাকা, গুলশান',
      locationEn: 'Grand Ballroom, The Westin Dhaka, Gulshan'
    },
    {
      id: 14,
      category: 'corporate',
      image: '/gallery/executive-team-synergy-meeting.jpg',
      titleBn: 'কোর ম্যানেজমেন্ট টিমের ঐক্য ও কৌশলগত অঙ্গীকার বিনিময়',
      titleEn: 'Core Management Unity & Strategic Team Synergy Pledge',
      descBn: 'প্রকল্প বাস্তবায়ন এবং সম্মানিত গ্রাহকদের আস্থা অটুট রাখতে কর্মকর্তা ও ব্যবস্থাপনা পর্ষদের একতাবদ্ধ অঙ্গীকার এবং টিম স্পিরিট জোরদার সভা।',
      descEn: 'Executive and operational management team joining hands in unity, reaffirming their shared commitment to timely project handover and investor trust.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'কর্পোরেট হেডকোয়ার্টার কনফারেন্স রুম',
      locationEn: 'Corporate HQ Conference Suite'
    },
    {
      id: 5,
      category: 'field',
      image: '/gallery/turag-riverfront-sandfield-visit-1.jpg',
      titleBn: 'তুরাগ নদীর তীরবর্তী বালু ভরাট ভূমিতে সরেজমিন পরিদর্শন',
      titleEn: 'Turag Riverfront Elevated Terrain Ground Inspection',
      descBn: 'উন্নয়নকাজের অগ্রগতির ধারাবাহিকতায় তুরাগ নদীর পাড়ঘেঁষা ভরাটকৃত জমিতে সাইট ইঞ্জিনিয়ার ও গ্রাহকবৃন্দের যৌথ পরিদর্শন।',
      descEn: 'Site engineers and client delegation inspecting freshly reclaimed and leveled ground right next to the scenic Turag riverfront.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'তুরাগ রিভারফ্রন্ট জোন',
      locationEn: 'Turag Riverfront Zone'
    },
    {
      id: 52,
      category: 'field',
      image: '/gallery/turag-riverfront-sandfield-visit-2.jpg',
      titleBn: 'তুরাগ নদী সংলগ্ন উন্নয়ন এলাকায় গ্রাহক ও প্রকৌশলী ডেলিগেশন',
      titleEn: 'Riverfront Development Field Client & Engineering Delegation',
      descBn: 'তুরাগ নদীর কোল ঘেঁষে মাটি ভরাট ও ড্রেজিং কাজের বাস্তব অগ্রগতি সরেজমিনে পরিদর্শনকালে সম্মানিত ক্রেতা ও শুভানুধ্যায়ী দল।',
      descEn: 'VIP client entourage and technical team reviewing river boundary soil compaction and hydraulic elevation on location.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'তুরাগ রিভারভিউ সেক্টর',
      locationEn: 'Turag Riverview Sector'
    },
    {
      id: 6,
      category: 'field',
      image: '/gallery/access-road-brick-paving-inspection.jpg',
      titleBn: 'প্রকল্পের অভ্যন্তরীণ সলিং ও সংযোগ সড়ক নির্মাণ পর্যবেক্ষণ',
      titleEn: 'Internal Access Road Brick Paving & Sub-Base Compaction',
      descBn: 'ঢাকা আইকন সিটির প্রবেশ পথ ও অভ্যন্তরীণ সংযোগ সড়ক নির্মাণ এবং মাটি সংহতকরণ কাজ পরিদর্শনরত টিম।',
      descEn: 'Site inspection of internal roadway development, brick soling, and compacted sub-base for heavy vehicle transit.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'অভ্যন্তরীণ মেইন সংযোগ সড়ক',
      locationEn: 'Internal Main Connecting Avenue'
    },
    {
      id: 7,
      category: 'vip-visit',
      image: '/gallery/riverfront-vantage-site-delegation.jpg',
      titleBn: 'লেকের পাড় ও মনোরম তুরাগ নদী সংলগ্ন ভিউ পয়েন্ট পরিদর্শন',
      titleEn: 'Lakeside & Turag Riverfront Scenic Vantage Point Visit',
      descBn: 'কোম্পানির নিজস্ব বিলাসবহুল যানবাহনে সাইটে আগত সম্মানিত প্লট ক্রেতাদের সাথে রিভারভিউ জোন অবলোকন।',
      descEn: 'Prospective plot buyers transported via company vehicles admiring the natural riverfront breezes and prime water-facing plots.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'ওয়েস্টার্ন রিভারভিউ সেক্টর',
      locationEn: 'Western Riverview Sector'
    },
    {
      id: 8,
      category: 'vip-visit',
      image: '/gallery/project-delegation-executive-client-group.jpg',
      titleBn: 'ঢাকা আইকন সিটি প্রজেক্টে আগত গ্রাহক ও বিনিয়োগকারী প্রতিনিধি দল',
      titleEn: 'Client & Investor Delegation Group Boundary Verification',
      descBn: 'প্রকল্পের নির্ধারিত প্লট সীমানা ও ভবিষ্যৎ নাগরিক সুবিধার স্থান ঘুরে দেখে সন্তুষ্টি প্রকাশকারী সম্মানিত বিনিয়োগকারী দল।',
      descEn: 'Comprehensive group gathering of investors, land owners, and senior executives validating boundary stones and project demarcations.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'সেন্ট্রাল প্রজেক্ট গ্রাউন্ড',
      locationEn: 'Central Project Ground'
    },
    {
      id: 9,
      category: 'field',
      image: '/gallery/site-greenery-boundary-inspection.jpg',
      titleBn: 'সবুজ বেষ্টনী ও পরিবেশবান্ধব বাউন্ডারি সীমানা পর্যবেক্ষণ',
      titleEn: 'Eco-Friendly Green Belt & Boundary Demarcation Review',
      descBn: 'প্রকল্পের চতুর্দিকের প্রাকৃতিক বৃক্ষরাজি ও ইকোলজিক্যাল বাফার সংরক্ষণ করে আধুনিক টাউনশিপ গঠনের পরিকল্পনা।',
      descEn: 'Preserving natural greenery, shaded avenues, and boundary walls ensuring a sustainable eco-township environment.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'গ্রিন বেল্ট করিডোর',
      locationEn: 'Green Belt Corridor'
    },
    {
      id: 10,
      category: 'retreat',
      image: '/gallery/corporate-retreat-team-building.jpg',
      titleBn: 'বার্ষিক কর্পোরেট রিট্রিট ও টিম স্পিরিট উদযাপন',
      titleEn: 'Annual Corporate Retreat & Leadership Synergy Celebration',
      descBn: 'এলিট আইকনিক প্রপার্টিজ পরিবারের সদস্য ও ব্যবস্থাপনা পর্ষদের সমুদ্র সৈকতে আনন্দঘন মুহূর্ত ও লক্ষ্য অর্জনের উদ্দীপনা।',
      descEn: 'Elite Iconic leadership, field directors, and core team celebrating company achievements and team synergy at the seaside retreat.',
      dateBn: 'বার্ষিক ইভেন্ট ২০২৬',
      dateEn: 'Annual Event 2026',
      locationBn: 'কক্সবাজার সমুদ্র সৈকত',
      locationEn: "Cox's Bazar Sea Beach"
    },
    {
      id: 11,
      category: 'masterplan',
      image: '/dhaka-icon-hero.jpg',
      titleBn: 'ঢাকা আইকন সিটির রাজকীয় গ্র্যান্ড এন্ট্রান্স গেট',
      titleEn: 'Grand Monumental Architectural Entrance Gate',
      descBn: '১০০ ফুট প্রশস্ত প্রধান এভিনিউয়ের মুখে নির্মিতব্য স্থাপত্যশৈলীর অনন্য নিদর্শন এবং অত্যাধুনিক নিরাপত্তা চেকপোস্ট।',
      descEn: 'State-of-the-art monumental entry gate with modern security kiosks, landscaped fountains, and 100ft wide access.',
      dateBn: 'স্থাপত্য নকশা',
      dateEn: 'Architectural Vision',
      locationBn: 'প্রধান প্রবেশদ্বার, ১০০ ফুট এভিনিউ',
      locationEn: 'Main 100ft Grand Entrance Boulevard'
    },
    {
      id: 12,
      category: 'masterplan',
      image: '/dhaka-icon-masterplan.jpg',
      titleBn: 'পরিকল্পিত মেগা টাউনশিপের সামগ্রিক মাস্টারপ্ল্যান লেআউট',
      titleEn: 'Comprehensive Master-Planned Township Layout',
      descBn: 'আবাসিক, বাণিজ্যিক, লেকভিউ পার্ক, বিদ্যালয় ও হাসপাতাল জোনের সুষম বিন্যাসে তৈরি পূর্ণাঙ্গ নকশা।',
      descEn: 'Integrated urban master layout featuring segregated residential, commercial, lake recreation, healthcare, and educational zones.',
      dateBn: 'অনুমোদিত মাস্টারপ্ল্যান',
      dateEn: 'Approved Masterplan',
      locationBn: 'ঢাকা আইকন সিটি মাস্টার জোন',
      locationEn: 'Dhaka Icon City Master Zone'
    }
  ]

  // Filter items by category
  const filteredItems = galleryItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  )

  const getCategoryCount = (catId) => {
    if (catId === 'all') return galleryItems.length
    return galleryItems.filter(item => item.category === catId).length
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev + 1) % filteredItems.length)
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filteredItems.length])

  const activePhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  return (
    <main className="gallery-page-main">
      {/* 1. ARCHITECTURAL EDITORIAL HERO (Matching Board of Directors & Section Aesthetic) */}
      <section className="gallery-page-hero">
        <div className="bod-hero-ring" aria-hidden="true" />

        <div className="section-container">
          <div className="bod-hero-editorial-grid">
            {/* Left Vertical Label */}
            <div className="bod-hero-left-rail" aria-hidden="true">
              <span className="bod-vertical-text">
                {isBn ? 'প্রকল্প ও উন্নয়ন চিত্র' : 'VISUAL ARCHIVE &\nSITE PROGRESS'}
              </span>
              <span className="bod-vertical-divider" />
            </div>

            {/* Center Main Title Block */}
            <div className="bod-hero-center-col">
              <div className="bod-kicker-row">
                <span className="bod-kicker-gold-bar" aria-hidden="true" />
                <span className="bod-kicker-label">
                  {isBn ? 'মাঠ পর্যায়ের অগ্রগতি ও মাইলফলক' : 'ON-GROUND PROGRESS & MILESTONES'}
                </span>
              </div>

              <h1 className="bod-main-title">
                {isBn ? (
                  <>
                    <span className="bod-title-navy">প্রজেক্ট </span>
                    <span className="bod-title-green">গ্যালারি</span>
                  </>
                ) : (
                  <>
                    <span className="bod-title-navy">Project </span>
                    <span className="bod-title-green">Gallery</span>
                  </>
                )}
              </h1>

              <div className="amenities-dual-divider bod-dual-divider" aria-hidden="true">
                <span className="divider-seg-green" />
                <span className="divider-seg-gold" />
              </div>

              <p className="bod-main-subtitle">
                {isBn
                  ? 'ঢাকা আইকন সিটির সরেজমিন বালু ভরাট, রিভারফ্রন্ট ড্রেজিং, ভিআইপি গ্রাহক পরিদর্শন এবং কর্পোরেট কার্যক্রমের বাস্তব চিত্র।'
                  : 'Explore verified photographs of riverfront sand filling, infrastructure works, VIP client delegations, and corporate milestones at Dhaka Icon City.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER BAR 
      <section className="gallery-filter-section">
        <div className="section-container">
          <div className="gallery-filter-bar">
            <div className="gallery-category-pills" role="tablist" aria-label="Gallery categories">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`gallery-cat-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setLightboxIndex(null)
                    }}
                  >
                    <span>{isBn ? cat.labelBn : cat.labelEn}</span>
                    <span className="gallery-cat-count">{getCategoryCount(cat.id)}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      */}

      {/* 3. FRAMED PHOTO GRID (Clean Framed Images without Overlaid Text) */}
      <section className="gallery-grid-section">
        <div className="section-container">
          <div className="gallery-masonry-grid">
            {filteredItems.map((item, idx) => {
              const catLabel = categories.find(c => c.id === item.category)?.[isBn ? 'labelBn' : 'labelEn'] || 'Gallery'
              return (
                <article
                  key={item.id}
                  className="gallery-card-modern"
                  onClick={() => setLightboxIndex(idx)}
                >
                  {/* Clean Framed Image — No Text Overlay on Photo */}
                  <div className="gallery-img-frame gal-page-img-frame">
                    <img
                      src={item.image}
                      alt={isBn ? item.titleBn : item.titleEn}
                      className="gallery-img"
                      loading="lazy"
                    />
                    <span
                      className="gallery-zoom-btn"
                      title={isBn ? 'বড় করে দেখুন' : 'View Full Image'}
                      aria-hidden="true"
                    >
                      <Eye size={17} />
                    </span>
                  </div>

                  {/* Minimal Architectural Caption Below Image */}
                  <div className="gallery-card-body">
                    <div className="gallery-card-meta-top">
                      <span className="gal-card-cat-pill">{catLabel}</span>
                      <span className="gal-card-date">
                        <Calendar size={12} />
                        {isBn ? item.dateBn : item.dateEn}
                      </span>
                    </div>

                    <h3 className="gallery-card-title">
                      {isBn ? item.titleBn : item.titleEn}
                    </h3>

                    <div className="gallery-card-location">
                      <MapPin size={13} />
                      <span>{isBn ? item.locationBn : item.locationEn}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. ON-SITE VIP VISIT CALLOUT BANNER */}
      <section className="gallery-visit-cta-section">
        <div className="section-container">
          <div className="gallery-cta-box">
            <div className="cta-content-left">
              <span className="cta-kicker">
                <ShieldCheck size={15} />
                {isBn ? 'সরাসরি প্রজেক্ট পরিদর্শন আমন্ত্রণ' : 'DIRECT VIP GROUND INSPECTION'}
              </span>
              <h2 className="cta-title">
                {isBn
                  ? 'ছবিতে নয়, নিজের চোখে দেখুন ঢাকা আইকন সিটির বাস্তব অগ্রগতি'
                  : 'Experience Dhaka Icon City Live on the Ground'}
              </h2>
              <p className="cta-desc">
                {isBn
                  ? 'আমাদের নিজস্ব বিলাসবহুল গাড়িতে গুলশান কর্পোরেট হেড অফিস থেকে সরাসরি প্রকল্প এলাকা পরিদর্শন করুন। অভিজ্ঞ প্রকৌশলী ও উপদেষ্টা দল আপনাকে সরেজমিনে প্লট সীমানা ও চলমান উন্নয়ন প্রদর্শন করবেন।'
                  : 'Join our complimentary VIP guided site tour via executive transport from our Gulshan Corporate Headquarters. Inspect riverfront plots, ongoing development, and verified land records firsthand.'}
              </p>
              <div className="cta-action-row">
                <button
                  type="button"
                  className="gallery-btn-primary"
                  onClick={onScheduleVisit}
                >
                  <Calendar size={17} />
                  <span>{isBn ? 'ফ্রি ভিআইপি সাইট ভিজিট বুক করুন' : 'Schedule Free VIP Site Tour'}</span>
                  <ChevronRight size={17} />
                </button>
                <a
                  href="tel:+8801815311232"
                  className="gallery-btn-secondary"
                >
                  <Phone size={16} />
                  <span>+880 1815-311232</span>
                </a>
              </div>
            </div>

            <div className="cta-feature-checklist">
              <div className="cta-check-item">
                <CheckCircle2 size={17} className="check-icon" />
                <span>{isBn ? 'গুলশান অফিস থেকে কমপ্লিমেন্টারি যাতায়াত' : 'Complimentary Executive Transport from Gulshan HQ'}</span>
              </div>
              <div className="cta-check-item">
                <CheckCircle2 size={17} className="check-icon" />
                <span>{isBn ? 'তুরাগ নদীর পাড়ে ড্রেজিং ও বালু ভরাট পর্যবেক্ষণ' : 'Live Turag Riverfront Dredging & Plot Inspection'}</span>
              </div>
              <div className="cta-check-item">
                <CheckCircle2 size={17} className="check-icon" />
                <span>{isBn ? '১০০% নিষ্কণ্টক সাফ-কাবলা দলিল ও রেকর্ড যাচাই' : '100% Clear Saf-Kabla Title & Legal Record Review'}</span>
              </div>
              <div className="cta-check-item">
                <CheckCircle2 size={17} className="check-icon" />
                <span>{isBn ? 'অন-স্পট বুকিংয়ে বিশেষ কর্পোরেট প্রিভিলেজ' : 'Priority Plot Selection & On-Spot Booking Privileges'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULL-SCREEN LIGHTBOX MODAL */}
      {activePhoto && (
        <div className="gallery-lightbox-modal" role="dialog" aria-modal="true">
          <div className="lightbox-backdrop" onClick={() => setLightboxIndex(null)} />

          <div className="lightbox-container">
            {/* Top Toolbar */}
            <div className="lightbox-toolbar">
              <div className="lightbox-counter">
                <Camera size={16} />
                <span>
                  {isBn ? `ছবি ${lightboxIndex + 1} / ${filteredItems.length}` : `Photo ${lightboxIndex + 1} of ${filteredItems.length}`}
                </span>
                <span className="lightbox-category-tag">
                  {categories.find(c => c.id === activePhoto.category)?.[isBn ? 'labelBn' : 'labelEn']}
                </span>
              </div>

              <div className="lightbox-actions">
                <a
                  href={activePhoto.image}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-tool-btn"
                  title={isBn ? 'ছবি ডাউনলোড করুন' : 'Download Photo'}
                >
                  <Download size={17} />
                </a>
                <button
                  type="button"
                  className="lightbox-tool-btn close-btn"
                  onClick={() => setLightboxIndex(null)}
                  title={isBn ? 'বন্ধ করুন (Esc)' : 'Close (Esc)'}
                  aria-label="Close"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* Main Stage with Image & Prev/Next Nav */}
            <div className="lightbox-stage">
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={() => setLightboxIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)}
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="lightbox-image-viewport">
                <img
                  src={activePhoto.image}
                  alt={isBn ? activePhoto.titleBn : activePhoto.titleEn}
                  className="lightbox-main-img"
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={() => setLightboxIndex(prev => (prev + 1) % filteredItems.length)}
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="lightbox-caption-bar">
              <div className="caption-text-group">
                <h3 className="lightbox-caption-title">
                  {isBn ? activePhoto.titleBn : activePhoto.titleEn}
                </h3>
                <p className="lightbox-caption-desc">
                  {isBn ? activePhoto.descBn : activePhoto.descEn}
                </p>
                <div className="lightbox-meta-row">
                  <span className="caption-meta">
                    <Calendar size={13} />
                    {isBn ? activePhoto.dateBn : activePhoto.dateEn}
                  </span>
                  <span className="caption-meta location">
                    <MapPin size={13} />
                    {isBn ? activePhoto.locationBn : activePhoto.locationEn}
                  </span>
                </div>
              </div>

              <div className="caption-cta-group">
                <button
                  type="button"
                  className="lightbox-book-btn"
                  onClick={() => {
                    setLightboxIndex(null)
                    onScheduleVisit()
                  }}
                >
                  <Calendar size={15} />
                  <span>{isBn ? 'সাইট ভিজিট বুক করুন' : 'Book Site Visit'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
