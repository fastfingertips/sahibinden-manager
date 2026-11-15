export interface ListingNote {
  adId: string;
  text: string;
  updatedAt: number;
  title?: string;
  url?: string;
}

let cachedNotes: Record<string, ListingNote> = {};
let activeListingContext: { adId: string; title: string; url: string } | null = null;

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

export const setupDetailNotes = (adId: string, title: string, url: string) => {
  const eventsList = document.querySelector<HTMLUListElement>(
    'div.classifiedDetailTitle ul.classifiedEvents, ul.classifiedEvents',
  );
  if (!eventsList) return;

  if (eventsList.querySelector('.sm-classified-note-action')) {
    updateNoteLinkState(eventsList.querySelector('.sm-classified-note-action')!, adId);
    return;
  }

  const li = document.createElement('li');
  li.className = 'sm-classified-note-action';

  const link = document.createElement('a');
  link.href = '#';
  link.setAttribute('rel', 'nofollow');
  link.className = 'sm-classified-note-link';

  li.appendChild(link);
  eventsList.insertBefore(li, eventsList.firstChild);

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

    const currentNote = cachedNotes[adId]?.text || '';

    dropdown = document.createElement('div');
    dropdown.className = 'sm-note-dropdown';
    dropdown.innerHTML = `
      <div class="sm-note-dropdown-header">
        <span class="sm-note-dropdown-title">İlana Özel Not (#${adId})</span>
        <button type="button" class="sm-note-dropdown-close" aria-label="Kapat">&times;</button>
      </div>
      <div class="sm-note-dropdown-body">
        <textarea 
          class="sm-note-dropdown-textarea" 
          placeholder="Bu ilana özel notlarınızı buraya yazabilirsiniz (örn. son teklif, satıcı görüşmesi, randevu)..."
        >${currentNote}</textarea>
      </div>
      <div class="sm-note-dropdown-footer">
        <span class="sm-note-dropdown-status">${currentNote ? 'Kayıtlı not var' : 'Henüz not yok'}</span>
        <div class="sm-note-dropdown-actions">
          ${currentNote ? '<button type="button" class="sm-note-btn sm-note-btn-delete">Sil</button>' : ''}
          <button type="button" class="sm-note-btn sm-note-btn-save">Kaydet</button>
        </div>
      </div>
    `;

    li.appendChild(dropdown);

    const textarea = dropdown.querySelector<HTMLTextAreaElement>('.sm-note-dropdown-textarea')!;
    const closeBtn = dropdown.querySelector<HTMLButtonElement>('.sm-note-dropdown-close')!;
    const saveBtn = dropdown.querySelector<HTMLButtonElement>('.sm-note-btn-save')!;
    const deleteBtn = dropdown.querySelector<HTMLButtonElement>('.sm-note-btn-delete');

    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeDropdown();
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
      delete link.dataset.hasNote;
      updateNoteLinkState(li, adId);
      closeDropdown();
    };

    saveBtn.onclick = (e) => {
      e.stopPropagation();
      handleSave();
    };

    if (deleteBtn) {
      deleteBtn.onclick = async (e) => {
        e.stopPropagation();
        delete cachedNotes[adId];
        await storage.setItem('local:listing-notes', cachedNotes);
        delete link.dataset.hasNote;
        updateNoteLinkState(li, adId);
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

  updateNoteLinkState(li, adId);
};

const updateNoteLinkState = (li: Element, adId: string) => {
  const link = li.querySelector<HTMLAnchorElement>('.sm-classified-note-link');
  if (!link) return;

  const note = cachedNotes[adId];
  const hasNote = Boolean(note?.text?.trim());

  // Durum zaten güncelse tekrar DOM mutasyonu yapma (Sonsuz observer döngüsünü önler)
  if (link.dataset.hasNote === String(hasNote) && link.querySelector('.sm-classified-note-icon')) {
    return;
  }
  link.dataset.hasNote = String(hasNote);
  link.classList.toggle('has-note', hasNote);

  link.innerHTML = `
    <svg class="sm-classified-note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
    <span>${hasNote ? 'Notu Düzenle' : 'Not Al'}</span>
    ${hasNote ? '<span class="sm-classified-note-dot" title="Kayıtlı not mevcut"></span>' : ''}
  `;

  if (hasNote && note) {
    const preview = note.text.trim();
    link.title = `Özel Not: ${preview.length > 80 ? `${preview.slice(0, 80)}...` : preview}`;
  } else {
    link.title = 'Bu ilana özel not ekle';
  }
};

export const initNotesMode = async (
  currentAdId: string | null,
  currentTitle: string,
  currentUrl: string,
) => {
  try {
    // Eski FAB ve modal kalıntılarını temizle
    document
      .querySelectorAll('.sm-notes-fab, .sm-notes-modal-overlay')
      .forEach((el) => el.remove());

    cachedNotes = (await storage.getItem<Record<string, ListingNote>>('local:listing-notes')) || {};

    if (currentAdId) {
      activeListingContext = { adId: currentAdId, title: currentTitle, url: currentUrl };
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
      if (activeListingContext) {
        const action = document.querySelector('.sm-classified-note-action');
        if (action) {
          const lk = action.querySelector<HTMLAnchorElement>('.sm-classified-note-link');
          if (lk) delete lk.dataset.hasNote;
          updateNoteLinkState(action, activeListingContext.adId);
        }
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
  if (activeListingContext) {
    setupDetailNotes(
      activeListingContext.adId,
      activeListingContext.title,
      activeListingContext.url,
    );
  }
};
