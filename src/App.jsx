import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Practice from './pages/Practice';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
