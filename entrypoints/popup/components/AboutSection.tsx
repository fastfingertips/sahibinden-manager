export const AboutSection = () => (
  <section className="p-3 rounded-sm bg-white border border-[#dbdbdb] shadow-xs text-[11px]">
    <div className="grid grid-cols-2 gap-4 mb-3">
      {/* Sol Sütun: Geliştirici ve Bağlantılar */}
      <div className="space-y-2.5">
        <div>
          <h2 className="text-[9.5px] font-bold text-[#666] uppercase tracking-wider mb-1">
            Geliştirici
          </h2>
          <a
            href="https://github.com/fastfingertips"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11.5px] text-[#222] font-semibold hover:text-[#417abb] transition-colors"
          >
            fastfingertips
          </a>
        </div>

        <div>
          <h2 className="text-[9.5px] font-bold text-[#666] uppercase tracking-wider mb-1">
            Kaynak Kod
          </h2>
          <a
            href="https://github.com/fastfingertips/sahibinden-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[10.5px] text-[#417abb] hover:underline font-semibold"
          >
            github.com/sahibinden-manager
          </a>
        </div>
      </div>

      {/* Sağ Sütun: Proje Amacı */}
      <div className="space-y-2.5 border-l border-[#f0f0f0] pl-3">
        <div>
          <h2 className="text-[9.5px] font-bold text-[#666] uppercase tracking-wider mb-1">
            Proje Amacı
          </h2>
          <p className="text-[10.5px] text-[#555] leading-snug">
            Eklenti, Sahibinden.com üzerindeki ilan verilerinin ve görsellerinin erişilebilirliğini
            artırmak amacıyla geliştirilmiştir.
          </p>
        </div>
      </div>
    </div>

    {/* Yasal Uyarı */}
    <div className="pt-2 border-t border-[#eee]">
      <p className="text-[9.5px] text-[#888] leading-tight">
        <strong>Yasal Uyarı:</strong> Bu proje bağımsız ve açık kaynaklı bir yazılımdır.
        Sahibinden.com ile resmi veya kurumsal bir bağlantısı bulunmamaktadır.
      </p>
    </div>
  </section>
);
