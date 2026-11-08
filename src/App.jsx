import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EquipmentDetail from './pages/EquipmentDetail';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/equipment/:id" element={<EquipmentDetail />} />
    </Routes>
  );
}

export default App;