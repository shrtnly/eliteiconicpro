import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  Home,
  LayoutDashboard,
  Building2,
  Users,
  ThumbsUp,
  ArrowLeftRight,
  Boxes,
  FolderKanban,
  Map,
  UserCircle2,
  LayoutGrid,
  ChevronDown,
  Layers,
  Search,
  Mic,
  Bell,
  Settings,
  Calendar,
  Download,
  Plus,
  Landmark,
  Wallet,
  Tag,
  Info,
  SlidersHorizontal,
  LogOut,
  X,
  AlertTriangle,
  Loader2,
  ShieldAlert,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Receipt,
  FileText,
  BadgeCheck,
  Target,
  Trophy,
  BarChart3,
  Award,
  TrendingUp,
  User,
  Shield,
  ShieldCheck,
  Key,
  Lock,
  Smartphone,
  Save,
  Activity,
  Briefcase,
  MapPin,
  CheckSquare,
  ListTodo,
  Compass
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import './AdminDashboard.css'

const LEADS_TABLE = 'Schedule & Consultation'

// Primary Navigation Items matching the revised schema:
// - Dashboard
// - Properties
// - CRM
// - Deals
// - Transaction
// -- More
const PRIMARY_NAV = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'crm', label: 'CRM', icon: Users },
  { id: 'deals', label: 'Deals', icon: ThumbsUp },
  { id: 'transactions', label: 'Transaction', icon: ArrowLeftRight }
]

// Dropdown Navigation Items under "More":
// - Inventory
// - Project Management
// - Land Management
// - Clients
const MORE_NAV_LINKS = [
  { id: 'inventory', label: 'Inventory', labelBn: 'ম্যাটেরিয়াল ও স্টক', icon: Boxes },
  { id: 'project-mgmt', label: 'Project Management', labelBn: 'প্রজেক্ট ও কনস্ট্রাকশন প্ল্যান', icon: FolderKanban },
  { id: 'land-mgmt', label: 'Land Management', labelBn: 'জমি ক্রয় ও সীমানা', icon: Map },
  { id: 'clients', label: 'Clients', labelBn: 'গ্রাহক ও বায়ার তালিকা', icon: UserCircle2 }
]
export const MORE_FEATURED_LINKS = MORE_NAV_LINKS

// Dynamic Tab Configuration with Titles, Subtitles, and Submenus
export const TAB_CONFIG = {
  overview: {
    title: 'Dashboard Overview',
    subtitle: 'Real-time performance, asset valuations & sales summary',
    submenus: [
      { id: 'all', label: 'Overview' },
      { id: 'analytics', label: 'Status Analysis' },
      { id: 'revenue', label: 'Revenue Generation' },
      { id: 'properties-preview', label: 'Properties Showcase' }
    ]
  },
  properties: {
    title: 'Properties & Plots',
    subtitle: 'Manage land plots, ongoing projects, buildings, floors, and individual flats',
    submenus: [
      { id: 'Plot', label: 'Plot' },
      { id: 'Project', label: 'Project' },
      { id: 'Building', label: 'Building' },
      { id: 'Floor', label: 'Floor' },
      { id: 'Flat', label: 'Flat' }
    ]
  },
  crm: {
    title: 'CRM & Lead Pipeline',
    subtitle: 'Manage client communications and lead stages from New Lead to Converted',
    submenus: [
      { id: 'New Lead', label: 'New Lead' },
      { id: 'Contacted', label: 'Contacted' },
      { id: 'Interested', label: 'Interested' },
      { id: 'Site Visit', label: 'Site Visit' },
      { id: 'Negotiation', label: 'Negotiation' },
      { id: 'Booking', label: 'Booking' },
      { id: 'Converted', label: 'Converted' }
    ]
  },
  deals: {
    title: 'Deals Pipeline',
    subtitle: 'Track active negotiations, counters, and accepted sales contracts',
    submenus: [
      { id: 'all', label: 'All Deals' },
      { id: 'Accepted', label: 'Accepted (1,037)' },
      { id: 'Counter Offer', label: 'Counter Offers (166)' },
      { id: 'Rejected', label: 'Rejected (486)' }
    ]
  },
  transactions: {
    title: 'Transactions & Collections',
    subtitle: 'Financial ledger, booking advances, bank transfers & installment logs',
    submenus: [
      { id: 'all', label: 'All Transactions' },
      { id: 'Completed', label: 'Completed' },
      { id: 'Processing', label: 'Processing' },
      { id: 'Booking Advance', label: 'Booking Advances' },
      { id: 'Installment', label: 'Installments' }
    ]
  },
  inventory: {
    title: 'Inventory & Materials',
    subtitle: 'Construction materials, rebar, cement, and engineering supply reserves',
    submenus: [
      { id: 'all', label: 'All Materials' },
      { id: 'Civil & Structural', label: 'Civil & Structural' },
      { id: 'Steel & Metal', label: 'Steel & Metal' },
      { id: 'Aggregates', label: 'Aggregates & Sand' },
      { id: 'low-stock', label: 'Low Stock Alerts' }
    ]
  },
  'project-mgmt': {
    title: 'Project Management',
    subtitle: 'Dhaka Icon City infrastructure milestones, zones, and site engineering',
    submenus: [
      { id: 'all', label: 'All Phases' },
      { id: 'Sector A VIP Zone', label: 'Sector A Lakefront' },
      { id: 'Central Avenue', label: 'Central Avenue' },
      { id: 'Sector B Residential', label: 'Sector B Residential' },
      { id: 'On Track', label: 'On Track' }
    ]
  },
  'land-mgmt': {
    title: 'Land Management & Records',
    subtitle: 'Mouza records, CS/SA/RS/BS khatians, mutation documents, and zoning',
    submenus: [
      { id: 'all', label: 'All Land Parcels' },
      { id: 'Boro Kalia', label: 'Boro Kalia Mouza' },
      { id: 'Chhoto Kalia', label: 'Chhoto Kalia Mouza' },
      { id: 'Mutation Complete', label: 'Mutation Complete' }
    ]
  },
  clients: {
    title: 'Clients & Inquiries',
    subtitle: '895 verified buyers and incoming property consultation requests',
    submenus: [
      { id: 'all', label: 'All Clients' },
      { id: 'inquiries', label: 'Website Inquiries' },
      { id: 'consultations', label: 'Consultation Bookings' }
    ]
  },
  agents: {
    title: 'Agents & Sales Team',
    subtitle: 'Senior sales directors, commercial consultants, and client advisors',
    submenus: [
      { id: 'all', label: 'All Agents' },
      { id: 'directors', label: 'Sales Directors' },
      { id: 'consultants', label: 'Consultants' }
    ]
  },
  profile: {
    title: 'Executive Profile & Strategic Command',
    subtitle: 'Performance analytics, active tasks, client portfolio, and information-based strategic roadmap',
    submenus: [
      { id: 'overview', label: 'Overview' },
      { id: 'performance', label: 'Performance' },
      { id: 'tasks', label: 'Tasks & Milestones' },
      { id: 'clients', label: 'Client Portfolio' },
      { id: 'strategy', label: 'Strategic Roadmap' },
      { id: 'general', label: 'Account Info' },
      { id: 'security', label: 'Security' }
    ]
  }
}

// Mock Inventory Data for Construction Materials
const INITIAL_INVENTORY = [
  { id: 'INV-101', name: 'Portland Composite Cement (Grade 43)', sku: 'CEM-PC-01', category: 'Civil & Structural', qty: 2450, unit: 'Bags', location: 'Central Warehouse Sector A', status: 'In Stock' },
  { id: 'INV-102', name: 'Deformed Steel Rebar 500W (16mm)', sku: 'STL-RB-16', category: 'Steel & Metal', qty: 18.5, unit: 'Tons', location: 'Site Yard Sector B', status: 'In Stock' },
  { id: 'INV-103', name: 'Coarse Sand (Sylhet FM 2.5)', sku: 'SND-SY-02', category: 'Aggregates', qty: 8400, unit: 'CFT', location: 'Riverfront Batching Plant', status: 'In Stock' },
  { id: 'INV-104', name: 'Stone Aggregate (3/4" Crushed)', sku: 'STN-AG-04', category: 'Aggregates', qty: 1200, unit: 'CFT', location: 'Batching Plant 1', status: 'Low Stock' },
  { id: 'INV-105', name: 'PVC Drainage Pipes 110mm (Class B)', sku: 'PIP-PVC-11', category: 'Plumbing & Drainage', qty: 320, unit: 'Lengths', location: 'Store Room 2', status: 'In Stock' },
  { id: 'INV-106', name: 'Underground Cable 4-Core 25mm²', sku: 'CBL-EL-25', category: 'Electrical', qty: 450, unit: 'Meters', location: 'Substation Yard', status: 'Adequate' }
]

// Mock Project Management Data
const INITIAL_PROJECTS = [
  { id: 'PRJ-01', name: 'Sector A Lakefront Promenade', zone: 'Sector A VIP Zone', lead: 'Engr. Tariqul Islam', progress: 85, budget: '$1.2M', deadline: '2024-09-30', status: 'On Track' },
  { id: 'PRJ-02', name: '120ft Main Boulevard Road Grid', zone: 'Central Avenue', lead: 'Engr. Nazmul Huda', progress: 72, budget: '$2.8M', deadline: '2024-11-15', status: 'In Progress' },
  { id: 'PRJ-03', name: 'Sector B Earth Filling & Compaction', zone: 'Sector B Residential', lead: 'Engr. Tanvir Ahmed', progress: 95, budget: '$950K', deadline: '2024-08-10', status: 'Near Completion' },
  { id: 'PRJ-04', name: 'Central Lake Retaining Wall & Drainage', zone: 'Eco Lake Park', lead: 'Engr. Mahbub Hasan', progress: 48, budget: '$1.5M', deadline: '2025-01-20', status: 'In Progress' },
  { id: 'PRJ-05', name: 'Substation & Underground Electrification', zone: 'Utility Grid North', lead: 'Engr. Asif Kamal', progress: 30, budget: '$820K', deadline: '2025-03-31', status: 'Planning' }
]

// Mock Land Management & Boundary Registry
const INITIAL_LAND_PARCELS = [
  { id: 'LND-201', mouza: 'Boro Kalia', dagNo: 'CS 1042 / RS 2311', khatian: 'BS 512', area: '12.50 Acres', deedNo: 'D-8841/2021', status: 'Mutation Complete', demarcation: 'Demarcated', zonedFor: 'Sector A Residential' },
  { id: 'LND-202', mouza: 'Boro Kalia', dagNo: 'CS 1055 / RS 2340', khatian: 'BS 520', area: '8.25 Acres', deedNo: 'D-9102/2022', status: 'Mutation Complete', demarcation: 'Pillars Installed', zonedFor: 'Sector A Lake View' },
  { id: 'LND-203', mouza: 'Chhoto Kalia', dagNo: 'CS 890 / RS 1782', khatian: 'BS 411', area: '15.00 Acres', deedNo: 'D-9934/2022', status: 'Mutation In Progress', demarcation: 'Survey Complete', zonedFor: '120ft Commercial Avenue' },
  { id: 'LND-204', mouza: 'Chhoto Kalia', dagNo: 'CS 915 / RS 1805', khatian: 'BS 430', area: '22.00 Acres', deedNo: 'D-10214/2023', status: 'Deed Registered', demarcation: 'Pending Demarcation', zonedFor: 'Sector B Residential' },
  { id: 'LND-205', mouza: 'Boro Kalia', dagNo: 'CS 1120 / RS 2490', khatian: 'BS 590', area: '6.40 Acres', deedNo: 'D-11005/2024', status: 'Mutation Complete', demarcation: 'Pillars Installed', zonedFor: 'Civic & Park Reserve' }
]

// Mock Transactions Data
const INITIAL_TRANSACTIONS = [
  { id: 'TXN-9021', client: 'Farhan Ahmed', type: 'Booking Advance', method: 'Bank Transfer (BRAC)', amount: '$29,000', plot: 'DIC-PL-101', status: 'Completed', date: '2024-06-25' },
  { id: 'TXN-9022', client: 'Nasir Uddin', type: 'Installment #1', method: 'Cheque (City Bank)', amount: '$90,000', plot: 'DIC-PL-104', status: 'Completed', date: '2024-06-23' },
  { id: 'TXN-9023', client: 'Dr. Shahin Alam', type: 'Down Payment', method: 'Direct Wire', amount: '$42,000', plot: 'DIC-PL-105', status: 'Completed', date: '2024-06-21' },
  { id: 'TXN-9024', client: 'Kazi Rahman', type: 'Token Booking', method: 'Pay Order (EBL)', amount: '$15,000', plot: 'DIC-PL-102', status: 'Processing', date: '2024-06-20' },
  { id: 'TXN-9025', client: 'Tanvir Hossain', type: 'Installment #2', method: 'Bank Transfer (Prime)', amount: '$19,000', plot: 'DIC-PL-103', status: 'Completed', date: '2024-06-19' },
  { id: 'TXN-9026', client: 'Rafiqul Islam', type: 'Token Booking', method: 'Pay Order', amount: '$10,000', plot: 'DIC-PL-106', status: 'Pending', date: '2024-06-18' }
]

// Superadmin whitelist for instantaneous admin console access
const SUPERADMIN_EMAILS = ['freeman.find@gmail.com']

// Featured Properties Hierarchy for Dhaka Icon City (Plot, Project, Building, Floor, Flat)
const INITIAL_PROPERTIES = [
  // --- PLOTS ---
  {
    code: 'DIC-PL-101',
    name: 'Residential Corner Plot',
    type: 'Plot',
    location: 'Dhaka Icon City • Sector A, Lakefacing',
    size: '5.00 Katha',
    price: '$145,000',
    numericPrice: 145000,
    status: 'Available',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'DIC-PL-102',
    name: 'Commercial Boulevard Front',
    type: 'Plot',
    location: 'Dhaka Icon City • Main 120ft Avenue',
    size: '8.00 Katha',
    price: '$320,000',
    numericPrice: 320000,
    status: 'In Negotiation',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'DIC-PL-103',
    name: 'Green View Residential',
    type: 'Plot',
    location: 'Dhaka Icon City • Block B, Park Facing',
    size: '3.50 Katha',
    price: '$95,000',
    numericPrice: 95000,
    status: 'Available',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'DIC-PL-104',
    name: 'Turag Riverfront Estate',
    type: 'Plot',
    location: 'Dhaka Icon City • VIP Waterfront Zone',
    size: '10.00 Katha',
    price: '$450,000',
    numericPrice: 450000,
    status: 'Reserved',
    category: 'Waterfront',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80'
  },

  // --- PROJECTS ---
  {
    code: 'PRJ-DIC-01',
    name: 'Dhaka Icon City Master Township',
    type: 'Project',
    location: 'Western Bypass Express Corridor',
    size: '64.15 Acres Masterplan',
    price: '$2B Asset Value',
    numericPrice: 2000000000,
    status: 'Active Development',
    category: 'Township',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'PRJ-EIT-02',
    name: 'Elite Iconic Twin Towers',
    type: 'Project',
    location: 'Sector A Commercial Core',
    size: '28-Storey Dual Commercial Hub',
    price: '$38M Valuation',
    numericPrice: 38000000,
    status: 'Under Construction',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'PRJ-LVP-03',
    name: 'Lake Promenade & Eco Park',
    type: 'Project',
    location: 'Central Lake Promenade Zone',
    size: '12.50 Acres Waterfront',
    price: '$15M Valuation',
    numericPrice: 15000000,
    status: 'Phase 1 Complete',
    category: 'Waterfront',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
  },

  // --- BUILDINGS ---
  {
    code: 'BLD-TW-A',
    name: 'Elite Iconic Tower A (Commercial)',
    type: 'Building',
    location: 'Sector A Commercial Core',
    size: '28 Floors • 180 Offices',
    price: '$20M Valuation',
    numericPrice: 20000000,
    status: 'Structural Ready',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'BLD-TW-B',
    name: 'Iconic Tower B (Residential)',
    type: 'Building',
    location: 'Sector A Central Boulevard',
    size: '24 Floors • 120 Suites',
    price: '$18M Valuation',
    numericPrice: 18000000,
    status: 'Finishing Works',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'BLD-CP-01',
    name: 'Central Pavilion & Clubhouse',
    type: 'Building',
    location: 'Eco Lakefront Promenade',
    size: '4 Floors • 45,000 sqft',
    price: '$4.5M Valuation',
    numericPrice: 4500000,
    status: 'Available',
    category: 'Civic',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },

  // --- FLOORS ---
  {
    code: 'FLR-TW-A-04',
    name: 'Tower A • 4th Floor Commercial',
    type: 'Floor',
    location: 'Elite Iconic Tower A',
    size: '8,500 sqft Open Floor',
    price: '$850,000',
    numericPrice: 850000,
    status: 'Available',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'FLR-TW-A-12',
    name: 'Tower A • 12th Floor Executive',
    type: 'Floor',
    location: 'Elite Iconic Tower A',
    size: '8,500 sqft Corporate Suite',
    price: '$980,000',
    numericPrice: 980000,
    status: 'In Negotiation',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'FLR-TW-B-08',
    name: 'Tower B • 8th Floor Residential',
    type: 'Floor',
    location: 'Iconic Tower B',
    size: '6,200 sqft (4 Units)',
    price: '$720,000',
    numericPrice: 720000,
    status: 'Available',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80'
  },

  // --- FLATS ---
  {
    code: 'FLT-B-801',
    name: 'Luxury 3-Bed Lakeview Suite',
    type: 'Flat',
    location: 'Tower B • Flat 8A (Corner Park Facing)',
    size: '2,150 sqft',
    price: '$215,000',
    numericPrice: 215000,
    status: 'Available',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'FLT-B-802',
    name: 'Executive 3-Bed Parkland Suite',
    type: 'Flat',
    location: 'Tower B • Flat 8B (Central Promenade)',
    size: '1,950 sqft',
    price: '$195,000',
    numericPrice: 195000,
    status: 'In Negotiation',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1502005229762-ae1b46000282?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'FLT-B-1401',
    name: 'Duplex Sky Penthouse Suite',
    type: 'Flat',
    location: 'Tower B • Level 14-15 Panoramic Lakeview',
    size: '4,200 sqft',
    price: '$520,000',
    numericPrice: 520000,
    status: 'Available',
    category: 'Waterfront',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80'
  },
  {
    code: 'FLT-B-503',
    name: 'Contemporary 2-Bed Smart Residence',
    type: 'Flat',
    location: 'Tower B • Flat 5C',
    size: '1,450 sqft',
    price: '$140,000',
    numericPrice: 140000,
    status: 'Reserved',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80'
  }
]

// Team Performance Leader Metrics
const TEAM_PERFORMANCE_LEADERS = [
  {
    id: 'salam',
    name: 'Engr. Md. Abdus Salam',
    shortName: 'Md. Salam',
    role: 'Director & Territory Head',
    team: 'Iconic Township Force',
    image: '/leaders/md-abdus-salam.jpg',
    fallback: '/leader-1.jpg',
    salesPercent: 96,
    target: '$5.0M',
    achieved: '$4.8M',
    deals: 38,
    targetHeight: 95,
    achievedHeight: 91,
    color: '#10b981',
    badgeClass: 'green'
  },
  {
    id: 'biplob',
    name: 'Biplob Kumar Barma',
    shortName: 'B. K. Barma',
    role: 'Senior Director & Squad Lead',
    team: 'Western Valley Team',
    image: '/leaders/biplob-kumar-barma.jpg',
    fallback: '/leader-2.jpg',
    salesPercent: 90,
    target: '$4.2M',
    achieved: '$3.8M',
    deals: 31,
    targetHeight: 84,
    achievedHeight: 76,
    color: '#2563eb',
    badgeClass: 'blue'
  },
  {
    id: 'sharif',
    name: 'Md. Saifullah Sharif',
    shortName: 'M. S. Sharif',
    role: 'Director & Territory Lead',
    team: 'Pushpo Eco City Team',
    image: '/leaders/md-saifullah-sharif.jpg',
    fallback: '/leader-3.jpg',
    salesPercent: 84,
    target: '$3.8M',
    achieved: '$3.2M',
    deals: 25,
    targetHeight: 76,
    achievedHeight: 64,
    color: '#7c3aed',
    badgeClass: 'purple'
  },
  {
    id: 'asha',
    name: 'Asha Khan',
    shortName: 'Asha Khan',
    role: 'Executive Sales Lead',
    team: 'Bay Icon Elite Squad',
    image: '/leaders/asha-khan.jpg',
    fallback: '/leader-4.jpg',
    salesPercent: 77,
    target: '$3.5M',
    achieved: '$2.7M',
    deals: 21,
    targetHeight: 70,
    achievedHeight: 54,
    color: '#0891b2',
    badgeClass: 'cyan'
  },
  {
    id: 'azharul',
    name: 'Md. Azharul Islam',
    shortName: 'M. Azharul',
    role: 'Director & Township Lead',
    team: 'Satellite City Force',
    image: '/leaders/md-azharul-islam.jpg',
    fallback: '/leader-5.jpg',
    salesPercent: 72,
    target: '$3.2M',
    achieved: '$2.3M',
    deals: 18,
    targetHeight: 64,
    achievedHeight: 46,
    color: '#f59e0b',
    badgeClass: 'yellow'
  }
]

// Profile Performance Tracking Data
const PROFILE_PERFORMANCE_METRICS = [
  { m: 'Jan', target: 80, achieved: 74, deals: 8, val: '$1.4M', pct: 92 },
  { m: 'Feb', target: 85, achieved: 82, deals: 11, val: '$1.8M', pct: 96 },
  { m: 'Mar', target: 90, achieved: 88, deals: 14, val: '$2.1M', pct: 98 },
  { m: 'Apr', target: 85, achieved: 90, deals: 16, val: '$2.6M', pct: 106 },
  { m: 'May', target: 95, achieved: 94, deals: 19, val: '$3.1M', pct: 99 },
  { m: 'Jun', target: 100, achieved: 98, deals: 22, val: '$3.8M', pct: 98 }
]

// Profile Administrative Tasks & Project Milestones
const INITIAL_PROFILE_TASKS = [
  { id: 'TSK-101', title: 'Sign off Turag Riverfront Sector A Masterplan Deed', project: 'Dhaka Icon City', priority: 'Urgent', due: 'Tomorrow', status: 'In Progress', progress: 75, category: 'Governance' },
  { id: 'TSK-102', title: 'Approve VIP Commercial Plot Booking #DIC-PL-102', project: 'Commercial Avenue', priority: 'High', due: '28 Jun 2024', status: 'In Progress', progress: 60, category: 'Sales' },
  { id: 'TSK-103', title: 'Review CS to BS Khatian Mutation Records for Boro Kalia', project: 'Land Banking', priority: 'Urgent', due: '30 Jun 2024', status: 'Pending', progress: 20, category: 'Legal' },
  { id: 'TSK-104', title: 'Audit Grade 60 Rebar & Cement Piling Supply Reserves', project: 'Pushpo Eco City', priority: 'Normal', due: '02 Jul 2024', status: 'Completed', progress: 100, category: 'Inventory' },
  { id: 'TSK-105', title: 'Conduct High-Net-Worth Diaspora Investor Briefing', project: 'Bay Icon Elite', priority: 'High', due: '05 Jul 2024', status: 'Completed', progress: 100, category: 'Client' },
  { id: 'TSK-106', title: 'Finalize Q3 Strategic Infrastructure Milestone Budget', project: 'Executive Board', priority: 'High', due: '07 Jul 2024', status: 'In Progress', progress: 45, category: 'Strategy' }
]

// High-Net-Worth & VIP Managed Clients Portfolio
const PROFILE_MANAGED_CLIENTS = [
  { id: 'CLI-01', name: 'Dr. Aminul Haque', company: 'Square Group & Diaspora Investor', project: 'Sector A VIP Estate • 10 Katha', val: '$1,250,000', status: 'Active Contract', health: '98%', next: 'Site Visit Confirmation' },
  { id: 'CLI-02', name: 'Engr. Kamal Hossain', company: 'Apex Holdings Consortium', project: '120ft Boulevard Commercial Plot', val: '$2,100,000', status: 'Installment Stage', health: '95%', next: '3rd Installment Wire' },
  { id: 'CLI-03', name: 'Farzana Chowdhury', company: 'Bay Luxury Retailing', project: 'Tower B Level 5 Executive Flat', val: '$480,000', status: 'Final Registration', health: '92%', next: 'Deed Handover' },
  { id: 'CLI-04', name: 'Kazi Rahman', company: 'Rahman Enterprise USA', project: 'Turag Riverfront Promenade Plot', val: '$850,000', status: 'Negotiation', health: '88%', next: 'Counter Review' }
]

// Information-Based Strategic Roadmap & Core Execution Pillars
const PROFILE_STRATEGY_PILLARS = [
  { id: 'P1', title: 'Strategic Land Banking & Mouza Expansion', metric: '180 / 200 Acres (90%)', pct: 90, color: '#10b981', signal: 'GIS soil analysis approved; Boro Kalia Mouza mutations 85% certified', outcome: '+42 Acres added to land bank reserve' },
  { id: 'P2', title: 'Masterplan Infrastructure Velocity', metric: '12km Paved (88%)', pct: 88, color: '#2563eb', signal: '120ft Central Boulevard paver complete, riverside embankment piling on track', outcome: 'Plot handover timeline advanced by 4 months' },
  { id: 'P3', title: 'High-Net-Worth Diaspora Capital Mobilization', metric: '$18.4M / $20M (92%)', pct: 92, color: '#7c3aed', signal: 'UAE & UK roadshow interest yields 38 confirmed plot reservations', outcome: '$18.4M committed development capital' },
  { id: 'P4', title: 'Digital CRM & Data Conversion Automation', metric: '96% Pipeline Transparency', pct: 96, color: '#0891b2', signal: 'Real-time Supabase consultations reduced lead response time to 14 mins', outcome: 'Lead-to-booking conversion up by 18.2%' }
]

// Mock CRM Pipeline Records across the 7 requested stages:
// New Lead, Contacted, Interested, Site Visit, Negotiation, Booking, Converted
const INITIAL_CRM_PIPELINE = [
  // New Lead
  { id: 'CRM-1001', name: 'Zahirul Islam', phone: '+880 1711-223344', email: 'zahirul.islam@gmail.com', plotPreference: 'Sector A • 5 Katha Lakefacing', source: 'Website Inquiry', stage: 'New Lead', date: '2024-06-25', agent: 'Tahmina Akter' },
  { id: 'CRM-1002', name: 'Nusrat Jahan', phone: '+880 1822-334455', email: 'nusrat.j@yahoo.com', plotPreference: 'Sector B • 3.5 Katha Residential', source: 'Facebook Lead Ad', stage: 'New Lead', date: '2024-06-25', agent: 'Sabbir Ahmed' },

  // Contacted
  { id: 'CRM-1003', name: 'Engr. Kamal Hossain', phone: '+880 1912-556677', email: 'kamal.engr@outlook.com', plotPreference: '120ft Main Boulevard • Commercial', source: 'Direct Call', stage: 'Contacted', date: '2024-06-24', agent: 'Mahadi Hasan' },
  { id: 'CRM-1004', name: 'Farzana Chowdhury', phone: '+880 1618-990011', email: 'farzana.ch@gmail.com', plotPreference: 'Tower B • 3-Bed Luxury Flat', source: 'Walk-in Pavilion', stage: 'Contacted', date: '2024-06-23', agent: 'Tahmina Akter' },

  // Interested
  { id: 'CRM-1005', name: 'Dr. Aminul Haque', phone: '+880 1715-443322', email: 'dr.aminul@square.com', plotPreference: 'Sector A VIP Zone • 10 Katha Estate', source: 'Referral', stage: 'Interested', date: '2024-06-22', agent: 'Mahadi Hasan' },
  { id: 'CRM-1006', name: 'Shahriar Kabir', phone: '+880 1819-112233', email: 'shahriar.kabir@dhaka.net', plotPreference: 'Sector B • Block B Park Facing', source: 'Website Inquiry', stage: 'Interested', date: '2024-06-21', agent: 'Sabbir Ahmed' },

  // Site Visit
  { id: 'CRM-1007', name: 'Moniruzzaman Monir', phone: '+880 1714-889900', email: 'monir.biz@gmail.com', plotPreference: 'Turag Riverfront Estate • Sector A', source: 'Consultation Booking', stage: 'Site Visit', date: '2024-06-20', agent: 'Imran Kabir' },
  { id: 'CRM-1008', name: 'Razia Sultana', phone: '+880 1911-667788', email: 'razia.sultana@apex.com', plotPreference: 'Sector A Lakeview Promenade', source: 'Website Schedule', stage: 'Site Visit', date: '2024-06-19', agent: 'Tahmina Akter' },

  // Negotiation
  { id: 'CRM-1009', name: 'Kazi Rahman', phone: '+880 1819-876543', email: 'kazi.rahman@enterprise.com', plotPreference: 'DIC-PL-102 Commercial 8 Katha', source: 'Corporate Direct', stage: 'Negotiation', date: '2024-06-18', agent: 'Sabbir Ahmed' },
  { id: 'CRM-1010', name: 'Rafiqul Islam', phone: '+880 1612-445566', email: 'rafiqul@beximco.net', plotPreference: 'Tower A Level 4 Commercial Floor', source: 'VIP Channel', stage: 'Negotiation', date: '2024-06-17', agent: 'Mahadi Hasan' },

  // Booking
  { id: 'CRM-1011', name: 'Farhan Ahmed', phone: '+880 1713-998877', email: 'farhan.ahmed@prime.com', plotPreference: 'DIC-PL-101 Residential 5 Katha', source: 'Online Booking', stage: 'Booking', date: '2024-06-16', agent: 'Mahadi Hasan' },
  { id: 'CRM-1012', name: 'Dr. Shahin Alam', phone: '+880 1711-556677', email: 'dr.shahin@apollo.com', plotPreference: 'DIC-PL-105 Sector A Lakeview', source: 'Consultation Booking', stage: 'Booking', date: '2024-06-15', agent: 'Sabbir Ahmed' },

  // Converted
  { id: 'CRM-1013', name: 'Nasir Uddin', phone: '+880 1819-334455', email: 'nasir.uddin@group.com', plotPreference: 'DIC-PL-104 Riverfront 10 Katha', source: 'VIP Client', stage: 'Converted', date: '2024-06-14', agent: 'Mahadi Hasan' },
  { id: 'CRM-1014', name: 'Tanvir Hossain', phone: '+880 1911-778899', email: 'tanvir.hossain@bank.com', plotPreference: 'Tower B Flat 8A Luxury Suite', source: 'Direct Referral', stage: 'Converted', date: '2024-06-12', agent: 'Tahmina Akter' }
]

// Mock Deals Data matching the status analysis metrics
const INITIAL_DEALS = [
  { id: 'DL-8901', client: 'Farhan Ahmed', plot: 'DIC-PL-101', value: '$145,000', status: 'Accepted', date: '2024-06-25', agent: 'Mahadi Hasan' },
  { id: 'DL-8902', client: 'Kazi Rahman', plot: 'DIC-PL-102', value: '$320,000', status: 'Counter Offer', date: '2024-06-24', agent: 'Sabbir Ahmed' },
  { id: 'DL-8903', client: 'Nasir Uddin', plot: 'DIC-PL-104', value: '$450,000', status: 'Accepted', date: '2024-06-22', agent: 'Mahadi Hasan' },
  { id: 'DL-8904', client: 'Tanvir Hossain', plot: 'DIC-PL-103', value: '$95,000', status: 'Rejected', date: '2024-06-20', agent: 'Tahmina Akter' },
  { id: 'DL-8905', client: 'Dr. Shahin Alam', plot: 'DIC-PL-105', value: '$210,000', status: 'Accepted', date: '2024-06-19', agent: 'Sabbir Ahmed' },
  { id: 'DL-8906', client: 'Rafiqul Islam', plot: 'DIC-PL-106', value: '$180,000', status: 'Counter Offer', date: '2024-06-18', agent: 'Tahmina Akter' }
]

// Mock Agent Roster
const INITIAL_AGENTS = [
  { id: 'AG-101', name: 'Mahadi Hasan', role: 'Senior Sales Director', phone: '+880 1712-345678', email: 'mahadi@dreamzone.com', activeDeals: 14, closedValue: '$4.2M', rating: '4.9' },
  { id: 'AG-102', name: 'Sabbir Ahmed', role: 'Commercial Lead Specialist', phone: '+880 1819-876543', email: 'sabbir@dreamzone.com', activeDeals: 9, closedValue: '$2.8M', rating: '4.8' },
  { id: 'AG-103', name: 'Tahmina Akter', role: 'Residential Consultant', phone: '+880 1911-234567', email: 'tahmina@dreamzone.com', activeDeals: 12, closedValue: '$3.1M', rating: '4.9' },
  { id: 'AG-104', name: 'Imran Kabir', role: 'VIP Client Advisor', phone: '+880 1612-987654', email: 'imran@dreamzone.com', activeDeals: 7, closedValue: '$1.9M', rating: '4.7' }
]

const fmtDate = (v) => {
  if (!v) return '—'
  const d = new Date(v)
  return isNaN(d) ? String(v) : d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
const dayKey = (v) => new Date(v).toISOString().slice(0, 10)

function downloadCsv(filename, rows) {
  if (!rows.length) return
  const cols = Object.keys(rows[0])
  const esc = (x) => `"${String(x ?? '').replace(/"/g, '""')}"`
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminDashboard({ user, navigateTo, onLogout }) {
  const [profile, setProfile] = useState(null)
  const [authState, setAuthState] = useState('checking')
  const [tab, setTab] = useState('overview')
  const [activeSubTab, setActiveSubTab] = useState('all')
  const [leads, setLeads] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [, setUsers] = useState([])
  const [, setLoading] = useState(false)
  const [notices, setNotices] = useState([])
  const [query, setQuery] = useState('')
  const [crmStatusFilter, setCrmStatusFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [propertySearch, setPropertySearch] = useState('')
  const [propertyCategory, setPropertyCategory] = useState('All')
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '+880 1711-223344',
    designation: 'Managing Director & Principal Administrator',
    department: 'Executive Operations & Real Estate Development',
    location: 'Dhaka Icon City Corporate HQ, Banani, Dhaka',
    bio: 'Overseeing masterplan developments, land acquisition, luxury township governance, and high-value investor relations across Elite Iconic Properties & Construction Ltd.'
  })
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirmPass: '' })
  const [passwordMsg, setPasswordMsg] = useState(null)
  const [profileTasks, setProfileTasks] = useState(INITIAL_PROFILE_TASKS)
  const [taskFilter, setTaskFilter] = useState('all')

  const toggleTaskStatus = (id) => {
    setProfileTasks(prev => prev.map(t => {
      if (t.id === id) {
        const isComp = t.status === 'Completed'
        return {
          ...t,
          status: isComp ? 'In Progress' : 'Completed',
          progress: isComp ? 60 : 100
        }
      }
      return t
    }))
  }

  const moreMenuRef = useRef(null)
  const profileMenuRef = useRef(null)
  const verifiedUserIdRef = useRef(null)
  const initialLoadDoneRef = useRef(false)

  const isSuperAdmin = Boolean(user?.email && SUPERADMIN_EMAILS.includes(user.email.toLowerCase().trim()))
  const isAdmin = profile?.role === 'admin' || isSuperAdmin

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false)
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // --- Access check (With identity caching to prevent tab-switching reload/flicker) ---
  useEffect(() => {
    let cancelled = false
    async function check() {
      if (!user) { 
        verifiedUserIdRef.current = null
        setAuthState('guest')
        return 
      }

      // If this user ID was already verified, do NOT show loading screen or re-verify on tab switch
      if (verifiedUserIdRef.current === user.id && authState === 'ok') {
        return
      }

      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
      if (cancelled) return

      if (isSuperAdmin) {
        verifiedUserIdRef.current = user.id
        setProfile({
          id: user.id,
          email: user.email,
          full_name: data?.full_name || user.user_metadata?.full_name || 'Administrator',
          role: 'admin',
          status: 'active',
          ...(data || {})
        })
        setAuthState('ok')

        if (!data || data.role !== 'admin' || data.status !== 'active') {
          supabase.from('profiles').upsert({
            id: user.id,
            email: user.email,
            full_name: data?.full_name || user.user_metadata?.full_name || 'Administrator',
            role: 'admin',
            status: 'active'
          }).then(() => {}).catch(() => {})
        }
        return
      }

      if (error || !data || data.status !== 'active' || !['admin', 'staff'].includes(data.role)) {
        verifiedUserIdRef.current = null
        setProfile(data || null)
        setAuthState('denied')
        return
      }

      verifiedUserIdRef.current = user.id
      setProfile(data)
      setAuthState('ok')
    }

    // Only set 'checking' if we don't already have a valid session for this user
    if (verifiedUserIdRef.current !== user?.id) {
      setAuthState('checking')
    }
    check()
    return () => { cancelled = true }
  }, [user?.id, user?.email, isSuperAdmin, authState])

  const loadAll = useCallback(async () => {
    setLoading(true)
    const msgs = []

    const leadRes = await supabase.from(LEADS_TABLE).select('*').order('created_at', { ascending: false }).limit(2000)
    if (leadRes.error) msgs.push(`Leads: ${leadRes.error.message}`)
    setLeads(leadRes.data || [])

    let inqRes = await supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(1000)
    if (inqRes.error) inqRes = await supabase.from('inquiries').select('*').limit(1000)
    if (inqRes.error) msgs.push(`Inquiries: ${inqRes.error.message}`)
    setInquiries(inqRes.data || [])

    if (isAdmin) {
      const userRes = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(1000)
      if (userRes.error) msgs.push(`Users: ${userRes.error.message}`)
      setUsers(userRes.data || [])
    }

    setNotices(msgs)
    setLoading(false)
  }, [isAdmin])

  // Run initial data load once upon verified authentication
  useEffect(() => { 
    if (authState === 'ok' && !initialLoadDoneRef.current) {
      initialLoadDoneRef.current = true
      loadAll() 
    } 
  }, [authState, loadAll])

  // Sync profile details into profile form when loaded
  useEffect(() => {
    if (profile || user) {
      setProfileForm(prev => ({
        ...prev,
        fullName: profile?.full_name || user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Administrator'),
        phone: profile?.phone || prev.phone
      }))
    }
  }, [profile, user])

  const switchTab = (id) => { 
    setTab(id)
    if (id === 'properties') {
      setActiveSubTab('Plot')
    } else if (id === 'crm') {
      setActiveSubTab('New Lead')
    } else if (id === 'profile') {
      setActiveSubTab('overview')
    } else {
      setActiveSubTab('all')
    }
    setQuery('')
    setMoreMenuOpen(false)
  }

  const handleSaveProfile = async (e) => {
    e?.preventDefault?.()
    setSaving(true)
    try {
      if (user?.id) {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: profileForm.fullName,
          phone: profileForm.phone,
          updated_at: new Date().toISOString()
        })
      }
      setProfile(prev => ({
        ...(prev || {}),
        full_name: profileForm.fullName,
        phone: profileForm.phone
      }))
      setNotices(['✅ Admin profile saved successfully!'])
    } catch (err) {
      console.warn('Profile sync:', err)
      setProfile(prev => ({
        ...(prev || {}),
        full_name: profileForm.fullName,
        phone: profileForm.phone
      }))
      setNotices(['✅ Profile updated locally!'])
    } finally {
      setSaving(false)
    }
  }

  const handleUpdatePassword = async (e) => {
    e?.preventDefault?.()
    if (!passwordForm.newPass || passwordForm.newPass !== passwordForm.confirmPass) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match or cannot be empty.' })
      return
    }
    if (passwordForm.newPass.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' })
      return
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: passwordForm.newPass })
      if (error) throw error
      setPasswordMsg({ type: 'success', text: 'Security credentials updated successfully!' })
      setPasswordForm({ current: '', newPass: '', confirmPass: '' })
      setNotices(['🔐 Password updated successfully!'])
    } catch (err) {
      setPasswordMsg({ type: 'error', text: err.message || 'Failed to update password.' })
    }
  }

  const handleSignOut = async () => {
    try {
      if (onLogout) {
        await onLogout()
      } else {
        await supabase.auth.signOut()
      }
    } finally {
      navigateTo('login')
    }
  }

  // Filtered Properties with dynamic subtab filter (Plot, Project, Building, Floor, Flat)
  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((p) => {
      const matchSearch = !propertySearch || 
        p.name.toLowerCase().includes(propertySearch.toLowerCase()) ||
        p.code.toLowerCase().includes(propertySearch.toLowerCase()) ||
        p.location.toLowerCase().includes(propertySearch.toLowerCase())
      
      let matchSubTab = true
      if (tab === 'properties') {
        const targetType = (activeSubTab && activeSubTab !== 'all') ? activeSubTab : 'Plot'
        matchSubTab = p.type === targetType
      }

      const matchCategory = propertyCategory === 'All' || p.category === propertyCategory
      return matchSearch && matchSubTab && matchCategory
    })
  }, [propertySearch, propertyCategory, tab, activeSubTab])

  // Filtered Leads / CRM with dynamic subtab filter for the 7 stages:
  // New Lead, Contacted, Interested, Site Visit, Negotiation, Booking, Converted
  const filteredCrmItems = useMemo(() => {
    const liveItems = [
      ...inquiries.map(inq => {
        let st = inq.stage || inq.status || 'New Lead'
        if (st.toLowerCase() === 'pending') st = 'New Lead'
        if (st.toLowerCase() === 'contacted') st = 'Contacted'
        if (st.toLowerCase() === 'scheduled') st = 'Site Visit'
        if (st.toLowerCase() === 'converted') st = 'Converted'
        return {
          id: inq.id,
          name: inq.name,
          displayName: inq.name,
          phone: inq.phone,
          email: inq.email,
          plotPreference: inq.plot_category ? `${inq.plot_category} (${inq.plot_size || ''})` : 'General Plot',
          source: 'Website Inquiry',
          stage: st,
          date: fmtDate(inq.created_at),
          agent: 'Unassigned',
          rawItem: inq
        }
      }),
      ...leads.map(ld => ({
        id: ld.id,
        name: ld.name,
        displayName: ld.name,
        phone: ld.phone,
        email: ld.email,
        plotPreference: ld.category || 'Consultation Visit',
        source: 'Site Consultation',
        stage: ld.stage || 'Site Visit',
        date: fmtDate(ld.created_at),
        agent: ld.agent || 'Front Desk',
        rawItem: ld
      }))
    ]

    const allRecords = [...liveItems, ...INITIAL_CRM_PIPELINE]

    return allRecords.filter(c => {
      let matchStage = true
      if (tab === 'crm') {
        const targetStage = (activeSubTab && activeSubTab !== 'all') ? activeSubTab : 'New Lead'
        matchStage = c.stage.toLowerCase() === targetStage.toLowerCase()
      }

      const matchesFilter = crmStatusFilter === 'all' || (c.stage && c.stage.toLowerCase() === crmStatusFilter.toLowerCase())
      const matchesQuery = !query || 
        (c.name && c.name.toLowerCase().includes(query.toLowerCase())) ||
        (c.phone && c.phone.includes(query)) ||
        (c.email && c.email.toLowerCase().includes(query.toLowerCase())) ||
        (c.plotPreference && c.plotPreference.toLowerCase().includes(query.toLowerCase()))

      return matchStage && matchesFilter && matchesQuery
    })
  }, [inquiries, leads, crmStatusFilter, query, tab, activeSubTab])

  // Filtered Deals with dynamic subtab filter
  const filteredDeals = useMemo(() => {
    if (tab !== 'deals' || activeSubTab === 'all') return INITIAL_DEALS
    return INITIAL_DEALS.filter(d => d.status.toLowerCase() === activeSubTab.toLowerCase())
  }, [tab, activeSubTab])

  // Filtered Transactions with dynamic subtab filter
  const filteredTransactions = useMemo(() => {
    if (tab !== 'transactions' || activeSubTab === 'all') return INITIAL_TRANSACTIONS
    if (activeSubTab === 'Completed' || activeSubTab === 'Processing') {
      return INITIAL_TRANSACTIONS.filter(t => t.status.toLowerCase() === activeSubTab.toLowerCase())
    }
    return INITIAL_TRANSACTIONS.filter(t => t.type.toLowerCase().includes(activeSubTab.toLowerCase()))
  }, [tab, activeSubTab])

  // Filtered Inventory with dynamic subtab filter
  const filteredInventory = useMemo(() => {
    if (tab !== 'inventory' || activeSubTab === 'all') return INITIAL_INVENTORY
    if (activeSubTab === 'low-stock') {
      return INITIAL_INVENTORY.filter(i => i.status === 'Low Stock')
    }
    return INITIAL_INVENTORY.filter(i => i.category.toLowerCase().includes(activeSubTab.toLowerCase()))
  }, [tab, activeSubTab])

  // Filtered Projects with dynamic subtab filter
  const filteredProjects = useMemo(() => {
    if (tab !== 'project-mgmt' || activeSubTab === 'all') return INITIAL_PROJECTS
    if (activeSubTab === 'On Track') {
      return INITIAL_PROJECTS.filter(p => p.status === 'On Track')
    }
    return INITIAL_PROJECTS.filter(p => p.zone.toLowerCase().includes(activeSubTab.toLowerCase()))
  }, [tab, activeSubTab])

  // Filtered Land with dynamic subtab filter
  const filteredLandParcels = useMemo(() => {
    if (tab !== 'land-mgmt' || activeSubTab === 'all') return INITIAL_LAND_PARCELS
    if (activeSubTab === 'Mutation Complete') {
      return INITIAL_LAND_PARCELS.filter(p => p.status === 'Mutation Complete')
    }
    return INITIAL_LAND_PARCELS.filter(p => p.mouza.toLowerCase().includes(activeSubTab.toLowerCase()))
  }, [tab, activeSubTab])

  // Filtered Clients with dynamic subtab filter
  const filteredClientsInquiries = useMemo(() => {
    if (tab !== 'clients' || activeSubTab === 'all') return inquiries
    if (activeSubTab === 'consultations') return []
    return inquiries
  }, [inquiries, tab, activeSubTab])

  // Active Tab Metadata Configuration
  const curTabConfig = TAB_CONFIG[tab] || TAB_CONFIG.overview

  // Universal Export Handler
  const handleExportCurrentTab = () => {
    if (tab === 'overview') {
      downloadCsv(`dashboard-summary-${dayKey(Date.now())}.csv`, [
        { metric: 'Properties Managed', value: '4860' },
        { metric: 'Asset Value', value: '$2B' },
        { metric: 'Properties Sold', value: '1037' },
        { metric: 'New Clients', value: '895' },
        { metric: 'Inquiries', value: inquiries.length },
        { metric: 'Leads', value: leads.length }
      ])
    } else if (tab === 'properties') {
      downloadCsv('properties-catalog.csv', filteredProperties)
    } else if (tab === 'crm') {
      downloadCsv('crm-records.csv', filteredCrmItems)
    } else if (tab === 'deals') {
      downloadCsv('deals-pipeline.csv', filteredDeals)
    } else if (tab === 'transactions') {
      downloadCsv('transactions-ledger.csv', filteredTransactions)
    } else if (tab === 'inventory') {
      downloadCsv('construction-inventory.csv', filteredInventory)
    } else if (tab === 'project-mgmt') {
      downloadCsv('project-management.csv', filteredProjects)
    } else if (tab === 'land-mgmt') {
      downloadCsv('land-records.csv', filteredLandParcels)
    } else if (tab === 'clients') {
      downloadCsv('clients-inquiries.csv', filteredClientsInquiries)
    } else if (tab === 'agents') {
      downloadCsv('agents-roster.csv', INITIAL_AGENTS)
    }
  }

  // Is "More" active?
  const isMoreActive = ['inventory', 'project-mgmt', 'land-mgmt', 'clients'].includes(tab)

  // --- Gate screens ---
  if (authState !== 'ok') {
    return (
      <div className="adm-gate">
        <div className="adm-gate-card">
          {authState === 'checking' && (<><Loader2 className="adm-spin" size={30} /><h2>Verifying access…</h2></>)}
          {authState === 'guest' && (
            <>
              <ShieldAlert size={34} />
              <h2>Admin sign-in required</h2>
              <p>Please sign in with an administrator account to open the dashboard.</p>
              <button className="adm-btn adm-btn-primary" onClick={() => navigateTo('login')}>Go to Sign In</button>
            </>
          )}
          {authState === 'denied' && (
            <>
              <ShieldAlert size={34} />
              <h2>Access denied</h2>
              <p><strong>{user?.email}</strong> does not have admin or staff permissions.</p>
              <div className="adm-gate-actions">
                <button className="adm-btn adm-btn-primary" onClick={() => navigateTo('home')}>Back to Home</button>
                <button className="adm-btn adm-btn-secondary" onClick={handleSignOut}>Sign out</button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="adm-shell databrain-theme">
      {/* ====================================================================
          UNIVERSAL TOPBAR & LOGO (With Integrated Capsule Nav)
          ==================================================================== */}
      <header className="adm-universal-topbar">
        <div className="adm-topbar-left">
          {/* Official Company Logo */}
          <div 
            className="adm-topbar-brand" 
            onClick={() => switchTab('overview')} 
            title="Elite Iconic Properties & Construction Limited"
          >
            <img 
              src="/elite-iconic-logo.png" 
              alt="Elite Iconic Properties & Construction Limited" 
              className="adm-brand-logo-img"
            />
          </div>

          <div className="adm-search-pill">
            <Search size={16} />
            <input
              type="text"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* ==================================================================
            FLOATING CAPSULE NAVIGATION MENU (Inside Header)
            - Dashboard
            - Properties
            - CRM
            - Deals
            - Transaction
            -- More
            ================================================================== */}
        <div className="adm-capsule-nav-container">
          <div className="adm-capsule-nav-bar">
            {PRIMARY_NAV.map((nav) => {
              const NavIcon = nav.icon
              const isCur = tab === nav.id
              return (
                <button
                  key={nav.id}
                  type="button"
                  className={`adm-capsule-item ${isCur ? 'active' : ''}`}
                  onClick={() => switchTab(nav.id)}
                >
                  <NavIcon size={17} className="adm-capsule-icon" />
                  <span>{nav.label}</span>
                </button>
              )
            })}

            {/* More Dropdown */}
            <div className="adm-capsule-more-container" ref={moreMenuRef}>
              <button
                type="button"
                className={`adm-capsule-item adm-more-trigger ${isMoreActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setMoreMenuOpen(prev => !prev)
                }}
                aria-expanded={moreMenuOpen}
              >
                <LayoutGrid size={17} className="adm-capsule-icon" />
                <span>More</span>
                <ChevronDown size={14} className={`adm-capsule-chevron ${moreMenuOpen ? 'open' : ''}`} />
              </button>

              {/* Floating Dropdown for "More" */}
              {moreMenuOpen && (
                <>
                  <div 
                    className="adm-dropdown-backdrop" 
                    onClick={(e) => { e.stopPropagation(); setMoreMenuOpen(false); }} 
                  />
                  <div 
                    className="adm-capsule-dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="adm-dropdown-section-title">
                      MORE MODULES
                    </div>
                    <div className="adm-dropdown-grid">
                      {MORE_NAV_LINKS.map((item) => {
                        const ItemIcon = item.icon
                        const isCur = tab === item.id
                        return (
                          <div
                            key={item.id}
                            className={`adm-dropdown-mod-item ${isCur ? 'active' : ''}`}
                            onClick={() => {
                              switchTab(item.id)
                            }}
                          >
                            <div className="adm-mod-icon-badge">
                              <ItemIcon size={16} />
                            </div>
                            <div className="adm-mod-info">
                              <span className="adm-mod-name">{item.label}</span>
                              <span className="adm-mod-bn">{item.labelBn}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="adm-topbar-right">
          {/* Modern AI Assistant Button */}
          <button 
            type="button" 
            className="adm-ai-pill modern-ai-btn" 
            title="AI Assistant (Gemini Powered)"
            onClick={() => setNotices(['🤖 Databrain AI Assistant is active. Ask about property valuations, deals, or market trends.'])}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="adm-ai-svg-icon">
              <defs>
                <linearGradient id="aiModernGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="45%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="aiSubGrad" x1="16" y1="2" x2="22" y2="8" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              {/* Primary 4-point Organic AI Star Burst */}
              <path
                d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
                fill="url(#aiModernGrad)"
              />
              {/* Secondary Accent Sparkle */}
              <path
                d="M19 2C19 3.66 17.66 5 16 5C17.66 5 19 6.34 19 8C19 6.34 20.34 5 22 5C20.34 5 19 3.66 19 2Z"
                fill="url(#aiSubGrad)"
              />
            </svg>
          </button>

          <button type="button" className="adm-circle-btn" title="Notifications">
            <Bell size={18} />
            <span className="adm-badge-dot" />
          </button>

          <button 
            type="button" 
            className={`adm-circle-btn ${tab === 'profile' ? 'active' : ''}`} 
            title="Settings & Profile" 
            onClick={() => switchTab('profile')}
          >
            <Settings size={18} />
          </button>

          {/* User Profile Avatar with Dropdown */}
          <div className="adm-user-profile-menu-wrap" ref={profileMenuRef}>
            <button 
              type="button" 
              className="adm-user-avatar-btn" 
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              title="Account Menu"
            >
              <div className="adm-avatar-circle">
                {(profile?.full_name || profileForm.fullName || user?.email || 'U')[0].toUpperCase()}
                <span className="adm-online-status-dot" />
              </div>
              <ChevronDown size={14} className="adm-avatar-chevron" />
            </button>

            {profileMenuOpen && (
              <>
                <div 
                  className="adm-dropdown-backdrop" 
                  onClick={(e) => { e.stopPropagation(); setProfileMenuOpen(false); }} 
                />
                <div className="adm-profile-dropdown">
                  <div 
                    className="adm-profile-dropdown-user clickable"
                    onClick={() => { setProfileMenuOpen(false); switchTab('profile') }}
                    title="Open Profile Page"
                  >
                    <strong>{profile?.full_name || profileForm.fullName || user?.email}</strong>
                    <span className="adm-profile-dropdown-role">
                      {profile?.role === 'superadmin' || isSuperAdmin ? 'Super Admin' : 'Admin'}
                    </span>
                    <small>{user?.email}</small>
                  </div>
                  <div className="adm-profile-dropdown-divider" />
                  <button 
                    type="button" 
                    className={`adm-dropdown-item ${tab === 'profile' ? 'active' : ''}`}
                    onClick={() => { setProfileMenuOpen(false); switchTab('profile') }}
                  >
                    <UserCircle2 size={15} />
                    <span>Profile Page</span>
                  </button>
                  <button 
                    type="button" 
                    className="adm-dropdown-item" 
                    onClick={() => { setProfileMenuOpen(false); navigateTo('home') }}
                  >
                    <Home size={15} />
                    <span>View Site</span>
                  </button>
                  <button 
                    type="button" 
                    className="adm-dropdown-item danger" 
                    onClick={handleSignOut}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ====================================================================
          MAIN CONTENT AREA (Full Width)
          ==================================================================== */}
      <main className="adm-main">
        {/* Notices Alert Bar */}
        {notices.length > 0 && (
          <div className="adm-alert">
            <AlertTriangle size={17} />
            <div>
              {notices.slice(0, 3).map((m, i) => <div key={i}>{m}</div>)}
            </div>
            <button onClick={() => setNotices([])} aria-label="Dismiss"><X size={15} /></button>
          </div>
        )}

        {/* ====================================================================
            SUBMENU & ACTIONS ROW (Submenu placed on left, Actions on right)
            ==================================================================== */}
        <div className="adm-overview-header">
          {/* Submenu placed here */}
          <div className="adm-submenu-bar">
            {curTabConfig.submenus && curTabConfig.submenus.map((sub) => {
              const isActive = activeSubTab === sub.id
              return (
                <button
                  key={sub.id}
                  type="button"
                  className={`adm-submenu-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(sub.id)}
                >
                  <span>{sub.label}</span>
                </button>
              )
            })}
          </div>

          <div className="adm-overview-actions">
            <button type="button" className="adm-pill-btn">
              <Calendar size={15} />
              <span>26 June 2024</span>
              <ChevronDown size={14} />
            </button>

            <button 
              type="button" 
              className="adm-pill-btn"
              onClick={handleExportCurrentTab}
            >
              <span>Export</span>
              <Download size={14} />
            </button>

            <button 
              type="button" 
              className="adm-pill-btn primary-dark"
              onClick={() => {
                if (tab === 'inventory') {
                  setNotices(['📦 Material stock registration panel ready.'])
                } else if (tab === 'crm') {
                  setNotices(['💬 Schedule a new client consultation.'])
                } else if (tab === 'profile') {
                  handleSaveProfile()
                } else {
                  switchTab('properties')
                }
              }}
            >
              {tab === 'profile' ? <Save size={15} /> : <Plus size={16} />}
              <span>
                {tab === 'inventory' ? 'Add Stock' : tab === 'deals' ? 'Create Deal' : tab === 'crm' ? 'New Lead' : tab === 'profile' ? 'Save Profile' : 'Add Property'}
              </span>
            </button>
          </div>
        </div>

        {/* ==================================================================
            TAB 1: DASHBOARD OVERVIEW (Pixel-inspired by Screenshot)
            ================================================================== */}
        {tab === 'overview' && (
          <>

            {/* --- 5 Top Metric KPI Cards (1 Row) --- */}
            <div className="adm-kpi-row">
              {/* Card 1: Active Leads */}
              <div className="adm-databrain-kpi">
                <div className="adm-kpi-top-row">
                  <div className="adm-kpi-figure-wrap">
                    <span className="adm-kpi-big-num">{(2450 + (leads.length + inquiries.length)).toLocaleString()}</span>
                    <span className="adm-kpi-sub-label">Active Leads</span>
                  </div>
                  <div className="adm-kpi-icon-badge badge-cyan">
                    <Target size={20} />
                  </div>
                </div>

                <div className="adm-kpi-bottom-row">
                  <div className="adm-growth-pill-wrap">
                    <span className="adm-growth-pill cyan">↗ 84.5%</span>
                    <span className="adm-growth-time">Last year</span>
                  </div>

                  {/* Funnel Pulse Sparkline Graphic */}
                  <div className="adm-mini-chart-wrap">
                    <svg width="60" height="34" viewBox="0 0 60 34">
                      <path d="M 4 27 C 16 25, 24 16, 34 18 C 42 20, 48 9, 56 5" fill="none" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="56" cy="5" r="2.5" fill="#0891b2" />
                      <path d="M 4 27 C 16 25, 24 16, 34 18 C 42 20, 48 9, 56 5 L 56 32 L 4 32 Z" fill="#cffafe" opacity="0.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2: Properties Managed */}
              <div className="adm-databrain-kpi">
                <div className="adm-kpi-top-row">
                  <div className="adm-kpi-figure-wrap">
                    <span className="adm-kpi-big-num">4860</span>
                    <span className="adm-kpi-sub-label">Properties Managed</span>
                  </div>
                  <div className="adm-kpi-icon-badge badge-green">
                    <Landmark size={20} />
                  </div>
                </div>

                <div className="adm-kpi-bottom-row">
                  <div className="adm-growth-pill-wrap">
                    <span className="adm-growth-pill green">↗ 98%</span>
                    <span className="adm-growth-time">Last year</span>
                  </div>

                  {/* Arc Gauge Graphic */}
                  <div className="adm-mini-chart-wrap">
                    <svg width="60" height="34" viewBox="0 0 60 34">
                      <path d="M 8 32 A 22 22 0 0 1 52 32" fill="none" stroke="#e6f9f0" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 8 32 A 22 22 0 0 1 45 16" fill="none" stroke="#23c483" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 18 32 A 12 12 0 0 1 42 32" fill="none" stroke="#a7f3d0" strokeWidth="4.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3: Asset Value */}
              <div className="adm-databrain-kpi">
                <div className="adm-kpi-top-row">
                  <div className="adm-kpi-figure-wrap">
                    <span className="adm-kpi-big-num">$2B</span>
                    <span className="adm-kpi-sub-label">Asset Value</span>
                  </div>
                  <div className="adm-kpi-icon-badge badge-blue">
                    <Wallet size={20} />
                  </div>
                </div>

                <div className="adm-kpi-bottom-row">
                  <div className="adm-growth-pill-wrap">
                    <span className="adm-growth-pill blue">↗ 72%</span>
                    <span className="adm-growth-time">Last year</span>
                  </div>

                  {/* Mini Bars Graphic */}
                  <div className="adm-mini-chart-wrap">
                    <svg width="60" height="34" viewBox="0 0 60 34">
                      <rect x="6" y="22" width="6" height="12" rx="3" fill="#dbeafe" />
                      <rect x="18" y="16" width="6" height="18" rx="3" fill="#bfdbfe" />
                      <rect x="30" y="12" width="6" height="22" rx="3" fill="#93c5fd" />
                      <rect x="42" y="8" width="6" height="26" rx="3" fill="#60a5fa" />
                      <rect x="54" y="2" width="6" height="32" rx="3" fill="#2563eb" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3: Properties Sold */}
              <div className="adm-databrain-kpi">
                <div className="adm-kpi-top-row">
                  <div className="adm-kpi-figure-wrap">
                    <span className="adm-kpi-big-num">1037</span>
                    <span className="adm-kpi-sub-label">Properties Sold</span>
                  </div>
                  <div className="adm-kpi-icon-badge badge-yellow">
                    <Tag size={20} />
                  </div>
                </div>

                <div className="adm-kpi-bottom-row">
                  <div className="adm-growth-pill-wrap">
                    <span className="adm-growth-pill yellow">↗ 44.2%</span>
                    <span className="adm-growth-time">Last year</span>
                  </div>

                  {/* Mini Stepped Blocks Graphic */}
                  <div className="adm-mini-chart-wrap">
                    <svg width="60" height="34" viewBox="0 0 60 34">
                      <rect x="14" y="22" width="10" height="12" rx="2" fill="#fef3c7" />
                      <rect x="26" y="8" width="16" height="26" rx="3" fill="#f59e0b" />
                      <rect x="44" y="15" width="12" height="19" rx="2" fill="#fde68a" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 4: New Clients */}
              <div className="adm-databrain-kpi">
                <div className="adm-kpi-top-row">
                  <div className="adm-kpi-figure-wrap">
                    <span className="adm-kpi-big-num">895</span>
                    <span className="adm-kpi-sub-label">New Clients</span>
                  </div>
                  <div className="adm-kpi-icon-badge badge-purple">
                    <Users size={20} />
                  </div>
                </div>

                <div className="adm-kpi-bottom-row">
                  <div className="adm-growth-pill-wrap">
                    <span className="adm-growth-pill purple">↗ 70%</span>
                    <span className="adm-growth-time">Last year</span>
                  </div>

                  {/* Soundwave Bars Graphic */}
                  <div className="adm-mini-chart-wrap">
                    <svg width="60" height="34" viewBox="0 0 60 34">
                      <rect x="4" y="14" width="3" height="8" rx="1.5" fill="#c4b5fd" />
                      <rect x="12" y="10" width="3" height="16" rx="1.5" fill="#a78bfa" />
                      <rect x="20" y="5" width="3.5" height="26" rx="1.75" fill="#8b5cf6" />
                      <rect x="29" y="12" width="3" height="12" rx="1.5" fill="#a78bfa" />
                      <rect x="37" y="2" width="3.5" height="32" rx="1.75" fill="#7c3aed" />
                      <rect x="46" y="9" width="3" height="18" rx="1.5" fill="#8b5cf6" />
                      <rect x="54" y="13" width="3" height="10" rx="1.5" fill="#c4b5fd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Middle Row 2 Visual Charts --- */}
            <div className="adm-charts-row">
              {/* Left Chart: Status Analysis (Donut Chart) */}
              <div className="adm-chart-card">
                <div className="adm-chart-card-head">
                  <div className="adm-chart-title-wrap">
                    <h3 className="adm-chart-card-title">Status Analysis</h3>
                    <Info size={14} className="adm-info-icon" />
                  </div>

                  <button type="button" className="adm-mini-select-pill">
                    <span>Last year</span>
                    <ChevronDown size={13} />
                  </button>
                </div>

                <div className="adm-donut-container">
                  {/* Donut SVG Ring */}
                  <div className="adm-donut-svg-wrap">
                    <span className="donut-tag top-left">166</span>
                    <span className="donut-tag top-right">1037</span>
                    <span className="donut-tag bottom-left">486</span>

                    <svg width="150" height="150" viewBox="0 0 150 150" className="adm-donut-svg">
                      <circle
                        cx="75"
                        cy="75"
                        r="54"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth="20"
                        strokeDasharray="90 340"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="75"
                        cy="75"
                        r="54"
                        fill="transparent"
                        stroke="#2563eb"
                        strokeWidth="20"
                        strokeDasharray="115 340"
                        strokeDashoffset="-105"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="75"
                        cy="75"
                        r="54"
                        fill="transparent"
                        stroke="#7c3aed"
                        strokeWidth="20"
                        strokeDasharray="125 340"
                        strokeDashoffset="-230"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="adm-donut-center-icon">
                      <Layers size={22} />
                    </div>
                  </div>

                  {/* Legend Counts */}
                  <div className="adm-donut-legend">
                    <div className="adm-legend-item">
                      <div className="adm-legend-circle purple" />
                      <div className="adm-legend-text">
                        <span className="adm-legend-lbl">Accepted</span>
                        <strong className="adm-legend-val">1037</strong>
                      </div>
                    </div>

                    <div className="adm-legend-item">
                      <div className="adm-legend-circle yellow" />
                      <div className="adm-legend-text">
                        <span className="adm-legend-lbl">Rejected</span>
                        <strong className="adm-legend-val">486</strong>
                      </div>
                    </div>

                    <div className="adm-legend-item">
                      <div className="adm-legend-circle blue" />
                      <div className="adm-legend-text">
                        <span className="adm-legend-lbl">Counter...</span>
                        <strong className="adm-legend-val">165</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Chart: Revenue Generation (Dual-tone Monthly Bar Chart) */}
              <div className="adm-chart-card">
                <div className="adm-chart-card-head">
                  <div className="adm-chart-title-wrap">
                    <h3 className="adm-chart-card-title">Revenue Generation</h3>
                    <Info size={14} className="adm-info-icon" />
                  </div>

                  <div className="adm-revenue-legend-row">
                    <span className="adm-pill-legend-item">
                      <span className="adm-pill-legend-dot deals" />
                      <span>Deals</span>
                    </span>

                    <span className="adm-pill-legend-item">
                      <span className="adm-pill-legend-dot deal-val" />
                      <span>Deal value</span>
                    </span>

                    <button type="button" className="adm-mini-select-pill">
                      <span>Last year</span>
                      <ChevronDown size={13} />
                    </button>
                  </div>
                </div>

                <div className="adm-revenue-chart-body">
                  {/* Y-Axis */}
                  <div className="adm-chart-yaxis">
                    <span>$700k</span>
                    <span>$500k</span>
                    <span>$200k</span>
                    <span>$100k</span>
                    <span>$50k</span>
                    <span>$10k</span>
                    <span>0</span>
                  </div>

                  {/* 12 Monthly Bars */}
                  <div className="adm-chart-bars-wrap">
                    {[
                      { m: 'Jan', hOuter: 60, hInner: 40 },
                      { m: 'Feb', hOuter: 75, hInner: 55 },
                      { m: 'Mar', hOuter: 50, hInner: 35 },
                      { m: 'Apr', hOuter: 70, hInner: 48 },
                      { m: 'May', hOuter: 72, hInner: 42 },
                      { m: 'Jun', hOuter: 42, hInner: 24 },
                      { m: 'Jul', hOuter: 68, hInner: 48 },
                      { m: 'Aug', hOuter: 80, hInner: 62 },
                      { m: 'Sep', hOuter: 95, hInner: 78 },
                      { m: 'Oct', hOuter: 90, hInner: 72 },
                      { m: 'Nov', hOuter: 65, hInner: 46 },
                      { m: 'Des', hOuter: 55, hInner: 38 }
                    ].map((col) => (
                      <div key={col.m} className="adm-month-col" title={`${col.m}: Deals & Revenue`}>
                        <div className="adm-dual-bar-container">
                          <div className="adm-bar-outer" style={{ height: `${col.hOuter}%` }}>
                            <div className="adm-bar-inner" style={{ height: `${(col.hInner / col.hOuter) * 100}%` }} />
                          </div>
                        </div>
                        <span className="adm-month-name">{col.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Card: Team Performance --- */}
            <div className="adm-team-perf-card">
              <div className="adm-team-perf-head">
                <div className="adm-chart-title-wrap">
                  <div className="adm-title-with-badge">
                    <h3 className="adm-chart-card-title">Team Performance</h3>
                    <span className="adm-perf-badge-pill">
                      <Trophy size={13} />
                      <span>Q2 Target: $19.7M</span>
                    </span>
                  </div>
                  <Info size={14} className="adm-info-icon" title="Aggregated sales quotas and conversions by team leadership" />
                </div>

                <div className="adm-team-perf-actions">
                  <div className="adm-team-metric-stat">
                    <span className="adm-metric-lbl">Avg. Conversion</span>
                    <strong className="adm-metric-val">83.8%</strong>
                  </div>
                  <button type="button" className="adm-mini-select-pill">
                    <span>This Quarter</span>
                    <ChevronDown size={13} />
                  </button>
                </div>
              </div>

              <div className="adm-team-perf-grid">
                {/* Column 1: Comparative Bar Chart */}
                <div className="adm-team-barchart-panel">
                  <div className="adm-barchart-head">
                    <span className="adm-barchart-subtitle">Quota vs Achieved Sales ($M)</span>
                    <div className="adm-chart-legend-inline">
                      <span className="adm-legend-key">
                        <span className="adm-legend-swatch target" />
                        <span>Target</span>
                      </span>
                      <span className="adm-legend-key">
                        <span className="adm-legend-swatch achieved" />
                        <span>Achieved</span>
                      </span>
                    </div>
                  </div>

                  <div className="adm-team-bars-wrapper">
                    {/* Y-Axis */}
                    <div className="adm-chart-yaxis">
                      <span>$5M</span>
                      <span>$4M</span>
                      <span>$3M</span>
                      <span>$2M</span>
                      <span>$1M</span>
                      <span>$0</span>
                    </div>

                    {/* Bars for 5 Team Leaders */}
                    <div className="adm-team-bars-track">
                      {TEAM_PERFORMANCE_LEADERS.map((leader) => (
                        <div key={leader.id} className="adm-team-bar-col" title={`${leader.name}: ${leader.achieved} / ${leader.target} (${leader.salesPercent}%)`}>
                          <span className="adm-bar-top-pct" style={{ color: leader.color }}>
                            {leader.salesPercent}%
                          </span>
                          <div className="adm-dual-bar-container">
                            <div className="adm-bar-outer" style={{ height: `${leader.targetHeight}%` }}>
                              <div
                                className="adm-bar-inner"
                                style={{
                                  height: `${(leader.achievedHeight / leader.targetHeight) * 100}%`,
                                  background: leader.color
                                }}
                              />
                            </div>
                          </div>
                          <span className="adm-month-name">{leader.shortName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Team Leader Roster List */}
                <div className="adm-leaders-roster-panel">
                  <span className="adm-roster-subtitle">Team Leaders & Quota Achievement</span>
                  <div className="adm-leaders-list">
                    {TEAM_PERFORMANCE_LEADERS.map((leader, idx) => (
                      <div key={leader.id} className="adm-leader-item">
                        <div className="adm-leader-rank">#{idx + 1}</div>

                        {/* Image */}
                        <div className="adm-leader-avatar-wrap">
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="adm-leader-avatar"
                            onError={(e) => {
                              e.currentTarget.onerror = null
                              e.currentTarget.src = leader.fallback || '/leader-1.jpg'
                            }}
                          />
                          <span className="adm-leader-status-dot" />
                        </div>

                        {/* Team Leader Name & Details */}
                        <div className="adm-leader-info">
                          <div className="adm-leader-name-row">
                            <strong className="adm-leader-name">{leader.name}</strong>
                          </div>
                          <span className="adm-leader-role">{leader.role} • <span className="adm-leader-team">{leader.team}</span></span>

                          {/* Horizontal Bar Chart */}
                          <div className="adm-leader-progress-wrap">
                            <div className="adm-progress-bar-bg">
                              <div
                                className="adm-progress-bar-fill"
                                style={{
                                  width: `${leader.salesPercent}%`,
                                  background: leader.color
                                }}
                              />
                            </div>
                            <div className="adm-leader-progress-meta">
                              <span>{leader.deals} Deals Closed</span>
                              <span>{leader.achieved} of {leader.target}</span>
                            </div>
                          </div>
                        </div>

                        {/* Sales % Badge */}
                        <div className="adm-leader-sales-wrap">
                          <span className={`adm-growth-pill ${leader.badgeClass}`}>
                            {leader.salesPercent}%
                          </span>
                          <span className="adm-leader-growth">{leader.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Bottom Section: Explore Your Properties --- */}
            <div className="adm-properties-section">
              <div className="adm-properties-head">
                <div className="adm-chart-title-wrap">
                  <h3 className="adm-chart-card-title">Explore Your Properties</h3>
                  <Info size={14} className="adm-info-icon" />
                </div>

                <div className="adm-properties-tools">
                  <div className="adm-search-pill adm-filter-search">
                    <Search size={15} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={propertySearch}
                      onChange={(e) => setPropertySearch(e.target.value)}
                    />
                  </div>

                  <button 
                    type="button" 
                    className="adm-pill-btn" 
                    style={{ height: '38px' }}
                    onClick={() => switchTab('properties')}
                  >
                    <SlidersHorizontal size={14} />
                    <span>View All</span>
                  </button>
                </div>
              </div>

              <div className="adm-plots-cards-grid">
                {filteredProperties.map((p) => (
                  <div key={p.code} className="adm-plot-card">
                    <div
                      className="adm-plot-thumb"
                      style={{ backgroundImage: `url(${p.image})` }}
                    >
                      <span className={`adm-plot-status-tag ${p.status === 'Available' ? 'available' : ''}`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="adm-plot-body">
                      <span className="adm-plot-code">{p.code}</span>
                      <h4 className="adm-plot-name">{p.name}</h4>
                      <p className="adm-plot-loc">{p.location}</p>

                      <div className="adm-plot-foot">
                        <strong className="adm-plot-price">{p.price}</strong>
                        <span className="adm-plot-size">{p.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ==================================================================
            TAB 2: PROPERTIES (Explorer & Allocation)
            ================================================================== */}
        {tab === 'properties' && (
          <div className="adm-section-page">
            {/* Quick stats */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box">
                <span className="adm-stat-label">Total Properties</span>
                <strong className="adm-stat-value">4,860</strong>
                <span className="adm-stat-growth green">↗ +12% this month</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Available Plots</span>
                <strong className="adm-stat-value">2,140</strong>
                <span className="adm-stat-sub">Ready for booking</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Sold & Handed Over</span>
                <strong className="adm-stat-value">1,037</strong>
                <span className="adm-stat-growth green">↗ 44.2% YoY</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Total Asset Valuation</span>
                <strong className="adm-stat-value">$2 Billion</strong>
                <span className="adm-stat-sub">Dhaka Icon City</span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="adm-filter-bar">
              <div className="adm-category-pills">
                {['All', 'Residential', 'Commercial', 'Waterfront'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`adm-filter-pill ${propertyCategory === cat ? 'active' : ''}`}
                    onClick={() => setPropertyCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="adm-search-pill adm-filter-search">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Filter by plot code or sector..."
                  value={propertySearch}
                  onChange={(e) => setPropertySearch(e.target.value)}
                />
              </div>
            </div>

            {/* Plots Grid */}
            <div className="adm-plots-cards-grid">
              {filteredProperties.map((p) => (
                <div key={p.code} className="adm-plot-card">
                  <div className="adm-plot-thumb" style={{ backgroundImage: `url(${p.image})` }}>
                    <span className={`adm-plot-status-tag ${p.status === 'Available' ? 'available' : ''}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="adm-plot-body">
                    <span className="adm-plot-code">{p.code} • {p.type || 'Plot'}</span>
                    <h4 className="adm-plot-name">{p.name}</h4>
                    <p className="adm-plot-loc">{p.location}</p>
                    <div className="adm-plot-foot">
                      <strong className="adm-plot-price">{p.price}</strong>
                      <span className="adm-plot-size">{p.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 3: CRM (Lead & Customer Intelligence)
            ================================================================== */}
        {tab === 'crm' && (
          <div className="adm-section-page">
            {/* Quick stats */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box">
                <span className="adm-stat-label">Total CRM Leads</span>
                <strong className="adm-stat-value text-purple">{leads.length + inquiries.length}</strong>
                <span className="adm-stat-growth green">↗ 32% this month</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Site Consultations</span>
                <strong className="adm-stat-value text-blue">{leads.length}</strong>
                <span className="adm-stat-sub">Direct visit bookings</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Web Inquiries</span>
                <strong className="adm-stat-value text-emerald">{inquiries.length}</strong>
                <span className="adm-stat-sub">Online lead forms</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Lead Conversion</span>
                <strong className="adm-stat-value text-amber">28.4%</strong>
                <span className="adm-stat-growth green">↗ High Intent</span>
              </div>
            </div>

            {/* Search Bar & Stage Status Info */}
            <div className="adm-filter-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="adm-muted" style={{ fontSize: '13px' }}>Current Stage:</span>
                <span className={`adm-deal-badge ${(activeSubTab || 'New Lead').toLowerCase().replace(' ', '-')}`}>
                  {activeSubTab || 'New Lead'}
                </span>
                <span className="adm-muted" style={{ fontSize: '12px' }}>({filteredCrmItems.length} records)</span>
              </div>

              <div className="adm-search-pill adm-filter-search">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search client name, phone, preference..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* CRM Table */}
            <div className="adm-data-table-card">
              <div className="adm-table-head-bar">
                <h3>CRM Pipeline • {activeSubTab || 'New Lead'} ({filteredCrmItems.length})</h3>
              </div>
              {filteredCrmItems.length === 0 ? (
                <div className="adm-empty-table">No clients found in the "{activeSubTab || 'New Lead'}" stage matching search.</div>
              ) : (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Contact Info</th>
                      <th>Plot / Unit Preference</th>
                      <th>Lead Source</th>
                      <th>Assigned Agent</th>
                      <th>Stage</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCrmItems.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td className="adm-bold">{item.displayName || item.name}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12px' }}>
                            <span>📞 {item.phone || '—'}</span>
                            <span className="adm-muted">✉️ {item.email || '—'}</span>
                          </div>
                        </td>
                        <td>
                          <span className="adm-code-pill">{item.plotPreference || item.plot_category || 'General Plot'}</span>
                        </td>
                        <td>{item.source || 'Website'}</td>
                        <td>{item.agent || 'Direct'}</td>
                        <td>
                          <span className={`adm-deal-badge ${(item.stage || 'New Lead').toLowerCase().replace(' ', '-')}`}>
                            {item.stage || 'New Lead'}
                          </span>
                        </td>
                        <td className="adm-muted">{item.date || fmtDate(item.created_at)}</td>
                        <td>
                          <button
                            type="button"
                            className="adm-sm-action-btn"
                            onClick={() => setSelectedInquiry(item.rawItem || item)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 4: DEALS (Sales & Booking Funnel)
            ================================================================== */}
        {tab === 'deals' && (
          <div className="adm-section-page">
            {/* Status counts banner */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box">
                <span className="adm-stat-label">Accepted Deals</span>
                <strong className="adm-stat-value text-purple">1,037</strong>
                <span className="adm-stat-sub">Completed sales</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Counter Offers</span>
                <strong className="adm-stat-value text-blue">166</strong>
                <span className="adm-stat-sub">Active negotiations</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Rejected / Cancelled</span>
                <strong className="adm-stat-value text-amber">486</strong>
                <span className="adm-stat-sub">Archived</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Deal Velocity</span>
                <strong className="adm-stat-value text-emerald">7.4 Days</strong>
                <span className="adm-stat-growth green">↗ 15% Faster</span>
              </div>
            </div>

            {/* Deals Table */}
            <div className="adm-data-table-card">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Deal ID</th>
                    <th>Client Name</th>
                    <th>Plot Code</th>
                    <th>Deal Value</th>
                    <th>Assigned Agent</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeals.map((d) => (
                    <tr key={d.id}>
                      <td className="adm-bold">{d.id}</td>
                      <td>{d.client}</td>
                      <td><span className="adm-code-pill">{d.plot}</span></td>
                      <td className="adm-bold">{d.value}</td>
                      <td>{d.agent}</td>
                      <td>
                        <span className={`adm-deal-badge ${d.status.toLowerCase().replace(' ', '-')}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="adm-muted">{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 5: TRANSACTIONS (Payment Operations & Collections)
            ================================================================== */}
        {tab === 'transactions' && (
          <div className="adm-section-page">
            {/* Quick stats */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box">
                <span className="adm-stat-label">Total Inflow This Month</span>
                <strong className="adm-stat-value text-emerald">$205,000</strong>
                <span className="adm-stat-growth green">↗ +18.4% MoM</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Completed Collections</span>
                <strong className="adm-stat-value text-blue">94.2%</strong>
                <span className="adm-stat-sub">Clearances on schedule</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Pending Clearances</span>
                <strong className="adm-stat-value text-amber">$25,000</strong>
                <span className="adm-stat-sub">2 transactions processing</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Avg Transaction Size</span>
                <strong className="adm-stat-value text-purple">$34,160</strong>
                <span className="adm-stat-growth green">Dhaka Icon City</span>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="adm-data-table-card">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>Client Name</th>
                    <th>Payment Type</th>
                    <th>Method & Gateway</th>
                    <th>Plot Code</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id}>
                      <td className="adm-bold">{txn.id}</td>
                      <td>{txn.client}</td>
                      <td>
                        <span className="adm-code-pill">{txn.type}</span>
                      </td>
                      <td className="adm-muted">{txn.method}</td>
                      <td><span className="adm-code-pill">{txn.plot}</span></td>
                      <td className="adm-bold text-emerald">{txn.amount}</td>
                      <td>
                        <span className={`adm-deal-badge ${txn.status === 'Completed' ? 'accepted' : txn.status === 'Processing' ? 'counter-offer' : 'rejected'}`}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="adm-muted">{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 4: CLIENTS (CRM & Inquiries)
            ================================================================== */}
        {tab === 'clients' && (
          <div className="adm-section-page">
            {/* Quick stats */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box">
                <span className="adm-stat-label">Total Clients</span>
                <strong className="adm-stat-value">895</strong>
                <span className="adm-stat-growth green">↗ 70% Last year</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Website Inquiries</span>
                <strong className="adm-stat-value">{inquiries.length}</strong>
                <span className="adm-stat-sub">From online leads</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Consultation Bookings</span>
                <strong className="adm-stat-value">{leads.length}</strong>
                <span className="adm-stat-sub">Site visit requests</span>
              </div>
            </div>

            {/* Clients / Inquiries List */}
            <div className="adm-data-table-card">
              <div className="adm-table-head-bar">
                <h3>Incoming Client Inquiries ({inquiries.length})</h3>
              </div>
              {inquiries.length === 0 ? (
                <div className="adm-empty-table">No inquiries received yet.</div>
              ) : (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Plot Category</th>
                      <th>Plot Size</th>
                      <th>Received</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClientsInquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td className="adm-bold">{inq.name}</td>
                        <td>{inq.phone || '—'}</td>
                        <td>{inq.email || '—'}</td>
                        <td><span className="adm-code-pill">{inq.plot_category || 'General'}</span></td>
                        <td>{inq.plot_size || '—'}</td>
                        <td className="adm-muted">{fmtDate(inq.created_at)}</td>
                        <td>
                          <button
                            type="button"
                            className="adm-sm-action-btn"
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 5: AGENTS (Staff & Sales Team)
            ================================================================== */}
        {tab === 'agents' && (
          <div className="adm-section-page">
            <div className="adm-agents-grid">
              {INITIAL_AGENTS.map((ag) => (
                <div key={ag.id} className="adm-agent-card">
                  <div className="adm-agent-header">
                    <div className="adm-agent-avatar">
                      {ag.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="adm-agent-names">
                      <h4>{ag.name}</h4>
                      <span>{ag.role}</span>
                    </div>
                  </div>

                  <div className="adm-agent-meta">
                    <div className="adm-agent-meta-item">
                      <Phone size={14} />
                      <span>{ag.phone}</span>
                    </div>
                    <div className="adm-agent-meta-item">
                      <Mail size={14} />
                      <span>{ag.email}</span>
                    </div>
                  </div>

                  <div className="adm-agent-stats">
                    <div className="adm-agent-stat-box">
                      <span className="lbl">Active Deals</span>
                      <span className="val">{ag.activeDeals}</span>
                    </div>
                    <div className="adm-agent-stat-box">
                      <span className="lbl">Closed Sales</span>
                      <span className="val">{ag.closedValue}</span>
                    </div>
                    <div className="adm-agent-stat-box">
                      <span className="lbl">Rating</span>
                      <span className="val text-amber">★ {ag.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 6: INVENTORY & MATERIALS
            ================================================================== */}
        {tab === 'inventory' && (
          <div className="adm-section-page">
            {/* Quick stats */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box">
                <span className="adm-stat-label">Total SKUs</span>
                <strong className="adm-stat-value">{INITIAL_INVENTORY.length} Items</strong>
                <span className="adm-stat-growth green">↗ All Warehouses Active</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Stock Valuation</span>
                <strong className="adm-stat-value text-purple">$420,000</strong>
                <span className="adm-stat-sub">Site reserves</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Low Stock Alert</span>
                <strong className="adm-stat-value text-amber">1 Item</strong>
                <span className="adm-stat-sub">Reorder required soon</span>
              </div>
            </div>

            {/* Table */}
            <div className="adm-data-table-card">
              <div className="adm-table-head-bar">
                <h3>Warehouse Material Stock ({INITIAL_INVENTORY.length})</h3>
              </div>
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>SKU / Code</th>
                    <th>Material Item</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Warehouse Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.id}>
                      <td><span className="adm-code-pill">{item.sku}</span></td>
                      <td className="adm-bold">{item.name}</td>
                      <td>{item.category}</td>
                      <td>
                        <strong>{item.qty}</strong> {item.unit}
                      </td>
                      <td className="adm-muted">{item.location}</td>
                      <td>
                        <span className={`adm-status-tag ${item.status === 'Low Stock' ? 'rejected' : 'accepted'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 7: PROJECT MANAGEMENT
            ================================================================== */}
        {tab === 'project-mgmt' && (
          <div className="adm-section-page">
            {/* Quick stats */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box">
                <span className="adm-stat-label">Active Phases</span>
                <strong className="adm-stat-value">{INITIAL_PROJECTS.length} Phases</strong>
                <span className="adm-stat-growth green">↗ 100% on schedule</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Avg. Progress</span>
                <strong className="adm-stat-value text-blue">66%</strong>
                <span className="adm-stat-sub">Across all sectors</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Committed Budget</span>
                <strong className="adm-stat-value text-purple">$7.27M</strong>
                <span className="adm-stat-sub">Infrastructure fund</span>
              </div>
            </div>

            {/* Table */}
            <div className="adm-data-table-card">
              <div className="adm-table-head-bar">
                <h3>Site Development Phases ({INITIAL_PROJECTS.length})</h3>
              </div>
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Project Phase Name</th>
                    <th>Zone</th>
                    <th>Lead Engineer</th>
                    <th>Budget</th>
                    <th>Progress</th>
                    <th>Target Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((prj) => (
                    <tr key={prj.id}>
                      <td><span className="adm-code-pill">{prj.id}</span></td>
                      <td className="adm-bold">{prj.name}</td>
                      <td>{prj.zone}</td>
                      <td>{prj.lead}</td>
                      <td className="adm-bold">{prj.budget}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '80px', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${prj.progress}%`, height: '100%', background: '#7c3aed', borderRadius: '4px' }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 700 }}>{prj.progress}%</span>
                        </div>
                      </td>
                      <td className="adm-muted">{prj.deadline}</td>
                      <td>
                        <span className="adm-status-tag accepted">{prj.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 8: LAND MANAGEMENT
            ================================================================== */}
        {tab === 'land-mgmt' && (
          <div className="adm-section-page">
            {/* Quick stats */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box">
                <span className="adm-stat-label">Total Acquired</span>
                <strong className="adm-stat-value">64.15 Acres</strong>
                <span className="adm-stat-growth green">↗ 100% Clear Title</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Mutation Cleared</span>
                <strong className="adm-stat-value text-purple">82%</strong>
                <span className="adm-stat-sub">4 of 5 parcels completed</span>
              </div>
              <div className="adm-stat-box">
                <span className="adm-stat-label">Boundary Demarcated</span>
                <strong className="adm-stat-value text-blue">4 Parcels</strong>
                <span className="adm-stat-sub">Pillars installed</span>
              </div>
            </div>

            {/* Table */}
            <div className="adm-data-table-card">
              <div className="adm-table-head-bar">
                <h3>Land Registry & Mouza Parcels ({INITIAL_LAND_PARCELS.length})</h3>
              </div>
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Parcel ID</th>
                    <th>Mouza</th>
                    <th>Dag No. (CS/RS)</th>
                    <th>Khatian (BS)</th>
                    <th>Area</th>
                    <th>Deed No.</th>
                    <th>Zoned For</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLandParcels.map((p) => (
                    <tr key={p.id}>
                      <td><span className="adm-code-pill">{p.id}</span></td>
                      <td className="adm-bold">{p.mouza}</td>
                      <td>{p.dagNo}</td>
                      <td><span className="adm-code-pill">{p.khatian}</span></td>
                      <td className="adm-bold">{p.area}</td>
                      <td className="adm-muted">{p.deedNo}</td>
                      <td>{p.zonedFor}</td>
                      <td>
                        <span className={`adm-status-tag ${p.status === 'Mutation Complete' ? 'accepted' : 'counter'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: PROFILE PAGE & ACCOUNT SETTINGS
            ================================================================== */}
        {tab === 'profile' && (
          <div className="adm-section-page adm-profile-page">
            {/* 1. Profile Hero Card */}
            <div className="adm-profile-hero-card">
              <div className="adm-profile-hero-left">
                <div className="adm-profile-avatar-large">
                  <div className="adm-avatar-circle large">
                    {(profileForm.fullName || user?.email || 'A')[0].toUpperCase()}
                    <span className="adm-online-status-dot large" />
                  </div>
                </div>

                <div className="adm-profile-hero-meta">
                  <div className="adm-profile-name-row">
                    <h2>{profileForm.fullName || 'System Administrator'}</h2>
                    <span className="adm-role-badge-super">
                      <ShieldCheck size={14} />
                      <span>{profile?.role === 'superadmin' || isSuperAdmin ? 'Super Administrator' : 'Administrator'}</span>
                    </span>
                  </div>
                  <div className="adm-profile-sub-details">
                    <span><Mail size={13} /> {user?.email}</span>
                    <span><Phone size={13} /> {profileForm.phone}</span>
                    <span><MapPin size={13} /> Banani, Dhaka</span>
                  </div>
                </div>
              </div>

              <div className="adm-profile-hero-actions">
                <button
                  type="button"
                  className="adm-pill-btn"
                  onClick={() => setActiveSubTab('strategy')}
                >
                  <Target size={14} />
                  <span>Strategic Roadmap</span>
                </button>
                <button
                  type="button"
                  className="adm-pill-btn"
                  onClick={() => setActiveSubTab('performance')}
                >
                  <TrendingUp size={14} />
                  <span>Performance</span>
                </button>
                <button
                  type="button"
                  className="adm-pill-btn primary-dark"
                  onClick={handleSaveProfile}
                  disabled={saving}
                >
                  {saving ? <Loader2 size={14} className="spin" /> : <Save size={14} />}
                  <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>
            </div>

            {/* 2. Key Account Stat Highlights: Performance, Tasks, Clients, Strategy */}
            <div className="adm-tab-stats-row">
              <div className="adm-stat-box" onClick={() => setActiveSubTab('performance')} style={{ cursor: 'pointer' }}>
                <span className="adm-stat-label">Performance Rating</span>
                <strong className="adm-stat-value text-purple">94.8%</strong>
                <span className="adm-stat-growth green">↗ +4.2% Quota Velocity</span>
              </div>
              <div className="adm-stat-box" onClick={() => setActiveSubTab('tasks')} style={{ cursor: 'pointer' }}>
                <span className="adm-stat-label">Active Tasks</span>
                <strong className="adm-stat-value text-blue">{profileTasks.length} Milestones</strong>
                <span className="adm-stat-sub">{profileTasks.filter(t => t.status === 'Completed').length} Done • {profileTasks.filter(t => t.status === 'In Progress').length} Active</span>
              </div>
              <div className="adm-stat-box" onClick={() => setActiveSubTab('clients')} style={{ cursor: 'pointer' }}>
                <span className="adm-stat-label">Client Portfolio</span>
                <strong className="adm-stat-value text-green">142 VIPs</strong>
                <span className="adm-stat-sub">$18.4M Value • 98% Retention</span>
              </div>
              <div className="adm-stat-box" onClick={() => setActiveSubTab('strategy')} style={{ cursor: 'pointer' }}>
                <span className="adm-stat-label">Strategic Roadmap</span>
                <strong className="adm-stat-value">91.5%</strong>
                <span className="adm-stat-growth green">● 4 Pillars On Track</span>
              </div>
            </div>

            {/* 3. Conditional Subtabs Content */}
            {/* SUBTAB 0: OVERVIEW (ALL 4 PILLARS INTEGRATED) */}
            {activeSubTab === 'overview' && (
              <div className="adm-profile-overview-layout">
                {/* Row 1: Performance Chart + Strategic Roadmap Chart */}
                <div className="adm-charts-row">
                  {/* Performance Analytics Card with Bar Chart */}
                  <div className="adm-chart-card">
                    <div className="adm-chart-card-head">
                      <div className="adm-chart-title-wrap">
                        <TrendingUp size={18} className="text-purple" />
                        <h3 className="adm-chart-card-title">Personal Performance</h3>
                        <Info size={14} className="adm-info-icon" title="Monthly quota achievement vs actual sales closed" />
                      </div>
                      <div className="adm-chart-legend-inline">
                        <span className="adm-legend-key"><span className="adm-legend-swatch target" /><span>Target</span></span>
                        <span className="adm-legend-key"><span className="adm-legend-swatch achieved" /><span>Achieved</span></span>
                      </div>
                    </div>

                    <div className="adm-prof-perf-body">
                      {/* 6-Month Comparative Performance Chart */}
                      <div className="adm-team-bars-wrapper" style={{ height: '210px' }}>
                        <div className="adm-chart-yaxis">
                          <span>$4M</span>
                          <span>$3M</span>
                          <span>$2M</span>
                          <span>$1M</span>
                          <span>$0</span>
                        </div>
                        <div className="adm-team-bars-track">
                          {PROFILE_PERFORMANCE_METRICS.map((col) => (
                            <div key={col.m} className="adm-team-bar-col" title={`${col.m}: ${col.val} (${col.deals} deals • ${col.pct}% target)`}>
                              <span className="adm-bar-top-pct" style={{ color: '#10b981' }}>{col.pct}%</span>
                              <div className="adm-dual-bar-container">
                                <div className="adm-bar-outer" style={{ height: `${col.target}%` }}>
                                  <div className="adm-bar-inner" style={{ height: `${(col.achieved / col.target) * 100}%`, background: '#2563eb' }} />
                                </div>
                              </div>
                              <span className="adm-month-name">{col.m}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="adm-prof-perf-pills">
                        <div className="adm-perf-minibox">
                          <span>Closed Volume</span>
                          <strong>$14.8M</strong>
                        </div>
                        <div className="adm-perf-minibox">
                          <span>Avg. Velocity</span>
                          <strong>11.4 Days</strong>
                        </div>
                        <div className="adm-perf-minibox">
                          <span>Conversion</span>
                          <strong>34.2%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information-Based Strategic Roadmap Card with Progress Chart */}
                  <div className="adm-chart-card">
                    <div className="adm-chart-card-head">
                      <div className="adm-chart-title-wrap">
                        <Target size={18} className="text-blue" />
                        <h3 className="adm-chart-card-title">Information-Based Strategic Roadmap</h3>
                      </div>
                      <button type="button" className="adm-mini-select-pill" onClick={() => setActiveSubTab('strategy')}>
                        <span>View Strategy</span>
                        <ChevronDown size={13} />
                      </button>
                    </div>

                    <div className="adm-strategy-chart-body">
                      <p className="adm-strategy-chart-intro">
                        Quantitative tracking across 4 foundational execution drivers based on verified field & market data:
                      </p>

                      <div className="adm-strategy-bars-list">
                        {PROFILE_STRATEGY_PILLARS.map((pillar) => (
                          <div key={pillar.id} className="adm-strategy-bar-row">
                            <div className="adm-strategy-row-head">
                              <span className="adm-strategy-pillar-title">{pillar.title}</span>
                              <strong className="adm-strategy-pillar-val" style={{ color: pillar.color }}>{pillar.pct}%</strong>
                            </div>
                            <div className="adm-progress-bar-bg" style={{ height: '8px' }}>
                              <div
                                className="adm-progress-bar-fill"
                                style={{ width: `${pillar.pct}%`, background: pillar.color }}
                              />
                            </div>
                            <span className="adm-strategy-insight-text">
                              <strong>Data Signal:</strong> {pillar.signal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Tasks & Milestones + VIP Client Portfolio */}
                <div className="adm-profile-content-grid" style={{ marginTop: '20px' }}>
                  {/* Left: Tasks & Milestones Card */}
                  <div className="adm-chart-card">
                    <div className="adm-chart-card-head">
                      <div className="adm-chart-title-wrap">
                        <CheckSquare size={18} className="text-purple" />
                        <h3 className="adm-chart-card-title">Administrative Tasks & Milestones</h3>
                      </div>
                      <button type="button" className="adm-mini-select-pill" onClick={() => setActiveSubTab('tasks')}>
                        <span>View All ({profileTasks.length})</span>
                      </button>
                    </div>

                    {/* Mini Task Status Gauge & Interactive List */}
                    <div className="adm-prof-task-overview">
                      <div className="adm-task-donut-metric-row">
                        <div className="adm-task-mini-ring">
                          <svg width="60" height="60" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="24" fill="transparent" stroke="#f1f5f9" strokeWidth="6" />
                            <circle cx="30" cy="30" r="24" fill="transparent" stroke="#10b981" strokeWidth="6" strokeDasharray="100 150" strokeDashoffset="0" strokeLinecap="round" />
                            <circle cx="30" cy="30" r="24" fill="transparent" stroke="#7c3aed" strokeWidth="6" strokeDasharray="30 150" strokeDashoffset="-100" strokeLinecap="round" />
                          </svg>
                          <span className="adm-ring-center-val">68%</span>
                        </div>
                        <div className="adm-task-ring-legend">
                          <span className="adm-ring-leg-item"><span className="dot done" /> {profileTasks.filter(t => t.status === 'Completed').length} Completed</span>
                          <span className="adm-ring-leg-item"><span className="dot prog" /> {profileTasks.filter(t => t.status === 'In Progress').length} In Progress</span>
                          <span className="adm-ring-leg-item"><span className="dot pend" /> {profileTasks.filter(t => t.status === 'Pending').length} Pending</span>
                        </div>
                      </div>

                      <div className="adm-profile-task-list compact">
                        {profileTasks.slice(0, 4).map((task) => (
                          <div key={task.id} className={`adm-profile-task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
                            <button
                              type="button"
                              className={`adm-task-check-circle ${task.status === 'Completed' ? 'checked' : ''}`}
                              onClick={() => toggleTaskStatus(task.id)}
                            >
                              {task.status === 'Completed' && <CheckCircle2 size={15} />}
                            </button>
                            <div className="adm-task-content-col">
                              <span className="adm-task-title-text">{task.title}</span>
                              <div className="adm-task-meta-line">
                                <span className={`adm-task-pri-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                                <span>•</span>
                                <span>{task.project}</span>
                                <span>•</span>
                                <span>Due: {task.due}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Managed VIP Clients Portfolio Card */}
                  <div className="adm-chart-card">
                    <div className="adm-chart-card-head">
                      <div className="adm-chart-title-wrap">
                        <Users size={18} className="text-green" />
                        <h3 className="adm-chart-card-title">Managed Client Portfolio</h3>
                      </div>
                      <button type="button" className="adm-mini-select-pill" onClick={() => setActiveSubTab('clients')}>
                        <span>All Clients</span>
                      </button>
                    </div>

                    {/* Segment Distribution Bar */}
                    <div className="adm-client-segments-wrap">
                      <div className="adm-client-seg-labels">
                        <span>Portfolio Distribution by Investor Class</span>
                        <strong>$18.4M Total</strong>
                      </div>
                      <div className="adm-seg-bar-track">
                        <div className="adm-seg-fill nrb" style={{ width: '42%' }} title="Diaspora/NRB: 42% ($7.8M)" />
                        <div className="adm-seg-fill corporate" style={{ width: '31%' }} title="Corporate: 31% ($5.7M)" />
                        <div className="adm-seg-fill residential" style={{ width: '27%' }} title="Residential Plots: 27% ($4.9M)" />
                      </div>
                      <div className="adm-seg-legend-row">
                        <span><span className="dot nrb" /> NRB Diaspora (42%)</span>
                        <span><span className="dot corporate" /> Commercial (31%)</span>
                        <span><span className="dot residential" /> Residential (27%)</span>
                      </div>
                    </div>

                    <div className="adm-vip-clients-list">
                      {PROFILE_MANAGED_CLIENTS.slice(0, 3).map((client) => (
                        <div key={client.id} className="adm-vip-client-item">
                          <div className="adm-vip-client-icon">
                            <Building2 size={16} />
                          </div>
                          <div className="adm-vip-client-info">
                            <div className="adm-vip-name-row">
                              <strong>{client.name}</strong>
                              <span className="adm-growth-pill green">{client.health} Health</span>
                            </div>
                            <span className="adm-vip-project-sub">{client.project}</span>
                          </div>
                          <div className="adm-vip-client-action">
                            <strong className="adm-vip-val">{client.val}</strong>
                            <span className="adm-vip-status">{client.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB 1: PERFORMANCE ANALYTICS */}
            {activeSubTab === 'performance' && (
              <div className="adm-profile-page-subview">
                <div className="adm-chart-card">
                  <div className="adm-chart-card-head">
                    <div className="adm-chart-title-wrap">
                      <TrendingUp size={18} className="text-purple" />
                      <div>
                        <h3 className="adm-chart-card-title">Executive Performance Analytics</h3>
                        <p className="adm-sub-caption">Monthly revenue targets, actual closed plot agreements, and closing velocity metrics</p>
                      </div>
                    </div>
                    <div className="adm-revenue-legend-row">
                      <span className="adm-pill-legend-item"><span className="adm-pill-legend-dot target" /><span>Monthly Target</span></span>
                      <span className="adm-pill-legend-item"><span className="adm-pill-legend-dot deals" /><span>Achieved Sales</span></span>
                    </div>
                  </div>

                  <div className="adm-revenue-chart-body" style={{ minHeight: '260px' }}>
                    <div className="adm-chart-yaxis">
                      <span>$4M</span>
                      <span>$3M</span>
                      <span>$2M</span>
                      <span>$1M</span>
                      <span>$0</span>
                    </div>
                    <div className="adm-chart-bars-wrap">
                      {PROFILE_PERFORMANCE_METRICS.map((col) => (
                        <div key={col.m} className="adm-month-col" title={`${col.m}: Target ${col.target}% | Achieved ${col.achieved}% (${col.val})`}>
                          <span className="adm-bar-top-pct" style={{ color: '#10b981', fontSize: '11px', fontWeight: 800 }}>{col.pct}%</span>
                          <div className="adm-dual-bar-container">
                            <div className="adm-bar-outer" style={{ height: `${col.target}%` }}>
                              <div className="adm-bar-inner" style={{ height: `${(col.achieved / col.target) * 100}%`, background: '#2563eb' }} />
                            </div>
                          </div>
                          <span className="adm-month-name">{col.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="adm-tab-stats-row" style={{ marginTop: '20px' }}>
                    <div className="adm-stat-box">
                      <span className="adm-stat-label">Total Volume Closed</span>
                      <strong className="adm-stat-value text-green">$14.8M</strong>
                      <span className="adm-stat-growth green">↗ 94.8% Annual Quota</span>
                    </div>
                    <div className="adm-stat-box">
                      <span className="adm-stat-label">Deals Finalized</span>
                      <strong className="adm-stat-value text-purple">90 Deals</strong>
                      <span className="adm-stat-sub">Residential & Commercial</span>
                    </div>
                    <div className="adm-stat-box">
                      <span className="adm-stat-label">Closing Velocity</span>
                      <strong className="adm-stat-value text-blue">11.4 Days</strong>
                      <span className="adm-stat-growth green">↗ 3.2 Days Faster</span>
                    </div>
                    <div className="adm-stat-box">
                      <span className="adm-stat-label">Lead Conversion Ratio</span>
                      <strong className="adm-stat-value">34.2%</strong>
                      <span className="adm-stat-sub">Industry Benchmark: 18%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB 2: TASKS & MILESTONES */}
            {activeSubTab === 'tasks' && (
              <div className="adm-profile-page-subview">
                <div className="adm-chart-card">
                  <div className="adm-chart-card-head">
                    <div className="adm-chart-title-wrap">
                      <ListTodo size={18} className="text-purple" />
                      <div>
                        <h3 className="adm-chart-card-title">Administrative Tasks & Project Milestones</h3>
                        <p className="adm-sub-caption">Track masterplan authorizations, legal land deeds, inventory reserves, and investor briefings</p>
                      </div>
                    </div>

                    <div className="adm-task-filter-pills">
                      {['all', 'In Progress', 'Completed', 'Urgent'].map(f => (
                        <button
                          key={f}
                          type="button"
                          className={`adm-filter-pill ${taskFilter === f ? 'active' : ''}`}
                          onClick={() => setTaskFilter(f)}
                        >
                          {f === 'all' ? 'All Tasks' : f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="adm-profile-task-list full">
                    {profileTasks
                      .filter(t => {
                        if (taskFilter === 'all') return true
                        if (taskFilter === 'Urgent') return t.priority === 'Urgent'
                        return t.status === taskFilter
                      })
                      .map((task) => (
                        <div key={task.id} className={`adm-profile-task-item detailed ${task.status === 'Completed' ? 'completed' : ''}`}>
                          <button
                            type="button"
                            className={`adm-task-check-circle ${task.status === 'Completed' ? 'checked' : ''}`}
                            onClick={() => toggleTaskStatus(task.id)}
                            title={task.status === 'Completed' ? 'Mark In Progress' : 'Mark Completed'}
                          >
                            {task.status === 'Completed' && <CheckCircle2 size={16} />}
                          </button>

                          <div className="adm-task-content-col">
                            <div className="adm-task-title-line">
                              <strong className="adm-task-title-text">{task.title}</strong>
                              <span className={`adm-task-pri-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                            </div>

                            <div className="adm-task-progress-track-row">
                              <div className="adm-progress-bar-bg" style={{ height: '6px' }}>
                                <div
                                  className="adm-progress-bar-fill"
                                  style={{
                                    width: `${task.progress}%`,
                                    background: task.status === 'Completed' ? '#10b981' : task.priority === 'Urgent' ? '#e11d48' : '#7c3aed'
                                  }}
                                />
                              </div>
                              <span className="adm-task-pct-num">{task.progress}%</span>
                            </div>

                            <div className="adm-task-meta-line">
                              <span className="adm-task-tag">{task.category}</span>
                              <span>•</span>
                              <span>Project: {task.project}</span>
                              <span>•</span>
                              <span>Due: {task.due}</span>
                              <span>•</span>
                              <span className="adm-task-status-lbl">{task.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB 3: CLIENT PORTFOLIO */}
            {activeSubTab === 'clients' && (
              <div className="adm-profile-page-subview">
                <div className="adm-chart-card">
                  <div className="adm-chart-card-head">
                    <div className="adm-chart-title-wrap">
                      <Users size={18} className="text-green" />
                      <div>
                        <h3 className="adm-chart-card-title">Managed VIP & Corporate Client Relationships</h3>
                        <p className="adm-sub-caption">High-net-worth individual investors, institutional buyers, and commercial leaseholders</p>
                      </div>
                    </div>
                    <span className="adm-role-badge-super">$18.4M Managed Portfolio</span>
                  </div>

                  {/* Portfolio Segment Distribution Chart */}
                  <div className="adm-client-segments-wrap full" style={{ margin: '14px 0 24px' }}>
                    <div className="adm-client-seg-labels">
                      <strong>Investor Segmentation Breakdown</strong>
                      <span>142 Managed Accounts</span>
                    </div>
                    <div className="adm-seg-bar-track" style={{ height: '14px', borderRadius: '8px' }}>
                      <div className="adm-seg-fill nrb" style={{ width: '42%' }} title="NRB & Foreign Diaspora: 42% ($7.8M)" />
                      <div className="adm-seg-fill corporate" style={{ width: '31%' }} title="Commercial & Corporate: 31% ($5.7M)" />
                      <div className="adm-seg-fill residential" style={{ width: '27%' }} title="Residential Estates: 27% ($4.9M)" />
                    </div>
                    <div className="adm-seg-legend-row" style={{ marginTop: '10px' }}>
                      <span><span className="dot nrb" /> NRB Diaspora Investors ($7.8M • 42%)</span>
                      <span><span className="dot corporate" /> Commercial & Corporate Buyers ($5.7M • 31%)</span>
                      <span><span className="dot residential" /> Residential Plot Owners ($4.9M • 27%)</span>
                    </div>
                  </div>

                  <div className="adm-vip-clients-grid">
                    {PROFILE_MANAGED_CLIENTS.map((client) => (
                      <div key={client.id} className="adm-vip-client-card">
                        <div className="adm-vip-card-top">
                          <div className="adm-vip-card-avatar">
                            <Building2 size={20} />
                          </div>
                          <div>
                            <strong className="adm-vip-card-name">{client.name}</strong>
                            <p className="adm-vip-card-comp">{client.company}</p>
                          </div>
                          <span className="adm-growth-pill green" style={{ marginLeft: 'auto' }}>{client.health} Health</span>
                        </div>

                        <div className="adm-vip-card-body">
                          <div className="adm-vip-card-row">
                            <span className="lbl">Property Interest</span>
                            <strong className="val">{client.project}</strong>
                          </div>
                          <div className="adm-vip-card-row">
                            <span className="lbl">Portfolio Commitment</span>
                            <strong className="val text-purple">{client.val}</strong>
                          </div>
                          <div className="adm-vip-card-row">
                            <span className="lbl">Pipeline Stage</span>
                            <span className="adm-growth-pill blue">{client.status}</span>
                          </div>
                          <div className="adm-vip-card-row">
                            <span className="lbl">Next Strategic Action</span>
                            <strong className="val text-green">{client.next}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB 4: INFORMATION-BASED STRATEGY */}
            {activeSubTab === 'strategy' && (
              <div className="adm-profile-page-subview">
                <div className="adm-chart-card">
                  <div className="adm-chart-card-head">
                    <div className="adm-chart-title-wrap">
                      <Target size={18} className="text-purple" />
                      <div>
                        <h3 className="adm-chart-card-title">Information-Based Strategic Command & Roadmap</h3>
                        <p className="adm-sub-caption">Translating empirical market data, satellite surveys, and buyer intent into actionable township development</p>
                      </div>
                    </div>
                    <span className="adm-perf-badge-pill"><Compass size={13} /><span>Strategic Index: 91.5%</span></span>
                  </div>

                  {/* Strategic Execution Progress Bars */}
                  <div className="adm-strategy-chart-body" style={{ margin: '14px 0 24px' }}>
                    <div className="adm-strategy-bars-list">
                      {PROFILE_STRATEGY_PILLARS.map((pillar) => (
                        <div key={pillar.id} className="adm-strategy-bar-row detailed">
                          <div className="adm-strategy-row-head">
                            <div className="adm-strategy-title-wrap">
                              <span className="adm-pillar-id-tag">{pillar.id}</span>
                              <strong className="adm-strategy-pillar-title">{pillar.title}</strong>
                            </div>
                            <div className="adm-strategy-val-wrap">
                              <span className="adm-strategy-metric-lbl">{pillar.metric}</span>
                              <strong className="adm-strategy-pillar-val" style={{ color: pillar.color }}>{pillar.pct}%</strong>
                            </div>
                          </div>

                          <div className="adm-progress-bar-bg" style={{ height: '10px' }}>
                            <div
                              className="adm-progress-bar-fill"
                              style={{ width: `${pillar.pct}%`, background: pillar.color }}
                            />
                          </div>

                          <div className="adm-strategy-grid-meta">
                            <div className="adm-strat-meta-box">
                              <span className="lbl">Verified Information Signal</span>
                              <p className="val">{pillar.signal}</p>
                            </div>
                            <div className="adm-strat-meta-box">
                              <span className="lbl">Empirical ROI / Business Outcome</span>
                              <p className="val text-green">{pillar.outcome}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Decision Matrix */}
                  <div className="adm-chart-card-head" style={{ borderTop: '1px solid #edf2f7', paddingTop: '18px', marginTop: '12px' }}>
                    <div className="adm-chart-title-wrap">
                      <FileText size={17} className="text-blue" />
                      <h4 className="adm-chart-card-title" style={{ fontSize: '15px' }}>Information-Driven Decision Matrix (Q2/Q3 Strategy)</h4>
                    </div>
                  </div>

                  <div className="adm-data-table-card" style={{ border: 'none', boxShadow: 'none' }}>
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Strategic Focus Area</th>
                          <th>Market Intelligence & Data Source</th>
                          <th>Executive Action Executed</th>
                          <th>Target Timeline</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Waterfront Zoning Expansion</strong></td>
                          <td>Turag Riverfront soil density survey + 120 NRB consultations</td>
                          <td>Reallocated 35 acres for premium waterfront residential estates</td>
                          <td>Q3 2024</td>
                          <td><span className="adm-growth-pill green">Delivered</span></td>
                        </tr>
                        <tr>
                          <td><strong>Commercial Boulevard Acceleration</strong></td>
                          <td>Dhaka Western bypass expansion traffic velocity data</td>
                          <td>Doubled 120ft boulevard brick paving crew & equipment</td>
                          <td>Q3 2024</td>
                          <td><span className="adm-growth-pill blue">On Track (88%)</span></td>
                        </tr>
                        <tr>
                          <td><strong>Diaspora Capital Inflow</strong></td>
                          <td>Inquiry surge from London, Dubai & New York diaspora</td>
                          <td>Established dedicated digital escrow & video consultation pipeline</td>
                          <td>Ongoing</td>
                          <td><span className="adm-growth-pill purple">Scaling (92%)</span></td>
                        </tr>
                        <tr>
                          <td><strong>Material Cost Hedging</strong></td>
                          <td>Steel rebar market price trend analytics</td>
                          <td>Bulk contracted 200 tons 500W rebar at 8.5% discount reserve</td>
                          <td>Complete</td>
                          <td><span className="adm-growth-pill green">Protected</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB 5: ACCOUNT INFO (GENERAL) */}
            {activeSubTab === 'general' && (
              <div className="adm-profile-content-grid">
                <div className="adm-chart-card adm-profile-form-card">
                  <div className="adm-chart-card-head">
                    <div className="adm-chart-title-wrap">
                      <User size={18} className="text-purple" />
                      <h3 className="adm-chart-card-title">Personal & Professional Identity</h3>
                    </div>
                    <span className="adm-legend-lbl">Last synchronized: Today</span>
                  </div>

                  <form className="adm-form-grid" onSubmit={handleSaveProfile}>
                    <div className="adm-input-group">
                      <label>Full Legal Name</label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        placeholder="e.g. Mahadi Hasan Freeman"
                        required
                      />
                    </div>

                    <div className="adm-input-group">
                      <label>Official Administrative Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="adm-input-disabled"
                      />
                      <small className="adm-hint-text">Managed via primary authentication provider</small>
                    </div>

                    <div className="adm-input-group">
                      <label>Contact Phone Number</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+880 1711-223344"
                      />
                    </div>

                    <div className="adm-input-group">
                      <label>Designation / Title</label>
                      <input
                        type="text"
                        value={profileForm.designation}
                        onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                        placeholder="e.g. Managing Director & Principal Admin"
                      />
                    </div>

                    <div className="adm-input-group">
                      <label>Department / Division</label>
                      <input
                        type="text"
                        value={profileForm.department}
                        onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                        placeholder="e.g. Executive Operations & Real Estate Development"
                      />
                    </div>

                    <div className="adm-input-group">
                      <label>Headquarters Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="e.g. Dhaka Icon City Corporate HQ, Banani, Dhaka"
                      />
                    </div>

                    <div className="adm-input-group full-width">
                      <label>Executive Bio / Scope of Authority</label>
                      <textarea
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        placeholder="Describe administrative oversight..."
                      />
                    </div>

                    <div className="adm-form-actions-bar full-width">
                      <button type="submit" className="adm-pill-btn primary-dark" disabled={saving}>
                        {saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />}
                        <span>Save Changes</span>
                      </button>
                      <button
                        type="button"
                        className="adm-pill-btn"
                        onClick={() => {
                          setProfileForm({
                            fullName: profile?.full_name || user?.email || '',
                            phone: profile?.phone || '+880 1711-223344',
                            designation: 'Managing Director & Principal Administrator',
                            department: 'Executive Operations & Real Estate Development',
                            location: 'Dhaka Icon City Corporate HQ, Banani, Dhaka',
                            bio: 'Overseeing masterplan developments, land acquisition, luxury township governance, and high-value investor relations across Elite Iconic Properties & Construction Ltd.'
                          })
                        }}
                      >
                        Reset Defaults
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Side: Quick Organization Card */}
                <div className="adm-chart-card adm-profile-side-card">
                  <div className="adm-chart-card-head">
                    <div className="adm-chart-title-wrap">
                      <Briefcase size={17} className="text-blue" />
                      <h3 className="adm-chart-card-title">Corporate Affiliation</h3>
                    </div>
                  </div>

                  <div className="adm-profile-corp-body">
                    <div className="adm-corp-logo-wrap">
                      <img src="/Logo.png" alt="Company Logo" className="adm-corp-preview-logo" />
                      <div>
                        <strong>Elite Iconic Properties & Construction Ltd.</strong>
                        <p>Registration: C-198244 • REHAB Member</p>
                      </div>
                    </div>

                    <div className="adm-corp-list">
                      <div className="adm-corp-row">
                        <span className="lbl">Flagship Project</span>
                        <strong className="val">Dhaka Icon City</strong>
                      </div>
                      <div className="adm-corp-row">
                        <span className="lbl">Corporate Office</span>
                        <strong className="val">Banani, Dhaka-1213</strong>
                      </div>
                      <div className="adm-corp-row">
                        <span className="lbl">System Role</span>
                        <strong className="val text-purple">Superadmin Privilege</strong>
                      </div>
                      <div className="adm-corp-row">
                        <span className="lbl">Database Engine</span>
                        <strong className="val text-green">Supabase Cloud PostgreSQL</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB 6: SECURITY & CREDENTIALS */}
            {activeSubTab === 'security' && (
              <div className="adm-profile-content-grid">
                <div className="adm-chart-card">
                  <div className="adm-chart-card-head">
                    <div className="adm-chart-title-wrap">
                      <Key size={18} className="text-purple" />
                      <h3 className="adm-chart-card-title">Update Security Password</h3>
                    </div>
                  </div>

                  {passwordMsg && (
                    <div className={`adm-alert ${passwordMsg.type === 'error' ? 'danger' : 'success'}`} style={{ margin: '14px 0' }}>
                      {passwordMsg.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                      <span>{passwordMsg.text}</span>
                    </div>
                  )}

                  <form className="adm-form-grid" onSubmit={handleUpdatePassword}>
                    <div className="adm-input-group full-width">
                      <label>New Administrative Password</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={passwordForm.newPass}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                        required
                        minLength={6}
                      />
                      <small className="adm-hint-text">Minimum 6 characters with mixed uppercase, digits and symbols recommended.</small>
                    </div>

                    <div className="adm-input-group full-width">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={passwordForm.confirmPass}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPass: e.target.value })}
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="adm-form-actions-bar full-width">
                      <button type="submit" className="adm-pill-btn primary-dark">
                        <Lock size={14} />
                        <span>Update Password</span>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="adm-chart-card">
                  <div className="adm-chart-card-head">
                    <div className="adm-chart-title-wrap">
                      <ShieldCheck size={18} className="text-green" />
                      <h3 className="adm-chart-card-title">Active Authorized Sessions</h3>
                    </div>
                  </div>

                  <div className="adm-sessions-list">
                    <div className="adm-session-item current">
                      <div className="adm-session-icon">
                        <LayoutDashboard size={20} />
                      </div>
                      <div className="adm-session-info">
                        <strong>Windows 11 • Chrome 124 (Current Session)</strong>
                        <span>IP 103.205.71.18 • Banani, Dhaka, Bangladesh</span>
                        <small className="text-green">Active Now • TLS 1.3 Verified</small>
                      </div>
                      <span className="adm-growth-pill green">This Device</span>
                    </div>

                    <div className="adm-session-item">
                      <div className="adm-session-icon">
                        <Smartphone size={20} />
                      </div>
                      <div className="adm-session-info">
                        <strong>Apple iPhone 15 Pro • Mobile Safari</strong>
                        <span>IP 103.205.71.42 • Gulshan, Dhaka</span>
                        <small className="text-muted">Last active 2 hours ago</small>
                      </div>
                      <span className="adm-growth-pill blue">Mobile</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Inquiry Detail Drawer (if opened) */}
      {selectedInquiry && (
        <div className="adm-drawer-overlay" onClick={() => setSelectedInquiry(null)}>
          <aside className="adm-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="adm-drawer-head">
              <div>
                <h3>{selectedInquiry.name}</h3>
                <span className="adm-badge adm-badge-confirmed">Plot Inquiry</span>
              </div>
              <button className="adm-icon-btn" onClick={() => setSelectedInquiry(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <dl className="adm-detail">
              {[
                ['Phone', selectedInquiry.phone],
                ['Email', selectedInquiry.email],
                ['Plot Category', selectedInquiry.plot_category],
                ['Plot Size', selectedInquiry.plot_size],
                ['Message', selectedInquiry.message],
                ['Received', fmtDate(selectedInquiry.created_at)]
              ].filter(([, v]) => v).map(([k, v]) => (<div key={k}><dt>{k}</dt><dd className="adm-wrap">{v}</dd></div>))}
            </dl>
            <div className="adm-drawer-actions">
              <button className="adm-btn adm-btn-primary" onClick={() => setSelectedInquiry(null)}>Done</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
