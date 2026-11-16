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

export interface VisitedBadgeOptions {
  showLastBadge?: boolean;
  showFirstBadge?: boolean;
}

let currentBadgeOptions: VisitedBadgeOptions = {
  showLastBadge: true,
  showFirstBadge: false,
};

export const setVisitedBadgeOptions = (options: VisitedBadgeOptions): void => {
  currentBadgeOptions = { ...currentBadgeOptions, ...options };
};

const createOrUpdateBadge = (
  container: HTMLElement,
  firstTimestamp?: number,
  lastTimestamp?: number,
  visitCount?: number,
  options: VisitedBadgeOptions = currentBadgeOptions,
): void => {
  const parent = container.parentElement;
  if (!parent) return;

  const showLast = options.showLastBadge !== false;
  const showFirst = options.showFirstBadge === true;

  let badgesWrapper = parent.querySelector<HTMLDivElement>(':scope > .sm-visited-badges');
  if (!showLast && !showFirst) {
    if (badgesWrapper) badgesWrapper.remove();
    parent.querySelector(':scope > .sm-visited-badge')?.remove();
    return;
  }

  if (!badgesWrapper) {
    parent.querySelector(':scope > .sm-visited-badge')?.remove();
    badgesWrapper = document.createElement('div');
    badgesWrapper.className = 'sm-visited-badges';
    badgesWrapper.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      container.click();
    });
    parent.insertBefore(badgesWrapper, container);
  }

  const displayTime = lastTimestamp || firstTimestamp;
  const isMultiple = Boolean(firstTimestamp && lastTimestamp && firstTimestamp !== lastTimestamp);

  const shouldRenderLast = showLast && Boolean(displayTime);
  const shouldRenderFirst = showFirst && Boolean(firstTimestamp) && (!showLast || isMultiple);

  let lastBadge = badgesWrapper.querySelector<HTMLSpanElement>('.sm-badge-last');
  if (shouldRenderLast) {
    if (!lastBadge) {
      lastBadge = document.createElement('span');
      lastBadge.className = 'sm-visited-badge sm-badge-last';
      badgesWrapper.appendChild(lastBadge);
    }
    const timeAgo = formatTimeAgo(displayTime!);
    const labelText = `${timeAgo} bakıldı`;
    if (lastBadge.dataset.label !== labelText) {
      lastBadge.dataset.label = labelText;
      lastBadge.innerHTML = `
        <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:3px; opacity:0.85;">
          <path d="M8 3c-4 0-7 5-7 5s3 5 7 5 7-5 7-5-3-5-7-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
        <span>${labelText}</span>
      `;
    }
    const countText = visitCount && visitCount > 1 ? ` (${visitCount} kez)` : '';
    lastBadge.title = isMultiple
      ? `Son kontrol: ${formatVisitedDate(lastTimestamp!)} (${formatTimeAgo(lastTimestamp!)})\nİlk: ${formatVisitedDate(firstTimestamp!)} (${formatTimeAgo(firstTimestamp!)})${countText}`
      : `${formatTimeAgo(displayTime!)} bakıldı · ${formatVisitedDate(displayTime!)}`;
  } else if (lastBadge) {
    lastBadge.remove();
  }

  let firstBadge = badgesWrapper.querySelector<HTMLSpanElement>('.sm-badge-first');
  if (shouldRenderFirst) {
    if (!firstBadge) {
      firstBadge = document.createElement('span');
      firstBadge.className = 'sm-visited-badge sm-badge-first';
      badgesWrapper.appendChild(firstBadge);
    }
    const firstTimeAgo = formatTimeAgo(firstTimestamp!);
    const labelText = `İlk: ${firstTimeAgo}`;
    if (firstBadge.dataset.label !== labelText) {
      firstBadge.dataset.label = labelText;
      firstBadge.innerHTML = `
        <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:3px; opacity:0.85;">
          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
        </svg>
        <span>${labelText}</span>
      `;
    }
    firstBadge.title = `İlk ziyaret: ${formatVisitedDate(firstTimestamp!)} (${formatTimeAgo(firstTimestamp!)})`;
  } else if (firstBadge) {
    firstBadge.remove();
  }
};

export const highlightVisitedListings = (
  records: Record<string, unknown>,
  options?: VisitedBadgeOptions,
) => {
  if (options) {
    setVisitedBadgeOptions(options);
  }
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
          parentLi.title = `${formatTimeAgo(lastTime)} bakıldı · ${formatVisitedDate(lastTime)}\nİlk: ${formatVisitedDate(firstTime)} (${formatTimeAgo(firstTime)})${countText}`;
        } else if (firstTime || lastTime) {
          const t = (firstTime || lastTime)!;
          parentLi.title = `${formatTimeAgo(t)} bakıldı · ${formatVisitedDate(t)}`;
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
  const primaryTime = lastTimestamp || firstTimestamp;
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
        ? `(${formatTimeAgo(lastTimestamp)} bakıldı · İlk: ${formatTimeAgo(firstTimestamp)} - ${formatVisitedDate(firstTimestamp)}${visitCount && visitCount > 1 ? ` · ${visitCount} kez` : ''})`
        : `(${formatTimeAgo(primaryTime)} bakıldı · ${formatVisitedDate(primaryTime)})`;

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
