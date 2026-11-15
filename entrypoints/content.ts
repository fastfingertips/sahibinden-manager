import { initGridMode } from './content/grid';
import { setupDownloaderState } from './content/downloader';
import {
  extractClassifiedId,
  initVisitedTracking,
  applyVisitedToListings,
} from './content/tracker';
import { handleMegaPhotoLightbox, lightboxStyles } from './content/ui/lightbox';
import { handleMainPhoto, mainPhotoStyles } from './content/ui/mainPhoto';
import { handleMainPageThumbnails } from './content/ui/listingThumbs';
import { commonStyles } from './content/styles/common';
import { gridStyles } from './content/styles/grid';
import { visitedStyles } from './content/styles/visited';

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
      `;
      document.head.appendChild(style);
    };

    injectStyles();
    initGridMode();
    setupDownloaderState();
    initVisitedTracking();

    const adId = extractClassifiedId() || 'ilan';

    const observer = new MutationObserver(() => {
      handleMegaPhotoLightbox(adId);
      handleMainPageThumbnails(adId);
      handleMainPhoto(adId);
      applyVisitedToListings();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // İlk çalıştırma
    handleMainPageThumbnails(adId);
    handleMainPhoto(adId);
    applyVisitedToListings();
  },
});
