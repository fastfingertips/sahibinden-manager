import { formatDate as formatVisitedDate, formatTimeAgo } from '@/utils/date';
import type { ListingCommentItem } from '../cqa';
import { extractAdIdFromElement } from '../utils';

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
  showCommentBadge?: boolean;
}

export interface ListingBadgeContext {
  comments?: Record<string, { id?: string; text: string; createdAt: number }>;
  notes?: Record<string, { text: string; updatedAt: number; createdAt?: number }>;
  eliminated?: Record<string, { reason: string; createdAt: number; updatedAt: number }>;
}

let currentBadgeOptions: VisitedBadgeOptions = {
  showLastBadge: true,
  showFirstBadge: false,
  showCommentBadge: true,
};

let currentBadgeContext: ListingBadgeContext = {};

export const setVisitedBadgeOptions = (options: VisitedBadgeOptions): void => {
  currentBadgeOptions = { ...currentBadgeOptions, ...options };
};

export const setVisitedBadgeContext = (context: ListingBadgeContext): void => {
  currentBadgeContext = {
    comments: context.comments || currentBadgeContext.comments || {},
    notes: context.notes || currentBadgeContext.notes || {},
    eliminated: context.eliminated || currentBadgeContext.eliminated || {},
  };
};

const createOrUpdateBadge = (
  container: HTMLElement,
  firstTimestamp?: number,
  lastTimestamp?: number,
  visitCount?: number,
  commentItem?: { text: string; createdAt: number },
  noteItem?: { text: string; updatedAt: number; createdAt?: number },
  eliminatedItem?: { reason: string; createdAt: number; updatedAt: number },
  options: VisitedBadgeOptions = currentBadgeOptions,
): void => {
  const parent = container.parentElement;
  if (!parent) return;

  const showLast = options.showLastBadge !== false;
  const showFirst = options.showFirstBadge === true;
  const showComment = options.showCommentBadge !== false;

  const displayTime = lastTimestamp || firstTimestamp;
  const isMultiple = Boolean(firstTimestamp && lastTimestamp && firstTimestamp !== lastTimestamp);

  const shouldRenderLast = showLast && Boolean(displayTime);
  const shouldRenderFirst = showFirst && Boolean(firstTimestamp) && (!showLast || isMultiple);
  const shouldRenderComment = showComment && Boolean(commentItem?.text?.trim());
  const shouldRenderNote = Boolean(noteItem?.text?.trim());
  const shouldRenderEliminated = Boolean(eliminatedItem);

  let badgesWrapper = parent.querySelector<HTMLDivElement>(':scope > .sm-visited-badges');
  if (
    !shouldRenderLast &&
    !shouldRenderFirst &&
    !shouldRenderComment &&
    !shouldRenderNote &&
    !shouldRenderEliminated
  ) {
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

  // 1. Son Kontrol Rozeti
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

  // 2. İlk Kontrol Rozeti
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

  // 3. Soru Soruldu / Yorum Rozeti
  let commentBadge = badgesWrapper.querySelector<HTMLSpanElement>('.sm-badge-comment');
  if (shouldRenderComment && commentItem) {
    if (!commentBadge) {
      commentBadge = document.createElement('span');
      commentBadge.className = 'sm-visited-badge sm-badge-comment';
      badgesWrapper.appendChild(commentBadge);
    }
    const labelText = 'Soru Soruldu';
    if (commentBadge.dataset.label !== labelText) {
      commentBadge.dataset.label = labelText;
      commentBadge.innerHTML = `
        <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:3px; opacity:0.85;">
          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2a1 1 0 0 0-1-1H2z"/>
        </svg>
        <span>${labelText}</span>
      `;
    }
    const preview =
      commentItem.text.length > 80 ? `${commentItem.text.slice(0, 80)}...` : commentItem.text;
    commentBadge.title = `Soru Soruldu: "${preview}" (${formatVisitedDate(commentItem.createdAt)})`;
  } else if (commentBadge) {
    commentBadge.remove();
  }

  // 4. Not Var Rozeti
  let noteBadge = badgesWrapper.querySelector<HTMLSpanElement>('.sm-badge-note');
  if (shouldRenderNote && noteItem) {
    if (!noteBadge) {
      noteBadge = document.createElement('span');
      noteBadge.className = 'sm-visited-badge sm-badge-note';
      badgesWrapper.appendChild(noteBadge);
    }
    const labelText = 'Not Var';
    if (noteBadge.dataset.label !== labelText) {
      noteBadge.dataset.label = labelText;
      noteBadge.innerHTML = `
        <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:3px; opacity:0.85;">
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
        </svg>
        <span>${labelText}</span>
      `;
    }
    const preview = noteItem.text.length > 80 ? `${noteItem.text.slice(0, 80)}...` : noteItem.text;
    noteBadge.title = `Özel Not: "${preview}"\nGüncelleme: ${formatVisitedDate(noteItem.updatedAt)}`;
  } else if (noteBadge) {
    noteBadge.remove();
  }

  // 5. Elendi Rozeti
  let eliminatedBadge = badgesWrapper.querySelector<HTMLSpanElement>('.sm-badge-eliminated');
  if (shouldRenderEliminated && eliminatedItem) {
    if (!eliminatedBadge) {
      eliminatedBadge = document.createElement('span');
      eliminatedBadge.className = 'sm-visited-badge sm-badge-eliminated';
      badgesWrapper.appendChild(eliminatedBadge);
    }
    const labelText = 'Elendi';
    if (eliminatedBadge.dataset.label !== labelText) {
      eliminatedBadge.dataset.label = labelText;
      eliminatedBadge.innerHTML = `
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:3px; opacity:0.9;">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
        <span>${labelText}</span>
      `;
    }
    const reasonText = eliminatedItem.reason?.trim() || 'Eleme nedeni belirtilmedi';
    const preview = reasonText.length > 80 ? `${reasonText.slice(0, 80)}...` : reasonText;
    eliminatedBadge.title = `Eleme Nedeni: "${preview}" (${formatVisitedDate(eliminatedItem.createdAt || eliminatedItem.updatedAt)})`;
  } else if (eliminatedBadge) {
    eliminatedBadge.remove();
  }
};

export const highlightVisitedListings = (
  records: Record<string, unknown>,
  options?: VisitedBadgeOptions,
  context?: ListingBadgeContext,
) => {
  if (options) {
    setVisitedBadgeOptions(options);
  }
  if (context) {
    setVisitedBadgeContext(context);
  }
  if (
    !records &&
    !currentBadgeContext.comments &&
    !currentBadgeContext.notes &&
    !currentBadgeContext.eliminated
  ) {
    return;
  }

  const comments = currentBadgeContext.comments || {};
  const notes = currentBadgeContext.notes || {};
  const eliminated = currentBadgeContext.eliminated || {};

  // Resim hücresine yanlışlıkla eklenmiş eski rozet konteynerlerini temizle
  document
    .querySelectorAll(
      'td.searchResultsLargeThumbnail .sm-visited-badges, td.searchResultsLargeThumbnailValue .sm-visited-badges',
    )
    .forEach((el) => el.remove());

  const applyListingHighlight = (el: HTMLElement, titleLink: HTMLAnchorElement | null) => {
    const id = extractAdIdFromElement(el, titleLink);
    if (!id) return;

    const isVisited = records && records[id];
    const commentItem = comments[id];
    const noteItem = notes[id];
    const eliminatedItem = eliminated[id];

    if (isVisited || commentItem || noteItem || eliminatedItem) {
      if (isVisited && !el.classList.contains('sm-visited-listing')) {
        el.classList.add('sm-visited-listing');
      }
      if (eliminatedItem && !el.classList.contains('sm-eliminated-listing')) {
        el.classList.add('sm-eliminated-listing');
      } else if (!eliminatedItem && el.classList.contains('sm-eliminated-listing')) {
        el.classList.remove('sm-eliminated-listing');
      }
      if (titleLink) {
        const firstTime = isVisited ? extractFirstTimestamp(records[id]) : undefined;
        const lastTime = isVisited ? extractLastTimestamp(records[id]) : undefined;
        const count = isVisited ? extractVisitCount(records[id]) : 0;
        createOrUpdateBadge(
          titleLink,
          firstTime,
          lastTime,
          count,
          commentItem,
          noteItem,
          eliminatedItem,
          currentBadgeOptions,
        );
      }
    }
  };

  // 1. Liste Görünümü (#searchResultsTable tr.searchResultsItem)
  const listRows = document.querySelectorAll<HTMLTableRowElement>(
    '#searchResultsTable tr.searchResultsItem, table.searchResultsTable tr.searchResultsItem',
  );
  listRows.forEach((row) => {
    if (row.classList.contains('nativeAd') || row.classList.contains('classicNativeAd')) return;
    const titleLink =
      row.querySelector<HTMLAnchorElement>('td.searchResultsTitleValue a.classifiedTitle') ||
      row.querySelector<HTMLAnchorElement>(
        'td.searchResultsTitleValue a.refurbishment-classified-url',
      ) ||
      row.querySelector<HTMLAnchorElement>('td.searchResultsTitleValue a') ||
      row.querySelector<HTMLAnchorElement>('a.classifiedTitle');
    applyListingHighlight(row, titleLink);
  });

  // 2. Galeri Görünümü (#searchResultsGallery td.searchResultsGalleryItem)
  const galleryCells = document.querySelectorAll<HTMLTableCellElement>(
    '#searchResultsGallery td.searchResultsGalleryItem, table.searchResultsGallery td.searchResultsGalleryItem',
  );
  galleryCells.forEach((cell) => {
    if (cell.classList.contains('nativeAd')) return;
    const titleLink =
      cell.querySelector<HTMLAnchorElement>('a.classifiedTitle') ||
      cell.querySelector<HTMLAnchorElement>('a.refurbishment-classified-url') ||
      cell.querySelector<HTMLAnchorElement>('.classifiedTitle');
    applyListingHighlight(cell, titleLink);
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
  commentItem?: ListingCommentItem,
) => {
  const primaryTime = lastTimestamp || firstTimestamp;
  if (!primaryTime && !commentItem) return;

  const existingBanner = document.querySelector<HTMLDivElement>('.sm-detail-visited-banner');
  if (existingBanner) {
    if (commentItem && !existingBanner.querySelector('.sm-badge-comment')) {
      const firstBadge = existingBanner.querySelector('.sm-badge');
      if (firstBadge) {
        const commentBadge = document.createElement('span');
        commentBadge.className = 'sm-badge sm-badge-comment';
        commentBadge.setAttribute(
          'style',
          'background-color: #059669 !important; margin-left: 6px;',
        );
        commentBadge.textContent = 'Soru Soruldu';
        if (commentItem.text) {
          commentBadge.title = `Sorduğunuz Soru: "${commentItem.text}"`;
        }
        firstBadge.after(commentBadge);
      }
    }
    return;
  }

  const titleContainer =
    document.querySelector('.classifiedDetailTitle') ||
    document.querySelector('.classifiedDetailContent');

  if (titleContainer) {
    const banner = document.createElement('div');
    banner.className = 'sm-detail-visited-banner';

    const dateInfo =
      firstTimestamp && lastTimestamp && firstTimestamp !== lastTimestamp
        ? `(${formatTimeAgo(lastTimestamp)} bakıldı · İlk: ${formatTimeAgo(firstTimestamp)} - ${formatVisitedDate(firstTimestamp)}${visitCount && visitCount > 1 ? ` · ${visitCount} kez` : ''})`
        : primaryTime
          ? `(${formatTimeAgo(primaryTime)} bakıldı · ${formatVisitedDate(primaryTime)})`
          : '';

    const commentTooltip = commentItem?.text
      ? ` title="Sorduğunuz Soru: &quot;${commentItem.text.replace(/"/g, '&quot;')}&quot;"`
      : '';
    const commentInfo = commentItem
      ? `<span class="sm-badge sm-badge-comment"${commentTooltip} style="background-color: #059669 !important; margin-left: 6px;">Soru Soruldu</span>`
      : '';

    banner.innerHTML = `
      <div>
        <span class="sm-badge">Ziyaret Edildi</span>
        ${commentInfo}
        <span>Bu ilanı daha önce incelediniz</span>
        ${dateInfo ? `<span class="sm-date">${dateInfo}</span>` : ''}
      </div>
    `;
    titleContainer.prepend(banner);
  }
};
