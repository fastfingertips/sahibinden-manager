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
  compactViewMode?: 'normal' | 'mini' | 'hidden';
  onChangeCompactViewMode?: (mode: 'normal' | 'mini' | 'hidden') => void;
  isDownloaderEnabled: boolean;
  onToggleDownloader: () => void;
  isVisitedHighlightEnabled: boolean;
  onToggleVisitedHighlight: () => void;
  isVisitedLastBadgeEnabled?: boolean;
  onToggleVisitedLastBadge?: () => void;
  isVisitedFirstBadgeEnabled?: boolean;
  onToggleVisitedFirstBadge?: () => void;
  isVisitedCommentBadgeEnabled?: boolean;
  onToggleVisitedCommentBadge?: () => void;
  isUnvisitedOpenerEnabled?: boolean;
  onToggleUnvisitedOpener?: () => void;
  unvisitedOpenerCount?: number;
  onChangeUnvisitedOpenerCount?: (count: number) => void;
  isUnvisitedOpenerShortcutEnabled?: boolean;
  onToggleUnvisitedOpenerShortcut?: () => void;
  isUnvisitedOpenerButtonEnabled?: boolean;
  onToggleUnvisitedOpenerButton?: () => void;
  isNotesEnabled: boolean;
  onToggleNotes: () => void;
  isEliminatedHighlightEnabled?: boolean;
  onToggleEliminatedHighlight?: () => void;
  isPriceHistoryEnabled: boolean;
  onTogglePriceHistory: () => void;
  isHideEliminatedEnabled?: boolean;
  onToggleHideEliminated?: () => void;
  isHideVisitedEnabled?: boolean;
  onToggleHideVisited?: () => void;
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
  filteredRefurbishedCount?: number;
  onClearFilteredRefurbished?: () => void;
  isHideAdsEnabled: boolean;
  onToggleHideAds: () => void;
  filteredAdsCount?: number;
  onClearFilteredAds?: () => void;
  viewedCount?: number;
  onClearHistory?: () => void;
}

export const SettingsSection = ({
  isFullGridEnabled,
  onToggleFullGrid,
  compactViewMode = 'normal',
  onChangeCompactViewMode,
  isDownloaderEnabled,
  onToggleDownloader,
  isVisitedHighlightEnabled,
  onToggleVisitedHighlight,
  isVisitedLastBadgeEnabled = true,
  onToggleVisitedLastBadge,
  isVisitedFirstBadgeEnabled = false,
  onToggleVisitedFirstBadge,
  isVisitedCommentBadgeEnabled = true,
  onToggleVisitedCommentBadge,
  isUnvisitedOpenerEnabled = true,
  onToggleUnvisitedOpener,
  unvisitedOpenerCount = 5,
  onChangeUnvisitedOpenerCount,
  isUnvisitedOpenerShortcutEnabled = true,
  onToggleUnvisitedOpenerShortcut,
  isUnvisitedOpenerButtonEnabled = true,
  onToggleUnvisitedOpenerButton,
  isNotesEnabled,
  onToggleNotes,
  isEliminatedHighlightEnabled = true,
  onToggleEliminatedHighlight,
  isPriceHistoryEnabled,
  onTogglePriceHistory,
  isHideEliminatedEnabled = false,
  onToggleHideEliminated,
  isHideVisitedEnabled = false,
  onToggleHideVisited,
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
  filteredRefurbishedCount = 0,
  onClearFilteredRefurbished,
  isHideAdsEnabled,
  onToggleHideAds,
  filteredAdsCount = 0,
  onClearFilteredAds,
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

        <div className="pt-2 border-t border-[#f0f0f0] flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-[#222]">Kompakt Liste Görünümü</span>
            <div className="inline-flex rounded-xs border border-[#cbd5e1] p-0.5 bg-[#f1f5f9]">
              <button
                type="button"
                onClick={() => onChangeCompactViewMode?.('normal')}
                className={`text-[10px] px-2 py-0.5 rounded-xs font-medium transition-colors cursor-pointer ${
                  compactViewMode === 'normal'
                    ? 'bg-white text-[#0f172a] shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Standart
              </button>
              <button
                type="button"
                onClick={() => onChangeCompactViewMode?.('mini')}
                className={`text-[10px] px-2 py-0.5 rounded-xs font-medium transition-colors cursor-pointer ${
                  compactViewMode === 'mini'
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Mini Resim
              </button>
              <button
                type="button"
                onClick={() => onChangeCompactViewMode?.('hidden')}
                className={`text-[10px] px-2 py-0.5 rounded-xs font-medium transition-colors cursor-pointer ${
                  compactViewMode === 'hidden'
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Resimsiz
              </button>
            </div>
          </div>
          <p className="text-[10px] text-[#666] leading-snug">
            {compactViewMode === 'mini'
              ? 'Mini Resim: Küçük resimler ve daraltılmış satırlarla sayfada çok daha fazla ilan görünür (hover ile önizleme büyür).'
              : compactViewMode === 'hidden'
                ? 'Resimsiz: Resim sütunu tamamen gizlenir, ultra kompakt veri tablosu görünümü sunulur.'
                : 'Standart: Sahibinden varsayılan büyük resimli liste görünümü.'}
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
        <SettingItem
          label="Ziyaret Edilen İlanları Vurgula"
          description="Daha önce incelediğiniz ilanları liste satırında mavi vurgu çizgisi ve rozetle öne çıkarır."
          checked={isVisitedHighlightEnabled}
          onChange={onToggleVisitedHighlight}
        >
          {isVisitedHighlightEnabled && onToggleVisitedLastBadge && (
            <SettingSubItem
              label="Son Kontrol Rozeti"
              description="İlanın en son ne zaman incelendiğini gösteren rozeti görüntüler (örn: 5 dk önce bakıldı)."
              checked={isVisitedLastBadgeEnabled}
              onChange={onToggleVisitedLastBadge}
            />
          )}
          {isVisitedHighlightEnabled && onToggleVisitedFirstBadge && (
            <SettingSubItem
              label="İlk Kontrol Rozeti"
              description="İlanın ilk kez ne zaman incelendiğini gösteren rozeti görüntüler (örn: İlk: 3 gün önce)."
              checked={isVisitedFirstBadgeEnabled}
              onChange={onToggleVisitedFirstBadge}
            />
          )}
          {isVisitedHighlightEnabled && onToggleVisitedCommentBadge && (
            <SettingSubItem
              label="Soru / Yorum Rozeti"
              description="İlanda daha önce soru veya yorum paylaşıldıysa yeşil rozetle öne çıkarır (örn: Soru Soruldu)."
              checked={isVisitedCommentBadgeEnabled}
              onChange={onToggleVisitedCommentBadge}
            />
          )}
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
          label="Ziyaret Edilmemiş İlanları Aç"
          description="Arama listesinde henüz incelemediğiniz ilanları arka planda yeni sekmelerde açar."
          checked={isUnvisitedOpenerEnabled}
          onChange={onToggleUnvisitedOpener || (() => {})}
          borderTop
        >
          {isUnvisitedOpenerEnabled && (
            <div className="mt-1.5 ml-1 pl-3 border-l-2 border-[#d0dbe5] flex flex-col space-y-2 py-1.5 bg-[#f9fafb] rounded-r-xs pr-2">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10.5px] font-medium text-[#333]">Açılacak İlan Adedi:</span>
                <div className="flex items-center gap-1">
                  {[3, 5, 10, 20, 0].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => onChangeUnvisitedOpenerCount?.(cnt)}
                      className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        unvisitedOpenerCount === cnt
                          ? 'bg-[#1a4f82] text-white'
                          : 'bg-white text-[#555] border border-[#d0dbe5] hover:bg-[#f0f6fc]'
                      }`}
                      title={
                        cnt === 0
                          ? 'Sayfadaki tüm ziyaret edilmemiş ilanları açar'
                          : `${cnt} ilan açar`
                      }
                    >
                      {cnt === 0 ? 'Tümü (Max)' : cnt}
                    </button>
                  ))}
                </div>
              </div>
              {onToggleUnvisitedOpenerShortcut && (
                <label className="flex items-center justify-between group cursor-pointer pt-1 border-t border-[#edf2f7]">
                  <span className="text-[10px] text-[#444] group-hover:text-[#417abb] transition-colors">
                    Klavye Kısayolu (U tuşu)
                  </span>
                  <div className="sh-switch scale-75 origin-right">
                    <input
                      type="checkbox"
                      checked={isUnvisitedOpenerShortcutEnabled}
                      onChange={onToggleUnvisitedOpenerShortcut}
                    />
                    <div className="slider"></div>
                  </div>
                </label>
              )}
              {onToggleUnvisitedOpenerButton && (
                <label className="flex items-center justify-between group cursor-pointer">
                  <span className="text-[10px] text-[#444] group-hover:text-[#417abb] transition-colors">
                    Liste Üzerinde Hızlı Aç Butonu
                  </span>
                  <div className="sh-switch scale-75 origin-right">
                    <input
                      type="checkbox"
                      checked={isUnvisitedOpenerButtonEnabled}
                      onChange={onToggleUnvisitedOpenerButton}
                    />
                    <div className="slider"></div>
                  </div>
                </label>
              )}
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
          label="Elenen İlanları Belirginleştir"
          description="Elediğiniz ilanları listede üzeri çizili ve soluk gösterir, 'Elendi' rozetiyle nedenini sunar."
          checked={isEliminatedHighlightEnabled}
          onChange={onToggleEliminatedHighlight || (() => {})}
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
        Listeden İlan Gizleme (Filtreleme)
      </h2>
      <div className="space-y-2.5">
        <SettingItem
          label="Elenen İlanları Gizle"
          description="Elediğiniz ilanları arama sonuç listesinden tamamen kaldırır."
          checked={isHideEliminatedEnabled}
          onChange={onToggleHideEliminated || (() => {})}
        />

        <SettingItem
          label="Ziyaret Edilen İlanları Gizle"
          description="Daha önce incelediğiniz ilanları sonuç listesinden kaldırarak yeni ilanlara odaklanmanızı sağlar."
          checked={isHideVisitedEnabled}
          onChange={onToggleHideVisited || (() => {})}
          borderTop
        />

        <SettingItem
          label="Yenilenmiş Cihazları Gizle (Yepy)"
          description="Arama listelerinde ve tablolarda yer alan sponsorlu yenilenmiş telefon (Yepy) satır ve bloklarını gizler."
          checked={isHideRefurbishedEnabled}
          onChange={onToggleHideRefurbished}
          borderTop
        >
          {(isHideRefurbishedEnabled || ignoredRefurbishedCount > 0) && (
            <div className="mt-1.5 ml-1 pl-3 border-l-2 border-[#d0dbe5] flex items-center justify-between text-[10px] text-[#666] bg-[#f9fafb] py-1 px-2 rounded-r-xs">
              <div className="flex flex-col space-y-0.5">
                {isHideRefurbishedEnabled && (
                  <span>
                    Filtrelenen Yepy:{' '}
                    <strong className="text-[#222]">{filteredRefurbishedCount}</strong>
                  </span>
                )}
                {ignoredRefurbishedCount > 0 && (
                  <span>
                    Tekil Gizlenen:{' '}
                    <strong className="text-[#222]">{ignoredRefurbishedCount}</strong>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {filteredRefurbishedCount > 0 && onClearFilteredRefurbished && (
                  <button
                    type="button"
                    onClick={onClearFilteredRefurbished}
                    className="text-[9.5px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
                  >
                    Sıfırla
                  </button>
                )}
                {ignoredRefurbishedCount > 0 && onClearIgnoredRefurbished && (
                  <button
                    type="button"
                    onClick={onClearIgnoredRefurbished}
                    className="text-[9.5px] text-[#417abb] hover:text-[#2d5889] font-medium cursor-pointer"
                  >
                    Gizlenenleri Aç
                  </button>
                )}
              </div>
            </div>
          )}
        </SettingItem>

        <SettingItem
          label="Reklam & Doping Tanıtımlarını Temizle"
          description="Arama tablosundaki sponsorlu reklam satırlarını, doping tanıtım kutularını ve afiş alanlarını kaldırır."
          checked={isHideAdsEnabled}
          onChange={onToggleHideAds}
          borderTop
        >
          {isHideAdsEnabled && (
            <div className="mt-1.5 ml-1 pl-3 border-l-2 border-[#d0dbe5] flex items-center justify-between text-[10px] text-[#666] bg-[#f9fafb] py-1 px-2 rounded-r-xs">
              <span>
                Filtrelenen Reklam / Tanıtım:{' '}
                <strong className="text-[#222]">{filteredAdsCount}</strong>
              </span>
              {filteredAdsCount > 0 && onClearFilteredAds && (
                <button
                  type="button"
                  onClick={onClearFilteredAds}
                  className="text-[9.5px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
                >
                  Sıfırla
                </button>
              )}
            </div>
          )}
        </SettingItem>
      </div>

      {(isHideAdsEnabled || isHideRefurbishedEnabled) && (
        <div className="mt-2.5 pt-2 border-t border-[#f0f0f0] flex items-center justify-between text-[10.5px]">
          <span className="text-[#666]">
            Toplam Filtrelenen Öğe:{' '}
            <strong className="text-[#222]">
              {filteredAdsCount + filteredRefurbishedCount + ignoredRefurbishedCount}
            </strong>
          </span>
          {(filteredAdsCount > 0 || filteredRefurbishedCount > 0) && (
            <button
              type="button"
              onClick={() => {
                onClearFilteredAds?.();
                onClearFilteredRefurbished?.();
              }}
              className="text-[9.5px] text-[#888] hover:text-[#c00] transition-colors cursor-pointer"
            >
              Sayaçları Sıfırla
            </button>
          )}
        </div>
      )}
    </div>
  </section>
);
