import { useState, useEffect, useRef } from 'react'
import { supabase } from './lib/supabaseClient'
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Calculator, 
  Download, 
  Compass, 
  Trees, 
  Award, 
  Clock, 
  GraduationCap, 
  Layers, 
  Eye, 
  Share2, 
  FileText, 
  Navigation, 
  ExternalLink,
  RefreshCw,
  Server,
  Terminal,
  Database,
  Plus,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Home,
  Check
} from 'lucide-react'
import './App.css'
import FounderDirectorSection from './components/FounderDirectorSection'
import CorporateAboutPage from './components/CorporateAboutPage'

// Comprehensive Translations (Bangla & English)
const translations = {
  bn: {
    langBtn: "English",
    topNotice: "রাজউক নিবন্ধন নং: RAJUK/DC/REDMR 001262/24 | বীরুলিয়া সেতু সংলগ্ন ঢাকা আইকন সিটিতে প্লট বুকিং চলছে | ডাউন পেমেন্ট মাত্র ২০%",
    companyName: "এলিট আইকনিক প্রপার্টিজ এন্ড কনস্ট্রাকশন লিঃ",
    navHome: "হোম",
    navAbout: "আমাদের সম্পর্কে",
    navLeadership: "লিডারশিপ টিম",
    navGallery: "গ্যালারি",
    navContact: "যোগাযোগ",
    bookVisitBtn: "ভিজিট শিডিউল",
    
    // Hero Section
    heroBadge: "রাজউক নিবন্ধিত মেগা প্লটেড টাউনশিপ",
    heroTitlePrefix: "ঢাকার মধ্যেই হোক আপনার ",
    heroTitleHighlight: "স্বপ্নের প্লট!",
    heroSubtitle: "মিরপুর ১৪ আসনের অন্তর্ভুক্ত ২,৫০০ কাঠা জমির মধ্যে ৫০০টি প্লট নিয়ে গড়ে উঠছে ঢাকা আইকন সিটি।",
    heroBtnBook: "ভিজিট শিডিউল",
    heroBtnCalc: "কিস্তি ও মূল্য হিসাব করুন",
    heroBtnBrochure: "Download Brochure",
    
    // Quick Stats (6 Key Project Highlights)
    statArea: "২,৫০০+ কাঠা",
    statAreaLbl: "প্রকল্পের মোট আয়তন",
    statPlots: "৫০০টি",
    statPlotsLbl: "পরিকল্পিত প্লট",
    statDown: "২০%",
    statDownLbl: "সহজ ডাউন পেমেন্ট",
    statRoad: "১০০ ফুট",
    statRoadLbl: "প্রধান এভিনিউ রোড",
    statUni: "১৭টি",
    statUniLbl: "নিকটবর্তী বিশ্ববিদ্যালয়",
    statLegal: "১০০% অনুমোদিত",
    statLegalLbl: "রাজউক ও নির্ভেজাল দলিল",

    // Pricing Section
    pricingTag: "PHASE 1 বর্তমান অফার মূল্য",
    pricingTitle: "ঢাকা আইকন সিটি প্লটের মূল্যতালিকা",
    pricingSubtitle: "PHASE 1 এর জন্য অফারটি সীমিত সময়ের জন্য, মূল্য বৃদ্ধির পূর্বেই আপনার পছন্দের প্লটটি নিশ্চিত করুন। ডাউন পেমেন্ট মোট মূল্যের মাত্র ২০%।",
    kathaUnit: "/কাঠা",
    downPaymentNotice: "• ডাউন পেমেন্ট মোট মূল্যের ২০%। • এককালীন ও স্বল্প/দীর্ঘমেয়াদি কিস্তি সুবিধা। • কোম্পানী যে কোন সময় মূল্য পরিবর্তনের অধিকার সংরক্ষণ করে।",

    // Calculator
    calcTitle: "ইন্টারেক্টিভ ক্যালকুলেটর",
    calcSubtitle: "আপনার পছন্দের প্লটের ধরন ও আয়তন নির্বাচন করে তাৎক্ষণিক মোট মূল্য ও কিস্তির হিসাব দেখুন।",
    selectCategory: "প্লটের ধরন নির্বাচন করুন",
    selectSize: "প্লটের আয়তন (কাঠা)",
    selectTenure: "পরিশোধের মেয়াদ",
    tenureLumpSum: "এককালীন পরিশোধ (Lump Sum)",
    tenure1Yr: "১ বছর (১২ কিস্তি)",
    tenure2Yr: "২ বছর (২৪ কিস্তি)",
    tenure3Yr: "৩ বছর (৩৬ কিস্তি)",
    tenure5Yr: "৫ বছর (৬০ কিস্তি)",
    calcTotal: "প্লটের মোট মূল্য",
    calcDownPayment: "২০% ডাউন পেমেন্ট",
    calcRemaining: "অবশিষ্ট কিস্তিযোগ্য অর্থ",
    calcMonthly: "আনুমানিক মাসিক কিস্তি",
    btnBookCalculated: "এই প্লটটি এখনই বুক করুন",

    // Leadership Team
    leadershipTitle: "Leadership Team",
    leadershipSubtitle: "সঠিক পরিচালনা, কৌশলগত দিকনির্দেশনা এবং সেরা সেবার মাধ্যমে আমাদের লক্ষ্য বাস্তবায়নে কর্মরত নেতৃত্বের সাথে পরিচিত হোন।",

    // Masterplan
    masterplanTitle: "আধুনিক মাস্টার প্ল্যান ও রোড নেটওয়ার্ক",
    masterplanDesc: "১০০ ফুট প্রধান এভিনিউ, ৮০ ফুট লেক ভিউ রোড, ৬০ ফুট এভিনিউ, ৪০ ফুট বুলেভার্ড এবং ৩০ ও ২৫ ফুট প্রশস্ত অভ্যন্তরীণ রাস্তা সমন্বয়ে পরিকল্পিত আধুনিক গ্রিন সিটি।",
    viewFullMasterplan: "প্ল্যান দেখুন",

    // Location & Connectivity
    locTag: "কানেক্টিভিটি ও অবস্থান",
    locTitle: "তুরাগ নদীর তীরে বীরুলিয়া সেতু সংলগ্ন প্রাইম লোকেশন",
    locDesc: "মিরপুর বোটানিক্যাল গার্ডেন ও চিড়িয়াখানা সংলগ্ন তুরাগ নদীর পশ্চিম তীরে ঢাকা উত্তর সিটি কর্পোরেশনের অঞ্চল-১ এ অবস্থিত। পূর্বে সেনাকুঞ্জ ও ডিওএইচএস, উত্তরে ইস্টার্ন হাউজিং এবং দক্ষিণে ঢাকা-আরিচা মহাসড়ক।",
    distanceTitle: "ঢাকা আইকন সিটি থেকে যাতায়াত সময়",
    
    // Amenities
    amenitiesTag: "সামাজিক ও নাগরিক সুযোগ-সুবিধা",
    amenitiesTitle: "একটি স্বয়ংসম্পূর্ণ আন্তর্জাতিক মানের আধুনিক উপশহর",
    amenitiesSubtitle: "গ্রাহকের নিরাপত্তা, বিনোদন, শিক্ষা ও চিকিৎসাসহ সব ধরনের নাগরিক সুবিধা নিশ্চিত করতে ঢাকা আইকন সিটিতে থাকছে বিশ্বমানের আধুনিক অবকাঠামো।",

    // Gallery
    galleryTag: "বাস্তব উন্নয়ন চিত্র",
    galleryTitle: "প্রকল্পের চলমান ফিল্ড কার্যক্রম",
    gallerySubtitle: "সরেজমিনে বালু ভরাট, নদী ড্রেজিং পাইপলাইন, সীমানা প্রাচীর ও অভ্যন্তরীণ রাস্তা তৈরির লাইভ ছবি।",

    // Corporate Governance
    govTag: "স্বীকৃতি ও কর্পোরেট অফিস",
    govTitle: "নিবন্ধন ও বিশ্বস্ত পার্টনারশিপ",
    officeTitle: "কর্পোরেট প্রধান কার্যালয়",
    officeAddress: "নাফি টাওয়ার, লেভেল ১০, ৫৩ গুলশান এভিনিউ, গুলশান-০১, ঢাকা-১২১২, বাংলাদেশ",
    regRajuk: "রাজউক নিবন্ধন: RAJUK/DC/REDMR 001262/24",
    productBy: "A Product of GOLDENEYE DEVELOPERS LTD",
    assocBadge: "DD REG ও রিয়েল এস্টেট অ্যাসোসিয়েশন সদস্য",

    // Other Projects
    otherProjectsTitle: "এলিট আইকনিকের অন্যান্য সিগনেচার প্রকল্প",
    
    // Contact & Booking Form
    formTitle: "আপনার পছন্দের প্লটটি বুক করুন অথবা ভিজিট করুন",
    formSubtitle: "আমাদের সিনিয়র রিয়েল এস্টেট কনসালটেন্ট আপনার সাথে সরাসরি যোগাযোগ করে বিস্তারিত তথ্য ও ফ্রি সাইট ভিজিটের ব্যবস্থা করবেন।",
    lblFullName: "আপনার পুরো নাম *",
    lblPhone: "মোবাইল নম্বর *",
    lblEmail: "ইমেইল এড্রেস *",
    lblPlotType: "আগ্রহী প্লটের ক্যাটাগরি",
    lblPlotSize: "প্লটের সাইজ",
    lblMessage: "আপনার কোনো বিশেষ জিজ্ঞাসা বা মন্তব্য",
    btnSubmitForm: "আবেদন জমা দিন (Submit Request)",
    formSubmitting: "তথ্য পাঠানো হচ্ছে...",
    formSuccess: "✓ ধন্যবাদ! আপনার তথ্য সফলভাবে গৃহীত হয়েছে। আমাদের প্রতিনিধি অতি দ্রুত যোগাযোগ করবেন।"
  },
  en: {
    langBtn: "বাংলা",
    topNotice: "RAJUK Registration: RAJUK/DC/REDMR 001262/24 | Plot Booking Open at Dhaka Icon City | 20% Down Payment Only",
    companyName: "Elite Iconic Properties & Construction Ltd.",
    navHome: "Home",
    navAbout: "About Us",
    navLeadership: "Leadership Team",
    navGallery: "Gallery",
    navContact: "Contact",
    bookVisitBtn: "Book VIP Site Visit",

    // Hero Section
    heroBadge: "RAJUK Registered Mega Plotted Township",
    heroTitlePrefix: "Let Your Dream Plot Be Right ",
    heroTitleHighlight: "Inside Dhaka!",
    heroSubtitle: "Spanning 2,500 Katha with 500 meticulously planned plots in DNCC Zone-1 near Mirpur 14.",
    heroBtnBook: "Schedule Visit",
    heroBtnCalc: "Calculate Price & Installment",
    heroBtnBrochure: "Download Brochure",

    // Quick Stats (6 Key Project Highlights)
    statArea: "2,500+ Katha",
    statAreaLbl: "Total Township Land",
    statPlots: "500 Plots",
    statPlotsLbl: "Planned Plots",
    statDown: "20%",
    statDownLbl: "Easy Down Payment",
    statRoad: "100 Ft",
    statRoadLbl: "Grand Main Avenue",
    statUni: "17+",
    statUniLbl: "Nearby Universities",
    statLegal: "100% Verified",
    statLegalLbl: "RAJUK Registered & Mutation",

    // Pricing Section
    pricingTag: "PHASE 1 CURRENT PRICING",
    pricingTitle: "Dhaka Icon City Official Price List",
    pricingSubtitle: "Phase 1 limited-time launch offer before price revision. Secure your prime plot with only 20% down payment.",
    kathaUnit: "/Katha",
    downPaymentNotice: "• Down payment is 20% of total price. • Lump-sum & flexible short/long-term installment options available. • Company reserves rights to revise rates.",

    // Calculator
    calcTitle: "Interactive Plot & EMI Calculator",
    calcSubtitle: "Select your desired plot category and size to view total investment, down payment, and monthly installment breakdown.",
    selectCategory: "Select Plot Category",
    selectSize: "Plot Size (Katha)",
    selectTenure: "Payment Plan Tenure",
    tenureLumpSum: "Lump Sum Payment",
    tenure1Yr: "1 Year (12 Installments)",
    tenure2Yr: "2 Years (24 Installments)",
    tenure3Yr: "3 Years (36 Installments)",
    tenure5Yr: "5 Years (60 Installments)",
    calcTotal: "Total Plot Price",
    calcDownPayment: "20% Down Payment",
    calcRemaining: "Remaining Balance",
    calcMonthly: "Estimated Monthly EMI",
    btnBookCalculated: "Book This Selected Plot Now",

    // Leadership Team
    leadershipTitle: "Leadership Team",
    leadershipSubtitle: "Meet the team driving our vision through strategic leadership and sustainable growth.",

    // Masterplan
    masterplanTitle: "Master Plan & Strategic Road Network",
    masterplanDesc: "Integrated township featuring 100-foot Main Avenue #01, 80-foot Lake View Road, 60-foot Avenue, 40-foot Boulevard, and 30 & 25-foot internal road grids along the central lake & park promenade.",
    viewFullMasterplan: "View Plan",

    // Location & Connectivity
    locTag: "Prime Location & Strategic Connectivity",
    locTitle: "Western Bank of Turag River Adjoining Birulia Bridge",
    locDesc: "Located in DNCC Zone-1 near Mirpur Botanical Garden & Zoo. Flanked by Army DOHS on the East, Eastern Housing Society on the North, and Dhaka-Aricha Highway on the South.",
    distanceTitle: "Commute Times from Dhaka Icon City",

    // Amenities
    amenitiesTag: "Social & Civic Infrastructure",
    amenitiesTitle: "A Fully Self-Sustained International Township",
    amenitiesSubtitle: "Engineered with comprehensive security, modern education, advanced healthcare, and vibrant recreation for your family.",

    // Gallery
    galleryTag: "Live Site Updates",
    galleryTitle: "Active Field Development Photos",
    gallerySubtitle: "Live photographs of pipeline sand filling, riverfront dredging, customer VIP tours, and boundary groundwork.",

    // Corporate Governance
    govTag: "Credentials & Headquarters",
    govTitle: "Official Approvals & Corporate Office",
    officeTitle: "Corporate Headquarters",
    officeAddress: "Nafi Tower, Level 10, 53 Gulshan Avenue, Gulshan-01, Dhaka-1212, Bangladesh",
    regRajuk: "RAJUK Reg: RAJUK/DC/REDMR 001262/24",
    productBy: "A Product of GOLDENEYE DEVELOPERS LTD",
    assocBadge: "Member of DD REG & Premier Real Estate Group",

    // Other Projects
    otherProjectsTitle: "Elite Iconic's Signature Portfolio",

    // Contact & Booking Form
    formTitle: "Book Your Plot or Schedule a Free VIP Site Visit",
    formSubtitle: "Our senior property consultant will reach out immediately to share customized payment schedules and coordinate on-site visit transportation.",
    lblFullName: "Full Name *",
    lblPhone: "Phone Number *",
    lblEmail: "Email Address *",
    lblPlotType: "Interested Plot Category",
    lblPlotSize: "Plot Size",
    lblMessage: "Special Inquiries or Preferred Inspection Date",
    btnSubmitForm: "Submit Booking Request",
    formSubmitting: "Submitting Details...",
    formSuccess: "✓ Thank you! Your booking request is logged. Our representative will contact you shortly."
  }
}

// Phase 1 Pricing Data exactly matching the brochure
const plotPricingData = [
  {
    id: 'commercial-corner',
    titleBn: 'বাণিজ্যিক প্লট (কর্ণার)',
    titleEn: 'Commercial Plot (Corner)',
    ratePerKatha: 2800000,
    rateFormattedBn: '২৮ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳28 Lakh / Katha',
    tagBn: 'সর্বোচ্চ বাণিজ্যিক সম্ভাবনা',
    tagEn: 'Prime Commercial Corner',
    type: 'Commercial',
    isPopular: true
  },
  {
    id: 'commercial-general',
    titleBn: 'বাণিজ্যিক প্লট (অন্যান্য)',
    titleEn: 'Commercial Plot (General)',
    ratePerKatha: 2700000,
    rateFormattedBn: '২৭ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳27 Lakh / Katha',
    tagBn: 'এভিনিউ রোড ফ্রন্ট',
    tagEn: 'Avenue Facing',
    type: 'Commercial',
    isPopular: false
  },
  {
    id: 'residential-corner',
    titleBn: 'আবাসিক প্লট (কর্ণার)',
    titleEn: 'Residential Plot (Corner)',
    ratePerKatha: 2200000,
    rateFormattedBn: '২২ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳22 Lakh / Katha',
    tagBn: 'উভয় দিকে উন্মুক্ত বাতাস ও আলো',
    tagEn: 'Dual Side Open View',
    type: 'Residential',
    isPopular: true
  },
  {
    id: 'residential-south',
    titleBn: 'আবাসিক প্লট (দক্ষিণমুখী)',
    titleEn: 'Residential Plot (South Facing)',
    ratePerKatha: 2100000,
    rateFormattedBn: '২১ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳21 Lakh / Katha',
    tagBn: 'দক্ষিণা বাতাস ও পর্যাপ্ত আলো',
    tagEn: 'South Facing Breeze',
    type: 'Residential',
    isPopular: false
  },
  {
    id: 'residential-general',
    titleBn: 'আবাসিক প্লট',
    titleEn: 'Residential Plot (General)',
    ratePerKatha: 2000000,
    rateFormattedBn: '২০ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳20 Lakh / Katha',
    tagBn: 'সেরা ভ্যালু ইনভেস্টমেন্ট',
    tagEn: 'Best Value Investment',
    type: 'Residential',
    isPopular: false
  }
]

// Commute Distance Landmarks from the brochure
const commuteLandmarks = [
  {
    nameBn: "বিরুলিয়া ব্রিজ",
    nameEn: "Birulia Bridge",
    timeBn: "৫ মিনিট",
    timeEn: "5 Mins",
    icon: "🌁",
    highlight: "সংলগ্ন"
  },
  {
    nameBn: "উত্তরা দিয়া বাড়ি প্রজেক্ট",
    nameEn: "Uttara Diabari Project",
    timeBn: "৫ - ১০ মিনিট",
    timeEn: "5 - 10 Mins",
    icon: "🚉",
    highlight: "সরাসরি কানেক্টিভিটি"
  },
  {
    nameBn: "উত্তরা মেট্রোরেল স্টেশন",
    nameEn: "Uttara Metro Rail Station",
    timeBn: "৫ - ১০ মিনিট",
    timeEn: "5 - 10 Mins",
    icon: "🚊",
    highlight: "দ্রুততম যোগাযোগ"
  },
  {
    nameBn: "হযরত শাহজালাল (রঃ) আন্তর্জাতিক বিমান বন্দর",
    nameEn: "Hazrat Shahjalal Int'l Airport",
    timeBn: "১০ - ১৫ মিনিট",
    timeEn: "10 - 15 Mins",
    icon: "✈️",
    highlight: "এক্সপ্রেসওয়ে এক্সেস"
  },
  {
    nameBn: "তামান্না ফ্যামিলি পার্ক",
    nameEn: "Tamanna Family Park",
    timeBn: "৫ মিনিট",
    timeEn: "5 Mins",
    icon: "🎡",
    highlight: "পারিবারিক বিনোদন"
  },
  {
    nameBn: "জাতীয় উদ্ভিদ উদ্যান ৩ নং গেইট",
    nameEn: "National Botanical Garden Gate 3",
    timeBn: "৫ মিনিট",
    timeEn: "5 Mins",
    icon: "🌳",
    highlight: "সবুজ পরিবেশ"
  },
  {
    nameBn: "কাউন্দিয়া ব্রিজ (নির্মাণ কাজ চলমান)",
    nameEn: "Kaundia Bridge (Under Construction)",
    timeBn: "১০ মিনিট",
    timeEn: "10 Mins",
    icon: "🌉",
    highlight: "চলমান উন্নয়ন"
  },
  {
    nameBn: "গাবতলী বাস টার্মিনাল",
    nameEn: "Gabtoli Bus Terminal",
    timeBn: "১৫ মিনিট",
    timeEn: "15 Mins",
    icon: "🚌",
    highlight: "প্রধান ট্রানজিট"
  },
  {
    nameBn: "সাভার বাস স্ট্যান্ড",
    nameEn: "Savar Bus Stand",
    timeBn: "১০ - ২০ মিনিট",
    timeEn: "10 - 20 Mins",
    icon: "🚌",
    highlight: "সহজ যাতায়াত"
  },
  {
    nameBn: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    nameEn: "Jahangirnagar University",
    timeBn: "২০ মিনিট",
    timeEn: "20 Mins",
    icon: "🎓",
    highlight: "শিক্ষা জোন"
  }
]

// 12 Civic Amenities from brochure
const civicAmenities = [
  { id: 1, nameBn: "ডে-কেয়ার সেন্টার", nameEn: "Day-Care Center", icon: "👶", descBn: "কর্মজীবী পিতা-মাতার জন্য নিরাপদ ও আধুনিক চাইল্ড কেয়ার ব্যবস্থা", descEn: "Modern secure nursery for working parents" },
  { id: 2, nameBn: "স্কুল, কলেজ ও বিশ্ববিদ্যালয়", nameEn: "Schools, Colleges & Unis", icon: "🎓", descBn: "আন্তর্জাতিক মানের শিক্ষাপ্রতিষ্ঠান ও সংলগ্ন ১৭টি খ্যাতনামা বিশ্ববিদ্যালয়", descEn: "Top educational institutes & 17 nearby renowned universities" },
  { id: 3, nameBn: "কমিউনিটি সেন্টার", nameEn: "Community Center", icon: "🏛️", descBn: "পারিবারিক ও সামাজিক অনুষ্ঠানের জন্য সুবিশাল ব্যাঙ্কুয়েট হল", descEn: "Grand banquet hall for community & family celebrations" },
  { id: 4, nameBn: "ইসলামিক সিটি ও কেন্দ্রীয় মসজিদ", nameEn: "Islamic City & Central Mosque", icon: "🕌", descBn: "নান্দনিক স্থাপত্যের সুবিশাল কেন্দ্রীয় মসজিদ ও ইসলামিক কমপ্লেক্স", descEn: "Grand architectural mosque & integrated Islamic complex" },
  { id: 5, nameBn: "নিরাপত্তা ব্যবস্থা ও পুলিশ বক্স", nameEn: "24/7 Security & Police Box", icon: "👮", descBn: "সার্বক্ষণিক সিসিটিভি নজরদারি, আধুনিক নিরাপত্তা গেট ও পুলিশ ক্যাম্প", descEn: "Round-the-clock CCTV surveillance, gated security & police post" },
  { id: 6, nameBn: "বাংলা ও ইংরেজি মাধ্যমের মাদ্রাসা", nameEn: "Integrated Madrasa", icon: "📖", descBn: "আধুনিক শিক্ষা ও ধর্মীয় জ্ঞানের সমন্বয়ে সমন্বিত মাদ্রাসা ব্যবস্থা", descEn: "Integrated modern Islamic & contemporary dual curriculum" },
  { id: 7, nameBn: "শপিং সেন্টার, সিনে-ক্যাফে", nameEn: "Shopping Mall & Cine-Café", icon: "🛍️", descBn: "আধুনিক শপিং মল, ব্র্যান্ডেড আউটলেট, ফুডকোর্ট ও সিনে-ক্যাফে", descEn: "Mega shopping mall, branded outlets, food court & movie café" },
  { id: 8, nameBn: "শিশু পার্ক ও অ্যামিউজমেন্ট পার্ক", nameEn: "Children & Theme Park", icon: "🎡", descBn: "শিশুদের খেলার রাইড, উন্মুক্ত গ্রিন পার্ক ও পরিবারের বিনোদন জোন", descEn: "Theme rides, kids outdoor playground & family green zones" },
  { id: 9, nameBn: "ক্লিনিক ও ঢাকা আইকন হাসপাতাল", nameEn: "Dhaka Icon Hospital & Clinic", icon: "🏥", descBn: "২৪ ঘণ্টা জরুরি চিকিৎসা, আধুনিক ডায়াগনস্টিক ও স্পেশালাইজড কেয়ার", descEn: "24/7 emergency healthcare, diagnostic center & specialist care" },
  { id: 10, nameBn: "জিমনেসিয়াম, খেলার মাঠ", nameEn: "Gymnasium & Sports Ground", icon: "🏋️", descBn: "আধুনিক ফিটনেস সেন্টার, ইনডোর গেমস ও সুবিশাল খেলার মাঠ", descEn: "State-of-the-art fitness gym, sports club & football pitch" },
  { id: 11, nameBn: "কবরস্থান", nameEn: "Dedicated Graveyard", icon: "⚰️", descBn: "টাউনশিপের নিজস্ব সুপরিকল্পিত ও সংরক্ষিত কবরস্থান এলাকা", descEn: "Well-maintained dedicated township community graveyard" },
  { id: 12, nameBn: "লেক ও পার্ক লেন ওয়াকওয়ে", nameEn: "Central Lake & Park Lane", icon: "🌊", descBn: "লেকভিউ সংলগ্ন ৮০ ও ৪০ ফুট প্রশস্ত গ্রিন প্রমেনেড ও জগিং ট্র্যাক", descEn: "80 & 40-foot wide scenic lakefront promenade & jogging tracks" }
]

// 17 Nearby Universities list from brochure
const nearbyUnis = [
  "Bangladesh University of Professionals (BUP)",
  "BRAC University",
  "Daffodil International University (DIU)",
  "Uttara University",
  "Eastern University",
  "World University of Bangladesh (WUB)",
  "European University of Bangladesh (EUB)",
  "BGMEA University of Fashion & Tech (BUFT)",
  "City University",
  "Manarat International University",
  "Bangladesh Islamic University (BIA)",
  "Jahangirnagar University",
  "Northern University Bangladesh",
  "Green University of Bangladesh"
]

// Leadership Team Profiles (Comprehensive Corporate Leadership)
const leadershipTeam = [
  {
    id: 1,
    nameBn: "ইঞ্জি. মোঃ রফিকুল ইসলাম",
    nameEn: "Engr. Md. Rafiqul Islam",
    roleBn: "ব্যবস্থাপনা পরিচালক ও সিইও",
    roleEn: "Managing Director & CEO",
    departmentBn: "নির্বাহী পর্ষদ",
    departmentEn: "Executive Board",
    qualification: "B.Sc. Civil Engr (BUET), FIEB",
    experience: "20+ Years Exp.",
    bioBn: "মেগা অবকাঠামো ও আবাসন খাতে দীর্ঘ ২ দশকের অভিজ্ঞ নেতৃত্বে পরিচালিত। আধুনিক ও পরিকল্পিত মেগা উপশহর নির্মাণের স্বপ্নদ্রষ্টা।",
    bioEn: "Over 2 decades of visionary leadership in mega real estate and planned township development across Bangladesh.",
    image: "/leader-1.jpg"
  },
  {
    id: 2,
    nameBn: "ফারহানা রহমান চৌধুরী",
    nameEn: "Farhana Rahman Chowdhury",
    roleBn: "পরিচালক, পরিচালনা ও নগর পরিকল্পনা",
    roleEn: "Director, Operations & Town Planning",
    departmentBn: "অপারেশনস ও প্ল্যানিং",
    departmentEn: "Operations & Planning",
    qualification: "MURP, B.Arch (BUET)",
    experience: "15+ Years Exp.",
    bioBn: "টেকসই মাস্টারপ্ল্যান ও আধুনিক সবুজ আবাসন নকশায় বিশেষজ্ঞ। প্রকল্পের সময়ানুবর্তিতা ও সামগ্রিক ব্যবস্থাপনা নিয়ন্ত্রণ করেন।",
    bioEn: "Specializes in sustainable urban planning, master layout compliance, and efficient project operational delivery.",
    image: "/leader-2.jpg"
  },
  {
    id: 3,
    nameBn: "স্থপতি সৈয়দ আনোয়ার হোসেন",
    nameEn: "Ar. Syed Anwar Hossain",
    roleBn: "প্রধান স্থপতি ও টেকনিক্যাল হেড",
    roleEn: "Chief Architect & Technical Head",
    departmentBn: "আর্কিটেকচার ও ডিজাইন",
    departmentEn: "Architecture & Design",
    qualification: "M.Arch, MIAB",
    experience: "16+ Years Exp.",
    bioBn: "আন্তর্জাতিক মানের স্থাপত্যশৈলী ও আধুনিক রিভারফ্রন্ট ওয়াকওয়ে এবং অ্যাভিনিউ রোড অবকাঠামো বাস্তবায়নে অভিজ্ঞ।",
    bioEn: "Award-winning design architect overseeing world-class waterfront boulevards, lake parks, and urban landscape architecture.",
    image: "/leader-3.jpg"
  },
  {
    id: 4,
    nameBn: "প্রিয়া শর্মা, এফসিএ",
    nameEn: "Priya Sharma, FCA",
    roleBn: "পরিচালক, অর্থ ও বিনিয়োগ",
    roleEn: "Director, Finance & Investment",
    departmentBn: "অর্থ ও অডিট",
    departmentEn: "Finance & Accounts",
    qualification: "FCA, MBA (Finance, DU)",
    experience: "14+ Years Exp.",
    bioBn: "গ্রাহকদের নিরাপদ বিনিয়োগ, সহজ কিস্তি ব্যবস্থাপনা ও কর্পোরেট আর্থিক স্বচ্ছতা নিশ্চিতকরণে দায়িত্বপ্রাপ্ত।",
    bioEn: "Leads strategic financial modeling, flexible installment structuring, and transparent asset protection for buyers.",
    image: "/leader-4.jpg"
  },
  {
    id: 5,
    nameBn: "এডভোকেট মোঃ মাহবুবুর রহমান",
    nameEn: "Adv. Md. Mahbubur Rahman",
    roleBn: "প্রধান আইন উপদেষ্টা ও ভূমি বিশেষজ্ঞ",
    roleEn: "Head of Legal & Land Affairs",
    departmentBn: "আইন ও দলিল বিভাগ",
    departmentEn: "Legal & Land Title",
    qualification: "LL.B (Hon's), LL.M (DU), SC Bar",
    experience: "22+ Years Exp.",
    bioBn: "রাজউক অনুমোদন, ভূমি মিউটেশন ও শতভাগ নিষ্কণ্টক আইনি দলিল নিশ্চিতকরণে সার্বক্ষণিক নজরদারি পরিচালনা করেন।",
    bioEn: "Specializes in RAJUK statutory compliance, flawless freehold title registration, and land registry vetting.",
    image: "/leader-5.jpg"
  },
  {
    id: 6,
    nameBn: "ইঞ্জি. তানভীর আহমেদ",
    nameEn: "Engr. Tanvir Ahmed",
    roleBn: "প্রধান প্রকল্প ও অবকাঠামো প্রকৌশলী",
    roleEn: "Chief Infrastructure & Site Engineer",
    departmentBn: "সাইট ডেভেলপমেন্ট",
    departmentEn: "Site Infrastructure",
    qualification: "B.Sc. Civil Engr (BUET)",
    experience: "13+ Years Exp.",
    bioBn: "১০০ ফুট প্রধান এভিনিউ, মাটি ভরাট মান ও রিভারফ্রন্ট ড্রেনেজ নেটওয়ার্কের অন-সাইট বাস্তবায়ন তদারক করেন।",
    bioEn: "Leading civil development, road network grading, storm drainage construction, and earth filling supervision on-site.",
    image: "/leader-6.jpg"
  }
]

// Custom dropdown with a polished option list (replaces native <select> list)
function CustomSelect({ id, value, onChange, options, ariaLabel, className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = options.find((o) => o.value === value) || options[0]

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [])

  return (
    <div className={`cs-wrap ${open ? 'open' : ''} ${className}`} ref={ref}>
      <button
        type="button"
        id={id}
        className="cs-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="cs-trigger-text">
          <span className="cs-trigger-label">{selected?.label}</span>
          {selected?.sub && <small className="cs-trigger-sub">{selected.sub}</small>}
        </span>
        <ChevronDown size={18} className="cs-chevron" />
      </button>
      {open && (
        <ul className="cs-list" role="listbox">
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`cs-option ${o.value === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
            >
              <span className="cs-option-text">
                <span className="cs-option-label">{o.label}</span>
                {o.sub && <small className="cs-option-sub">{o.sub}</small>}
              </span>
              {o.value === value && <Check size={16} className="cs-check" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function App() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dz_lang')
      if (saved === 'bn' || saved === 'en') return saved
    }
    return 'en'
  })
  const t = translations[lang]

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  // Header Scroll State
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [masterplanModalOpen, setMasterplanModalOpen] = useState(false)
  const [activeGalleryModalImg, setActiveGalleryModalImg] = useState(null)

  // Interactive Plot Calculator State
  const [calcSelectedPlotId, setCalcSelectedPlotId] = useState('residential-corner')
  const [mobilePlotId, setMobilePlotId] = useState('residential-general')
  const [showAllCommute, setShowAllCommute] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [showAllUnis, setShowAllUnis] = useState(false)
  const [calcKatha, setCalcKatha] = useState(3)
  const [calcTenure, setCalcTenure] = useState('3yr') // lump, 1yr, 2yr, 3yr, 5yr

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotCategory: 'আবাসিক প্লট (কর্ণার) [Residential Corner]',
    plotSize: '৩ কাঠা [3 Katha]',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // Visit Schedule Modal State
  const [visitModalOpen, setVisitModalOpen] = useState(false)
  const [visitForm, setVisitForm] = useState({
    name: '',
    phone: '',
    location: '',
    purpose: 'Project Visit',
    date: '',
    timeSlot: '10:00 AM',
    pickupLoc: '',
    plotSize: '৩ কাঠা [3 Katha]',
    investmentAmount: '৫০ লক্ষ - ১ কোটি টাকা (50 Lakh - 1 Crore BDT)'
  })
  const [visitSubmitting, setVisitSubmitting] = useState(false)
  const [visitSuccess, setVisitSuccess] = useState(false)

  // Routing State ('home' | 'leadership-team' | 'corporate-about')
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      if (hash === '#corporate-about' || hash === '#/corporate-about' || path === '/corporate-about') {
        return 'corporate-about'
      }
      if (hash === '#leadership-team' || hash === '#/leadership-team' || path === '/leadership-team') {
        return 'leadership-team'
      }
    }
    return 'home'
  })

  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      if (hash === '#corporate-about' || hash === '#/corporate-about' || path === '/corporate-about') {
        setCurrentRoute('corporate-about')
        window.scrollTo(0, 0)
      } else if (hash === '#leadership-team' || hash === '#/leadership-team' || path === '/leadership-team') {
        setCurrentRoute('leadership-team')
        window.scrollTo(0, 0)
      } else {
        setCurrentRoute('home')
      }
    }
    window.addEventListener('hashchange', handleRouteChange)
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('hashchange', handleRouteChange)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const navigateTo = (route, targetHash = '') => {
    if (route === 'corporate-about') {
      window.location.hash = '#corporate-about'
      setCurrentRoute('corporate-about')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'leadership-team') {
      window.location.hash = '#leadership-team'
      setCurrentRoute('leadership-team')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.hash = targetHash ? `#${targetHash}` : '#'
      setCurrentRoute('home')
      if (targetHash) {
        setTimeout(() => {
          const el = document.getElementById(targetHash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  // Developer Console state (preserved for debugging & Supabase link)
  const [showDevConsole, setShowDevConsole] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('checking')
  const [inquiries, setInquiries] = useState([])
  const [logs, setLogs] = useState([])

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qofnaitxmcvlbmmlddoz.supabase.co'

  const addLog = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { time: timestamp, text, type }])
  }

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Secret Dev Console shortcut: Ctrl + Shift + D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        setShowDevConsole(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Supabase connection verify
  const verifySupabase = async () => {
    setConnectionStatus('checking')
    addLog('Verifying connection to Supabase database...', 'info')
    try {
      const { data, error } = await supabase.from('inquiries').select('*').limit(5)
      if (error) {
        setConnectionStatus('error')
        addLog(`DB Notice: ${error.message}`, 'error')
      } else {
        setConnectionStatus('connected')
        setInquiries(data || [])
        addLog(`✓ Connected to Supabase DB. Loaded ${data?.length || 0} inquiries.`, 'success')
      }
    } catch (err) {
      setConnectionStatus('error')
      addLog(`DB Exception: ${err.message}`, 'error')
    }
  }

  useEffect(() => {
    verifySupabase()
  }, [])

  // Calculate pricing
  const currentPlotObj = plotPricingData.find(p => p.id === calcSelectedPlotId) || plotPricingData[0]
  const calculatedTotalPrice = currentPlotObj.ratePerKatha * calcKatha
  const calculatedDownPayment = calculatedTotalPrice * 0.20
  const calculatedRemaining = calculatedTotalPrice - calculatedDownPayment
  
  const getMonthlyEmi = () => {
    if (calcTenure === 'lump') return 0
    let months = 36
    if (calcTenure === '1yr') months = 12
    if (calcTenure === '2yr') months = 24
    if (calcTenure === '3yr') months = 36
    if (calcTenure === '5yr') months = 60
    return Math.round(calculatedRemaining / months)
  }

  const formatBdt = (val) => {
    return '৳ ' + val.toLocaleString('en-IN')
  }

  const formatLakhText = (val) => {
    const lakh = (val / 100000).toFixed(2)
    return lang === 'bn' ? `${lakh} লক্ষ টাকা` : `৳ ${lakh} Lakh BDT`
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert(lang === 'bn' ? 'দয়া করে আপনার নাম এবং মোবাইল নম্বর দিন।' : 'Please provide your name and phone number.')
      return
    }

    setIsSubmitting(true)
    addLog(`Submitting plot inquiry from ${formData.name} (${formData.phone})...`, 'info')

    try {
      const { data, error } = await supabase.from('inquiries').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: `[Dhaka Icon City Booking] Plot Type: ${formData.plotCategory} | Size: ${formData.plotSize} | Note: ${formData.message}`
        }
      ]).select()

      if (error) {
        addLog(`DB insert error: ${error.message}. Form handled locally.`, 'error')
      } else {
        addLog('✓ Inquiry successfully logged to Supabase.', 'success')
      }
      setFormSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        plotCategory: 'আবাসিক প্লট (কর্ণার) [Residential Corner]',
        plotSize: '৩ কাঠা [3 Katha]',
        message: ''
      })
    } catch (err) {
      addLog(`Error during submit: ${err.message}`, 'error')
      setFormSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Visit Schedule Modal Form Handler
  const handleVisitSubmit = async (e) => {
    e.preventDefault()
    setVisitSubmitting(true)

    try {
      let dynamicDetails = `Purpose: ${visitForm.purpose}`
      let plotSizeVal = 'N/A'
      
      if (visitForm.purpose === 'Project Visit') {
        dynamicDetails += ` | Date: ${visitForm.date || 'Flexible'} (${visitForm.timeSlot}) | Pickup: ${visitForm.pickupLoc || 'N/A'}`
      } else if (visitForm.purpose === 'Buy Plot') {
        dynamicDetails += ` | Plot Size: ${visitForm.plotSize}`
        plotSizeVal = visitForm.plotSize
      } else if (visitForm.purpose === 'Office Visit') {
        dynamicDetails += ` | Date: ${visitForm.date || 'Flexible'} (${visitForm.timeSlot})`
      } else if (visitForm.purpose === 'Intersted patner') {
        dynamicDetails += ` | Approx Investment: ${visitForm.investmentAmount}`
        plotSizeVal = `Invest: ${visitForm.investmentAmount}`
      }

      const { data, error } = await supabase.from('inquiries').insert([
        {
          name: visitForm.name,
          phone: visitForm.phone,
          email: visitForm.location ? `Location: ${visitForm.location}` : 'N/A',
          plot_category: `Schedule: ${visitForm.purpose}`,
          plot_size: plotSizeVal,
          message: `Location: ${visitForm.location || 'N/A'} | ${dynamicDetails}`
        }
      ]).select()

      if (error) {
        addLog(`DB Notice: ${error.message}. Form handled locally.`, 'error')
      } else {
        addLog(`✓ ${visitForm.purpose} schedule logged to Supabase.`, 'success')
      }
      setVisitSuccess(true)
    } catch (err) {
      addLog(`Error during submit: ${err.message}`, 'error')
      setVisitSuccess(true)
    } finally {
      setVisitSubmitting(false)
    }
  }

  // Prefill form from calculator or pricing cards
  const selectPlotForBooking = (plotTitle, kathaCount = 3) => {
    setFormData(prev => ({
      ...prev,
      plotCategory: plotTitle,
      plotSize: `${kathaCount} কাঠা [${kathaCount} Katha]`
    }))
    document.getElementById('booking-form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`app-root ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>
      
      {/* 1. TOP NOTICE & RAJUK BADGE BAR */}
      <div className="top-announcement-bar">
        <div className="top-announcement-container">
          <div className="rajuk-top-badge">
            <ShieldCheck size={14} className="rajuk-shield-icon" />
            <span className="rajuk-label">RAJUK REG:</span>
            <span className="rajuk-reg-num">RAJUK/DC/REDMR 001262/24</span>
          </div>
        </div>
      </div>

      {/* 2. STICKY LUXURY HEADER */}
      <header className={`elite-header ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Brand Logo */}
          <a href="#" className="elite-brand-box" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
            <div className="elite-logo-wrapper">
              <img src="/Logo.png" alt="Elite Iconic Properties & Construction Limited" className="brand-logo-img" />
            </div>
            <div className="elite-brand-text">
              <span className="brand-name-main">ELITE ICONIC</span>
              <span className="brand-name-sub">properties & Construction limited</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="elite-desktop-nav">
            <ul className="elite-nav-list">
              <li><a href="#" className={`nav-link ${currentRoute === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>{t.navHome}</a></li>
              <li><a href="#corporate-about" className={`nav-link ${currentRoute === 'corporate-about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('corporate-about'); }}>{t.navAbout}</a></li>
              <li><a href="#leadership-team" className={`nav-link ${currentRoute === 'leadership-team' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('leadership-team'); }}>{t.navLeadership}</a></li>
              <li><a href="#site-gallery" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('home', 'site-gallery'); }}>{t.navGallery}</a></li>
              <li><a href="#booking-form-section" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('home', 'booking-form-section'); }}>{t.navContact}</a></li>
            </ul>
          </nav>

          {/* Header Action Right: Round Push-Switch Language Toggle */}
          <div className="header-action-group">
            <button 
              type="button"
              className="round-lang-toggle"
              onClick={() => {
                const nextLang = lang === 'en' ? 'bn' : 'en'
                setLang(nextLang)
                if (typeof window !== 'undefined') {
                  localStorage.setItem('dz_lang', nextLang)
                }
              }}
              title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              aria-label="Toggle language"
            >
              <span className="round-toggle-inner">
                {lang === 'bn' ? 'EN' : 'BN'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              className={`hamburger-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (kept outside <header>: header's backdrop-filter
          would otherwise make position:fixed relative to the header) */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-brand" onClick={() => { setMobileMenuOpen(false); navigateTo('home'); }} style={{ cursor: 'pointer' }}>
              <img src="/Logo.png" alt="Elite Iconic" className="mobile-logo" />
              <div>
                <strong>ELITE ICONIC</strong>
              </div>
            </div>
            <button className="drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu">
              <X size={24} />
            </button>
          </div>

          <ul className="mobile-nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('home'); }}>{t.navHome}</a></li>
            <li><a href="#corporate-about" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('corporate-about'); }}>{t.navAbout}</a></li>
            <li><a href="#leadership-team" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('leadership-team'); }}>{t.navLeadership}</a></li>
            <li><a href="#site-gallery" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('home', 'site-gallery'); }}>{t.navGallery}</a></li>
            <li><a href="#booking-form-section" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('home', 'booking-form-section'); }}>{t.navContact}</a></li>
          </ul>

          <div className="mobile-drawer-footer">
            <a 
              href="#booking-form-section" 
              className="drawer-booking-cta"
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                document.getElementById('booking-form-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Calendar size={16} /> {t.bookVisitBtn}
            </a>

            <a href="tel:+8801815311232" className="mobile-call-btn">
              <Phone size={16} /> +880 1815-311232
            </a>
            <div className="mobile-address-note">
              📍 নাফি টাওয়ার, লেভেল ১০, ৫৩ গুলশান এভিনিউ, ঢাকা-১২১২
            </div>
          </div>
        </div>
      {mobileMenuOpen && <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />}

      {/* MOBILE STICKY FLOATING BOTTOM QUICK ACTION BAR */}
      <div className="mobile-bottom-quick-bar">
        <a href="tel:+8801815311232" className="mobile-bar-action call">
          <Phone size={18} />
          <span>{lang === 'bn' ? 'কল করুন' : 'Call'}</span>
        </a>
        <a 
          href="#booking-form-section" 
          className="mobile-bar-action book"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('booking-form-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <Calendar size={18} />
          <span>{lang === 'bn' ? 'বুকিং' : 'Book'}</span>
        </a>
        <a 
          href="#pricing-calculator" 
          className="mobile-bar-action calc"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('pricing-calculator')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <Calculator size={18} />
          <span>{lang === 'bn' ? 'হিসাব' : 'Calc'}</span>
        </a>
        <button 
          className="mobile-bar-action plan"
          onClick={() => setMasterplanModalOpen(true)}
        >
          <Eye size={18} />
          <span>{lang === 'bn' ? 'প্ল্যান' : 'Plan'}</span>
        </button>
      </div>

      {currentRoute === 'corporate-about' ? (
        <CorporateAboutPage 
          lang={lang} 
          onScheduleVisit={() => setVisitModalOpen(true)}
          navigateTo={navigateTo}
        />
      ) : currentRoute === 'leadership-team' ? (
        <main className="leadership-page-main">
          {/* Dedicated Page Hero */}
          <section className="leadership-page-hero">
            <div className="section-container">
              <div className="leadership-hero-content">
                <h1 className="leadership-page-title">{t.leadershipTitle}</h1>
                <div className="section-divider-line" />
                <p className="leadership-page-subtitle">{t.leadershipSubtitle}</p>
              </div>
            </div>
          </section>

          {/* Full Leadership Team Grid */}
          <section className="leadership-full-roster-section">
            <div className="section-container">
              <div className="leadership-grid leadership-page-grid">
                {leadershipTeam.map((leader) => (
                  <div key={leader.id} className="leader-card">
                    <div className="leader-image-wrap">
                      <img 
                        src={leader.image} 
                        alt={lang === 'bn' ? leader.nameBn : leader.nameEn} 
                        className="leader-img" 
                        loading="lazy"
                      />
                    </div>
                    <div className="leader-info">
                      <h3 className="leader-name">{lang === 'bn' ? leader.nameBn : leader.nameEn}</h3>
                      <p className="leader-role">{lang === 'bn' ? leader.roleBn : leader.roleEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* New Section below Leadership Team: Founder director */}
          <FounderDirectorSection lang={lang} />

          {/* Consultation CTA Banner */}
          <section className="leadership-cta-section">
            <div className="section-container">
              <div className="leadership-cta-box">
                <div className="lead-cta-text">
                  <h3>{lang === 'bn' ? 'সরাসরি আমাদের বিশেষজ্ঞ টিমের সাথে পরামর্শ করতে চান?' : 'Want to Consult Directly with Our Leadership Team?'}</h3>
                  <p>{lang === 'bn' ? 'ঢাকা আইকন সিটির ভবিষ্যৎ সম্ভাবনা ও নিরাপদ প্লট ক্রয়ে বিশেষজ্ঞ পরামর্শ ও সাইট ভিজিট বুক করুন।' : 'Book a priority VIP site visit or executive consultation at our Gulshan corporate office.'}</p>
                </div>
                <button 
                  className="btn-lead-schedule-visit"
                  onClick={() => setVisitModalOpen(true)}
                >
                  <Calendar size={18} />
                  <span>{lang === 'bn' ? 'ভিজিট শিডিউল করুন' : 'Schedule VIP Consultation'}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <>
          {/* 3. HERO SHOWCASE - DHAKA ICON CITY */}
          <section className="hero-showcase-section" id="dhaka-icon-city">
        <div className="hero-bg-anim-container">
          <div className="hero-bg-image"></div>
          <div className="hero-bg-overlay"></div>
        </div>
        <div className="hero-main-container">
          <div className="hero-text-content">
            {/* Main Headline */}
            <h1 className="hero-headline">
              <span className="hero-headline-prefix">{t.heroTitlePrefix}</span>
              <span className="hero-headline-highlight">{t.heroTitleHighlight}</span>
            </h1>

            {/* Subtitle Description */}
            <p className="hero-desc-paragraph">
              {t.heroSubtitle}
            </p>

            {/* Call To Action Buttons */}
            <div className="hero-cta-buttons">
              <button 
                type="button"
                className="btn-hero-primary"
                onClick={() => setVisitModalOpen(true)}
              >
                <Calendar size={18} />
                <span>{t.heroBtnBook}</span>
                <ChevronRight size={18} />
              </button>

              <a 
                href="https://drive.google.com/file/d/13BJkWKW6Uo8pIsr9mKlIqs2XPHOevF3c/view?usp=sharing"
                className="btn-hero-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={17} />
                <span>{t.heroBtnBrochure}</span>
              </a>
            </div>
          </div>
        </div>

        {/* STATS STRIP - 3 KEY PROJECT PILLARS */}
        <div className="hero-stats-banner">
          <div className="hero-stats-container">
            {/* Box 1: Area */}
            <div className="hero-stat-box">
              <div className="stat-icon-pill">
                <Trees size={18} />
              </div>
              <div className="stat-text-wrap">
                <div className="stat-value">{t.statArea}</div>
                <div className="stat-label">{t.statAreaLbl}</div>
              </div>
            </div>
            
            {/* Box 2: Down Payment (Highlight) */}
            <div className="hero-stat-box highlight-stat">
              <div className="stat-icon-pill highlight-pill">
                <Sparkles size={18} />
              </div>
              <div className="stat-text-wrap">
                <div className="stat-value">{t.statDown}</div>
                <div className="stat-label">{t.statDownLbl}</div>
              </div>
            </div>

            {/* Box 3: Legal Verification */}
            <div className="hero-stat-box">
              <div className="stat-icon-pill">
                <ShieldCheck size={18} />
              </div>
              <div className="stat-text-wrap">
                <div className="stat-value">{t.statLegal}</div>
                <div className="stat-label">{t.statLegalLbl}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHASE 1 OFFICIAL PRICING & INTERACTIVE CALCULATOR */}
      <section className="pricing-section" id="pricing-calculator">
        <div className="section-container">
          
          <div className="section-header-center">
            <h2 className="section-main-heading">{t.pricingTitle}</h2>
            <div className="section-divider-line" />
            <p className="section-sub-desc">{t.pricingSubtitle}</p>
          </div>

          {/* Mobile-only dropdown to choose which plot card to show */}
          <div className="mobile-plot-select-wrap">
            <CustomSelect
              id="mobile-plot-select"
              value={mobilePlotId}
              onChange={setMobilePlotId}
              ariaLabel={lang === 'bn' ? 'প্লটের ধরন নির্বাচন করুন' : 'Select plot type'}
              options={plotPricingData.map((p) => ({
                value: p.id,
                label: lang === 'bn' ? p.titleBn : p.titleEn,
                sub: lang === 'bn' ? p.rateFormattedBn : p.rateFormattedEn
              }))}
            />
          </div>

          {/* Pricing Cards Grid matching the brochure exactly */}
          <div className="pricing-cards-grid">
            {plotPricingData.map((plot) => (
              <div key={plot.id} className={`pricing-card ${plot.isPopular ? 'featured-card' : ''} ${plot.id === mobilePlotId ? 'mobile-active' : 'mobile-inactive'}`}>
                {plot.isPopular && (
                  <div className="popular-badge">
                    <Sparkles size={13} />
                    <span>{lang === 'bn' ? 'সর্বাধিক চাহিদাসম্পন্ন' : 'High Demand'}</span>
                  </div>
                )}
                
                <div className="pricing-card-header">
                  <span className={`plot-type-chip ${plot.type.toLowerCase()}`}>{plot.type}</span>
                  <h3 className="plot-card-title">{lang === 'bn' ? plot.titleBn : plot.titleEn}</h3>
                  <p className="plot-card-tagline">{lang === 'bn' ? plot.tagBn : plot.tagEn}</p>
                </div>

                <div className="pricing-card-amount">
                  <span className="price-num">{lang === 'bn' ? plot.rateFormattedBn : plot.rateFormattedEn}</span>
                </div>

                <div className="pricing-terms-list">
                  <div className="term-item">
                    <Check size={16} className="text-emerald" />
                    <span>{lang === 'bn' ? 'ডাউন পেমেন্ট মাত্র ২০%' : '20% Down Payment'}</span>
                  </div>
                  <div className="term-item">
                    <Check size={16} className="text-emerald" />
                    <span>{lang === 'bn' ? '৩, ৫, ১০ কাঠা ও ১ বিঘা' : '3, 5, 10 Katha & 1 Bigha'}</span>
                  </div>
                  <div className="term-item">
                    <Check size={16} className="text-emerald" />
                    <span>{lang === 'bn' ? '১ থেকে ৫ বছর মেয়াদি সহজ কিস্তি' : '1 to 5 Year Flexible Installments'}</span>
                  </div>
                  <div className="term-item">
                    <Check size={16} className="text-emerald" />
                    <span>{lang === 'bn' ? '১০০% নিষ্কণ্টক জমি হস্তান্তর' : '100% Mutation & Freehold'}</span>
                  </div>
                </div>

                <button 
                  className={`btn-select-plot ${plot.isPopular ? 'btn-primary-emerald' : 'btn-outline-dark'}`}
                  onClick={() => {
                    setCalcSelectedPlotId(plot.id)
                    selectPlotForBooking(lang === 'bn' ? plot.titleBn : plot.titleEn, calcKatha)
                  }}
                >
                  <span>Book Now</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="pricing-bottom-notice">
            <p>{t.downPaymentNotice}</p>
          </div>

          {/* INTERACTIVE EMI & DOWN PAYMENT CALCULATOR */}
          <div className="calculator-box-wrapper">
            <div className="calculator-box-header">
              <div className="calc-header-title">
                <Calculator size={26} className="text-emerald" />
                <div>
                  <h3>{t.calcTitle}</h3>
                </div>
              </div>
            </div>

            <div className="calculator-grid">
              {/* Left Form Inputs */}
              <div className="calc-inputs-col">
                {/* 1. Category */}
                <div className="calc-form-group">
                  <label className="calc-label">{t.selectCategory}</label>
                  <div className="calc-category-mobile">
                    <CustomSelect
                      id="calc-category-select"
                      value={calcSelectedPlotId}
                      onChange={setCalcSelectedPlotId}
                      ariaLabel={t.selectCategory}
                      options={plotPricingData.map((p) => ({
                        value: p.id,
                        label: lang === 'bn' ? p.titleBn : p.titleEn,
                        sub: lang === 'bn' ? p.rateFormattedBn : p.rateFormattedEn
                      }))}
                    />
                  </div>
                  <div className="calc-category-selector">
                    {plotPricingData.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`category-pill-btn ${calcSelectedPlotId === p.id ? 'active' : ''}`}
                        onClick={() => setCalcSelectedPlotId(p.id)}
                      >
                        <span>{lang === 'bn' ? p.titleBn : p.titleEn}</span>
                        <small>{lang === 'bn' ? p.rateFormattedBn : p.rateFormattedEn}</small>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Katha Size */}
                <div className="calc-form-group">
                  <label className="calc-label">{t.selectSize}: <strong className="text-emerald">{calcKatha} {lang === 'bn' ? 'কাঠা' : 'Katha'}</strong></label>
                  <div className="katha-preset-buttons">
                    {[3, 5, 10, 20].map((k) => (
                      <button
                        key={k}
                        type="button"
                        className={`katha-btn ${calcKatha === k ? 'active' : ''}`}
                        onClick={() => setCalcKatha(k)}
                      >
                        {k === 20 ? (lang === 'bn' ? '১ বিঘা (২০ কাঠা)' : '1 Bigha (20 Katha)') : `${k} ${lang === 'bn' ? 'কাঠা' : 'Katha'}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Payment Tenure */}
                <div className="calc-form-group">
                  <label className="calc-label">{t.selectTenure}</label>
                  <CustomSelect
                    id="calc-tenure-select"
                    value={calcTenure}
                    onChange={setCalcTenure}
                    ariaLabel={t.selectTenure}
                    options={[
                      { value: 'lump', label: t.tenureLumpSum },
                      { value: '1yr', label: t.tenure1Yr },
                      { value: '2yr', label: t.tenure2Yr },
                      { value: '3yr', label: t.tenure3Yr },
                      { value: '5yr', label: t.tenure5Yr }
                    ]}
                  />
                </div>
              </div>

              {/* Right Summary Card */}
              <div className="calc-summary-col">
                <div className="calc-result-card">
                  <div className="result-card-header">
                    <span className="result-badge">Investment Summary</span>
                    <h4>{lang === 'bn' ? currentPlotObj.titleBn : currentPlotObj.titleEn} - {calcKatha} {lang === 'bn' ? 'কাঠা' : 'Katha'}</h4>
                  </div>

                  <div className="result-breakdown">
                    <div className="result-row total-row">
                      <span>{t.calcTotal}:</span>
                      <strong className="text-price">{formatLakhText(calculatedTotalPrice)} ({formatBdt(calculatedTotalPrice)})</strong>
                    </div>

                    <div className="result-row down-payment-row">
                      <span>{t.calcDownPayment} (20%):</span>
                      <strong className="text-emerald">{formatLakhText(calculatedDownPayment)} ({formatBdt(calculatedDownPayment)})</strong>
                    </div>

                    <div className="result-row">
                      <span>{t.calcRemaining} (80%):</span>
                      <span>{formatLakhText(calculatedRemaining)}</span>
                    </div>

                    {calcTenure !== 'lump' && (
                      <div className="result-row emi-row">
                        <span>{t.calcMonthly}:</span>
                        <strong className="text-emi">{formatBdt(getMonthlyEmi())} / {lang === 'bn' ? 'মাস' : 'Month'}</strong>
                      </div>
                    )}
                  </div>

                  <button 
                    className="btn-book-from-calc"
                    onClick={() => selectPlotForBooking(`${lang === 'bn' ? currentPlotObj.titleBn : currentPlotObj.titleEn}`, calcKatha)}
                  >
                    <Calendar size={16} />
                    <span>{t.btnBookCalculated}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. LEADERSHIP TEAM PREVIEW */}
      <section className="leadership-section" id="leadership-preview">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-main-heading">{t.leadershipTitle}</h2>
            <div className="section-divider-line" />
            <p className="section-sub-desc">{t.leadershipSubtitle}</p>
          </div>

          <div className="leadership-grid">
            {leadershipTeam.slice(0, 4).map((leader) => (
              <div key={leader.id} className="leader-card">
                <div className="leader-image-wrap">
                  <img 
                    src={leader.image} 
                    alt={lang === 'bn' ? leader.nameBn : leader.nameEn} 
                    className="leader-img" 
                    loading="lazy"
                  />
                </div>
                <div className="leader-info">
                  <h3 className="leader-name">{lang === 'bn' ? leader.nameBn : leader.nameEn}</h3>
                  <p className="leader-role">{lang === 'bn' ? leader.roleBn : leader.roleEn}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="leadership-see-more-wrap">
            <a 
              href="#leadership-team"
              className="btn-leadership-see-more"
              onClick={(e) => {
                e.preventDefault()
                navigateTo('leadership-team')
              }}
            >
              <span>{lang === 'bn' ? 'সকল টিম মেম্বার দেখুন (See More)' : 'See Full Leadership Team'}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. MASTER PLAN SECTION & ROAD NETWORK */}
      <section className="masterplan-section" id="masterplan">
        <div className="section-container">
          <div className="masterplan-grid">
            <div className="masterplan-content-col">
              <h2 className="masterplan-heading">{t.masterplanTitle}</h2>
              <div className="section-divider-line" />
              <p className="masterplan-desc-text">{t.masterplanDesc}</p>

              <div className="masterplan-features-list">
                <div className="mp-feature-item">
                  <div className="mp-feature-icon">🛣️</div>
                  <div>
                    <h4>100' Wide Main Avenue Road #01</h4>
                    <p>{lang === 'bn' ? 'প্রকল্পের প্রবেশদ্বার থেকে কেন্দ্রীয় লেক পর্যন্ত ১০০ ফুট প্রশস্ত মূল এভিনিউ' : '100 feet wide arterial grand boulevard connecting the entrance to the lake'}</p>
                  </div>
                </div>

                <div className="mp-feature-item">
                  <div className="mp-feature-icon">🌊</div>
                  <div>
                    <h4>80' & 40' Wide Lake View Boulevards</h4>
                    <p>{lang === 'bn' ? 'প্রাকৃতিক লেকের দুপাশ দিয়ে ৮০ ও ৪০ ফুট প্রশস্ত মনোরম লেকভিউ রোড ও ওয়াকওয়ে' : '80 & 40 feet wide scenic lakeside promenades and tree-lined walkways'}</p>
                  </div>
                </div>

                <div className="mp-feature-item">
                  <div className="mp-feature-icon">🚗</div>
                  <div>
                    <h4>60' Connecting Avenues & 30'/25' Internal Roads</h4>
                    <p>{lang === 'bn' ? 'প্রতিটি আবাসিক ও বাণিজ্যিক ব্লকে সহজ ও বাধাহীন গাড়ী চলাচলের আধুনিক নেটওয়ার্ক' : 'Wide grid system providing direct seamless vehicle access to every single plot'}</p>
                  </div>
                </div>

                <div className="mp-feature-item">
                  <div className="mp-feature-icon">🌳</div>
                  <div>
                    <h4>Park Lane, Green Belt & Central Promenade</h4>
                    <p>{lang === 'bn' ? 'পার্ক লেন, বৃক্ষরোপণ করিডোর ও উন্মুক্ত সবুজ পার্ক জোন' : 'Lush landscaped green belts, park lane walking corridors & recreation grounds'}</p>
                  </div>
                </div>
              </div>

              <div className="mp-actions-row">
                <button 
                  className="btn-view-masterplan"
                  onClick={() => setMasterplanModalOpen(true)}
                >
                  <Eye size={18} />
                  <span>{t.viewFullMasterplan}</span>
                </button>
              </div>
            </div>

            <div className="masterplan-image-col">
              <div className="masterplan-preview-card" onClick={() => setMasterplanModalOpen(true)}>
                <img src="/dhaka-icon-masterplan.jpg" alt="Dhaka Icon City Master Plan" className="masterplan-img-preview" />
                <div className="masterplan-overlay-hint">
                  <Eye size={28} />
                  <span>{lang === 'bn' ? 'বড় করে মাস্টার প্ল্যান দেখতে ক্লিক করুন' : 'Click to View Full Resolution Map'}</span>
                </div>
                <div className="masterplan-badge-tag">DHAKA ICON CITY MASTER PLAN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STRATEGIC LOCATION & CONNECTIVITY (RADIAL TIMINGS + 17 UNIVERSITIES) */}
      <section className="connectivity-section" id="connectivity-location">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-main-heading">{t.locTitle}</h2>
            <div className="section-divider-line" />
            <p className="section-sub-desc">{t.locDesc}</p>
          </div>

          {/* Commute Times Radial / Grid Cards matching the brochure */}
          <div className="commute-grid-container">
            <div className="commute-header-strip">
              <div className="commute-strip-title">
                <Navigation size={20} className="text-emerald" />
                <span>{t.distanceTitle}</span>
              </div>
              <span className="commute-strip-bridge">বিরুলিয়া সেতু ⟵ সংলগ্ন ⟶ ঢাকা আইকন সিটি</span>
            </div>

            <div className="commute-cards-grid">
              {commuteLandmarks.map((item, idx) => (
                <div key={idx} className={`commute-card ${idx >= 4 && !showAllCommute ? 'commute-extra-hidden' : ''}`}>
                  <div className="commute-card-top">
                    <span className="commute-icon">{item.icon}</span>
                    <span className="commute-time-badge">{lang === 'bn' ? item.timeBn : item.timeEn}</span>
                  </div>
                  <h4 className="commute-landmark-name">{lang === 'bn' ? item.nameBn : item.nameEn}</h4>
                  <div className="commute-highlight-tag">{item.highlight}</div>
                </div>
              ))}
            </div>
            {commuteLandmarks.length > 4 && (
              <button
                type="button"
                id="commute-see-all-btn"
                className="commute-see-all-btn"
                onClick={() => setShowAllCommute((v) => !v)}
              >
                <span>
                  {showAllCommute
                    ? (lang === 'bn' ? 'কম দেখুন' : 'Show Less')
                    : (lang === 'bn' ? 'সব দেখুন' : 'See All')}
                </span>
                <ChevronDown size={16} className={showAllCommute ? 'flip' : ''} />
              </button>
            )}
          </div>

          {/* 17 Renowned Universities Section */}
          <div className="universities-showcase-box">
            <div className="unis-header">
              <h3>{lang === 'bn' ? 'প্রকল্পের ৩ থেকে ৫ কিলোমিটারের মধ্যে রয়েছে ১৭টি স্বনামধন্য বিশ্ববিদ্যালয়' : '17 Renowned Universities Located Within 3 to 5 KM'}</h3>
              <p>{lang === 'bn' ? 'আধুনিক শিক্ষানগরীর প্রাণকেন্দ্রে আপনার সন্তানের নিশ্চিত ও নিরাপদ ভবিষ্যৎ গড়ে তুলুন।' : 'Invest in the heart of Dhaka’s upcoming premier education hub for your family.'}</p>
            </div>

            <div className="unis-pills-wrap">
              {nearbyUnis.map((uni, idx) => (
                <div key={idx} className={`uni-pill-item ${idx >= 4 && !showAllUnis ? 'uni-extra-hidden' : ''}`}>
                  <span className="uni-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="uni-name">{uni}</span>
                </div>
              ))}
            </div>

            {nearbyUnis.length > 4 && (
              <button
                type="button"
                id="unis-see-all-btn"
                className="commute-see-all-btn unis-see-all-btn"
                onClick={() => setShowAllUnis((v) => !v)}
              >
                <span>
                  {showAllUnis
                    ? (lang === 'bn' ? 'কম দেখুন' : 'Show Less')
                    : (lang === 'bn' ? 'সব দেখুন' : 'See All')}
                </span>
                <ChevronDown size={16} className={showAllUnis ? 'flip' : ''} />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 7. SOCIAL & CIVIC AMENITIES (12 AMENITIES FROM BROCHURE) */}
      <section className="amenities-section" id="civic-amenities">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-main-heading">{t.amenitiesTitle}</h2>
            <div className="section-divider-line" />
            <p className="section-sub-desc">{t.amenitiesSubtitle}</p>
          </div>

          <div className="amenities-grid-12">
            {civicAmenities.map((amenity, idx) => (
              <div key={amenity.id} className={`amenity-card ${idx >= 4 && !showAllAmenities ? 'amenity-extra-hidden' : ''}`}>
                <div className="amenity-icon-box">{amenity.icon}</div>
                <h3 className="amenity-card-title">{lang === 'bn' ? amenity.nameBn : amenity.nameEn}</h3>
                <p className="amenity-card-desc">{lang === 'bn' ? amenity.descBn : amenity.descEn}</p>
              </div>
            ))}
          </div>
          {civicAmenities.length > 4 && (
            <button
              type="button"
              id="amenities-see-all-btn"
              className="commute-see-all-btn amenities-see-all-btn"
              onClick={() => setShowAllAmenities((v) => !v)}
            >
              <span>
                {showAllAmenities
                  ? (lang === 'bn' ? 'কম দেখুন' : 'Show Less')
                  : (lang === 'bn' ? 'সব দেখুন' : 'See All')}
              </span>
              <ChevronDown size={16} className={showAllAmenities ? 'flip' : ''} />
            </button>
          )}
        </div>
      </section>

      {/* 8. LIVE SITE DEVELOPMENT PROGRESS GALLERY */}
      <section className="gallery-section" id="site-gallery">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-main-heading">{t.galleryTitle}</h2>
            <div className="section-divider-line" />
            <p className="section-sub-desc">{t.gallerySubtitle}</p>
          </div>

          <div className="gallery-photos-grid">
            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/dhaka-icon-progress-1.jpg')}>
              <img src="/dhaka-icon-progress-1.jpg" alt="Active Sandfilling Pipeline Turag River" className="gallery-img" />
              <div className="gallery-img-overlay">
                <span className="gallery-badge">লাইভ প্রজেক্ট ওয়ার্ক</span>
                <h4>{lang === 'bn' ? 'তুরাগ নদী সংলগ্ন বালু ভরাট ও ড্রেজিং পাইপলাইন' : 'Turag River Dredging & Slurry Sand Filling'}</h4>
                <p>{lang === 'bn' ? 'সরেজমিনে দ্রুতগতিতে চলমান মাটি ও বালু ভরাটের দৃশ্য' : 'Active land elevation and infrastructure preparation'}</p>
              </div>
            </div>

            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/dhaka-icon-progress-2.jpg')}>
              <img src="/dhaka-icon-progress-2.jpg" alt="Investor Site Visit & Delegation" className="gallery-img" />
              <div className="gallery-img-overlay">
                <span className="gallery-badge">সাইট ভিজিট</span>
                <h4>{lang === 'bn' ? 'সম্মানিত ক্রেতা ও বিনিয়োগকারীদের সাইট পরিদর্শন' : 'Investor & Client VIP Site Inspection Visit'}</h4>
                <p>{lang === 'bn' ? 'কোম্পানির উচ্চপদস্থ কর্মকর্তাদের সাথে প্লট পর্যবেক্ষণ' : 'Direct on-site plot verification with company executives'}</p>
              </div>
            </div>

            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/dhaka-icon-hero.jpg')}>
              <img src="/dhaka-icon-hero.jpg" alt="Dhaka Icon City Grand Gate Perspective" className="gallery-img" />
              <div className="gallery-img-overlay">
                <span className="gallery-badge">ল্যান্ডমার্ক এন্ট্রান্স</span>
                <h4>{lang === 'bn' ? 'ঢাকা আইকন সিটির রাজকীয় গ্র্যান্ড এন্ট্রান্স গেট' : 'Grand Architectural Monument Entrance Gate'}</h4>
                <p>{lang === 'bn' ? '১০০ ফুট প্রশস্ত প্রধান এভিনিউ সংলগ্ন ওয়াটার ফাউন্টেন' : '100ft Wide Avenue with landscaped central fountains'}</p>
              </div>
            </div>

            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/dhaka-icon-masterplan.jpg')}>
              <img src="/dhaka-icon-masterplan.jpg" alt="Masterplan Aerial Visual" className="gallery-img" />
              <div className="gallery-img-overlay">
                <span className="gallery-badge">মাস্টার প্ল্যান</span>
                <h4>{lang === 'bn' ? 'তুরাগ নদীর তীর ঘেঁষে আধুনিক টাউনশিপ পরিকল্পনা' : 'Modern Riverfront Plotted Township Layout'}</h4>
                <p>{lang === 'bn' ? 'আবাসিক, বাণিজ্যিক ও সেন্ট্রাল পার্ক জোন বিন্যাস' : 'Integrated residential, commercial and central park zones'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CORPORATE GOVERNANCE, RAJUK & OFFICIAL HEADQUARTERS */}
      <section className="governance-section" id="corporate-about">
        <div className="section-container">
          <div className="governance-card-grid">
            {/* Left Box: Corporate Profile, Leadership & Approvals */}
            <div className="governance-info-card" id="corporate-governance">
              <h2 className="gov-main-title">{t.govTitle}</h2>
              <div className="section-divider-line" />

              <div className="gov-credential-box">
                <div className="cred-icon-wrap">
                  <ShieldCheck size={28} className="text-emerald" />
                </div>
                <div>
                  <h4 className="cred-title">{t.regRajuk}</h4>
                  <p className="cred-text">{lang === 'bn' ? 'প্রকল্পের প্রতিটি প্লট সম্পূর্ণ সরকারি নিয়ম মেনে নিষ্কণ্টক জমিতে অনুমোদিত।' : 'All plots adhere strictly to governmental town planning & ownership standards.'}</p>
                </div>
              </div>

              <div className="gov-credential-box">
                <div className="cred-icon-wrap">
                  <Building2 size={28} className="text-emerald" />
                </div>
                <div>
                  <h4 className="cred-title">{t.productBy}</h4>
                  <p className="cred-text">{lang === 'bn' ? 'গোল্ডেন আই ডেভেলপার্স লিমিটেডের সুদীর্ঘ অভিজ্ঞতা ও আস্থার স্বাক্ষর।' : 'Backed by the long-standing industry trust of Goldeneye Developers Ltd.'}</p>
                </div>
              </div>

              <div className="gov-credential-box">
                <div className="cred-icon-wrap">
                  <Award size={28} className="text-emerald" />
                </div>
                <div>
                  <h4 className="cred-title">{t.assocBadge}</h4>
                  <p className="cred-text">{lang === 'bn' ? 'ঢাকা ডেভেলপার্স এন্ড রিয়েল এস্টেট গ্রুপ (DD REG) এবং বিএলডিএ সংশ্লিষ্টতা।' : 'Affiliated with premier national real estate and developer associations.'}</p>
                </div>
              </div>
            </div>

            {/* Right Box: Corporate Office Address Card */}
            <div className="headquarters-card">
              <div className="hq-card-top">
                <div className="hq-icon-pin">📍</div>
                <div>
                  <span className="hq-tag">{lang === 'bn' ? 'প্রধান কর্পোরেট কার্যালয়' : 'Corporate Headquarters'}</span>
                  <h3 className="hq-building-name">Nafi Tower, Level 10</h3>
                </div>
              </div>

              <div className="hq-address-body">
                <p className="hq-street">53 Gulshan Avenue, Gulshan-01, Dhaka-1212, Bangladesh</p>
                <p className="hq-street-bn">নাফি টাওয়ার, লেভেল ১০, ৫৩ গুলশান এভিনিউ, গুলশান-০১, ঢাকা-১২১২, বাংলাদেশ</p>
              </div>

              <div className="hq-contact-details">
                <div className="hq-contact-item">
                  <Phone size={18} className="text-emerald" />
                  <div>
                    <span className="lbl">Hotline:</span>
                    <a href="tel:+8801815311232" className="val">+880 1815-311232</a>
                  </div>
                </div>

                <div className="hq-contact-item">
                  <Mail size={18} className="text-emerald" />
                  <div>
                    <span className="lbl">Email:</span>
                    <a href="mailto:info@eliteiconic.com" className="val">info@eliteiconic.com</a>
                  </div>
                </div>

                <div className="hq-contact-item">
                  <ExternalLink size={18} className="text-emerald" />
                  <div>
                    <span className="lbl">Website:</span>
                    <a href="https://www.eliteiconic.com" target="_blank" rel="noopener noreferrer" className="val">www.eliteiconic.com</a>
                  </div>
                </div>
              </div>

              <div className="hq-map-preview">
                <iframe
                  title="Gulshan Headquarters"
                  src="https://maps.google.com/maps?q=Nafi+Tower+53+Gulshan+Avenue+Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="160"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE PLOT BOOKING & SITE VISIT INQUIRY FORM */}
      <section className="booking-form-section" id="booking-form-section">
        <div className="section-container">
          <div className="booking-form-wrapper">
            <div className="form-info-side">
              <span className="section-tag-badge">GET IN TOUCH</span>
              <h2 className="form-main-heading">{t.formTitle}</h2>
              <div className="section-divider-line" />
              <p className="form-desc-text">{t.formSubtitle}</p>

              <div className="form-direct-perks">
                <div className="perk-row">
                  <CheckCircle2 size={20} className="text-emerald" />
                  <span>{lang === 'bn' ? 'ফ্রি সাইট ভিজিট ও কোম্পানির নিজস্ব ট্রান্সপোর্ট সুবিধা' : 'Free VIP site inspection with company transport'}</span>
                </div>
                <div className="perk-row">
                  <CheckCircle2 size={20} className="text-emerald" />
                  <span>{lang === 'bn' ? 'সরাসরি হেড অফিসে দলিল ও খতিয়ান যাচাইয়ের সুযোগ' : 'Direct title deed & mutation paper verification at HQ'}</span>
                </div>
                <div className="perk-row">
                  <CheckCircle2 size={20} className="text-emerald" />
                  <span>{lang === 'bn' ? 'কাস্টমাইজড কিস্তি ও আকর্ষণীয় ডাউন পেমেন্ট ডিসকাউন্ট' : 'Customized installment schedule & exclusive down payment discounts'}</span>
                </div>
              </div>

              <div className="hotline-box-highlight">
                <Phone size={24} className="text-emerald" />
                <div>
                  <span className="hl-label">{lang === 'bn' ? 'সরাসরি হটলাইনে কথা বলুন:' : 'Direct Sales Hotline:'}</span>
                  <a href="tel:+8801815311232" className="hl-number">+880 1815-311232</a>
                </div>
              </div>
            </div>

            <div className="form-card-side">
              {formSuccess ? (
                <div className="form-success-box">
                  <CheckCircle2 size={64} className="text-emerald success-big-icon" />
                  <h3>{lang === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Inquiry Submitted Successfully!'}</h3>
                  <p>{t.formSuccess}</p>
                  <button 
                    className="btn-send-another"
                    onClick={() => setFormSuccess(false)}
                  >
                    {lang === 'bn' ? 'আরেকটি আবেদন পাঠান' : 'Submit Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="elite-inquiry-form">
                  <div className="form-row-2">
                    <div className="form-group-item">
                      <label className="input-label">{t.lblFullName}</label>
                      <input 
                        type="text" 
                        className="text-input-field" 
                        placeholder={lang === 'bn' ? 'উদাঃ মোঃ রফিকুল ইসলাম' : 'e.g. Rafiqul Islam'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group-item">
                      <label className="input-label">{t.lblPhone}</label>
                      <input 
                        type="tel" 
                        className="text-input-field" 
                        placeholder="+880 17XX-XXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">{t.lblEmail}</label>
                    <input 
                      type="email" 
                      className="text-input-field" 
                      placeholder="e.g. client@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group-item">
                      <label className="input-label">{t.lblPlotType}</label>
                      <select 
                        className="select-input-field"
                        value={formData.plotCategory}
                        onChange={(e) => setFormData({ ...formData, plotCategory: e.target.value })}
                      >
                        <option value="বাণিজ্যিক প্লট (কর্ণার) [Commercial Corner]">বাণিজ্যিক প্লট (কর্ণার) [Commercial Corner]</option>
                        <option value="বাণিজ্যিক প্লট (সাধারণ) [Commercial General]">বাণিজ্যিক প্লট (সাধারণ) [Commercial General]</option>
                        <option value="আবাসিক প্লট (কর্ণার) [Residential Corner]">আবাসিক প্লট (কর্ণার) [Residential Corner]</option>
                        <option value="আবাসিক প্লট (দক্ষিণমুখী) [Residential South]">আবাসিক প্লট (দক্ষিণমুখী) [Residential South]</option>
                        <option value="আবাসিক প্লট (সাধারণ) [Residential General]">আবাসিক প্লট (সাধারণ) [Residential General]</option>
                      </select>
                    </div>

                    <div className="form-group-item">
                      <label className="input-label">{t.lblPlotSize}</label>
                      <select 
                        className="select-input-field"
                        value={formData.plotSize}
                        onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                      >
                        <option value="৩ কাঠা [3 Katha]">৩ কাঠা [3 Katha]</option>
                        <option value="৫ কাঠা [5 Katha]">৫ কাঠা [5 Katha]</option>
                        <option value="১০ কাঠা [10 Katha]">১০ কাঠা [10 Katha]</option>
                        <option value="১ বিঘা (২০ কাঠা) [1 Bigha / 20 Katha]">১ বিঘা (২০ কাঠা) [1 Bigha / 20 Katha]</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">{t.lblMessage}</label>
                    <textarea 
                      className="textarea-input-field"
                      placeholder={lang === 'bn' ? 'কোন তারিখে সাইট ভিজিট করতে চান অথবা আপনার বিশেষ কোনো প্রশ্ন থাকলে লিখুন...' : 'Preferred site inspection date or custom requirements...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-submit-booking"
                    disabled={isSubmitting}
                  >
                    <Calendar size={18} />
                    <span>{isSubmitting ? t.formSubmitting : t.btnSubmitForm}</span>
                    <ChevronRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
        </>
      )}

      {/* 12. CORPORATE FOOTER */}
      <footer className="elite-corporate-footer">
        <div className="footer-container">
          <div className="footer-top-grid">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <div className="footer-logo-row">
                <img src="/Logo.png" alt="Elite Iconic" className="footer-brand-logo" />
                <div>
                  <h3 className="footer-brand-title">ELITE ICONIC</h3>
                  <p className="footer-brand-sub">properties & Construction limited</p>
                </div>
              </div>
              <p className="footer-about-text">
                {lang === 'bn' 
                  ? 'ঢাকা আইকন সিটি—মিরপুর ১৪ ও বীরুলিয়া সেতু সংলগ্ন ২,৫০০ কাঠার মেগা প্লটেড উপশহর। টেকসই আবাসন ও আস্থার অনন্য প্রতীক।' 
                  : 'Dhaka Icon City—2,500 Katha premier plotted township adjoining Birulia Bridge & Mirpur 14. Building sustainable investments and trusted communities.'}
              </p>
              <div className="footer-rajuk-stamp">
                <ShieldCheck size={16} className="text-emerald" />
                <span>রাজউক নিবন্ধন: RAJUK/DC/REDMR 001262/24</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links-col">
              <h4 className="footer-heading">ঢাকা আইকন সিটি</h4>
              <ul className="footer-links-list">
                <li><a href="#corporate-about" onClick={(e) => { e.preventDefault(); navigateTo('corporate-about'); }}>{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}</a></li>
                <li><a href="#leadership-team" onClick={(e) => { e.preventDefault(); navigateTo('leadership-team'); }}>{lang === 'bn' ? 'লিডারশিপ টিম' : 'Leadership Team'}</a></li>
                <li><a href="#pricing-calculator" onClick={(e) => { e.preventDefault(); navigateTo('home', 'pricing-calculator'); }}>{lang === 'bn' ? 'ইন্টারেক্টিভ ক্যালকুলেটর' : 'Interactive Calculator'}</a></li>
                <li><a href="#connectivity-location" onClick={(e) => { e.preventDefault(); navigateTo('home', 'connectivity-location'); }}>{lang === 'bn' ? 'দূরত্ব ও যাতায়াত' : 'Connectivity & Location'}</a></li>
                <li><a href="#civic-amenities" onClick={(e) => { e.preventDefault(); navigateTo('home', 'civic-amenities'); }}>{lang === 'bn' ? '১২টি নাগরিক সুবিধা' : '12 Civic Amenities'}</a></li>
              </ul>
            </div>

            {/* Corporate Office Details */}
            <div className="footer-links-col">
              <h4 className="footer-heading">কর্পোরেট প্রধান অফিস</h4>
              <p className="footer-office-address">
                📍 <strong>Nafi Tower, Level 10</strong><br />
                53 Gulshan Avenue, Gulshan-01,<br />
                Dhaka-1212, Bangladesh
              </p>
              <div className="footer-contact-links">
                <a href="tel:+8801815311232"><Phone size={14} /> +880 1815-311232</a>
                <a href="mailto:info@eliteiconic.com"><Mail size={14} /> info@eliteiconic.com</a>
                <a href="https://www.eliteiconic.com" target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /> www.eliteiconic.com</a>
              </div>
            </div>

            {/* Affiliations Badges */}
            <div className="footer-links-col">
              <h4 className="footer-heading">অ্যাফিলিয়েশন ও পার্টনার</h4>
              <p className="footer-partner-desc">
                • Goldeneye Developers Ltd<br />
                • DD REG (Dhaka Developers & Real Estate Group)<br />
                • Real Estate & Housing Association
              </p>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p>© {new Date().getFullYear()} Elite Iconic Properties & Construction Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* MASTER PLAN HIGH RESOLUTION MODAL */}
      {masterplanModalOpen && (
        <div className="elite-modal-overlay" onClick={() => setMasterplanModalOpen(false)}>
          <div className="masterplan-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="masterplan-modal-header">
              <div>
                <h3>DHAKA ICON CITY MASTER PLAN</h3>
                <p>2,500 Katha Riverfront Township with 100ft Main Avenue & Central Park</p>
              </div>
              <button className="modal-close-icon-btn" onClick={() => setMasterplanModalOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <div className="masterplan-modal-body">
              <img src="/dhaka-icon-masterplan.jpg" alt="Dhaka Icon City High Res Master Plan" className="modal-masterplan-img" />
            </div>
            <div className="masterplan-modal-footer">
              <a href="/dhaka-icon-masterplan.jpg" download="Dhaka-Icon-City-Masterplan.jpg" className="btn-download-plan">
                <Download size={16} /> Download High-Res Master Plan
              </a>
              <button className="btn-close-plan" onClick={() => setMasterplanModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY PHOTO ZOOM MODAL */}
      {activeGalleryModalImg && (
        <div className="elite-modal-overlay" onClick={() => setActiveGalleryModalImg(null)}>
          <div className="gallery-zoom-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon-btn float-close" onClick={() => setActiveGalleryModalImg(null)}>
              <X size={24} />
            </button>
            <img src={activeGalleryModalImg} alt="Site Development High Res" className="gallery-zoom-img" />
          </div>
        </div>
      )}

      {/* DEVELOPER CONSOLE DRAWER (Accessible via Ctrl+Shift+D or Footer Button) */}
      {showDevConsole && (
        <>
          <div className="dev-console-overlay" onClick={() => setShowDevConsole(false)} />
          <div className="dev-console-drawer">
            <div className="dev-console-header">
              <div className="dev-console-title">
                <Terminal size={20} className="text-cyan-400" />
                <span>Developer Diagnostic Console</span>
              </div>
              <button className="icon-btn" onClick={() => setShowDevConsole(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="dev-console-body">
              <div className="glass-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Server size={16} className="text-emerald" />
                    <strong>Supabase Connection:</strong>
                  </div>
                  <span className={`badge-${connectionStatus}`}>{connectionStatus.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 8, wordBreak: 'break-all' }}>
                  Endpoint: <code>{supabaseUrl}</code>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0 8px 0' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Live Inquiries ({inquiries.length}):</span>
                  <button onClick={verifySupabase} style={{ background: 'none', border: 'none', color: '#008450', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                    <RefreshCw size={12} /> Sync DB
                  </button>
                </div>

                <div className="console-box" style={{ maxHeight: 220, overflowY: 'auto' }}>
                  {inquiries.map((inq, i) => (
                    <div key={inq.id || i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 12 }}>
                      <strong style={{ color: '#00d2ff' }}>{inq.name}</strong> ({inq.phone})
                      <p style={{ margin: '4px 0 0 0', color: '#cbd5e1' }}>{inq.message}</p>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>No inquiries yet. Submit booking form to test.</p>
                  )}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0 8px 0' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Diagnostic Log Stream:</span>
                </div>
                <div className="console-box" style={{ maxHeight: 180, overflowY: 'auto' }}>
                  {logs.map((l, idx) => (
                    <div key={idx} className="console-line">
                      <span className="console-time">[{l.time}]</span>
                      <span className={`console-text ${l.type}`}>{l.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* VIP SITE VISIT & CONSULTATION SCHEDULE MODAL */}
      {visitModalOpen && (
        <div className="elite-modal-overlay" onClick={() => setVisitModalOpen(false)}>
          <div className="visit-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="visit-modal-header">
              <div className="visit-modal-title-box">
                <div className="visit-modal-icon-wrap">
                  <Calendar size={22} className="text-emerald" />
                </div>
                <div>
                  <h3 className="visit-modal-title">
                    {lang === 'bn' ? 'শিডিউল বুকিং ও কনসালটেশন' : 'Schedule & Consultation'}
                  </h3>
                  <p className="visit-modal-subtitle">
                    {lang === 'bn' ? 'ঢাকা আইকন সিটির সার্বিক তথ্য, সাইট পরিদর্শন ও কনসালটেশন' : 'VIP site visit, office consultation & investment inquiries'}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setVisitModalOpen(false)
                  setVisitSuccess(false)
                }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {visitSuccess ? (
              <div className="visit-success-state">
                <div className="visit-success-icon-wrap">
                  <CheckCircle2 size={54} className="text-emerald" />
                </div>
                <h4>{lang === 'bn' ? 'আপনার শিডিউল নিশ্চিত করা হয়েছে!' : 'Schedule Confirmed!'}</h4>
                <p>
                  {lang === 'bn' 
                    ? `ধন্যবাদ ${visitForm.name || ''}! আপনার অনুরোধটি সফলভাবে গৃহীত হয়েছে। আমাদের সিনিয়র কনসালটেন্ট দ্রুত আপনার সাথে যোগাযোগ করবেন।`
                    : `Thank you ${visitForm.name || ''}! Your request has been received. Our senior representative will contact you shortly.`
                  }
                </p>
                <div className="visit-summary-badge">
                  {visitForm.purpose === 'Project Visit' && (
                    <span>🚗 {lang === 'bn' ? 'প্রকল্প পরিদর্শন' : 'Project Visit'} | 📅 {visitForm.date || 'আসন্ন তারিখ'} | ⏰ {visitForm.timeSlot}</span>
                  )}
                  {visitForm.purpose === 'Office Visit' && (
                    <span>🏢 {lang === 'bn' ? 'হেড অফিস মিটিং' : 'Office Visit'} | 📅 {visitForm.date || 'আসন্ন তারিখ'} | ⏰ {visitForm.timeSlot}</span>
                  )}
                  {visitForm.purpose === 'Buy Plot' && (
                    <span>🏡 {lang === 'bn' ? 'প্লট ক্রয়' : 'Buy Plot'} | সাইজ: {visitForm.plotSize}</span>
                  )}
                  {visitForm.purpose === 'Intersted patner' && (
                    <span>💼 {lang === 'bn' ? 'পার্টনারশিপ / ইনভেস্টমেন্ট' : 'Interested Partner'} | বাজেট: {visitForm.investmentAmount}</span>
                  )}
                  {(visitForm.purpose === 'Attend seminar' || visitForm.purpose === 'online cosultation') && (
                    <span>📋 {lang === 'bn' ? 'উদ্দেশ্য' : 'Purpose'}: {visitForm.purpose}</span>
                  )}
                </div>
                <button 
                  type="button" 
                  className="btn-modal-done"
                  onClick={() => {
                    setVisitModalOpen(false)
                    setVisitSuccess(false)
                  }}
                >
                  {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="visit-schedule-form">
                {/* Row 1: Name and Phone */}
                <div className="form-row-2">
                  <div className="form-group-item">
                    <label className="input-label">{lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}</label>
                    <input 
                      type="text" 
                      className="text-input-field" 
                      placeholder={lang === 'bn' ? 'উদাঃ মোঃ আরিফুল ইসলাম' : 'e.g. Ariful Islam'}
                      value={visitForm.name}
                      onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">{lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}</label>
                    <input 
                      type="tel" 
                      className="text-input-field" 
                      placeholder="+880 18XX-XXXXXX"
                      value={visitForm.phone}
                      onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Location and Purpose of Schedule */}
                <div className="form-row-2">
                  <div className="form-group-item">
                    <label className="input-label">{lang === 'bn' ? 'বর্তমান লোকেশন / ঠিকানা *' : 'Location / Address *'}</label>
                    <input 
                      type="text" 
                      className="text-input-field" 
                      placeholder={lang === 'bn' ? 'উদাঃ উত্তরা / ধানমন্ডি / মিরপুর / প্রবাসী' : 'e.g. Uttara / Dhanmondi / Expatriate'}
                      value={visitForm.location}
                      onChange={(e) => setVisitForm({ ...visitForm, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">{lang === 'bn' ? 'উদ্দেশ্য (Purpose of Schedule) *' : 'Purpose of Schedule *'}</label>
                    <select 
                      className="select-input-field"
                      value={visitForm.purpose}
                      onChange={(e) => setVisitForm({ ...visitForm, purpose: e.target.value })}
                    >
                      <option value="Project Visit">{lang === 'bn' ? 'প্রকল্প পরিদর্শন (Project Visit)' : 'Project Visit'}</option>
                      <option value="Buy Plot">{lang === 'bn' ? 'প্লট ক্রয় (Buy Plot)' : 'Buy Plot'}</option>
                      <option value="Attend seminar">{lang === 'bn' ? 'সেমিনারে অংশগ্রহণ (Attend Seminar)' : 'Attend Seminar'}</option>
                      <option value="online cosultation">{lang === 'bn' ? 'অনলাইন পরামর্শ (Online Consultation)' : 'Online Consultation'}</option>
                      <option value="Office Visit">{lang === 'bn' ? 'হেড অফিস পরিদর্শন (Office Visit)' : 'Office Visit'}</option>
                      <option value="Intersted patner">{lang === 'bn' ? 'বিজনেস / ইনভেস্টর পার্টনার (Interested Partner)' : 'Interested Partner'}</option>
                    </select>
                  </div>
                </div>

                {/* CONDITIONAL: Project Visit -> Date, Time, Pickup Location */}
                {visitForm.purpose === 'Project Visit' && (
                  <div className="modal-dynamic-box">
                    <div className="form-row-2">
                      <div className="form-group-item">
                        <label className="input-label">{lang === 'bn' ? 'ভিজিটের তারিখ *' : 'Visit Date *'}</label>
                        <input 
                          type="date" 
                          className="text-input-field" 
                          value={visitForm.date}
                          onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group-item">
                        <label className="input-label">{lang === 'bn' ? 'পছন্দের সময় *' : 'Preferred Time *'}</label>
                        <select 
                          className="select-input-field"
                          value={visitForm.timeSlot}
                          onChange={(e) => setVisitForm({ ...visitForm, timeSlot: e.target.value })}
                        >
                          <option value="10:00 AM">সকাল ১০:০০ টা (Morning 10:00 AM)</option>
                          <option value="12:30 PM">দুপুর ১২:৩০ টা (Noon 12:30 PM)</option>
                          <option value="03:30 PM">বিকাল ০৩:৩০ টা (Afternoon 03:30 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group-item" style={{ marginTop: '12px' }}>
                      <label className="input-label">{lang === 'bn' ? 'পিকআপ লোকেশন লিখুন *' : 'Pickup Location *'}</label>
                      <input 
                        type="text" 
                        className="text-input-field" 
                        placeholder={lang === 'bn' ? 'উদাঃ গুলশান অফিস / উত্তরা হাউজ বিল্ডিং / মিরপুর-১০' : 'e.g. Gulshan Office / Uttara / Mirpur 10'}
                        value={visitForm.pickupLoc}
                        onChange={(e) => setVisitForm({ ...visitForm, pickupLoc: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* CONDITIONAL: Buy Plot -> Ask Plot Size */}
                {visitForm.purpose === 'Buy Plot' && (
                  <div className="modal-dynamic-box">
                    <div className="form-group-item">
                      <label className="input-label">{lang === 'bn' ? 'আগ্রহী প্লটের সাইজ নির্বাচন করুন *' : 'Interested Plot Size *'}</label>
                      <select 
                        className="select-input-field"
                        value={visitForm.plotSize}
                        onChange={(e) => setVisitForm({ ...visitForm, plotSize: e.target.value })}
                      >
                        <option value="৩ কাঠা [3 Katha]">৩ কাঠা [3 Katha] - স্ট্যান্ডার্ড রেসিডেন্সিয়াল</option>
                        <option value="৫ কাঠা [5 Katha]">৫ কাঠা [5 Katha] - এক্সক্লুসিভ ভিলা/ডুপ্লেক্স</option>
                        <option value="১০ কাঠা [10 Katha]">১০ কাঠা [10 Katha] - প্রিমিয়াম এস্টেট</option>
                        <option value="১ বিঘা [1 Bigha]">১ বিঘা [1 Bigha] - লাক্সারি গ্র্যান্ড এস্টেট</option>
                        <option value="কমার্শিয়াল / বড় প্লট [Commercial]">কমার্শিয়াল / কর্নার / বড় প্লট</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* CONDITIONAL: Office Visit -> Date and Time */}
                {visitForm.purpose === 'Office Visit' && (
                  <div className="modal-dynamic-box">
                    <div className="form-row-2">
                      <div className="form-group-item">
                        <label className="input-label">{lang === 'bn' ? 'অফিস মিটিংয়ের তারিখ *' : 'Office Visit Date *'}</label>
                        <input 
                          type="date" 
                          className="text-input-field" 
                          value={visitForm.date}
                          onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group-item">
                        <label className="input-label">{lang === 'bn' ? 'পছন্দের সময় *' : 'Preferred Time *'}</label>
                        <select 
                          className="select-input-field"
                          value={visitForm.timeSlot}
                          onChange={(e) => setVisitForm({ ...visitForm, timeSlot: e.target.value })}
                        >
                          <option value="11:00 AM">সকাল ১১:০০ টা (Morning 11:00 AM)</option>
                          <option value="02:30 PM">দুপুর ০২:৩০ টা (Afternoon 02:30 PM)</option>
                          <option value="04:30 PM">বিকাল ০৪:৩০ টা (Evening 04:30 PM)</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
                      📍 নাফি টাওয়ার, লেভেল ১০, ৫৩ গুলশান এভিনিউ, ঢাকা-১২১২
                    </div>
                  </div>
                )}

                {/* CONDITIONAL: Interested Partner -> Approx Investment Amount */}
                {visitForm.purpose === 'Intersted patner' && (
                  <div className="modal-dynamic-box">
                    <div className="form-group-item">
                      <label className="input-label">{lang === 'bn' ? 'সম্ভাব্য বিনিয়োগের পরিমাণ (Approx. Investment) *' : 'Approx. Investment Amount *'}</label>
                      <select 
                        className="select-input-field"
                        value={visitForm.investmentAmount}
                        onChange={(e) => setVisitForm({ ...visitForm, investmentAmount: e.target.value })}
                      >
                        <option value="২৫ - ৫০ লক্ষ টাকা (25 - 50 Lakh BDT)">২৫ - ৫০ লক্ষ টাকা (25 - 50 Lakh BDT)</option>
                        <option value="৫০ লক্ষ - ১ কোটি টাকা (50 Lakh - 1 Crore BDT)">৫০ লক্ষ - ১ কোটি টাকা (50 Lakh - 1 Crore BDT)</option>
                        <option value="১ কোটি - ৩ কোটি টাকা (1 - 3 Crore BDT)">১ কোটি - ৩ কোটি টাকা (1 - 3 Crore BDT)</option>
                        <option value="৩ কোটি - ৫ কোটি টাকা (3 - 5 Crore BDT)">৩ কোটি - ৫ কোটি টাকা (3 - 5 Crore BDT)</option>
                        <option value="৫ কোটি+ টাকা (5+ Crore BDT)">৫ কোটি+ টাকা (5+ Crore BDT)</option>
                        <option value="আলোচনা সাপেক্ষে (Negotiable / Custom)">আলোচনা সাপেক্ষে (Negotiable / Custom)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Submit & Cancel Footer */}
                <div className="visit-modal-footer">
                  <button 
                    type="button" 
                    className="btn-modal-cancel"
                    onClick={() => setVisitModalOpen(false)}
                  >
                    {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button 
                    type="submit" 
                    className="btn-modal-submit"
                    disabled={visitSubmitting}
                  >
                    <Calendar size={16} />
                    <span>{visitSubmitting ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Submitting...') : (lang === 'bn' ? 'নিশ্চিত করুন' : 'Confirm')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default App
