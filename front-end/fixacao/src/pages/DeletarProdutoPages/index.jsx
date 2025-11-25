import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import "./style.css"; // Mantendo a importação de estilo original

// --- ATUALIZAÇÃO 1: Usar 'codigo' no schema de validação ---
const schemaDelecao = yup.object({
  codigo: yup
    .string()
    .required("O código do produto é obrigatório.")
    .min(5, "O código deve ter pelo menos 5 caracteres."), // Ajuste a validação conforme necessário
});

function PaginaDeDelecao() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schemaDelecao),
    defaultValues: { codigo: "" }, // Valor padrão para 'codigo'
  });

  // 2. Função de Envio para Deleção
  const deletarProduto = async (formData) => {
    const { codigo } = formData; // Extrai o código
    
    try {
      // --- ATUALIZAÇÃO 2: Usamos o método DELETE com o 'codigo' na URL ---
      const resposta = await api.delete(`/deletar/${codigo}`); // Endpoint baseado no seu último pedido (/deletar/{codigo})

      toast.success(resposta?.data?.mensagem || `Produto com código ${codigo} deletado com sucesso!`);
      reset(); // Limpa o formulário após o sucesso

    } catch (erro) {
      const mensagem = erro?.response?.data?.mensagem || "Erro ao deletar produto.";
      
      // O backend geralmente retorna 404 se o código não for encontrado
      // ou 400/500 em caso de erro no servidor/formato
      toast.error(mensagem);
      console.error("Erro na deleção:", erro);
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Deletar Produto por Código</h1>

      <form noValidate onSubmit={handleSubmit(deletarProduto)}>
        
        {/* --- ATUALIZAÇÃO 3: Campo do Código do Produto --- */}
        <div className="form-group">
          <label htmlFor="campo-codigo">Código do Produto</label>
          <input
            id="campo-codigo"
            type="text"
            placeholder="Ex.: ALIM12345"
            {...register("codigo")}
          />
          {errors.codigo && <p className="error-message">{errors.codigo.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Deletando..." : "Deletar Produto"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeDelecao;