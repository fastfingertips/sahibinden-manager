import { setupDownloadButton, createDownloadButton } from '../utils';

export const mainPhotoStyles = `
  .sm-main-photo-dl {
    right: 12px !important;
    bottom: 12px !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 4px !important;
  }
  .sm-main-photo-dl svg {
    width: 20px !important;
    height: 20px !important;
  }
`;

export const handleMainPhoto = (adId: string) => {
  const mainPhotoLabel = document.querySelector('.classifiedDetailMainPhoto label');
  if (!mainPhotoLabel || mainPhotoLabel.querySelector('.sm-main-photo-dl')) return;

  const dlBtn = createDownloadButton('sm-main-photo-dl');
  setupDownloadButton(dlBtn, adId, () => {
    const mainImg = mainPhotoLabel.querySelector('img');
    const selectedThumb = document.querySelector(
      '.classifiedDetailThumbList li label.selected img',
    );
    return {
      url: selectedThumb?.getAttribute('data-source') || mainImg?.getAttribute('src') || '',
      index: selectedThumb?.closest('li')?.getAttribute('data-index') || '0',
    };
  });

  mainPhotoLabel.appendChild(dlBtn);
};
