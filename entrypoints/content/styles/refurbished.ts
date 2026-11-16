export const refurbishedStyles = `
  /* --- Tüm Yenilenmiş Ürünleri Toplu Gizleme --- */
  html.sm-hide-refurbished .refurbishment-content-box,
  html.sm-hide-refurbished [data-refurbishment-product],
  html.sm-hide-refurbished li:has(.refurbishment-content-box),
  html.sm-hide-refurbished li:has([data-refurbishment-product]),
  html.sm-hide-refurbished tr:has(.refurbishment-content-box),
  html.sm-hide-refurbished tr:has(.refurbishment),
  html.sm-hide-refurbished tr:has(.refurbishment-classified-url),
  html.sm-hide-refurbished tr:has(.yepy-badge-info),
  html.sm-hide-refurbished tr:has(.refurbishment-img) {
    display: none !important;
  }

  /* --- Tekil Gizlenen Yenilenmiş Ürünler --- */
  .sm-refurbished-ignored {
    display: none !important;
  }

  /* --- Yenilenmiş Kart Üzerine Eklenen Gizle Butonu --- */
  .refurbishment-content-box {
    position: relative !important;
  }

  .sm-refurbished-ignore-btn {
    position: absolute !important;
    top: 6px !important;
    right: 6px !important;
    z-index: 10 !important;
    background-color: #ffffff !important;
    border: 1px solid #dbdbdb !important;
    border-radius: 2px !important;
    color: #888888 !important;
    width: 20px !important;
    height: 20px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: all 0.15s ease !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
  }

  .refurbishment-content-box:hover .sm-refurbished-ignore-btn {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .sm-refurbished-ignore-btn:hover {
    color: #c00000 !important;
    border-color: #c00000 !important;
    background-color: #fff5f5 !important;
  }
`;
