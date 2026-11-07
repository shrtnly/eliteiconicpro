import { useState } from 'react'
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
  ArrowRight
} from 'lucide-react'
import './LegalDocumentsSection.css'

export default function LegalDocumentsSection({ lang = 'en', navigateTo }) {
  const isBn = lang === 'bn'
  const [previewDoc, setPreviewDoc] = useState(null)

  const legalDocs = [
    {
      id: 'trade-license',
      titleBn: 'ঢাকা উত্তর সিটি কর্পোরেশন ই-ট্রেড লাইসেন্স',
      titleEn: 'DNCC E-Trade License (Government Licensed)',
      authorityBn: 'ঢাকা উত্তর সিটি কর্পোরেশন (ডিএনসিসি)',
      authorityEn: 'Dhaka North City Corporation (DNCC)',
      number: 'TRAD/DNCC/018373/2026',
      badgeBn: 'বৈধ ট্রেড অনুমোদন',
      badgeEn: 'Municipal Licensed',
      dateBn: 'মেয়াদ: ৩০ জুন ২০২৭ পর্যন্ত',
      dateEn: 'Validity: Up to 30 June 2027',
      descBn: 'রিয়েল এস্টেট, ল্যান্ড ডেভেলপমেন্ট, কনসালটেন্সি ও কনস্ট্রাকশন পরিচালনার বৈধ সরকারি ট্রেড লাইসেন্স।',
      descEn: 'Official municipal license authorized for real estate, land development, consultancy, and construction.',
      previewImg: '/docs/previews/dncc-e-trade-license-preview.png',
      pdfUrl: '/docs/dncc-e-trade-license-elite-iconic.pdf'
    },
    {
      id: 'tin-certificate',
      titleBn: 'এনবিআর করদাতা শনাক্তকরণ সনদ (TIN)',
      titleEn: 'NBR Taxpayer Identification (TIN) Certificate',
      authorityBn: 'জাতীয় রাজস্ব বোর্ড (এনবিআর), গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
      authorityEn: 'National Board of Revenue (NBR), Govt. of Bangladesh',
      number: 'TIN: 582155727196',
      badgeBn: 'নিবন্ধিত করদাতা',
      badgeEn: 'Registered Taxpayer',
      dateBn: 'ইস্যু: ২৮ সেপ্টেম্বর ২০২৬',
      dateEn: 'Issued: 28 September 2026',
      descBn: 'ট্যাক্সেস সার্কেল-০৯০ (কোম্পানিজ), ট্যাক্সেস জোন ০৫, ঢাকা এর অধীন নিবন্ধিত করদাতা সনদ।',
      descEn: 'Statutory corporate taxpayer under Taxes Circle-090 (Companies), Taxes Zone 05, Dhaka.',
      previewImg: '/docs/previews/tin-certificate-preview.png',
      pdfUrl: '/docs/tin-certificate-elite-iconic.pdf'
    },
    {
      id: 'form-xii',
      titleBn: 'আরজেএসসি ফর্ম ১২ (পরিচালনা পর্ষদ বিবরণী)',
      titleEn: 'RJSC Form XII (Directors & Governance Filing)',
      authorityBn: 'যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC)',
      authorityEn: 'Registrar of Joint Stock Companies & Firms (RJSC)',
      number: 'Reg No: C-213460',
      badgeBn: 'বিধিবদ্ধ পর্ষদ অনুমোদন',
      badgeEn: 'Corporate Governance',
      dateBn: 'নিবন্ধন: ২৫ আগস্ট ২০২৬',
      dateEn: 'Reg Date: 25 August 2026',
      descBn: 'কোম্পানি আইন, ১৯৯৪ (ধারা ১১৫) অনুযায়ী চেয়ারম্যান ও পরিচালনা পর্ষদের বিধিবদ্ধ ৪১+ পরিচালকের তালিকা।',
      descEn: 'Statutory filing under The Companies Act, 1994 (Section 115) recording Chairman & Board of Directors.',
      previewImg: '/docs/previews/rjsc-form-xii-preview.png',
      pdfUrl: '/docs/rjsc-form-xii-directors-elite-iconic.pdf'
    },
    {
      id: 'moa-aoa',
      titleBn: 'মেমোরেন্ডাম ও আর্টিকেলস অব অ্যাসোসিয়েশন (MoA & AoA)',
      titleEn: 'Memorandum & Articles of Association (MoA & AoA)',
      authorityBn: 'কোম্পানি আইন, ১৯৯৪ (বাণিজ্য মন্ত্রণালয়)',
      authorityEn: 'The Companies Act, 1994 (Ministry of Commerce)',
      number: 'অনুমোদিত মূলধন: ৫০ কোটি টাকা',
      numberEn: 'Authorized Capital: BDT 50,000,000',
      badgeBn: 'সাংবিধানিক সনদ',
      badgeEn: 'Charter of Objects',
      dateBn: 'ইস্যু নং: 624039 (২৫-০৮-২০২৬)',
      dateEn: 'Issue No: 624039 (25-Aug-2026)',
      descBn: '৫ কোটি টাকা অনুমোদিত মূলধনে মেগা টাউনশিপ উন্নয়ন, আবাসন ও নির্মাণ কাজের পূর্ণাঙ্গ সাংবিধানিক নীতিমালা।',
      descEn: 'Full constitutional bylaws and objectives authorizing multi-storied township creation and infrastructure.',
      previewImg: '/docs/previews/memorandum-articles-preview.png',
      pdfUrl: '/docs/memorandum-articles-of-association-elite-iconic.pdf'
    }
  ]

  return (
    <section className="legal-home-section" id="legal-documents-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="legal-section-head">
          <div className="legal-badge-pill">
            <ShieldCheck size={16} className="text-gold" />
            <span>{isBn ? '১০০% আইনগত বৈধতা ও স্বচ্ছতা' : '100% Statutorily Verified & Compliant'}</span>
          </div>

          <h2 className="legal-section-title">
            {isBn ? (
              <>
                <span className="text-navy">কোম্পানির সরকারি অনুমোদন ও </span>
                <span className="text-green">আইনগত ডকুমেন্টস</span>
              </>
            ) : (
              <>
                <span className="text-navy">Official Corporate Approvals & </span>
                <span className="text-green">Legal Documents</span>
              </>
            )}
          </h2>

          <div className="legal-dual-divider" aria-hidden="true">
            <span className="divider-seg-green" />
            <span className="divider-seg-gold" />
          </div>

          <p className="legal-section-subtitle">
            {isBn
              ? 'এলিট আইকোনিক প্রোপার্টিস এন্ড কন্সট্রাকশন লিঃ জাতীয় রাজস্ব বোর্ড (NBR), সিটি কর্পোরেশন (DNCC) এবং বাণিজ্য মন্ত্রণালয়ের আরজেএসসি (RJSC) কর্তৃক সম্পূর্ণ নিবন্ধিত ও অনুমোদিত।'
              : 'Elite Iconic Properties & Construction Ltd. operates under full statutory registration with the National Board of Revenue (NBR), Dhaka North City Corporation (DNCC), and RJSC.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="legal-cards-grid">
          {legalDocs.map((doc) => (
            <div key={doc.id} className="legal-doc-card">
              <div className="legal-card-header">
                <span className="legal-doc-badge">{isBn ? doc.badgeBn : doc.badgeEn}</span>
                <span className="legal-doc-date">{isBn ? doc.dateBn : doc.dateEn}</span>
              </div>

              {/* Document Thumbnail Preview Frame */}
              <div className="legal-preview-thumb-wrap" onClick={() => setPreviewDoc(doc)}>
                <img 
                  src={doc.previewImg} 
                  alt={isBn ? doc.titleBn : doc.titleEn}
                  className="legal-preview-thumb"
                  loading="lazy"
                />
                <div className="legal-thumb-overlay">
                  <div className="legal-overlay-pill">
                    <Eye size={15} />
                    <span>{isBn ? 'বড় করে দেখুন' : 'Preview Document'}</span>
                  </div>
                </div>
              </div>

              <div className="legal-card-body">
                <h3 className="legal-card-title">{isBn ? doc.titleBn : doc.titleEn}</h3>
                <p className="legal-card-authority">
                  <Landmark size={14} className="text-green" />
                  <span>{isBn ? doc.authorityBn : doc.authorityEn}</span>
                </p>
                <div className="legal-id-strip">
                  <strong>{isBn ? doc.number : (doc.numberEn || doc.number)}</strong>
                </div>
                <p className="legal-card-desc">{isBn ? doc.descBn : doc.descEn}</p>
              </div>

              <div className="legal-card-footer">
                <button
                  type="button"
                  className="legal-btn-view"
                  onClick={() => setPreviewDoc(doc)}
                >
                  <Eye size={14} />
                  <span>{isBn ? 'ডকুমেন্ট দেখুন' : 'View Full Page'}</span>
                </button>
                <a
                  href={doc.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-btn-download"
                  title={isBn ? 'অফিসিয়াল PDF ডাউনলোড করুন' : 'Download Official PDF'}
                >
                  <Download size={14} />
                  <span>PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="legal-section-cta">
          <div className="legal-cta-banner">
            <div className="legal-cta-info">
              <BadgeCheck size={28} className="legal-cta-shield" />
              <div>
                <h4>{isBn ? 'আপনার বিনিয়োগ সম্পূর্ণ নিরাপদ ও বৈধ' : 'Your Real Estate Investment is 100% Protected'}</h4>
                <p>
                  {isBn 
                    ? 'আমাদের প্রতিটি প্লট এবং কোম্পানির মালিকানা সম্পর্কিত সকল সরকারি কাগজপত্র যাচাই করতে আমাদের ডেডিকেটেড লিগ্যাল পেজে বিস্তারিত দেখুন।'
                    : 'Inspect full corporate registries, 49+ director particulars, RJSC incorporation certificate, and NBR tax records on our dedicated Legal Documents page.'}
                </p>
              </div>
            </div>
            {navigateTo && (
              <button
                type="button"
                className="legal-cta-btn"
                onClick={() => navigateTo('legal-documents')}
              >
                <span>{isBn ? 'সকল লিগ্যাল ডকুমেন্টস পেজে যান' : 'Explore All Legal Documents'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Document Lightbox Modal */}
      {previewDoc && (
        <div className="legal-lightbox-backdrop" onClick={() => setPreviewDoc(null)}>
          <div className="legal-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <div className="legal-lightbox-head">
              <div className="legal-lightbox-title-box">
                <ShieldCheck size={18} className="text-green" />
                <div>
                  <h3>{isBn ? previewDoc.titleBn : previewDoc.titleEn}</h3>
                  <small>{isBn ? previewDoc.authorityBn : previewDoc.authorityEn}</small>
                </div>
              </div>
              <div className="legal-lightbox-actions">
                <a
                  href={previewDoc.pdfUrl}
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
                  onClick={() => setPreviewDoc(null)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="legal-lightbox-body">
              <img 
                src={previewDoc.previewImg} 
                alt={isBn ? previewDoc.titleBn : previewDoc.titleEn}
                className="legal-lightbox-img"
              />
            </div>

            <div className="legal-lightbox-foot">
              <span>{isBn ? 'সরকারিভাবে সত্যায়িত ও নিবন্ধিত ডিজিটাল নথি' : 'Officially Verified & Digitally Authenticated Government Document'}</span>
              <strong>{isBn ? previewDoc.number : (previewDoc.numberEn || previewDoc.number)}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

