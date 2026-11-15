export const notesStyles = `
  /* --- Arama Listesi ve Galeri Not Rozeti --- */
  .sm-note-badge {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    display: inline-block !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    color: #855700 !important;
    background-color: #fff8e1 !important;
    border: 1px solid #ffe082 !important;
    border-radius: 2px !important;
    padding: 1px 5px !important;
    margin-right: 6px !important;
    vertical-align: middle !important;
    letter-spacing: 0.02em !important;
    line-height: 14px !important;
    cursor: help !important;
  }

  /* Sahibinden'in 300px genişlik sınırını yeni buton eklendiğinde genişlet */
  .classifiedDetailTitle .classifiedEvents {
    width: auto !important;
    max-width: 440px !important;
  }

  /* --- İlan Detay Yerel Aksiyon Butonu (Favoriler ve Yazdır Yanı) --- */
  ul.classifiedEvents li.sm-classified-note-action {
    width: auto !important;
    float: left !important;
    list-style-type: none !important;
    margin: 0 10px 0 0 !important;
    padding: 10px 0 0 !important;
    position: relative !important;
  }

  .sm-classified-note-link {
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

  .sm-classified-note-link:hover {
    text-decoration: underline !important;
  }

  .sm-classified-note-link.has-note {
    font-weight: 700 !important;
    color: #00339f !important;
  }

  .sm-classified-note-icon {
    width: 13px !important;
    height: 13px !important;
    color: #00339f !important;
    display: inline-block !important;
    vertical-align: middle !important;
    flex-shrink: 0 !important;
  }

  .sm-classified-note-link.has-note .sm-classified-note-icon {
    color: #c98a00 !important;
  }

  .sm-classified-note-dot {
    width: 6px !important;
    height: 6px !important;
    border-radius: 50% !important;
    background-color: #fdb813 !important;
    display: inline-block !important;
    margin-left: 2px !important;
  }

  /* --- Not Düzenleme Açılır Paneli (Inline Dropdown) --- */
  .sm-note-dropdown {
    position: absolute !important;
    top: calc(100% + 5px) !important;
    left: 0 !important;
    z-index: 10000 !important;
    width: 330px !important;
    background: #ffffff !important;
    border: 1px solid #dbdbdb !important;
    border-radius: 2px !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    box-sizing: border-box !important;
    animation: smNoteFadeIn 0.15s ease-out !important;
  }

  @keyframes smNoteFadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sm-note-dropdown-header {
    background-color: #f7f7f7 !important;
    border-bottom: 1px solid #e5e5e5 !important;
    padding: 8px 12px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }

  .sm-note-dropdown-title {
    font-size: 11px !important;
    font-weight: 700 !important;
    color: #333333 !important;
  }

  .sm-note-dropdown-close {
    background: none !important;
    border: none !important;
    font-size: 16px !important;
    line-height: 1 !important;
    color: #888888 !important;
    cursor: pointer !important;
    padding: 0 2px !important;
  }

  .sm-note-dropdown-close:hover {
    color: #333333 !important;
  }

  .sm-note-dropdown-body {
    padding: 10px 12px !important;
  }

  .sm-note-dropdown-textarea {
    width: 100% !important;
    min-height: 85px !important;
    max-height: 220px !important;
    box-sizing: border-box !important;
    border: 1px solid #cccccc !important;
    border-radius: 2px !important;
    padding: 8px !important;
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 12px !important;
    color: #333333 !important;
    line-height: 1.4 !important;
    resize: vertical !important;
    outline: none !important;
    transition: border-color 0.2s ease !important;
  }

  .sm-note-dropdown-textarea:focus {
    border-color: #417abb !important;
    box-shadow: 0 0 0 1px #417abb !important;
  }

  .sm-note-dropdown-footer {
    padding: 8px 12px !important;
    background-color: #fafafa !important;
    border-top: 1px solid #eeeeee !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }

  .sm-note-dropdown-status {
    font-size: 10px !important;
    color: #888888 !important;
  }

  .sm-note-dropdown-actions {
    display: flex !important;
    gap: 6px !important;
    align-items: center !important;
  }

  .sm-note-btn {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    padding: 4px 10px !important;
    border-radius: 2px !important;
    cursor: pointer !important;
    border: 1px solid transparent !important;
    transition: all 0.15s ease !important;
  }

  .sm-note-btn-save {
    background-color: #ffe800 !important;
    color: #333333 !important;
    border: 1px solid #e6d100 !important;
  }

  .sm-note-btn-save:hover {
    background-color: #ffd600 !important;
  }

  .sm-note-btn-delete {
    background-color: transparent !important;
    color: #cc0000 !important;
    border: 1px solid #ffcccc !important;
  }

  .sm-note-btn-delete:hover {
    background-color: #ffebee !important;
    border-color: #ff9999 !important;
  }
`;
