import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Service from './pages/Service';

function App ()  {
  


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/service' element={<Service/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
  }


export default App;
