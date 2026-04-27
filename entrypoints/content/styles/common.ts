export const commonStyles = `
  /* --- Unified Download Button (Hidden by default) --- */
  .sm-page-thumb-dl, 
  .sm-main-photo-dl,
  .sm-thumb-dl {
    position: absolute !important;
    right: 4px !important;
    bottom: 4px !important;
    width: 24px !important;
    height: 24px !important;
    background: #417abb !important;
    color: #fff !important;
    border-radius: 4px !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 10 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: all 0.2s ease-in-out !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
  }

  /* --- Visibility Control via Downloader State --- */
  body:not(.sm-downloader-active) .sm-page-thumb-dl,
  body:not(.sm-downloader-active) .sm-main-photo-dl,
  body:not(.sm-downloader-active) .sm-thumb-dl,
  body:not(.sm-downloader-active) .sm-mega-dl {
    display: none !important;
  }

  /* Hover States */
  .sm-downloader-active .classifiedDetailThumbList li:hover .sm-page-thumb-dl,
  .sm-downloader-active .classifiedDetailMainPhoto label:hover .sm-main-photo-dl,
  .sm-downloader-active .megaPhotoThmbItem:hover .sm-thumb-dl {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .sm-downloader-active .sm-page-thumb-dl:hover, 
  .sm-downloader-active .sm-main-photo-dl:hover,
  .sm-downloader-active .sm-thumb-dl:hover {
    background: #366196 !important;
    border-color: rgba(255, 255, 255, 0.4) !important;
  }
`;
