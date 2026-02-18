import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { SpinWheelGame } from './components/SpinWheel/SpinWheelGame';
import { BPMGame } from './components/BPMGame/BPMGame';
import './styles/globals.css';
import './styles/animations.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spin-wheel" element={<SpinWheelGame />} />
        <Route path="/bpm-game" element={<BPMGame />} />
      </Routes>
    </Router>
  );
}

export default App;
