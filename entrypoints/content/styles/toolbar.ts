export const toolbarStyles = `
  /* --- Sahibinden Native Toolbar Entegrasyon Grubu --- */
  .sm-toolbar-actions-group {
    float: right !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    margin-top: 4px !important;
    margin-right: 12px !important;
    height: 26px !important;
    vertical-align: middle !important;
  }

  .sm-toolbar-actions-group.sm-toolbar-fallback {
    float: none !important;
    display: flex !important;
    margin: 8px 0 !important;
    clear: both !important;
  }

  /* Toolbar İçindeki Butonların Ortak Native Tarzı */
  .sm-toolbar-actions-group .sm-unvisited-opener-btn,
  .sm-toolbar-actions-group .sm-listing-filter-btn,
  .sm-toolbar-actions-group .sm-compact-toggle-btn {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    height: 25px !important;
    line-height: 23px !important;
    padding: 0 9px !important;
    border-radius: 3px !important;
    border: 1px solid #cbd5e1 !important;
    background: #ffffff !important;
    color: #334155 !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 5px !important;
    cursor: pointer !important;
    margin: 0 !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
    transition: all 0.15s ease !important;
    vertical-align: middle !important;
    user-select: none !important;
    box-sizing: border-box !important;
  }

  .sm-toolbar-actions-group .sm-unvisited-opener-btn:hover,
  .sm-toolbar-actions-group .sm-listing-filter-btn:hover,
  .sm-toolbar-actions-group .sm-compact-toggle-btn:hover {
    background: #f8fafc !important;
    border-color: #94a3b8 !important;
    color: #0f172a !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) !important;
  }

  .sm-toolbar-actions-group .sm-unvisited-opener-btn:active,
  .sm-toolbar-actions-group .sm-listing-filter-btn:active,
  .sm-toolbar-actions-group .sm-compact-toggle-btn:active {
    transform: scale(0.98) !important;
  }
`;
