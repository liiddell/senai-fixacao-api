import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import "./style.css";

// Validação do formulário
const schemaDelecao = yup.object({
  codigo: yup
    .string()
    .required("O código do produto é obrigatório.")
    .min(5, "O código deve ter pelo menos 5 caracteres."),
});

function PaginaDeDelecao() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schemaDelecao),
    defaultValues: { codigo: "" },
  });

  const deletarProduto = async (formData) => {
    const { codigo } = formData;

    try {
      const resposta = await api.delete(`/cadastro/${codigo}`);

      toast.success(
        resposta?.data?.mensagem ||
        `Produto com código ${codigo} deletado com sucesso!`
      );

      // Limpar o campo após sucesso
      reset();
    } catch (erro) {
      const status = erro?.response?.status;
      const mensagem = erro?.response?.data?.mensagem || "Erro ao deletar produto.";

      if (status === 404) {
        toast.error(`Produto com código ${codigo} não encontrado.`);
      } else {
        toast.error(mensagem);
      }

      console.error("Erro na deleção:", erro);
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Deletar Produto por Código</h1>

      <form noValidate onSubmit={handleSubmit(deletarProduto)}>
        <div className="form-group">
          <label htmlFor="campo-codigo">Código do Produto</label>
          <input
            id="campo-codigo"
            type="text"
            placeholder="Ex.: ALIM12345"
            {...register("codigo")}
          />
          {errors.codigo && (
            <p className="error-message">{errors.codigo.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Deletando..." : "Deletar Produto"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeDelecao;
