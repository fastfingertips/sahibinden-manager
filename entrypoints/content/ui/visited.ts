import { formatDate as formatVisitedDate, formatTimeAgo } from '@/utils/date';

export { formatVisitedDate, formatTimeAgo };

export const extractLastTimestamp = (val: unknown): number | undefined => {
  if (typeof val === 'number') return val;
  if (val && typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    if (typeof obj.lastVisitedAt === 'number') return obj.lastVisitedAt;
    if (typeof obj.visitedAt === 'number') return obj.visitedAt;
  }
  return undefined;
};

export const extractFirstTimestamp = (val: unknown): number | undefined => {
  if (typeof val === 'number') return val;
  if (val && typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    if (typeof obj.firstVisitedAt === 'number') return obj.firstVisitedAt;
    if (typeof obj.visitedAt === 'number') return obj.visitedAt;
  }
  return undefined;
};

export const extractVisitCount = (val: unknown): number => {
  if (typeof val === 'number') return 1;
  if (val && typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    if (typeof obj.visitCount === 'number') return obj.visitCount;
  }
  return 1;
};

const createOrUpdateBadge = (
  container: HTMLElement,
  firstTimestamp?: number,
  lastTimestamp?: number,
  visitCount?: number,
): void => {
  let badge = container.querySelector<HTMLSpanElement>('.sm-visited-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'sm-visited-badge';
    container.prepend(badge);
  }

  const firstTime = firstTimestamp || lastTimestamp;
  if (firstTime) {
    const timeAgo = formatTimeAgo(firstTime);
    const labelText = `İlk: ${timeAgo}`;
    if (badge.dataset.label !== labelText) {
      badge.dataset.label = labelText;
      badge.innerHTML = `
        <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:3px; opacity:0.85;">
          <path d="M8 3c-4 0-7 5-7 5s3 5 7 5 7-5 7-5-3-5-7-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
        <span>${labelText}</span>
      `;
    }

    if (firstTimestamp && lastTimestamp && firstTimestamp !== lastTimestamp) {
      const countText = visitCount && visitCount > 1 ? ` (${visitCount} kez)` : '';
      badge.title = `İlk ziyaret: ${formatVisitedDate(firstTimestamp)} (${formatTimeAgo(firstTimestamp)})\nSon ziyaret: ${formatVisitedDate(lastTimestamp)} (${formatTimeAgo(lastTimestamp)})${countText}`;
    } else {
      badge.title = `İlk ziyaret: ${formatVisitedDate(firstTime)} (${formatTimeAgo(firstTime)})`;
    }
  } else if (badge.dataset.label !== 'Ziyaret Edildi') {
    badge.dataset.label = 'Ziyaret Edildi';
    badge.innerHTML = `
      <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:3px; opacity:0.85;">
        <path d="M8 3c-4 0-7 5-7 5s3 5 7 5 7-5 7-5-3-5-7-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
      </svg>
      <span>Ziyaret Edildi</span>
    `;
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
        const firstTime = extractFirstTimestamp(records[id]);
        const lastTime = extractLastTimestamp(records[id]);
        const count = extractVisitCount(records[id]);
        createOrUpdateBadge(titleLink, firstTime, lastTime, count);
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
        const firstTime = extractFirstTimestamp(records[id]);
        const lastTime = extractLastTimestamp(records[id]);
        const count = extractVisitCount(records[id]);
        createOrUpdateBadge(titleLink, firstTime, lastTime, count);
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
        const firstTime = extractFirstTimestamp(records[id]);
        const lastTime = extractLastTimestamp(records[id]);
        const count = extractVisitCount(records[id]);
        if (firstTime && lastTime && firstTime !== lastTime) {
          const countText = count > 1 ? ` (${count} kez)` : '';
          parentLi.title = `İlk: ${formatVisitedDate(firstTime)} (${formatTimeAgo(firstTime)})\nSon: ${formatVisitedDate(lastTime)} (${formatTimeAgo(lastTime)})${countText}`;
        } else if (firstTime || lastTime) {
          const t = (firstTime || lastTime)!;
          parentLi.title = `İlk ziyaret: ${formatVisitedDate(t)} (${formatTimeAgo(t)})`;
        }
      }
    }
  });
};

export const highlightVisitedDetail = (
  adId: string,
  firstTimestamp?: number,
  lastTimestamp?: number,
  visitCount?: number,
) => {
  const primaryTime = firstTimestamp || lastTimestamp;
  if (!primaryTime) return;
  if (document.querySelector('.sm-detail-visited-banner')) return;

  const titleContainer =
    document.querySelector('.classifiedDetailTitle') ||
    document.querySelector('.classifiedDetailContent');

  if (titleContainer) {
    const banner = document.createElement('div');
    banner.className = 'sm-detail-visited-banner';

    const dateInfo =
      firstTimestamp && lastTimestamp && firstTimestamp !== lastTimestamp
        ? `(İlk ziyaret: ${formatTimeAgo(firstTimestamp)} - ${formatVisitedDate(firstTimestamp)} · Son: ${formatTimeAgo(lastTimestamp)} - ${formatVisitedDate(lastTimestamp)}${visitCount && visitCount > 1 ? ` · Toplam ${visitCount} kez incelendi` : ''})`
        : `(İlk ziyaret: ${formatTimeAgo(primaryTime)} · ${formatVisitedDate(primaryTime)})`;

    banner.innerHTML = `
      <div>
        <span class="sm-badge">Ziyaret Edildi</span>
        <span>Bu ilanı daha önce incelediniz</span>
        <span class="sm-date">${dateInfo}</span>
      </div>
    `;
    titleContainer.prepend(banner);
  }
};
