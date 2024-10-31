import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListesOfTransfer from './components/options/ListesOfTransfer';
import LogIn from './components/options/LogIn';
import Register from './components/options/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

