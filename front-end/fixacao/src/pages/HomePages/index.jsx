import React from 'react';
import './style.css'; 

// Dados simulados baseados na atividade de Cadastro e Atualização
const dashboardMetrics = [
  // === VISÃO GERAL DO CATÁLOGO ===
  {
    title: "Total de SKUs Ativos",
    value: "5.450",
    detail: "Total no sistema",
    className: "metric-total"
  },
  {
    title: "SKUs Sem Estoque (OOS)",
    value: "250",
    detail: "4.6% do Catálogo | Ação Imediata!",
    className: "metric-critical" // Alterado para crítico
  },
  {
    title: "SKUs com Estoque Baixo",
    value: "480",
    detail: "Atingiu ponto de reabastecimento",
    className: "metric-warning"
  },

  // === QUALIDADE DE DADOS E ERROS ===
  {
    title: "Produtos com Dados Incompletos",
    value: "85",
    detail: "Ex: Sem descrição, peso ou foto",
    className: "metric-error" 
  },
  {
    title: "Erros de Código Não Encontrado (404)",
    value: "12",
    detail: "Tentativas de atualização com código inválido",
    className: "metric-error"
  },
  {
    title: "Erros de Conflito (409)",
    value: "5",
    detail: "Tentativas de cadastro de SKU duplicado",
    className: "metric-error"
  },
  
  // === PRODUTIVIDADE E ATIVIDADE ===
  {
    title: "Total de Cadastros (24h)",
    value: "15",
    detail: "+2% em relação ao dia anterior",
    className: "metric-info"
  },
  {
    title: "Total de Atualizações (24h)",
    value: "128",
    detail: "Inclui preço, nome e estoque",
    className: "metric-info"
  },
  {
    title: "Tempo Médio de Cadastro (TMC)",
    value: "4m 15s",
    detail: "Mede a eficiência do funcionário",
    className: "metric-info"
  },
];

// Componente de Cartão (Card)
const MetricCard = ({ title, value, detail, className }) => (
  <div className={`metric-card ${className}`}>
    <h3 className="card-title">{title}</h3>
    <p className="card-value">{value}</p>
    <p className="card-detail">{detail}</p>
  </div>
);


function Dashboard() {
  return (
    <div className="home-container">
      <h1 className="home-title">🛠️ Dashboard Operacional de Inventário</h1>
      <p className="home-subtitle">Métricas chave de gestão de Catálogo e Estoque.</p>
      
      {/* Grid de Métricas */}
      <div className="metrics-grid">
        {dashboardMetrics.map((metric, index) => (
          <MetricCard 
            key={index}
            title={metric.title}
            value={metric.value}
            detail={metric.detail}
            className={metric.className}
          />
        ))}
      </div>

      {/* Seção Adicional (Sugestão para Gráfico/Tabela) */}
      <div className="section-table">
        <h2>SKUs Próximos de Expirar ou Vencidos</h2>
        <p>Aqui você pode listar ou mostrar em formato de tabela os itens que estão com a validade próxima, uma métrica crítica para um mercado. </p>
      </div>

    </div>
  );
}

// Renomeando para Dashboard, mas é o mesmo componente HomePage
export default Dashboard;