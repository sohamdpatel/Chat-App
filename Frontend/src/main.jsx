import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { CheckEmail, CheckPassword, Home, Register } from "./pages"
import Message from './component/Message.jsx';
import AuthLayouts from './layout/AuthLayouts.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}>
        <Route path='/:userId' element={<Message/>}/>
      </Route>
      <Route path='register' element={<AuthLayouts><Register/></AuthLayouts>}/>
      <Route path='email' element={<AuthLayouts><CheckEmail/></AuthLayouts>}/>
      <Route path='password' element={<AuthLayouts><CheckPassword/></AuthLayouts>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
