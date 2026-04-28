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
- [ ] Belirli kurallara (örn. anahtar kelime, fiyat) uymayan ilanları arama sonuçlarından otomatik çıkaran filtrenin eklenmesi.
- [ ] Hafızada kayıtlı olan "incelenmiş ilanların" arama sonuçları listesinde otomatik olarak gizlenmesi (veya silik gösterilmesi).
  - Gerekçe: Vakit kaybının önlenmesi.

### 2. Otomasyon

- [ ] Kullanıcının detaylarına girdiği (incelediği) ilanların ID'lerinin yerel hafızada (Local Storage vb.) tutulması.

### 3. Medya

- [x] İlan detay sayfasındaki (DOM üzerindeki) yüksek çözünürlüklü fotoğraf URL'lerinin tespit edilmesi.
- [x] Fotoğraflarını indirebilmek: İlan detay sayfasında bulunan fotoğrafları yerel cihaza indirebilme yeteneği.
  - Gerekçe: Geneldir. Örneğin fatura gibi metinsel medyaların yakınlaştırılmasında işe yarayabilir.
- [x] İlan küçük resimlerinin (thumbnails) sayfalama yerine tek bir sayfada ızgara (grid) şeklinde listelenmesi.

### 4. Kullanıcı Deneyimi (UX)

- [ ] Kullanıcı Sahibinden.com dışında farklı bir sayfadayken eklentiye tıklandığında, arayüzde "Bu eklenti yalnızca sahibinden.com üzerinde çalışır" şeklinde bilgilendirici bir uyarı gösterilmesi.
- [ ] Özelliklerin (Izgara Görünümü ve Fotoğraf İndirici) ilk kurulumda varsayılan olarak Açık (True) gelmesinin sağlanması. (Kullanıcının eklentiyi kurar kurmaz etkiyi görebilmesi için).
