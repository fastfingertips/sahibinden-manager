export const eliminatedStyles = `
  /* --- İlan Detay Yerel Aksiyon Butonu (Favoriler ve Not Yanı) --- */
  ul.classifiedEvents li.sm-classified-eliminated-action {
    width: auto !important;
    float: none !important;
    list-style-type: none !important;
    margin: 0 !important;
    padding: 0 !important;
    position: relative !important;
  }

  .sm-classified-eliminated-link {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 11px !important;
    font-weight: 400 !important;
    line-height: normal !important;
    color: #00339f !important;
    text-decoration: none !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 4px !important;
    cursor: pointer !important;
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    outline: none !important;
  }

  .sm-classified-eliminated-link:hover {
    text-decoration: underline !important;
  }

  .sm-classified-eliminated-link.has-eliminated {
    font-weight: 700 !important;
    color: #b91c1c !important;
  }

  .sm-classified-eliminated-icon {
    width: 13px !important;
    height: 13px !important;
    color: #00339f !important;
    display: inline-block !important;
    vertical-align: middle !important;
    flex-shrink: 0 !important;
  }

  .sm-classified-eliminated-link.has-eliminated .sm-classified-eliminated-icon {
    color: #dc2626 !important;
  }

  .sm-classified-eliminated-dot {
    width: 6px !important;
    height: 6px !important;
    border-radius: 50% !important;
    background-color: #ef4444 !important;
    display: inline-block !important;
    margin-left: 2px !important;
  }

  /* --- Eleme Nedeni Düzenleme Açılır Paneli (Inline Dropdown) --- */
  .sm-eliminated-dropdown {
    position: absolute !important;
    top: calc(100% + 5px) !important;
    left: 0 !important;
    z-index: 10000 !important;
    width: 340px !important;
    background: #ffffff !important;
    border: 1px solid #fca5a5 !important;
    border-radius: 4px !important;
    box-shadow: 0 4px 18px rgba(185, 28, 28, 0.16) !important;
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    box-sizing: border-box !important;
    animation: smEliminatedFadeIn 0.15s ease-out !important;
  }

  @keyframes smEliminatedFadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sm-eliminated-dropdown-header {
    background-color: #fef2f2 !important;
    border-bottom: 1px solid #fee2e2 !important;
    padding: 8px 12px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }

  .sm-eliminated-dropdown-title {
    font-size: 11px !important;
    font-weight: 700 !important;
    color: #991b1b !important;
    display: flex !important;
    align-items: center !important;
    gap: 5px !important;
  }

  .sm-eliminated-dropdown-close {
    background: none !important;
    border: none !important;
    font-size: 16px !important;
    line-height: 1 !important;
    color: #991b1b !important;
    cursor: pointer !important;
    padding: 0 2px !important;
    opacity: 0.7 !important;
  }

  .sm-eliminated-dropdown-close:hover {
    opacity: 1 !important;
  }

  .sm-eliminated-dropdown-body {
    padding: 10px 12px !important;
  }

  /* Hızlı Neden Etiketleri (Chips) */
  .sm-eliminated-chips {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 4px !important;
    margin-bottom: 8px !important;
  }

  .sm-eliminated-chip {
    font-size: 9.5px !important;
    padding: 2px 7px !important;
    background: #f3f4f6 !important;
    border: 1px solid #e5e7eb !important;
    color: #4b5563 !important;
    border-radius: 12px !important;
    cursor: pointer !important;
    user-select: none !important;
    transition: all 0.15s ease !important;
  }

  .sm-eliminated-chip:hover {
    background: #fee2e2 !important;
    border-color: #fca5a5 !important;
    color: #991b1b !important;
  }

  .sm-eliminated-dropdown-textarea {
    width: 100% !important;
    min-height: 75px !important;
    max-height: 200px !important;
    box-sizing: border-box !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 3px !important;
    padding: 8px 10px !important;
    font-family: inherit !important;
    font-size: 11px !important;
    line-height: 1.4 !important;
    color: #1f2937 !important;
    resize: vertical !important;
    outline: none !important;
    background: #fff !important;
  }

  .sm-eliminated-dropdown-textarea:focus {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.15) !important;
  }

  .sm-eliminated-dropdown-footer {
    background-color: #fafafa !important;
    border-top: 1px solid #f0f0f0 !important;
    padding: 8px 12px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 8px !important;
  }

  .sm-eliminated-dropdown-status {
    font-size: 9.5px !important;
    color: #6b7280 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 140px !important;
  }

  .sm-eliminated-dropdown-actions {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
  }

  .sm-eliminated-btn {
    font-family: inherit !important;
    font-size: 10.5px !important;
    font-weight: 600 !important;
    padding: 4px 10px !important;
    border-radius: 3px !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
    outline: none !important;
  }

  .sm-eliminated-btn-save {
    background: #dc2626 !important;
    color: #ffffff !important;
    border: 1px solid #b91c1c !important;
  }

  .sm-eliminated-btn-save:hover {
    background: #b91c1c !important;
  }

  .sm-eliminated-btn-delete {
    background: #ffffff !important;
    color: #4b5563 !important;
    border: 1px solid #d1d5db !important;
  }

  .sm-eliminated-btn-delete:hover {
    color: #dc2626 !important;
    border-color: #fca5a5 !important;
    background: #fef2f2 !important;
  }

  /* --- İlan Detay Sayfası Elendi Uyarı Banner'ı --- */
  .sm-detail-eliminated-banner {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    background: #fff5f5 !important;
    border: 1px solid #fca5a5 !important;
    border-left: 4px solid #dc2626 !important;
    border-radius: 4px !important;
    padding: 8px 12px !important;
    margin-top: 10px !important;
    margin-bottom: 8px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 10px !important;
    box-shadow: 0 1px 3px rgba(220, 38, 38, 0.08) !important;
  }

  .sm-detail-eliminated-banner-left {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    min-width: 0 !important;
  }

  .sm-detail-eliminated-banner-icon {
    width: 16px !important;
    height: 16px !important;
    color: #dc2626 !important;
    flex-shrink: 0 !important;
  }

  .sm-detail-eliminated-banner-title {
    font-size: 11px !important;
    font-weight: 700 !important;
    color: #991b1b !important;
    white-space: nowrap !important;
  }

  .sm-detail-eliminated-banner-reason {
    font-size: 11px !important;
    color: #7f1d1d !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 450px !important;
  }

  .sm-detail-eliminated-banner-date {
    font-size: 9.5px !important;
    color: #991b1b !important;
    opacity: 0.75 !important;
    white-space: nowrap !important;
  }

  .sm-detail-eliminated-banner-actions {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    flex-shrink: 0 !important;
  }

  .sm-detail-eliminated-btn {
    font-family: inherit !important;
    font-size: 10px !important;
    font-weight: 600 !important;
    padding: 2px 8px !important;
    border-radius: 3px !important;
    cursor: pointer !important;
    background: #ffffff !important;
    border: 1px solid #fca5a5 !important;
    color: #991b1b !important;
    transition: all 0.15s ease !important;
  }

  .sm-detail-eliminated-btn:hover {
    background: #fee2e2 !important;
    border-color: #ef4444 !important;
  }

  /* --- Arama Listesi ve Galeri Satır İçi Hızlı Ele Butonu --- */
  .sm-row-eliminate-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 17px !important;
    height: 17px !important;
    border-radius: 3px !important;
    border: 1px solid #d1d5db !important;
    background: #ffffff !important;
    color: #6b7280 !important;
    cursor: pointer !important;
    margin-left: 6px !important;
    vertical-align: middle !important;
    opacity: 0.35 !important;
    transition: all 0.15s ease !important;
    padding: 0 !important;
    line-height: 1 !important;
  }

  tr.searchResultsItem:hover .sm-row-eliminate-btn,
  td.searchResultsGalleryItem:hover .sm-row-eliminate-btn {
    opacity: 0.85 !important;
  }

  .sm-row-eliminate-btn:hover {
    opacity: 1 !important;
    background: #fee2e2 !important;
    border-color: #fca5a5 !important;
    color: #dc2626 !important;
  }

  .sm-row-eliminate-btn.is-eliminated {
    opacity: 0.9 !important;
    background: #fee2e2 !important;
    border-color: #fca5a5 !important;
    color: #dc2626 !important;
  }

  /* --- Arama Listesi ve Galeri Elenen İlan Vurgusu --- */
  #searchResultsTable tr.searchResultsItem.sm-eliminated-listing {
    opacity: 0.65 !important;
    background-color: #fff8f8 !important;
    transition: opacity 0.15s ease !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-eliminated-listing:hover {
    opacity: 0.95 !important;
    background-color: #fef2f2 !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-eliminated-listing td {
    background-color: #fff8f8 !important;
    border-bottom: 1px solid #fed7d7 !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-eliminated-listing td:first-child {
    border-left: 3px solid #dc2626 !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-eliminated-listing:hover td {
    background-color: #fef2f2 !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-eliminated-listing a.classifiedTitle {
    text-decoration: line-through !important;
    color: #991b1b !important;
  }

  #searchResultsGallery td.searchResultsGalleryItem.sm-eliminated-listing {
    opacity: 0.65 !important;
    background-color: #fff8f8 !important;
    border: 1px solid #fca5a5 !important;
    border-top: 3px solid #dc2626 !important;
    box-shadow: 0 1px 4px rgba(220, 38, 38, 0.08) !important;
    transition: opacity 0.15s ease !important;
  }

  #searchResultsGallery td.searchResultsGalleryItem.sm-eliminated-listing:hover {
    opacity: 0.95 !important;
    background-color: #fef2f2 !important;
  }

  #searchResultsGallery td.searchResultsGalleryItem.sm-eliminated-listing a.classifiedTitle {
    text-decoration: line-through !important;
    color: #991b1b !important;
  }

  /* Vitrin Elenen Vurgusu */
  ul.vitrin-list li.sm-eliminated-listing,
  .showcase-list li.sm-eliminated-listing {
    opacity: 0.65 !important;
    border-bottom: 2px solid #dc2626 !important;
  }
`;
