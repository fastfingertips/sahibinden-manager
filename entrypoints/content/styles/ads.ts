export const adsStyles = `
  /* --- Harici ve Sponsorlu Reklam Satırlarını Temizleme --- */
  html.sm-hide-ads #searchResultsTable tr.nativeAd,
  html.sm-hide-ads #searchResultsTable tr.classicNativeAd,
  html.sm-hide-ads tr.nativeAd,
  html.sm-hide-ads tr.classicNativeAd,
  html.sm-hide-ads div[id^="div-gpt-ad-"],
  html.sm-hide-ads .dfp-ad-container,
  html.sm-hide-ads .banner-area,
  html.sm-hide-ads .advertisement-content {
    display: none !important;
  }
`;
