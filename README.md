# Sahibinden Manager

Sahibinden.com için geliştirilmiş tarayıcı eklentisidir.

---

## Kurulum ve Dağıtım

Proje güncel sürümlerine [Releases](https://github.com/fastfingertips/sahibinden-manager/releases) sayfasından indirilen `.zip` paketi ile veya kaynak koddan derleyerek erişebilirsiniz.

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

## Önerilen Kullanım

- **İçerik Engelleme**: Sayfalardaki reklam satırları (`nativeAd`), afişler ve reklam kutuları için [uBlock Origin](https://github.com/gorhill/uBlock) gibi bir içerik engelleyici kullanılabilir.
- **Karanlık Mod**: Gece kullanımı veya koyu tema tercihi için [Dark Reader](https://github.com/darkreader/darkreader) eklentisi tercih edilebilir.

## Teknik Detaylar

- **Framework**: WXT (Web Extension Toolbox)
- **UI**: React + Tailwind CSS
- **Dil**: TypeScript
- **Denetim**: ESLint, Prettier, jscpd

## Katkıda Bulunma

Hata bildirimleri ve geliştirmeler için Issues sayfasını kullanabilir veya Pull Request gönderebilirsiniz.

## Yasal Uyarı

Bu eklenti bağımsız bir projedir. sahibinden.com (Sahibinden Bilgi Teknolojileri Paz. ve Tic. A.Ş.) ile resmi bir bağı bulunmamaktadır.

---
