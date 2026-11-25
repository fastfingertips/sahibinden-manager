# Katkıda Bulunma Rehberi (Contributing)

**Sahibinden Manager** projesine katkıda bulunmak istediğiniz için teşekkürler. Tutarlı kod kalitesi ve sürdürülebilir bir geliştirme süreci için lütfen aşağıdaki standartlara uyun.

---

## Geliştirme Ortamını Kurma

Projeyi yerel ortamınızda çalıştırmak için **Node.js 20+** gereklidir.

```bash
git clone https://github.com/fastfingertips/sahibinden-manager.git
cd sahibinden-manager
npm install
```

### Geliştirme Sunucusu

```bash
# Chrome (MV3) geliştirme modu
npm run dev

# Firefox geliştirme modu
npm run dev:firefox
```

---

## Kalite Kontrolleri

Bir Pull Request açmadan önce aşağıdaki komutların tamamının hatasız tamamlandığından emin olun:

```bash
npm run format:check  # Prettier biçimlendirme kontrolü
npm run lint          # ESLint statik kod analizi
npm run compile       # TypeScript tip denetimi (tsc --noEmit)
npm test              # Vitest birim testleri
npm run jscpd         # Kod tekrarı eşik denetimi
npm run build         # Chrome üretim derlemesi
npm run build:firefox # Firefox üretim derlemesi
```

---

## Commit ve Dal (Branch) Kuralları

- **Dallar:** Yeni özellikler için `feat/<kisa-aciklama>`, hata düzeltmeleri için `fix/<kisa-aciklama>` şeklinde dallar açın.
- **Commit Mesajları:** [Conventional Commits](https://www.conventionalcommits.org/) standardını küçük harfle uygulayın (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `ci:`, `chore:`).
  - Örnek: `feat: add keyboard shortcut for filter modal`
  - Örnek: `fix: preserve badges after ajax pagination`
- **Gizlilik İlkesi:** Eklenti %100 yerel çalışır. Harici telemetri, analitik veya uzak sunucuya veri gönderen değişiklikler kabul edilmez.

---

## Pull Request Süreci

1. Değişikliklerinizi küçük, odaklı ve test edilmiş tutun.
2. Yeni saf yardımcı fonksiyonlar veya ayrıştırıcılar ekliyorsanız Vitest birim testlerini (`*.test.ts`) birlikte ekleyin.
3. PR şablonundaki kontrol listesini doldurarak incelemeye gönderin.
