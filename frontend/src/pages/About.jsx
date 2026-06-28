const FACEBOOK = 'https://www.facebook.com/share/1LhYE11Jch/'
const WHATSAPP = '918637090545'
const PHONE    = '+91 8637090545'

const TEAM = [
  { name: 'Sujata Devi',    role: 'Founder & Tour Director',    bio: '20+ years of curating heartfelt India experiences. Born explorer, West Bengal native.' },
  { name: 'Arjun Roy',      role: 'Head of Operations',         bio: 'Logistics genius who ensures every pickup, hotel, and permit is perfectly in place.' },
  { name: 'Priyanka Ghosh', role: 'Travel Experience Designer', bio: 'Creates the magical itineraries that make our guests say "this was better than expected."' },
]

const VALUES = [
  { icon: 'favorite',       title: 'Authenticity',        desc: 'We show you the real India — not just the tourist version. Local food, real people, untouched places.' },
  { icon: 'currency_rupee', title: 'Affordability',       desc: "Premium experience doesn't have to mean premium prices. We find the best value at every budget." },
  { icon: 'stars',          title: 'Attention to Detail', desc: 'From the right hotel to the perfect sunrise timing — every detail is crafted with care.' },
]

export default function About() {
  return (
    <div className="bg-surface min-h-screen">

      {/* Hero */}
      <section className="py-24 bg-surface-low border-b border-outline-light">
        <div className="max-w-container mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3">Our Story</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight">
              Born from a love of<br /><span className="text-primary">Incredible India</span>
            </h1>
            <p className="text-on-surface-var text-lg leading-relaxed mb-6">
              Tara Maa Tours & Travels was founded with a simple mission — to help people truly experience the beauty, diversity, and soul of India. Based in Noapara, Barasat, Kolkata, we are a family-run agency that has been designing heartfelt journeys for over a decade.
            </p>
            <p className="text-on-surface-var leading-relaxed mb-8">
              We believe travel is not just about visiting places — it's about stories you carry home. From the golden sands of Rajasthan to the misty hills of Meghalaya, we've walked every trail we recommend.
            </p>

            {/* Facebook CTA — prominent */}
            <div className="bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-2xl p-5 mb-6">
              <p className="text-sm font-bold text-on-surface mb-1">Connect with us on Facebook</p>
              <p className="text-xs text-on-surface-var mb-3">Most of our customers find us and book through our Facebook page. Follow us for tour updates, travel tips, and special offers!</p>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1464d8] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                Follow Tara Maa Tours on Facebook
              </a>
            </div>

            <div className="flex flex-wrap gap-8">
              {[['10+', 'Years in Travel'], ['500+', 'Happy Travellers'], ['25+', 'Destinations'], ['50+', 'Tour Packages']].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl font-bold text-primary">{num}</p>
                  <p className="text-sm text-on-surface-var">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop"
                alt="India Travel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-white p-5 rounded-2xl shadow-xl">
              <p className="font-display text-2xl font-bold">Tara Maa</p>
              <p className="text-xs text-white/80">The divine mother — our inspiration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-container mx-auto px-5 md:px-16">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-2">What We Stand For</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-outline-light text-center hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-[26px] text-primary group-hover:text-white transition-colors">{v.icon}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-on-surface mb-3">{v.title}</h3>
                <p className="text-sm text-on-surface-var leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-surface-low">
        <div className="max-w-container mx-auto px-5 md:px-16">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-2">The People Behind Your Journey</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-outline-light text-center hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[40px] text-primary">person</span>
                </div>
                <h3 className="font-bold text-on-surface text-lg">{member.name}</h3>
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1 mb-3">{member.role}</p>
                <p className="text-sm text-on-surface-var leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-container mx-auto px-5 md:px-16 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Travel With Us?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Reach out on Facebook, WhatsApp, or call us directly — we're always happy to help plan your perfect trip.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={FACEBOOK} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1877F2] text-white px-7 py-3 rounded-xl font-bold hover:bg-[#1464d8] transition-all">
              <span className="material-symbols-outlined">thumb_up</span>
              Facebook Page
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-3 rounded-xl font-bold hover:bg-[#1ebe5d] transition-all">
              <span className="material-symbols-outlined">chat</span>
              WhatsApp
            </a>
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white px-7 py-3 rounded-xl font-bold hover:bg-white/25 transition-all">
              <span className="material-symbols-outlined">call</span>
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
