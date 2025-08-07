import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "./components/Home/Header"
import { Home } from "./components/Pages/Home"



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

          </Routes>
        </main>

      </div>
    </Router>
  )
}

export default App
