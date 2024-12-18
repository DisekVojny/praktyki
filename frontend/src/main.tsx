import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </NextUIProvider>
  </StrictMode>,
)
