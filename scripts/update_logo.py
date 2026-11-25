import os
from PIL import Image, ImageDraw, ImageFont
import matplotlib.textpath
from matplotlib.font_manager import FontProperties

# 1. Generate centered SVG path for S
fp = FontProperties(family='sans-serif', weight='bold')
tp = matplotlib.textpath.TextPath((0, 0), 'S', size=350, prop=fp)
bb = tp.get_extents()
dx = 256 - (bb.x0 + bb.x1) / 2
dy = 256 + (bb.y0 + bb.y1) / 2

codes = tp.codes
verts = tp.vertices

d = []
for code, (vx, vy) in zip(codes, verts):
    x = vx + dx
    y = -vy + dy
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

svg_logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="112" fill="#FFDA00"/>
  <line x1="94" y1="402" x2="250" y2="110" stroke="#18181B" stroke-width="56" stroke-linecap="round"/>
  <line x1="178" y1="402" x2="334" y2="110" stroke="#18181B" stroke-width="56" stroke-linecap="round"/>
  <line x1="262" y1="402" x2="418" y2="110" stroke="#18181B" stroke-width="56" stroke-linecap="round"/>
  <path d="{path_str}" fill="#FFDA00"/>
</svg>'''

with open('public/wxt.svg', 'w', encoding='utf-8') as f:
    f.write(svg_logo)
print('Updated public/wxt.svg')

# 2. Render high resolution icon and downsample with LANCZOS to 16, 32, 48, 96, 128
base_size = 1024
scale = base_size / 512.0

img = Image.new('RGBA', (base_size, base_size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Background squircle
radius = int(112 * scale)
draw.rounded_rectangle([0, 0, base_size, base_size], radius=radius, fill='#FFDA00')

# 3 lines
lines = [
    ((int(94 * scale), int(402 * scale)), (int(250 * scale), int(110 * scale))),
    ((int(178 * scale), int(402 * scale)), (int(334 * scale), int(110 * scale))),
    ((int(262 * scale), int(402 * scale)), (int(418 * scale), int(110 * scale))),
]
stroke_w = int(56 * scale)
for p1, p2 in lines:
    draw.line([p1, p2], fill='#18181B', width=stroke_w)
    r = stroke_w // 2
    draw.ellipse([p1[0]-r, p1[1]-r, p1[0]+r, p1[1]+r], fill='#18181B')
    draw.ellipse([p2[0]-r, p2[1]-r, p2[0]+r, p2[1]+r], fill='#18181B')

# Draw S text in background yellow #FFDA00
font_size = int(350 * scale)
font = ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', font_size)
bbox = font.getbbox('S')
w = bbox[2] - bbox[0]
h = bbox[3] - bbox[1]
x = (base_size - w) // 2 - bbox[0]
y = (base_size - h) // 2 - bbox[1]

draw.text((x, y), 'S', font=font, fill='#FFDA00')

# Save PNG sizes
sizes = [16, 32, 48, 96, 128]
os.makedirs('public/icon', exist_ok=True)
for s in sizes:
    resized = img.resize((s, s), Image.Resampling.LANCZOS)
    resized.save(f'public/icon/{s}.png')
    print(f'Generated public/icon/{s}.png')

# Clean test files
for f in ['test_v1.png', 'test_v2.png', 'test_v3.png', 'test_v1.png_48.png', 'test_v2.png_48.png', 'test_v3.png_48.png']:
    if os.path.exists(f):
        os.remove(f)

print('Logo updated successfully!')
