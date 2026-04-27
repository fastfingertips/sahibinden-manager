import { initGridMode } from './content/grid';
import { setupDownloaderState } from './content/downloader';
import { handleMegaPhotoLightbox, lightboxStyles } from './content/ui/lightbox';
import { handleMainPhoto, mainPhotoStyles } from './content/ui/mainPhoto';
import { handleMainPageThumbnails } from './content/ui/listingThumbs';
import { commonStyles } from './content/styles/common';
import { gridStyles } from './content/styles/grid';

export default defineContentScript({
  matches: ['*://www.sahibinden.com/*'],
  async main() {
    console.log('Sahibinden Manager: SUI Tasarım Modu Aktif');

    const getAdId = () => {
      const match = document.title.match(/(\d+)$/);
      return match ? match[1] : 'ilan';
    };

    const injectStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        ${commonStyles}
        ${gridStyles}
        ${lightboxStyles}
        ${mainPhotoStyles}
      `;
      document.head.appendChild(style);
    };

    injectStyles();
    initGridMode();
    setupDownloaderState();

    const adId = getAdId();

    const observer = new MutationObserver(() => {
      handleMegaPhotoLightbox(adId);
      handleMainPageThumbnails(adId);
      handleMainPhoto(adId);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // İlk çalıştırma
    handleMainPageThumbnails(adId);
    handleMainPhoto(adId);
  },
});
