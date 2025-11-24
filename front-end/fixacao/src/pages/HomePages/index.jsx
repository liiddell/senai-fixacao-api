import React from 'react';
import './style.css'; 

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo à Aplicação de Cadastro de Produtos!</h1>
      <p className="home-subtitle">Use a navegação acima para cadastrar ou listar Produtos.</p>
    </div>
  );
}

export default HomePage;