#!/bin/sh
set -eu
ffmpeg -hide_banner -loglevel error \
 -i public/intro/maanvi-forward-walk.mp4 \
 -i public/intro/maanvi-runway-draft.mp4 \
 -loop 1 -framerate 30 -i public/intro/maanvi-endcard.png \
 -filter_complex "[0:v]trim=duration=2,setpts=1.5*(PTS-STARTPTS),crop=300:480:280:0,scale=450:720,pad=1280:720:(ow-iw)/2:0:color=0xFFF8ED,setsar=1,fps=30,format=yuv420p[a];[1:v]trim=start=0.6:end=3.8,setpts=1.25*(PTS-STARTPTS),scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0xFFF8ED,setsar=1,fps=30,format=yuv420p[b];[2:v]scale=2560:1440,zoompan=z='1+0.013*sin(PI*min(max((on-12)/24,0),1))':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1280x720:fps=30,trim=duration=3.6,setpts=PTS-STARTPTS,setsar=1,format=yuv420p[c];[a][b]xfade=transition=fade:duration=0.3:offset=2.7[ab];[ab][c]xfade=transition=fade:duration=0.3:offset=6.4,trim=duration=10[out]" \
 -map '[out]' -an -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -movflags +faststart -t 10 -y public/intro/maanvi-opening-10s.mp4
