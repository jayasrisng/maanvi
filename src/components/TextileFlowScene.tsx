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
        uniforms: { cotton: { value: cotton }, silk: { value: silk }, progress: { value: 0 }, aspect: { value: 1.5 }, mobile: { value: 0 } },
        vertexShader: 'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
        fragmentShader: `precision highp float;
          uniform sampler2D cotton,silk;uniform float progress,aspect,mobile;varying vec2 vUv;
          vec2 cover(vec2 uv){float r=aspect/1.5;if(r<1.)uv.x=(uv.x-.5)*r+mix(.5,1.-r*.5,mobile);else uv.y=(uv.y-.5)/r+.5;return uv;}
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
            vec3 a=texture2D(cotton,clamp(c,.001,.999)).rgb;
            float silkPan=smoothstep(.51,1.,p);
            float strands=smoothstep(.61,.78,p);
            float saree=smoothstep(.79,.98,p);
            float silkZoom=1.04+strands*.65+saree*.4;
            vec2 silkFocus=mix(vec2(.5,.5),vec2(.67,.52),strands);
            silkFocus=mix(silkFocus,vec2(.68,.28),saree);
            vec2 s=(base-.5)/silkZoom+silkFocus;
            float drape=1.-smoothstep(.30,.68,s.y);
            s.y+=sin(s.x*10.-silkPan*7.)*.016*silkPan*drape;
            s.x+=sin(s.y*12.+silkPan*5.)*.008*silkPan*drape;
            vec3 b=texture2D(silk,clamp(s,.001,.999)).rgb;
            float dark=1.-smoothstep(.12,.5,dot(b,vec3(.21,.72,.07)));
            b=mix(b,vec3(.57,.20,.045),dark*.82);
            b+=vec3(.12,.065,.015)*pow(max(0.,sin(s.x*8.+s.y*5.-silkPan*5.)),12.)*drape*silkPan;
            float dissolve=smoothstep(.48,.66,p);
            vec3 color=mix(a,b,dissolve);
            // Flecks catch the light only while scrolling through the material change.
            float shimmer=smoothstep(.27,.38,p)*(1.-smoothstep(.58,.7,p));
            for(int i=0;i<13;i++){
              float n=float(i);vec2 center=vec2(.39+fract(n*.618)*.57,.13+fract(n*.381)*.43);
              center.y+=sin(p*4.+n)*.025;
              vec2 d=(vUv-center)*vec2(aspect,1.);
              float pulse=pow(max(0.,sin(p*27.+n*2.4)),8.);
              float glow=exp(-dot(d,d)*52000.)+.12*exp(-dot(d,d)*1800.);
              color+=vec3(1.,.83,.55)*glow*pulse*shimmer*.42;
            }
            gl_FragColor=vec4(color,1.);
          }`
      });
      scene.add(new T.Mesh(geometry, material));
      function draw() {
        frame = 0;
        if (disposed || ready < 2 || !visible || document.hidden) return;
        material.uniforms.progress.value = progress.current;
        renderer.render(scene, camera);
        host.dataset.ready = 'true';
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
        removeEventListener('maanvi:flow', schedule); document.removeEventListener('visibilitychange', schedule);
        renderer.domElement.removeEventListener('webglcontextlost', lost); renderer.domElement.removeEventListener('webglcontextrestored', schedule);
        cotton.dispose(); silk.dispose(); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); delete host.dataset.ready;
      };
    }).catch(() => { /* The photograph remains visible when WebGL is unavailable. */ });
    return () => { disposed = true; cleanup(); };
  }, [progress, still]);
  return <div className="flow-scene" ref={mount} aria-hidden="true"><img className="flow-photo-cotton" src="/images/concepts/cotton-loom.webp" alt="" fetchPriority="high"/><img className="flow-photo-silk" src="/images/concepts/silk-cocoons.webp" alt=""/></div>;
}
