// WXT tarafından sağlanan global 'storage' kullanılıyor

export const initAdsMode = async () => {
  try {
    const isHideAds = await storage.getItem<boolean>('local:isHideAdsEnabled');
    if (isHideAds === true) {
      document.documentElement.classList.add('sm-hide-ads');
    }

    storage.watch<boolean>('local:isHideAdsEnabled', (newVal) => {
      if (newVal === true) {
        document.documentElement.classList.add('sm-hide-ads');
      } else {
        document.documentElement.classList.remove('sm-hide-ads');
      }
    });
  } catch (err) {
    console.error('Sahibinden Manager: Reklam temizleme modu başlatılamadı', err);
  }
};
