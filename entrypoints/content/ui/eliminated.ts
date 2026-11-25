import {
  formatDate as formatEliminatedDate,
  formatTimeAgo as formatEliminatedTimeAgo,
} from '@/utils/date';
import { setVisitedBadgeContext } from './visited';

export interface EliminatedListing {
  adId: string;
  reason: string;
  createdAt: number;
  updatedAt: number;
  title?: string;
  url?: string;
}

let cachedEliminated: Record<string, EliminatedListing> = {};
let activeListingContext: { adId: string; title: string; url: string } | null = null;
let isEliminatedFeatureEnabled = true;

const QUICK_REASONS = [
  'Hasarlı / Tramer',
  'Fiyat Çok Yüksek',
  'Satıcı Güvenilmez',
  'Ağır Masraflı',
  'Kusurlu / Eksik Bilgi',
];

export const getCachedEliminated = (): Record<string, EliminatedListing> => cachedEliminated;

export const highlightEliminatedListings = () => {
  if (!isEliminatedFeatureEnabled) {
    document.querySelectorAll('.sm-eliminated-listing').forEach((el) => {
      el.classList.remove('sm-eliminated-listing');
    });
    return;
  }

  // 1. Liste Görünümü
  const rows = document.querySelectorAll<HTMLTableRowElement>(
    '#searchResultsTable tr.searchResultsItem, table.searchResultsTable tr.searchResultsItem',
  );
  rows.forEach((row) => {
    let id = row.getAttribute('data-id') || row.getAttribute('data-classified-id');
    if (!id && row.id) {
      const match = row.id.match(/\d{8,12}/);
      if (match) id = match[0];
    }
    if (!id) {
      const link = row.querySelector<HTMLAnchorElement>(
        'td.searchResultsTitleValue a.classifiedTitle, a.classifiedTitle, a.refurbishment-classified-url, td.searchResultsTitleValue a, a[href*="/ilan/"]',
      );
      if (link?.href) {
        const match =
          link.href.match(/(\d{8,12})\/detay/) ||
          link.href.match(/-(\d{8,12})(?:\/|$|\?)/) ||
          link.href.match(/\/(\d{8,12})(?:\/|$|\?)/);
        if (match) id = match[1];
      }
    }

    if (id && cachedEliminated[id]) {
      if (!row.classList.contains('sm-eliminated-listing')) {
        row.classList.add('sm-eliminated-listing');
      }
    } else if (row.classList.contains('sm-eliminated-listing')) {
      row.classList.remove('sm-eliminated-listing');
    }
  });

  // 2. Galeri Görünümü
  const cells = document.querySelectorAll<HTMLTableCellElement>(
    '#searchResultsGallery td.searchResultsGalleryItem, table.searchResultsGallery td.searchResultsGalleryItem',
  );
  cells.forEach((cell) => {
    let id = cell.getAttribute('data-id') || cell.getAttribute('data-classified-id');
    if (!id && cell.id) {
      const match = cell.id.match(/\d{8,12}/);
      if (match) id = match[0];
    }
    if (!id) {
      const link = cell.querySelector<HTMLAnchorElement>(
        'a.classifiedTitle, a.refurbishment-classified-url, a[href*="/ilan/"]',
      );
      if (link?.href) {
        const match =
          link.href.match(/(\d{8,12})\/detay/) ||
          link.href.match(/-(\d{8,12})(?:\/|$|\?)/) ||
          link.href.match(/\/(\d{8,12})(?:\/|$|\?)/);
        if (match) id = match[1];
      }
    }

    if (id && cachedEliminated[id]) {
      if (!cell.classList.contains('sm-eliminated-listing')) {
        cell.classList.add('sm-eliminated-listing');
      }
    } else if (cell.classList.contains('sm-eliminated-listing')) {
      cell.classList.remove('sm-eliminated-listing');
    }
  });
};

export const updateDetailEliminatedBanner = (adId: string) => {
  const existing = document.querySelector<HTMLDivElement>('.sm-detail-eliminated-banner');
  const record = cachedEliminated[adId];

  if (!isEliminatedFeatureEnabled || !record) {
    if (existing) existing.remove();
    return;
  }

  const titleContainer = document.querySelector<HTMLDivElement>('.classifiedDetailTitle');
  if (!titleContainer) return;

  let banner = existing;
  if (!banner) {
    banner = document.createElement('div');
    banner.className = 'sm-detail-eliminated-banner';
    titleContainer.after(banner);
  }

  const reasonText = record.reason?.trim() || 'Eleme nedeni belirtilmedi';
  const createdDate = formatEliminatedDate(record.createdAt || record.updatedAt);
  const timeAgo = formatEliminatedTimeAgo(record.createdAt || record.updatedAt);

  banner.innerHTML = `
    <div class="sm-detail-eliminated-banner-left">
      <svg class="sm-detail-eliminated-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
      </svg>
      <div>
        <div class="sm-detail-eliminated-banner-title">Bu İlanı Elediniz</div>
        <div class="sm-detail-eliminated-banner-reason" title="${reasonText}">Neden: "${reasonText}"</div>
      </div>
      <span class="sm-detail-eliminated-banner-date">(${timeAgo} · ${createdDate})</span>
    </div>
    <div class="sm-detail-eliminated-banner-actions">
      <button type="button" class="sm-detail-eliminated-btn sm-detail-eliminated-edit-btn">Nedeni Düzenle</button>
      <button type="button" class="sm-detail-eliminated-btn sm-detail-eliminated-un-btn">Elemeyi Kaldır</button>
    </div>
  `;

  const editBtn = banner.querySelector<HTMLButtonElement>('.sm-detail-eliminated-edit-btn');
  const unBtn = banner.querySelector<HTMLButtonElement>('.sm-detail-eliminated-un-btn');

  if (editBtn) {
    editBtn.onclick = (e) => {
      e.stopPropagation();
      const actionLink = document.querySelector<HTMLAnchorElement>(
        '.sm-classified-eliminated-link',
      );
      actionLink?.click();
    };
  }

  if (unBtn) {
    unBtn.onclick = async (e) => {
      e.stopPropagation();
      delete cachedEliminated[adId];
      await storage.setItem('local:eliminated-listings', cachedEliminated);
      banner?.remove();
      const actionLi = document.querySelector('.sm-classified-eliminated-action');
      if (actionLi) updateEliminatedLinkState(actionLi, adId);
    };
  }
};

export const setupDetailEliminated = (adId: string, title: string, url: string) => {
  if (!isEliminatedFeatureEnabled) return;
  const eventsList = document.querySelector<HTMLUListElement>(
    'div.classifiedDetailTitle ul.classifiedEvents, ul.classifiedEvents',
  );
  if (!eventsList) return;

  if (eventsList.querySelector('.sm-classified-eliminated-action')) {
    updateEliminatedLinkState(eventsList.querySelector('.sm-classified-eliminated-action')!, adId);
    updateDetailEliminatedBanner(adId);
    return;
  }

  const li = document.createElement('li');
  li.className = 'sm-classified-eliminated-action';

  const link = document.createElement('a');
  link.href = '#';
  link.setAttribute('rel', 'nofollow');
  link.className = 'sm-classified-eliminated-link';

  li.appendChild(link);

  // Not aksiyonunun yanına yerleştir
  const noteAction = eventsList.querySelector('.sm-classified-note-action');
  if (noteAction && noteAction.nextSibling) {
    eventsList.insertBefore(li, noteAction.nextSibling);
  } else {
    eventsList.appendChild(li);
  }

  let dropdown: HTMLDivElement | null = null;

  const closeDropdown = () => {
    if (dropdown) {
      dropdown.remove();
      dropdown = null;
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (dropdown && !li.contains(e.target as Node)) {
      closeDropdown();
    }
  };

  document.addEventListener('click', handleDocumentClick);

  const openDropdown = () => {
    closeDropdown();

    const record = cachedEliminated[adId];
    const currentReason = record?.reason || '';
    const createdTime = record?.createdAt || record?.updatedAt;
    const isEliminated = Boolean(record);

    let statusText = 'Henüz elenmedi';
    let statusTooltip = '';
    if (record && createdTime) {
      statusText = `Elendi: ${formatEliminatedTimeAgo(createdTime)}`;
      statusTooltip = `Elendi: ${formatEliminatedDate(createdTime)}`;
    }

    dropdown = document.createElement('div');
    dropdown.className = 'sm-eliminated-dropdown';
    dropdown.innerHTML = `
      <div class="sm-eliminated-dropdown-header">
        <span class="sm-eliminated-dropdown-title">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
          İlanı Ele (#${adId})
        </span>
        <button type="button" class="sm-eliminated-dropdown-close" aria-label="Kapat">&times;</button>
      </div>
      <div class="sm-eliminated-dropdown-body">
        <div class="sm-eliminated-chips">
          ${QUICK_REASONS.map(
            (r) =>
              `<button type="button" class="sm-eliminated-chip" data-reason="${r}">${r}</button>`,
          ).join('')}
        </div>
        <textarea 
          class="sm-eliminated-dropdown-textarea" 
          placeholder="Eleme nedenini yazın (örn. sol podye işlemli, tramer yüksek, satıcı güven vermedi)..."
        >${currentReason}</textarea>
      </div>
      <div class="sm-eliminated-dropdown-footer">
        <span class="sm-eliminated-dropdown-status" ${statusTooltip ? `title="${statusTooltip}"` : ''}>${statusText}</span>
        <div class="sm-eliminated-dropdown-actions">
          ${isEliminated ? '<button type="button" class="sm-eliminated-btn sm-eliminated-btn-delete">Elemeyi Kaldır</button>' : ''}
          <button type="button" class="sm-eliminated-btn sm-eliminated-btn-save">Kaydet</button>
        </div>
      </div>
    `;

    li.appendChild(dropdown);

    const textarea = dropdown.querySelector<HTMLTextAreaElement>(
      '.sm-eliminated-dropdown-textarea',
    )!;
    const closeBtn = dropdown.querySelector<HTMLButtonElement>('.sm-eliminated-dropdown-close')!;
    const saveBtn = dropdown.querySelector<HTMLButtonElement>('.sm-eliminated-btn-save')!;
    const deleteBtn = dropdown.querySelector<HTMLButtonElement>('.sm-eliminated-btn-delete');
    const chipBtns = dropdown.querySelectorAll<HTMLButtonElement>('.sm-eliminated-chip');

    chipBtns.forEach((chip) => {
      chip.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const reason = chip.dataset.reason;
        if (reason) {
          if (textarea.value.trim()) {
            textarea.value = `${textarea.value.trim()}, ${reason}`;
          } else {
            textarea.value = reason;
          }
          textarea.focus();
        }
      };
    });

    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeDropdown();
    };

    const handleSave = async () => {
      const reason = textarea.value.trim();
      const existing = cachedEliminated[adId];
      const now = Date.now();

      cachedEliminated[adId] = {
        adId,
        reason: reason || 'Neden belirtilmedi',
        title: title || activeListingContext?.title || `İlan #${adId}`,
        url: url || activeListingContext?.url || window.location.href,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
      };

      await storage.setItem('local:eliminated-listings', cachedEliminated);
      delete link.dataset.hasEliminated;
      updateEliminatedLinkState(li, adId);
      updateDetailEliminatedBanner(adId);
      closeDropdown();
    };

    saveBtn.onclick = (e) => {
      e.stopPropagation();
      handleSave();
    };

    if (deleteBtn) {
      deleteBtn.onclick = async (e) => {
        e.stopPropagation();
        delete cachedEliminated[adId];
        await storage.setItem('local:eliminated-listings', cachedEliminated);
        delete link.dataset.hasEliminated;
        updateEliminatedLinkState(li, adId);
        updateDetailEliminatedBanner(adId);
        closeDropdown();
      };
    }

    textarea.onkeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown();
      }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSave();
      }
    };
  };

  link.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropdown) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  updateEliminatedLinkState(li, adId);
  updateDetailEliminatedBanner(adId);
};

const updateEliminatedLinkState = (li: Element, adId: string) => {
  const link = li.querySelector<HTMLAnchorElement>('.sm-classified-eliminated-link');
  if (!link) return;

  const record = cachedEliminated[adId];
  const isEliminated = Boolean(record);

  if (
    link.dataset.hasEliminated === String(isEliminated) &&
    link.querySelector('.sm-classified-eliminated-icon')
  ) {
    return;
  }

  link.dataset.hasEliminated = String(isEliminated);
  link.classList.toggle('has-eliminated', isEliminated);

  link.innerHTML = `
    <svg class="sm-classified-eliminated-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
    </svg>
    <span>${isEliminated ? 'Elendi' : 'İlanı Ele'}</span>
    ${isEliminated ? '<span class="sm-classified-eliminated-dot" title="Elenmiş ilan"></span>' : ''}
  `;

  if (isEliminated && record) {
    const preview = record.reason ? record.reason.trim() : 'Eleme nedeni belirtilmedi';
    const created = record.createdAt || record.updatedAt;
    const timeInfo = created ? `\nElendi: ${formatEliminatedDate(created)}` : '';
    link.title = `Elenmiş İlan: ${preview}${timeInfo}\nDüzenlemek veya kaldırmak için tıklayın`;
  } else {
    link.title = 'Bu ilanı ele ve nedenini kaydet';
  }
};

export const initEliminatedMode = async (
  currentAdId: string | null,
  currentTitle: string,
  currentUrl: string,
) => {
  try {
    const pref = await storage.getItem<boolean>('local:isEliminatedHighlightEnabled');
    isEliminatedFeatureEnabled = pref !== false;

    cachedEliminated =
      (await storage.getItem<Record<string, EliminatedListing>>('local:eliminated-listings')) || {};

    setVisitedBadgeContext({
      eliminated: cachedEliminated,
    });

    if (currentAdId) {
      activeListingContext = { adId: currentAdId, title: currentTitle, url: currentUrl };
      setupDetailEliminated(currentAdId, currentTitle, currentUrl);
    }

    highlightEliminatedListings();

    storage.watch<boolean>('local:isEliminatedHighlightEnabled', (newVal) => {
      isEliminatedFeatureEnabled = newVal !== false;
      highlightEliminatedListings();
      if (activeListingContext) {
        updateDetailEliminatedBanner(activeListingContext.adId);
      }
    });

    storage.watch<Record<string, EliminatedListing>>('local:eliminated-listings', (newVal) => {
      cachedEliminated = newVal || {};
      setVisitedBadgeContext({
        eliminated: cachedEliminated,
      });

      highlightEliminatedListings();

      if (activeListingContext) {
        const action = document.querySelector('.sm-classified-eliminated-action');
        if (action) {
          const lk = action.querySelector<HTMLAnchorElement>('.sm-classified-eliminated-link');
          if (lk) delete lk.dataset.hasEliminated;
          updateEliminatedLinkState(action, activeListingContext.adId);
        }
        updateDetailEliminatedBanner(activeListingContext.adId);
      }
    });
  } catch (err) {
    console.error('Sahibinden Manager: Eleme modu başlatılamadı', err);
  }
};

export const applyEliminatedToListings = () => {
  if (!isEliminatedFeatureEnabled) return;
  highlightEliminatedListings();
  if (activeListingContext) {
    setupDetailEliminated(
      activeListingContext.adId,
      activeListingContext.title,
      activeListingContext.url,
    );
  }
};
