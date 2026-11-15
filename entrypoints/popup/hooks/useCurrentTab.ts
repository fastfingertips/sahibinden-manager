import { useState, useEffect } from 'react';

export const useCurrentTab = () => {
  const [isSahibinden, setIsSahibinden] = useState<boolean | null>(null);

  useEffect(() => {
    const checkTab = async () => {
      try {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
        if (tab?.url) {
          const url = new URL(tab.url);
          const isTarget =
            url.hostname === 'www.sahibinden.com' || url.hostname === 'sahibinden.com';
          setIsSahibinden(isTarget);
        } else {
          setIsSahibinden(false);
        }
      } catch {
        setIsSahibinden(false);
      }
    };

    checkTab();
  }, []);

  return { isSahibinden };
};
