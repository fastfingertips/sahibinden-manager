// WXT tarafından otomatik sağlanan global 'storage' kullanılıyor

export const setupDownloaderState = async () => {
  const watchDownloader = async (enabled: boolean | null) => {
    if (enabled) {
      document.body.classList.add('sm-downloader-active');
    } else {
      document.body.classList.remove('sm-downloader-active');
    }
  };

  // İlk durum
  const isEnabled = await storage.getItem<boolean>('local:sm-downloader-enabled');
  watchDownloader(isEnabled);

  // Değişiklikleri izle
  storage.watch<boolean>('local:sm-downloader-enabled', (newValue) => {
    watchDownloader(newValue);
  });
};
