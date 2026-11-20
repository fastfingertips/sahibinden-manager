import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  visitedAt: number;
  lastVisitedAt: number;
  firstVisitedAt: number;
  visitCount: number;
}

export interface ListingNoteItem {
  adId: string;
  text: string;
  title: string;
  url: string;
  updatedAt: number;
  createdAt?: number;
}

const parseHistory = (records: Record<string, unknown> | null): HistoryItem[] => {
  if (!records) return [];
  const items: HistoryItem[] = [];
  for (const [id, val] of Object.entries(records)) {
    if (typeof val === 'number') {
      items.push({
        id,
        title: `İlan #${id}`,
        url: `https://www.sahibinden.com/ilan/${id}/detay`,
        visitedAt: val,
        lastVisitedAt: val,
        firstVisitedAt: val,
        visitCount: 1,
      });
    } else if (val && typeof val === 'object') {
      const obj = val as {
        id?: string;
        title?: string;
        url?: string;
        visitedAt?: number;
        lastVisitedAt?: number;
        firstVisitedAt?: number;
        visitCount?: number;
      };
      const last = obj.lastVisitedAt || obj.visitedAt || Date.now();
      const first = obj.firstVisitedAt || obj.visitedAt || last;
      const count = obj.visitCount || 1;
      items.push({
        id: obj.id || id,
        title: obj.title || `İlan #${id}`,
        url: obj.url || `https://www.sahibinden.com/ilan/${id}/detay`,
        visitedAt: last,
        lastVisitedAt: last,
        firstVisitedAt: first,
        visitCount: count,
      });
    }
  }
  return items.sort((a, b) => b.lastVisitedAt - a.lastVisitedAt);
};

const parseNotes = (records: Record<string, ListingNoteItem> | null): ListingNoteItem[] => {
  if (!records) return [];
  const items: ListingNoteItem[] = [];
  for (const [adId, val] of Object.entries(records)) {
    if (val && val.text?.trim()) {
      const updatedAt = val.updatedAt || Date.now();
      const createdAt = val.createdAt || updatedAt;
      items.push({
        adId,
        text: val.text.trim(),
        title: val.title || `İlan #${adId}`,
        url: val.url || `https://www.sahibinden.com/ilan/${adId}/detay`,
        updatedAt,
        createdAt,
      });
    }
  }
  return items.sort((a, b) => b.updatedAt - a.updatedAt);
};

export const useStats = () => {
  const [isFullGridEnabled, setIsFullGridEnabled] = useState(true);
  const [isDownloaderEnabled, setIsDownloaderEnabled] = useState(true);
  const [isVisitedHighlightEnabled, setIsVisitedHighlightEnabled] = useState(true);
  const [isVisitedLastBadgeEnabled, setIsVisitedLastBadgeEnabled] = useState(true);
  const [isVisitedFirstBadgeEnabled, setIsVisitedFirstBadgeEnabled] = useState(false);
  const [isVisitedCommentBadgeEnabled, setIsVisitedCommentBadgeEnabled] = useState(true);
  const [isNotesEnabled, setIsNotesEnabled] = useState(true);
  const [isPriceHistoryEnabled, setIsPriceHistoryEnabled] = useState(true);
  const [isHideRefurbishedEnabled, setIsHideRefurbishedEnabled] = useState(false);
  const [isHideAdsEnabled, setIsHideAdsEnabled] = useState(false);
  const [isAutoExpandQnAEnabled, setIsAutoExpandQnAEnabled] = useState(true);
  const [isKeyboardNavEnabled, setIsKeyboardNavEnabled] = useState(true);
  const [isKeyboardNewTabEnabled, setIsKeyboardNewTabEnabled] = useState(false);
  const [ignoredRefurbishedCount, setIgnoredRefurbishedCount] = useState(0);
  const [filteredAdsCount, setFilteredAdsCount] = useState(0);
  const [filteredRefurbishedCount, setFilteredRefurbishedCount] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [notes, setNotes] = useState<ListingNoteItem[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const fullGrid = await storage.getItem<boolean>('local:isFullGridEnabled');
      const downloader = await storage.getItem<boolean>('local:sm-downloader-enabled');
      const visited = await storage.getItem<boolean>('local:isVisitedHighlightEnabled');
      const visitedLast = await storage.getItem<boolean>('local:isVisitedLastBadgeEnabled');
      const visitedFirst = await storage.getItem<boolean>('local:isVisitedFirstBadgeEnabled');
      const visitedComment = await storage.getItem<boolean>('local:isVisitedCommentBadgeEnabled');
      const notesOpt = await storage.getItem<boolean>('local:isNotesEnabled');
      const priceHistory = await storage.getItem<boolean>('local:isPriceHistoryEnabled');
      const hideRefurbished = await storage.getItem<boolean>('local:isHideRefurbishedEnabled');
      const hideAds = await storage.getItem<boolean>('local:isHideAdsEnabled');
      const autoExpandQnA = await storage.getItem<boolean>('local:isAutoExpandQnAEnabled');
      const keyboardNav = await storage.getItem<boolean>('local:isKeyboardNavEnabled');
      const keyboardNewTab = await storage.getItem<boolean>('local:isKeyboardNewTabEnabled');
      const ignoredRefurbished = await storage.getItem<Record<string, boolean>>(
        'local:ignored-refurbished-ids',
      );
      const viewed = await storage.getItem<Record<string, unknown>>('local:viewed-listings');
      const savedNotes =
        await storage.getItem<Record<string, ListingNoteItem>>('local:listing-notes');

      const adsCount = await storage.getItem<number>('local:filtered-ads-count');
      const yepyCount = await storage.getItem<number>('local:filtered-yepy-count');

      setIsFullGridEnabled(fullGrid !== false);
      setIsDownloaderEnabled(downloader !== false);
      setIsVisitedHighlightEnabled(visited !== false);
      setIsVisitedLastBadgeEnabled(visitedLast !== false);
      setIsVisitedFirstBadgeEnabled(visitedFirst === true);
      setIsVisitedCommentBadgeEnabled(visitedComment !== false);
      setIsNotesEnabled(notesOpt !== false);
      setIsPriceHistoryEnabled(priceHistory !== false);
      setIsHideRefurbishedEnabled(hideRefurbished === true);
      setIsHideAdsEnabled(hideAds === true);
      setIsAutoExpandQnAEnabled(autoExpandQnA !== false);
      setIsKeyboardNavEnabled(keyboardNav !== false);
      setIsKeyboardNewTabEnabled(keyboardNewTab === true);
      setIgnoredRefurbishedCount(ignoredRefurbished ? Object.keys(ignoredRefurbished).length : 0);
      setFilteredAdsCount(adsCount || 0);
      setFilteredRefurbishedCount(yepyCount || 0);
      setHistory(parseHistory(viewed));
      setNotes(parseNotes(savedNotes));
    };
    fetchSettings();

    const unwatchGrid = storage.watch<boolean>('local:isFullGridEnabled', (newVal) => {
      setIsFullGridEnabled(newVal !== false);
    });
    const unwatchDownloader = storage.watch<boolean>('local:sm-downloader-enabled', (newVal) => {
      setIsDownloaderEnabled(newVal !== false);
    });
    const unwatchVisited = storage.watch<boolean>('local:isVisitedHighlightEnabled', (newVal) => {
      setIsVisitedHighlightEnabled(newVal !== false);
    });
    const unwatchVisitedLast = storage.watch<boolean>(
      'local:isVisitedLastBadgeEnabled',
      (newVal) => {
        setIsVisitedLastBadgeEnabled(newVal !== false);
      },
    );
    const unwatchVisitedFirst = storage.watch<boolean>(
      'local:isVisitedFirstBadgeEnabled',
      (newVal) => {
        setIsVisitedFirstBadgeEnabled(newVal === true);
      },
    );
    const unwatchVisitedComment = storage.watch<boolean>(
      'local:isVisitedCommentBadgeEnabled',
      (newVal) => {
        setIsVisitedCommentBadgeEnabled(newVal !== false);
      },
    );
    const unwatchNotesOpt = storage.watch<boolean>('local:isNotesEnabled', (newVal) => {
      setIsNotesEnabled(newVal !== false);
    });
    const unwatchPriceHistory = storage.watch<boolean>('local:isPriceHistoryEnabled', (newVal) => {
      setIsPriceHistoryEnabled(newVal !== false);
    });
    const unwatchRefurbished = storage.watch<boolean>(
      'local:isHideRefurbishedEnabled',
      (newVal) => {
        setIsHideRefurbishedEnabled(newVal === true);
      },
    );
    const unwatchAds = storage.watch<boolean>('local:isHideAdsEnabled', (newVal) => {
      setIsHideAdsEnabled(newVal === true);
    });
    const unwatchAutoExpandQnA = storage.watch<boolean>(
      'local:isAutoExpandQnAEnabled',
      (newVal) => {
        setIsAutoExpandQnAEnabled(newVal !== false);
      },
    );
    const unwatchKeyboardNav = storage.watch<boolean>('local:isKeyboardNavEnabled', (newVal) => {
      setIsKeyboardNavEnabled(newVal !== false);
    });
    const unwatchKeyboardNewTab = storage.watch<boolean>(
      'local:isKeyboardNewTabEnabled',
      (newVal) => {
        setIsKeyboardNewTabEnabled(newVal === true);
      },
    );
    const unwatchIgnoredRefurbished = storage.watch<Record<string, boolean>>(
      'local:ignored-refurbished-ids',
      (newVal) => {
        setIgnoredRefurbishedCount(newVal ? Object.keys(newVal).length : 0);
      },
    );
    const unwatchViewed = storage.watch<Record<string, unknown>>(
      'local:viewed-listings',
      (newVal) => {
        setHistory(parseHistory(newVal));
      },
    );
    const unwatchNotes = storage.watch<Record<string, ListingNoteItem>>(
      'local:listing-notes',
      (newVal) => {
        setNotes(parseNotes(newVal));
      },
    );
    const unwatchAdsCount = storage.watch<number>('local:filtered-ads-count', (newVal) => {
      setFilteredAdsCount(newVal || 0);
    });
    const unwatchYepyCount = storage.watch<number>('local:filtered-yepy-count', (newVal) => {
      setFilteredRefurbishedCount(newVal || 0);
    });

    return () => {
      unwatchGrid();
      unwatchDownloader();
      unwatchVisited();
      unwatchVisitedLast();
      unwatchVisitedFirst();
      unwatchVisitedComment();
      unwatchNotesOpt();
      unwatchPriceHistory();
      unwatchRefurbished();
      unwatchAds();
      unwatchAutoExpandQnA();
      unwatchKeyboardNav();
      unwatchKeyboardNewTab();
      unwatchIgnoredRefurbished();
      unwatchViewed();
      unwatchNotes();
      unwatchAdsCount();
      unwatchYepyCount();
    };
  }, []);

  const toggleFullGrid = async () => {
    const newVal = !isFullGridEnabled;
    setIsFullGridEnabled(newVal);
    await storage.setItem('local:isFullGridEnabled', newVal);
  };

  const toggleDownloader = async () => {
    const newVal = !isDownloaderEnabled;
    setIsDownloaderEnabled(newVal);
    await storage.setItem('local:sm-downloader-enabled', newVal);
  };

  const toggleVisitedHighlight = async () => {
    const newVal = !isVisitedHighlightEnabled;
    setIsVisitedHighlightEnabled(newVal);
    await storage.setItem('local:isVisitedHighlightEnabled', newVal);
  };

  const toggleVisitedLastBadge = async () => {
    const newVal = !isVisitedLastBadgeEnabled;
    setIsVisitedLastBadgeEnabled(newVal);
    await storage.setItem('local:isVisitedLastBadgeEnabled', newVal);
  };

  const toggleVisitedFirstBadge = async () => {
    const newVal = !isVisitedFirstBadgeEnabled;
    setIsVisitedFirstBadgeEnabled(newVal);
    await storage.setItem('local:isVisitedFirstBadgeEnabled', newVal);
  };

  const toggleVisitedCommentBadge = async () => {
    const newVal = !isVisitedCommentBadgeEnabled;
    setIsVisitedCommentBadgeEnabled(newVal);
    await storage.setItem('local:isVisitedCommentBadgeEnabled', newVal);
  };

  const toggleNotes = async () => {
    const newVal = !isNotesEnabled;
    setIsNotesEnabled(newVal);
    await storage.setItem('local:isNotesEnabled', newVal);
  };

  const togglePriceHistory = async () => {
    const newVal = !isPriceHistoryEnabled;
    setIsPriceHistoryEnabled(newVal);
    await storage.setItem('local:isPriceHistoryEnabled', newVal);
  };

  const toggleHideRefurbished = async () => {
    const newVal = !isHideRefurbishedEnabled;
    setIsHideRefurbishedEnabled(newVal);
    await storage.setItem('local:isHideRefurbishedEnabled', newVal);
  };

  const toggleHideAds = async () => {
    const newVal = !isHideAdsEnabled;
    setIsHideAdsEnabled(newVal);
    await storage.setItem('local:isHideAdsEnabled', newVal);
  };

  const toggleAutoExpandQnA = async () => {
    const newVal = !isAutoExpandQnAEnabled;
    setIsAutoExpandQnAEnabled(newVal);
    await storage.setItem('local:isAutoExpandQnAEnabled', newVal);
  };

  const toggleKeyboardNav = async () => {
    const newVal = !isKeyboardNavEnabled;
    setIsKeyboardNavEnabled(newVal);
    await storage.setItem('local:isKeyboardNavEnabled', newVal);
  };

  const toggleKeyboardNewTab = async () => {
    const newVal = !isKeyboardNewTabEnabled;
    setIsKeyboardNewTabEnabled(newVal);
    await storage.setItem('local:isKeyboardNewTabEnabled', newVal);
  };

  const clearIgnoredRefurbished = async () => {
    await storage.removeItem('local:ignored-refurbished-ids');
    setIgnoredRefurbishedCount(0);
  };

  const clearFilteredAds = async () => {
    await storage.setItem('local:filtered-ads-count', 0);
    setFilteredAdsCount(0);
  };

  const clearFilteredRefurbished = async () => {
    await storage.setItem('local:filtered-yepy-count', 0);
    setFilteredRefurbishedCount(0);
  };

  const removeHistoryItem = async (id: string) => {
    const records = (await storage.getItem<Record<string, unknown>>('local:viewed-listings')) || {};
    delete records[id];
    await storage.setItem('local:viewed-listings', records);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = async () => {
    await storage.removeItem('local:viewed-listings');
    setHistory([]);
  };

  const removeNote = async (adId: string) => {
    const records =
      (await storage.getItem<Record<string, ListingNoteItem>>('local:listing-notes')) || {};
    delete records[adId];
    await storage.setItem('local:listing-notes', records);
    setNotes((prev) => prev.filter((item) => item.adId !== adId));
  };

  const clearAllNotes = async () => {
    await storage.removeItem('local:listing-notes');
    setNotes([]);
  };

  return {
    isFullGridEnabled,
    isDownloaderEnabled,
    isVisitedHighlightEnabled,
    isVisitedLastBadgeEnabled,
    isVisitedFirstBadgeEnabled,
    isVisitedCommentBadgeEnabled,
    isNotesEnabled,
    isPriceHistoryEnabled,
    isHideRefurbishedEnabled,
    isHideAdsEnabled,
    isAutoExpandQnAEnabled,
    isKeyboardNavEnabled,
    isKeyboardNewTabEnabled,
    ignoredRefurbishedCount,
    filteredAdsCount,
    filteredRefurbishedCount,
    history,
    notes,
    viewedCount: history.length,
    notesCount: notes.length,
    toggleFullGrid,
    toggleDownloader,
    toggleVisitedHighlight,
    toggleVisitedLastBadge,
    toggleVisitedFirstBadge,
    toggleVisitedCommentBadge,
    toggleNotes,
    togglePriceHistory,
    toggleHideRefurbished,
    toggleHideAds,
    toggleAutoExpandQnA,
    toggleKeyboardNav,
    toggleKeyboardNewTab,
    clearIgnoredRefurbished,
    clearFilteredAds,
    clearFilteredRefurbished,
    removeHistoryItem,
    clearHistory,
    removeNote,
    clearAllNotes,
  };
};
