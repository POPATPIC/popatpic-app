import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CameraBooth from './components/Booth';
import SelectFrame from './components/SelectFrame';
import Result from './components/Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-frame" element={<SelectFrame />} />
        <Route path="/booth" element={<CameraBooth />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;