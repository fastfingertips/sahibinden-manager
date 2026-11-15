# Sahibinden Manager

Sahibinden.com kullanıcı arayüzü ve veri erişimi için geliştirilmiş tarayıcı eklentisidir.

---

## Özellikler

- **Izgara Görünümü**: İlan sayfalarındaki fotoğrafları tek bir sayfa üzerinde ızgara düzeninde listeler.
- **Fotoğraf İndirici**:
  - İlan fotoğraflarının indirilmesini sağlar.
  - Mega Slideshow (Slideshow) üzerinden veri erişimi ve indirme desteği sunar.
- **Ziyaret Geçmişi ve Takip**:
  - İncelenen ilanları yerel hafızada saklar ve popup arayüzünde listeler.
  - Arama sonuçlarında ve ilan detayında ilanın ne kadar süre önce incelendiğini (göreceli zaman ile) gösterir.

## Kurulum ve Dağıtım

Proje kararlı duruma ulaştığında Chrome Web Store üzerinde yayınlanacaktır. Bu aşamaya kadar güncel sürümlere [Releases](https://github.com/fastfingertips/sahibinden-manager/releases) sayfasından indirilen `.zip` paketi ile veya kaynak koddan derleyerek erişebilirsiniz.

### Manuel Kurulum (Geliştirici Modu)

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/fastfingertips/sahibinden-manager.git
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Derleme sürecini başlatın:
   ```bash
   npm run build
   ```
4. Tarayıcınızda (Chrome/Edge) `chrome://extensions` adresine gidin.
5. "Paketlenmemiş öğe yükle" butonuna tıklayın ve `.output/chrome-mv3` klasörünü seçin.

## Teknik Detaylar

- **Framework**: WXT (Web Extension Toolbox)
- **UI**: React + Tailwind CSS
- **Dil**: TypeScript
- **Denetim**: ESLint, Prettier, jscpd

## Katkıda Bulunma

Hata bildirimleri ve geliştirmeler için Issues sayfasını kullanabilir veya Pull Request göndererek katkı sağlayabilirsiniz.

## Yasal Uyarı

Bu eklenti bağımsız bir projedir. sahibinden.com (Sahibinden Bilgi Teknolojileri Paz. ve Tic. A.Ş.) ile resmi bir bağı bulunmamaktadır.

---
