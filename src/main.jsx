import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Prof from './pages/prof.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Prof />
  </StrictMode>,
)
