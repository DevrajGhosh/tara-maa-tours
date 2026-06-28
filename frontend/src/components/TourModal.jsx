import { useEffect } from 'react'

const WHATSAPP  = '918637090545'
const PHONE     = '+91 8637090545'
const FACEBOOK  = 'https://www.facebook.com/share/1LhYE11Jch/'

export default function TourModal({ tour, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const waMsg = encodeURIComponent(`Hi! I'm interested in the "${tour.name}" tour package. Please share more details.`)

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white w-full md:max-w-3xl md:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">

        {/* Header image */}
        <div className="relative h-52 shrink-0">
          <img src={tour.image || tour.image_url} alt={tour.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <span className="text-xs font-semibold text-tertiary-light uppercase tracking-widest">{tour.region}</span>
            <h2 className="font-display text-2xl text-white font-bold leading-tight">{tour.name}</h2>
            <div className="flex flex-wrap gap-4 mt-1 text-white/80 text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>{tour.duration}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">currency_rupee</span>
                Starting ₹{(tour.price || tour.price).toLocaleString('en-IN')} per person
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-6">

          {/* Price disclaimer */}
          <div className="bg-tertiary-light/40 border border-tertiary/30 rounded-xl px-4 py-3 flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5">info</span>
            <p className="text-xs text-on-surface leading-relaxed">
              <span className="font-bold">Price Note:</span> ₹{(tour.price).toLocaleString('en-IN')} is the starting price per person. 
              Final price depends on group size, season, hotel category, and customizations. 
              <a href={`https://wa.me/${WHATSAPP}?text=${waMsg}`} target="_blank" rel="noreferrer" className="text-primary font-bold ml-1">Contact us for exact quote →</a>
            </p>
          </div>

          {/* Short description */}
          <p className="text-on-surface-var text-sm leading-relaxed">{tour.shortDescription || tour.short_description}</p>

          {/* Highlights */}
          <div>
            <h3 className="font-display text-lg font-bold text-on-surface mb-3">Tour Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(tour.highlights || []).map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-on-surface-var">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="font-display text-lg font-bold text-on-surface mb-3">Day-by-Day Itinerary</h3>
            <div className="space-y-3">
              {(tour.itinerary || []).map((day, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {day.day}
                    </div>
                    {i < (tour.itinerary.length - 1) && (
                      <div className="w-0.5 flex-1 bg-primary/20 mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-sm text-on-surface">{day.title}</p>
                    <p className="text-xs text-on-surface-var leading-relaxed mt-0.5">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-low p-4 rounded-xl">
              <h4 className="font-bold text-sm text-secondary mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                What's Included
              </h4>
              <ul className="space-y-1">
                {(tour.inclusions || []).map((item, i) => (
                  <li key={i} className="text-xs text-on-surface-var flex items-start gap-1.5">
                    <span className="text-secondary mt-0.5">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-low p-4 rounded-xl">
              <h4 className="font-bold text-sm text-primary mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">cancel</span>
                Not Included
              </h4>
              <ul className="space-y-1">
                {(tour.exclusions || []).map((item, i) => (
                  <li key={i} className="text-xs text-on-surface-var flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BOOKING BUTTONS */}
        <div className="shrink-0 p-4 border-t border-outline-light bg-surface-low">
          <p className="text-xs text-center text-on-surface-var mb-3 font-semibold uppercase tracking-widest">Book This Tour</p>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 bg-[#25D366] text-white rounded-xl py-3 hover:bg-[#1ebe5d] transition-all active:scale-95 text-center"
            >
              <span className="material-symbols-outlined text-[22px]">chat</span>
              <span className="text-xs font-bold">WhatsApp</span>
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex flex-col items-center gap-1 bg-secondary text-white rounded-xl py-3 hover:bg-secondary/90 transition-all active:scale-95 text-center"
            >
              <span className="material-symbols-outlined text-[22px]">call</span>
              <span className="text-xs font-bold">Call Us</span>
            </a>
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 bg-[#1877F2] text-white rounded-xl py-3 hover:bg-[#1464d8] transition-all active:scale-95 text-center"
            >
              <span className="material-symbols-outlined text-[22px]">thumb_up</span>
              <span className="text-xs font-bold">Facebook</span>
            </a>
          </div>
          <p className="text-[10px] text-center text-on-surface-var mt-2">
            *Starting price shown. Final price varies by group size & season.
          </p>
        </div>
      </div>
    </div>
  )
}
