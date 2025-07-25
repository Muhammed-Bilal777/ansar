import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import Homepage from './pages/Home/Home'

import { UserProfile } from './pages/profile/UserProfile'
import RegisterPage from './components/Auth/Register'
import LoginPage from './components/Auth/Login'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<UserProfile />} />

      </Routes>
    </BrowserRouter>
  )
}



