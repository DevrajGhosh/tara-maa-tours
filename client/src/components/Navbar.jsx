import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { name: 'Home',         path: '/' },
  { name: 'Tours',        path: '/tours' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'About',        path: '/about' },
  { name: 'Contact',      path: '/contact' },
]

const WHATSAPP = '8637090545' // ← CHANGE THIS to your number

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 w-full z-50 bg-surface/80 glass-nav border-b border-primary/15">
      <div className="flex justify-between items-center max-w-container mx-auto px-5 md:px-16 py-4">

        {/* Logo */}
        <Link to="/" className="font-display text-xl md:text-2xl font-bold text-primary leading-tight">
          Tara Maa Tours <span className="text-tertiary">&amp;</span> Travels
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                location.pathname === link.path
                  ? 'text-primary border-b-2 border-tertiary pb-1'
                  : 'text-on-surface-var hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Book Now */}
        <a
          href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%20want%20to%20book%20a%20tour%20with%20Tara%20Maa%20Tours%20%26%20Travels!`}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-block bg-primary text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-primary-light transition-all active:scale-95"
        >
          Book Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-primary transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-primary transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-primary transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-primary/10 px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold py-2 border-b border-outline-light ${
                location.pathname === link.path ? 'text-primary' : 'text-on-surface-var'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-white text-center px-6 py-2 rounded-xl text-sm font-semibold mt-2"
          >
            Book Now on WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
