import { Link } from 'react-router-dom'

const WHATSAPP = '918637090545'
const PHONE    = '+91 86370 90545'
const EMAIL    = 'devrajghosh2525@gmail.com'

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 bg-surface-high border-t border-primary/15">
      <div className="max-w-container mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-xl font-bold text-primary mb-3">
              Tara Maa Tours <span className="text-tertiary">&amp;</span> Travels
            </p>
            <p className="text-on-surface-var text-sm leading-relaxed">
              Crafting authentic Indian journeys with the warmth of traditional hospitality and the precision of modern travel.
            </p>
            <div className="flex gap-4 mt-5">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
              <a href={`tel:${PHONE}`}
                className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
              <a href={`mailto:${EMAIL}`}
                className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[['Tours', '/tours'], ['Destinations', '/destinations'], ['About Us', '/about'], ['Contact', '/contact']].map(([label, path]) => (
                <Link key={label} to={path} className="text-on-surface-var text-sm hover:text-tertiary transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Destinations</h4>
            <div className="flex flex-col gap-2">
              {['Rajasthan', 'Kerala', 'Himachal Pradesh', 'Varanasi', 'Andaman', 'Northeast India'].map(d => (
                <Link key={d} to="/destinations" className="text-on-surface-var text-sm hover:text-tertiary transition-colors">{d}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-on-surface-var">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                WhatsApp Us
              </a>
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
                {EMAIL}
              </a>
              <p className="flex items-start gap-2 mt-1">
                <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">location_on</span>
                <span>Bhātpāra, West Bengal, India</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-on-surface-var">
          <p>© 2024 Tara Maa Tours &amp; Travels. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-tertiary transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-tertiary transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-tertiary transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
