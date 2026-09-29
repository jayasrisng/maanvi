import { useEffect, useRef } from 'react';

/** Decorative, original drape geometry; Three.js and the CC0 weave map are credited in docs. */
export default function FabricScene({ variant = 'hero' }: { variant?: string }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};
    void import('three').then(THREE => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
      catch { return; } // The CSS cloth remains visible when WebGL is unavailable.
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, .1, 50);
      camera.position.set(0, 0, 12);
      scene.add(new THREE.HemisphereLight(0xfff8e6, 0x534034, 1.9));
      const key = new THREE.DirectionalLight(0xffe4bc, 2.0); key.position.set(-3, 5, 6); scene.add(key);
      const fill = new THREE.DirectionalLight(0xe2e8ff, 1.1); fill.position.set(4, -2, 4); scene.add(fill);
      const textureCanvas = document.createElement('canvas'); textureCanvas.width = 512; textureCanvas.height = 1024;
      const ctx = textureCanvas.getContext('2d')!;
      ctx.fillStyle = '#f3e1ba'; ctx.fillRect(0, 0, 512, 1024);
      ctx.fillStyle = '#a67b48'; ctx.fillRect(25, 0, 3, 1024); ctx.fillRect(484, 0, 3, 1024);
      ctx.fillStyle = '#734a3f'; ctx.fillRect(34, 0, 28, 1024); ctx.fillRect(450, 0, 28, 1024);
      ctx.strokeStyle = '#ba905b'; ctx.lineWidth = 1.5;
      for (let y = 30; y < 1024; y += 65) for (let x = 100; x < 440; x += 85) {
        ctx.beginPath(); ctx.ellipse(x + ((y / 65 | 0) % 2) * 12, y, 7, 13, -.35, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y + 12); ctx.lineTo(x - 6, y + 22); ctx.stroke();
      }
      for (let y = 916; y < 976; y += 9) { ctx.fillStyle = y % 2 ? '#a67b48' : '#734a3f'; ctx.fillRect(0, y, 512, 3); }
      const pattern = new THREE.CanvasTexture(textureCanvas); pattern.colorSpace = THREE.SRGBColorSpace;
      const normal = new THREE.TextureLoader().load('/textures/woven-normal.jpg'); normal.wrapS = normal.wrapT = THREE.RepeatWrapping; normal.repeat.set(3, 6);
      const colors = variant === 'hero' ? [0xffffff, 0xb97077, 0x526c64] : ({ block: [0xd8ac82], pattu: [0xc5a464], kalamkari: [0xc9d1b2], warli: [0x879db0] }[variant] || [0xffffff]);
      const cloths = colors.map((color, index) => {
        const geometry = new THREE.PlaneGeometry(3.2, 7.8, 50, 90);
        const material = new THREE.MeshPhysicalMaterial({ color, map: pattern, normalMap: normal, normalScale: new THREE.Vector2(.18, .18), roughness: .72, metalness: .05, sheen: 1, sheenColor: new THREE.Color(0xffecd1), sheenRoughness: .6, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z = variant === 'hero' ? [-.38, .25, -.6][index] : -.18;
        mesh.position.set(variant === 'hero' ? [0, 2.7, -2.1][index] : 0, variant === 'hero' ? [.2, -.5, -1.9][index] : 0, -index * .65);
        scene.add(mesh); return { mesh, geometry, material, base: Float32Array.from(geometry.attributes.position.array), index };
      });
      let frame = 0, elapsed = 0, last = 0, visible = false, pointer = 0;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)');
      const isPaused = () => reduced.matches || document.documentElement.dataset.motion === 'paused';
      const draw = (now: number) => {
        frame = 0;
        if (disposed) return;
        if (!isPaused()) elapsed += Math.min((now - (last || now)) / 1000, .04);
        last = now;
        const rect = container.getBoundingClientRect();
        const scroll = isPaused() ? 0 : Math.max(-1, Math.min(1, -rect.top / innerHeight));
        cloths.forEach(({ mesh, geometry, base, index }) => {
          const pos = geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const x = base[i * 3], y = base[i * 3 + 1], fall = (3.9 - y) / 7.8;
            const wave = elapsed * .6 + index * 1.7;
            pos.setXYZ(i, x + Math.sin(y * .8 + wave) * .27 * fall, y + Math.sin(x * 1.4 + wave) * .14 * fall,
              Math.sin(x * 3.5 + y * .65 + wave) * (.18 + fall * .28) + Math.sin(y * .9 - wave) * .35 * fall);
          }
          pos.needsUpdate = true; geometry.computeVertexNormals();
          mesh.rotation.y = Math.sin(elapsed * .23 + index) * .15 + pointer * .12;
          mesh.rotation.x = scroll * .12;
        });
        renderer.render(scene, camera); container.dataset.ready = 'true';
        if (visible && !document.hidden && !isPaused()) frame = requestAnimationFrame(draw);
      };
      const start = () => { cancelAnimationFrame(frame); last = 0; if (visible && !document.hidden) frame = requestAnimationFrame(draw); };
      const resize = () => { const { width, height } = container.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / height; camera.position.z = width < 500 ? 15 : 12; camera.updateProjectionMatrix(); start(); };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }, { rootMargin: '80px' }); observer.observe(container);
      const sizing = new ResizeObserver(resize); sizing.observe(container);
      const move = (event: PointerEvent) => { if (!isPaused()) pointer = (event.clientX / innerWidth - .5) * 2; };
      const lost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); delete container.dataset.ready; };
      renderer.domElement.addEventListener('webglcontextlost', lost);
      renderer.domElement.addEventListener('webglcontextrestored', start);
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('maanvi:motion', start); document.addEventListener('visibilitychange', start); reduced.addEventListener('change', start);
      resize();
      cleanup = () => { cancelAnimationFrame(frame); observer.disconnect(); sizing.disconnect(); window.removeEventListener('pointermove', move); window.removeEventListener('maanvi:motion', start); document.removeEventListener('visibilitychange', start); reduced.removeEventListener('change', start); renderer.domElement.removeEventListener('webglcontextlost', lost); renderer.domElement.removeEventListener('webglcontextrestored', start); cloths.forEach(({geometry,material}) => { geometry.dispose(); material.dispose(); }); pattern.dispose(); normal.dispose(); renderer.dispose(); renderer.domElement.remove(); delete container.dataset.ready; };
    }).catch(() => { /* Static fabric fallback stays visible. */ });
    return () => { disposed = true; cleanup(); };
  }, [variant]);
  return <div className={`fabric-scene fabric-scene-${variant}`} ref={host} aria-hidden="true"><div className="fabric-fallback"><span /><span /><span /></div></div>;
}
