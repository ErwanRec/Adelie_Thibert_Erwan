import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Eleve from './pages/eleves.jsx';
import Eleve2 from './pages/eleves2.jsx';
import Prof from './pages/prof.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/eleves" element={<Eleve />} />
        <Route path="/eleves2" element={<Eleve2 />}/>
        <Route path="/prof" element={<Prof />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);