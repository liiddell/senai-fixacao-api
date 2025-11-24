import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import CadastraProdutoPages from '../src/pages/CadastraProdutoPages';
import ListarProdutosPages from '../src/pages/ListarProdutosPages';
import HomePages from '../src/pages/HomePages';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePages />} /> 
          <Route path="/cadastro" element={<CadastraProdutoPages />} />
          <Route path="/produtos" element={<ListarProdutosPages />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;
