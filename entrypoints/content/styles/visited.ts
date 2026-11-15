export const visitedStyles = `
  /* --- Sahibinden Temalı Ziyaret Edilmiş İlan Satırları --- */
  .sm-visited-listing {
    opacity: 0.65;
    background-color: #f9f9f9 !important;
    transition: opacity 0.2s ease;
  }

  .sm-visited-listing:hover {
    opacity: 1 !important;
  }

  /* --- Sahibinden Uyumlu Rozet (Badge) --- */
  .sm-visited-badge {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    display: inline-block !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    color: #386696 !important;
    background-color: #eaf1f7 !important;
    border: 1px solid #cddde9 !important;
    border-radius: 2px !important;
    padding: 1px 5px !important;
    margin-right: 6px !important;
    vertical-align: middle !important;
    letter-spacing: 0.02em !important;
    line-height: 14px !important;
  }

  /* --- Sahibinden İlan Detay Ziyaret Bilgilendirme Paneli (Orijinal uiBox / safety-warnnings çizgisi) --- */
  .sm-detail-visited-banner {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    display: flex !important;
    align-items: center !important;
    background-color: #f9f9f9 !important;
    border: 1px solid #dbdbdb !important;
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
