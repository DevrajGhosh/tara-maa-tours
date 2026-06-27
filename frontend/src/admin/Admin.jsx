import { useState } from 'react'

const ADMIN_PASSWORD = 'taramaa2024' // Change this — for local use only

const EMPTY_TOUR = {
  name: '', region: '', duration: '', durationDays: '', price: '',
  featured: false, image: '', shortDescription: '',
  highlights: '', itinerary: '', inclusions: '', exclusions: '',
}

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [form, setForm] = useState(EMPTY_TOUR)
  const [saved, setSaved] = useState(false)
  const [tours, setTours] = useState(() => {
    try { return JSON.parse(localStorage.getItem('admin_tours') || '[]') } catch { return [] }
  })

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
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = () => {
    const newTour = {
      ...form,
      id: Date.now(),
      price: parseInt(form.price),
      durationDays: parseInt(form.durationDays),
      highlights: form.highlights.split('\n').filter(Boolean),
      inclusions: form.inclusions.split('\n').filter(Boolean),
      exclusions: form.exclusions.split('\n').filter(Boolean),
      itinerary: form.itinerary.split('\n').filter(Boolean).map((line, i) => {
        const [title, ...rest] = line.split(':')
        return { day: i + 1, title: title.trim(), description: rest.join(':').trim() }
      }),
    }
    const updated = [...tours, newTour]
    setTours(updated)
    localStorage.setItem('admin_tours', JSON.stringify(updated))
    setSaved(true)
    setForm(EMPTY_TOUR)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleDelete = id => {
    const updated = tours.filter(t => t.id !== id)
    setTours(updated)
    localStorage.setItem('admin_tours', JSON.stringify(updated))
  }

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(tours, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'tours.json'; a.click()
  }

  const Field = ({ label, name, type = 'text', placeholder = '' }) => (
    <div>
      <label className="text-xs font-bold text-on-surface-var uppercase tracking-wider block mb-1">{label}</label>
      <input
        type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder}
        className="w-full border border-outline-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  )

  const TextArea = ({ label, name, placeholder, rows = 4 }) => (
    <div>
      <label className="text-xs font-bold text-on-surface-var uppercase tracking-wider block mb-1">{label}</label>
      <textarea
        name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} rows={rows}
        className="w-full border border-outline-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
      />
    </div>
  )

  return (
    <div className="bg-surface-low min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-on-surface">Tour Admin Panel</h1>
            <p className="text-sm text-on-surface-var mt-1">Add new tours — then export JSON to update the website</p>
          </div>
          <button onClick={exportJSON}
            className="flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-secondary/90 transition-all">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export tours.json
          </button>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Tour saved! Click "Export tours.json" and replace the file in your project.
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl border border-outline-light p-8 mb-10 space-y-5">
          <h2 className="font-display text-xl font-bold text-on-surface border-b border-outline-light pb-4">Add New Tour</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Tour Name *"    name="name"        placeholder="e.g. Royal Rajasthan Odyssey" />
            <Field label="Region *"       name="region"      placeholder="e.g. Rajasthan" />
            <Field label="Duration Text"  name="duration"    placeholder="e.g. 8 Days / 7 Nights" />
            <Field label="Duration (Days)" name="durationDays" type="number" placeholder="8" />
            <Field label="Price (₹) *"    name="price"       type="number" placeholder="32000" />
            <Field label="Cover Image URL" name="image"      placeholder="https://images.unsplash.com/..." />
          </div>

          <TextArea label="Short Description *" name="shortDescription" placeholder="2-3 lines about this tour..." rows={2} />

          <TextArea
            label="Highlights (one per line) *"
            name="highlights"
            placeholder={"Amber Fort Jaipur\nLake Palace Udaipur\nJaisalmer Desert Safari"}
            rows={4}
          />

          <TextArea
            label="Itinerary (one day per line: Day Title: Description) *"
            name="itinerary"
            placeholder={"Arrival in Jaipur: Check-in and evening walk.\nJaipur Sightseeing: Amber Fort, Hawa Mahal..."}
            rows={6}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextArea label="Inclusions (one per line)" name="inclusions" placeholder={"Hotel stays\nBreakfast & dinner\nGuide"} rows={4} />
            <TextArea label="Exclusions (one per line)" name="exclusions" placeholder={"Airfare\nLunch\nInsurance"} rows={4} />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange}
              className="w-4 h-4 accent-primary" />
            <label htmlFor="featured" className="text-sm font-semibold text-on-surface">Mark as Featured (shows on homepage)</label>
          </div>

          <button onClick={handleSave}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-light transition-all active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Save Tour
          </button>
        </div>

        {/* Existing tours */}
        {tours.length > 0 && (
          <div className="bg-white rounded-2xl border border-outline-light p-8">
            <h2 className="font-display text-xl font-bold text-on-surface mb-5">Saved Tours ({tours.length})</h2>
            <div className="space-y-3">
              {tours.map(t => (
                <div key={t.id} className="flex items-center justify-between py-3 border-b border-outline-light last:border-0">
                  <div>
                    <p className="font-semibold text-sm text-on-surface">{t.name}</p>
                    <p className="text-xs text-on-surface-var">{t.region} • {t.duration} • ₹{parseInt(t.price).toLocaleString('en-IN')}</p>
                  </div>
                  <button onClick={() => handleDelete(t.id)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Remove
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
