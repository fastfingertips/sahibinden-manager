export const AboutSection = () => (
  <section className="p-4 rounded bg-white border border-[#dbdbdb] shadow-sm">
    <div className="grid grid-cols-2 gap-8 mb-6">
      {/* Sol Sütun: Geliştirici ve Bağlantılar */}
      <div className="space-y-4">
        <div>
          <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-widest mb-2">
            Geliştirici
          </h2>
          <a
            href="https://github.com/fastfingertips"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#333] font-bold hover:text-[#417abb] transition-colors"
          >
            fastfingertips
          </a>
        </div>

        <div>
          <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-widest mb-2">
            Kaynak Kod
          </h2>
          <a
            href="https://github.com/fastfingertips/sahibinden-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-[#417abb] hover:underline font-medium"
          >
            github.com/sahibinden-manager
          </a>
        </div>
      </div>

      {/* Sağ Sütun: Proje Amacı */}
      <div className="space-y-4 border-l border-[#f0f0f0] pl-6">
        <div>
          <h2 className="text-[10px] font-bold text-[#666] uppercase tracking-widest mb-2">
            Proje Amacı
          </h2>
          <p className="text-[11px] text-[#555] leading-relaxed">
            Eklenti, Sahibinden.com üzerindeki ilan verilerinin ve görsellerinin erişilebilirliğini
            artırmak amacıyla geliştirilmiştir.
          </p>
        </div>
      </div>
    </div>

    {/* Yasal Uyarı - En Altta Tam Genişlik */}
    <div className="pt-4 border-t border-[#eee]">
      <h2 className="text-[10px] font-bold text-[#cc0000] uppercase tracking-widest mb-1.5">
        Yasal Uyarı
      </h2>
      <p className="text-[10px] text-[#999] leading-relaxed italic">
        Bu eklenti bağımsız bir projedir ve sahibinden.com (Sahibinden Bilgi Teknolojileri Paz. ve
        Tic. A.Ş.) ile resmi bir bağı bulunmamaktadır.
      </p>
    </div>
  </section>
);
