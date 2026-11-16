// WXT tarafından sağlanan global 'storage' kullanılıyor

let cachedIgnoredIds: Record<string, boolean> = {};

export const extractRefurbishedId = (card: HTMLElement): string | null => {
  const templateId = card.getAttribute('data-template-id');
  if (templateId) return templateId.trim();

  const dataId = card.getAttribute('data-id');
  if (dataId) return dataId.trim();

  const link = card.querySelector<HTMLAnchorElement>(
    'a.refurbishment-classified-url, a[href*="/yepy/"], a[href*="/ilan/"]',
  );
  if (link?.pathname) {
    const match = link.pathname.match(/(\d+)(\/detay)?$/);
    if (match && match[1]) return match[1];

    const parts = link.pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart !== 'detay') return lastPart;
    if (parts.length > 1) return parts[parts.length - 2];
  }

  return null;
};

export const applyRefurbishedIgnore = () => {
  const cards = document.querySelectorAll<HTMLElement>(
    '.refurbishment-content-box, [data-refurbishment-product], #searchResultsTable tr.searchResultsItem:has(.refurbishment), #searchResultsTable tr.searchResultsItem:has(.refurbishment-classified-url)',
  );

  cards.forEach((card) => {
    const id = extractRefurbishedId(card);
    if (!id) return;

    const targetRowOrLi = card.tagName === 'TR' ? card : card.closest('li') || card;

    // Eğer kullanıcı bu ürünü daha önce gizlediyse
    if (cachedIgnoredIds[id]) {
      if (!targetRowOrLi.classList.contains('sm-refurbished-ignored')) {
        targetRowOrLi.classList.add('sm-refurbished-ignored');
      }
      return;
    }

    // Kart veya tablo satırı üzerine tekil gizle butonu ekle
    if (!card.querySelector('.sm-refurbished-ignore-btn')) {
      const btn = document.createElement('div');
      btn.className = 'sm-refurbished-ignore-btn';
      btn.title = 'Bu yenilenmiş ürünü gizle';
      btn.innerHTML = '&times;';

      btn.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        cachedIgnoredIds[id] = true;
        targetRowOrLi.classList.add('sm-refurbished-ignored');
        try {
          await storage.setItem('local:ignored-refurbished-ids', cachedIgnoredIds);
        } catch (err) {
          console.error('Sahibinden Manager: Yenilenmiş ürün gizlenemedi', err);
        }
      };

      if (card.tagName === 'TR') {
        const titleCell = card.querySelector('.searchResultsTitleValue') || card.children[1];
        if (titleCell) {
          titleCell.appendChild(btn);
        } else {
          card.appendChild(btn);
        }
      } else {
        card.appendChild(btn);
      }
    }
  });
};

export const initRefurbishedMode = async () => {
  try {
    // 1. Toplu gizleme ayarını oku (Varsayılan: kapalı / false)
    const isHideAllEnabled = await storage.getItem<boolean>('local:isHideRefurbishedEnabled');
    if (isHideAllEnabled === true) {
      document.documentElement.classList.add('sm-hide-refurbished');
    } else {
      document.documentElement.classList.remove('sm-hide-refurbished');
    }

    // Toplu ayar değişimini izle
    storage.watch<boolean>('local:isHideRefurbishedEnabled', (newVal) => {
      if (newVal === true) {
        document.documentElement.classList.add('sm-hide-refurbished');
      } else {
        document.documentElement.classList.remove('sm-hide-refurbished');
      }
    });

    // 2. Tekil gizlenen ID'leri oku
    cachedIgnoredIds =
      (await storage.getItem<Record<string, boolean>>('local:ignored-refurbished-ids')) || {};

    applyRefurbishedIgnore();

    // Tekil gizlenenler değişimini izle
    storage.watch<Record<string, boolean>>('local:ignored-refurbished-ids', (newVal) => {
      cachedIgnoredIds = newVal || {};
      if (!newVal || Object.keys(newVal).length === 0) {
        document.querySelectorAll('.sm-refurbished-ignored').forEach((el) => {
          el.classList.remove('sm-refurbished-ignored');
        });
      } else {
        applyRefurbishedIgnore();
      }
    });
  } catch (err) {
    console.error('Sahibinden Manager: Yenilenmiş ürün filtresi başlatılamadı', err);
  }
};
