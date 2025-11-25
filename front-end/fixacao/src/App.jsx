import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import CadastraProdutoPages from '../src/pages/CadastraProdutoPages';
import ListarProdutosPages from '../src/pages/ListarProdutosPages';
import HomePages from '../src/pages/HomePages';
import DeletarProdutoPages from '../src/pages/DeletarProdutoPages';

function App() {
  return (
    <div className='app'>
      <Header />
      <main className='content'>
        <Routes>
          <Route path="/" element={<HomePages />} /> 
          <Route path="/cadastro" element={<CadastraProdutoPages />} />
          <Route path="/produtos" element={<ListarProdutosPages />} />
          <Route path="/deletar" element={<DeletarProdutoPages />}  />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
