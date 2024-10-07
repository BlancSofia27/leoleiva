import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Reservar from './views/reservar'
import AdminPanel from './views/adminPanel'
import AdminPrecios from './views/AdminPrecios'
import ReservaConfirmada from './views/confirmacion'

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Reservar />} />
        <Route path="/adminPanel" element={<AdminPanel/>}/>
        <Route path="/adminPrecios" element={<AdminPrecios/>}/>
        <Route path="/confirmacion" element={<ReservaConfirmada />} />
      </Routes>
    </Router>
  )
}

export default App
