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
import { handleMegaPhotoLightbox, lightboxStyles } from './content/ui/lightbox';
import { handleMainPhoto, mainPhotoStyles } from './content/ui/mainPhoto';
import { handleMainPageThumbnails } from './content/ui/listingThumbs';
import { commonStyles } from './content/styles/common';
import { gridStyles } from './content/styles/grid';
import { visitedStyles } from './content/styles/visited';
import { refurbishedStyles } from './content/styles/refurbished';
import { notesStyles } from './content/styles/notes';

export default defineContentScript({
  matches: ['*://www.sahibinden.com/*'],
  async main() {
    console.log('Sahibinden Manager: SUI Tasarım Modu Aktif');

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
      `;
      document.head.appendChild(style);
    };

    injectStyles();
    initGridMode();
    setupDownloaderState();
    initVisitedTracking();
    initRefurbishedMode();

    const adId = extractClassifiedId();
    const title = extractClassifiedTitle();
    initNotesMode(adId, title, window.location.href);

    const activeAdId = adId || 'ilan';

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const runTasks = () => {
      handleMegaPhotoLightbox(activeAdId);
      handleMainPageThumbnails(activeAdId);
      handleMainPhoto(activeAdId);
      applyVisitedToListings();
      applyRefurbishedIgnore();
      applyNotesToListings();
    };

    const observer = new MutationObserver((mutations) => {
      // Eklentinin kendi oluşturduğu öğelerdeki mutasyonları yok say
      const isInternal = mutations.every((m) => {
        const target = m.target as HTMLElement;
        return (
          target.closest?.('[class*="sm-"]') !== null ||
          target.classList?.value?.includes('sm-') === true
        );
      });
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
