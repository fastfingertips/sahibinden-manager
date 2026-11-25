// WXT tarafından sağlanan global 'storage' kullanılıyor
import { showToast } from './unvisitedOpener';

export type CompactViewMode = 'normal' | 'mini' | 'hidden';

let currentCompactMode: CompactViewMode = 'normal';

export const applyCompactViewClass = (mode: CompactViewMode) => {
  const root = document.documentElement;
  root.classList.toggle('sm-compact-mini', mode === 'mini');
  root.classList.toggle('sm-compact-hidden', mode === 'hidden');
};

export const setCompactViewMode = async (mode: CompactViewMode, notify: boolean = true) => {
  currentCompactMode = mode;
  applyCompactViewClass(mode);
  await storage.setItem('local:compactViewMode', mode);
  handleCompactViewButton();

  if (notify) {
    if (mode === 'mini') {
      showToast('Kompakt Görünüm: Mini Resim modu aktif', 'info');
    } else if (mode === 'hidden') {
      showToast('Kompakt Görünüm: Resimsiz (Ultra Kompakt) aktif', 'info');
    } else {
      showToast('Kompakt Görünüm: Standart görünüm aktif', 'info');
    }
  }
};

export const cycleCompactViewMode = async () => {
  const nextMode: CompactViewMode =
    currentCompactMode === 'normal' ? 'mini' : currentCompactMode === 'mini' ? 'hidden' : 'normal';
  await setCompactViewMode(nextMode, true);
};

export const handleCompactViewButton = () => {
  const searchResults = document.querySelector('#searchResultsTable, #searchResultsGallery');
  if (!searchResults) {
    const existing = document.querySelector('.sm-compact-toggle-btn');
    if (existing) existing.remove();
    return;
  }

  const targetContainer = document.querySelector(
    '#searchResultsSearchFormTitle, .searchResultsSearchFormTitleBox, .searchResultsTitleBox, .searchResultsTop, .view-types',
  );

  let btn = document.querySelector<HTMLButtonElement>('.sm-compact-toggle-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sm-compact-toggle-btn';
    btn.innerHTML = `
      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
      <span class="sm-compact-text">Görünüm</span>
      <span class="sm-compact-badge">Standart</span>
    `;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      cycleCompactViewMode();
    });
  }

  // Yerleşim: Filtre butonu veya unvisited opener butonu yanına koy
  const filterBtn = document.querySelector('.sm-listing-filter-btn');
  const openerContainer = document.querySelector('.sm-unvisited-opener-container');

  if (filterBtn && filterBtn.parentElement) {
    if (filterBtn.nextElementSibling !== btn) {
      filterBtn.parentElement.insertBefore(btn, filterBtn.nextSibling);
    }
  } else if (openerContainer && openerContainer.parentElement) {
    if (openerContainer.nextElementSibling !== btn) {
      openerContainer.parentElement.insertBefore(btn, openerContainer.nextSibling);
    }
  } else if (targetContainer) {
    if (!targetContainer.contains(btn)) {
      targetContainer.appendChild(btn);
    }
  } else if (searchResults.parentElement && !searchResults.parentElement.contains(btn)) {
    searchResults.parentElement.insertBefore(btn, searchResults);
  }

  // Buton rozeti ve durumunu güncelle
  const badge = btn.querySelector<HTMLElement>('.sm-compact-badge');
  const text = btn.querySelector<HTMLElement>('.sm-compact-text');

  if (badge && text) {
    if (currentCompactMode === 'mini') {
      text.textContent = 'Kompakt';
      badge.textContent = 'Mini Resim';
      btn.classList.add('sm-compact-active');
      btn.title =
        'Şu an: Mini Resim modu (satırlar daraltıldı, hover ile önizleme büyür). Resimleri tamamen kaldırmak için tıklayın.';
    } else if (currentCompactMode === 'hidden') {
      text.textContent = 'Kompakt';
      badge.textContent = 'Resimsiz';
      btn.classList.add('sm-compact-active');
      btn.title =
        'Şu an: Resimsiz ultra kompakt mod (maksimum satır görünürlüğü). Standart görünüme dönmek için tıklayın.';
    } else {
      text.textContent = 'Görünüm';
      badge.textContent = 'Standart';
      btn.classList.remove('sm-compact-active');
      btn.title = 'Şu an: Standart görünüm. Mini resimli kompakt moda geçmek için tıklayın.';
    }
  }
};

export const initCompactView = async () => {
  try {
    const savedMode = await storage.getItem<CompactViewMode>('local:compactViewMode');
    if (savedMode === 'mini' || savedMode === 'hidden' || savedMode === 'normal') {
      currentCompactMode = savedMode;
    } else {
      currentCompactMode = 'normal';
    }

    applyCompactViewClass(currentCompactMode);

    storage.watch<CompactViewMode>('local:compactViewMode', (newVal) => {
      const mode = newVal === 'mini' || newVal === 'hidden' ? newVal : 'normal';
      currentCompactMode = mode;
      applyCompactViewClass(mode);
      handleCompactViewButton();
    });
  } catch (err) {
    console.error('Sahibinden Manager: Kompakt liste görünümü başlatılamadı', err);
  }
};
