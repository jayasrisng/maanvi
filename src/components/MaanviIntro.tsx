import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { welcomeFilm, shouldOpen } from './maanvi-intro-assets';
import './maanvi-intro.css';

export default function MaanviIntro({ te, soundOn, onToggleSound, onComplete, onRevealHome }: { te: boolean; soundOn: boolean; onToggleSound: () => void; onComplete?: () => void; onRevealHome?: () => void }) {
  const muted = !soundOn;
  const dismiss = useRef<() => void>(() => {});
  const homeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const playbackPaused = useRef(false);
  const autoplayMuted = useRef(false);
  const [open, setOpen] = useState(shouldOpen);
  const [phase, setPhase] = useState<'loading' | 'film' | 'brand' | 'handoff' | 'exit'>('loading');
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
    dialog.current?.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
    if (site) site.inert = true;
    let disposed = false, exiting = false, started = false, handingOff = false, forming = false;
    let logoMotion: Animation | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(() => { if (!disposed && !exiting) fn(); }, ms));
    };
    const exit = () => {
      if (exiting || disposed) return;
      exiting = true;
      movie?.pause();
      setPhase('exit');
      timers.push(setTimeout(() => { if (!disposed) { setOpen(false); onComplete?.(); } }, reduced ? 120 : 350));
    };
    dismiss.current = exit;
    const handoff = () => {
      if (handingOff || exiting || disposed) return;
      handingOff = true;
      movie?.pause();
      if (site) site.inert = false;
      site?.classList.add('intro-release');
      site?.classList.add('intro-logo-travelling');
      setPhase('handoff');
      onRevealHome?.();
      const mark = identity.current;
      const destination = document.querySelector<HTMLElement>('.journey-header .maanvi-logo');
      const markImage = mark?.querySelector('img');
      if (mark && markImage && destination) {
        const from = markImage.getBoundingClientRect();
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
      setPhase('brand');
      if (soundEnabled.current) chime?.play().catch(() => {});
      later(handoff, reduced ? 500 : 1400);
    };
    const fallback = () => {
      if (disposed || exiting || forming || handingOff) return;
      forming = true;
      started = true;
      movie?.pause();
      setPhase('brand');
      later(handoff, reduced ? 500 : 1400);
    };
    const playing = () => {
      if (disposed || exiting || started) return;
      started = true;
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
        autoplayMuted.current = true;
        movie.play().catch(fallback);
      });
      later(() => { if (!started) fallback(); }, 8000);
    }
    // An audible start is requested first. If the browser blocks it, keep the film
    // playing and restore its soundtrack on the visitor's first interaction.
    const restoreSound = (event: Event) => {
      if (!movie || !autoplayMuted.current || !soundEnabled.current || playbackPaused.current || forming || handingOff || exiting || disposed) return;
      if ((event.target as Element | null)?.closest('[data-sound-control]')) return;
      movie.muted = false;
      autoplayMuted.current = false;
      movie.play().catch(() => {
        if (disposed || exiting) return;
        movie.muted = true;
        autoplayMuted.current = true;
        movie.play().catch(() => {});
      });
    };
    document.addEventListener('pointerdown', restoreSound);
    document.addEventListener('keydown', restoreSound);
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') exit();
      if (event.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.maanvi-intro button'));
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        event.preventDefault();
        const next = index < 0 ? (event.shiftKey ? buttons.length - 1 : 0) : (index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length;
        buttons[next]?.focus();
      }
    };
    document.addEventListener('keydown', key);
    let lastTime = 0, stalledFor = 0;
    const watchdog = setInterval(() => {
      if (!movie || playbackPaused.current || handingOff || forming || exiting || disposed || document.hidden) return;
      if (Math.abs(movie.currentTime - lastTime) < .01) stalledFor += 1000;
      else stalledFor = 0;
      lastTime = movie.currentTime;
      if (stalledFor >= 10000) fallback();
    }, 1000);
    return () => {
      disposed = true;
      timers.forEach(clearTimeout);
      logoMotion?.cancel();
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
      document.removeEventListener('pointerdown', restoreSound);
      document.removeEventListener('keydown', restoreSound);
      document.removeEventListener('keydown', key);
      clearInterval(watchdog);
      document.body.style.overflow = previousOverflow;
      if (site) site.inert = wasInert;
      if (previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
      else document.getElementById('main-content')?.focus({ preventScroll: true });
    };
  }, [open, reduced, onComplete, onRevealHome]);

  if (!open) return null;
  const toggleSound = () => {
    const movie = video.current;
    if (soundOn && movie?.muted) {
      movie.muted = false;
      autoplayMuted.current = false;
      movie.play().catch(() => {});
      return;
    }
    onToggleSound();
  };
  const togglePlayback = () => {
    if (!video.current) return;
    if (video.current.paused) {
      video.current.play().then(() => { playbackPaused.current = false; setPaused(false); }).catch(() => {});
    } else {
      playbackPaused.current = true;
      video.current.pause();
      setPaused(true);
    }
  };
  return createPortal(
    <div ref={dialog} tabIndex={-1} className="maanvi-intro" data-phase={phase} data-reduced={reduced} role="dialog" aria-modal="true" aria-label={te ? 'మాన్వికి స్వాగతం' : 'Welcome to Maanvi'}>
      {!reduced && <div className="maanvi-intro-atmosphere" aria-hidden="true"><video ref={atmosphere} src={welcomeFilm} muted playsInline preload="auto" disablePictureInPicture/><div className="maanvi-intro-haze"/></div>}
      {!reduced && <video ref={video} className="maanvi-welcome-film" src={welcomeFilm} muted={!soundOn} playsInline preload="auto" disablePictureInPicture aria-hidden="true"/>}
      <audio ref={sparkle} src="/intro/maanvi-sparkle.wav" muted={!soundOn} preload="auto"/>
      <div ref={identity} className="maanvi-intro-identity">
        <div className="maanvi-intro-logo">
          <img className="maanvi-seated-mark" src="/intro/maanvi-seated-mark.svg" alt="మాన్వి · Maanvi"/>
          <img className="maanvi-magic-lettering" src="/intro/maanvi-lettering.svg" alt="" aria-hidden="true"/>
        </div>
        <p className="maanvi-intro-tagline" lang="te">మన మాన్వి. మన వేడుక.</p>
      </div>
      {!reduced && <div className="maanvi-intro-controls">
        <button ref={homeButton} className="maanvi-intro-icon" type="button" aria-label={te ? 'హోమ్ పేజీకి వెళ్ళండి' : 'Go to home page'} onClick={() => dismiss.current()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="m3.5 10 8.5-7 8.5 7v10H14v-6h-4v6H3.5V10Z"/></svg>
        </button>
        <button className="maanvi-intro-icon" data-sound-control type="button" aria-label={muted ? (te ? 'శబ్దం ఆన్ చేయండి' : 'Turn sound on') : (te ? 'శబ్దం ఆపండి' : 'Turn sound off')} aria-pressed={!muted} onClick={toggleSound}>
          {muted ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="m16 9 5 6m0-6-5 6"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="M16 9.5a4 4 0 0 1 0 5m2.5-7.5a7.5 7.5 0 0 1 0 10"/></svg>}
        </button>
        <button className="maanvi-intro-icon" type="button" aria-label={paused ? (te ? 'కదలిక మొదలు పెట్టండి' : 'Play intro') : (te ? 'కదలిక ఆపండి' : 'Pause intro')} aria-pressed={paused} onClick={togglePlayback}>
          {paused ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="m8 5 11 7-11 7V5Z"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14m8-14v14"/></svg>}
        </button>
      </div>}
    </div>, document.body);
}
