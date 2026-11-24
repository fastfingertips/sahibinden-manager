export const visitedStyles = `
  /* --- Ziyaret Edilmiş İlan Tablo Satırı Belirginleştirme --- */
  #searchResultsTable tr.searchResultsItem.sm-visited-listing {
    opacity: 0.92 !important;
    transition: all 0.15s ease !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-visited-listing td {
    background-color: #f0f6fc !important;
    border-bottom: 1px solid #dce8f5 !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-visited-listing td:first-child {
    border-left: 3px solid #3875ba !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-visited-listing:hover td {
    background-color: #e4eef9 !important;
  }

  #searchResultsTable tr.searchResultsItem.sm-visited-listing a.classifiedTitle {
    color: #1e5288 !important;
    font-weight: 600 !important;
  }

  /* --- Galeri Görünümü Ziyaret Edilmiş Kartlar --- */
  #searchResultsGallery td.searchResultsGalleryItem.sm-visited-listing {
    background-color: #f0f6fc !important;
    border: 1px solid #c2d9ed !important;
    border-top: 3px solid #3875ba !important;
    box-shadow: 0 2px 6px rgba(56, 117, 186, 0.12) !important;
    opacity: 0.95 !important;
  }

  #searchResultsGallery td.searchResultsGalleryItem.sm-visited-listing:hover {
    background-color: #e4eef9 !important;
    opacity: 1 !important;
  }

  /* --- Vitrin Listeleri Ziyaret Vurgusu --- */
  ul.vitrin-list li.sm-visited-listing,
  .showcase-list li.sm-visited-listing {
    opacity: 0.88 !important;
    border-bottom: 2px solid #3875ba !important;
  }

  /* --- Rozet Konteyneri (Yan yana dizilim) --- */
  .sm-visited-badges {
    display: inline-flex !important;
    align-items: center !important;
    gap: 4px !important;
    white-space: nowrap !important;
  }

  /* Liste Görünümünde (#searchResultsTable):
     Başlığın dikey hizasını ve satır akışını KESİNLİKLE bozmamak için
     rozetler mutlak konumlandırma (absolute) ile başlığın üstündeki boşluğa yerleştirilir. */
  #searchResultsTable td.searchResultsTitleValue,
  table.searchResultsTable td.searchResultsTitleValue {
    position: relative !important;
  }

  #searchResultsTable td.searchResultsTitleValue .sm-visited-badges,
  table.searchResultsTable td.searchResultsTitleValue .sm-visited-badges {
    position: absolute !important;
    top: 10px !important;
    left: 4px !important;
    margin: 0 !important;
    z-index: 2 !important;
  }

  /* --- Sahibinden Uyumlu Ziyaret Rozetleri (Badge) --- */
  .sm-visited-badge {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 3px !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    border-radius: 2px !important;
    padding: 1px 6px !important;
    letter-spacing: 0.02em !important;
    line-height: 14px !important;
    box-shadow: 0 1px 2px rgba(26, 79, 130, 0.08) !important;
    cursor: pointer !important;
    user-select: none !important;
  }

  /* Son Kontrol Rozeti (Mavi) */
  .sm-visited-badge.sm-badge-last,
  .sm-visited-badge:not(.sm-badge-first) {
    color: #1a4f82 !important;
    background-color: #dbeafe !important;
    border: 1px solid #bfdbfe !important;
  }

  /* İlk Kontrol Rozeti (İndigo) */
  .sm-visited-badge.sm-badge-first {
    color: #4338ca !important;
    background-color: #e0e7ff !important;
    border: 1px solid #c7d2fe !important;
  }

  /* Soru Soruldu / Yorum Rozeti (Yeşil / Zümrüt) */
  .sm-visited-badge.sm-badge-comment {
    color: #065f46 !important;
    background-color: #dcfce7 !important;
    border: 1px solid #bbf7d0 !important;
  }

  /* Not Var Rozeti (Kehribar / Sarı) */
  .sm-visited-badge.sm-badge-note {
    color: #92400e !important;
    background-color: #fef3c7 !important;
    border: 1px solid #fde68a !important;
  }

  /* --- Sahibinden İlan Detay Ziyaret Bilgilendirme Paneli --- */
  .sm-detail-visited-banner {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    display: flex !important;
    align-items: center !important;
    background-color: #f9f9f9 !important;
    border: 1px solid #dbdbdb !important;
    border-left: 3px solid #3875ba !important;
    border-radius: 0px !important;
    color: #333333 !important;
    padding: 10px 14px !important;
    margin: 10px 0 !important;
    font-size: 12px !important;
    font-weight: 400 !important;
    box-sizing: border-box !important;
  }

  .sm-detail-visited-banner .sm-badge {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    font-size: 10px !important;
    letter-spacing: 0.05em !important;
    background-color: #417abb !important;
    color: #ffffff !important;
    padding: 2px 6px !important;
    border-radius: 2px !important;
    margin-right: 10px !important;
    line-height: 14px !important;
  }

  .sm-detail-visited-banner .sm-date {
    color: #666666 !important;
    margin-left: 4px !important;
  }
`;
