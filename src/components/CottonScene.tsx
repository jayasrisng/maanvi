import { useEffect, useRef } from 'react';


export default function CottonMotion({ paused }: { paused: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const pause = useRef(paused);
  useEffect(() => { pause.current = paused; dispatchEvent(new Event('cotton:motion')); }, [paused]);
  useEffect(() => {
    const host = mount.current!;
    let disposed = false, clean = () => {};
    void import('three').then(T => {
      if (disposed) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' }); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      host.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.OrthographicCamera(-1,1,1,-1,0,2);camera.position.z=1;
      const texture = new T.TextureLoader().load('/images/concepts/cotton-loom.webp', () => { if (!disposed) { ready=true; start(); } });
      const material = new T.ShaderMaterial({
        uniforms: { photo:{value:texture}, time:{value:0}, aspect:{value:1.5}, mobile:{value:0}, progress:{value:0} },
        vertexShader: 'varying vec2 uvPhoto; void main(){uvPhoto=uv; gl_Position=vec4(position.xy,0.,1.);}',
        fragmentShader: `precision highp float;
          uniform sampler2D photo; uniform float time,aspect,mobile,progress; varying vec2 uvPhoto;
          float spot(vec2 p,vec2 c,vec2 r){return exp(-dot((p-c)/r,(p-c)/r));}
          void main(){
            vec2 p=uvPhoto; float ratio=aspect/1.5;
            if(ratio<1.) p.x=(p.x-.5)*ratio+mix(.5,1.-ratio*.5,mobile);
            else p.y=(p.y-.5)/ratio+.5;
            vec2 q=p;
            float cloud=smoothstep(.46,.68,p.y)*smoothstep(.35,.62,p.x);
            q.x+=cloud*(.007*sin(time*.3+p.y*3.)+.002*sin(time*.71+p.y*8.));
            q.y+=cloud*.006*sin(time*.38+p.x*3.);
            float yarn=spot(p,vec2(.748,.52),vec2(.038,.085));
            q.x+=yarn*.0015*sin(time*2.8+p.y*30.);
            float hands=spot(p,vec2(.777,.42),vec2(.024,.022));
            q.x+=hands*.0018*sin(time*3.2);q.y+=hands*.001*sin(time*3.2);
            float reed=spot(p,vec2(.737,.43),vec2(.044,.013));
            q.y+=reed*.002*sin(time*3.2);
            float emerging=spot(p,vec2(.699,.33),vec2(.042,.065));
            q.y+=emerging*.003*sin(time*1.6);
            float cloth=1.-smoothstep(.14,.32,p.y);
            q.y+=cloth*(.003*sin(time*.42+p.x*7.)+progress*.009);
            q.x+=cloth*.0015*sin(time*.3+p.y*8.);
            gl_FragColor=texture2D(photo,clamp(q,vec2(.001),vec2(.999)));
          }`
      });
      const geometry=new T.PlaneGeometry(2,2);scene.add(new T.Mesh(geometry,material));
      let frame=0,last=0,elapsed=0,ready=false,visible=true;
      const reduced=matchMedia('(prefers-reduced-motion: reduce)');
      const draw=(now:number)=>{
        frame=0;if(disposed||!ready)return;
        if(!pause.current&&!reduced.matches)elapsed+=Math.min((now-(last||now))/1000,.04);
        last=now;material.uniforms.time.value=elapsed;
        material.uniforms.progress.value=reduced.matches||pause.current?0:Math.min(scrollY/innerHeight,1);
        renderer.render(scene,camera);host.dataset.ready='true';
        if(!pause.current&&!reduced.matches&&!document.hidden&&visible)frame=requestAnimationFrame(draw);
      };
      function start(){cancelAnimationFrame(frame);last=0;if(!document.hidden&&ready&&visible)frame=requestAnimationFrame(draw);}
      const resize=()=>{const r=host.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height);material.uniforms.aspect.value=r.width/r.height;material.uniforms.mobile.value=innerWidth<=760?1:0;start();};
      const observer=new ResizeObserver(resize);observer.observe(host);
      const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;start();});visibility.observe(host);
      const lost=(e:Event)=>{e.preventDefault();cancelAnimationFrame(frame);delete host.dataset.ready;};
      renderer.domElement.addEventListener('webglcontextlost',lost);renderer.domElement.addEventListener('webglcontextrestored',start);
      document.addEventListener('visibilitychange',start);window.addEventListener('cotton:motion',start);reduced.addEventListener('change',start);resize();
      clean=()=>{cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();document.removeEventListener('visibilitychange',start);window.removeEventListener('cotton:motion',start);reduced.removeEventListener('change',start);renderer.domElement.removeEventListener('webglcontextlost',lost);renderer.domElement.removeEventListener('webglcontextrestored',start);texture.dispose();material.dispose();geometry.dispose();renderer.dispose();renderer.domElement.remove();};
    }).catch(()=>{});
    return()=>{disposed=true;clean();};
  },[]);
  return <div className="cotton-scene" ref={mount} aria-hidden="true"><img src="/images/concepts/cotton-loom.webp" alt="" fetchPriority="high"/></div>;
}
