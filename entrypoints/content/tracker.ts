import { highlightVisitedDetail, highlightVisitedListings } from './ui/visited';

// WXT tarafından sağlanan global 'storage' kullanılıyor

export interface VisitedListingRecord {
  id: string;
  title: string;
  url: string;
  visitedAt: number;
}

export type StoredViewedListings = Record<string, VisitedListingRecord | number>;

let cachedRecords: StoredViewedListings = {};

export const getTimestamp = (
  val: VisitedListingRecord | number | undefined,
): number | undefined => {
  if (!val) return undefined;
  return typeof val === 'number' ? val : val.visitedAt;
};

export const extractClassifiedId = (): string | null => {
  // 1. Gizli DOM input öğesi kontrolü (en güvenilir yöntem)
  const idInput = (document.getElementById('classifiedIdValue') ||
    document.getElementById('classifiedId')) as HTMLInputElement | null;
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

export const extractClassifiedTitle = (): string => {
  const h1 = document.querySelector('.classifiedDetailTitle h1');
  if (h1?.textContent?.trim()) {
    return h1.textContent.trim();
  }
  return document.title.replace(/\s*-\s*\d+$/, '').trim() || 'İlan';
};

export const initVisitedTracking = async () => {
  try {
    cachedRecords = (await storage.getItem<StoredViewedListings>('local:viewed-listings')) || {};

    const adId = extractClassifiedId();
    if (adId) {
      const existingTime = getTimestamp(cachedRecords[adId]);
      if (existingTime) {
        highlightVisitedDetail(adId, existingTime);
      }
      cachedRecords[adId] = {
        id: adId,
        title: extractClassifiedTitle(),
        url: window.location.href,
        visitedAt: Date.now(),
      };
      await storage.setItem('local:viewed-listings', cachedRecords);
    }

    highlightVisitedListings(cachedRecords);

    storage.watch<StoredViewedListings>('local:viewed-listings', (newVal) => {
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
