import './App.css'
import SignUp from './components/Signup';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from './components/Protected';
import Layout from './components/global/Layout';
import Home from './components/Home';
import EmailVerificationPage from './components/EmailVerificationPage';
//import { useSelector } from 'react-redux';

function App() {
 // const { user } = useSelector((store) => store.userReducer);
 //const {isAuth} = useSelector((store)=>store.userReducer);
  return (
   <div>
    <BrowserRouter>
      <Routes>
        {/* Route for SignUp, no layout needed */}
        <Route path="/" element={<SignUp />} />
        <Route path="emailVerificationPage" element={<EmailVerificationPage/>} />
        {/* Protected routes with Layout */}
        <Route element={<Protected isAuth={true}><Layout /></Protected>}>
          <Route path="home" element={<Home />} />  {/* Renders Home in the Layout's Outlet */}

        </Route>
      </Routes>
    </BrowserRouter>
      </div>
  )
}

export default App
