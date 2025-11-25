import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import "./style.css";
import { useState } from "react";

const schema = yup.object({
  id: yup
    .number()
    .typeError("O ID deve ser um número.")
    .positive("O ID deve ser um número positivo.")
    .required("O ID é obrigatório."),
});

function PaginaDeDelecao() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { id: "" },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);

  const abrirConfirmacao = (formData) => {
    setProdutoParaDeletar(formData);
    setShowConfirmation(true);
  };

  const fecharConfirmacao = () => {
    setShowConfirmation(false);
    setProdutoParaDeletar(null);
  };

  const confirmarDelecao = async () => {
    if (!produtoParaDeletar) return;

    try {
      const resposta = await api.delete(`/cadastro/${produtoParaDeletar.id}`);

      toast.success(resposta?.data?.mensagem || "Produto deletado com sucesso!");
      reset();
      fecharConfirmacao();
    } catch (erro) {
      const status = erro?.response?.status;
      const mensagem = erro?.response?.data?.mensagem || "Erro ao deletar produto.";

      if (status === 404 || mensagem.includes("não encontrado")) {
        toast.error(`Produto com ID ${produtoParaDeletar.id} não encontrado.`);
      } else {
        toast.error(mensagem);
      }

      console.error("Erro na deleção:", erro);
      fecharConfirmacao();
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Deleção de Produto</h1>

      <form noValidate onSubmit={handleSubmit(abrirConfirmacao)}>
        
        {/* Campo: ID */}
        <div className="form-group">
          <label htmlFor="campo-id">ID do Produto</label>
          <input
            id="campo-id"
            type="number"
            placeholder="Ex.: 123"
            {...register("id")}
          />
          {errors.id && <p className="error-message">{errors.id.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-delete"
        >
          {isSubmitting ? "Verificando..." : "Deletar Produto"}
        </button>
      </form>

      {/* Modal de Confirmação */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirmar Deleção</h2>
            <p>
              Tem certeza que deseja deletar o produto com ID <strong>{produtoParaDeletar?.id}</strong>?
            </p>
            <p className="warning-text">Esta ação não pode ser desfeita!</p>
            
            <div className="modal-buttons">
              <button 
                onClick={fecharConfirmacao}
                className="btn-cancel"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarDelecao}
                className="btn-confirm-delete"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deletando..." : "Sim, Deletar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaDeDelecao;