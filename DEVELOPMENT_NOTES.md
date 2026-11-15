# Development Notes & Ecosystem Strategy

## 1. Architectural Principles

### Zero-Network Policy (Stealth Architecture)

- **Problem:** Conventional scraping tools or extensions trigger platform WAF / anti-bot defenses (Cloudflare, DataDome) by sending synthetic background requests.
- **Solution:** `sahibinden-manager` strictly operates client-side on organically navigated pages. Zero background requests are dispatched to sahibinden.com servers.
- **Storage:** All analytics, visited listings, and price points are stored locally via `chrome.storage.local`.

### Native Theme Integration

- Extension injected styles strictly inherit Sahibinden's original typography and token standards:
  - Font family: `SHBGroteskLegacy, Roboto, sans-serif, inherit`
  - Colors: Primary blue (`#417abb`), dark hover (`#366196`), neutral panel border (`#dbdbdb`), neutral background (`#f9f9f9`)
  - Border radius: `2px` (matching Sahibinden components)

---

## 2. Strategic Roadmap & Planned Modules

### Phase 1: Market Transparency & Price Tracking

- **Local Price History:**
  - Capture listing price along with listing ID during browsing.
  - Detect price drops, increases, and notification-spam manipulations (e.g., dropping 1 TL to trigger favorites notification).
  - Display non-intrusive badge: `↓ %5 (Old: 1.250.000 TL)`.

### Phase 2: Exclude Filters & Noise Reduction

- **Keyword & Seller Blacklist:**
  - Exclude listings matching user-defined keywords (e.g., "heavy damage", "scrapped", "salvage").
  - Block specific sellers or agencies.
- **Refurbished Products (Yepy) Filter:**
  - Ability to hide sponsored refurbished devices globally or individually.
- **Native Ad Cleaner:**
  - Remove disguised `tr.nativeAd` and intrusive GPT banner slots.

### Phase 3: Productivity & User Tools

- **Local Listing Notes:**
  - Private notes attached to listing IDs (e.g., phone call notes, minimum price quotes).
- **Zero-Flashbang Dark Theme:**
  - Early CSS injection at `run_at: "document_start"` preventing white flash screen.

### Phase 4: AI & Security Enhancements

- **LLM-Powered Description & Damage Analyzer (BYOK):**
  - Bring-Your-Own-Key model (e.g., Gemini API).
  - Automatically parse 500-word classified descriptions into structured tables (painted parts, replaced parts, damage/tramer records).
- **Communication Security Shield:**
  - Real-time scanner for `/mesajlar` page detecting unverified external links to prevent phishing attacks.
