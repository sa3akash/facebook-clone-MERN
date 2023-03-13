import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Activate from './pages/Activate';
import { LoginProtected, Protected } from './routes/LoginProtected';
import Forgot from './pages/Forgot';
import FriendsPage from './pages/FriendsPage';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme } from './store/AuthReducer';
import Cookies from 'js-cookie';
import { isDay } from './functions/isDay';
import NoPage from './pages/404';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/profile/:username",
        element: <Profile/>
      },
      {
        path: "/activate/:token",
        element: <Activate/>
      },
      {
        path: "/friends-page",
        element: <FriendsPage/>
      },
      {
        path: "/friends-page/:type",
        element: <FriendsPage/>
      },
    ]
  },
  {
    path: "/auth",
    element: <LoginProtected/>,
  },
  {
    path: "/forgot",
    element: <Forgot/>,
  },
  {
    path: "/404",
    element: <NoPage/>,
  },
  {
    path: "*",
    element: <NoPage/>,
  },
]);


function App() {

  const dispatch = useDispatch()
  const {darkTheme,compactMode} = useSelector(state=>state.Auth)


  useEffect(() => {
     compactMode && dispatch(setDarkTheme(isDay()))
  }, [compactMode, dispatch])

  useEffect(() => {
    Cookies.set("dark",darkTheme);
    Cookies.set("compactMode",compactMode)
  }, [darkTheme,compactMode])
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
