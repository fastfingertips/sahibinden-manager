import { useState } from 'react';
import type { EliminatedListingItem } from '../hooks/useStats';
import { formatDate, formatTimeAgo } from '@/utils/date';

interface EliminatedSectionProps {
  eliminated: EliminatedListingItem[];
  onRemoveEliminated: (adId: string) => void;
  onClearAllEliminated: () => void;
}

export const EliminatedSection = ({
  eliminated,
  onRemoveEliminated,
  onClearAllEliminated,
}: EliminatedSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenLink = (url: string) => {
    browser.tabs.create({ url });
  };

  const filtered = eliminated.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.reason.toLowerCase().includes(q) ||
      item.adId.includes(q)
    );
  });

  return (
    <section className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs">
      <div className="flex items-center justify-between border-b border-[#eee] pb-2 mb-2">
        <h2 className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
          Elenen İlanlar ({eliminated.length})
        </h2>
        {eliminated.length > 0 && (
          <button
            type="button"
            onClick={onClearAllEliminated}
            className="text-[10px] text-[#888] hover:text-[#b91c1c] transition-colors cursor-pointer"
          >
            Tümünü Temizle
          </button>
        )}
      </div>

      {eliminated.length > 3 && (
        <div className="mb-2.5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Elenen ilanlarda ara (başlık, neden veya no)..."
            className="w-full px-2 py-1 text-[11px] bg-[#fdfdfd] border border-[#d1d5db] rounded-xs outline-none focus:border-[#ef4444]"
          />
        </div>
      )}

      {eliminated.length === 0 ? (
        <div className="py-6 text-center text-[11px] text-[#888] leading-relaxed">
          Henüz elenen bir ilan bulunmuyor.
          <br />
          İlan detay sayfalarındaki &quot;İlanı Ele&quot; seçeneğiyle elediğiniz ilanlar burada
          listelenir.
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-4 text-center text-[11px] text-[#888]">
          Aramanızla eşleşen elenmiş ilan bulunamadı.
        </div>
      ) : (
        <div className="max-h-[260px] overflow-y-auto space-y-2.5 pr-1 divide-y divide-[#f4f4f4]">
          {filtered.map((item) => (
            <div key={item.adId} className="pt-2 first:pt-0 group">
              <div className="flex items-start justify-between gap-2 mb-1">
                <button
                  type="button"
                  onClick={() => handleOpenLink(item.url)}
                  className="text-left text-[11.5px] font-semibold text-[#222] hover:text-[#b91c1c] transition-colors line-clamp-1 cursor-pointer flex-1 line-through"
                  title={item.title}
                >
                  {item.title}
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveEliminated(item.adId)}
                  className="text-[10px] text-[#bbb] hover:text-[#b91c1c] transition-colors cursor-pointer opacity-80 group-hover:opacity-100 flex-shrink-0"
                  title="Elemeyi Kaldır"
                >
                  Elemeyi Kaldır
                </button>
              </div>

              <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xs p-2 text-[10.5px] text-[#991b1b] leading-snug whitespace-pre-wrap break-words">
                <span className="font-semibold text-[#7f1d1d]">Neden: </span>
                {item.reason}
              </div>

              <div className="mt-1 flex items-center justify-between text-[9.5px] text-[#888]">
                <span className="font-mono text-[#555]">#{item.adId}</span>
                <div
                  className="flex items-center gap-1.5"
                  title={`Elendi: ${formatDate(item.createdAt || item.updatedAt)} (${formatTimeAgo(item.createdAt || item.updatedAt)})`}
                >
                  <span>Elendi: {formatTimeAgo(item.createdAt || item.updatedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
