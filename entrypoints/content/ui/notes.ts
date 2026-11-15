export interface ListingNote {
  adId: string;
  text: string;
  updatedAt: number;
  title?: string;
  url?: string;
}

let cachedNotes: Record<string, ListingNote> = {};

export const highlightListingNotes = (notes: Record<string, ListingNote>) => {
  if (!notes || Object.keys(notes).length === 0) return;

  // 1. Liste Görünümü (#searchResultsTable tr.searchResultsItem[data-id])
  const listRows = document.querySelectorAll<HTMLTableRowElement>(
    '#searchResultsTable tr.searchResultsItem[data-id]',
  );
  listRows.forEach((row) => {
    const id = row.getAttribute('data-id');
    if (id && notes[id]?.text?.trim()) {
      const titleLink = row.querySelector<HTMLAnchorElement>(
        'td.searchResultsTitleValue a.classifiedTitle',
      );
      if (titleLink && !titleLink.querySelector('.sm-note-badge')) {
        const badge = document.createElement('span');
        badge.className = 'sm-note-badge';
        badge.textContent = 'Not Var';
        const preview = notes[id].text.trim();
        badge.title = `Özel Not: ${preview.length > 100 ? `${preview.slice(0, 100)}...` : preview}`;
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
    if (id && notes[id]?.text?.trim()) {
      const titleLink = cell.querySelector<HTMLAnchorElement>('a.classifiedTitle');
      if (titleLink && !titleLink.querySelector('.sm-note-badge')) {
        const badge = document.createElement('span');
        badge.className = 'sm-note-badge';
        badge.textContent = 'Not Var';
        const preview = notes[id].text.trim();
        badge.title = `Özel Not: ${preview.length > 100 ? `${preview.slice(0, 100)}...` : preview}`;
        titleLink.prepend(badge);
      }
    }
  });
};

export const openNotesModal = (
  adId: string,
  title: string,
  url: string,
  onSaveCallback: () => void,
) => {
  if (document.querySelector('.sm-notes-modal-overlay')) return;

  const currentNote = cachedNotes[adId]?.text || '';

  const overlay = document.createElement('div');
  overlay.className = 'sm-notes-modal-overlay';

  overlay.innerHTML = `
    <div class="sm-notes-modal" role="dialog" aria-modal="true">
      <div class="sm-notes-header">
        <h3>İlana Özel Not (#${adId})</h3>
        <button type="button" class="sm-notes-close-btn" aria-label="Kapat">&times;</button>
      </div>
      <div class="sm-notes-body">
        <textarea 
          class="sm-notes-textarea" 
          placeholder="Bu ilanla ilgili kişisel notlarınızı buraya yazabilirsiniz (örn. satıcıyla görüşme, son teklif, ekspertiz randevusu)..."
        >${currentNote}</textarea>
      </div>
      <div class="sm-notes-footer">
        <span class="sm-notes-status">${currentNote ? 'Kayıtlı not mevcut' : 'Not yazılmadı'}</span>
        <div class="sm-notes-actions">
          ${currentNote ? '<button type="button" class="sm-notes-btn sm-notes-btn-delete">Notu Sil</button>' : ''}
          <button type="button" class="sm-notes-btn sm-notes-btn-save">Kaydet</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const textarea = overlay.querySelector<HTMLTextAreaElement>('.sm-notes-textarea')!;
  const saveBtn = overlay.querySelector<HTMLButtonElement>('.sm-notes-btn-save')!;
  const deleteBtn = overlay.querySelector<HTMLButtonElement>('.sm-notes-btn-delete');
  const closeBtn = overlay.querySelector<HTMLButtonElement>('.sm-notes-close-btn')!;

  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);

  const closeModal = () => {
    overlay.remove();
  };

  closeBtn.onclick = closeModal;
  overlay.onclick = (e) => {
    if (e.target === overlay) closeModal();
  };

  const handleSave = async () => {
    const text = textarea.value.trim();
    if (text) {
      cachedNotes[adId] = {
        adId,
        text,
        title,
        url,
        updatedAt: Date.now(),
      };
    } else {
      delete cachedNotes[adId];
    }
    await storage.setItem('local:listing-notes', cachedNotes);
    onSaveCallback();
    closeModal();
  };

  saveBtn.onclick = handleSave;

  textarea.onkeydown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  if (deleteBtn) {
    deleteBtn.onclick = async () => {
      delete cachedNotes[adId];
      await storage.setItem('local:listing-notes', cachedNotes);
      onSaveCallback();
      closeModal();
    };
  }
};

export const setupDetailNotes = (adId: string, title: string, url: string) => {
  if (document.querySelector('.sm-notes-fab')) return;

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'sm-notes-fab';

  const updateFab = () => {
    const hasNote = Boolean(cachedNotes[adId]?.text?.trim());
    fab.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
      <span>Özel Not</span>
      ${hasNote ? '<span class="sm-notes-fab-badge" title="Bu ilanda notunuz var"></span>' : ''}
    `;
  };

  updateFab();

  fab.onclick = () => {
    openNotesModal(adId, title, url, updateFab);
  };

  document.body.appendChild(fab);
};

export const initNotesMode = async (
  currentAdId: string | null,
  currentTitle: string,
  currentUrl: string,
) => {
  try {
    cachedNotes = (await storage.getItem<Record<string, ListingNote>>('local:listing-notes')) || {};

    if (currentAdId) {
      setupDetailNotes(currentAdId, currentTitle, currentUrl);
    }

    highlightListingNotes(cachedNotes);

    storage.watch<Record<string, ListingNote>>('local:listing-notes', (newVal) => {
      cachedNotes = newVal || {};
      if (!newVal || Object.keys(newVal).length === 0) {
        document.querySelectorAll('.sm-note-badge').forEach((el) => el.remove());
      } else {
        highlightListingNotes(cachedNotes);
      }
    });
  } catch (err) {
    console.error('Sahibinden Manager: Notlar başlatılamadı', err);
  }
};

export const applyNotesToListings = () => {
  if (cachedNotes && Object.keys(cachedNotes).length > 0) {
    highlightListingNotes(cachedNotes);
  }
};
