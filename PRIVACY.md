# Privacy Policy / Gizlilik Politikası

_Last Updated / Son Güncelleme: 2026-11-25_

---

## English

### 1. Overview

**Sahibinden Manager** is an open-source browser extension developed by **fastfingertips** to enhance user experience on sahibinden.com. We are committed to protecting your privacy. This extension is designed with a **privacy-first, offline-first** philosophy.

### 2. Data Collection and Transmission

- **Zero Remote Telemetry & Tracking:** Sahibinden Manager does **NOT** collect, track, transmit, or sell any personal data, browsing history, or user activity to external servers or third parties.
- **100% Local Storage:** All extension data (including personal notes on listings, list of eliminated listings, visited listing timestamps, and UI configuration settings) is stored strictly on your local device using the browser's native `chrome.storage.local` API.
- **No Analytics / No Third-Party Scripts:** No third-party tracking services (such as Google Analytics, Mixpanel, or advertising networks) are bundled or loaded.

### 3. Permissions Justification

Sahibinden Manager only requests the minimum necessary permissions required for its documented features:

| Permission                   | Purpose / Justification                                                                                                                                          |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storage`                    | Stores your custom listing notes, eliminated listing records, visit history timestamps, and interface preferences locally on your computer.                      |
| `downloads`                  | Allows saving high-resolution listing images and photo archives directly to your computer when you explicitly click a download button.                           |
| `tabs`                       | Enables the "Open Unvisited Listings" feature to open unvisited search results in new background tabs upon clicking the toolbar button or pressing the shortcut. |
| `activeTab`                  | Allows the extension popup to determine whether you are currently viewing a sahibinden.com page to show relevant listing actions.                                |
| `https://*.sahibinden.com/*` | Restricts content script execution strictly to sahibinden.com domains to display badges, compact list modes, and toolbar controls.                               |

### 4. Data Control and Deletion

You have complete control over all data created by the extension:

- You can clear your visited history, delete notes, reset eliminated listings, or restore default settings at any time directly from the extension popup interface.
- Removing or uninstalling the extension from your browser instantly and permanently deletes all stored local data.

### 5. Contact & Open Source Transparency

Sahibinden Manager is open source under the MIT License. The complete source code is publicly inspectable at:
[https://github.com/fastfingertips/sahibinden-manager](https://github.com/fastfingertips/sahibinden-manager)

If you have any questions or feedback regarding this privacy policy, please open an issue on the GitHub repository.

---

## Türkçe

### 1. Genel Bakış

**Sahibinden Manager**, **fastfingertips** tarafından sahibinden.com kullanıcı deneyimini iyileştirmek amacıyla geliştirilmiş açık kaynaklı bir tarayıcı eklentisidir. Gizliliğinize en üst düzeyde saygı duyuyoruz. Eklentimiz **önce gizlilik (privacy-first)** ilkesiyle tasarlanmıştır.

### 2. Veri Toplama ve İletim

- **Sıfır Harici İletişim & Takip:** Sahibinden Manager hiçbir kişisel bilginizi, gezinti geçmişinizi veya kullanım verinizi harici sunuculara göndermez, kaydetmez ve üçüncü taraflarla paylaşmaz.
- **%100 Yerel Depolama:** İlanlara eklediğiniz özel notlar, elediğiniz ilanlar, ziyaret zaman kayıtları ve arayüz tercihleri yalnızca kendi bilgisayarınızda tarayıcının yerel depolama alanı (`chrome.storage.local`) içinde saklanır.
- **Analitik veya Reklam Yoktur:** Eklenti içinde hiçbir üçüncü taraf takip aracı (Google Analytics, reklam ağları vb.) yer almaz.

### 3. İzinlerin Kullanım Amaçları

Eklenti yalnızca özelliklerinin gerektirdiği minimum izinleri talep eder:

| İzin                         | Kullanım Gerekçesi                                                                                                                      |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `storage`                    | İlan notlarınızı, elenen ilan listenizi, ziyaret kayıtlarınızı ve görünüm tercihlerinizi yerel diskinizde saklar.                       |
| `downloads`                  | İlan detayında indirme butonlarına tıkladığınızda fotoğrafları bilgisayarınızın indirme klasörüne kaydeder.                             |
| `tabs`                       | "Ziyaret Edilmemişleri Aç" butonuna tıkladığınızda veya kısayol kullandığınızda bakmadığınız ilanları yeni arka plan sekmelerinde açar. |
| `activeTab`                  | Eklenti popup penceresinin mevcut sekmenin sahibinden.com olup olmadığını algılamasını sağlar.                                          |
| `https://*.sahibinden.com/*` | Eklentinin yalnızca sahibinden.com alan adı üzerinde çalışmasını sınırlandırır.                                                         |

### 4. Verilerinizi Yönetme ve Silme

- Eklenti penceresi (Popup) üzerinden istediğiniz zaman geçmişi temizleyebilir, notları silebilir veya ayarları sıfırlayabilirsiniz.
- Eklentiyi tarayıcınızdan kaldırdığınızda yerel diskte saklanan tüm veriler kalıcı olarak silinir.

### 5. Açık Kaynak Şeffaflığı ve İletişim

Sahibinden Manager açık kaynak kodludur (MIT Lisansı). Kaynak kodları GitHub üzerinden incelenebilir:
[https://github.com/fastfingertips/sahibinden-manager](https://github.com/fastfingertips/sahibinden-manager)
Sorularınız ve geri bildirimleriniz için GitHub Issues bölümünden bize ulaşabilirsiniz.
