interface SettingsSectionProps {
  isFullGridEnabled: boolean;
  onToggleFullGrid: () => void;
  isDownloaderEnabled: boolean;
  onToggleDownloader: () => void;
}

export const SettingsSection = ({
  isFullGridEnabled,
  onToggleFullGrid,
  isDownloaderEnabled,
  onToggleDownloader,
}: SettingsSectionProps) => (
  <section className="p-4 rounded bg-white border border-[#dbdbdb] shadow-sm">
    <h2 className="text-xs font-bold text-[#666] uppercase tracking-wide mb-3">Hızlı Ayarlar</h2>
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
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
          İlan sayfasındaki küçük resimleri ızgara düzeninde listeler.
        </p>
      </div>

      <div className="flex flex-col space-y-2">
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
          İlan resimleri ve Mega Slideshow üzerindeki görsellerin indirilmesini sağlar.
        </p>
      </div>
    </div>
  </section>
);
