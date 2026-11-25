export const getHighResUrl = (url: string) => {
  if (!url) return '';
  // Sahibinden'in yüksek çözünürlüklü (x16) resim formatına dönüştür
  return url.replace(/\/(thmb_|x5_|big_|x2_|x16_)?([^/]+)$/, '/x16_$2');
};

export const isEditableElement = (el: Element | null): boolean => {
  if (!el) return false;
  const tagName = el.tagName.toUpperCase();
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return false;
};

export const extractAdIdFromElement = (
  el: HTMLElement,
  titleLink: HTMLAnchorElement | null,
): string | null => {
  let id = el.getAttribute('data-id') || el.getAttribute('data-classified-id');
  if (!id && titleLink?.href) {
    const match =
      titleLink.href.match(/(\d{8,12})\/detay/) ||
      titleLink.href.match(/-(\d{8,12})(?:\/|$|\?)/) ||
      titleLink.href.match(/\/(\d{8,12})(?:\/|$|\?)/);
    if (match) id = match[1];
  }
  if (!id && el.id) {
    const match = el.id.match(/\d{8,12}/);
    if (match) id = match[0];
  }
  return id;
};

export const setupDownloadButton = (
  btn: HTMLElement,
  adId: string,
  getInfo: () => { url: string | undefined; index: number | string },
) => {
  const stop = (e: Event) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
  };

  btn.onmousedown = stop;
  btn.onmouseup = stop;
  btn.onclick = (e) => {
    e.preventDefault();
    stop(e);
    const { url, index } = getInfo();
    if (url) {
      browser.runtime.sendMessage({
        type: 'DOWNLOAD_IMAGE',
        url: getHighResUrl(url),
        filename: `${adId}_${parseInt(index.toString()) + 1}.jpg`,
      });
    }
  };
};

export const createDownloadButton = (className: string) => {
  const btn = document.createElement('div');
  btn.className = className;
  btn.title = 'Resmi İndir';
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `;
  return btn;
};
