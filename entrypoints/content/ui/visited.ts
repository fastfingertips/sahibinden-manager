export const formatVisitedDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const highlightVisitedListings = (records: Record<string, number>) => {
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
      if (titleLink && !titleLink.querySelector('.sm-visited-badge')) {
        const badge = document.createElement('span');
        badge.className = 'sm-visited-badge';
        badge.textContent = 'Ziyaret Edildi';
        titleLink.prepend(badge);
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
      if (titleLink && !titleLink.querySelector('.sm-visited-badge')) {
        const badge = document.createElement('span');
        badge.className = 'sm-visited-badge';
        badge.textContent = 'Ziyaret Edildi';
        titleLink.prepend(badge);
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
    banner.innerHTML = `
      <div>
        <span class="sm-badge">Ziyaret Edildi</span>
        <span>Bu ilanı daha önce incelediniz (Son ziyaret: ${formatVisitedDate(timestamp)})</span>
      </div>
    `;
    titleContainer.prepend(banner);
  }
};
