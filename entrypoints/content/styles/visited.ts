export const visitedStyles = `
  /* Liste ve Galeri Ziyaret Edilmiş İlan Satırları */
  .sm-visited-listing {
    opacity: 0.68;
    background-color: #f7f9fa !important;
    transition: opacity 0.2s ease;
  }

  .sm-visited-listing:hover {
    opacity: 1 !important;
  }

  .sm-visited-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    color: #41688c;
    background-color: #eaf1f7;
    border: 1px solid #cddde9;
    border-radius: 3px;
    padding: 1px 5px;
    margin-right: 6px;
    vertical-align: middle;
    letter-spacing: 0.02em;
    line-height: 14px;
  }

  /* İlan Detay Sayfası Ziyaret Bilgilendirme Kutusu */
  .sm-detail-visited-banner {
    display: flex;
    align-items: center;
    background-color: #f2f6fa;
    border: 1px solid #d0deec;
    color: #2c4d6f;
    border-radius: 4px;
    padding: 8px 12px;
    margin: 10px 0;
    font-size: 12px;
    font-weight: 500;
  }

  .sm-detail-visited-banner .sm-badge {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.05em;
    background-color: #417abb;
    color: #ffffff;
    padding: 2px 6px;
    border-radius: 2px;
    margin-right: 8px;
  }
`;
