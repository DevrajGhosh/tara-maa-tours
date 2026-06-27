import { useNavigate } from 'react-router-dom'

const DESTINATIONS = [
  {
    name: 'Rajasthan',
    tagline: 'Land of Maharajas',
    desc: 'Amber forts, Thar desert sunsets, blue cities, and a royal heritage that takes your breath away.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop',
    icon: 'fort',
    highlights: ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur'],
  },
  {
    name: 'Kerala',
    tagline: "God's Own Country",
    desc: 'Backwater houseboats, spice trails, Ayurvedic retreats, and lush tea-covered hills in the deep South.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop',
    icon: 'sailing',
    highlights: ['Alleppey', 'Munnar', 'Kochi', 'Thekkady'],
  },
  {
    name: 'Himachal Pradesh',
    tagline: 'Valley of the Gods',
    desc: 'Snow-capped peaks, apple orchards, monasteries perched on cliffs, and roaring mountain rivers.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop',
    icon: 'landscape',
    highlights: ['Manali', 'Shimla', 'Spiti Valley', 'Kasol'],
  },
  {
    name: 'Goa',
    tagline: 'Pearl of the Orient',
    desc: 'Portuguese churches, golden beaches, spice farms, feni, and the most laid-back vibe in India.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop',
    icon: 'beach_access',
    highlights: ['North Goa', 'South Goa', 'Old Goa', 'Dudhsagar'],
  },
  {
    name: 'Northeast India',
    tagline: 'The Hidden Frontier',
    desc: 'Living root bridges, Kaziranga rhinos, Brahmaputra cruises, and India\'s least-explored tribal cultures.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop',
    icon: 'forest',
    highlights: ['Meghalaya', 'Assam', 'Arunachal', 'Sikkim'],
  },
  {
    name: 'Ladakh',
    tagline: 'Land of High Passes',
    desc: 'Magnetic Hill, Pangong Tso, monasteries at 11,000 ft, and the most dramatic starry skies in India.',
    image: 'https://images.unsplash.com/photo-1609766418204-94aae0ecfbd9?w=600&auto=format&fit=crop',
    icon: 'snowing',
    highlights: ['Leh', 'Pangong Lake', 'Nubra Valley', 'Zanskar'],
  },
  {
    name: 'Varanasi',
    tagline: 'The Eternal City',
    desc: 'Where life, death, and the divine collide on 84 ghats along the Ganga — the oldest living city on Earth.',
    image: 'https://images.unsplash.com/photo-1561361058-c24e78b6b0a3?w=600&auto=format&fit=crop',
    icon: 'temple_buddhist',
    highlights: ['Dashashwamedh Ghat', 'Kashi Vishwanath', 'Sarnath', 'Prayagraj'],
  },
  {
    name: 'Andaman & Nicobar',
    tagline: 'Island of Dreams',
    desc: 'Crystal clear turquoise water, white-sand beaches, vibrant coral reefs, and the historic Cellular Jail.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop',
    icon: 'tsunami',
    highlights: ['Havelock Island', 'Neil Island', 'Port Blair', 'Baratang'],
  },
]

export default function Destinations() {
  const navigate = useNavigate()

  return (
    <div className="bg-surface min-h-screen">

      {/* Header */}
      <div className="bg-surface-low py-16 border-b border-outline-light">
        <div className="max-w-container mx-auto px-5 md:px-16 text-center">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3">Our Coverage</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Explore India's Wonders</h1>
          <p className="text-on-surface-var text-lg max-w-2xl mx-auto">
            From the deserts of Rajasthan to the rainforests of the Northeast — we cover every incredible corner of Bharat.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-container mx-auto px-5 md:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.name}
              className="group bg-white rounded-2xl overflow-hidden border border-outline-light hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/tours')}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-bold text-tertiary-light uppercase tracking-wider">{dest.tagline}</p>
                  <h3 className="font-display text-xl font-bold text-white">{dest.name}</h3>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-white">{dest.icon}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-sm text-on-surface-var leading-relaxed mb-4">{dest.desc}</p>

                {/* Sub-destinations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.highlights.map(h => (
                    <span key={h} className="text-xs bg-surface-low text-on-surface-var px-3 py-1 rounded-full border border-outline-light">{h}</span>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/tours')}
                  className="text-sm font-semibold text-primary hover:text-primary-light flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  See Tours
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
