interface HistoryRowItem {
  element: HTMLTableRowElement;
  dateStr: string;
  timestamp: number;
  price: number;
  currency: string;
}

const MONTHS: Record<string, number> = {
  ocak: 0,
  şubat: 1,
  subat: 1,
  mart: 2,
  nisan: 3,
  mayıs: 4,
  mayis: 4,
  haziran: 5,
  temmuz: 6,
  ağustos: 7,
  agustos: 7,
  eylül: 8,
  eylul: 8,
  ekim: 9,
  kasım: 10,
  kasim: 10,
  aralık: 11,
  aralik: 11,
};

const parseTurkishDate = (str: string): number => {
  const clean = str.toLowerCase().replace(/[^a-z0-9şğıüöç\s]/gi, ' ');
  const parts = clean.split(/\s+/).filter(Boolean);

  let day = 1;
  let month = 0;
  let year = new Date().getFullYear();

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (/^\d{1,2}$/.test(part) && day === 1) {
      day = parseInt(part, 10);
    } else if (MONTHS[part] !== undefined) {
      month = MONTHS[part];
    } else if (/^\d{4}$/.test(part)) {
      year = parseInt(part, 10);
    }
  }

  return new Date(year, month, day).getTime();
};

const parsePriceText = (str: string): { price: number; currency: string } => {
  const cleanStr = str.replace(/\s+/g, ' ').trim();
  const digitsMatch = cleanStr.match(/[\d.]+/);
  if (!digitsMatch) return { price: 0, currency: 'TL' };

  const rawNumber = digitsMatch[0].replace(/\./g, '');
  const price = parseInt(rawNumber, 10) || 0;

  const currencyMatch = cleanStr.match(/(TL|USD|EUR|GBP|₺|\$|€)/i);
  const currency = currencyMatch ? currencyMatch[0].toUpperCase() : 'TL';

  return { price, currency };
};

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const handlePriceHistoryAnalytics = () => {
  if (!window.location.pathname.includes('/favori-ilan-fiyat-tarihcesi')) return;

  const table = document.querySelector<HTMLTableElement>('table.history-table');
  if (!table) return;

  const rowElements = Array.from(table.querySelectorAll<HTMLTableRowElement>('tbody tr'));
  if (rowElements.length === 0) return;

  const rows: HistoryRowItem[] = [];

  for (const tr of rowElements) {
    const dateCell = tr.querySelector<HTMLTableCellElement>('td:first-child');
    const priceCell = tr.querySelector<HTMLTableCellElement>('td.price-col, td:last-child');
    if (!dateCell || !priceCell) continue;

    const dateStr = dateCell.textContent || '';
    const priceStr = priceCell.textContent || '';

    const timestamp = parseTurkishDate(dateStr);
    const { price, currency } = parsePriceText(priceStr);

    if (price > 0) {
      rows.push({
        element: tr,
        dateStr,
        timestamp,
        price,
        currency,
      });
    }
  }

  if (rows.length === 0) return;

  const sortedChrono = [...rows].sort((a, b) => a.timestamp - b.timestamp);

  const initialItem = sortedChrono[0];
  const currentItem = sortedChrono[sortedChrono.length - 1];

  const initialPrice = initialItem.price;
  const currentPrice = currentItem.price;
  const currency = currentItem.currency || initialItem.currency || 'TL';

  const totalDelta = currentPrice - initialPrice;
  const totalPercent = initialPrice > 0 ? (totalDelta / initialPrice) * 100 : 0;

  const allPrices = rows.map((r) => r.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const isAllTimeLow = currentPrice <= minPrice && totalDelta < 0;
  const isAllTimeHigh = currentPrice >= maxPrice && totalDelta > 0;

  const totalDays = Math.max(
    1,
    Math.round(Math.abs(currentItem.timestamp - initialItem.timestamp) / (1000 * 60 * 60 * 24)),
  );
  const velocityPerDay = Math.abs(totalDelta) / totalDays;
  const updatesCount = Math.max(0, rows.length - 1);

  // 1. Tablo satırlarına kademeli değişim rozetlerini ekle
  for (let i = 0; i < sortedChrono.length; i++) {
    const item = sortedChrono[i];
    const priceWrapper =
      item.element.querySelector('.price-col-wrapper') ||
      item.element.querySelector('td.price-col');
    if (!priceWrapper || priceWrapper.querySelector('.sm-step-pill')) continue;

    const pill = document.createElement('span');

    if (i === 0) {
      pill.className = 'sm-step-pill sm-step-initial';
      pill.textContent = 'İlk Fiyat';
    } else {
      const prevPrice = sortedChrono[i - 1].price;
      const stepDelta = item.price - prevPrice;
      const stepPercent = prevPrice > 0 ? (stepDelta / prevPrice) * 100 : 0;

      // Manipülatif sembolik indirim kontrolü (örn. 1 TL veya %0.05'ten az)
      if (Math.abs(stepDelta) > 0 && Math.abs(stepPercent) < 0.05) {
        pill.className = 'sm-step-pill sm-step-warning';
        pill.title = 'Sembolik bildirim indirimi';
        pill.textContent = `Manipülatif (${stepDelta > 0 ? '+' : ''}${formatNumber(stepDelta)} ${currency})`;
      } else if (stepDelta < 0) {
        pill.className = 'sm-step-pill sm-step-drop';
        pill.textContent = `-${formatNumber(Math.abs(stepDelta))} ${currency} (-%${Math.abs(stepPercent).toFixed(2)})`;
      } else if (stepDelta > 0) {
        pill.className = 'sm-step-pill sm-step-rise';
        pill.textContent = `+${formatNumber(stepDelta)} ${currency} (+%${stepPercent.toFixed(2)})`;
      } else {
        pill.className = 'sm-step-pill sm-step-initial';
        pill.textContent = 'Aynı Fiyat';
      }
    }

    priceWrapper.appendChild(pill);
  }

  // 2. Özet Analitik Kartını Enjekte Et
  if (document.querySelector('.sm-price-analytics-card')) return;

  const card = document.createElement('div');
  card.className = 'sm-price-analytics-card';

  const getBadgeHtml = () => {
    if (isAllTimeLow) {
      return '<span class="sm-price-analytics-badge sm-badge-atl">Tarihi Dip Seviyesinde</span>';
    }
    if (totalDelta < 0) {
      return '<span class="sm-price-analytics-badge sm-badge-atl">Net İndirimde</span>';
    }
    if (isAllTimeHigh) {
      return '<span class="sm-price-analytics-badge sm-badge-rise">Zirve Fiyatta</span>';
    }
    if (totalDelta > 0) {
      return '<span class="sm-price-analytics-badge sm-badge-rise">Fiyat Artışta</span>';
    }
    return '<span class="sm-price-analytics-badge sm-badge-neutral">Fiyat Sabit</span>';
  };
  const badgeHtml = getBadgeHtml();

  const netDeltaClass = totalDelta < 0 ? 'sm-value-drop' : totalDelta > 0 ? 'sm-value-rise' : '';
  const netDeltaSign = totalDelta > 0 ? '+' : '';

  card.innerHTML = `
    <div class="sm-price-analytics-header">
      <div class="sm-price-analytics-title">
        <span>Fiyat İstatistikleri ve Trend Analizi</span>
        ${badgeHtml}
      </div>
      <span class="text-xs text-[#888] font-medium">${updatesCount} fiyat güncellemesi (${totalDays} günde)</span>
    </div>

    <div class="sm-price-metrics-grid">
      <div class="sm-price-metric-box">
        <div class="sm-metric-label">Net Fiyat Değişimi</div>
        <div class="sm-metric-value ${netDeltaClass}">
          ${netDeltaSign}${formatNumber(totalDelta)} ${currency}
        </div>
        <div class="sm-metric-sub">
          ${totalDelta !== 0 ? `%${Math.abs(totalPercent).toFixed(2)} ${totalDelta < 0 ? 'düşüş' : 'artış'}` : 'Değişim olmadı'}
        </div>
      </div>

      <div class="sm-price-metric-box">
        <div class="sm-metric-label">Fiyat Aralığı</div>
        <div class="sm-metric-value">
          ${formatNumber(minPrice)} - ${formatNumber(maxPrice)} ${currency}
        </div>
        <div class="sm-metric-sub">
          İlk: ${formatNumber(initialPrice)} ${currency} · Son: ${formatNumber(currentPrice)} ${currency}
        </div>
      </div>

      <div class="sm-price-metric-box">
        <div class="sm-metric-label">Değişim Temposu</div>
        <div class="sm-metric-value">
          ~${formatNumber(Math.round(velocityPerDay))} ${currency} / gün
        </div>
        <div class="sm-metric-sub">
          Ortalama her ${Math.round(totalDays / Math.max(1, updatesCount))} günde bir güncelleme
        </div>
      </div>

      <div class="sm-price-metric-box">
        <div class="sm-metric-label">Piyasa Avantajı</div>
        <div class="sm-metric-value ${netDeltaClass}">
          ${totalDelta < 0 ? `-%${Math.abs(totalPercent).toFixed(2)}` : totalDelta > 0 ? `+%${totalPercent.toFixed(2)}` : 'Sabit'}
        </div>
        <div class="sm-metric-sub">
          ${totalDelta < 0 ? 'İlk fiyata kıyasla daha avantajlı' : totalDelta > 0 ? 'İlk fiyata göre artış gösterdi' : 'Fiyat değişmedi'}
        </div>
      </div>
    </div>
  `;

  // Özet kartının hemen sonrasına veya tablonun hemen öncesine yerleştir
  const summaryBox = document.querySelector('.price-history-summary');
  if (summaryBox && summaryBox.parentNode) {
    summaryBox.parentNode.insertBefore(card, summaryBox.nextSibling);
  } else if (table.parentNode) {
    table.parentNode.insertBefore(card, table);
  }
};
