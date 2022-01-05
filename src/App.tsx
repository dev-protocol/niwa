import { useState } from 'react'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Home from './pages/home';
import TokensPage from './pages/tokens';
import GrowthPage from './pages/growth';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto">
      <header className="flex justify-between">
        <h1>Launchpad</h1>
        <button>Connect</button>
      </header>
      <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/growth" element={<GrowthPage />} />
        </Routes>
      </BrowserRouter>
      </main>
    </div>
  )
}

export default App
