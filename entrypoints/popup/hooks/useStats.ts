import { useState, useEffect } from 'react';

export const useStats = () => {
  const [isFullGridEnabled, setIsFullGridEnabled] = useState(true);
  const [isDownloaderEnabled, setIsDownloaderEnabled] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const fullGrid = await storage.getItem<boolean>('local:isFullGridEnabled');
      const downloader = await storage.getItem<boolean>('local:sm-downloader-enabled');

      setIsFullGridEnabled(fullGrid !== false);
      setIsDownloaderEnabled(downloader !== false);
    };
    fetchSettings();

    const unwatchGrid = storage.watch<boolean>('local:isFullGridEnabled', (newVal) => {
      setIsFullGridEnabled(newVal !== false);
    });
    const unwatchDownloader = storage.watch<boolean>('local:sm-downloader-enabled', (newVal) => {
      setIsDownloaderEnabled(newVal !== false);
    });

    return () => {
      unwatchGrid();
      unwatchDownloader();
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

  return {
    isFullGridEnabled,
    isDownloaderEnabled,
    toggleFullGrid,
    toggleDownloader,
  };
};
