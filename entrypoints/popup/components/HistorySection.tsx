import type { HistoryItem } from '../hooks/useStats';

interface HistorySectionProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const formatTimeAgo = (timestamp: number): string => {
  const diff = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Az önce';
  if (minutes < 60) return `${minutes} dk önce`;
  if (hours < 24) return `${hours} saat önce`;
  if (days === 1) return 'Dün';
  if (days < 30) return `${days} gün önce`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ay önce`;
  const years = Math.floor(days / 365);
  return `${years} yıl önce`;
};

export const HistorySection = ({ history, onClearHistory, onRemoveItem }: HistorySectionProps) => {
  const handleOpenLink = (url: string) => {
    browser.tabs.create({ url });
  };

  return (
    <section className="p-4 rounded bg-white border border-[#dbdbdb] shadow-sm">
      <div className="flex items-center justify-between border-b border-[#eee] pb-3 mb-3">
        <h2 className="text-xs font-bold text-[#666] uppercase tracking-wide">
          Ziyaret Geçmişi ({history.length})
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="text-[11px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
          >
            Tümünü Temizle
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-8 text-center text-xs text-[#888] leading-relaxed">
          Henüz incelenmiş bir ilan kaydı bulunmuyor.
          <br />
          Detayına girdiğiniz ilanlar otomatik olarak burada listelenir.
        </div>
      ) : (
        <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1 divide-y divide-[#f4f4f4]">
          {history.map((item) => (
            <div
              key={item.id}
              className="pt-2 first:pt-0 flex items-start justify-between gap-3 group"
            >
              <div className="flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => handleOpenLink(item.url)}
                  className="text-left text-xs font-bold text-[#333] hover:text-[#417abb] transition-colors line-clamp-1 cursor-pointer block w-full"
                  title={item.title}
                >
                  {item.title}
                </button>
                <div className="flex flex-col gap-0.5 mt-1 text-[10px] text-[#777]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#555]">Son:</span>
                    <span>
                      {formatTimeAgo(item.lastVisitedAt)} ({formatDate(item.lastVisitedAt)})
                    </span>
                    <span className="text-[#aaa]">· #{item.id}</span>
                  </div>
                  {item.firstVisitedAt && item.firstVisitedAt !== item.lastVisitedAt && (
                    <div className="flex items-center gap-2 text-[#888]">
                      <span className="font-semibold text-[#666]">İlk:</span>
                      <span>
                        {formatTimeAgo(item.firstVisitedAt)} ({formatDate(item.firstVisitedAt)})
                      </span>
                      {item.visitCount > 1 && (
                        <span className="text-[#386696] font-medium">({item.visitCount} kez)</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                className="text-[11px] text-[#bbb] hover:text-[#c00] transition-colors px-1 cursor-pointer opacity-0 group-hover:opacity-100"
                title="Listeden Kaldır"
              >
                Kaldır
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
