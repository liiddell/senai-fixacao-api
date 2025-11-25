import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import './style.css'; 
import { toast } from 'react-toastify'; 

function ListarProdutosPages() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get('/cadastro');
        setProdutos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        const msgErro = error?.response?.data?.mensagem || "Erro ao buscar produtos.";
        toast.error(msgErro); 
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  if (loading) {
    return <div className="listaContainer"><h2>Carregando...</h2></div>;
  }

  return (
    <div className="listaContainer"> 
      <h1>Lista de Produtos</h1>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className="tabelaprodutos"> 
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id}> 
                <td>{produto.nome}</td>
                <td>{produto.preco}</td>
                <td>{produto.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListarProdutosPages;