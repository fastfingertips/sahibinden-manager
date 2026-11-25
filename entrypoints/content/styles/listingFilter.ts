export const listingFilterStyles = `
  /* --- Arama Sonuçları Toolbar İlan Gizleme Butonu --- */
  .sm-listing-filter-btn {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    color: #334155 !important;
    background-color: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
    border-radius: 4px !important;
    padding: 4px 10px !important;
    line-height: 16px !important;
    cursor: pointer !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
    transition: all 0.15s ease !important;
    user-select: none !important;
    vertical-align: middle !important;
    margin: 4px 0 4px 6px !important;
  }

  .sm-listing-filter-btn:hover {
    background-color: #f8fafc !important;
    border-color: #94a3b8 !important;
    color: #0f172a !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) !important;
  }

  .sm-listing-filter-btn:active {
    transform: scale(0.98) !important;
    background-color: #f1f5f9 !important;
  }

  .sm-listing-filter-btn svg {
    flex-shrink: 0 !important;
    color: #475569 !important;
  }

  .sm-listing-filter-btn.sm-has-active-filters {
    border-color: #f59e0b !important;
    background-color: #fffbeb !important;
    color: #92400e !important;
  }

  .sm-listing-filter-btn.sm-has-active-filters svg {
    color: #d97706 !important;
  }

  .sm-listing-filter-btn .sm-filter-badge {
    background-color: #e2e8f0 !important;
    color: #475569 !important;
    font-size: 9.5px !important;
    font-weight: 700 !important;
    padding: 1px 6px !important;
    border-radius: 9999px !important;
    line-height: 12px !important;
  }

  .sm-listing-filter-btn.sm-has-active-filters .sm-filter-badge {
    background-color: #f59e0b !important;
    color: #ffffff !important;
  }

  /* --- Ayrı Modal Pencere (İlan Gizleme Seçenekleri) --- */
  .sm-filter-modal-backdrop {
    position: fixed !important;
    inset: 0 !important;
    background: rgba(15, 23, 42, 0.55) !important;
    z-index: 999999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    backdrop-filter: blur(2px) !important;
    animation: smFilterFadeIn 0.15s ease-out !important;
    box-sizing: border-box !important;
  }

  @keyframes smFilterFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes smFilterPopIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .sm-filter-modal-dialog {
    width: 460px !important;
    max-width: 94vw !important;
    background: #ffffff !important;
    border-radius: 8px !important;
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.08) !important;
    overflow: hidden !important;
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    animation: smFilterPopIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
  }

  .sm-filter-modal-header {
    padding: 14px 18px !important;
    background: #f8fafc !important;
    border-bottom: 1px solid #e2e8f0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }

  .sm-filter-modal-title-area {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .sm-filter-modal-title-area svg {
    color: #0284c7 !important;
    flex-shrink: 0 !important;
  }

  .sm-filter-modal-title {
    font-size: 13.5px !important;
    font-weight: 700 !important;
    color: #0f172a !important;
    margin: 0 !important;
    line-height: 1.2 !important;
  }

  .sm-filter-modal-close {
    background: transparent !important;
    border: none !important;
    color: #64748b !important;
    font-size: 18px !important;
    line-height: 1 !important;
    cursor: pointer !important;
    padding: 4px 8px !important;
    border-radius: 4px !important;
    transition: all 0.15s ease !important;
  }

  .sm-filter-modal-close:hover {
    background: #e2e8f0 !important;
    color: #0f172a !important;
  }

  .sm-filter-modal-body {
    padding: 16px 18px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    max-height: 70vh !important;
    overflow-y: auto !important;
  }

  .sm-filter-modal-intro {
    font-size: 11px !important;
    color: #64748b !important;
    line-height: 1.4 !important;
    margin: 0 0 4px 0 !important;
  }

  /* Kategori Satırı */
  .sm-filter-category-item {
    border: 1px solid #e2e8f0 !important;
    border-radius: 6px !important;
    padding: 10px 12px !important;
    background: #ffffff !important;
    transition: all 0.15s ease !important;
    display: flex !important;
    align-items: flex-start !important;
    justify-content: space-between !important;
    gap: 12px !important;
  }

  .sm-filter-category-item:hover {
    border-color: #cbd5e1 !important;
    background: #f8fafc !important;
  }

  .sm-filter-category-item.sm-category-active {
    border-color: #bfdbfe !important;
    background: #eff6ff !important;
  }

  .sm-filter-category-content {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 2px !important;
  }

  .sm-filter-category-header {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
  }

  .sm-filter-category-title {
    font-size: 12px !important;
    font-weight: 700 !important;
    color: #1e293b !important;
  }

  .sm-filter-category-badge {
    font-size: 9.5px !important;
    font-weight: 600 !important;
    padding: 1px 6px !important;
    border-radius: 9999px !important;
    background: #f1f5f9 !important;
    color: #475569 !important;
  }

  .sm-filter-category-item.sm-category-active .sm-filter-category-badge {
    background: #dbeafe !important;
    color: #1d4ed8 !important;
  }

  .sm-filter-category-desc {
    font-size: 10.5px !important;
    color: #64748b !important;
    line-height: 1.35 !important;
    margin: 0 !important;
  }

  /* Switch Toggle */
  .sm-filter-switch {
    position: relative !important;
    display: inline-block !important;
    width: 34px !important;
    height: 20px !important;
    flex-shrink: 0 !important;
    margin-top: 2px !important;
  }

  .sm-filter-switch input {
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
  }

  .sm-filter-slider {
    position: absolute !important;
    cursor: pointer !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background-color: #cbd5e1 !important;
    transition: 0.2s !important;
    border-radius: 20px !important;
  }

  .sm-filter-slider:before {
    position: absolute !important;
    content: "" !important;
    height: 14px !important;
    width: 14px !important;
    left: 3px !important;
    bottom: 3px !important;
    background-color: white !important;
    transition: 0.2s !important;
    border-radius: 50% !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
  }

  .sm-filter-switch input:checked + .sm-filter-slider {
    background-color: #0284c7 !important;
  }

  .sm-filter-switch input:checked + .sm-filter-slider:before {
    transform: translateX(14px) !important;
  }

  /* Modal Footer */
  .sm-filter-modal-footer {
    padding: 12px 18px !important;
    background: #f8fafc !important;
    border-top: 1px solid #e2e8f0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 8px !important;
  }

  .sm-filter-summary-text {
    font-size: 11px !important;
    color: #475569 !important;
  }

  .sm-filter-summary-text strong {
    color: #0f172a !important;
  }

  .sm-filter-actions {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
  }

  .sm-filter-btn-secondary {
    font-family: inherit !important;
    font-size: 11px !important;
    font-weight: 500 !important;
    color: #475569 !important;
    background: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
    border-radius: 4px !important;
    padding: 4px 10px !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
  }

  .sm-filter-btn-secondary:hover {
    background: #f1f5f9 !important;
    color: #0f172a !important;
    border-color: #94a3b8 !important;
  }

  .sm-filter-btn-primary {
    font-family: inherit !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    background: #0284c7 !important;
    border: 1px solid #0284c7 !important;
    border-radius: 4px !important;
    padding: 4px 12px !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
  }

  .sm-filter-btn-primary:hover {
    background: #0369a1 !important;
    border-color: #0369a1 !important;
  }
`;
