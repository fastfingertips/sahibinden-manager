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
