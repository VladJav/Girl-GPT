import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import {showMeApiSlice} from './api/showMeApiSlice';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Home</div>,
        loader: async () => {
            const accessToken = localStorage.getItem('accessToken');

            const res = await store.dispatch(showMeApiSlice.endpoints.showMe.initiate({accessToken}));

            if(!res.data){
                return redirect('/login');
            }

            return null;
        }
    },
    {
        path: 'register',
        element: <RegistrationPage/>
    },
    {
      path: 'login',
      element: <LoginPage/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


