import { Link } from 'react-router-dom'
import { useTours } from '../hooks/useTours'
import TourCard from '../components/TourCard'

const WHATSAPP = '918637090545'

const DESTINATIONS = [
  { name: 'Rajasthan',        icon: 'fort',            desc: 'Land of Maharajas' },
  { name: 'Kerala',           icon: 'sailing',          desc: "God's Own Country" },
  { name: 'Himachal Pradesh', icon: 'landscape',        desc: 'Valley of Gods' },
  { name: 'Goa',              icon: 'beach_access',     desc: 'Pearl of the Orient' },
  { name: 'Northeast India',  icon: 'forest',           desc: 'The Hidden Frontier' },
  { name: 'Ladakh',           icon: 'snowing',          desc: 'Land of High Passes' },
  { name: 'Varanasi',         icon: 'temple_buddhist',  desc: 'The Eternal City' },
  { name: 'Andaman',          icon: 'tsunami',          desc: 'Island of Dreams' },
]

const WHY_US = [
  { icon: 'workspace_premium', title: '10+ Years Experience',  desc: 'A decade of crafting unforgettable Indian journeys for thousands of happy travellers.' },
  { icon: 'tune',              title: 'Fully Customizable',    desc: 'Every tour can be tailored to your budget, pace, and personal interests.' },
  { icon: 'support_agent',     title: '24/7 Travel Support',   desc: 'Our team is always available — before, during, and after your journey.' },
  { icon: 'currency_rupee',    title: 'Best Price Guarantee',  desc: 'Transparent pricing with no hidden charges. Value for every rupee spent.' },
]

export default function Home() {
  const { tours: featured } = useTours({ featured: true })

  return (
    <div className="bg-surface">

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&auto=format&fit=crop')" }}
/>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 linen-texture opacity-5 pointer-events-none" />

        <div className="relative z-10 max-w-container mx-auto px-5 md:px-16 py-20">
          <span className="inline-block text-tertiary-light text-xs font-bold uppercase tracking-[0.25em] mb-4">
            ✦ Tara Maa Tours & Travels ✦
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 max-w-3xl">
            Discover the<br />
            <span className="text-tertiary-light">Soul of India</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Curated journeys across every corner of Bharat — from snow-capped Himalayas to sun-kissed Kerala shores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/tours"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-primary-light transition-all active:scale-95 text-center"
            >
              Explore All Tours
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%21%20I%27d%20like%20to%20plan%20a%20customized%20India%20tour.`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-white/15 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/25 transition-all text-center"
            >
              Plan Custom Trip
            </a>
          </div>

          <div className="flex flex-wrap gap-8 mt-16">
            {[['500+', 'Happy Travellers'], ['50+', 'Tour Packages'], ['10+', 'Years Experience'], ['25+', 'Destinations']].map(([num, label]) => (
              <div key={label} className="text-white">
                <p className="font-display text-3xl font-bold text-tertiary-light">{num}</p>
                <p className="text-white/70 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS STRIP */}
      <section className="py-14 bg-surface-mid overflow-hidden">
        <div className="max-w-container mx-auto px-5 md:px-16">
          <p className="text-center text-xs font-bold text-primary uppercase tracking-[0.25em] mb-6">Where We Take You</p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {DESTINATIONS.map(d => (
              <Link
                key={d.name}
                to="/destinations"
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-white rounded-2xl px-6 py-5 border border-outline-light hover:border-primary hover:shadow-md transition-all group min-w-[120px]"
              >
                <span className="material-symbols-outlined text-[28px] text-primary group-hover:scale-110 transition-transform">
                  {d.icon}
                </span>
                <span className="text-xs font-bold text-on-surface text-center leading-tight">{d.name}</span>
                <span className="text-[10px] text-on-surface-var text-center">{d.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="py-20 bg-surface">
        <div className="max-w-container mx-auto px-5 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-2">Handpicked For You</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">Featured Tour Packages</h2>
            </div>
            <Link to="/tours" className="text-sm font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1">
              View All Packages
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.slice(0, 3).map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-surface-low">
        <div className="max-w-container mx-auto px-5 md:px-16">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-2">Why Travel With Us</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">The Tara Maa Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-outline-light hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-[24px] text-primary group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="text-sm text-on-surface-var leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL REVIEWS */}
      <section className="py-20 bg-surface">
        <div className="max-w-container mx-auto px-5 md:px-16 text-center">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-2">Real Experiences</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Loved Your Journey With Us?
          </h2>
          <p className="text-on-surface-var text-lg max-w-xl mx-auto mb-10">
            Your honest review helps other travellers discover the real India with us. Takes just 1 minute!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">star</span>
              Leave a Google Review
            </a>
            <a
              href="https://www.facebook.com/share/1LhYE11Jch/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#1877F2] text-[#1877F2] px-8 py-4 rounded-xl font-bold hover:bg-[#1877F2] hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">thumb_up</span>
              Follow on Facebook
            </a>
          </div>
          <p className="text-xs text-on-surface-var mt-4">Share your honest experience with fellow travellers</p>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 linen-texture opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-container mx-auto px-5 md:px-16 text-center">
          <span className="material-symbols-outlined text-[40px] text-tertiary-light mb-4 block">travel_explore</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Explore India?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Talk to our travel experts and plan your perfect customized tour. No obligation, just inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%21%20I%20want%20to%20plan%20an%20India%20tour.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1ebe5d] transition-all"
            >
              <span className="material-symbols-outlined">chat</span>
              Chat on WhatsApp
            </a>
            <Link
              to="/tours"
              className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/25 transition-all"
            >
              <span className="material-symbols-outlined">explore</span>
              Browse All Tours
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
