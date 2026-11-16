const COPY_ICON_SVG = `
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm-copy-all-icon">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
`;

const CHECK_ICON_SVG = `
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="sm-copy-all-icon" style="color: #107c10;">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`;

/**
 * Sahibinden ilan detay sayfasındaki tüm yapılandırılmış verileri
 * (Emlak, Vasıta, İkinci El, vb. tüm kategoriler uyumlu)
 * yapay zeka ve karşılaştırma araçlarına uygun Markdown formatında derler.
 */
export const extractClassifiedFullData = (): string => {
  const lines: string[] = [];

  // 1. İlan Başlığı
  const titleEl = document.querySelector<HTMLElement>('.classifiedDetailTitle h1');
  const title =
    titleEl?.innerText?.trim() ||
    titleEl?.textContent?.trim() ||
    document.title.replace(/\s*-\s*\d+$/, '').trim() ||
    'İlan';
  lines.push(`# ${title}`);
  lines.push('');

  // 2. Fiyat
  const priceEl = document.querySelector<HTMLElement>(
    '.classified-price-container span, .classified-price-container, .classifiedInfo h3, .classifiedPrice',
  );
  const price = priceEl?.innerText?.trim() || priceEl?.textContent?.trim();
  if (price) {
    lines.push(`- **Fiyat:** ${price}`);
  }

  // 3. Konum
  const locationEl = document.querySelector<HTMLElement>('.classifiedDetailTitle h2');
  const location = locationEl?.innerText?.trim() || locationEl?.textContent?.trim();
  if (location) {
    // İç içe fazla boşlukları temizle
    const cleanLocation = location.replace(/\s+/g, ' ');
    lines.push(`- **Konum:** ${cleanLocation}`);
  }

  // 4. Kategori Hiyerarşisi
  const breadcrumbLinks = Array.from(
    document.querySelectorAll<HTMLElement>(
      '.classifiedDetailTitle ul.breadcrumb li a, ul.breadcrumb li a',
    ),
  );
  if (breadcrumbLinks.length > 0) {
    const categoryPath = breadcrumbLinks
      .map((a) => (a.innerText || a.textContent || '').trim())
      .filter(Boolean)
      .join(' > ');
    if (categoryPath) {
      lines.push(`- **Kategori:** ${categoryPath}`);
    }
  }

  // 5. İlan No ve Bağlantı
  const idInput = (document.getElementById('classifiedIdValue') ||
    document.getElementById('classifiedId')) as HTMLInputElement | null;
  const adId = idInput?.value?.trim() || window.location.pathname.match(/-(\d+)(\/detay)?/)?.[1];
  if (adId) {
    lines.push(`- **İlan No:** ${adId}`);
  }
  lines.push(`- **Bağlantı:** ${window.location.href}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // 6. İlan Bilgileri / Özellik Tablosu (.classifiedInfoList)
  const infoItems = Array.from(
    document.querySelectorAll<HTMLElement>('.classifiedInfoList li, ul.classifiedInfoList li'),
  );
  const attributes: string[] = [];
  infoItems.forEach((li) => {
    const labelEl = li.querySelector<HTMLElement>('strong, label');
    const valueEl = li.querySelector<HTMLElement>('span, a');
    if (!labelEl) return;

    const label = (labelEl.innerText || labelEl.textContent || '')
      .replace(/:$/, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Değer içindeki gizli input vb. temizle
    let value: string;
    if (valueEl) {
      value = (valueEl.innerText || valueEl.textContent || '').replace(/\s+/g, ' ').trim();
    } else {
      // span yoksa doğrudan li içindeki strong harici metni al
      const cloned = li.cloneNode(true) as HTMLElement;
      cloned.querySelectorAll('strong, label, script, style').forEach((n) => n.remove());
      value = (cloned.innerText || cloned.textContent || '').replace(/\s+/g, ' ').trim();
    }

    if (label && value) {
      attributes.push(`- **${label}:** ${value}`);
    }
  });

  if (attributes.length > 0) {
    lines.push('### İlan Bilgileri');
    lines.push(...attributes);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // 7. Satıcı Bilgileri
  const sellerEl = document.querySelector<HTMLElement>(
    '.user-info-module .username, .classifiedUserName, .seller-info .username, .user-info .username',
  );
  const sellerRegEl = document.querySelector<HTMLElement>(
    '.user-info-module .user-registration-date, .userRegistrationDate, .registration-date',
  );
  const storeNameEl = document.querySelector<HTMLElement>('.store-name, .store-title');

  const sellerParts: string[] = [];
  if (sellerEl) {
    const sName = (sellerEl.innerText || sellerEl.textContent || '').replace(/\s+/g, ' ').trim();
    if (sName) sellerParts.push(`- **Satıcı:** ${sName}`);
  }
  if (storeNameEl) {
    const store = (storeNameEl.innerText || storeNameEl.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
    if (store) sellerParts.push(`- **Mağaza:** ${store}`);
  }
  if (sellerRegEl) {
    const reg = (sellerRegEl.innerText || sellerRegEl.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
    if (reg) sellerParts.push(`- **Üyelik Bilgisi:** ${reg}`);
  }

  if (sellerParts.length > 0) {
    lines.push('### Satıcı Bilgileri');
    lines.push(...sellerParts);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // 8. Seçili Ek Donanımlar / Özellikler (Emlak & Vasıta Donanım Listeleri)
  const selectedFeatures = Array.from(
    document.querySelectorAll<HTMLElement>(
      '.classifiedDescriptionList li.selected, .classifiedProperties li.selected, #classifiedProperties li.selected',
    ),
  );
  if (selectedFeatures.length > 0) {
    const featureNames = selectedFeatures
      .map((el) => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim())
      .filter(Boolean);
    if (featureNames.length > 0) {
      lines.push('### Seçili Donanım & Özellikler');
      lines.push(featureNames.join(', '));
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  }

  // 9. Araç Hasar / Ekspertiz Durumu (Vasıta)
  const damageRows = Array.from(
    document.querySelectorAll<HTMLElement>(
      '#classifiedDamageStatus table tr, .vehicle-damage-info tr, .car-damage-info li',
    ),
  );
  if (damageRows.length > 0) {
    const damageInfo: string[] = [];
    damageRows.forEach((row) => {
      const txt = (row.innerText || row.textContent || '').replace(/\s+/g, ' ').trim();
      if (txt) damageInfo.push(`- ${txt}`);
    });
    if (damageInfo.length > 0) {
      lines.push('### Hasar & Ekspertiz Durumu');
      lines.push(...damageInfo);
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  }

  // 10. İlan Açıklaması
  const descEl = document.getElementById('classifiedDescription');
  const description = descEl?.innerText?.trim() || descEl?.textContent?.trim();
  if (description) {
    lines.push('### İlan Açıklaması');
    lines.push(description);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // 11. Altbilgi
  const nowStr = new Date().toLocaleString('tr-TR');
  lines.push(`*Sahibinden Manager ile derlendi · ${nowStr}*`);

  return lines.join('\n');
};

/**
 * 'Not Al' butonunun hemen soluna 'Tüm Verileri Kopyala' butonunu ekler.
 */
export const handleClassifiedDataCopyButton = () => {
  const eventsList = document.querySelector<HTMLUListElement>(
    'div.classifiedDetailTitle ul.classifiedEvents, ul.classifiedEvents',
  );
  if (!eventsList) return;

  if (eventsList.querySelector('.sm-classified-copy-all-action')) return;

  const li = document.createElement('li');
  li.className = 'sm-classified-copy-all-action';

  const link = document.createElement('a');
  link.href = '#';
  link.setAttribute('rel', 'nofollow');
  link.className = 'sm-classified-copy-all-link';
  link.title = 'İlana ait tüm bilgileri ve açıklamayı AI / karşılaştırma için panoya kopyala';
  link.innerHTML = `
    ${COPY_ICON_SVG}
    <span>Tüm Verileri Kopyala</span>
  `;

  let resetTimer: ReturnType<typeof setTimeout> | null = null;

  link.onclick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const fullData = extractClassifiedFullData();
    if (!fullData) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullData);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullData;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      link.classList.add('copied');
      link.innerHTML = `
        ${CHECK_ICON_SVG}
        <span>Kopyalandı!</span>
      `;

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        link.classList.remove('copied');
        link.innerHTML = `
          ${COPY_ICON_SVG}
          <span>Tüm Verileri Kopyala</span>
        `;
      }, 2000);
    } catch (err) {
      console.error('Sahibinden Manager: Tüm veriler kopyalanamadı', err);
    }
  };

  li.appendChild(link);

  // 'Not Al' butonunun soluna yerleştir
  const noteAction = eventsList.querySelector('.sm-classified-note-action');
  if (noteAction) {
    eventsList.insertBefore(li, noteAction);
  } else {
    eventsList.insertBefore(li, eventsList.firstChild);
  }
};
