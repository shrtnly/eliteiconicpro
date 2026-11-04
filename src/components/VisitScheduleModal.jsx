import React, { useState, useEffect, useCallback } from 'react'
import {
  Calendar,
  X,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  User,
  Car,
  Building2,
  Check,
  Loader2
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const INITIAL_FORM_STATE = {
  name: '',
  phone: '',
  location: '',
  purpose: 'Project Visit',
  date: '',
  timeSlot: '10:00 AM',
  pickupLoc: '',
  plotSize: '3 Katha [Residential]',
  investmentAmount: '50 Lakh - 1 Crore BDT'
}

const VisitScheduleModal = React.memo(function VisitScheduleModal({
  isOpen,
  onClose,
  lang = 'en',
  onLog
}) {
  const [visitForm, setVisitForm] = useState(INITIAL_FORM_STATE)
  const [visitSubmitting, setVisitSubmitting] = useState(false)
  const [visitSuccess, setVisitSuccess] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Reset closing animation state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Smooth exit animation handler (~170ms)
  const handleAnimatedClose = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setVisitSuccess(false)
      onClose()
    }, 170)
  }, [isClosing, onClose])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleAnimatedClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleAnimatedClose])

  if (!isOpen) return null

  const todayIso = new Date().toISOString().split('T')[0]

  const updateField = (field, value) => {
    setVisitForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'purpose') {
        if (value === 'Office Visit' && prev.timeSlot === '10:00 AM') {
          next.timeSlot = '11:00 AM'
        } else if (value === 'Project Visit' && prev.timeSlot === '11:00 AM') {
          next.timeSlot = '10:00 AM'
        }
      }
      return next
    })
  }

  const getPurposeLabel = (purposeValue) => {
    const map = {
      'Project Visit': lang === 'bn' ? 'প্রকল্প পরিদর্শন' : 'Project Site Visit',
      'Buy Plot': lang === 'bn' ? 'প্লট বুকিং ও ক্রয়' : 'Plot Booking Consultation',
      'Office Visit': lang === 'bn' ? 'হেড অফিস মিটিং' : 'Head Office Meeting',
      'Online Consultation': lang === 'bn' ? 'অনলাইন ভিডিও পরামর্শ' : 'Online Consultation',
      'Interested Partner': lang === 'bn' ? 'ইনভেস্টমেন্ট / পার্টনারশিপ' : 'Investment Partnership',
      'Attend Seminar': lang === 'bn' ? 'সেমিনারে অংশগ্রহণ' : 'Attend Investor Seminar'
    }
    return map[purposeValue] || purposeValue
  }

  const getTimeSlotLabel = (slot) => {
    if (lang === 'bn') {
      const bnMap = {
        '10:00 AM': 'সকাল ১০:০০ টা',
        '11:00 AM': 'সকাল ১১:০০ টা',
        '12:30 PM': 'দুপুর ১২:৩০ টা',
        '02:30 PM': 'দুপুর ০২:৩০ টা',
        '03:30 PM': 'বিকাল ০৩:৩০ টা',
        '04:30 PM': 'বিকাল ০৪:৩০ টা'
      }
      return bnMap[slot] || slot
    }
    return slot
  }

  const handleVisitSubmit = async (e) => {
    e.preventDefault()
    if (visitSubmitting) return
    setVisitSubmitting(true)

    // Construct summary details
    let dynamicDetails = `Purpose: ${visitForm.purpose}`
    if (visitForm.purpose === 'Project Visit') {
      dynamicDetails += ` | Date: ${visitForm.date || 'Flexible'} (${visitForm.timeSlot}) | Pickup: ${visitForm.pickupLoc || 'N/A'}`
    } else if (visitForm.purpose === 'Buy Plot') {
      dynamicDetails += ` | Plot Size: ${visitForm.plotSize} | Preferred Call/Visit: ${visitForm.timeSlot}`
    } else if (visitForm.purpose === 'Office Visit') {
      dynamicDetails += ` | Date: ${visitForm.date || 'Flexible'} (${visitForm.timeSlot})`
    } else if (visitForm.purpose === 'Interested Partner') {
      dynamicDetails += ` | Approx Investment: ${visitForm.investmentAmount}`
    } else {
      dynamicDetails += ` | Date: ${visitForm.date || 'Flexible'} (${visitForm.timeSlot})`
    }

    // Structured payload for Supabase "Schedule & Consultation" table
    const scheduleRecord = {
      full_name: visitForm.name.trim(),
      phone: visitForm.phone.trim(),
      location: visitForm.location.trim(),
      purpose: visitForm.purpose,
      visit_date: visitForm.date || null,
      preferred_time: visitForm.timeSlot || null,
      pickup_location: visitForm.purpose === 'Project Visit' ? (visitForm.pickupLoc.trim() || null) : null,
      plot_size: visitForm.purpose === 'Buy Plot' ? visitForm.plotSize : null,
      investment_amount: visitForm.purpose === 'Interested Partner' ? visitForm.investmentAmount : null,
      details: dynamicDetails,
      status: 'pending'
    }

    // Persist locally immediately as a zero-latency backup
    try {
      const existing = JSON.parse(localStorage.getItem('dreamzone_schedule_consultations') || '[]')
      existing.unshift({ ...scheduleRecord, created_at: new Date().toISOString() })
      localStorage.setItem('dreamzone_schedule_consultations', JSON.stringify(existing.slice(0, 100)))
    } catch {
      // ignore storage errors
    }

    // Async database insert into "Schedule & Consultation" table
    const dbInsertTask = (async () => {
      try {
        const { error } = await supabase
          .from('Schedule & Consultation')
          .insert([scheduleRecord])

        if (error) {
          onLog?.(`DB Notice ("Schedule & Consultation"): ${error.message}`, 'error')
        } else {
          onLog?.(`✓ Schedule saved to Supabase "Schedule & Consultation" table.`, 'success')
        }
      } catch (err) {
        onLog?.(`Schedule DB Error: ${err.message}`, 'error')
      }
    })()

    // Cap UI wait at 280ms so confirmation feels instantaneous and never hangs
    await Promise.race([
      dbInsertTask,
      new Promise((resolve) => setTimeout(resolve, 280))
    ])

    setVisitSubmitting(false)
    setVisitSuccess(true)
  }

  return (
    <div
      className={`elite-modal-overlay visit-modal-overlay ${isClosing ? 'is-exiting' : 'is-entering'}`}
      onClick={handleAnimatedClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="visit-modal-heading"
    >
      <div
        className={`visit-modal-content ${isClosing ? 'is-exiting' : 'is-entering'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Emerald & Gold Accent Bar */}
        {/* Executive Header */}
        <div className="visit-modal-header">
          <div className="visit-modal-title-box">
            <div className="visit-modal-icon-wrap">
              <Calendar size={22} />
            </div>
            <div className="visit-modal-heading-group">
              <span className="visit-modal-eyebrow">
               
              </span>
              <h3 id="visit-modal-heading" className="visit-modal-title">
                {lang === 'bn' ? 'শিডিউল বুকিং ও কনসালটেশন' : 'Schedule & Consultation'}
              </h3>
              <p className="visit-modal-subtitle">
                {lang === 'bn'
                  ? 'প্রকল্প পরিদর্শন, অফিস মিটিং বা প্লট বিনিয়োগের পরামর্শ বুক করুন'
                  : 'Book a private site tour, office meeting & investment consultation'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={handleAnimatedClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

     

        {visitSuccess ? (
          <div className="visit-success-state">
            <div className="visit-success-icon-wrap">
              <CheckCircle2 size={46} />
            </div>
            <h4>
              {lang === 'bn' ? 'আপনার শিডিউল নিশ্চিত করা হয়েছে!' : 'Schedule Confirmed!'}
            </h4>
            <p>
              {lang === 'bn'
                ? `ধন্যবাদ ${visitForm.name || ''}! আপনার অনুরোধটি সফলভাবে গৃহীত হয়েছে। আমাদের সিনিয়র কনসালটেন্ট দ্রুত আপনার সাথে যোগাযোগ করবেন।`
                : `Thank you, ${visitForm.name || 'valued guest'}! Your consultation request has been registered. Our senior advisor will call you shortly.`}
            </p>

            {/* Structured Summary Card */}
            <div className="visit-summary-card">
              <div className="visit-summary-row">
                <span className="visit-summary-label">
                  {lang === 'bn' ? 'উদ্দেশ্য' : 'Schedule Type'}
                </span>
                <span className="visit-summary-val highlight">
                  {getPurposeLabel(visitForm.purpose)}
                </span>
              </div>
              <div className="visit-summary-row">
                <span className="visit-summary-label">
                  {lang === 'bn' ? 'নাম ও মোবাইল' : 'Guest & Phone'}
                </span>
                <span className="visit-summary-val">
                  {visitForm.name} • {visitForm.phone}
                </span>
              </div>
              {(visitForm.purpose === 'Project Visit' || visitForm.purpose === 'Office Visit') && (
                <div className="visit-summary-row">
                  <span className="visit-summary-label">
                    {lang === 'bn' ? 'তারিখ ও সময়' : 'Date & Time'}
                  </span>
                  <span className="visit-summary-val">
                    {visitForm.date || (lang === 'bn' ? 'আসন্ন তারিখ' : 'Flexible Date')} • {getTimeSlotLabel(visitForm.timeSlot)}
                  </span>
                </div>
              )}
              {visitForm.purpose === 'Project Visit' && visitForm.pickupLoc && (
                <div className="visit-summary-row">
                  <span className="visit-summary-label">
                    {lang === 'bn' ? 'পিকআপ পয়েন্ট' : 'Pickup Point'}
                  </span>
                  <span className="visit-summary-val">{visitForm.pickupLoc}</span>
                </div>
              )}
              {visitForm.purpose === 'Buy Plot' && (
                <div className="visit-summary-row">
                  <span className="visit-summary-label">
                    {lang === 'bn' ? 'পছন্দের প্লট সাইজ' : 'Plot Preference'}
                  </span>
                  <span className="visit-summary-val">{visitForm.plotSize}</span>
                </div>
              )}
              {visitForm.purpose === 'Interested Partner' && (
                <div className="visit-summary-row">
                  <span className="visit-summary-label">
                    {lang === 'bn' ? 'সম্ভাব্য বাজেট' : 'Investment Range'}
                  </span>
                  <span className="visit-summary-val">{visitForm.investmentAmount}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="btn-modal-done"
              onClick={handleAnimatedClose}
            >
              <Check size={16} />
              <span>{lang === 'bn' ? 'সম্পন্ন করুন' : 'Done'}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleVisitSubmit} className="visit-schedule-form">
            {/* Row 1: Full Name & Mobile Number */}
            <div className="form-row-2">
              <div className="form-group-item">
                <label className="input-label">
                  {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <div className="visit-input-wrap">
                  <User size={15} className="visit-input-icon" />
                  <input
                    type="text"
                    className="text-input-field has-icon"
                    placeholder={lang === 'bn' ? 'উদাঃ মোঃ আরিফুল ইসলাম' : 'e.g. Ariful Islam'}
                    value={visitForm.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="form-group-item">
                <label className="input-label">
                  {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                </label>
                <div className="visit-input-wrap">
                  <Phone size={15} className="visit-input-icon" />
                  <input
                    type="tel"
                    className="text-input-field has-icon"
                    placeholder={lang === 'bn' ? '018XX-XXXXXX' : '+880 18XX-XXXXXX'}
                    value={visitForm.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Location & Purpose of Schedule */}
            <div className="form-row-2">
              <div className="form-group-item">
                <label className="input-label">
                  {lang === 'bn' ? 'বর্তমান ঠিকানা / এলাকা *' : 'Location / Address *'}
                </label>
                <div className="visit-input-wrap">
                  <MapPin size={15} className="visit-input-icon" />
                  <input
                    type="text"
                    className="text-input-field has-icon"
                    placeholder={lang === 'bn' ? 'উত্তরা / ধানমন্ডি / প্রবাসী' : 'e.g. Uttara, Dhaka / NRB'}
                    value={visitForm.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group-item">
                <label className="input-label">
                  {lang === 'bn' ? 'শিডিউলের উদ্দেশ্য *' : 'Purpose of Schedule *'}
                </label>
                <select
                  className="select-input-field visit-select-field"
                  value={visitForm.purpose}
                  onChange={(e) => updateField('purpose', e.target.value)}
                >
                  <option value="Project Visit">
                    {lang === 'bn' ? 'প্রকল্প পরিদর্শন (Project Visit)' : 'Project Site Visit'}
                  </option>
                  <option value="Buy Plot">
                    {lang === 'bn' ? 'প্লট বুকিং ও ক্রয় (Buy Plot)' : 'Plot Booking Consultation'}
                  </option>
                  <option value="Office Visit">
                    {lang === 'bn' ? 'হেড অফিস মিটিং (Office Visit)' : 'Head Office Meeting'}
                  </option>
                  <option value="Online Consultation">
                    {lang === 'bn' ? 'অনলাইন পরামর্শ (Online Session)' : 'Online Video Consultation'}
                  </option>
                  <option value="Interested Partner">
                    {lang === 'bn' ? 'ইনভেস্টমেন্ট / পার্টনারশিপ' : 'Investment / Partnership'}
                  </option>
                  <option value="Attend Seminar">
                    {lang === 'bn' ? 'সেমিনারে অংশগ্রহণ (Seminar)' : 'Attend Investor Seminar'}
                  </option>
                </select>
              </div>
            </div>

            {/* CONDITIONAL: Project Visit -> Date, Time, Pickup Location */}
            {visitForm.purpose === 'Project Visit' && (
              <div className="modal-dynamic-box">
                <div className="dynamic-box-badge">
                  <Car size={13} />
                  <span>
                    {lang === 'bn'
                      ? 'কমপ্লিমেন্টারি পিক-অ্যান্ড-ড্রপ সার্ভিস'
                      : 'Complimentary Pick & Drop Service'}
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group-item">
                    <label className="input-label">
                      {lang === 'bn' ? 'ভিজিটের তারিখ *' : 'Visit Date *'}
                    </label>
                    <input
                      type="date"
                      min={todayIso}
                      className="text-input-field"
                      value={visitForm.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">
                      {lang === 'bn' ? 'পছন্দের সময় *' : 'Preferred Time *'}
                    </label>
                    <select
                      className="select-input-field visit-select-field"
                      value={visitForm.timeSlot}
                      onChange={(e) => updateField('timeSlot', e.target.value)}
                    >
                      <option value="10:00 AM">
                        {lang === 'bn' ? 'সকাল ১০:০০ টা' : 'Morning — 10:00 AM'}
                      </option>
                      <option value="12:30 PM">
                        {lang === 'bn' ? 'দুপুর ১২:৩০ টা' : 'Midday — 12:30 PM'}
                      </option>
                      <option value="03:30 PM">
                        {lang === 'bn' ? 'বিকাল ০৩:৩০ টা' : 'Afternoon — 03:30 PM'}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group-item" style={{ marginTop: '12px' }}>
                  <label className="input-label">
                    {lang === 'bn' ? 'পিকআপ লোকেশন *' : 'Pickup Location *'}
                  </label>
                  <div className="visit-input-wrap">
                    <MapPin size={15} className="visit-input-icon" />
                    <input
                      type="text"
                      className="text-input-field has-icon"
                      placeholder={
                        lang === 'bn'
                          ? 'উদাঃ গুলশান অফিস / উত্তরা / মিরপুর-১০'
                          : 'e.g. Gulshan-2 / Uttara / Mirpur-10'
                      }
                      value={visitForm.pickupLoc}
                      onChange={(e) => updateField('pickupLoc', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CONDITIONAL: Buy Plot -> Ask Plot Size & Preferred Call Slot */}
            {visitForm.purpose === 'Buy Plot' && (
              <div className="modal-dynamic-box">
                <div className="dynamic-box-badge">
                  <Sparkles size={13} />
                  <span>
                    {lang === 'bn'
                      ? 'প্রাইম প্লট সিলেকশন ও সহজ কিস্তি সুবিধা'
                      : 'Prime Plot Allocation & Flexible EMI Options'}
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group-item">
                    <label className="input-label">
                      {lang === 'bn' ? 'আগ্রহী প্লটের সাইজ *' : 'Preferred Plot Size *'}
                    </label>
                    <select
                      className="select-input-field visit-select-field"
                      value={visitForm.plotSize}
                      onChange={(e) => updateField('plotSize', e.target.value)}
                    >
                      <option value="3 Katha [Residential]">
                        {lang === 'bn' ? '৩ কাঠা — রেসিডেন্সিয়াল' : '3 Katha — Standard Residential'}
                      </option>
                      <option value="5 Katha [Duplex/Villa]">
                        {lang === 'bn' ? '৫ কাঠা — এক্সক্লুসিভ ভিলা' : '5 Katha — Exclusive Villa Plot'}
                      </option>
                      <option value="10 Katha [Premium Estate]">
                        {lang === 'bn' ? '১০ কাঠা — প্রিমিয়াম এস্টেট' : '10 Katha — Premium Estate'}
                      </option>
                      <option value="20 Katha [1 Bigha Grand]">
                        {lang === 'bn' ? '১ বিঘা — লাক্সারি গ্র্যান্ড প্লট' : '1 Bigha (20 Katha) — Grand Plot'}
                      </option>
                      <option value="Commercial / Corner Plot">
                        {lang === 'bn' ? 'কমার্শিয়াল / কর্নার প্লট' : 'Commercial / Corner Plot'}
                      </option>
                    </select>
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">
                      {lang === 'bn' ? 'কনসালটেশন সময় *' : 'Preferred Call Time *'}
                    </label>
                    <select
                      className="select-input-field visit-select-field"
                      value={visitForm.timeSlot}
                      onChange={(e) => updateField('timeSlot', e.target.value)}
                    >
                      <option value="10:00 AM">
                        {lang === 'bn' ? 'সকাল ১০:০০ টা' : 'Morning — 10:00 AM'}
                      </option>
                      <option value="12:30 PM">
                        {lang === 'bn' ? 'দুপুর ১২:৩০ টা' : 'Midday — 12:30 PM'}
                      </option>
                      <option value="03:30 PM">
                        {lang === 'bn' ? 'বিকাল ০৩:৩০ টা' : 'Afternoon — 03:30 PM'}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* CONDITIONAL: Office Visit -> Date and Time */}
            {visitForm.purpose === 'Office Visit' && (
              <div className="modal-dynamic-box">
                <div className="dynamic-box-badge">
                  <Building2 size={13} />
                  <span>
                    {lang === 'bn'
                      ? 'নাফি টাওয়ার (লেভেল-১০), ৫৩ গুলশান এভিনিউ, ঢাকা-১২১২'
                      : 'Nafi Tower (Level 10), 53 Gulshan Avenue, Dhaka-1212'}
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group-item">
                    <label className="input-label">
                      {lang === 'bn' ? 'অফিস মিটিংয়ের তারিখ *' : 'Meeting Date *'}
                    </label>
                    <input
                      type="date"
                      min={todayIso}
                      className="text-input-field"
                      value={visitForm.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">
                      {lang === 'bn' ? 'পছন্দের সময় *' : 'Preferred Time *'}
                    </label>
                    <select
                      className="select-input-field visit-select-field"
                      value={visitForm.timeSlot}
                      onChange={(e) => updateField('timeSlot', e.target.value)}
                    >
                      <option value="11:00 AM">
                        {lang === 'bn' ? 'সকাল ১১:০০ টা' : 'Morning — 11:00 AM'}
                      </option>
                      <option value="02:30 PM">
                        {lang === 'bn' ? 'দুপুর ০২:৩০ টা' : 'Afternoon — 02:30 PM'}
                      </option>
                      <option value="04:30 PM">
                        {lang === 'bn' ? 'বিকাল ০৪:৩০ টা' : 'Evening — 04:30 PM'}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* CONDITIONAL: Interested Partner -> Approx Investment Amount */}
            {visitForm.purpose === 'Interested Partner' && (
              <div className="modal-dynamic-box">
                <div className="dynamic-box-badge">
                  <Sparkles size={13} />
                  <span>
                    {lang === 'bn'
                      ? 'বোর্ড অব ডিরেক্টরস ও ইনভেস্টমেন্ট টিমের সাথে সরাসরি মিটিং'
                      : 'Direct Executive Advisory & Co-Investment Opportunity'}
                  </span>
                </div>

                <div className="form-group-item">
                  <label className="input-label">
                    {lang === 'bn'
                      ? 'সম্ভাব্য বিনিয়োগের পরিমাণ *'
                      : 'Approx. Investment Range *'}
                  </label>
                  <select
                    className="select-input-field visit-select-field"
                    value={visitForm.investmentAmount}
                    onChange={(e) => updateField('investmentAmount', e.target.value)}
                  >
                    <option value="25 - 50 Lakh BDT">
                      {lang === 'bn' ? '২৫ – ৫০ লক্ষ টাকা' : '25 – 50 Lakh BDT'}
                    </option>
                    <option value="50 Lakh - 1 Crore BDT">
                      {lang === 'bn' ? '৫০ লক্ষ – ১ কোটি টাকা' : '50 Lakh – 1 Crore BDT'}
                    </option>
                    <option value="1 - 3 Crore BDT">
                      {lang === 'bn' ? '১ কোটি – ৩ কোটি টাকা' : '1 – 3 Crore BDT'}
                    </option>
                    <option value="3 - 5 Crore BDT">
                      {lang === 'bn' ? '৩ কোটি – ৫ কোটি টাকা' : '3 – 5 Crore BDT'}
                    </option>
                    <option value="5+ Crore BDT">
                      {lang === 'bn' ? '৫ কোটি+ টাকা' : '5+ Crore BDT'}
                    </option>
                    <option value="Negotiable / Custom">
                      {lang === 'bn' ? 'আলোচনা সাপেক্ষে' : 'Custom / Discuss in Meeting'}
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* CONDITIONAL: Online Consultation or Attend Seminar */}
            {(visitForm.purpose === 'Online Consultation' || visitForm.purpose === 'Attend Seminar') && (
              <div className="modal-dynamic-box">
                <div className="dynamic-box-badge">
                  <Clock size={13} />
                  <span>
                    {visitForm.purpose === 'Online Consultation'
                      ? lang === 'bn'
                        ? 'হোয়াটসঅ্যাপ / জুম ভিডিও কলের মাধ্যমে ১-অন-১ পরামর্শ'
                        : '1-on-1 Session via Zoom / Video Call'
                      : lang === 'bn'
                        ? 'আসন্ন ইনভেস্টর সেমিনারের আমন্ত্রণপত্র পাঠানো হবে'
                        : 'Receive VIP Invitation for Upcoming Investor Seminar'}
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group-item">
                    <label className="input-label">
                      {lang === 'bn' ? 'পছন্দের তারিখ (ঐচ্ছিক)' : 'Preferred Date (Optional)'}
                    </label>
                    <input
                      type="date"
                      min={todayIso}
                      className="text-input-field"
                      value={visitForm.date}
                      onChange={(e) => updateField('date', e.target.value)}
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="input-label">
                      {lang === 'bn' ? 'পছন্দের সময় *' : 'Preferred Time *'}
                    </label>
                    <select
                      className="select-input-field visit-select-field"
                      value={visitForm.timeSlot}
                      onChange={(e) => updateField('timeSlot', e.target.value)}
                    >
                      <option value="11:00 AM">
                        {lang === 'bn' ? 'সকাল ১১:০০ টা' : 'Morning — 11:00 AM'}
                      </option>
                      <option value="03:30 PM">
                        {lang === 'bn' ? 'বিকাল ০৩:৩০ টা' : 'Afternoon — 03:30 PM'}
                      </option>
                      <option value="08:00 PM">
                        {lang === 'bn' ? 'রাত ০৮:০০ টা (প্রবাসী স্লট)' : 'Evening — 08:00 PM (NRB Slot)'}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Submit & Cancel Footer */}
            <div className="visit-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={handleAnimatedClose}
              >
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={visitSubmitting}
              >
                {visitSubmitting ? (
                  <>
                    <Loader2 size={16} className="visit-spin-icon" />
                    <span>{lang === 'bn' ? 'নিশ্চিত হচ্ছে...' : 'Confirming...'}</span>
                  </>
                ) : (
                  <>
                    <Calendar size={16} />
                    <span>{lang === 'bn' ? 'নিশ্চিত করুন' : 'Confirm Schedule'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
})

export default VisitScheduleModal

