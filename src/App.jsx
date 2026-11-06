import { useState, useEffect, useRef, useCallback } from 'react'
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
  Images, 
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
  Check,
  LayoutGrid,
  BarChart2,
  User,
  Users,
  TrendingUp,
  Landmark,
  LogIn,
  LogOut,
  Zap,
  Sprout
} from 'lucide-react'
import './App.css'
import FounderDirectorSection from './components/FounderDirectorSection'
import { founderDirectors } from './data/founderDirectorsData'
import CorporateAboutPage from './components/CorporateAboutPage'
import GalleryPage from './components/GalleryPage'
import LegalDocumentsPage from './components/LegalDocumentsPage'
import LegalDocumentsSection from './components/LegalDocumentsSection'
import LoginPage from './components/LoginPage'
import AdminDashboard from './components/AdminDashboard'
import HeroVideoPlayer from './components/HeroVideoPlayer'
import VisitScheduleModal from './components/VisitScheduleModal'
import BookingModal from './components/BookingModal'

// Comprehensive Translations (Bangla & English)
const translations = {
  bn: {
    langBtn: "English",
    topNotice: "রাজউক নিবন্ধন নং: RAJUK/DC/REDMR 001262/24 | বীরুলিয়া সেতু সংলগ্ন ঢাকা আইকন সিটিতে প্লট বুকিং চলছে | ডাউন পেমেন্ট মাত্র ২০%",
    companyName: "এলিট আইকনিক প্রপার্টিজ এন্ড কনস্ট্রাকশন লিঃ",
    navHome: "হোম",
    navAbout: "আমাদের সম্পর্কে",
    navLeadership: "পরিচালনা পর্ষদ",
    navGallery: "গ্যালারি",
    navLegal: "আইনগত ডকুমেন্টস",
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

    // Board of Directors
    leadershipTitle: "পরিচালনা পর্ষদ",
    leadershipSubtitle: "সঠিক পরিচালনা, কৌশলগত দিকনির্দেশনা এবং সেরা সেবার মাধ্যমে আমাদের লক্ষ্য বাস্তবায়নে কর্মরত পরিচালনা পর্ষদের সাথে পরিচিত হোন।",

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
    formTitle: "আপনার পছন্দের প্লটটি বুক করুন অথবা সাইট ভিজিট শিডিউল করুন",
    formSubtitle: "কোম্পানির নিজস্ব ট্রান্সপোর্টে সরেজমিন প্রকল্প পরিদর্শন ও কিস্তির তথ্য পেতে সরাসরি যোগাযোগ করুন।",
    lblFullName: "আপনার পুরো নাম *",
    lblPhone: "মোবাইল নম্বর *",
    lblEmail: "ইমেইল এড্রেস (ঐচ্ছিক)",
    lblPlotType: "আগ্রহী প্লটের ক্যাটাগরি",
    lblPlotSize: "পছন্দের প্লটের সাইজ",
    lblMessage: "ভিজিট তারিখ বা বিশেষ কোনো জিজ্ঞাসা (ঐচ্ছিক)",
    btnSubmitForm: "বুকিং ও ভিজিট রিকোয়েস্ট পাঠান",
    formSubmitting: "তথ্য পাঠানো হচ্ছে...",
    formSuccess: "✓ ধন্যবাদ! আপনার অনুরোধটি সফলভাবে নিবন্ধিত হয়েছে। আমাদের সিনিয়র কনসালটেন্ট অতি দ্রুত আপনার সাথে যোগাযোগ করবেন।"
  },
  en: {
    langBtn: "বাংলা",
    topNotice: "RAJUK Registration: RAJUK/DC/REDMR 001262/24 | Plot Booking Open at Dhaka Icon City | 20% Down Payment Only",
    companyName: "Elite Iconic Properties & Construction Ltd.",
    navHome: "Home",
    navAbout: "About Us",
    navLeadership: "Board of Directors",
    navGallery: "Gallery",
    navLegal: "Legal Documents",
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

    // Board of Directors
    leadershipTitle: "Board of Directors",
    leadershipSubtitle: "Meet the distinguished board members driving our vision through strategic leadership and sustainable growth.",

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
    formTitle: "Reserve Your Prime Plot or Schedule a Free Site Visit",
    formSubtitle: "Experience a chauffeured on-site tour with personalized plot selection and easy installment plans.",
    lblFullName: "Full Name *",
    lblPhone: "Mobile Number *",
    lblEmail: "Email Address (Optional)",
    lblPlotType: "Preferred Plot Category",
    lblPlotSize: "Preferred Plot Size",
    lblMessage: "Visit Date or Custom Queries (Optional)",
    btnSubmitForm: "Submit Booking Request",
    formSubmitting: "Submitting Request...",
    formSuccess: "✓ Thank you! Your priority request is logged. A Senior Property Advisor will contact you shortly."
  }
}

// Phase 1 Pricing Data exactly matching the brochure
const plotPricingData = [
  {
    id: 'commercial-corner',
    index: '01',
    titleBn: 'বাণিজ্যিক প্লট (কর্ণার)',
    titleEn: 'Commercial Plot (Corner)',
    ratePerKatha: 2800000,
    numEn: '28',
    numBn: '২৮',
    rateFormattedBn: '২৮ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳28 Lakh / Katha',
    tagBn: 'সর্বোচ্চ বাণিজ্যিক সম্ভাবনা ও প্রাইম কর্নার',
    tagEn: 'Prime Commercial Corner & Avenue',
    type: 'Commercial',
    isPopular: true,
    tierEn: 'Tier 1 • Prime Commercial',
    tierBn: '১ম স্তর • প্রাইম বাণিজ্যিক',
    meterPct: 100,
    dpEn: '৳5.6 Lakh',
    dpBn: '৫.৬ লক্ষ'
  },
  {
    id: 'commercial-general',
    index: '02',
    titleBn: 'বাণিজ্যিক প্লট (অন্যান্য)',
    titleEn: 'Commercial Plot (General)',
    ratePerKatha: 2700000,
    numEn: '27',
    numBn: '২৭',
    rateFormattedBn: '২৭ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳27 Lakh / Katha',
    tagBn: '১০০ ফুট এভিনিউ রোড ফ্রন্ট সুবিধা',
    tagEn: '100ft Avenue Road Frontage',
    type: 'Commercial',
    isPopular: false,
    tierEn: 'Tier 2 • Avenue Front',
    tierBn: '২য় স্তর • এভিনিউ ফ্রন্ট',
    meterPct: 96,
    dpEn: '৳5.4 Lakh',
    dpBn: '৫.৪ লক্ষ'
  },
  {
    id: 'residential-corner',
    index: '03',
    titleBn: 'আবাসিক প্লট (কর্ণার)',
    titleEn: 'Residential Plot (Corner)',
    ratePerKatha: 2200000,
    numEn: '22',
    numBn: '২২',
    rateFormattedBn: '২২ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳22 Lakh / Katha',
    tagBn: 'উভয় দিকে উন্মুক্ত বাতাস ও লেক ভিউ',
    tagEn: 'Dual Side Open View & Lake Breeze',
    type: 'Residential',
    isPopular: true,
    tierEn: 'Tier 3 • Premium Corner',
    tierBn: '৩য় স্তর • প্রিমিয়াম কর্ণার',
    meterPct: 78,
    dpEn: '৳4.4 Lakh',
    dpBn: '৪.৪ লক্ষ'
  },
  {
    id: 'residential-south',
    index: '04',
    titleBn: 'আবাসিক প্লট (দক্ষিণমুখী)',
    titleEn: 'Residential Plot (South Facing)',
    ratePerKatha: 2100000,
    numEn: '21',
    numBn: '২১',
    rateFormattedBn: '২১ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳21 Lakh / Katha',
    tagBn: 'দক্ষিণা বাতাস ও প্রাকৃতিক পর্যাপ্ত আলো',
    tagEn: 'South Facing Sunlight & Airflow',
    type: 'Residential',
    isPopular: false,
    tierEn: 'Tier 4 • South Facing',
    tierBn: '৪র্থ স্তর • দক্ষিণমুখী আলো-বাতাস',
    meterPct: 75,
    dpEn: '৳4.2 Lakh',
    dpBn: '৪.২ লক্ষ'
  },
  {
    id: 'residential-general',
    index: '05',
    titleBn: 'আবাসিক প্লট (সাধারণ)',
    titleEn: 'Residential Plot (General)',
    ratePerKatha: 2000000,
    numEn: '20',
    numBn: '২০',
    rateFormattedBn: '২০ লক্ষ টাকা/কাঠা',
    rateFormattedEn: '৳20 Lakh / Katha',
    tagBn: 'সেরা ভ্যালু ও সাশ্রয়ী দীর্ঘমেয়াদি বিনিয়োগ',
    tagEn: 'Best Value & Smart Investment',
    type: 'Residential',
    isPopular: false,
    tierEn: 'Tier 5 • Value Investment',
    tierBn: '৫ম স্তর • সেরা সাশ্রয়ী',
    meterPct: 71,
    dpEn: '৳4.0 Lakh',
    dpBn: '৪.০ লক্ষ'
  }
]

// Commute Distance Landmarks from the brochure
const commuteLandmarks = [
  {
    sl: "01",
    nameBn: "বিরুলিয়া ব্রিজ",
    nameEn: "Birulia Bridge",
    timeBn: "৫ মিনিট",
    timeEn: "5 Mins",
    iconType: "bridge-1",
    badgeTone: "green",
    highlight: "সংযোগ"
  },
  {
    sl: "02",
    nameBn: "উত্তরা দিয়া বাড়ি প্রজেক্ট",
    nameEn: "Uttara Diabari Project",
    timeBn: "৫ - ১০ মিনিট",
    timeEn: "5 – 10 Mins",
    iconType: "buildings",
    badgeTone: "green",
    highlight: "সরাসরি কানেক্টিভিটি"
  },
  {
    sl: "03",
    nameBn: "উত্তরা মেট্রোরেল স্টেশন",
    nameEn: "Uttara Metro Rail Station",
    timeBn: "৫ - ১০ মিনিট",
    timeEn: "5 – 10 Mins",
    iconType: "metro",
    badgeTone: "green",
    highlight: "দ্রুততম যোগাযোগ"
  },
  {
    sl: "04",
    nameBn: "হযরত শাহজালাল (রঃ) আন্তর্জাতিক বিমান বন্দর",
    nameEn: "Hazrat Shahjalal Int'l Airport",
    timeBn: "১০ - ১৫ মিনিট",
    timeEn: "10 – 15 Mins",
    iconType: "airport",
    badgeTone: "green",
    highlight: "এয়ারপোর্টের এক্সেস"
  },
  {
    sl: "05",
    nameBn: "তামান্না ফ্যামিলি পার্ক",
    nameEn: "Tamanna Family Park",
    timeBn: "৫ মিনিট",
    timeEn: "5 Mins",
    iconType: "park",
    badgeTone: "green",
    highlight: "পারিবারিক বিনোদন"
  },
  {
    sl: "06",
    nameBn: "জাতীয় উদ্ভিদ উদ্যান ৩ নং গেইট",
    nameEn: "National Botanical Garden Gate 3",
    timeBn: "৫ মিনিট",
    timeEn: "5 Mins",
    iconType: "botanical",
    badgeTone: "green",
    highlight: "সবুজ পরিবেশ"
  },
  {
    sl: "07",
    nameBn: "কাউন্দিয়া ব্রিজ (নির্মাণ কাজ চলমান)",
    nameEn: "Kaundia Bridge (Under Construction)",
    timeBn: "১০ মিনিট",
    timeEn: "10 Mins",
    iconType: "bridge-2",
    badgeTone: "green",
    highlight: "চলমান উন্নয়ন"
  },
  {
    sl: "08",
    nameBn: "গাবতলী বাস টার্মিনাল",
    nameEn: "Gabtoli Bus Terminal",
    timeBn: "১৫ মিনিট",
    timeEn: "15 Mins",
    iconType: "bus-terminal",
    badgeTone: "green",
    highlight: "প্রধান টার্মিনাল"
  },
  {
    sl: "09",
    nameBn: "সাভার বাস স্ট্যান্ড",
    nameEn: "Savar Bus Stand",
    timeBn: "১০ - ২০ মিনিট",
    timeEn: "10 – 20 Mins",
    iconType: "bus",
    badgeTone: "green",
    highlight: "সহজ যাতায়াত"
  },
  {
    sl: "10",
    nameBn: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    nameEn: "Jahangirnagar University",
    timeBn: "২০ মিনিট",
    timeEn: "20 Mins",
    iconType: "university",
    badgeTone: "amber",
    highlight: "শিক্ষা জোন"
  }
]

function renderCommuteIcon(type) {
  switch (type) {
    case 'bridge-1':
      return (
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 17h24" />
          <path d="M9 17V6l-6 11" />
          <path d="M9 6l5 11" />
          <path d="M19 17V6l6 11" />
          <path d="M19 6l-5 11" />
          <path d="M6 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" strokeWidth="1.4" />
        </svg>
      )
    case 'buildings':
      return (
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="9" height="17" rx="1" />
          <path d="M13 9h7a1 1 0 0 1 1 1v11h-8" />
          <line x1="7" y1="8" x2="10" y2="8" />
          <line x1="7" y1="12" x2="10" y2="12" />
          <line x1="7" y1="16" x2="10" y2="16" />
          <line x1="16" y1="13" x2="18" y2="13" />
          <line x1="16" y1="17" x2="18" y2="17" />
          <line x1="2" y1="21" x2="24" y2="21" />
        </svg>
      )
    case 'metro':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="3" width="14" height="15" rx="3" />
          <path d="M5 11h14" />
          <circle cx="8.5" cy="14.5" r="1" fill="currentColor" />
          <circle cx="15.5" cy="14.5" r="1" fill="currentColor" />
          <path d="M8 18l-2 3" />
          <path d="M16 18l2 3" />
        </svg>
      )
    case 'airport':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      )
    case 'park':
      return (
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 4L4 13h3l-2 5h8l-2-5h3L9 4z" fill="currentColor" fillOpacity="0.15" />
          <path d="M18 6l-4 7h2.5l-1.5 5h6l-1.5-5H22l-4-7z" fill="currentColor" fillOpacity="0.15" />
          <line x1="9" y1="18" x2="9" y2="21" />
          <line x1="18" y1="18" x2="18" y2="21" />
          <line x1="3" y1="21" x2="23" y2="21" />
        </svg>
      )
    case 'botanical':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21V11" />
          <path d="M12 15c-3.5 0-6-2.5-6-6 3.5 0 6 2.5 6 6z" fill="currentColor" fillOpacity="0.18" />
          <path d="M12 13c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6z" fill="currentColor" fillOpacity="0.18" />
          <path d="M12 9c0-3.2 1.8-5.5 0-6-1.8.5 0 2.8 0 6z" />
          <path d="M8 21h8" />
        </svg>
      )
    case 'bridge-2':
      return (
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 16h24" />
          <path d="M8 19V6" />
          <path d="M20 19V6" />
          <path d="M8 7c3 5 9 5 12 0" />
          <path d="M2 16L8 7" />
          <path d="M26 16L20 7" />
          <line x1="14" y1="10.5" x2="14" y2="16" />
        </svg>
      )
    case 'bus-terminal':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="13" rx="2" />
          <path d="M4 11h16" />
          <path d="M4 7h16" />
          <circle cx="7.5" cy="14" r="1" fill="currentColor" />
          <circle cx="16.5" cy="14" r="1" fill="currentColor" />
          <path d="M6 17v2" />
          <path d="M18 17v2" />
        </svg>
      )
    case 'bus':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="13" rx="2.5" />
          <path d="M5 11h14" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
          <path d="M7 17v2" />
          <path d="M17 17v2" />
          <path d="M3 8v3" />
          <path d="M21 8v3" />
        </svg>
      )
    case 'university':
      return (
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 4L2 9.5 13 15l11-5.5L13 4z" fill="currentColor" fillOpacity="0.16" />
          <path d="M6 11.5v5c0 1.8 3.1 3.5 7 3.5s7-1.7 7-3.5v-5" />
          <path d="M22 10v6" />
        </svg>
      )
    default:
      return null
  }
}

// 12 Civic Amenities from brochure
const civicAmenities = [
  {
    id: 1,
    sl: "01",
    iconType: "daycare",
    tagEn: "Child Care",
    tagBn: "শিশু যত্ন",
    badgeTone: "green",
    nameBn: "ডে-কেয়ার সেন্টার",
    nameEn: "Day-Care Center",
    descBn: "কর্মজীবী পিতা-মাতার জন্য নিরাপদ ও আধুনিক চাইল্ড কেয়ার ব্যবস্থা",
    descEn: "Modern secure nursery for working parents"
  },
  {
    id: 2,
    sl: "02",
    iconType: "education",
    tagEn: "Academic",
    tagBn: "শিক্ষা জোন",
    badgeTone: "green",
    nameBn: "স্কুল, কলেজ ও বিশ্ববিদ্যালয়",
    nameEn: "Schools, Colleges & Unis",
    descBn: "আন্তর্জাতিক মানের শিক্ষাপ্রতিষ্ঠান ও সংলগ্ন ১৭টি খ্যাতনামা বিশ্ববিদ্যালয়",
    descEn: "Top educational institutes & 17 nearby renowned universities"
  },
  {
    id: 3,
    sl: "03",
    iconType: "community",
    tagEn: "Social Hub",
    tagBn: "সামাজিক কেন্দ্র",
    badgeTone: "green",
    nameBn: "কমিউনিটি সেন্টার",
    nameEn: "Community Center",
    descBn: "পারিবারিক ও সামাজিক অনুষ্ঠানের জন্য সুবিশাল ব্যাঙ্কুয়েট হল",
    descEn: "Grand banquet hall for community & family celebrations"
  },
  {
    id: 4,
    sl: "04",
    iconType: "mosque",
    tagEn: "Spiritual",
    tagBn: "ধর্মীয় কমপ্লেক্স",
    badgeTone: "green",
    nameBn: "ইসলামিক সিটি ও কেন্দ্রীয় মসজিদ",
    nameEn: "Islamic City & Central Mosque",
    descBn: "নান্দনিক স্থাপত্যের সুবিশাল কেন্দ্রীয় মসজিদ ও ইসলামিক কমপ্লেক্স",
    descEn: "Grand architectural mosque & integrated Islamic complex"
  },
  {
    id: 5,
    sl: "05",
    iconType: "security",
    tagEn: "24/7 Safe",
    tagBn: "২৪/৭ নিরাপত্তা",
    badgeTone: "green",
    nameBn: "নিরাপত্তা ব্যবস্থা ও পুলিশ বক্স",
    nameEn: "24/7 Security & Police Box",
    descBn: "সার্বক্ষণিক সিসিটিভি নজরদারি, আধুনিক নিরাপত্তা গেট ও পুলিশ ক্যাম্প",
    descEn: "Round-the-clock CCTV surveillance, gated security & police post"
  },
  {
    id: 6,
    sl: "06",
    iconType: "madrasa",
    tagEn: "Dual Media",
    tagBn: "দ্বিমুখী শিক্ষা",
    badgeTone: "green",
    nameBn: "বাংলা ও ইংরেজি মাধ্যমের মাদ্রাসা",
    nameEn: "Integrated Madrasa",
    descBn: "আধুনিক শিক্ষা ও ধর্মীয় জ্ঞানের সমন্বয়ে সমন্বিত মাদ্রাসা ব্যবস্থা",
    descEn: "Integrated modern Islamic & contemporary dual curriculum"
  },
  {
    id: 7,
    sl: "07",
    iconType: "shopping",
    tagEn: "Lifestyle",
    tagBn: "লাইফস্টাইল",
    badgeTone: "green",
    nameBn: "শপিং সেন্টার, সিনে-ক্যাফে",
    nameEn: "Shopping Mall & Cine-Café",
    descBn: "আধুনিক শপিং মল, ব্র্যান্ডেড আউটলেট, ফুডকোর্ট ও সিনে-ক্যাফে",
    descEn: "Mega shopping mall, branded outlets, food court & movie café"
  },
  {
    id: 8,
    sl: "08",
    iconType: "themepark",
    tagEn: "Recreation",
    tagBn: "বিনোদন পার্ক",
    badgeTone: "amber",
    nameBn: "শিশু পার্ক ও অ্যামিউজমেন্ট পার্ক",
    nameEn: "Children & Theme Park",
    descBn: "শিশুদের খেলার রাইড, উন্মুক্ত গ্রিন পার্ক ও পরিবারের বিনোদন জোন",
    descEn: "Theme rides, kids outdoor playground & family green zones"
  },
  {
    id: 9,
    sl: "09",
    iconType: "hospital",
    tagEn: "24/7 Care",
    tagBn: "২৪/৭ চিকিৎসা",
    badgeTone: "green",
    nameBn: "ক্লিনিক ও ঢাকা আইকন হাসপাতাল",
    nameEn: "Dhaka Icon Hospital & Clinic",
    descBn: "২৪ ঘণ্টা জরুরি চিকিৎসা, আধুনিক ডায়াগনস্টিক ও স্পেশালাইজড কেয়ার",
    descEn: "24/7 emergency healthcare, diagnostic center & specialist care"
  },
  {
    id: 10,
    sl: "10",
    iconType: "gym",
    tagEn: "Fitness",
    tagBn: "ফিটনেস ও মাঠ",
    badgeTone: "green",
    nameBn: "জিমনেসিয়াম, খেলার মাঠ",
    nameEn: "Gymnasium & Sports Ground",
    descBn: "আধুনিক ফিটনেস সেন্টার, ইনডোর গেমস ও সুবিশাল খেলার মাঠ",
    descEn: "State-of-the-art fitness gym, sports club & football pitch"
  },
  {
    id: 11,
    sl: "11",
    iconType: "graveyard",
    tagEn: "Serene Zone",
    tagBn: "সংরক্ষিত জোন",
    badgeTone: "green",
    nameBn: "কবরস্থান",
    nameEn: "Dedicated Graveyard",
    descBn: "টাউনশিপের নিজস্ব সুপরিকল্পিত ও সংরক্ষিত কবরস্থান এলাকা",
    descEn: "Well-maintained dedicated township community graveyard"
  },
  {
    id: 12,
    sl: "12",
    iconType: "lake",
    tagEn: "Eco Promenade",
    tagBn: "লেক ও পার্ক",
    badgeTone: "amber",
    nameBn: "লেক ও পার্ক লেন ওয়াকওয়ে",
    nameEn: "Central Lake & Park Lane",
    descBn: "লেকভিউ সংলগ্ন ৮০ ও ৪০ ফুট প্রশস্ত গ্রিন প্রমেনেড ও জগিং ট্র্যাক",
    descEn: "80 & 40-foot wide scenic lakefront promenade & jogging tracks"
  }
]

function renderAmenityIcon(type) {
  switch (type) {
    case 'daycare':
      // Smiling baby face with curl matching reference
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="13" r="7" />
          <path d="M5 12c-1 0-1.5.8-1.5 1.5S4 15 5 15" />
          <path d="M19 12c1 0 1.5.8 1.5 1.5S20 15 19 15" />
          <path d="M12 6c0-2 1.8-2.5 2.5-1.5.6.8-.2 2-1.5 2" />
          <circle cx="9.5" cy="12" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="12" r="0.8" fill="currentColor" stroke="none" />
          <path d="M9.8 15.2c1.2 1.1 3.2 1.1 4.4 0" />
        </svg>
      )
    case 'education':
      // Mortarboard graduation cap
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4L2.5 9 12 14l9.5-5L12 4z" />
          <path d="M6.5 11.2v4.8c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.8" />
          <path d="M21.5 9v6" />
        </svg>
      )
    case 'community':
      // Classical pediment building with 3 columns
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 4l9 5.5H3z" />
          <line x1="6.5" y1="9.5" x2="6.5" y2="18" />
          <line x1="12" y1="9.5" x2="12" y2="18" />
          <line x1="17.5" y1="9.5" x2="17.5" y2="18" />
          <line x1="3" y1="18" x2="21" y2="18" />
          <line x1="2" y1="20.5" x2="22" y2="20.5" />
        </svg>
      )
    case 'mosque':
      // Mosque dome with crescent & arched doorway
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.8 2.8a1.6 1.6 0 1 0 0 2.6 1.3 1.3 0 0 1 0-2.6z" />
          <path d="M6.5 13c0-3.4 2.5-5.6 5.5-7 3 1.4 5.5 3.6 5.5 7H6.5z" />
          <rect x="5" y="13" width="14" height="7" />
          <path d="M10 20v-3.5a2 2 0 0 1 4 0V20" />
          <line x1="3" y1="20" x2="21" y2="20" />
        </svg>
      )
    case 'security':
      // Shield with checkmark
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7.5 3.2v5.3c0 4.8-3.2 8.6-7.5 9.8-4.3-1.2-7.5-5-7.5-9.8V6.2L12 3z" />
          <path d="M9 12.2l2 2 4.2-4.2" />
        </svg>
      )
    case 'madrasa':
      // Open book
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 6A2.5 2.5 0 0 1 5 3.5h7v15.5H5A2.5 2.5 0 0 0 2.5 21V6z" />
          <path d="M21.5 6A2.5 2.5 0 0 0 19 3.5h-7v15.5h7a2.5 2.5 0 0 1 2.5 2V6z" />
        </svg>
      )
    case 'shopping':
      // Minimalist shopping bag
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.5 7.5h13l1 12.5H4.5l1-12.5z" />
          <path d="M9 7.5V5.5a3 3 0 0 1 6 0v2" />
        </svg>
      )
    case 'themepark':
      // Playground slide with ladder matching reference
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9.5" cy="5.5" r="1.8" />
          <path d="M5 20l3.5-10h3l1 10" />
          <line x1="6.2" y1="13.5" x2="11.8" y2="13.5" />
          <line x1="5.5" y1="16.8" x2="12.1" y2="16.8" />
          <path d="M11.5 10c2.5 0 4.5 3.5 6.5 7.5.8 1.6 1.8 2.5 3 2.5" />
          <path d="M11.5 13c1.8 0 3.5 3 5.2 6 .5.8 1.2 1 2.3 1" />
        </svg>
      )
    case 'hospital':
      // Hospital building with rounded cross header
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 8V6.5a4 4 0 0 1 8 0V8" />
          <rect x="4" y="8" width="16" height="12" rx="1.5" />
          <line x1="12" y1="5.5" x2="12" y2="8.5" />
          <line x1="10.5" y1="7" x2="13.5" y2="7" />
          <path d="M10 20v-4h4v4" />
          <line x1="7" y1="11.5" x2="8.5" y2="11.5" />
          <line x1="7" y1="14.5" x2="8.5" y2="14.5" />
          <line x1="15.5" y1="11.5" x2="17" y2="11.5" />
          <line x1="15.5" y1="14.5" x2="17" y2="14.5" />
        </svg>
      )
    case 'gym':
      // Horizontal dumbbell matching reference
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8.5" width="2.5" height="7" rx="1" />
          <rect x="6.5" y="6.5" width="2.5" height="11" rx="1" />
          <rect x="15" y="6.5" width="2.5" height="11" rx="1" />
          <rect x="18.5" y="8.5" width="2.5" height="7" rx="1" />
          <line x1="9" y1="12" x2="15" y2="12" />
        </svg>
      )
    case 'graveyard':
      // Serene leaf / memorial tree on base matching reference
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.5c-4 3-5.5 6.2-5.5 9a5.5 5.5 0 0 0 11 0c0-2.8-1.5-6-5.5-9z" />
          <line x1="12" y1="8.5" x2="12" y2="20" />
          <path d="M12 13.5l-2.5-2" />
          <path d="M12 12l2.5-2" />
          <line x1="6" y1="20" x2="18" y2="20" />
        </svg>
      )
    case 'lake':
      // Two trees over double water waves matching reference
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 3.5L5 9.5h2.2L5.5 13h6l-1.7-3.5H12L8.5 3.5z" />
          <line x1="8.5" y1="13" x2="8.5" y2="15" />
          <path d="M16 5l-2.8 4.8h1.8L13.8 13h4.5l-1.2-3.2h1.7L16 5z" />
          <line x1="16" y1="13" x2="16" y2="15" />
          <path d="M3 17.2c1.8-1.4 3.6-1.4 5.4 0 1.8 1.4 3.6 1.4 5.4 0 1.8-1.4 3.6-1.4 5.4 0" />
          <path d="M3 20.5c1.8-1.4 3.6-1.4 5.4 0 1.8 1.4 3.6 1.4 5.4 0 1.8-1.4 3.6-1.4 5.4 0" />
        </svg>
      )
    default:
      return null
  }
}

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

// Leadership Team Profiles (Executive & Board of Directors)
const leadershipTeam = [
  {
    id: 1,
    sl: "1",
    nameEn: "Muksudur Rahaman",
    nameBn: "মকসুদুর রহমান",
    roleEn: "Chairman",
    roleBn: "চেয়ারম্যান",
    phone: "01621728528",
    image: "/leaders/muksudur-rahaman.png?v=2",
    speechEn: "Muksudur Rahaman is the Chairman of Elite Iconic Properties & Construction Limited. He provides overall direction to the company and leads the board with clarity and experience. His role focuses on setting strategic priorities, ensuring strong governance, and supporting the leadership team in building a stable and forward-looking organization.",
    speechBn: "মকসুদুর রহমান এলিট আইকনিক প্রপার্টিজ এন্ড কনস্ট্রাকশন লিমিটেড-এর সম্মানিত চেয়ারম্যান। তিনি প্রতিষ্ঠানটিকে সামগ্রিক দিকনির্দেশনা প্রদান করেন এবং অভিজ্ঞতা ও দূরদর্শিতার সাথে বোর্ড পরিচালনা করেন। তাঁর মূল ভূমিকা কৌশলগত অগ্রাধিকার নির্ধারণ, করপোরেট সুশাসন নিশ্চিতকরণ এবং ঢাকা আইকন সিটিকে একটি নির্ভরযোগ্য ও সমৃদ্ধ উপশহর হিসেবে গড়ে তোলা।"
  },
  {
    id: 2,
    sl: "2",
    nameEn: "Asha Khan",
    nameBn: "আশা খান",
    roleEn: "Vice Chairman",
    roleBn: "ভাইস চেয়ারম্যান",
    phone: "01749438260",
    image: "/leaders/asha-khan.jpg?v=1",
    speechEn: "Asha Khan serves as the Vice Chairman of Elite Iconic Properties & Construction Limited. She brings thoughtful guidance, strategic oversight, and an unwavering commitment to sustainable township planning, ensuring that all corporate initiatives meet the highest benchmarks of quality and integrity.",
    speechBn: "আশা খান এলিট আইকনিক প্রপার্টিজ এন্ড কনস্ট্রাকশন লিমিটেড-এর ভাইস চেয়ারম্যান হিসেবে দায়িত্ব পালন করছেন। তিনি কৌশলগত তদারকি, টেকসই প্রকল্প পরিকল্পনা ও অংশীদারিত্বে গুরুত্বপূর্ণ ভূমিকা রাখেন এবং প্রতিটি উদ্যোগ যেন আধুনিক নগর মানদণ্ড পূরণ করে তা নিশ্চিত করেন।"
  },
  {
    id: 3,
    sl: "3",
    nameEn: "Abul Kalam Azad",
    nameBn: "আবুল কালাম আজাদ",
    roleEn: "Managing Director",
    roleBn: "ব্যবস্থাপনা পরিচালক",
    phone: "01615500815",
    image: "/leaders/abul-kalam-azad.jpg?v=3",
    speechEn: "Abul Kalam Azad serves as the Managing Director of Elite Iconic Properties & Construction Limited. He is responsible for the company’s daily operations and overall performance. With a practical and hands-on leadership style, he works closely with teams to drive growth, strengthen customer relationships, and turn the master plan vision into action.",
    speechBn: "আবুল কালাম আজাদ এলিট আইকনিক প্রপার্টিজ এন্ড কনস্ট্রাকশন লিমিটেড-এর ব্যবস্থাপনা পরিচালক হিসেবে দায়িত্ব পালন করছেন। তিনি প্রতিষ্ঠানের সার্বিক দৈনন্দিন পরিচালনা ও প্রকল্প বাস্তবায়নে নেতৃত্ব দিচ্ছেন। তাঁর বাস্তবমুখী ও সক্রিয় পরিচালনায় ঢাকা আইকন সিটির মহাপরিকল্পনা দ্রুত বাস্তবায়িত হচ্ছে।"
  },
  {
    id: 4,
    sl: "4",
    nameEn: "Mobarok Hossain Munshi",
    nameBn: "মোবারক হোসেন মুন্সী",
    roleEn: "Deputy Managing Director",
    roleBn: "উপ-ব্যবস্থাপনা পরিচালক",
    phone: "01913387933",
    image: "/leaders/mobarok-hossain-munshi.jpg?v=3",
    speechEn: "Mobarok Hossain Munshi is the Deputy Managing Director of Elite Iconic Properties & Construction Limited. He actively steers executive coordination, on-site development progress, and stakeholder collaboration, working closely with all departments to maintain project momentum and service excellence.",
    speechBn: "মোবারক হোসেন মুন্সী এলিট আইকনিক প্রপার্টিজ এন্ড কনস্ট্রাকশন লিমিটেড-এর উপ-ব্যবস্থাপনা পরিচালক। তিনি উন্নয়ন কার্যক্রমের গতি, মাঠপর্যায়ের সমন্বয় ও অংশীদারদের আস্থা অর্জনে নিবেদিতভাবে কাজ করছেন।"
  },
  {
    id: 5,
    sl: "5",
    nameEn: "Shahabuddin",
    nameBn: "শাহাবুদ্দিন",
    roleEn: "Finance Director",
    roleBn: "ফাইন্যান্স ডিরেক্টর",
    phone: "01684188884",
    image: "/leaders/shahabuddin.jpg",
    speechEn: "Shahabuddin is a valued member of the board serving as Finance Director. He provides prudent fiscal stewardship, capital management, and investment planning to ensure monetary discipline and sustainable resource allocation across all mega township initiatives.",
    speechBn: "শাহাবুদ্দিন ফাইন্যান্স ডিরেক্টর হিসেবে প্রতিষ্ঠানের আর্থিক কৌশল, বিনিয়োগ পরিকল্পনা ও তহবিল ব্যবস্থাপনার দায়িত্ব পালন করছেন। তাঁর সুপরিকল্পিত আর্থিক নীতি ও বাজেট নিয়ন্ত্রণ প্রকল্পের টেকসই প্রবৃদ্ধি নিশ্চিত করে।"
  },
  {
    id: 6,
    sl: "6",
    nameEn: "Md Nayeem Islam",
    nameBn: "মোঃ নাঈম ইসলাম",
    roleEn: "Director – IT & Digital Marketing",
    roleBn: "পরিচালক – আইটি ও ডিজিটাল মার্কেটিং",
    phone: "01722105259",
    image: "/leaders/md-nayeem.jpg",
    speechEn: "Md. Nayeem Islam oversees the company's IT infrastructure and digital marketing strategies. He leverages advanced technology and digital platforms to connect real estate investors with high-value property opportunities, ensuring a seamless and modern property investment experience.",
    speechBn: "মোঃ নাঈম ইসলাম প্রতিষ্ঠানের তথ্যপ্রযুক্তি অবকাঠামো এবং ডিজিটাল মার্কেটিং কৌশল তদারকি করছেন। তিনি উন্নত প্রযুক্তি ও ডিজিটাল প্ল্যাটফর্ম ব্যবহারের মাধ্যমে রিয়েল এস্টেট বিনিয়োগকারীদের সেরা প্রপার্টি সম্ভাবনার সাথে সংযুক্ত করেন, যা একটি আধুনিক ও নির্ভরযোগ্য বিনিয়োগ অভিজ্ঞতা নিশ্চিত করে।"
  },
  {
    id: 7,
    sl: "7",
    nameEn: "Biplob Kumar Barma",
    nameBn: "বিপ্লব কুমার বর্মা",
    roleEn: "Director (Admin)",
    roleBn: "পরিচালক (প্রশাসন)",
    phone: "01313596048",
    image: "/leaders/biplob-kumar-barma.jpg",
    speechEn: "Biplob Kumar Barma is a valued member of the board overseeing administrative governance. He brings structured organizational guidance, helping streamline inter-departmental workflows and upholding rigorous standards of corporate protocol.",
    speechBn: "বিপ্লব কুমার বর্মা পরিচালক (প্রশাসন) হিসেবে করপোরেট ব্যবস্থাপনা ও অভ্যন্তরীণ শৃঙ্খলা নিশ্চিত করছেন। তাঁর সুদক্ষ প্রশাসনিক পরিচালনায় প্রতিষ্ঠানের প্রতিটি বিভাগের কার্যক্রম সুশৃঙ্খলভাবে পরিচালিত হয়।"
  },
  {
    id: 8,
    sl: "8",
    nameEn: "Md. Mosharrof Hossain",
    nameBn: "মোঃ মোশাররফ হোসেন",
    roleEn: "Marketing Director",
    roleBn: "মার্কেটিং ডিরেক্টর",
    phone: "01671749589",
    image: "/leaders/md-mosharrof-hossain.jpg?v=2",
    speechEn: "Md. Mosharrof Hossain leads marketing and market expansion strategies. He focuses on building trusted relationships with plot buyers, maintaining transparent project communication, and elevating the corporate presence of Dhaka Icon City nationwide.",
    speechBn: "মোঃ মোশাররফ হোসেন মার্কেটিং ডিরেক্টর হিসেবে বাজার সম্প্রসারণ ও বিপণন কৌশলে নেতৃত্ব দিচ্ছেন। গ্রাহকদের সাথে বিশ্বস্ত সম্পর্ক স্থাপন ও প্রকল্পের সুযোগ-সুবিধা তুলে ধরার মাধ্যমে তিনি ব্র্যান্ডের সুনাম বৃদ্ধি করছেন।"
  },
  {
    id: 9,
    sl: "9",
    nameEn: "Md. Kabir Hossain",
    nameBn: "মোঃ কবির হোসেন",
    roleEn: "Director – Human Resources",
    roleBn: "পরিচালক – মানবসম্পদ",
    phone: "01758240309",
    image: "/leaders/md-kabir-hossain.jpg",
    speechEn: "Md. Kabir Hossain oversees human resource management and organizational talent development. He is committed to nurturing professional capabilities, employee welfare, and a collaborative work culture built upon excellence and accountability.",
    speechBn: "মোঃ কবির হোসেন পরিচালক (মানবসম্পদ) হিসেবে প্রতিষ্ঠানের কর্মকর্তা-কর্মচারীদের পেশাগত দক্ষতা ও কল্যাণ নিশ্চিত করছেন। একটি গতিশীল ও সহযোগিতাপূর্ণ করপোরেট পরিবেশ বজায় রাখতে তিনি অঙ্গীকারবদ্ধ।"
  },
  {
    id: 10,
    sl: "10",
    nameEn: "Md. Abul Basar",
    nameBn: "মোঃ আবুল বাশার",
    roleEn: "Director – Procurement",
    roleBn: "পরিচালক – প্রকিউরমেন্ট",
    phone: "01604493384",
    image: "/leaders/md-abul-basar.jpg?v=2",
    speechEn: "Md. Abul Basar manages strategic procurement and supply chain management. He ensures that all materials and infrastructure inputs meet the highest benchmarks of durability, safety, and cost efficiency for long-term township longevity.",
    speechBn: "মোঃ আবুল বাশার পরিচালক (প্রকিউরমেন্ট) হিসেবে মানসম্পন্ন নির্মাণ উপকরণ ও কাঁচামাল সংগ্রহের তদারকি করছেন। সাশ্রয়ী ও সর্বোচ্চ মানের যোগান নিশ্চিত করে তিনি উন্নয়ন কার্যক্রমে বিশেষ অবদান রাখছেন।"
  },
  {
    id: 11,
    sl: "11",
    nameEn: "Md. Abdus Salam",
    nameBn: "মোঃ আব্দুস সালাম",
    roleEn: "Director – Legal Affairs",
    roleBn: "পরিচালক – আইন বিষয়ক",
    phone: "01712117734",
    image: "/leaders/md-abdus-salam.jpg",
    speechEn: "Md. Abdus Salam oversees corporate legal compliance and land verification. With deep proficiency in RAJUK statutory standards, he guarantees undisputed land titles, transparent documentation, and complete legal security for every plot owner.",
    speechBn: "মোঃ আব্দুস সালাম পরিচালক (আইন বিষয়ক) হিসেবে জমির নিষ্কণ্টক মালিকানা, বৈধ কাগজপত্র ও রাজউক সংশ্লিষ্ট সকল আইনগত প্রক্রিয়া তদারকি করে গ্রাহকদের শতভাগ আইনি সুরক্ষা নিশ্চিত করেন।"
  },
  {
    id: 12,
    sl: "12",
    nameEn: "Zahidul Islam",
    nameBn: "জাহিদুল ইসলাম",
    roleEn: "Director – Customer Relations",
    roleBn: "পরিচালক – গ্রাহক সম্পর্ক",
    phone: "01886330164",
    image: "/leaders/zahidul-islam.jpg",
    speechEn: "Zahidul Islam is dedicated to customer relations and client satisfaction. He maintains responsive communication channels and ensures that every buyer receives attentive, courteous, and transparent guidance throughout their property journey.",
    speechBn: "জাহিদুল ইসলাম পরিচালক (গ্রাহক সম্পর্ক) হিসেবে সম্মানিত প্লট ক্রেতাদের আন্তরিক সেবা ও সন্তুষ্টি বিধানে নিবেদিত। গ্রাহকদের প্রতিটি মতামতকে প্রাধান্য দিয়ে তিনি সেবার মান উত্তরোত্তর সমৃদ্ধ করছেন।"
  },
  {
    id: 13,
    sl: "13",
    nameEn: "Md. Azharul Islam",
    nameBn: "মোঃ আজহারুল ইসলাম",
    roleEn: "Director – Land Acquisition",
    roleBn: "পরিচালক – ভূমি অধিগ্রহণ",
    phone: "01786433760",
    image: "/leaders/md-azharul-islam.jpg",
    speechEn: "Md. Azharul Islam leads land acquisition and master layout demarcation. He plays an essential role in expanding the company’s 2,500+ Katha land bank with authentic land records, verified boundaries, and disciplined documentation.",
    speechBn: "মোঃ আজহারুল ইসলাম পরিচালক (ভূমি অধিগ্রহণ) হিসেবে ২,৫০০+ কাঠার সুবিশাল ল্যান্ড ব্যাংক সম্প্রসারণ ও সীমানা নির্ধারণে কাজ করছেন। নির্ভুল রেকর্ড ও যাচাইয়ের মাধ্যমে তিনি নিরাপদ জমি নিশ্চিত করেন।"
  },
  {
    id: 14,
    sl: "14",
    nameEn: "Md. Mohsin",
    nameBn: "মোঃ মহসিন",
    roleEn: "Director – Business Development",
    roleBn: "পরিচালক – ব্যবসায় উন্নয়ন",
    phone: "01733707557",
    image: "/leaders/md-mohsin.jpg?v=2",
    speechEn: "Md. Mohsin leads business development and strategic commercial alliances. He focuses on identifying high-value real estate opportunities, forging collaborative investor partnerships, and advancing the sustainable growth of Dhaka Icon City.",
    speechBn: "মোঃ মহসিন পরিচালক (ব্যবসায় উন্নয়ন) হিসেবে নতুন নতুন উন্নয়ন সম্ভাবনা উন্মোচন ও কৌশলগত ব্যবসায়িক অংশীদারিত্ব গড়ে তুলছেন, যা প্রতিষ্ঠানের টেকসই সম্প্রসারণে সহায়ক।"
  },
  {
    id: 15,
    sl: "15",
    nameEn: "Md. Saifullah Sharif",
    nameBn: "মোঃ সাইফুল্লাহ শরীফ",
    roleEn: "Director – Accounts",
    roleBn: "পরিচালক – হিসাব",
    phone: "01711005310",
    image: "/leaders/md-saifullah-sharif.jpg?v=2",
    speechEn: "Md. Saifullah Sharif directs corporate accounting, statutory audits, and financial reporting. He maintains meticulous financial ledgers, ensuring precision, compliance, and absolute transparency across all transactions and project accounts.",
    speechBn: "মোঃ সাইফুল্লাহ শরীফ পরিচালক (হিসাব) হিসেবে প্রতিষ্ঠানের নির্ভুল হিসাবরক্ষণ, নিরীক্ষা ও আর্থিক স্বচ্ছতা বজায় রাখছেন। সুনির্দিষ্ট নিয়ন্ত্রণ ব্যবস্থার মাধ্যমে তিনি সুসংহত আর্থিক নীতি নিশ্চিত করেন।"
  }
]

// Single reusable Leader Card with portrait image, pure white background, and polished typography
function LeaderCard({ leader, lang }) {
  const isBn = lang === 'bn'
  const hasPhone = leader.phone && leader.phone !== 'xxxxx' && leader.phone.trim() !== ''
  const [imgError, setImgError] = useState(false)

  return (
    <div className="leader-card">
      <div className="leader-avatar-wrap">
        {leader.image && !imgError ? (
          <img 
            src={leader.image} 
            alt={isBn ? leader.nameBn : leader.nameEn}
            className="leader-avatar-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="leader-default-avatar">
            <User size={50} className="leader-avatar-icon" strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="leader-info">
        <h3 className="leader-name">
          {isBn ? leader.nameBn : leader.nameEn}
        </h3>

        <div className="leader-role-badge">
          <span>{isBn ? leader.roleBn : leader.roleEn}</span>
        </div>

        {hasPhone ? (
          <a 
            href={`tel:${leader.phone}`} 
            className="leader-phone-link"
            title={isBn ? `সরাসরি কল করুন: ${leader.phone}` : `Call directly: ${leader.phone}`}
          >
            <Phone size={13} className="leader-phone-icon" strokeWidth={1.8} />
            <span>{leader.phone}</span>
          </a>
        ) : (
          <div className="leader-phone-placeholder">
            <span className="leader-phone-na">{isBn ? 'ফোন: প্রযোজ্য নয়' : 'Phone: On Request'}</span>
          </div>
        )}

        {(leader.speechEn || leader.speechBn) && (
          <p className="leader-speech">
            {isBn ? leader.speechBn : leader.speechEn}
          </p>
        )}
      </div>
    </div>
  )
}

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
  const [pricingCategory] = useState('all')
  const plotScrollRef = useRef(null)
  const [activePlotIndex, setActivePlotIndex] = useState(0)

  const handlePlotScroll = () => {
    if (!plotScrollRef.current) return
    const el = plotScrollRef.current
    const scrollLeft = el.scrollLeft
    const cardEl = el.querySelector('.perfect-plot-card')
    const cardWidth = cardEl ? cardEl.offsetWidth : 280
    const index = Math.round(scrollLeft / (cardWidth + 14))
    setActivePlotIndex(Math.min(Math.max(index, 0), plotPricingData.length - 1))
  }

  const scrollPlots = (direction) => {
    if (!plotScrollRef.current) return
    const el = plotScrollRef.current
    const cardEl = el.querySelector('.perfect-plot-card')
    const cardWidth = cardEl ? cardEl.offsetWidth : 280
    const scrollAmount = (cardWidth + 14) * (direction === 'next' ? 1 : -1)
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const scrollToPlotIndex = (idx) => {
    if (!plotScrollRef.current) return
    const el = plotScrollRef.current
    const cardEl = el.querySelector('.perfect-plot-card')
    const cardWidth = cardEl ? cardEl.offsetWidth : 280
    el.scrollTo({ left: idx * (cardWidth + 14), behavior: 'smooth' })
    setActivePlotIndex(idx)
  }
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
  const closeVisitModal = useCallback(() => setVisitModalOpen(false), [])

  // Booking Inquiry Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  // Supabase Auth State
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user)
      } else {
        try {
          const savedEmergency = localStorage.getItem('dz_emergency_admin')
          if (savedEmergency) {
            setCurrentUser(JSON.parse(savedEmergency))
          }
        } catch {
          // ignore
        }
      }
    }).catch(() => {
      try {
        const savedEmergency = localStorage.getItem('dz_emergency_admin')
        if (savedEmergency) {
          setCurrentUser(JSON.parse(savedEmergency))
        }
      } catch {
        // ignore
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null
      setCurrentUser(prevUser => {
        if (!prevUser && !newUser) {
          try {
            const savedEmergency = localStorage.getItem('dz_emergency_admin')
            if (savedEmergency) return JSON.parse(savedEmergency)
          } catch {
            // ignore
          }
          return null
        }
        if (prevUser && newUser && prevUser.id === newUser.id && prevUser.email === newUser.email) {
          // Keep identical reference across tab switching / token refresh events to prevent unmount glitch
          return prevUser
        }
        return newUser
      })
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      localStorage.removeItem('dz_emergency_admin')
      await supabase.auth.signOut()
      setCurrentUser(null)
      navigateTo('login')
    } catch {
      // ignore
    }
  }

  // Routing State ('home' | 'leadership-team' | 'corporate-about' | 'gallery' | 'login' | 'admin')
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      if (hash === '#corporate-about' || hash === '#/corporate-about' || path === '/corporate-about') {
        return 'corporate-about'
      }
      if (hash === '#leadership-team' || hash === '#/leadership-team' || path === '/leadership-team' || path === '/leadership' || hash === '#leadership' || hash === '#board-of-directors' || hash === '#founder-director' || hash === '#founder-directors') {
        return 'leadership-team'
      }
      if (hash === '#gallery' || hash === '#/gallery' || path === '/gallery' || hash === '#site-gallery-page') {
        return 'gallery'
      }
      if (hash === '#legal-documents' || hash === '#/legal-documents' || path === '/legal-documents' || hash === '#legal' || hash === '#/legal' || path === '/legal' || hash === '#documents' || hash === '#approvals') {
        return 'legal-documents'
      }
      if (hash === '#login' || hash === '#/login' || path === '/login') {
        return 'login'
      }
      if (hash === '#admin' || hash === '#/admin' || path === '/admin' || hash === '#profile' || hash === '#/profile' || path === '/profile') {
        return 'admin'
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
      } else if (hash === '#leadership-team' || hash === '#/leadership-team' || path === '/leadership-team' || path === '/leadership' || hash === '#leadership' || hash === '#board-of-directors' || hash === '#founder-director' || hash === '#founder-directors') {
        setCurrentRoute('leadership-team')
        if (hash === '#founder-director' || hash === '#founder-directors') {
          setTimeout(() => {
            const el = document.getElementById('founder-director')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }, 80)
        } else {
          window.scrollTo(0, 0)
        }
      } else if (hash === '#gallery' || hash === '#/gallery' || path === '/gallery' || hash === '#site-gallery-page') {
        setCurrentRoute('gallery')
        window.scrollTo(0, 0)
      } else if (hash === '#legal-documents' || hash === '#/legal-documents' || path === '/legal-documents' || hash === '#legal' || hash === '#/legal' || path === '/legal' || hash === '#documents' || hash === '#approvals') {
        setCurrentRoute('legal-documents')
        window.scrollTo(0, 0)
      } else if (hash === '#login' || hash === '#/login' || path === '/login') {
        setCurrentRoute('login')
        window.scrollTo(0, 0)
      } else if (hash === '#admin' || hash === '#/admin' || path === '/admin' || hash === '#profile' || hash === '#/profile' || path === '/profile') {
        setCurrentRoute('admin')
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
      window.location.hash = targetHash ? `#${targetHash}` : '#leadership-team'
      setCurrentRoute('leadership-team')
      if (targetHash) {
        setTimeout(() => {
          const el = document.getElementById(targetHash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else if (route === 'gallery') {
      window.location.hash = '#gallery'
      setCurrentRoute('gallery')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'legal-documents') {
      window.location.hash = '#legal-documents'
      setCurrentRoute('legal-documents')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'login') {
      window.location.hash = '#login'
      setCurrentRoute('login')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'admin') {
      window.location.hash = '#admin'
      setCurrentRoute('admin')
      window.scrollTo({ top: 0 })
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

    const inquiryRecord = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email ? formData.email.trim() : null,
      plot_category: formData.plotCategory,
      plot_size: formData.plotSize,
      message: formData.message?.trim() 
        ? `[Dhaka Icon City Booking] Plot: ${formData.plotCategory} | Size: ${formData.plotSize} | Note: ${formData.message.trim()}`
        : `[Dhaka Icon City Booking] Plot: ${formData.plotCategory} | Size: ${formData.plotSize}`,
      status: 'pending'
    }

    // LocalStorage fallback backup
    try {
      const existing = JSON.parse(localStorage.getItem('dz_local_inquiries') || '[]')
      existing.unshift({ ...inquiryRecord, created_at: new Date().toISOString() })
      localStorage.setItem('dz_local_inquiries', JSON.stringify(existing.slice(0, 50)))
    } catch {
      // ignore
    }

    try {
      const dbInsertTask = (async () => {
        try {
          const { error } = await supabase.from('inquiries').insert([inquiryRecord])
          if (error) {
            addLog(`DB Notice: ${error.message}. Form handled locally.`, 'error')
          } else {
            addLog('✓ Inquiry successfully saved to Supabase inquiries table.', 'success')
          }
        } catch (dbErr) {
          addLog(`DB error: ${dbErr.message}`, 'error')
        }
      })()

      // Keep response instant (<300ms) so user is not blocked
      await Promise.race([
        dbInsertTask,
        new Promise((resolve) => setTimeout(resolve, 300))
      ])

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

  // Prefill form from calculator or pricing cards
  const selectPlotForBooking = (plotTitle, kathaCount = 3) => {
    setFormData(prev => ({
      ...prev,
      plotCategory: plotTitle,
      plotSize: `${kathaCount} কাঠা [${kathaCount} Katha]`
    }))
    setBookingModalOpen(true)
  }

  return (
    <div className={`app-root ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>
      {currentRoute !== 'login' && currentRoute !== 'admin' && (
        <>
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
              <li><a href="#legal-documents" className={`nav-link ${currentRoute === 'legal-documents' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('legal-documents'); }}>{t.navLegal}</a></li>
              <li><a href="#gallery" className={`nav-link ${currentRoute === 'gallery' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}>{t.navGallery}</a></li>
              <li><a href="#booking-form-section" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('home', 'booking-form-section'); }}>{t.navContact}</a></li>
            </ul>
          </nav>

          {/* Header Action Right: Round Language Toggle (Left) + Sign In Button */}
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

            {currentUser ? (
              <div className="navbar-user-group">
                <button 
                  type="button" 
                  className="navbar-user-pill"
                  onClick={() => navigateTo('admin')}
                  title={currentUser.email}
                >
                  <span className="navbar-user-dot" />
                  <span className="navbar-user-email">
                    {currentUser.user_metadata?.full_name?.split(' ')[0] || currentUser.email?.split('@')[0]}
                  </span>
                </button>
                <button
                  type="button"
                  className="navbar-logout-btn"
                  onClick={handleLogout}
                  title={lang === 'bn' ? 'লগআউট' : 'Sign Out'}
                  aria-label="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button 
                type="button"
                className={`navbar-login-btn ${currentRoute === 'login' ? 'active' : ''}`}
                onClick={() => navigateTo('login')}
                title={lang === 'bn' ? 'লগইন করুন' : 'Sign In'}
                aria-label="Login"
              >
                <User size={16} className="navbar-login-icon" />
              </button>
            )}

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
            <li><a href="#" className={currentRoute === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('home'); }}>{t.navHome}</a></li>
            <li><a href="#corporate-about" className={currentRoute === 'corporate-about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('corporate-about'); }}>{t.navAbout}</a></li>
            <li><a href="#leadership-team" className={currentRoute === 'leadership-team' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('leadership-team'); }}>{t.navLeadership}</a></li>
            <li><a href="#legal-documents" className={currentRoute === 'legal-documents' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('legal-documents'); }}>{t.navLegal}</a></li>
            <li><a href="#gallery" className={currentRoute === 'gallery' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('gallery'); }}>{t.navGallery}</a></li>
            <li><a href="#booking-form-section" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('home', 'booking-form-section'); }}>{t.navContact}</a></li>
            {currentUser ? (
              <li className="mobile-nav-login-item">
                <button
                  type="button"
                  className={`mobile-nav-login-btn ${currentRoute === 'admin' ? 'active' : ''}`}
                  onClick={() => { setMobileMenuOpen(false); navigateTo('admin'); }}
                >
                  <Building2 size={18} />
                  <span>{lang === 'bn' ? 'এডমিন ড্যাশবোর্ড' : 'Admin Panel'}</span>
                </button>
              </li>
            ) : (
              <li className="mobile-nav-login-item">
                <button
                  type="button"
                  className={`mobile-nav-login-btn ${currentRoute === 'login' ? 'active' : ''}`}
                  onClick={() => { setMobileMenuOpen(false); navigateTo('login'); }}
                >
                  <User size={18} />
                  <span>{lang === 'bn' ? 'লগইন' : 'Sign In'}</span>
                </button>
              </li>
            )}
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
        </>
      )}

      {currentRoute === 'corporate-about' ? (
        <CorporateAboutPage 
          lang={lang} 
          onScheduleVisit={() => setVisitModalOpen(true)}
          navigateTo={navigateTo}
        />
      ) : currentRoute === 'leadership-team' ? (
        <main className="leadership-page-main">
          {/* 1. Dedicated Page Hero (Matching Revised Centered Reference) */}
          <section className="section-header-center bod-header-banner leadership-page-hero">
            {/* Top Green + Centered Gold Accent Border Bar */}
            <div className="bod-banner-top-accent" aria-hidden="true">
              <span className="bod-top-gold-seg" />
            </div>

            {/* Right Decorative Translucent Ring */}
            <div className="bod-banner-ring" aria-hidden="true" />

            <div className="section-container">
              <div className="bod-banner-grid">
                {/* Center Title & Subtitle Block */}
                <div className="bod-banner-center">
                  <div className="bod-center-kicker-row">
                    <span className="bod-kicker-side-rule" aria-hidden="true" />
                    <span className="bod-center-kicker-text">
                      {lang === 'bn' ? 'প্রতিশ্রুতির নেপথ্যের কারিগর' : 'THE PEOPLE BEHIND THE PROMISE'}
                    </span>
                    <span className="bod-kicker-side-rule" aria-hidden="true" />
                  </div>

                  <h1 className="bod-center-title">
                    {lang === 'bn' ? (
                      <>
                        <span className="bod-title-navy">পরিচালনা </span>
                        <span className="bod-title-green">পর্ষদ</span>
                      </>
                    ) : (
                      <>
                        <span className="bod-title-navy">Board of </span>
                        <span className="bod-title-green">Directors</span>
                      </>
                    )}
                  </h1>

                  <div className="amenities-dual-divider bod-center-dual-divider" aria-hidden="true">
                    <span className="divider-seg-green" />
                    <span className="divider-seg-gold" />
                  </div>

                  <p className="bod-center-subtitle">{t.leadershipSubtitle}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Full Board of Directors Grid */}
          <section className="leadership-full-roster-section">
            <div className="section-container">
              <div className="leadership-grid leadership-page-grid">
                {leadershipTeam.map((leader) => (
                  <LeaderCard key={leader.id} leader={leader} lang={lang} />
                ))}
              </div>
            </div>
          </section>

          {/* 3. Founder Directors Section */}
          <FounderDirectorSection lang={lang} />

          {/* 4. Executive Consultation CTA Banner */}
          <section className="leadership-cta-section">
            <div className="section-container">
              <div className="leadership-cta-box">
                <div className="lead-cta-text">
                  <span className="lead-cta-kicker">
                    {lang === 'bn' ? 'সরাসরি বোর্ড ও উপদেষ্টা ডেস্ক' : 'DIRECT BOARD & ADVISORY ACCESS'}
                  </span>
                  <h3>
                    {lang === 'bn'
                      ? 'সরাসরি আমাদের বোর্ড অব ডিরেক্টরস বা বিশেষজ্ঞ টিমের সাথে পরামর্শ করতে চান?'
                      : 'Want to Consult Directly with Our Board of Directors?'}
                  </h3>
                  <p>
                    {lang === 'bn'
                      ? 'গুলশান-০১ কর্পোরেট হেড অফিসে বসে ঢাকা আইকন সিটির ভবিষ্যৎ সম্ভাবনা ও নিরাপদ প্লট ক্রয়ে বিশেষজ্ঞ পরামর্শ ও সাইট ভিজিট বুক করুন।'
                      : 'Book a priority VIP site visit or executive consultation at our Level-10 Gulshan corporate headquarters.'}
                  </p>
                </div>
                <button 
                  type="button"
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
      ) : currentRoute === 'gallery' ? (
        <GalleryPage 
          lang={lang}
          onScheduleVisit={() => setVisitModalOpen(true)}
          navigateTo={navigateTo}
        />
      ) : currentRoute === 'legal-documents' ? (
        <LegalDocumentsPage 
          lang={lang}
          onScheduleVisit={() => setVisitModalOpen(true)}
          navigateTo={navigateTo}
        />
      ) : currentRoute === 'login' ? (
        <LoginPage 
          lang={lang}
          setLang={setLang}
          navigateTo={navigateTo}
          user={currentUser}
          onLoginSuccess={(u) => {
            setCurrentUser(u)
          }}
          onLogout={handleLogout}
        />
      ) : currentRoute === 'admin' ? (
        <AdminDashboard
          user={currentUser}
          navigateTo={navigateTo}
          onLogout={handleLogout}
        />
      ) : (
        <>
          {/* 3. HERO SHOWCASE - DHAKA ICON CITY */}
          <section className="hero-showcase-section" id="dhaka-icon-city">
        <div className="hero-bg-anim-container">
          <div className="hero-bg-image"></div>
          <div className="hero-bg-overlay"></div>
        </div>
        <div className="hero-main-container">
          <div className="hero-grid-layout">
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

            {/* Right Column: Hero Visual Showcase Card for All Devices */}
            <div className="hero-visual-column">
              <div className="hero-visual-card">
                <div className="hero-card-media-wrap">
                  <HeroVideoPlayer
                    videoSrc="/video/Dhaka%20Icon%20City.MP4"
                    poster="/dhaka-icon-hero.jpg"
                    lang={lang}
                  />
                </div>
              </div>
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

      {/* 2. FEATURED PROJECT HIGHLIGHT SECTION (Matching Attached Design) */}
      <section className="project-highlight-section" id="featured-project">
        <div className="section-container">
          <div className="project-highlight-grid">
            {/* Left Narrative Column */}
            <div className="project-highlight-content">
              <div className="project-highlight-kicker">
                <span className="kicker-line" />
                <span className="kicker-text">{lang === 'bn' ? 'ফিচার্ড প্রজেক্ট' : 'FEATURED PROJECT'}</span>
              </div>
              
              <h2 className="project-highlight-title">
                {lang === 'bn' ? 'ঢাকা আইকন সিটি' : 'Dhaka Icon City'}
              </h2>
              
              <p className="project-highlight-subtitle">
                {lang === 'bn' ? 'নিজের করুন এক স্মার্ট ভবিষ্যৎ' : 'Own a Smarter Future'}
              </p>
              
              <p className="project-highlight-desc">
                {lang === 'bn' 
                  ? 'আধুনিক জীবনযাপন, নিরাপদ বিনিয়োগ এবং আপনার পরিবারের জন্য দীর্ঘমেয়াদী মূল্যায়নে সুপরিকল্পিত এক মেগা টাউনশিপ।'
                  : 'A thoughtfully planned township designed for modern living, secure investment, and lasting value for your family.'}
              </p>
              
              <div className="project-highlight-btn-wrap">
                <a 
                  href="#pricing-calculator" 
                  className="btn-project-highlight"
                  onClick={(e) => {
                    e.preventDefault()
                    const targetEl = document.getElementById('pricing-calculator') || document.getElementById('project-masterplan')
                    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span>{lang === 'bn' ? 'প্রকল্পটি ঘুরে দেখুন' : 'Explore the Project'}</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* Right Media Card Column */}
            <div className="project-highlight-media">
              <div className="project-media-frame">
                {/* Architectural Tech Outline & Corner Accents */}
                <div className="project-frame-decorations" aria-hidden="true">
                  <div className="project-frame-outer-line" />
                  <div className="project-frame-inner-line" />
                  <div className="project-frame-teal-accent" />
                  <div className="project-frame-lime-bar" />
                  <div className="project-frame-bracket" />
                </div>

                {/* Main Architectural Chamfered Media Card */}
                <div className="project-media-card-wrapper">
                  <div className="project-media-card">
                    <img 
                      src="/dhaka_icon_township.jpg" 
                      alt={lang === 'bn' ? 'ঢাকা আইকন সিটি মেগা টাউনশিপ' : 'Dhaka Icon City Master Township'} 
                      className="project-media-img"
                      loading="lazy"
                    />

                    {/* Top Right Floating Architectural Tagline */}
                    <div className="project-media-tagline">
                      <span className="tagline-line">{lang === 'bn' ? 'একটি উজ্জ্বল' : 'A BRIGHTER'}</span>
                      <span className="tagline-line">{lang === 'bn' ? 'আগামী' : 'TOMORROW'}</span>
                      <span className="tagline-line">{lang === 'bn' ? 'এখানেই' : 'LIVES HERE'}</span>
                    </div>
                    
                    {/* Floating Chamfered Trusted Partner Badge with Glowing Lime Border */}
                    <div className="project-trusted-badge">
                      <div className="project-trusted-badge-inner">
                        <div className="project-badge-icon">
                          <ShieldCheck size={28} strokeWidth={2} />
                        </div>
                        <div className="project-badge-texts">
                          <strong className="badge-line-main">{lang === 'bn' ? 'বিশ্বস্ত অংশীদার' : 'Trusted Partner'}</strong>
                          <span className="badge-line-sub">{lang === 'bn' ? 'রিয়েল এস্টেট খাতে' : 'in Real Estate'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION (Redesigned with minimal animation & architectural aesthetics) */}
      <section className="why-choose-us-section" id="why-choose-us">
        {/* Background Decorative Architecture & Organic Waves */}
        <div className="why-bg-elements" aria-hidden="true">
          <div className="why-bg-curve-top" />
          <div className="why-bg-curve-bottom" />
          <div className="why-bg-building">
            <img 
              src="/why-us-architectural.jpg" 
              alt="" 
              loading="lazy"
              className="why-bg-building-img" 
            />
          </div>
        </div>

        <div className="section-container why-section-container">
          <div className="why-choose-grid">
            {/* Left Narrative Column */}
            <div className="why-choose-content">
              <div className="why-accent-line" />
              <h2 className="why-choose-title">
                {lang === 'bn' ? 'কেন আমাদের নির্বাচন করবেন?' : 'Why Choose Us?'}
              </h2>
              
              <h3 className="why-choose-subtitle">
                {lang === 'bn' ? 'আপনার স্বপ্ন, আমাদের অঙ্গীকার' : 'Your Dream, Our Commitment'}
              </h3>
              
              <p className="why-choose-desc">
                {lang === 'bn' 
                  ? 'এলিট আইকনিকে আমরা বিশ্বাস করি আস্থা, স্বচ্ছতা এবং দীর্ঘমেয়াদী মূল্যায়নে। আমরা সুন্দর আগামীর জন্য শতভাগ নিষ্কণ্টক, অনুমোদিত ও সুপরিকল্পিত রিয়েল এস্টেট সমাধান নিশ্চিত করি।'
                  : 'At Elite Iconic, we believe in trust, transparency and long-term value. We provide secure, verified and well-planned real estate solutions for a better future.'}
              </p>
            </div>

            {/* Right 6-Feature Card Grid (3x2 Matrix matching user reference) */}
            <div className="why-choose-features-card">
              <div className="why-features-grid">
                {/* 1. RAJUK Registered & Approved */}
                <div className="why-feature-item">
                  <div className="why-icon-circle">
                    <ShieldCheck size={28} strokeWidth={1.8} />
                  </div>
                  <h4 className="why-feature-name">
                    {lang === 'bn' ? 'রাজউক নিবন্ধিত ও অনুমোদিত' : 'RAJUK Registered & Approved'}
                  </h4>
                </div>

                {/* 2. Prime Location in Dhaka */}
                <div className="why-feature-item">
                  <div className="why-icon-circle">
                    <MapPin size={28} strokeWidth={1.8} />
                  </div>
                  <h4 className="why-feature-name">
                    {lang === 'bn' ? 'ঢাকার সন্নিকটে প্রাইম লোকেশন' : 'Prime Location in Dhaka'}
                  </h4>
                </div>

                {/* 3. Transparent Process */}
                <div className="why-feature-item">
                  <div className="why-icon-circle">
                    <CheckCircle2 size={28} strokeWidth={1.8} />
                  </div>
                  <h4 className="why-feature-name">
                    {lang === 'bn' ? 'শতভাগ স্বচ্ছ প্রক্রিয়া' : 'Transparent Process'}
                  </h4>
                </div>

                {/* 4. Trusted by Investors */}
                <div className="why-feature-item">
                  <div className="why-icon-circle">
                    <Users size={28} strokeWidth={1.8} />
                  </div>
                  <h4 className="why-feature-name">
                    {lang === 'bn' ? 'বিনিয়োগকারীদের আস্থা' : 'Trusted by Investors'}
                  </h4>
                </div>

                {/* 5. Modern Infrastructure */}
                <div className="why-feature-item">
                  <div className="why-icon-circle">
                    <Building2 size={28} strokeWidth={1.8} />
                  </div>
                  <h4 className="why-feature-name">
                    {lang === 'bn' ? 'আধুনিক অবকাঠামো' : 'Modern Infrastructure'}
                  </h4>
                </div>

                {/* 6. Future Appreciation */}
                <div className="why-feature-item">
                  <div className="why-icon-circle">
                    <TrendingUp size={28} strokeWidth={1.8} />
                  </div>
                  <h4 className="why-feature-name">
                    {lang === 'bn' ? 'ভবিষ্যৎ মূল্যবৃদ্ধি' : 'Future Appreciation'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHASE 1 OFFICIAL PRICING & INTERACTIVE CALCULATOR */}
      <section className="pricing-section perfect-plot-section" id="pricing-calculator">
        {/* Subtle decorative leaf watermark */}
        <div className="leaf-decorative-watermark" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M180 20C120 40 80 90 70 160C100 130 140 110 180 20Z" fill="rgba(0, 132, 80, 0.05)" />
            <path d="M140 60C100 80 60 120 40 180C70 150 110 130 140 60Z" fill="rgba(0, 132, 80, 0.035)" />
            <path d="M190 10C150 30 110 70 90 130C120 100 160 80 190 10Z" fill="rgba(0, 132, 80, 0.04)" />
          </svg>
        </div>

        <div className="section-container">
          
          {/* Top Header Row matching the design image */}
          <div className="perfect-plot-header-wrap">
            <div className="perfect-plot-header-left">
              <div className="accent-bar-green" />
              <h2 className="perfect-plot-main-heading">
                {lang === 'bn' ? 'আপনার পছন্দের প্লটটি বেছে নিন' : 'Find your perfect plot'}
              </h2>
              <p className="perfect-plot-sub-desc">
                {lang === 'bn' ? 'স্বচ্ছ মূল্য। সহজ মালিকানা।' : 'Transparent pricing. Flexible ownership.'}
              </p>
            </div>

            <div className="perfect-plot-header-right">
              <div className="trust-markers-group">
                <div className="trust-item">
                  <ShieldCheck size={18} className="trust-icon" />
                  <div className="trust-text">
                    <span className="bold-line">100%</span>
                    <span className="sub-line">{lang === 'bn' ? 'নিষ্কণ্টক দলিল' : 'Clear Title'}</span>
                  </div>
                </div>
                <div className="trust-divider" />
                <div className="trust-item">
                  <Sprout size={18} className="trust-icon" />
                  <div className="trust-text">
                    <span className="bold-line">{lang === 'bn' ? 'সহজ' : 'Flexible'}</span>
                    <span className="sub-line">{lang === 'bn' ? 'কিস্তি সুবিধা' : 'Payment Plans'}</span>
                  </div>
                </div>
                <div className="trust-divider" />
                <div className="trust-item">
                  <Users size={18} className="trust-icon" />
                  <div className="trust-text">
                    <span className="bold-line">{lang === 'bn' ? 'নিরাপদ' : 'A Smarter'}</span>
                    <span className="sub-line">{lang === 'bn' ? 'ভবিষ্যৎ' : 'Tomorrow'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Cards Row: Desktop 5-Col Grid & Touch-Smooth Snap Carousel on Mobile */}
          <div 
            className="perfect-plot-cards-wrapper" 
            ref={plotScrollRef} 
            onScroll={handlePlotScroll}
          >
            <div className="perfect-plot-cards-grid">
              {plotPricingData
                .filter(p => pricingCategory === 'all' || p.type.toLowerCase() === pricingCategory)
                .map((plot) => {
                  const isCommercial = plot.type.toLowerCase() === 'commercial'
                  const isSelectedForCalc = plot.id === calcSelectedPlotId

                  return (
                    <div 
                      key={plot.id} 
                      className={`perfect-plot-card ${plot.isPopular ? 'card-featured' : ''} ${isSelectedForCalc ? 'card-selected' : ''}`}
                    >
                      {/* Top Row: High Demand badge on left (if featured) and index code on right */}
                      <div className="card-top-row">
                        {plot.isPopular ? (
                          <div className="badge-high-demand">
                            <Zap size={10} fill="currentColor" />
                            <span>{lang === 'bn' ? 'সর্বাধিক চাহিদাসম্পন্ন' : 'High Demand'}</span>
                          </div>
                        ) : (
                          <div className="empty-badge-spacer" />
                        )}
                        <span className="card-index-code">#{plot.index}</span>
                      </div>

                      {/* Category Tag */}
                      <div className="card-category-row">
                        <span className={`category-tag ${isCommercial ? 'commercial' : 'residential'}`}>
                          {isCommercial ? (lang === 'bn' ? 'বাণিজ্যিক' : 'COMMERCIAL') : (lang === 'bn' ? 'আবাসিক' : 'RESIDENTIAL')}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div className="card-title-block">
                        <h3 className="card-main-title">
                          {lang === 'bn' ? (
                            plot.titleBn
                          ) : (
                            <>
                              {plot.titleEn.includes('(') ? (
                                <>
                                  <span>{plot.titleEn.split('(')[0].trim()}</span>
                                  <span className="title-paren">({plot.titleEn.split('(')[1]}</span>
                                </>
                              ) : (
                                <span>{plot.titleEn}</span>
                              )}
                            </>
                          )}
                        </h3>
                        <p className="card-sub-tagline">{lang === 'bn' ? plot.tagBn : plot.tagEn}</p>
                      </div>

                      {/* Price Block */}
                      <div className="card-price-block">
                        <div className="price-num-row">
                          <span className="currency-taka">৳</span>
                          <span className="price-bold-num">{lang === 'bn' ? plot.numBn : plot.numEn}</span>
                          <div className="price-suffix-col">
                            <span className="suffix-lakh">{lang === 'bn' ? 'লক্ষ' : 'Lakh'}</span>
                            <span className="suffix-katha">{lang === 'bn' ? '/ কাঠা' : '/ Katha'}</span>
                          </div>
                        </div>

                        {/* Tier & Meter Bar */}
                        <div className="tier-meter-container">
                          <div className="tier-text-row">
                            <span className="tier-name">{lang === 'bn' ? plot.tierBn : plot.tierEn}</span>
                            <span className="tier-pct">{plot.meterPct}%</span>
                          </div>
                          <div className="tier-bar-track">
                            <div 
                              className={`tier-bar-fill ${isCommercial ? 'fill-commercial' : 'fill-residential'}`} 
                              style={{ width: `${plot.meterPct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Down Payment Pill */}
                      <div className="down-payment-pill">
                        <span className="dp-dot" />
                        <span className="dp-title">{lang === 'bn' ? '২০% ডাউন পেমেন্ট:' : '20% Down Payment:'}</span>
                        <span className="dp-amount">
                          <span className="dp-taka-sym">৳ </span>{lang === 'bn' ? `${plot.dpBn} টাকা` : plot.dpEn}
                        </span>
                      </div>

                      {/* Features List (Exactly 3 items) */}
                      <ul className="card-specs-list">
                        <li>
                          <Check size={14} className="spec-check-icon" />
                          <span>{lang === 'bn' ? '২০% ন্যূনতম ডাউন পেমেন্ট' : '20% Minimum Down Payment'}</span>
                        </li>
                        <li>
                          <Check size={14} className="spec-check-icon" />
                          <span>{lang === 'bn' ? '৩, ৫, ১০ কাঠা ও ১ বিঘা' : '3, 5, 10 Katha & 1 Bigha'}</span>
                        </li>
                        <li>
                          <Check size={14} className="spec-check-icon" />
                          <span>{lang === 'bn' ? '১ থেকে ৫ বছর মেয়াদি সহজ কিস্তি' : '1 to 5 Yrs Flexible EMI'}</span>
                        </li>
                      </ul>

                      {/* CTA Actions */}
                      <div className="card-cta-row">
                        <button 
                          type="button" 
                          className="btn-view-plot"
                          onClick={() => {
                            setCalcSelectedPlotId(plot.id)
                            setMobilePlotId(plot.id)
                            selectPlotForBooking(lang === 'bn' ? plot.titleBn : plot.titleEn, calcKatha)
                          }}
                        >
                          <Calendar size={14} />
                          <span>{lang === 'bn' ? 'বুকিং করুন' : 'Book Now'}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Section Footer Bar with Centered Interactive Arrow Controls & Animated Pill Indicator */}
          <div className="perfect-plot-footer-bar">
            <div className="carousel-nav-indicator">
              <button 
                type="button" 
                className="arrow-cue" 
                onClick={() => scrollPlots('prev')}
                aria-label="Previous plot"
              >
                ←
              </button>
              <div className="indicator-track" role="tablist">
                {plotPricingData
                  .filter(p => pricingCategory === 'all' || p.type.toLowerCase() === pricingCategory)
                  .map((plot, i) => (
                    <button
                      key={plot.id}
                      type="button"
                      className={`indicator-dot ${i === activePlotIndex ? 'active' : ''}`}
                      onClick={() => scrollToPlotIndex(i)}
                      aria-label={`Go to plot ${i + 1}`}
                    />
                  ))}
              </div>
              <button 
                type="button" 
                className="arrow-cue" 
                onClick={() => scrollPlots('next')}
                aria-label="Next plot"
              >
                →
              </button>
            </div>
          </div>

          {/* INTERACTIVE EMI & DOWN PAYMENT CALCULATOR */}
          <div className="calculator-box-wrapper" id="calculator-section">
            {/* Top Header Row matching design */}
            <div className="calculator-box-header">
              <div className="calc-header-left">
                <div className="calc-header-icon-box">
                  <Calculator size={24} color="#ffffff" strokeWidth={2.2} />
                </div>
                <div className="calc-header-titles">
                  <h3 className="calc-main-heading">
                    {lang === 'bn' ? 'ইন্টারেক্টিভ প্লট ও ইএমআই ক্যালকুলেটর' : 'Interactive Plot & EMI Calculator'}
                  </h3>
                  <p className="calc-main-subtext">
                    {lang === 'bn' 
                      ? 'প্লট অপশন বেছে নিন, বিনিয়োগ হিসাব করুন এবং সহজেই পরিকল্পনা করুন।'
                      : 'Explore plot options, calculate your investment and plan with ease.'}
                  </p>
                </div>
              </div>

              <div className="calc-header-right">
                <div className="calc-leaf-tagline">
                  <span className="calc-tagline-top">A SMARTER TOMORROW</span>
                  <span className="calc-tagline-bottom">BEGINS WITH THE RIGHT PLOT</span>
                  <div className="calc-tagline-bar" />
                </div>
              </div>
            </div>

            <div className="calculator-grid">
              {/* Left Column: Form Controls / Inputs Card */}
              <div className="calc-inputs-col">
                <div className="calc-controls-card">
                  {/* 1. Category Selection */}
                  <div className="calc-section-group">
                    <div className="calc-section-header">
                      <div className="calc-section-title-row">
                        <LayoutGrid size={18} className="calc-section-icon" />
                        <h4 className="calc-section-title">
                          {lang === 'bn' ? 'প্লটের ক্যাটাগরি নির্বাচন করুন' : 'Select Plot Category'}
                        </h4>
                      </div>
                      <p className="calc-section-subtitle">
                        {lang === 'bn' 
                          ? 'আপনার পরিকল্পনার সাথে মানানসই অবস্থান ও ক্যাটাগরি বেছে নিন।' 
                          : 'Choose the location and category that fits your plan.'}
                      </p>
                    </div>

                    <div className="calc-category-cards-grid">
                      {plotPricingData.map((plot) => {
                        const isSelected = calcSelectedPlotId === plot.id
                        const isCommercial = plot.type.toLowerCase() === 'commercial'

                        return (
                          <div
                            key={plot.id}
                            role="button"
                            tabIndex={0}
                            className={`calc-plot-option-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setCalcSelectedPlotId(plot.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                setCalcSelectedPlotId(plot.id)
                              }
                            }}
                          >
                            <div className="plot-option-left">
                              {isCommercial ? (
                                <Building2 size={24} className="plot-option-icon commercial" />
                              ) : (
                                <Home size={24} className="plot-option-icon residential" />
                              )}
                              <div className="plot-option-texts">
                                <span className="plot-option-title">
                                  {lang === 'bn' ? plot.titleBn : plot.titleEn}
                                </span>
                                <span className="plot-option-rate">
                                  {lang === 'bn' ? plot.rateFormattedBn : `৳${plot.numEn} Lakh / Katha`}
                                </span>
                              </div>
                            </div>

                            {isSelected && (
                              <div className="plot-option-check-badge">
                                <Check size={11} strokeWidth={3.5} />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 2. Katha Size */}
                  <div className="calc-section-group">
                    <div className="calc-section-header">
                      <div className="calc-section-title-row">
                        <Layers size={18} className="calc-section-icon" />
                        <h4 className="calc-section-title">
                          {lang === 'bn' ? 'প্লটের আকার (কাঠা):' : 'Plot Size (Katha):'}{' '}
                          <span className="calc-katha-highlight">
                            {calcKatha === 20 ? (lang === 'bn' ? '১ বিঘা (২০ কাঠা)' : '1 Bigha (20 Katha)') : `${calcKatha} ${lang === 'bn' ? 'কাঠা' : 'Katha'}`}
                          </span>
                        </h4>
                      </div>
                      <p className="calc-section-subtitle">
                        {lang === 'bn' 
                          ? 'আপনি যে পরিমাণ জমি কিনতে চান তা নির্বাচন করুন।' 
                          : 'Select the total plot size you want to purchase.'}
                      </p>
                    </div>

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

                  {/* 3. Payment Plan Tenure */}
                  <div className="calc-section-group">
                    <div className="calc-section-header">
                      <div className="calc-section-title-row">
                        <Calendar size={18} className="calc-section-icon" />
                        <h4 className="calc-section-title">
                          {lang === 'bn' ? 'পেমেন্ট প্ল্যান সময়কাল' : 'Payment Plan Tenure'}
                        </h4>
                      </div>
                      <p className="calc-section-subtitle">
                        {lang === 'bn' 
                          ? 'আপনার পছন্দের পরিশোধের সময়কাল নির্বাচন করুন।' 
                          : 'Choose your preferred payment duration.'}
                      </p>
                    </div>

                    <div className="calc-tenure-dropdown-wrap">
                      <CustomSelect
                        id="calc-tenure-select"
                        value={calcTenure}
                        onChange={setCalcTenure}
                        ariaLabel={lang === 'bn' ? 'পেমেন্ট প্ল্যান সময়কাল' : 'Payment Plan Tenure'}
                        options={[
                          { value: '3yr', label: lang === 'bn' ? '৩ বছর (৩৬ কিস্তি)' : '3 Years (36 Installments)' },
                          { value: '2yr', label: lang === 'bn' ? '২ বছর (২৪ কিস্তি)' : '2 Years (24 Installments)' },
                          { value: '1yr', label: lang === 'bn' ? '১ বছর (১২ কিস্তি)' : '1 Year (12 Installments)' },
                          { value: '5yr', label: lang === 'bn' ? '৫ বছর (৬০ কিস্তি)' : '5 Years (60 Installments)' },
                          { value: 'lump', label: lang === 'bn' ? 'এককালীন পরিশোধ (Lump Sum)' : 'Lump Sum Payment' }
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Investment Summary Card */}
              <div className="calc-summary-col">
                <div className="calc-result-card">
                  {/* Top Header of Summary */}
                  <div className="summary-card-header">
                    <div className="summary-header-icon-wrap">
                      <FileText size={20} className="summary-doc-icon" />
                    </div>
                    <div className="summary-title-col">
                      <div className="summary-top-tag-row">
                        <span className="summary-tag-text">INVESTMENT SUMMARY</span>
                        <div className="summary-header-accent-line" />
                      </div>
                      <p className="summary-header-desc">
                        {lang === 'bn' ? 'এখানে আপনার নির্বাচিত প্লটের বিস্তারিত বিবরণ দেওয়া হলো।' : "Here's a detailed breakdown of your selected plot."}
                      </p>
                    </div>
                  </div>

                  {/* Selected Plot Badge & Title */}
                  <div className="summary-selected-plot-banner">
                    <Home size={22} className="summary-plot-icon" />
                    <h4 className="summary-plot-title">
                      {lang === 'bn' ? currentPlotObj.titleBn : currentPlotObj.titleEn} – {calcKatha === 20 ? (lang === 'bn' ? '১ বিঘা' : '1 Bigha') : `${calcKatha} ${lang === 'bn' ? 'কাঠা' : 'Katha'}`}
                    </h4>
                  </div>

                  {/* Breakdown List */}
                  <div className="summary-breakdown-table">
                    <div className="summary-row">
                      <span className="summary-label">{lang === 'bn' ? 'মোট প্লটের মূল্য:' : 'Total Plot Price:'}</span>
                      <div className="summary-val-stack">
                        <strong className="val-bold blue">{formatLakhText(calculatedTotalPrice)}</strong>
                        <span className="val-sub blue">({formatBdt(calculatedTotalPrice)})</span>
                      </div>
                    </div>

                    <div className="summary-row">
                      <span className="summary-label">{lang === 'bn' ? '২০% ডাউন পেমেন্ট (২০%):' : '20% Down Payment (20%):'}</span>
                      <div className="summary-val-stack">
                        <strong className="val-bold green">{formatLakhText(calculatedDownPayment)}</strong>
                        <span className="val-sub green">({formatBdt(calculatedDownPayment)})</span>
                      </div>
                    </div>

                    <div className="summary-row-divider" />

                    <div className="summary-row">
                      <span className="summary-label">{lang === 'bn' ? 'অবশিষ্ট কিস্তি ব্যালেন্স (৮০%):' : 'Remaining Balance (80%):'}</span>
                      <div className="summary-val-stack">
                        <strong className="val-bold slate">{formatLakhText(calculatedRemaining)}</strong>
                      </div>
                    </div>

                    <div className="summary-row-divider" />

                    {calcTenure !== 'lump' && (
                      <div className="summary-row emi-highlight-row">
                        <span className="summary-label">{lang === 'bn' ? 'আনুমানিক মাসিক কিস্তি:' : 'Estimated Monthly EMI:'}</span>
                        <div className="summary-val-stack">
                          <strong className="val-bold gold">{formatBdt(getMonthlyEmi())} / Month</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Booking Button */}
                  <button 
                    type="button"
                    className="btn-summary-book-now"
                    onClick={() => selectPlotForBooking(`${lang === 'bn' ? currentPlotObj.titleBn : currentPlotObj.titleEn}`, calcKatha)}
                  >
                    <Calendar size={18} />
                    <span>{lang === 'bn' ? 'এখনই এই প্লটটি বুক করুন' : 'Book This Selected Plot Now'}</span>
                    <ChevronRight size={18} />
                  </button>

                  {/* Trust markers below button */}
                  <div className="summary-trust-markers">
                    <div className="summary-trust-item">
                      <ShieldCheck size={16} />
                      <span>{lang === 'bn' ? 'নিরাপদ বিনিয়োগ' : 'Secure Investment'}</span>
                    </div>
                    <div className="summary-trust-item">
                      <BarChart2 size={16} />
                      <span>{lang === 'bn' ? 'স্বচ্ছ মূল্য' : 'Transparent Pricing'}</span>
                    </div>
                    <div className="summary-trust-item">
                      <Users size={16} />
                      <span>{lang === 'bn' ? 'উজ্জ্বল ভবিষ্যৎ' : 'A Brighter Future'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP TEAM PREVIEW */}
      <section className="leadership-section" id="leadership-preview">
        {/* Full-Width Editorial Header Banner matching attached design */}
        <div className="section-header-center bod-header-banner">
          {/* Top Green + Centered Gold Accent Border Bar */}
          <div className="bod-banner-top-accent" aria-hidden="true">
            <span className="bod-top-gold-seg" />
          </div>

          {/* Right Decorative Translucent Ring */}
          <div className="bod-banner-ring" aria-hidden="true" />

          <div className="section-container">
            <div className="bod-banner-grid">
              {/* Center Title & Subtitle Block */}
              <div className="bod-banner-center">
                <div className="bod-center-kicker-row">
                  <span className="bod-kicker-side-rule" aria-hidden="true" />
                  <span className="bod-center-kicker-text">
                    {lang === 'bn' ? 'প্রতিশ্রুতির নেপথ্যের কারিগর' : 'THE PEOPLE BEHIND THE PROMISE'}
                  </span>
                  <span className="bod-kicker-side-rule" aria-hidden="true" />
                </div>

                <h2 className="bod-center-title">
                  {lang === 'bn' ? (
                    <>
                      <span className="bod-title-navy">পরিচালনা </span>
                      <span className="bod-title-green">পর্ষদ</span>
                    </>
                  ) : (
                    <>
                      <span className="bod-title-navy">Board of </span>
                      <span className="bod-title-green">Directors</span>
                    </>
                  )}
                </h2>

                <div className="amenities-dual-divider bod-center-dual-divider" aria-hidden="true">
                  <span className="divider-seg-green" />
                  <span className="divider-seg-gold" />
                </div>

                <p className="bod-center-subtitle">{t.leadershipSubtitle}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-container">
          <div className="leadership-grid">
            {leadershipTeam.slice(0, 6).map((leader) => (
              <LeaderCard key={leader.id} leader={leader} lang={lang} />
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
              <span>{lang === 'bn' ? 'সকল পরিচালনা পর্ষদ সদস্য দেখুন (১৫)' : 'See More'}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. MASTER PLAN SECTION & ROAD NETWORK */}
      <section className="masterplan-section" id="masterplan">
        {/* Diagonal Dark Emerald Background Panel & Decorative Elements */}
        <div className="masterplan-bg-diagonal" aria-hidden="true">
          <div className="mp-bg-arc mp-bg-arc-1" />
          <div className="mp-bg-arc mp-bg-arc-2" />
          <div className="mp-corner-watermark">
            <span>{lang === 'bn' ? 'প্রজন্মের জন্য' : 'A TOWNSHIP'}</span>
            <span>{lang === 'bn' ? 'একটি উপশহর' : 'FOR GENERATIONS'}</span>
          </div>
        </div>

        <div className="section-container masterplan-container">
          <div className="masterplan-grid">
            {/* Left Column: Kicker, Heading, Callout, 01-04 Timeline & CTA */}
            <div className="masterplan-content-col">
              <div className="mp-kicker-row">
                <span className="mp-kicker-line" aria-hidden="true" />
                <span className="mp-kicker-text">
                  {lang === 'bn' ? 'মাস্টার প্ল্যান / কৌশলগত নেটওয়ার্ক' : 'MASTER PLAN / STRATEGIC NETWORK'}
                </span>
              </div>

              <h2 className="masterplan-heading">
                {lang === 'bn' ? (
                  <>
                    <span className="mp-title-dark">আধুনিক মাস্টার প্ল্যান ও</span>
                    <br />
                    <span className="mp-title-green">রোড নেটওয়ার্ক</span>
                  </>
                ) : (
                  <>
                    <span className="mp-title-dark">Master Plan &amp; Strategic</span>
                    <br />
                    <span className="mp-title-green">Road Network</span>
                  </>
                )}
              </h2>

              <div className="mp-desc-callout">
                <span className="mp-callout-leaf" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3C11.5 3 6 7.5 6 14C6 16.5 7 18.5 8.5 20C15 20 19.5 14.5 19.5 9C19.5 6.5 18.5 4.5 17 3Z" fill="#469668" fillOpacity="0.22" stroke="#2f7d52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 21C7.5 17.5 11.5 13.5 16.5 8.5" stroke="#2f7d52" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
                <p className="masterplan-desc-text">{t.masterplanDesc}</p>
              </div>

              <div className="masterplan-features-list">
                {/* 01 */}
                <div className="mp-feature-item">
                  <div className="mp-step-rail" aria-hidden="true">
                    <span className="mp-step-num">01</span>
                    <span className="mp-step-line" />
                  </div>
                  <div className="mp-feature-icon-circle" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19L9 5" />
                      <path d="M20 19L15 5" />
                      <line x1="12" y1="6" x2="12" y2="8" />
                      <line x1="12" y1="11" x2="12" y2="13" />
                      <line x1="12" y1="16" x2="12" y2="18" />
                    </svg>
                  </div>
                  <div className="mp-feature-body">
                    <h4>100&apos; Wide Main Avenue Road #01</h4>
                    <p>{lang === 'bn' ? 'প্রকল্পের প্রবেশদ্বার থেকে কেন্দ্রীয় লেক পর্যন্ত ১০০ ফুট প্রশস্ত মূল এভিনিউ' : '100 feet wide arterial grand boulevard connecting the entrance to the lake'}</p>
                  </div>
                </div>

                {/* 02 */}
                <div className="mp-feature-item">
                  <div className="mp-step-rail" aria-hidden="true">
                    <span className="mp-step-num">02</span>
                    <span className="mp-step-line" />
                  </div>
                  <div className="mp-feature-icon-circle" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9.5c1.8-1.8 3.6-1.8 5.4 0 1.8 1.8 3.6 1.8 5.4 0 1.8-1.8 3.6-1.8 5.4 0 1.2 1.2 2.5 1.5 3.8.5" />
                      <path d="M2 15.5c1.8-1.8 3.6-1.8 5.4 0 1.8 1.8 3.6 1.8 5.4 0 1.8-1.8 3.6-1.8 5.4 0 1.2 1.2 2.5 1.5 3.8.5" />
                    </svg>
                  </div>
                  <div className="mp-feature-body">
                    <h4>80&apos; &amp; 40&apos; Wide Lake View Boulevards</h4>
                    <p>{lang === 'bn' ? 'প্রাকৃতিক লেকের দুপাশ দিয়ে ৮০ ও ৪০ ফুট প্রশস্ত মনোরম লেকভিউ রোড ও ওয়াকওয়ে' : '80 & 40 feet wide scenic lakeside promenades and tree-lined walkways'}</p>
                  </div>
                </div>

                {/* 03 */}
                <div className="mp-feature-item">
                  <div className="mp-step-rail" aria-hidden="true">
                    <span className="mp-step-num">03</span>
                    <span className="mp-step-line" />
                  </div>
                  <div className="mp-feature-icon-circle" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 17h14v-5l-2-5H7L5 12v5Z" />
                      <path d="M6 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
                      <path d="M15 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
                      <circle cx="8" cy="14" r="1" fill="currentColor" />
                      <circle cx="16" cy="14" r="1" fill="currentColor" />
                      <path d="M5 12h14" />
                    </svg>
                  </div>
                  <div className="mp-feature-body">
                    <h4>60&apos; Connecting Avenues &amp; 30&apos;/25&apos; Internal Roads</h4>
                    <p>{lang === 'bn' ? 'প্রতিটি আবাসিক ও বাণিজ্যিক ব্লকে সহজ ও বাধাহীন গাড়ী চলাচলের আধুনিক নেটওয়ার্ক' : 'Wide grid system providing direct seamless vehicle access to every single plot'}</p>
                  </div>
                </div>

                {/* 04 */}
                <div className="mp-feature-item">
                  <div className="mp-step-rail" aria-hidden="true">
                    <span className="mp-step-num">04</span>
                  </div>
                  <div className="mp-feature-icon-circle" aria-hidden="true">
                    <Trees size={21} strokeWidth={2} />
                  </div>
                  <div className="mp-feature-body">
                    <h4>Park Lane, Green Belt &amp; Central Promenade</h4>
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
                  <ChevronRight size={16} className="mp-btn-chevron" />
                </button>
                <span className="mp-action-divider" aria-hidden="true" />
                <span className="mp-action-tagline">
                  {lang === 'bn' ? 'সবুজ  •  স্মার্ট  •  উজ্জ্বল আগামী' : 'A GREENER  •  SMARTER  •  BRIGHTER TOMORROW'}
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Quote, Map Card & Value Pillars */}
            <div className="masterplan-image-col">
              <div className="mp-editorial-quote">
                <span className="mp-quote-mark" aria-hidden="true">&ldquo;</span>
                <div className="mp-quote-body">
                  <p className="mp-quote-text">
                    {lang === 'bn' ? (
                      <>সুপরিকল্পিত যোগাযোগ ব্যবস্থা<br />আগামীর বাসযোগ্য সুন্দর ভবিষ্যৎ</>
                    ) : (
                      <>Thoughtfully connected<br />a more livable tomorrow</>
                    )}
                  </p>
                  <span className="mp-quote-bar" aria-hidden="true" />
                </div>
              </div>

              <div className="masterplan-preview-card" onClick={() => setMasterplanModalOpen(true)}>
                <img src="/dhaka-icon-masterplan.jpg" alt="Dhaka Icon City Master Plan" className="masterplan-img-preview" />
              </div>

              <div className="mp-pillars-strip">
                <div className="mp-pillar-item">
                  <span className="mp-pillar-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M17 3C11.5 3 6 7.5 6 14C6 16.5 7 18.5 8.5 20C15 20 19.5 14.5 19.5 9C19.5 6.5 18.5 4.5 17 3Z" fill="#5bb381" fillOpacity="0.25" stroke="#68c38f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 21C7.5 17.5 11.5 13.5 16.5 8.5" stroke="#68c38f" strokeWidth="1.7" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <div className="mp-pillar-text">
                    <span>{lang === 'bn' ? 'সুপরিকল্পিত' : 'WELL-PLANNED'}</span>
                    <span>{lang === 'bn' ? 'কমিউনিটি' : 'COMMUNITIES'}</span>
                  </div>
                </div>

                <div className="mp-pillar-item">
                  <span className="mp-pillar-icon" aria-hidden="true">
                    <Users size={20} strokeWidth={1.7} />
                  </span>
                  <div className="mp-pillar-text">
                    <span>{lang === 'bn' ? 'সংযুক্ত' : 'CONNECTED'}</span>
                    <span>{lang === 'bn' ? 'জীবনযাত্রা' : 'LIVING'}</span>
                  </div>
                </div>

                <div className="mp-pillar-item">
                  <span className="mp-pillar-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#68c38f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12l6-6 4 4 8-8" />
                      <path d="M16 2h5v5" />
                      <rect x="4" y="16" width="3" height="5" rx="0.5" />
                      <rect x="10.5" y="13" width="3" height="8" rx="0.5" />
                      <rect x="17" y="9" width="3" height="12" rx="0.5" />
                    </svg>
                  </span>
                  <div className="mp-pillar-text">
                    <span>{lang === 'bn' ? 'সমৃদ্ধ' : 'HIGHER'}</span>
                    <span>{lang === 'bn' ? 'আগামী' : 'TOMORROWS'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STRATEGIC LOCATION & CONNECTIVITY (RADIAL TIMINGS + 17 UNIVERSITIES) */}
      <section className="connectivity-section" id="connectivity-location">
        {/* Atmospheric Twilight Riverside & Birulia Bridge Hero Banner */}
        <div className="connectivity-hero-banner">
          {/* Scenic Vector Illustration of Turag River, Skyline & Cable-Stayed Birulia Bridge */}
          <div className="conn-banner-art" aria-hidden="true">
            <svg className="conn-bridge-svg" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="riverGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d3d4d" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#041923" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="bridgeLight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Distant Left City Skyline & Lush Botanical Foliage */}
              <rect x="65" y="175" width="26" height="65" fill="#0d2f42" opacity="0.65" />
              <rect x="96" y="190" width="20" height="50" fill="#0a2636" opacity="0.65" />
              <rect x="135" y="168" width="30" height="72" fill="#0d2f42" opacity="0.7" />
              <rect x="170" y="185" width="22" height="55" fill="#092230" opacity="0.6" />
              <path d="M0 245 Q90 210 210 232 T430 242 L430 265 L0 265 Z" fill="#07222c" opacity="0.85" />
              <path d="M160 242 C185 198 245 198 275 242 Z" fill="#0a2e36" opacity="0.75" />

              {/* Right Cable-Stayed Birulia Bridge Illustration */}
              <g opacity="0.72">
                {/* Bridge Pylons */}
                <path d="M1125 250 L1132 128 L1139 128 L1146 250" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
                <path d="M1195 250 L1202 118 L1209 118 L1216 250" stroke="#e2e8f0" strokeWidth="3" fill="none" />
                {/* Stay Cables Left Pylon */}
                <line x1="1134" y1="136" x2="1035" y2="218" stroke="#94a3b8" strokeWidth="1" opacity="0.65" />
                <line x1="1134" y1="148" x2="1055" y2="218" stroke="#94a3b8" strokeWidth="1" opacity="0.65" />
                <line x1="1134" y1="160" x2="1075" y2="218" stroke="#94a3b8" strokeWidth="1" opacity="0.65" />
                <line x1="1134" y1="172" x2="1095" y2="218" stroke="#94a3b8" strokeWidth="1" opacity="0.65" />
                <line x1="1137" y1="136" x2="1175" y2="218" stroke="#94a3b8" strokeWidth="1" opacity="0.65" />
                <line x1="1137" y1="152" x2="1165" y2="218" stroke="#94a3b8" strokeWidth="1" opacity="0.65" />
                {/* Stay Cables Right Pylon */}
                <line x1="1204" y1="126" x2="1150" y2="218" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />
                <line x1="1204" y1="140" x2="1168" y2="218" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />
                <line x1="1204" y1="154" x2="1184" y2="218" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />
                <line x1="1207" y1="126" x2="1335" y2="218" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />
                <line x1="1207" y1="138" x2="1310" y2="218" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />
                <line x1="1207" y1="150" x2="1285" y2="218" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />
                <line x1="1207" y1="162" x2="1260" y2="218" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />
                <line x1="1207" y1="174" x2="1238" y2="218" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />
                {/* Bridge Deck & Piers */}
                <rect x="980" y="216" width="460" height="6" fill="url(#bridgeLight)" />
                <rect x="1030" y="222" width="8" height="32" fill="#64748b" opacity="0.6" />
                <rect x="1130" y="222" width="12" height="34" fill="#94a3b8" opacity="0.75" />
                <rect x="1200" y="222" width="14" height="34" fill="#cbd5e1" opacity="0.8" />
                <rect x="1315" y="222" width="10" height="32" fill="#64748b" opacity="0.6" />
                <rect x="1395" y="222" width="8" height="32" fill="#64748b" opacity="0.5" />
              </g>

              {/* Turag River Surface & Shimmering Reflections */}
              <rect x="0" y="252" width="1440" height="108" fill="url(#riverGlow)" />
              <line x1="0" y1="252" x2="1440" y2="252" stroke="#38bdf8" strokeOpacity="0.22" strokeWidth="1" />
              <line x1="1080" y1="264" x2="1280" y2="264" stroke="#7dd3fc" strokeOpacity="0.22" strokeWidth="1.5" />
              <line x1="1120" y1="274" x2="1240" y2="274" stroke="#7dd3fc" strokeOpacity="0.16" strokeWidth="1.2" />
            </svg>
          </div>

          <div className="section-container conn-banner-container">
            {/* Left Side Motto */}
            <div className="conn-side-motto conn-side-motto-left" aria-hidden="true">
              <span>BETTER</span>
              <span>CONNECTIONS</span>
              <span>BRIGHTER</span>
              <span>TOMORROWS</span>
              <i className="conn-motto-bar" />
            </div>

            {/* Center Editorial Title & Narrative */}
            <div className="conn-hero-center">
              <div className="conn-location-kicker">
                <span className="conn-kicker-rule" aria-hidden="true" />
                <span className="conn-kicker-badge">
                  <MapPin size={14} className="conn-kicker-pin" />
                  <span>{lang === 'bn' ? 'ডিএনসিসি অঞ্চল-১, ঢাকা' : 'DNCC ZONE-1, DHAKA'}</span>
                </span>
                <span className="conn-kicker-rule" aria-hidden="true" />
              </div>

              <h2 className="conn-main-heading">
                {lang === 'bn' ? (
                  <>
                    <span className="conn-title-white">তুরাগ নদীর পশ্চিম তীরে</span>
                    <br />
                    <span className="conn-title-mint">বীরুলিয়া সেতু সংলগ্ন প্রাইম লোকেশন</span>
                  </>
                ) : (
                  <>
                    <span className="conn-title-white">Western Bank of Turag River</span>
                    <br />
                    <span className="conn-title-mint">Adjoining Birulia Bridge</span>
                  </>
                )}
              </h2>

              <div className="conn-tricolor-divider" aria-hidden="true" />

              <p className="conn-sub-desc">{t.locDesc}</p>
            </div>

            {/* Right Side Motto */}
            <div className="conn-side-motto conn-side-motto-right" aria-hidden="true">
              <span>RIVERSIDE</span>
              <span>CONNECTS</span>
              <span>A BRIGHTER</span>
              <span>DHAKA</span>
              <i className="conn-motto-bar" />
            </div>
          </div>
        </div>

        <div className="section-container connectivity-body-container">
          {/* Elevated White Commute Card Container */}
          <div className="commute-grid-container">
            {/* Top Eyebrow & Bridge Connection Pill */}
            <div className="commute-top-bar">
              <div className="commute-eyebrow">
                <span className="commute-eyebrow-bar" aria-hidden="true" />
                <span>{lang === 'bn' ? 'গুরুত্বপূর্ণ সবকিছুর আরও কাছে' : 'LIVE CLOSER TO WHAT MATTERS'}</span>
              </div>

              <div className="commute-strip-bridge">
                <MapPin size={14} className="commute-bridge-pin" />
                <span>বিরুলিয়া সেতু ⟵ সংযোগ ⟶ ঢাকা আইকন সিটি</span>
              </div>
            </div>

            {/* Second Row: Main Card Title + Travel Time Guide Legend */}
            <div className="commute-header-strip">
              <div className="commute-title-block">
                <div className="commute-strip-title">
                  <Navigation size={21} className="commute-nav-icon" />
                  <h3>{t.distanceTitle}</h3>
                </div>
                <p className="commute-strip-sub">
                  {lang === 'bn'
                    ? 'প্রধান গন্তব্যসমূহ • স্বল্প দূরত্ব • আরও সংযুক্ত আগামী'
                    : 'KEY DESTINATIONS. SHORTER JOURNEYS. A MORE CONNECTED TOMORROW.'}
                </p>
              </div>

              <div className="commute-time-guide">
                <span className="time-guide-heading">
                  {lang === 'bn' ? 'যাতায়াত সময় নির্দেশিকা' : 'TRAVEL TIME GUIDE'}
                </span>
                <div className="time-guide-items">
                  <div className="time-guide-item">
                    <span className="tg-dot tg-dot-fast" />
                    <div className="tg-text">
                      <strong>&le; 5 Mins</strong>
                      <span>{lang === 'bn' ? 'অতি নিকটে' : 'Very Close'}</span>
                    </div>
                  </div>
                  <div className="time-guide-item">
                    <span className="tg-dot tg-dot-near" />
                    <div className="tg-text">
                      <strong>6 &ndash; 15 Mins</strong>
                      <span>{lang === 'bn' ? 'কাছাকাছি' : 'Nearby'}</span>
                    </div>
                  </div>
                  <div className="time-guide-item">
                    <span className="tg-dot tg-dot-reach" />
                    <div className="tg-text">
                      <strong>16 &ndash; 20 Mins</strong>
                      <span>{lang === 'bn' ? 'হাতের নাগালে' : 'Within Reach'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5x2 Grid of 10 Commute Cards */}
            <div className="commute-cards-grid">
              {commuteLandmarks.map((item, idx) => (
                <div key={idx} className={`commute-card ${idx >= 4 && !showAllCommute ? 'commute-extra-hidden' : ''}`}>
                  <div className="commute-card-top">
                    <div className="commute-card-num-icon">
                      <span className="commute-sl-badge">{item.sl}</span>
                      <span className="commute-svg-icon" aria-hidden="true">
                        {renderCommuteIcon(item.iconType)}
                      </span>
                    </div>
                    <span className={`commute-time-badge ${item.badgeTone === 'amber' ? 'badge-amber' : 'badge-green'}`}>
                      {lang === 'bn' ? item.timeBn : item.timeEn}
                    </span>
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
            {/* Top Eyebrow & Distance Pill */}
            <div className="commute-top-bar unis-top-bar">
              <div className="commute-eyebrow">
                <span className="commute-eyebrow-bar" aria-hidden="true" />
                <span>{lang === 'bn' ? 'উচ্চশিক্ষার অনন্য কেন্দ্রবিন্দু' : 'PREMIER EDUCATION CORRIDOR'}</span>
              </div>

              <div className="commute-strip-bridge unis-radius-badge">
                <GraduationCap size={15} className="commute-bridge-pin" />
                <span>{lang === 'bn' ? '৩ – ৫ কি.মি. ব্যাসার্ধের মধ্যে ১৭টি বিশ্ববিদ্যালয়' : 'Within 3 – 5 KM Academic Radius'}</span>
              </div>
            </div>

            {/* Header Row: Title Block + Education Hub Guide */}
            <div className="unis-header">
              <div className="commute-title-block unis-title-block">
                <div className="commute-strip-title">
                  <GraduationCap size={23} className="commute-nav-icon unis-title-icon" />
                  <h3>{lang === 'bn' ? 'প্রকল্পের ৩ থেকে ৫ কিলোমিটারের মধ্যে রয়েছে ১৭টি স্বনামধন্য বিশ্ববিদ্যালয়' : '17 Renowned Universities Located Within 3 to 5 KM'}</h3>
                </div>
                <p className="unis-subtitle-desc">
                  {lang === 'bn'
                    ? 'আধুনিক শিক্ষানগরীর প্রাণকেন্দ্রে আপনার সন্তানের নিশ্চিত ও নিরাপদ ভবিষ্যৎ গড়ে তুলুন।'
                    : 'Invest in the heart of Dhaka’s upcoming premier education hub for your family.'}
                </p>
              </div>

              <div className="commute-time-guide unis-hub-guide">
                <span className="time-guide-heading">
                  {lang === 'bn' ? 'শিক্ষা জোন হাইলাইটস' : 'EDUCATION HUB HIGHLIGHTS'}
                </span>
                <div className="time-guide-items">
                  <div className="time-guide-item">
                    <span className="tg-dot tg-dot-fast" />
                    <div className="tg-text">
                      <strong>17+ Campuses</strong>
                      <span>{lang === 'bn' ? 'সরকারি ও বেসরকারি' : 'Public & Private'}</span>
                    </div>
                  </div>
                  <div className="time-guide-item">
                    <span className="tg-dot tg-dot-near" />
                    <div className="tg-text">
                      <strong>3 &ndash; 5 KM</strong>
                      <span>{lang === 'bn' ? 'স্বল্প দূরত্ব' : 'Close Proximity'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="unis-pills-wrap">
              {nearbyUnis.map((uni, idx) => (
                <div key={idx} className={`uni-pill-item ${idx >= 4 && !showAllUnis ? 'uni-extra-hidden' : ''}`}>
                  <span className="uni-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="uni-item-icon" aria-hidden="true">
                    <GraduationCap size={16} strokeWidth={1.8} />
                  </span>
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
        {/* Decorative Botanical Corner Accents */}
        <div className="amenities-corner-decor amenities-decor-tl" aria-hidden="true">
          <svg width="180" height="220" viewBox="0 0 180 220" fill="none">
            <path d="M-20 190 C30 140 60 60 140 -10" stroke="#dfd5be" strokeWidth="1.2" />
            <path d="M-10 210 C45 160 80 95 165 10" stroke="#e6decb" strokeWidth="0.9" />
            <path d="M10 135 C20 90 55 55 95 40 C75 85 45 120 10 135 Z" fill="#1b5e3f" fillOpacity="0.06" />
            <path d="M-5 95 C10 55 40 25 75 15 C60 55 30 80 -5 95 Z" fill="#1b5e3f" fillOpacity="0.04" />
          </svg>
        </div>
        <div className="amenities-corner-decor amenities-decor-br" aria-hidden="true">
          <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
            <path d="M210 30 C160 90 125 165 45 250" stroke="#dfd5be" strokeWidth="1.2" />
            <path d="M220 60 C170 115 140 180 65 260" stroke="#e6decb" strokeWidth="0.9" />
            <path d="M190 130 C165 155 130 195 110 235 C150 220 180 175 190 130 Z" fill="#1b5e3f" fillOpacity="0.08" />
          </svg>
        </div>

        <div className="section-container amenities-container">
          {/* Centered Header Matching Reference */}
          <div className="amenities-center-header">
            <div className="amenities-kicker-row">
              <span className="amenities-kicker-rule" aria-hidden="true" />
              <span className="amenities-kicker-text">
                {lang === 'bn' ? 'হাতের নাগালে পরিপূর্ণ জীবনযাত্রা' : 'A COMPLETE LIFE WITHIN REACH'}
              </span>
              <span className="amenities-kicker-rule" aria-hidden="true" />
            </div>

            <h2 className="amenities-main-title">{t.amenitiesTitle}</h2>

            <div className="amenities-dual-divider" aria-hidden="true">
              <span className="divider-seg-green" />
              <span className="divider-seg-gold" />
            </div>

            <p className="amenities-sub-desc">{t.amenitiesSubtitle}</p>
          </div>

          {/* 4x3 Grid of 12 Minimal Cards */}
          <div className="amenities-grid-12">
            {civicAmenities.map((amenity, idx) => (
              <div key={amenity.id} className={`amenity-card ${idx >= 6 && !showAllAmenities ? 'amenity-extra-hidden' : ''}`}>
                <div className="amenity-icon-box" aria-hidden="true">
                  {renderAmenityIcon(amenity.iconType)}
                </div>
                <h3 className="amenity-card-title">{lang === 'bn' ? amenity.nameBn : amenity.nameEn}</h3>
                <p className="amenity-card-desc">{lang === 'bn' ? amenity.descBn : amenity.descEn}</p>
              </div>
            ))}
          </div>

          {civicAmenities.length > 6 && (
            <button
              type="button"
              id="amenities-see-all-btn"
              className="commute-see-all-btn amenities-see-all-btn"
              onClick={() => setShowAllAmenities((v) => !v)}
            >
              <span>
                {showAllAmenities
                  ? (lang === 'bn' ? 'কম দেখুন' : 'Show Less')
                  : (lang === 'bn' ? 'সব দেখুন (১২)' : 'See All Amenities (12)')}
              </span>
              <ChevronDown size={16} className={showAllAmenities ? 'flip' : ''} />
            </button>
          )}
        </div>
      </section>

      {/* 8. LIVE SITE DEVELOPMENT PROGRESS GALLERY */}
      <section className="gallery-section" id="site-gallery">
        <div className="section-container">
          <div className="amenities-center-header gallery-center-header">
            <div className="amenities-kicker-row">
              <span className="amenities-kicker-rule" aria-hidden="true" />
              <span className="amenities-kicker-text">
                {lang === 'bn' ? 'সরেজমিন প্রকল্প অগ্রগতি' : 'LIVE ON-SITE PROGRESS'}
              </span>
              <span className="amenities-kicker-rule" aria-hidden="true" />
            </div>

            <h2 className="amenities-main-title">{t.galleryTitle}</h2>

            <div className="amenities-dual-divider" aria-hidden="true">
              <span className="divider-seg-green" />
              <span className="divider-seg-gold" />
            </div>

            <p className="amenities-sub-desc">{t.gallerySubtitle}</p>
          </div>

          <div className="gallery-photos-grid">
            {/* 1. Turag River Dredging & Slurry Sand Filling */}
            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/gallery/field-dredging-sandfilling-inspection.jpg')}>
              <div className="gallery-img-frame">
                <img src="/gallery/field-dredging-sandfilling-inspection.jpg" alt="Active Sandfilling Pipeline Turag River" className="gallery-img" loading="lazy" />
                <span className="gallery-zoom-btn" aria-hidden="true">
                  <Eye size={17} />
                </span>
              </div>
            </div>

            {/* 2. Investor & Client VIP Site Inspection Visit */}
            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/gallery/vip-client-site-inspection-delegation.jpg')}>
              <div className="gallery-img-frame">
                <img src="/gallery/vip-client-site-inspection-delegation.jpg" alt="Investor & Client VIP Site Inspection Visit" className="gallery-img" loading="lazy" />
                <span className="gallery-zoom-btn" aria-hidden="true">
                  <Eye size={17} />
                </span>
              </div>
            </div>

            {/* 3. Dhaka Icon City Master Plan Pavilion */}
            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/gallery/dhaka-icon-masterplan-pavilion.jpg')}>
              <div className="gallery-img-frame">
                <img src="/gallery/dhaka-icon-masterplan-pavilion.jpg" alt="Dhaka Icon City Master Plan Pavilion" className="gallery-img" loading="lazy" />
                <span className="gallery-zoom-btn" aria-hidden="true">
                  <Eye size={17} />
                </span>
              </div>
            </div>

            {/* 4. Executive Boardroom Meeting */}
            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/gallery/corporate-boardroom-meeting.jpg')}>
              <div className="gallery-img-frame">
                <img src="/gallery/corporate-boardroom-meeting.jpg" alt="Corporate Boardroom Meeting" className="gallery-img" loading="lazy" />
                <span className="gallery-zoom-btn" aria-hidden="true">
                  <Eye size={17} />
                </span>
              </div>
            </div>

            {/* 5. Turag Riverfront Sand Field Inspection */}
            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/gallery/turag-riverfront-sandfield-visit.jpg')}>
              <div className="gallery-img-frame">
                <img src="/gallery/turag-riverfront-sandfield-visit.jpg" alt="Turag Riverfront Sand Reclaimed Field" className="gallery-img" loading="lazy" />
                <span className="gallery-zoom-btn" aria-hidden="true">
                  <Eye size={17} />
                </span>
              </div>
            </div>

            {/* 6. Internal Access Road Paving */}
            <div className="gallery-item-card" onClick={() => setActiveGalleryModalImg('/gallery/access-road-brick-paving-inspection.jpg')}>
              <div className="gallery-img-frame">
                <img src="/gallery/access-road-brick-paving-inspection.jpg" alt="Internal Access Road Brick Soling" className="gallery-img" loading="lazy" />
                <span className="gallery-zoom-btn" aria-hidden="true">
                  <Eye size={17} />
                </span>
              </div>
            </div>
          </div>

          {/* Revised Full Gallery CTA Button */}
          <div className="gallery-section-cta-wrap">
            <button 
              type="button"
              className="btn-view-full-gallery"
              onClick={() => navigateTo('gallery')}
              aria-label={lang === 'bn' ? 'সম্পূর্ণ গ্যালারি দেখুন' : 'Explore Gallery'}
            >
              <span className="gallery-cta-icon-pill" aria-hidden="true">
                <Images size={20} />
              </span>
              <span className="gallery-cta-text-group">
                <span className="gallery-cta-main-text">
                  {lang === 'bn' ? 'সম্পূর্ণ গ্যালারি দেখুন' : 'Explore Gallery'}
                </span>
                <span className="gallery-cta-sub-tag">
                  {lang === 'bn' ? 'সকল প্রজেক্ট ছবি ও ইভেন্ট' : 'All Project Photos & Events'}
                </span>
              </span>
              <span className="gallery-cta-arrow-bubble" aria-hidden="true">
                <ArrowRight size={16} className="gallery-cta-arrow-icon" />
              </span>
            </button>
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

      {/* 9B. OFFICIAL LEGAL DOCUMENTS & REGISTRATION SECTION */}
      <LegalDocumentsSection lang={lang} navigateTo={navigateTo} />

      {/* 10. INTERACTIVE PLOT BOOKING & SITE VISIT INQUIRY FORM */}
      <section className="booking-form-section" id="booking-form-section">
        <div className="section-container">
          <div className="booking-form-wrapper">
            {/* Left Info Column */}
            <div className="form-info-side">
              <div className="booking-kicker-badge">
                <Sparkles size={13} />
                <span>
                  {lang === 'bn' ? 'ভিআইপি প্লট বুকিং ও সাইট ভিজিট' : 'PRIORITY PLOT & VIP TOUR'}
                </span>
              </div>

              <h2 className="form-main-heading">{t.formTitle}</h2>

              <div className="amenities-dual-divider booking-left-divider" aria-hidden="true">
                <span className="divider-seg-green" />
                <span className="divider-seg-gold" />
              </div>

              <p className="form-desc-text">{t.formSubtitle}</p>

              {/* Minimal 2x2 Highlights Grid */}
              <div className="form-direct-perks minimal-perks-grid">
                <div className="perk-row perk-pill">
                  <div className="perk-icon-box">
                    <Navigation size={16} />
                  </div>
                  <div className="perk-content">
                    <strong>{lang === 'bn' ? 'ফ্রি সাইট ট্রান্সপোর্ট' : 'Chauffeured Site Visit'}</strong>
                    <span>{lang === 'bn' ? 'গুলশান, উত্তরা ও মিরপুর থেকে পিকআপ' : 'Pick-up from Gulshan, Uttara & Mirpur'}</span>
                  </div>
                </div>

                <div className="perk-row perk-pill">
                  <div className="perk-icon-box">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="perk-content">
                    <strong>{lang === 'bn' ? '১০০% নিষ্কণ্টক দলিল' : '100% Legal & RAJUK'}</strong>
                    <span>{lang === 'bn' ? 'সরাসরি হেড অফিসে দলিল যাচাই' : 'Direct title & record verification'}</span>
                  </div>
                </div>

                <div className="perk-row perk-pill">
                  <div className="perk-icon-box">
                    <Calculator size={16} />
                  </div>
                  <div className="perk-content">
                    <strong>{lang === 'bn' ? '২০% ডাউন পেমেন্ট' : '20% Down Payment'}</strong>
                    <span>{lang === 'bn' ? '১২ থেকে ৬০ মাসের সহজ কিস্তি' : 'Flexible 12 to 60 month EMI'}</span>
                  </div>
                </div>

                <div className="perk-row perk-pill">
                  <div className="perk-icon-box">
                    <Compass size={16} />
                  </div>
                  <div className="perk-content">
                    <strong>{lang === 'bn' ? 'প্রাইম লোকেশন ও ভিউ' : 'Prime Avenue Plots'}</strong>
                    <span>{lang === 'bn' ? '১০০ ফুট এভিনিউ ও লেকভিউ প্লট' : '100ft main avenue & lakefront'}</span>
                  </div>
                </div>
              </div>

              {/* Compact Hotline Strip */}
              <div className="hotline-box-highlight minimal-hotline">
                <div className="hotline-box-left">
                  <div className="hotline-phone-badge">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="hl-label">
                      {lang === 'bn' ? 'সরাসরি সেলস ও অ্যাডভাইজরি হটলাইন' : 'Direct Sales & Advisory Desk'}
                    </span>
                    <a href="tel:+8801815311232" className="hl-number">+880 1815-311232</a>
                  </div>
                </div>
                <div className="hotline-hours-pill">
                  <Clock size={12} />
                  <span>{lang === 'bn' ? 'শনি – বৃহস্পতি • ১০ AM – ৭ PM' : 'Sat – Thu • 10 AM – 7 PM'}</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="form-card-side">
              <div className="booking-form-card-header">
                <div className="booking-form-header-top">
                  <span className="booking-form-status-dot" aria-hidden="true" />
                  <span className="booking-form-kicker">
                    {lang === 'bn' ? 'সরাসরি ডেভেলপার ডেস্ক • ফেজ ১' : 'DIRECT DEVELOPER DESK • PHASE 1'}
                  </span>
                </div>
                <h3 className="booking-form-card-title">
                  {lang === 'bn' ? 'প্লট বুকিং ও সাইট ভিজিট' : 'Priority Plot & Site Visit'}
                </h3>
                <p className="booking-form-card-sub">
                  {lang === 'bn'
                    ? 'তথ্য দিয়ে ফর্মটি পূরণ করুন — দ্রুততম সময়ে আমাদের টিম আপনার সাথে যোগাযোগ করবে।'
                    : 'Fill out this quick form — our property advisor will connect with you promptly.'}
                </p>
              </div>

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
                        placeholder={lang === 'bn' ? 'উদাঃ মোঃ রফিকুল ইসলাম' : 'e.g. Mohammad Rafiqul Islam'}
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

                  <div className="form-row-2">
                    <div className="form-group-item">
                      <label className="input-label">{t.lblEmail}</label>
                      <input 
                        type="email" 
                        className="text-input-field" 
                        placeholder={lang === 'bn' ? 'উদাঃ name@example.com (ঐচ্ছিক)' : 'e.g. name@example.com (optional)'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group-item">
                      <label className="input-label">{t.lblPlotType}</label>
                      <select 
                        className="select-input-field"
                        value={formData.plotCategory}
                        onChange={(e) => setFormData({ ...formData, plotCategory: e.target.value })}
                      >
                        <option value="বাণিজ্যিক প্লট (কর্ণার) [Commercial Corner]">
                          {lang === 'bn' ? 'বাণিজ্যিক প্লট (কর্ণার) — ২৮ লক্ষ/কাঠা' : 'Commercial Plot (Corner) — ৳28L/Katha'}
                        </option>
                        <option value="বাণিজ্যিক প্লট (সাধারণ) [Commercial General]">
                          {lang === 'bn' ? 'বাণিজ্যিক প্লট (সাধারণ) — ২৭ লক্ষ/কাঠা' : 'Commercial Plot (General) — ৳27L/Katha'}
                        </option>
                        <option value="আবাসিক প্লট (কর্ণার) [Residential Corner]">
                          {lang === 'bn' ? 'আবাসিক প্লট (কর্ণার) — ২৪ লক্ষ/কাঠা' : 'Residential Plot (Corner) — ৳24L/Katha'}
                        </option>
                        <option value="আবাসিক প্লট (দক্ষিণমুখী) [Residential South]">
                          {lang === 'bn' ? 'আবাসিক প্লট (দক্ষিণমুখী) — ২২ লক্ষ/কাঠা' : 'Residential Plot (South-Facing) — ৳22L/Katha'}
                        </option>
                        <option value="আবাসিক প্লট (সাধারণ) [Residential General]">
                          {lang === 'bn' ? 'আবাসিক প্লট (সাধারণ) — ২০ লক্ষ/কাঠা' : 'Residential Plot (General) — ৳20L/Katha'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">{t.lblPlotSize}</label>
                    <select 
                      className="select-input-field"
                      value={formData.plotSize}
                      onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                    >
                      <option value="৩ কাঠা [3 Katha]">
                        {lang === 'bn' ? '৩ কাঠা (২,১৬০ বর্গফুট)' : '3 Katha (2,160 Sq. Ft.)'}
                      </option>
                      <option value="৫ কাঠা [5 Katha]">
                        {lang === 'bn' ? '৫ কাঠা (৩,৬০০ বর্গফুট)' : '5 Katha (3,600 Sq. Ft.)'}
                      </option>
                      <option value="১০ কাঠা [10 Katha]">
                        {lang === 'bn' ? '১০ কাঠা (৭,২০০ বর্গফুট)' : '10 Katha (7,200 Sq. Ft.)'}
                      </option>
                      <option value="১ বিঘা (২০ কাঠা) [1 Bigha / 20 Katha]">
                        {lang === 'bn' ? '১ বিঘা / ২০ কাঠা (১৪,৪০০ বর্গফুট)' : '1 Bigha / 20 Katha (14,400 Sq. Ft.)'}
                      </option>
                    </select>
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">{t.lblMessage}</label>
                    <textarea 
                      className="textarea-input-field"
                      placeholder={lang === 'bn' ? 'পছন্দের ভিজিট তারিখ, পিকআপ লোকেশন বা কোনো জিজ্ঞাসা থাকলে লিখুন...' : 'Preferred visit date, pickup location, or custom queries...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={2}
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

                  <div className="booking-privacy-note">
                    <ShieldCheck size={14} className="text-emerald" />
                    <span>
                      {lang === 'bn'
                        ? 'আপনার তথ্য ১০০% সুরক্ষিত ও গোপনীয় • কোনো বাধ্যবাধকতা ছাড়া ফ্রি কনসালটেশন'
                        : '100% Confidential • Zero Obligation • Direct Developer Consultation'}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
        </>
      )}

      {/* 12. CORPORATE FOOTER */}
      {currentRoute !== 'login' && currentRoute !== 'admin' && (
        <footer className="elite-corporate-footer">
          <div className="footer-top-accent-line" aria-hidden="true" />
        <div className="footer-container">
          <div className="footer-top-grid">
            {/* Column 1: Brand & RAJUK Credentials */}
            <div className="footer-brand-col">
              <div className="footer-logo-row" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
                <div className="footer-logo-badge">
                  <img src="/Logo.png" alt="Elite Iconic" className="footer-brand-logo" />
                </div>
                <div className="footer-brand-titles">
                  <h3 className="footer-brand-title">ELITE ICONIC</h3>
                  <p className="footer-brand-sub">PROPERTIES & CONSTRUCTION LIMITED</p>
                </div>
              </div>

              <p className="footer-about-text">
                {lang === 'bn' 
                  ? 'ঢাকা আইকন সিটি—মিরপুর ১৪ ও বিরুলিয়া সেতু সংলগ্ন ২,৫০০ কাঠার মেগা প্লটেড উপশহর। টেকসই আবাসন ও আস্থার অনন্য প্রতীক।' 
                  : 'Dhaka Icon City—2,500 Katha premier plotted township adjoining Birulia Bridge & Mirpur 14. Building sustainable investments and trusted communities.'}
              </p>

              <div className="footer-rajuk-stamp">
                <span className="footer-rajuk-icon">
                  <ShieldCheck size={16} />
                </span>
                <div className="footer-rajuk-meta">
                  <span className="footer-rajuk-label">
                    {lang === 'bn' ? 'রাজউক অনুমোদিত ও নিবন্ধিত' : 'RAJUK Registered Developer'}
                  </span>
                  <strong className="footer-rajuk-code">RAJUK/DC/REDMR 001262/24</strong>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="footer-links-col">
              <h4 className="footer-heading">
                {lang === 'bn' ? 'ঢাকা আইকন সিটি' : 'Dhaka Icon City'}
              </h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#corporate-about" onClick={(e) => { e.preventDefault(); navigateTo('corporate-about'); }}>
                    <ChevronRight size={13} className="footer-link-chevron" />
                    <span>{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}</span>
                  </a>
                </li>
                <li>
                  <a href="#leadership-team" onClick={(e) => { e.preventDefault(); navigateTo('leadership-team'); }}>
                    <ChevronRight size={13} className="footer-link-chevron" />
                    <span>{lang === 'bn' ? 'পরিচালনা পর্ষদ' : 'Board of Directors'}</span>
                  </a>
                </li>
                <li>
                  <a href="#gallery" onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}>
                    <ChevronRight size={13} className="footer-link-chevron" />
                    <span>{lang === 'bn' ? 'ফটো ও ইভেন্ট গ্যালারি' : 'Photo & Event Gallery'}</span>
                  </a>
                </li>
                <li>
                  <a href="#legal-documents" onClick={(e) => { e.preventDefault(); navigateTo('legal-documents'); }}>
                    <ChevronRight size={13} className="footer-link-chevron" />
                    <span>{lang === 'bn' ? 'আইনগত ডকুমেন্টস ও অনুমোদন' : 'Legal Documents & Approvals'}</span>
                  </a>
                </li>
                <li>
                  <a href="#pricing-calculator" onClick={(e) => { e.preventDefault(); navigateTo('home', 'pricing-calculator'); }}>
                    <ChevronRight size={13} className="footer-link-chevron" />
                    <span>{lang === 'bn' ? 'ইন্টারেক্টিভ ক্যালকুলেটর' : 'Interactive Calculator'}</span>
                  </a>
                </li>
                <li>
                  <a href="#connectivity-location" onClick={(e) => { e.preventDefault(); navigateTo('home', 'connectivity-location'); }}>
                    <ChevronRight size={13} className="footer-link-chevron" />
                    <span>{lang === 'bn' ? 'দূরত্ব ও যাতায়াত' : 'Connectivity & Location'}</span>
                  </a>
                </li>
                <li>
                  <a href="#civic-amenities" onClick={(e) => { e.preventDefault(); navigateTo('home', 'civic-amenities'); }}>
                    <ChevronRight size={13} className="footer-link-chevron" />
                    <span>{lang === 'bn' ? '১২টি নাগরিক সুবিধা' : '12 Civic Amenities'}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Corporate Headquarters */}
            <div className="footer-links-col footer-contact-col">
              <h4 className="footer-heading">
                {lang === 'bn' ? 'কর্পোরেট প্রধান কার্যালয়' : 'Corporate Headquarters'}
              </h4>
              <div className="footer-address-card">
                <span className="footer-addr-pin">
                  <MapPin size={15} />
                </span>
                <p className="footer-office-address">
                  <strong>Nafi Tower, Level 10</strong><br />
                  53 Gulshan Avenue, Gulshan-01,<br />
                  Dhaka-1212, Bangladesh
                </p>
              </div>
              <div className="footer-contact-links">
                <a href="tel:+8801815311232" className="footer-contact-pill">
                  <span className="footer-contact-icon"><Phone size={13} /></span>
                  <span>+880 1815-311232</span>
                </a>
                <a href="mailto:info@eliteiconic.com" className="footer-contact-pill">
                  <span className="footer-contact-icon"><Mail size={13} /></span>
                  <span>info@eliteiconic.com</span>
                </a>
                <a href="https://www.eliteiconic.com" target="_blank" rel="noopener noreferrer" className="footer-contact-pill">
                  <span className="footer-contact-icon"><ExternalLink size={13} /></span>
                  <span>www.eliteiconic.com</span>
                </a>
              </div>
            </div>

            {/* Column 4: Affiliations & VIP Schedule CTA */}
            <div className="footer-links-col footer-partner-col">
              <h4 className="footer-heading">
                {lang === 'bn' ? 'অ্যাফিলিয়েশন ও পার্টনার' : 'Affiliations & Partners'}
              </h4>
              <ul className="footer-partner-list">
                <li>
                  <span className="partner-bullet"><Award size={13} /></span>
                  <span>Goldeneye Developers Ltd</span>
                </li>
                <li>
                  <span className="partner-bullet"><Award size={13} /></span>
                  <span>DD REG (Dhaka Developers & Real Estate Group)</span>
                </li>
                <li>
                  <span className="partner-bullet"><Award size={13} /></span>
                  <span>Real Estate & Housing Association</span>
                </li>
              </ul>

              <button
                type="button"
                className="footer-vip-visit-btn"
                onClick={() => setVisitModalOpen(true)}
              >
                <Calendar size={15} />
                <span>{lang === 'bn' ? 'প্রকল্প পরিদর্শন বুক করুন' : 'Schedule Site Visit'}</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p className="footer-copyright">
              © {new Date().getFullYear()} <strong>Elite Iconic Properties & Construction Limited</strong>. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
      )}

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
                    <div key={inq.id || i} style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0', fontSize: 12 }}>
                      <strong style={{ color: '#008450' }}>{inq.name}</strong> ({inq.phone})
                      <p style={{ margin: '4px 0 0 0', color: '#334155' }}>{inq.message}</p>
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
      <VisitScheduleModal
        isOpen={visitModalOpen}
        onClose={closeVisitModal}
        lang={lang}
        onLog={addLog}
      />

      {/* BOOKING INQUIRY MODAL (form-card-side popup) */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false)
          setFormSuccess(false)
        }}
        lang={lang}
        t={t}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formSuccess={formSuccess}
        setFormSuccess={setFormSuccess}
      />

    </div>
  )
}

export default App
