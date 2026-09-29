import { useEffect, useRef, useState } from 'react';
import chapters from '../data/photobook.json';

export function ImageDisclosure({ language = 'en' }: { language?: 'te' | 'en' }) {
  const te = language === 'te';
  return <aside className="image-disclosure"><span className="disclosure-star" aria-hidden="true">✳</span><div><p className="eyebrow">{te ? 'మా చీరలు. కొత్తగా చూపించిన జ్ఞాపకాలు.' : 'OUR FABRICS. REIMAGINED MEMORIES.'}</p><p>{te ? 'మా తొలి సంవత్సరాల్లో ప్రతి కలెక్షన్‌ను చిత్రీకరించడానికి ఫోటోగ్రాఫర్ లేరు. అందుకే, ఆయా సంవత్సరాల్లో మేము అమ్మిన డిజైన్లు, వస్త్రాల ఆధారంగా ఈ బుక్‌లోని చిత్రాలను AI సహాయంతో రూపొందించాం. ఇవి అసలు ఫోటోలు కావు; రంగులు, డిజైన్లు, చిన్న వివరాలు భిన్నంగా ఉండవచ్చు.' : 'We didn’t have a photographer documenting every collection in our early years. The images in this book were created with AI using the designs and fabrics we sold in those years. They are artistic interpretations of our products; colours, motifs and details may differ from the originals.'}</p><p>{te ? 'ఇప్పుడు అసలు చీరలను వీడియో కాల్‌లో చూపించగలం. రంగు, అంచు, నేత, మడత — అన్నీ దగ్గరగా చూసి, మీకు నచ్చినది ఎంచుకోండి.' : 'Today, we can show you the real thing. Join us on a video call to see the actual sarees, their borders, their fall and their movement—so you know what you’re choosing.'}</p><a href="/book" className="text-link">{te ? 'అసలు చీరలను మాతో చూడండి ↗' : 'See the real pieces with us ↗'}</a></div></aside>;
}

export default function CollectionBook({ favorites, toggleFavorite, language = 'en' }: { favorites: string[]; toggleFavorite: (id: string) => void; language?: 'te' | 'en' }) {
  const te = language === 'te';
  const t = (a: string, b: string) => te ? a : b;
  const [year, setYear] = useState(2025);
  const [season, setSeason] = useState('Spring');
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [turn, setTurn] = useState<{ direction: number; src: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const chapter = chapters.find(item => item.year === year && item.season === season)!;
  const spread = chapter.images.slice(page * 2, page * 2 + 2);
  const pageCount = Math.ceil(chapter.images.length / 2);
  useEffect(() => {
    if (expanded !== null) dialog.current?.showModal();
    else dialog.current?.close();
  }, [expanded]);
  const turnPage = (next: number) => {
    if (turn || next < 0 || next >= pageCount) return;
    const direction = next > page ? 1 : -1;
    const outgoing = spread[direction > 0 ? spread.length - 1 : 0];
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setTurn({ direction, src: outgoing.src });
    setPage(next);
  };
  const selectYear = (next: number) => { setYear(next); setPage(0); };
  return <>
    <section className="book-intro"><p className="eyebrow">{t('మాన్వి కలెక్షన్ బుక్ · 2017—2026', 'THE MAANVI PHOTO BOOK · 2017—2026')}</p><h1>{te ? <>జ్ఞాపకాలుగా నిలిచే<br/>మన చీరలు.</> : <>Some things deserve<br/><em>to be kept.</em></>}</h1><p>{t('మా కుటుంబం ఎంచుకున్న రంగులు. మన దేశపు అద్భుతమైన వస్త్రాలు. మా ప్రయాణంలో భాగమైన డిజైన్లను చూడండి.', 'A family’s eye for colour. A country’s extraordinary cloth. Turn through the designs that have been part of our story.')}</p><span className="book-art-label">{t('AI సహాయంతో రూపొందించిన చిత్రాలు · అందుబాటును మాతో నిర్ధారించుకోండి', 'AI-created collection illustrations · availability confirmed in person')}</span></section>
    <section className="collection-book" aria-label="Browse the collection book">
      <ImageDisclosure language={language}/>
      <div className="book-filters"><div className="book-years" aria-label="Collection year">{Array.from({length:10},(_,i)=>2017+i).map(item=><button type="button" key={item} aria-pressed={year===item} onClick={()=>selectYear(item)}>{item}</button>)}</div><div className="book-seasons" aria-label="Collection season">{['Spring','Fall'].map(item=><button type="button" key={item} aria-pressed={season===item} onClick={()=>{setSeason(item);setPage(0);}}>{te ? (item === 'Spring' ? 'వసంతం' : 'శరదృతువు') : item}</button>)}</div></div>
      <div className="book-chapter-heading"><div><p className="eyebrow">{chapter.season} {chapter.year} · {chapter.medium}</p><h2>{chapter.title}</h2></div><button className={`save-button ${favorites.includes(chapter.id)?'saved':''}`} aria-pressed={favorites.includes(chapter.id)} onClick={()=>toggleFavorite(chapter.id)}>{favorites.includes(chapter.id)?t('♥ భద్రపరిచారు','♥ Chapter saved'):t('♡ ఈ అధ్యాయాన్ని భద్రపరచండి','♡ Save this chapter')}</button></div>
      <div className="book-turn-stage"><div className="book-spread">
        {spread.map((item,index)=><figure className="book-leaf" key={item.id}><button className="book-image-button" onClick={()=>setExpanded(page*2+index)} aria-label={`Enlarge ${item.title}`}><img src={item.src} alt={item.alt} width="1000" height="1400" loading="eager" decoding="async" /><span>{t('దగ్గరగా చూడండి ↗','View closer ↗')}</span></button><figcaption><span>{item.title}</span><small>{String(page*2+index+1).padStart(2,'0')}</small></figcaption></figure>)}
        {spread.length===1 && <div className="book-endpaper"><span lang="te">మాన్వి</span><p>To be continued,<br /><em>in your own story.</em></p><a href="/book" className="text-link">Find your next drape ↗</a></div>}
      </div>
      {turn && <div className={`turning-leaf ${turn.direction > 0 ? 'turn-forward' : 'turn-back'}`} aria-hidden="true" onAnimationEnd={()=>setTurn(null)}><div className="turn-front"><img src={turn.src} alt=""/></div><div className="turn-reverse"/></div>}
      </div>
      <div className="book-controls"><button type="button" onClick={()=>turnPage(page-1)} disabled={page===0 || !!turn} aria-label="Previous pages">← <span>{t('వెనుకకు','Previous')}</span></button><p aria-live="polite">{chapter.season} {year}<span>{t('పుటలు','Spread')} {page+1} / {pageCount}</span></p><button type="button" onClick={()=>turnPage(page+1)} disabled={page>=pageCount-1 || !!turn} aria-label="Next pages"><span>{t('తదుపరి','Next')}</span> →</button></div>
      <div className="book-thumbnails" aria-label="Jump to an illustration">{chapter.images.map((item,index)=><button key={item.id} onClick={()=>setPage(Math.floor(index/2))} aria-label={`Show ${item.title}`} aria-pressed={Math.floor(index/2)===page}><img src={item.thumbnail} alt="" loading="lazy" width="240" height="336" /></button>)}</div>
    </section>
    <section className="book-invitation"><p className="eyebrow">{t('పుస్తకం నుంచి మీ చేతుల్లోకి','FROM THE BOOK TO YOUR HANDS')}</p><h2>{te ? <>తర్వాతి అధ్యాయం<br/>మీదే.</> : <>The next chapter<br/><em>belongs to you.</em></>}</h2><p>{t('మీకు నచ్చిన రంగు, నేత, డిజైన్ మాకు చెప్పండి. మీ కోసం చీరలను ఎంచుకుంటాం.', 'Show us a colour, a weave, a little detail you love. We’ll bring out the pieces worth meeting.')}</p><a href="/book" className="button dark-button">{t('వీడియో కాల్ బుక్ చేసుకోండి ↗','Arrange a video viewing ↗')}</a></section>
    <dialog ref={dialog} className="book-lightbox" aria-label="Collection illustration" onCancel={()=>setExpanded(null)} onClose={()=>setExpanded(null)} onClick={event=>{if(event.target===event.currentTarget)setExpanded(null);}}><button className="lightbox-close" onClick={()=>setExpanded(null)} aria-label="Close illustration">{t('మూసివేయండి ×','Close ×')}</button>{expanded!==null && <figure><img src={chapter.images[expanded].src} alt={chapter.images[expanded].alt}/><figcaption>{chapter.images[expanded].title} · {t('AI కళారూపం','AI-created interpretation')}</figcaption></figure>}</dialog>
  </>;
}
