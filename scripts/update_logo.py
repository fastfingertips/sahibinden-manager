import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image

# SVG with the continuous S stroke in background yellow #FFDA00, exact 68px thickness
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <clipPath id="squircle">
      <rect width="512" height="512" rx="112" fill="#FFDA00"/>
    </clipPath>
  </defs>
  <rect width="512" height="512" rx="112" fill="#FFDA00"/>
  <g clip-path="url(#squircle)">
    <!-- 3 full-bleed black diagonal stripes -->
    <line x1="9" y1="572" x2="293" y2="-60" stroke="#18181B" stroke-width="68"/>
    <line x1="114" y1="572" x2="398" y2="-60" stroke="#18181B" stroke-width="68"/>
    <line x1="219" y1="572" x2="503" y2="-60" stroke="#18181B" stroke-width="68"/>
    <!-- Continuous S stroke in background yellow, exact same 68px thickness -->
    <path d="M 450 150 L 140 150 C 65 150, 65 230, 140 230 L 372 282 C 447 282, 447 362, 372 362 L 62 362" 
          fill="none" stroke="#FFDA00" stroke-width="68" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>'''

with open('public/wxt.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)
print('Updated public/wxt.svg with S-curve stroke')

# Render 1024x1024 PNG from the SVG with Chrome headless
html_preview = f'''<!DOCTYPE html>
<html>
<head><style>body {{ margin: 0; padding: 0; background: transparent; overflow: hidden; }}</style></head>
<body>{svg_content}</body>
</html>'''

tmp_html = os.path.abspath('tmp_logo.html')
with open(tmp_html, 'w', encoding='utf-8') as f:
    f.write(html_preview)

options = Options()
options.add_argument('--headless=new')
options.add_argument('--disable-gpu')
driver = webdriver.Chrome(options=options)

try:
    driver.get(f'file:///{tmp_html.replace(os.sep, "/")}')
    driver.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {
        'width': 1024,
        'height': 1024,
        'deviceScaleFactor': 1,
        'mobile': False,
    })
    raw_1024 = os.path.abspath('tmp_logo_1024.png')
    driver.save_screenshot(raw_1024)
    
    im_1024 = Image.open(raw_1024)
    cropped = im_1024.crop((0, 0, 1024, 1024))
    
    # Save all standard sizes
    sizes = [16, 32, 48, 96, 128]
    os.makedirs('public/icon', exist_ok=True)
    for s in sizes:
        resized = cropped.resize((s, s), Image.Resampling.LANCZOS)
        resized.save(f'public/icon/{s}.png')
        print(f'Generated public/icon/{s}.png')
        
    im_1024.close()
    if os.path.exists(raw_1024):
        os.remove(raw_1024)
    if os.path.exists(tmp_html):
        os.remove(tmp_html)
finally:
    driver.quit()

print('All icon resolutions updated successfully!')
