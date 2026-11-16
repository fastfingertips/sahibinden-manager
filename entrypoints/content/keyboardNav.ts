// WXT tarafından sağlanan global 'storage' kullanılıyor

let isKeyboardNavEnabled = true;
let isKeyboardNewTabEnabled = false;
let currentIndex = -1;

const isEditableElement = (el: Element | null): boolean => {
  if (!el) return false;
  const tagName = el.tagName.toUpperCase();
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return false;
};

const getVisibleListings = (): HTMLElement[] => {
  // 1. Liste Görünümü
  const rows = Array.from(
    document.querySelectorAll<HTMLElement>('#searchResultsTable tr.searchResultsItem'),
  );
  if (rows.length > 0) {
    return rows.filter((row) => {
      if (row.classList.contains('sm-refurbished-ignored')) return false;
      if (row.style.display === 'none') return false;
      return row.offsetParent !== null;
    });
  }

  // 2. Galeri Görünümü
  const galleryItems = Array.from(
    document.querySelectorAll<HTMLElement>('#searchResultsGallery td.searchResultsGalleryItem'),
  );
  if (galleryItems.length > 0) {
    return galleryItems.filter((item) => {
      if (item.classList.contains('sm-refurbished-ignored')) return false;
      if (item.style.display === 'none') return false;
      return item.offsetParent !== null;
    });
  }

  return [];
};

const clearFocus = () => {
  const focused = document.querySelectorAll('.sm-keyboard-focused');
  focused.forEach((el) => el.classList.remove('sm-keyboard-focused'));
};

const setFocusItem = (items: HTMLElement[], index: number) => {
  if (index < 0 || index >= items.length) return;
  clearFocus();

  const item = items[index];
  item.classList.add('sm-keyboard-focused');
  item.scrollIntoView({ block: 'center', behavior: 'smooth' });
  currentIndex = index;
};

const openSelectedItem = (item: HTMLElement) => {
  const link = item.querySelector<HTMLAnchorElement>(
    'a.classifiedTitle, a.refurbishment-classified-url, a[href*="/ilan/"], a[href*="/yepy/"]',
  );
  const href = link?.href;
  if (!href) return;

  if (isKeyboardNewTabEnabled) {
    window.open(href, '_blank');
  } else if (link) {
    link.click();
  } else {
    window.location.href = href;
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isKeyboardNavEnabled) return;
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (isEditableElement(document.activeElement)) return;

  // Açık bir modal veya lightbox varsa araya girme
  if (document.querySelector('.sm-notes-modal, .sm-lightbox-active, sui-dialog[open]')) {
    return;
  }

  const items = getVisibleListings();
  if (items.length === 0) return;

  if (e.key === 'ArrowDown' || e.key === 'Down') {
    e.preventDefault();
    if (currentIndex < 0) {
      setFocusItem(items, 0);
    } else if (currentIndex < items.length - 1) {
      setFocusItem(items, currentIndex + 1);
    }
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
    e.preventDefault();
    if (currentIndex <= 0) {
      setFocusItem(items, 0);
    } else {
      setFocusItem(items, currentIndex - 1);
    }
  } else if (e.key === 'Enter') {
    if (currentIndex >= 0 && currentIndex < items.length) {
      e.preventDefault();
      openSelectedItem(items[currentIndex]);
    }
  }
};

const handleClickSync = (e: MouseEvent) => {
  const target = (e.target as Element)?.closest<HTMLElement>(
    '#searchResultsTable tr.searchResultsItem, #searchResultsGallery td.searchResultsGalleryItem',
  );
  if (!target) return;

  const items = getVisibleListings();
  const idx = items.indexOf(target);
  if (idx !== -1) {
    clearFocus();
    target.classList.add('sm-keyboard-focused');
    currentIndex = idx;
  }
};

export const initKeyboardNavigation = async () => {
  try {
    const navEnabled = await storage.getItem<boolean>('local:isKeyboardNavEnabled');
    if (navEnabled !== null && navEnabled !== undefined) {
      isKeyboardNavEnabled = navEnabled !== false;
    }

    const newTabEnabled = await storage.getItem<boolean>('local:isKeyboardNewTabEnabled');
    if (newTabEnabled !== null && newTabEnabled !== undefined) {
      isKeyboardNewTabEnabled = newTabEnabled === true;
    }

    storage.watch<boolean>('local:isKeyboardNavEnabled', (newVal) => {
      isKeyboardNavEnabled = newVal !== false;
      if (!isKeyboardNavEnabled) {
        clearFocus();
        currentIndex = -1;
      }
    });

    storage.watch<boolean>('local:isKeyboardNewTabEnabled', (newVal) => {
      isKeyboardNewTabEnabled = newVal === true;
    });

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('click', handleClickSync, { passive: true });
  } catch (err) {
    console.error('Sahibinden Manager: Klavye gezinimi başlatılamadı', err);
  }
};
