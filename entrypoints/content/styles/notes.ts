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

  /* --- İlan Detay Yüzen Not Butonu (FAB) --- */
  .sm-notes-fab {
    position: fixed !important;
    right: 24px !important;
    bottom: 24px !important;
    z-index: 99999 !important;
    background-color: #417abb !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 4px !important;
    padding: 8px 12px !important;
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    transition: all 0.2s ease !important;
  }

  .sm-notes-fab:hover {
    background-color: #366196 !important;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25) !important;
  }

  .sm-notes-fab-badge {
    width: 7px !important;
    height: 7px !important;
    background-color: #ffda00 !important;
    border-radius: 50% !important;
    display: inline-block !important;
  }

  /* --- İlan Detay Not Penceresi (Modal / Drawer) --- */
  .sm-notes-modal-overlay {
    position: fixed !important;
    inset: 0 !important;
    background-color: rgba(0, 0, 0, 0.45) !important;
    z-index: 999999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    backdrop-filter: blur(1px) !important;
  }

  .sm-notes-modal {
    background-color: #ffffff !important;
    border: 1px solid #dbdbdb !important;
    border-radius: 2px !important;
    width: 440px !important;
    max-width: 90vw !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25) !important;
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    box-sizing: border-box !important;
  }

  .sm-notes-header {
    background-color: #f9f9f9 !important;
    border-bottom: 1px solid #dbdbdb !important;
    padding: 12px 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }

  .sm-notes-header h3 {
    margin: 0 !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #333333 !important;
  }

  .sm-notes-close-btn {
    background: none !important;
    border: none !important;
    font-size: 18px !important;
    line-height: 1 !important;
    color: #888888 !important;
    cursor: pointer !important;
    padding: 0 !important;
  }

  .sm-notes-close-btn:hover {
    color: #333333 !important;
  }

  .sm-notes-body {
    padding: 16px !important;
  }

  .sm-notes-textarea {
    width: 100% !important;
    min-height: 110px !important;
    border: 1px solid #dbdbdb !important;
    border-radius: 2px !important;
    padding: 10px !important;
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 12px !important;
    color: #333333 !important;
    resize: vertical !important;
    box-sizing: border-box !important;
    outline: none !important;
    line-height: 1.5 !important;
  }

  .sm-notes-textarea:focus {
    border-color: #417abb !important;
  }

  .sm-notes-footer {
    border-top: 1px solid #eeeeee !important;
    padding: 10px 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    background-color: #fafafa !important;
  }

  .sm-notes-status {
    font-size: 10px !important;
    color: #888888 !important;
  }

  .sm-notes-actions {
    display: flex !important;
    gap: 8px !important;
  }

  .sm-notes-btn {
    border-radius: 2px !important;
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    padding: 6px 12px !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
  }

  .sm-notes-btn-save {
    background-color: #417abb !important;
    color: #ffffff !important;
    border: 1px solid #366196 !important;
  }

  .sm-notes-btn-save:hover {
    background-color: #366196 !important;
  }

  .sm-notes-btn-delete {
    background-color: transparent !important;
    color: #cc0000 !important;
    border: 1px solid transparent !important;
  }

  .sm-notes-btn-delete:hover {
    background-color: #fff0f0 !important;
    border-color: #ffcccc !important;
  }
`;
