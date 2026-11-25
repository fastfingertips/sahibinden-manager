# Yol Haritası ve Görev Listesi (TODO)

Bu belge **Sahibinden Manager** eklentisinin tamamlanan özelliklerini ve planlanan sonraki geliştirme aşamalarını takip eder.

---

## Tamamlanan Özellikler

### Liste ve Görünüm Yönetimi

- [x] **Kompakt Liste Modları:** Standart, Mini Resim (3.5x hover önizleme) ve Resimsiz (ultra kompakt tablo) görünümleri.
- [x] **Yerel Araç Çubuğu Entegrasyonu:** Sayfa düzenini bozmadan arama sıralama çubuğuna entegre aksiyon butonları.
- [x] **Ayrı Filtreleme Penceresi:** Elenen, ziyaret edilen, yenilenmiş cihaz (Yepy) ve reklam satırlarını tek pencereden açıp kapatabilme.
- [x] **AJAX Sayfalama Desteği:** Sayfa yenilemeden geçiş yapılan arama sonuçlarında rozet ve butonların otomatik uygulanması.

### Takip, Eleme ve Notlar

- [x] **Ziyaret Geçmişi Takibi:** İlk/son ziyaret zamanı ve ziyaret sayısının yerel bellekte saklanması, liste ve detayda rozet gösterimi.
- [x] **Tek Tıkla İlan Eleme:** Arama satırından ve detay sayfasından tek tıkla ilan eleme, isteğe bağlı eleme nedeni ekleme ve popup üzerinden arama/yönetme.
- [x] **Kişisel Not Defteri:** İlan detay sayfasında not alma/düzenleme, oluşturma ve düzenleme tarihleri takibi, listede rozet gösterimi.
- [x] **Ziyaret Edilmemişleri Toplu Açma:** Araç çubuğu butonu veya `U` klavye kısayoluyla incelenmemiş ilanları arka plan sekmelerinde açma.

### Medya, Veri ve Kullanıcı Deneyimi

- [x] **Yüksek Çözünürlüklü Fotoğraf İndirici & Izgara:** Ana fotoğraf, küçük resimler ve Mega Lightbox üzerinden `x16` çözünürlükte tek tıkla indirme; küçük resimlerin ızgara düzeninde gösterimi.
- [x] **Tek Tıkla Kopyalama Araçları:** İlan açıklaması, Soru-Cevap metinleri ve tüm yapılandırılmış ilan verisinin Markdown formatında panoya kopyalanması.
- [x] **Soru-Cevap ve Fiyat Geçmişi:** Gizli soru-cevap yanıtlarını otomatik genişletme, kendi sorularını işaretleme ve fiyat geçmişi özet istatistikleri.
- [x] **Klavye Gezinimi:** Arama listelerinde `Yukarı/Aşağı` ok tuşları ve `Enter` ile hızlı gezinme.
- [x] **Reklam & Yepy Temizliği:** Sponsorlu satırların ve yenilenmiş cihaz kutularının gizlenmesi, popup üzerinde anlık filtre istatistikleri.

### Depo ve Yayın Altyapısı

- [x] **Gizlilik ve Mağaza Hazırlığı:** Sıfır telemetri beyanı (`PRIVACY.md`), minimal vektörel logo seti, Chrome Web Store görselleri ve otomatik Release iş akışı.
- [x] **Kalite Kapıları:** Vitest birim testleri, ESLint, Prettier, TypeScript tip kontrolü, `jscpd` eşik denetimi, Firefox derleme kontrolü ve Dependabot.

---

## Planlanan Geliştirmeler (Backlog)

### Filtreleme ve Otomasyon

- [ ] **Kural Tabanlı Otomatik Filtreleme:** Belirli anahtar kelimelere (örn. "ağır hasarlı", "taksi çıkması") veya fiyat/km eşiklerine göre ilanları otomatik vurgulama veya gizleme.
- [ ] **Yerel Fiyat Değişim Hafızası (Zero-Network):** Kullanıcının daha önce ziyaret ettiği ilanların son görülen fiyatını yerel bellekte tutarak sonraki ziyaretlerde fiyat artış/düşüş yüzdesini otomatik gösterme.
- [ ] **Veri Dışa/İçe Aktarma (JSON Backup):** Notlar, elenen ilanlar ve ziyaret geçmişinin tek dosyada yedeklenmesi ve başka tarayıcıya aktarılması.

### Arayüz ve Tema

- [ ] **Yerel Karanlık Mod (Dark Theme):** Sayfa yüklenirken beyaz parlama (FOUC) oluşturmayan, sahibinden arayüzüne uyumlu isteğe bağlı karanlık tema.

### İsteğe Bağlı Yapay Zeka & Güvenlik

- [ ] **BYOK İlan Özeti:** Kullanıcının kendi API anahtarıyla (Gemini/OpenAI) uzun ilan açıklamalarından yapılandırılmış hasar/boya/tramer özeti çıkarma.
- [ ] **Mesajlaşma Güvenlik Kalkanı:** İlan mesajlaşma ekranında şüpheli harici ödeme/oltalama bağlantılarını görsel olarak uyarma.
