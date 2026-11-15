import { initGridMode } from './content/grid';
import { setupDownloaderState } from './content/downloader';
import {
  extractClassifiedId,
  initVisitedTracking,
  applyVisitedToListings,
} from './content/tracker';
import { initRefurbishedMode, applyRefurbishedIgnore } from './content/refurbished';
import { handleMegaPhotoLightbox, lightboxStyles } from './content/ui/lightbox';
import { handleMainPhoto, mainPhotoStyles } from './content/ui/mainPhoto';
import { handleMainPageThumbnails } from './content/ui/listingThumbs';
import { commonStyles } from './content/styles/common';
import { gridStyles } from './content/styles/grid';
import { visitedStyles } from './content/styles/visited';
import { refurbishedStyles } from './content/styles/refurbished';

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
      `;
      document.head.appendChild(style);
    };

    injectStyles();
    initGridMode();
    setupDownloaderState();
    initVisitedTracking();
    initRefurbishedMode();

    const adId = extractClassifiedId() || 'ilan';

    const observer = new MutationObserver(() => {
      handleMegaPhotoLightbox(adId);
      handleMainPageThumbnails(adId);
      handleMainPhoto(adId);
      applyVisitedToListings();
      applyRefurbishedIgnore();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // İlk çalıştırma
    handleMainPageThumbnails(adId);
    handleMainPhoto(adId);
    applyVisitedToListings();
    applyRefurbishedIgnore();
  },
});
