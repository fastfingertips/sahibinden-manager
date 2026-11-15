import { highlightVisitedDetail, highlightVisitedListings } from './ui/visited';

// WXT tarafından sağlanan global 'storage' kullanılıyor

let cachedRecords: Record<string, number> = {};

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

export const initVisitedTracking = async () => {
  try {
    cachedRecords = (await storage.getItem<Record<string, number>>('local:viewed-listings')) || {};

    const adId = extractClassifiedId();
    if (adId) {
      if (cachedRecords[adId]) {
        highlightVisitedDetail(adId, cachedRecords[adId]);
      }
      cachedRecords[adId] = Date.now();
      await storage.setItem('local:viewed-listings', cachedRecords);
    }

    highlightVisitedListings(cachedRecords);

    storage.watch<Record<string, number>>('local:viewed-listings', (newVal) => {
      cachedRecords = newVal || {};
      if (!newVal || Object.keys(newVal).length === 0) {
        document.querySelectorAll('.sm-visited-listing').forEach((el) => {
          el.classList.remove('sm-visited-listing');
        });
        document.querySelectorAll('.sm-visited-badge, .sm-detail-visited-banner').forEach((el) => {
          el.remove();
        });
      } else {
        highlightVisitedListings(cachedRecords);
      }
    });
  } catch (err) {
    console.error('Sahibinden Manager: Ziyaret takibi başlatılamadı', err);
  }
};

export const applyVisitedToListings = () => {
  if (cachedRecords && Object.keys(cachedRecords).length > 0) {
    highlightVisitedListings(cachedRecords);
  }
};
