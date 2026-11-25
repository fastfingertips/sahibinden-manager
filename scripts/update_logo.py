import os
import matplotlib.textpath
from matplotlib.font_manager import FontProperties
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image

# 1. Generate wide S SVG path
fp = FontProperties(family='sans-serif', weight='bold')
# Size 420, scaled horizontally by 1.45 to span widely across the logo
tp = matplotlib.textpath.TextPath((0, 0), 'S', size=420, prop=fp)
bb = tp.get_extents()

scale_x = 1.45
scale_y = 1.0

dx = 256.0 - (bb.x0 + bb.x1) * scale_x / 2.0
dy = 256.0 + (bb.y0 + bb.y1) * scale_y / 2.0

codes = tp.codes
verts = tp.vertices

d = []
for code, (vx, vy) in zip(codes, verts):
    x = vx * scale_x + dx
    y = -vy * scale_y + dy
    if code == 1:
        d.append(f'M {x:.2f} {y:.2f}')
    elif code == 2:
        d.append(f'L {x:.2f} {y:.2f}')
    elif code == 3:
        d.append(f'Q {x:.2f} {y:.2f}')
    elif code == 4:
        d.append(f'C {x:.2f} {y:.2f}')
    elif code == 79:
        d.append('Z')

path_str = ' '.join(d)

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
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
    <path d="{path_str}" fill="#FFDA00"/>
  </g>
</svg>'''

with open('public/wxt.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)
print('Updated public/wxt.svg with wide S and full-bleed diagonal stripes')

# 2. Render 1024x1024 PNG from the SVG with Chrome headless
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

print('All icon resolutions generated cleanly from wide S SVG!')
