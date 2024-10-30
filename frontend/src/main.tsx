import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListesOfTransfer from './components/ListesOfTransfer.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>
  },
  {
    path: "/listes-des-transfers",
    element:<ListesOfTransfer/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
