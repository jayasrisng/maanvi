import { useEffect, useState } from 'react';

export default function LoomOpening() {
  const [open,setOpen] = useState(()=>{
    try { return !sessionStorage.getItem('maanvi.woven') && !matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  });
  useEffect(()=>{
    if(!open) return;
    try { sessionStorage.setItem('maanvi.woven','true'); } catch { /* No storage required. */ }
    const timer=setTimeout(()=>setOpen(false),2600);
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};
    addEventListener('keydown',escape);
    return ()=>{clearTimeout(timer);removeEventListener('keydown',escape);};
  },[open]);
  if(!open) return null;
  return <div className="loom-opening"><div className="loom-warp" aria-hidden="true">{Array.from({length:32},(_,index)=><i key={index} style={{'--thread':index} as React.CSSProperties}/>)}</div><div className="loom-weft" aria-hidden="true"/><div className="loom-shuttle" aria-hidden="true"/><div className="loom-title"><span lang="te">మాన్వి</span><p>A story, woven together.</p></div><button type="button" onClick={()=>setOpen(false)}>Enter Maanvi</button></div>;
}

export function MotionControl() {
  const [paused,setPaused]=useState(()=>{try{return localStorage.getItem('maanvi.motion')==='paused';}catch{return false;}});
  useEffect(()=>{
    document.documentElement.dataset.motion=paused?'paused':'playing';
    try {localStorage.setItem('maanvi.motion',paused?'paused':'playing');}catch{/* Optional preference. */}
    dispatchEvent(new Event('maanvi:motion'));
  },[paused]);
  return <button type="button" className="motion-control" aria-pressed={paused} onClick={()=>setPaused(!paused)} aria-label={paused?'Resume ambient motion':'Pause ambient motion'}><span aria-hidden="true">{paused?'▷':'Ⅱ'}</span><span>{paused?'Motion paused':'Pause motion'}</span></button>;
}
