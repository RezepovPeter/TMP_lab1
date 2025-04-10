import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResidentDetail from './pages/ResidentDetail';
import AddResident from './pages/AddResident';
import Form from './pages/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="detail/:id" element={<ResidentDetail />} />
          <Route path="add" element={<AddResident />} />
          <Route path="edit/:id" element={<Form mode="edit" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
