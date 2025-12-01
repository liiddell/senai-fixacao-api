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
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M44 6H4V18H6V40C6 41.0609 6.42143 42.0783 7.17157 42.8284C7.92172 43.5786 8.93913 44 10 44H38C39.0609 44 40.0783 43.5786 40.8284 42.8284C41.5786 42.0783 42 41.0609 42 40V18H44V6ZM8 10H40V14H8V10ZM38 40H10V18H38V40ZM18 22H30C30 23.0609 29.5786 24.0783 28.8284 24.8284C28.0783 25.5786 27.0609 26 26 26H22C20.9391 26 19.9217 25.5786 19.1716 24.8284C18.4214 24.0783 18 23.0609 18 22Z" fill="#28A745"/>
</svg>
          <h3>Relatório de Produtos</h3>
        </div>

        <div className="rel">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M16 20H32M16 36H32M16 28H24M8 42.8V5.2C8 4.88174 8.12643 4.57652 8.35147 4.35147C8.57652 4.12643 8.88174 4 9.2 4H32.504C32.8222 4.00028 33.1272 4.12689 33.352 4.352L39.648 10.648C39.7599 10.7598 39.8487 10.8926 39.9091 11.0389C39.9695 11.1851 40.0004 11.3418 40 11.5V42.8C40 42.9576 39.969 43.1136 39.9087 43.2592C39.8484 43.4048 39.76 43.5371 39.6485 43.6485C39.5371 43.76 39.4048 43.8484 39.2592 43.9087C39.1136 43.969 38.9576 44 38.8 44H9.2C9.04241 44 8.88637 43.969 8.74078 43.9087C8.59519 43.8484 8.4629 43.76 8.35147 43.6485C8.24004 43.5371 8.15165 43.4048 8.09134 43.2592C8.03104 43.1136 8 42.9576 8 42.8Z" stroke="#28A745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M32 4V10.8C32 11.1183 32.1264 11.4235 32.3515 11.6485C32.5765 11.8736 32.8817 12 33.2 12H40" stroke="#28A745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          <h3>Relatório de Vendas</h3>
        </div>

        <div className="rel">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <g clip-path="url(#clip0_98_38)">
    <path d="M36 18V0H12V18H0V39H48V18H36ZM21 36H3V21H9V24H15V21H21V36ZM15 18V3H21V6H27V3H33V18H15ZM45 36H27V21H33V24H39V21H45V36ZM0 48H9V45H39V48H48V42H0V48Z" fill="#28A745"/>
  </g>
  <defs>
    <clipPath id="clip0_98_38">
      <rect width="48" height="48" fill="white"/>
    </clipPath>
  </defs>
</svg>
          <h3>Relatório de Estoque</h3>
        </div>

        <div className="rel">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <path d="M31.4999 24C29.5724 24 27.7086 23.1394 26.2499 21.5775C24.8315 20.0541 23.9652 18.0225 23.8124 15.8588C23.6493 13.5506 24.3533 11.4281 25.7943 9.88125C27.2352 8.33438 29.2499 7.5 31.4999 7.5C33.734 7.5 35.7543 8.34937 37.1905 9.8925C38.6408 11.4506 39.3468 13.5694 39.1836 15.8578C39.0271 18.0244 38.1618 20.055 36.7461 21.5766C35.2911 23.1394 33.4283 24 31.4999 24ZM43.859 40.5H19.1418C18.7444 40.5021 18.3518 40.4131 17.9942 40.2396C17.6367 40.0662 17.3236 39.8131 17.0793 39.4997C16.8201 39.16 16.641 38.766 16.5556 38.3473C16.4703 37.9286 16.4807 37.496 16.5861 37.0819C17.3755 33.9122 19.3311 31.2834 22.2411 29.4806C24.824 27.8812 28.1118 27 31.4999 27C34.9546 27 38.1561 27.8437 40.754 29.4422C43.6705 31.2356 45.629 33.8794 46.4146 37.0875C46.5188 37.5019 46.528 37.9345 46.4417 38.353C46.3553 38.7715 46.1756 39.1651 45.9158 39.5044C45.6717 39.8163 45.3594 40.0682 45.0029 40.2408C44.6464 40.4134 44.2551 40.502 43.859 40.5ZM13.7811 24.375C10.4821 24.375 7.58146 21.3075 7.31239 17.5378C7.17927 15.6066 7.78114 13.8206 8.99989 12.5109C10.2055 11.2144 11.9061 10.5 13.7811 10.5C15.6561 10.5 17.3436 11.2181 18.5558 12.5222C19.784 13.8422 20.384 15.6244 20.2433 17.5397C19.9743 21.3084 17.0746 24.375 13.7811 24.375ZM19.9368 27.3234C18.2877 26.5172 16.1474 26.1141 13.7821 26.1141C11.0202 26.1141 8.33802 26.8341 6.22864 28.1409C3.83708 29.625 2.22833 31.7859 1.57864 34.395C1.48357 34.7703 1.47457 35.1622 1.55234 35.5414C1.6301 35.9207 1.79261 36.2774 2.02771 36.585C2.25078 36.8714 2.53657 37.1028 2.86308 37.2614C3.1896 37.42 3.54814 37.5017 3.91114 37.5H14.3174C14.493 37.5 14.6631 37.4383 14.7979 37.3257C14.9328 37.2132 15.0238 37.0569 15.0552 36.8841C15.0655 36.825 15.0786 36.7659 15.0936 36.7078C15.8886 33.5147 17.7515 30.8166 20.504 28.8497C20.6052 28.7767 20.6866 28.6796 20.7409 28.5672C20.7951 28.4548 20.8204 28.3307 20.8146 28.206C20.8087 28.0814 20.7718 27.9601 20.7073 27.8533C20.6427 27.7465 20.5525 27.6575 20.4449 27.5944C20.2977 27.5081 20.129 27.4172 19.9368 27.3234Z" fill="#28A745"/>
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
