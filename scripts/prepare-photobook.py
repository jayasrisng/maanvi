"""Build web-sized derivatives and a traceable catalogue; preserve every source."""
from PIL import Image, ImageOps
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
styles=[('Watercolour memories','Hand-tinted evenings'),('A botanical reverie','Miniature worlds'),('Ink & quiet colour','Cut from colour'),('The everyday beautiful','Golden hours'),('Soft light, softer drapes','After the sun'),('Paper, petal & thread','The art of the block'),('Rooms full of light','Stories on the wall'),('Mountain light','An indigo garden'),('Along the golden river','In the evening light'),('Where colours meet','Living classics')]
media=[('Watercolour editorial','Hand-tinted illustration'),('Botanical gouache','Miniature-inspired painting'),('Charcoal & Indian ink','Block-print collage'),('Photographic interpretation','Gilded tempera'),('Photographic interpretation','Art Deco illustration'),('Paper & textile collage','Linocut illustration'),('Photographic interpretation','Narrative fresco'),('Mineral-pigment painting','Botanical cyanotype'),('Manuscript-inspired illustration','Oil-paint interpretation'),('Geometric mixed media','Photographic interpretation')]
# Match revisions to the same weave, retaining the season's art direction.
replacements={
 '2017/spring':{'02':'candidate-a-uppada','03':'candidate-b-mangalagiri'},
 '2017/fall':{'01':'candidate-a-gadwal-elder','05':'candidate-b-venkatagiri'},
 '2018/spring':{'05':'candidate-a-sambalpuri','01':'candidate-b-kalamkari'},
 '2018/fall':{'02':'candidate-a-paithani-elder','01':'candidate-b-banarasi'},
 '2019/spring':{'03':'candidate-a-chikankari','04':'candidate-b-mysore-crepe'},
 '2019/fall':{'01':'candidate-a-bandhani-elder','03':'candidate-b-pochampally'},
 '2020/spring':{'01':'candidate-a-chettinad','02':'candidate-b-kanchi-cotton'},
 '2020/fall':{'01':'candidate-a-muga-elder','02':'candidate-b-muga-paithani'},
 '2021/spring':{'01':'candidate-a-organza','07':'candidate-b-pashmina'},
 '2021/fall':{'02':'candidate-a-mashru-elder','03':'candidate-b-banarasi'},
 '2022/spring':{'01':'candidate-a-tussar','02':'candidate-b-linen-tissue'},
 '2022/fall':{'03':'candidate-a-batik-elder','01':'candidate-b-ikat'},
 '2023/spring':{'01':'candidate-a-silk-kota','02':'candidate-b-mal-cotton'},
}
previous_file=root/'src/data/photobook.json'
previous={item['id']:item['source'] for chapter in json.loads(previous_file.read_text()) for item in chapter['images']} if previous_file.exists() else {}
chapters=[]
for year in range(2017,2027):
 for si,season in enumerate(['spring','fall']):
  key=f'{year}/{season}'; items=[]
  for original in sorted((root/'maanvi-photobook'/key).glob('*.png')):
   # Obvious black vignette + mismatched orange watermark in an otherwise matte chapter.
   if key=='2026/spring' and original.name.startswith('03-'): continue
   source=original
   candidate=replacements.get(key,{}).get(original.name[:2])
   if candidate:
    source=root/'maanvi-photobook/diversity-revisions'/key/(candidate+'.png')
    if not source.exists(): raise FileNotFoundError(source)
   stem=original.stem
   dest=root/'public/images/archive'/key;dest.mkdir(parents=True,exist_ok=True)
   output=dest/(stem+'.webp'); thumb=dest/(stem+'-thumb.webp')
   unchanged=(output.exists() and thumb.exists() and output.stat().st_mtime >= source.stat().st_mtime and previous.get(f'{year}-{season}-{stem[:2]}') == str(source.relative_to(root)))
   if not unchanged:
    with Image.open(source) as im:
     im=ImageOps.exif_transpose(im).convert('RGB'); im.thumbnail((1000,1400)); im.save(output,quality=84,method=6)
     im.thumbnail((240,336)); im.save(thumb,quality=75,method=6)
   words=stem.split('-')[1:]
   scene_words={'back','seated','crop','shadow','away','hands','silhouettes','chair','window','mirror','elder','cobalt','coral','monochrome','lime','magenta','emerald','lapis','orchid','mist','saffron','earth','indigo','jade','midnight','ruby','rooftop','palace','temple','market','gallery','library','studio','cafe','kitchen','steps','rain','terrace','veranda','courtyard','garden','orchard','letter','breeze','stairs','lotus','peacock','seat','bougainvillea'}
   while words and words[-1] in scene_words: words.pop()
   title=' '.join(words).capitalize() or 'A moment in cloth'
   title=title.replace('Raw muga','Muga in its natural gold').replace('Green muga','Muga in garden green').replace('Pure crepe','Pure crêpe')
   items.append({'id':f'{year}-{season}-{stem[:2]}','title':title,'src':f'/images/archive/{key}/{stem}.webp','thumbnail':f'/images/archive/{key}/{stem}-thumb.webp','source':str(source.relative_to(root)),'alt':f'AI-created {media[year-2017][si].lower()}: {title.lower()}, from the {year} {season} collection book.'})
  chapters.append({'id':f'{year}-{season}','year':year,'season':season.capitalize(),'title':styles[year-2017][si],'medium':media[year-2017][si],'images':items})
(root/'src/data/photobook.json').write_text(json.dumps(chapters,indent=2)+'\n')
print(f'{len(chapters)} chapters, {sum(len(c["images"]) for c in chapters)} curated images')
