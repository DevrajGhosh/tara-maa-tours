import { useNavigate } from 'react-router-dom'
import { useTours } from '../hooks/useTours'

const REGION_INFO = {
  'Rajasthan': {
    tagline: 'Land of Maharajas',
    desc: 'Amber forts, Thar desert sunsets, blue cities, and a royal heritage that takes your breath away.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop',
    icon: 'fort',
  },
  'Kerala': {
    tagline: "God's Own Country",
    desc: 'Backwater houseboats, spice trails, Ayurvedic retreats, and lush tea-covered hills in the deep South.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop',
    icon: 'sailing',
  },
  'Himachal Pradesh': {
    tagline: 'Valley of the Gods',
    desc: 'Snow-capped peaks, apple orchards, monasteries perched on cliffs, and roaring mountain rivers.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop',
    icon: 'landscape',
  },
  'Uttar Pradesh': {
    tagline: 'The Spiritual Heart',
    desc: 'Varanasi ghats, the Taj Mahal, Prayagraj Sangam, and the birthplace of Indian civilization.',
    image: 'https://images.unsplash.com/photo-1561361058-c24e78b6b0a3?w=600&auto=format&fit=crop',
    icon: 'temple_buddhist',
  },
  'Andaman & Nicobar': {
    tagline: 'Island of Dreams',
    desc: 'Crystal clear turquoise water, white-sand beaches, vibrant coral reefs, and the historic Cellular Jail.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop',
    icon: 'tsunami',
  },
  'Northeast India': {
    tagline: 'The Hidden Frontier',
    desc: 'Living root bridges, Kaziranga rhinos, Brahmaputra cruises, and India\'s least-explored tribal cultures.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop',
    icon: 'forest',
  },
  'Goa': {
    tagline: 'Pearl of the Orient',
    desc: 'Portuguese churches, golden beaches, spice farms, and the most laid-back vibe in India.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop',
    icon: 'beach_access',
  },
  'Ladakh': {
    tagline: 'Land of High Passes',
    desc: 'Pangong Tso, monasteries at 11,000 ft, and the most dramatic starry skies in India.',
    image: 'https://images.unsplash.com/photo-1609766418204-94aae0ecfbd9?w=600&auto=format&fit=crop',
    icon: 'snowing',
  },
  'Jammu & Kashmir': {
    tagline: 'Paradise on Earth',
    desc: 'Dal Lake houseboats, Gulmarg snow slopes, Pahalgam valleys, and the spiritual Golden Temple nearby.',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&auto=format&fit=crop',
    icon: 'landscape',
  },
}

const DEFAULT_INFO = {
  tagline: 'Incredible India',
  desc: 'An amazing destination with unique culture, heritage, and natural beauty waiting to be explored.',
  image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop',
  icon: 'travel_explore',
}

export default function Destinations() {
  const navigate = useNavigate()
  const { tours, loading } = useTours()

  // Get unique regions from actual tours
  const regions = [...new Set(tours.map(t => t.region))].filter(Boolean)

  // Count tours per region
  const tourCount = (region) => tours.filter(t => t.region === region).length

  return (
    <div className="bg-surface min-h-screen">

      {/* Header */}
      <div className="bg-surface-low py-16 border-b border-outline-light">
        <div className="max-w-container mx-auto px-5 md:px-16 text-center">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3">Our Coverage</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Explore India's Wonders</h1>
          <p className="text-on-surface-var text-lg max-w-2xl mx-auto">
            Every destination we feature is one we actively operate tours in — handpicked, tried, and loved.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-container mx-auto px-5 md:px-16 py-14">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-outline-light" />
            ))}
          </div>
        ) : regions.length === 0 ? (
          <div className="text-center py-20 text-on-surface-var">
            <span className="material-symbols-outlined text-[60px] mb-4 block text-outline">travel_explore</span>
            <p className="font-display text-xl">No destinations yet.</p>
            <p className="text-sm mt-2">Add tours from the admin panel and they'll appear here automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => {
              const info = REGION_INFO[region] || DEFAULT_INFO
              const count = tourCount(region)
              // Use the first tour image for this region as fallback
              const firstTourImage = tours.find(t => t.region === region)?.image_url || tours.find(t => t.region === region)?.image

              return (
                <div
                  key={region}
                  className="group bg-white rounded-2xl overflow-hidden border border-outline-light hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('/tours')}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={firstTourImage || info.image}
                      alt={region}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-xs font-bold text-tertiary-light uppercase tracking-wider">{info.tagline}</p>
                      <h3 className="font-display text-xl font-bold text-white">{region}</h3>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white">
                      {count} {count === 1 ? 'Tour' : 'Tours'}
                    </div>
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-white">{info.icon}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-sm text-on-surface-var leading-relaxed mb-4">{info.desc}</p>
                    <button
                      onClick={() => navigate('/tours')}
                      className="text-sm font-semibold text-primary hover:text-primary-light flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      See {count} {count === 1 ? 'Tour' : 'Tours'}
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
