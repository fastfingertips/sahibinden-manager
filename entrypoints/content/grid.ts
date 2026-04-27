export const initGridMode = async () => {
  // İlk yüklemede ayarı kontrol et
  const isEnabled = await storage.getItem<boolean>('local:isFullGridEnabled');

  if (isEnabled !== false) {
    document.documentElement.classList.add('sm-grid-enabled');
  }

  // Ayar değiştikçe canlı olarak güncelle
  storage.watch<boolean>('local:isFullGridEnabled', (newVal) => {
    if (newVal !== false) {
      document.documentElement.classList.add('sm-grid-enabled');
    } else {
      document.documentElement.classList.remove('sm-grid-enabled');
    }
  });
};
