import { useState, useEffect } from 'react'
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Download,
  Share2,
  Maximize2,
  Search,
  Filter
} from 'lucide-react'

export default function GalleryPage({ lang = 'en', onScheduleVisit, navigateTo }) {
  const isBn = lang === 'bn'
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', labelBn: 'সব ছবি (All)', labelEn: 'All Photos' },
    { id: 'field', labelBn: 'মাঠ উন্নয়ন ও ড্রেজিং', labelEn: 'Field Development' },
    { id: 'vip-visit', labelBn: 'ভিআইপি সাইট পরিদর্শন', labelEn: 'VIP Site Visits' },
    { id: 'corporate', labelBn: 'করপোরেট বৈঠক ও মেলা', labelEn: 'Corporate & Pavilion' },
    { id: 'retreat', labelBn: 'টিম রিট্রিট ও লাইফস্টাইল', labelEn: 'Team Retreat' },
    { id: 'masterplan', labelBn: 'মাস্টারপ্ল্যান ও গেট', labelEn: 'Masterplan & Gate' }
  ]

  const galleryItems = [
    {
      id: 1,
      category: 'field',
      image: '/gallery/field-dredging-sandfilling-inspection.jpg',
      titleBn: 'তুরাগ নদী সংলগ্ন বালু ভরাট ও ড্রেজিং পাইপলাইন পরিদর্শন',
      titleEn: 'Turag River Dredging & Slurry Sand Filling Live Inspection',
      descBn: 'তুরাগ নদীর পাড় ঘেঁষে ড্রেজিং পাইপলাইনের মাধ্যমে দ্রুতগতিতে চলমান মাটি ও বালু ভরাট সরেজমিনে পর্যবেক্ষণ করছেন সম্মানিত বিনিয়োগকারী ও ব্যবস্থাপনা পর্ষদ।',
      descEn: 'Investors and executive management on-site inspecting live hydraulic sand filling and ground leveling along the Turag riverfront.',
      dateBn: 'সেপ্টেম্বর ২০২৬',
      dateEn: 'September 2026',
      locationBn: 'তুরাগ নদী তীরবর্তী সেক্টর, বীরুলিয়া, ঢাকা',
      locationEn: 'Turag Riverfront Sector, Birulia, Dhaka',
      tags: isBn ? ['ড্রেজিং পাইপলাইন', 'বালু ভরাট', 'লাইভ সাইট'] : ['Dredging Pipeline', 'Sand Filling', 'Live Site'],
      isFeatured: true
    },
    {
      id: 2,
      category: 'vip-visit',
      image: '/gallery/vip-client-site-inspection-delegation.jpg',
      titleBn: 'সম্মানিত ক্রেতা ও বিনিয়োগকারীদের সাইট পরিদর্শন ও উপহার প্রদান',
      titleEn: 'Investor & Client VIP Site Inspection Visit & Memento Handover',
      descBn: 'বার্ষিক আবাসন মেলা ও সাইট ডেলিগেশনে সম্মানিত গ্রাহকদের সরাসরি প্রকল্প এলাকা পরিদর্শন এবং ঢাকা আইকন সিটির শুভেচ্ছা উপহার প্রদান।',
      descEn: 'Annual housing fair delegation where VIP clients and investors validated plot demarcations on ground with executive gift handover.',
      dateBn: 'ফেব্রুয়ারি ২০২৬',
      dateEn: 'February 2026',
      locationBn: 'ঢাকা আইকন সিটি প্রজেক্ট ফিল্ড',
      locationEn: 'Dhaka Icon City Project Field Grounds',
      tags: isBn ? ['ভিআইপি ডেলিগেশন', 'আবাসন মেলা', 'প্লট ভেরিফিকেশন'] : ['VIP Delegation', 'Housing Fair', 'Plot Verification'],
      isFeatured: true
    },
    {
      id: 3,
      category: 'corporate',
      image: '/gallery/dhaka-icon-masterplan-pavilion.jpg',
      titleBn: 'ঢাকা আইকন সিটি মেগা মাস্টারপ্ল্যান প্যাভিলিয়ন ও আলোচনা',
      titleEn: 'Dhaka Icon City Master Plan Exhibition Pavilion',
      descBn: 'কোম্পানির উচ্চপদস্থ পরিচালকবৃন্দ গ্রাহকদের সাথে সরাসরি প্রকল্পের সামগ্রিক মাস্টারপ্ল্যান, ১০০ ফুট এভিনিউ ও লেকভিউ জোন পর্যালোচনা করছেন।',
      descEn: 'Company directors demonstrating the comprehensive township layout, 100ft avenue road networks, and civic zones to prospective buyers.',
      dateBn: 'সেপ্টেম্বর ২০২৬',
      dateEn: 'September 2026',
      locationBn: 'ঢাকা আইকন সিটি এক্সিবিশন প্যাভিলিয়ন',
      locationEn: 'Dhaka Icon City Exhibition Pavilion',
      tags: isBn ? ['মাস্টারপ্ল্যান', 'পরিচালক পর্ষদ', 'প্যাভিলিয়ন'] : ['Masterplan', 'Board Directors', 'Pavilion'],
      isFeatured: true
    },
    {
      id: 4,
      category: 'corporate',
      image: '/gallery/corporate-boardroom-meeting.jpg',
      titleBn: 'চেয়ারম্যান মহোদয়ের সভাপতিত্বে বোর্ডরুম কৌশলগত পর্যালোচনা বৈঠক',
      titleEn: 'Executive Boardroom Strategy & Management Meeting',
      descBn: 'প্রধান কার্যালয়ে চেয়ারম্যান মহোদয় এবং পরিচালনা পর্ষদের ঢাকা আইকন সিটি বাস্তবায়নের উচ্চপর্যায়ের নীতিনির্ধারণী ও অগ্রগতি পর্যালোচনা সভা।',
      descEn: 'Chairman Muksudur Rahaman presiding over the executive board meeting at corporate HQ assessing engineering timelines and development milestones.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'নাফি টাওয়ার, লেভেল ১০, গুলশান এভিনিউ',
      locationEn: 'Nafi Tower, Level 10, Gulshan Avenue HQ',
      tags: isBn ? ['চেয়ারম্যান মহোদয়', 'বোর্ড সভা', 'কর্পোরেট হেডকোয়ার্টার'] : ['Chairman', 'Board Meeting', 'Corporate HQ'],
      isFeatured: true
    },
    {
      id: 5,
      category: 'field',
      image: '/gallery/turag-riverfront-sandfield-visit-1.jpg',
      titleBn: 'তুরাগ নদীর তীরবর্তী বালু ভরাট ভূমিতে সরেজমিন পরিদর্শন (১)',
      titleEn: 'Turag Riverfront Newly Elevated Terrain Ground Inspection (Shot 1)',
      descBn: 'উন্নয়নকাজের অগ্রগতির ধারাবাহিকতায় তুরাগ নদীর পাড়ঘেঁষা ভরাটকৃত জমিতে সাইট ইঞ্জিনিয়ার ও গ্রাহকবৃন্দের যৌথ পরিদর্শন।',
      descEn: 'Site engineers and client delegation inspecting freshly reclaimed and leveled ground right next to the scenic Turag riverfront.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'তুরাগ রিভারফ্রন্ট জোন, ঢাকা আইকন সিটি',
      locationEn: 'Turag Riverfront Zone, Dhaka Icon City',
      tags: isBn ? ['নদীর তীরবর্তী জোন', 'লেভেলিং প্রগ্রেস', 'ইঞ্জিনিয়ারিং'] : ['Riverfront Zone', 'Leveling Progress', 'Engineering']
    },
    {
      id: 52,
      category: 'field',
      image: '/gallery/turag-riverfront-sandfield-visit-2.jpg',
      titleBn: 'তুরাগ নদী সংলগ্ন উন্নয়ন এলাকায় ডেলিগেশন গ্রুপ সমাবেশ (২)',
      titleEn: 'Turag Riverfront Development Field Client Delegation (Shot 2)',
      descBn: 'তুরাগ নদীর কোল ঘেঁষে মাটি ভরাট ও ড্রেজিং কাজের বাস্তব অগ্রগতি সরেজমিনে পরিদর্শনকালে সম্মানিত ক্রেতা ও শুভানুধ্যায়ী দল।',
      descEn: 'VIP client entourage and technical team reviewing river boundary soil compaction and hydraulic elevation on location.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'তুরাগ রিভারভিউ সেক্টর, ঢাকা আইকন সিটি',
      locationEn: 'Turag Riverview Sector, Dhaka Icon City',
      tags: isBn ? ['গ্রাহক ডেলিগেশন', 'বালু ভরাট সাইট', 'সরেজমিন পরিদর্শন'] : ['Client Delegation', 'Sandfill Site', 'Ground Inspection']
    },
    {
      id: 6,
      category: 'field',
      image: '/gallery/access-road-brick-paving-inspection.jpg',
      titleBn: 'প্রকল্পের অভ্যন্তরীণ সলিং ও সংযোগ সড়ক পর্যবেক্ষণ',
      titleEn: 'Internal Access Road Brick Paving & Soil Consolidation',
      descBn: 'ঢাকা আইকন সিটির প্রবেশ পথ ও অভ্যন্তরীণ সংযোগ সড়ক নির্মাণ এবং মাটি সংহতকরণ কাজ পরিদর্শনরত টিম।',
      descEn: 'Site inspection of internal roadway development, brick soling, and compacted sub-base for heavy vehicle transit.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'অভ্যন্তরীণ মেইন সংযোগ সড়ক',
      locationEn: 'Internal Main Connecting Avenue',
      tags: isBn ? ['সংযোগ সড়ক', 'ব্রিক সলিং', 'অবকাঠামো'] : ['Connecting Road', 'Brick Soling', 'Infrastructure']
    },
    {
      id: 7,
      category: 'vip-visit',
      image: '/gallery/riverfront-vantage-site-delegation.jpg',
      titleBn: 'লেকের পার ও মনোরম তুরাগ নদী সংলগ্ন ভিউ পয়েন্ট পরিদর্শন',
      titleEn: 'Lakeside & Turag Riverfront Scenic Vantage Point Visit',
      descBn: 'কোম্পানির নিজস্ব বিলাসবহুল যানবাহনে সাইটে আগত সম্মানিত প্লট ক্রেতাদের সাথে রিভারভিউ জোন অবলোকন।',
      descEn: 'Prospective plot buyers transported via company vehicles admiring the natural riverfront breezes and prime water-facing plots.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'ওয়েস্টার্ন রিভারভিউ সেক্টর',
      locationEn: 'Western Riverview Sector',
      tags: isBn ? ['রিভারভিউ জোন', 'প্রাকৃতিক পরিবেশ', 'গ্রাহক গাড়ি বহর'] : ['Riverview Zone', 'Natural Environment', 'Client Convoy']
    },
    {
      id: 8,
      category: 'vip-visit',
      image: '/gallery/project-delegation-executive-client-group.jpg',
      titleBn: 'ঢাকা আইকন সিটি প্রজেক্টে আগত বৃহত্তর গ্রাহক ও প্রতিনিধি দল',
      titleEn: 'Comprehensive Client & Investor Delegation Group Gathering',
      descBn: 'প্রকল্পের নির্ধারিত প্লট সীমানা ও ভবিষ্যৎ নাগরিক সুবিধার স্থান ঘুরে দেখে সন্তুষ্টি প্রকাশকারী সম্মানিত বিনিয়োগকারী দল।',
      descEn: 'Comprehensive group gathering of investors, land owners, and senior executives validating boundary stones and project demarcations.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'সেন্ট্রাল প্রজেক্ট গ্রাউন্ড',
      locationEn: 'Central Project Ground',
      tags: isBn ? ['গ্রাহক সমাবেশ', 'সীমানা পিলার', 'বিনিয়োগকারী'] : ['Client Gathering', 'Boundary Stones', 'Investors']
    },
    {
      id: 9,
      category: 'field',
      image: '/gallery/site-greenery-boundary-inspection.jpg',
      titleBn: 'সবুজ বেষ্টনী ও পরিবেশবান্ধব বাউন্ডারি পর্যবেক্ষণ',
      titleEn: 'Eco-Friendly Green Belt & Boundary Demarcation Review',
      descBn: 'প্রকল্পের চতুর্দিকের প্রাকৃতিক বৃক্ষরাজি ও ইকোলজিক্যাল বাফার সংরক্ষণ করে আধুনিক টাউনশিপ গঠনের পরিকল্পনা।',
      descEn: 'Preserving natural greenery, shaded avenues, and boundary walls ensuring a sustainable eco-township environment.',
      dateBn: 'জুন ২০২৬',
      dateEn: 'June 2026',
      locationBn: 'গ্রিন বেল্ট করিডোর',
      locationEn: 'Green Belt Corridor',
      tags: isBn ? ['গ্রিন সিটি', 'ইকো বাউন্ডারি', 'প্রাকৃতিক পরিবেশ'] : ['Green City', 'Eco Boundary', 'Natural Eco']
    },
    {
      id: 10,
      category: 'retreat',
      image: '/gallery/corporate-retreat-team-building.jpg',
      titleBn: 'বার্ষিক করপোরেট ট্যুর ও টিম স্পিরিট উদযাপন',
      titleEn: 'Annual Corporate Retreat & Team Spirit Celebration',
      descBn: 'এলিট আইকনিক প্রপার্টিজ পরিবারের সদস্য ও ব্যবস্থাপনা পর্ষদের সমুদ্র সৈকতে আনন্দঘন মুহূর্ত ও লক্ষ্য অর্জনের উদ্দীপনা।',
      descEn: 'Elite Iconic leadership, field directors, and core team celebrating company achievements and team synergy at the seaside retreat.',
      dateBn: 'বার্ষিক ইভেন্ট ২০২৬',
      dateEn: 'Annual Event 2026',
      locationBn: 'কক্সবাজার সমুদ্র সৈকত',
      locationEn: "Cox's Bazar Sea Beach",
      tags: isBn ? ['টিম রিট্রিট', 'কর্পোরেট ট্যুর', 'উদযাপন'] : ['Team Retreat', 'Corporate Tour', 'Celebration']
    },
    {
      id: 11,
      category: 'masterplan',
      image: '/dhaka-icon-hero.jpg',
      titleBn: 'ঢাকা আইকন সিটির রাজকীয় গ্র্যান্ড এন্ট্রান্স গেট',
      titleEn: 'Grand Monumental Architectural Entrance Gate',
      descBn: '১০০ ফুট প্রশস্ত প্রধান এভিনিউয়ের মুখে নির্মিতব্য স্থাপত্যশৈলীর অনন্য নিদর্শন এবং অত্যাধুনিক নিরাপত্তা চেকপোস্ট।',
      descEn: 'State-of-the-art monumental entry gate with modern security kiosks, landscaped fountains, and 100ft wide access.',
      dateBn: 'স্থাপত্য পরিকল্পনা',
      dateEn: 'Architectural Vision',
      locationBn: 'প্রধান প্রবেশদ্বার, ১০০ ফুট এভিনিউ',
      locationEn: 'Main 100ft Grand Entrance Boulevard',
      tags: isBn ? ['গ্র্যান্ড গেট', '১০০ ফুট এভিনিউ', 'ল্যান্ডমার্ক'] : ['Grand Gate', '100ft Avenue', 'Landmark']
    },
    {
      id: 12,
      category: 'masterplan',
      image: '/dhaka-icon-masterplan.jpg',
      titleBn: 'পরিকল্পিত মেগা টাউনশিপের সামগ্রিক মাস্টারপ্ল্যান',
      titleEn: 'Comprehensive Master-Planned Township Architecture',
      descBn: 'আবাসিক, বাণিজ্যিক, লেকভিউ পার্ক, বিদ্যালয় ও হাসপাতাল জোনের সুষম বিন্যাসে তৈরি পূর্ণাঙ্গ নকশা।',
      descEn: 'Integrated urban master layout featuring segregated residential, commercial, lake recreation, healthcare, and educational zones.',
      dateBn: 'অনুমোদিত নকশা',
      dateEn: 'Approved Layout',
      locationBn: 'ঢাকা আইকন সিটি মাস্টার জোন',
      locationEn: 'Dhaka Icon City Master Zone',
      tags: isBn ? ['মাস্টারপ্ল্যান', 'লেআউট', 'পরিকল্পনা'] : ['Masterplan', 'Layout', 'Urban Design']
    }
  ]

  // Filter items
  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    if (!searchQuery.trim()) return matchesCategory

    const q = searchQuery.toLowerCase()
    const matchesSearch = 
      item.titleBn.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.descBn.toLowerCase().includes(q) ||
      item.descEn.toLowerCase().includes(q) ||
      item.locationBn.toLowerCase().includes(q) ||
      item.locationEn.toLowerCase().includes(q)

    return matchesCategory && matchesSearch
  })

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
      {/* 1. HERO BANNER */}
      <section className="gallery-page-hero">
        <div className="section-container">
          <div className="gallery-hero-badge-row">
            <span className="gallery-hero-badge">
              <Camera size={14} />
              {isBn ? 'সরেজমিন ফিল্ড ও করপোরেট গ্যালারি' : 'Live Field & Corporate Gallery'}
            </span>
            <span className="gallery-hero-badge live-dot-badge">
              <span className="pulse-green-dot" />
              {isBn ? 'চলমান প্রজেক্ট অগ্রগতি' : 'Active On-Site Progress'}
            </span>
          </div>

          <h1 className="gallery-hero-title">
            {isBn ? (
              <>ঢাকা আইকন সিটি ও এলিট আইকনিক <span className="gold-text-glow">ফটো গ্যালারি</span></>
            ) : (
              <>Dhaka Icon City & Elite Iconic <span className="gold-text-glow">Photo Gallery</span></>
            )}
          </h1>

          <div className="section-divider-line" />

          <p className="gallery-hero-desc">
            {isBn ? (
              'তুরাগ নদীর তীরে ড্রেজিং ও পাইপলাইনে বালু ভরাট, সম্মানিত ক্রেতা ও বিনিয়োগকারীদের সাইট পরিদর্শন, বোর্ডরুম স্ট্র্যাটেজি বৈঠক এবং প্রাণবন্ত করপোরেট ইভেন্টের বাস্তব চিত্র।'
            ) : (
              'Authentic ground photography documenting active riverfront slurry sand filling, high-level client delegations, executive boardroom sessions, and corporate milestones.'
            )}
          </p>

          {/* Quick Real-Time Metrics Strip */}
          <div className="gallery-stats-strip">
            <div className="gallery-stat-card">
              <div className="stat-number">১০+</div>
              <div className="stat-label">{isBn ? 'বাস্তব সাইট ছবি' : 'Authentic Field Photos'}</div>
            </div>
            <div className="gallery-stat-card">
              <div className="stat-number">১০০%</div>
              <div className="stat-label">{isBn ? 'সরেজমিন উন্নয়ন' : 'Ground Elevation Verified'}</div>
            </div>
            <div className="gallery-stat-card">
              <div className="stat-number">২,৫০০+</div>
              <div className="stat-label">{isBn ? 'কাঠা মেগা প্রকল্প' : 'Katha Township Area'}</div>
            </div>
            <div className="gallery-stat-card">
              <div className="stat-number">২৪/৭</div>
              <div className="stat-label">{isBn ? 'সরাসরি সাইট পরিদর্শন সুবিধা' : 'VIP Guided Site Visits'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS & SEARCH CONTROLS */}
      <section className="gallery-controls-section">
        <div className="section-container">
          <div className="gallery-controls-bar">
            {/* Category Filter Pills */}
            <div className="gallery-category-pills" role="tablist">
              {categories.map((cat) => {
                const count = cat.id === 'all' 
                  ? galleryItems.length 
                  : galleryItems.filter(i => i.category === cat.id).length

                return (
                  <button
                    key={cat.id}
                    className={`gallery-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setLightboxIndex(null)
                    }}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                  >
                    <span>{isBn ? cat.labelBn : cat.labelEn}</span>
                    <span className="gallery-cat-count">{count}</span>
                  </button>
                )
              })}
            </div>

            {/* Quick Search Input */}
            <div className="gallery-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'ছবি ও বিবরণ খুঁজুন...' : 'Search photos & locations...'}
                className="gallery-search-input"
              />
              {searchQuery && (
                <button 
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESPONSIVE PHOTO GRID */}
      <section className="gallery-grid-section">
        <div className="section-container">
          {filteredItems.length === 0 ? (
            <div className="gallery-empty-state">
              <Camera size={48} className="empty-icon" />
              <h3>{isBn ? 'কোনো ছবি খুঁজে পাওয়া যায়নি' : 'No photos found'}</h3>
              <p>{isBn ? 'অনুগ্রহ করে ভিন্ন ক্যাটাগরি বা সার্চ কিওয়ার্ড ব্যবহার করুন।' : 'Try selecting another category or clearing search query.'}</p>
              <button 
                className="btn-reset-filter"
                onClick={() => {
                  setActiveCategory('all')
                  setSearchQuery('')
                }}
              >
                {isBn ? 'সব ছবি দেখুন' : 'Show All Photos'}
              </button>
            </div>
          ) : (
            <div className="gallery-masonry-grid">
              {filteredItems.map((item, idx) => (
                <article 
                  key={item.id} 
                  className={`gallery-card-modern ${item.isFeatured ? 'featured-card' : ''}`}
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className="gallery-image-wrapper">
                    <img 
                      src={item.image} 
                      alt={isBn ? item.titleBn : item.titleEn} 
                      className="gallery-card-img"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="gallery-card-overlay">
                      <div className="overlay-top">
                        <div className="overlay-badges-group">
                          {item.isFeatured && (
                            <span className="gallery-featured-pill">
                              <Sparkles size={11} /> {isBn ? 'গুরুত্বপূর্ণ' : 'Featured'}
                            </span>
                          )}
                          <span className="overlay-cat-badge">
                            {categories.find(c => c.id === item.category)?.[isBn ? 'labelBn' : 'labelEn'] || 'Gallery'}
                          </span>
                        </div>
                        <span className="overlay-zoom-btn" title={isBn ? 'বড় করে দেখুন' : 'View Full Image'}>
                          <Maximize2 size={16} />
                        </span>
                      </div>

                      <div className="overlay-bottom">
                        <p className="overlay-view-hint">
                          <Eye size={14} />
                          {isBn ? 'ক্লিক করে পূর্ণাঙ্গ ছবি দেখুন' : 'Click to inspect in full resolution'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="gallery-card-body">
                    <div className="gallery-card-meta">
                      <span className="meta-item">
                        <Calendar size={13} />
                        {isBn ? item.dateBn : item.dateEn}
                      </span>
                      <span className="meta-item location">
                        <MapPin size={13} />
                        {isBn ? item.locationBn : item.locationEn}
                      </span>
                    </div>

                    <h3 className="gallery-card-title">
                      {isBn ? item.titleBn : item.titleEn}
                    </h3>

                    <p className="gallery-card-desc">
                      {isBn ? item.descBn : item.descEn}
                    </p>

                    <div className="gallery-card-tags">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="gallery-tag-chip">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. ON-SITE VISIT CALLOUT BANNER */}
      <section className="gallery-visit-cta-section">
        <div className="section-container">
          <div className="gallery-cta-box">
            <div className="cta-content-left">
              <span className="cta-kicker">
                <ShieldCheck size={16} />
                {isBn ? 'সরাসরি প্রজেক্ট পরিদর্শন আমন্ত্রণ' : 'Direct VIP Ground Inspection'}
              </span>
              <h2 className="cta-title">
                {isBn ? (
                  <>ছবিতে নয়, নিজের চোখে দেখুন <span className="gold-text-glow">ঢাকা আইকন সিটির বাস্তবতা!</span></>
                ) : (
                  <>Don't Just See Photos, Experience <span className="gold-text-glow">Dhaka Icon City Live!</span></>
                )}
              </h2>
              <p className="cta-desc">
                {isBn ? (
                  'আমাদের নিজস্ব বিলাসবহুল এসি মাইক্রোবাসে গুলশান হেড অফিস থেকে সরাসরি প্রকল্প এলাকা পরিদর্শন করুন। অভিজ্ঞ প্রকৌশলী ও সেলস কনসালট্যান্ট আপনাকে সরেজমিনে প্লট সীমানা ও চলমান উন্নয়ন প্রদর্শন করবেন।'
                ) : (
                  'Join our complimentary VIP guided site tour via luxury transportation from our Gulshan Corporate Headquarters. Directly inspect riverfront plots, development progress, and verified documents.'
                )}
              </p>
              <div className="cta-action-row">
                <button 
                  className="gallery-btn-primary"
                  onClick={onScheduleVisit}
                >
                  <Calendar size={18} />
                  {isBn ? 'বিনামূল্যে সাইট ভিজিট শিডিউল করুন' : 'Schedule Free VIP Site Tour'}
                </button>
                <a 
                  href="tel:+8801815311232" 
                  className="gallery-btn-secondary"
                >
                  <Phone size={18} />
                  +880 1815-311232
                </a>
              </div>
            </div>

            <div className="cta-feature-checklist">
              <div className="cta-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>{isBn ? 'গুলশান অফিস থেকে যাতায়াত ও আপ্যায়ন' : 'Doorstep Pickup & Executive Refreshments'}</span>
              </div>
              <div className="cta-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>{isBn ? 'তুরাগ নদীর পাড়ে ড্রেজিং ও বালু ভরাট পর্যবেক্ষণ' : 'Turag Riverfront Sandfilling Verification'}</span>
              </div>
              <div className="cta-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>{isBn ? '১০০% নির্ভেজাল সাফ-কাবলা দলিলের ফাইল যাচাই' : 'Instant Saf-Kabla Deed & Record Verification'}</span>
              </div>
              <div className="cta-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>{isBn ? 'অন-স্পট বুকিংয়ে স্পেশাল ডিসকাউন্ট সুবিধা' : 'Exclusive On-Spot Booking Incentives'}</span>
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
                  <Download size={18} />
                </a>
                <button 
                  className="lightbox-tool-btn close-btn" 
                  onClick={() => setLightboxIndex(null)}
                  title={isBn ? 'বন্ধ করুন (Esc)' : 'Close (Esc)'}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Stage with Image & Prev/Next Nav */}
            <div className="lightbox-stage">
              <button 
                className="lightbox-nav-btn prev"
                onClick={() => setLightboxIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)}
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} />
              </button>

              <div className="lightbox-image-viewport">
                <img 
                  src={activePhoto.image} 
                  alt={isBn ? activePhoto.titleBn : activePhoto.titleEn}
                  className="lightbox-main-img" 
                />
              </div>

              <button 
                className="lightbox-nav-btn next"
                onClick={() => setLightboxIndex(prev => (prev + 1) % filteredItems.length)}
                aria-label="Next photo"
              >
                <ChevronRight size={28} />
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
                  className="lightbox-book-btn"
                  onClick={() => {
                    setLightboxIndex(null)
                    onScheduleVisit()
                  }}
                >
                  <Calendar size={15} />
                  {isBn ? 'সাইট ভিজিট বুক করুন' : 'Book Site Visit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
