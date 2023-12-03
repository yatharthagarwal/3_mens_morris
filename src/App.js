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
          <Route path='board' element={<Board />} />
          <Route path="manual" element={<Manual />} />
          <Route path="arena" element={<Arena />} />
          <Route path='counter' element={<Counter />} />
          <Route path='game-config' element={<GameConfiguration />} />
          <Route path='timer-select' element={<TimerSelection />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div >
  );
}

export default App;
