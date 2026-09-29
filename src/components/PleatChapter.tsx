import { useEffect, useRef, type ReactNode } from 'react';

const BANDS = 48;

/** Continuous curved gathers: adjacent bands share the same projected boundary. */
export default function PleatChapter({ id, tone, label, children, paused }: { id: string; tone: string; label: string; children: ReactNode; paused: boolean }) {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const host = section.current!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const stage = host.querySelector<HTMLElement>('.pleat-stage')!;
    const panel = host.querySelector<HTMLElement>('.pleat-original')!;
    const bands = [...host.querySelectorAll<HTMLElement>('.pleat-slice')];
    let frame = 0;
    let previousCompression = -1;
    let previousHeight = -1;
    const render = () => {
      frame = 0;
      const box = host.getBoundingClientRect();
      const top = Number.parseFloat(getComputedStyle(stage).top) || 0;
      const panelHeight = panel.getBoundingClientRect().height;
      const available = box.bottom - top - 36;
      const compression = paused || reduced.matches || innerWidth < 761 ? 1 : Math.max(.18, Math.min(1, available / Math.max(1, panelHeight)));
      if (compression === previousCompression && panelHeight === previousHeight) return;
      previousCompression = compression;
      previousHeight = panelHeight;
      const fold = (1 - compression) / .82;
      const eased = fold * fold * (3 - 2 * fold);
      const wave = Math.PI * 6;
      const project = (u: number) => compression * (u
        + eased * .72 / wave * (Math.sin(wave * u + .3) - Math.sin(.3))
        + eased * .09 / (Math.PI * 10) * Math.sin(Math.PI * 10 * u));
      host.style.setProperty('--fold-cos', `${compression}`);
      host.style.setProperty('--face-opacity', fold > .002 ? '1' : '0');
      host.style.setProperty('--content-opacity', fold > .002 ? '0' : '1');
      bands.forEach((band, index) => {
        const u = index / BANDS;
        const y = project(u) * panelHeight;
        const end = project((index + 1) / BANDS) * panelHeight;
        band.style.top = `${y}px`;
        band.style.height = `${panelHeight / BANDS + 1}px`;
        band.style.transform = `scaleY(${(end - y) / (panelHeight / BANDS)})`;
        band.style.setProperty('--band-offset', `${-u * panelHeight}px`);
        // Broad reflected light and soft valleys replace hard panel edges.
        const light = 1 + eased * (.075 * Math.sin(wave * u + .3) + .11 * Math.cos(wave * u + .3));
        band.style.filter = `brightness(${light})`;
      });
      panel.inert = fold > .08;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule); reduced.addEventListener('change', schedule); render();
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced.removeEventListener('change', schedule); };
  }, [paused]);
  return <section ref={section} id={id} className={`pleat-chapter tone-${tone}`} aria-label={label}>
    <div className="pleat-stage">
      <div className="pleat-label"><span>{label}</span><span aria-hidden="true">MAANVI / మాన్వి</span></div>
      <div className="pleat-original chapter-surface">{children}</div>
      <div className="pleat-faces" aria-hidden="true" inert>{Array.from({ length: BANDS }, (_, i) => <div className="pleat-slice" key={i}><div className="chapter-surface">{children}</div></div>)}</div>
      <div className="pleat-edge" aria-hidden="true" />
    </div>
  </section>;
}
