import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type PageShellProps = {
  children: ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-maanvi-cream text-maanvi-text">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}