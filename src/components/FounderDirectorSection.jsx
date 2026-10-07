import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, Users, X, LayoutGrid, Table as TableIcon, Briefcase, MapPin } from 'lucide-react'
import { founderDirectors } from '../data/founderDirectorsData'

export default function FounderDirectorSection({ lang = 'en' }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all') // 'all', 'founder', 'shareholder', 'nrb'
  const [pageSize, setPageSize] = useState(15) // default 15 items per page
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('auto') // 'auto' (cards on mobile, table on desktop), 'cards', 'table'

  const isBn = lang === 'bn'

  // Filter logic
  const filteredList = useMemo(() => {
    let result = founderDirectors

    // Category filter
    if (selectedFilter === 'founder') {
      result = result.filter(d => !d.designationEn.includes('Shareholder'))
    } else if (selectedFilter === 'shareholder') {
      result = result.filter(d => d.designationEn.includes('Shareholder'))
    } else if (selectedFilter === 'nrb') {
      result = result.filter(d => d.districtEn.includes('NRB') || d.professionEn.includes('NRB'))
    }

    // Search query filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim()
      result = result.filter(d => 
        d.nameBn.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.sl.includes(q) ||
        d.professionBn.toLowerCase().includes(q) ||
        d.professionEn.toLowerCase().includes(q) ||
        d.districtBn.toLowerCase().includes(q) ||
        d.districtEn.toLowerCase().includes(q)
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
        <div className="section-header-center">
          <div className="fd-badge-pill">
            <Users size={14} />
            <span>{isBn ? 'সম্মানিত পরিচালনা পর্ষদ' : 'Board of Directors'}</span>
          </div>
          <h2 className="section-main-heading">
            {isBn ? 'Founder Director (প্রতিষ্ঠাতা পরিচালক)' : 'Founder Director'}
          </h2>
          <div className="section-divider-line" />
          <p className="section-sub-desc">
            {isBn 
              ? 'ঢাকা আইকন সিটির ভবিষ্যৎ বিনির্মাণে সম্মানিত প্রতিষ্ঠাতা পরিচালক ও শেয়ারহোল্ডার পরিচালকবৃন্দের তালিকা।' 
              : 'Directory of honorable Founder & Shareholder Directors whose vision and patronage empower Dhaka Icon City.'}
          </p>
        </div>

        {/* Directory Card Wrapper */}
        <div className="fd-table-card">
          {/* Top Controls: Search & Filters */}
          <div className="fd-controls-bar">
            {/* Search Input */}
            <div className="fd-search-box">
              <Search size={18} className="fd-search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={isBn ? 'নাম, আইডি (FD-001), জেলা বা পেশা...' : 'Search by name, ID (FD-001), district...'}
                className="fd-search-input"
              />
              {searchTerm && (
                <button type="button" onClick={clearSearch} className="fd-search-clear" aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="fd-filter-pills-scroll">
              <div className="fd-filter-pills">
                <button 
                  type="button"
                  className={`fd-pill ${selectedFilter === 'all' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('all')}
                >
                  {isBn ? 'সকল' : 'All'} ({founderDirectors.length})
                </button>
                <button 
                  type="button"
                  className={`fd-pill ${selectedFilter === 'founder' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('founder')}
                >
                  {isBn ? 'প্রতিষ্ঠাতা পরিচালক' : 'Founder Directors'}
                </button>
                <button 
                  type="button"
                  className={`fd-pill ${selectedFilter === 'shareholder' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('shareholder')}
                >
                  {isBn ? 'শেয়ারহোল্ডার' : 'Shareholders'}
                </button>
                <button 
                  type="button"
                  className={`fd-pill ${selectedFilter === 'nrb' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('nrb')}
                >
                  {isBn ? 'প্রবাসী (NRB)' : 'NRB'}
                </button>
              </div>
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

          {/* VIEW 1: Mobile-Optimized Cards (Visible by default on mobile or when cards mode selected) */}
          <div className={`fd-mobile-cards-container ${viewMode === 'table' ? 'fd-hidden-desktop' : (viewMode === 'cards' ? 'fd-force-show' : 'fd-auto-responsive-cards')}`}>
            {paginatedList.length > 0 ? (
              <div className="fd-cards-grid">
                {paginatedList.map((director) => (
                  <div key={director.id} className="fd-mobile-card">
                    <div className="fd-mcard-header">
                      <div className="fd-mcard-avatar-wrap">
                        <img 
                          src={director.image} 
                          alt={isBn ? director.nameBn : director.nameEn} 
                          className="fd-mcard-avatar"
                          loading="lazy"
                          width="46"
                          height="46"
                        />
                      </div>
                      <div className="fd-mcard-title-col">
                        <div className="fd-mcard-name-row">
                          <h4 className="fd-mcard-name">
                            {isBn ? director.nameBn : director.nameEn}
                          </h4>
                          <span className="fd-sl-badge">#{director.sl}</span>
                        </div>
                        <div className="fd-mcard-chips-row">
                          <span className="fd-code-pill">{director.code}</span>
                          <span className={`fd-designation-tag ${director.designationEn.includes('Shareholder') ? 'shareholder' : 'founder'}`}>
                            {isBn ? director.designationBn : director.designationEn}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="fd-mcard-body">
                      <div className="fd-mcard-meta-item">
                        <Briefcase size={13} className="fd-mcard-meta-icon" />
                        <span className="fd-mcard-meta-text">
                          {isBn ? director.professionBn : director.professionEn}
                        </span>
                      </div>
                      <div className="fd-mcard-meta-item district">
                        <MapPin size={13} className="fd-mcard-meta-icon" />
                        <span className="fd-dist-chip">
                          {isBn ? director.districtBn : director.districtEn}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fd-empty-state">
                <p>{isBn ? `"${searchTerm}" দিয়ে কোনো প্রতিষ্ঠাতা পরিচালক খুঁজে পাওয়া যায়নি` : `No directors found matching "${searchTerm}"`}</p>
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
                  <th className="fd-th-name">{isBn ? 'নাম ও সদস্য কোড' : 'Name & ID'}</th>
                  <th className="fd-th-role">{isBn ? 'পদবী' : 'Designation'}</th>
                  <th className="fd-th-prof">{isBn ? 'পেশাগত পরিচিতি' : 'Profession'}</th>
                  <th className="fd-th-dist">{isBn ? 'জেলা / অঞ্চল' : 'District'}</th>
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

                      {/* Photo - Simple 1 avatar for all */}
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

                      {/* Name & Code */}
                      <td className="fd-td-name">
                        <div className="fd-name-col">
                          <strong className="fd-name-text">
                            {isBn ? director.nameBn : director.nameEn}
                          </strong>
                          <span className="fd-code-pill">{director.code}</span>
                        </div>
                      </td>

                      {/* Designation */}
                      <td className="fd-td-role">
                        <span className={`fd-designation-tag ${director.designationEn.includes('Shareholder') ? 'shareholder' : 'founder'}`}>
                          {isBn ? director.designationBn : director.designationEn}
                        </span>
                      </td>

                      {/* Profession */}
                      <td className="fd-td-prof">
                        <span className="fd-prof-text">
                          {isBn ? director.professionBn : director.professionEn}
                        </span>
                      </td>

                      {/* District */}
                      <td className="fd-td-dist">
                        <span className="fd-dist-chip">
                          {isBn ? director.districtBn : director.districtEn}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="fd-empty-td">
                      <div className="fd-empty-state">
                        <p>{isBn ? `"${searchTerm}" দিয়ে কোনো প্রতিষ্ঠাতা পরিচালক খুঁজে পাওয়া যায়নি` : `No directors found matching "${searchTerm}"`}</p>
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
