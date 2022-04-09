import Home from './Pages/Home';
import Shop from './Pages/Shop';
/* import NavBar from "./components/NavBar" */
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Snackbar from "./components/Snackbar"
import React, { useEffect } from 'react';
import userAction from './redux/actions/userAction';
import { connect } from "react-redux"
import AboutPage from './Pages/AboutPage';
import ErrorScreen from './components/ErrorScreen';
import Seetings from './Pages/Seetings';
import SeetingsChange from './Pages/SeetingsChanges';
import PanelProducts from './Pages/PanelProducts'; /* toca organizarla, solo se hzo así para poder diseñarla */
import Detalle from "./components/DetalleProdct";

function App(props) {
  
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token")
      props.verifyToken(token)
      props.verifiedRol(localStorage.getItem("token"))
      // .then(res => setAuthorized(res))
    }

  }, [])


  return (
    <BrowserRouter>
      <Routes>
        {props.authorized}
        <Route path='*' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/err' element={<ErrorScreen />} />
        <Route path='/seetings' element={<Seetings />}/>
        <Route path='/aboutUs' element={<AboutPage />} />
        <Route path='/seetingsChanges' element={<SeetingsChange/>}/>
        <Route path='/signUp' element={props.user ? <Navigate replace to='/' /> : <SignUp />} />
        <Route path='/signIn' element={props.user ? <Navigate replace to='/' /> : <SignIn />} />
        {props.user?( <Route path='/panel' element={!props.authorized ? (<Navigate replace to='/err' />) : (<PanelProducts />)} />):(<></>)}
        {/* // <Route path='/panel' element={!props.authorized ? (<Navigate replace to='/err' />) : (<PanelProducts />)} /> */}
        {/* <Route path='/detalle/:id' element={<Detalle />} /> */}
        <Route path='/detalle/:id' element={<Detalle />} />
        
      </Routes>
      <Snackbar />
    </BrowserRouter>
  );
}

const mapDispatchToProps = {
  verifyToken: userAction.verifyToken,
  verifiedRol: userAction.verifiedRol
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    authorized: state.userReducer.authorized
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);