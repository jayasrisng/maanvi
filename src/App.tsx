import { useEffect, useState } from 'react';
import './App.css';
import './woven.css';
import './journey.css';
import FlowingStory from './components/FlowingStory';
import BrandLogo from './components/BrandLogo';
import CollectionBook from './components/CollectionBook';
import Viewing from './components/Viewing';
import InfoPage from './components/InfoPage';
import MaanviIntro from './components/MaanviIntro';
import './brand-accessibility.css';
import './components/opening-continuity.css';

const links = { whatsapp: 'https://wa.me/919182242429', maps: 'https://maps.app.goo.gl/yzy3N5ef7hTZ5goFA', instagram: 'https://www.instagram.com/maanviofficial/' };
const chapterRoutes: Record<string,string> = { '/bridal': 'silk', '/saree-guide': 'cloth', '/private-shopping': 'meet', '/visit': 'visit' };

export default function App() {
  const [language, setLanguage] = useState<'te'|'en'>(()=>{try{return localStorage.getItem('maanvi.language')==='en'?'en':'te';}catch{return 'te';}});
  const [paused, setPaused] = useState(false);
  const [introSound, setIntroSound] = useState(true);
  const [menu, setMenu] = useState(false);
  const [hash, setHash] = useState(() => location.hash);
  const [favorites, setFavorites] = useState<string[]>(()=>{try{return JSON.parse(localStorage.getItem('maanvi.favorites')||'[]');}catch{return [];}});
  const te = language==='te';
  const t = (telugu:string, english:string) => te?telugu:english;
  const path = location.pathname.replace(/\/$/,'') || '/';
  const archive = path==='/archive', book = path==='/book';
  const infoKind: Record<string,string> = { '/privacy':'privacy', '/terms':'terms', '/cookies':'cookies', '/sitemap.xml':'sitemap', '/careers':'careers', '/contact':'contact', '/returns':'returns', '/shipping':'shipping', '/services':'services', '/company':'company' };
  const info = infoKind[path];
  const family = ['/our-story', '/visit', '/private-shopping'].includes(path);
  const home = !archive&&!book&&!family&&!info;
  useEffect(()=>{document.documentElement.lang=language;document.title=archive?'Maanvi · Our Collection':book?'Maanvi · Private viewing':info?'Maanvi · Information':'Maanvi — మన మాన్వి మన వేడుక';try{localStorage.setItem('maanvi.language',language);}catch{/* Optional preference. */}},[language,archive,book,info]);
  useEffect(()=>{document.documentElement.dataset.motion=paused?'paused':'running';return()=>{delete document.documentElement.dataset.motion;};},[paused]);
  useEffect(()=>{const target=chapterRoutes[path] || location.hash.slice(1);if(target){const frame=requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView({behavior:'instant'}));return()=>cancelAnimationFrame(frame);}},[path]);
  useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false);};addEventListener('keydown',close);return()=>removeEventListener('keydown',close);},[]);
  useEffect(()=>{const update=()=>setHash(location.hash);addEventListener('hashchange',update);return()=>removeEventListener('hashchange',update);},[]);
  const toggleFavorite = (id:string) => setFavorites(current=>{const next=current.includes(id)?current.filter(v=>v!==id):[...current,id];try{localStorage.setItem('maanvi.favorites',JSON.stringify(next));}catch{/* Available for this visit. */}return next;});
  const chapterLink = (id:string) => home?`#${id}`:`/#${id}`;
  return <div className={`maanvi-site ${home?'is-home':'is-inner'}`} lang={language}>
    {path === '/' && <MaanviIntro te={te} soundOn={introSound} onToggleSound={()=>setIntroSound(value=>!value)}/>}
    <a className="journey-skip" href="#main-content">{t('విషయానికి వెళ్ళండి','Skip to content')}</a>
    <header className="journey-header"><a className="journey-brand" href="/" aria-label="Maanvi home"><BrandLogo/></a><nav className={menu?'is-open':''} aria-label={t('ప్రధాన పేజీలు','Main navigation')}><a className={hash==='#cloth'?'is-active':''} href={chapterLink('cloth')} onClick={()=>setMenu(false)}>{t('మన చీరలు','Our cloth')}</a><a className={path==='/archive'?'is-active':''} href="/archive">{t('మా కలెక్షన్','Our Collection')}</a><a className={path==='/our-story'?'is-active':''} href="/our-story" onClick={()=>setMenu(false)}>{t('మా కథ','Our family')}</a><a className={path==='/book'?'is-active header-viewing':'header-viewing'} href="/book">{t('మాట్లాడుకుందాం','Meet Maanvi')}</a></nav><div className="journey-language" aria-label="Language"><button lang="te" aria-pressed={te} onClick={()=>setLanguage('te')}>తెలుగు</button><span>/</span><button lang="en" aria-pressed={!te} onClick={()=>setLanguage('en')}>EN</button></div><button className="journey-menu" aria-expanded={menu} aria-label={menu?t('మెనూ మూసివేయండి','Close menu'):t('మెనూ తెరవండి','Open menu')} onClick={()=>setMenu(!menu)}>{menu?'×':'☰'}</button></header>
    <main id="main-content" tabIndex={-1}>
      {info?<InfoPage kind={info} te={te}/>:archive?<CollectionBook favorites={favorites} toggleFavorite={toggleFavorite} language={language}/>:book?<Viewing te={te} favorites={favorites}/>:<>
        {home && <FlowingStory te={te} paused={paused}/>}
        {family && <>
        <section id="family" className="family-chapter"><div className="family-photo"><img src="/images/story/founders.jpg" alt={t('మాన్వి వెనుక ఉన్న కుటుంబం','The family behind Maanvi')} loading="lazy"/><span>VIJAYAWADA · SINCE 2017</span></div><div className="family-words"><p className="chapter-kicker">{t('04 / మా కుటుంబం నుంచి మీ కుటుంబానికి','04 / FROM OUR FAMILY TO YOURS')}</p><h2>{t('మాన్వి అంటే,\nమన వాళ్లే.','Behind every fold,\na family.')}</h2><p>{t('మాన్వి మా కుటుంబం నడిపే చీరల ఇల్లు. 2017 నుంచి విజయవాడలో, ప్రతి కస్టమర్‌తో పరిచయం ఒక అనుబంధంగా మారాలని కోరుకుంటున్నాం.','Maanvi is our family’s saree house in Vijayawada. Since 2017, we’ve wanted every visit to feel like the beginning of a relationship.')}</p><p>{t('దుకాణంలోనైనా, వీడియో కాల్‌లోనైనా — చీరలను విప్పి, వివరాలు చూపించి, మీకు నచ్చినది ఎంచుకునే సమయం ఇస్తాం. తెలుగులో హాయిగా మాట్లాడుకుందాం.','In our store or over a video call, we unfold the sarees, show you the details and give you room to choose. Speak with us in Telugu, and make yourself at home.')}</p><a className="chapter-link" href={links.whatsapp} target="_blank" rel="noreferrer">{t('మాతో మాట్లాడండి','Say hello to our family')}</a></div></section>
          </>}
      </>}
        {home && <section className="home-invitation"><p className="chapter-kicker">{t('మా కుటుంబం నుంచి మీకు', 'FROM OUR FAMILY TO YOURS')}</p><h2>{t('రండి. కలిసి ఎంచుకుందాం.', 'Come in. Find your drape.')}</h2><p>{t('విజయవాడలోనైనా, వీడియో కాల్‌లోనైనా — చీరలను దగ్గరగా చూసి, తెలుగులో హాయిగా మాట్లాడుకుందాం.', 'In Vijayawada or over a video call, meet the real sarees and the family who chose them.')}</p><div><a className="thread-button ivory" href="/book">{t('వీడియో కాల్ బుక్ చేయండి', 'Book a viewing')}</a><a className="chapter-link ivory-link" href="/our-story">{t('మా కుటుంబం కథ', 'Meet our family')}</a></div></section>}
        {family && <><section id="meet" className="meet-chapter"><p className="chapter-kicker">{t('05 / మీ కోసం ఒక వ్యక్తిగత ఎంపిక','05 / A PERSONAL SELECTION, JUST FOR YOU')}</p><h2>{t('చిత్రంలో చూసారు.\nఇప్పుడు దగ్గరగా చూడండి.','You’ve seen the picture.\nNow meet the real thing.')}</h2><p className="meet-intro">{t('మీరు ఎక్కడున్నా, మాన్వి మీకు దగ్గరే. 30 నిమిషాల వీడియో కాల్‌లో చీర రంగు, అంచు, నేత, మడత — అన్నీ స్వయంగా చూడండి.','Wherever you are, Maanvi is close. In a 30-minute video viewing, see the actual colour, border, weave and fall of each saree.')}</p><div className="meeting-steps">{[[t('మీ గురించి చెప్పండి','Tell us'),t('వేడుక, ఇష్టాలు, రంగులు, బడ్జెట్.','Your occasion, preferences, colours and budget.')],[t('మేము ఎంచుకుంటాం','We curate'),t('అందుబాటులో ఉన్న చీరల నుంచి మీ కోసం.','A relevant selection from available arrivals.')],[t('దగ్గరగా చూడండి','Meet the cloth'),t('వీడియో కాల్‌లో వివరాలన్నీ చూసి ఎంచుకోండి.','See every detail live, then choose at your pace.')]].map(([title,body],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><a className="thread-button ivory" href="/book">{t('వీడియో కాల్ బుక్ చేసుకోండి','Book your private viewing')}</a></section>
        <section id="visit" className="visit-chapter"><div><p className="chapter-kicker">{t('విజయవాడలో మా ఇల్లు','OUR HOME IN VIJAYAWADA')}</p><h2>{t('రండి.\nచీరలు చూద్దాం.','Come in.\nLet’s unfold a few.')}</h2></div><div><address>No. 52-1-7/5, Road Number 2A,<br/>near Malineni Library Hall, NTR Colony,<br/>Veterinary Colony, Kanuru,<br/>Andhra Pradesh 520008, India.</address><a className="chapter-link" href={links.maps} target="_blank" rel="noreferrer">{t('దారి చూడండి','Get directions')}</a><a className="visit-phone" href={links.whatsapp} target="_blank" rel="noreferrer">+91 91822 42429</a></div></section>
      </>}
    </main>
    <footer className="journey-footer">
      <div className="footer-brand"><a href="/" aria-label="Maanvi home"><BrandLogo/></a><p>{t('మన మాన్వి. మన వేడుక.','Our Maanvi. Our celebrations.')}</p><div className="footer-social"><a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div></div>
      <div className="footer-newsletter"><h2>{t('మా వార్తలు అందుకోండి','Subscribe to our newsletter')}</h2><p>{t('కొత్త చీరలు, కలెక్షన్లు, వీడియో వీక్షణల సమాచారం.', 'New sarees, collection notes and private viewing updates.')}</p><form onSubmit={e=>e.preventDefault()}><label htmlFor="footer-email">{t('మీ ఇమెయిల్','Your email')}</label><input id="footer-email" type="email" placeholder="name@example.com" autoComplete="email"/><button type="submit" aria-label={t('చందా నమోదు','Subscribe')}>Subscribe</button></form></div>
      <div className="footer-columns">
        <div><h2>{t('సంప్రదించండి','Contact us')}</h2><a href="/contact">{t('మమ్మల్ని సంప్రదించండి','Contact Maanvi')}</a><a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="/book">{t('వీడియో కాల్ బుక్ చేయండి','Book a private viewing')}</a><a href="mailto:hello@maanvi.in">hello@maanvi.in</a></div>
        <div><h2>{t('సేవలు','Services')}</h2><a href="/services">{t('అన్ని సేవలు','All services')}</a><a href="/archive">{t('మా కలెక్షన్','Our Collection')}</a><a href="/shipping">{t('షిప్పింగ్ మరియు డెలివరీ','Shipping and delivery')}</a><a href="/returns">{t('రిటర్న్స్ మరియు మార్పులు','Returns and exchanges')}</a></div>
        <div><h2>{t('మాన్వి గురించి','About Maanvi')}</h2><a href="/company">{t('మాన్వి గురించి','About Maanvi')}</a><a href="/our-story">{t('మా కుటుంబం కథ','Our family story')}</a><a href="/careers">{t('ఉద్యోగాలు','Careers')}</a><a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a></div>
        <div><h2>{t('నియమాలు','Legal')}</h2><a href="/privacy">{t('గోప్యతా విధానం','Privacy')}</a><a href="/terms">{t('విక్రయ నిబంధనలు','Terms of sale')}</a><a href="/cookies">{t('కుకీ విధానం','Cookie policy')}</a><a href="/sitemap.xml">{t('సైట్‌మ్యాప్','Sitemap')}</a></div>
      </div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} Maanvi · Vijayawada</small><a href="/visit">{t('దుకాణం: విజయవాడ','Store: Vijayawada')}</a><span>{t('తెలుగు / English','Telugu / English')}</span></div>
    </footer>
    <div className="journey-home-controls">
      <button className="journey-home-icon" type="button" aria-label={paused?t('కదలిక మొదలు పెట్టండి','Resume motion'):t('కదలిక ఆపండి','Pause motion')} aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>
        {paused?<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="m8 5 11 7-11 7V5Z"/></svg>:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14m8-14v14"/></svg>}
      </button>
    </div>
  </div>;
}
