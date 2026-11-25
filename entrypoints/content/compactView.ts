// WXT tarafından sağlanan global 'storage' kullanılıyor
import { showToast } from './unvisitedOpener';
import { getOrCreateToolbarContainer } from './ui/toolbar';

export type CompactViewMode = 'normal' | 'mini' | 'hidden';

let currentCompactMode: CompactViewMode = 'normal';

export const applyCompactViewClass = (mode: CompactViewMode) => {
  const root = document.documentElement;
  root.classList.toggle('sm-compact-mini', mode === 'mini');
  root.classList.toggle('sm-compact-hidden', mode === 'hidden');
};

export const setCompactViewMode = async (mode: CompactViewMode, notify = true) => {
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
  const group = getOrCreateToolbarContainer();
  if (!group) return;

  let btn = group.querySelector<HTMLButtonElement>('.sm-compact-toggle-btn');
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

  // Toolbar içinde sıralı yerleşim: En sağdaki buton
  if (!group.contains(btn)) {
    group.appendChild(btn);
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
