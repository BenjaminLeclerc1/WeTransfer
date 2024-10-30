import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListesOfTransfer from './components/ListesOfTransfer.tsx'
import LogIn from './components/LogIn.jsx'
import Register from './components/Register.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>
  },
  {
    path: "/listes-des-transfers",
    element:<ListesOfTransfer/>
  },
  {
    path: "/login",
    element:<LogIn/>
  },
  {
    path: "/register",
    element:<Register/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
