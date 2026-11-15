export const formatVisitedDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const extractTimestamp = (val: unknown): number | undefined => {
  if (typeof val === 'number') return val;
  if (val && typeof val === 'object' && 'visitedAt' in val) {
    const num = (val as { visitedAt: unknown }).visitedAt;
    if (typeof num === 'number') return num;
  }
  return undefined;
};

export const formatTimeAgo = (timestamp: number): string => {
  const diff = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Az önce';
  if (minutes < 60) return `${minutes} dk önce`;
  if (hours < 24) return `${hours} saat önce`;
  if (days === 1) return 'Dün';
  if (days < 30) return `${days} gün önce`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ay önce`;
  const years = Math.floor(days / 365);
  return `${years} yıl önce`;
};

const createOrUpdateBadge = (container: HTMLElement, timestamp?: number): void => {
  let badge = container.querySelector<HTMLSpanElement>('.sm-visited-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'sm-visited-badge';
    container.prepend(badge);
  }

  if (timestamp) {
    const timeAgo = formatTimeAgo(timestamp);
    badge.textContent = `Ziyaret: ${timeAgo}`;
    badge.title = `Son ziyaret: ${formatVisitedDate(timestamp)}`;
  } else {
    badge.textContent = 'Ziyaret Edildi';
  }
};

export const highlightVisitedListings = (records: Record<string, unknown>) => {
  if (!records || Object.keys(records).length === 0) return;

  // 1. Liste Görünümü (#searchResultsTable tr.searchResultsItem[data-id])
  const listRows = document.querySelectorAll<HTMLTableRowElement>(
    '#searchResultsTable tr.searchResultsItem[data-id]',
  );
  listRows.forEach((row) => {
    const id = row.getAttribute('data-id');
    if (id && records[id]) {
      if (!row.classList.contains('sm-visited-listing')) {
        row.classList.add('sm-visited-listing');
      }
      const titleLink = row.querySelector<HTMLAnchorElement>(
        'td.searchResultsTitleValue a.classifiedTitle',
      );
      if (titleLink) {
        const timestamp = extractTimestamp(records[id]);
        createOrUpdateBadge(titleLink, timestamp);
      }
    }
  });

  // 2. Galeri Görünümü (#searchResultsGallery td.searchResultsGalleryItem[data-id])
  const galleryCells = document.querySelectorAll<HTMLTableCellElement>(
    '#searchResultsGallery td.searchResultsGalleryItem[data-id]',
  );
  galleryCells.forEach((cell) => {
    const id = cell.getAttribute('data-id');
    if (id && records[id]) {
      if (!cell.classList.contains('sm-visited-listing')) {
        cell.classList.add('sm-visited-listing');
      }
      const titleLink = cell.querySelector<HTMLAnchorElement>('a.classifiedTitle');
      if (titleLink) {
        const timestamp = extractTimestamp(records[id]);
        createOrUpdateBadge(titleLink, timestamp);
      }
    }
  });

  // 3. Vitrin Listeleri (ul.vitrin-list li a[href*="/ilan/"])
  const showcaseLinks = document.querySelectorAll<HTMLAnchorElement>(
    'ul.vitrin-list li a[href*="/ilan/"], .showcase-list li a[href*="/ilan/"]',
  );
  showcaseLinks.forEach((link) => {
    const match = link.href.match(/(\d+)\/detay/) || link.href.match(/-(\d+)/);
    const id = match ? match[1] : null;
    if (id && records[id]) {
      const parentLi = link.closest('li');
      if (parentLi && !parentLi.classList.contains('sm-visited-listing')) {
        parentLi.classList.add('sm-visited-listing');
        const timestamp = extractTimestamp(records[id]);
        if (timestamp) {
          parentLi.title = `Son ziyaret: ${formatVisitedDate(timestamp)} (${formatTimeAgo(timestamp)})`;
        }
      }
    }
  });
};

export const highlightVisitedDetail = (adId: string, timestamp?: number) => {
  if (!timestamp) return;
  if (document.querySelector('.sm-detail-visited-banner')) return;

  const titleContainer =
    document.querySelector('.classifiedDetailTitle') ||
    document.querySelector('.classifiedDetailContent');

  if (titleContainer) {
    const banner = document.createElement('div');
    banner.className = 'sm-detail-visited-banner';
    const timeAgo = formatTimeAgo(timestamp);
    banner.innerHTML = `
      <div>
        <span class="sm-badge">Ziyaret Edildi</span>
        <span>Bu ilanı daha önce incelediniz</span>
        <span class="sm-date">(Son ziyaret: ${timeAgo} · ${formatVisitedDate(timestamp)})</span>
      </div>
    `;
    titleContainer.prepend(banner);
  }
};
