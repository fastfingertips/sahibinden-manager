import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image

OUTPUT_DIR = os.path.abspath('assets/store')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# SVG Logo
LOGO_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <clipPath id="squircle">
      <rect width="512" height="512" rx="112" fill="#FFDA00"/>
    </clipPath>
  </defs>
  <rect width="512" height="512" rx="112" fill="#FFDA00"/>
  <g clip-path="url(#squircle)">
    <line x1="9" y1="572" x2="293" y2="-60" stroke="#18181B" stroke-width="68"/>
    <line x1="114" y1="572" x2="398" y2="-60" stroke="#18181B" stroke-width="68"/>
    <line x1="219" y1="572" x2="503" y2="-60" stroke="#18181B" stroke-width="68"/>
    <path d="M 401.97 112.31 L 401.97 177.15 Q 365.43 165.86 Q 330.60 160.15 Q 295.87 154.38 Q 264.94 154.38 Q 223.93 154.38 Q 204.24 162.19 Q 184.63 169.93 Q 184.63 186.34 Q 184.63 198.68 Q 197.86 205.57 Q 211.09 212.39 Q 245.91 217.31 L 294.63 224.07 Q 368.67 234.38 Q 399.88 255.31 Q 431.18 276.18 Q 431.18 314.77 Q 431.18 365.36 Q 387.60 390.10 Q 344.02 414.85 Q 254.48 414.85 Q 212.32 414.85 Q 169.79 409.27 Q 127.25 403.75 Q 84.72 392.86 L 84.72 326.25 Q 127.25 341.80 Q 166.93 349.75 Q 206.61 357.62 Q 243.53 357.62 Q 281.03 357.62 Q 300.91 349.02 Q 320.80 340.36 Q 320.80 324.35 Q 320.80 310.04 Q 307.29 302.23 Q 293.78 294.42 Q 253.34 288.25 L 208.99 281.50 Q 142.38 271.65 Q 111.55 250.13 Q 80.82 228.60 Q 80.82 192.11 Q 80.82 146.37 Q 123.64 121.76 Q 166.46 97.15 Q 246.77 97.15 Q 283.40 97.15 Q 322.04 100.96 Q 360.67 104.77 Q 401.97 112.31 Z" fill="#FFDA00"/>
  </g>
</svg>"""

# SVG Icons
ICON_CHECK = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>"""
ICON_CROSS = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>"""
ICON_NOTE = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>"""
ICON_FILTER = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>"""
ICON_GRID = """<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>"""
ICON_CHART = """<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>"""
ICON_EXTERNAL = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>"""
ICON_SHIELD = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>"""

# 1. SCREENSHOT (1280x800) - Flat Enterprise Layout
HTML_SCREENSHOT = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }}
  body {{ width: 1280px; height: 800px; background: #0f172a; overflow: hidden; display: flex; flex-direction: column; color: #f8fafc; }}
  
  /* Top App Navigation */
  .top-navbar {{ background: #111827; height: 56px; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1f2937; }}
  .brand-area {{ display: flex; align-items: center; gap: 14px; }}
  .brand-logo {{ width: 32px; height: 32px; }}
  .brand-title {{ font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; }}
  .brand-title span {{ color: #ffda00; }}
  .version-tag {{ font-size: 11px; font-weight: 600; color: #9ca3af; background: #1f2937; padding: 3px 8px; border-radius: 4px; }}
  .status-pills {{ display: flex; gap: 16px; align-items: center; }}
  .status-pill {{ font-size: 11.5px; font-weight: 500; color: #9ca3af; display: flex; align-items: center; gap: 6px; }}
  .dot {{ width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }}
  
  /* Subbar / Flat Action Toolbar */
  .subbar {{ background: #111827; padding: 12px 32px; border-bottom: 1px solid #1f2937; display: flex; justify-content: space-between; align-items: center; }}
  .section-title {{ font-size: 13px; font-weight: 600; color: #9ca3af; display: flex; align-items: center; gap: 8px; }}
  
  .sm-toolbar {{ display: flex; align-items: center; gap: 10px; }}
  .sm-btn-group {{ display: flex; background: #1f2937; border-radius: 5px; padding: 2px; gap: 2px; }}
  .sm-btn-mode {{ padding: 5px 12px; font-size: 11px; font-weight: 500; border-radius: 4px; border: none; cursor: pointer; color: #9ca3af; background: transparent; }}
  .sm-btn-mode.active {{ background: #ffda00; color: #111827; font-weight: 700; }}
  .sm-action-btn {{ background: #2563eb; color: #ffffff; border: none; border-radius: 5px; padding: 6px 14px; font-size: 11.5px; font-weight: 600; display: flex; align-items: center; gap: 6px; }}
  .sm-filter-btn {{ background: #1f2937; color: #d1d5db; border: 1px solid #374151; border-radius: 5px; padding: 6px 14px; font-size: 11.5px; font-weight: 500; display: flex; align-items: center; gap: 6px; }}
  
  /* Workspace Layout */
  .workspace {{ display: flex; flex: 1; padding: 24px 32px; gap: 24px; }}
  
  /* Left Column: Table */
  .table-container {{ flex: 1; background: #111827; border: 1px solid #1f2937; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }}
  .table-header {{ display: flex; background: #18202f; border-bottom: 1px solid #1f2937; padding: 12px 20px; font-size: 11.5px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; }}
  
  .listing-row {{ display: flex; padding: 16px 20px; border-bottom: 1px solid #1f2937; position: relative; align-items: flex-start; gap: 16px; background: #111827; }}
  .listing-row.visited {{ background: #131d2e; }}
  .listing-row.eliminated {{ background: #151821; opacity: 0.6; }}
  
  .thumb-wrap {{ width: 88px; height: 62px; border-radius: 6px; overflow: hidden; background: #1f2937; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }}
  .details-wrap {{ flex: 1; display: flex; flex-direction: column; gap: 6px; }}
  
  .badge-line {{ display: flex; align-items: center; gap: 8px; }}
  .badge {{ font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px; }}
  .badge-visited {{ background: #1e3a8a; color: #93c5fd; border: 1px solid #2563eb; }}
  .badge-eliminated {{ background: #450a0a; color: #fca5a5; border: 1px solid #7f1d1d; }}
  .id-label {{ font-size: 11px; color: #6b7280; font-weight: 500; }}
  
  .row-title {{ font-size: 14px; font-weight: 600; color: #f9fafb; }}
  .eliminated .row-title {{ text-decoration: line-through; color: #9ca3af; }}
  
  .note-box {{ font-size: 11.5px; color: #93c5fd; background: #172554; border: 1px solid #1e3a8a; padding: 7px 12px; border-radius: 5px; margin-top: 4px; display: flex; align-items: center; gap: 7px; }}
  
  .price-col {{ display: flex; flex-direction: column; align-items: flex-end; gap: 4px; width: 140px; }}
  .price-val {{ font-size: 16px; font-weight: 700; color: #ffffff; }}
  .meta-sub {{ font-size: 11px; color: #6b7280; text-align: right; }}
  
  .btn-eliminate-row {{ position: absolute; top: 14px; right: 18px; width: 24px; height: 24px; border-radius: 4px; border: 1px solid #374151; background: #1f2937; color: #9ca3af; display: flex; align-items: center; justify-content: center; }}
  .btn-eliminate-row.active {{ background: #991b1b; border-color: #dc2626; color: #ffffff; }}
  
  /* Right Column: Popup Dashboard */
  .popup-widget {{ width: 380px; background: #111827; border: 1px solid #1f2937; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }}
  .widget-head {{ background: #ffda00; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }}
  .widget-brand {{ display: flex; align-items: center; gap: 10px; }}
  .widget-brand-logo {{ width: 26px; height: 26px; }}
  .widget-brand-title {{ font-size: 13.5px; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 0.5px; }}
  
  .widget-tabs {{ display: flex; background: #18202f; border-bottom: 1px solid #1f2937; }}
  .widget-tab {{ flex: 1; padding: 11px 0; text-align: center; font-size: 11.5px; font-weight: 600; color: #9ca3af; border-bottom: 2px solid transparent; }}
  .widget-tab.active {{ color: #ffffff; border-bottom-color: #ffda00; background: #111827; font-weight: 700; }}
  
  .widget-body {{ padding: 20px; display: flex; flex-direction: column; gap: 16px; }}
  
  .stats-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }}
  .stat-card {{ background: #18202f; border: 1px solid #1f2937; border-radius: 6px; padding: 10px 8px; text-align: center; }}
  .stat-number {{ font-size: 18px; font-weight: 700; color: #f9fafb; }}
  .stat-label {{ font-size: 10px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-top: 3px; }}
  
  .feature-switches {{ display: flex; flex-direction: column; gap: 8px; }}
  .switch-row {{ display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #18202f; border: 1px solid #1f2937; border-radius: 6px; }}
  .switch-label {{ font-size: 12px; font-weight: 500; color: #e5e7eb; }}
  .switch-toggle {{ width: 32px; height: 18px; background: #ffda00; border-radius: 9px; position: relative; }}
  .switch-knob {{ width: 14px; height: 14px; background: #111827; border-radius: 7px; position: absolute; top: 2px; right: 2px; }}
</style>
</head>
<body>
  <!-- Top App Navigation -->
  <div class="top-navbar">
    <div class="brand-area">
      <div class="brand-logo">{LOGO_SVG}</div>
      <div class="brand-title">Sahibinden <span>Manager</span></div>
      <span class="version-tag">v1.1.0</span>
    </div>
    <div class="status-pills">
      <span class="status-pill"><span class="dot"></span> Eklenti Aktif</span>
      <span class="status-pill">{ICON_SHIELD} Sıfır Telemetri</span>
    </div>
  </div>

  <!-- Subbar / Flat Action Toolbar -->
  <div class="subbar">
    <div class="section-title">
      {ICON_GRID}
      <span>İlan Listeleme ve İnceleme Paneli</span>
    </div>
    <div class="sm-toolbar">
      <div class="sm-btn-group">
        <button class="sm-btn-mode">Standart</button>
        <button class="sm-btn-mode active">Mini Resim</button>
        <button class="sm-btn-mode">Resimsiz</button>
      </div>
      <button class="sm-action-btn">
        {ICON_EXTERNAL}
        <span>Ziyaret Edilmemişleri Aç (10)</span>
      </button>
      <button class="sm-filter-btn">
        {ICON_FILTER}
        <span>İlanları Gizle</span>
      </button>
    </div>
  </div>

  <!-- Workspace Layout -->
  <div class="workspace">
    <!-- Left Column: Table -->
    <div class="table-container">
      <div class="table-header">
        <span style="width: 88px;">Önizleme</span>
        <span style="flex: 1;">İlan Detayları & Durum Rozetleri</span>
        <span style="width: 140px; text-align: right;">Fiyat & Konum</span>
      </div>

      <!-- Item 1: Visited with Note -->
      <div class="listing-row visited">
        <div class="thumb-wrap">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
        <div class="details-wrap">
          <div class="badge-line">
            <span class="badge badge-visited">{ICON_CHECK} 15 dakika önce bakıldı (1. Ziyaret)</span>
            <span class="id-label">#1248921045</span>
          </div>
          <div class="row-title">2016 Model 1.6 Motor Otomatik Vites Bakımlı İlan</div>
          <div class="note-box">
            {ICON_NOTE}
            <span><b>Not:</b> Satıcı arandı, ekspertiz raporu incelendi. Fiyat görüşülecek.</span>
          </div>
        </div>
        <div class="price-col">
          <span class="price-val">1.450.000 TL</span>
          <span class="meta-sub">Bugün 10:20<br>Kadıköy / İstanbul</span>
        </div>
        <div class="btn-eliminate-row">{ICON_CROSS}</div>
      </div>

      <!-- Item 2: Eliminated -->
      <div class="listing-row eliminated">
        <div class="thumb-wrap">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
        <div class="details-wrap">
          <div class="badge-line">
            <span class="badge badge-eliminated">{ICON_CROSS} Elendi: Hasar kaydı yüksek</span>
            <span class="id-label">#1248894102</span>
          </div>
          <div class="row-title">2015 Model Manuel Vites Uygun Fiyatlı Seçenek</div>
        </div>
        <div class="price-col">
          <span class="price-val" style="color: #6b7280;">1.180.000 TL</span>
          <span class="meta-sub">Dün 18:45<br>Çankaya / Ankara</span>
        </div>
        <div class="btn-eliminate-row active">{ICON_CROSS}</div>
      </div>

      <!-- Item 3: Regular with History -->
      <div class="listing-row">
        <div class="thumb-wrap">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
        <div class="details-wrap">
          <div class="badge-line">
            <span class="id-label">#1248100234</span>
            <span style="font-size: 10.5px; background: #1f2937; color: #9ca3af; padding: 2px 7px; border-radius: 4px; border: 1px solid #374151;">Henüz bakılmadı</span>
          </div>
          <div class="row-title">2017 Model Düşük Kilometreli Donanımlı Paket</div>
        </div>
        <div class="price-col">
          <span class="price-val">1.520.000 TL</span>
          <span class="meta-sub">Bugün 08:30<br>Bornova / İzmir</span>
        </div>
        <div class="btn-eliminate-row">{ICON_CROSS}</div>
      </div>
    </div>

    <!-- Right Column: Popup Widget -->
    <div class="popup-widget">
      <div class="widget-head">
        <div class="widget-brand">
          <div class="widget-brand-logo">{LOGO_SVG}</div>
          <span class="widget-brand-title">Kontrol Paneli</span>
        </div>
        <span style="font-size: 10.5px; font-weight: 700; background: rgba(0,0,0,0.1); padding: 2px 7px; border-radius: 3px;">v1.1.0</span>
      </div>

      <div class="widget-tabs">
        <div class="widget-tab active">Ayarlar</div>
        <div class="widget-tab">Notlar (3)</div>
        <div class="widget-tab">Elenenler (5)</div>
        <div class="widget-tab">Geçmiş (42)</div>
      </div>

      <div class="widget-body">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number" style="color: #60a5fa;">42</div>
            <div class="stat-label">Ziyaret</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" style="color: #f87171;">5</div>
            <div class="stat-label">Elenen</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" style="color: #4ade80;">3</div>
            <div class="stat-label">Not</div>
          </div>
        </div>

        <div class="feature-switches">
          <div class="switch-row">
            <span class="switch-label">Kompakt Liste (Mini Resim)</span>
            <div class="switch-toggle"><div class="switch-knob"></div></div>
          </div>
          <div class="switch-row">
            <span class="switch-label">Ziyaret Rozetleri & Zaman</span>
            <div class="switch-toggle"><div class="switch-knob"></div></div>
          </div>
          <div class="switch-row">
            <span class="switch-label">Tek Tıkla İlan Eleme</span>
            <div class="switch-toggle"><div class="switch-knob"></div></div>
          </div>
          <div class="switch-row">
            <span class="switch-label">Fiyat Geçmişi Analizi</span>
            <div class="switch-toggle"><div class="switch-knob"></div></div>
          </div>
          <div class="switch-row">
            <span class="switch-label">Yenilenmiş Cihazları Gizle</span>
            <div class="switch-toggle"><div class="switch-knob"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
"""

# 2. PROMO SMALL (440x280) - Flat Corporate Tile
HTML_PROMO_SMALL = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }}
  body {{ width: 440px; height: 280px; background: #0f172a; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; text-align: center; padding: 24px; border: 1px solid #1e293b; }}
  
  .logo {{ width: 64px; height: 64px; margin-bottom: 14px; }}
  
  h1 {{ font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; margin-bottom: 6px; }}
  h1 span {{ color: #ffda00; }}
  
  p {{ font-size: 12px; color: #94a3b8; font-weight: 400; margin-bottom: 18px; max-width: 340px; line-height: 1.45; }}
  
  .pills {{ display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }}
  .pill {{ font-size: 10px; font-weight: 600; padding: 5px 10px; border-radius: 4px; background: #1e293b; color: #cbd5e1; border: 1px solid #334155; display: flex; align-items: center; gap: 5px; }}
  .pill.primary {{ background: #1e3a8a; color: #93c5fd; border-color: #2563eb; }}
</style>
</head>
<body>
  <div class="logo">{LOGO_SVG}</div>
  <h1>Sahibinden <span>Manager</span></h1>
  <p>Ziyaret takibi, tek tıkla ilan eleme, özel notlar ve kompakt liste görünümü</p>
  <div class="pills">
    <span class="pill primary">{ICON_CHECK} Ziyaret Takibi</span>
    <span class="pill">{ICON_CROSS} İlan Eleme</span>
    <span class="pill">{ICON_NOTE} Not Defteri</span>
    <span class="pill">{ICON_GRID} Kompakt Liste</span>
  </div>
</body>
</html>
"""

# 3. PROMO MARQUEE (1400x560) - Flat Corporate Marquee (No left colored border stripes)
HTML_PROMO_MARQUEE = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }}
  body {{ width: 1400px; height: 560px; background: #0f172a; overflow: hidden; display: flex; align-items: center; justify-content: space-between; padding: 0 88px; position: relative; }}
  
  /* Left Hero Content */
  .hero-left {{ width: 620px; }}
  .brand-row {{ display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }}
  .brand-logo {{ width: 68px; height: 68px; }}
  .brand-name {{ font-size: 40px; font-weight: 800; color: #ffffff; letter-spacing: -0.8px; }}
  .brand-name span {{ color: #ffda00; }}
  
  .tagline {{ font-size: 16.5px; color: #94a3b8; font-weight: 400; line-height: 1.5; margin-bottom: 30px; }}
  
  .feature-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }}
  .feature-item {{ background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; }}
  .feature-icon-box {{ width: 32px; height: 32px; border-radius: 5px; background: #0f172a; color: #ffda00; border: 1px solid #334155; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }}
  .feature-title {{ font-size: 13px; font-weight: 600; color: #f1f5f9; }}
  
  .meta-pills {{ display: flex; gap: 10px; align-items: center; }}
  .meta-pill {{ font-size: 11px; font-weight: 600; padding: 6px 14px; border-radius: 4px; background: #1e293b; color: #94a3b8; border: 1px solid #334155; }}
  .meta-pill.yellow {{ background: #ffda00; color: #0f172a; border-color: #ffda00; font-weight: 700; }}
  
  /* Right Hero Mockup - Clean Flat Card (NO LEFT STRIPE BORDERS) */
  .hero-right {{ width: 560px; }}
  .preview-card {{ background: #1e293b; border-radius: 8px; border: 1px solid #334155; overflow: hidden; }}
  
  .preview-topbar {{ background: #ffda00; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; }}
  .preview-topbar-title {{ font-size: 13.5px; font-weight: 800; color: #111827; text-transform: uppercase; letter-spacing: 0.5px; }}
  .preview-topbar-sub {{ font-size: 11px; font-weight: 700; color: #111827; background: rgba(0,0,0,0.08); padding: 2px 8px; border-radius: 4px; }}
  
  .preview-content {{ padding: 20px; background: #0f172a; display: flex; flex-direction: column; gap: 12px; }}
  
  /* Flat uniform row - no extra left border stripe */
  .preview-row {{ background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 14px 16px; display: flex; gap: 14px; align-items: center; }}
  .preview-badge-vis {{ background: #1e3a8a; color: #93c5fd; border: 1px solid #2563eb; font-size: 10.5px; font-weight: 600; padding: 2px 7px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px; }}
  .preview-badge-elm {{ background: #450a0a; color: #fca5a5; border: 1px solid #7f1d1d; font-size: 10.5px; font-weight: 600; padding: 2px 7px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px; }}
  .preview-badge-trend {{ background: #14532d; color: #86efac; border: 1px solid #16a34a; font-size: 10.5px; font-weight: 600; padding: 2px 7px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px; }}
  
  .preview-row-title {{ font-size: 13.5px; font-weight: 600; color: #f8fafc; margin-top: 4px; }}
  .preview-price {{ font-size: 15px; font-weight: 700; color: #ffffff; margin-left: auto; white-space: nowrap; }}
</style>
</head>
<body>
  <div class="hero-left">
    <div class="brand-row">
      <div class="brand-logo">{LOGO_SVG}</div>
      <div class="brand-name">Sahibinden <span>Manager</span></div>
    </div>
    <div class="tagline">
      Akıllı ilan takibi, hızlı tek tıkla eleme, özel notlar ve kompakt gezinme aracı.
    </div>
    
    <div class="feature-grid">
      <div class="feature-item">
        <div class="feature-icon-box">{ICON_GRID}</div>
        <div class="feature-title">Kompakt Liste & Mini Resim</div>
      </div>
      <div class="feature-item">
        <div class="feature-icon-box">{ICON_CHECK}</div>
        <div class="feature-title">Ziyaret & Zaman Rozetleri</div>
      </div>
      <div class="feature-item">
        <div class="feature-icon-box">{ICON_CROSS}</div>
        <div class="feature-title">Tek Tıkla İlan Eleme</div>
      </div>
      <div class="feature-item">
        <div class="feature-icon-box">{ICON_NOTE}</div>
        <div class="feature-title">Fiyat Takibi & Not Defteri</div>
      </div>
    </div>

    <div class="meta-pills">
      <span class="meta-pill yellow">Chrome Web Store</span>
      <span class="meta-pill">Firefox Add-ons</span>
      <span class="meta-pill">{ICON_SHIELD} Sıfır Telemetri · %100 Yerel Veri</span>
    </div>
  </div>

  <div class="hero-right">
    <div class="preview-card">
      <div class="preview-topbar">
        <span class="preview-topbar-title">Sahibinden Manager · Kontrol Paneli</span>
        <span class="preview-topbar-sub">Aktif Mod: Mini Resim</span>
      </div>
      <div class="preview-content">
        <!-- Row 1: Visited - Flat 1px border all around, no left stripe -->
        <div class="preview-row" style="background: #18202f;">
          <div style="flex: 1;">
            <span class="preview-badge-vis">{ICON_CHECK} 15 dakika önce bakıldı</span>
            <div class="preview-row-title">2016 Model Otomatik Vites Bakımlı Araç</div>
            <div style="font-size: 11px; color: #93c5fd; margin-top: 4px; display: flex; align-items: center; gap: 5px;">
              {ICON_NOTE} <span>Not: Satıcı ile görüşüldü</span>
            </div>
          </div>
          <div class="preview-price">1.450.000 TL</div>
        </div>

        <!-- Row 2: Eliminated - Flat 1px border all around, no left stripe -->
        <div class="preview-row" style="opacity: 0.6;">
          <div style="flex: 1;">
            <span class="preview-badge-elm">{ICON_CROSS} Elendi: Hasar kaydı yüksek</span>
            <div class="preview-row-title" style="text-decoration: line-through; color: #9ca3af;">2015 Model Manuel Seçenek</div>
          </div>
          <div class="preview-price" style="color: #9ca3af;">1.180.000 TL</div>
        </div>

        <!-- Row 3: Price drop - Flat 1px border all around, no left stripe -->
        <div class="preview-row">
          <div style="flex: 1;">
            <span class="preview-badge-trend">
              {ICON_CHART} Fiyat Düştü: -30.000 TL
            </span>
            <div class="preview-row-title">2017 Model Düşük Kilometreli Donanımlı</div>
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
        
        im = Image.open(raw_png)
        im_rgb = im.convert('RGB')
        cropped = im_rgb.crop((0, 0, w, h))
        
        png_out = os.path.join(OUTPUT_DIR, f'{name}.png')
        cropped.save(png_out, 'PNG')
        
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

print('Flat corporate store assets successfully generated!')
