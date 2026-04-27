export const gridStyles = `
  @keyframes fadeInGrid {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* --- Orijinal 100x75px Yapısı (Sadece Grid Mode Aktifse) --- */
  html.sm-grid-enabled .classifiedDetailThumbListContainer {
    width: 100% !important;
    max-width: none !important;
    height: auto !important;
    overflow: visible !important;
    border: 1px solid #dbdbdb !important;
    border-top: 0 !important;
    box-sizing: border-box !important;
    display: block !important;
    animation: fadeInGrid 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards !important;
  }

  html.sm-grid-enabled .classifiedDetailThumbListPages {
    display: flex !important;
    flex-wrap: wrap !important;
    width: 528px !important;
    height: auto !important;
    transform: none !important;
    margin: 0 auto !important;
    padding: 0 0 4px 0 !important;
    box-sizing: border-box !important;
    justify-content: flex-start !important;
  }

  /* Sayfa ve Liste yapılarını "şeffaf" yap (Sadece Grid Mode) */
  html.sm-grid-enabled .classifiedDetailThumbListPages > li,
  html.sm-grid-enabled .classifiedDetailThumbList {
    display: contents !important;
    width: auto !important;
    height: auto !important;
  }

  html.sm-grid-enabled .classifiedDetailThumbList li {
    width: 100px !important;
    height: 75px !important;
    margin: 4px 0 0 4px !important;
    padding: 0 !important;
    position: relative !important;
    display: block !important;
    float: none !important;
    list-style: none !important;
    box-sizing: border-box !important;
  }

  html.sm-grid-enabled .classifiedDetailThumbList li label {
    display: block !important;
    width: 100px !important;
    height: 75px !important;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer !important;
    border: 1px solid transparent !important;
    box-sizing: border-box !important;
    position: relative !important;
  }

  html.sm-grid-enabled .classifiedDetailThumbList li label.selected {
    border-color: #417abb !important;
  }

  html.sm-grid-enabled .classifiedDetailThumbList li img {
    width: 100px !important;
    height: 75px !important;
    object-fit: cover !important;
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
  }

  /* Grid modunda orijinal kontrolleri gizle */
  html.sm-grid-enabled .slider-controls, 
  html.sm-grid-enabled .dot-container {
    display: none !important;
    visibility: hidden !important;
  }
`;
