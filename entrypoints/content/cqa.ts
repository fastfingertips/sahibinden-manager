import { COPY_ICON_SVG, CHECK_ICON_SVG } from './ui/descriptionCopy';
import { copyToClipboard } from '@/utils/clipboard';

// WXT tarafından sağlanan global 'storage' kullanılıyor

let isAutoExpandQnAEnabled = true;

export const initQnAMode = async () => {
  try {
    const saved = await storage.getItem<boolean>('local:isAutoExpandQnAEnabled');
    if (saved !== null && saved !== undefined) {
      isAutoExpandQnAEnabled = saved !== false;
    }

    storage.watch<boolean>('local:isAutoExpandQnAEnabled', (newVal) => {
      isAutoExpandQnAEnabled = newVal !== false;
      if (isAutoExpandQnAEnabled) {
        handleAutoExpandQnA();
      }
    });
  } catch (err) {
    console.error('Sahibinden Manager: Soru-Cevap modu başlatılamadı', err);
  }
};

export const handleAutoExpandQnA = () => {
  if (!isAutoExpandQnAEnabled) return;

  const buttons = document.querySelectorAll<HTMLElement>(
    'section.classified-question-answer .show-all-answers:not(.disable), .cqa-list .show-all-answers:not(.disable)',
  );

  buttons.forEach((btn) => {
    if (btn.dataset.smExpanded === 'true') return;
    btn.dataset.smExpanded = 'true';
    try {
      btn.click();
    } catch (err) {
      console.warn('Sahibinden Manager: Soru-cevap genişletilemedi', err);
    }
  });
};

/**
 * Sayfadaki tüm soru ve cevapları yapılandırılmış Markdown formatında derler.
 */
export const extractQnAData = (): string => {
  const cqaContainer = document.querySelector('#soru-cevap, .container-cqa');
  if (!cqaContainer) return '';

  const threads = Array.from(cqaContainer.querySelectorAll('.thread-item'));
  if (threads.length === 0) return '';

  const results: string[] = [];

  threads.forEach((thread, index) => {
    const questionEl = thread.querySelector(
      '.container-comment-item.type-question, .comment-item.asker',
    );
    if (!questionEl) return;

    const askerName =
      questionEl.querySelector('.name-surname')?.textContent?.trim() || 'Soru Sahibi';
    const questionText = questionEl.querySelector('.comment-text')?.textContent?.trim() || '';
    const questionDateEl = questionEl.querySelector('.comment-date');
    const questionDate =
      questionDateEl?.getAttribute('title')?.trim() || questionDateEl?.textContent?.trim() || '';

    if (!questionText) return;

    const threadParts: string[] = [];
    threadParts.push(
      `**Soru ${index + 1} (${askerName}${questionDate ? ` · ${questionDate}` : ''}):**\n${questionText}`,
    );

    const answers = Array.from(
      thread.querySelectorAll('.container-comment-item.type-answer, .comment-item.owner'),
    );
    answers.forEach((ansEl) => {
      const answererName = ansEl.querySelector('.name-surname')?.textContent?.trim() || 'Satıcı';
      const answerText = ansEl.querySelector('.comment-text')?.textContent?.trim() || '';
      const answerDateEl = ansEl.querySelector('.comment-date');
      const answerDate =
        answerDateEl?.getAttribute('title')?.trim() || answerDateEl?.textContent?.trim() || '';

      if (answerText) {
        threadParts.push(
          `**Cevap (${answererName}${answerDate ? ` · ${answerDate}` : ''}):**\n${answerText}`,
        );
      }
    });

    results.push(threadParts.join('\n\n'));
  });

  return results.join('\n\n---\n\n');
};

/**
 * Soru-Cevap başlık çubuğuna 'Soru-Cevapları Kopyala' butonunu ekler.
 */
export const handleQnACopyButton = () => {
  const cqaSection =
    document.getElementById('soru') ||
    document.querySelector('.classified-question-answer') ||
    document.querySelector('.ref-cqa-tab-classified-detail');
  if (!cqaSection) return;

  const box = cqaSection.querySelector('.uiBox') || cqaSection;
  const boxTitle = box.querySelector<HTMLElement>('.uiBoxTitle');
  if (!boxTitle) return;

  if (boxTitle.querySelector('.sm-copy-cqa-btn')) return;

  boxTitle.classList.add('sm-title-flex');

  const actions = document.createElement('div');
  actions.className = 'sm-cqa-actions';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sm-copy-cqa-btn';
  btn.title = 'Tüm soru ve cevapları panoya kopyala';
  btn.innerHTML = `
    ${COPY_ICON_SVG}
    <span>Soru-Cevapları Kopyala</span>
  `;

  let resetTimer: ReturnType<typeof setTimeout> | null = null;

  btn.onclick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Varsa gizli yanıtları da hemen genişlet
    handleAutoExpandQnA();

    const qnaText = extractQnAData();
    const textToCopy = qnaText || 'Bu ilan için henüz soru-cevap bulunmuyor.';

    const ok = await copyToClipboard(textToCopy);
    if (!ok) return;

    btn.classList.add('copied');
    btn.innerHTML = `
      ${CHECK_ICON_SVG}
      <span>${qnaText ? 'Kopyalandı!' : 'Soru Yok!'}</span>
    `;

    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `
        ${COPY_ICON_SVG}
        <span>Soru-Cevapları Kopyala</span>
      `;
    }, 2000);
  };

  actions.appendChild(btn);

  const criteriaContainer = boxTitle.querySelector('.container-publish-criteria');
  const collapseBtn = boxTitle.querySelector('.boxShowHide');

  if (criteriaContainer) {
    boxTitle.insertBefore(actions, criteriaContainer);
  } else if (collapseBtn) {
    boxTitle.insertBefore(actions, collapseBtn);
  } else {
    boxTitle.appendChild(actions);
  }
};
