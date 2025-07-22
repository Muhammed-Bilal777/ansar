import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-center" autoClose={3000} />
    </Provider>
  </StrictMode>,
)
