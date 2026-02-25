import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Favorites from './pages/Favorites'

function App() {
  return (
    <Routes>

      <Route path='/' element={<Login />} /> 

      <Route 
        path='/dashboard' 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      /> 

      <Route path="/favorites" element={<Favorites />} />

    </Routes>
  )
}

export default App