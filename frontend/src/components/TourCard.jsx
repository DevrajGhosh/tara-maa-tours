import { useState } from 'react'
import TourModal from './TourModal'

export default function TourCard({ tour }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-light group hover:shadow-xl transition-all duration-300 flex flex-col">

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Region badge */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
            {tour.region}
          </span>
          {/* Featured badge */}
          {tour.featured && (
            <span className="absolute top-3 right-3 bg-tertiary text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display text-lg font-bold text-on-surface mb-1 leading-snug">{tour.name}</h3>

          <div className="flex gap-4 text-xs text-on-surface-var mb-3">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              {tour.duration}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              {tour.region}
            </span>
          </div>

          <p className="text-sm text-on-surface-var line-clamp-2 mb-4 flex-1">{tour.shortDescription}</p>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-xs text-on-surface-var block">Starting at</span>
              <span className="text-lg font-bold text-primary font-display">₹{tour.price.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary-light transition-all active:scale-95"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {open && <TourModal tour={tour} onClose={() => setOpen(false)} />}
    </>
  )
}
