import { useState } from 'react'
import { useTours } from '../hooks/useTours'
import TourCard from '../components/TourCard'

const REGIONS    = ['All', 'Rajasthan', 'Kerala', 'Himachal Pradesh', 'Uttar Pradesh', 'Andaman & Nicobar', 'Northeast India']
const DURATIONS  = ['All', 'Under 5 Days', '5-10 Days', '10+ Days']

export default function Tours() {
  const [region,   setRegion]   = useState('All')
  const [duration, setDuration] = useState('All')

  const { tours, loading } = useTours({ region, duration })

  return (
    <div className="bg-surface min-h-screen">

      {/* Page header */}
      <div className="bg-surface-low py-16 border-b border-outline-light">
        <div className="max-w-container mx-auto px-5 md:px-16 text-center">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3">Explore India</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">All Tour Packages</h1>
          <p className="text-on-surface-var text-lg max-w-xl mx-auto">
            From royal Rajasthan to misty Northeast frontiers — find your perfect Indian adventure.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-5 md:px-16 py-12">

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-outline-light p-6 mb-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Region */}
          <div className="flex-1 min-w-[180px]">
            <label className="text-xs font-bold text-on-surface-var uppercase tracking-wider block mb-2">Filter by Region</label>
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="w-full border border-outline-light rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 bg-surface"
            >
              {REGIONS.map(r => <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>)}
            </select>
          </div>

          {/* Duration pills */}
          <div>
            <label className="text-xs font-bold text-on-surface-var uppercase tracking-wider block mb-2">Filter by Duration</label>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map(d => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    duration === d
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-on-surface-var border-outline-light hover:border-primary'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <div className="md:ml-auto text-sm text-on-surface-var whitespace-nowrap">
            <span className="font-bold text-primary">{tours.length}</span> tours found
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-outline-light" />
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-20 text-on-surface-var">
            <span className="material-symbols-outlined text-[60px] mb-4 block text-outline">search_off</span>
            <p className="font-display text-xl">No tours found for this filter.</p>
            <p className="text-sm mt-2">Try selecting a different region or duration.</p>
            <button onClick={() => { setRegion('All'); setDuration('All') }}
              className="mt-6 text-primary font-semibold text-sm underline">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}
          </div>
        )}
      </div>
    </div>
  )
}
