import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image

OUTPUT_DIR = os.path.abspath('assets/store')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# SVG Logo string
LOGO_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="112" fill="#FFDA00"/>
  <line x1="94" y1="402" x2="250" y2="110" stroke="#18181B" stroke-width="44" stroke-linecap="round"/>
  <line x1="178" y1="402" x2="334" y2="110" stroke="#18181B" stroke-width="44" stroke-linecap="round"/>
  <line x1="262" y1="402" x2="418" y2="110" stroke="#18181B" stroke-width="44" stroke-linecap="round"/>
</svg>"""

HTML_SCREENSHOT = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }}
  body {{ width: 1280px; height: 800px; background: #f4f4f4; overflow: hidden; display: flex; flex-direction: column; }}
  
  /* Sahibinden Header */
  .header {{ background: #ffda00; height: 52px; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e0be00; }}
  .logo-area {{ display: flex; align-items: center; gap: 12px; }}
  .brand-logo {{ width: 34px; height: 34px; }}
  .brand-title {{ font-size: 20px; font-weight: 800; color: #111; letter-spacing: -0.5px; }}
  .search-mock {{ background: #fff; width: 480px; height: 34px; border-radius: 4px; display: flex; align-items: center; padding: 0 12px; font-size: 13px; color: #555; border: 1px solid #dcdcdc; }}
  .user-mock {{ display: flex; align-items: center; gap: 16px; font-size: 12px; font-weight: 600; color: #222; }}
  
  /* Breadcrumbs & Toolbar */
  .sub-bar {{ background: #fff; padding: 10px 24px; border-bottom: 1px solid #e5e5e5; display: flex; justify-content: space-between; align-items: center; }}
  .breadcrumbs {{ font-size: 11.5px; color: #666; }}
  .breadcrumbs b {{ color: #222; font-weight: 700; }}
  
  /* Extension Native Toolbar */
  .sm-toolbar {{ display: flex; align-items: center; gap: 10px; background: #fdfdfd; padding: 5px 10px; border-radius: 6px; border: 1px solid #d5d9df; }}
  .sm-label {{ font-size: 11px; font-weight: 700; color: #444; }}
  .sm-btn-group {{ display: flex; background: #e9ecef; border-radius: 4px; padding: 2px; gap: 2px; }}
  .sm-btn-mode {{ padding: 3px 8px; font-size: 10.5px; font-weight: 600; border-radius: 3px; border: none; cursor: pointer; color: #495057; background: transparent; }}
  .sm-btn-mode.active {{ background: #fff; color: #0078d4; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }}
  .sm-action-btn {{ background: #0078d4; color: #fff; border: none; border-radius: 4px; padding: 4px 10px; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 5px; }}
  .sm-filter-btn {{ background: #fff; color: #333; border: 1px solid #ccc; border-radius: 4px; padding: 4px 10px; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 5px; }}
  
  /* Main Container */
  .main {{ display: flex; flex: 1; padding: 14px 24px; gap: 18px; }}
  
  /* Listing Table Area */
  .listing-col {{ flex: 1; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; }}
  .table-header {{ display: flex; background: #f8fafc; border-bottom: 2px solid #e2e8f0; padding: 10px 14px; font-size: 11.5px; font-weight: 700; color: #475569; }}
  
  .listing-row {{ display: flex; padding: 12px 14px; border-bottom: 1px solid #edf2f7; position: relative; align-items: flex-start; gap: 12px; }}
  .listing-row.visited {{ background: #f8fbff; }}
  .listing-row.eliminated {{ background: #fcfcfc; opacity: 0.65; }}
  
  .thumb {{ width: 72px; height: 54px; border-radius: 4px; object-fit: cover; background: #e2e8f0; flex-shrink: 0; }}
  .details {{ flex: 1; display: flex; flex-direction: column; gap: 4px; }}
  
  /* Badges */
  .badge-row {{ display: flex; align-items: center; gap: 6px; margin-bottom: 2px; }}
  .badge-visited {{ background: #ebf5ff; color: #0078d4; border: 1px solid #cce4ff; font-size: 10.5px; font-weight: 700; padding: 1px 7px; border-radius: 3px; display: inline-flex; align-items: center; gap: 4px; }}
  .badge-eliminated {{ background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; font-size: 10.5px; font-weight: 700; padding: 1px 7px; border-radius: 3px; }}
  
  .title {{ font-size: 13.5px; font-weight: 600; color: #1e293b; text-decoration: none; }}
  .eliminated .title {{ text-decoration: line-through; color: #64748b; }}
  .note-text {{ font-size: 11.5px; color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; padding: 4px 8px; border-radius: 4px; margin-top: 4px; }}
  
  .right-info {{ display: flex; flex-direction: column; align-items: flex-end; gap: 4px; width: 140px; }}
  .price {{ font-size: 15px; font-weight: 800; color: #0f172a; }}
  .date-loc {{ font-size: 11px; color: #64748b; text-align: right; }}
  
  .eliminate-btn {{ position: absolute; top: 10px; right: 12px; width: 22px; height: 22px; border-radius: 4px; border: 1px solid #cbd5e1; background: #fff; color: #94a3b8; display: flex; align-items: center; justify-content: center; cursor: pointer; }}
  .eliminate-btn.active {{ background: #fee2e2; border-color: #fca5a5; color: #dc2626; }}
  
  /* Popup Widget Panel */
  .popup-card {{ width: 360px; background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column; }}
  .popup-header {{ background: #ffda00; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.1); }}
  .popup-brand {{ display: flex; align-items: center; gap: 8px; }}
  .popup-brand-logo {{ width: 26px; height: 26px; }}
  .popup-brand h2 {{ font-size: 13px; font-weight: 800; color: #222; text-transform: uppercase; margin: 0; }}
  
  .nav-tabs {{ display: flex; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }}
  .nav-tab {{ flex: 1; padding: 9px 0; text-align: center; font-size: 11.5px; font-weight: 600; color: #64748b; border-bottom: 2px solid transparent; }}
  .nav-tab.active {{ color: #0078d4; border-bottom-color: #0078d4; background: #fff; }}
  
  .popup-body {{ padding: 14px; display: flex; flex-direction: column; gap: 12px; }}
  .stats-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }}
  .stat-box {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 6px; text-align: center; }}
  .stat-val {{ font-size: 16px; font-weight: 800; color: #0f172a; }}
  .stat-lbl {{ font-size: 9.5px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 2px; }}
  
  .toggle-list {{ display: flex; flex-direction: column; gap: 8px; }}
  .toggle-item {{ display: flex; justify-content: space-between; align-items: center; padding: 7px 10px; background: #f8fafc; border: 1px solid #edf2f7; border-radius: 5px; }}
  .toggle-title {{ font-size: 11px; font-weight: 600; color: #334155; }}
  .toggle-switch {{ width: 34px; height: 18px; background: #0078d4; border-radius: 9px; position: relative; }}
  .toggle-knob {{ width: 14px; height: 14px; background: #fff; border-radius: 7px; position: absolute; top: 2px; right: 2px; }}
</style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="logo-area">
      <div class="brand-logo">{LOGO_SVG}</div>
      <span class="brand-title">sahibinden.com</span>
    </div>
    <div class="search-mock">
      <span>🔍 Kelime, ilan no veya mağaza adı ile ara...</span>
    </div>
    <div class="user-mock">
      <span>Bana Özel</span>
      <span>İlan Ver</span>
    </div>
  </div>

  <!-- Sub-bar & Native Toolbar -->
  <div class="sub-bar">
    <div class="breadcrumbs">
      Ana Sayfa > Vasıta > Otomobil > BMW > 3 Serisi > <b>320i ED</b>
    </div>
    <div class="sm-toolbar">
      <span class="sm-label">Görünüm:</span>
      <div class="sm-btn-group">
        <button class="sm-btn-mode">Standart</button>
        <button class="sm-btn-mode active">Mini Resim</button>
        <button class="sm-btn-mode">Resimsiz</button>
      </div>
      <button class="sm-action-btn">
        <span>✓ Ziyaret Edilmemişleri Aç (10)</span>
      </button>
      <button class="sm-filter-btn">
        <span>⚙ İlanları Gizle</span>
      </button>
    </div>
  </div>

  <!-- Main Body -->
  <div class="main">
    <!-- Listing Column -->
    <div class="listing-col">
      <div class="table-header">
        <span style="width: 80px;">Görsel</span>
        <span style="flex: 1;">İlan Başlığı & Detaylar</span>
        <span style="width: 140px; text-align: right;">Fiyat & Konum</span>
      </div>

      <!-- Item 1: Visited -->
      <div class="listing-row visited">
        <svg class="thumb" viewBox="0 0 72 54" fill="#cbd5e1"><rect width="72" height="54" fill="#e2e8f0"/><path d="M16 38l12-14 10 10 12-16 14 20H8z" fill="#94a3b8"/></svg>
        <div class="details">
          <div class="badge-row">
            <span class="badge-visited">✓ 15 dakika önce bakıldı · 1. Ziyaret</span>
            <span style="font-size: 10.5px; color: #64748b; font-weight: 600;">#1248921045</span>
          </div>
          <a href="#" class="title">2016 BMW 320i ED 40.Yıl Paket Hatasız Boyasız Yetkili Servis Bakımlı</a>
          <div class="note-text">
            📝 <b>Not:</b> Satıcı arandı, ekspertiz raporu istendi. Takas teklifine açık.
          </div>
        </div>
        <div class="right-info">
          <span class="price">1.450.000 TL</span>
          <span class="date-loc">Bugün 10:20<br>İstanbul / Kadıköy</span>
        </div>
        <div class="eliminate-btn">✕</div>
      </div>

      <!-- Item 2: Eliminated -->
      <div class="listing-row eliminated">
        <svg class="thumb" viewBox="0 0 72 54" fill="#cbd5e1"><rect width="72" height="54" fill="#e2e8f0"/><path d="M16 38l12-14 10 10 12-16 14 20H8z" fill="#94a3b8"/></svg>
        <div class="details">
          <div class="badge-row">
            <span class="badge-eliminated">✕ Elendi: Ağır hasar kayıtlı, tavan boyalı</span>
          </div>
          <a href="#" class="title">2015 BMW 320i ED Sport Line Uygun Fiyat Acil Satılık</a>
        </div>
        <div class="right-info">
          <span class="price" style="color: #64748b;">1.180.000 TL</span>
          <span class="date-loc">Dün 18:45<br>Ankara / Çankaya</span>
        </div>
        <div class="eliminate-btn active">✕</div>
      </div>

      <!-- Item 3: Regular Listing with Quick Badges -->
      <div class="listing-row">
        <svg class="thumb" viewBox="0 0 72 54" fill="#cbd5e1"><rect width="72" height="54" fill="#e2e8f0"/><path d="M16 38l12-14 10 10 12-16 14 20H8z" fill="#94a3b8"/></svg>
        <div class="details">
          <div class="badge-row">
            <span style="font-size: 10.5px; color: #64748b; font-weight: 600;">#1248100234</span>
            <span style="font-size: 10px; background: #f1f5f9; color: #475569; padding: 1px 6px; border-radius: 3px;">Henüz bakılmadı</span>
          </div>
          <a href="#" class="title">2017 BMW 320i ED Luxury Line Düşük Kilometre Sunrooflu</a>
        </div>
        <div class="right-info">
          <span class="price">1.520.000 TL</span>
          <span class="date-loc">Bugün 08:30<br>İzmir / Bornova</span>
        </div>
        <div class="eliminate-btn">✕</div>
      </div>
    </div>

    <!-- Popup Extension Column -->
    <div class="popup-card">
      <div class="popup-header">
        <div class="popup-brand">
          <div class="popup-brand-logo">{LOGO_SVG}</div>
          <h2>Sahibinden Manager</h2>
        </div>
        <span style="font-size: 10px; font-weight: 700; background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 3px;">v1.1.0</span>
      </div>

      <div class="nav-tabs">
        <div class="nav-tab active">Ayarlar</div>
        <div class="nav-tab">Notlar (3)</div>
        <div class="nav-tab">Elenenler (5)</div>
        <div class="nav-tab">Geçmiş (42)</div>
      </div>

      <div class="popup-body">
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-val" style="color: #0078d4;">42</div>
            <div class="stat-lbl">Ziyaret</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" style="color: #dc2626;">5</div>
            <div class="stat-lbl">Elenen</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" style="color: #16a34a;">3</div>
            <div class="stat-lbl">Not</div>
          </div>
        </div>

        <div class="toggle-list">
          <div class="toggle-item">
            <span class="toggle-title">Kompakt Liste (Mini Resim)</span>
            <div class="toggle-switch"><div class="toggle-knob"></div></div>
          </div>
          <div class="toggle-item">
            <span class="toggle-title">Ziyaret & Zaman Rozetleri</span>
            <div class="toggle-switch"><div class="toggle-knob"></div></div>
          </div>
          <div class="toggle-item">
            <span class="toggle-title">Tek Tıkla İlan Eleme Butonu</span>
            <div class="toggle-switch"><div class="toggle-knob"></div></div>
          </div>
          <div class="toggle-item">
            <span class="toggle-title">Fiyat Geçmişi Analizi</span>
            <div class="toggle-switch"><div class="toggle-knob"></div></div>
          </div>
          <div class="toggle-item">
            <span class="toggle-title">Yenilenmiş (Yepy) İlanları Gizle</span>
            <div class="toggle-switch"><div class="toggle-knob"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
"""

HTML_PROMO_SMALL = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }}
  body {{ width: 440px; height: 280px; background: linear-gradient(135deg, #090d16 0%, #1e293b 100%); overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; text-align: center; padding: 20px; }}
  
  .glow {{ position: absolute; width: 260px; height: 260px; background: radial-gradient(circle, rgba(255, 218, 0, 0.15) 0%, rgba(255, 218, 0, 0) 70%); top: -40px; border-radius: 50%; pointer-events: none; }}
  
  .logo {{ width: 68px; height: 68px; margin-bottom: 12px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3)); }}
  
  h1 {{ font-size: 23px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 4px; }}
  h1 span {{ color: #ffda00; }}
  
  p {{ font-size: 12px; color: #94a3b8; font-weight: 500; margin-bottom: 14px; max-width: 340px; }}
  
  .pills {{ display: flex; gap: 6px; justify-content: center; }}
  .pill {{ font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 12px; background: rgba(255,255,255,0.08); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.12); }}
  .pill.highlight {{ background: rgba(255, 218, 0, 0.15); color: #ffda00; border-color: rgba(255, 218, 0, 0.3); }}
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo">{LOGO_SVG}</div>
  <h1>Sahibinden <span>Manager</span></h1>
  <p>Ziyaret takibi, tek tıkla ilan eleme, özel notlar ve kompakt liste görünümü</p>
  <div class="pills">
    <span class="pill highlight">✓ Ziyaret Takibi</span>
    <span class="pill">✕ İlan Eleme</span>
    <span class="pill">📝 Not Defteri</span>
    <span class="pill">⚡ Kompakt Liste</span>
  </div>
</body>
</html>
"""

HTML_PROMO_MARQUEE = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }}
  body {{ width: 1400px; height: 560px; background: linear-gradient(120deg, #070a12 0%, #0f172a 50%, #1e293b 100%); overflow: hidden; display: flex; align-items: center; justify-content: space-between; padding: 0 80px; position: relative; }}
  
  .ambient-glow {{ position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255, 218, 0, 0.12) 0%, rgba(0,0,0,0) 70%); left: 100px; top: -100px; pointer-events: none; }}
  
  /* Left Hero Content */
  .hero-left {{ width: 620px; z-index: 2; }}
  .brand-row {{ display: flex; align-items: center; gap: 18px; margin-bottom: 18px; }}
  .brand-logo {{ width: 74px; height: 74px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.4)); }}
  .brand-name {{ font-size: 42px; font-weight: 800; color: #fff; letter-spacing: -1px; }}
  .brand-name span {{ color: #ffda00; }}
  
  .tagline {{ font-size: 18px; color: #cbd5e1; font-weight: 500; line-height: 1.4; margin-bottom: 26px; }}
  
  .feature-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }}
  .feature-item {{ background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; }}
  .feature-icon {{ font-size: 16px; background: rgba(255, 218, 0, 0.15); color: #ffda00; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 700; }}
  .feature-text {{ font-size: 13px; font-weight: 600; color: #f1f5f9; }}
  
  .meta-pills {{ display: flex; gap: 10px; }}
  .meta-pill {{ font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 20px; background: rgba(255,255,255,0.08); color: #94a3b8; }}
  .meta-pill.yellow {{ background: #ffda00; color: #111; }}
  
  /* Right Hero Mockup */
  .hero-right {{ width: 560px; z-index: 2; }}
  .preview-card {{ background: #ffffff; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden; border: 1px solid rgba(255,255,255,0.2); }}
  
  .preview-topbar {{ background: #ffda00; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; }}
  .preview-topbar-title {{ font-size: 14px; font-weight: 800; color: #111; text-transform: uppercase; }}
  
  .preview-content {{ padding: 18px; background: #f8fafc; display: flex; flex-direction: column; gap: 12px; }}
  .preview-row {{ background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }}
  .preview-badge {{ background: #ebf5ff; color: #0078d4; border: 1px solid #cce4ff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }}
  .preview-row-title {{ font-size: 13px; font-weight: 600; color: #1e293b; margin-top: 3px; }}
  .preview-price {{ font-size: 15px; font-weight: 800; color: #0f172a; margin-left: auto; white-space: nowrap; }}
</style>
</head>
<body>
  <div class="ambient-glow"></div>
  
  <div class="hero-left">
    <div class="brand-row">
      <div class="brand-logo">{LOGO_SVG}</div>
      <div class="brand-name">Sahibinden <span>Manager</span></div>
    </div>
    <div class="tagline">
      Sahibinden.com için geliştirilmiş akıllı ilan takibi, hızlı eleme, özel notlar ve kompakt gezinme aracı.
    </div>
    
    <div class="feature-grid">
      <div class="feature-item">
        <div class="feature-icon">⚡</div>
        <div class="feature-text">Kompakt Liste & Mini Resim</div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">✓</div>
        <div class="feature-text">Ziyaret & Zaman Rozetleri</div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">✕</div>
        <div class="feature-text">Tek Tıkla İlan Eleme</div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📝</div>
        <div class="feature-text">Fiyat Takibi & Not Defteri</div>
      </div>
    </div>

    <div class="meta-pills">
      <span class="meta-pill yellow">Chrome Web Store</span>
      <span class="meta-pill">Firefox Add-ons</span>
      <span class="meta-pill">Sıfır Telemetri & %100 Yerel Veri</span>
    </div>
  </div>

  <div class="hero-right">
    <div class="preview-card">
      <div class="preview-topbar">
        <span class="preview-topbar-title">Sahibinden Manager · Kontrol Paneli</span>
        <span style="font-size: 11px; font-weight: 700; color: #333;">Aktif Mod: Mini Resim</span>
      </div>
      <div class="preview-content">
        <div class="preview-row" style="background: #f8fbff; border-left: 4px solid #0078d4;">
          <div style="flex: 1;">
            <span class="preview-badge">✓ 15 dakika önce bakıldı</span>
            <div class="preview-row-title">2016 BMW 320i ED 40.Yıl Paket Hatasız</div>
            <div style="font-size: 11px; color: #0284c7; margin-top: 3px;">📝 Not: Satıcı ile görüşüldü</div>
          </div>
          <div class="preview-price">1.450.000 TL</div>
        </div>

        <div class="preview-row" style="opacity: 0.7; border-left: 4px solid #dc2626;">
          <div style="flex: 1;">
            <span style="background: #fee2e2; color: #dc2626; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">✕ Elendi: Hasar kayıtlı</span>
            <div class="preview-row-title" style="text-decoration: line-through;">2015 BMW 320i Sport Line</div>
          </div>
          <div class="preview-price" style="color: #64748b;">1.180.000 TL</div>
        </div>

        <div class="preview-row" style="border-left: 4px solid #16a34a;">
          <div style="flex: 1;">
            <span style="background: #dcfce7; color: #16a34a; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">★ Fiyat Düştü: -30.000 TL</span>
            <div class="preview-row-title">2017 BMW 320i ED Luxury Line</div>
          </div>
          <div class="preview-price">1.520.000 TL</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
"""

targets = [
    ('screenshot-1280x800', 1280, 800, HTML_SCREENSHOT),
    ('promo-small-440x280', 440, 280, HTML_PROMO_SMALL),
    ('promo-marquee-1400x560', 1400, 560, HTML_PROMO_MARQUEE),
]

options = Options()
options.add_argument('--headless=new')
options.add_argument('--disable-gpu')
options.add_argument('--force-device-scale-factor=1')

driver = webdriver.Chrome(options=options)

try:
    for name, w, h, html in targets:
        # Save temp html
        tmp_html = os.path.abspath(f'assets/store/{name}.html')
        with open(tmp_html, 'w', encoding='utf-8') as f:
            f.write(html)
            
        driver.get(f'file:///{tmp_html.replace(os.sep, "/")}')
        driver.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {
            'width': w,
            'height': h,
            'deviceScaleFactor': 1,
            'mobile': False,
        })
        time.sleep(0.5)
        
        raw_png = os.path.abspath(f'assets/store/{name}_raw.png')
        driver.save_screenshot(raw_png)
        
        # Open with PIL, crop/resize to exact dimensions, and save as 24-bit RGB (NO ALPHA CHANNEL)
        im = Image.open(raw_png)
        im_rgb = im.convert('RGB')
        
        # Crop exactly to w, h from top-left
        cropped = im_rgb.crop((0, 0, w, h))
        
        # Save 24-bit PNG
        png_out = os.path.join(OUTPUT_DIR, f'{name}.png')
        cropped.save(png_out, 'PNG')
        
        # Also save high quality JPEG
        jpg_out = os.path.join(OUTPUT_DIR, f'{name}.jpg')
        cropped.save(jpg_out, 'JPEG', quality=95)
        
        im.close()
        if os.path.exists(raw_png):
            os.remove(raw_png)
        if os.path.exists(tmp_html):
            os.remove(tmp_html)
            
        print(f'Generated {name}: {w}x{h} (PNG 24-bit RGB + JPG)')

finally:
    driver.quit()

print('All store assets successfully created in assets/store!')
