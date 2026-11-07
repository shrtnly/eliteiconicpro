import { useState, useEffect } from 'react'
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  Scale, 
  Eye, 
  X,
  Award,
  BadgeCheck,
  Landmark,
  FileCheck,
  Users,
  Search,
  Printer,
  ChevronRight,
  HelpCircle,
  PhoneCall
} from 'lucide-react'
import './LegalDocumentsPage.css'

export default function LegalDocumentsPage({ lang = 'en', onScheduleVisit, navigateTo }) {
  const isBn = lang === 'bn'
  const [activeTab, setActiveTab] = useState('all')
  const [previewModalDoc, setPreviewModalDoc] = useState(null)
  const [directorSearch, setDirectorSearch] = useState('')

  const legalDocuments = [
    {
      id: 'trade-license',
      category: 'trade',
      titleBn: 'ঢাকা উত্তর সিটি কর্পোরেশন ই-ট্রেড লাইসেন্স',
      titleEn: 'Dhaka North City Corporation (DNCC) E-Trade License',
      docTypeBn: 'পৌর কর ও ব্যবসা পরিচালনা সনদ',
      docTypeEn: 'Municipal Trade Authorization Certificate',
      authorityBn: 'ঢাকা উত্তর সিটি কর্পোরেশন (ডিএনসিসি)',
      authorityEn: 'Dhaka North City Corporation (DNCC)',
      issuerBn: 'অঞ্চল ৩ মহাখালী, ওয়ার্ড ১৯, ঢাকা',
      issuerEn: 'Zone 03 Mohakhali, Ward 19, Dhaka',
      regNumber: 'TRAD/DNCC/018373/2026',
      issueDate: '23/09/2026',
      validity: '30 June 2027',
      natureBn: 'কনষ্ট্রাকশন, কনসালটেন্সী, ডেভেলপার ও রিয়েল এস্টেট',
      natureEn: 'Construction, Consultancy, Developer & Real Estate',
      registeredAddress: 'Nafi Tower (Level 10), 53 Gulshan Avenue, Gulshan-1, Dhaka-1212',
      previewImg: '/docs/previews/dncc-e-trade-license-preview.png',
      pdfUrl: '/docs/dncc-e-trade-license-elite-iconic.pdf',
      summaryBn: 'স্থানীয় সরকার (সিটি কর্পোরেশন) আইন, ২০০৯ এর ধারা ৮৪ অনুযায়ী সরকার প্রণীত আদর্শ কর তফসিল, ২০১৬ এর ১০ অনুচ্ছেদ অনুযায়ী এলিট আইকোনিক প্রোপার্টিস এন্ড কন্সট্রাকশন লিঃ-এর নামে অনুমোদিত।',
      summaryEn: 'Issued under Section 84 of the Local Government (City Corporation) Act 2009 and Ideal Tax Schedule 2016 authorizing legitimate real estate, township development, and engineering consulting.',
      highlights: [
        { labelBn: 'লাইসেন্স নম্বর', labelEn: 'License Number', val: 'TRAD/DNCC/018373/2026' },
        { labelBn: 'ব্যবসার ধরণ', labelEn: 'Business Scope', val: 'Developer, Real Estate & Construction' },
        { labelBn: 'মেয়াদ', labelEn: 'Validity Period', val: 'Fiscal Year 2026-2027 (Till 30 June 2027)' },
        { labelBn: 'ডিজিটাল ভেরিফিকেশন', labelEn: 'Digital Verification', val: 'Official QR Code & DNCC Portal' }
      ]
    },
    {
      id: 'tin-certificate',
      category: 'tax',
      titleBn: 'এনবিআর করদাতা শনাক্তকরণ সনদ (TIN Certificate)',
      titleEn: 'National Board of Revenue (NBR) Taxpayer Identification Certificate',
      docTypeBn: 'জাতীয় আয়কর নিবন্ধন সনদ',
      docTypeEn: 'National Corporate Taxpayer Registration',
      authorityBn: 'জাতীয় রাজস্ব বোর্ড (এনবিআর), গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
      authorityEn: 'National Board of Revenue (NBR), Government of Bangladesh',
      issuerBn: 'ট্যাক্সেস সার্কেল-০৯০ (কোম্পানিজ), ট্যাক্সেস জোন ০৫, ঢাকা',
      issuerEn: 'Taxes Circle-090 (Companies), Taxes Zone 05, Dhaka',
      regNumber: 'TIN : 582155727196',
      issueDate: 'September 28, 2026',
      validity: 'Permanent Corporate TIN',
      natureBn: 'লিমিটেড কোম্পানি করদাতা (Registered Taxpayer)',
      natureEn: 'Registered Company Taxpayer',
      registeredAddress: 'Nafi Tower (Level 10), 53 Gulshan-1 Avenue, Gulshan, Dhaka, PO: 1212',
      previewImg: '/docs/previews/tin-certificate-preview.png',
      pdfUrl: '/docs/tin-certificate-elite-iconic.pdf',
      summaryBn: 'আয়কর আইন, ২০২৩ এর ধারা ১৬৬ অনুযায়ী এলিট আইকোনিক প্রোপার্টিস এন্ড কন্সট্রাকশন লিঃ জাতীয় রাজস্ব বোর্ডের ট্যাক্সেস জোন ০৫ এর সার্কেল-০৯০ (কোম্পানিজ) এর তালিকাভুক্ত নিবন্ধিত করদাতা।',
      summaryEn: 'Statutory certificate under Income Tax Act 2023 confirming Elite Iconic Properties & Construction Ltd. as a verified, compliant corporate entity under Taxes Zone 05, Dhaka.',
      highlights: [
        { labelBn: 'টিআইএন নম্বর', labelEn: 'TIN Number', val: '582155727196' },
        { labelBn: 'ট্যাক্স জোন ও সার্কেল', labelEn: 'Taxes Circle & Zone', val: 'Circle-090 (Companies), Zone 05, Dhaka' },
        { labelBn: 'স্ট্যাটাস', labelEn: 'Corporate Status', val: 'Registered Corporate Taxpayer' },
        { labelBn: 'স্বাক্ষর কর্তৃপক্ষ', labelEn: 'Issuing Authority', val: 'Deputy Commissioner of Taxes, Segunbagicha' }
      ]
    },
    {
      id: 'form-xii',
      category: 'incorporation',
      titleBn: 'আরজেএসসি ফর্ম ১২ (পরিচালনা পর্ষদের সরকারি রিটার্ন)',
      titleEn: 'RJSC Form XII (Statutory Directors & Management Return)',
      docTypeBn: 'বাণিজ্য মন্ত্রণালয় আরজেএসসি সংবিধিবদ্ধ রিটার্ন',
      docTypeEn: 'Ministry of Commerce Statutory Board Filing',
      authorityBn: 'যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC)',
      authorityEn: 'Registrar of Joint Stock Companies & Firms (RJSC)',
      issuerBn: 'বাণিজ্য মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
      issuerEn: 'Ministry of Commerce, Government of Bangladesh',
      regNumber: 'Reg No: C-213460 | Issue No: 624038',
      issueDate: '25-AUG-2026 (Filing: 27-Jul-2026)',
      validity: 'Statutory Permanent Filing',
      natureBn: 'কোম্পানি আইন ১৯৯৪ (ধারা ১১৫) অনুযায়ী পর্ষদ বিবরণী',
      natureEn: 'Particulars of Directors, Manager & Managing Agents',
      registeredAddress: 'Gemcon Business Center (Level-08), 255 New Circular Road Malibagh Mor, Dhaka-1217',
      previewImg: '/docs/previews/rjsc-form-xii-preview.png',
      pdfUrl: '/docs/rjsc-form-xii-directors-elite-iconic.pdf',
      summaryBn: 'কোম্পানি আইন, ১৯৯৪ এর ধারা ১১৫ অনুযায়ী ৪১+ জন উদ্যোক্তা ও পরিচালকের এনআইডি, টিআইএন, পদবি ও স্থায়ী ঠিকানাসহ সরকারের নিকট দাখিলকৃত ডিজিটালভাবে স্বাক্ষরিত সংবিধিবদ্ধ নথি।',
      summaryEn: 'Official government document under Section 115 of The Companies Act 1994 legally certifying the Chairman, Vice Chairman, Managing Director, and full roster of 49 board members.',
      highlights: [
        { labelBn: 'নিবন্ধন নম্বর', labelEn: 'Company Reg No', val: 'C-213460 (Date: 25-AUG-2026)' },
        { labelBn: 'ফাইলিং নম্বর', labelEn: 'RJSC Issue No', val: 'Issue No: 624038' },
        { labelBn: 'চেয়ারম্যান', labelEn: 'Chairman of the Board', val: 'Muksudur Rahaman' },
        { labelBn: 'ব্যবস্থাপনা পরিচালক', labelEn: 'Managing Director', val: 'Abul Kalam Azad' }
      ]
    },
    {
      id: 'moa-aoa',
      category: 'moa',
      titleBn: 'মেমোরেন্ডাম ও আর্টিকেলস অব অ্যাসোসিয়েশন (MoA & AoA)',
      titleEn: 'Memorandum & Articles of Association (MoA & AoA)',
      docTypeBn: 'কোম্পানির সাংবিধানিক সনদ ও নীতিমালা',
      docTypeEn: 'Corporate Constitutional Charter & Articles',
      authorityBn: 'কোম্পানি আইন, ১৯৯৪ (বাণিজ্য মন্ত্রণালয়)',
      authorityEn: 'The Companies Act, 1994 (Ministry of Commerce)',
      issuerBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত',
      issuerEn: 'Government of the People\'s Republic of Bangladesh',
      regNumber: 'অনুমোদিত মূলধন: ৫০ কোটি টাকা (Issue: 624039)',
      issueDate: '25/08/2026',
      validity: 'Permanent Charter',
      natureBn: 'প্রাইভেট কোম্পানি লিমিটেড বাই শেয়ারস',
      natureEn: 'Private Company Limited by Shares',
      registeredAddress: 'Gemcon Business Center (Level-08), 255 New Circular Road Malibagh Mor, Dhaka-1217',
      previewImg: '/docs/previews/memorandum-articles-preview.png',
      pdfUrl: '/docs/memorandum-articles-of-association-elite-iconic.pdf',
      summaryBn: '৫,০০,০০,০০০ (পাঁচ কোটি) টাকা অনুমোদিত মূলধন এবং ৫,০০,০০০ সাধারণ শেয়ারে বিভক্ত মেগা টাউনশিপ উন্নয়ন, ভূমি ক্রয়-বিক্রয়, রিভারফ্রন্ট ড্রেজিং ও আধুনিক আবাসন বাস্তবায়নের সাংবিধানিক সনদ।',
      summaryEn: 'Constitutional framework stipulating BDT 50,000,000 authorized capital with legal mandates for township execution, housing layout development, and financial asset management.',
      highlights: [
        { labelBn: 'অনুমোদিত মূলধন', labelEn: 'Authorized Capital', val: 'BDT 50,000,000 (Five Crore Taka)' },
        { labelBn: 'শেয়ার সংখ্যা', labelEn: 'Total Shares', val: '500,000 Ordinary Shares of Tk 100 each' },
        { labelBn: 'কোম্পানি আইন', labelEn: 'Governing Law', val: 'The Companies Act 1994 (Act XVIII of 1994)' },
        { labelBn: 'ব্যাংক হিসাব পরিচালনা', labelEn: 'Banking Operations', val: 'Joint Signatures: Chairman, MD & Finance Director' }
      ]
    }
  ]

  // Full 49 Directors Roster extracted from Form XII
  const DIRECTORS_ROSTER = [
    { sl: 1, name: 'MUKSUDUR RAHAMAN', roleBn: 'চেয়ারম্যান', roleEn: 'Chairman', tin: '128360105391', nid: '1946915152', address: '87, Uttar Basaboo, Sabujbag, Dhaka-1214' },
    { sl: 2, name: 'ASHA KHAN', roleBn: 'ভাইস চেয়ারম্যান', roleEn: 'Vice Chairman', tin: '858706899819', nid: '5065196783', address: '1343, Nurpur Central Mosjid Road, Donia, Kadamtali, Dhaka-1236' },
    { sl: 3, name: 'ABUL KALAM AZAD', roleBn: 'ব্যবস্থাপনা পরিচালক', roleEn: 'Managing Director', tin: '787062580300', nid: '7764353723', address: 'Vill- Balia Danga, Narail Sadar, Dist- Narail' },
    { sl: 4, name: 'MOBAROK HOSSAIN MUNSHI', roleBn: 'ডেপুটি ম্যানেজিং ডিরেক্টর', roleEn: 'Deputy Managing Director', tin: '158108837072', nid: '1943931665', address: '298, East Dolayerpar, Dhania, Shaymur, Dhaka-1236' },
    { sl: 5, name: 'SHAHABUDDIN', roleBn: 'অর্থ পরিচালক', roleEn: 'Finance Director', tin: '135115168832', nid: '7347199148', address: 'Vill- Nasirabad, Uttarpara, Daserkandi, Khilgaon, Dhaka-1214' },
    { sl: 6, name: 'MD. MOSHARROF HOSSAIN', roleBn: 'মার্কেটিং ডিরেক্টর', roleEn: 'Marketing Director', tin: '777363112246', nid: '1900970003', address: 'Vill- Amdirpara, Shaghata-5826, Dist- Gaibandha' },
    { sl: 7, name: 'BIPLOB KUMAR BARMA', roleBn: 'পরিচালক', roleEn: 'Director', tin: '411103686587', nid: '5535827793', address: 'Putikata, Rajarhat-5610, Dist- Kurigram' },
    { sl: 8, name: 'MD. NAYEEM', roleBn: 'পরিচালক', roleEn: 'Director', tin: '216048134210', nid: '1958225102', address: 'Vill- Sidya, P.S- Damodya-8040, Dist- Shariatpur' },
    { sl: 9, name: 'MD. KABIR HOSSAIN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '855773541007', nid: '5505297936', address: 'Vill- Vitibishara, P.S- Nabinagar, Dist- Brahmanbaria' },
    { sl: 10, name: 'MD. ABUL BASAR', roleBn: 'পরিচালক – প্রকিউরমেন্ট', roleEn: 'Director – Procurement', tin: '214805912566', nid: '5092620268', address: '1/5, Block-A, Lalmatia, Mohammadpur, Dhaka-1207' },
    { sl: 11, name: 'MD. ABDUS SALAM', roleBn: 'পরিচালক', roleEn: 'Director', tin: '175317696574', nid: '4623986694', address: 'Borhan Uddin Pouroshova, Word No-7, Dist- Bhola' },
    { sl: 12, name: 'ZAHIDUL ISLAM', roleBn: 'পরিচালক', roleEn: 'Director', tin: '426342849325', nid: '7308167282', address: 'Mohordic Char, Kalkini, Dist- Madaripur' },
    { sl: 13, name: 'MD. AZHARUL ISLAM', roleBn: 'পরিচালক (ভূমি ব্যবস্থাপনা)', roleEn: 'Director – Land Demarcation', tin: '294525513911', nid: '9132760431', address: '3 No. Wasa Staff Quarters, AGB Colony, Motijheel, Dhaka' },
    { sl: 14, name: 'MD. MOHSIN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '180232950518', nid: '9122360283', address: 'Holding No-2/3, Shukrabad, Mohammadpur, Dhaka-1207' },
    { sl: 15, name: 'MD. SAIFULLAH SHARIF', roleBn: 'পরিচালক', roleEn: 'Director', tin: '118853150093', nid: '7790475631', address: '519, Donia, Jatrabari, Dhaka-1236' },
    { sl: 16, name: 'KAZI MAKSUDUR RAHMAN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '732092398041', nid: '9556346592', address: 'Vill- Lahuria 85 Para, Lohagora, Dist- Narail' },
    { sl: 17, name: 'MD. BAPPI', roleBn: 'পরিচালক', roleEn: 'Director', tin: '290106483446', nid: '19872698874345200', address: 'Holding No-293, Bhulta, Rupganj, Dist- Narayanganj' },
    { sl: 18, name: 'SYDUR RAHMAN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '146478628993', nid: '2837702626', address: 'Vill- Shiyachar Purbo, Narayanganj Sadar, Dist- Narayanganj' },
    { sl: 19, name: 'TAHAMINA AKTER', roleBn: 'পরিচালক', roleEn: 'Director', tin: '720105652084', nid: '8663543406', address: 'Vill- Upsi, P.S- Naria, Dist- Shariatpur' },
    { sl: 20, name: 'ASMA AKTER RUPA', roleBn: 'পরিচালক', roleEn: 'Director', tin: '333596562926', nid: '9579267890', address: 'Upashi, Naria, Dist- Shariatpur' },
    { sl: 21, name: 'MD AZADUR RAHMAN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '429655970483', nid: '5540630752', address: 'Holding No-1423, Donia, Kadamtali, Dhaka-1236' },
    { sl: 22, name: 'ALAMGIR HOSSAIN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '697222680037', nid: '8708408334', address: 'Vill- Char Sayedpur, Narayanganj Sadar, Dist- Narayanganj' },
    { sl: 23, name: 'NIZAM SIKTER', roleBn: 'পরিচালক', roleEn: 'Director', tin: '375865382485', nid: '6001985271', address: 'Vill- Hasnabad, Naiyatola, Keraniganj, Dhaka-1311' },
    { sl: 24, name: 'MOHD SHEIKH FARID', roleBn: 'পরিচালক', roleEn: 'Director', tin: '154175522550', nid: '8243381350', address: 'Tiger Road, Jalabad Balochara, Dist- Chittagong' },
    { sl: 25, name: 'MD ZIAUDDIN SAYEM', roleBn: 'পরিচালক', roleEn: 'Director', tin: '630307373695', nid: '6867832013', address: 'Holding No-81/1, Zoginagar Road, Wari, Dhaka-1203' },
    { sl: 26, name: 'RAFSAN AHMED SHOYEB', roleBn: 'পরিচালক', roleEn: 'Director', tin: '159093999324', nid: '6918394179', address: 'Holding No-11, Ranking Street, Wari, Dhaka-1203' },
    { sl: 27, name: 'MD. JUMMAN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '741316227482', nid: '1942056555', address: 'Holding No-26/1, Polashpur 5, Donia, Kadomtali, Dhaka-1236' },
    { sl: 28, name: 'MD. MAHBUBUR RAHMAN SOHEL', roleBn: 'পরিচালক', roleEn: 'Director', tin: '584146127085', nid: '5060827978', address: 'Arihazar School Road, Araihazar, Dist- Narayanganj' },
    { sl: 29, name: 'LAKI AKTER', roleBn: 'পরিচালক', roleEn: 'Director', tin: '213006264791', nid: '1914147432', address: 'Basudia, Baligaon, Lohajang-1530, Dist- Munshiganj' },
    { sl: 30, name: 'MD. RUHUL AMIN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '597185916403', nid: '4158146615', address: 'Poura Nobipur, Word No-03, Bhola Sadar-8300, Dist- Bhola' },
    { sl: 31, name: 'LUTFA BEGUM', roleBn: 'পরিচালক', roleEn: 'Director', tin: '692543937707', nid: '2369423914', address: '11/10, Iqbal Road, Mohammadpur, Dhaka-1207' },
    { sl: 32, name: 'LATIFA HELEN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '823540268208', nid: '19806710223180587', address: '11/10, Iqbal Road, Mohammadpur, Dhaka-1207' },
    { sl: 33, name: 'MOSTOFA KAMAL', roleBn: 'পরিচালক', roleEn: 'Director', tin: '266615840152', nid: '7329595792', address: 'Weat Lohaliya, Boro Bari, Patuakhali Sadar-8600' },
    { sl: 34, name: 'SELIMUZZAMAN CHOWDHURY', roleBn: 'পরিচালক', roleEn: 'Director', tin: '836957840023', nid: '3298062625', address: 'Rajabari, Alibhor, Foridabad, Shyampur, Dhaka-1204' },
    { sl: 35, name: 'GAZI SAIFUL ISLAM', roleBn: 'পরিচালক', roleEn: 'Director', tin: '567785959990', nid: '9563749945', address: 'Zamader Barry, Tamta, Shahrasti-3620, Dist- Chandpur' },
    { sl: 36, name: 'MD. AMJAD ALI', roleBn: 'পরিচালক', roleEn: 'Director', tin: '326403838128', nid: '6435841470', address: 'Dighalia, Kola, Lohagora, Dist- Narail' },
    { sl: 37, name: 'BINOY RAY', roleBn: 'পরিচালক', roleEn: 'Director', tin: '670903505059', nid: '19906826401000052', address: 'Raipura, Poschimpara, Dist- Narsingdi' },
    { sl: 38, name: 'GOPESH RANJAN ROY', roleBn: 'পরিচালক', roleEn: 'Director', tin: '123513504289', nid: '19772697557395559', address: 'Vill- Doud, Thana- Nilphamari, Dist- Nilphamari' },
    { sl: 39, name: 'SUDIPTA SAHA', roleBn: 'পরিচালক', roleEn: 'Director', tin: '739571589984', nid: '7783420107', address: 'House No-B19, Road No-01, West Rampura, Dhaka-1219' },
    { sl: 40, name: 'ABBAS UDDIN AHMED', roleBn: 'পরিচালক', roleEn: 'Director', tin: '885903303272', nid: '5078564431', address: '4/2/A, Simson Road, Sadarghat, Sutrapur, Dhaka' },
    { sl: 41, name: 'MD. NAZMUL HOQUE', roleBn: 'পরিচালক', roleEn: 'Director', tin: '373923339825', nid: '19940610754000047', address: 'House No-23, Road No-8/2, Block-E, South Banasree, Khilgaon' },
    { sl: 42, name: 'ABDUL MATIN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '274148689384', nid: '4611550155', address: 'Vill- Rani Sar, P.S- Gosairhat-8050, Dist- Shariatpur' },
    { sl: 43, name: 'SULTAN AHMED', roleBn: 'পরিচালক', roleEn: 'Director', tin: '594201699152', nid: '9132519068', address: 'Flat No-2/C, 201, Shantibagh, Malibagh, Dhaka-1217' },
    { sl: 44, name: 'MD. ALTAF HOSSAIN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '182752471124', nid: '5058046565', address: 'Flat No-2/C, 201, Shantibagh, Malibagh, Dhaka' },
    { sl: 45, name: 'HASAN ADIL', roleBn: 'পরিচালক', roleEn: 'Director', tin: '483491420133', nid: '4172836639', address: '162, Shohid Sayed Nazrul Islam Saroni, Purana Paltan, Dhaka' },
    { sl: 46, name: 'HABIBA AKTER', roleBn: 'পরিচালক', roleEn: 'Director', tin: '529131772142', nid: '5563788966', address: 'Bhoranda, Tongi Bari, Dist- Munshiganj' },
    { sl: 47, name: 'ABDUL AWAL', roleBn: 'পরিচালক', roleEn: 'Director', tin: '171272783181', nid: '2402492314', address: 'Kholil Sahebar Bari, Sonaimuri, Dist- Noakhali' },
    { sl: 48, name: 'MD ABDUR RASHID', roleBn: 'পরিচালক', roleEn: 'Director', tin: '111789995995', nid: '6420805597', address: 'Hasnabad, South Keraniganj, Dhaka-1311' },
    { sl: 49, name: 'MD. MAHMUDUL HASAN', roleBn: 'পরিচালক', roleEn: 'Director', tin: '789593635785', nid: '5107302670', address: 'Vill- VADRA Shimul-1960, Bhuapur, Dist- Tangail' }
  ]

  const categories = [
    { id: 'all', labelBn: 'সকল ডকুমেন্টস', labelEn: 'All Documents' },
    { id: 'incorporation', labelBn: 'আরজেএসসি নিবন্ধন ও ফর্ম ১২', labelEn: 'RJSC Incorporation & Form XII' },
    { id: 'tax', labelBn: 'এনবিআর টিআইএন সনদ', labelEn: 'NBR Taxpayer TIN' },
    { id: 'trade', labelBn: 'ডিএনসিসি ট্রেড লাইসেন্স', labelEn: 'DNCC Trade License' },
    { id: 'moa', labelBn: 'মেমোরেন্ডাম ও এওএ', labelEn: 'Memorandum (MoA & AoA)' }
  ]

  const filteredDocs = legalDocuments.filter(
    doc => activeTab === 'all' || doc.category === activeTab
  )

  const filteredDirectors = DIRECTORS_ROSTER.filter(d => {
    const q = directorSearch.toLowerCase().trim()
    if (!q) return true
    return (
      d.name.toLowerCase().includes(q) ||
      d.tin.includes(q) ||
      d.nid.includes(q) ||
      d.roleEn.toLowerCase().includes(q) ||
      d.roleBn.includes(q) ||
      d.address.toLowerCase().includes(q)
    )
  })

  return (
    <main className="legal-page-main">
      {/* 1. HERO HEADER */}
      <section className="legal-hero-section">
        <div className="section-container">
          <div className="legal-hero-grid">
            <div className="legal-hero-left-rail">
              <span className="legal-vertical-text">
                {isBn ? 'সংবিধিবদ্ধ অনুমোদন ও আইনি বৈধতা' : 'STATUTORY COMPLIANCE & LEGAL APPROVALS'}
              </span>
              <span className="legal-vertical-line" />
            </div>

            <div className="legal-hero-center-col">
              <div className="legal-kicker-row">
                <span className="legal-kicker-gold-bar" />
                <span className="legal-kicker-label">
                  {isBn ? 'স্বচ্ছতা ও সরকারি নিবন্ধন' : 'OFFICIAL REGISTRATION & TRANSPARENCY'}
                </span>
              </div>

              <h1 className="legal-hero-title">
                {isBn ? (
                  <>
                    <span className="text-navy">আইনগত ডকুমেন্টস ও </span>
                    <span className="text-green">সরকারি অনুমোদন</span>
                  </>
                ) : (
                  <>
                    <span className="text-navy">Corporate Legal Documents & </span>
                    <span className="text-green">Regulatory Approvals</span>
                  </>
                )}
              </h1>

              <div className="legal-hero-divider" aria-hidden="true">
                <span className="divider-seg-green" />
                <span className="divider-seg-gold" />
              </div>

              <p className="legal-hero-subtitle">
                {isBn
                  ? 'এলিট আইকোনিক প্রোপার্টিস এন্ড কন্সট্রাকশন লিঃ বাংলাদেশ সরকারের কোম্পানি আইন ১৯৯৪ অনুযায়ী আরজেএসসি, জাতীয় রাজস্ব বোর্ড (এনবিআর) এবং ঢাকা উত্তর সিটি কর্পোরেশন কর্তৃক সম্পূর্ণ নিবন্ধিত ও আইনসম্মত প্রতিষ্ঠান।'
                  : 'Elite Iconic Properties & Construction Ltd. is a fully incorporated corporate entity under The Companies Act 1994, certified by RJSC, National Board of Revenue (NBR), and Dhaka North City Corporation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY VERIFICATION STRIP */}
      <section className="legal-verification-strip-section">
        <div className="section-container">
          <div className="legal-verification-strip">
            <div className="verification-item">
              <Building2 size={24} className="text-green" />
              <div className="verification-text">
                <span className="v-label">{isBn ? 'আরজেএসসি নিবন্ধন নং' : 'RJSC Registration No'}</span>
                <strong>C-213460 (25-AUG-26)</strong>
              </div>
            </div>

            <div className="verification-divider" />

            <div className="verification-item">
              <Landmark size={24} className="text-gold" />
              <div className="verification-text">
                <span className="v-label">{isBn ? 'টিআইএন (এনবিআর জোন ০৫)' : 'Taxpayer TIN (NBR)'}</span>
                <strong>582155727196</strong>
              </div>
            </div>

            <div className="verification-divider" />

            <div className="verification-item">
              <Award size={24} className="text-green" />
              <div className="verification-text">
                <span className="v-label">{isBn ? 'ডিএনসিসি ট্রেড লাইসেন্স নং' : 'DNCC E-Trade License'}</span>
                <strong>TRAD/DNCC/018373/2026</strong>
              </div>
            </div>

            <div className="verification-divider" />

            <div className="verification-item">
              <Scale size={24} className="text-gold" />
              <div className="verification-text">
                <span className="v-label">{isBn ? 'অনুমোদিত মূলধন' : 'Authorized Capital'}</span>
                <strong>BDT 50,000,000 (৫ কোটি)</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS */}
      <section className="legal-filter-section">
        <div className="section-container">
          <div className="legal-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`legal-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span>{isBn ? cat.labelBn : cat.labelEn}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DOCUMENTS DETAILED SHOWCASE */}
      <section className="legal-docs-showcase-section">
        <div className="section-container">
          <div className="legal-detailed-list">
            {filteredDocs.map((doc, idx) => (
              <article key={doc.id} className="legal-detail-card">
                {/* Left: Interactive Document Paper Frame */}
                <div className="legal-doc-paper-col">
                  <div className="legal-doc-paper-frame" onClick={() => setPreviewModalDoc(doc)}>
                    <img 
                      src={doc.previewImg} 
                      alt={isBn ? doc.titleBn : doc.titleEn}
                      className="legal-doc-paper-img"
                    />
                    <div className="legal-doc-paper-hover">
                      <div className="legal-zoom-pill">
                        <Eye size={16} />
                        <span>{isBn ? 'বড় করে পড়ুন' : 'Inspect Full Document'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="legal-doc-paper-caption">
                    <CheckCircle2 size={14} className="text-green" />
                    <span>{isBn ? 'ডিজিটাল সত্যায়িত কপি' : 'Official Digitally Signed Document'}</span>
                  </div>
                </div>

                {/* Right: Rich Information Details */}
                <div className="legal-doc-content-col">
                  <div className="legal-doc-topline">
                    <span className="legal-tag-authority">{isBn ? doc.authorityBn : doc.authorityEn}</span>
                    <span className="legal-tag-type">{isBn ? doc.docTypeBn : doc.docTypeEn}</span>
                  </div>

                  <h2 className="legal-doc-title">{isBn ? doc.titleBn : doc.titleEn}</h2>

                  <div className="legal-reg-pill-row">
                    <div className="legal-number-box">
                      <span className="num-label">{isBn ? 'নিবন্ধন / সনদ নম্বর' : 'Official Reference ID'}:</span>
                      <strong>{doc.regNumber}</strong>
                    </div>
                    <div className="legal-date-box">
                      <span className="num-label">{isBn ? 'ইস্যু তারিখ' : 'Issued Date'}:</span>
                      <span>{doc.issueDate}</span>
                    </div>
                  </div>

                  <p className="legal-doc-summary">{isBn ? doc.summaryBn : doc.summaryEn}</p>

                  {/* Highlights Grid */}
                  <div className="legal-highlights-grid">
                    {doc.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="legal-h-item">
                        <span className="h-lbl">{isBn ? h.labelBn : h.labelEn}</span>
                        <strong className="h-val">{h.val}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="legal-doc-actions-bar">
                    <button
                      type="button"
                      className="legal-primary-btn"
                      onClick={() => setPreviewModalDoc(doc)}
                    >
                      <Eye size={16} />
                      <span>{isBn ? 'পূর্ণাঙ্গ ডকুমেন্ট প্রিভিউ' : 'Open Document Preview'}</span>
                    </button>

                    <a
                      href={doc.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="legal-secondary-btn"
                    >
                      <Download size={16} />
                      <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FORM XII DIRECTORS ROSTER TABLE SECTION */}
      <section className="legal-directors-table-section">
        <div className="section-container">
          <div className="legal-directors-header">
            <div className="directors-head-text">
              <span className="directors-head-kicker">
                <Users size={16} className="text-gold" />
                <span>{isBn ? 'কোম্পানি আইন ১৯৯৪ (ধারা ১১৫)' : 'THE COMPANIES ACT, 1994 (SECTION 115)'}</span>
              </span>
              <h3>{isBn ? 'আরজেএসসি ফর্ম ১২: পরিচালনা পর্ষদ ও উদ্যোক্তাদের সরকারি তালিকা' : 'RJSC Form XII: Official Statutory Roster of Directors & Promoters'}</h3>
              <p>
                {isBn 
                  ? 'বাণিজ্য মন্ত্রণালয়ের আরজেএসসিতে নিবন্ধিত ৪১+ পরিচালকের নাম, পদবি, কর শনাক্তকরণ নম্বর (TIN) এবং জাতীয় পরিচয়পত্রের সংবিধিবদ্ধ রেকর্ড।'
                  : 'Complete statutory particulars of 49 board directors and executive promoters registered with the Registrar of Joint Stock Companies (RJSC).'}
              </p>
            </div>

            <div className="directors-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder={isBn ? 'নাম, পদবি বা টিআইএন দিয়ে খুঁজুন...' : 'Search by name, role, TIN...'}
                value={directorSearch}
                onChange={(e) => setDirectorSearch(e.target.value)}
              />
              {directorSearch && (
                <button type="button" className="clear-search-btn" onClick={() => setDirectorSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Responsive Table */}
          <div className="legal-table-wrapper">
            <table className="legal-directors-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>{isBn ? 'ক্রমিক' : 'SL'}</th>
                  <th>{isBn ? 'পরিচালকের নাম' : 'Director Name'}</th>
                  <th>{isBn ? 'কোম্পানি পদবি' : 'Corporate Designation'}</th>
                  <th>{isBn ? 'ট্যাক্স টিআইএন (TIN)' : 'Taxpayer TIN'}</th>
                  <th>{isBn ? 'জাতীয় পরিচয়পত্র (NID)' : 'National ID (NID)'}</th>
                  <th>{isBn ? 'স্থায়ী ঠিকানা' : 'Usual Residential Address'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredDirectors.map((d) => (
                  <tr key={d.sl} className={d.sl <= 6 ? 'highlight-row' : ''}>
                    <td className="text-center font-bold" data-label={isBn ? 'ক্রমিক' : 'SL'}>{d.sl}</td>
                    <td data-label={isBn ? 'পরিচালকের নাম' : 'Director Name'}>
                      <strong className="director-name-cell">{d.name}</strong>
                    </td>
                    <td data-label={isBn ? 'কোম্পানি পদবি' : 'Designation'}>
                      <span className={`director-role-tag ${d.sl <= 6 ? 'executive' : 'director'}`}>
                        {isBn ? d.roleBn : d.roleEn}
                      </span>
                    </td>
                    <td data-label="TIN">
                      <code className="tin-badge">{d.tin}</code>
                    </td>
                    <td data-label="NID">
                      <span className="nid-cell">{d.nid}</span>
                    </td>
                    <td className="address-cell" data-label={isBn ? 'ঠিকানা' : 'Address'}>{d.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="directors-table-foot">
            <span>
              {isBn 
                ? `মোট ৪১ জন পরিচালকের মধ্যে ${filteredDirectors.length} জন প্রদর্শিত হচ্ছে। যৌথ মূলধন কোম্পানি পরিদপ্তরের ইস্যু নং ৬২৪০৩৮ দ্বারা সমর্থিত।`
                : `Showing ${filteredDirectors.length} of 49 directors from official RJSC filing Issue No. 624038.`}
            </span>
          </div>
        </div>
      </section>

      {/* 6. INVESTOR TRUST GUARANTEE BANNER */}
      <section className="legal-guarantee-section">
        <div className="section-container">
          <div className="legal-guarantee-card">
            <div className="guarantee-icon-col">
              <ShieldCheck size={54} className="text-gold" />
            </div>
            <div className="guarantee-text-col">
              <h3>{isBn ? '১০০% ঝামেলামুক্ত ও নিষ্কলঙ্ক জমি ক্রয়ের আইনি নিশ্চয়তা' : '100% Unencumbered & Safe Land Ownership Guarantee'}</h3>
              <p>
                {isBn 
                  ? 'ঢাকা আইকন সিটির প্রতিটি প্লট সিএস, এসএ, আরএস এবং বিএস খতিয়ান যাচাইকৃত, বায়া দলিল ও নামজারি খাজনা হালনাগাদ। আমাদের কর্পোরেট লিগ্যাল টিম ক্রেতাদের রেজিস্ট্রেশন ও মিউটেশন প্রক্রিয়ায় সার্বিক আইনি সহায়তা প্রদান করে।'
                  : 'Every plot at Dhaka Icon City is backed by verified CS, SA, RS, and BS Khatian records, clean title chains, and updated mutation tax clearance. Our in-house legal department ensures seamless sub-kabala deed transfer.'}
              </p>
              <div className="guarantee-pills-row">
                <span className="guarantee-pill"><CheckCircle2 size={14} className="text-green" /> {isBn ? 'সিএস, এসএ, আরএস, বিএস যাচাইকৃত' : 'CS, SA, RS, BS Verified'}</span>
                <span className="guarantee-pill"><CheckCircle2 size={14} className="text-green" /> {isBn ? 'নিষ্কলঙ্ক বায়া দলিল' : 'Clear Title Ownership Chain'}</span>
                <span className="guarantee-pill"><CheckCircle2 size={14} className="text-green" /> {isBn ? 'তাৎক্ষণিক রেজিস্ট্রি ও নামজারি' : 'Direct Sub-Kabala Deed Handover'}</span>
              </div>
            </div>
            <div className="guarantee-cta-col">
              {onScheduleVisit ? (
                <button
                  type="button"
                  className="legal-guarantee-btn"
                  onClick={onScheduleVisit}
                >
                  <PhoneCall size={16} />
                  <span>{isBn ? 'সাইট ভিজিট শিডিউল করুন' : 'Schedule VIP Site Visit'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="legal-guarantee-btn"
                  onClick={() => navigateTo && navigateTo('home', 'booking-form-section')}
                >
                  <PhoneCall size={16} />
                  <span>{isBn ? 'আইনি পরামর্শ নিন' : 'Contact Legal Desk'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX PREVIEW MODAL */}
      {previewModalDoc && (
        <div className="legal-lightbox-backdrop" onClick={() => setPreviewModalDoc(null)}>
          <div className="legal-lightbox-modal full-preview" onClick={(e) => e.stopPropagation()}>
            <div className="legal-lightbox-head">
              <div className="legal-lightbox-title-box">
                <FileCheck size={20} className="text-green" />
                <div>
                  <h3>{isBn ? previewModalDoc.titleBn : previewModalDoc.titleEn}</h3>
                  <small>{isBn ? previewModalDoc.authorityBn : previewModalDoc.authorityEn} • {previewModalDoc.regNumber}</small>
                </div>
              </div>
              <div className="legal-lightbox-actions">
                <a
                  href={previewModalDoc.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-btn-download mini"
                >
                  <Download size={15} />
                  <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
                </a>
                <button
                  type="button"
                  className="legal-lightbox-close"
                  onClick={() => setPreviewModalDoc(null)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="legal-lightbox-body">
              <img 
                src={previewModalDoc.previewImg} 
                alt={isBn ? previewModalDoc.titleBn : previewModalDoc.titleEn}
                className="legal-lightbox-img"
              />
            </div>

            <div className="legal-lightbox-foot">
              <span>{isBn ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত ও সংরক্ষিত ডিজিটাল নথি' : 'Officially Registered & Digitally Authenticated Government Document'}</span>
              <strong>{previewModalDoc.regNumber}</strong>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

