// The supplied storyboard is displayed through CSS windows, without modifying it.
export const storyboard = '/intro/maanvi-storyboard.png';
export const originalLogo = '/intro/maanvi-original-saffron.svg';
export const introChapters = [
  { x: 0, y: 0, height: 454, at: 0, title: 'The beginning', telugu: 'ఒక ఆరంభం', caption: 'Light as a cloud.' },
  { x: 312, y: 0, height: 454, at: 620, title: 'Everyday grace', telugu: 'ప్రతి రోజూ', caption: 'Beauty in the everyday.' },
  { x: 624, y: 0, height: 454, at: 1170, title: 'Her own way', telugu: 'తనదైన దారిలో', caption: 'A world of possibility.' },
  { x: 928, y: 0, height: 454, at: 1720, title: 'Rooted in tradition', telugu: 'మన సంప్రదాయం', caption: 'Carrying something timeless.' },
  { x: 1239, y: 0, height: 454, at: 2280, title: 'In celebration', telugu: 'మన వేడుక', caption: 'For moments that become memories.' },
  { x: 0, y: 521, height: 420, at: 2850, title: 'Evenings that glow', telugu: 'వెలుగుల వేళ', caption: 'A quiet kind of radiance.' },
  { x: 312, y: 521, height: 420, at: 3460, title: 'A new beginning', telugu: 'మరో ఆరంభం', caption: 'One woman. A thousand stories.' },
  { x: 624, y: 521, height: 420, at: 4500, title: 'Always Maanvi', telugu: 'మన మాన్వి', caption: 'A story in every drape.' },
];

// Separate landscape and portrait edits of the user-supplied film.
export const welcomeFilms = {
  desktop: '/intro/maanvi-welcome-desktop.mp4?v=original-intro-audio',
  mobile: '/intro/maanvi-welcome-mobile.mp4?v=original-intro-audio',
};

export function shouldOpen() {
  if (new URLSearchParams(location.search).get('intro') === '1') return true;
  try { return localStorage.getItem('maanviIntroSeen') !== 'true'; } catch { return true; }
}
