# Sahibinden Manager TODO

## İlan Route'u

```http
Şablon:
[protocol]://[domain]/[directory]/[main_category]-[sub_categories]-[title_slug]-[listing_id]/[page_view]

Örnek:
https://www.sahibinden.com/ilan/emlak-konut-satilik-daire-deniz-manzarali-kelepir-3-arti-1-daire-9876543210/detay
```

## Özellikler

### 1. Yoksayma (Ignore)

- [ ] Kullanıcının spesifik bir ilanı butona basarak arayüzden gizleyebilmesi.
- [x] Sahibinden Yepy yenilenmiş cihazlarında (`.refurbishment-content-box`, `tr:has(.refurbishment)`) tekil 'Gizle' butonu ve popup üzerinden tüm yenilenmiş ürünleri toplu gizleme seçeneğinin sağlanması.
  - Gerekçe: Sahibinden'in kurumsal pazaryeri statüsünde sunduğu yenilenmiş telefonlarda yerel `mark-as-ignored` butonu bulunmamaktadır.
- [ ] Belirli kurallara (örn. anahtar kelime, fiyat) uymayan ilanları arama sonuçlarından otomatik çıkaran filtrenin eklenmesi.
- [x] Hafızada kayıtlı olan "incelenmiş ilanların" arama sonuçları listesinde otomatik olarak silik gösterilmesi/vurgulanması ve detay sayfasında belirtilmesi.
  - Gerekçe: Vakit kaybının önlenmesi.

### 2. Otomasyon

- [x] Kullanıcının detaylarına girdiği (incelediği) ilanların ID'lerinin yerel hafızada (Local Storage vb.) tutulması.
- [ ] Sıfır ağ isteği (Zero-Network) ile çalışan yerel fiyat değişim hafızası (fiyat düşüş/artış ve manipülasyon takibi).
- [x] İlan detay sayfasında kişisel notlar alabilme (Lokal Not Defteri) ve listelerde 'Not Var' rozetiyle vurgulanması.

### 3. Medya

- [x] İlan detay sayfasındaki (DOM üzerindeki) yüksek çözünürlüklü fotoğraf URL'lerinin tespit edilmesi.
- [x] Fotoğraflarını indirebilmek: İlan detay sayfasında bulunan fotoğrafları yerel cihaza indirebilme yeteneği.
  - Gerekçe: Geneldir. Örneğin fatura gibi metinsel medyaların yakınlaştırılmasında işe yarayabilir.
- [x] İlan küçük resimlerinin (thumbnails) sayfalama yerine tek bir sayfada ızgara (grid) şeklinde listelenmesi.

### 4. Kullanıcı Deneyimi (UX)

- [x] İlan detay sayfasındaki açıklama metnini tek tıkla panoya kopyalama butonu ('Açıklamayı Kopyala').
- [x] İlan detay sayfasındaki soru-cevap konuşmalarında gizli kalan yanıtları otomatik genişletme seçeneği ('Soru-Cevapları Otomatik Genişlet').
- [x] Arama listelerinde yukarı / aşağı ok tuşları ile ilanlar arasında gezinme ve Enter ile ilanı açabilme (isteğe bağlı yeni sekmede açma desteği).
- [x] Kullanıcı Sahibinden.com dışında farklı bir sayfadayken eklentiye tıklandığında, arayüzde "Bu eklenti yalnızca sahibinden.com üzerinde çalışır" şeklinde bilgilendirici bir uyarı gösterilmesi.
- [x] Özelliklerin (Izgara Görünümü ve Fotoğraf İndirici) ilk kurulumda varsayılan olarak Açık (True) gelmesinin sağlanması. (Kullanıcının eklentiyi kurar kurmaz etkiyi görebilmesi için).
- [ ] Gecikmesiz ve beyaz parlama (flashbang) yaratmayan Karanlık Mod (Dark Theme).

### 5. Arayüz Temizliği

- [x] Arama listelerindeki harici reklam satırlarının (`#searchResultsTable tr.nativeAd`, `tr.classicNativeAd`, `tr.searchResultsPromoToplist`) ve ilan detayındaki reklam kutularının (`div[id^="div-gpt-ad-"]`) temizlenmesi için isteğe bağlı arayüz anahtarının sağlanması.
  - Gerekçe: Yanlış tıklamaların ve sayfa kaymalarının (CLS) önlenmesi.

### 6. Yapay Zeka & Güvenlik

- [ ] Kullanıcının kendi Gemini/OpenAI API anahtarı (BYOK) ile ilan açıklamalarından yapılandırılmış hasar/tramer/boya tablosu çıkaran LLM analizi.
- [ ] Sahibinden mesajlaşma arayüzünde harici oltalama (phishing) bağlantılarını denetleyen Güvenlik Kalkanı.
