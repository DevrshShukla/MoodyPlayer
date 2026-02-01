import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log("%c[CRITICAL] MAIN.TSX LOADED", "background:red;color:white;font-size:20px");
console.log("[CRITICAL] JS Execution started at:", new Date().toISOString());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
