import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { welcomeFilms, shouldOpen } from './maanvi-intro-assets';
import './maanvi-intro.css';

const seenKey = 'maanviIntroSeen';


export default function MaanviIntro({ te, soundOn, onToggleSound, onComplete, onRevealHome }: { te: boolean; soundOn: boolean; onToggleSound: () => void; onComplete?: () => void; onRevealHome?: () => void }) {
  const muted = !soundOn;
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(shouldOpen);
  const [phase, setPhase] = useState<'loading' | 'film' | 'brand' | 'handoff' | 'exit'>('loading');
  const [source] = useState(() => matchMedia('(max-width: 760px)').matches ? welcomeFilms.mobile : welcomeFilms.desktop);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const video = useRef<HTMLVideoElement>(null);
  const atmosphere = useRef<HTMLVideoElement>(null);
  const identity = useRef<HTMLDivElement>(null);
  const sparkle = useRef<HTMLAudioElement>(null);
  const soundEnabled = useRef(soundOn);
  useEffect(() => {
    soundEnabled.current = soundOn;
    if (video.current) video.current.muted = !soundOn;
    if (sparkle.current) sparkle.current.muted = !soundOn;
  }, [soundOn]);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const movie = video.current;
    const ambient = atmosphere.current;
    const chime = sparkle.current;
    const syncAtmosphere = () => {
      if (!movie || !ambient) return;
      if (Math.abs(ambient.currentTime - movie.currentTime) > .15) ambient.currentTime = movie.currentTime;
      if (movie.paused) ambient.pause();
      else ambient.play().catch(() => {});
    };
    movie?.addEventListener('play', syncAtmosphere);
    movie?.addEventListener('pause', syncAtmosphere);
    movie?.addEventListener('seeked', syncAtmosphere);
    movie?.addEventListener('timeupdate', syncAtmosphere);
    const site = document.querySelector<HTMLElement>('.maanvi-site');
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const wasInert = site?.inert ?? false;
    document.body.style.overflow = 'hidden';
    if (site) site.inert = true;
    let disposed = false, exiting = false, started = false, handingOff = false, forming = false;
    let logoMotion: Animation | undefined;
    let logoFormation: Animation | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(() => { if (!disposed && !exiting) fn(); }, ms));
    };
    const remember = () => { try { localStorage.setItem(seenKey, 'true'); } catch { /* Optional storage. */ } };
    const exit = () => {
      if (exiting || disposed) return;
      exiting = true;
      movie?.pause();
      remember();
      setPhase('exit');
      timers.push(setTimeout(() => { if (!disposed) { setOpen(false); onComplete?.(); } }, reduced ? 120 : 350));
    };
    const handoff = () => {
      if (handingOff || exiting || disposed) return;
      handingOff = true;
      movie?.pause();
      remember();
      if (site) site.inert = false;
      site?.classList.add('intro-release');
      site?.classList.add('intro-logo-travelling');
      setPhase('handoff');
      onRevealHome?.();
      const mark = identity.current;
      const destination = document.querySelector<HTMLElement>('.journey-header .maanvi-logo');
      if (mark && destination) {
        const from = mark.querySelector('img')!.getBoundingClientRect();
        const to = destination.getBoundingClientRect();
        logoMotion = mark.animate([
          { transform: 'translate(0, 0) scale(1)' },
          { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})` },
        ], { duration: 1000, easing: 'cubic-bezier(.22,.72,.2,1)', fill: 'forwards' });
      }
      timers.push(setTimeout(() => {
        site?.classList.remove('intro-logo-travelling', 'intro-release');
        exit();
      }, reduced ? 120 : 1000));
    };
    const formLogo = () => {
      if (forming || handingOff || exiting || disposed) return;
      forming = true;
      // Keep her seated while the original lettering fills around her, then hold the finished mark for 0.5s.
      const mark = identity.current;
      const film = movie?.getBoundingClientRect();
      const canvas = mark?.querySelector('img')?.getBoundingClientRect();
      if (mark && film && canvas) {
        // Match the seated original SVG to the final film pose, then gently widen the view.
        const portrait = source === welcomeFilms.mobile;
        const frameWidth = portrait ? 720 : 1280;
        const poseX = portrait ? 96 : 376;
        const scale = (586 / 720 * film.height) / (565 / 841.89 * canvas.height);
        const x = film.left + poseX / frameWidth * film.width - canvas.left - 555 / 1190.55 * canvas.width * scale;
        const y = film.top + 84 / 720 * film.height - canvas.top - 48 / 841.89 * canvas.height * scale;
        logoFormation = mark.animate([
          { transform: `translate(${x}px, ${y}px) scale(${scale})` },
          { transform: 'translate(0, 0) scale(1)' },
        ], { duration: 900, easing: 'cubic-bezier(.22,.72,.2,1)' });
      }
      setPhase('brand');
      if (soundEnabled.current) chime?.play().catch(() => {});
      later(handoff, reduced ? 500 : 1400);
    };
    const fallback = () => {
      if (disposed || exiting) return;
      started = true;
      movie?.pause();
      remember();
      setPhase('brand');
      later(handoff, reduced ? 500 : 1400);
    };
    const playing = () => {
      if (disposed || exiting || started) return;
      started = true;
      remember();
      setPhase('film');
    };
    if (reduced) later(fallback, 0);
    else if (movie) {
      movie.addEventListener('playing', playing);
      movie.addEventListener('ended', formLogo);
      movie.addEventListener('error', fallback);
      movie.muted = !soundEnabled.current;
      movie.play().catch(() => {
        if (disposed || exiting) return;
        movie.muted = true;
        movie.play().catch(fallback);
      });
      later(() => { if (!started) fallback(); }, 2500);
    }
    const retrySound = (event: Event) => {
      if (!movie || !soundEnabled.current || handingOff || exiting) return;
      if ((event.target as Element | null)?.closest('button')) return;
      movie.muted = false;
      if (!started) movie.play().catch(() => {});
    };
    document.addEventListener('pointerdown', retrySound);
    document.addEventListener('keydown', retrySound);
    const hidden = () => { if (document.hidden) exit(); };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') exit();
      if (event.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.maanvi-intro button'));
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        event.preventDefault();
        buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus();
      }
    };
    document.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', hidden);
    window.addEventListener('pagehide', remember);
    return () => {
      disposed = true;
      timers.forEach(clearTimeout);
      logoMotion?.cancel();
      logoFormation?.cancel();
      site?.classList.remove('intro-logo-travelling', 'intro-release');
      movie?.pause();
      ambient?.pause();
      chime?.pause();
      movie?.removeEventListener('play', syncAtmosphere);
      movie?.removeEventListener('pause', syncAtmosphere);
      movie?.removeEventListener('seeked', syncAtmosphere);
      movie?.removeEventListener('timeupdate', syncAtmosphere);
      movie?.removeEventListener('playing', playing);
      movie?.removeEventListener('ended', formLogo);
      movie?.removeEventListener('error', fallback);
      document.removeEventListener('pointerdown', retrySound);
      document.removeEventListener('keydown', retrySound);
      document.removeEventListener('keydown', key);
      document.removeEventListener('visibilitychange', hidden);
      window.removeEventListener('pagehide', remember);
      document.body.style.overflow = previousOverflow;
      if (site) site.inert = wasInert;
      if (document.activeElement === document.body && previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
    };
  }, [open, reduced, onComplete, onRevealHome, source]);

  if (!open) return null;
  const toggleSound = () => {
    const movie = video.current;
    if (soundOn && movie?.muted) {
      movie.muted = false;
      movie.play().catch(() => {});
      return;
    }
    onToggleSound();
  };
  const togglePlayback = () => {
    if (!video.current) return;
    if (video.current.paused) {
      video.current.play().then(() => setPaused(false)).catch(() => {});
    } else {
      video.current.pause();
      setPaused(true);
    }
  };
  return createPortal(
    <div className="maanvi-intro" data-phase={phase} data-reduced={reduced} role="dialog" aria-modal="true" aria-label={te ? 'మాన్వికి స్వాగతం' : 'Welcome to Maanvi'}>
      {!reduced && <div className="maanvi-intro-atmosphere" aria-hidden="true"><video ref={atmosphere} src={welcomeFilms.desktop} muted playsInline preload="auto" disablePictureInPicture/><div className="maanvi-intro-haze"/></div>}
      {!reduced && <video ref={video} className="maanvi-welcome-film" src={source} muted={!soundOn} playsInline preload="auto" disablePictureInPicture aria-hidden="true"/>}
      <audio ref={sparkle} src="/intro/maanvi-sparkle.wav" muted={!soundOn} preload="auto"/>
      <div ref={identity} className="maanvi-intro-identity">
        <div className="maanvi-intro-logo">
          <img className="maanvi-seated-mark" src="/intro/maanvi-seated-mark.svg" alt="మాన్వి · Maanvi"/>
          <img className="maanvi-magic-lettering" src="/intro/maanvi-lettering.svg" alt="" aria-hidden="true"/>
          <span className="maanvi-letter-glints" aria-hidden="true"><i/><i/><i/><i/><i/></span>
        </div>
        <p className="maanvi-intro-tagline" lang="te">మన మాన్వి. మన వేడుక.</p>
      </div>
      {!reduced && <div className="maanvi-intro-controls">
        <button className="maanvi-intro-icon" type="button" aria-label={te ? 'హోమ్ పేజీకి వెళ్ళండి' : 'Go to home page'} onClick={() => { window.location.assign('/'); }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="m3.5 10 8.5-7 8.5 7v10H14v-6h-4v6H3.5V10Z"/></svg>
        </button>
        <button className="maanvi-intro-icon" type="button" aria-label={muted ? (te ? 'శబ్దం ఆన్ చేయండి' : 'Turn sound on') : (te ? 'శబ్దం ఆపండి' : 'Turn sound off')} aria-pressed={!muted} onClick={toggleSound}>
          {muted ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="m16 9 5 6m0-6-5 6"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="M16 9.5a4 4 0 0 1 0 5m2.5-7.5a7.5 7.5 0 0 1 0 10"/></svg>}
        </button>
        <button className="maanvi-intro-icon" type="button" aria-label={paused ? (te ? 'కదలిక మొదలు పెట్టండి' : 'Play intro') : (te ? 'కదలిక ఆపండి' : 'Pause intro')} aria-pressed={paused} onClick={togglePlayback}>
          {paused ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="m8 5 11 7-11 7V5Z"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14m8-14v14"/></svg>}
        </button>
      </div>}
    </div>, document.body);
}
