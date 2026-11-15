// WXT tarafından sağlanan global 'storage' kullanılıyor

export const extractClassifiedId = (): string | null => {
  // 1. Gizli DOM input öğesi kontrolü (en güvenilir yöntem)
  const idInput = document.getElementById('classifiedId') as HTMLInputElement | null;
  if (idInput?.value && /^\d+$/.test(idInput.value.trim())) {
    return idInput.value.trim();
  }

  // 2. URL pathname kontrolü (/ilan/...-123456789/detay)
  const urlMatch = window.location.pathname.match(/\/ilan\/.*-(\d+)(\/detay)?/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  // 3. Belge başlığı fallback kontrolü
  const titleMatch = document.title.match(/(\d+)$/);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1];
  }

  return null;
};

export const trackCurrentClassified = async () => {
  const adId = extractClassifiedId();
  if (!adId) return;

  try {
    const records = (await storage.getItem<Record<string, number>>('local:viewed-listings')) || {};
    records[adId] = Date.now();
    await storage.setItem('local:viewed-listings', records);
  } catch (err) {
    console.error('Sahibinden Manager: İlan geçmişi kaydedilemedi', err);
  }
};
