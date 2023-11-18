import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Manual from './pages/Manual'
import Home from './pages/Home'
import Board from './pages/Board'
import Counter from './pages/Counter'
import Arena from './pages/Arena'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path='board' element={<Board />} />
            <Route path="manual" element={<Manual />} />
            <Route path="arena" element={<Arena />} />
            <Route path='counter' element={<Counter />} />
          </ Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
