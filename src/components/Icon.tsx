import type { SVGProps } from 'react';

type IconName = 'arrow' | 'calendar' | 'map' | 'message' | 'play' | 'instagram' | 'heart' | 'close' | 'menu' | 'previous' | 'next';
const paths: Record<IconName, string> = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  calendar: 'M7 3v4m10-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z',
  map: 'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  message: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.5-4A8.5 8.5 0 1 1 21 11.5Z',
  play: 'm9 5 10 7-10 7V5Z',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1.5-5h.01',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  close: 'm6 6 12 12M18 6 6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  previous: 'm14 6-6 6 6 6',
  next: 'm10 6 6 6-6 6',
};

export default function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg className="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}><path d={paths[name]}/></svg>;
}
