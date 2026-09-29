import { useId } from 'react';

export default function BrandLogo() {
  const id = useId().replace(/:/g, '');
  return <svg className="maanvi-logo" viewBox="0 0 2000 1414" role="img" aria-label="మాన్వి · Maanvi">
    <defs>
      <filter id={`${id}-ink`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 2 0 -1" /></filter>
      <mask id={`${id}-cutout`} maskUnits="userSpaceOnUse" x="0" y="0" width="2000" height="1414" style={{ maskType: 'alpha' }}><image href="/logo/maanvi-logo.png" width="2000" height="1414" filter={`url(#${id}-ink)`} /></mask>
    </defs>
    {/* Mask the untouched source artwork; never redraw the logo. */}
    <rect width="2000" height="1414" fill="currentColor" mask={`url(#${id}-cutout)`} />
  </svg>;
}
