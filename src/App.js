import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Manual from './pages/Manual'
import Board from './pages/Board'
import Counter from './pages/Counter'
import Arena from './pages/Arena'
import GameConfiguration from './pages/game-config'
import TimerSelection from './pages/timer-selection'
import Header from './pages/Header'
import Footer from './pages/Footer'
import { Navbar } from 'react-bootstrap';
import 'animate.css';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Arena />} />
          <Route path="arena" element={<Arena />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div >
  );
}

export default App;
