import type { ListingNoteItem } from '../hooks/useStats';

interface NotesSectionProps {
  notes: ListingNoteItem[];
  onRemoveNote: (adId: string) => void;
  onClearAllNotes: () => void;
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

export const NotesSection = ({ notes, onRemoveNote, onClearAllNotes }: NotesSectionProps) => {
  const handleOpenLink = (url: string) => {
    browser.tabs.create({ url });
  };

  return (
    <section className="p-4 rounded bg-white border border-[#dbdbdb] shadow-sm">
      <div className="flex items-center justify-between border-b border-[#eee] pb-3 mb-3">
        <h2 className="text-xs font-bold text-[#666] uppercase tracking-wide">
          İlan Notları ({notes.length})
        </h2>
        {notes.length > 0 && (
          <button
            type="button"
            onClick={onClearAllNotes}
            className="text-[11px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
          >
            Tümünü Temizle
          </button>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="py-8 text-center text-xs text-[#888] leading-relaxed">
          Henüz ilana özel bir not almadınız.
          <br />
          İlan detay sayfalarındaki &quot;Özel Not&quot; butonuyla eklediğiniz notlar burada
          listelenir.
        </div>
      ) : (
        <div className="max-h-[280px] overflow-y-auto space-y-3 pr-1 divide-y divide-[#f4f4f4]">
          {notes.map((item) => (
            <div key={item.adId} className="pt-2.5 first:pt-0 group">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenLink(item.url)}
                  className="text-left text-xs font-bold text-[#333] hover:text-[#417abb] transition-colors line-clamp-1 cursor-pointer flex-1"
                  title={item.title}
                >
                  {item.title}
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveNote(item.adId)}
                  className="text-[11px] text-[#bbb] hover:text-[#c00] transition-colors px-1 cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Notu Sil"
                >
                  Sil
                </button>
              </div>

              <div className="bg-[#fffdf6] border border-[#f5ecd2] rounded p-2 text-xs text-[#444] leading-relaxed whitespace-pre-wrap">
                {item.text}
              </div>

              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[#888]">
                <span>İlan No: #{item.adId}</span>
                <span>Son Güncelleme: {formatDate(item.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
