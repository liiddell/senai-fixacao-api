import React, { useEffect, useState } from 'react';
import api from "../../service/api";
import './style.css';

function Dashboard() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await api.get("/cadastro"); // ROTA GET DO BACKEND
        setProdutos(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
      }
    }

    carregarProdutos();
  }, []);

  return (
    <main className="main">
      <header className="header">
        <h1>Relatórios do Mercado</h1>
        <p>Gerar e visualizar relatórios de produtos, vendas e estoque</p>
      </header>

      <section className="relatorios">

        <div className="rel">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none">
            <path d="M20 17C20.53 17 21.04 16.79 21.41 16.41C21.79 16.04 22 15.53 22 15V4C22 3.47 21.79 2.96 21.41 2.58C21.04 2.21 20.53 2 20 2H9.46C9.81 2.61 10 3.3 10 4H20V15H11V17M8 4C8 4.53 7.79 5.04 7.41 5.41C7.04 5.79 6.53 6 6 6C5.47 6 4.96 5.79 4.58 5.41C4.21 5.04 4 4.53 4 4C4 3.47 4.21 2.96 4.58 2.58C4.96 2.21 5.47 2 6 2C6.53 2 7.04 2.21 7.41 2.58C7.79 2.96 8 3.47 8 4Z" fill="#046411ff"/>
          </svg>
          <h3>Relatório de Produtos</h3>
        </div>

        <div className="rel">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none">
            <path d="M4 3H6V21H4V3ZM18 3H7V21H18C19.1 21 20 20.1 20 19V5C20 3.9 19.1 3 18 3ZM16 9H10V8H16V9ZM16 7H10V6H16V7Z" fill="#28a745"/>
          </svg>
          <h3>Relatório de Vendas</h3>
        </div>

        <div className="rel">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none">
            <path d="M18 22C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V4C20 3.47 19.79 2.96 19.41 2.58C19.04 2.21 18.53 2 18 2H12V9L9.5 7.5L7 9V2H6C5.47 2 4.96 2.21 4.58 2.58C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.58 21.41C4.96 21.79 5.47 22 6 22H18Z" fill="#28a745"/>
          </svg>
          <h3>Relatório de Estoque</h3>
        </div>

        <div className="rel">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none">
            <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="#28a745"/>
          </svg>
          <h3>Relatório de Fornecedores</h3>
        </div>
      </section>

      <section className="botao">
        <button className="botao-exportar">+ Exportar</button>
      </section>

      <section className="report-preview">
        <h2>Preview – Relatório de Produtos</h2>

        <table>
  <thead>
    <tr>
      <th>Produto</th>
      <th>Estoque</th>
      <th>Disponibilidade</th>
    </tr>
  </thead>

  <tbody>
    {produtos.length === 0 && (
      <tr>
        <td colSpan="3">Nenhum produto cadastrado ainda.</td>
      </tr>
    )}

    {produtos.map((item) => {
      const estoqueMinimoPadrao = 10; // você pode alterar aqui

      const porcentagem = Math.min(
        (item.quantidade / estoqueMinimoPadrao) * 100,
        100
      );

      return (
        <tr key={item.codigo}>
          <td>{item.nome}</td>
          <td>{item.quantidade}</td>

          <td>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${porcentagem}%` }}
              ></div>
            </div>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

        <div className="cards">
          <div className="card">
            <strong>{produtos.length}</strong>
            <p>Total de produtos</p>
          </div>

          <div className="card">
            <strong>350 itens</strong>
            <p>Capacidade máxima</p>
          </div>

          <div className="card">
            <strong>
              {produtos.length > 0
                ? Math.round(
                    (produtos.reduce((acc, p) => acc + p.quantidade, 0) / 350) * 100
                  )
                : 0}%
            </strong>
            <p>Nível de ocupação</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
