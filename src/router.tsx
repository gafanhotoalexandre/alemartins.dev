import { createBrowserRouter } from 'react-router'

import { Portfolio } from './pages/Portfolio'
import { LiaLetter } from './pages/LiaLetter'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Portfolio />,
  },
  {
    path: '/para-mari',
    element: <LiaLetter />,
  },
])
