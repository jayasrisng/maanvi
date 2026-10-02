import { useEffect, useRef, type RefObject } from 'react';

export default function TextileFlowScene({ progress, still }: { progress: RefObject<number>; still: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = mount.current!;
    if (still) return;
    let disposed = false;
    let cleanup = () => {};
    void import('three').then(T => {
      if (disposed) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' }); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      host.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.OrthographicCamera(-1, 1, 1, -1, 0, 2);
      camera.position.z = 1;
      let ready = 0, frame = 0, visible = true;
      const loaded = () => { ready++; schedule(); };
      const loader = new T.TextureLoader();
      const cotton = loader.load('/images/concepts/cotton-loom.webp', loaded);
      const silk = loader.load('/images/concepts/silk-cocoons.webp', loaded);
      const geometry = new T.PlaneGeometry(2, 2);
      const material = new T.ShaderMaterial({
        transparent: true,
        uniforms: { cotton: { value: cotton }, silk: { value: silk }, progress: { value: 0 }, aspect: { value: 1.5 }, mobile: { value: 0 }, pointer: { value: new T.Vector2() }, cursor: { value: new T.Vector2(.5,.5) }, hover: { value: 0 }, time: { value: 0 } },
        vertexShader: 'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
        fragmentShader: `precision highp float;
          uniform sampler2D cotton,silk;uniform float progress,aspect,mobile,hover,time;uniform vec2 pointer,cursor;varying vec2 vUv;
          vec2 cover(vec2 uv){float r=aspect/1.5;if(r<1.)uv.x=(uv.x-.5)*r+mix(.5,.73,mobile);else uv.y=(uv.y-.5)/r+.5;return uv;}
          void main(){
            float p=progress;vec2 base=cover(vUv);
            float approach=smoothstep(.07,.49,p);
            vec2 c=(base-.5)/(1.+approach*.23)+vec2(.5,.5-approach*.08);
            float cottonClose=smoothstep(.13,.30,p);
            c=mix(c,(base-.5)/4.4+vec2(.77,.12),cottonClose);
            float weave=1.-smoothstep(.20,.51,c.y);
            c.x+=sin(c.y*11.+p*9.)*.006*weave*approach;
            c.y+=sin(c.x*7.-p*8.)*.008*weave*approach;
            float cloud=smoothstep(.48,.72,c.y)*smoothstep(.35,.7,c.x);
            c+=cloud*vec2(sin(p*7.)*.014,sin(p*5.)*.008);
            float proximity=exp(-dot(vUv-cursor,vUv-cursor)*16.)*hover;
            c+=pointer*.008*(.4+cloud*.6);
            c.y+=sin(c.x*16.+time*.8)*.002*proximity;
            vec3 a=texture2D(cotton,clamp(c,.001,.999)).rgb;
            float silkPan=smoothstep(.51,1.,p);
            float strands=smoothstep(.66,.79,p);
            float saree=smoothstep(.77,.90,p);
            float silkZoom=1.04+strands*.65+saree*.4;
            vec2 silkFocus=mix(vec2(mix(.5,.73,mobile),mix(.5,.40,mobile)),vec2(.74,.52),strands);
            silkFocus=mix(silkFocus,vec2(.68,.28),saree);
            vec2 silkBase=cover(vUv);
            silkBase.x-=mix(.5,.73,mobile);
            silkBase.y-=.5;
            vec2 s=silkBase/silkZoom+silkFocus;
            float drape=1.-smoothstep(.30,.68,s.y);
            s.y+=sin(s.x*10.-silkPan*7.)*.016*silkPan*drape;
            s.x+=sin(s.y*12.+silkPan*5.)*.008*silkPan*drape;
            s+=pointer*.006;
            s.y+=sin(s.x*24.+s.y*8.-time*1.3)*.004*proximity*drape;
            s.x+=sin(s.y*20.+time*.9)*.002*proximity;
            vec3 b=texture2D(silk,clamp(s,.001,.999)).rgb;
            b+=vec3(.12,.065,.015)*pow(max(0.,sin(s.x*8.+s.y*5.-silkPan*5.)),12.)*drape*silkPan;
            float dissolve=smoothstep(.50,.64,p);
            vec3 color=mix(a,b,dissolve);
            float cottonBounds=smoothstep(0.,.015,c.y)*(1.-smoothstep(.985,1.,c.y));
            float silkBounds=smoothstep(0.,.02,s.y)*(1.-smoothstep(.98,1.,s.y));
            float alpha=mix(mix(1.,cottonBounds,mobile),mix(1.,silkBounds,mobile),dissolve);
            gl_FragColor=vec4(color,alpha);
          }`
      });
      scene.add(new T.Mesh(geometry, material));
      const pointerTarget = new T.Vector2();
      const cursorTarget = new T.Vector2(.5,.5);
      let hoverTarget = 0;
      const surface = host.parentElement!;
      const point = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
        const box = host.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width));
        const y = 1 - Math.max(0, Math.min(1, (event.clientY - box.top) / box.height));
        pointerTarget.set((x-.5)*2,(y-.5)*2);
        cursorTarget.set(x,y); hoverTarget = 1; schedule();
      };
      const leave = () => { pointerTarget.set(0,0); hoverTarget = 0; schedule(); };
      surface.addEventListener('pointermove', point, { passive: true });
      surface.addEventListener('pointerleave', leave);
      function draw(now: number) {
        frame = 0;
        if (disposed || ready < 2 || !visible || document.hidden) return;
        material.uniforms.progress.value = progress.current;
        material.uniforms.pointer.value.lerp(pointerTarget,.065);
        material.uniforms.cursor.value.lerp(cursorTarget,.065);
        material.uniforms.hover.value += (hoverTarget-material.uniforms.hover.value)*.065;
        material.uniforms.time.value = now*.001;
        renderer.render(scene, camera);
        host.dataset.ready = 'true';
        if (hoverTarget || material.uniforms.hover.value > .002 || material.uniforms.pointer.value.distanceTo(pointerTarget) > .002) schedule();
      }
      function schedule() { if (!disposed && !frame) frame = requestAnimationFrame(draw); }
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        material.uniforms.aspect.value = width / height;
        material.uniforms.mobile.value = innerWidth <= 760 ? 1 : 0;
        schedule();
      };
      const size = new ResizeObserver(resize); size.observe(host);
      const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }); visibility.observe(host);
      const lost = (event: Event) => { event.preventDefault(); delete host.dataset.ready; };
      renderer.domElement.addEventListener('webglcontextlost', lost);
      renderer.domElement.addEventListener('webglcontextrestored', schedule);
      addEventListener('maanvi:flow', schedule); document.addEventListener('visibilitychange', schedule); resize();
      cleanup = () => {
        cancelAnimationFrame(frame); size.disconnect(); visibility.disconnect();
        surface.removeEventListener('pointermove', point); surface.removeEventListener('pointerleave', leave);
        removeEventListener('maanvi:flow', schedule); document.removeEventListener('visibilitychange', schedule);
        renderer.domElement.removeEventListener('webglcontextlost', lost); renderer.domElement.removeEventListener('webglcontextrestored', schedule);
        cotton.dispose(); silk.dispose(); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); delete host.dataset.ready;
      };
    }).catch(() => { /* The photograph remains visible when WebGL is unavailable. */ });
    return () => { disposed = true; cleanup(); };
  }, [progress, still]);
  return <div className="flow-scene" ref={mount} aria-hidden="true"><img className="flow-photo-cotton" src="/images/concepts/cotton-loom.webp" alt="" fetchPriority="high"/><img className="flow-photo-silk" src="/images/concepts/silk-cocoons.webp" alt=""/><img className="flow-photo-campaign" src="/images/hero/maanvi-salt-flats-original.jpg" alt="" loading="lazy"/></div>;
}
