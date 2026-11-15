export const priceHistoryStyles = `
  /* --- Fiyat Tarihçesi İstatistik ve Analiz Paneli --- */
  .sm-price-analytics-card {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    background-color: #ffffff !important;
    border: 1px solid #dbdbdb !important;
    border-radius: 2px !important;
    padding: 16px 20px !important;
    margin: 16px 0 !important;
    box-sizing: border-box !important;
  }

  .sm-price-analytics-header {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    border-bottom: 1px solid #eeeeee !important;
    padding-bottom: 12px !important;
    margin-bottom: 14px !important;
  }

  .sm-price-analytics-title {
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #333333 !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .sm-price-analytics-badge {
    font-size: 10px !important;
    font-weight: 700 !important;
    padding: 2px 7px !important;
    border-radius: 2px !important;
    letter-spacing: 0.02em !important;
    display: inline-block !important;
  }

  .sm-badge-atl {
    background-color: #e8f5e9 !important;
    color: #2e7d32 !important;
    border: 1px solid #c8e6c9 !important;
  }

  .sm-badge-rise {
    background-color: #ffebee !important;
    color: #c62828 !important;
    border: 1px solid #ffcdd2 !important;
  }

  .sm-badge-neutral {
    background-color: #f5f5f5 !important;
    color: #616161 !important;
    border: 1px solid #e0e0e0 !important;
  }

  .sm-badge-warning {
    background-color: #fff8e1 !important;
    color: #f57f17 !important;
    border: 1px solid #ffe082 !important;
  }

  .sm-price-metrics-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 16px !important;
  }

  .sm-price-metric-box {
    background-color: #f9f9f9 !important;
    border: 1px solid #e5e5e5 !important;
    border-radius: 2px !important;
    padding: 12px 14px !important;
    box-sizing: border-box !important;
  }

  .sm-metric-label {
    font-size: 11px !important;
    color: #777777 !important;
    margin-bottom: 4px !important;
    font-weight: 500 !important;
  }

  .sm-metric-value {
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #333333 !important;
    line-height: 1.3 !important;
    margin-bottom: 2px !important;
  }

  .sm-metric-value.sm-value-drop {
    color: #2e7d32 !important;
  }

  .sm-metric-value.sm-value-rise {
    color: #c62828 !important;
  }

  .sm-metric-sub {
    font-size: 10px !important;
    color: #888888 !important;
    line-height: 1.2 !important;
  }

  /* --- Tarihçe Tablosu Kademeli Değişim Rozetleri --- */
  .sm-step-pill {
    font-family: SHBGroteskLegacy, Roboto, sans-serif, inherit !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    padding: 1px 6px !important;
    border-radius: 2px !important;
    margin-left: 8px !important;
    display: inline-block !important;
    vertical-align: middle !important;
    line-height: 14px !important;
  }

  .sm-step-pill.sm-step-drop {
    background-color: #e8f5e9 !important;
    color: #2e7d32 !important;
    border: 1px solid #c8e6c9 !important;
  }

  .sm-step-pill.sm-step-rise {
    background-color: #ffebee !important;
    color: #c62828 !important;
    border: 1px solid #ffcdd2 !important;
  }

  .sm-step-pill.sm-step-initial {
    background-color: #f5f5f5 !important;
    color: #757575 !important;
    border: 1px solid #e0e0e0 !important;
  }

  .sm-step-pill.sm-step-warning {
    background-color: #fff8e1 !important;
    color: #f57f17 !important;
    border: 1px solid #ffe082 !important;
  }
`;
