const COPY_ICON_SVG = `
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
`;

const CHECK_ICON_SVG = `
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`;

export const handleDescriptionCopyButton = () => {
  const descContainer = document.getElementById('classifiedDescription');
  if (!descContainer) return;

  const box = descContainer.closest('.uiBox') || descContainer.parentElement;
  if (!box) return;

  const boxTitle = box.querySelector<HTMLElement>('.uiBoxTitle');
  if (!boxTitle) return;

  if (boxTitle.querySelector('.sm-copy-description-btn')) return;

  boxTitle.classList.add('sm-title-flex');

  const actions = document.createElement('div');
  actions.className = 'sm-description-actions';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sm-copy-description-btn';
  btn.title = 'İlan açıklamasını panoya kopyala';
  btn.innerHTML = `
    ${COPY_ICON_SVG}
    <span>Açıklamayı Kopyala</span>
  `;

  let resetTimer: ReturnType<typeof setTimeout> | null = null;

  btn.onclick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const textToCopy = descContainer.innerText?.trim() || descContainer.textContent?.trim() || '';
    if (!textToCopy) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      btn.classList.add('copied');
      btn.innerHTML = `
        ${CHECK_ICON_SVG}
        <span>Kopyalandı!</span>
      `;

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = `
          ${COPY_ICON_SVG}
          <span>Açıklamayı Kopyala</span>
        `;
      }, 2000);
    } catch (err) {
      console.error('Sahibinden Manager: Açıklama kopyalanamadı', err);
    }
  };

  actions.appendChild(btn);

  const collapseBtn = boxTitle.querySelector('.boxShowHide');
  if (collapseBtn) {
    boxTitle.insertBefore(actions, collapseBtn);
  } else {
    boxTitle.appendChild(actions);
  }
};
