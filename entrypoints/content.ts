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
import { initUnvisitedOpener, handleUnvisitedOpenerButton } from './content/unvisitedOpener';
import { commonStyles } from './content/styles/common';
import { gridStyles } from './content/styles/grid';
import { visitedStyles } from './content/styles/visited';
import { refurbishedStyles } from './content/styles/refurbished';
import { notesStyles } from './content/styles/notes';
import { priceHistoryStyles } from './content/styles/priceHistory';
import { adsStyles } from './content/styles/ads';
import { descriptionCopyStyles } from './content/styles/descriptionCopy';
import { keyboardNavStyles } from './content/styles/keyboardNav';
import { unvisitedOpenerStyles } from './content/styles/unvisitedOpener';

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
        ${unvisitedOpenerStyles}
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
    initUnvisitedOpener();

    const adId = extractClassifiedId();
    const title = extractClassifiedTitle();
    initNotesMode(adId, title, window.location.href);
    initQnAMode(adId, title, window.location.href);

    const getActiveAdId = () => extractClassifiedId() || 'ilan';

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const runSafe = (fn: () => void) => {
      try {
        fn();
      } catch (err) {
        console.error('Sahibinden Manager görev hatası:', err);
      }
    };

    const runTasks = () => {
      const activeAdId = getActiveAdId();
      runSafe(() => handleMegaPhotoLightbox(activeAdId));
      runSafe(() => handleMainPageThumbnails(activeAdId));
      runSafe(() => handleMainPhoto(activeAdId));
      runSafe(() => applyVisitedToListings());
      runSafe(() => applyRefurbishedIgnore());
      runSafe(() => applyNotesToListings());
      runSafe(() => handlePriceHistoryAnalytics());
      runSafe(() => handleDescriptionCopyButton());
      runSafe(() => handleClassifiedDataCopyButton());
      runSafe(() => handleAutoExpandQnA());
      runSafe(() => handleDetectUserComments());
      runSafe(() => handleQnACopyButton());
      runSafe(() => handleUnvisitedOpenerButton());
      runSafe(() => trackFilteredAds());
    };

    const isOurOwnElement = (node: Node | null): boolean => {
      if (!node) return false;
      const el = node instanceof HTMLElement ? node : node.parentElement;
      if (!el) return false;

      // Tablo, liste ve sayfa iskeletine ait yerel öğeler asla dahili sayılmaz
      const tag = el.tagName;
      if (
        tag === 'TR' ||
        tag === 'TD' ||
        tag === 'TH' ||
        tag === 'TBODY' ||
        tag === 'TABLE' ||
        tag === 'UL' ||
        tag === 'LI' ||
        tag === 'BODY' ||
        tag === 'HTML'
      ) {
        return false;
      }

      // Sadece eklentinin oluşturup DOM'a eklediği özel arayüz widget'ları
      return Boolean(
        el.closest(
          '.sm-visited-badges, .sm-visited-badge, .sm-detail-visited-banner, .sm-unvisited-opener-container, .sm-toast-container, .sm-copy-btn, .sm-note-dialog, .sm-notes-modal, .sm-lightbox, .sm-page-thumb-dl, .sm-main-photo-dl',
        ),
      );
    };

    const observer = new MutationObserver((mutations) => {
      // Sadece eklentinin kendi oluşturduğu UI öğelerindeki mutasyonları yok say
      const isInternal = mutations.every((m) => isOurOwnElement(m.target));
      if (isInternal) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        runTasks();
      }, 75);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Sayfa içi SPA / AJAX / PJAX gezinmelerini (sayfalama, filtreleme, sıralama) yakala
    const wrapHistoryMethod = (type: 'pushState' | 'replaceState') => {
      const orig = history[type];
      return function (this: History, ...args: Parameters<History['pushState']>) {
        const result = orig.apply(this, args);
        window.dispatchEvent(new Event('sm:locationchange'));
        return result;
      };
    };

    history.pushState = wrapHistoryMethod('pushState');
    history.replaceState = wrapHistoryMethod('replaceState');

    const handleNavigationChange = () => {
      runTasks();
      setTimeout(runTasks, 250);
      setTimeout(runTasks, 800);
    };

    window.addEventListener('popstate', handleNavigationChange);
    window.addEventListener('sm:locationchange', handleNavigationChange);
    window.addEventListener('pageshow', handleNavigationChange);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        runTasks();
      }
    });

    // Sayfa yüklenme gecikmelerini ve dinamik listeleri kaçırmamak için periyodik kontrol
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        runTasks();
      }
    }, 1500);

    // İlk çalıştırma
    runTasks();
  },
});
