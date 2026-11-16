export const adsStyles = `
  /* --- Harici, Sponsorlu Reklam ve Doping Tanıtım Satırlarını Temizleme --- */
  html.sm-hide-ads #searchResultsTable tr.nativeAd,
  html.sm-hide-ads #searchResultsTable tr.classicNativeAd,
  html.sm-hide-ads tr.nativeAd,
  html.sm-hide-ads tr.classicNativeAd,
  html.sm-hide-ads #searchResultsTable tr.searchResultsPromoToplist,
  html.sm-hide-ads #searchResultsTable tr.searchResultsPromoToplistFooter,
  html.sm-hide-ads tr.searchResultsPromoToplist,
  html.sm-hide-ads tr.searchResultsPromoToplistFooter,
  html.sm-hide-ads tr:has(a[href*="/doping-tanitim/"]),
  html.sm-hide-ads .searchResultsPromoToplist,
  html.sm-hide-ads div[id^="div-gpt-ad-"],
  html.sm-hide-ads .dfp-ad-container,
  html.sm-hide-ads .banner-area,
  html.sm-hide-ads .advertisement-content {
    display: none !important;
  }
`;
