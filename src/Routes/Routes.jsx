import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout/MainLayout';
import Home from '../pages/Home/Home';
import AddMedicine from '../pages/addMedicine/AddMedicine';
import LoginLayout from '../Layout/MainLayout/LoginLayout';
import Login from '../pages/Login/Login';
import SignUp from '../pages/Login/SignUp';
import MedicineStore from '../pages/Store/MedicineStore';

const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginLayout/>,
      children: [
        {
          path: '/',
          element:<Login/>
        },
        {
          path: '/signup',
          element:<SignUp/>
        }
      ]
    },
    {
      path: "/medicine",
      element: <MainLayout/>,
      children: [
        {
            path: 'home',
            element:<Home/>
        },
        {
            path:'addmedicine',
            element:<AddMedicine/>
        },
        {
          path:'store',
          element:<MedicineStore/>
        }
      ]
    }
  ]);

export default router;