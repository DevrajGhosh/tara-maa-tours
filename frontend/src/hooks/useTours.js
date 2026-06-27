import { useState, useEffect } from 'react'
import localTours from '../data/tours.json'

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// To switch to your backend, change USE_BACKEND to true and set API_URL
const USE_BACKEND = true
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
// ──────────────────────────────────────────────────────────────────────────────

export function useTours(filters = {}) {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!USE_BACKEND) {
      // Use local JSON (no backend needed)
      let result = [...localTours]
      if (filters.region && filters.region !== 'All') {
        result = result.filter(t => t.region === filters.region)
      }
      if (filters.featured) {
        result = result.filter(t => t.featured === true)
      }
      if (filters.duration === 'Under 5 Days') result = result.filter(t => t.durationDays < 5)
      if (filters.duration === '5-10 Days') result = result.filter(t => t.durationDays >= 5 && t.durationDays <= 10)
      if (filters.duration === '10+ Days') result = result.filter(t => t.durationDays > 10)
      setTours(result)
      setLoading(false)
      return
    }

    // Fetch from real backend
    const params = new URLSearchParams()
    if (filters.region && filters.region !== 'All') params.set('region', filters.region)
    if (filters.featured) params.set('featured', 'true')

    fetch(`${API_URL}/api/tours?${params}`)
      .then(r => r.json())
      .then(data => {
  const normalized = data.map(tour => ({
    ...tour,
    image: tour.image_url,
    shortDescription: tour.short_description,
    durationDays: tour.duration_days,
  }))
  setTours(normalized)
  setLoading(false)
})
      .catch(e => { setError(e.message); setLoading(false) })
  }, [filters.region, filters.duration, filters.featured])

  return { tours, loading, error }
}

export function useTour(id) {
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    if (!USE_BACKEND) {
      const found = localTours.find(t => t.id === parseInt(id))
      setTour(found || null)
      setLoading(false)
      return
    }
    fetch(`${API_URL}/api/tours/${id}`)
      .then(r => r.json())
      .then(data => { setTour(data); setLoading(false) })
  }, [id])

  return { tour, loading }
}
