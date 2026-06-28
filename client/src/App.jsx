import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar   from './components/Navbar'
import Footer   from './components/Footer'
import Home         from './pages/Home'
import Tours        from './pages/Tours'
import Destinations from './pages/Destinations'
import About        from './pages/About'
import Contact      from './pages/Contact'
import Admin        from './admin/Admin'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/tours"        element={<Tours />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/about"        element={<About />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="/admin"        element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
