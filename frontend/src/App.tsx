import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import './index.css'
import Homepage from './pages/Home/Home'
import Loader from './utils/Loader'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/loader' element={<Loader />} />
      </Routes>
    </BrowserRouter>
  )
}



