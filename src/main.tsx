import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Portfolio } from './App.tsx'

import './index.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>
)
