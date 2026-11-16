// WXT tarafından sağlanan global 'storage' kullanılıyor

let isHideAdsActive = false;

const AD_SELECTORS = [
  '#searchResultsTable tr.nativeAd',
  '#searchResultsTable tr.classicNativeAd',
  'tr.nativeAd',
  'tr.classicNativeAd',
  '#searchResultsTable tr.searchResultsPromoToplist',
  '#searchResultsTable tr.searchResultsPromoToplistFooter',
  'tr.searchResultsPromoToplist',
  'tr.searchResultsPromoToplistFooter',
  'tr:has(a[href*="/doping-tanitim/"])',
  '.searchResultsPromoToplist',
  'div[id^="div-gpt-ad-"]',
  '.dfp-ad-container',
  '.banner-area',
  '.advertisement-content',
].join(', ');

export const trackFilteredAds = async () => {
  if (!isHideAdsActive) return;

  const adElements = document.querySelectorAll<HTMLElement>(AD_SELECTORS);
  let newlyFoundCount = 0;

  adElements.forEach((el) => {
    if (el.dataset.smAdCounted !== 'true') {
      el.dataset.smAdCounted = 'true';
      newlyFoundCount++;
    }
  });

  if (newlyFoundCount > 0) {
    const currentTotal = (await storage.getItem<number>('local:filtered-ads-count')) || 0;
    await storage.setItem('local:filtered-ads-count', currentTotal + newlyFoundCount);
  }
};

export const initAdsMode = async () => {
  try {
    const isHideAds = await storage.getItem<boolean>('local:isHideAdsEnabled');
    isHideAdsActive = isHideAds === true;

    if (isHideAdsActive) {
      document.documentElement.classList.add('sm-hide-ads');
      trackFilteredAds();
    }

    storage.watch<boolean>('local:isHideAdsEnabled', (newVal) => {
      isHideAdsActive = newVal === true;
      if (isHideAdsActive) {
        document.documentElement.classList.add('sm-hide-ads');
        trackFilteredAds();
      } else {
        document.documentElement.classList.remove('sm-hide-ads');
      }
    });
  } catch (err) {
    console.error('Sahibinden Manager: Reklam temizleme modu başlatılamadı', err);
  }
};
