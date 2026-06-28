const WHATSAPP = '8637090545'
const PHONE    = '+91 8637090545'
const EMAIL    = 'devrajghosh2526@gmail.com.com'
const ADDRESS  = 'Barasat, West Bengal, India'
const HOURS    = 'Mon–Sat: 9:00 AM – 7:00 PM\nSunday: By Appointment Only'

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

      {/* 3 Contact Cards */}
      <section className="py-20 bg-surface">
        <div className="max-w-container mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%21%20I%27d%20like%20to%20enquire%20about%20a%20tour%20with%20Tara%20Maa%20Tours.`}
              target="_blank"
              rel="noreferrer"
              className="group bg-white p-8 rounded-2xl border border-outline-light hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute inset-0 linen-texture opacity-5 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#25D366]/15 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[30px] text-[#25D366]">chat</span>
                </div>
                <h3 className="font-display text-xl font-bold text-on-surface mb-2">WhatsApp Us</h3>
                <p className="text-on-surface-var text-sm mb-5">Fastest response — we reply within minutes.</p>
                <span className="bg-[#25D366] text-white px-6 py-2 rounded-xl text-sm font-bold group-hover:bg-[#1ebe5d] transition-colors">
                  Open WhatsApp →
                </span>
              </div>
            </a>

            {/* Call */}
            <a
              href={`tel:${PHONE}`}
              className="group bg-white p-8 rounded-2xl border border-outline-light hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute inset-0 linen-texture opacity-5 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[30px] text-secondary">call</span>
                </div>
                <h3 className="font-display text-xl font-bold text-on-surface mb-2">Call for Booking</h3>
                <p className="text-on-surface-var text-sm mb-5">Speak directly with our travel designers.</p>
                <span className="text-secondary font-bold text-sm group-hover:underline">
                  {PHONE} →
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}?subject=Tour%20Enquiry%20-%20Tara%20Maa%20Tours&body=Hello%2C%0A%0AI%20am%20interested%20in%20booking%20a%20tour.%20Please%20share%20more%20details.%0A%0AThank%20you!`}
              className="group bg-white p-8 rounded-2xl border border-outline-light hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute inset-0 linen-texture opacity-5 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-tertiary-light/40 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[30px] text-tertiary">mail</span>
                </div>
                <h3 className="font-display text-xl font-bold text-on-surface mb-2">Write to Us</h3>
                <p className="text-on-surface-var text-sm mb-5">For detailed itineraries and group plans.</p>
                <span className="text-tertiary font-bold text-sm group-hover:underline">
                  Send Email →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Address + Map */}
      <section className="py-20 bg-surface-mid">
        <div className="max-w-container mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-on-surface mb-4">Visit Our Office</h2>
              <p className="text-on-surface-var leading-relaxed">
                Come share a cup of chai with us as we plan your next great adventure across beautiful India.
              </p>
            </div>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-[22px] text-primary mt-0.5">location_on</span>
                <div>
                  <p className="font-bold text-sm text-on-surface">Office Address</p>
                  <p className="text-on-surface-var text-sm">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-[22px] text-primary mt-0.5">schedule</span>
                <div>
                  <p className="font-bold text-sm text-on-surface">Working Hours</p>
                  <p className="text-on-surface-var text-sm whitespace-pre-line">{HOURS}</p>
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
                <span className="material-symbols-outlined text-[22px] text-primary mt-0.5">mail</span>
                <div>
                  <p className="font-bold text-sm text-on-surface">Email</p>
                  <a href={`mailto:${EMAIL}`} className="text-primary text-sm font-semibold hover:underline">{EMAIL}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden border border-outline-light shadow-lg h-72 md:h-96 bg-surface-high flex items-center justify-center relative">
            <iframe
              title="Tara Maa Tours Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58984.28843597754!2d88.3695!3d22.8725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e1e5c53c5d5%3A0x7d5f80f1e0f09a09!2sBhatpara%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-16 bg-surface">
        <span className="material-symbols-outlined text-[48px] text-tertiary opacity-30">hub</span>
      </div>
    </div>
  )
}
