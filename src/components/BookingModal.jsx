import React, { useEffect, useCallback } from 'react'
import {
  X,
  Calendar,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'

export default function BookingModal({
  isOpen,
  onClose,
  lang = 'en',
  t,
  formData,
  setFormData,
  handleSubmit,
  isSubmitting,
  formSuccess,
  setFormSuccess
}) {
  // Close on ESC
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="elite-modal-overlay booking-popup-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="form-card-side booking-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button 
          type="button" 
          className="modal-close-btn booking-popup-close" 
          onClick={onClose}
          aria-label={lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
        >
          <X size={18} />
        </button>

        <div className="booking-form-card-header">
          <div className="booking-form-header-top">
            <span className="booking-form-status-dot" aria-hidden="true" />
            <span className="booking-form-kicker">
              {lang === 'bn' ? 'সরাসরি ডেভেলপার ডেস্ক • ফেজ ১ বুকিং চলছে' : 'DIRECT DEVELOPER DESK • PHASE 1 OPEN'}
            </span>
          </div>
          <h3 className="booking-form-card-title">
            {lang === 'bn' ? 'প্লট বুকিং ও ইনকোয়ারি ফর্ম' : 'Priority Plot Booking & Inquiry Form'}
          </h3>
          <p className="booking-form-card-sub">
            {lang === 'bn'
              ? 'নিচের ফর্মটি পূরণ করে সাবমিট করুন — আমাদের সিনিয়র উপদেষ্টা দ্রুততম সময়ে আপনার সাথে যোগাযোগ করবেন।'
              : 'Complete the form below — a Senior Property Advisor will respond promptly with brochure & plot availability.'}
          </p>
        </div>

        {formSuccess ? (
          <div className="form-success-box">
            <CheckCircle2 size={60} className="text-emerald success-big-icon" />
            <h3>{lang === 'bn' ? 'ইনকোয়ারি সফলভাবে গৃহীত হয়েছে!' : 'Inquiry Submitted Successfully!'}</h3>
            <p>{t.formSuccess}</p>
            <div className="booking-modal-done-row">
              <button 
                type="button"
                className="btn-modal-done"
                onClick={onClose}
              >
                <span>{lang === 'bn' ? 'সম্পন্ন করুন' : 'Done'}</span>
              </button>
              <button 
                type="button"
                className="btn-send-another"
                onClick={() => setFormSuccess(false)}
              >
                {lang === 'bn' ? 'আরেকটি আবেদন পাঠান' : 'Submit Another Inquiry'}
              </button>
            </div>
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
                placeholder={lang === 'bn' ? 'পছন্দের ভিজিট তারিখ বা বিশেষ কোনো জিজ্ঞাসা থাকলে লিখুন...' : 'Preferred visit date or special inquiries...'}
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
              <span>{isSubmitting ? t.formSubmitting : (lang === 'bn' ? 'আবেদন সম্পন্ন করুন' : 'Confirm & Submit Inquiry')}</span>
              <ChevronRight size={18} />
            </button>

            <div className="booking-privacy-note">
              <ShieldCheck size={14} className="text-emerald" />
              <span>
                {lang === 'bn'
                  ? 'আপনার তথ্য সম্পূর্ণ গোপন ও সুরক্ষিত রাখা হবে • সরাসরি ডেভেলপার কনসালটেশন'
                  : '100% Confidential • Zero Obligation • Direct Developer Consultation'}
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

