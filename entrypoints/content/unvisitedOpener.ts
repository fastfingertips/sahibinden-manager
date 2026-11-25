// WXT tarafından sağlanan global 'storage' kullanılıyor
import { getOrCreateToolbarContainer } from './ui/toolbar';

let isUnvisitedOpenerEnabled = true;
let unvisitedOpenerCount = 5; // 0 = Tümü / Maksimum
let isUnvisitedOpenerShortcutEnabled = true;
let isUnvisitedOpenerButtonEnabled = true;

const isEditableElement = (el: Element | null): boolean => {
  if (!el) return false;
  const tagName = el.tagName.toUpperCase();
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return false;
};

export const showToast = (message: string, type: 'success' | 'info' = 'info') => {
  let container = document.querySelector<HTMLDivElement>('.sm-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'sm-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `sm-toast sm-toast-${type}`;

  const iconSvg =
    type === 'success'
      ? `<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>`
      : `<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>`;

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  // Animasyonla görünür yap
  requestAnimationFrame(() => {
    toast.classList.add('sm-toast-visible');
  });

  // 2.6 sn sonra kaldır
  setTimeout(() => {
    toast.classList.remove('sm-toast-visible');
    setTimeout(() => {
      toast.remove();
      if (container && container.children.length === 0) {
        container.remove();
      }
    }, 250);
  }, 2600);
};

export const getUnvisitedListingElements = (): HTMLElement[] => {
  // 1. Liste Görünümü
  const rows = Array.from(
    document.querySelectorAll<HTMLElement>(
      '#searchResultsTable tr.searchResultsItem, table.searchResultsTable tr.searchResultsItem',
    ),
  );
  if (rows.length > 0) {
    return rows.filter((row) => {
      if (row.classList.contains('nativeAd') || row.classList.contains('classicNativeAd')) {
        return false;
      }
      if (row.classList.contains('sm-visited-listing')) return false;
      if (row.classList.contains('sm-refurbished-ignored')) return false;
      if (row.classList.contains('sm-eliminated-listing')) return false;
      if (row.style.display === 'none') return false;
      return row.offsetParent !== null;
    });
  }

  // 2. Galeri Görünümü
  const galleryItems = Array.from(
    document.querySelectorAll<HTMLElement>(
      '#searchResultsGallery td.searchResultsGalleryItem, table.searchResultsGallery td.searchResultsGalleryItem',
    ),
  );
  if (galleryItems.length > 0) {
    return galleryItems.filter((item) => {
      if (item.classList.contains('nativeAd')) return false;
      if (item.classList.contains('sm-visited-listing')) return false;
      if (item.classList.contains('sm-refurbished-ignored')) return false;
      if (item.classList.contains('sm-eliminated-listing')) return false;
      if (item.style.display === 'none') return false;
      return item.offsetParent !== null;
    });
  }

  return [];
};

export const getUnvisitedListingUrls = (
  maxCount: number = unvisitedOpenerCount,
): { urls: string[]; totalCount: number } => {
  const elements = getUnvisitedListingElements();
  const urls: string[] = [];
  const seen = new Set<string>();

  for (const el of elements) {
    const link =
      el.querySelector<HTMLAnchorElement>('td.searchResultsTitleValue a.classifiedTitle') ||
      el.querySelector<HTMLAnchorElement>('a.classifiedTitle') ||
      el.querySelector<HTMLAnchorElement>('a.refurbishment-classified-url') ||
      el.querySelector<HTMLAnchorElement>('a[href*="/ilan/"]');
    const href = link?.href;
    if (href && !seen.has(href)) {
      seen.add(href);
      urls.push(href);
    }
  }

  const toOpen = maxCount > 0 ? urls.slice(0, maxCount) : urls;
  return { urls: toOpen, totalCount: urls.length };
};

export const openUnvisitedListings = async () => {
  if (!isUnvisitedOpenerEnabled) return;

  const { urls, totalCount } = getUnvisitedListingUrls(unvisitedOpenerCount);

  if (urls.length === 0) {
    showToast('Sayfada ziyaret edilmemiş ilan bulunamadı.', 'info');
    return;
  }

  try {
    await browser.runtime.sendMessage({
      type: 'OPEN_TABS',
      urls,
    });
    const infoText =
      unvisitedOpenerCount > 0 && totalCount > urls.length
        ? `${urls.length} ilan açıldı (kalan: ${totalCount - urls.length})`
        : `${urls.length} ilan yeni sekmede açıldı.`;
    showToast(infoText, 'success');
  } catch (err) {
    console.error('Sahibinden Manager: İlan sekmeleri açılamadı', err);
    showToast('İlan sekmeleri açılırken bir hata oluştu.', 'info');
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isUnvisitedOpenerEnabled || !isUnvisitedOpenerShortcutEnabled) return;
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  if (isEditableElement(document.activeElement)) return;

  // Açık bir modal veya lightbox varsa araya girme
  if (document.querySelector('.sm-notes-modal, .sm-lightbox-active, sui-dialog[open]')) {
    return;
  }

  // Sadece arama sonuçları sayfasında çalış
  if (!document.querySelector('#searchResultsTable, #searchResultsGallery')) {
    return;
  }

  if (e.key === 'u' || e.key === 'U') {
    e.preventDefault();
    openUnvisitedListings();
  }
};

export const handleUnvisitedOpenerButton = () => {
  if (!isUnvisitedOpenerEnabled || !isUnvisitedOpenerButtonEnabled) {
    const existing = document.querySelector('.sm-unvisited-opener-btn');
    if (existing) existing.remove();
    return;
  }

  // Arama sonuçları listesi ve toolbar kapsayıcısını kontrol et
  const group = getOrCreateToolbarContainer();
  if (!group) return;

  let btn = group.querySelector<HTMLButtonElement>('.sm-unvisited-opener-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sm-unvisited-opener-btn';
    btn.innerHTML = `
      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
      </svg>
      <span class="sm-opener-text">Ziyaret Edilmemişleri Aç</span>
      <span class="sm-opener-badge">0</span>
    `;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openUnvisitedListings();
    });

    group.prepend(btn);
  } else if (btn.parentElement !== group) {
    group.prepend(btn);
  }

  // Butonun sayaç ve metnini dinamik güncelle
  const unvisitedElements = getUnvisitedListingElements();
  const total = unvisitedElements.length;
  const countBadge = btn.querySelector<HTMLElement>('.sm-opener-badge');

  if (countBadge) {
    const willOpen = unvisitedOpenerCount > 0 ? Math.min(unvisitedOpenerCount, total) : total;
    countBadge.textContent = String(willOpen);
    countBadge.classList.toggle('sm-badge-empty', total === 0);

    const limitLabel = unvisitedOpenerCount > 0 ? `${unvisitedOpenerCount} adet` : 'Tümü';
    btn.title =
      total > 0
        ? `Bu sayfadaki ${total} ziyaret edilmemiş ilandan ${willOpen} tanesini (${limitLabel}) yeni sekmede açar (Kısayol: U)`
        : 'Sayfadaki tüm ilanlar daha önce ziyaret edilmiş (Kısayol: U)';
  }
};

export const initUnvisitedOpener = async () => {
  try {
    const openerPref = await storage.getItem<boolean>('local:isUnvisitedOpenerEnabled');
    isUnvisitedOpenerEnabled = openerPref !== false;

    const countPref = await storage.getItem<number>('local:unvisitedOpenerCount');
    if (typeof countPref === 'number') {
      unvisitedOpenerCount = countPref;
    }

    const shortcutPref = await storage.getItem<boolean>('local:isUnvisitedOpenerShortcutEnabled');
    isUnvisitedOpenerShortcutEnabled = shortcutPref !== false;

    const buttonPref = await storage.getItem<boolean>('local:isUnvisitedOpenerButtonEnabled');
    isUnvisitedOpenerButtonEnabled = buttonPref !== false;

    storage.watch<boolean>('local:isUnvisitedOpenerEnabled', (newVal) => {
      isUnvisitedOpenerEnabled = newVal !== false;
      handleUnvisitedOpenerButton();
    });

    storage.watch<number>('local:unvisitedOpenerCount', (newVal) => {
      if (typeof newVal === 'number') {
        unvisitedOpenerCount = newVal;
        handleUnvisitedOpenerButton();
      }
    });

    storage.watch<boolean>('local:isUnvisitedOpenerShortcutEnabled', (newVal) => {
      isUnvisitedOpenerShortcutEnabled = newVal !== false;
    });

    storage.watch<boolean>('local:isUnvisitedOpenerButtonEnabled', (newVal) => {
      isUnvisitedOpenerButtonEnabled = newVal !== false;
      handleUnvisitedOpenerButton();
    });

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    handleUnvisitedOpenerButton();
  } catch (err) {
    console.error('Sahibinden Manager: Ziyaret edilmemiş ilan açıcı başlatılamadı', err);
  }
};
