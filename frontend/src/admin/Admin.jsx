import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'taramaa2024'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const EMPTY_TOUR = {
  name: '', region: '', duration: '', durationDays: '', price: '',
  featured: false, image: null, shortDescription: '',
  highlights: '', itinerary: '', inclusions: '', exclusions: '',
  availableDates: '',
}

// Convert a tour from the backend into editable form text
function tourToForm(t) {
  return {
    name: t.name || '',
    region: t.region || '',
    duration: t.duration || '',
    durationDays: t.duration_days || '',
    price: t.price || '',
    featured: !!t.featured,
    image: null, // existing image kept unless replaced
    shortDescription: t.short_description || '',
    highlights: (t.highlights || []).join('\n'),
    itinerary: (t.itinerary || []).map(d => `${d.title}: ${d.description}`).join('\n'),
    inclusions: (t.inclusions || []).join('\n'),
    exclusions: (t.exclusions || []).join('\n'),
    availableDates: (t.available_dates || []).join('\n'),
  }
}

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [form, setForm] = useState(EMPTY_TOUR)
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null) // null = adding new, otherwise editing
  const [existingImageUrl, setExistingImageUrl] = useState('')

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

  const startEdit = (tour) => {
    setEditingId(tour.id)
    setForm(tourToForm(tour))
    setExistingImageUrl(tour.image_url || '')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(EMPTY_TOUR)
    setExistingImageUrl('')
  }

  const buildFormData = () => {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('region', form.region)
    formData.append('duration', form.duration)
    formData.append('duration_days', form.durationDays)
    formData.append('price', form.price)
    formData.append('featured', form.featured)
    formData.append('short_description', form.shortDescription)
    formData.append('highlights', JSON.stringify(form.highlights.split('\n').filter(Boolean)))
    formData.append('inclusions', JSON.stringify(form.inclusions.split('\n').filter(Boolean)))
    formData.append('exclusions', JSON.stringify(form.exclusions.split('\n').filter(Boolean)))
    formData.append('available_dates', JSON.stringify(form.availableDates.split('\n').filter(Boolean)))
    formData.append('itinerary', JSON.stringify(
  form.itinerary.split('\n').filter(Boolean).map((line, i) => {
    const colonIndex = line.indexOf(':')
    const title = colonIndex > -1 ? line.slice(0, colonIndex).trim() : line.trim()
    const description = colonIndex > -1 ? line.slice(colonIndex + 1).trim() : ''
    return { day: i + 1, title, description }
  })
))
    if (form.image) formData.append('image', form.image)
    return formData
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      const formData = buildFormData()

      let res
      if (editingId) {
        formData.append('existing_image', existingImageUrl)
        res = await fetch(`${API_URL}/api/tours/${editingId}`, {
          method: 'PUT',
          headers: { 'x-admin-password': ADMIN_PASSWORD },
          body: formData,
        })
      } else {
        res = await fetch(`${API_URL}/api/tours`, {
          method: 'POST',
          headers: { 'x-admin-password': ADMIN_PASSWORD },
          body: formData,
        })
      }

      if (!res.ok) throw new Error('Failed to save tour')

      setSaved(true)
      cancelEdit()
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
    if (editingId === id) cancelEdit()
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
            <p className="text-sm text-on-surface-var mt-1">Add, edit, or remove tours — changes go live instantly</p>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
            ● Live Database
          </span>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Tour saved successfully! It's now live on your website.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl text-sm mb-6">
            Error: {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl border border-outline-light p-8 mb-10 space-y-5">
          <div className="flex items-center justify-between border-b border-outline-light pb-4">
            <h2 className="font-display text-xl font-bold text-on-surface">
              {editingId ? `Editing: ${form.name}` : 'Add New Tour'}
            </h2>
            {editingId && (
              <button onClick={cancelEdit}
                className="text-xs text-on-surface-var hover:text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">close</span>
                Cancel Edit
              </button>
            )}
          </div>

          {editingId && existingImageUrl && !form.image && (
            <div className="flex items-center gap-3 bg-surface-low p-3 rounded-xl">
              <img src={existingImageUrl} alt="current" className="w-16 h-16 rounded-lg object-cover" />
              <p className="text-xs text-on-surface-var">Current image — upload a new photo below only if you want to replace it.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Tour Name *"      name="name"        placeholder="e.g. Royal Rajasthan Odyssey" />
            <Field label="Region *"         name="region"      placeholder="e.g. Rajasthan" />
            <Field label="Duration Text"    name="duration"    placeholder="e.g. 8 Days / 7 Nights" />
            <Field label="Duration (Days)"  name="durationDays" type="number" placeholder="8" />
            <Field label="Price (₹) *"      name="price"       type="number" placeholder="32000" />
            <Field label={editingId ? "Replace Tour Photo (optional)" : "Tour Photo *"} name="image" type="file" />
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
            <span className="material-symbols-outlined text-[18px]">
              {editingId ? 'save' : 'add_circle'}
            </span>
            {loading ? 'Saving...' : editingId ? 'Update Tour' : 'Save Tour — Goes Live Instantly'}
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
                  <button onClick={() => startEdit(t)}
                    className="text-xs text-secondary hover:text-secondary/70 flex items-center gap-1 font-semibold shrink-0">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Edit
                  </button>
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