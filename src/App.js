import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Filepage from './Pages/Filepage';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import Test from './Pages/Test';
import TaalTable from './Components/TaalTable';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/taal/:taal' element={<Filepage/>}/>
            <Route path='/taal-table/:taal/:filename' element={<Filepage/>}/>
            <Route path='/test/' element={<Test/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
