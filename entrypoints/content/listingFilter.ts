// WXT tarafından sağlanan global 'storage' kullanılıyor
import { getOrCreateToolbarContainer } from './ui/toolbar';

let isHideEliminatedEnabled = false;
let isHideVisitedEnabled = false;
let isHideRefurbishedEnabled = false;
let isHideAdsEnabled = false;

const REFURBISHED_SELECTORS =
  '.refurbishment-content-box, [data-refurbishment-product], #searchResultsTable tr.searchResultsItem:has(.refurbishment), #searchResultsTable tr.searchResultsItem:has(.refurbishment-classified-url)';

const AD_SELECTORS = [
  '#searchResultsTable tr.nativeAd',
  '#searchResultsTable tr.classicNativeAd',
  'tr.nativeAd',
  'tr.classicNativeAd',
  '#searchResultsTable tr.searchResultsPromoToplist',
  '#searchResultsTable tr.searchResultsPromoToplistFooter',
  'tr.searchResultsPromoToplist',
  'tr.searchResultsPromoToplistFooter',
  'tr:has(a[href*="/doping-tanitim/"])',
  '.searchResultsPromoToplist',
  'div[id^="div-gpt-ad-"]',
  '.dfp-ad-container',
  '.banner-area',
  '.advertisement-content',
].join(', ');

export interface FilterPageStats {
  eliminatedCount: number;
  visitedCount: number;
  refurbishedCount: number;
  adsCount: number;
  totalHiddenCount: number;
  activeFilterCount: number;
}

export const getListingFilterStats = (): FilterPageStats => {
  const eliminatedEls = document.querySelectorAll(
    '#searchResultsTable tr.searchResultsItem.sm-eliminated-listing, #searchResultsGallery td.searchResultsGalleryItem.sm-eliminated-listing',
  );
  const eliminatedCount = eliminatedEls.length;

  const visitedEls = Array.from(
    document.querySelectorAll(
      '#searchResultsTable tr.searchResultsItem.sm-visited-listing, #searchResultsGallery td.searchResultsGalleryItem.sm-visited-listing',
    ),
  ).filter((el) => !el.classList.contains('sm-eliminated-listing'));
  const visitedCount = visitedEls.length;

  const refurbishedEls = document.querySelectorAll(REFURBISHED_SELECTORS);
  const refurbishedCount = refurbishedEls.length;

  const adEls = document.querySelectorAll(AD_SELECTORS);
  const adsCount = adEls.length;

  let totalHidden = 0;
  let activeFilters = 0;

  if (isHideEliminatedEnabled) {
    totalHidden += eliminatedCount;
    activeFilters++;
  }
  if (isHideVisitedEnabled) {
    totalHidden += visitedCount;
    activeFilters++;
  }
  if (isHideRefurbishedEnabled) {
    totalHidden += refurbishedCount;
    activeFilters++;
  }
  if (isHideAdsEnabled) {
    totalHidden += adsCount;
    activeFilters++;
  }

  return {
    eliminatedCount,
    visitedCount,
    refurbishedCount,
    adsCount,
    totalHiddenCount: totalHidden,
    activeFilterCount: activeFilters,
  };
};

const updateHtmlClasses = () => {
  const root = document.documentElement;
  root.classList.toggle('sm-hide-eliminated', isHideEliminatedEnabled);
  root.classList.toggle('sm-hide-visited', isHideVisitedEnabled);
  root.classList.toggle('sm-hide-refurbished', isHideRefurbishedEnabled);
  root.classList.toggle('sm-hide-ads', isHideAdsEnabled);
};

export const closeListingFilterModal = () => {
  const modal = document.querySelector('.sm-filter-modal-backdrop');
  if (modal) modal.remove();
};

export const openListingFilterModal = () => {
  closeListingFilterModal();

  const backdrop = document.createElement('div');
  backdrop.className = 'sm-filter-modal-backdrop';

  const dialog = document.createElement('div');
  dialog.className = 'sm-filter-modal-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');

  const renderContent = () => {
    const currentStats = getListingFilterStats();
    dialog.innerHTML = `
      <div class="sm-filter-modal-header">
        <div class="sm-filter-modal-title-area">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.293V13.5a.5.5 0 0 1-.74.439l-2-1A.5.5 0 0 1 7 12.5V8.293L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
          <h3 class="sm-filter-modal-title">Listeden İlan Gizleme Seçenekleri</h3>
        </div>
        <button type="button" class="sm-filter-modal-close" title="Kapat">&times;</button>
      </div>

      <div class="sm-filter-modal-body">
        <p class="sm-filter-modal-intro">
          İşaretlediğiniz kategorilere ait satırlar arama listesinden gizlenir. Dilediğiniz zaman buradan veya eklenti penceresinden geri açabilirsiniz.
        </p>

        <!-- 1. Elenen İlanlar -->
        <div class="sm-filter-category-item ${isHideEliminatedEnabled ? 'sm-category-active' : ''}">
          <div class="sm-filter-category-content">
            <div class="sm-filter-category-header">
              <span class="sm-filter-category-title">Elenen İlanlar</span>
              <span class="sm-filter-category-badge">${currentStats.eliminatedCount} İlan</span>
            </div>
            <p class="sm-filter-category-desc">
              Listede veya detayda elemiş olduğunuz tüm ilanları arama sonuçlarından kaldırır.
            </p>
          </div>
          <label class="sm-filter-switch">
            <input type="checkbox" id="sm-toggle-hide-eliminated" ${isHideEliminatedEnabled ? 'checked' : ''}>
            <span class="sm-filter-slider"></span>
          </label>
        </div>

        <!-- 2. Ziyaret Edilen İlanlar -->
        <div class="sm-filter-category-item ${isHideVisitedEnabled ? 'sm-category-active' : ''}">
          <div class="sm-filter-category-content">
            <div class="sm-filter-category-header">
              <span class="sm-filter-category-title">Ziyaret Edilen İlanlar</span>
              <span class="sm-filter-category-badge">${currentStats.visitedCount} İlan</span>
            </div>
            <p class="sm-filter-category-desc">
              Daha önce detayını incelediğiniz ilanları sonuç listesinden kaldırarak sadece bakmadıklarınıza odaklanmanızı sağlar.
            </p>
          </div>
          <label class="sm-filter-switch">
            <input type="checkbox" id="sm-toggle-hide-visited" ${isHideVisitedEnabled ? 'checked' : ''}>
            <span class="sm-filter-slider"></span>
          </label>
        </div>

        <!-- 3. Yenilenmiş Cihazlar (Yepy) -->
        <div class="sm-filter-category-item ${isHideRefurbishedEnabled ? 'sm-category-active' : ''}">
          <div class="sm-filter-category-content">
            <div class="sm-filter-category-header">
              <span class="sm-filter-category-title">Yenilenmiş Ürünler (Yepy)</span>
              <span class="sm-filter-category-badge">${currentStats.refurbishedCount} Öğe</span>
            </div>
            <p class="sm-filter-category-desc">
              Arama sonuçlarında araya giren sponsorlu yenilenmiş cihaz (Yepy) satır ve kutularını gizler.
            </p>
          </div>
          <label class="sm-filter-switch">
            <input type="checkbox" id="sm-toggle-hide-refurbished" ${isHideRefurbishedEnabled ? 'checked' : ''}>
            <span class="sm-filter-slider"></span>
          </label>
        </div>

        <!-- 4. Reklam & Doping Satırları -->
        <div class="sm-filter-category-item ${isHideAdsEnabled ? 'sm-category-active' : ''}">
          <div class="sm-filter-category-content">
            <div class="sm-filter-category-header">
              <span class="sm-filter-category-title">Reklam & Doping Satırları</span>
              <span class="sm-filter-category-badge">${currentStats.adsCount} Öğe</span>
            </div>
            <p class="sm-filter-category-desc">
              Tablodaki native sponsorlu reklamları ve doping tanıtım satırlarını arama listesinden temizler.
            </p>
          </div>
          <label class="sm-filter-switch">
            <input type="checkbox" id="sm-toggle-hide-ads" ${isHideAdsEnabled ? 'checked' : ''}>
            <span class="sm-filter-slider"></span>
          </label>
        </div>
      </div>

      <div class="sm-filter-modal-footer">
        <span class="sm-filter-summary-text">
          Bu sayfada gizlenen: <strong>${currentStats.totalHiddenCount} öge</strong>
        </span>
        <div class="sm-filter-actions">
          <button type="button" class="sm-filter-btn-secondary" id="sm-filter-toggle-all">
            ${currentStats.activeFilterCount === 4 ? 'Tümünü Göster' : 'Tümünü Gizle'}
          </button>
          <button type="button" class="sm-filter-btn-primary" id="sm-filter-btn-ok">
            Tamam
          </button>
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    dialog
      .querySelector('.sm-filter-modal-close')
      ?.addEventListener('click', closeListingFilterModal);
    dialog.querySelector('#sm-filter-btn-ok')?.addEventListener('click', closeListingFilterModal);

    const chkEliminated = dialog.querySelector<HTMLInputElement>('#sm-toggle-hide-eliminated');
    chkEliminated?.addEventListener('change', async () => {
      isHideEliminatedEnabled = chkEliminated.checked;
      updateHtmlClasses();
      await storage.setItem('local:isHideEliminatedEnabled', isHideEliminatedEnabled);
      renderContent();
      handleListingFilterButton();
    });

    const chkVisited = dialog.querySelector<HTMLInputElement>('#sm-toggle-hide-visited');
    chkVisited?.addEventListener('change', async () => {
      isHideVisitedEnabled = chkVisited.checked;
      updateHtmlClasses();
      await storage.setItem('local:isHideVisitedEnabled', isHideVisitedEnabled);
      renderContent();
      handleListingFilterButton();
    });

    const chkRefurbished = dialog.querySelector<HTMLInputElement>('#sm-toggle-hide-refurbished');
    chkRefurbished?.addEventListener('change', async () => {
      isHideRefurbishedEnabled = chkRefurbished.checked;
      updateHtmlClasses();
      await storage.setItem('local:isHideRefurbishedEnabled', isHideRefurbishedEnabled);
      renderContent();
      handleListingFilterButton();
    });

    const chkAds = dialog.querySelector<HTMLInputElement>('#sm-toggle-hide-ads');
    chkAds?.addEventListener('change', async () => {
      isHideAdsEnabled = chkAds.checked;
      updateHtmlClasses();
      await storage.setItem('local:isHideAdsEnabled', isHideAdsEnabled);
      renderContent();
      handleListingFilterButton();
    });

    dialog.querySelector('#sm-filter-toggle-all')?.addEventListener('click', async () => {
      const stats = getListingFilterStats();
      const nextVal = stats.activeFilterCount < 4;
      isHideEliminatedEnabled = nextVal;
      isHideVisitedEnabled = nextVal;
      isHideRefurbishedEnabled = nextVal;
      isHideAdsEnabled = nextVal;
      updateHtmlClasses();
      await Promise.all([
        storage.setItem('local:isHideEliminatedEnabled', nextVal),
        storage.setItem('local:isHideVisitedEnabled', nextVal),
        storage.setItem('local:isHideRefurbishedEnabled', nextVal),
        storage.setItem('local:isHideAdsEnabled', nextVal),
      ]);
      renderContent();
      handleListingFilterButton();
    });
  };

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeListingFilterModal();
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeListingFilterModal();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  renderContent();
  backdrop.appendChild(dialog);
  document.body.appendChild(backdrop);
};

export const handleListingFilterButton = () => {
  const group = getOrCreateToolbarContainer();
  if (!group) return;

  let btn = group.querySelector<HTMLButtonElement>('.sm-listing-filter-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sm-listing-filter-btn';
    btn.innerHTML = `
      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.293V13.5a.5.5 0 0 1-.74.439l-2-1A.5.5 0 0 1 7 12.5V8.293L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
      </svg>
      <span class="sm-filter-text">İlanları Gizle</span>
      <span class="sm-filter-badge">0</span>
    `;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openListingFilterModal();
    });
  }

  // Toolbar içinde sıralı yerleşim: Ziyaret edilmemiş butonundan hemen sonra
  const openerBtn = group.querySelector('.sm-unvisited-opener-btn');
  if (openerBtn && openerBtn.nextElementSibling !== btn) {
    openerBtn.after(btn);
  } else if (!group.contains(btn)) {
    group.appendChild(btn);
  }

  // Buton rozeti ve durumunu güncelle
  const stats = getListingFilterStats();
  const badge = btn.querySelector<HTMLElement>('.sm-filter-badge');
  if (badge) {
    badge.textContent = stats.totalHiddenCount > 0 ? `${stats.totalHiddenCount} Gizli` : 'Filtrele';
    btn.classList.toggle('sm-has-active-filters', stats.activeFilterCount > 0);
    btn.title =
      stats.totalHiddenCount > 0
        ? `Bu sayfada ${stats.totalHiddenCount} öge gizleniyor (${stats.activeFilterCount} aktif kural). Ayarları düzenlemek için tıklayın.`
        : 'Arama listesinden elenen, ziyaret edilen veya sponsorlu ilanları gizleme penceresini açar.';
  }
};

export const initListingFilter = async () => {
  try {
    const [eliminatedPref, visitedPref, refurbishedPref, adsPref] = await Promise.all([
      storage.getItem<boolean>('local:isHideEliminatedEnabled'),
      storage.getItem<boolean>('local:isHideVisitedEnabled'),
      storage.getItem<boolean>('local:isHideRefurbishedEnabled'),
      storage.getItem<boolean>('local:isHideAdsEnabled'),
    ]);

    isHideEliminatedEnabled = eliminatedPref === true;
    isHideVisitedEnabled = visitedPref === true;
    isHideRefurbishedEnabled = refurbishedPref === true;
    isHideAdsEnabled = adsPref === true;

    updateHtmlClasses();

    storage.watch<boolean>('local:isHideEliminatedEnabled', (newVal) => {
      isHideEliminatedEnabled = newVal === true;
      updateHtmlClasses();
      handleListingFilterButton();
    });

    storage.watch<boolean>('local:isHideVisitedEnabled', (newVal) => {
      isHideVisitedEnabled = newVal === true;
      updateHtmlClasses();
      handleListingFilterButton();
    });

    storage.watch<boolean>('local:isHideRefurbishedEnabled', (newVal) => {
      isHideRefurbishedEnabled = newVal === true;
      updateHtmlClasses();
      handleListingFilterButton();
    });

    storage.watch<boolean>('local:isHideAdsEnabled', (newVal) => {
      isHideAdsEnabled = newVal === true;
      updateHtmlClasses();
      handleListingFilterButton();
    });
  } catch (err) {
    console.error('Sahibinden Manager: İlan filtreleme başlatılamadı', err);
  }
};
