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
  isAutoExpandQnAEnabled: boolean;
  onToggleAutoExpandQnA: () => void;
  isKeyboardNavEnabled: boolean;
  onToggleKeyboardNav: () => void;
  isKeyboardNewTabEnabled: boolean;
  onToggleKeyboardNewTab: () => void;
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
  isAutoExpandQnAEnabled,
  onToggleAutoExpandQnA,
  isKeyboardNavEnabled,
  onToggleKeyboardNav,
  isKeyboardNewTabEnabled,
  onToggleKeyboardNewTab,
  isHideRefurbishedEnabled,
  onToggleHideRefurbished,
  ignoredRefurbishedCount = 0,
  onClearIgnoredRefurbished,
  isHideAdsEnabled,
  onToggleHideAds,
  viewedCount = 0,
  onClearHistory,
}: SettingsSectionProps) => (
  <section className="space-y-2.5">
    {/* Grup 1: Görünüm ve Medya */}
    <div className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs">
      <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">
        Görünüm & Medya
      </h2>
      <div className="space-y-2.5">
        <div className="flex flex-col space-y-0.5">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
              Izgara Görünümü (Tüm Resimler)
            </span>
            <div className="sh-switch">
              <input type="checkbox" checked={isFullGridEnabled} onChange={onToggleFullGrid} />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[10px] text-[#666] leading-snug">
            İlan sayfasındaki küçük resimleri sayfalama olmadan tek bir ızgara düzeninde listeler.
          </p>
        </div>

        <div className="flex flex-col space-y-0.5 pt-2 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
              Fotoğraf İndirici
            </span>
            <div className="sh-switch">
              <input type="checkbox" checked={isDownloaderEnabled} onChange={onToggleDownloader} />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[10px] text-[#666] leading-snug">
            İlan ana görseli, küçük resimler ve Mega Slideshow üzerindeki indirme butonlarını aktif
            eder.
          </p>
        </div>
      </div>
    </div>

    {/* Grup 2: Arama ve İlan Takibi */}
    <div className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs">
      <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">
        Arama & İlan Takibi
      </h2>
      <div className="space-y-2.5">
        <div className="flex flex-col space-y-0.5">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
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
          <p className="text-[10px] text-[#666] leading-snug">
            Daha önce incelediğiniz ilanları liste satırında mavi vurgu çizgisi ve rozetle öne
            çıkarır.
          </p>
        </div>

        <div className="flex flex-col space-y-0.5 pt-2 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
              İlan Not Defteri
            </span>
            <div className="sh-switch">
              <input type="checkbox" checked={isNotesEnabled} onChange={onToggleNotes} />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[10px] text-[#666] leading-snug">
            İlan detayında kişisel notlar alabilmenizi ve listelerde &apos;Not Var&apos; rozetiyle
            görebilmenizi sağlar.
          </p>
        </div>

        <div className="flex flex-col space-y-0.5 pt-2 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
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
          <p className="text-[10px] text-[#666] leading-snug">
            Favori ilan fiyat tarihçesi sayfasında oransal değişim yüzdeleri ve istatistik özeti
            sunar.
          </p>
        </div>

        <div className="flex flex-col space-y-0.5 pt-2 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
              Soru-Cevapları Otomatik Genişlet
            </span>
            <div className="sh-switch">
              <input
                type="checkbox"
                checked={isAutoExpandQnAEnabled}
                onChange={onToggleAutoExpandQnA}
              />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[10px] text-[#666] leading-snug">
            İlan detayındaki soru-cevap bölümünde gizli kalan tüm yanıtları otomatik olarak görünür
            yapar.
          </p>
        </div>

        <div className="flex flex-col space-y-0.5 pt-2 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
              Klavye ile İlan Gezinimi
            </span>
            <div className="sh-switch">
              <input
                type="checkbox"
                checked={isKeyboardNavEnabled}
                onChange={onToggleKeyboardNav}
              />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[10px] text-[#666] leading-snug">
            Arama sonuçlarında yukarı / aşağı ok tuşlarıyla ilanlar arasında gezinebilmeyi ve Enter
            ile ilana gidebilmeyi sağlar.
          </p>
        </div>

        <div
          className={`flex flex-col space-y-0.5 pt-2 border-t border-[#f0f0f0] ${!isKeyboardNavEnabled ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
              Enter ile Yeni Sekmede Aç
            </span>
            <div className="sh-switch">
              <input
                type="checkbox"
                checked={isKeyboardNewTabEnabled}
                onChange={onToggleKeyboardNewTab}
                disabled={!isKeyboardNavEnabled}
              />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[10px] text-[#666] leading-snug">
            Klavyeden Enter tuşuna basıldığında seçili ilanı mevcut sayfa yerine yeni sekmede açar.
          </p>
        </div>
      </div>
    </div>

    {/* Grup 3: Filtreleme ve Temizlik */}
    <div className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs">
      <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">
        Filtreleme & Temizlik
      </h2>
      <div className="space-y-2.5">
        <div className="flex flex-col space-y-0.5">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
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
          <p className="text-[10px] text-[#666] leading-snug">
            Arama listelerinde ve tablolarda yer alan sponsorlu yenilenmiş telefon (Yepy) satır ve
            bloklarını gizler.
          </p>
          {ignoredRefurbishedCount > 0 && onClearIgnoredRefurbished && (
            <div className="pt-1.5 flex items-center justify-between text-[10px] text-[#888]">
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

        <div className="flex flex-col space-y-0.5 pt-2 border-t border-[#f0f0f0]">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
              Reklam & Doping Tanıtımlarını Temizle
            </span>
            <div className="sh-switch">
              <input type="checkbox" checked={isHideAdsEnabled} onChange={onToggleHideAds} />
              <div className="slider"></div>
            </div>
          </label>
          <p className="text-[10px] text-[#666] leading-snug">
            Arama tablosundaki sponsorlu reklam satırlarını, doping tanıtım kutularını ve afiş
            alanlarını kaldırır.
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[#eee] flex items-center justify-between text-[10.5px]">
        <span className="text-[#666]">
          İncelenen İlan Kaydı: <strong className="text-[#222]">{viewedCount}</strong>
        </span>
        {viewedCount > 0 && onClearHistory && (
          <button
            type="button"
            onClick={onClearHistory}
            className="text-[10px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
          >
            Geçmişi Temizle
          </button>
        )}
      </div>
    </div>
  </section>
);
