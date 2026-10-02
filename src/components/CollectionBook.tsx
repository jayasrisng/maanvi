import { useEffect, useRef, useState, type CSSProperties } from 'react';
import chapters from '../data/photobook.json';

export function ImageDisclosure({ language = 'en' }: { language?: 'te' | 'en' }) {
  const te = language === 'te';
  return <aside className="image-disclosure"><div><p className="eyebrow">{te ? 'మా చీరలు. కొత్తగా చూపించిన జ్ఞాపకాలు.' : 'OUR FABRICS. REIMAGINED MEMORIES.'}</p><p>{te ? 'మా తొలి సంవత్సరాల్లో ప్రతి కలెక్షన్‌ను చిత్రీకరించడానికి ఫోటోగ్రాఫర్ లేరు. ఆయా సంవత్సరాల్లో మేము అమ్మిన డిజైన్లు, వస్త్రాల ఆధారంగా ఈ చిత్రాలను AI సహాయంతో రూపొందించాం. ఇవి అసలు ఫోటోలు కావు; రంగులు, డిజైన్లు, చిన్న వివరాలు భిన్నంగా ఉండవచ్చు.' : 'Our early collections weren’t all photographed. These AI-created illustrations reimagine the designs and fabrics we sold; colours, motifs and details may differ from the originals.'}</p><a href="/book" className="text-link">{te ? 'అసలు చీరలను మాతో చూడండి' : 'See the real pieces with us'}</a></div></aside>;
}

export default function CollectionBook({ favorites, toggleFavorite, language = 'en' }: { favorites: string[]; toggleFavorite: (id: string) => void; language?: 'te' | 'en' }) {
  const te = language === 'te';
  const t = (a: string, b: string) => te ? a : b;
  const [year, setYear] = useState(2026);
  const [season, setSeason] = useState('Fall');
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const depth = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number; dx: number; dragging: boolean } | null>(null);
  const suppressClick = useRef(false);
  const chapter = chapters.find(item => item.year === year && item.season === season)!;
  const image = chapter.images[slide];
  const offsetFor = (index: number) => {
    const count = chapter.images.length;
    return ((index-slide+count+Math.floor(count/2))%count)-Math.floor(count/2);
  };
  const cardStyle = (offset: number): CSSProperties => {
    const distance = Math.abs(offset);
    return {
      transform: `translateX(${offset*67}%) translateZ(${-distance*155}px) rotateY(${-Math.max(-1,Math.min(1,offset))*36}deg)`,
      opacity: distance > 2.5 ? 0 : 1,
      zIndex: 10-Math.round(distance*2),
      visibility: distance > 3 ? 'hidden' : 'visible',
    };
  };
  const paintDrag = (fraction: number) => {
    if (document.documentElement.dataset.motion === 'paused' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    depth.current?.querySelectorAll<HTMLElement>('.collection-card').forEach((card,index) => {
      const style = cardStyle(offsetFor(index)+fraction);
      Object.assign(card.style,style);
    });
  };
  const move = (direction: number) => setSlide(current => (current + direction + chapter.images.length) % chapter.images.length);
  useEffect(() => {
    const surface = depth.current!;
    let distance = 0, lastTurn = 0;
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 1) return;
      event.preventDefault();
      const now = performance.now();
      if (now-lastTurn < 400) return;
      distance += event.deltaX;
      if (Math.abs(distance) > 65) {
        const direction = distance > 0 ? 1 : -1;
        setSlide(current => (current+direction+chapter.images.length)%chapter.images.length);
        distance = 0; lastTurn = now;
      }
    };
    surface.addEventListener('wheel', wheel, { passive: false });
    return () => surface.removeEventListener('wheel', wheel);
  }, [chapter.images.length]);
  const finishDrag = (cancelled: boolean) => {
    const current = gesture.current; gesture.current = null;
    if (!current) return;
    const surface = depth.current!;
    if (surface.hasPointerCapture(current.id)) surface.releasePointerCapture(current.id);
    surface.classList.remove('is-dragging');
    if (!current.dragging) return;
    suppressClick.current = true;
    if (!cancelled && Math.abs(current.dx) > Math.max(40,surface.clientWidth*.10)) move(current.dx < 0 ? 1 : -1);
    else paintDrag(0);
    setTimeout(() => { suppressClick.current = false; }, 300);
  };
  useEffect(() => {
    if (expanded) dialog.current?.showModal();
    else dialog.current?.close();
  }, [expanded]);
  return <>
    <section className="collection-gallery" aria-label={t('మా కలెక్షన్', 'Our Collection')}>
      <h1>{t('మా కలెక్షన్', 'Our Collection')}</h1>
      <div className="collection-carousel" role="region" aria-roledescription="carousel" aria-label={t('కలెక్షన్ చిత్రాలు', 'Collection illustrations')} aria-describedby="collection-gesture-hint"
        tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
        <div className="collection-depth" ref={depth}
          onDragStart={event => event.preventDefault()}
          onPointerDown={event => { if (!event.isPrimary || event.button !== 0) return; suppressClick.current = false; gesture.current = { id:event.pointerId,x:event.clientX,y:event.clientY,dx:0,dragging:false }; }}
          onPointerMove={event => {
            const current = gesture.current; if (!current || current.id !== event.pointerId) return;
            const dx = event.clientX-current.x, dy = event.clientY-current.y;
            if (!current.dragging) {
              if (Math.abs(dy)>10 && Math.abs(dy)>Math.abs(dx)) { gesture.current = null; return; }
              if (Math.abs(dx)<8 || Math.abs(dx)<Math.abs(dy)) return;
              current.dragging = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.classList.add('is-dragging');
            }
            current.dx = dx;
            paintDrag(Math.max(-1,Math.min(1,dx/(event.currentTarget.clientWidth*.42))));
          }}
          onPointerUp={() => finishDrag(false)} onPointerCancel={() => finishDrag(true)}
          onClickCapture={event => { if (suppressClick.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        {chapter.images.map((item,index) => {
          const offset = offsetFor(index);
          return <figure key={item.id} className={`collection-card${index === slide ? ' is-active' : ''}`} style={cardStyle(offset)} role="group" aria-roledescription="slide" aria-label={`${index+1} / ${chapter.images.length}`} aria-hidden={Math.abs(offset)>1} inert={Math.abs(offset)>1}>
            <button className="collection-image" tabIndex={index === slide ? 0 : -1} onClick={() => index === slide ? setExpanded(true) : setSlide(index)} aria-label={`${index === slide ? t('దగ్గరగా చూడండి','Enlarge') : t('చూడండి','View')} ${item.title}`}>
              <img src={item.src} alt={item.alt} width="1000" height="1400" loading={Math.abs(offset)<=1 ? 'eager' : 'lazy'} fetchPriority={index === slide ? 'high' : 'auto'} decoding="async" draggable={false}/>
            </button>
          </figure>;
        })}
        </div>
        <div className="collection-caption"><p>{image.title}</p><small>{t('AI కళారూపం', 'AI-created interpretation')}</small></div>
        <div className="collection-controls"><button className="collection-keyboard-control" type="button" onClick={() => move(-1)} aria-label={t('మునుపటి చిత్రం', 'Previous image')}>←</button><p aria-live="polite" aria-atomic="true">{slide + 1} / {chapter.images.length}</p><button className="collection-keyboard-control" type="button" onClick={() => move(1)} aria-label={t('తదుపరి చిత్రం', 'Next image')}>→</button></div>
        <p id="collection-gesture-hint" className="collection-gesture-hint">{t('చిత్రాలను చూడటానికి స్వైప్ చేయండి','Swipe or drag to explore')}</p>
      </div>
      <div className="book-thumbnails" aria-label={t('చిత్రాన్ని ఎంచుకోండి', 'Choose an image')}>{chapter.images.map((item, index) => <button type="button" key={item.id} onClick={() => setSlide(index)} aria-label={`${t('చూడండి', 'Show')} ${item.title}`} aria-pressed={slide === index}><img src={item.thumbnail} alt="" loading="lazy" width="240" height="336"/></button>)}</div>
      <div className="book-filters"><div className="book-years" aria-label="Collection year">{Array.from({ length: 10 }, (_, i) => 2017 + i).map(item => <button type="button" key={item} aria-pressed={year === item} onClick={() => { setYear(item); setSlide(0); }}>{item}</button>)}</div><div className="book-seasons" aria-label="Collection season">{['Spring', 'Fall'].map(item => <button type="button" key={item} aria-pressed={season === item} onClick={() => { setSeason(item); setSlide(0); }}>{te ? (item === 'Spring' ? 'వసంతం' : 'శరదృతువు') : item}</button>)}</div></div>
      <div className="book-chapter-heading"><div><p className="eyebrow">{chapter.season} {chapter.year} · {chapter.medium}</p><h2>{chapter.title}</h2></div><button type="button" className={`save-button ${favorites.includes(chapter.id) ? 'saved' : ''}`} aria-pressed={favorites.includes(chapter.id)} onClick={() => toggleFavorite(chapter.id)}>{favorites.includes(chapter.id) ? t('♥ భద్రపరిచారు', '♥ Collection saved') : t('♡ భద్రపరచండి', '♡ Save collection')}</button></div>
      <ImageDisclosure language={language}/>
    </section>
    <section className="book-invitation"><h2>{t('మీ కోసం ఎంచుకుందాం.', 'Find your next drape.')}</h2><a href="/book" className="button dark-button">{t('వీడియో కాల్ బుక్ చేసుకోండి', 'Arrange a video viewing')}</a></section>
    <dialog ref={dialog} className="book-lightbox" aria-label="Collection illustration" onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }}><button className="lightbox-close" onClick={() => setExpanded(false)} aria-label="Close illustration">{t('మూసివేయండి ×', 'Close ×')}</button>{expanded && <figure><img src={image.src} alt={image.alt}/><figcaption>{image.title} · {t('AI కళారూపం', 'AI-created interpretation')}</figcaption></figure>}</dialog>
  </>;
}
