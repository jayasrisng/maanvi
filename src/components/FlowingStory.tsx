import { useEffect, useRef, useState } from 'react';
import TextileFlowScene from './TextileFlowScene';

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (a: number, b: number, n: number) => { const p = clamp((n - a) / (b - a)); return p * p * (3 - 2 * p); };

export default function FlowingStory({ te, paused }: { te: boolean; paused: boolean }) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [mobile, setMobile] = useState(() => matchMedia('(max-width: 760px)').matches);
  const t = (a: string, b: string) => te ? a : b;
  const stacked = mobile || reduced || paused;

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const viewport = matchMedia('(max-width: 760px)');
    const update = () => { setReduced(media.matches); setMobile(viewport.matches); };
    media.addEventListener('change', update);
    viewport.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); viewport.removeEventListener('change', update); };
  }, []);

  useEffect(() => {
    const host = root.current!;
    const cards = [...host.querySelectorAll<HTMLElement>('.flow-copy')];
    if (stacked) {
      cards.forEach(card => { card.style.opacity='1'; card.style.transform='none'; card.style.visibility='visible'; card.inert=false; });
      host.dataset.act = 'panels';
      return;
    }
    let frame = 0, target = 0, previousTime = 0;
    const paint = (now: number) => {
      const elapsed = Math.min(64, now - (previousTime || now - 16));
      previousTime = now;
      progress.current += (target - progress.current) * (1 - Math.exp(-elapsed / 140));
      if (Math.abs(target - progress.current) < .0001) progress.current = target;
      const p = progress.current;
      const opacity = [1 - smooth(.17, .25, p), smooth(.22, .30, p) * (1 - smooth(.49, .59, p)), smooth(.55, .64, p) * (1 - smooth(.81, .89, p)), smooth(.85, .93, p)];
      const travel = [-smooth(.12, .23, p) * 42, (1 - smooth(.23, .31, p)) * 36 - smooth(.43, .53, p) * 28, (1 - smooth(.59, .67, p)) * 35 - smooth(.78, .86, p) * 25, (1 - smooth(.87, .94, p)) * 35];
      cards.forEach((card, index) => {
        card.style.opacity = `${opacity[index]}`;
        card.style.transform = `translate3d(0,${travel[index]}px,0)`;
        card.style.visibility = opacity[index] > .005 ? 'visible' : 'hidden';
        card.inert = opacity[index] < .55;
      });
      host.style.setProperty('--silk-reveal', `${smooth(.44, .69, p)}`);
      host.style.setProperty('--photo-reveal', `${smooth(.80, .93, p)}`);
      host.style.setProperty('--flow-progress', `${p}`);
      host.dataset.act = p < .24 ? 'opening' : p < .58 ? 'cotton' : 'silk';
      window.dispatchEvent(new Event('maanvi:flow'));
      frame = progress.current === target ? 0 : requestAnimationFrame(paint);
    };
    const read = () => {
      const box = host.getBoundingClientRect();
      target = clamp(-box.top / Math.max(1, box.height - innerHeight));
      if (!frame) { previousTime = 0; frame = requestAnimationFrame(paint); }
    };
    addEventListener('scroll', read, { passive: true });
    addEventListener('resize', read); read();
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', read); removeEventListener('resize', read); };
  }, [stacked]);

  return <section ref={root} className={`flow-story${stacked ? ' flow-stacked' : ''}`} data-layout={stacked ? 'panels' : 'cinematic'} aria-label={t('పత్తి నుంచి పట్టు వరకు', 'From cotton to silk')}>
    <div className="flow-sticky">
      {!stacked && <TextileFlowScene progress={progress}/>}
      <div className="flow-copy flow-welcome">
        {stacked && <img className="flow-panel-image" src="/images/concepts/cotton-loom.webp" alt={t('మేఘాల మధ్య చేనేత మగ్గం', 'A handloom among cotton clouds')} fetchPriority="high" width="1500" height="1000"/>}
        <p className="flow-eyebrow">{t('విజయవాడ · మా కుటుంబం నుంచి మీకు', 'VIJAYAWADA · FROM OUR FAMILY TO YOURS')}</p>
        <h1><span>{t('మన మాన్వి.', 'Our Maanvi.')}</span><span>{t('మన వేడుక.', 'Our celebrations.')}</span></h1>
        <p>{t('ఒక చిన్న దారం. ఎన్నో అనుబంధాలు.', 'From a little thread, a world of feeling.')}</p>
        {te && <span className="flow-translation" lang="en">From a little thread, a world of feeling.</span>}
        <a className="thread-button ivory" href="#cloth">{t('దారంతో పాటు సాగండి', 'Follow the thread')}</a>
      </div>
      <div id={stacked ? 'cloth' : undefined} className="flow-copy flow-cotton" style={stacked ? undefined : { opacity: 0, visibility: 'hidden' }}>
        {stacked && <img className="flow-panel-image" src="/images/concepts/cotton-loom.webp" alt={t('మగ్గంపై కాటన్ వస్త్రం', 'Cotton cloth at the loom')} loading="lazy" width="1500" height="1000"/>}
        <p className="flow-eyebrow">{t('పత్తి · తేలికగా, హాయిగా', 'COTTON · A LITTLE LIGHTNESS')}</p>
        <h2>{t('గాలిలా తేలిక.\nమనసుకు హాయి.', 'Light as air.\nClose to the heart.')}</h2>
        <p>{t('రోజంతా హాయిగా ఉండే కాటన్. మీకు నచ్చిన రంగులో, మీ రోజుకు సరిపోయే చీరను కలిసి ఎంచుకుందాం.', 'Airy cotton, chosen for the rhythm of your day. A colour you love. A drape that feels like you.')}</p>
        <a className="chapter-link" href="/book">{t('మీ కోసం ఎంచుకుందాం', 'Find your everyday drape')}</a>
      </div>
      <div id={stacked ? 'silk' : undefined} className="flow-copy flow-silk" style={stacked ? undefined : { opacity: 0, visibility: 'hidden' }}>
        {stacked && <img className="flow-panel-image" src="/images/concepts/silk-cocoons.webp" alt={t('పట్టు దారాలు, మెరిసే పట్టుచీర', 'Silk threads and a richly coloured saree')} loading="lazy" width="1500" height="1000"/>}
        <p className="flow-eyebrow">{t('పట్టు · మీ వేడుక కోసం', 'PATTU · FOR YOUR CELEBRATION')}</p>
        <h2>{t('ఒక దారం నుంచి,\nఒక అందమైన ఆరంభం.', 'A delicate thread.\nA beautiful beginning.')}</h2>
        <p>{t('పెళ్లి ఉదయం పట్టుచీర మెరుపు. అమ్మకు నచ్చిన జరీ అంచు. మీ సంప్రదాయం, రంగులు, బడ్జెట్‌కు సరిపోయే ఎంపికను మీ కుటుంబం కోసం సిద్ధం చేస్తాం.', 'Pattu catching the light on a wedding morning. A zari border your mother loves. A selection for your family, chosen around your traditions, colours and budget.')}</p>
        <a className="thread-button ivory" href="/book">{t('పెళ్లి చీరలు కలిసి చూద్దాం', 'Plan a bridal viewing')}</a>
      </div>
      <div className="flow-copy flow-photobook" style={stacked ? undefined : { opacity: 0, visibility: 'hidden' }}>
        {stacked && <img className="flow-panel-image" src="/images/archive/2026/fall/10-living-classics-finale.webp" alt={t('ఫాల్ 2026 లివింగ్ క్లాసిక్స్ కలెక్షన్ కళారూపం', 'AI-created interpretation of the Fall 2026 Living classics collection')} loading="lazy" width="933" height="1400"/>}
        <p className="flow-eyebrow">{t('ఫాల్ 2026 · మా కలెక్షన్', 'FALL 2026 · THE COLLECTION')}</p>
        <h2>{t('కాలం మారినా,\nఅందం అలాగే.', 'Living classics.\nFall 2026.')}</h2>
        <p>{t('మైసూర్ సిల్క్, ప్యూర్ క్రేప్ — ఫాల్ 2026 కలెక్షన్‌లోని రంగులు, వస్త్రాలను ఒక్కో చిత్రంగా చూడండి.', 'Mysore silk and pure crêpe, in colours to make your own. Explore the Fall 2026 collection, one drape at a time.')}</p>
        <a className="thread-button ivory" href="/archive">{t('ఫాల్ 2026 చూడండి', 'Explore Fall 2026')}</a>
      </div>
      <div className="flow-caption" aria-hidden="true"><span>{t('పత్తి', 'COTTON')}</span><span className="flow-track"><i/></span><span>{t('పట్టు', 'SILK')}</span></div>
    </div>
    {!stacked && <><span className="flow-anchor cotton-anchor" id="cloth"/><span className="flow-anchor silk-anchor" id="silk"/></>}
  </section>;
}
