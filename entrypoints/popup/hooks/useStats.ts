import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  visitedAt: number;
}

export interface ListingNoteItem {
  adId: string;
  text: string;
  title: string;
  url: string;
  updatedAt: number;
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
      });
    } else if (val && typeof val === 'object' && 'visitedAt' in val) {
      const obj = val as { id?: string; title?: string; url?: string; visitedAt: number };
      items.push({
        id: obj.id || id,
        title: obj.title || `İlan #${id}`,
        url: obj.url || `https://www.sahibinden.com/ilan/${id}/detay`,
        visitedAt: obj.visitedAt,
      });
    }
  }
  return items.sort((a, b) => b.visitedAt - a.visitedAt);
};

const parseNotes = (records: Record<string, ListingNoteItem> | null): ListingNoteItem[] => {
  if (!records) return [];
  const items: ListingNoteItem[] = [];
  for (const [adId, val] of Object.entries(records)) {
    if (val && val.text?.trim()) {
      items.push({
        adId,
        text: val.text.trim(),
        title: val.title || `İlan #${adId}`,
        url: val.url || `https://www.sahibinden.com/ilan/${adId}/detay`,
        updatedAt: val.updatedAt || Date.now(),
      });
    }
  }
  return items.sort((a, b) => b.updatedAt - a.updatedAt);
};

export const useStats = () => {
  const [isFullGridEnabled, setIsFullGridEnabled] = useState(true);
  const [isDownloaderEnabled, setIsDownloaderEnabled] = useState(true);
  const [isHideRefurbishedEnabled, setIsHideRefurbishedEnabled] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [notes, setNotes] = useState<ListingNoteItem[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const fullGrid = await storage.getItem<boolean>('local:isFullGridEnabled');
      const downloader = await storage.getItem<boolean>('local:sm-downloader-enabled');
      const hideRefurbished = await storage.getItem<boolean>('local:isHideRefurbishedEnabled');
      const viewed = await storage.getItem<Record<string, unknown>>('local:viewed-listings');
      const savedNotes =
        await storage.getItem<Record<string, ListingNoteItem>>('local:listing-notes');

      setIsFullGridEnabled(fullGrid !== false);
      setIsDownloaderEnabled(downloader !== false);
      setIsHideRefurbishedEnabled(hideRefurbished === true);
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
    const unwatchRefurbished = storage.watch<boolean>(
      'local:isHideRefurbishedEnabled',
      (newVal) => {
        setIsHideRefurbishedEnabled(newVal === true);
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

    return () => {
      unwatchGrid();
      unwatchDownloader();
      unwatchRefurbished();
      unwatchViewed();
      unwatchNotes();
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

  const toggleHideRefurbished = async () => {
    const newVal = !isHideRefurbishedEnabled;
    setIsHideRefurbishedEnabled(newVal);
    await storage.setItem('local:isHideRefurbishedEnabled', newVal);
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
    isHideRefurbishedEnabled,
    history,
    notes,
    viewedCount: history.length,
    notesCount: notes.length,
    toggleFullGrid,
    toggleDownloader,
    toggleHideRefurbished,
    removeHistoryItem,
    clearHistory,
    removeNote,
    clearAllNotes,
  };
};
