import { useEffect, useRef, useState } from 'react';
import TextileFlowScene from './TextileFlowScene';
import './flowing-story.css';

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (a: number, b: number, n: number) => { const p = clamp((n - a) / (b - a)); return p * p * (3 - 2 * p); };

export default function FlowingStory({ te, paused }: { te: boolean; paused: boolean }) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const t = (a: string, b: string) => te ? a : b;
  const still = reduced || paused;

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const host = root.current!;
    const cards = [...host.querySelectorAll<HTMLElement>('.flow-copy')];
    let frame = 0, target = 0, previousTime = 0;
    const paint = (now: number) => {
      const elapsed = Math.min(64, now - (previousTime || now - 16));
      previousTime = now;
      progress.current += (target - progress.current) * (1 - Math.exp(-elapsed / 85));
      if (Math.abs(target - progress.current) < .0001) progress.current = target;
      const p = progress.current;
      const opacity = [1 - smooth(.12, .23, p), smooth(.23, .31, p) * (1 - smooth(.43, .53, p)), smooth(.59, .67, p) * (1 - smooth(.78, .86, p)), smooth(.87, .94, p)];
      const travel = [-smooth(.12, .23, p) * 42, (1 - smooth(.23, .31, p)) * 36 - smooth(.43, .53, p) * 28, (1 - smooth(.59, .67, p)) * 35 - smooth(.78, .86, p) * 25, (1 - smooth(.87, .94, p)) * 35];
      cards.forEach((card, index) => {
        card.style.opacity = still ? '1' : `${opacity[index]}`;
        card.style.transform = still ? 'none' : `translate3d(0,${travel[index]}px,0)`;
        card.style.visibility = still || opacity[index] > .005 ? 'visible' : 'hidden';
        card.inert = !still && opacity[index] < .55;
      });
      host.style.setProperty('--silk-reveal', `${smooth(.48, .66, p)}`);
      host.style.setProperty('--flow-progress', `${p}`);
      host.dataset.act = p < .24 ? 'opening' : p < .58 ? 'cotton' : 'silk';
      window.dispatchEvent(new Event('maanvi:flow'));
      frame = progress.current === target ? 0 : requestAnimationFrame(paint);
    };
    const read = () => {
      const box = host.getBoundingClientRect();
      target = still ? 0 : clamp(-box.top / Math.max(1, box.height - innerHeight));
      if (!frame) { previousTime = 0; frame = requestAnimationFrame(paint); }
    };
    addEventListener('scroll', read, { passive: true });
    addEventListener('resize', read); read();
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', read); removeEventListener('resize', read); };
  }, [still]);

  return <section ref={root} className={`flow-story${still ? ' flow-still' : ''}`} aria-label={t('పత్తి నుంచి పట్టు వరకు', 'From cotton to silk')}>
    <div className="flow-sticky">
      <TextileFlowScene progress={progress} still={still}/>
      <div className="flow-shade" aria-hidden="true"/>
      <div className="flow-copy flow-welcome">
        <p className="flow-eyebrow">{t('విజయవాడ · మా కుటుంబం నుంచి మీకు', 'VIJAYAWADA · FROM OUR FAMILY TO YOURS')}</p>
        <h1>{t('మన మాన్వి.\nమన వేడుక.', 'Our Maanvi.\nOur celebrations.')}</h1>
        <p>{t('ఒక చిన్న దారం. ఎన్నో అనుబంధాలు.', 'From a little thread, a world of feeling.')}</p>
        {te && <span className="flow-translation" lang="en">From a little thread, a world of feeling.</span>}
        <a className="thread-button ivory" href="#cloth">{t('దారంతో పాటు సాగండి', 'Follow the thread')}</a>
      </div>
      <div className="flow-copy flow-cotton" style={{ opacity: 0, visibility: 'hidden' }}>
        <p className="flow-eyebrow">{t('పత్తి · తేలికగా, హాయిగా', 'COTTON · A LITTLE LIGHTNESS')}</p>
        <h2>{t('గాలిలా తేలిక.\nమనసుకు హాయి.', 'Light as air.\nClose to the heart.')}</h2>
        <p>{t('రోజంతా హాయిగా ఉండే కాటన్. మీకు నచ్చిన రంగులో, మీ రోజుకు సరిపోయే చీరను కలిసి ఎంచుకుందాం.', 'Airy cotton, chosen for the rhythm of your day. A colour you love. A drape that feels like you.')}</p>
        <a className="chapter-link" href="/book">{t('మీ కోసం ఎంచుకుందాం', 'Find your everyday drape')}</a>
      </div>
      <div className="flow-copy flow-silk" style={{ opacity: 0, visibility: 'hidden' }}>
        <p className="flow-eyebrow">{t('పట్టు · మీ వేడుక కోసం', 'PATTU · FOR YOUR CELEBRATION')}</p>
        <h2>{t('ఒక దారం నుంచి,\nఒక అందమైన ఆరంభం.', 'A delicate thread.\nA beautiful beginning.')}</h2>
        <p>{t('పెళ్లి ఉదయం పట్టుచీర మెరుపు. అమ్మకు నచ్చిన జరీ అంచు. మీ సంప్రదాయం, రంగులు, బడ్జెట్‌కు సరిపోయే ఎంపికను మీ కుటుంబం కోసం సిద్ధం చేస్తాం.', 'Pattu catching the light on a wedding morning. A zari border your mother loves. A selection for your family, chosen around your traditions, colours and budget.')}</p>
        <a className="thread-button ivory" href="/book">{t('పెళ్లి చీరలు కలిసి చూద్దాం', 'Plan a bridal viewing')}</a>
      </div>
      <div className="flow-copy flow-photobook" style={{ opacity: 0, visibility: 'hidden' }}>
        <p className="flow-eyebrow">{t('మా ఫోటో బుక్ · 2017—2026', 'OUR PHOTO BOOK · 2017—2026')}</p>
        <h2>{t('గత సంవత్సరాల రంగులు.\nమన ప్రయాణపు జ్ఞాపకాలు.', 'Years of colour.\nA story to turn through.')}</h2>
        <p>{t('మా ప్రయాణంలో భాగమైన చీరలు, వస్త్రాల డిజైన్లను మా ఫోటో బుక్‌లో చూడండి. ఒక్కో పుట, ఒక్కో జ్ఞాపకం.', 'Explore the saree and fabric designs that have been part of our journey. A photo book of collections past, one page at a time.')}</p>
        <a className="thread-button ivory" href="/archive">{t('మా ఫోటో బుక్ తెరవండి', 'Open our photo book')}</a>
      </div>
      <div className="flow-caption" aria-hidden="true"><span>{t('పత్తి', 'COTTON')}</span><span className="flow-track"><i/></span><span>{t('పట్టు', 'SILK')}</span></div>
    </div>
    <span className="flow-anchor cotton-anchor" id="cloth"/>
    <span className="flow-anchor silk-anchor" id="silk"/>
  </section>;
}
