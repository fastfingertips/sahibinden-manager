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
    <section className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs">
      <div className="flex items-center justify-between border-b border-[#eee] pb-2 mb-2">
        <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-wider">
          Ziyaret Geçmişi ({history.length})
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="text-[10px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
          >
            Tümünü Temizle
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-6 text-center text-[11px] text-[#888] leading-relaxed">
          Henüz incelenmiş bir ilan kaydı bulunmuyor.
          <br />
          Ziyaret ettiğiniz ilanlar otomatik olarak burada listelenecektir.
        </div>
      ) : (
        <div className="max-h-[260px] overflow-y-auto space-y-2 pr-1 divide-y divide-[#f4f4f4]">
          {history.map((item) => (
            <div key={item.id} className="pt-2 first:pt-0 group flex flex-col gap-0.5">
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenLink(item.url)}
                  className="text-left text-[11.5px] font-semibold text-[#222] hover:text-[#417abb] transition-colors line-clamp-1 cursor-pointer flex-1"
                  title={item.title}
                >
                  {item.title}
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-[10px] text-[#bbb] hover:text-[#c00] transition-colors cursor-pointer opacity-80 group-hover:opacity-100 flex-shrink-0"
                  title="Kaydı Kaldır"
                >
                  Kaldır
                </button>
              </div>

              <div className="flex items-center justify-between text-[9.5px] text-[#888]">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[#555]">#{item.id}</span>
                  {item.visitCount > 1 && (
                    <span className="px-1 py-0.2 bg-[#f0f4f8] text-[#417abb] rounded-xs font-semibold">
                      {item.visitCount} kez
                    </span>
                  )}
                </div>
                <div
                  className="flex items-center gap-1.5"
                  title={`İlk: ${formatDate(item.firstVisitedAt)}`}
                >
                  <span>Son: {formatTimeAgo(item.lastVisitedAt)}</span>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  title={`İlk: ${formatDate(item.firstVisitedAt)}`}
                >
                  <span>Son: {formatTimeAgo(item.lastVisitedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
