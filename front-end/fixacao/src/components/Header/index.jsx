import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">SENAI</Link>
        <nav className="nav">
          <Link to="/cadastro" className="navLink">Cadastrar Usuário</Link>
          <Link to="/usuarios" className="navLink">Listar Usuários</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;