export const compactViewStyles = `
  /* --- Toolbar Kompakt Görünüm Butonu --- */
  .sm-compact-toggle-btn {
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

  .sm-compact-toggle-btn:hover {
    background-color: #f8fafc !important;
    border-color: #94a3b8 !important;
    color: #0f172a !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) !important;
  }

  .sm-compact-toggle-btn:active {
    transform: scale(0.98) !important;
    background-color: #f1f5f9 !important;
  }

  .sm-compact-toggle-btn svg {
    flex-shrink: 0 !important;
    color: #475569 !important;
  }

  .sm-compact-toggle-btn.sm-compact-active {
    border-color: #0284c7 !important;
    background-color: #f0f9ff !important;
    color: #0369a1 !important;
  }

  .sm-compact-toggle-btn.sm-compact-active svg {
    color: #0284c7 !important;
  }

  .sm-compact-toggle-btn .sm-compact-badge {
    background-color: #e2e8f0 !important;
    color: #475569 !important;
    font-size: 9.5px !important;
    font-weight: 700 !important;
    padding: 1px 6px !important;
    border-radius: 9999px !important;
    line-height: 12px !important;
  }

  .sm-compact-toggle-btn.sm-compact-active .sm-compact-badge {
    background-color: #0284c7 !important;
    color: #ffffff !important;
  }

  /* ========================================================
     MOD 1: Mini Resim Modu (.sm-compact-mini)
     ======================================================== */
  html.sm-compact-mini #searchResultsTable tr.searchResultsItem,
  html.sm-compact-mini table.searchResultsTable tr.searchResultsItem {
    height: 38px !important;
    max-height: 42px !important;
  }

  html.sm-compact-mini #searchResultsTable tr.searchResultsItem td,
  html.sm-compact-mini table.searchResultsTable tr.searchResultsItem td {
    padding-top: 3px !important;
    padding-bottom: 3px !important;
    vertical-align: middle !important;
  }

  /* Mini Resim Sütunu Daraltma */
  html.sm-compact-mini #searchResultsTable td.searchResultsLargeThumbnailValue,
  html.sm-compact-mini #searchResultsTable td.searchResultsLargeThumbnail,
  html.sm-compact-mini table.searchResultsTable td.searchResultsLargeThumbnailValue,
  html.sm-compact-mini table.searchResultsTable td.searchResultsLargeThumbnail,
  html.sm-compact-mini #searchResultsTable th.searchResultsLargeThumbnailValue,
  html.sm-compact-mini #searchResultsTable th.searchResultsLargeThumbnail,
  html.sm-compact-mini table.searchResultsTable th.searchResultsLargeThumbnailValue,
  html.sm-compact-mini table.searchResultsTable th.searchResultsLargeThumbnail {
    width: 52px !important;
    min-width: 52px !important;
    max-width: 52px !important;
    padding: 2px 4px !important;
    text-align: center !important;
    position: relative !important;
  }

  html.sm-compact-mini #searchResultsTable td.searchResultsLargeThumbnailValue img,
  html.sm-compact-mini #searchResultsTable td.searchResultsLargeThumbnail img,
  html.sm-compact-mini table.searchResultsTable td.searchResultsLargeThumbnailValue img,
  html.sm-compact-mini table.searchResultsTable td.searchResultsLargeThumbnail img {
    width: 42px !important;
    height: 32px !important;
    max-width: 42px !important;
    max-height: 32px !important;
    object-fit: cover !important;
    border-radius: 3px !important;
    display: block !important;
    margin: 0 auto !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.12) !important;
    transition: transform 0.15s ease, box-shadow 0.15s ease !important;
  }

  /* Mini Resim Üzerine Gelindiğinde Büyütülmüş Hızlı Önizleme (Hover Zoom) */
  html.sm-compact-mini #searchResultsTable td.searchResultsLargeThumbnailValue:hover img,
  html.sm-compact-mini #searchResultsTable td.searchResultsLargeThumbnail:hover img,
  html.sm-compact-mini table.searchResultsTable td.searchResultsLargeThumbnailValue:hover img,
  html.sm-compact-mini table.searchResultsTable td.searchResultsLargeThumbnail:hover img {
    position: absolute !important;
    top: 50% !important;
    left: 8px !important;
    transform: translateY(-50%) scale(3.5) !important;
    transform-origin: left center !important;
    z-index: 99999 !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
    border: 2px solid #ffffff !important;
    pointer-events: none !important;
  }

  /* Başlık ve Rozetlerin Tek Satırda Kusursuz Hizalanması */
  html.sm-compact-mini #searchResultsTable td.searchResultsTitleValue,
  html.sm-compact-mini table.searchResultsTable td.searchResultsTitleValue {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
    padding-left: 6px !important;
    vertical-align: middle !important;
    white-space: normal !important;
  }

  html.sm-compact-mini #searchResultsTable td.searchResultsTitleValue .sm-visited-badges,
  html.sm-compact-mini table.searchResultsTable td.searchResultsTitleValue .sm-visited-badges {
    position: static !important;
    display: inline-flex !important;
    vertical-align: middle !important;
    margin-right: 6px !important;
    margin-top: -1px !important;
  }

  html.sm-compact-mini #searchResultsTable td.searchResultsTitleValue a.classifiedTitle,
  html.sm-compact-mini table.searchResultsTable td.searchResultsTitleValue a.classifiedTitle {
    display: inline !important;
    vertical-align: middle !important;
    line-height: 1.3 !important;
    font-size: 11.5px !important;
  }

  html.sm-compact-mini .sm-row-eliminate-btn {
    top: 50% !important;
    transform: translateY(-50%) !important;
    right: 8px !important;
    width: 18px !important;
    height: 18px !important;
  }

  html.sm-compact-mini .sm-row-eliminate-btn:hover {
    transform: translateY(-50%) scale(1.08) !important;
  }

  /* ========================================================
     MOD 2: Resimsiz Ultra Kompakt Mod (.sm-compact-hidden)
     ======================================================== */
  html.sm-compact-hidden #searchResultsTable tr.searchResultsItem,
  html.sm-compact-hidden table.searchResultsTable tr.searchResultsItem {
    height: 30px !important;
    max-height: 34px !important;
  }

  html.sm-compact-hidden #searchResultsTable tr.searchResultsItem td,
  html.sm-compact-hidden table.searchResultsTable tr.searchResultsItem td {
    padding-top: 3px !important;
    padding-bottom: 3px !important;
    vertical-align: middle !important;
  }

  /* Resim Sütununu Tamamen Kaldır */
  html.sm-compact-hidden #searchResultsTable td.searchResultsLargeThumbnailValue,
  html.sm-compact-hidden #searchResultsTable td.searchResultsLargeThumbnail,
  html.sm-compact-hidden table.searchResultsTable td.searchResultsLargeThumbnailValue,
  html.sm-compact-hidden table.searchResultsTable td.searchResultsLargeThumbnail,
  html.sm-compact-hidden #searchResultsTable th.searchResultsLargeThumbnailValue,
  html.sm-compact-hidden #searchResultsTable th.searchResultsLargeThumbnail,
  html.sm-compact-hidden table.searchResultsTable th.searchResultsLargeThumbnailValue,
  html.sm-compact-hidden table.searchResultsTable th.searchResultsLargeThumbnail {
    display: none !important;
  }

  /* Başlık ve Rozetlerin Tek Satırda Kusursuz Hizalanması */
  html.sm-compact-hidden #searchResultsTable td.searchResultsTitleValue,
  html.sm-compact-hidden table.searchResultsTable td.searchResultsTitleValue {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
    padding-left: 8px !important;
    vertical-align: middle !important;
    white-space: normal !important;
  }

  html.sm-compact-hidden #searchResultsTable td.searchResultsTitleValue .sm-visited-badges,
  html.sm-compact-hidden table.searchResultsTable td.searchResultsTitleValue .sm-visited-badges {
    position: static !important;
    display: inline-flex !important;
    vertical-align: middle !important;
    margin-right: 6px !important;
    margin-top: -1px !important;
  }

  html.sm-compact-hidden #searchResultsTable td.searchResultsTitleValue a.classifiedTitle,
  html.sm-compact-hidden table.searchResultsTable td.searchResultsTitleValue a.classifiedTitle {
    display: inline !important;
    vertical-align: middle !important;
    line-height: 1.3 !important;
    font-size: 11.5px !important;
  }

  html.sm-compact-hidden .sm-row-eliminate-btn {
    top: 50% !important;
    transform: translateY(-50%) !important;
    right: 8px !important;
    width: 18px !important;
    height: 18px !important;
  }

  html.sm-compact-hidden .sm-row-eliminate-btn:hover {
    transform: translateY(-50%) scale(1.08) !important;
  }
`;
