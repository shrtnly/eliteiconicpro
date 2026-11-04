import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, Users, X, LayoutGrid, Table as TableIcon, Phone } from 'lucide-react'
import { founderDirectors } from '../data/founderDirectorsData'

export default function FounderDirectorSection({ lang = 'en' }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all') // 'all', 'phone'
  const [pageSize, setPageSize] = useState(15) // default 15 items per page
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('cards') // default cards view, with 3 cards per row on desktop

  const isBn = lang === 'bn'

  // Filter logic
  const filteredList = useMemo(() => {
    let result = founderDirectors

    // Category filter
    if (selectedFilter === 'phone') {
      result = result.filter(d => Boolean(d.phone && d.phone.trim()))
    }

    // Search query filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim()
      result = result.filter(d => 
        d.nameBn.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.sl.includes(q) ||
        (d.phone && d.phone.toLowerCase().includes(q)) ||
        d.designationBn.toLowerCase().includes(q) ||
        d.designationEn.toLowerCase().includes(q)
      )
    }

    return result
  }, [searchTerm, selectedFilter])

  // Pagination calculation
  const totalItems = filteredList.length
  const totalPages = pageSize === 'all' ? 1 : Math.ceil(totalItems / pageSize)
  
  // Safe page index
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1)

  const paginatedList = useMemo(() => {
    if (pageSize === 'all') return filteredList
    const start = (safeCurrentPage - 1) * pageSize
    return filteredList.slice(start, start + pageSize)
  }, [filteredList, safeCurrentPage, pageSize])

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setCurrentPage(1)
  }

  const startIndex = pageSize === 'all' ? 1 : (safeCurrentPage - 1) * pageSize + 1
  const endIndex = pageSize === 'all' ? totalItems : Math.min(safeCurrentPage * pageSize, totalItems)

  return (
    <section className="founder-directors-section" id="founder-director">
      <div className="section-container">
        {/* Section Header */}
        <div className="amenities-center-header fd-center-header">
          <div className="amenities-kicker-row">
            <span className="amenities-kicker-rule" aria-hidden="true" />
            <span className="amenities-kicker-text">
              {isBn ? 'সম্মানিত প্রতিষ্ঠাতা পর্ষদ' : 'HONORABLE PATRONS & STAKEHOLDERS'}
            </span>
            <span className="amenities-kicker-rule" aria-hidden="true" />
          </div>

          <h2 className="amenities-main-title">
            {isBn ? 'Founder Directors (প্রতিষ্ঠাতা পরিচালকবৃন্দ)' : 'Founder Directors'}
          </h2>

          <div className="amenities-dual-divider" aria-hidden="true">
            <span className="divider-seg-green" />
            <span className="divider-seg-gold" />
          </div>

          <p className="amenities-sub-desc">
            {isBn 
              ? 'ঢাকা আইকন সিটির সার্বিক অগ্রগতি ও ভবিষ্যৎ বিনির্মাণে সম্মানিত প্রতিষ্ঠাতা পরিচালকবৃন্দের তালিকা।' 
              : 'Directory of honorable Founder Directors whose vision, patronage, and commitment empower Dhaka Icon City.'}
          </p>
        </div>

        {/* Directory Card Wrapper */}
        <div className="fd-table-card">
          {/* Top Controls: Search */}
          <div className="fd-controls-bar">
            {/* Search Input */}
            <div className="fd-search-box">
              <Search size={18} className="fd-search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={isBn ? 'নাম বা ফোন নম্বর দিয়ে খুঁজুন...' : 'Search by name or phone...'}
                className="fd-search-input"
              />
              {searchTerm && (
                <button type="button" onClick={clearSearch} className="fd-search-clear" aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Status Sub-bar: Count, Page Size & View Toggle */}
          <div className="fd-status-bar">
            <div className="fd-count-text">
              {totalItems > 0 ? (
                <span>
                  {isBn 
                    ? `মোট ${totalItems} জনের মধ্যে ${startIndex}-${endIndex}` 
                    : `Showing ${startIndex}-${endIndex} of ${totalItems}`}
                </span>
              ) : (
                <span className="text-muted">
                  {isBn ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No matching records found'}
                </span>
              )}
            </div>

            <div className="fd-status-actions">
              {/* Layout Toggle (Card View vs Table View) */}
              <div className="fd-view-toggle" role="group" aria-label="View Mode">
                <button
                  type="button"
                  className={`fd-view-btn ${viewMode === 'cards' || viewMode === 'auto' ? 'active' : ''}`}
                  onClick={() => setViewMode('cards')}
                  title={isBn ? 'কার্ড ভিউ' : 'Card View'}
                >
                  <LayoutGrid size={14} />
                  <span className="fd-view-text">{isBn ? 'কার্ড' : 'Cards'}</span>
                </button>
                <button
                  type="button"
                  className={`fd-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  title={isBn ? 'টেবিল ভিউ' : 'Table View'}
                >
                  <TableIcon size={14} />
                  <span className="fd-view-text">{isBn ? 'টেবিল' : 'Table'}</span>
                </button>
              </div>

              {/* Page Size Dropdown */}
              <div className="fd-page-size-wrap">
                <label htmlFor="fd-page-size" className="fd-page-size-label">
                  {isBn ? 'প্রতি পাতায়:' : 'Show:'}
                </label>
                <select
                  id="fd-page-size"
                  value={pageSize}
                  onChange={(e) => {
                    const val = e.target.value === 'all' ? 'all' : Number(e.target.value)
                    setPageSize(val)
                    setCurrentPage(1)
                  }}
                  className="fd-page-size-select"
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value="all">{isBn ? 'সবগুলো' : 'All'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* VIEW 1: Cards Grid View */}
          <div className={`fd-mobile-cards-container ${viewMode === 'table' ? 'fd-hidden-desktop' : (viewMode === 'cards' ? 'fd-force-show' : 'fd-auto-responsive-cards')}`}>
            {paginatedList.length > 0 ? (
              <div className="fd-cards-grid">
                {paginatedList.map((director) => (
                  <div key={director.id} className="fd-director-card">
                    <div className="fd-dcard-avatar-wrap">
                      <img 
                        src={director.image} 
                        alt={isBn ? director.nameBn : director.nameEn} 
                        className="fd-dcard-avatar"
                        loading="lazy"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="fd-dcard-content">
                      <div className="fd-dcard-header">
                        <h4 className="fd-dcard-name">
                          {isBn ? director.nameBn : director.nameEn}
                        </h4>
                        <span className="fd-dcard-sl">#{director.sl}</span>
                      </div>
                      <p className="fd-dcard-role">
                        {isBn ? director.designationBn : director.designationEn}
                      </p>
                      {director.phone && (
                        <a href={`tel:${director.phone}`} className="fd-dcard-phone" title={isBn ? 'কল করুন' : 'Call'}>
                          <Phone size={13} className="fd-dcard-phone-icon" />
                          <span>{director.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fd-empty-state">
                <p>{isBn ? `"${searchTerm}" দিয়ে কোনো পরিচালক খুঁজে পাওয়া যায়নি` : `No directors found matching "${searchTerm}"`}</p>
                <button type="button" onClick={clearSearch} className="fd-btn-reset">
                  {isBn ? 'অনুসন্ধান রিসেট করুন' : 'Reset Search'}
                </button>
              </div>
            )}
          </div>

          {/* VIEW 2: Desktop / Tablet Table View (Visible by default on desktop, or when user toggles table mode) */}
          <div className={`fd-table-responsive ${viewMode === 'cards' ? 'fd-force-hide' : (viewMode === 'table' ? 'fd-force-show' : 'fd-auto-responsive-table')}`}>
            <table className="fd-table">
              <thead>
                <tr>
                  <th className="fd-th-sl">{isBn ? 'ক্রম' : 'SL'}</th>
                  <th className="fd-th-photo">{isBn ? 'ছবি' : 'Photo'}</th>
                  <th className="fd-th-name">{isBn ? 'নাম' : 'Name'}</th>
                  <th className="fd-th-role">{isBn ? 'পদবী' : 'Position'}</th>
                  <th className="fd-th-phone">{isBn ? 'মোবাইল / ফোন' : 'Phone Number'}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.length > 0 ? (
                  paginatedList.map((director) => (
                    <tr key={director.id} className="fd-table-row">
                      {/* SL */}
                      <td className="fd-td-sl">
                        <span className="fd-sl-badge">{director.sl}</span>
                      </td>

                      {/* Photo */}
                      <td className="fd-td-photo">
                        <div className="fd-avatar-wrap">
                          <img 
                            src={director.image} 
                            alt={isBn ? director.nameBn : director.nameEn} 
                            className="fd-avatar-img"
                            loading="lazy"
                            width="44"
                            height="44"
                          />
                        </div>
                      </td>

                      {/* Name */}
                      <td className="fd-td-name">
                        <strong className="fd-name-text">
                          {isBn ? director.nameBn : director.nameEn}
                        </strong>
                      </td>

                      {/* Designation */}
                      <td className="fd-td-role">
                        <span className="fd-designation-tag founder">
                          {isBn ? director.designationBn : director.designationEn}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="fd-td-phone">
                        {director.phone ? (
                          <a href={`tel:${director.phone}`} className="fd-phone-link" title={isBn ? 'কল করুন' : 'Call Director'}>
                            <Phone size={12} className="fd-phone-icon" />
                            <span>{director.phone}</span>
                          </a>
                        ) : (
                          <span className="fd-phone-na">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="fd-empty-td">
                      <div className="fd-empty-state">
                        <p>{isBn ? `"${searchTerm}" দিয়ে কোনো পরিচালক খুঁজে পাওয়া যায়নি` : `No directors found matching "${searchTerm}"`}</p>
                        <button type="button" onClick={clearSearch} className="fd-btn-reset">
                          {isBn ? 'অনুসন্ধান রিসেট করুন' : 'Reset Search'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {pageSize !== 'all' && totalPages > 1 && (
            <div className="fd-pagination-bar">
              <button
                type="button"
                className="fd-page-nav-btn"
                disabled={safeCurrentPage <= 1}
                onClick={() => {
                  setCurrentPage(p => Math.max(p - 1, 1))
                  document.getElementById('founder-director')?.scrollIntoView({ behavior: 'smooth' })
                }}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
                <span>{isBn ? 'পূর্ববর্তী' : 'Prev'}</span>
              </button>

              <div className="fd-page-indicator-mobile">
                <span>{isBn ? `পৃষ্ঠা ${safeCurrentPage} / ${totalPages}` : `Page ${safeCurrentPage} of ${totalPages}`}</span>
              </div>

              <div className="fd-page-numbers fd-desktop-only">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 2)
                  .map((p, idx, arr) => {
                    const prev = arr[idx - 1]
                    const showEllipsis = prev && p - prev > 1
                    return (
                      <span key={p} className="fd-page-item-wrap">
                        {showEllipsis && <span className="fd-ellipsis">...</span>}
                        <button
                          type="button"
                          className={`fd-page-num-btn ${safeCurrentPage === p ? 'active' : ''}`}
                          onClick={() => {
                            setCurrentPage(p)
                            document.getElementById('founder-director')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                        >
                          {p}
                        </button>
                      </span>
                    )
                  })}
              </div>

              <button
                type="button"
                className="fd-page-nav-btn"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => {
                  setCurrentPage(p => Math.min(p + 1, totalPages))
                  document.getElementById('founder-director')?.scrollIntoView({ behavior: 'smooth' })
                }}
                aria-label="Next page"
              >
                <span>{isBn ? 'পরবর্তী' : 'Next'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
