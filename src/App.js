import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Filepage from './Pages/Filepage';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {

  return (
    <div className="App">
        <Navbar/>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/taal-table/:taal/:filename' element={<Filepage/>}/>
            {/* <Route path='/test/' element={<Test/>}/> */}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
