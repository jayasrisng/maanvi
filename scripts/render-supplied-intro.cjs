const {execFileSync} = require('child_process');

function render(mobile) {
  const w = mobile ? 720 : 1280;
  const h = 720;
  const name = mobile ? 'mobile' : 'desktop';
  const framing = mobile
    ? 'crop=720:720:280:0'
    : 'scale=1280:720';
  // Keep the sitting motion uninterrupted through the completed logo pose.
  const filter = `[0:v]split=2[v0][v1];[v0]trim=end=2.9,setpts=PTS-STARTPTS[vfirst];[v1]trim=start=3.5:end=6.15,setpts=PTS-STARTPTS[vlast];[vfirst][vlast]concat=n=2:v=1:a=0,${framing},scale=${w * 1.5}:${h * 1.5}:flags=lanczos,setsar=1,fps=30,format=yuv420p[out];[0:a]asplit=2[a0][a1];[a0]atrim=end=2.9,asetpts=PTS-STARTPTS,afade=t=out:st=2.87:d=0.03[afirst];[a1]atrim=start=3.5:end=6.15,asetpts=PTS-STARTPTS,afade=t=in:d=0.03[alast];[afirst][alast]concat=n=2:v=0:a=1,afade=t=out:st=5.3:d=0.25[audio]`;
  execFileSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-i', 'public/intro/maanvi-supplied-source.mp4',
    '-filter_complex', filter, '-map', '[out]', '-map', '[audio]', '-c:a', 'aac', '-b:a', '192k',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-y', `public/intro/maanvi-welcome-${name}.mp4`,
  ], {stdio: 'inherit'});
  console.log(`Rendered ${name} cinematic footage`);
}

const target = process.argv[2];
if (target !== 'mobile') render(false);
if (target !== 'desktop') render(true);
