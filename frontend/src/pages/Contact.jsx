const WHATSAPP = '919876543210'
const PHONE    = '+91 98765 43210'
const FACEBOOK = 'https://www.facebook.com/share/1LhYE11Jch/'
const ADDRESS  = 'Noapara, Barasat, Kolkata - 700125, West Bengal, India'

export default function Contact() {
  return (
    <div className="bg-surface min-h-screen">

      {/* Hero */}
      <section className="py-20 bg-surface-low border-b border-outline-light">
        <div className="max-w-container mx-auto px-5 md:px-16 text-center">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3">Get In Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Plan Your Dream Journey</h1>
          <p className="text-on-surface-var text-lg max-w-xl mx-auto">
            Our travel experts are just a message away. Reach out and let's start crafting your perfect India adventure.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-surface">
        <div className="max-w-container mx-auto px-5 md:px-16">

          {/* Facebook — Primary */}
          <div className="mb-6">
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noreferrer"
              className="group bg-[#1877F2] p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[40px] text-white">thumb_up</span>
              </div>
              <div className="text-center md:text-left">
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Most Popular — Connect on</span>
                <h3 className="font-display text-2xl font-bold text-white mb-1">Facebook</h3>
                <p className="text-white/80 text-sm">Follow our page for tour updates, travel tips, and instant booking support. Most of our customers connect with us here!</p>
              </div>
              <span className="md:ml-auto bg-white text-[#1877F2] px-6 py-3 rounded-xl font-bold shrink-0">
                Visit Our Page →
              </span>
            </a>
          </div>

          {/* WhatsApp + Call */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%21%20I%27d%20like%20to%20enquire%20about%20a%20tour%20with%20Tara%20Maa%20Tours.`}
              target="_blank"
              rel="noreferrer"
              className="group bg-white p-8 rounded-2xl border border-outline-light hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#25D366]/15 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[30px] text-[#25D366]">chat</span>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-2">WhatsApp Us</h3>
              <p className="text-on-surface-var text-sm mb-5">Fastest response — we reply within minutes.</p>
              <span className="bg-[#25D366] text-white px-6 py-2 rounded-xl text-sm font-bold">
                Open WhatsApp →
              </span>
            </a>

            <a
              href={`tel:${PHONE}`}
              className="group bg-white p-8 rounded-2xl border border-outline-light hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[30px] text-secondary">call</span>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-2">Call for Booking</h3>
              <p className="text-on-surface-var text-sm mb-5">Speak directly with our travel expert.</p>
              <span className="text-secondary font-bold text-sm">{PHONE} →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Address + Map */}
      <section className="py-20 bg-surface-mid">
        <div className="max-w-container mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Address */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-on-surface mb-4">Visit Our Office</h2>
              <p className="text-on-surface-var leading-relaxed">
                Come share a cup of chai with us as we plan your next great adventure across beautiful India.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-[22px] text-primary mt-0.5">location_on</span>
              <div>
                <p className="font-bold text-sm text-on-surface">Office Address</p>
                <p className="text-on-surface-var text-sm">{ADDRESS}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-[22px] text-primary mt-0.5">call</span>
              <div>
                <p className="font-bold text-sm text-on-surface">Phone</p>
                <a href={`tel:${PHONE}`} className="text-primary text-sm font-semibold hover:underline">{PHONE}</a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-[22px] text-[#1877F2] mt-0.5">thumb_up</span>
              <div>
                <p className="font-bold text-sm text-on-surface">Facebook</p>
                <a href={FACEBOOK} target="_blank" rel="noreferrer" className="text-[#1877F2] text-sm font-semibold hover:underline">
                  Follow us on Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-outline-light shadow-lg h-72 md:h-96">
            <iframe
              title="Tara Maa Tours Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1839.909667633416!2d88.48191260000002!3d22.7349555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8a3d72092c855%3A0xccfe49d31aff821f!2sMaa%20Tara%20Building!5e0!3m2!1sen!2sin!4v1782664996640!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </div>
  )
}