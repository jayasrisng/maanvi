// Play the complete original supplied film from the cinematic-intro commit, without re-editing it.
export const welcomeFilm = '/intro/maanvi-supplied-source.mp4?v=complete-original';

// Every ordinary homepage entry plays the original runway-to-seated-logo film.
// Explicit skips and deep links let visitors enter the existing site directly.
export function shouldOpen() {
  const preference = new URLSearchParams(location.search).get('intro');
  if (preference === '1') return true;
  if (preference === '0') return false;
  return !location.hash;
}
