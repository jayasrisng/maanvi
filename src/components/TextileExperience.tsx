import { useEffect, useRef, useState } from "react";

export type Craft = "block" | "pattu" | "kalamkari" | "warli";

/** Original vector interpretations of textile motifs; decorative, not product imagery. */
export function TextileMotif({ kind, className = "" }: { kind: Craft; className?: string }) {
  return <svg className={`textile-motif ${className}`} viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {kind === "block" && <g stroke="currentColor" strokeWidth="2">
      {Array.from({ length: 12 }, (_, i) => <g key={i} transform={`translate(${70 + (i % 3) * 130} ${65 + Math.floor(i / 3) * 115}) rotate(${i % 2 ? -4 : 3})`}>
        <path d="M0 38V-13M0 18C-32 23-38 0-32-12C-12-10-4 0 0 18ZM0 8C30 12 38-10 30-21C12-17 6-7 0 8Z" />
        <path d="M0-14C-29-12-31-32-17-40C-17-58 3-60 9-44C30-43 31-19 10-14Z" fill="currentColor" opacity=".8" />
        <path d="M-13 41Q0 32 13 41M-32 48H32"/><circle cx="-45" cy="-42" r="2" fill="currentColor"/>
      </g>)}
    </g>}
    {kind === "pattu" && <g stroke="currentColor">
      <path d="M25 0V480M42 0V480M358 0V480M375 0V480" strokeWidth="3"/>
      {Array.from({length:8},(_,i)=><g key={i} transform={`translate(0 ${i*64})`}><path d="M25 0L42 16L25 32L42 48M375 0L358 16L375 32L358 48" strokeWidth="2"/></g>)}
      {Array.from({length:12},(_,i)=><g key={i} transform={`translate(${102+(i%3)*98} ${58+Math.floor(i/3)*112})`}><path d="M0-34C38-6 39 27 0 35C-39 27-38-6 0-34Z" strokeWidth="2"/><path d="M0-22C24-2 25 18 0 24C-25 18-24-2 0-22Z" fill="currentColor" opacity=".55"/><path d="M-7 38L0 45L7 38"/><circle cy="3" r="6"/></g>)}
      <path d="M42 455H358M42 465H358" strokeWidth="3"/>
    </g>}
    {kind === "kalamkari" && <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M200 480C140 390 248 348 198 260C141 177 242 139 201 29M199 380C91 356 91 277 59 220M198 291C282 290 316 208 338 155M189 189C96 170 113 82 70 43M209 115C283 95 291 49 309 11" strokeWidth="5"/>
      {[ [96,313,-40],[295,242,35],[130,144,-45],[260,74,35],[216,416,45] ].map(([x,y,r],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0 0C-66-8-78-55-50-74C-18-68 1-35 0 0Z" fill="currentColor" opacity=".2"/><path d="M0 0C-66-8-78-55-50-74C-18-68 1-35 0 0ZM0 0L-50-65M-18-24L-46-28M-27-38L-54-43M-17-23L-13-48"/></g>)}
      {[[61,211],[337,143],[70,35],[204,32],[103,397]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}>
        {Array.from({length:8},(_,j)=><ellipse key={j} cy="-20" rx="9" ry="22" transform={`rotate(${j*45})`} fill="currentColor" fillOpacity=".13"/>)}<circle r="12" fill="currentColor"/><circle r="5" fill="#fff0d6"/>
      </g>)}
      <path d="M271 420C320 365 367 388 348 420C329 450 283 450 271 420ZM278 417C300 399 309 417 295 430M347 410L374 400L353 426" fill="currentColor" fillOpacity=".25"/>
      <circle cx="290" cy="418" r="3" fill="currentColor"/>
    </g>}
    {kind === "warli" && <g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="200" cy="235" r="45"/><circle cx="200" cy="235" r="37" strokeDasharray="2 8"/>
      {Array.from({length:12},(_,i)=><g key={i} transform={`translate(200 235) rotate(${i*30}) translate(0 -130)`}><circle cy="-26" r="8"/><path d="M-15-12H15L0 9ZM0 9L-16 34H16Z" fill="currentColor"/><path d="M-15-10L-29 3L-40-5M15-10L29 3L40-5M-8 34L-13 51L-25 54M8 34L13 51L25 54"/></g>)}
      <path d="M20 30H380M20 450H380"/>
      {Array.from({length:12},(_,i)=><path key={i} d={`M${20+i*30} 30l15 20 15-20M${20+i*30} 450l15-20 15 20`}/>)}
      <path d="M180 250L200 216L220 250ZM185 220L200 246L215 220Z" fill="currentColor"/>
    </g>}
  </svg>;
}

const chapters: {kind:Craft; title:string; subtitle:string; copy:string; detail:string}[] = [
  {kind:"block",title:"The poetry of repetition.",subtitle:"01 / BLOCK-PRINT INSPIRED",copy:"A flower, a rhythm, a little imperfection. Motifs that repeat like the familiar notes of a favourite song.",detail:"Petal by petal. Memory by memory."},
  {kind:"pattu",title:"A little light. A lot of celebration.",subtitle:"02 / PATTU & ZARI INSPIRED",copy:"Luminous folds, jewel-like colour and a border that catches the light. A love letter to the grandeur of a festive drape.",detail:"For moments that deserve to shine."},
  {kind:"kalamkari",title:"Let the cloth tell a story.",subtitle:"03 / KALAMKARI INSPIRED",copy:"Winding vines, flowering branches and a world of small details. Follow the lines; there is always something more to discover.",detail:"A garden, unfolding around you."},
  {kind:"warli",title:"Life, drawn together.",subtitle:"04 / WARLI INSPIRED",copy:"A circle of people. A shared rhythm. A celebration made beautiful by everyone who becomes part of it.",detail:"Just like our Maanvi family."},
];

export function TextileJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const panels = root.current?.querySelectorAll<HTMLElement>(".craft-chapter");
    if (!panels) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter));
    }), { rootMargin:"-35% 0px -35% 0px", threshold:0 });
    panels.forEach(panel => observer.observe(panel));
    return () => observer.disconnect();
  }, []);
  return <section className="textile-journey" ref={root} id="woven-world">
    <div className="journey-intro"><p className="eyebrow">THE DETAILS WE FALL IN LOVE WITH</p><h2>A world of art.<br /><em>In the folds of a saree.</em></h2><p>A scroll through the patterns that inspire this little house.</p></div>
    <div className="journey-layout"><div className={`craft-stage craft-${chapters[active].kind}`}>
      <div className="craft-stage-border" />
      {chapters.map((chapter,index)=><div key={chapter.kind} className={`craft-art ${active===index ? "active" : ""}`}><TextileMotif kind={chapter.kind}/></div>)}
      <span className="craft-stage-label">{chapters[active].subtitle}</span><div className="craft-dots" aria-label="Jump to a design inspiration">{chapters.map((chapter,index)=><a key={chapter.kind} href={`#craft-${chapter.kind}`} aria-label={chapter.subtitle} aria-current={active===index ? "step" : undefined}>{String(index+1).padStart(2,"0")}</a>)}</div>
    </div><div className="craft-chapters">{chapters.map((chapter,index)=><article className={`craft-chapter chapter-${chapter.kind}`} id={`craft-${chapter.kind}`} data-chapter={index} key={chapter.kind}><div className={`mobile-craft craft-${chapter.kind}`}><TextileMotif kind={chapter.kind}/></div><p className="eyebrow">{chapter.subtitle}</p><h3>{chapter.title}</h3><p>{chapter.copy}</p><span className="craft-detail">{chapter.detail}</span></article>)}</div></div>
  </section>;
}

export function SareeOpening() {
  const [open, setOpen] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => { if (!open) return; const timer = window.setTimeout(() => setOpen(false), 2900); const close = (event:KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown",close); return () => { clearTimeout(timer); window.removeEventListener("keydown",close); }; },[open]);
  if (!open) return null;
  return <div className="saree-opening"><div className="opening-folds" aria-hidden="true">{Array.from({length:5},(_,index)=><div key={index} className="opening-fold" style={{"--fold":index} as React.CSSProperties}><TextileMotif kind={index%2 ? "pattu" : "block"}/><div className="opening-hem"/></div>)}</div><div className="opening-brand"><img src="/logo/maanvi-logo.png" alt="Maanvi"/><p>EVERY FOLD, A CELEBRATION.</p></div><button type="button" className="skip-opening" onClick={()=>setOpen(false)}>Skip introduction ↗</button></div>;
}
