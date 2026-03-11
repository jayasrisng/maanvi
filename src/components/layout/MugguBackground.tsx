type MugguBackgroundProps = {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  size?: 'sm' | 'md' | 'lg'
  opacity?: string
}

export default function MugguBackground({
  position = 'top-right',
  size = 'md',
  opacity = 'opacity-10',
}: MugguBackgroundProps) {
  const positionClass = {
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  }[position]

  const sizeClass = {
    sm: 'w-24 md:w-32',
    md: 'w-36 md:w-44',
    lg: 'w-48 md:w-60',
  }[size]

  return (
    <img
      src="/patterns/muggu.svg"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute ${positionClass} ${sizeClass} ${opacity} select-none`}
    />
  )
}