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
    <section className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs">
      <div className="flex items-center justify-between border-b border-[#eee] pb-2 mb-2">
        <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-wider">
          İlan Notları ({notes.length})
        </h2>
        {notes.length > 0 && (
          <button
            type="button"
            onClick={onClearAllNotes}
            className="text-[10px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
          >
            Tümünü Temizle
          </button>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="py-6 text-center text-[11px] text-[#888] leading-relaxed">
          Henüz ilana özel bir not almadınız.
          <br />
          İlan detay sayfalarındaki &quot;Not Al&quot; butonuyla eklediğiniz notlar burada
          listelenir.
        </div>
      ) : (
        <div className="max-h-[260px] overflow-y-auto space-y-2.5 pr-1 divide-y divide-[#f4f4f4]">
          {notes.map((item) => (
            <div key={item.adId} className="pt-2 first:pt-0 group">
              <div className="flex items-start justify-between gap-2 mb-1">
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
                  onClick={() => onRemoveNote(item.adId)}
                  className="text-[10px] text-[#bbb] hover:text-[#c00] transition-colors cursor-pointer opacity-80 group-hover:opacity-100 flex-shrink-0"
                  title="Notu Sil"
                >
                  Sil
                </button>
              </div>

              <div className="bg-[#fffdf7] border border-[#f5eccb] rounded-xs p-2 text-[10.5px] text-[#333] leading-snug whitespace-pre-wrap break-words">
                {item.text}
              </div>

              <div className="mt-1 flex items-center justify-between text-[9.5px] text-[#999]">
                <span>İlan No: #{item.adId}</span>
                <span>{formatDate(item.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
