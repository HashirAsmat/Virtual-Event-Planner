import './App.css'
import SignUp from './components/Signup';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Protected from './components/Protected';
import Layout from './components/global/Layout';
import Home from './components/Home';
import EmailVerificationPage from './components/EmailVerificationPage';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import { PageNotFound } from './components/PageNotFound';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';

function App() {
 const {isAuth} = useSelector((store)=>store.userReducer);
 const GoogleAuthWrapper = ({children})=>{ 
  return (
<GoogleOAuthProvider clientId='769375618926-khh8j5n74q1do9hob64aus1a2rueomhn.apps.googleusercontent.com'>
  {children}
</GoogleOAuthProvider>
 )
};

  return (
   <div>
    <BrowserRouter>
      <Routes>
        {/* Route for SignUp, no layout needed */}
        <Route path="/" element={<Navigate to={'/login'}/>} />
        <Route path="/login" element={<GoogleAuthWrapper ><Login/></GoogleAuthWrapper> } />
        <Route path="emailVerificationPage/:email" element={<EmailVerificationPage/>} />
        <Route path="/signup" element={<GoogleAuthWrapper ><SignUp/></GoogleAuthWrapper>} />

        {/* Protected routes with Layout */}
        <Route element={<Protected isAuth={isAuth}><Layout /></Protected>}>
          <Route path="home" element={<Home />} /> {/* Renders Home in the Layout's Outlet */}
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
      </div>
  )
}

export default App
