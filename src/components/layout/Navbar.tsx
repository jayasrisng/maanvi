import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'home', to: '/' },
  { label: 'our story', to: '/our-story' },
  { label: 'collections', to: '/collections' },
  { label: 'visit', to: '/visit' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (menuOpen) {
        setVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      if (currentScrollY <= 20) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/20 bg-maanvi-orange/95 text-white backdrop-blur transition-transform duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="text-center px-4 pt-5 pb-3 md:pt-6 md:pb-4">
        <img
          src="/logo/maanvi-logo.png"
          alt="Maanvi"
          className="mx-auto h-16 w-16 object-contain md:h-20 md:w-20"
        />

        <p className="mt-3 font-teluguSerif text-lg tracking-wide text-white/95 md:text-xl">
          మన మాన్వి మన వేడుక
        </p>
      </div>

      <div className="border-t border-white/20">
        <nav className="hidden justify-center gap-12 py-4 text-sm text-white/90 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `tracking-[0.08em] transition ${
                  isActive ? 'text-white' : 'hover:text-white/70'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex justify-center py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-2xl leading-none text-white/95"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col items-center gap-5 px-4 pb-6 pt-2 text-white/90 md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base transition ${
                    isActive ? 'text-white' : 'hover:text-white/70'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}