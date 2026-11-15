import { useState, useEffect } from 'react';

export const useStats = () => {
  const [isFullGridEnabled, setIsFullGridEnabled] = useState(true);
  const [isDownloaderEnabled, setIsDownloaderEnabled] = useState(true);
  const [viewedCount, setViewedCount] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      const fullGrid = await storage.getItem<boolean>('local:isFullGridEnabled');
      const downloader = await storage.getItem<boolean>('local:sm-downloader-enabled');
      const viewed = await storage.getItem<Record<string, number>>('local:viewed-listings');

      setIsFullGridEnabled(fullGrid !== false);
      setIsDownloaderEnabled(downloader !== false);
      setViewedCount(viewed ? Object.keys(viewed).length : 0);
    };
    fetchSettings();

    const unwatchGrid = storage.watch<boolean>('local:isFullGridEnabled', (newVal) => {
      setIsFullGridEnabled(newVal !== false);
    });
    const unwatchDownloader = storage.watch<boolean>('local:sm-downloader-enabled', (newVal) => {
      setIsDownloaderEnabled(newVal !== false);
    });
    const unwatchViewed = storage.watch<Record<string, number>>(
      'local:viewed-listings',
      (newVal) => {
        setViewedCount(newVal ? Object.keys(newVal).length : 0);
      },
    );

    return () => {
      unwatchGrid();
      unwatchDownloader();
      unwatchViewed();
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

  const clearHistory = async () => {
    await storage.removeItem('local:viewed-listings');
    setViewedCount(0);
  };

  return {
    isFullGridEnabled,
    isDownloaderEnabled,
    viewedCount,
    toggleFullGrid,
    toggleDownloader,
    clearHistory,
  };
};
