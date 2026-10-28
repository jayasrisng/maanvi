import { useEffect, useState } from 'react';
import FlowingStory from './components/FlowingStory';
import BrandLogo from './components/BrandLogo';
import Icon from './components/Icon';
import CollectionBook from './components/CollectionBook';
import Viewing from './components/Viewing';
import InfoPage from './components/InfoPage';
import MaanviIntro from './components/MaanviIntro';

const links = { whatsapp: 'https://wa.me/919182242429', maps: 'https://maps.app.goo.gl/yzy3N5ef7hTZ5goFA', instagram: 'https://www.instagram.com/maanviofficial/' };
const chapterRoutes: Record<string,string> = { '/bridal': 'silk', '/saree-guide': 'cloth', '/private-shopping': 'meet' };

export default function App() {
  const [language, setLanguage] = useState<'te'|'en'>(()=>{try{return localStorage.getItem('maanvi.language')==='en'?'en':'te';}catch{return 'te';}});
  const [paused, setPaused] = useState(false);
  const [introSound, setIntroSound] = useState(true);
  const [menu, setMenu] = useState(false);
  const [hash, setHash] = useState(() => location.hash);
  const [favorites, setFavorites] = useState<string[]>(()=>{try{const saved:unknown=JSON.parse(localStorage.getItem('maanvi.favorites')||'[]');return Array.isArray(saved)?saved.filter((id):id is string=>typeof id==='string'):[];}catch{return [];}});
  const te = language==='te';
  const t = (telugu:string, english:string) => te?telugu:english;
  const path = location.pathname.replace(/\/$/,'') || '/';
  const archive = path==='/archive', book = path==='/book';
  const infoKind: Record<string,string> = { '/privacy':'privacy', '/terms':'terms', '/cookies':'cookies', '/sitemap.xml':'sitemap', '/careers':'careers', '/contact':'contact', '/returns':'returns', '/shipping':'shipping', '/services':'services', '/company':'company' };
  const info = infoKind[path];
  const story = path==='/our-story', visit = path==='/visit', shopping = path==='/private-shopping';
  const family = story || visit || shopping;
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
    <header className="journey-header"><a className="journey-brand" href="/" aria-label="Maanvi home"><BrandLogo/></a><nav className={menu?'is-open':''} id="main-navigation" aria-label={t('ప్రధాన పేజీలు','Main navigation')}><a className={hash==='#cloth'?'is-active':''} href={chapterLink('cloth')} onClick={()=>setMenu(false)}>{t('మన చీరలు','Our cloth')}</a><a className={path==='/archive'?'is-active':''} href="/archive">{t('మా కలెక్షన్','Our Collection')}</a><a className={path==='/our-story'?'is-active':''} href="/our-story" onClick={()=>setMenu(false)}>{t('మా కథ','Our family')}</a><a className={path==='/book'?'is-active header-viewing':'header-viewing'} href="/book">{t('మాట్లాడుకుందాం','Meet Maanvi')}</a></nav><div className="journey-language" aria-label="Language"><button lang="te" aria-pressed={te} onClick={()=>setLanguage('te')}>తెలుగు</button><span>/</span><button lang="en" aria-pressed={!te} onClick={()=>setLanguage('en')}>EN</button></div><button className="journey-menu" aria-controls="main-navigation" aria-expanded={menu} aria-label={menu?t('మెనూ మూసివేయండి','Close menu'):t('మెనూ తెరవండి','Open menu')} onClick={()=>setMenu(!menu)}><Icon name={menu?'close':'menu'}/></button></header>
    <main id="main-content" tabIndex={-1}>
      {info?<InfoPage kind={info} te={te}/>:archive?<CollectionBook favorites={favorites} toggleFavorite={toggleFavorite} language={language}/>:book?<Viewing te={te} favorites={favorites}/>:<>
        {home && <FlowingStory te={te} paused={paused}/>}
        {(story || visit) && <>
        <section id="family" className="family-chapter"><div className="family-photo"><img src={path==='/visit'?'/images/visit/store.jpg':'/images/story/founders.jpg'} alt={path==='/visit'?t('విజయవాడలో మాన్వి దుకాణం','The Maanvi store in Vijayawada'):t('మాన్వి వెనుక ఉన్న కుటుంబం','The family behind Maanvi')} loading="lazy"/><span>VIJAYAWADA · SINCE 2017</span></div><div className="family-words"><p className="chapter-kicker">{visit?t('విజయవాడలో మా ఇల్లు','OUR HOME IN VIJAYAWADA'):t('మా కుటుంబం నుంచి మీ కుటుంబానికి','FROM OUR FAMILY TO YOURS')}</p><h1>{visit?t('రండి.\nచీరలు చూద్దాం.','Come in.\nLet’s unfold a few.'):t('మాన్వి అంటే,\nమన వాళ్లే.','Behind every fold,\na family.')}</h1><p>{visit?t('కనూరులోని మా దుకాణంలో వస్త్రాన్ని తాకి, రంగులను పోల్చి, మీకు నచ్చిన చీరను హాయిగా ఎంచుకోండి. రాకముందు మాకు మెసేజ్ చేయండి.','Feel the cloth, compare colours and take your time choosing at our store in Kanuru. Message us before you visit.'):t('2017 నుంచి విజయవాడలో మా కుటుంబం నడిపే చీరల ఇల్లు మాన్వి. దుకాణంలోనైనా, వీడియో కాల్‌లోనైనా — చీరలను విప్పి, వివరాలు చూపించి, మీకు నచ్చినది ఎంచుకునే సమయం ఇస్తాం.','Maanvi is our family’s saree house in Vijayawada, since 2017. In store or over a video call, we unfold the sarees, show you the details and give you room to choose.')}</p><a className="chapter-link" href={links.whatsapp} target="_blank" rel="noreferrer"><Icon name="message"/>{t('మాతో మాట్లాడండి','Talk to our family')}</a></div></section>
          </>}
      </>}
        {home && <section className="home-invitation"><p className="chapter-kicker">{t('మా కుటుంబం నుంచి మీకు', 'FROM OUR FAMILY TO YOURS')}</p><h2>{t('రండి. కలిసి ఎంచుకుందాం.', 'Come in. Find your drape.')}</h2><p>{t('విజయవాడలోనైనా, వీడియో కాల్‌లోనైనా — చీరలను దగ్గరగా చూసి, తెలుగులో హాయిగా మాట్లాడుకుందాం.', 'In Vijayawada or over a video call, meet the real sarees and the family who chose them.')}</p><div><a className="thread-button ivory" href="/book">{t('వీడియో కాల్ బుక్ చేయండి', 'Book a viewing')}</a><a className="chapter-link invitation-secondary" href="/our-story"><Icon name="arrow"/>{t('మా కుటుంబం కథ', 'Meet our family')}</a></div></section>}
        {shopping && <><section id="meet" className="meet-chapter"><p className="chapter-kicker">{t('మీ కోసం వ్యక్తిగత ఎంపిక','A PRIVATE VIEWING')}</p><h1>{t('కలిసి ఎంచుకుందాం.','Let’s find your drape.')}</h1><p className="meet-intro">{t('30 నిమిషాల వీడియో కాల్‌లో మీ కోసం ఎంచుకున్న చీరలను దగ్గరగా చూడండి. తెలుగు లేదా ఇంగ్లీష్‌లో హాయిగా మాట్లాడుకుందాం.','A 30-minute video call, with a selection prepared around you. See the details and speak with us in Telugu or English.')}</p><div className="meeting-steps">{[[t('మీ గురించి చెప్పండి','Tell us'),t('వేడుక, ఇష్టాలు, రంగులు, బడ్జెట్.','Your occasion, preferences, colours and budget.')],[t('మేము ఎంచుకుంటాం','We curate'),t('అందుబాటులో ఉన్న చీరల నుంచి మీ కోసం.','A relevant selection from available arrivals.')],[t('దగ్గరగా చూడండి','Meet the cloth'),t('వీడియో కాల్‌లో వివరాలన్నీ చూసి ఎంచుకోండి.','See every detail live, then choose at your pace.')]].map(([title,body],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><a className="thread-button ivory" href="/book"><Icon name="calendar"/>{t('వీక్షణ బుక్ చేయండి','Book a viewing')}</a></section></>}
        {story && <section className="story-invitation"><h2>{t('మీకు నచ్చిన చీరను కలిసి ఎంచుకుందాం.','A little help finding your drape.')}</h2><div><a className="thread-button" href="/book"><Icon name="calendar"/>{t('వీక్షణ బుక్ చేయండి','Book a viewing')}</a><a className="chapter-link" href="/visit"><Icon name="map"/>{t('విజయవాడలో మమ్మల్ని కలవండి','Visit us in Vijayawada')}</a></div></section>}
        {visit && <>
        <section id="visit" className="visit-chapter"><div><p className="chapter-kicker">{t('విజయవాడలో మా ఇల్లు','OUR HOME IN VIJAYAWADA')}</p><h2>{t('మమ్మల్ని చేరుకోండి.','Find your way here.')}</h2></div><div><address>No. 52-1-7/5, Road Number 2A,<br/>near Malineni Library Hall, NTR Colony,<br/>Veterinary Colony, Kanuru,<br/>Andhra Pradesh 520008, India.</address><a className="chapter-link" href={links.maps} target="_blank" rel="noreferrer"><Icon name="map"/>{t('దారి చూడండి','Get directions')}</a><a className="visit-phone" href={links.whatsapp} target="_blank" rel="noreferrer">+91 91822 42429</a></div></section>
      </>}
    </main>
    <footer className="journey-footer">
      <div className="footer-brand"><a href="/" aria-label="Maanvi home"><BrandLogo/></a><p>{t('మన మాన్వి. మన వేడుక.','Our Maanvi. Our celebrations.')}</p><div className="footer-social"><a className="icon-link" href="/?intro=1" aria-label={t('పరిచయ వీడియో','Watch intro')} title={t('పరిచయ వీడియో','Watch intro')}><Icon name="play"/></a><a className="icon-link" href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><Icon name="instagram"/></a></div></div>
      <div className="footer-columns">
        <div><h2>{t('సంప్రదించండి','Let’s talk')}</h2><a href="/contact">{t('మమ్మల్ని సంప్రదించండి','Contact Maanvi')}</a><a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:hello@maanvi.in">hello@maanvi.in</a></div>
        <div><h2>{t('చూడండి','Explore')}</h2><a href="/archive">{t('మా కలెక్షన్','Our Collection')}</a><a href="/our-story">{t('మా కుటుంబం కథ','Our story')}</a><a href="/visit">{t('దుకాణం వివరాలు','Visit Maanvi')}</a></div>
        <div><h2>{t('షాపింగ్ సహాయం','Shopping with us')}</h2><a href="/book">{t('వీక్షణ బుక్ చేయండి','Book a viewing')}</a><a href="/shipping">{t('షిప్పింగ్ మరియు డెలివరీ','Shipping and delivery')}</a><a href="/returns">{t('రిటర్న్స్ మరియు మార్పులు','Returns and exchanges')}</a></div>
      </div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} Maanvi · Vijayawada</small><a href="/privacy">{t('గోప్యత','Privacy')}</a><a href="/terms">{t('నిబంధనలు','Terms')}</a><a href="/cookies">{t('కుకీలు','Cookies')}</a></div>
    </footer>
    <div className="journey-home-controls">
      <button className="journey-home-icon" type="button" aria-label={paused?t('కదలిక మొదలు పెట్టండి','Resume motion'):t('కదలిక ఆపండి','Pause motion')} aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>
        {paused?<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="m8 5 11 7-11 7V5Z"/></svg>:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14m8-14v14"/></svg>}
      </button>
    </div>
  </div>;
}
