export const descriptionCopyStyles = `
  /* --- İlan Açıklaması & Soru-Cevap Başlık Çubukları & Kopyalama Butonları --- */
  .uiBoxTitle.sm-title-flex,
  .uiBox:has(#classifiedDescription) .uiBoxTitle,
  .uiBox:has(#soru-cevap) .uiBoxTitle,
  section.classified-question-answer .uiBoxTitle {
    display: flex !important;
    align-items: center !important;
    position: relative !important;
  }

  .sm-description-actions,
  .sm-cqa-actions {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    margin-left: auto !important;
    padding-right: 6px !important;
  }

  .uiBoxTitle:has(.boxShowHide) .sm-description-actions,
  .uiBoxTitle:has(.boxShowHide) .sm-cqa-actions {
    padding-right: 28px !important;
  }

  .sm-copy-description-btn,
  .sm-copy-cqa-btn {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    color: #386696 !important;
    background-color: #ffffff !important;
    border: 1px solid #cddde9 !important;
    border-radius: 2px !important;
    padding: 2px 8px !important;
    line-height: 16px !important;
    height: 22px !important;
    box-sizing: border-box !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 4px !important;
    cursor: pointer !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
    transition: all 0.15s ease-in-out !important;
    outline: none !important;
    white-space: nowrap !important;
  }

  .sm-copy-description-btn:hover,
  .sm-copy-cqa-btn:hover {
    background-color: #f0f4f8 !important;
    border-color: #b7cee3 !important;
    color: #1a4f82 !important;
  }

  .sm-copy-description-btn:active,
  .sm-copy-cqa-btn:active {
    background-color: #e4eef7 !important;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1) !important;
  }

  .sm-copy-description-btn.copied,
  .sm-copy-cqa-btn.copied {
    background-color: #f0fdf4 !important;
    border-color: #86efac !important;
    color: #15803d !important;
  }

  .sm-copy-description-btn svg,
  .sm-copy-cqa-btn svg {
    display: inline-block !important;
    vertical-align: middle !important;
    flex-shrink: 0 !important;
  }
`;
