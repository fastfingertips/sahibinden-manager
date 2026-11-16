interface SettingItemProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  borderTop?: boolean;
  children?: React.ReactNode;
}

const SettingItem = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  borderTop = false,
  children,
}: SettingItemProps) => (
  <div
    className={`flex flex-col space-y-0.5 ${borderTop ? 'pt-2 border-t border-[#f0f0f0]' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
  >
    <label className="flex items-center justify-between group cursor-pointer">
      <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
        {label}
      </span>
      <div className="sh-switch">
        <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
        <div className="slider"></div>
      </div>
    </label>
    <p className="text-[10px] text-[#666] leading-snug">{description}</p>
    {children}
  </div>
);

interface SettingSubItemProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const SettingSubItem = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: SettingSubItemProps) => (
  <div className="mt-1.5 ml-1 pl-3 border-l-2 border-[#d0dbe5] flex flex-col space-y-0.5 py-1 bg-[#f9fafb] rounded-r-xs pr-2">
    <label className="flex items-center justify-between group cursor-pointer">
      <span className="text-[11px] font-medium text-[#333] group-hover:text-[#417abb] transition-colors">
        {label}
      </span>
      <div className="sh-switch scale-90 origin-right">
        <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
        <div className="slider"></div>
      </div>
    </label>
    <p className="text-[9.5px] text-[#777] leading-tight">{description}</p>
  </div>
);

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
        <SettingItem
          label="Izgara Görünümü (Tüm Resimler)"
          description="İlan sayfasındaki küçük resimleri sayfalama olmadan tek bir ızgara düzeninde listeler."
          checked={isFullGridEnabled}
          onChange={onToggleFullGrid}
        />

        <SettingItem
          label="Fotoğraf İndirici"
          description="İlan ana görseli, küçük resimler ve Mega Slideshow üzerindeki indirme butonlarını aktif eder."
          checked={isDownloaderEnabled}
          onChange={onToggleDownloader}
          borderTop
        />
      </div>
    </div>

    {/* Grup 2: Arama ve İlan Takibi */}
    <div className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs">
      <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">
        Arama & İlan Takibi
      </h2>
      <div className="space-y-2.5">
        <SettingItem
          label="Ziyaret Edilen İlanları Vurgula"
          description="Daha önce incelediğiniz ilanları liste satırında mavi vurgu çizgisi ve rozetle öne çıkarır."
          checked={isVisitedHighlightEnabled}
          onChange={onToggleVisitedHighlight}
        >
          {viewedCount > 0 && onClearHistory && (
            <div className="mt-1.5 ml-1 pl-3 border-l-2 border-[#d0dbe5] flex items-center justify-between text-[10px] text-[#666] bg-[#f9fafb] py-1 px-2 rounded-r-xs">
              <span>
                İncelenen İlan Kaydı: <strong className="text-[#222]">{viewedCount}</strong>
              </span>
              <button
                type="button"
                onClick={onClearHistory}
                className="text-[9.5px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
              >
                Geçmişi Temizle
              </button>
            </div>
          )}
        </SettingItem>

        <SettingItem
          label="İlan Not Defteri"
          description="İlan detayında kişisel notlar alabilmenizi ve listelerde 'Not Var' rozetiyle görebilmenizi sağlar."
          checked={isNotesEnabled}
          onChange={onToggleNotes}
          borderTop
        />

        <SettingItem
          label="Fiyat Geçmişi Analizi"
          description="Favori ilan fiyat tarihçesi sayfasında oransal değişim yüzdeleri ve istatistik özeti sunar."
          checked={isPriceHistoryEnabled}
          onChange={onTogglePriceHistory}
          borderTop
        />

        <SettingItem
          label="Soru-Cevapları Otomatik Genişlet"
          description="İlan detayındaki soru-cevap bölümünde gizli kalan tüm yanıtları otomatik olarak görünür yapar."
          checked={isAutoExpandQnAEnabled}
          onChange={onToggleAutoExpandQnA}
          borderTop
        />

        <SettingItem
          label="Klavye ile İlan Gezinimi"
          description="Arama sonuçlarında yukarı / aşağı ok tuşlarıyla ilanlar arasında gezinebilmeyi ve Enter ile ilana gidebilmeyi sağlar."
          checked={isKeyboardNavEnabled}
          onChange={onToggleKeyboardNav}
          borderTop
        >
          {isKeyboardNavEnabled && (
            <SettingSubItem
              label="Enter ile Yeni Sekmede Aç"
              description="Enter tuşuna basıldığında seçili ilanı mevcut sayfa yerine yeni sekmede açar."
              checked={isKeyboardNewTabEnabled}
              onChange={onToggleKeyboardNewTab}
            />
          )}
        </SettingItem>
      </div>
    </div>

    {/* Grup 3: Filtreleme ve Temizlik */}
    <div className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs">
      <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">
        Filtreleme & Temizlik
      </h2>
      <div className="space-y-2.5">
        <SettingItem
          label="Yenilenmiş Cihazları Gizle (Yepy)"
          description="Arama listelerinde ve tablolarda yer alan sponsorlu yenilenmiş telefon (Yepy) satır ve bloklarını gizler."
          checked={isHideRefurbishedEnabled}
          onChange={onToggleHideRefurbished}
        >
          {ignoredRefurbishedCount > 0 && onClearIgnoredRefurbished && (
            <div className="mt-1.5 ml-1 pl-3 border-l-2 border-[#d0dbe5] flex items-center justify-between text-[10px] text-[#666] bg-[#f9fafb] py-1 px-2 rounded-r-xs">
              <span>
                Tekil gizlenen cihaz: <strong>{ignoredRefurbishedCount}</strong>
              </span>
              <button
                type="button"
                onClick={onClearIgnoredRefurbished}
                className="text-[9.5px] text-[#417abb] hover:text-[#2d5889] font-medium cursor-pointer"
              >
                Gizlenenleri Sıfırla
              </button>
            </div>
          )}
        </SettingItem>

        <SettingItem
          label="Reklam & Doping Tanıtımlarını Temizle"
          description="Arama tablosundaki sponsorlu reklam satırlarını, doping tanıtım kutularını ve afiş alanlarını kaldırır."
          checked={isHideAdsEnabled}
          onChange={onToggleHideAds}
          borderTop
        />
      </div>
    </div>
  </section>
);
