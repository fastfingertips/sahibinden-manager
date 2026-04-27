import { setupDownloadButton, createDownloadButton } from '../utils';

export const lightboxStyles = `
  .sm-mega-dl {
    position: absolute !important;
    color: #fff !important;
    font-family: "SHBGroteskLegacy", Roboto, sans-serif !important;
    font-weight: bold !important;
    font-size: 13px !important;
    cursor: pointer !important;
    z-index: 99999 !important;
    display: flex !important;
    align-items: center !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
    transition: opacity 0.2s !important;
  }
  .sm-mega-dl:hover {
    opacity: 0.8 !important;
  }
`;

export const handleMegaPhotoLightbox = (adId: string) => {
  const megaBox = document.querySelector('#megaPhotoBox');
  if (!megaBox) return;

  // Mega Lightbox (Slideshow) ana fotoğraf indirme butonu
  if (!megaBox.querySelector('.sm-mega-dl')) {
    const mainDlBtn = document.createElement('div');
    mainDlBtn.className = 'sm-mega-dl';
    mainDlBtn.title = 'Resmi İndir';
    mainDlBtn.innerHTML = `
      <span>Resmi İndir</span>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    `;

    const updatePosition = () => {
      const isFullscreen = !!document.fullscreenElement;
      const offsets = {
        right: isFullscreen ? '255px' : '205px',
        top: '14px',
      };
      mainDlBtn.style.right = offsets.right;
      mainDlBtn.style.top = offsets.top;
    };

    updatePosition();
    document.addEventListener('fullscreenchange', updatePosition);

    setupDownloadButton(mainDlBtn, adId, () => {
      const selectedThumb = megaBox.querySelector('.megaPhotoThmbItem.selected img');
      return {
        url: selectedThumb?.getAttribute('data-source') || selectedThumb?.getAttribute('src') || '',
        index: selectedThumb?.closest('.megaPhotoThmbItem')?.getAttribute('data-img-index') || '0',
      };
    });

    megaBox.appendChild(mainDlBtn);
  }

  // Mega thumb listesi için butonlar
  megaBox.querySelectorAll('.megaPhotoThmbItem').forEach((item) => {
    if (item.querySelector('.sm-thumb-dl')) return;
    const btn = createDownloadButton('sm-thumb-dl');
    setupDownloadButton(btn, adId, () => {
      const img = item.querySelector('img');
      return {
        url: img?.getAttribute('data-source') || img?.getAttribute('src') || '',
        index: item.getAttribute('data-img-index') || '0',
      };
    });
    item.appendChild(btn);
  });
};
