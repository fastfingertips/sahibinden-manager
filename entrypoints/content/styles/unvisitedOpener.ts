export const unvisitedOpenerStyles = `
  /* --- Ziyaret Edilmemiş İlanları Açma Butonu --- */
  .sm-unvisited-opener-btn {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    color: #1a4f82 !important;
    background-color: #ffffff !important;
    border: 1px solid #bfdbfe !important;
    border-radius: 4px !important;
    padding: 4px 10px !important;
    line-height: 16px !important;
    cursor: pointer !important;
    box-shadow: 0 1px 2px rgba(26, 79, 130, 0.08) !important;
    transition: all 0.15s ease !important;
    user-select: none !important;
    vertical-align: middle !important;
    margin: 4px 0 !important;
  }

  .sm-unvisited-opener-btn:hover {
    background-color: #eff6ff !important;
    border-color: #93c5fd !important;
    color: #1d4ed8 !important;
    box-shadow: 0 2px 4px rgba(29, 78, 216, 0.12) !important;
  }

  .sm-unvisited-opener-btn:active {
    transform: scale(0.98) !important;
    background-color: #dbeafe !important;
  }

  .sm-unvisited-opener-btn svg {
    flex-shrink: 0 !important;
    color: #2563eb !important;
  }

  .sm-unvisited-opener-btn .sm-opener-badge {
    background-color: #2563eb !important;
    color: #ffffff !important;
    font-size: 9.5px !important;
    font-weight: 700 !important;
    padding: 1px 5px !important;
    border-radius: 9999px !important;
    line-height: 12px !important;
  }

  .sm-unvisited-opener-btn .sm-opener-badge.sm-badge-empty {
    background-color: #94a3b8 !important;
  }

  /* Toolbar veya arama başlığı yanına yerleşim */
  .sm-unvisited-opener-container {
    display: inline-flex !important;
    align-items: center !important;
    margin-left: 10px !important;
    vertical-align: middle !important;
  }

  /* --- Bildirim / Toast Bileşeni --- */
  .sm-toast-container {
    position: fixed !important;
    bottom: 24px !important;
    right: 24px !important;
    z-index: 999999 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    pointer-events: none !important;
  }

  .sm-toast {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    background-color: #1e293b !important;
    color: #ffffff !important;
    padding: 8px 14px !important;
    border-radius: 6px !important;
    font-size: 11.5px !important;
    font-weight: 500 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22) !important;
    border: 1px solid #334155 !important;
    pointer-events: auto !important;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.2s ease, transform 0.2s ease !important;
  }

  .sm-toast.sm-toast-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .sm-toast svg {
    flex-shrink: 0 !important;
  }

  .sm-toast.sm-toast-success svg {
    color: #4ade80 !important;
  }

  .sm-toast.sm-toast-info svg {
    color: #60a5fa !important;
  }
`;
