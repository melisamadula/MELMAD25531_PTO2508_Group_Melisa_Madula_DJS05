import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * @file Application entry point.
 * Mounts the root React component tree into the main DOM container element
 * and activates additional developer validation checks using `StrictMode`.
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
