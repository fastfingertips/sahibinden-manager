import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image

OUTPUT_DIR = os.path.abspath('assets/store')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# SVG Logo
LOGO_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="112" fill="#FFDA00"/>
  <line x1="94" y1="402" x2="250" y2="110" stroke="#18181B" stroke-width="44" stroke-linecap="round"/>
  <line x1="178" y1="402" x2="334" y2="110" stroke="#18181B" stroke-width="44" stroke-linecap="round"/>
  <line x1="262" y1="402" x2="418" y2="110" stroke="#18181B" stroke-width="44" stroke-linecap="round"/>
</svg>"""

# SVG Icons
ICON_CHECK = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>"""
ICON_CROSS = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>"""
ICON_NOTE = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>"""
ICON_FILTER = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>"""
ICON_GRID = """<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>"""
ICON_CHART = """<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>"""
ICON_EXTERNAL = """<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>"""

HTML_SCREENSHOT = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }}
  body {{ width: 1280px; height: 800px; background: #0f172a; overflow: hidden; display: flex; flex-direction: column; }}
  
  /* Top App Navigation */
  .top-navbar {{ background: #1e293b; height: 56px; padding: 0 28px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; }}
  .brand-area {{ display: flex; align-items: center; gap: 12px; }}
  .brand-logo {{ width: 34px; height: 34px; }}
  .brand-title {{ font-size: 19px; font-weight: 800; color: #f8fafc; letter-spacing: -0.5px; }}
  .brand-title span {{ color: #ffda00; }}
  .version-tag {{ font-size: 11px; font-weight: 700; color: #94a3b8; background: #0f172a; padding: 3px 8px; border-radius: 4px; border: 1px solid #334155; }}
  .status-pills {{ display: flex; gap: 10px; align-items: center; }}
  .status-pill {{ font-size: 11.5px; font-weight: 600; color: #94a3b8; display: flex; align-items: center; gap: 6px; }}
  .status-pill.online {{ color: #4ade80; }}
  .dot {{ width: 7px; height: 7px; border-radius: 50%; background: #4ade80; }}
  
  /* Subbar / Extension Native Toolbar */
  .subbar {{ background: #1e293b; padding: 12px 28px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; }}
  .section-title {{ font-size: 13px; font-weight: 700; color: #cbd5e1; display: flex; align-items: center; gap: 8px; }}
  
  .sm-toolbar {{ display: flex; align-items: center; gap: 12px; background: #0f172a; padding: 6px 12px; border-radius: 6px; border: 1px solid #334155; }}
  .sm-label {{ font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }}
  .sm-btn-group {{ display: flex; background: #1e293b; border-radius: 4px; padding: 2px; gap: 2px; border: 1px solid #334155; }}
  .sm-btn-mode {{ padding: 4px 10px; font-size: 11px; font-weight: 600; border-radius: 3px; border: none; cursor: pointer; color: #94a3b8; background: transparent; }}
  .sm-btn-mode.active {{ background: #ffda00; color: #0f172a; font-weight: 700; }}
  .sm-action-btn {{ background: #0284c7; color: #fff; border: none; border-radius: 4px; padding: 5px 12px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 6px; cursor: pointer; }}
  .sm-filter-btn {{ background: #1e293b; color: #cbd5e1; border: 1px solid #475569; border-radius: 4px; padding: 5px 12px; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 6px; cursor: pointer; }}
  
  /* Workspace Layout */
  .workspace {{ display: flex; flex: 1; padding: 20px 28px; gap: 24px; }}
  
  /* Left Column: Interactive Table */
  .table-container {{ flex: 1; background: #1e293b; border: 1px solid #334155; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }}
  .table-header {{ display: flex; background: #0f172a; border-bottom: 1px solid #334155; padding: 12px 18px; font-size: 11.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }}
  
  .listing-row {{ display: flex; padding: 14px 18px; border-bottom: 1px solid #334155; position: relative; align-items: flex-start; gap: 14px; background: #1e293b; transition: all 0.2s; }}
  .listing-row.visited {{ background: rgba(2, 132, 199, 0.08); }}
  .listing-row.eliminated {{ background: rgba(239, 68, 68, 0.05); opacity: 0.65; }}
  
  .thumb-wrap {{ width: 84px; height: 60px; border-radius: 6px; overflow: hidden; background: #334155; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }}
  .details-wrap {{ flex: 1; display: flex; flex-direction: column; gap: 5px; }}
  
  .badge-line {{ display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }}
  .badge-visited {{ background: rgba(2, 132, 199, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px; }}
  .badge-eliminated {{ background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.3); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px; }}
  
  .row-title {{ font-size: 14px; font-weight: 600; color: #f8fafc; }}
  .eliminated .row-title {{ text-decoration: line-through; color: #94a3b8; }}
  
  .note-box {{ font-size: 11.5px; color: #38bdf8; background: rgba(2, 132, 199, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); padding: 6px 10px; border-radius: 5px; margin-top: 4px; display: flex; align-items: center; gap: 6px; }}
  
  .price-col {{ display: flex; flex-direction: column; align-items: flex-end; gap: 4px; width: 140px; }}
  .price-val {{ font-size: 16px; font-weight: 800; color: #f8fafc; }}
  .meta-sub {{ font-size: 11px; color: #94a3b8; text-align: right; }}
  
  .btn-eliminate-row {{ position: absolute; top: 12px; right: 14px; width: 24px; height: 24px; border-radius: 4px; border: 1px solid #475569; background: #1e293b; color: #94a3b8; display: flex; align-items: center; justify-content: center; cursor: pointer; }}
  .btn-eliminate-row.active {{ background: #dc2626; border-color: #ef4444; color: #ffffff; }}
  
  /* Right Column: Popup Dashboard */
  .popup-widget {{ width: 380px; background: #1e293b; border: 1px solid #334155; border-radius: 10px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4); overflow: hidden; display: flex; flex-direction: column; }}
  .widget-head {{ background: #ffda00; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; }}
  .widget-brand {{ display: flex; align-items: center; gap: 10px; }}
  .widget-brand-logo {{ width: 28px; height: 28px; }}
  .widget-brand-title {{ font-size: 13.5px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }}
  
  .widget-tabs {{ display: flex; background: #0f172a; border-bottom: 1px solid #334155; }}
  .widget-tab {{ flex: 1; padding: 11px 0; text-align: center; font-size: 11.5px; font-weight: 700; color: #94a3b8; border-bottom: 2px solid transparent; }}
  .widget-tab.active {{ color: #ffda00; border-bottom-color: #ffda00; background: #1e293b; }}
  
  .widget-body {{ padding: 18px; display: flex; flex-direction: column; gap: 14px; }}
  
  .stats-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }}
  .stat-card {{ background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 10px 8px; text-align: center; }}
  .stat-number {{ font-size: 18px; font-weight: 800; color: #f8fafc; }}
  .stat-label {{ font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-top: 3px; }}
  
  .feature-switches {{ display: flex; flex-direction: column; gap: 9px; }}
  .switch-row {{ display: flex; justify-content: space-between; align-items: center; padding: 9px 12px; background: #0f172a; border: 1px solid #334155; border-radius: 6px; }}
  .switch-label {{ font-size: 11.5px; font-weight: 600; color: #e2e8f0; }}
  .switch-toggle {{ width: 34px; height: 18px; background: #ffda00; border-radius: 9px; position: relative; }}
  .switch-knob {{ width: 14px; height: 14px; background: #0f172a; border-radius: 7px; position: absolute; top: 2px; right: 2px; }}
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
      <span class="status-pill online"><span class="dot"></span> Eklenti Aktif</span>
      <span class="status-pill">Yerel Bellek: 48 Kayıt</span>
    </div>
  </div>

  <!-- Subbar / Extension Native Toolbar -->
  <div class="subbar">
    <div class="section-title">
      {ICON_GRID}
      <span>İlan Listeleme ve İnceleme Paneli</span>
    </div>
    <div class="sm-toolbar">
      <span class="sm-label">Görünüm:</span>
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
        <span style="width: 84px;">Önizleme</span>
        <span style="flex: 1;">İlan Bilgileri & Durum Rozetleri</span>
        <span style="width: 140px; text-align: right;">Fiyat & Konum</span>
      </div>

      <!-- Item 1: Visited with Note -->
      <div class="listing-row visited">
        <div class="thumb-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
        <div class="details-wrap">
          <div class="badge-line">
            <span class="badge-visited">{ICON_CHECK} 15 dakika önce bakıldı (1. Ziyaret)</span>
            <span style="font-size: 11px; color: #94a3b8; font-weight: 600;">#1248921045</span>
          </div>
          <div class="row-title">2016 Model 1.6 Motor Otomatik Vites Bakımlı İlan</div>
          <div class="note-box">
            {ICON_NOTE}
            <span><b>Not:</b> Satıcı arandı, ekspertiz raporu istendi. Fiyat görüşülecek.</span>
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
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
        <div class="details-wrap">
          <div class="badge-line">
            <span class="badge-eliminated">{ICON_CROSS} Elendi: Hasar kaydı yüksek</span>
            <span style="font-size: 11px; color: #64748b; font-weight: 600;">#1248894102</span>
          </div>
          <div class="row-title">2015 Model Manuel Vites Uygun Fiyatlı Seçenek</div>
        </div>
        <div class="price-col">
          <span class="price-val" style="color: #94a3b8;">1.180.000 TL</span>
          <span class="meta-sub">Dün 18:45<br>Çankaya / Ankara</span>
        </div>
        <div class="btn-eliminate-row active">{ICON_CROSS}</div>
      </div>

      <!-- Item 3: Regular with History -->
      <div class="listing-row">
        <div class="thumb-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
        <div class="details-wrap">
          <div class="badge-line">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 600;">#1248100234</span>
            <span style="font-size: 10.5px; background: #334155; color: #cbd5e1; padding: 2px 7px; border-radius: 3px;">Henüz bakılmadı</span>
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
        <span style="font-size: 10.5px; font-weight: 800; background: rgba(0,0,0,0.12); padding: 2px 7px; border-radius: 3px;">v1.1.0</span>
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
            <div class="stat-number" style="color: #38bdf8;">42</div>
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

HTML_PROMO_SMALL = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }}
  body {{ width: 440px; height: 280px; background: linear-gradient(135deg, #070a13 0%, #0f172a 60%, #1e293b 100%); overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; text-align: center; padding: 20px; }}
  
  .glow {{ position: absolute; width: 280px; height: 280px; background: radial-gradient(circle, rgba(255, 218, 0, 0.16) 0%, rgba(255, 218, 0, 0) 70%); top: -50px; border-radius: 50%; pointer-events: none; }}
  
  .logo {{ width: 68px; height: 68px; margin-bottom: 14px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); }}
  
  h1 {{ font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 5px; }}
  h1 span {{ color: #ffda00; }}
  
  p {{ font-size: 12.5px; color: #94a3b8; font-weight: 500; margin-bottom: 16px; max-width: 360px; line-height: 1.4; }}
  
  .pills {{ display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }}
  .pill {{ font-size: 10.5px; font-weight: 700; padding: 5px 11px; border-radius: 14px; background: rgba(255,255,255,0.06); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; gap: 5px; }}
  .pill.highlight {{ background: rgba(255, 218, 0, 0.15); color: #ffda00; border-color: rgba(255, 218, 0, 0.35); }}
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo">{LOGO_SVG}</div>
  <h1>Sahibinden <span>Manager</span></h1>
  <p>Ziyaret takibi, tek tıkla ilan eleme, özel notlar ve kompakt liste görünümü</p>
  <div class="pills">
    <span class="pill highlight">{ICON_CHECK} Ziyaret Takibi</span>
    <span class="pill">{ICON_CROSS} İlan Eleme</span>
    <span class="pill">{ICON_NOTE} Not Defteri</span>
    <span class="pill">{ICON_GRID} Kompakt Liste</span>
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
  body {{ width: 1400px; height: 560px; background: linear-gradient(120deg, #050811 0%, #0f172a 50%, #1e293b 100%); overflow: hidden; display: flex; align-items: center; justify-content: space-between; padding: 0 80px; position: relative; }}
  
  .ambient-glow {{ position: absolute; width: 650px; height: 650px; background: radial-gradient(circle, rgba(255, 218, 0, 0.14) 0%, rgba(0,0,0,0) 70%); left: 80px; top: -120px; pointer-events: none; }}
  
  /* Left Hero Content */
  .hero-left {{ width: 640px; z-index: 2; }}
  .brand-row {{ display: flex; align-items: center; gap: 18px; margin-bottom: 18px; }}
  .brand-logo {{ width: 78px; height: 78px; filter: drop-shadow(0 12px 24px rgba(0,0,0,0.5)); }}
  .brand-name {{ font-size: 44px; font-weight: 800; color: #fff; letter-spacing: -1px; }}
  .brand-name span {{ color: #ffda00; }}
  
  .tagline {{ font-size: 18px; color: #cbd5e1; font-weight: 500; line-height: 1.45; margin-bottom: 28px; }}
  
  .feature-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 30px; }}
  .feature-item {{ background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 13px 15px; display: flex; align-items: center; gap: 12px; }}
  .feature-icon-box {{ width: 34px; height: 34px; border-radius: 6px; background: rgba(255, 218, 0, 0.15); color: #ffda00; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }}
  .feature-title {{ font-size: 13.5px; font-weight: 700; color: #f8fafc; }}
  
  .meta-pills {{ display: flex; gap: 10px; align-items: center; }}
  .meta-pill {{ font-size: 11.5px; font-weight: 700; padding: 6px 14px; border-radius: 20px; background: rgba(255,255,255,0.07); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); }}
  .meta-pill.yellow {{ background: #ffda00; color: #0f172a; border-color: #ffda00; }}
  
  /* Right Hero Mockup */
  .hero-right {{ width: 560px; z-index: 2; }}
  .preview-card {{ background: #1e293b; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6); overflow: hidden; border: 1px solid #334155; }}
  
  .preview-topbar {{ background: #ffda00; padding: 13px 18px; display: flex; align-items: center; justify-content: space-between; }}
  .preview-topbar-title {{ font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }}
  .preview-topbar-sub {{ font-size: 11px; font-weight: 700; color: #0f172a; background: rgba(0,0,0,0.1); padding: 2px 7px; border-radius: 4px; }}
  
  .preview-content {{ padding: 18px; background: #0f172a; display: flex; flex-direction: column; gap: 12px; }}
  .preview-row {{ background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 12px 14px; display: flex; gap: 12px; align-items: center; }}
  .preview-badge-vis {{ background: rgba(2, 132, 199, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px; }}
  .preview-badge-elm {{ background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.3); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px; }}
  .preview-row-title {{ font-size: 13.5px; font-weight: 600; color: #f8fafc; margin-top: 4px; }}
  .preview-price {{ font-size: 15px; font-weight: 800; color: #f8fafc; margin-left: auto; white-space: nowrap; }}
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
      <span class="meta-pill">Sıfır Telemetri · %100 Yerel Veri</span>
    </div>
  </div>

  <div class="hero-right">
    <div class="preview-card">
      <div class="preview-topbar">
        <span class="preview-topbar-title">Sahibinden Manager · Kontrol Paneli</span>
        <span class="preview-topbar-sub">Aktif Mod: Mini Resim</span>
      </div>
      <div class="preview-content">
        <div class="preview-row" style="background: rgba(2, 132, 199, 0.08); border-left: 4px solid #0284c7;">
          <div style="flex: 1;">
            <span class="preview-badge-vis">{ICON_CHECK} 15 dakika önce bakıldı</span>
            <div class="preview-row-title">2016 Model Otomatik Vites Bakımlı Araç</div>
            <div style="font-size: 11px; color: #38bdf8; margin-top: 4px; display: flex; align-items: center; gap: 5px;">
              {ICON_NOTE} <span>Not: Satıcı ile görüşüldü</span>
            </div>
          </div>
          <div class="preview-price">1.450.000 TL</div>
        </div>

        <div class="preview-row" style="opacity: 0.65; border-left: 4px solid #ef4444;">
          <div style="flex: 1;">
            <span class="preview-badge-elm">{ICON_CROSS} Elendi: Hasar kaydı yüksek</span>
            <div class="preview-row-title" style="text-decoration: line-through; color: #94a3b8;">2015 Model Manuel Seçenek</div>
          </div>
          <div class="preview-price" style="color: #94a3b8;">1.180.000 TL</div>
        </div>

        <div class="preview-row" style="border-left: 4px solid #22c55e;">
          <div style="flex: 1;">
            <span style="background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 5px;">
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

print('All store assets successfully created without emojis or third-party site branding!')
