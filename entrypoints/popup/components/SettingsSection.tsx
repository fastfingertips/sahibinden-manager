interface SettingsSectionProps {
  isFullGridEnabled: boolean;
  onToggleFullGrid: () => void;
  isDownloaderEnabled: boolean;
  onToggleDownloader: () => void;
  isVisitedHighlightEnabled: boolean;
  onToggleVisitedHighlight: () => void;
  isNotesEnabled: boolean;
  onToggleNotes: () => void;
  isPriceHistoryEnabled: boolean;
  onTogglePriceHistory: () => void;
  isHideRefurbishedEnabled: boolean;
  onToggleHideRefurbished: () => void;
  ignoredRefurbishedCount?: number;
  onClearIgnoredRefurbished?: () => void;
  isHideAdsEnabled: boolean;
  onToggleHideAds: () => void;
  viewedCount?: number;
  onClearHistory?: () => void;
}

export const SettingsSection = ({
  isFullGridEnabled,
  onToggleFullGrid,
  isDownloaderEnabled,
  onToggleDownloader,
  isVisitedHighlightEnabled,
  onToggleVisitedHighlight,
  isNotesEnabled,
  onToggleNotes,
  isPriceHistoryEnabled,
  onTogglePriceHistory,
  isHideRefurbishedEnabled,
  onToggleHideRefurbished,
  ignoredRefurbishedCount = 0,
  onClearIgnoredRefurbished,
  isHideAdsEnabled,
  onToggleHideAds,
  viewedCount = 0,
  onClearHistory,
}: SettingsSectionProps) => (
  <section className="space-y-4">
    {/* Grup 1: Görünüm ve Medya */}
    <div className="p-4 rounded bg-white border border-[#dbdbdb] shadow-sm">
      <h2 className="text-xs font-bold text-[#666] uppercase tracking-wide mb-3 flex items-center justify-between">
        <span>Görünüm & Medya</span>
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-[#333] font-bold group-hover:text-[#417abb] transition-colors">
              Izgara Görünümü (Tüm Resimler)
            </span>
            <div className="sh-switch">
              <input type="checkbox" checked={isFullGridEnabled} onChange={onToggleFullGrid} />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[11px] text-[#777] leading-relaxed">
            İlan sayfasındaki küçük resimleri sayfalama olmadan tek bir ızgara düzeninde listeler.
          </p>
        </div>

        <div className="flex flex-col space-y-1 pt-3 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-[#333] font-bold group-hover:text-[#417abb] transition-colors">
              Fotoğraf İndirici
            </span>
            <div className="sh-switch">
              <input type="checkbox" checked={isDownloaderEnabled} onChange={onToggleDownloader} />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[11px] text-[#777] leading-relaxed">
            İlan ana görseli, küçük resimler ve Mega Slideshow üzerindeki indirme butonlarını aktif
            eder.
          </p>
        </div>
      </div>
    </div>

    {/* Grup 2: Arama ve İlan Takibi */}
    <div className="p-4 rounded bg-white border border-[#dbdbdb] shadow-sm">
      <h2 className="text-xs font-bold text-[#666] uppercase tracking-wide mb-3">
        Arama & İlan Takibi
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-[#333] font-bold group-hover:text-[#417abb] transition-colors">
              Ziyaret Edilen İlanları Vurgula
            </span>
            <div className="sh-switch">
              <input
                type="checkbox"
                checked={isVisitedHighlightEnabled}
                onChange={onToggleVisitedHighlight}
              />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[11px] text-[#777] leading-relaxed">
            Daha önce incelediğiniz ilanları liste satırında mavi vurgu çizgisi ve rozetle öne
            çıkarır.
          </p>
        </div>

        <div className="flex flex-col space-y-1 pt-3 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-[#333] font-bold group-hover:text-[#417abb] transition-colors">
              İlan Not Defteri
            </span>
            <div className="sh-switch">
              <input type="checkbox" checked={isNotesEnabled} onChange={onToggleNotes} />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[11px] text-[#777] leading-relaxed">
            İlan detayında kişisel notlar alabilmenizi ve listelerde &apos;Not Var&apos; rozetiyle
            görebilmenizi sağlar.
          </p>
        </div>

        <div className="flex flex-col space-y-1 pt-3 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-[#333] font-bold group-hover:text-[#417abb] transition-colors">
              Fiyat Geçmişi Analizi
            </span>
            <div className="sh-switch">
              <input
                type="checkbox"
                checked={isPriceHistoryEnabled}
                onChange={onTogglePriceHistory}
              />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[11px] text-[#777] leading-relaxed">
            Favori ilan fiyat tarihçesi sayfasında oransal değişim yüzdeleri ve istatistik özeti
            sunar.
          </p>
        </div>
      </div>
    </div>

    {/* Grup 3: Filtreleme ve Temizlik */}
    <div className="p-4 rounded bg-white border border-[#dbdbdb] shadow-sm">
      <h2 className="text-xs font-bold text-[#666] uppercase tracking-wide mb-3">
        Filtreleme & Temizlik
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-[#333] font-bold group-hover:text-[#417abb] transition-colors">
              Yenilenmiş Cihazları Gizle (Yepy)
            </span>
            <div className="sh-switch">
              <input
                type="checkbox"
                checked={isHideRefurbishedEnabled}
                onChange={onToggleHideRefurbished}
              />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[11px] text-[#777] leading-relaxed">
            Arama listelerinde ve tablolarda yer alan sponsorlu yenilenmiş telefon (Yepy) satır ve
            bloklarını gizler.
          </p>
          {ignoredRefurbishedCount > 0 && onClearIgnoredRefurbished && (
            <div className="pt-2 flex items-center justify-between text-[11px] text-[#888]">
              <span>
                Tekil gizlenen cihaz: <strong>{ignoredRefurbishedCount}</strong>
              </span>
              <button
                type="button"
                onClick={onClearIgnoredRefurbished}
                className="text-[#417abb] hover:text-[#2d5889] font-medium cursor-pointer"
              >
                Gizlenenleri Sıfırla
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-1 pt-3 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-[#333] font-bold group-hover:text-[#417abb] transition-colors">
              Harici Reklamları Temizle
            </span>
            <div className="sh-switch">
              <input type="checkbox" checked={isHideAdsEnabled} onChange={onToggleHideAds} />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[11px] text-[#777] leading-relaxed">
            Arama sonuçları tablosundaki harici sponsorlu reklam satırlarını ve banner alanlarını
            kaldırır.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#eee] flex items-center justify-between text-xs">
        <span className="text-[#666]">
          İncelenen İlan Kaydı: <strong className="text-[#333]">{viewedCount}</strong>
        </span>
        {viewedCount > 0 && onClearHistory && (
          <button
            type="button"
            onClick={onClearHistory}
            className="text-[11px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
          >
            Geçmişi Temizle
          </button>
        )}
      </div>
    </div>
  </section>
);
