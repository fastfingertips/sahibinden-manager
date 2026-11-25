# Sahibinden Manager

[![GitHub Release](https://img.shields.io/github/v/release/fastfingertips/sahibinden-manager?style=flat-square&color=blue)](https://github.com/fastfingertips/sahibinden-manager/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/fastfingertips/sahibinden-manager/blob/main/LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/fastfingertips/sahibinden-manager/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/fastfingertips/sahibinden-manager/actions)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Local-success?style=flat-square)](https://github.com/fastfingertips/sahibinden-manager/blob/main/PRIVACY.md)

**Sahibinden Manager**, sahibinden.com üzerinde arama sonuçlarını filtrelemek, ziyaret geçmişini takip etmek, ilanları tek tıkla elemek, özel notlar almak ve fotoğraf indirmek için geliştirilmiş gelişmiş ve gizlilik odaklı bir tarayıcı eklentisidir.

---

## Öne Çıkan Özellikler

### 1. Kompakt Liste Görünümü

- **Mini Resim Modu:** İlan görselleri 42x32px boyutuna küçültülür, satırlar daraltılır. Fareyle üzerine gelindiğinde (hover) görsel otomatik olarak 3.5 kat büyüyerek anlık net önizleme sunar.
- **Resimsiz (Ultra Kompakt) Mod:** Resim sütunu tamamen gizlenir, satır yüksekliği ~30px'e iner. Tıpkı bir veri tablosu gibi tek sayfada 30-50 ilan aynı anda incelenebilir.
- **Standart Görünüm:** Orijinal büyük resimli görünüm.

### 2. Arama Toolbarı & İlan Gizleme (Filtreleme)

- Sahibinden'in yerel araç çubuğuna entegre butonlar ile sayfa akışını bozmadan anında yönetim.
- **Ayrı Filtreleme Penceresi:** Arama tablosundan elenenleri, ziyaret edilenleri, sponsorlu yenilenmiş cihazları (Yepy) ve reklam satırlarını tek tıkla gizleyebilir veya geri açabilirsiniz.
- Sayfadaki gizlenen ögelerin anlık sayaç gösterimi.

### 3. Ziyaret Edilmemiş İlanları Açma

- Sayfada daha önce incelemediğiniz ilanları tek tıkla veya klavye kısayoluyla (`U` tuşu) yeni arka plan sekmelerinde açar.
- Kaç ilan açılacağı (örn: 5 adet veya tümü) eklenti ayarlarından özelleştirilebilir.

### 4. Tek Tıkla İlan Eleme (Dismiss Listing)

- Arama tablosu satırında ve ilan detayında tek tıkla ilanı eleme imkânı.
- Elenen ilanlar arama tablosunda soluklaştırılır ve üzeri çizilir veya listeden tamamen gizlenebilir.
- İsteğe bağlı olarak eleme nedeni belirtebilme.

### 5. Kişisel İlan Not Defteri

- İlan detay sayfasında ilana özel notlar ekleyebilme.
- Not eklenen ilanlar arama listesinde **"Not Var"** sarı rozetiyle öne çıkar.

### 6. Ziyaret ve Zaman Rozetleri

- İlanın ne zaman incelendiğini gösteren **"Son Kontrol"** (örn: _5 dk önce bakıldı_) ve **"İlk Kontrol"** rozetleri.
- Satır hizasını bozmayan mutlak konumlandırma.

### 7. Fotoğraf İndirici & Mega Lightbox

- İlan ana fotoğrafını, küçük resimleri ve Mega Fotoğraf galeri görsellerini tek tıkla tam çözünürlükte indirme.

### 8. Fiyat Geçmişi Analizi & Soru-Cevap

- Favori ilan fiyat tarihçesinde yüzdelik değişim ve istatistik özetleri.
- İlan soru-cevap bölümünde gizli kalan yanıtları otomatik açma ve kendi sorularınızı ayırt etme.

---

## Gizlilik ve Güvenlik (%100 Yerel)

- **Sıfır Telemetri:** Hiçbir kişisel veri, gezinti geçmişi veya kullanım istatistiği harici sunuculara gönderilmez.
- **Yerel Depolama:** Tüm notlar, elenenler ve tercihler yalnızca tarayıcınızın kendi yerel `chrome.storage.local` alanında saklanır.
- Detaylı bilgi için [PRIVACY.md](https://github.com/fastfingertips/sahibinden-manager/blob/main/PRIVACY.md) belgesini inceleyebilirsiniz.

---

## Kurulum ve Dağıtım

### Yöntem 1: GitHub Releases Üzerinden (Önerilen)

1. [Releases](https://github.com/fastfingertips/sahibinden-manager/releases) sayfasından güncel sürümün `.zip` dosyasını indirin (`sahibinden-manager-*-chrome.zip` veya `firefox.zip`).
2. ZIP arşivini bir klasöre çıkartın.
3. Tarayıcınızda uzantı sayfasına gidin:
   - Chrome / Brave / Edge: `chrome://extensions` (Sağ üstten **Geliştirici Modu**'nu açın).
   - "Paketlenmemiş öğe yükle" butonuna tıklayıp çıkarttığınız klasörü seçin.

### Yöntem 2: Kaynak Koddan Derleme

```bash
# 1. Depoyu klonlayın
git clone https://github.com/fastfingertips/sahibinden-manager.git
cd sahibinden-manager

# 2. Bağımlılıkları yükleyin
npm install

# 3. Derleme sürecini başlatın
npm run build

# Firefox için:
npm run build:firefox

# ZIP paketleri oluşturmak için:
npm run zip
```

---

## Teknik Altyapı

- **Framework**: [WXT (Web Extension Toolbox)](https://wxt.dev/)
- **UI**: React 19 + Tailwind CSS v4
- **Dil**: TypeScript
- **Kalite Kontrol**: ESLint, Prettier, Husky, lint-staged, jscpd (Kod tekrar denetimi)
- **CI/CD**: GitHub Actions (Lint, Typecheck, Otomatik Release Paketleme)

---

## Lisans ve Yasal Uyarı

Bu proje [MIT Lisansı](https://github.com/fastfingertips/sahibinden-manager/blob/main/LICENSE) altında yayımlanmıştır.

**Yasal Uyarı:** Bu eklenti bağımsız bir açık kaynak projesidir. sahibinden.com (Sahibinden Bilgi Teknolojileri Paz. ve Tic. A.Ş.) ile doğrudan veya dolaylı hiçbir resmi bağı, ortaklığı veya sponsorluğu bulunmamaktadır.
