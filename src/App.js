import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Manual from './components/manual';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Routes />
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
