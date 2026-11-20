import { initGridMode } from './content/grid';
import { setupDownloaderState } from './content/downloader';
import {
  extractClassifiedId,
  extractClassifiedTitle,
  initVisitedTracking,
  applyVisitedToListings,
} from './content/tracker';
import { initRefurbishedMode, applyRefurbishedIgnore } from './content/refurbished';
import { initNotesMode, applyNotesToListings } from './content/ui/notes';
import { handlePriceHistoryAnalytics, initPriceHistory } from './content/priceHistory';
import { initAdsMode, trackFilteredAds } from './content/ads';
import { handleMegaPhotoLightbox, lightboxStyles } from './content/ui/lightbox';
import { handleMainPhoto, mainPhotoStyles } from './content/ui/mainPhoto';
import { handleMainPageThumbnails } from './content/ui/listingThumbs';
import { handleDescriptionCopyButton } from './content/ui/descriptionCopy';
import { handleClassifiedDataCopyButton } from './content/ui/classifiedDataCopy';
import {
  initQnAMode,
  handleAutoExpandQnA,
  handleQnACopyButton,
  handleDetectUserComments,
} from './content/cqa';
import { initKeyboardNavigation } from './content/keyboardNav';
import { commonStyles } from './content/styles/common';
import { gridStyles } from './content/styles/grid';
import { visitedStyles } from './content/styles/visited';
import { refurbishedStyles } from './content/styles/refurbished';
import { notesStyles } from './content/styles/notes';
import { priceHistoryStyles } from './content/styles/priceHistory';
import { adsStyles } from './content/styles/ads';
import { descriptionCopyStyles } from './content/styles/descriptionCopy';
import { keyboardNavStyles } from './content/styles/keyboardNav';

export default defineContentScript({
  matches: ['*://*.sahibinden.com/*'],
  async main() {
    console.log('Sahibinden Manager: Aktif');

    const injectStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        ${commonStyles}
        ${gridStyles}
        ${lightboxStyles}
        ${mainPhotoStyles}
        ${visitedStyles}
        ${refurbishedStyles}
        ${notesStyles}
        ${priceHistoryStyles}
        ${adsStyles}
        ${descriptionCopyStyles}
        ${keyboardNavStyles}
      `;
      document.head.appendChild(style);
    };

    injectStyles();
    initGridMode();
    setupDownloaderState();
    initVisitedTracking();
    initRefurbishedMode();
    initPriceHistory();
    initAdsMode();
    initKeyboardNavigation();

    const adId = extractClassifiedId();
    const title = extractClassifiedTitle();
    initNotesMode(adId, title, window.location.href);
    initQnAMode(adId, title, window.location.href);

    const activeAdId = adId || 'ilan';

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const runTasks = () => {
      handleMegaPhotoLightbox(activeAdId);
      handleMainPageThumbnails(activeAdId);
      handleMainPhoto(activeAdId);
      applyVisitedToListings();
      applyRefurbishedIgnore();
      applyNotesToListings();
      handlePriceHistoryAnalytics();
      handleDescriptionCopyButton();
      handleClassifiedDataCopyButton();
      handleAutoExpandQnA();
      handleDetectUserComments();
      handleQnACopyButton();
      trackFilteredAds();
    };

    const isOurOwnElement = (node: Node | null): boolean => {
      if (!node) return false;
      const el = node instanceof HTMLElement ? node : node.parentElement;
      if (!el) return false;
      return (
        Boolean(el.closest('[class*="sm-"]')) ||
        (typeof el.className === 'string' && el.className.includes('sm-'))
      );
    };

    const observer = new MutationObserver((mutations) => {
      // Sadece eklentinin kendi oluşturduğu öğelerdeki mutasyonları yok say
      const isInternal = mutations.every((m) => isOurOwnElement(m.target));
      if (isInternal) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        runTasks();
      }, 75);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // İlk çalıştırma
    runTasks();
  },
});
