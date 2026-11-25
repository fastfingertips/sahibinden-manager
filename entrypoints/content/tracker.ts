import {
  highlightVisitedDetail,
  highlightVisitedListings,
  setVisitedBadgeOptions,
  setVisitedBadgeContext,
} from './ui/visited';
import type { ListingCommentItem } from './cqa';
import type { ListingNote } from './ui/notes';

// WXT tarafından sağlanan global 'storage' kullanılıyor

export interface VisitedListingRecord {
  id: string;
  title: string;
  url: string;
  visitedAt: number;
  firstVisitedAt: number;
  lastVisitedAt: number;
  visitCount: number;
}

export type StoredViewedListings = Record<string, VisitedListingRecord | number>;

let cachedRecords: StoredViewedListings = {};
let cachedComments: Record<string, ListingCommentItem> = {};
let cachedNotes: Record<string, ListingNote> = {};
let isHighlightEnabled = true;
let isLastBadgeEnabled = true;
let isFirstBadgeEnabled = false;
let isCommentBadgeEnabled = true;

export const getFirstTimestamp = (
  val: VisitedListingRecord | number | undefined,
): number | undefined => {
  if (!val) return undefined;
  if (typeof val === 'number') return val;
  return val.firstVisitedAt || val.visitedAt;
};

export const getLastTimestamp = (
  val: VisitedListingRecord | number | undefined,
): number | undefined => {
  if (!val) return undefined;
  if (typeof val === 'number') return val;
  return val.lastVisitedAt || val.visitedAt;
};

export const getVisitCount = (val: VisitedListingRecord | number | undefined): number => {
  if (!val) return 0;
  if (typeof val === 'number') return 1;
  return val.visitCount || 1;
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
    cachedComments =
      (await storage.getItem<Record<string, ListingCommentItem>>('local:listing-comments')) || {};
    cachedNotes = (await storage.getItem<Record<string, ListingNote>>('local:listing-notes')) || {};

    const highlightPref = await storage.getItem<boolean>('local:isVisitedHighlightEnabled');
    isHighlightEnabled = highlightPref !== false;

    const lastBadgePref = await storage.getItem<boolean>('local:isVisitedLastBadgeEnabled');
    const firstBadgePref = await storage.getItem<boolean>('local:isVisitedFirstBadgeEnabled');
    const commentBadgePref = await storage.getItem<boolean>('local:isVisitedCommentBadgeEnabled');
    isLastBadgeEnabled = lastBadgePref !== false;
    isFirstBadgeEnabled = firstBadgePref === true;
    isCommentBadgeEnabled = commentBadgePref !== false;

    setVisitedBadgeOptions({
      showLastBadge: isLastBadgeEnabled,
      showFirstBadge: isFirstBadgeEnabled,
      showCommentBadge: isCommentBadgeEnabled,
    });
    setVisitedBadgeContext({
      comments: cachedComments,
      notes: cachedNotes,
    });

    storage.watch<boolean>('local:isVisitedLastBadgeEnabled', (newVal) => {
      isLastBadgeEnabled = newVal !== false;
      setVisitedBadgeOptions({
        showLastBadge: isLastBadgeEnabled,
        showFirstBadge: isFirstBadgeEnabled,
        showCommentBadge: isCommentBadgeEnabled,
      });
      if (isHighlightEnabled) {
        highlightVisitedListings(cachedRecords);
      }
    });

    storage.watch<boolean>('local:isVisitedFirstBadgeEnabled', (newVal) => {
      isFirstBadgeEnabled = newVal === true;
      setVisitedBadgeOptions({
        showLastBadge: isLastBadgeEnabled,
        showFirstBadge: isFirstBadgeEnabled,
        showCommentBadge: isCommentBadgeEnabled,
      });
      if (isHighlightEnabled) {
        highlightVisitedListings(cachedRecords);
      }
    });

    storage.watch<boolean>('local:isVisitedCommentBadgeEnabled', (newVal) => {
      isCommentBadgeEnabled = newVal !== false;
      setVisitedBadgeOptions({
        showLastBadge: isLastBadgeEnabled,
        showFirstBadge: isFirstBadgeEnabled,
        showCommentBadge: isCommentBadgeEnabled,
      });
      if (isHighlightEnabled) {
        highlightVisitedListings(cachedRecords);
      }
    });

    storage.watch<Record<string, ListingCommentItem>>('local:listing-comments', (newVal) => {
      cachedComments = newVal || {};
      setVisitedBadgeContext({
        comments: cachedComments,
        notes: cachedNotes,
      });
      if (isHighlightEnabled) {
        highlightVisitedListings(cachedRecords);
        const currentAdId = extractClassifiedId();
        if (currentAdId && cachedComments[currentAdId]) {
          const existing = cachedRecords[currentAdId];
          const first = getFirstTimestamp(existing);
          const last = getLastTimestamp(existing);
          const count = getVisitCount(existing);
          highlightVisitedDetail(currentAdId, first, last, count, cachedComments[currentAdId]);
        }
      }
    });

    storage.watch<Record<string, ListingNote>>('local:listing-notes', (newVal) => {
      cachedNotes = newVal || {};
      setVisitedBadgeContext({
        comments: cachedComments,
        notes: cachedNotes,
      });
      if (isHighlightEnabled) {
        highlightVisitedListings(cachedRecords);
      }
    });

    storage.watch<boolean>('local:isVisitedHighlightEnabled', (newVal) => {
      isHighlightEnabled = newVal !== false;
      if (!isHighlightEnabled) {
        document.querySelectorAll('.sm-visited-listing').forEach((el) => {
          el.classList.remove('sm-visited-listing');
        });
        document
          .querySelectorAll('.sm-visited-badges, .sm-visited-badge, .sm-detail-visited-banner')
          .forEach((el) => {
            el.remove();
          });
      } else {
        highlightVisitedListings(cachedRecords);
      }
    });

    const adId = extractClassifiedId();
    if (adId) {
      const existing = cachedRecords[adId];
      const now = Date.now();
      const existingFirst = getFirstTimestamp(existing);
      const existingLast = getLastTimestamp(existing);
      const prevCount = getVisitCount(existing);

      if ((existingFirst || cachedComments[adId]) && isHighlightEnabled) {
        highlightVisitedDetail(adId, existingFirst, existingLast, prevCount, cachedComments[adId]);
      }
      cachedRecords[adId] = {
        id: adId,
        title: extractClassifiedTitle(),
        url: window.location.href,
        visitedAt: now,
        lastVisitedAt: now,
        firstVisitedAt: existingFirst || now,
        visitCount: prevCount + 1,
      };
      await storage.setItem('local:viewed-listings', cachedRecords);
    }

    if (isHighlightEnabled) {
      highlightVisitedListings(cachedRecords);
    }

    storage.watch<StoredViewedListings>('local:viewed-listings', (newVal) => {
      cachedRecords = newVal || {};
      if (!newVal || Object.keys(newVal).length === 0) {
        document.querySelectorAll('.sm-visited-listing').forEach((el) => {
          el.classList.remove('sm-visited-listing');
        });
        document
          .querySelectorAll('.sm-visited-badges, .sm-visited-badge, .sm-detail-visited-banner')
          .forEach((el) => {
            el.remove();
          });
      } else if (isHighlightEnabled) {
        highlightVisitedListings(cachedRecords);
      }
    });
  } catch (err) {
    console.error('Sahibinden Manager: Ziyaret takibi başlatılamadı', err);
  }
};

export const applyVisitedToListings = () => {
  if (isHighlightEnabled) {
    highlightVisitedListings(cachedRecords);
  }
};
