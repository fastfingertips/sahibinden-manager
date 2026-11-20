import { COPY_ICON_SVG, CHECK_ICON_SVG } from './ui/descriptionCopy';
import { copyToClipboard } from '@/utils/clipboard';

// WXT tarafından sağlanan global 'storage' kullanılıyor

export interface ListingCommentItem {
  id: string;
  adId: string;
  text: string;
  createdAt: number;
  author?: string;
  title?: string;
  url?: string;
}

let isAutoExpandQnAEnabled = true;
let activeAdContext: { adId: string; title: string; url: string } | null = null;

export const logListingComment = async (
  adId: string,
  commentId: string,
  text: string,
  createdAt: number = Date.now(),
  author?: string,
  title?: string,
  url?: string,
): Promise<void> => {
  if (!adId || !text.trim()) return;
  try {
    const comments =
      (await storage.getItem<Record<string, ListingCommentItem>>('local:listing-comments')) || {};
    const existing = comments[adId];
    if (
      existing &&
      existing.text === text.trim() &&
      existing.author === (author || existing.author) &&
      existing.id === commentId
    ) {
      return;
    }
    comments[adId] = {
      id: commentId,
      adId,
      text: text.trim(),
      createdAt: existing?.createdAt || createdAt,
      author: author || existing?.author,
      title: title || existing?.title,
      url: url || existing?.url,
    };
    await storage.setItem('local:listing-comments', comments);
  } catch (err) {
    console.error('Sahibinden Manager: Yorum kaydedilemedi', err);
  }
};

export const removeListingComment = async (adId: string): Promise<void> => {
  if (!adId) return;
  try {
    const comments =
      (await storage.getItem<Record<string, ListingCommentItem>>('local:listing-comments')) || {};
    if (comments[adId]) {
      delete comments[adId];
      await storage.setItem('local:listing-comments', comments);
    }
  } catch (err) {
    console.error('Sahibinden Manager: Yorum silinemedi', err);
  }
};

/**
 * Sayfadaki mevcut soru ve cevaplar arasında oturum açmış kullanıcının sorduğu soruları tespit edip loglar.
 * Sahibinden, oturum açmış kullanıcının sorduğu sorularda container-thread-actions öğesine
 * data-operation-abilities="... QUESTION_DELETABLE ..." ekler ve .container-comment-operations
 * menüsünü görünür yapar. Başkalarının sorularında bu alan boştur (data-operation-abilities="")
 * ve işlem menüsü display:none durumundadır.
 */
export const detectUserQuestions = (adId: string, title?: string, url?: string): void => {
  if (!adId) return;
  const userActionContainers = document.querySelectorAll(
    '.thread-item .container-thread-actions[data-operation-abilities*="QUESTION_DELETABLE"]',
  );

  let foundUserQuestion = false;

  userActionContainers.forEach((actionContainer) => {
    const thread = actionContainer.closest('.thread-item');
    if (!thread) return;

    const qId = thread.getAttribute('data-question-id') || `q_${Date.now()}`;
    const questionEl = thread.querySelector(
      '.container-comment-item.type-question, .comment-item.asker',
    );
    const text = questionEl?.querySelector('.comment-text')?.textContent?.trim() || '';
    if (!text) return;

    const author = questionEl?.querySelector('.name-surname')?.textContent?.trim();
    const dateEl = questionEl?.querySelector('.comment-date');
    const dateTitle = dateEl?.getAttribute('title')?.trim();
    let createdAt = Date.now();
    if (dateTitle) {
      const parsed = Date.parse(dateTitle);
      if (!isNaN(parsed)) createdAt = parsed;
    }

    foundUserQuestion = true;
    logListingComment(adId, qId, text, createdAt, author, title, url);
  });

  // Eğer sayfada soru listesi yüklüyse (.cqa-list) fakat kullanıcının kendi sorusu yoksa
  // ve önceden başkasının sorusu hatalı kaydedilmişse, ilandaki kayıt temizlenir.
  const cqaList = document.querySelector('.cqa-list, .container-cqa');
  if (!foundUserQuestion && cqaList && cqaList.querySelectorAll('.thread-item').length > 0) {
    const input = cqaList.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      'input[placeholder*="soru sor"], textarea[placeholder*="soru sor"], input[name="questionText"]',
    );
    if (!input?.value.trim()) {
      removeListingComment(adId);
    }
  }
};

/**
 * Kullanıcının Soru-Cevap kutusundan yeni soru göndermesini dinler ve otomatik kaydeder.
 */
export const setupCommentFormListener = (adId: string, title?: string, url?: string): void => {
  if (!adId) return;

  const section =
    document.getElementById('soru') ||
    document.querySelector('.classified-question-answer') ||
    document.querySelector('#soru-cevap') ||
    document.querySelector('.container-cqa');
  if (!section) return;

  if (section.getAttribute('data-sm-listener-attached') === 'true') return;
  section.setAttribute('data-sm-listener-attached', 'true');

  // Gönder butonu ve input alanlarını dinle
  const handleSubmission = () => {
    const input = section.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      'input[placeholder*="soru sor"], textarea[placeholder*="soru sor"], input[name="questionText"], .cqa-input, input[type="text"]',
    );
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    const qId = `q_${Date.now()}`;
    logListingComment(adId, qId, text, Date.now(), undefined, title, url);
  };

  section.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement;
      // Gönder butonuna tıklandığında
      const sendBtn = target.closest(
        'button.btn-primary, button[type="submit"], button.cqa-send-btn, .container-cqa button',
      );
      if (
        sendBtn &&
        !sendBtn.classList.contains('show-all-answers') &&
        !sendBtn.classList.contains('show-publication-criteria') &&
        !sendBtn.classList.contains('sm-copy-cqa-btn')
      ) {
        handleSubmission();
      }

      // Kullanıcı sorusunu sildiğinde
      const deleteBtn = target.closest(
        'button[value="DELETE_QUESTION"], .popup-operation[value="DELETE_QUESTION"]',
      );
      if (deleteBtn) {
        removeListingComment(adId);
      }
    },
    true,
  );

  section.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Enter') {
        const target = e.target as HTMLElement;
        if (target.matches('input, textarea')) {
          handleSubmission();
        }
      }
    },
    true,
  );
};

export const initQnAMode = async (
  currentAdId?: string | null,
  currentTitle?: string,
  currentUrl?: string,
) => {
  if (currentAdId) {
    activeAdContext = {
      adId: currentAdId,
      title: currentTitle || 'İlan',
      url: currentUrl || window.location.href,
    };
  }

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

    if (activeAdContext) {
      detectUserQuestions(activeAdContext.adId, activeAdContext.title, activeAdContext.url);
      setupCommentFormListener(activeAdContext.adId, activeAdContext.title, activeAdContext.url);
    }
  } catch (err) {
    console.error('Sahibinden Manager: Soru-Cevap modu başlatılamadı', err);
  }
};

export const handleDetectUserComments = () => {
  if (activeAdContext) {
    detectUserQuestions(activeAdContext.adId, activeAdContext.title, activeAdContext.url);
    setupCommentFormListener(activeAdContext.adId, activeAdContext.title, activeAdContext.url);
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
