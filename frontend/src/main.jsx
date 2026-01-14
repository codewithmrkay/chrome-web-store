import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster/>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </StrictMode>,
)
