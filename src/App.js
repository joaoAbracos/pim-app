import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateProduct from './components/CreateProduct';
import NavBar from './components/NavBar';
import Products from './components/Products';

function App() {
  return (
    <React.Fragment>
    <NavBar/>
      <Routes>
        <Route path={'/'} element={<Products/>}/>
        <Route path={'/createproduct'} element={<CreateProduct/>}/>
        <Route path={'/products'} element={<Products/>}/> 
      </Routes>
  </React.Fragment>
  );
}

export default App;
