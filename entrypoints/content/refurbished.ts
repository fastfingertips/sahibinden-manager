// WXT tarafından sağlanan global 'storage' kullanılıyor

let cachedIgnoredIds: Record<string, boolean> = {};

export const extractRefurbishedId = (card: HTMLElement): string | null => {
  const templateId = card.getAttribute('data-template-id');
  if (templateId) return templateId.trim();

  const link = card.querySelector<HTMLAnchorElement>('a.refurbishment-classified-url');
  if (link?.pathname) {
    const parts = link.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || null;
  }

  return null;
};

export const applyRefurbishedIgnore = () => {
  const cards = document.querySelectorAll<HTMLElement>(
    '.refurbishment-content-box, [data-refurbishment-product]',
  );

  cards.forEach((card) => {
    const id = extractRefurbishedId(card);
    if (!id) return;

    const parentLi = card.closest('li') || card;

    // Eğer kullanıcı bu ürünü daha önce gizlediyse
    if (cachedIgnoredIds[id]) {
      if (!parentLi.classList.contains('sm-refurbished-ignored')) {
        parentLi.classList.add('sm-refurbished-ignored');
      }
      return;
    }

    // Kart üzerine tekil gizle butonu ekle
    if (!card.querySelector('.sm-refurbished-ignore-btn')) {
      const btn = document.createElement('div');
      btn.className = 'sm-refurbished-ignore-btn';
      btn.title = 'Bu yenilenmiş ürünü gizle';
      btn.innerHTML = '&times;';

      btn.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        cachedIgnoredIds[id] = true;
        parentLi.classList.add('sm-refurbished-ignored');
        try {
          await storage.setItem('local:ignored-refurbished-ids', cachedIgnoredIds);
        } catch (err) {
          console.error('Sahibinden Manager: Yenilenmiş ürün gizlenemedi', err);
        }
      };

      card.appendChild(btn);
    }
  });
};

export const initRefurbishedMode = async () => {
  try {
    // 1. Toplu gizleme ayarını oku
    const isHideAllEnabled = await storage.getItem<boolean>('local:isHideRefurbishedEnabled');
    if (isHideAllEnabled) {
      document.documentElement.classList.add('sm-hide-refurbished');
    }

    // Toplu ayar değişimini izle
    storage.watch<boolean>('local:isHideRefurbishedEnabled', (newVal) => {
      if (newVal) {
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
