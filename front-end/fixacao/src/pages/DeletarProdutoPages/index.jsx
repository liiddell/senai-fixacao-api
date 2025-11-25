import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import "./style.css"; // Mantendo a importação de estilo original

// 1. Esquema de Validação para Deleção
const schemaDelecao = yup.object({
  idProduto: yup
    .string()
    .required("O ID do produto é obrigatório.")
    .matches(/^[0-9a-fA-F]{24}$/, "O ID deve ser um ObjectId válido (24 caracteres)."), // Exemplo: validação para um ObjectId do MongoDB
});

function PaginaDeDelecao() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schemaDelecao),
    defaultValues: { idProduto: "" },
  });

  // 2. Função de Envio para Deleção
  const deletarProduto = async (formData) => {
    const { idProduto } = formData;
    
    try {
      // Usamos o método DELETE e passamos o ID na URL
      const resposta = await api.delete(`/produto/${idProduto}`);

      toast.success(resposta?.data?.mensagem || "Produto deletado com sucesso!");
      reset(); // Limpa o formulário após o sucesso

    } catch (erro) {
      const mensagem = erro?.response?.data?.mensagem || "Erro ao deletar produto.";
      
      // O backend geralmente retorna 404 se o ID não for encontrado
      // ou 400/500 em caso de erro no servidor/formato
      toast.error(mensagem);
      console.error("Erro na deleção:", erro);
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Deletar Produto</h1>

      <form noValidate onSubmit={handleSubmit(deletarProduto)}>
        
        {/* Campo do ID do Produto */}
        <div className="form-group">
          <label htmlFor="campo-idProduto">ID do Produto</label>
          <input
            id="campo-idProduto"
            type="text"
            placeholder="Ex.: 60d5ec49f85d3f23a85b99a5"
            {...register("idProduto")}
          />
          {errors.idProduto && <p className="error-message">{errors.idProduto.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Deletando..." : "Deletar Produto"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeDelecao;