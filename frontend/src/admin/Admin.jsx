import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'taramaa2024'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const EMPTY_TOUR = {
  name: '', region: '', duration: '', durationDays: '', price: '',
  featured: false, image: null, shortDescription: '',
  highlights: '', itinerary: '', inclusions: '', exclusions: '',
  availableDates: '',
}

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [form, setForm] = useState(EMPTY_TOUR)
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const fetchTours = async () => {
    const res = await fetch(`${API_URL}/api/tours`)
    const data = await res.json()
    setTours(data)
  }

  useEffect(() => { if (auth) fetchTours() }, [auth])

  if (!auth) {
    return (
      <div className="min-h-screen bg-surface-low flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 border border-outline-light shadow-lg w-full max-w-sm text-center">
          <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">lock</span>
          <h2 className="font-display text-2xl font-bold text-on-surface mb-6">Admin Access</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && pw === ADMIN_PASSWORD) setAuth(true) }}
            className="w-full border border-outline-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
          />
          <button
            onClick={() => { if (pw === ADMIN_PASSWORD) setAuth(true); else alert('Wrong password') }}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-light transition-all"
          >
            Enter
          </button>
        </div>
      </div>
    )
  }

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target
    if (type === 'file') setForm(f => ({ ...f, image: files[0] }))
    else setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('region', form.region)
      formData.append('duration', form.duration)
      formData.append('duration_days', form.durationDays || 0)
      formData.append('price', form.price || 0)
      formData.append('featured', form.featured)
      formData.append('short_description', form.shortDescription)

      // Highlights — split by newline
      const highlightsArr = form.highlights.split('\n').map(s => s.trim()).filter(Boolean)
      formData.append('highlights', JSON.stringify(highlightsArr))

      // Inclusions & Exclusions — split by newline
      const inclusionsArr = form.inclusions.split('\n').map(s => s.trim()).filter(Boolean)
      const exclusionsArr = form.exclusions.split('\n').map(s => s.trim()).filter(Boolean)
      formData.append('inclusions', JSON.stringify(inclusionsArr))
      formData.append('exclusions', JSON.stringify(exclusionsArr))
      formData.append('available_dates', JSON.stringify(form.availableDates.split('\n').filter(Boolean)))

      // Itinerary — each line is "Title: Description"
      // We sanitize by removing any extra quotes or backslashes
      const itineraryArr = form.itinerary
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
        .map((line, i) => {
          const colonIndex = line.indexOf(':')
          const title = colonIndex > -1
            ? line.substring(0, colonIndex).trim()
            : line.trim()
          const description = colonIndex > -1
            ? line.substring(colonIndex + 1).trim().replace(/\\/g, '').replace(/"/g, "'")
            : ''
          return { day: i + 1, title, description }
        })
      
      // Use a clean stringify with no escaping issues
      formData.append('itinerary', JSON.stringify(itineraryArr))

      if (form.image) formData.append('image', form.image)

      const res = await fetch(`${API_URL}/api/tours`, {
        method: 'POST',
        headers: { 'x-admin-password': ADMIN_PASSWORD },
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save tour')

      setSaved(true)
      setForm(EMPTY_TOUR)
      fetchTours()
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tour?')) return
    await fetch(`${API_URL}/api/tours/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': ADMIN_PASSWORD },
    })
    fetchTours()
  }

  const Field = ({ label, name, type = 'text', placeholder = '' }) => (
    <div>
      <label className="text-xs font-bold text-on-surface-var uppercase tracking-wider block mb-1">{label}</label>
      <input
        type={type} name={name}
        value={type === 'file' ? undefined : form[name]}
        onChange={handleChange} placeholder={placeholder}
        className="w-full border border-outline-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  )

  const TextArea = ({ label, name, placeholder, rows = 4 }) => (
    <div>
      <label className="text-xs font-bold text-on-surface-var uppercase tracking-wider block mb-1">{label}</label>
      <textarea
        name={name} value={form[name]} onChange={handleChange}
        placeholder={placeholder} rows={rows}
        className="w-full border border-outline-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
      />
    </div>
  )

  return (
    <div className="bg-surface-low min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-5">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-on-surface">Tour Admin Panel</h1>
            <p className="text-sm text-on-surface-var mt-1">Add tours — they go live on the website instantly</p>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
            ● Live Database
          </span>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Tour added successfully! It's now live on your website.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl text-sm mb-6">
            Error: {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl border border-outline-light p-8 mb-10 space-y-5">
          <h2 className="font-display text-xl font-bold text-on-surface border-b border-outline-light pb-4">Add New Tour</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Tour Name *"      name="name"        placeholder="e.g. Royal Rajasthan Odyssey" />
            <Field label="Region *"         name="region"      placeholder="e.g. Rajasthan" />
            <Field label="Duration Text"    name="duration"    placeholder="e.g. 8 Days / 7 Nights" />
            <Field label="Duration (Days)"  name="durationDays" type="number" placeholder="8" />
            <Field label="Price (₹) *"      name="price"       type="number" placeholder="32000" />
            <Field label="Tour Photo *"     name="image"       type="file" />
          </div>

          <TextArea label="Short Description *" name="shortDescription" placeholder="2-3 lines about this tour..." rows={2} />
          <TextArea label="Highlights (one per line) *" name="highlights"
            placeholder={"Amber Fort Jaipur\nLake Palace Udaipur\nJaisalmer Desert Safari"} rows={4} />
          <TextArea label="Itinerary (Day Title: Description — one per line) *" name="itinerary"
            placeholder={"Arrival in Jaipur: Check-in and evening walk.\nJaipur Sightseeing: Amber Fort, Hawa Mahal..."} rows={6} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextArea label="Inclusions (one per line)" name="inclusions"
              placeholder={"Hotel stays\nBreakfast & dinner\nGuide"} rows={4} />
            <TextArea label="Exclusions (one per line)" name="exclusions"
              placeholder={"Airfare\nLunch\nInsurance"} rows={4} />
          </div>
          <TextArea
  label="Group Tour Available Dates (optional, one per line)"
  name="availableDates"
  placeholder={"15 July 2026\n20 August 2026\n10 September 2026"}
  rows={3}
/>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="featured" id="featured"
              checked={form.featured} onChange={handleChange}
              className="w-4 h-4 accent-primary" />
            <label htmlFor="featured" className="text-sm font-semibold text-on-surface">
              Mark as Featured (shows on homepage)
            </label>
          </div>

          <button onClick={handleSave} disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-light transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            {loading ? 'Saving...' : 'Save Tour — Goes Live Instantly'}
          </button>
        </div>

        {/* Existing tours */}
        {tours.length > 0 && (
          <div className="bg-white rounded-2xl border border-outline-light p-8">
            <h2 className="font-display text-xl font-bold text-on-surface mb-5">
              Live Tours ({tours.length})
            </h2>
            <div className="space-y-3">
              {tours.map(t => (
                <div key={t.id} className="flex items-center gap-4 py-3 border-b border-outline-light last:border-0">
                  {t.image_url && (
                    <img src={t.image_url} alt={t.name}
                      className="w-14 h-14 rounded-xl object-cover border border-outline-light" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-on-surface">{t.name}</p>
                    <p className="text-xs text-on-surface-var">
                      {t.region} • {t.duration} • ₹{parseInt(t.price).toLocaleString('en-IN')}
                      {t.featured && <span className="ml-2 text-tertiary font-bold">★ Featured</span>}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(t.id)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold shrink-0">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}