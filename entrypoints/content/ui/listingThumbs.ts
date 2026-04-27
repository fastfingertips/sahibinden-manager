import { setupDownloadButton, createDownloadButton } from '../utils';

export const handleMainPageThumbnails = (adId: string) => {
  const thumbs = document.querySelectorAll('.classifiedDetailThumbList li');
  thumbs.forEach((li) => {
    if (li.querySelector('.sm-page-thumb-dl')) return;

    const dlBtn = createDownloadButton('sm-page-thumb-dl');
    setupDownloadButton(dlBtn, adId, () => {
      const img = li.querySelector('img');
      return {
        url: img?.getAttribute('data-source') || img?.getAttribute('src') || '',
        index: li.getAttribute('data-index') || '0',
      };
    });

    li.appendChild(dlBtn);
  });
};
